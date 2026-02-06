# Annexe C – Implémentation PyShiftAE — Shape Navigator & Architecture CEP Bridge

> **Note** : Ce document a été consolidé dans le [guide principal](./pyshiftae_guide.md). Cette annexe conserve le détail technique pour référence avancée.

## Partie 1 — Script Python “Shape Navigator” (navigation MatchName + écriture)

Le script ci-dessous est **exécutable dans l’environnement PyShiftAE** (il dépend de `pyshiftae/ae.py` et de `PyFx`), et respecte ta contrainte : **navigation via `PropertyGroup` → `DynamicStreamSuite`**.

Il fait :
- récupère le calque actif,
- descend récursivement dans `ADBE Root Vectors Group`,
- cherche un groupe `ADBE Vector Graphic - Fill`,
- modifie **l’opacité du Fill** (`ADBE Vector Fill Opacity`) si présent, sinon **la couleur** (`ADBE Vector Fill Color`),
- relit la valeur pour prouver l’écriture.

```python
# Shape Navigator - PyShiftAE
# Objectif: prouver la navigation MatchName + écriture d'une propriété simple (Fill Opacity/Color)
# Hypothèses: un Shape Layer (VectorLayer) est actif et contient au moins un Fill.

from __future__ import annotations

from typing import Iterator, Optional, Tuple, Union

import pyshiftae as ae


MatchName = str


def _try_get_by_matchname(group: ae.PropertyGroup, match_name: MatchName):
    """
    Safe helper:
    - évite d'appeler group.get_property(match_name) si le stream n'existe pas
    - utilise explicitement DynamicStreamSuite, puis PropertyFactory.
    """
    stream = group._dyn_suite.GetNewStreamRefByMatchname(group.property, match_name)
    if not stream:
        return None
    return ae.PropertyFactory.create_property(stream)


def iter_tree(group: ae.PropertyGroup, path: Tuple[ae.BaseProperty, ...] = ()) -> Iterator[Tuple[Tuple[ae.BaseProperty, ...], ae.BaseProperty]]:
    """
    Itère récursivement sur toute la hiérarchie des streams sous un PropertyGroup.
    Retourne (path, node) où path inclut node.
    """
    for i in range(group.num_properties()):
        node = group.get_property_by_index(i)
        node_path = path + (node,)
        yield node_path, node

        if isinstance(node, ae.PropertyGroup):
            yield from iter_tree(node, node_path)


def find_first_fill_group(root_vectors: ae.PropertyGroup) -> Optional[ae.PropertyGroup]:
    """
    Trouve le premier groupe Fill d'un Shape Layer.
    MatchName attendu côté AE: "ADBE Vector Graphic - Fill"
    """
    for _, node in iter_tree(root_vectors):
        if isinstance(node, ae.PropertyGroup) and node.match_name == "ADBE Vector Graphic - Fill":
            return node
    return None


def main() -> None:
    layer = ae.Layer.active_layer()
    if layer is None:
        raise RuntimeError("Aucun calque actif. Sélectionne un Shape Layer et relance.")

    root = _try_get_by_matchname(layer, "ADBE Root Vectors Group")
    if root is None or not isinstance(root, ae.PropertyGroup):
        raise RuntimeError("Le calque actif n'expose pas 'ADBE Root Vectors Group' (pas un Shape Layer ?).")

    print(f"[ShapeNavigator] Active layer: name='{layer.name}', matchName='{layer.match_name}'")
    print(f"[ShapeNavigator] Root vectors group: name='{root.name}', children={root.num_properties()}")

    fill_group = find_first_fill_group(root)
    if fill_group is None:
        raise RuntimeError("Aucun Fill trouvé (matchName 'ADBE Vector Graphic - Fill'). Ajoute un Fill dans le Shape Layer.")

    # 1) Essai: Opacity (OneD, souvent 0..100)
    fill_opacity = _try_get_by_matchname(fill_group, "ADBE Vector Fill Opacity")
    if isinstance(fill_opacity, ae.OneDProperty):
        before = fill_opacity.get_value(ae.LTimeMode.CompTime, 0.0, False)
        print(f"[ShapeNavigator] Fill Opacity before: {before}")

        new_value = 25.0 if before > 25.0 else 75.0
        fill_opacity.set_value(new_value)

        after = fill_opacity.get_value(ae.LTimeMode.CompTime, 0.0, False)
        print(f"[ShapeNavigator] Fill Opacity after: {after}")
        print("[ShapeNavigator] OK: écriture validée via StreamSuite.SetStreamValue (type OneD).")
        return

    # 2) Fallback: Color (RGBA 0..1)
    fill_color = _try_get_by_matchname(fill_group, "ADBE Vector Fill Color")
    if isinstance(fill_color, ae.ColorProperty):
        before = fill_color.get_value(ae.LTimeMode.CompTime, 0.0, False)
        print(f"[ShapeNavigator] Fill Color before (RGBA): {before}")

        new_color = (1.0, 0.2, 0.2, 1.0)  # rouge clair
        fill_color.set_value(new_color)

        after = fill_color.get_value(ae.LTimeMode.CompTime, 0.0, False)
        print(f"[ShapeNavigator] Fill Color after (RGBA): {after}")
        print("[ShapeNavigator] OK: écriture validée via StreamSuite.SetStreamValue (type COLOR).")
        return

    raise RuntimeError("Fill trouvé, mais ni Opacity ni Color n'ont été résolus comme streams primitifs settable.")


if __name__ == "__main__":
    main()
```

