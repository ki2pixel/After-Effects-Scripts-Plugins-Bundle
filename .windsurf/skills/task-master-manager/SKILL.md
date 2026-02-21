---
name: task-master-manager
description: Expert en planification utilisant l'API Mistral. Gère les backlogs, roadmaps et analyse de complexité pour transformer les demandes complexes en plans d'action structurés.
---

# Task Master Manager

> **Expertise** : Planification de projet, gestion de backlog, analyse de complexité, transformation PRD en tâches exécutables.

## Quick Start

### Mental Model

Task Master transforme une demande complexe en un plan structuré utilisant l'API Mistral pour :
- Parser les PRD (Product Requirements Documents)
- Analyser la complexité technique
- Générer des backlogs priorisés
- Créer des roadmaps temporaires

### Workflow obligatoire

1. **Parse PRD** : `task-master parse-prd [fichier_prd]`
2. **Analyze Complexity** : `task-master analyze-complexity [tâche]`
3. **Next Steps** : `task-master next` (toujours vérifier)

### Patterns d'utilisation

#### Pour un nouveau projet

```bash
# Parser le document de spécifications
task-master parse-prd specs/project_requirements.md

# Analyser chaque composant principal
task-master analyze-complexity "Architecture backend"
task-master analyze-complexity "Interface utilisateur"
task-master analyze-complexity "Tests et validation"

# Obtenir les prochaines actions
task-master next
```

#### Pour une évolution de fonctionnalité

```bash
# Analyser l'impact
task-master analyze-complexity "Ajout authentification OAuth"

# Générer le backlog technique
task-master parse-prd features/oauth_spec.md
task-master next
```

## Production-safe patterns

### Validation avant exécution

Toujours valider la complexité avant de commencer le développement :

```bash
# Étape 1 : Analyse de complexité
task-master analyze-complexity "Nom de la tâche"

# Étape 2 : Vérification des dépendances
task-master next

# Étape 3 : Lancement du développement
```

### Gestion des priorités

Task Master génère automatiquement des priorités basées sur :
- Dépendances critiques
- Impact utilisateur
- Risque technique
- Effort estimé

### Integration avec Memory Bank

Utilise `fast_read_file` pour charger le contexte avant analyse :
```bash
# Charger le contexte actif
fast_read_file(path="/home/kidpixel/kimi-proxy/memory-bank/activeContext.md")

# Lancer l'analyse
task-master parse-prd current_request.md
```

## Common gotchas

### PRD mal formaté

- Task Master attend des sections claires : Objectifs, Scope, Contraintes
- Utilise des markdown standards avec headers ## et ###
- Les listes de tâches doivent être en format `- [ ] tâche`

### Complexité sous-estimée

- Toujours vérifier `task-master next` après analyse
- Les scores de complexité > 7/10 nécessitent une décomposition supplémentaire
- Les dépendances externes augmentent automatiquement le score

### Backlog overflow

- Limitez à 15 tâches maximum par sprint
- Utilise `task-master prioritize` pour réorganiser
- Les tâches bloquantes doivent être traitées en premier

## API Reference

### Commandes principales

- `task-master parse-prd <fichier>` : Parse un PRD et génère le backlog initial
- `task-master analyze-complexity <tâche>` : Analyse la complexité technique (1-10)
- `task-master next` : Affiche les prochaines actions prioritaires
- `task-master prioritize` : Réorganise le backlog par priorité
- `task-master roadmap <semaines>` : Génère une roadmap temporelle

### Options avancées

- `--format json` : Exporte les résultats en JSON
- `--include-deps` : Inclut l'analyse des dépendances
- `--risk-analysis` : Ajoute l'évaluation des risques

## Debugging checklist

- Confirmer que le PRD est bien formaté en markdown
- Vérifier que `task-master next` retourne des actions concrètes
- En cas de complexité > 7, demander une décomposition supplémentaire
- Utiliser `--format json` pour intégration avec d'autres outils

## When to use this skill

- **Nouveaux projets** : Quand vous avez un PRD ou des spécifications
- **Fonctionnalités complexes** : Quand l'impact dépasse un simple fichier
- **Planification sprint** : Pour organiser le travail sur plusieurs semaines
- **Analyse d'impact** : Quand une modification affecte plusieurs composants
- **Décomposition technique** : Pour transformer une idée en tâches exécutables

## Integration patterns

### Avec Sequential Thinking

Utilise `sequentialthinking-tools` après `task-master analyze-complexity` pour valider la logique de décomposition.

### Avec Fast Filesystem

Utilise `fast_edit_block` pour implémenter les tâches générées par Task Master de manière chirurgicale.

### Avec JSON Query

Utilise `json_query_jsonpath` pour extraire les données de configuration des PRD au format JSON.