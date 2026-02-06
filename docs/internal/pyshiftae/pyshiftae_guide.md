# Guide PyShiftAE – Architecture, Patterns & Workflows

> **Version** : 1.0 – 6 février 2026  
> **Statut** : Document de référence consolidé  
> **Audience** : Développeurs Python/C++ travaillant avec After Effects via PyShiftAE/AETK  
> **Sources** : Analyse basée sur AETK, API Python PyShiftAE, et sources externes (CEPy-Resources, PyFxCore, PyShift-Utils via Repomix)  

---

## Table des matières

1. [Vue d’ensemble & architecture](#1-vue-densemble-architecture)  
2. [Cadre d’usage & limitations](#2-cadre-dusage-limitations)  
3. [Safe patterns & opérations critiques](#3-safe-patterns-opérations-critiques)  
4. [Workflows de référence](#4-workflows-de-référence)  
5. [Installation & maintenance](#5-installation-maintenance)  
6. [Annexes](#6-annexes)  

---

## 1. Vue d’ensemble & architecture

### 1.1 Paradigme PyShiftAE

PyShiftAE est un **plugin AEGP qui embarque un runtime CPython** dans After Effects et expose un module Python `PyFx` via `pybind11`. Le pipeline est à trois étages :

- **Python user API** (`pyshiftae/ae.py`) : classes haut niveau (Items, Layers, Properties)  
- **Module PyFx** (pybind11) : wrappers des suites SDK (ProjSuite, ItemSuite, StreamSuite…)  
- **Wrappers AETK → SDK** : appels AEGP natifs marshaled vers le main thread AE

> **Note importante** : Le code source C++ du plugin PyShiftAE lui-même n’est pas inclus dans ce bundle (symlink cassé dans `PyShiftAE/AEGP/`). L.analyse se base sur AETK, l.API Python exposée, et les sources externes disponibles dans `docs/internal/repomix/`.

### 1.2 Concurrence & threading

- **Python worker threads** : calculs, I/O, logique métier (hors appels SDK)  
- **AE main thread** : toutes les mutations projet via `TaskScheduler` + idle hook  
- **Marshaling obligatoire** : les appels SDK doivent passer par `ae::TaskScheduler::ScheduleTask()` ou `ScheduleOrExecute()`

### 1.3 Couverture API (approximation)

| Domaine | Couverture | Notes |
|---|---|---|
| Projet/Items/Comps | ✅ Complète | Création, rename, sélection, folders |
| Layers (base) | ✅ Complète | Types, propriétés, keyframes |
| Shape Layers (arbre) | 🟠 Partielle | Navigation MatchName OK, édition vertices/tangentes 🔴 |
| Masks/Effects | ✅ Bonne | Suites exposées, API haut niveau à vérifier |
| Rendu/Pixels | 🟠 Limitée | C++ sait faire, binding Python partiel |
| UI dockable | 🔴 Très limitée | Pas de ScriptUI natif, panels C++ non exposés |

---

## 2. Cadre d’usage & limitations

### 2.1 Cas d’usage idéaux

- **Automation pipeline** (batch rename, ingest footage, render queue)  
- **Interop IA/ML** (analyse metadata, génération, orchestration)  
- **Outils assistés** déclenchés par menu (pas UI riche)  

### 2.2 Limitations techniques

- **Shape Paths (bézier)** : non exposé en Python (nécessite ARB + parsing)  
- **UI dockable** : pas de ScriptUI, panels natifs C++ non accessibles depuis Python  
- **Hooks événements** : pas de binding Python natif, nécessite modifs C++ mineures ou workaround CEP  
- **Risque crash** : plus élevé qu’ExtendScript (C++ lifetime, threading)  

### 2.3 Recommandation architecture

**Priorité absolue** : Mettre en œuvre l’architecture **Hybrid 2.0**  
- **Chemin A** : CEP → Pipe/Socket → PyShiftAE (latence minimale)  
- **Chemin B** : Fallback mailbox JSON (compatibilité garantie)  
- **Monitoring** : Console CEP pour vérifier le transport actif  

---

## 3. Safe patterns & opérations critiques

### 3.1 Règle d’or threading

> **AE main thread only** pour les appels SDK.  
> Utiliser `TaskScheduler` pour marshaler les appels depuis les workers Python.

### 3.2 Patterns recommandés

#### ✅ Pattern worker + scheduler
```python
import pyshiftae as ae
import threading

def calculs_lourds():
    """Pure Python - aucun appel AE"""
    return [(i/24.0, (i, i*1.5, 0)) for i in range(1000)]

def appliquer(donnees):
    """Exécuté dans AE main thread via scheduler - RAPIDE"""
    comp = ae.Item.active_item()
    if not comp: return
    layer = comp.layers.add_solid("Solid_IA", (0,1,0,1), 1920, 1080, 10)
    # ... application rapide ...

# Lancement
threading.Thread(target=lambda: (
    data := calculs_lourds(),
    ae.schedule_task(lambda: appliquer(data))
)).start()
```

#### ❌ Pattern à éviter
```python
# MAUVAIS : calcul lent + appels AE mélangés
for i in range(1000):
    time.sleep(0.01)  # Calcul sur main thread
    layer.position.set_value((i, i, 0))  # Ping-pong C++ constant
```

### 3.3 GIL & mémoire

- **GIL acquisition minimale** : `py::gil_scoped_acquire` uniquement autour du code Python  
- **Handles AE courte durée** : ne pas stocker long-terme, re-valider avant usage  
- **Pas de références circulaires** Python ↔ PyFx  

### 3.4 Architecture Hybrid 2.0 (CEP ↔ Python)

| Élément | Mode natif | Fallback |
|---|---|---|
| Transport | Named pipes/Unix sockets | Mailbox JSON |
| Latence | <10ms | ~300ms |
| Temps réel | ✅ Sliders, interactions | ❌ Polling only |
| Configuration | `localStorage.setItem('pyshift_pipe_name', '...')` | Automatique |

---

## 4. Workflows de référence

### 4.1 Shape Navigator (navigation MatchName + écriture)

**Objectif** : Prouver la navigation dans l’arbre d’un Shape Layer et modifier une propriété simple.

> Voir [Annexe C – Recettes & snippets](./pyshiftae_implementation_shape_navigator_cep_bridge.md) pour le script complet.

**Résumé** :
1. Récupérer le calque actif (`ae.Layer.active_layer()`)  
2. Descendre dans `ADBE Root Vectors Group` via `DynamicStreamSuite.GetNewStreamRefByMatchname()`  
3. Chercher `ADBE Vector Graphic - Fill`  
4. Modifier `ADBE Vector Fill Opacity` ou `ADBE Vector Fill Color`  
5. Relire la valeur pour validation

### 4.2 CEP Bridge Hybrid 2.0

**Architecture** :
```
CEP Panel → [Pipe/Socket] → PyShiftAE (natif) → réponse directe
     → fallback JSON files → bridge_daemon.py → PyShiftAE
```

**Composants** :
- **CEP** : UI + events + JSX runtime  
- **Python** : logique outillée + opérations natives  
- **IPC** : PyInterface (prioritaire) ou mailbox JSON  

**Format JSON** (pipe) :
```json
{ "endpoint": "Response", "functionName": "<func>", "args": {"param1": "..."} }
```

### 4.3 Hooks simulés via CEP

**Principe** : CEP observe l’état AE (sélection, calque actif) via `evalScript`, détecte les changements, et envoie des commandes à Python.

**Exemple** : Polling sélection active toutes les 300ms, déclenchement `run_python` sur changement.

---

## 5. Installation & maintenance

### 5.1 Installation Windows

> Voir [Annexe B – Installation Windows](./pyshiftae_installation_windows.md) pour le guide complet.

**Points clés** :
- Python 3.11 recommandé (builder officiel)  
- Méthode portable : copie locale de `Lib`, `DLLs`, `python311.dll` près d’AE  
- Gestion multi-disques (C: Python, F: AE)  

### 5.2 Maintenance

- **Version alignement** : vérifier correspondance Python ↔ `.aex`  
- **Rescan plugins** : démarrer AE avec Shift après plantage  
- **Mise à jour package** : recopier `site-packages` après `pip install --upgrade`  

---

## 6. Annexes

### [Annexe A – Faisabilité avancée](./pyshiftae_feasibility_study_shape_layers_hooks.md)
- Étude détaillée Shape Layers & Hooks  
- Verdicts techniques et modifications C++ requises  

### [Annexe B – Installation Windows](./pyshiftae_installation_windows.md)
- Guide pas-à-pas complet + troubleshooting  
- Cas multi-disques, DLL hell, diagnostics  

### [Annexe C – Recettes & snippets](./pyshiftae_implementation_shape_navigator_cep_bridge.md)
- Script Shape Navigator complet  
- Architecture CEP Bridge détaillée (mailbox + pipe)  

### [Annexe D – Safe patterns checklist](./pyshiftae_safe_patterns_checklist.md)
- Checklist opérationnelle complète  
- DO/DON'T résumés, références techniques  

---

## Changelog

- **v1.0 (2026-02-06)** : Création du guide consolidé à partir des documents existants  
- **Prochaine revue** : Trimestrielle ou sur mise à jour majeure de PyShiftAE/AETK  

---

> **Contributeurs** : Analyse consolidée à partir des documents techniques internes  
> **Contact** : Pour questions ou mises à jour, référez-vous aux annexes détaillées ou ouvrez une issue dans le repo.
