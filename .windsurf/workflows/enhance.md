---
description: Améliorer un Prompt avec le Contexte du Projet, Techniques Avancées et Skills Spécialisés
---

---
description: Améliorer un Prompt avec le Contexte du Projet, Techniques Avancées et Skills Spécialisés
---

### `/enhance` — Optimisation Avancée de Prompt
1. **Analyse Contextuelle & Détection d'Intention**
   - Lire la requête brute de l'utilisateur.
   - Charger le contexte global via `read_file` sur les fichiers de la Memory Bank (`activeContext.md`, `progress.md`, `systemPatterns.md`, etc.).
   - **Détection de Skill** : Analyser la nature de la tâche :
     - Si **Debugging** (bug, crash, erreur, performance) : Charger immédiatement `.windsurf/skills/debugging-strategies/SKILL.md`.
     - Si **Architecture** : Charger d'abord `.windsurf/skills/workflow-operator/SKILL.md`, puis chercher les docs d'architecture pertinentes.
     - Si **Feature** : Identifier et charger le(s) SKILL(s) applicables dans `.windsurf/skills/` (ex: `frontend-timeline-designer`, `logs-overlay-conductor`, `pipeline-diagnostics`, `step4-audio-orchestrator`, `step5-gpu-ops`, `after-effects-scripts`, `after-effects-cep-panel`) avant de chercher les specs fonctionnelles liées.

2. **Recherche Active de Documentation**
   - Identifier les règles spécifiques au projet via `code_search` dans `docs/workflow` et `.windsurf/rules/codingstandards.md`.
   - Utiliser `read_file` sur les documents pertinents trouvés.
   - Si mode **Debugging** activé : Vérifier via `grep_search` si les outils mentionnés dans le Skill (ex: configurations de log, profileurs) sont déjà présents dans le code source pour les inclure dans le contexte.

3. **Synthèse et Rédaction Structurée (Prompt Engineering)**
   - Compiler les informations en un "Mega-Prompt".
   - **Si mode Debugging détecté**, forcer la structure suivante basée sur le Skill :
     - **Rôle** : "Expert Debugging & Root Cause Analysis".
     - **Méthodologie** : Imposer les phases du Skill (1. Reproduire, 2. Collecter, 3. Hypothèse, 4. Test).
     - **Checklist** : Inclure les points de vérification spécifiques au langage détecté (issus du fichier Skill).
   - **Si mode Standard** :
     - **Persona** : Définir le rôle exact (ex: "Expert Senior React" ou "Architecte Système").
     - **Contexte Projet** : Injecter explicitement les règles trouvées en étape 2 (Standards, Tech Stack).
     - **Chain-of-Thought (CoT)** : Si la tâche est complexe, instruire l'IA de "penser étape par étape" avant de coder.
     - **Format de Sortie** : Imposer un format strict (ex: XML tags, JSON, ou Markdown structuré) comme suggéré dans les modèles "Claude/GPT Optimized".
     - **Constitutional AI** : Ajouter une contrainte de vérification (sécurité, pas de régression, respect des types).
   
   - **Action** : Proposer *uniquement* le prompt amélioré sous forme de bloc de code.

4. **Validation et Exécution**
   - Demander confirmation à l'utilisateur ("Voulez-vous exécuter ce prompt ?").
   - Une fois validé :
     - Exécuter le prompt.
     - Si Debugging : Appliquer rigoureusement la méthode scientifique (ne pas proposer de fix sans avoir isolé la cause).
     - Utiliser systématiquement les outils (`read_file`, `apply_patch`, `run_command`) pour réaliser la tâche.
     - Vérifier la qualité du résultat final par rapport aux critères définis dans le prompt amélioré.