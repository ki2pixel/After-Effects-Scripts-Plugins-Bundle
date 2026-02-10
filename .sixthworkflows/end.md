---
description: Terminer la Session et Synchroniser la Memory Bank
---

### `/end` — Terminer la session et synchroniser la Memory Bank
1. **Charger le contexte**  
   - Utiliser `read_file` pour ouvrir successivement `memory-bank/productContext.md`, `activeContext.md`, `progress.md`, `decisionLog.md` et `systemPatterns.md`.  
   - Si d’anciennes décisions doivent être relues, employer `code_search` ou `grep_search` pour retrouver les sections pertinentes avant modification.
2. **Exécuter `UMB` conformément aux règles**  
   - Suspendre la tâche en cours puis résumer la session.  
   - Utiliser `code_search`/`grep_search` pour identifier les fichiers additionnels à consulter (ex. docs liés à la session).
3. **Mettre à jour la Memory Bank**  
   - Modifier chaque fichier concerné via `apply_patch` (remplaçant local d’`edit`/`multi_edit`).  
   - Avant chaque modification, relire la portion à éditer avec `read_file` pour limiter le diff.  
   - Documenter les décisions, progrès et contexte actif selon le protocole.
4. **Clôturer la session**  
   - Résumer les tâches finalisées dans la réponse utilisateur.  
   - Vérifier avec `read_file` que `progress.md` indique “Aucune tâche active” et que `activeContext.md` est revenu à l’état neutre.