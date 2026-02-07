# Cookbook : Patterns d'Implémentation PyShiftAE

**TL;DR**: Deux patterns fondamentaux pour l'automatisation After Effects avec PyShiftAE : navigation dans l'arbre des propriétés via MatchName, et architecture bridge hybride pour la communication CEP↔Python.

---

## Pattern 1 : Navigation dans l'arbre des propriétés (Shape Navigator)

### Problème

Vous devez accéder et modifier des propriétés spécifiques d'un Shape Layer dans After Effects, mais l'arbre des propriétés est complexe et hiérarchique. Comment naviguer efficacement et modifier les bonnes propriétés sans tout parcourir manuellement ?

### Solution

```python
# Shape Navigator - PyShiftAE
# Navigation récursive dans l'arbre des propriétés via MatchName

from __future__ import annotations
from typing import Iterator, Optional, Tuple
import pyshiftae as ae

MatchName = str

def _try_get_by_matchname(group: ae.PropertyGroup, match_name: MatchName):
    """Accès sécurisé via DynamicStreamSuite"""
    stream = group._dyn_suite.GetNewStreamRefByMatchname(group.property, match_name)
    if not stream:
        return None
    return ae.PropertyFactory.create_property(stream)

def iter_tree(group: ae.PropertyGroup, path: Tuple[ae.BaseProperty, ...] = ()) -> Iterator[Tuple[Tuple[ae.BaseProperty, ...], ae.BaseProperty]]:
    """Itération récursive sur toute la hiérarchie"""
    for i in range(group.num_properties()):
        node = group.get_property_by_index(i)
        node_path = path + (node,)
        yield node_path, node
        
        if isinstance(node, ae.PropertyGroup):
            yield from iter_tree(node, node_path)

def find_first_fill_group(root_vectors: ae.PropertyGroup) -> Optional[ae.PropertyGroup]:
    """Trouve le premier groupe Fill (MatchName: "ADBE Vector Graphic - Fill")"""
    for _, node in iter_tree(root_vectors):
        if isinstance(node, ae.PropertyGroup) and node.match_name == "ADBE Vector Graphic - Fill":
            return node
    return None

def modify_fill_properties():
    """Modification des propriétés Fill (Opacité ou Couleur)"""
    layer = ae.Layer.active_layer()
    if layer is None:
        raise RuntimeError("Aucun calque actif. Sélectionnez un Shape Layer.")

    root = _try_get_by_matchname(layer, "ADBE Root Vectors Group")
    if root is None or not isinstance(root, ae.PropertyGroup):
        raise RuntimeError("Le calque n'expose pas 'ADBE Root Vectors Group'")

    fill_group = find_first_fill_group(root)
    if fill_group is None:
        raise RuntimeError("Aucun Fill trouvé dans le Shape Layer")

    # Essai 1: Modifier l'opacité
    fill_opacity = _try_get_by_matchname(fill_group, "ADBE Vector Fill Opacity")
    if isinstance(fill_opacity, ae.OneDProperty):
        before = fill_opacity.get_value(ae.LTimeMode.CompTime, 0.0, False)
        new_value = 25.0 if before > 25.0 else 75.0
        fill_opacity.set_value(new_value)
        after = fill_opacity.get_value(ae.LTimeMode.CompTime, 0.0, False)
        print(f"Fill Opacity: {before} → {after}")
        return

    # Fallback: Modifier la couleur
    fill_color = _try_get_by_matchname(fill_group, "ADBE Vector Fill Color")
    if isinstance(fill_color, ae.ColorProperty):
        before = fill_color.get_value(ae.LTimeMode.CompTime, 0.0, False)
        new_color = (1.0, 0.2, 0.2, 1.0)  # rouge clair
        fill_color.set_value(new_color)
        after = fill_color.get_value(ae.LTimeMode.CompTime, 0.0, False)
        print(f"Fill Color: {before} → {after}")
        return

    raise RuntimeError("Fill trouvé mais aucune propriété modifiable détectée")

if __name__ == "__main__":
    modify_fill_properties()
```

### Pourquoi ça marche

Ce pattern fonctionne parce qu'il utilise les API natives d'After Effects :

