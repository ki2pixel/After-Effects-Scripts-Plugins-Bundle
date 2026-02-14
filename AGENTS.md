# AGENTS.md - Guide pour Agents de Codage

> **AI Agent Context**: This document provides essential information for AI coding agents working on the `pyshift_ae` bundle. It acts as the primary operating system for Kimi Code within the Adobe After Effects ecosystem.

---

## Vue d'ensemble

Ce projet est un écosystème d'automatisation **Hybrid 2.0** pour After Effects.
- **Cœur** : PyShiftAE (Python 3.11 embed dans un plugin C++ AEGP).
- **Interface** : Panels CEP (HTML/JS) communiquant via `PyShiftBridge`.
- **Legacy** : Scripts ExtendScript (`.jsx`) pour les opérations non couvertes par l'API Python.

## 🧠 Operational Skills & Runbooks (The Router)

You **MUST** route requests to the specialized skills in `.sixthskills/` to handle the specific runtime constraints (ES3 vs Python 3.11 vs C++).

### Skill Invocation Policy
- **Runtime Decision:** First, determine if the task requires **Modern Automation** (Python/PyShiftAE) or **Legacy Scripting** (ExtendScript).
- **Priority:** Workspace skills (`.sixthskills/`) are authoritative.

| User Intent / Context | Target Skill File (load with @) | Key Focus |
|:---|:---|:---|
| **Python / Automation / Logic** | `.sixthskills/pyshiftae/SKILL.md` | **PRIMARY**. Threading (Worker/Scheduler), Memory Handles. |
| **UI Panel / CEP / Bridge** | `.sixthskills/after-effects-cep-panel/SKILL.md` | HTML/JS, `PyShiftBridge` (Pipes/Sockets), Manifests. |
| **Legacy Scripting / JSX / UI** | `.sixthskills/ae-scripting-expert/SKILL.md` | **ES3 ONLY**. `var`, UndoGroups, ScriptUI, Shape layers. |
| **C++ / Plugin / SDK** | `.sixthskills/ae-cpp-sdk-architecture/SKILL.md` | AEGP Suites, Memory Suites, `PF_Err` handling. |
| **Templates / Métaprogrammation** | `.sixthskills/cpp-templates-metaprogramming/SKILL.md` | SFINAE, Concepts (C++17), Type Traits. |
| **Debugging / Crash / 48::72** | `.sixthskills/debugging-strategies/SKILL.md` | Logs `[PY]`, Console CEP, `psc-install`. |
| **Legacy Scripts / STEP7** | `.sixthskills/after-effects-scripts/SKILL.md` | Legacy ExtendScript scripts, system.callSystem() bridges, STEP7 preprocessing. |
| **Documentation / Audit** | `.sixthskills/documentation/SKILL.md` | Standard de documentation technique. |

**Protocol:** If the user asks "Create a panel to rename layers", prefer **CEP + Python** (`after-effects-cep-panel` + `pyshiftae`) over legacy ScriptUI unless explicitly asked for a `.jsx` script.

---

## 🛡️ Critical Implementation Rules (Non-Negotiable)

### 1. The "Main Thread" Law (PyShiftAE/C++)
- **Constraint**: After Effects is strictly single-threaded for API calls.
- **Rule**: Never call `AEGP_*` or `ae.*` methods directly from a Python worker thread.
- **Pattern**: Use the **Worker + TaskScheduler** pattern.
  1. Worker thread does math/logic.
  2. Worker pushes a lambda/function to `ae.schedule_task(...)` (or C++ equivalent).
  3. Main thread executes the mutation.
- **⚠️ CURRENT LIMITATION**: `ae.schedule_task()` helper not yet exposed in PyShiftAE runtime. Use direct PyFx calls when on AE main thread (e.g., bridge_daemon.py) or implement TaskScheduler wrapper.
- **Memory Management**: Short-lived AE handles, lock→use→unlock→free pattern. Never cache handles across frames/renders.
- **Error Handling**: try/except with contextual messages (comp/layer/prop), never silent failures.

