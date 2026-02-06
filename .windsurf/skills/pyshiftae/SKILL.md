---
name: pyshiftae
description: Expert guidance for automating Adobe After Effects with PyShiftAE (Python) via the native PyShiftAE.aex / PyFx bridge (C++ SDK). Use this skill when asked to write, debug, or design Python automation that manipulates AE projects, comps, layers, properties, effects, masks, or when troubleshooting installation (wheel + psc-install) and version alignment (Python 3.11-3.13). Covers core API objects (Project/Item/CompItem/Layer/Property/Effect/Mask), common gotchas, and production-safe patterns.
---

# PyShiftAE (Python for After Effects)

## Quick Start

### Mental model

- **PyShiftAE is not ExtendScript**
It is a Python API built on top of a native plugin (`PyShiftAE.aex`) exposing SDK suites through `PyFx`.

- **Two layers**
- `pyshiftae` (pure Python): high-level classes (`Layer`, `CompItem`, `Effect`, etc.)
- `PyFx` (native module): low-level SDK access (Suites + pointers)

### Installation / first run checklist

- Install the matching wheel for your CPython version (`cp311`, `cp312`, `cp313`).
- Run `psc-install` and point it to AE’s `Plug-ins/Effects` folder.
- Restart After Effects.

If `import pyshiftae` fails because `PyFx` is missing, the plugin is not installed in AE, or the wheel/plugin Python version does not match.

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

PyShiftAE in this repo targets:

- Windows 10/11 (x64)
- After Effects 2023+
- CPython 3.11–3.13 (wheel tag must match)

If the user is on macOS/Linux, treat PyShiftAE as unavailable unless they have a supported build.

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

- Confirm the user’s Python version and that it matches the wheel tag.
- Confirm the plugin is installed into the correct AE folder and AE has been restarted.
- If `import pyshiftae` fails:
  - isolate whether it’s `pyshiftae` (python package) or `PyFx` (native module) failing
  - avoid importing the main library in installer scripts (use `psc-install`)

## When to read code in this repo

- Read `PyShiftAE/Python/pyshiftae/ae.py` to confirm class names, method signatures, and supported operations.
- Read `PyShiftAE/Python/tests/test.py` for real usage patterns (stress tests for layers, effects, property writes).
- Read `PyShiftAE/README.md` for installation + constraints and release notes.
