---
name: ae-scripting-expert
description: Expert guidance for Adobe After Effects ExtendScript/JSX development including ScriptUI panels, shape layers manipulation, expression engineering, and production-ready patterns. Use this skill when asked to write, debug, or analyze Adobe After Effects scripts (ExtendScript/JSX), create ScriptUI panels, or manipulate shape layers. Covers ES3 compatibility, dockable UI patterns, binary asset management, pseudo-effects, matchNames, and advanced shape layer architecture.
---

# After Effects Scripting Expert

## Quick Start

### Basic Script Structure

Always wrap your code in an IIFE to avoid global namespace pollution:

```jsx
(function() {
    // Your code here
})();
```

### Essential ES3 Rules

- Use `var` only (no `const`/`let`)
- No `map()`, `filter()`, `reduce()` without polyfills
- Use `for` loops or `while` for iteration
- String concatenation with `+`, not template literals
- Function declarations only, no arrow functions

### Official Guide Gotchas (API / Runtime)

- **Global environment persists**
Scripts share a global environment during a given AE session; names can collide. Prefer IIFEs and unique names.
- **File encoding matters**
Save `.jsx` as UTF-8 text. Some editors add headers that can cause “line 0” errors.
- **Dockable panels require `this` plumbing**
When running as a ScriptUI Panel, `this` is a `Panel`. If you build UI inside a function, pass `this` into that function.
- **`instanceof` caveats for base classes**
Some AE API base classes do not behave as expected with `instanceof` (can be always `false` or undefined). Prefer the most specific concrete classes you can (e.g. `CompItem`, `AVLayer`, `TextLayer`).

### Working With Decompiled JSXBIN Sources

- **Blob placeholders**
Treat variables like `__BLOB__BLOB_000123__` / `__BLOB__CLEANED__` as embedded binary assets. Don’t inspect contents; infer usage by call sites (e.g. passed to `ScriptUI.newImage(...)` => icon; written to disk with `encoding = "BINARY"` => preset/icon).
- **Obfuscated variable names**
Names like `e/t/n/r` are meaningless. Infer types by APIs used (e.g. `.add("iconbutton")` => ScriptUI container; `.layers.addNull()` => `CompItem`).
- **Verbose boolean checks**
Prefer idiomatic patterns in documentation/code you write (`if (x)` not `if (x === true)`), while preserving behavioral intent.

### Critical Patterns

Always use undo groups:

```jsx
app.beginUndoGroup("Your Action Name");
try {
    // Your operations
} catch(e) {
    alert("Error: " + e.toString());
} finally {
    app.endUndoGroup();
}
```

Remember 1-based indexing for After Effects collections:

```jsx
// First layer
var firstLayer = comp.layer(1);  // NOT layer(0)

// First property
var firstProp = layer.property(1);  // NOT property(0)
```

## When to Read References

### UI and Dockable Panels
**Read:** `references/ui-layout.md`
- Dockable vs palette patterns
- Binary asset management (blobs → files)
- Resilient layouts with tabbedpanel
- Icon buttons and custom graphics

### Shape Layers and Vector Graphics
**Read:** `references/vector-shapes.md`
- ADBE Root Vectors Group hierarchy
- Shape creation and manipulation
- Shape ↔ Mask conversion
- Transform stack management

### Advanced Internals and Production Patterns
**Read:** `references/hacks-and-internals.md`
- Binary preset files (.ffx)
- Pseudo Effects bootstrapping
- Hidden MatchNames and parameter IDs
- Expression engineering patterns

## Common Gotchas

### Object Validity (Stale References)

Some operations invalidate existing references (e.g. removing or reordering items in indexed groups). Prefer reacquiring objects, or guard with `isValid(obj)`:

```jsx
var effect1 = layer.effect(1);
var effect2 = layer.effect(2);

effect1.remove();

if (!isValid(effect2)) {
    // Reacquire by index/name/matchName as needed
    effect2 = layer.effect(1);
}
```

### Randomness

Prefer `generateRandomNumber()` over `Math.random()` for randomness that will be written into project values.

### File Permissions
Always check script write permissions before file operations:

