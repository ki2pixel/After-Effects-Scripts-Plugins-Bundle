---
name: pull-latest
description: Synchroniser la branche locale avec origin/main
invokable: true
---

# `/pull-latest` — Récupération des changements distants
Processus standard pour mettre à jour la branche locale depuis `origin/main` lorsqu'on travaille en hybride local/cloud.

## Prérequis
- Git configuré avec le remote `origin`
- Connaissance de la branche locale active (ex: `git branch --show-current`)
- Arbre de travail propre ou changements sauvegardés/stashés

## Étapes
1. **Vérifier l'état local**
   - `git status -sb`
   - Si des modifications existent, les committer ou exécuter `git stash push -m "pre-pull"`
2. **S'assurer d'être sur la bonne branche**
   - `git branch --show-current`
   - `git checkout main` si nécessaire (adapter si vous travaillez sur une autre branche)
3. **Récupérer les métadonnées distantes**
   - `git fetch origin`
   - Pour pré-visualiser sans appliquer : `git fetch --dry-run origin`
   - Facultatif : `git log --oneline --graph -5 HEAD..origin/main` pour visualiser les nouveautés
4. **Tirer les changements distants**
   - Pull sécurisé (fast-forward uniquement) :
     ```bash
     git pull --ff-only origin main
     ```
   - Si les commits locaux doivent être conservés au-dessus de `main`, utiliser :
     ```bash
     git pull --rebase origin main
     ```
5. **Résoudre les conflits le cas échéant**
   - Utiliser les outils de merge habituels
   - Une fois résolus : `git add <fichier>` puis `git rebase --continue` (ou `git merge --continue`)
6. **Nettoyer les stashes temporaires (si utilisés)**
   - `git stash pop` pour réappliquer les travaux locaux
   - Résoudre les conflits éventuels puis `git status` pour valider

## Notes
- Préférer `--ff-only` pour éviter les merges indésirables; passer à `--rebase` uniquement si nécessaire.
- Sous VS Code, l'extension GitLens affiche directement les flèches "Incoming/Outgoing" pour repérer les changements avant le fetch.
- Après synchronisation, poursuivre le flux habituel (`/commit-push`) pour publier vos changements.
