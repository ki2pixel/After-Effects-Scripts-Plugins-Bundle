---
name: json-query-expert
description: Expert en manipulation de données JSON massives via le pattern "Sniper". Stratégie : Ne jamais charger un fichier > 1000 lignes. Inspection via json_query_query_json. Édition via edit_file.
---

# JSON Query Expert

> **Expertise** : Manipulation chirurgicale de JSON massifs, extraction précise via JSONPath, optimisation token pour fichiers de configuration.

## Quick Start

### Mental Model

JSON Query Expert utilise le pattern "Sniper" pour les fichiers JSON :
- Jamais de chargement complet de fichiers > 1000 lignes
- Extraction ciblée avec `json_query_query_json`
- Localisation précise avant édition
- Modification chirurgicale avec `edit_file`

### Workflow obligatoire

1. **Inspection** : `json_query_query_json` pour localiser les données
2. **Localisation** : Trouver les lignes exactes dans le fichier
3. **Édition** : `edit_file` pour modification ciblée
4. **Validation** : Vérification minimale du résultat

### Patterns d'utilisation

#### Pour modification de configuration

```bash
# 1. Localiser la configuration cible
json_query_query_json json_data="{...}" query="$.scripts.dev"

# 2. Trouver les lignes correspondantes
json_query_search_keys json_data="{...}" pattern="scripts.dev"

# 3. Éditer chirurgicalement
edit_file path="package.json" edits='[{"oldText": "\"dev\": \"vite\"", "newText": "\"dev\": \"vite --port 3000\""}]'
```

#### Pour manipulation de i18n

```bash
# 1. Extraire uniquement les traductions nécessaires
json_query_query_json json_data="{...}" query="$.pages.home.title"

# 2. Localiser les clés manquantes
json_query_search_keys json_data="{...}" pattern="pages.home"

# 3. Ajouter les traductions manquantes
edit_file path="locales/fr.json" edits='[{"oldText": "\"title\": \"\"", "newText": "\"title\": \"Page d'\''accueil\""}]'
```

## Production-safe patterns

### Pattern "Sniper" pour fichiers massifs

```bash
# ❌ JAMAIS charger un gros fichier entièrement
read_file massive_manifest.json  # 5000+ lignes = PROHIBÉ

# ✅ Pattern "Sniper" obligatoire
# D'abord fast_read_multiple_files ou fast_read_file
# 1. Inspection ciblée
json_query_query_json json_data="{...}" query="$.components[0].props"

# 2. Localisation précise  
json_query_search_keys json_data="{...}" pattern="components[0].props"

# 3. Édition chirurgicale
edit_file path="massive_manifest.json" edits='[{"oldText": "\"newProp\": \"old\"", "newText": "\"newProp\": \"value\""}]'
```

### Recherche multi-niveaux

```bash
# Pour structures JSON complexes
json_query_query_json json_data="{...}" query="$.database.connections[0].host"
json_query_query_json json_data="{...}" query="$.api.endpoints[*].url"

# Rechercher toutes les clés d'un niveau
json_query_search_keys json_data="{...}" pattern="database.connections"
```

### Validation avant modification

```bash
# 1. Vérifier l'existence du chemin
json_query_query_json json_data="{...}" query="$.deep.nested.path"

# 2. Confirmer la valeur actuelle
json_query_query_json json_data="{...}" query="$.deep.nested.path.value"

# 3. Localiser pour édition
json_query_search_keys json_data="{...}" pattern="deep.nested.path"
```

## Token optimization strategies

### Inspection avant chargement

```bash
# Toujours inspecter avant de lire
json_query_query_json json_data="{...}" query="$.featureFlags"

# Si trouvé et petit, alors lire avec contexte
fast_read_multiple_files large_config.json --lines 100-120 --context 2

# Sinon, continuer avec les requêtes JSONPath
```

### Extraction de sous-structures

```bash
# Extraire uniquement la branche nécessaire
json_query_query_json json_data="{...}" query="$.permissions"

# Plutôt que charger tout le manifest
read_file manifest.json  # 3000+ lignes = GASPILLAGE
```

### Recherche de clés multiples

```bash
# Rechercher toutes les occurrences d'une clé
json_query_search_keys json_data="{...}" pattern="*.button.*"

# Filtrer par pattern
json_query_search_keys json_data="{...}" pattern="database.*.port"
```

## Common gotchas

### Fichiers > 1000 lignes

RÈGLE D'OR : Jamais charger entièrement les fichiers JSON > 1000 lignes

