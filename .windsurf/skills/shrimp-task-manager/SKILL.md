---
name: shrimp-task-manager
description: Expert en gestion de tâches via les outils shrimp-task-manager. Gère les backlogs, roadmaps et analyse de complexité pour transformer les demandes complexes en plans d'action structurés.
---

# Shrimp Task Manager

> **Expertise** : Planification de projet, gestion de backlog, analyse de complexité, transformation PRD en tâches exécutables via outils shrimp-task-manager.

## Quick Start

### Mental Model

Shrimp Task Manager transforme une demande complexe en un plan structuré utilisant les outils shrimp-task-manager pour :
- Parser les PRD (Product Requirements Documents)
- Analyser la complexité technique
- Générer des backlogs priorisés
- Créer des roadmaps temporaires

### Workflow obligatoire

1. **Plan Task** : Utiliser `plan_task` pour recevoir des conseils de planification structurés
2. **Analyze Task** : `analyze_task` pour analyser les exigences en profondeur et évaluer la faisabilité
3. **Reflect Task** : `reflect_task` pour réviser l'analyse et identifier les optimisations
4. **Split Tasks** : `split_tasks` pour décomposer en sous-tâches indépendantes avec dépendances
5. **Execute Task** : `execute_task` pour exécuter les tâches avec guidance étape par étape
6. **Verify Task** : `verify_task` pour valider avec scoring selon les critères de qualité

### Patterns d'utilisation

#### Pour un nouveau projet

```bash
# Planification initiale
plan_task(description="Description complète du projet", requirements="Exigences techniques", existingTasksReference=false)

# Analyse technique
analyze_task(summary="Résumé structuré du projet", initialConcept="Concept initial avec solution technique", previousAnalysis="")

# Décomposition
split_tasks(updateMode="clearAllTasks", tasksRaw="[liste des tâches structurées]")

# Exécution guidée
execute_task(taskId="ID de la tâche")

# Vérification
verify_task(taskId="ID de la tâche", summary="Résumé", score=85)
```

#### Pour une évolution de fonctionnalité

```bash
# Analyse d'impact
analyze_task(summary="Impact de la fonctionnalité", initialConcept="Solution proposée", previousAnalysis="")

# Décomposition en sous-tâches
split_tasks(updateMode="append", tasksRaw="[sous-tâches]")

# Exécution itérative
execute_task(taskId="ID sous-tâche")
verify_task(taskId="ID sous-tâche", summary="Validation", score=90)
```

## Production-safe patterns

### Validation avant exécution

Toujours analyser avec `analyze_task` avant de commencer le développement :

```bash
# Étape 1 : Analyse de complexité
analyze_task(summary="Analyse tâche", initialConcept="Solution", previousAnalysis="")

# Étape 2 : Revue critique
reflect_task(summary="Résumé", analysis="Résultats analyse")

# Étape 3 : Décomposition
split_tasks(updateMode="overwrite", tasksRaw="[tâches]")
```

### Gestion des priorités

Shrimp Task Manager génère automatiquement des priorités basées sur :
- Dépendances critiques
- Impact utilisateur
- Risque technique
- Effort estimé

### Integration avec Memory Bank

Utilise `fast_read_file` pour charger le contexte avant analyse :
```bash
# Charger le contexte actif
fast_read_file path="/absolute/path/to/activeContext.md"

# Lancer l'analyse
analyze_task(summary="Contexte chargé", initialConcept="Solution", previousAnalysis="")
```

## Common gotchas

### Tâches trop complexes

- Utiliser `split_tasks` avec les règles de granularité (1-2 jours par tâche)
- Éviter plus de 10 sous-tâches d'un coup
- Respecter les 3 niveaux maximum de profondeur

### Dépendances manquées

- Spécifier explicitement les dépendances dans `split_tasks`
- Vérifier le graphe de dépendances généré automatiquement
- Utiliser `list_tasks` pour visualiser les enchaînements

### Scores de vérification faibles

- Relire les critères dans `get_task_detail`
- Utiliser `update_task` pour améliorer la tâche avant reverification
- Scores < 80 nécessitent correction obligatoire

## API Reference

### Outils principaux

- `plan_task(description, requirements, existingTasksReference)` : Planification de tâches avec guidance structuré. Arguments : description(string), requirements(string), existingTasksReference(boolean)
- `analyze_task(summary, initialConcept, previousAnalysis)` : Analyse approfondie des exigences. Arguments : summary(string), initialConcept(string), previousAnalysis(string)
- `reflect_task(summary, analysis)` : Revue critique des analyses. Arguments : summary(string), analysis(string)
- `split_tasks(updateMode, tasksRaw, globalAnalysisResult)` : Décomposition en sous-tâches. Arguments : updateMode(string), tasksRaw(string), globalAnalysisResult(string)
- `list_tasks(status)` : Liste structurée des tâches. Arguments : status(string)
- `execute_task(taskId)` : Exécution guidée d'une tâche. Arguments : taskId(string)
- `verify_task(taskId, summary, score)` : Vérification et scoring. Arguments : taskId(string), summary(string), score(number)
- `delete_task(taskId)` : Suppression tâches incomplètes. Arguments : taskId(string)
- `clear_all_tasks(confirm)` : Nettoyage avec sauvegarde. Arguments : confirm(boolean)
- `update_task(taskId, name, description, ...)` : Mise à jour contenu. Arguments : taskId(string) + champs optionnels
- `query_task(query, isId, page, pageSize)` : Recherche de tâches. Arguments : query(string), isId(boolean), page(integer), pageSize(integer)
- `get_task_detail(taskId)` : Détails complets. Arguments : taskId(string)
- `process_thought(thought, thought_number, total_thoughts, next_thought_needed, stage, tags, axioms_used, assumptions_challenged)` : Pensée flexible. Arguments : thought(string) + métadonnées
- `init_project_rules()` : Initialisation standards projet. Arguments : aucun
- `research_mode(topic, previousState, currentState, nextSteps)` : Mode recherche. Arguments : topic(string) + états

### Options avancées

- `updateMode` dans `split_tasks` : 'append', 'overwrite', 'selective', 'clearAllTasks'
- `status` dans `list_tasks` : 'all', ou statut spécifique
- `stage` dans `process_thought` : Problem Definition, Information Gathering, Analysis, etc.

## Debugging checklist

- Confirmer que les tâches respectent la granularité (1-2 jours)
- Vérifier que `split_tasks` génère < 10 sous-tâches
- Utiliser `verify_task` avec score ≥ 80
- Employer `process_thought` pour la réflexion complexe
- `research_mode` pour les recherches techniques

## When to use this skill

- **Nouveaux projets** : Quand vous avez un PRD ou des spécifications
- **Fonctionnalités complexes** : Quand l'impact dépasse un simple fichier
- **Planification sprint** : Pour organiser le travail sur plusieurs semaines
- **Analyse d'impact** : Quand une modification affecte plusieurs composants
- **Décomposition technique** : Pour transformer une idée en tâches exécutables

## Integration patterns

### Avec Sequential Thinking

Utilise `process_thought` avec `sequentialthinking-tools` pour valider la logique de décomposition et assurer la cohérence.

### Avec Fast Filesystem

Utilise `fast_edit_block` pour implémenter les tâches générées par Shrimp Task Manager de manière chirurgicale.

### Avec JSON Query

Utilise `json_query_jsonpath` pour extraire les données de configuration des PRD au format JSON.