## Notes pratiques
- **Si la propriété est keyframée**, `SetStreamValue` peut être insuffisant (il faudrait alors passer par `KeyframeSuite` pour définir la valeur d’un KF). Ici l’objectif est juste de prouver le **write** sur un stream primitif.
- Le script s’appuie sur le fait que `ae.py` wrappe `StreamSuite.GetNewStreamValue` / `SetStreamValue` et que la navigation se fait via `DynamicStreamSuite.GetNewStreamRefByMatchname`.

---

# Partie 2 — Architecture “CEP Bridge” (solutions pour “Hooks” + “ExecuteScript” sans C++)

Comme tu ne peux pas exposer `AEGP_ExecuteScript` ni des hooks C++ vers Python, l’approche la plus pragmatique est :
- **CEP devient le “chef d’orchestre UI + Events + JSX runtime”**
- **Python (PyShiftAE) fait la logique outillée + opérations natives déjà exposées (streams primitifs, navigation matchName, etc.)**
- L’IPC CEP↔Python se fait via un mécanisme simple et robuste.

Ci-dessous deux options d’IPC, avec recommandation mise à jour.

## 2.0 Option “native” (PyInterface via Pipes/Sockets)

De nouveaux sources montrent une implémentation “CEP-friendly” côté créateur via `PyInterface.ts` (CEPy-Resources) qui ouvre un `net.Socket` vers un **pipe nommé** (Windows: `\\.\pipe\<name>`) ou un **Unix domain socket** (macOS/Linux: fichier socket, typiquement `/tmp/<name>`).

### Conséquence
- Si **le binaire PyShiftAE** que tu utilises expose déjà ce serveur (pipe/socket), alors notre “Mailbox JSON” devient un **fallback** et non plus la voie principale.
- On obtient un modèle **request/response** sans polling disque, plus adapté au temps réel (sliders, souris, scrubbing).

### Points d’attention
- Il faut que l’environnement CEP autorise `require("net")` (Node intégré CEP).
- Il faut connaître le **nom** (souvent lié au `Manifest.name` côté PyShiftAE/CEPy) et le **type** (pipe Windows vs UDS Unix).

### Format de payload (observé)
`PyInterface.ts` envoie des lignes JSON avec la forme:
```json
{ "endpoint": "Response", "functionName": "<func>", "args": {"param1": "..."} }
```

## 2.0.b Recommandation (Hybrid 2.0)

- **Chemin A (prioritaire)**: CEP -> Pipe/Socket -> Python embarqué (PyShiftAE) pour les commandes rapides.
- **Chemin B (fallback)**: Mailbox JSON sur disque pour compatibilité / debug / plateformes où le pipe n’est pas présent.
- **Retour Python -> CEP**:
  - **Minimum viable**: réponse directe sur la socket (request/response).
  - **Optionnel**: si un binaire intègre l’envoi d’événements CEP (via `PlugPlugDispatchEvent` / PlugPlug), pousser des événements CSXS nativement.

---

## 2.1 Communication CEP → Python (mailbox JSON)

### Principe
- **CEP écrit** des requêtes dans un fichier `cep_to_py.json`
- **Python bridge** (un thread de polling) lit, traite, puis écrit la réponse dans `py_to_cep.json`

Cette option reste utile comme fallback simple (KISS), mais elle a une latence structurelle (polling + I/O disque).

---

**Dossiers**
- **Bridge dir** (commun CEP + Python) : par exemple  
  `~/Documents/PyShiftAE_CEP_Bridge/`
- Fichiers :
  - `cep_to_py.json` (requêtes)
  - `py_to_cep.json` (réponses)
  - `jsx/` (scripts générés)