```jsx
function isSecurityPrefSet() {
    var prefSection = parseFloat(app.version) < 12
        ? "Main Pref Section"
        : "Main Pref Section v2";
    return app.preferences.getPrefAsLong(
        prefSection,
        "Pref_SCRIPTING_FILE_NETWORK_SECURITY"
    ) === 1;
}

if (!isSecurityPrefSet()) {
    alert("Enable 'Allow Scripts to Write Files and Access Network' in Preferences");
    try {
        app.executeCommand(parseFloat(app.version) < 16.1 ? 2359 : 3131);
    } catch (e) {
        // Ignore: user may cancel or command may not exist
    }
    if (!isSecurityPrefSet()) return;
}
```

### Version Compatibility
Always check AE version for UI differences:

```jsx
var version = parseFloat(app.version);
if (version < 12) {
    // Use legacy UI patterns
} else {
    // Use modern UI patterns
}
```

### Error Handling
Wrap all external API calls in try-catch:

```jsx
try {
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        throw new Error("No active composition selected");
    }
} catch(e) {
    alert("Error: " + e.toString());
    return;
}
```

### Production-Specific Gotchas

#### MatchName Numbered Suffixes
Real-world scripts use numbered suffixes that aren't in official docs:

```jsx
// These patterns appear in production but aren't documented:
"ADBE Slider Control-0001"  // First slider instance
"ADBE Color Control-0001"   // First color instance  
"ADBE easyRulers-0032"      // EasyRulers parameter 32
"ADBE Fill-0002"            // Second fill instance
```

#### Property Access Timing
Properties may not be immediately available after creation:

```jsx
// WRONG: Accessing immediately might fail
var pathGroup = vectors.addProperty("ADBE Vector Shape - Group");
var path = pathGroup.property("ADBE Vector Shape"); // Could be null

// RIGHT: Use defensive patterns
var path;
var attempts = 0;
while (!path && attempts < 3) {
    try {
        path = pathGroup.property("ADBE Vector Shape");
    } catch(e) {
        attempts++;
        // Brief pause or retry logic
    }
}
```

#### Coordinate Space Confusion
Shape vertices are in layer space, not composition space:

```jsx
// WRONG: Using comp coordinates directly
var shape = createShape([100, 100], true); // This is layer space

// RIGHT: Convert comp to layer space
function compToLayerSpace(compPoint, layer) {
    var layerPos = layer.position.value;
    var layerAnchor = layer.anchorPoint.value;
    var layerScale = layer.scale.value;
    
    var scaleX = layerScale[0] / 100;
    var scaleY = layerScale[1] / 100;
    
    var localX = (compPoint[0] - layerPos[0]) / scaleX + layerAnchor[0];
    var localY = (compPoint[1] - layerPos[1]) / scaleY + layerAnchor[1];
    
    return [localX, localY];
}
```

#### Expression Safety in Production
Production scripts use robust expression patterns:

```jsx
// WRONG: Simple expressions can break
property.expression = "time * 10;";

// RIGHT: Defensive expressions
property.expression = 
    "try {\n" +
    "  var t = time * thisComp.frameRate * 0.1;\n" +
    "  Math.min(100, Math.max(0, t));\n" +
    "} catch(e) {\n" +
    "  0; // Safe fallback\n" +
    "}";
```

## Production-Grade Patterns

### Persisting Settings (app.settings)

Many commercial scripts persist user preferences with `app.settings` (not `app.preferences`). Pattern is:

```jsx
var SETTINGS_SECTION = "myScript";

function getSetting(key, defaultValue) {
    if (!app.settings.haveSetting(SETTINGS_SECTION, key)) {
        return defaultValue;
    }
    return app.settings.getSetting(SETTINGS_SECTION, key);
}

function setSetting(key, value) {
    app.settings.saveSetting(SETTINGS_SECTION, key, String(value));
    app.preferences.saveToDisk();
}
```

Use this for UI toggles, last-used values, feature flags, etc.

### `app.settings` Size Limit (1999 bytes)

`app.settings.getSetting()` / `saveSetting()` can throw if a value exceeds ~1999 bytes (documented for AE 15.0.1). Keep values small (booleans, numbers, short strings) and avoid storing large JSON blobs.

### Preferences Storage (PREFType + reload/save)

Use `app.preferences` for internal AE prefs, and `app.settings` for script prefs. Both APIs accept an optional `PREFType` argument to target different preference files.

