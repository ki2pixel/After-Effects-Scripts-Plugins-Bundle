---
name: pyshiftae
description: Expert guidance for automating Adobe After Effects with PyShiftAE (Python) via the native PyShiftAE.aex / PyFx bridge (C++ SDK). Use this skill when asked to write, debug, or design Python automation that manipulates AE projects, comps, layers, properties, effects, masks, or when troubleshooting installation (wheel + psc-install) and version alignment (Python 3.11-3.13). Covers core API objects (Project/Item/CompItem/Layer/Property/Effect/Mask), common gotchas, production-safe patterns, and Hybrid 2.0 CEP bridge workflows décrits dans docs/02-guides/.
---

# PyShiftAE (Python for After Effects)

> **Sources** : [Guide principal](../../docs/01-core/architecture.md) + guides spécialisés ([installation](../../docs/02-guides/installation-deployment.md), [bridge CEP](../../docs/02-guides/cep-python-bridge.md), [patterns](../../docs/02-guides/coding-patterns.md), [références](../../docs/04-reference/)). Les infos C++ manquantes proviennent des extractions Repomix (`docs/legacy-adobe/`).

## Quick Start

### Mental model

- **PyShiftAE is not ExtendScript**
It is a Python API built on top of a native plugin (`PyShiftAE.aex`) exposing SDK suites through `PyFx`.

- **Two layers**
- `pyshiftae` (pure Python): high-level classes (`Layer`, `CompItem`, `Effect`, etc.)
- `PyFx` (native module): low-level SDK access (Suites + pointers)

### Installation / first run checklist (Win 10/11, AE 2023+)

1. `pip install --upgrade pip wheel setuptools`
2. Build the wheel with your current Python (`python setup.py bdist_wheel`) and install it (`pip install dist/pyshiftae-<version>-cp311-win_amd64.whl`).
3. Run `psc-install` and point it to AE’s plugin folder (ex: `...\Support Files\Plug-ins\PyShift`).
4. Copy `Lib`, `DLLs`, `python311.dll`, `python3.dll` next to `AfterFX.exe` when AE and Python live on different drives (portable layout).
5. Restart AE while holding **Shift** if the plugin was previously blacklisted.

Symptoms like `import pyshiftae` failing or pop-up `48::72` generally mean the wheel/runtime version mismatch or the portable Python files are missing. See Annexe B for full troubleshooting.

### Minimal usage patterns

Get the active layer and its comp:

```python
import pyshiftae as ae

layer = ae.Layer.active_layer()
comp = layer.parent_comp
print(comp.name)
```

Create layers in the active comp:

```python
import pyshiftae as ae

comp = ae.Layer.active_layer().parent_comp

solid = comp.layers.add_solid(
    name="My Solid",
    color=(1.0, 0.0, 0.0, 1.0),
    width=1920,
    height=1080,
    duration=10.0,
)

null = comp.layers.add_null(name="CTRL", duration=10.0)
```

Apply an effect by matchName (or display name):

```python
import pyshiftae as ae

layer = ae.Layer.active_layer()
fx = ae.Effect.apply(layer, "ADBE Gaussian Blur 2")
print(fx.name, fx.match_name)
```

Set properties:

```python
import pyshiftae as ae

layer = ae.Layer.active_layer()
layer.opacity.set_value(50.0)
layer.position.set_value((960.0, 540.0, 0.0))
```

## Core workflow

### 1) Choose your entry point

- Use `Layer.active_layer()` when the user is “in context” (they selected something in AE).
- Use `Item.active_item()` when targeting the Project panel selection.
- Use `Project()` when you need project-wide operations (root items, save/import, open/new).

### 2) Work with collections like Python lists

- `comp.layers` returns a `LayerCollection` (list-like).
- `project.items` returns an `ItemCollection` (list-like).

Prefer filtering with `get_layer(...)`, `get_layers(...)`, `get_item(...)`, `get_items(...)` when you need search-by-criteria.

### 3) Use properties as typed objects

Properties are streams wrapped into classes:

- `OneDProperty` for scalar values (`opacity`, many sliders)
- `TwoDProperty` for `(x, y)`
- `ThreeDProperty` for `(x, y, z)`
- `ColorProperty` for RGBA
- `MarkerProperty` for markers
- `TextDocumentProperty` for text streams

Use `.set_value(...)` to write.

## Production-safe patterns

### Scheduler & threading (critical)

- Any call into AE SDK must execute on the AE main thread via `TaskScheduler`. Heavy computation still belongs on Python workers, but **there is currently no `ae.schedule_task` helper exposed by the runtime**. Use one of the following strategies instead:
  1. Run the mutating code where you are already on the AE thread (e.g., `bridge_daemon.py`, TaskScheduler callbacks invoked from C++).
  2. Build/extend the C++ TaskScheduler wrapper (see `AETK/TaskScheduler`) and expose your own marshaling helper before calling into AE objects from worker threads.
