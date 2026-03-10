# Guide d'Utilisation des Skills Kimi Code CLI

## Invocation des Skills

Les skills s'invoquent via la commande slash `/skill:<name>` dans Kimi Code CLI.

### Syntaxe de Base

```bash
/skill:<name> [arguments optionnels]
```

### Exemples

```bash
# Terminer une session
/skill:end

# Améliorer un prompt
/skill:enhance Créer un script pour dupliquer les calques

# Mettre à jour la documentation
/skill:docs-updater

# Planifier une tâche complexe
/skill:enhance-complex Refactoriser le système de bridge

# Committer et pousser
/skill:commit-push

# Charger les standards de documentation
/skill:documentation
```

## Détails par Skill

### `/skill:end` - Terminer la Session

**Usage** : Clôturer proprement une session de travail.

**Processus** :
1. Lit `activeContext.md` et `progress.md`
2. Résume les accomplissements de la session
3. Met à jour la Memory Bank
4. Confirme la clôture

**Exemple** :
```bash
/skill:end
```

**Résultat attendu** :
- Memory Bank synchronisée
- `progress.md` indique "Aucune tâche active"
- `activeContext.md` en état neutre

---

### `/skill:enhance` - Améliorer un Prompt

**Usage** : Transformer une demande brute en spécification technique structurée.

**Règle d'or** : L'agent ne exécute JAMAIS la tâche, il génère uniquement un mega-prompt.

**Processus** :
1. Lit `activeContext.md` pour le contexte
2. Analyse l'intention de la demande
3. Charge les skills techniques pertinents
4. Génère un mega-prompt structuré

**Exemple** :
```bash
/skill:enhance Créer un panneau CEP pour contrôler les clones de GridCloner
```

**Résultat attendu** :
```markdown
# MISSION
Créer un panneau CEP pour contrôler les clones de GridCloner...

# CONTEXTE TECHNIQUE
[Résumé du contexte]

# INSTRUCTIONS PAS-À-PAS
1. ...
2. ...

# CONTRAINTES & STANDARDS
- Respecter codingstandards.md
- ...
```

---

### `/skill:docs-updater` - Mise à Jour Documentation

**Usage** : Harmoniser la documentation via analyse statique.

**Processus** :
1. **Audit structurel** : `tree`, `cloc`
2. **Diagnostic triangulé** : Comparer intention vs réalité
3. **Sélection standard** : Choisir les modèles appropriés
4. **Proposition** : Plan de mise à jour
5. **Application** : Modifications validées

**Outils utilisés** :
- `Shell` pour les commandes d'audit
- `fast_read_file` pour le contexte
- `Grep` pour la recherche

**Exemple** :
```bash
/skill:docs-updater
```

---

### `/skill:enhance-complex` - Architecture Complexe

**Usage** : Planifier des tâches complexes avec Shrimp Task Manager.

**Processus** :
1. **Phase 1** : Compréhension du contexte
2. **Phase 2** : Planification avec Shrimp Task Manager
3. **Phase 3** : Réflexion séquentielle
4. **Phase 4** : Implémentation étagée
5. **Phase 5** : Vérification

**Outils Shrimp Task Manager** :
- `plan_task` : Planifier une tâche
- `split_tasks` : Diviser en sous-tâches
- `execute_task` : Exécuter avec guidage
- `verify_task` : Valider et scorer

**Exemple** :
```bash
/skill:enhance-complex Migrer le bridge vers WebSockets avec support multi-clients
```

---

### `/skill:commit-push` - Commit et Push

**Usage** : Committer et pousser les changements vers le dépôt distant.

**Format de message** : Conventional Commits
```
type(scope): description
```

**Types** : `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Processus** :
1. Vérifier les changements (`git status`, `git diff`)
2. Checks qualité (optionnel)
3. Stage (`git add -A`)
4. Commit avec message formaté
5. Push vers origin

**Exemple** :
```bash
# Sans message pré-défini (l'agent demandera)
/skill:commit-push

# Avec message
/skill:commit-push feat(bridge): add WebSocket support
```

---

### `/skill:documentation` - Standards de Rédaction

**Usage** : Charger les guidelines de rédaction technique.

**Contenu** :
- Structure des articles techniques
- Voix narrative vs instructionnelle
- Éviter le style "AI-generated"
- Guidelines de ponctuation
- Structure des READMEs

**Quand l'utiliser** :
- Avant d'écrire de la documentation
- Pour reviewer de la documentation existante
- Pour maintenir un style cohérent

**Exemple** :
```bash
/skill:documentation
```

---

## Bonnes Pratiques

### 1. Choisir le Bon Skill

| Besoin | Skill |
|--------|-------|
| Clôturer une session | `/skill:end` |
| Spécifier une tâche simple | `/skill:enhance` |
| Planifier une tâche complexe | `/skill:enhance-complex` |
| Mettre à jour la doc | `/skill:docs-updater` |
| Rédiger de la doc | `/skill:documentation` |
| Committer du code | `/skill:commit-push` |

### 2. Fournir du Contexte

Les skills fonctionnent mieux avec un contexte clair :

```bash
# Moins bon
/skill:enhance Faire un script

# Mieux
/skill:enhance Créer un script JSX pour dupliquer les calques sélectionnés en grille 3x3 avec 50px d'espacement
```

### 3. Enchaîner les Skills

Pour un workflow complet :

```bash
# 1. Planifier
/skill:enhance-complex Refactoriser le système de handlers

# 2. Après implémentation, mettre à jour la doc
/skill:docs-updater

# 3. Committer
/skill:commit-push

# 4. Clôturer
/skill:end
```

### 4. Vérifier les Résultats

Après chaque skill, vérifier les outputs :

- `/skill:end` → Memory Bank synchronisée
- `/skill:enhance` → Mega-prompt structuré
- `/skill:docs-updater` → Propositions de mise à jour
- `/skill:commit-push` → Changements poussés

## Dépannage

### Skill non trouvé

Vérifier que :
1. Le répertoire `.agents/skills/` existe à la racine du projet
2. Le skill contient un fichier `SKILL.md` valide
3. Le frontmatter YAML est correctement formaté

### Outils non disponibles

Si un outil MCP n'est pas disponible :
- `fast_read_file` → Utiliser `ReadFile`
- `edit_file` → Utiliser `StrReplaceFile`

### Memory Bank inaccessible

Vérifier le chemin absolu :
```
/home/kidpixel/kimi-proxy/memory-bank/
```

## Références

- [Skills Kimi Code CLI](../docs/docs-kimi-code_extension/customization/skills.md)
- [Slash Commands](../docs/docs-kimi-code_extension/reference/slash-commands.md)
- [Memory Bank Protocol](../.clinerules/memorybankprotocol.md)