1. **DynamicStreamSuite.GetNewStreamRefByMatchname()** : Accès direct aux propriétés par leur MatchName, sans navigation manuelle
2. **PropertyFactory.create_property()** : Création d'objets Python typés (OneDProperty, ColorProperty) depuis les streams AE
3. **Navigation récursive** : Parcourt automatiquement toute la hiérarchie `ADBE Root Vectors Group` pour trouver les cibles
4. **StreamSuite.SetStreamValue()** : Écriture directe dans les propriétés AE via le scheduler interne

Le résultat : une navigation fiable et des modifications directes sans passer par l'interface utilisateur.

---

## Pattern 2 : Architecture Bridge Hybrid 2.0 (CEP ↔ Python)

### Problème

Vous avez une interface CEP (HTML/JS) et une logique PyShiftAE (Python), mais After Effects n'expose pas `AEGP_ExecuteScript` ni de hooks C++ vers Python. Comment faire communiquer les deux mondes de manière fiable et performante ?

### Solution

```javascript
// CEP side - PyInterface via Pipes/Sockets (chemin prioritaire)
const net = require("net");
const path = require("path");

class PyInterface {
    constructor(pipeName = "pyshift_default") {
        this.pipeName = pipeName;
        this.socket = null;
        this.pending = new Map();
        this.messageId = 0;
    }

    connect() {
        const pipePath = process.platform === 'win32' 
            ? `\\\\.\\pipe\\${this.pipeName}`
            : `/tmp/${this.pipeName}`;
            
        this.socket = net.createConnection(pipePath);
        this.socket.on('data', (data) => this.handleResponse(data.toString()));
    }

    send(func, args) {
        return new Promise((resolve, reject) => {
            const id = ++this.messageId;
            this.pending.set(id, { resolve, reject });
            
            const payload = {
                endpoint: "Response",
                functionName: func,
                args: args
            };
            
            this.socket.write(JSON.stringify(payload) + '\n');
        });
    }

    handleResponse(data) {
        const lines = data.trim().split('\n');
        lines.forEach(line => {
            try {
                const response = JSON.parse(line);
                const pending = this.pending.get(response.id);
                if (pending) {
                    if (response.error) {
                        pending.reject(new Error(response.error));
                    } else {
                        pending.resolve(response.result);
                    }
                    this.pending.delete(response.id);
                }
            } catch (e) {
                console.error('Invalid response:', line);
            }
        });
    }
}

// Fallback Mailbox JSON (si pipe/socket non disponible)
class MailboxJSON {
    constructor(bridgeDir) {
        this.bridgeDir = bridgeDir;
        this.cepToPy = path.join(bridgeDir, "cep_to_py.json");
        this.pyToCep = path.join(bridgeDir, "py_to_cep.json");
    }

    async sendCommand(func, args) {
        const id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const payload = { id, type: "run_python", payload: { entrypoint: func, args } };
        
        this.atomicWrite(this.cepToPy, payload);
        return this.waitForResponse(id);
    }

    atomicWrite(filePath, obj) {
        const tmp = filePath + ".tmp";
        fs.writeFileSync(tmp, JSON.stringify(obj, null, 2), "utf8");
        fs.renameSync(tmp, filePath);
    }

    async waitForResponse(id, timeout = 5000) {
        const deadline = Date.now() + timeout;
        while (Date.now() < deadline) {
            if (fs.existsSync(this.pyToCep)) {
                try {
                    const response = JSON.parse(fs.readFileSync(this.pyToCep, "utf8"));
                    if (response.id === id) {
                        if (response.ok) return response.result;
                        throw new Error(response.error);
                    }
                } catch (e) {
                    // Continue waiting
                }
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        throw new Error("Timeout waiting for Python response");
    }
}

// Usage dans le panel CEP
async function modifyShapeFill() {
    const transport = pipeAvailable ? new PyInterface("pyshift_default") : new MailboxJSON(bridgeDir);
    
    try {
        await transport.connect(); // pour PyInterface
        const result = await transport.send("modify_fill_properties", {});
        console.log("Shape modified:", result);
    } catch (error) {
        console.error("Bridge error:", error);
    }
}
```

