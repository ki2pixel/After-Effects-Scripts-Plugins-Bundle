---
trigger: model_decision
description: Skills integration system for automatic detection and loading
globs: ["**/*.md"]
---

# Skills Integration Matrix

## Detection Patterns

| Pattern Détecté (FR/EN) | Skill / MCP Cible | Priorité |
| :--- | :--- | :--- |
| `tâche`, `task`, `backlog`, `planification`, `roadmap` | task-master-manager | 1 |
| `réflexion`, `think`, `logique`, `architecture`, `analyser` | sequentialthinking-logic | 1 |
| `gros fichier`, `massive file`, `chirurgical`, `edit block` | fast-filesystem-ops | 2 |
| `json`, `path`, `structure`, `inspect`, `valeur`, `clé` | json-query-expert | 2 |
| `bug`, `error`, `crash`, `performance` | debugging-strategies | 1 |
| `Python automation`, `PyShiftAE`, `threading` | pyshiftae | 1 |
| `ExtendScript`, `JSX`, `ScriptUI`, `shape layers` | ae-scripting-expert | 1 |
| `CEP panel`, `bridge`, `Hybrid 2.0` | after-effects-cep-panel | 1 |
| `AE C++ SDK`, `AEGP`, `TaskScheduler` | ae-cpp-sdk-architecture | 1 |
| `C++ templates`, `metaprogramming`, `concepts` | cpp-templates-metaprogramming | 1 |
| `documentation`, `docs`, `README` | documentation | 2 |
| `legacy scripts`, `system.callSystem()`, `STEP7`, `MediaPipe post-production` | after-effects-scripts | 1 |

## Auto-Loading Logic

When patterns detected, automatically load:
```
read_file(".windsurf/skills/[SKILL_NAME]/SKILL.md")
```

## Multi-Skill Support

For complex requests, combine multiple skills based on pattern detection priority.