**Format JSON (requête)**
```json
{
  "id": "1700000000-001",
  "type": "run_python",
  "payload": {
    "entrypoint": "shape_navigator",
    "args": { "mode": "set_fill_opacity", "value": 25.0 }
  }
}
```

**Format JSON (réponse)**
```json
{
  "id": "1700000000-001",
  "ok": true,
  "result": { "message": "done" },
  "error": null
}
```

### Pseudo-code CEP (JS)
```javascript
// CEP side (panel.js)
const cs = new CSInterface();
const fs = require("fs");
const path = require("path");

const BRIDGE_DIR = path.join(process.env.HOME, "Documents", "PyShiftAE_CEP_Bridge");
const CEP_TO_PY = path.join(BRIDGE_DIR, "cep_to_py.json");
const PY_TO_CEP = path.join(BRIDGE_DIR, "py_to_cep.json");

function atomicWriteJson(filePath, obj) {
  const tmp = filePath + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(obj, null, 2), "utf8");
  fs.renameSync(tmp, filePath);
}

function sendCommandToPython(type, payload) {
  const id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  atomicWriteJson(CEP_TO_PY, { id, type, payload });
  return id;
}

function pollPythonResponses() {
  if (!fs.existsSync(PY_TO_CEP)) return;
  try {
    const raw = fs.readFileSync(PY_TO_CEP, "utf8");
    const msg = JSON.parse(raw);
    // -> router par msg.id, msg.ok, msg.result/msg.error
  } catch (e) {
    // log panel
  }
}

setInterval(pollPythonResponses, 200);
```

### Pseudo-code Python (Bridge thread)
```python
# Python side (bridge_daemon.py) - à lancer UNE fois depuis PyShiftAE pour rester résident
import json
import os
import threading
import time

BRIDGE_DIR = os.path.expanduser("~/Documents/PyShiftAE_CEP_Bridge")
CEP_TO_PY = os.path.join(BRIDGE_DIR, "cep_to_py.json")
PY_TO_CEP = os.path.join(BRIDGE_DIR, "py_to_cep.json")

def atomic_write_json(path, obj):
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(obj, f, indent=2)
    os.replace(tmp, path)

def handle_message(msg):
    msg_type = msg.get("type")
    payload = msg.get("payload", {})

    if msg_type == "run_python":
        entrypoint = payload["entrypoint"]
        # exemple: dispatcher vers des fonctions internes
        if entrypoint == "shape_navigator":
            # ici tu appelles ton code basé sur pyshiftae
            # (les appels AE SDK seront marshaled par les suites PyFx/TaskScheduler)
            return {"message": "shape_navigator executed"}
        return {"message": f"unknown entrypoint: {entrypoint}"}

    return {"message": f"unknown type: {msg_type}"}

def watcher_loop():
    last_id = None
    while True:
        if os.path.exists(CEP_TO_PY):
            try:
                with open(CEP_TO_PY, "r", encoding="utf-8") as f:
                    msg = json.load(f)
                if msg.get("id") != last_id:
                    last_id = msg.get("id")
                    try:
                        result = handle_message(msg)
                        atomic_write_json(PY_TO_CEP, {"id": last_id, "ok": True, "result": result, "error": None})
                    except Exception as e:
                        atomic_write_json(PY_TO_CEP, {"id": last_id, "ok": False, "result": None, "error": str(e)})
            except Exception:
                pass
        time.sleep(0.2)

def start_bridge():
    t = threading.Thread(target=watcher_loop, daemon=True)
    t.start()
```

---

## 2.2 Workflow “Events / Hooks” (simuler des hooks via CEP)

AE n’expose pas toujours des hooks riches côté PyShiftAE, donc l’approche fiable est :

- **CEP “observe”** un état (sélection, calque actif, comp active) via `evalScript`
- CEP compare avec la valeur précédente
- Si changement, CEP écrit une commande `run_python` dans la mailbox

### Exemple CEP : poll sélection active
```javascript
let lastSignature = null;

function getSelectionSignature(cb) {
  const jsx = `
    (function(){
      var comp = app.project.activeItem;
      if (!(comp instanceof CompItem)) return "NO_COMP";
      if (comp.selectedLayers.length === 0) return "NO_LAYER";
      var l = comp.selectedLayers[0];
      return "LAYER:" + l.index + ":" + l.name;
    })();
  `;
  cs.evalScript(jsx, cb);
}

setInterval(() => {
  getSelectionSignature((sig) => {
    if (sig !== lastSignature) {
      lastSignature = sig;
      sendCommandToPython("run_python", {
        entrypoint: "shape_navigator",
        args: { event: "selection_changed", signature: sig }
      });
    }
  });
}, 300);
```