```python
# Python side - Bridge Daemon
import json
import os
import threading
import time
from typing import Dict, Any

class BridgeDaemon:
    def __init__(self, bridge_dir: str = None):
        self.bridge_dir = bridge_dir or os.path.expanduser("~/Documents/PyShiftAE_CEP_Bridge")
        self.cep_to_py = os.path.join(self.bridge_dir, "cep_to_py.json")
        self.py_to_cep = os.path.join(self.bridge_dir, "py_to_cep.json")
        self.running = False
        
    def handle_command(self, command: Dict[str, Any]) -> Dict[str, Any]:
        """Dispatch des commandes CEP vers les fonctions PyShiftAE"""
        func_name = command.get('functionName')
        args = command.get('args', {})
        
        try:
            if func_name == "modify_fill_properties":
                # Import et appel de notre fonction Shape Navigator
                from shape_navigator import modify_fill_properties
                result = modify_fill_properties()
                return {"status": "success", "result": result}
            else:
                return {"status": "error", "message": f"Unknown function: {func_name}"}
        except Exception as e:
            return {"status": "error", "message": str(e)}
    
    def atomic_write_json(self, path: str, obj: Dict[str, Any]):
        """Écriture atomique pour éviter les JSON corrompus"""
        tmp = path + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(obj, f, indent=2)
        os.replace(tmp, path)
    
    def start_mailbox_watcher(self):
        """Surveillance du fichier mailbox (fallback)"""
        self.running = True
        last_id = None
        
        def watcher_loop():
            nonlocal last_id
            while self.running:
                if os.path.exists(self.cep_to_py):
                    try:
                        with open(self.cep_to_py, "r", encoding="utf-8") as f:
                            command = json.load(f)
                        
                        if command.get("id") != last_id:
                            last_id = command.get("id")
                            result = self.handle_command(command)
                            
                            response = {
                                "id": last_id,
                                "ok": result.get("status") == "success",
                                "result": result.get("result"),
                                "error": result.get("message") if result.get("status") == "error" else None
                            }
                            
                            self.atomic_write_json(self.py_to_cep, response)
                    except Exception as e:
                        error_response = {
                            "id": last_id,
                            "ok": False,
                            "result": None,
                            "error": str(e)
                        }
                        self.atomic_write_json(self.py_to_cep, error_response)
                
                time.sleep(0.2)  # Polling à 200ms
        
        thread = threading.Thread(target=watcher_loop, daemon=True)
        thread.start()
        return thread

# Démarrage du bridge
if __name__ == "__main__":
    bridge = BridgeDaemon()
    bridge.start_mailbox_watcher()
    
    # Le bridge reste en arrière-plan
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        bridge.running = False
```

### Pourquoi ça marche

Cette architecture hybride résout le problème de communication CEP↔Python :

1. **Chemin prioritaire (Pipes/Sockets)** : Communication temps réel via `net.Socket` de Node.js vers un pipe nommé Windows ou Unix domain socket. Latence ~1-5ms, idéal pour les interactions UI (sliders, souris).

2. **Fallback robuste (Mailbox JSON)** : Si les pipes ne sont pas disponibles, le système bascule automatiquement vers des fichiers JSON avec écriture atomique. Plus lent (~200ms) mais fiable.

3. **Request/Response asynchrone** : Les commandes CEP envoient des requêtes JSON et attendent des réponses, permettant un workflow bidirectionnel sans blocage.

4. **Dispatch centralisé** : Le bridge Python maintient un registre de fonctions PyShiftAE accessibles, avec validation des arguments et gestion d'erreurs.

5. **Threading safe** : Le watcher Python tourne dans un thread daemon, les appels AE SDK sont marshaled automatiquement par PyShiftAE vers le main thread.

Le résultat : une architecture complète qui permet à CEP de contrôler PyShiftAE en temps réel, avec fallback automatique et gestion d'erreurs robuste.

---

## Recommandations d'implémentation

### Validation et sécurité
- **Whitelist stricte** des fonctions Python accessibles depuis CEP
- **Validation d'arguments** côté Python avant exécution
- **Timeouts** sur les appels synchrones pour éviter les blocages

### Performance
- **Priorité absolue** au transport pipe/socket pour les interactions UI
- **Polling CEP** à 200-500ms pour les hooks simulés, pas plus fréquent
- **Batch writes** pour les opérations multiples sur les propriétés AE

### Robustesse
- **Écritures atomiques** (tmp + rename) pour tous les fichiers JSON
- **Gestion d'erreurs** explicite avec messages contextuels
- **Fallback automatique** si le transport principal n'est pas disponible

### Développement
- **Logging détaillé** des échanges CEP↔Python pour debug
- **Tests unitaires** des fonctions PyShiftAE indépendamment du bridge
- **Mock objects** CEP pour développement sans After Effects

Ces deux patterns fournissent une base solide pour l'automatisation After Effects moderne avec PyShiftAE et CEP.
