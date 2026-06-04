---
name: fast-filesystem-ops
description: Expert en édition chirurgicale. Obligation d'utiliser edit_file pour préserver les tokens. Recherche globale via fast_search_files.
---

# Fast Filesystem Operations

> **Expertise** : Édition chirurgicale de fichiers, optimisation token, recherche efficace, manipulation précise de codebase.

## Quick Start

### Mental Model

Fast Filesystem Ops optimise chaque opération fichier pour minimiser l'usage de tokens :
- Édition ciblée avec `edit_file`
- Recherche intelligente avec `fast_search_files`
- Lecture multiple avec `fast_read_multiple_files`
- Évitement des chargements inutiles

### Workflow obligatoire

1. **Localisation** : `fast_search_files` pour trouver les cibles
2. **Lecture minimale** : `fast_read_multiple_files` uniquement des sections nécessaires
3. **Édition chirurgicale** : `edit_file` pour modifications précises
4. **Validation** : Vérification minimale des changements

### Patterns d'utilisation

#### Pour modification de fonction spécifique

```bash
# 1. Localiser la fonction
fast_search_files "function calculateTotal" --language python

# 2. Lire uniquement le fichier contenant la fonction
fast_read_multiple_files src/calculations.py --lines 45-67

# 3. Éditer chirurgicalement
edit_file path="src/calculations.py" edits='[{"oldText": "old_code", "newText": "new_function_code"}]'
```

#### Pour refactoring multi-fichiers

```bash
# 1. Rechercher toutes les occurrences
fast_search_files "deprecated_function" --language javascript

# 2. Lire les sections pertinentes de chaque fichier
fast_read_multiple_files file1.js file2.js file3.js --context 3

# 3. Éditer chaque occurrence chirurgicalement
edit_file path="file1.js" edits='[{"oldText": "deprecated_function", "newText": "new_function_call"}]'
edit_file path="file2.js" edits='[{"oldText": "deprecated_function", "newText": "new_function_call"}]'
```

## Production-safe patterns

### Recherche optimisée

```bash
# Recherche ciblée avec filtres
fast_search_files "class UserController" --language python --exclude test/

# Recherche par pattern avec contexte limité
fast_search_files "TODO.*performance" --context 2

# Recherche multi-langages
fast_search_files "import.*React" --language javascript,typescript
```

### Lecture chirurgicale

```bash
# Lire uniquement les lignes nécessaires
fast_read_multiple_files large_file.py --lines 1000-1050

# Lire avec contexte minimal
fast_read_multiple_files config.json --context 1

# Lecture multi-fichiers optimisée
fast_read_multiple_files src/*.js --pattern "export.*function"
```

### Édition précise

```bash
# Édition chirurgicale avec format MCP (ou utiliser replace_file_content nativement)
edit_file path="src/app.js" edits='[{"oldText": "oldCode", "newText": "newCode"}]'

# Édition de bloc
edit_file path="src/app.js" edits='[{"oldText": "oldBlock", "newText": "newBlock"}]'

# Édition multiple
edit_file path="src/app.js" edits='[{"oldText": "oldPattern", "newText": "newPattern"}]'
```

## Token optimization strategies

### Éviter les chargements massifs

❌ **Incorrect** :
```bash
read_file large_project/src/entier_fichier.py  # 5000+ lignes
```

✅ **Correct** :
```bash
fast_search_files "function targetFunction" --language python
fast_read_multiple_files target_file.py --lines 100-150
edit_file path="target_file.py" edits='[{"oldText": "targetFunction", "newText": "optimized code"}]'
```

### Recherche avant lecture

Toujours rechercher avant de lire :
```bash
# 1. Localiser
fast_search_files "targetPattern" --language typescript

# 2. Lire uniquement les résultats
fast_read_multiple_files results... --context 2

# 3. Éditer
edit_file path="target_file.ts" edits='[{"oldText": "targetPattern", "newText": "new code"}]'
```

### Lecture multiple optimisée

```bash
# Lire plusieurs fichiers en une seule passe
fast_read_multiple_files file1.js file2.js file3.js --pattern "export.*"

# Plutôt que
read_file file1.js
read_file file2.js  
read_file file3.js
```

## Common gotchas

### Fichiers volumineux (>1000 lignes)

```bash
# ❌ Ne jamais charger entièrement
read_file massive_config.json  # 5000+ lignes

# ✅ Utiliser JSON Query pour les gros JSON
json_query_query_json json_data="{...}" query="$.database.connection"

# ✅ Pour code, recherche ciblée
fast_search_files "database.*connection" --language python
fast_read_multiple_files config.py --lines 50-60
```

### Éditions en cascade

```bash
# Pour modifications multi-fichiers, utiliser la lecture multiple
fast_read_multiple_files file1.js file2.js file3.js --pattern "oldFunction"

# Puis éditer séquentiellement
edit_file path="file1.js" edits='[{"oldText": "oldFunction", "newText": "newFunction"}]'
edit_file path="file2.js" edits='[{"oldText": "oldFunction", "newText": "newFunction"}]'
```

### Contexte insuffisant

```bash
# Toujours inclure un peu de contexte pour éviter les erreurs
fast_read_multiple_files target.py --lines 100-120 --context 3

# Plutôt que
fast_read_multiple_files target.py --lines 100-120  # Risque d'erreur
```

## API Reference

### Commandes principales

- `fast_search_files "<pattern>"` : Recherche intelligente avec options
- `fast_read_multiple_files <files>` : Lecture optimisée multi-fichiers  
- `edit_file` (via filesystem-agent) : Édition chirurgicale précise avec `path` et `edits`

### Options de recherche

- `--language <lang>` : Filtrer par langage (python, javascript, typescript, etc.)
- `--exclude <pattern>` : Exclure fichiers/dossiers
- `--context <n>` : Nombre de lignes de contexte
- `--max-results <n>` : Limiter nombre de résultats

### Options de lecture

- `--lines <start-end>` : Lignes spécifiques
- `--context <n>` : Lignes de contexte supplémentaires
- `--pattern <regex>` : Filtrer lignes par pattern

### Paramètres d'édition (MCP filesystem-agent)

- `path` : Chemin absolu du fichier
- `edits` : Tableau d'objets `[{"oldText": "...", "newText": "..."}]`
- `dryRun` : (Optionnel) Validation sans appliquer

## Debugging checklist

- Confirmer que la recherche retourne les bons fichiers avant lecture
- Vérifier que les lignes spécifiées existent dans les fichiers
- Tester les patterns de recherche sur petits échantillons
- Valider que les éditions ne cassent pas la syntaxe
- Contrôler l'usage token après chaque opération

## When to use this skill

- **Fichiers volumineux** : Quand les fichiers dépassent 1000 lignes
- **Modifications ciblées** : Pour changer des fonctions spécifiques
- **Refactoring** : Quand plusieurs fichiers nécessitent des changements
- **Recherche globale** : Pour trouver des patterns dans tout le codebase
- **Optimisation token** : Quand l'usage de tokens est critique
- **Édition chirurgicale** : Pour modifications précises sans effets de bord

## Integration patterns

### Avec Sequential Thinking

Utilise `sequentialthinking_tools` pour valider la logique des modifications avant édition.

### Avec Task Master

Utilise pour implémenter les tâches générées par Task Master de manière optimisée.

### Avec JSON Query

Utilise `json_query_query_json` pour les fichiers JSON volumineux avant édition.