---
description: Docs Updater for After Effects Scripts & Plugins Bundle - Standard Tools, Cloc Radon, Quality Context
---

# Workflow: Docs Updater — After Effects Scripts & Plugins Bundle

> Ce workflow harmonise la documentation en utilisant l'analyse statique standard (`tree`, `cloc`) pour la précision technique et les modèles de référence pour la qualité éditoriale, adapté spécifiquement pour l'écosystème Adobe After Effects.

## 🚨 Protocoles Critiques
1.  **Outils autorisés** : L'usage de `run_command` est **strictement limité** aux commandes d'audit : `tree`, `cloc`, `ls`, `find`.
2.  **Contexte** : Charger la Memory Bank (`productContext.md`, `systemPatterns.md`, `activeContext.md`, `progress.md`) via `read_file` avant toute action.
3.  **Source de Vérité** : Le Code (analysé par outils) > La Documentation existante > La Mémoire.

## Étape 1 — Audit Structurel et Métrique
Lancer les commandes suivantes pour ignorer les dossiers non pertinents et cibler le cœur applicatif AE.

1.  **Cartographie (Filtre Bruit)** :
    - `run_command "tree -L 2 -I '__pycache__|.git|*.idea|blob_manifest*.json|regenerated_manifests|repomix*'"`
    - *But* : Visualiser l'architecture AE (JSX dans Scripts_AE/, Python dans PyShiftAE/, Bridge dans PyShiftBridge/, C++/Python dans AETK-main/, docs/).

2.  **Volumétrie (Code Source)** :
    - **Python & C++** : `run_command "cloc PyShiftAE PyShiftBridge AETK-main docs --md --exclude-dir=__pycache__,node_modules,.git"`
      - *But* : Quantifier le code Python (PyShiftAE) et C++/Python (AETK-main) sans les manifests.
    - **Python/C++ de référence** : `run_command "cloc 'PyShiftAE/Python/pyshiftae/ae.py' 'AETK-main/AETK/AEGP/Core/PyFx.hpp' 'AETK-main/AETK/src/AEGP/Core/Suites.cpp' 'AETK-main/AEGP/Grabba/Grabba.cpp' 'AETK-main/AEGP/TaskScheduler/TaskScheduler.cpp' --md"`
      - *But* : Analyser les fichiers Python/C++ de référence identifiés dans la documentation PyShiftAE.
    - **JSX de référence** : `run_command "cloc 'Scripts_AE/Aescripts-easyRulers 2 v2.01/easyRulers.jsx' 'Scripts_AE/Aescripts-Easy Clones v1.1/Easy Clones.jsx' 'Scripts_AE/Aescripts-Good Parents v1.4.1/goodParents.jsx' 'Scripts_AE/Aescripts-Origami v1.4.0/Origami.jsx' 'Scripts_AE/origami_fix.jsx' --md"`
      - *But* : Analyser uniquement les scripts JSX de référence identifiés dans la documentation.

3.  **Analyse par Type de Fichier** :
    - **Python** : `run_command "find PyShiftAE -name '*.py' | wc -l && find AETK-main -name '*.py' | wc -l"`
      - *But* : Compter les fichiers Python principaux.
    - **Python/C++ de référence** : `run_command "ls -la 'PyShiftAE/Python/pyshiftae/ae.py' 'AETK-main/AETK/AEGP/Core/PyFx.hpp' 'AETK-main/AETK/src/AEGP/Core/Suites.cpp' 'AETK-main/AEGP/Grabba/Grabba.cpp' 'AETK-main/AEGP/TaskScheduler/TaskScheduler.cpp' | wc -l"`
      - *But* : Vérifier la présence des fichiers Python/C++ de référence.
    - **JSX de référence** : `run_command "ls -la 'Scripts_AE/Aescripts-easyRulers 2 v2.01/easyRulers.jsx' 'Scripts_AE/Aescripts-Easy Clones v1.1/Easy Clones.jsx' 'Scripts_AE/Aescripts-Good Parents v1.4.1/goodParents.jsx' 'Scripts_AE/Aescripts-Origami v1.4.0/Origami.jsx' 'Scripts_AE/origami_fix.jsx' | wc -l"`
      - *But* : Vérifier la présence des scripts JSX de référence.

