---
name: commit-push
description: Commit changes to the current branch and push to remote. Utilise pour valider et pousser les modifications vers le dépôt distant.
type: flow
---

# /flow:commit-push - Commit et Push Automatisé

```mermaid
flowchart TD
BEGIN([BEGIN]) --> A[Verify changes: Use read_file or grep_search to review modifications if needed]
A --> B[Run quality checks as needed (lint / test / build, etc.)]
B --> C[Stage changes (git add -A)]
C --> D[Commit (use message from argument or environment variable)]
D --> E[Push (git push -u origin <current-branch>)]
E --> F([END])
```

## Objectif

Committer les changements et les pousser vers le dépôt distant.

## Prérequis

- Des fichiers modifiés existent
- Le remote `origin` est configuré
- Git est installé et configuré

## Étapes d'Exécution (Non-Interactif)

### 1. Vérifier les changements

Utiliser `Shell` pour examiner les modifications si nécessaire :

```bash
git status
git diff
```

### 2. Exécuter les checks qualité (optionnel)

Si des scripts de qualité existent :

```bash
./scripts/lint.sh && ./scripts/test.sh && ./scripts/build.sh
```

### 3. Stage les changements

```bash
git add -A
```

### 4. Commit

Utiliser le message fourni ou demander à l'utilisateur.

### 5. Push

```bash
git push -u origin <current-branch>
```

## Méthodes d'Exécution

### A) Exécution Batch Sécurisée (avec message)

```bash
MSG="<Prefix>: <Summary (imperative/concise)>" \
BRANCH=$(git branch --show-current) && \
git add -A && \
git commit -m "$MSG" && \
git push -u origin "$BRANCH"
```

**Exemple** :

```bash
MSG="fix: Remove unnecessary debug log output" \
BRANCH=$(git branch --show-current) && \
git add -A && git commit -m "$MSG" && git push -u origin "$BRANCH"
```

### B) Exécution Étape par Étape (Lisibilité)

```bash
# 1) Obtenir la branche courante
BRANCH=$(git branch --show-current)

# 2) Checks qualité optionnels
# echo "Running quality checks..."
# ./scripts/lint.sh && ./scripts/test.sh && ./scripts/build.sh || exit 1

# 3) Stage les changements
git add -A

# 4) Commit (éditer le message)
git commit -m "<Prefix>: <Summary (imperative/concise)>"

# 5) Push
git push -u origin "$BRANCH"
```

## Format de Message de Commit

Suivre le format Conventional Commits :

```
type(scope): description
```

**Types autorisés** :

| Type | Description |
|------|-------------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `docs` | Documentation |
| `style` | Formatage, point-virgule, etc. |
| `refactor` | Refactoring sans changement de comportement |
| `test` | Ajout/modification de tests |
| `chore` | Tâches de maintenance |

**Exemples** :

- `feat(bridge): add WebSocket support`
- `fix(pyshiftae): handle null layer reference`
- `docs(readme): update installation instructions`

## Outils à Utiliser

| Action | Outil Kimi Code CLI |
|--------|---------------------|
| Commandes git | `Shell` |
| Vérifier diffs | `Shell` (`git diff`) |
| Lire fichiers | `ReadFile` ou `fast_read_file` |

## Notes Importantes

- Toujours vérifier `git status` ou `git diff` avant d'exécuter
- Le message de commit doit être impératif et concis
- En cas de doute, demander confirmation avant push

## Exemple d'Utilisation

```
/flow:commit-push
```

L'agent va :
1. Vérifier les changements en cours
2. Demander le message de commit si non fourni
3. Exécuter le commit et push

### Avec message pré-défini

```
/flow:commit-push feat(pyshiftae): add layer duplication API
```