```jsx
var enabled = app.preferences.getPrefAsBool(
    "Main Pref Section v2",
    "Pref_JAVASCRIPT_DEBUGGER",
    PREFType.PREF_Type_MACHINE_INDEPENDENT
);

// When you write prefs and need them visible in the same session:
app.preferences.saveToDisk();
app.preferences.reload();
```

### Render Queue Automation Callbacks

When automating renders, use callbacks to respond to errors or status changes:

- `app.onError` receives `(errorString, severityString)`.
- `RenderQueueItem.onStatusChanged` fires when the item status changes.

While rendering is in progress/paused, you generally **cannot modify** the project/render queue; callbacks can be used to pause/stop rendering via `renderQueue.pauseRendering(...)` / `renderQueue.stopRendering()`.

### Stateful ScriptUI Panels with Dual Rendering Modes

Commercial panels often support both compact and full UI modes, with user preferences persisted:

```jsx
// Global state management
var globalVar = {
    winObjSettings: {
        winSizeBig: [0, 0, 293, 180],
        winSizeSmall: [0, 0, 194, 180],
        iconsUI: false,
        showTools: true
    },
    savedSettings: {
        iconsUI: false,
        showTools: true,
        hideBgImage: false
    }
};

// Dual panel builders
this.buildToolsPanel_small = function(win) {
    win.panelTools = win.add("panel", [6, 176, 286, 236], "Tools");
    win.panelTools.groupToolsButtons = win.panelTools.add("group", [5, 13, 495, 69], "");
    
    // Icon buttons with binary assets
    var iconData = __BLOB__BLOB_000079__;
    var iconFile = this.utils.createResourceFile(
        "iconbut_NullParent.png", 
        iconData, 
        this.utils.getUserDataFolder()
    );
    
    win.panelTools.groupToolsButtons.but_addNull = win.panelTools.groupToolsButtons.add(
        "iconbutton", 
        [0, 0, 53, 30], 
        ScriptUI.newImage(iconFile)
    );
};

this.buildToolsPanel_big = function(win) {
    win.panelTools = win.add("panel", [6, 176, 286, 236], "Tools");
    win.panelTools.groupToolsButtons = win.panelTools.add("group", [5, 13, 495, 69], "");
    
    // Text buttons
    win.panelTools.groupToolsButtons.but_addNull = win.panelTools.groupToolsButtons.add(
        "button", 
        [0, 0, 84, 28], 
        "Null Parent"
    );
};

// Toggle based on saved settings
this.toggleToolsPanel = function(win) {
    if (globalVar.winObjSettings.showTools) {
        if (globalVar.winObjSettings.iconsUI) {
            this.buildToolsPanel_small(win);
        } else {
            this.buildToolsPanel_big(win);
        }
    }
};
```

### Settings Persistence and Dialog Orchestration

Production scripts need robust settings management and modal dialogs:

```jsx
// Settings persistence
this.loadAnchorSNIPERSettings = function() {
    this.utils.loadSettings(
        this.globalConstants.settingsSection,
        this.globalVar.savedSettings
    );
};

this.openSettingsDialog = function() {
    var settingsWin = new Window("dialog", "Settings", [0, 0, 285, 216], {
        resizeable: false
    });
    
    settingsWin.panelSettings = settingsWin.add("panel", [5, 5, 272, 169], "Settings");
    settingsWin.panelSettings.check_iconsUI = settingsWin.panelSettings.add(
        "checkbox", [14, 72, 304, 92], "Small User Interface (requires script restart)"
    );
    settingsWin.panelSettings.check_iconsUI.value = this.globalVar.savedSettings.iconsUI;
    
    settingsWin.but_save = settingsWin.add("button", [200, 180, 270, 200], "Save");
    settingsWin.but_save.onClick = function() {
        var newSettings = {
            iconsUI: settingsWin.panelSettings.check_iconsUI.value,
            showTools: settingsWin.panelSettings.check_showTools.value
        };
        
        // Check if restart required
        if (newSettings.iconsUI !== vn_AnchorSniperUI.globalVar.savedSettings.iconsUI) {
            alert("Changing UI size requires script restart.");
        }
        
        vn_AnchorSniperUI.utils.saveSettings(
            vn_AnchorSniperUI.globalConstants.settingsSection,
            newSettings
        );
        settingsWin.close();
    };
    
    settingsWin.center();
    settingsWin.show();
};
```

### Tabbed Panels with Resource Strings

