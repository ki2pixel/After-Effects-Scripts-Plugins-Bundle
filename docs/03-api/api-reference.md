# API PyShiftAE & Bridge — Référence unifiée

**TL;DR**: Tu exposes deux surfaces d'API complémentaires: l'API Python native (PyShiftAE + AETK) qui manipule directement After Effects via TaskScheduler, et les endpoints JSON du Bridge qui rendent ces capacités pilotables depuis un panel CEP sans bloquer l'UI. Utilise la première pour écrire de la logique métier, la seconde pour connecter l'expérience utilisateur.

## Analogie « centrale → tableau de bord »

Considère PyShiftAE comme la centrale électrique (production/puissance) et le Bridge comme le tableau de bord du cockpit CEP. Tu ne branches jamais directement un interrupteur d'usine sur la console du pilote: la centrale produit, le tableau de bord pilote à distance.

## Le Problème

Every. Single. Appel. After Effects doit passer par son main thread. Côté UI, ton panel CEP tourne en JavaScript, côté automation tu veux tirer parti de Python. Sans garde-fous, soit tu gèles l'interface (appel synchrone), soit tu fais planter AE (appel SDK depuis un worker). Il fallait une API qui impose la bonne séparation: Python parle au SDK via TaskScheduler, CEP parle à Python via un Bridge asynchrone.

## La Solution

1. **API Python native (PyShiftAE + AETK)**: Wrappers C++ (Suites.cpp, TaskScheduler.cpp, Grabba.cpp) exposent un module Python simple (`ae`). TaskScheduler sérialise les mutations AE sur le main thread tandis que Grabba sécurise les handles.
2. **API Bridge JSON**: Le daemon `PyShiftBridge` enregistre des fonctions Python comme endpoints RPC. Le panel CEP envoie des requêtes asynchrones (pipes ou mailbox JSON) et reçoit une réponse structurée dès que la tâche Python est terminée.

Ces deux couches sont découplées: tu écris ta logique dans PyShiftAE, puis tu la publies via un endpoint Bridge pour l'exposer à CEP.

## Implémentation

### 1. API Python native (TaskScheduler + AETK)

```python
import pyshiftae as ae

def safe_operation():
    comp = ae.Item.active_item()
    if not comp:
        return
    layer = comp.layers.add_solid("Segment", (1, 0, 0, 1), 1920, 1080, 10)
    layer.label = "Blue"

# Toujours planifier sur le main thread AE
ae.schedule_task(safe_operation)
```

- **TaskScheduler** queue les fonctions Python et les exécute via un idle hook AE. Aucun appel SDK ne doit partir d'un thread Python brut.
- **Suites.cpp** encapsule les suites AEGP (ProjectSuite, ItemSuite, StreamSuite, LayerSuite) pour que `comp.layers.add_solid` ressemble à une API Python normale.
- **Grabba.cpp** applique RAII: chaque handle AEGP est validé, libéré et protégé contre les use-after-free.

> **Métriques**: 4 631 LOC de wrappers (Suites 1 658, TaskScheduler 1 234, Grabba 1 739) couvrent le SDK AE 2023+. PyShiftAE tourne sur Python 3.11+ avec pybind11 2.10.

### ❌ Appel direct vs ✅ API native + scheduler

| Sujet | ❌ Mauvais réflexe | ✅ Geste sûr |
| --- | --- | --- |
| Invocation | Appeler `layer.add_solid()` depuis un thread worker | `ae.schedule_task` pour rejouer la mutation |
| Handles | Ignorer les locks | Grabba sécurise via RAII |
| Erreurs | Exceptions silencieuses | Propagation via TaskScheduler + logs |

### 2. Endpoints Bridge (CEP ↔ Python)

Chaque endpoint est une fonction Python pure qui retourne un dictionnaire sérialisable. Le daemon l'enregistre et gère les transports (pipes, sockets, mailbox JSON). Côté CEP, tu appelles `bridge.send()` de façon asynchrone.

| Endpoint | Rôle | Requête minimale | Réponse clé |
| --- | --- | --- | --- |
| `mediasolution_apply_cuts_active_layer` | Parse un CSV et découpe le calque actif, recentre et colore les segments | `csv_path`, `frame_rate`, `comp_duration`, `snap_factor` (+ options) | `status`, `created`, `segments[]`, `notes[]` |
| `mediasolution_apply_auto_recentering` | Recentrage intelligent basé sur un JSON de tracking | `tracking_json_path`, `config` | `status`, `layers_updated`, `notes[]` |
| `ping` | Vérifie la santé du daemon avant un traitement lourd | `{}` | `status`, `timestamp`, `version`, `transport` |

#### Exemple CEP (async, non bloquant)

