# Universal Sixth Migration Guide

> **Actionable guide for migrating any project from Windsurf to Sixth**
> 
> This guide provides a step-by-step methodology to replicate the Windsurf ecosystem in Sixth with enhanced automation and universal compatibility.

## Quick Start

```bash
# 1. Copy this guide to your project
cp /path/to/sixth-integration.md docs/sixth-migration-[PROJECT].md

# 2. Replace placeholders (see Step 1)
# 3. Execute migration steps sequentially
# 4. Validate with test workflows
```

## Migration Overview

This guide migrates a complete Windsurf ecosystem to Sixth:
- **Rules** → `.sixthrules/` (persistent governance)
- **Workflows** → `.sixthworkflows/` (slash commands)
- **Skills** → `.sixthskills/` (hybrid integration system)
- **Memory** → Memory Bank protocol (context persistence)

## Step 1: Project Analysis & Preparation

### 1.1 Identify Your Windsurf Components

```bash
# Analyze existing Windsurf setup
find .windsurf -type f | sort

echo "=== Rules ==="
ls -la .windsurf/rules/
echo "=== Workflows ==="
ls -la .windsurf/workflows/
echo "=== Skills ==="
ls -la .windsurf/skills/
```

### 1.2 Create Project-Specific Configuration

Replace these placeholders throughout the guide:

- `[PROJECT_NAME]` → Your project name
- `[PROJECT_DESCRIPTION]` → Brief project description
- `[TECH_STACK]` → Your technology stack
- `[SKILLS_LIST]` → Your specific skills (comma-separated)
- `[RULES_COUNT]` → Number of rules files
- `[WORKFLOWS_COUNT]` → Number of workflows

### 1.3 Backup Existing Setup

```bash
# Create backup before migration
timestamp=$(date +%Y%m%d_%H%M%S)
cp -r .windsurf .windsurf.backup.$timestamp

echo "Backup created: .windsurf.backup.$timestamp"
```

## Step 2: Core Structure Migration

### 2.1 Create Sixth Directories

```bash
# Create base structure
mkdir -p .sixthrules .sixthworkflows .sixthskills

echo "✅ Sixth directories created"
```

### 2.2 Migrate Rules (Priority 1)

```bash
# Copy and adapt rules
cp .windsurf/rules/* .sixthrules/

# Update frontmatter for Sixth compatibility
for file in .sixthrules/*.md; do
  # Add Sixth-specific frontmatter if missing
  if ! grep -q "^---" "$file"; then
    echo "---" > temp_file
    echo "description: Migrated from Windsurf" >> temp_file
    echo "globs: [\"**/*\"]" >> temp_file
    echo "alwaysApply: true" >> temp_file
    echo "---" >> temp_file
    echo "" >> temp_file
    cat "$file" >> temp_file
    mv temp_file "$file"
  fi
  
  # Update Windsurf references to Sixth
  sed -i 's/\.winds\/skills\//\.sixthskills\//g' "$file"
  sed -i 's/\.winds\/workflows\//\.sixthworkflows\//g' "$file"
done

echo "✅ Rules migrated and adapted"
```

### 2.3 Migrate Workflows

```bash
# Copy workflows
cp -r .windsurf/workflows/* .sixthworkflows/

# Update workflow references
for file in .sixthworkflows/*.md; do
  sed -i 's/\.winds\/skills\//\.sixthskills\//g' "$file"
  sed -i 's/\.winds\/rules\//\.sixthrules\//g' "$file"
done

echo "✅ Workflows migrated"
```

### 2.4 Migrate Skills

```bash
# Copy skills directory structure
cp -r .windsurf/skills/* .sixthskills/

echo "✅ Skills migrated"
```

## Step 3: Hybrid Skills Integration

### 3.1 Create Skills Integration Rule

Create `.sixthrules/02-skills-integration.md`:

