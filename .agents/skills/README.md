# Kimi Code CLI Skills - After Effects Scripts & Plugins Bundle

Ce répertoire contient les skills Kimi Code CLI convertis depuis les workflows Windsurf.

## Structure

```
.agents/skills/
├── README.md           # Cette documentation
├── USAGE.md            # Guide d'utilisation détaillé
├── commit-push/        # Commit et push automatisé
│   └── SKILL.md
├── documentation/      # Standards de rédaction documentation
│   └── SKILL.md
├── docs-updater/       # Mise à jour documentation métrique
│   └── SKILL.md
├── end/                # Terminer la session et synchroniser Memory Bank
│   └── SKILL.md
├── enhance/            # Améliorer un prompt avec contexte technique
│   └── SKILL.md
└── enhance-complex/    # Architecture complexe avec Shrimp Task Manager
    └── SKILL.md
```

## Skills Disponibles

| Skill | Commande | Description |
|-------|----------|-------------|
| **end** | `/skill:end` | Terminer la session et synchroniser la Memory Bank |
| **enhance** | `/skill:enhance` | Améliorer un prompt avec contexte technique |
| **docs-updater** | `/skill:docs-updater` | Mise à jour documentation métrique |
| **enhance-complex** | `/skill:enhance-complex` | Architecture complexe avec Shrimp Task Manager |
| **commit-push** | `/skill:commit-push` | Commit et push automatisé |
| **documentation** | `/skill:documentation` | Standards de rédaction documentation |

## Origine

Ces skills ont été convertis depuis les workflows Windsurf :

| Workflow Windsurf | Skill Kimi Code CLI |
|-------------------|---------------------|
| `.windsurf/workflows/end.md` | `end/SKILL.md` |
| `.windsurf/workflows/enhance.md` | `enhance/SKILL.md` |
| `.windsurf/workflows/docs-updater.md` | `docs-updater/SKILL.md` |
| `.windsurf/workflows/enhance_complex.md` | `enhance-complex/SKILL.md` |
| `.windsurf/workflows/commit-push.md` | `commit-push/SKILL.md` |
| `.windsurf/skills/documentation/SKILL.md` | `documentation/SKILL.md` (copié) |

## Modifications Apportées

### Format YAML Frontmatter

Tous les skills incluent maintenant un frontmatter YAML standard :

```yaml
---
name: skill-name
description: Description du skill
---
```

### Références d'Outils

Les références à `run_command` ont été remplacées par `Shell` pour compatibilité Kimi Code CLI :

| Windsurf | Kimi Code CLI |
|----------|---------------|
| `run_command "git status"` | `Shell` tool avec `git status` |
| `run_command "cloc ..."` | `Shell` tool avec `cloc ...` |
| `run_command "tree ..."` | `Shell` tool avec `tree ...` |

### Chemins des Skills

Les références internes ont été mises à jour :

- `.windsurf/skills/` → `.agents/skills/`
- `.windsurf/rules/` → `.clinerules/`

## Découverte Automatique

Kimi Code CLI découvre automatiquement les skills dans `.agents/skills/`. Les skills sont disponibles immédiatement après le lancement dans le répertoire du projet.

## Voir Aussi

- [Guide d'utilisation détaillé](./USAGE.md)
- [Documentation Kimi Code CLI Skills](../docs/docs-kimi-code_extension/customization/skills.md)
- [Slash Commands](../docs/docs-kimi-code_extension/reference/slash-commands.md)
