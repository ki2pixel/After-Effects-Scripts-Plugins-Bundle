---
name: codingstandards
description: After Effects development standards covering PyShiftAE runtime patterns, ExtendScript/JSX conventions, CEP bridge, shape layers, ScriptUI panels, and production-ready patterns
alwaysApply: true
---

# After Effects Development

## Tech Stack

**Runtimes:** PyShiftAE (AEGP plugin embedding CPython 3.11+) for Python automation, ExtendScript/JSX (ES3) for traditional scripting

**Languages:** Python 3.11+ (pure Python preferred), ExtendScript/JSX (ES3 compatible, var only)

**Bridges:** CEP (HTML/JS) ↔ PyInterface (named pipes/Unix sockets) or Mailbox JSON fallback, ScriptUI panels (dockable/palette)

**SDKs:** After Effects SDK via AETK wrappers (TaskScheduler, Suites) for PyShiftAE, Native AE API for ExtendScript

**Testing:** pytest for Python logic, manual edge case testing for AE integration, undo groups for ExtendScript

## Code Style

### PyShiftAE (Python)
- **Threading:** Worker threads for computation, AE main thread for mutations via TaskScheduler
- **Memory:** Short-lived AE handles, lock→use→unlock→free pattern
- **Error Handling:** try/except with contextual messages (comp/layer/prop), never silent failures
- **Dependencies:** Pure Python libraries only, document version strategy
- **TaskScheduler Implementation:** All AE mutations go through C++ TaskScheduler (AETK wrapper) which queues tasks for execution on AE's main thread via idle hooks. Direct PyFx calls only when already on main thread (e.g., bridge_daemon.py).
- **⚠️ NOTE:** `ae.schedule_task()` helper is conceptual only - current PyShiftAE runtime uses direct C++ TaskScheduler integration. Worker threads compute data, then schedule C++ tasks for main thread execution.

### ExtendScript/JSX
- **ES3 Compatibility:** Use `var` only, no `const`/`let`, no arrow functions, no template literals
- **Namespace:** Wrap in IIFE to avoid global pollution, unique function names
- **Undo Groups:** Always wrap operations in `app.beginUndoGroup()` / `app.endUndoGroup()`
- **Indexing:** Remember 1-based indexing for AE collections

### Documentation Updates
- Any time you create or modify documentation (README, docs/, Markdown guides), you **must** apply the methodology defined in `.continue/rules/documentation.md` (TL;DR first, problem-first opening, ❌/✅ blocks, trade-offs, Golden Rule). Treat this skill file as the authoritative checklist before writing.

## Patterns

### PyShiftAE: Worker Thread + Scheduler Pattern

> **ACTUAL IMPLEMENTATION:** Bridge daemon runs on AE main thread. Worker computations happen in CEP/JavaScript, mutations via synchronous handlers. C++ TaskScheduler queues operations for idle-time execution.

```python
# Bridge daemon pattern (actual implementation)
def handle_gridcloner_apply(args):
    # Already on AE main thread - direct AE operations
    comp = ae.Item.active_item()
    if not comp: return {"error": "No active comp"}
    
    # Core logic executed synchronously
    # C++ TaskScheduler handles any deferred operations via idle hooks
    return gridcloner_core.apply_grid_cloner(comp, args)

# CEP side async pattern
function applyGridCloner(args) {
  return sendCommand('gridcloner_apply', args); // Returns Promise
}
```

### ExtendScript: Dockable Panel Pattern

```jsx
(function() {
    function buildUI(thisObj) {
        var win = thisObj instanceof Panel 
            ? thisObj 
            : new Window("palette", "Script Name", undefined, {resizeable: true});
        
        if (win instanceof Window) {
            win.show();
        } else {
            win.layout.layout(true);
        }
        return win;
    }
    
    var myUI = buildUI(this);
})();
```

### Shape Layers: Hierarchy Navigation

```jsx
function getAllShapePaths(layer) {
    var paths = [];
    var rootGroup = layer.property("ADBE Root Vectors Group");
    if (!rootGroup) return paths;
    
    function traverseGroup(group, transforms) {
        for (var i = 1; i <= group.numProperties; i++) {
            var prop = group.property(i);
            if (prop.matchName === "ADBE Vector Shape") {
                paths.push({path: prop, transforms: transforms.slice()});
            } else if (prop.propertyGroup) {
                traverseGroup(prop, transforms);
            }
        }
    }
    
    traverseGroup(rootGroup, []);
    return paths;
}
```

### CEP Bridge Hybrid 2.0

```javascript
// CEP side
const pipeName = localStorage.getItem('pyshift_pipe_name') || 'pyshift_default';
const transport = pipeAvailable ? new PyInterface(pipeName) : new MailboxJSON();

function sendCommand(func, args) {
  return transport.send({
    endpoint: "Response", functionName: func, args: args
  });
}
```