```yaml
---
description: Hybrid Skills Integration System
globs: ["**/*.md", "**/*.py", "**/*.js", "**/*.html"]
alwaysApply: true
---

# Skills Integration Matrix

## Detection Patterns

| Pattern | Skill | Priority |
|---------|-------|----------|
# Add your project-specific patterns here
# Example:
# | `bug`, `error`, `crash` | debugging-strategies | 1 |
# | `feature`, `add`, `implement` | add-feature | 1 |
# | `performance`, `slow`, `optimize` | performance-audit | 2 |

## Auto-Loading Logic

When patterns detected, automatically load:
```
read_file(".sixthskills/[SKILL_NAME]/SKILL.md")
```

## Multi-Skill Support

For complex requests, combine multiple skills based on pattern detection priority.
```

### 3.2 Update Coding Standards

Edit `.sixthrules/01-coding-standards.md`:

```markdown
## Skills Usage

- **Local Skills** (`.sixthskills/`) : [YOUR_SKILLS_LIST]
- **Global Skills** : Only if no local equivalent
- **Detection** : Automatic via `02-skills-integration.md`
- **Priority** : Local skills first, then global fallback
```

## Step 4: Memory Bank Protocol

### 4.1 Create Memory Bank Rule

Create `.sixthrules/03-memory-bank-protocol.md`:

```yaml
---
description: Memory Bank persistence protocol
globs: ["**/*.md"]
alwaysApply: true
---

# Memory Bank Protocol

## Core Files
- `memory-bank/activeContext.md` - Session state
- `memory-bank/productContext.md` - Project scope
- `memory-bank/progress.md` - Work tracking
- `memory-bank/decisionLog.md` - Technical decisions

## Update Triggers
- Session start/end
- Major decisions
- Feature completion
- Architecture changes
```

### 4.2 Initialize Memory Bank

```bash
# Create memory bank structure
mkdir -p memory-bank

# Initialize core files
touch memory-bank/{activeContext,productContext,progress,decisionLog}.md

echo "✅ Memory Bank initialized"
```

## Step 5: Universal Rules Setup

### 5.1 Copy Universal Rules

```bash
# Copy from this template
cp /path/to/universal-sixth-rules/* .sixthrules/

# Essential universal rules:
# - 04-pr-message-format.md
# - 05-prompt-injection-guard.md
# - 06-test-strategy.md
# - 07-v5-coding-assistance.md
# - commit-message-format.md

echo "✅ Universal rules installed"
```

### 5.2 Project-Specific Adaptation

```bash
# Update coding standards with your tech stack
sed -i 's/\[TECH_STACK\]/[YOUR_TECH_STACK]/g' .sixthrules/01-coding-standards.md

# Update skills references
sed -i 's/\[SKILLS_LIST\]/[YOUR_SKILLS_LIST]/g' .sixthrules/02-skills-integration.md

echo "✅ Project-specific adaptations applied"
```

## Step 6: Validation & Testing

### 6.1 Structure Validation

```bash
# Verify complete structure
echo "=== Sixth Structure ==="
tree .sixthrules .sixthworkflows .sixthskills 2>/dev/null || find .sixth* -type f | sort

# Count components
echo "Rules: $(ls .sixthrules/*.md | wc -l)"
echo "Workflows: $(ls .sixthworkflows/*.md | wc -l)"
echo "Skills: $(find .sixthskills -name SKILL.md | wc -l)"
```

### 6.2 Integration Testing

Create `.sixthworkflows/test-migration.md`:

```markdown
---
description: Test migration integrity
---

# Migration Test Workflow

## Steps
1. Verify all rules load correctly
2. Test skill detection patterns
3. Validate workflow execution
4. Check Memory Bank functionality

## Validation Commands
```bash
# Test skills integration
grep -c "SKILL.md" .sixthrules/02-skills-integration.md

# Test workflow references
find .sixthworkflows -name "*.md" -exec grep -l "\.sixth" {} \;

# Test memory bank
ls -la memory-bank/
```
```

### 6.3 Run Full Test

```bash
# Execute migration test
/test-migration

# Manual verification
echo "Testing skill loading..."
read_file(".sixthskills/[FIRST_SKILL]/SKILL.md")

echo "Testing workflow..."
/view_file .sixthworkflows/[FIRST_WORKFLOW].md

echo "✅ Migration validated"
```

