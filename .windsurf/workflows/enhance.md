---
description: Améliorer un Prompt avec le Contexte du Projet After Effects, Techniques Avancées et Skills Spécialisés
---

### `/enhance` — Optimisation Avancée de Prompt pour After Effects

1. **Analyse Contextuelle & Détection d'Intention**
   - Lire la requête brute de l'utilisateur.
   - Charger le contexte global via `read_file` sur les fichiers de la Memory Bank (`activeContext.md`, `progress.md`, `productContext.md`).
   - **Détection de Skill** : Analyser la nature de la tâche :
     - Si **Python Automation** (PyShiftAE, threading, CEP bridge) : Charger immédiatement `.windsurf/skills/pyshiftae/SKILL.md`.
     - Si **ExtendScript/JSX Development** (ScriptUI, shape layers, panels) : Charger `.windsurf/skills/ae-scripting-expert/SKILL.md`.
     - Si **Debugging** (bug, crash, erreur, performance) : Charger immédiatement `.windsurf/skills/debugging-strategies/SKILL.md` et identifier le runtime (Python vs ExtendScript) pour adapter les techniques.
     - Si **Architecture** : Analyser si besoin de PyShiftAE ou AE Scripting patterns, puis charger les docs d'architecture pertinentes.
     - Si **Feature** : Identifier le runtime principal (Python vs ExtendScript) et charger le skill correspondant.
     - **Skills globaux en renfort** : Si aucun skill local ne correspond, vérifier les skills globaux pertinents (ex: `python-coding-standards`, `architecture-tools`, `frontend-design`, `media-ai-pipeline`).

2. **Recherche Active de Documentation**
   - Identifier les règles spécifiques au projet via `read_file` sur `.windsurf/rules/codingstandards.md`.
   - Utiliser `grep_search` dans `docs/` pour trouver la documentation pertinente (ex: `docs/internal/pyshiftae/`, `docs/internal/after_effects/`).
   - Si mode **Debugging** activé : Appliquer la méthode scientifique du debugging-strategies SKILL.md et vérifier via `grep_search` si les outils de debugging (logs, profileurs) sont déjà présents selon le runtime.
   - Si mode **Python Automation** : Vérifier via `grep_search` si les patterns PyShiftAE (TaskScheduler, threading) sont déjà présents.
   - Si mode **ExtendScript** : Vérifier la présence de patterns ES3, undo groups, ScriptUI panels.

3. **Synthèse et Rédaction Structurée (Prompt Engineering)**
   - Compiler les informations en un "Mega-Prompt" adapté à After Effects.
   - **Si Python Automation détecté** :
     - **Rôle** : "Expert PyShiftAE & Python Automation for After Effects".
     - **Méthodologie** : Imposer les patterns PyShiftAE (worker thread + scheduler, memory management).
     - **Contraintes** : Threading boundaries, pure Python vs AE SDK calls, TaskScheduler usage.
   - **Si ExtendScript détecté** :
     - **Rôle** : "Expert ExtendScript/JSX & After Effects Scripting".
     - **Méthodologie** : Imposer ES3 compatibility, undo groups, IIFE patterns.
     - **Contraintes** : var only, 1-based indexing, matchNames documentation.
   - **Si mode Debugging** :
     - **Rôle** : "Expert Debugging & Root Cause Analysis for After Effects".
     - **Méthodologie** : Appliquer la méthode scientifique du debugging-strategies SKILL.md (Observer → Hypothesize → Experiment → Analyze → Repeat) en adaptant au runtime détecté (Python vs ExtendScript).
     - **Contraintes** : Utiliser les outils de debugging appropriés selon le runtime, reproduire systématiquement les problèmes.
   - **Mode Standard** :
     - **Persona** : Définir le rôle exact selon le runtime détecté.
     - **Contexte Projet** : Injecter explicitement les règles de `codingstandards.md` (PyShiftAE patterns, ES3 rules).
     - **Chain-of-Thought (CoT)** : Pour tâches complexes, "penser étape par étape" avant de coder.
     - **Format de Sortie** : Imposer format structuré (Markdown avec sections claires).
     - **Constitutional AI** : Ajouter contrainte de vérification (thread safety, ES3 compatibility, undo groups).

4. **Validation et Exécution**
   - Demander confirmation à l'utilisateur ("Voulez-vous exécuter ce prompt optimisé pour After Effects ?").
   - Une fois validé :
     - Exécuter le prompt.
     - Si Debugging : Appliquer rigoureusement la méthode scientifique du debugging-strategies SKILL.md et adapter les techniques au runtime (Python vs ExtendScript).
     - Si Python Automation : Appliquer rigoureusement les patterns PyShiftAE (worker threads, TaskScheduler).
     - Si ExtendScript : Appliquer ES3 compatibility, undo groups, IIFE patterns.
     - Utiliser systématiquement les outils (`read_file`, `edit`, `multi_edit`) pour réaliser la tâche.
     - Vérifier la conformité avec les standards de `codingstandards.md`.