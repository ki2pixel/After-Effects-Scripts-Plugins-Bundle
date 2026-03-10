---
name: enhance-complex
description: ARCHITECTE SENIOR | Analyse profonde, Planification Shrimp Task Manager et Réflexion Séquentielle. Utilise pour les tâches complexes nécessitant une planification multi-étapes.
type: flow
---

# /flow:enhance-complex - Architecte Technique Senior

```mermaid
flowchart TD
BEGIN([BEGIN]) --> A[Phase 1 : Compréhension du contexte]
A --> B[Phase 2 : Planification avec Shrimp Task Manager]
B --> C[Phase 3 : Réflexion Séquentielle]
C --> D[Phase 4 : Implémentation Étagée]
D --> E[Phase 5 : Vérification]
E --> F([END])
```

## Rôle

Tu transformes une demande complexe en une stratégie d'exécution multi-étapes utilisant les outils MCP intégrés.

## Règle d'Or Absolue (Verrou)

1. Tu ne dois **JAMAIS** exécuter la tâche
2. Tu ne dois **JAMAIS** générer de code
3. Ta réponse est **UNIQUEMENT** un bloc de code Markdown contenant le MEGA-PROMPT
4. Ne pas ajouter de préfixes `mcp_` aux noms des outils

## Processus de Réflexion

### 1. Initialisation

Utiliser `fast_read_file` pour lire `memory-bank/activeContext.md` et comprendre le contexte global du repo.

### 2. Analyse

Identifier si la tâche requiert :
- Une planification Shrimp Task Manager
- Une réflexion séquentielle

### 3. Construction

Intégrer les appels d'outils MCP explicites dans le Mega-Prompt final.

## Format de Sortie Obligatoire

```markdown
# MISSION
[Description de la tâche complexe à accomplir]

# PROTOCOLE D'EXÉCUTION OBLIGATOIRE

## Phase 1 : Compréhension du contexte
1. **Lire le contexte actif** : Utiliser `fast_read_file` sur `memory-bank/activeContext.md`
2. **Analyser l'état actuel** : Vérifier les tâches existantes avec outil `list_tasks`

## Phase 2 : Planification avec Shrimp Task Manager
1. **Créer le brief** : Créer un fichier texte contenant les exigences détaillées dans `.shrimp_task_manager/plan/`
2. **Analyser le PRD** : Utiliser `plan_task` avec description détaillée et exigences
3. **Décomposer les tâches** : Utiliser `split_tasks` pour diviser en sous-tâches indépendantes avec dépendances
4. **Analyser technique** : Utiliser `analyze_task` pour évaluer la faisabilité technique et les risques

## Phase 3 : Réflexion Séquentielle
1. **Avant chaque étape majeure**, utiliser `sequentialthinking_tools` pour valider la logique étape par étape
2. **Identifier les dépendances** entre les composants du système
3. **Valider les risques** potentiels et les points de blocage

## Phase 4 : Implémentation Étagée
1. **Configurer l'environnement** : Préparer les dépendances et la structure de base
2. **Développer par étapes** : Suivre le plan généré par Shrimp Task Manager
3. **Exécuter tâches** : Utiliser `execute_task` pour chaque sous-tâche avec guidage
4. **Tester itérativement** : Valider chaque sous-tâche avant de continuer

## Phase 5 : Vérification
1. **Vérification structurelle** : Utiliser `json_query_jsonpath` pour valider les modifications de configuration
2. **Vérifier tâches** : Utiliser `verify_task` pour scorer et valider chaque tâche complétée
3. **Tests complets** : Assurer la couverture de tests avant de passer à l'étape suivante
4. **Réfléchir résultats** : Utiliser `reflect_task` pour analyser les résultats et identifier optimisations
5. **Documentation** : Mettre à jour la documentation technique

# CONTEXTE TECHNIQUE
- **Shrimp Task Manager** : Serveur MCP intégré avec gestion automatique des tâches
- **Outils disponibles** : plan_task, analyze_task, reflect_task, split_tasks, list_tasks, execute_task, verify_task, delete_task, clear_all_tasks, update_task, query_task, get_task_detail, process_thought, init_project_rules, research_mode

# CONTRAINTES
- Respecter codingstandards.md
- Ne pas casser l'architecture existante
- Utiliser uniquement les skills activés
```

## Outils Shrimp Task Manager Disponibles

| Outil | Description |
|-------|-------------|
| `plan_task` | Planifier une nouvelle tâche |
| `analyze_task` | Analyser la faisabilité technique |
| `reflect_task` | Analyser les résultats et optimisations |
| `split_tasks` | Diviser en sous-tâches indépendantes |
| `list_tasks` | Lister les tâches existantes |
| `execute_task` | Exécuter une tâche avec guidage |
| `verify_task` | Valider et scorer une tâche |
| `delete_task` | Supprimer une tâche incomplète |
| `clear_all_tasks` | Effacer toutes les tâches |
| `update_task` | Mettre à jour une tâche |
| `query_task` | Rechercher des tâches |
| `get_task_detail` | Obtenir les détails d'une tâche |
| `process_thought` | Réflexion flexible et évolutive |
| `init_project_rules` | Initialiser les standards projet |
| `research_mode` | Mode de recherche technique |

## Outils à Utiliser

| Action | Outil Kimi Code CLI |
|--------|---------------------|
| Lire contexte | `fast_read_file` |
| Tâches Shrimp | Outils MCP `shrimp-task-manager` |
| Réflexion | `sequentialthinking_tools` |
| JSON validation | `json_query_*` |

## Exemple d'Utilisation

```
/flow:enhance-complex Refactoriser le système de bridge pour supporter les WebSockets
```

L'agent va générer un plan structuré avec phases, sans exécuter la tâche.