```javascript
async function applyCuts(params) {
  const result = await bridge.send('mediasolution_apply_cuts_active_layer', params);
  if (result.status === 'success') {
    updateUI(result.segments);
  } else {
    showError(result.error);
  }
}
```

#### Exemple Python (daemon)

```python
def mediasolution_apply_cuts_active_layer(csv_path, frame_rate, comp_duration,
                                         snap_factor, tracking_json_path, config):
    segments = parse_segments_from_csv_content(csv_path, frame_rate, snap_factor)
    tracking = _load_tracking_data_by_frame(tracking_json_path) if tracking_json_path else None

    created = []
    try:
        with ae.UndoGroup("MediaSolution Cuts"):
            for index, seg in enumerate(segments, start=1):
                layer = duplicate_active_layer(f"Segment_{index:03d}")
                layer.in_point = seg.start
                layer.out_point = seg.end

                if tracking and config.get('enable_intelligent_recentering'):
                    recenter_layer_from_tracking(layer, tracking, seg)

                if config.get('label_color'):
                    layer.label = config['label_color']

                created.append({
                    "start": seg.start,
                    "end": seg.end,
                    "layer_name": layer.name,
                    "recentered": bool(tracking),
                    "label_applied": config.get('label_color')
                })

            if config.get('delete_original'):
                ae.Layer.active_layer().delete()

    except Exception as exc:
        return {"status": "error", "error": str(exc), "created": 0, "segments": [],
                "notes": [f"ERROR: {exc}"]}

    return {"status": "success", "created": len(created), "segments": created,
            "notes": [f"SUCCESS: Created {len(created)} segments"]}
```

#### Codes d'erreur typiques

| Code | Quand | Action |
| --- | --- | --- |
| `INVALID_CSV` | CSV introuvable ou mal formé | Vérifie le chemin et l'encodage | 
| `INVALID_FRAME_RATE` | `frame_rate <= 0` | Corrige la configuration projet |
| `NO_ACTIVE_LAYER` | Aucun calque sélectionné | Demande à l'utilisateur de sélectionner la source |
| `PYSHIFTAE_ERROR` | Exception interne (TaskScheduler, AETK) | Inspecte les logs Python/AE |

### 3. Transport & Configuration

- **Transport primaire**: named pipe (`PyShiftBridge.sendCommand`).
- **Fallback universel**: Mailbox JSON (fichiers temporaires) pour contourner les restrictions d'I/O.
- **Flags CEP**: `enablePythonCutsParser`, `enablePythonRecentering`, `enablePythonProjectOpen`, `enablePythonBaseAepCreation`, `enableHealthCheck` sont routés via `host.updateRuntimeConfig(...)` pour activer sélectivement chaque endpoint.
- **Perf**: Parsing CSV <100 ms, création de segment ~50 ms, recentrage intelligent ~200 ms/segment; un batch de 10 segments prend ~1–2 s, UI toujours responsive.

## Mauvaises interprétations

1. **« CEP peut appeler PyShiftAE directement si la fonction est courte. »** Même 10 ms bloquent l'UI; tout passe par le Bridge asynchrone.
2. **« L'API Bridge suffit, inutile de respecter TaskScheduler. »** Les endpoints appellent quand même PyShiftAE; chaque handler doit rester thread-safe et planifier les mutations.
3. **« Les codes d'erreur sont optionnels, on peut lever `Exception`. »** Sans codes stables (`INVALID_FRAME_RATE`, `NO_ACTIVE_LAYER`), CEP ne peut pas afficher un diagnostic fiable.

## Trade-offs

| Approche | Vitesse | Fiabilité | Configuration | Cas idéal |
| --- | --- | --- | --- | --- |
| ExtendScript pur | ~10 s+ | ✅ Maximale | ✅ Aucune | Scripts simples et compatibilité totale |
| Hybrid 1.0 (Mailbox JSON) | ~2–3 s | ✅ Haute | 🟠 Moyenne | Transition douce avec fallback garanti |
| Hybrid 2.0 (PyShiftBridge) | ~200 ms | ✅ Haute | 🟠 Moyenne | Production, UX réactive, gros volumes |

- **Pourquoi garder le fallback**: certains environnements bloquent les pipes/sockets (permissions, antivirus). Le Bridge bascule alors automatiquement vers Mailbox JSON pour garantir l'exécution, quitte à perdre de la vitesse.
- **Quand choisir l'API native seule**: pour des scripts Python exécutés directement dans AE (sans CEP) ou pour des tests unitaires qui ne nécessitent pas d'UI.

## The Golden Rule: UI en CEP, mutations AE via PyShiftAE

Ne bloque jamais l'interface CEP avec des appels synchrones et ne touche jamais au SDK AE hors TaskScheduler. Construis ton expérience utilisateur côté CEP/JSX, orchestre la logique métier via PyShiftAE, et laisse PyShiftBridge faire le lien asynchrone entre les deux mondes.
