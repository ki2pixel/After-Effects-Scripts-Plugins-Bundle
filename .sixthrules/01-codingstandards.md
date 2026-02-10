# After Effects Development - Sixth Rules

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
- **⚠️ NOTE:** Current PyShiftAE runtime does NOT expose `ae.schedule_task()` helper. Use direct PyFx calls when already on AE main thread (e.g., bridge_daemon.py) or implement TaskScheduler wrapper in C++.

### ExtendScript/JSX
- **ES3 Compatibility:** Use `var` only, no `const`/`let`, no arrow functions, no template literals
- **Namespace:** Wrap in IIFE to avoid global pollution, unique function names
- **Undo Groups:** Always wrap operations in `app.beginUndoGroup()` / `app.endUndoGroup()`
- **Indexing:** Remember 1-based indexing for AE collections

### Documentation Updates
- Any time you create or modify documentation (README, docs/, Markdown guides), you **must** apply the methodology defined in `.sixthskills/documentation/SKILL.md` (TL;DR first, problem-first opening, ❌/✅ blocks, trade-offs, Golden Rule). Treat this skill file as the authoritative checklist before writing.

## Patterns

### PyShiftAE: Worker Thread + Scheduler Pattern

> **⚠️ CURRENT LIMITATION:** `ae.schedule_task()` helper not yet exposed in PyShiftAE runtime. Pattern below is conceptual - use direct PyFx calls when on AE main thread (e.g., bridge_daemon.py) or implement TaskScheduler wrapper.

```python
import pyshiftae as ae
import threading

def heavy_computation():
    """Pure Python - no AE calls"""
    return [(i/24.0, (i, i*1.5, 0)) for i in range(1000)]

def apply_changes(data):
    """Executed in AE main thread via scheduler - FAST"""
    comp = ae.Item.active_item()
    if not comp: return
    layer = comp.layers.add_solid("Solid_IA", (0,1,0,1), 1920, 1080, 10)

# TODO: Replace with actual ae.schedule_task() when available
# threading.Thread(target=lambda: (
#     data := heavy_computation(),
#     ae.schedule_task(lambda: apply_changes(data))
# )).start()
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
1. **Thread boundary**: Pure Python vs AE SDK calls
2. **Worker function**: Implement computation without AE calls
3. **Scheduler function**: Apply results via `ae.schedule_task()` *(TODO: not yet exposed)*
4. **Error handling**: Wrap in try/except with context
5. **Main thread context**: Direct PyFx calls when already on AE thread (e.g., bridge_daemon.py)

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
- **TODO:** Implement `ae.schedule_task()` wrapper for TaskScheduler C++ integration

### ExtendScript
- File encoding: UTF-8, avoid BOM
- Collections: 1-based indexing
- Binary assets: Use blob placeholders

## Skills Invocation Guide

### Use PyShiftAE Skill (@.sixthskills/pyshiftae/SKILL.md)
- Python automation with PyShiftAE
- Threading patterns (worker + scheduler)
- CEP bridge integration
- Installation troubleshooting
- Advanced API usage

### Use AE Scripting Expert Skill (@.sixthskills/ae-scripting-expert/SKILL.md)
- Traditional ExtendScript/JSX development
- ScriptUI panel creation
- Shape layer manipulation
- Binary asset management
- ES3 compatibility

### Decision Flow
```
Python automation? → PyShiftAE skill
Traditional scripting? → AE Scripting Expert skill
```

For hybrid projects: Use primary skill + reference this file for unified conventions.

## Skills Usage

- **Local Skills** (`.sixthskills/`) : pyshiftae, ae-scripting-expert, after-effects-cep-panel, ae-cpp-sdk-architecture, cpp-templates-metaprogramming, debugging-strategies, documentation
- **Global Skills** : Only if no local equivalent
- **Detection** : Automatic via `02-skills-integration.md`
- **Priority** : Local skills first, then global fallback

## Final notes
- Keep this document under 12,000 characters. Revise after any major changes.
- **PyShiftAE TODO:** Add `ae.schedule_task()` helper to align documentation with runtime capabilities.
- **Bridge Daemon Pattern:** Document main-thread execution model for direct PyFx calls.