```python
# Python side
def handle_command(command):
    try:
        func = globals()[command['functionName']]
        result = func(**command['args'])
        return {"status": "success", "result": result}
    except Exception as e:
        return {"status": "error", "message": str(e)}
```

## Common Tasks

### PyShiftAE Operations
1. **Thread boundary**: CEP/JavaScript for UI, Python bridge handlers for AE operations (already on main thread)
2. **Worker function**: Heavy computation in CEP/JavaScript or pure Python functions
3. **Scheduler function**: Direct AE operations in bridge handlers, C++ TaskScheduler for deferred tasks via idle hooks
4. **Error handling**: Wrap in try/except with context, return structured error responses to CEP
5. **Main thread context**: Bridge daemon runs in AE process - all operations are main thread by default

### ExtendScript UI Panels
1. **Dockable detection**: Test `thisObj instanceof Panel`
2. **IIFE wrapper**: Prevent global namespace pollution
3. **Undo groups**: Wrap all AE operations
4. **Asset management**: Handle binary blobs for icons/presets

### Shape Layers
1. **MatchNames**: Use documented matchNames (ADBE Root Vectors Group, etc.)
2. **Hierarchy**: Navigate Contents → Group → Shape → Fill/Stroke
3. **Transforms**: Track transform stack for coordinate conversion

## Anti-Patterns

### ❌ PyShiftAE Don'ts
- Blocking UI operations on main thread
- Long-term handle caching (stale references)
- Native UI (PyQt/Tkinter) in AE process

### ❌ ExtendScript Don'ts
- Modern JavaScript (const/let, arrow functions, template literals)
- Missing undo groups
- Silent failures without user feedback
- Undocumented matchNames with `-0001` suffixes

## Testing

### PyShiftAE
```python
import pytest
def test_heavy_computation():
    result = heavy_computation()
    assert len(result) == 1000
```

### ExtendScript
Test scenarios: project closed, layer deleted, comp inactive, undo groups

## Conventions

### PyShiftAE
- Version alignment: CPython ↔ .aex compatibility
- Performance: Batch writes, avoid N+1 queries
- IPC: Pipes/sockets preferred, mailbox fallback
- TaskScheduler: C++ implementation (AETK/TaskScheduler.hpp) queues operations via AE idle hooks

### ExtendScript
- File encoding: UTF-8, avoid BOM
- Collections: 1-based indexing
- Binary assets: Use blob placeholders

## Skills Invocation Guide

### Use PyShiftAE Skill (@.continue/rules/pyshiftae.md)
- Python automation with PyShiftAE
- Threading patterns (worker + scheduler)
- CEP bridge integration
- Installation troubleshooting
- Advanced API usage

### Use AE Scripting Expert Skill (@.continue/rules/ae-scripting-expert.md)
- Traditional ExtendScript/JSX development
- ScriptUI panel creation
- Shape layer manipulation
- Binary asset management
- ES3 compatibility

### Use AE CPP SDK Architecture Skill (@.continue/rules/ae-cpp-sdk-architecture.md)
- Writing C++ code for After Effects plugins (AETK)
- Creating wrappers for AEGP Suites
- Managing memory/threading in AE

### Use After Effects CEP Panel Skill (@.continue/rules/after-effects-cep-panel.md)
- Developing CEP extensions (Common Extensibility Platform) for Adobe After Effects
- Debugging and maintaining HTML/CSS/JS panels integrated with ExtendScript bridges

### Use After Effects Scripts Skill (@.continue/rules/after-effects-scripts.md)
- Handling After Effects scripts (ExtendScript) and Python bridges for MediaPipe post-production
- Operating AE scripts, system.callSystem() bridges, and STEP7 preprocessing

### Use CPP Templates Metaprogramming Skill (@.continue/rules/cpp-templates-metaprogramming.md)
- Creating generic and type-safe C++ libraries with templates
- SFINAE, concepts, and compile-time metaprogramming

### Use Debugging Strategies Skill (@.continue/rules/debugging-strategies.md)
- Systematic debugging techniques and profiling tools
- Root cause analysis for bugs, performance issues, and unexpected behavior

### Use Documentation Skill (@.continue/rules/documentation.md)
- Technical writing and README guidelines
- Punctuation rules for AI-free documentation
```
Python automation? → PyShiftAE skill
Traditional scripting? → AE Scripting Expert skill
```

For hybrid projects: Use primary skill + reference this file for unified conventions.

## Final notes
- Keep this document under 12,000 characters. Revise after any major changes.
- **PyShiftAE TODO:** Add `ae.schedule_task()` helper to align documentation with runtime capabilities.
- **Bridge Daemon Pattern:** Document main-thread execution model for direct PyFx calls.