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
    - *But* : Visualiser l'architecture AE (JSX dans Scripts_AE/, Python dans PyShiftAE/, Bridge dans PyShiftBridge/, C++/Python dans AETK-main/, docs/, CEP dans MédiaSolution/MediaSolution-CEP et GridCloner-CEP).

2.  **Volumétrie (Code Source)** :
    - **Python & C++** : `run_command "cloc PyShiftAE PyShiftBridge AETK-main docs --md --exclude-dir=__pycache__,node_modules,.git"`
      - *But* : Quantifier le code Python (PyShiftAE) et C++/Python (AETK-main) sans les manifests.
    - **CEP (HTML/CSS/JS + ExtendScript)** : `run_command "cloc 'MédiaSolution/MediaSolution-CEP/client' 'MédiaSolution/MediaSolution-CEP/host' 'GridCloner-CEP/client' 'GridCloner-CEP/host' --md --exclude-ext=png,jpg,svg"`
      - *But* : Mesurer l'effort côté interface CEP (client) et hôte ExtendScript pour aligner la documentation MediaSolution et GridCloner.
    - **Python/C++ de référence** : `run_command "cloc 'PyShiftAE/Python/pyshiftae/ae.py' 'AETK-main/AETK/AEGP/Core/PyFx.hpp' 'AETK-main/AETK/src/AEGP/Core/Suites.cpp' 'AETK-main/AEGP/Grabba/Grabba.cpp' 'AETK-main/AEGP/TaskScheduler/TaskScheduler.cpp' --md"`
      - *But* : Analyser les fichiers Python/C++ de référence identifiés dans la documentation PyShiftAE.
    - **JSX — Batch par répertoire thématique** :
      1. `run_command "cloc 'Scripts_AE/Aescripts-3D Primitives Generator v3' 'Scripts_AE/Aescripts-Crazy Shapes 1.1.1' 'Scripts_AE/Aescripts-Cloners + Effectors v1.2.6' --md"`
         - *But* : Couvrir les rigs/procéduraux lourds (3D, generative, shape rigs) cités dans `ae-script-audit.md`.
      2. `run_command "cloc 'Scripts_AE/Aescripts-AW Autosaver v2.1' 'Scripts_AE/Aescripts-Automation Toolkit v1.0.3.7' 'Scripts_AE/Aescripts-KBar3 v3.1.1' --md"`
         - *But* : Mesurer les toolkits pipeline/licensing/support afin d’alimenter `coding-patterns.md` et `capabilities.md`.
      3. `run_command "cloc 'Scripts_AE/Aescripts-AEInfoGraphics v2.0.3' 'Scripts_AE/Aescripts-Coco Color CoWorker v1.2.0' 'Scripts_AE/Aescripts-Infographics toolkit v1.04' --md"`
         - *But* : Analyser les panels CEP/JSX hybrides pour aligner `cep-python-bridge.md` et les sections UI.
      - *Astuce* : Adapter les répertoires à chaque cycle en sélectionnant 2-3 groupes issus des nouvelles lignes `ae-script-audit.md` (permet d’ajouter d’autres catégories sans lancer un `cloc` global sur 500+ scripts).

