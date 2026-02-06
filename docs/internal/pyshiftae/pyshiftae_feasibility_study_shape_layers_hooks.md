# Annexe A – Étude de Faisabilité PyShiftAE — Shape Layers & Hooks

> **Note** : Ce document a été consolidé dans le [guide principal](./pyshiftae_guide.md). Cette annexe conserve le détail technique pour référence avancée.

## Axe 1 — Manipulation des Shape Layers (Vectors)

### 1.1 Exploration par MatchName (descente dans l'arbre)

**Constat code (Python + C++)**
- Côté Python, `PropertyGroup.get_property(name)` appelle **directement** `PyFx.DynamicStreamSuite().GetNewStreamRefByMatchname(self.property, name)` (cf. `PyShiftAE/Python/pyshiftae/ae.py`).
- Côté C++, `DynamicStreamSuite::GetNewStreamRefByMatchname(...)` wrappe bien l'API SDK `AEGP_GetNewStreamRefByMatchname(...)` (cf. `AETK-main/AETK/src/AEGP/Core/Suites.cpp`).

**Conclusion**
- Oui, **tu peux dès maintenant en Python** descendre dans la hiérarchie d'un Shape Layer via *matchName* (`ADBE Root Vectors Group` → `ADBE Vector Group` → `ADBE Vectors Group` → etc.) **tant que** ces nœuds sont exposés comme des *streams* dynamiques.

**Limite pratique importante**
- `GetNewStreamRefByMatchname` est ambigu dès qu'il y a plusieurs enfants avec le même matchName (ex: plusieurs `ADBE Vector Group`). Dans ce cas, il faut itérer par index (`get_property_by_index`) pour cibler précisément le bon groupe.

**Verdict (1.1)**  
🟢 **Faisable en Python pur**

**Exemple Python (théorique)**
```python
import pyshiftae as ae

layer = ae.Layer.active_layer()  # idéalement un Shape Layer sélectionné
root = layer.get_property("ADBE Root Vectors Group")  # Contents

# Dump récursif (utile pour confirmer l'arbre réel renvoyé par AEGP)
def dump(pg, indent=0):
    for i in range(pg.num_properties()):
        p = pg.get_property_by_index(i)
        print("  " * indent, i, p.match_name, p.name, p.type, p.group_type)
        if isinstance(p, ae.PropertyGroup):
            dump(p, indent + 1)

dump(root)
```

---

### 1.2 Le problème des Paths (Bezier) : Shape Path != Mask Path

#### Ce que l'API actuelle expose réellement
1) **Mask Path (masques)**
- `MaskOutlineSuite` est bindé côté `PyFx` (cf. `PyFx.hpp` : `bind_mask_outline_suite`) et expose :
  - `getMaskOutlineVertexInfo`, `setMaskOutlineVertexInfo`, feathers, open/closed, etc.
- **Mais** le chaînage actuel `StreamValue2 -> MaskOutline` est **incomplet** :
  - `AEGP_StreamType_MASK` existe bien (cf. `Headers/AE_GeneralPlug.h`).
  - Pourtant `StreamValue2::value()` (cf. `AETK-main/AETK/src/AEGP/Core/Types.cpp`) ne gère que :
    - `OneD`, `TwoD`, `ThreeD`, `COLOR`
    - et retourne `0` sinon.
  - Donc, côté Python, `MaskOutlineProperty.get_value()` (`PyFx.MaskOutline(val.value())`) **ne peut pas fonctionner correctement** tant que `StreamType::MASK` n'est pas réellement converti en `MaskOutlineValPtr`.

2) **Shape Path (ADBE Vector Shape)**
- Dans le SDK, les streams non-primitifs passent typiquement par `AEGP_StreamType_ARB` (**présent** dans `AE_GeneralPlug.h`).
- Ton binding `StreamValue2` **ne supporte pas** `ARB` :
  - `PyFx.hpp` bind `StreamValue2` avec `std::variant<OneD, TwoD, ThreeD, Color>` uniquement.
  - `Types.cpp` ne traite pas `StreamType::ARB`.