### 2. The "ES3" Law (ExtendScript)
- **Constraint**: The JS engine in AE is ancient (1999 standard).
- **Forbidden**: `const`, `let`, `=>` (arrow functions), `class`, template literals (`` ` ``).
- **Mandatory**: Use `var`, `function() {}`, string concatenation `+`, and wrap everything in `app.beginUndoGroup()`.

### 3. Environment Isolation
- **No System Python**: PyShiftAE uses an embedded Python stack located in `Support Files`.
- **Dependencies**: Never rely on `pip install` from the system shell. Use the embedded pip or vendor the libraries in `site-packages` next to the plugin.

### 4. Bridge Communication (Hybrid 2.0)
- **Mechanism**: Named Pipes (Windows) or Unix Sockets (macOS).
- **Fallback**: JSON Mailbox (watched folder) if pipes fail.
- **Structure**: Always check `PyShiftBridge/bridge_daemon.py` for the communication protocol definition.

---

## 🔧 Tooling & Testing Standards

### Code Formatters
- **Python**: `black` (88 cols), `isort`.
- **C++**: `clang-format` (Google style).
- **JSX**: Prettier (configured for ES5/ES3 if possible, otherwise lenient).

### Testing Strategy
- **Python Unit**: `pytest` for logic that doesn't touch AE directly.
- **Integration**: Manual tests required inside AE for UI/Rendering.
- **Logs**:
  - Python: `print()` goes to the AE console window (if open) or `bridge_daemon` logs.
  - CEP: `console.log()` requires Debug Mode enabled in registry/plist.

### Testing Standards
- **PyShiftAE**: `pytest` for pure Python logic, manual tests for UI/Rendering, logs to AE console or bridge_daemon.
- **ExtendScript**: Test scenarios (project closed, layer deleted, comp inactive), manual testing for UI interactions, `console.log()` requires Debug Mode.

## 🚫 Anti-Patterns (Never Do)

### ❌ PyShiftAE Don'ts
- Blocking UI operations on main thread
- Long-term handle caching (stale references)
- Native UI (PyQt/Tkinter) in AE process
- Silent failures without user feedback

### ❌ ExtendScript Don'ts
- Modern JavaScript (const/let, arrow functions, template literals)
- Missing undo groups
- Silent failures without user feedback
- Undocumented matchNames with `-0001` suffixes
- Global pollution (no IIFE wrapper)

### General
- Blocking the UI: Running a `while` loop or heavy calculation on the main thread freezes AE.
- Modern JS in JSX: Writing `const x = 1` in a `.jsx` file (Instant syntax error in AE).

---

## 🛠️ Execution & Diagnostics

### Installation (Windows)
```powershell
# 1. Copier l'env Python isolé
Copy-Item "C:\Python311\Lib" "F:\Adobe\...\Support Files\" -Recurse
# 2. Installer le plugin
psc-install
# 3. Lancer AE
```

### Diagnostic Scripts
- **Check Bridge**:
  `python PyShiftBridge/tests/test_bridge_daemon_pure.py`
- **Lint JSX**:
  `node --check Scripts_AE/MyScript.jsx` (check syntax errors only)

## 📋 Ready-to-Use Patterns (Reference)

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

---

## 💾 Memory Bank Protocol

1. **Start**: Check `memory-bank/activeContext.md`.
2. **Architecture Changes**: If modifying the Bridge protocol or C++ Suites, update `systemPatterns.md`.
3. **End**: Log completion in `progress.md`.

---

## 📝 Documentation Workflow

Any doc update must follow `.sixthskills/documentation/SKILL.md`.
- **Required Structure**: TL;DR first, problem-first opening, ❌/✅ blocks, trade-offs, Golden Rule.
- **Particularité AE** : Documenter les "MatchNames" (noms internes AE) utilisés dans les scripts (ex: `"ADBE Root Vectors Group"`).