3.  **Analyse par Type de Fichier** :
    - **Python** : `run_command "find PyShiftAE -name '*.py' | wc -l && find AETK-main -name '*.py' | wc -l"`
      - *But* : Compter les fichiers Python principaux.
    - **Python/C++ de référence** : `run_command "ls -la 'PyShiftAE/Python/pyshiftae/ae.py' 'AETK-main/AETK/AEGP/Core/PyFx.hpp' 'AETK-main/AETK/src/AEGP/Core/Suites.cpp' 'AETK-main/AEGP/Grabba/Grabba.cpp' 'AETK-main/AEGP/TaskScheduler/TaskScheduler.cpp' | wc -l"`
      - *But* : Vérifier la présence des fichiers Python/C++ de référence.
    - **JSX de référence** : `run_command "ls -la 'Scripts_AE/Aescripts-easyRulers 2 v2.01/easyRulers.jsx' 'Scripts_AE/Aescripts-Easy Clones v1.1/Easy Clones.jsx' 'Scripts_AE/Aescripts-Good Parents v1.4.1/goodParents.jsx' 'Scripts_AE/Aescripts-Origami v1.4.0/Origami.jsx' | wc -l"`
      - *But* : Vérifier la présence des scripts JSX de référence.
    - **CEP MediaSolution** : `run_command "ls -la 'MédiaSolution/MediaSolution-CEP/host/MediaSolution.jsx' 'MédiaSolution/MediaSolution-CEP/client/main.js' 'MédiaSolution/MediaSolution-CEP/client/style.css' | wc -l"`
      - *But* : S'assurer que les scripts hôte et client MediaSolution sont pris en compte avant mise à jour de la documentation CEP.
    - **CEP GridCloner** : `run_command "ls -la 'GridCloner-CEP/host/GridCloner.jsx' 'GridCloner-CEP/client/main.js' 'GridCloner-CEP/client/index.html' 'GridCloner-CEP/CSXS/manifest.xml' | wc -l"`
      - *But* : Vérifier la présence des scripts critiques du panel GridCloner (hôte JSX, client JS/HTML, manifest CEP) pour aligner la documentation CEP.
    - **PyShiftBridge MediaSolution** : `run_command "ls -la 'PyShiftBridge/bridge_daemon.py' 'PyShiftBridge/js/main.js' 'PyShiftBridge/mediasolution_cuts_core.py' | wc -l"`
      - *But* : Vérifier la présence des scripts critiques du pont MediaSolution (daemon, transport JS, cœur Python) pour aligner la documentation Bridge.

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
  - **Communication** : Protocoles (named pipes, sockets, mailbox) illustrés via `bridge_daemon.py`.
  - **Configuration** : Installation et setup (scripts `install/*.sh`, `CONFIGURATION_GUIDE.md`).
  - **Exemples** : Cas d'usage concrets, notamment MediaSolution (`mediasolution_cuts_core.py`, `js/main.js`, intégration CEP) et GridCloner (`GridCloner.jsx`, transport mailbox fallback).

- **Architecture Globale** :
  - Diagrammes textuels (Mermaid) des interactions.
  - Flux de données entre composants.

## Étape 4 — Proposition de Mise à Jour
Générer un plan de modification avant d'appliquer :

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

## Étape 5 — Application et Finalisation
1.  **Exécution** : Après validation, utiliser `edit` ou `multi_edit`.
2.  **Mode Rédaction** : 
    - Charger immédiatement `.sixthskills/documentation/SKILL.md`
    - Appliquer le modèle correspondant (article deep-dive, README, etc.)
    - Respecter les checkpoints obligatoires du skill
3.  **Mise à jour Memory Bank** :
    - Si une complexité importante est découverte, ajouter une entrée dans `decisionLog.md` ou `systemPatterns.md`.
4.  **Validation AE** :
    - Vérifier que la documentation respecte les conventions AE (matchNames, versions, patterns).

### Sous-protocole Rédaction — Application de documentation/SKILL.md

#### 5.1 Point d'Entrée Explicite
- **Mode Rédaction** : Déclenché après validation du plan de mise à jour
- **Lecture obligatoire** : `.sixthskills/documentation/SKILL.md`
- **Modèle à appliquer** : Spécifié dans le plan (article deep-dive, README, etc.)

#### 5.2 Checkpoints Obligatoires
**Avant rédaction** :
- [ ] TL;DR présent (section 1 du skill)
- [ ] Problem-first opening (section 2 du skill)

**Pendant rédaction** :
- [ ] Comparaison ❌/✅ (section 4 du skill)
- [ ] Trade-offs table si applicable (section 7 du skill)
- [ ] Golden Rule (section 8 du skill)
- [ ] Éviter les artefacts AI (section 6 du skill)

**Après rédaction** :
- [ ] Validation checklist "Avoiding AI-Generated Feel"
- [ ] Vérification ponctuation (remplacer " - " par ;/:/—)

#### 5.3 Traceability
Dans la proposition de mise à jour (Étape 4), ajouter :
#### Application du skill
- **Modèle** : [Article deep-dive | README | Technique]
- **Éléments appliqués** : TL;DR ✔, Problem-First ✔, Comparaison ✔, Trade-offs ✔, Golden Rule ✔

#### 5.4 Hook d'Automation
- **Validation Git** : Commentaire de commit "Guidé par documentation/SKILL.md — sections: [list]"
- **Blocking** : Le workflow ne peut pas se terminer si les checkpoints ne sont pas cochés
- **Audit trail** : Chaque fichier modifié contient une note de validation interne

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
- [ ] Protocoles de communication documentés (PyShiftBridge daemon + transport CEP MediaSolution + GridCloner)
- [ ] Guide d'installation (`CONFIGURATION_GUIDE.md`, scripts `install/`)
- [ ] Exemples de code fonctionnels (`bridge_daemon.py`, `mediasolution_cuts_core.py`, `js/main.js`, `GridCloner.jsx`)