For complex UIs, use resource strings to define layouts centrally:

```jsx
// Define layout as resource string
var panelResource = 
    "group{orientation:'column', alignChildren:'center'," +
    "mainTabs: Panel{type:'tabbedpanel', orientation:'column'," +
    "joyTab: Panel{type:'tab', text:'Joysticks'," +
    "joyImg: Image{preferredSize: [228, 43]}," +
    "stickPnl: Panel{text:'Joystick tools'," +
    "groupJ: Group{orientation:'row'," +
    "rigButn: IconButton{preferredSize:[100,23]}," +
    "upPath: IconButton{preferredSize:[43,23]}" +
    "}" +
    "}" +
    "}" +
    "}";

// Build panel from resource
var win = new Window("palette", "Joysticks n Sliders", undefined, { resizeable: true });
win.grp = win.add(panelResource);

// Assign assets and tooltips
win.grp.mainTabs.joyTab.stickPnl.groupJ.rigButn.image = newJoystickIcon;
win.grp.mainTabs.joyTab.stickPnl.groupJ.rigButn.helpTip = "Create new joystick";

// Set defaults after layout
win.grp.mainTabs.joyTab.stickPnl.groupOne.existDrop.selection = 0;
```

### Expression Templating and Safe String Injection

When building expressions dynamically, always quote strings safely:

```jsx
function exprStringLiteral(value) {
    var s = String(value);
    s = s.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"");
    return "\"" + s + "\"";
}

// Build expression with safe layer name injection
var expression = 
    "try {\n" +
    "  var controlLayer = thisComp.layer(" + exprStringLiteral(controlLayer.name) + ");\n" +
    "  var completion = controlLayer.effect(\"ADBE easyRulers\")(\"Completion\");\n" +
    "  var range = controlLayer.effect(\"ADBE easyRulers\")(\"ADBE easyRulers-0063\");\n" +
    "  \n" +
    "  if (completion >= -range && completion <= range) {\n" +
    "    var x_before = range == 0 ? 0 : (completion + range) / range;\n" +
    "    var x_after = range == 0 ? 0 : -(completion - range) / range;\n" +
    "    \n" +
    "    // Apply easing based on control slider\n" +
    "    switch (controlLayer.effect(\"ADBE easyRulers\")(\"ADBE easyRulers-0064\").value) {\n" +
    "      case 1: return x_after * scale_fx;\n" +
    "      case 2: return value;\n" +
    "      case 4: return Math.pow(x_after, 4) * scale_fx;\n" +
    "      case 5: return ((x_after-1)*(x_after-1)*(x_after-1)+1) * scale_fx;\n" +
    "      case 6: return (x_after < 0.5 ? 2*x_after*x_after : -1+(4-2*x_after)*x_after) * scale_fx;\n" +
    "    }\n" +
    "  }\n" +
    "} catch(e) {\n" +
    "  value; // Safe fallback\n" +
    "}";

property.expression = expression;
```

### Binary Asset Lifecycle Management

For embedded assets (icons, presets), use a consistent write-once pattern:

```jsx
function ensureBinaryAssetFile(assetName, assetBinary) {
    var assetFolder = Folder(Folder.temp.fsName + "/aescripts_assets");
    if (!assetFolder.exists) {
        assetFolder.create();
    }

    var assetFile = File(assetFolder.fsName + "/" + assetName);
    if (!assetFile.exists) {
        assetFile.encoding = "BINARY";
        if (!assetFile.open("w")) {
            throw new Error("Unable to write asset: " + assetFile.fsName);
        }
        try {
            assetFile.write(assetBinary);
        } finally {
            assetFile.close();
        }
    }
    return assetFile;
}

// Usage with blob placeholder
var iconFile = ensureBinaryAssetFile(
    "tool_icon.png", 
    __BLOB__BLOB_000079__
);
```

### Advanced Shape ↔ Mask Conversion
Based on Origami production patterns:

```jsx
function shapeLayerToMasks(shapeLayer, targetLayer) {
    var paths = getAllPathsObjects(
        shapeLayer.property("ADBE Root Vectors Group")
    );
    
    var maskParade = targetLayer.property("ADBE Mask Parade");
    
    for (var i = 0; i < paths.length; i++) {
        var pathData = paths[i];
        var mask = maskParade.addProperty("ADBE Mask Atom");
        
        // Apply shape to mask with coordinate transformation
        mask.property("ADBE Mask Shape").setValue(pathData.path.value);
        
        // Handle nested transforms (production pattern)
        if (pathData.transforms.length > 0) {
            applyTransformStackToMask(mask, pathData.transforms);
        }
    }
}
```

