---
name: sequentialthinking-logic
description: Expert en raisonnement décomposé. Force l'usage de sequentialthinking_tools pour valider la logique Background/Content Script des extensions et architectures complexes.
---

# Sequential Thinking Logic

> **Expertise** : Raisonnement décomposé, validation logique, analyse étape par étape, pensée structurée pour architectures complexes.

## Quick Start

### Mental Model

Sequential Thinking Logic décompose les problèmes complexes en séquences logiques validées :
- Analyse Background Script vs Content Script
- Validation des flux de données
- Identification des points de défaillance
- Construction de chaînes de raisonnement robustes

### Workflow obligatoire

1. **Décomposition** : Identifier les composants logiques principaux
2. **Validation** : Utiliser `sequentialthinking_tools` pour chaque étape
3. **Chaînage** : Connecter les étapes en une séquence cohérente
4. **Test logique** : Valider les hypothèses et points de rupture

### Patterns d'utilisation

#### Pour architecture d'extension

```json
// Décomposer l'architecture
{
  "thought": "[Décomposition] Extension Chrome: Background <-> Content <-> API",
  "thoughtNumber": 1,
  "totalThoughts": 4,
  "nextThoughtNeeded": true
}

// Valider chaque composant
{
  "thought": "[Validation] Background script logic",
  "thoughtNumber": 2,
  "totalThoughts": 4,
  "nextThoughtNeeded": true
}
```

#### Pour logique métier complexe

```json
// Analyser le flux métier
{
  "thought": "[Décomposition] User authentication flow",
  "thoughtNumber": 1,
  "totalThoughts": 6,
  "nextThoughtNeeded": true
}
```

## Production-safe patterns

### Validation systématique

Pour chaque composant logique :

```json
// Utiliser la variable "thought" pour structurer l'étape :
{
  "thought": "[Décomposition] Analyse de composant...",
  "thoughtNumber": 1,
  "totalThoughts": 4,
  "nextThoughtNeeded": true
}
// Suivi de [Validation] sous-composant_1, etc.
```

### Background vs Content Script

Pattern spécifique pour extensions web :

```json
// Formuler le thought explicitement :
{
  "thought": "[Validation-Background] event_listeners & message_routing",
  "thoughtNumber": 1,
  "totalThoughts": 3,
  "nextThoughtNeeded": true
}
```

### Gestion des erreurs logiques

```json
// Points de défaillance
{
  "thought": "[Points de rupture] Analyse des failles du flux...",
  "thoughtNumber": 1,
  "totalThoughts": 3,
  "nextThoughtNeeded": true
}
```

## Common gotchas

### Séquences incomplètes

- Toujours valider le début ET la fin de chaque séquence
- Les points de décision doivent avoir tous les cas couverts
- Les boucles doivent avoir des conditions de sortie claires

### Dépendances circulaires

```json
{
  "thought": "[Détection de cycles] Validation de l'architecture...",
  "thoughtNumber": 1,
  "totalThoughts": 2,
  "nextThoughtNeeded": true
}
```

### Background/Content contamination

- Éviter de mélanger logique UI et logique métier
- Isoler les communications entre scripts
- Valider les contextes d'exécution séparément

## API Reference

### Configuration de l'Outil MCP

L'outil `sequentialthinking_tools` accepte un objet JSON avec les paramètres suivants :
- `thought` (string) : Votre raisonnement actuel. C'est ici qu'il faut utiliser les préfixes comme `[Décomposition]`, `[Validation]`, `[Test-Séquence]`.
- `thoughtNumber` (integer) : Le numéro de l'étape courante.
- `totalThoughts` (integer) : Le nombre total estimé d'étapes.
- `nextThoughtNeeded` (boolean) : Vrai s'il faut continuer le raisonnement.

*Note : Les anciennes commandes CLI n'existent pas. Tout le contexte doit être structuré dans la variable `thought`.*

## Debugging checklist

- Confirmer que chaque étape a une entrée ET une sortie
- Vérifier que les points de décision sont complets
- Tester les cas limites et erreurs
- Valider les communications entre composants
- Contrôler l'absence de dépendances circulaires

## When to use this skill

- **Architecture d'extensions** : Chrome/Firefox Background/Content Scripts
- **Logique métier complexe** : Flux multi-étapes avec validations
- **Systèmes distribués** : Communication entre services
- **Algorithmes séquentiels** : Traitement par étapes
- **Validation de design** : Revue logique d'architectures
- **Debugging logique** : Analyse de raisonnement défaillant

## Integration patterns

### Avec Task Master

Utilise après `analyze_task` (serveur `shrimp-task-manager`) pour valider la décomposition logique des tâches.

### Avec Fast Filesystem

Utilise pour valider la logique avant les édition chirurgicales avec `edit_file`.

### Avec JSON Query

Utilise `json_query_query_json` pour extraire les structures logiques des fichiers de configuration avant validation.