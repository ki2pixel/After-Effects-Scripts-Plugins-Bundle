# Expression Control Parameter Match Names

---

## Overview

In After Effects scripting, Expression Controls (Slider/Color/Layer/etc.) are effects added to a layer via `ADBE Effect Parade`.

Each Expression Control effect has one primary parameter property. In practice, scripts frequently access that parameter by an internal matchName suffixed with `-0001`.

These parameter matchNames are widely used in production scripts, but are not listed in the regular First-Party Effect matchName table.

---

## Parameter properties (observed in SOURCE_A)

| Parent Effect Match Name | Parameter Match Name | Typical UI Label (EN) | Example usage (from scripts) |
| --- | --- | --- | --- |
| `ADBE Slider Control` | `ADBE Slider Control-0001` | Slider | `layer("ADBE Effect Parade")("My Slider")("ADBE Slider Control-0001")` |
| `ADBE Angle Control` | `ADBE Angle Control-0001` | Angle | `effect("My Angle")("ADBE Angle Control-0001")` |
| `ADBE Checkbox Control` | `ADBE Checkbox Control-0001` | Checkbox | `effect("My Checkbox")("ADBE Checkbox Control-0001")` |
| `ADBE Color Control` | `ADBE Color Control-0001` | Color | `effect("My Color")("ADBE Color Control-0001")` |
| `ADBE Layer Control` | `ADBE Layer Control-0001` | Layer | `effect("My Layer")("ADBE Layer Control-0001")` |
| `ADBE Point Control` | `ADBE Point Control-0001` | Point | `effect("My Point")("ADBE Point Control-0001")` |
| `ADBE Point3D Control` | `ADBE Point3D Control-0001` | 3D Point | `effect("My 3D Point")("ADBE Point3D Control-0001")` |

---

## Examples (real-world)

### Slider Control → `ADBE Slider Control-0001`

From `Aescripts-circuitFX v1.75/circuitFX.jsx`:

```javascript
j.Effects.addProperty("ADBE Slider Control").name = "Masks Expansion";
j("ADBE Effect Parade")("Masks Expansion")(
  "ADBE Slider Control-0001",
).setValue(0);
```

### Checkbox + Angle Control parameters used in expressions

From `Aescripts-circuitFX v1.75/circuitFX.jsx`:

```javascript
"effect(\"[ LINES ]: trim individually\")(\"ADBE Checkbox Control-0001\").value?0:effect(\"[ LINES ]: trim Offset\")(\"ADBE Angle Control-0001\")"
```

### Color Control → `ADBE Color Control-0001`

From `origami_fix.jsx`:

```javascript
this.col.property("ADBE Color Control-0001").expression =
  'bgLayer = thisComp.layer("' + this.layer.name + '"' +
  "\nbgLayer.sampleImage([" + coordinate[0] + ", " + coordinate[1] + "], [5,5], true, time)";
```

### Point Control → `ADBE Point Control-0001`

From `origami_fix.jsx`:

```javascript
var gettySlider = _layer
  .property("ADBE Effect Parade")
  .addProperty("ADBE Point Control");
gettySlider.property("ADBE Point Control-0001").expression =
  "thisLayer.sourceRectAtTime(time, true).width * [1,1]";
```

### Point3D / Layer Control usage

From `Aescripts-Font Manager v2.0.1 (WIN+MAC)/FontManager.jsx`:

```javascript
prop = controllerLayer("ADBE Effect Parade").addProperty("ADBE Point3D Control");
propChild = prop("ADBE Point3D Control-0001");

prop = controllerLayer("ADBE Effect Parade").addProperty("ADBE Layer Control");
propChild = prop("ADBE Layer Control-0001");
```

---

## Notes / risks

- These parameter matchNames behave like stable “internal IDs” in practice, but they are **not consistently enumerated** in the matchName reference tables.
- If you need maximum resilience, prefer accessing the parameter by **property index** (`effect.property(1)`) *after* you have a safe reference to the effect itself.
- This page documents only parameter matchNames **observed in SOURCE_A** (production scripts).
