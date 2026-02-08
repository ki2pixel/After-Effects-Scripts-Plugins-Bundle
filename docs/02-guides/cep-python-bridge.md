## CEP ↔ Python Bridge (Hybrid 2.0)

**TL;DR**: Garde ton panel CEP asynchrone, délègue les mutations AE à PyShiftAE via un démon unique, et laisse le bridge choisir tout seul entre pipe, socket ou mailbox pour ne jamais geler After Effects.

## Analogie tour de contrôle

CEP joue le rôle du hall d'aéroport, PyShiftBridge est la tour de contrôle, et PyShiftAE sont les pilotes qui exécutent les manœuvres. Tant que chaque vol (commande) passe par la tour, aucun panel ne décolle en solo.

## Le Problème

Tu appuies sur un bouton CEP, AE ne répond plus pendant 30 secondes. Chaque panel embarque son propre bridge bricolé, personne ne sait quel transport est actif, et la moindre évolution (nouveau handler, correctif socket) exige trois patchs différents. Résultat : AE gèle, les logs divergent, et tu n’oses plus activer les features PyShiftAE en production.

## La Solution : Pattern Hybrid 2.0

1. **Transport adaptatif** : le panel teste les pipes/sockets au runtime, sinon tombe sur la mailbox JSON automatique (@PyShiftBridge/js/main.js#45-205,280-360).
2. **Contrat de message stable** : CEP écrit des commandes `{id, entrypoint, args}` dans `cep_to_py.json` tandis que le daemon répond dans `py_to_cep.json`; le même schéma est sérialisé sur les sockets named pipe/Unix (@PyShiftBridge/js/main.js#255-365, @PyShiftBridge/bridge_daemon.py#223-257,297-399,411-448).
3. **Single daemon, multi-domain** : `bridge_daemon.py` expose un registre central `_HANDLERS`; chaque panel s’y branche via `register_handlers()` et profite immédiatement des transports, des helpers PyFx et de la batterie de tests (@docs/internal/pyshiftae/pyshiftae_bridge_daemon_strategy.md#1-89).

## Implémentation

### 1. Transport prioritaire côté CEP

```javascript
async function initPipeTransport() {
  if (!supportsNodeRequire()) return false;
  try {
    pipeName = getPipeName();
    const testClient = makePyInterface(pipeName);
    await testClient.connect();
    transport = "pipe";
    logLine("Pipe connecté: " + pipeName);
    return true;
  } catch (e) {
    transport = "mailbox";
    logLine("Pipe indisponible, fallback mailbox: " + e);
    return false;
  }
}
```

Cette détection appelle ensuite `sendCommandToPython` : si `transport === "pipe"`, le message part via socket, sinon il est écrit dans la mailbox (même structure `{id, entrypoint, args}`) (@PyShiftBridge/js/main.js#187-285,286-360). Aucun blocage n’atteint l’UI CEP, et la cascade pipe → mailbox est totalement automatique.

### 2. Loop mailbox côté Python

```python
def _loop(self) -> None:
    while not self._stop_event.is_set():
        msg = _safe_read_json(self.paths.request_path)
        if msg and isinstance(msg, dict):
            msg_id = msg.get("id")
            entrypoint = msg.get("entrypoint")
            args = msg.get("args") or {}
            result = handle_entrypoint(entrypoint, args)
            self._write_response_ok(msg_id, result)
        time.sleep(self.poll_interval_s)
```

La même classe `BridgeDaemon` expose `_socket_loop` pour accepter les paquets `PyInterface` (named pipe ↔ Unix socket) et renvoyer `{ok, result, error}` directement sur le flux binaire, ce qui rend la latence quasi temps réel (@PyShiftBridge/bridge_daemon.py#223-399,411-480).

### 3. Registre dynamique des handlers

```python
_HANDLERS: Dict[str, HandlerFn] = {}

def _register_all_handlers() -> None:
    register_handlers(_HANDLERS, _resolve)

def handle_entrypoint(entrypoint: str, args: Dict[str, Any]) -> Dict[str, Any]:
    if not _HANDLERS:
        _register_all_handlers()
    if entrypoint in _HANDLERS:
        return _HANDLERS[entrypoint](args)
    raise ValueError(f"Unknown entrypoint: {entrypoint}")
```

`PyShiftBridge/mediasolution/handlers.py` s’inscrit dans ce registre en validant les arguments, convertissant les types (coercition `config`, `snap_factor`, etc.) puis en résolvant la vraie fonction PyShiftAE via `resolve("mediasolution_apply_cuts_active_layer")` (@PyShiftBridge/bridge_daemon.py#215-250, @PyShiftBridge/mediasolution/handlers.py#1-141). Ainsi, ajouter un panel consiste à créer un package `my_panel/handlers.py` et appeler son `register_handlers` dans `_register_all_handlers()`.

### 4. Exemple concret : ouvrir un projet et auto-sélectionner le calque vidéo

```python
def mediasolution_open_project_and_select_comp(aep_path, comp_name_suffix, config):
    proj = ae.Project.open(aep_path)
    comp_items = [
        {"item": item_ptr, "name": str(isuite.GetItemName(item_ptr))}
        for item_ptr in _iter_project_item_ptrs(proj.proj)
        if isuite.GetItemType(item_ptr) == PyFx.ItemType.COMP
    ]
    candidates = preferred + others
    for c in candidates:
        comp_ptr = csuite.GetCompFromItem(c["item"])
        layer_index = _select_main_video_layer_index(comp_ptr)
        if layer_index > 0:
            return {"status": "ok", "active_comp_name": c["name"], "video_layer_index": layer_index, "warnings": []}
    raise RuntimeError("Could not find a main video layer")
```

Tout se passe côté daemon (déjà sur le thread AE), donc aucune gymnastique TaskScheduler. Le handler CEP n’a qu’à passer `aep_path` et l’éventuel suffixe via le message JSON; le résultat revient immédiatement avec le nom de comp sélectionné et l’index du calque vidéo prêt pour STEP3.1 (@PyShiftBridge/mediasolution/core.py#84-148).

### 5. Tests unitaires sans AE

`tests/test_bridge_daemon_pure.py` stubbe `pyshiftae` et `PyFx`, ce qui permet de valider les handlers (arg missings, fallback, undo groups) sans lancer After Effects. Ajoute systématiquement un case ID dans le tableau de perspectives quand tu crées un nouvel entrypoint pour garder la couverture alignée (@PyShiftBridge/tests/test_bridge_daemon_pure.py#1-101).

## ❌ / ✅ Patterns

### ❌ Appel synchrone depuis CEP

```javascript
function createLayer() {
  const result = pythonBridge.execute('create_solid_layer', args); // bloque AE
  return result;
}
```

### ✅ Commande asynchrone + bridge

```javascript
async function createLayer() {
  const response = await sendCommandToPython('create_solid_layer', args);
  logLine('← Python OK: ' + JSON.stringify(response));
  return response;
}
```

### ❌ Un daemon par panel

- Transports copiés/collés.
- Correctifs à appliquer partout.
- Impossible de mutualiser les tests.

### ✅ Single Daemon, Multi-Domain

- Transport centralisé, fallback géré une fois.
- Nouveaux panels = `register_handlers` + tests.
- Observabilité homogène (`ping`, logs, métriques) pour tout le monde.

## Diagnostics & Opérations

| Symptôme | Cause probable | Script à lancer |
| --- | --- | --- |
| Timeout CEP | Daemon non démarré | `"...\Support Files\Python\python.exe" PyShiftBridge/bridge_daemon.py --start` |
| `Connection refused` sur pipe | Pipe occupé ou nom incohérent | `localStorage.setItem('pyshift_pipe_name', 'PyShiftAE');` puis relance du panel |
| Latence >300 ms | Mailbox fallback actif | Vérifie `initPipeTransport()` et permissions du socket UNIX |
| Handler inconnu | `register_handlers` non appelé | Log `_HANDLERS` au démarrage et ajoute ton module dans `_register_all_handlers()` |

## Trade-offs

| Approche | Latence | Maintenance | Résilience |
| --- | --- | --- | --- |
| Pipe / Socket | ~10–15 ms | Centralisée (daemon) | Sensible aux perms OS |
| Mailbox JSON | ~300 ms | Aucune dépendance Node | Fonctionne même sans Node/pipe |
| Daemon unique | Patch unique, registre partagé | Entraîne un point de défaillance (à surveiller) | Facile à superviser (logs uniques) |
| Daemon par panel | Latence variable | Multiplication des correctifs | Peut « fonctionner » offline mais dette exponentielle |

## Mauvaises interprétations fréquentes

1. **« Un daemon par panel isolera les bugs. »** En réalité, tu dupliques les transports et les handlers, ce qui multiplie les divergences et rallonge les corrections.
2. **« Le pipe est optionnel, la mailbox suffit toujours. »** La mailbox à ~300 ms casse les sliders et l'UX interactive; le pipe reste la voie prioritaire.
3. **« CEP peut appeler PyShiftAE directement si c'est un script court. »** Tout appel synchrone bloque l'UI et attaque le main thread AE; l'asynchrone via bridge n'est pas négociable.

## Golden Rule

**Asynchrone toujours, synchrone jamais** : laisse le panel uniquement piloter l’UI, confie les mutations AE à PyShiftAE via un seul `bridge_daemon.py`, et laisse Hybrid 2.0 choisir le meilleur transport à ta place.