- Donc **aucune structure vertices/tangentes** n'est exposée pour les *Shape Paths* via l'API actuelle.

#### Implication
- **Manipuler finement un chemin vectoriel (vertices/inTangents/outTangents)** d'un Shape Layer est **non faisable aujourd'hui** via Python avec ces bindings.

**Verdict (1.2)**  
🔴 **Très complexe / nécessite refonte** *(si ton objectif est "éditer des vertices/tangentes de Shape Path" en Python natif)*

#### Modifs C++ "possibles", mais non triviales (si tu veux quand même)
Pour rendre ça faisable "proprement", il faut au minimum :

- **Étendre `StreamValue2`** pour supporter les types non primitifs :
  - Fichiers :
    - `AETK-main/AETK/AEGP/Core/Types.hpp` (signature + variant)
    - `AETK-main/AETK/src/AEGP/Core/Types.cpp` (`StreamValue2::value()` + construction inverse)
    - `AETK-main/AETK/AEGP/Core/PyFx.hpp` (binding pybind11 du nouveau variant)
- **Ajouter une abstraction ARB** :
  - Exposer `AEGP_ArbBlockVal` (handle) en Python, au moins sous forme :
    - `bytes` (blob brut) + helpers lock/unlock
- **Mais**: il manque ensuite l'étape la plus dure : **interpréter / reconstruire** le contenu ARB en structure "Shape" (vertices/tangentes/closed). Sans suite dédiée ou spec publique du payload ARB "shape", tu pars sur :
  - reverse engineering,
  - ou appels internes non documentés,
  - donc coût/risques élevés (crashes AE, compat versions).

#### Nuance importante (ce qui reste faisable malgré tout)
Même sans toucher aux bezier "freeform", tu peux souvent faire beaucoup avec :
- **shapes paramétriques** (Rect/Ellipse/Polystar) dont les sous-propriétés sont primitives (size, position, roundness…)
- **opérateurs** (Trim Paths, Repeater, Stroke, Fill) qui exposent aussi des streams primitives (OneD/Color/etc.)
=> Ça donne une "manipulation shape avancée" **partielle**, mais pas l'édition de vertices.

**Verdict global Axe 1**  
🟠 **Faisable en Python pur pour la navigation + operators + param shapes**  
🔴 **Pour l'édition de bezier vertices/tangentes (Shape Path)**

---

## Axe 2 — Architecture Event‑Driven (Hooks)

### 2.1 Hooks existants
`AETK/AEGP/Template/Plugin.hpp` fournit :
- `CommandHook` (clic menu)
- `UpdateMenuHook`
- `IdleHook`

Ils appellent `Command::execute()`, `Command::updateMenu()`, et `Plugin::onIdle()` sur l'instance C++.

**Verdict (2.1)**  
🟢 **Côté C++ : déjà là**

---

### 2.2 Pont C++ -> Python : stocker un callback Python et l'appeler depuis IdleHook
**Faisabilité technique**
- Oui, avec `pybind11`, tu peux accepter un `py::function` depuis Python, le stocker (ex: `py::object`/`py::function`) et le rappeler dans `onIdle()` ou lors d'un `execute()` de commande.
- Points impératifs :
  - Acquisition GIL lors de l'appel : `py::gil_scoped_acquire`
  - `try/catch` autour de l'appel pour éviter qu'une exception Python ne remonte dans AE.

**Mais**: dans ce bundle, le **code source du vrai plugin PyShiftAE** est manquant (symlink cassé, comme noté dans ton rapport). Donc :
- l'architecture est faisable,
- mais l'implémentation doit se faire dans le **plugin `.aex` réel** (ou un plugin AETK dérivé) puis recompiler.

**Verdict (2.2)**  
🟠 **Faisable avec modifs C++ mineures à modérées** *(pybind + stockage callbacks + appel depuis hooks)*

---

### 2.3 Complexité pour `ae.register_hook("idle", f)`
#### Où coder / quels fichiers toucher
Tu as 2 stratégies :

