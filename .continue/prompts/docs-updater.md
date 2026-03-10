---
description: Docs Updater for After_Effects_Scripts_Plugins_Bundle - Standard Tools, Cloc Radon, Quality Context
---

# Workflow: Docs Updater — After Effects Scripts & Plugins Bundle

> Workflow pour harmoniser la doc AE via analyse statique (`tree`, `cloc`) et modèles éditoriaux.

## 🚨 Protocoles Critiques
1. Outils : `run_command` limité à audit (`tree`, `cloc`, `ls`, `find`).
2. Contexte : Lire `activeContext.md` via `fast_read_file`.
3. Source : Code > Doc existante > Mémoire.
4. Sécurité : Utiliser fast-filesystem pour memory-bank.

## Étape 1 — Audit Structurel et Métrique

1. **Cartographie** :
    - `run_command "tree -L 2 -I '__pycache__|.git|*.idea|blob_manifest*.json|regenerated_manifests|repomix*|*.shrimp_task_manager'"`
    - *But* : Architecture AE (JSX, Python, Bridge, C++, docs, CEP).

2. **Volumétrie** :
    - **Python & C++** : `run_command "cloc PyShiftAE PyShiftBridge AETK-main docs --md --exclude-dir=__pycache__,node_modules,.git"`
      - *But* : Code Python/C++ sans manifests.
    - **CEP** : `run_command "cloc 'MédiaSolution/MediaSolution-CEP/client' 'MédiaSolution/MediaSolution-CEP/host' 'GridCloner-CEP/client' 'GridCloner-CEP/host' --md --exclude-ext=png,jpg,svg"`
      - *But* : Interface CEP (client/host).
    - **Python/C++ réf** : `run_command "cloc 'PyShiftAE/Python/pyshiftae/ae.py' 'AETK-main/AETK/AEGP/Core/PyFx.hpp' 'AETK-main/AETK/src/AEGP/Core/Suites.cpp' 'AETK-main/AEGP/Grabba/Grabba.cpp' 'AETK-main/AEGP/TaskScheduler/TaskScheduler.cpp' --md"`
      - *But* : Fichiers réf PyShiftAE.
    - **JSX — Batch** :
      1. `run_command "cloc 'Scripts_AE/Aescripts-3D Primitives Generator v3' 'Scripts_AE/Aescripts-Crazy Shapes 1.1.1' 'Scripts_AE/Aescripts-Cloners + Effectors v1.2.6' --md"`
         - *But* : Rigs lourds (3D, generative).
      2. `run_command "cloc 'Scripts_AE/Aescripts-AW Autosaver v2.1' 'Scripts_AE/Aescripts-Automation Toolkit v1.0.3.7' 'Scripts_AE/Aescripts-KBar3 v3.1.1' --md"`
         - *But* : Toolkits pipeline.
      3. `run_command "cloc 'Scripts_AE/Aescripts-AEInfoGraphics v2.0.3' 'Scripts_AE/Aescripts-Coco Color CoWorker v1.2.0' 'Scripts_AE/Aescripts-Infographics toolkit v1.04' --md"`
         - *But* : Panels CEP/JSX.
      - *Astuce* : Adapter via `ae-script-audit.md`.