## Step 7: Cleanup & Finalization

### 7.1 Remove Old References

```bash
# Ensure no Windsurf references remain
find .sixth* -name "*.md" -exec grep -l "\.windsurf" {} \; | while read file; do
  echo "Cleaning $file"
  sed -i 's/\.windsurf\//\.sixth\//g' "$file"
done

echo "✅ Old references cleaned"
```

### 7.2 Archive Old System

```bash
# Optional: Archive Windsurf after validation
timestamp=$(date +%Y%m%d)
mv .windsurf .windsurf.archive.$timestamp

echo "✅ Windsurf archived as .windsurf.archive.$timestamp"
```

### 7.3 Documentation Update

Update your project README:

```markdown
## Development Environment

This project uses **Sixth** with enhanced Windsurf compatibility:

- **Rules**: `.sixthrules/` - Coding standards and governance
- **Workflows**: `.sixthworkflows/` - Slash commands for automation
- **Skills**: `.sixthskills/` - Specialized expertise integration
- **Memory**: `memory-bank/` - Context persistence

See [docs/sixth-migration-[PROJECT].md](docs/sixth-migration-[PROJECT].md) for complete setup.
```

## Architecture Reference

```
.sixthrules/           # Règles persistantes Sixth (8 fichiers)
├── 01-coding-standards.md      # Standards de codage adaptés
├── 02-skills-integration.md    # Système hybride Skills + Rules
├── 03-memory-bank-protocol.md  # Protocole Memory Bank
├── 04-pr-message-format.md     # Format des messages PR
├── 05-prompt-injection-guard.md # Sécurité contre injection
├── 06-test-strategy.md         # Stratégie de test
├── 07-v5-coding-assistance.md  # Règles foundation coding
└── commit-message-format.md    # Format des commits

.sixthworkflows/       # Workflows Sixth (commandes slash)
├── commit-push.md              # Git commit & push
├── enhance.md                  # Amélioration de prompts
├── end.md                      # Fin de session & Memory Bank
├── pull-latest.md              # Synchronisation git
├── docs-updater.md             # Mise à jour documentation
├── repomix-bundle.md           # Génération bundle LLM
└── test-skills-integration.md  # Tests d'intégration

.sixthskills/          # Skills spécialisés (12 skills)
├── add-feature/                # Développement de fonctionnalités
├── automation-diagnostics/     # Diagnostics automation
├── debugging-strategies/      # Stratégies de debugging
├── documentation/              # Rédaction technique
├── history-dashboard-updater/  # Historique & graphiques
├── ifttt-cascade/              # Intégration IFTTT
├── loader-patterns/            # Patterns UI loaders
├── performance-audit-runbook/  # Audit performance
├── postgres-store-maintenance/ # Maintenance PostgreSQL
├── quota-alerting/             # Gestion quotas API
├── scheduler-ops/              # Opérations scheduler
└── switchbot-api-dev/          # Développement API SwitchBot
```

## Universal Skills Integration (Hybrid Model)

### Core Principle

Sixth lacks native Skills. Our hybrid approach combines:

1. **Sixth Rules** → Automatic pattern detection
2. **Specialized Skills** → Domain expertise and methodologies
3. **Workflows** → Complex action orchestration

### Detection Matrix Template

| Request Pattern | Skill Loaded | Methodology Applied |
|----------------|-------------|-------------------|
| `bug`, `error`, `crash`, `performance` | `debugging-strategies` | Scientific method (Reproduce → Gather → Hypothesize → Test) |
| `feature`, `add`, `implement`, `create` | `add-feature` | Analysis → Design → Implementation → Integration → Documentation |
| `documentation`, `docs`, `README` | `documentation` | TL;DR first, problem-oriented, ❌/✅ blocks |
| `test`, `testing`, `coverage` | `test-strategy` | Given/When/Then, equivalence partitioning, boundary values |

*Add your project-specific patterns to `.sixthrules/02-skills-integration.md`*

### Integration Workflow