1) **Sans toucher `Plugin.hpp`**
- Tu implémentes ça dans **la classe plugin concrète** (celle qui dérive de `Plugin`) :
  - stocke une map `event -> py::function`
  - appelle les callbacks dans `onIdle()` / `Command::execute()`
- Tu exposes `register_hook` via `PYBIND11_EMBEDDED_MODULE(PyFx, m)` :
  - fichier : `AETK-main/AETK/AEGP/Core/PyFx.hpp` (ajout d'une fonction bindée qui écrit dans le registry C++)

2) **En modifiant `Plugin.hpp`**
- Possible mais je ne le recommande pas : `Plugin.hpp` est un template générique.
- Tu risques d'"infecter" le toolkit avec une dépendance Python/GIL partout.

#### Risque Main Thread (important)
- `IdleHook` est sur le **main thread AE**.
- Si ton callback Python prend 50–200 ms, AE va "lagger" (menus, UI, timeline).
- Mitigation recommandée :
  - N'exécuter que des callbacks **courts**
  - Pour le lourd : lancer un worker thread Python et ne faire dans `onIdle` que l'application de micro-changements (pattern TaskScheduler / micro‑tâches)

**Verdict (2.3)**  
🟠 **Faisable avec modifs C++ mineures**, mais **discipline perf obligatoire** (sinon freeze AE)

**Exemple Python (théorique)**
```python
import pyshiftae as ae
import PyFx

def on_idle():
    # DOIT rester très court
    layer = ae.Layer.active_layer()
    if layer:
        pass

PyFx.register_hook("idle", on_idle)  # à implémenter côté C++/pybind
```

---

## Axe 3 — Alternative "Hybrid Scripting" (Plan B)

### Vérification : `AEGP_ExecuteScript` exposé à Python ?
- `AEGP_ExecuteScript` existe bien dans `AEGP_UtilitySuite6` (cf. `Headers/AE_GeneralPlug.h`).
- Mais côté binding `PyFx` :
  - `bind_utility_suite` (dans `PyFx.hpp`) **ne bind pas** de méthode `executeScript`
  - et l'implémentation `UtilitySuite::...` dans `Suites.cpp` ne montre pas de wrapper `ExecuteScript`.

**Conclusion**
- **Pas viable immédiatement** en Python "pur" avec l'API actuelle, car la fonction n'est pas exposée.

**Verdict (Axe 3)**  
🟠 **Faisable avec modifs C++ mineures**

### Modifs C++ minimales recommandées
- Ajouter un wrapper `UtilitySuite::executeScript(script: std::string, platformEncoding: bool) -> (result, error)` qui :
  - appelle `UtilitySuite6()->AEGP_ExecuteScript(...)`
  - convertit les `AEGP_MemHandle` en `std::string` (comme `memHandleToString`)
  - libère les handles
- Fichiers à toucher :
  - `AETK-main/AETK/AEGP/Core/Suites.hpp` (déclaration)
  - `AETK-main/AETK/src/AEGP/Core/Suites.cpp` (implémentation)
  - `AETK-main/AETK/AEGP/Core/PyFx.hpp` (bind pybind11 dans `bind_utility_suite`)
  - (optionnel mais recommandé) `AETK-main/AETK/PyFx.pyi` pour le typing

**Exemple Python (théorique)**
```python
import PyFx

jsx = r"""
(function(){
  var comp = app.project.activeItem;
  if (!(comp instanceof CompItem)) return "no comp";
  // ... manipulation shapes avancée via ExtendScript ...
  return "ok";
})();
"""

result, err = PyFx.UtilitySuite().executeScript(jsx, False)
if err:
    raise RuntimeError(err)
print(result)
```

---

## Axe 4 — Architecture "Hybrid 2.0" (CEP Bridge + Pipes)