3. **Analyse par Type** :
    - **Python** : `run_command "find PyShiftAE -name '*.py' | wc -l && find AETK-main -name '*.py' | wc -l"`
      - *But* : Comptage Python.
    - **Python/C++ réf** : `run_command "ls -la 'PyShiftAE/Python/pyshiftae/ae.py' 'AETK-main/AETK/AEGP/Core/PyFx.hpp' 'AETK-main/AETK/src/AEGP/Core/Suites.cpp' 'AETK-main/AEGP/Grabba/Grabba.cpp' 'AETK-main/AEGP/TaskScheduler/TaskScheduler.cpp' | wc -l"`
      - *But* : Présence réf.
    - **JSX réf** : `run_command "ls -la 'Scripts_AE/Aescripts-easyRulers 2 v2.01/easyRulers.jsx' 'Scripts_AE/Aescripts-Easy Clones v1.1/Easy Clones.jsx' 'Scripts_AE/Aescripts-Good Parents v1.4.1/goodParents.jsx' 'Scripts_AE/Aescripts-Origami v1.4.0/Origami.jsx' | wc -l"`
      - *But* : Présence JSX réf.
    - **CEP MediaSolution** : `run_command "ls -la 'MédiaSolution/MediaSolution-CEP/host/MediaSolution.jsx' 'MédiaSolution/MediaSolution-CEP/client/main.js' 'MédiaSolution/MediaSolution-CEP/client/style.css' | wc -l"`
      - *But* : Scripts MediaSolution.
    - **CEP GridCloner** : `run_command "ls -la 'GridCloner-CEP/host/GridCloner.jsx' 'GridCloner-CEP/client/main.js' 'GridCloner-CEP/client/index.html' 'GridCloner-CEP/CSXS/manifest.xml' | wc -l"`
      - *But* : Scripts GridCloner.
    - **PyShiftBridge MediaSolution** : `run_command "ls -la 'PyShiftBridge/bridge_daemon.py' 'PyShiftBridge/js/main.js' 'PyShiftBridge/mediasolution_cuts_core.py' | wc -l"`
      - *But* : Scripts pont MediaSolution.

4. **Audit Python Décentralisés** :
    - `run_command "find . -name '*.py' -path './PyShiftAE' -prune -o -name '*.py' -print | grep -v __pycache__ | wc -l"`
      - *But* : Comptage Python hors PyShiftAE.
    - `run_command "cloc --md $(find . -name '*.py' -path './PyShiftAE' -prune -o -name '*.py' -print | grep -v __pycache__ | head -10)"`
      - *But* : Volumétrie 10 premiers.

5. **Vérification CEP/Bridge** :
    - `run_command "find . -name '*.js' -o -name '*.html' -o -name '*.css' | grep -E '(CEP|Bridge)' | wc -l"`
      - *But* : Comptage assets CEP/Bridge.
    - `run_command "cloc --md $(find . -name '*.js' -o -name '*.html' -o -name '*.css' | grep -E '(CEP|Bridge)' | head -5)"`
      - *But* : Volumétrie 5 échantillons.

## Étape 2 — Diagnostic Triangulé
Comparer sources pour divergences.

| Source | Rôle | Outil |
| --- | --- | --- |
| Intention | Pourquoi | fast_read_file |
| Réalité | Quoi/Comment | cloc, search |
| Existant | État actuel | search docs |

**Action** : Identifier divergences.

## Étape 3 — Sélection Standard
Modèles AE :
- Scripts AE : Compatibilité, UI, fonctionnalités.
- PyShiftAE : API, patterns, intégration.
- Bridge : Communication, config, exemples.
- Architecture : Diagrammes, flux.

## Étape 4 — Proposition Mise à Jour
Plan :
### Audit Métrique
- Cible : Fichier, LOC, Type, Complexité.

### Modifications
#### docs/[cat]/target.md
- Type : Script AE | PyShiftAE | Bridge | Architecture
- Diagnostic : Obsolète | Incomplet | Manquant
- Correction :
  ```md
  [Contenu]
  ```

## Étape 5 — Application
1. Exécution : edit_file après validation.
2. Rédaction : Charger documentation.md, appliquer modèle, checkpoints.
3. Memory Bank : edit_file.
4. Validation AE : Conventions (matchNames, versions).

### Sous-protocole Rédaction
#### Point d'Entrée
- Mode : Après plan.
- Lecture : .continue/rules/documentation.md
- Modèle : Spécifié.

#### Checkpoints
**Avant** : TL;DR, Problem-first.
**Pendant** : ❌/✅, Trade-offs, Golden Rule, Éviter AI.
**Après** : Checklist, Ponctuation.

#### Traceability
Application skill : Modèle, Éléments appliqués.

#### Hook Automation
- Git : Commentaire guidé.
- Blocking : Checkpoints requis.
- Audit : Note interne.