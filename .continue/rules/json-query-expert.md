---
name: json-query-expert
description: Expert en manipulation de données JSON massives via le pattern "Sniper". Stratégie | Ne jamais charger un fichier > 1000 lignes. Inspection via json_query_jsonpath. Édition via fast_edit_block.
alwaysApply: false
---

# JSON Query Expert

> **Expertise** : Manipulation chirurgicale de JSON massifs, extraction précise via JSONPath, optimisation token pour fichiers de configuration.

## Quick Start

### Mental Model

JSON Query Expert utilise le pattern "Sniper" pour les fichiers JSON :
- Jamais de chargement complet de fichiers > 1000 lignes
- Extraction ciblée avec `json_query_jsonpath`
- Localisation précise avant édition
- Modification chirurgicale avec `fast_edit_block`

### Workflow obligatoire

1. **Inspection** : `json_query_jsonpath` pour localiser les données
2. **Localisation** : Trouver les lignes exactes dans le fichier
3. **Édition** : `fast_edit_block` pour modification ciblée
4. **Validation** : Vérification minimale du résultat

### Patterns d'utilisation

#### Pour modification de configuration

```bash
# 1. Localiser la configuration cible
json_query_jsonpath package.json "$.scripts.dev"

# 2. Trouver les lignes correspondantes
json_query_search_keys package.json "scripts.dev"

# 3. Éditer chirurgicalement
fast_edit_block package.json --line 15 --replacement '"dev": "vite --port 3000",'
```

#### Pour manipulation de i18n

```bash
# 1. Extraire uniquement les traductions nécessaires
json_query_jsonpath locales/fr.json "$.pages.home.title"

# 2. Localiser les clés manquantes
json_query_search_keys locales/fr.json "pages.home"

# 3. Ajouter les traductions manquantes
fast_edit_block locales/fr.json --line 45 --replacement '"title": "Page d''accueil",'
```

## Production-safe patterns

### Pattern "Sniper" pour fichiers massifs

```bash
# ❌ JAMAIS charger un gros fichier entièrement
read_file massive_manifest.json  # 5000+ lignes = PROHIBÉ

# ✅ Pattern "Sniper" obligatoire
# 1. Inspection ciblée
json_query_jsonpath massive_manifest.json "$.components[0].props"

# 2. Localisation précise  
json_query_search_keys massive_manifest.json "components[0].props"

# 3. Édition chirurgicale
fast_edit_block massive_manifest.json --line 234 --replacement '"newProp": "value",'
```

### Recherche multi-niveaux

```bash
# Pour structures JSON complexes
json_query_jsonpath config.json "$.database.connections[0].host"
json_query_jsonpath config.json "$.api.endpoints[*].url"

# Rechercher toutes les clés d'un niveau
json_query_search_keys config.json "database.connections"
```

### Validation avant modification

```bash
# 1. Vérifier l'existence du chemin
json_query_jsonpath target.json "$.deep.nested.path"

# 2. Confirmer la valeur actuelle
json_query_jsonpath target.json "$.deep.nested.path.value"

# 3. Localiser pour édition
json_query_search_keys target.json "deep.nested.path"
```

## Token optimization strategies

### Inspection avant chargement

```bash
# Toujours inspecter avant de lire
json_query_jsonpath large_config.json "$.featureFlags"

# Si trouvé et petit, alors lire avec contexte
fast_read_multiple_files large_config.json --lines 100-120 --context 2

# Sinon, continuer avec les requêtes JSONPath
```

### Extraction de sous-structures

```bash
# Extraire uniquement la branche nécessaire
json_query_jsonpath manifest.json "$.permissions"

# Plutôt que charger tout le manifest
read_file manifest.json  # 3000+ lignes = GASPILLAGE
```

### Recherche de clés multiples

```bash
# Rechercher toutes les occurrences d'une clé
json_query_search_keys translations.json "*.button.*"

# Filtrer par pattern
json_query_search_keys config.json "database.*.port"
```

## Common gotchas

### Fichiers > 1000 lignes

RÈGLE D'OR : Jamais charger entièrement les fichiers JSON > 1000 lignes

```bash
# ❌ PROHIBÉ
read_file massive_i18n.json  # 15000 lignes

# ✅ OBLIGATOIRE
json_query_jsonpath massive_i18n.json "$.fr.common.buttons[*]"
json_query_search_keys massive_i18n.json "fr.common"
```

### JSONPath syntax errors

```bash
# Syntaxe correcte pour JSONPath
json_query_jsonpath file.json "$.root.array[0].property"  # ✅

# Éviter les chemins relatifs
json_query_jsonpath file.json "array[0].property"  # ❌
```

### Localisation de lignes incorrecte

```bash
# Toujours vérifier que les lignes existent
json_query_search_keys target.json "target.key"

# Confirmer avant édition
fast_read_multiple_files target.json --lines 50-60 --context 1
```

### Modifications cassant la syntaxe JSON

```bash
# Valider la syntaxe après modification
json_query_jsonpath modified.json "$.root"  # Test de validité

# Utiliser l'option --validate si disponible
fast_edit_block file.json --line X --replacement "value," --validate
```

## API Reference

### Commandes principales

- `json_query_jsonpath <file> "<path>"` : Extraction ciblée via JSONPath
- `json_query_search_keys <file> "<pattern>"` : Recherche de clés par pattern
- `fast_edit_block <file>` : Édition chirurgicale (voir Fast Filesystem Ops)

### Patterns JSONPath courants

```bash
# Racine
json_query_jsonpath file.json "$"

# Propriété simple
json_query_jsonpath file.json "$.propertyName"

# Élément de tableau
json_query_jsonpath file.json "$.array[0]"

# Tous les éléments
json_query_jsonpath file.json "$.array[*]"

# Recherche récursive
json_query_jsonpath file.json "$..deeplyNested"

# Filtrage
json_query_jsonpath file.json "$.array[?(@.type=='button')]"
```

### Patterns de recherche de clés

```bash
# Recherche exacte
json_query_search_keys file.json "exact.key.name"

# Recherche avec wildcard
json_query_search_keys file.json "prefix.*.suffix"

# Recherche récursive
json_query_search_keys file.json "**.targetKey"

# Recherche d'indices
json_query_search_keys file.json "array[?]"
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

Utilise `fast_edit_block` pour les modifications après localisation avec `json_query_jsonpath`.

### Avec Sequential Thinking

Utilise `sequentialthinking_tools` pour valider la logique des transformations JSON.

### Avec Shrimp Task Manager

Utilise pour manipuler les fichiers de configuration générés par Shrimp Task Manager.

## File type specific strategies

### package.json
```bash
json_query_jsonpath package.json "$.scripts"
json_query_search_keys package.json "dependencies"
```

### manifest.json (Chrome/Extension)
```bash
json_query_jsonpath manifest.json "$.permissions"
json_query_search_keys manifest.json "content_scripts"
```

### tsconfig.json
```bash
json_query_jsonpath tsconfig.json "$.compilerOptions"
json_query_search_keys tsconfig.json "include"
```

### i18n files
```bash
json_query_jsonpath locales.json "$.fr.pages[*].title"
json_query_search_keys locales.json "*.buttons.*"
```