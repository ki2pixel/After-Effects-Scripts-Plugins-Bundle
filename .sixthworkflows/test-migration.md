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