### Transform Stack Management
Production scripts handle nested group transforms:

```jsx
function getAllPathsObjects(group, transformStack) {
    var transformName = "ADBE Vector Transform Group";
    var pathName = "ADBE Vector Shape";
    var results = [];
    
    if (!transformStack) transformStack = [];
    
    // Add current group's transform to stack
    var currentTransform = group.property(transformName);
    var newStack = currentTransform ? 
        transformStack.concat([currentTransform]) : 
        transformStack;
    
    // Recursively search with transform tracking
    for (var i = 1; i <= group.numProperties; i++) {
        var prop = group.property(i);
        if (prop instanceof PropertyGroup) {
            results = results.concat(getAllPathsObjects(prop, newStack));
        } else if (prop.matchName === pathName) {
            results.push({
                path: prop,
                transforms: newStack
            });
        }
    }
    
    return results;
}
```

## Asset Templates

Use the templates in `assets/` as starting points:
- `basic-script-template.jsx` - Minimal script structure
- `dockable-ui-template.jsx` - Complete dockable panel
- `shape-layer-template.jsx` - Shape layer manipulation helpers

## Essential References

### Production Script Analysis
For real-world patterns and undocumented matchNames, see:
- `docs/04-reference/ae-internals.md` - Analysis of 376 production scripts and MatchNames reference
- Binary asset lifecycle patterns from Easy Clones, Anchor Sniper
- Expression templating patterns from easyRulers

### Core Documentation Areas
- UI and Dockable Panels → `references/ui-layout.md`
- Shape Layers and Vector Graphics → `references/vector-shapes.md`
- Advanced Internals → `references/hacks-and-internals.md`

## Essential MatchNames

### Core Shape Layer MatchNames
Keep these core MatchNames handy:
- `ADBE Effect Parade` - Effects group
- `ADBE Transform Group` - Transform properties
- `ADBE Root Vectors Group` - Shape layer contents
- `ADBE Mask Parade` - Mask group

### Production-Grade MatchNames (Frequently Used)
These matchNames are heavily used in production scripts but often undocumented:
- `ADBE easyRulers` - EasyRulers effect (most used non-standard effect)
- `ADBE Slider Control-0001` - Slider parameter in pseudo-effects
- `ADBE Color Control-0001` - Color parameter in pseudo-effects
- `ADBE Layer Control-0001` - Layer picker parameter
- `ADBE Point Control-0001` - Point/position parameter
- `ADBE Checkbox Control-0001` - Checkbox parameter

### Parameter Suffix Patterns
Production scripts use numbered suffixes for multiple instances:
- `ADBE easyRulers-0032` through `ADBE easyRulers-0080` (EasyRulers parameters)
- `ADBE Fill-0002` - Additional fill instances
- `ADBE Vector Repeater Opacity 2` - Repeater variations

### Critical Undocumented MatchNames
Based on analysis of 376 production scripts, these high-usage matchNames are missing from official docs:

| MatchName | Usage Count | Context |
|-----------|-------------|---------|
| `ADBE easyRulers` | 3616 | Custom effect for text rulers and guides |
| `ADBE Slider Control-0001` | 885 | Pseudo-effect slider parameters |
| `ADBE Color Control-0001` | 344 | Pseudo-effect color parameters |
| `ADBE Layer Control-0001` | 142 | Layer picker controls |
| `ADBE Mask Shape` | 121 | Direct mask vertex access |
| `ADBE Point Control-0001` | 105 | Point/position controls |

### Material Options MatchNames (3D Scripts)
3D box builders and rigging scripts use these undocumented material options:
- `ADBE Accepts Lights` - Enable lighting on layer
- `ADBE Accepts Shadows` - Enable shadow reception
- `ADBE Casts Shadows` - Enable shadow casting
- `ADBE Ambient` - Ambient material property
- `ADBE Diffuse` - Diffuse material property

For complete MatchName reference, see the individual reference files and `docs/04-reference/ae-internals.md` for real-world usage patterns.