```bash
# ❌ PROHIBÉ
read_file massive_i18n.json  # 15000 lignes

# ✅ OBLIGATOIRE
json_query_query_json json_data="{...}" query="$.fr.common.buttons[*]"
json_query_search_keys json_data="{...}" pattern="fr.common"
```

### JSONPath syntax errors

```bash
# Syntaxe correcte pour JSONPath
json_query_query_json json_data="{...}" query="$.root.array[0].property"  # ✅

# Éviter les chemins relatifs
json_query_query_json json_data="{...}" query="array[0].property"  # ❌
```

### Localisation de lignes incorrecte

```bash
# Toujours vérifier que les lignes existent
json_query_search_keys json_data="{...}" pattern="target.key"

# Confirmer avant édition
fast_read_multiple_files target.json --lines 50-60 --context 1
```

### Modifications cassant la syntaxe JSON

```bash
# Valider la syntaxe après modification
json_query_query_json json_data="{...}" query="$.root"  # Test de validité

# Utiliser dryRun
edit_file path="file.json" edits='[{"oldText": "old_value,", "newText": "value,"}]' dryRun=true
```

## API Reference

### Commandes principales

- `json_query_query_json json_data="{...}" query="<path>"` : Extraction ciblée via JSONPath (nécessite la lecture préalable)
- `json_query_search_keys json_data="{...}" pattern="<pattern>"` : Recherche de clés par pattern
- `edit_file <file>` : Édition chirurgicale (voir Fast Filesystem Ops)

### Patterns JSONPath courants

```bash
# Racine
json_query_query_json json_data="{...}" query="$"

# Propriété simple
json_query_query_json json_data="{...}" query="$.propertyName"

# Élément de tableau
json_query_query_json json_data="{...}" query="$.array[0]"

# Tous les éléments
json_query_query_json json_data="{...}" query="$.array[*]"

# Recherche récursive
json_query_query_json json_data="{...}" query="$..deeplyNested"

# Filtrage
json_query_query_json json_data="{...}" query="$.array[?(@.type=='button')]"
```

### Patterns de recherche de clés

```bash
# Recherche exacte
json_query_search_keys json_data="{...}" pattern="exact.key.name"

# Recherche avec wildcard
json_query_search_keys json_data="{...}" pattern="prefix.*.suffix"

# Recherche récursive
json_query_search_keys json_data="{...}" pattern="**.targetKey"

# Recherche d'indices
json_query_search_keys json_data="{...}" pattern="array[?]"
```

### Options avancées

- `--pretty` : Formater la sortie JSON
- `--raw` : Sortie brute sans formatage
- `--count` : Compter les occurrences
- `--unique` : Dédupliquer les résultats

## Debugging checklist

- Confirmer que le fichier JSON est valide avant requêtes
- Vérifier la syntaxe JSONPath (commence par $)
- Tester les requêtes sur petits échantillons d'abord
- Valider que les lignes localisées existent vraiment
- Contrôler la syntaxe JSON après modifications

## When to use this skill

- **Fichiers de configuration** : package.json, tsconfig.json, manifest.json
- **Traductions i18n** : Fichiers de traduction volumineux
- **Données structurées** : JSON > 1000 lignes
- **Configurations complexes** : webpack, babel, eslint configs
- **Métadonnées** : lock files, caches, états sérialisés
- **API responses** : Fichiers de mock ou fixtures

## Integration patterns

### Avec Fast Filesystem

Utilise `edit_file` pour les modifications après localisation avec `json_query_query_json`.

### Avec Sequential Thinking

Utilise `sequentialthinking_tools` pour valider la logique des transformations JSON.

### Avec Task Master

Utilise pour manipuler les fichiers de configuration générés par Task Master.

## File type specific strategies

### package.json
```bash
json_query_query_json json_data="{...}" query="$.scripts"
json_query_search_keys json_data="{...}" pattern="dependencies"
```

### manifest.json (Chrome/Extension)
```bash
json_query_query_json json_data="{...}" query="$.permissions"
json_query_search_keys json_data="{...}" pattern="content_scripts"
```

### tsconfig.json
```bash
json_query_query_json json_data="{...}" query="$.compilerOptions"
json_query_search_keys json_data="{...}" pattern="include"
```

### i18n files
```bash
json_query_query_json json_data="{...}" query="$.fr.pages[*].title"
json_query_search_keys json_data="{...}" pattern="*.buttons.*"
```