**Ce que ça te donne**
- Un “hook” de sélection **fonctionnel** (polling), sans C++.
- Tu peux faire la même chose pour :
  - calque actif,
  - temps courant,
  - comp active,
  - etc.

---

## 2.3 Workflow “ExecuteScript” (Python génère JSX, CEP exécute via `evalScript`, renvoie résultat)

Comme Python ne peut pas appeler `AEGP_ExecuteScript`, on inverse le contrôle :

- **Python écrit** `some_task.jsx` dans `BRIDGE_DIR/jsx/`
- Python envoie une commande `eval_jsx_file` à CEP (via mailbox inverse)
- **CEP lit le fichier** et exécute `cs.evalScript(content, callback)`
- CEP écrit la réponse dans `py_to_cep.json`

### Mailbox inverse minimale
- `py_to_cep_request.json` : Python → CEP (requêtes CEP)
- `cep_to_py_response.json` : CEP → Python (réponses)

### Pseudo-code Python : demander l’exécution d’un JSX
```python
import json
import os
import time
import uuid

BRIDGE_DIR = os.path.expanduser("~/Documents/PyShiftAE_CEP_Bridge")
PY_TO_CEP_REQ = os.path.join(BRIDGE_DIR, "py_to_cep_request.json")
CEP_TO_PY_RESP = os.path.join(BRIDGE_DIR, "cep_to_py_response.json")
JSX_DIR = os.path.join(BRIDGE_DIR, "jsx")

def atomic_write_json(path, obj):
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(obj, f, indent=2)
    os.replace(tmp, path)

def request_eval_jsx(jsx_source: str, timeout_s: float = 5.0) -> str:
    os.makedirs(JSX_DIR, exist_ok=True)

    req_id = str(uuid.uuid4())
    jsx_path = os.path.join(JSX_DIR, f"{req_id}.jsx")
    with open(jsx_path, "w", encoding="utf-8") as f:
        f.write(jsx_source)

    atomic_write_json(PY_TO_CEP_REQ, {
        "id": req_id,
        "type": "eval_jsx_file",
        "payload": {"path": jsx_path}
    })

    deadline = time.time() + timeout_s
    while time.time() < deadline:
        if os.path.exists(CEP_TO_PY_RESP):
            with open(CEP_TO_PY_RESP, "r", encoding="utf-8") as f:
                resp = json.load(f)
            if resp.get("id") == req_id:
                if not resp.get("ok"):
                    raise RuntimeError(resp.get("error") or "CEP evalScript failed")
                return resp.get("result") or ""
        time.sleep(0.1)

    raise TimeoutError("No response from CEP")
```

### Pseudo-code CEP : exécuter le `.jsx` et renvoyer le résultat
```javascript
const PY_TO_CEP_REQ = path.join(BRIDGE_DIR, "py_to_cep_request.json");
const CEP_TO_PY_RESP = path.join(BRIDGE_DIR, "cep_to_py_response.json");

function pollPyRequests() {
  if (!fs.existsSync(PY_TO_CEP_REQ)) return;

  let req;
  try {
    req = JSON.parse(fs.readFileSync(PY_TO_CEP_REQ, "utf8"));
  } catch (e) {
    return;
  }

  if (req.type === "eval_jsx_file") {
    const jsxPath = req.payload.path;
    const jsxSource = fs.readFileSync(jsxPath, "utf8");

    cs.evalScript(jsxSource, (result) => {
      atomicWriteJson(CEP_TO_PY_RESP, {
        id: req.id,
        ok: true,
        result: String(result),
        error: null
      });
    });
  }
}

setInterval(pollPyRequests, 200);
```

---

# Recommandations (pour éviter les pièges)
- **Validation stricte des commandes** côté Python (whitelist `type` + `entrypoint`). Ne pas accepter “code arbitraire”.
- **Atomic writes** (tmp + rename) pour éviter les JSON partiellement écrits.
- **Timeouts** sur les appels “synchro” (Python attendant CEP).
- **Performance** : pour simuler des hooks, préfère un polling CEP à 200–500 ms, pas 10 ms.
- **Threading** : si ton bridge Python tourne dans un thread, laisse les appels AE passer via les suites (`StreamSuite`/`DynamicStreamSuite`) qui marshal déjà vers le main thread via le scheduler interne.

---

## Statut
- **Partie 1**: script Python complet fourni (navigation `MatchName` + modification d’un Fill en écriture).
- **Partie 2**: architecture CEP Bridge définie (IPC file-mailbox, “hooks” simulés via polling CEP, exécution JSX via `evalScript` avec retour de résultat).