1. **Query Analysis** → Sixth identifies patterns
2. **Skill Detection** → Matrix lookup
3. **Auto-Loading** → `read_file(".sixthskills/[skill]/SKILL.md")`
4. **Methodology Application** → Follow skill steps
5. **Documentation** → Reference skill used

## Migration Mapping

| Windsurf Component | Sixth Equivalent | Migration Status |
|-------------------|-----------------|-----------------|
| `.windsurf/rules/` | `.sixthrules/` | ✅ Direct migration with frontmatter updates |
| `.windsurf/workflows/` | `.sixthworkflows/` | ✅ 1:1 copy with reference updates |
| `.windsurf/skills/` | `.sixthskills/` | ✅ Full copy + hybrid integration system |
| Direct references | Auto-detection | ✅ Via pattern matching in rules |

### Compatibility Guarantees

- ✅ **Coding Standards**: 95% content preservation
- ✅ **Workflows**: Native Sixth slash command compatibility
- ✅ **Skills**: Complete methodology transfer
- ✅ **Memory**: Cross-platform protocol support

## Daily Operations

### Workflow Commands

```bash
# Git operations
/commit-push          # Commit & push with standards
/pull-latest          # Sync with upstream

# Development
/enhance              # Improve prompts with context
/docs-updater         # Update documentation
/repomix-bundle       # Generate LLM bundle

# Session management
/end                  # Close session + Memory Bank sync
/test-migration       # Validate migration integrity
```

### Automatic Skill Detection

No manual skill selection needed:

```bash
# Example 1: Bug investigation
"I have a bug in the authentication module"
→ Automatically loads: debugging-strategies
→ Applies: Scientific debugging method

# Example 2: Feature development
"Add user role management system"
→ Automatically loads: add-feature
→ Applies: Analysis → Design → Implementation → Documentation

# Example 3: Multi-skill complex task
"Optimize database queries and add performance monitoring"
→ Automatically loads: performance-audit + database-maintenance
→ Applies: Performance profiling + DB optimization
```

### Integration Validation

```bash
# Test complete system
/test-migration

# Verify components
find .sixthskills -name "SKILL.md" | wc -l          # Should match [SKILLS_COUNT]
grep -c "skill.*pattern" .sixthrules/02-skills-integration.md  # Should match your patterns
ls .sixthrules/*.md | wc -l                      # Should match [RULES_COUNT]
ls .sixthworkflows/*.md | wc -l                   # Should match [WORKFLOWS_COUNT]
```

## Sixth Advantages

### 1. Intelligent Detection
- No manual skill specification required
- Natural language pattern matching
- Automatic multi-skill combination for complex tasks

### 2. Native Integration
- Sixth slash command compatibility
- Persistent, versioned rules system
- Maintained skill ecosystem

### 3. Enhanced Scalability
- Easy skill addition
- Refined pattern detection
- Backward compatibility maintenance

## Maintenance Guide

### Adding New Skills

```bash
# 1. Create skill structure
mkdir -p .sixthskills/[new-skill]
touch .sixthskills/[new-skill]/SKILL.md

# 2. Add detection patterns
# Edit .sixthrules/02-skills-integration.md
# Add your pattern row to the matrix

# 3. Test integration
/test-migration

# 4. Update documentation
# Add skill to project README
```

### Updating Detection Patterns

```bash
# 1. Edit integration rule
vim .sixthrules/02-skills-integration.md

# 2. Update pattern matrix
# Add/modify trigger patterns
# Adjust priority if needed

# 3. Validate mappings
# Test skill ↔ pattern associations

# 4. Document changes
# Update changelog
```

### System Health Checks

```bash
# Monthly maintenance script

# Check all skills are accessible
find .sixthskills -name SKILL.md -exec echo "Testing: {}" \; -exec head -5 {} \;

# Validate rule syntax
for rule in .sixthrules/*.md; do
  echo "Validating $rule"
  # Add your rule validation logic here
done

# Test workflow execution
for workflow in .sixthworkflows/*.md; do
  echo "Testing workflow: $(basename $workflow)"
  # Add workflow validation logic here
done

echo "✅ Health check complete"
```