### 4.1 Découverte du transport natif PyInterface
L'analyse des nouveaux sources "Repomix" révèle une implémentation native côté créateur :
- **`CEPy-Resources/PyInterface.ts`** expose une communication via **named pipes** (Windows) ou **Unix domain sockets** (macOS/Linux)
- **Format JSON** newline-delimited : `{endpoint: "Response|NoResponse", functionName: "...", args: {...}}`
- **Cross-platform** : `net.Socket` avec détection automatique du type de transport

### 4.2 Impact sur l'architecture CEP ↔ Python
**Avant (Mailbox JSON seule)** :
```
CEP → fichier cep_to_py.json → polling bridge_daemon.py → Python → fichier py_to_cep.json → CEP
```

**Maintenant (Hybrid 2.0)** :
```
CEP → [Pipe/Socket] → PyShiftAE (natif) → réponse directe sur pipe
     → fallback mailbox JSON si pipe indisponible
```

### 4.3 Avantages du mode Pipe/Socket
- **Latence quasi nulle** : request/response direct sans polling
- **Temps réel** : adapté pour sliders, souris, interactions continues
- **Moins d'I/O disque** : pas de fichiers temporaires
- **Robustesse** : fallback automatique vers mailbox si pipe non exposé

### 4.4 Implémentation dans PyShiftBridge
Le code `PyShiftBridge/js/main.js` a été mis à jour pour :
- **Auto-détection** au boot : tentative de connexion pipe
- **Fallback transparent** : bascule automatique vers mailbox JSON
- **Clients éphémères** : nouvelle connexion par requête (évite les listeners cumulés)
- **Cross-platform** : support Windows/macOS/Linux

### 4.5 Configuration du pipe
- **Nom du pipe** : configurable via `localStorage.setItem('pyshift_pipe_name', '...')`
- **Diagnostic** : scripts PowerShell/Bash pour découvrir les pipes disponibles
- **Noms courants** : `PyShiftAE`, `CEPy`, `PyFX`, ou UUID-style

**Verdict (Axe 4)**  
🟢 **Faisable sans recompilation** (si PyShiftAE expose déjà le pipe)
🟠 **Requiert diagnostic** pour identifier le nom exact du pipe

---

# Verdicts synthèse

- **Axe 1 (Shapes)**
  - 🟢 **Navigation/creation par matchName** (groups, fill/stroke/trim, param shapes)
  - 🔴 **Édition de bezier "Shape Path" (vertices/tangentes)** via Python : nécessite ARB + parsing/serialization (gros chantier)

- **Axe 2 (Hooks)**
  - 🟠 **Faisable avec modifs C++** : stockage `py::function` + appel depuis `onIdle`/command
  - Attention : **risque de freeze** main thread si callback lent

- **Axe 3 (Hybrid ExtendScript)**
  - 🟠 **Très bon plan B** mais **nécessite exposer `AEGP_ExecuteScript`** (petites modifs C++), ensuite tu récupères immédiatement la puissance ExtendScript sur shapes

- **Axe 4 (CEP Bridge Hybrid 2.0)**
  - 🟢 **Recommandation principale** : utiliser le transport natif PyInterface (pipes/sockets) si disponible
  - 🟠 **Diagnostic requis** : identifier le nom exact du pipe via les scripts fournis
  - 🟢 **Fallback robuste** : mailbox JSON automatique si pipe indisponible
  - 🟢 **Temps réel** : sliders et interactions continues deviennent possibles

---

## Recommandation finale d'architecture

1. **Priorité absolue** : Mettre en œuvre l'architecture **Hybrid 2.0** avec diagnostic du pipe
2. **Si pipe disponible** : CEP → Pipe → PyShiftAE pour toutes les commandes (latence minimale)
3. **Si pipe indisponible** : Fallback vers mailbox JSON (compatibilité garantie)
4. **Pour shapes complexes** : Compléter avec `AEGP_ExecuteScript` (modifs C++ mineures) si nécessaire
5. **Monitoring** : Console CEP pour vérifier le transport actif et les temps de réponse

---

## Statut
Étude de faisabilité terminée, avec points bloquants identifiés (StreamValue2 non-primitifs, ARB, ExecuteScript non exposé) et pistes de modifications C++ ciblées.