## Étape 2 — Diagnostic Triangulé
Comparer les sources pour détecter les incohérences :

| Source | Rôle | Outil |
| :--- | :--- | :--- |
| **Intention** | Le "Pourquoi" | `read_file` (Memory Bank) |
| **Réalité** | Le "Quoi" & "Comment" | `cloc` (volume), `find_by_name` (structure), `grep_search` |
| **Existant** | L'état actuel | `find_by_name` (sur `docs/`), `read_file` |

**Action** : Identifier les divergences. Ex: "Le script PyShiftAE complexe est absent de la doc technique."

## Étape 3 — Sélection du Standard de Rédaction
Choisir le modèle approprié pour l'écosystème AE :

- **Documentation Scripts AE** (`Scripts_AE/`) :
  - **Compatibilité AE** : Versions supportées, prérequis.
  - **Interface ScriptUI** : Description des panels et contrôles.
  - **Fonctionnalités** : Que fait le script, cas d'usage.

- **Documentation PyShiftAE** (`PyShiftAE/`, `AETK-main/`) :
  - **API Python** : Classes, méthodes, paramètres.
  - **Patterns AE** : Worker thread + Scheduler, CEP Bridge.
  - **Intégration** : Comment connecter Python à After Effects.

- **Documentation Bridge** (`PyShiftBridge/`) :
  - **Communication** : Protocoles (named pipes, sockets, mailbox).
  - **Configuration** : Installation et setup.
  - **Exemples** : Cas d'usage concrets.

- **Architecture Globale** :
  - Diagrammes textuels (Mermaid) des interactions.
  - Flux de données entre composants.

## Étape 4 — Proposition de Mise à Jour
Générer un plan de modification avant d'appliquer :

```markdown
## 📝 Plan de Mise à Jour Documentation
### Audit Métrique
- **Cible** : `PyShiftAE/ae.py`, `AETK-main/AETK/AEGP/Core/PyFx.hpp` ou `Scripts_AE/[script]/script.jsx`
- **Métriques** : X LOC, Type [Python/C++/ExtendScript], Complexité estimée.

### Modifications Proposées
#### 📄 docs/[category]/target.md
- **Type** : [Script AE | PyShiftAE API | Bridge | Architecture]
- **Diagnostic** : [Obsolète | Incomplet | Manquant]
- **Correction** :
  ```markdown
  [Contenu proposé respectant le standard choisi]
  ```
```

## Étape 5 — Application et Finalisation
1.  **Exécution** : Après validation, utiliser `edit` ou `multi_edit`.
2.  **Mise à jour Memory Bank** :
    - Si une complexité importante est découverte, ajouter une entrée dans `decisionLog.md` ou `systemPatterns.md`.
3.  **Validation AE** :
    - Vérifier que la documentation respecte les conventions AE (matchNames, versions, patterns).

## 📋 Check-list Spécifique AE

### Scripts ExtendScript (.jsx)
- [ ] Compatibilité AE versions spécifiées
- [ ] Description de l'interface ScriptUI
- [ ] Cas d'usage et workflow
- [ ] Prérequis (plugins, dépendances)

### Python PyShiftAE (.py)
- [ ] Documentation des classes et méthodes
- [ ] Patterns threading + scheduler expliqués
- [ ] Exemples d'intégration AE
- [ ] Configuration requise

### C++ AETK (.cpp/.hpp)
- [ ] Documentation des bindings pybind11
- [ ] Patterns TaskScheduler expliqués
- [ ] Architecture des wrappers AEGP
- [ ] Exemples de plugins

### Bridge & Communication
- [ ] Protocoles de communication documentés
- [ ] Guide d'installation
- [ ] Exemples de code fonctionnels
- [ ] Dépannage commun