- When crossing from worker threads, pass only pure data structures through your queue and reacquire AE handles on the AE thread just before use.
- Never block the UI thread with long loops or `future.get()` inside hooks.
- Acquire the GIL only when running Python (`py::gil_scoped_acquire` at the edge) and release ASAP.

### Undo groups

Prefer `UndoGroup` as a context manager so the user can undo cleanly:

```python
import pyshiftae as ae

with ae.UndoGroup("Batch edits"):
    layer = ae.Layer.active_layer()
    layer.opacity.set_value(0.0)
```

Or decorate a function:

```python
import pyshiftae as ae

@ae.undo_group("My operation")
def run():
    layer = ae.Layer.active_layer()
    layer.opacity.set_value(25.0)
```

### Quiet errors

Use `QuietErrors` (or `@quiet_errors`) when probing optional streams/effects and you expect failures.

### Hybrid 2.0 CEP bridge

- **Primary transport** : Named pipes / Unix sockets exposés par PyInterface (voir Annexe C).
- **Fallback** : Mailbox JSON (`cep_to_py.json` / `py_to_cep.json`).
- CEP pilote l’UI, Python exécute les ops AE, latence <10 ms via pipe (sliders, interactions temps réel).
- Configurer `localStorage.setItem('pyshift_pipe_name', '...')` dans la console CEP, scripts de diagnostic fournis.

#### Architecture recommandée : Single Daemon, Multi-Domain
- **Un seul `bridge_daemon.py`** centralise les transports (pipes + mailbox) et la boucle de polling.
- **Chaque panel CEP** est un package Python (ex: `PyShiftBridge/mediasolution/`) avec :
  - `core.py` : logique métier PyShiftAE pure
  - `handlers.py` : validation + `register_handlers()` pour injecter les entrypoints
- **Registre dynamique** : `bridge_daemon.py` utilise `_HANDLERS` et `register_handlers()` de chaque module.
- **Avantages** : maintenance centralisée, tests partagés, pas de duplication IPC.
- Voir [guide CEP bridge](../../docs/02-guides/cep-python-bridge.md) pour le pattern complet.

## Common gotchas

### MatchName vs display name

- Effects can be applied by matchName or by their UI name.
- Many AE concepts (effects/properties) are identified more reliably by matchName.

### Pointer / lifetime behavior

Objects wrap native pointers. If you delete/reorder items/layers, previously-held references may become invalid.

Prefer:
- reacquire via collections (`comp.layers["Name"]`, `project.items.get_item(...)`)
- keep operations short inside a single undo group

### Indexing

PyShiftAE collections are implemented in Python and are 0-based from the Python side (unlike ExtendScript).
Don’t assume ExtendScript’s 1-based indexing.

### Platform / runtime constraints

PyShiftAE in this repo targets **Windows 10/11 x64**, **After Effects 2023+**, **CPython 3.11–3.13**. macOS/Linux builds are not shipped.

`PyShiftAE/AEGP/` is a broken symlink: the actual `.aex` sources are absent. Architecture details rely on AETK + Repomix dumps.

## API map (high-level)

- `App`
  - `report_info(message)`

- `Project`
  - `Project.new(name, path)`
  - `Project.open(path)`
  - `items` (root `ItemCollection`)
  - `save(path)`
  - `Import(path)`

- `Item` / `FolderItem` / `CompItem` / `FootageItem`
  - `Item.active_item()`
  - `CompItem.create(...)`
  - `FootageItem.create(path, name)`
  - `FootageItem.replace_from_path(path)`

- `Layer` (+ `AVLayer`, `CameraLayer`, `LightLayer`, `TextLayer`, `VectorLayer`)
  - `Layer.active_layer()`
  - frequently-used streams: `position`, `scale`, `rotation`, `opacity`, `anchor_point`, `text`, `marker`

- `Effect`
  - `Effect.apply(layer, match_name)`
  - `param(index_or_name)`

- `Mask`
  - `Mask.getMask(layer, maskIndex)`
  - `mode`, `opacity`, `feather`, `expansion`, `outline`, etc.

## Debugging checklist

- Confirm Python version matches the wheel tag and sits next to AE if using portable mode.
- Confirm `PyShiftAE.aex` is in the right folder and AE was restarted (Shift to rescan after crash).
- If `import pyshiftae` fails, isolate whether the Python package or `PyFx` native module is missing (check `site-packages` vs plugin path).
- Run `psc-install` instead of manually copying files; never import `pyshiftae` inside the installer scripts.
- Diagnose CEP bridge issues by checking the pipe name and falling back to mailbox JSON if needed.

## When to read code in this repo

- Read `PyShiftAE/Python/pyshiftae/ae.py` to confirm class names, method signatures, and supported operations.
- Read [architecture & patterns](../../docs/02-guides/coding-patterns.md) for threading, memory management, and production workflows.
- Read the annexes (A: faisabilité shapes/hooks, B: installation Windows, C: CEP bridge, D: checklist) for deeper dives.
- Review legacy Adobe docs in `docs/legacy-adobe/` for CEPy/PyFx native references when required.
