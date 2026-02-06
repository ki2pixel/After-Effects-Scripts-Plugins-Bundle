---
description: Docs Updater, Standard Tools, Cloc Radon, Quality Context
---

---
description: Docs Updater (Standard Tools: Cloc/Radon + Quality Context)
---

# Workflow: Docs Updater — Standardized & Metric-Driven

> Ce workflow harmonise la documentation en utilisant l'analyse statique standard (`cloc`, `radon`, `tree`) pour la précision technique et les modèles de référence pour la qualité éditoriale.

## 🚨 Protocoles Critiques
1.  **Outils autorisés** : L'usage de `run_command` est **strictement limité** aux commandes d'audit : `tree`, `cloc`, `radon`, `ls`.
2.  **Contexte** : Charger la Memory Bank (`productContext.md`, `systemPatterns.md`, `activeContext.md`, `progress.md`) via `read_file` avant toute action.
3.  **Source de Vérité** : Le Code (analysé par outils) > La Documentation existante > La Mémoire.

## Étape 1 — Audit Structurel et Métrique
Lancer les commandes suivantes pour ignorer les dossiers de données (ex: "Camille...", "assets") et cibler le cœur applicatif.

1.  **Cartographie (Filtre Bruit)** :
    - `run_command "tree -L 2 -I '__pycache__|venv|node_modules|.git|logs|debug|assets|*_output|*Camille*|transnet*|test*'"`
    - *But* : Visualiser uniquement l'architecture logicielle (`services`, `routes`, `utils`, `workflow_scripts`).
2.  **Volumétrie (Code Source)** :
    - `run_command "cloc services routes utils config scripts workflow_scripts static templates --md"`
    - *But* : Quantifier le code réel (Python vs JS) sans scanner les backups ou CSV.
3.  **Complexité Cyclomatique (Python Core)** :
    - `run_command "radon cc services routes utils workflow_scripts -a -nc"`
    - *But* : Repérer les points chauds (Score C/D/F).
    - **Règle** : Si Score > 10 (C), la doc DOIT expliquer la logique interne, pas juste les entrées/sorties.

## Étape 2 — Diagnostic Triangulé
Comparer les sources pour détecter les incohérences :

| Source | Rôle | Outil |
| :--- | :--- | :--- |
| **Intention** | Le "Pourquoi" | `read_file` (Memory Bank) |
| **Réalité** | Le "Quoi" & "Comment" | `radon` (complexité), `cloc` (volume), `code_search` |
| **Existant** | L'état actuel | `find_by_name` (sur `docs/workflow`), `read_file` |

**Action** : Identifier les divergences. Ex: "Le service `transnetv2_library.py` est complexe (Radon C) mais absent de la doc technique."

## Étape 3 — Sélection du Standard de Rédaction
Choisir le modèle approprié (inspiré des best-practices `doc-generate`) :

- **Documentation API** (`routes/`, `services/`) :
  - Entrées/Sorties précises.
  - Gestion des erreurs et codes HTTP.
- **Documentation Pipeline** (`workflow_scripts/`) :
  - **Flux de données** : Quel fichier entre ? Quel fichier sort ? (ex: `step3` -> JSON).
  - **Dépendances** : GPU requis ? Modèles chargés ?
- **Architecture & Utils** (`utils/`, `config/`) :
  - Diagrammes textuels (Mermaid) si interactions complexes.
  - Raison d'être des classes utilitaires.

## Étape 4 — Proposition de Mise à Jour
Générer un plan de modification avant d'appliquer :

```markdown
## 📝 Plan de Mise à Jour Documentation
### Audit Métrique
- **Cible** : `services/workflow_service.py`
- **Métriques** : 450 LOC, Complexité max C (12).

### Modifications Proposées
#### 📄 docs/workflow/.../target.md
- **Type** : [API | Pipeline | Architecture]
- **Diagnostic** : [Obsolète | Incomplet | Manquant]
- **Correction** :
  ```markdown
  [Contenu proposé respectant le standard choisi]
  ```
```

## Étape 5 — Application et Finalisation
1.  **Exécution** : Après validation, utiliser `apply_patch` ou `multi_edit`.
2.  **Mise à jour Memory Bank** :
    - Si une dette technique importante est découverte via `radon` (Score D/F), ajouter impérativement une entrée dans `decisionLog.md` ou `systemPatterns.md`.