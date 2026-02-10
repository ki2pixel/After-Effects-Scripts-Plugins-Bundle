# Skills Integration Matrix

## Detection Patterns

| Pattern | Skill | Priority |
|---------|-------|----------|
| `bug`, `error`, `crash`, `performance` | debugging-strategies | 1 |
| `feature`, `add`, `implement`, `create` | add-feature | 1 |
| `Python automation`, `PyShiftAE`, `threading` | pyshiftae | 1 |
| `ExtendScript`, `JSX`, `ScriptUI`, `shape layers` | ae-scripting-expert | 1 |
| `CEP panel`, `bridge`, `Hybrid 2.0` | after-effects-cep-panel | 1 |
| `AE C++ SDK`, `AEGP`, `TaskScheduler` | ae-cpp-sdk-architecture | 1 |
| `C++ templates`, `metaprogramming`, `concepts` | cpp-templates-metaprogramming | 1 |
| `documentation`, `docs`, `README` | documentation | 2 |
| `test`, `testing`, `coverage` | test-strategy | 2 |

## Auto-Loading Logic

When patterns detected, automatically load:
```
read_file(".sixthskills/[SKILL_NAME]/SKILL.md")
```

## Multi-Skill Support

For complex requests, combine multiple skills based on pattern detection priority.