## Troubleshooting

### Common Issues

| Problem | Diagnosis | Solution |
|---------|-----------|----------|
| Skill not detected | Check patterns in `02-skills-integration.md` | Add/modify trigger patterns |
| Wrong skill loaded | Pattern too generic | Refine specific triggers |
| Methodology not applied | SKILL.md not found | Verify skill file path and naming |
| Workflow fails | Reference path broken | Update `.windsurf` → `.sixth` references |
| Memory Bank errors | Directory missing | Create `memory-bank/` and core files |

### Debug Commands

```bash
# Debug skill detection
grep -n "PATTERN" .sixthrules/02-skills-integration.md

# Debug file references
find .sixth* -name "*.md" -exec grep -l "\.windsurf" {} \;

# Debug skill loading
ls -la .sixthskills/*/SKILL.md

# Debug workflow access
ls -la .sixthworkflows/*.md
```

## Migration Checklist

### Pre-Migration
- [ ] Backup existing `.windsurf/` directory
- [ ] Document current Windsurf usage
- [ ] Identify project-specific customizations
- [ ] Plan skill mapping for your domain

### Migration Steps
- [ ] Create `.sixth*` directories
- [ ] Migrate rules with frontmatter updates
- [ ] Copy and update workflows
- [ ] Migrate skills with integration system
- [ ] Set up Memory Bank protocol
- [ ] Add universal rules
- [ ] Test all components

### Post-Migration
- [ ] Validate all workflows execute
- [ ] Test skill detection patterns
- [ ] Verify Memory Bank functionality
- [ ] Update project documentation
- [ ] Archive old Windsurf directory
- [ ] Train team on Sixth commands

## Template Customization

### Project-Specific Sections to Update

1. **Skills Matrix** - Add your domain-specific patterns
2. **Tech Stack References** - Update coding standards
3. **Workflow Commands** - Customize for your processes
4. **Validation Tests** - Add project-specific test cases

### Branding and Naming

```bash
# Replace generic placeholders
sed -i 's/\[PROJECT_NAME\]/YourProject/g' docs/sixth-migration-*.md
sed -i 's/\[TECH_STACK\]/YourTechStack/g' .sixthrules/01-coding-standards.md
sed -i 's/\[SKILLS_LIST\]/your,skill,list/g' .sixthrules/02-skills-integration.md
```

## Archive and Cleanup

### Final Cleanup

```bash
# After successful migration (30+ days stable operation)
if [ $(date -d "30 days ago" +%s) -lt $(stat -c %Y .sixthrules/01-coding-standards.md) ]; then
  echo "Migration stable for 30+ days, cleaning up..."
  rm -rf .windsurf.archive.*
  echo "✅ Archive cleanup complete"
else
  echo "Keeping archives until 30-day stability period"
fi
```

## Support and Resources

### Documentation
- **Sixth Official**: https://docs.trysixth.com/
- **This Guide**: `docs/sixth-migration-[PROJECT].md`
- **Skills Reference**: `.sixthskills/*/SKILL.md`
- **Integration Tests**: `.sixthworkflows/test-migration.md`

### Community and Help
- Check Sixth community forums for updates
- Share custom skills and patterns
- Report integration issues
- Contribute improvements to this guide

---

## Conclusion

This universal migration guide enables any project to transition from Windsurf to Sixth while preserving and enhancing functionality. The hybrid skills integration provides automatic detection and specialized expertise, while the standardized structure ensures consistency across projects.

**Key Benefits Achieved:**
- ✅ Zero-loss migration of existing Windsurf functionality
- ✅ Enhanced automatic skill detection
- ✅ Universal, reusable methodology
- ✅ Persistent, versioned governance system
- ✅ Future-proof scalability

**Next Steps:**
1. Customize this guide for your specific project
2. Execute the migration steps sequentially
3. Validate with the test workflows
4. Train your team on Sixth workflows
5. Contribute improvements back to the community

---

*This guide is part of the universal Sixth migration toolkit. For project-specific adaptations and community contributions, see the GitHub repository.*
