# Hacks & Advanced Internals

## Expression Injection

### Safe String Escaping for Expressions

When injecting layer names or values into expressions, always escape properly:

```jsx
function escapeExpressionString(str) {
    return String(str)
        .replace(/\\/g, "\\\\")   // Escape backslashes
        .replace(/\"/g, "\\\"")   // Escape double quotes
        .replace(/\'/g, "\\\'")   // Escape single quotes
        .replace(/\n/g, "\\n")    // Escape newlines
        .replace(/\r/g, "\\r");   // Escape carriage returns
}

function buildLayerReferenceExpression(layerName, propertyName) {
    var safeLayerName = escapeExpressionString(layerName);
    var safePropertyName = escapeExpressionString(propertyName);
    
    return [
        "var ctrl = thisComp.layer(\"" + safeLayerName + "\");",
        "if (ctrl) {",
        "    ctrl.effect(\"Easy Clones\")(\"" + safePropertyName + "\");",
        "} else {",
        "    0;",
        "}"
    ].join("\n");
}

// Usage
var controlLayer = app.project.activeItem.layer("Control");
var expr = buildLayerReferenceExpression(controlLayer.name, "Clone Delay");
someProperty.expression = expr;
```

### Multi-line Expression Builder

```jsx
function createCloneExpression(controlLayer, cloneIndex) {
    var safeLayerName = escapeExpressionString(controlLayer.name);
    
    var expressionLines = [
        "var ctrl = thisComp.layer(\"" + safeLayerName + "\");",
        "if (!ctrl) { value; }",
        "",
        "// Clone-specific parameters",
        "var cloneIndex = " + cloneIndex + ";",
        "var baseDelay = ctrl.effect(\"Easy Clones\")(12);", // Delay slider
        "var randomDelay = ctrl.effect(\"Easy Clones\")(13);", // Random delay
        "var seed = ctrl.effect(\"Easy Clones\")(14);", // Seed
        "",
        "// Stable random per clone",
        "seedRandom(seed + cloneIndex, true);",
        "var delay = baseDelay + (randomDelay * random());",
        "",
        "// Time remapping with delay",
        "valueAtTime(time - delay);"
    ];
    
    return expressionLines.join("\n");
}
```

### Expression Template System

```jsx
var expressionTemplates = {
    positionFollow: [
        "var target = thisComp.layer(\"{LAYER_NAME}\");",
        "if (target) {",
        "    var offset = [{X_OFFSET}, {Y_OFFSET}];",
        "    target.position + offset;",
        "} else {",
        "    value;",
        "}"
    ].join("\n"),
    
    randomRotation: [
        "seedRandom({SEED}, true);",
        "var minRot = {MIN_ROTATION};",
        "var maxRot = {MAX_ROTATION};",
        "linear(random(), minRot, maxRot);"
    ].join("\n")
};

function fillTemplate(template, replacements) {
    var result = template;
    for (var key in replacements) {
        var pattern = new RegExp("\\{" + key + "\\}", "g");
        result = result.replace(pattern, escapeExpressionString(replacements[key]));
    }
    return result;
}
```

## Binary Preset Management

### Binary File Writing Pattern

```jsx
function writeBinaryPreset(presetName, binaryData) {
    var tempFolder = Folder.temp.fsName + "/ae_presets";
    var presetFolder = new Folder(tempFolder);
    
    // Create folder if needed
    if (!presetFolder.exists) {
        presetFolder.create();
        if (!presetFolder.exists) {
            throw new Error("Cannot create preset folder: " + tempFolder);
        }
    }
    
    var presetFile = new File(presetFolder.fsName + "/" + presetName);
    
    // Write binary data
    presetFile.encoding = "BINARY";
    if (!presetFile.open("w")) {
        throw new Error("Cannot open preset file for writing: " + presetFile.fsName);
    }
    
    try {
        presetFile.write(binaryData);
    } finally {
        presetFile.close();
    }
    
    return presetFile;
}
```

### Pseudo-Effect Bootstrapping

```jsx
function ensurePseudoEffectAvailable(matchName, presetName, binaryData) {
    // Check if pseudo-effect is already available
    var comp = app.project.activeItem;
    if (!comp) return false;
    
    var testLayer = comp.layers.addNull();
    var effects = testLayer.property("ADBE Effect Parade");
    
    var isAvailable = effects.canAddProperty(matchName);
    
    if (!isAvailable) {
        // Bootstrap: apply preset to temporary layer
        var presetFile = writeBinaryPreset(presetName, binaryData);
        
        testLayer.selected = true;
        testLayer.applyPreset(presetFile);
        
        // Now the pseudo-effect should be available
        isAvailable = effects.canAddProperty(matchName);
    }
    
    // Clean up
    testLayer.remove();
    
    return isAvailable;
}

function addPseudoEffectToLayer(layer, matchName, displayName, presetName, binaryData) {
    if (!ensurePseudoEffectAvailable(matchName, presetName, binaryData)) {
        throw new Error("Failed to make pseudo-effect available: " + matchName);
    }
    
    var effects = layer.property("ADBE Effect Parade");
    var effect = effects.addProperty(matchName);
    
    if (displayName) {
        effect.name = displayName;
    }
    
    return effect;
}
```

### Preset Caching Strategy

```jsx
var presetCache = {};

function getCachedPreset(presetName, binaryData) {
    if (presetCache[presetName]) {
        var cachedFile = new File(presetCache[presetName]);
        if (cachedFile.exists) {
            return cachedFile;
        }
    }
    
    // Create new cached preset
    var presetFile = writeBinaryPreset(presetName, binaryData);
    presetCache[presetName] = presetFile.fsName;
    
    return presetFile;
}
```

## Hidden MatchNames Reference

### Undocumented Effect Parameter MatchNames

| MatchName | Context | Usage Count | Description |
|-----------|---------|-------------|-------------|
| `ADBE Slider Control-0001` | Slider Control value | 885+ | Direct access to slider value |
| `ADBE Color Control-0001` | Color Control value | 344+ | Direct access to color value |
| `ADBE Point Control-0001` | Point Control value | 105+ | Direct access to point value |
| `ADBE Layer Control-0001` | Layer Control selection | 142+ | Direct access to layer picker |
| `ADBE Checkbox Control-0001` | Checkbox Control state | 72+ | Direct access to checkbox value |
| `ADBE Angle Control-0001` | Angle Control value | 45+ | Direct access to angle value |

### Custom Effect MatchNames

| MatchName | Source | Purpose |
|-----------|--------|---------|
| `ADBE easyRulers` | easyRulers script | Custom rulers effect |
| `ADBE easyRulers-0032` | easyRulers script | Parameter 32 |
| `ADBE easyRulers-0034` | easyRulers script | Parameter 34 |
| `ADBE easyRulers-0035` | easyRulers script | Parameter 35 |

### 3D Material Property MatchNames

| MatchName | UI Label | Context |
|-----------|----------|---------|
| `ADBE Accepts Lights` | Accepts Lights | 3D material options |
| `ADBE Accepts Shadows` | Accepts Shadows | 3D material options |
| `ADBE Ambient` | Ambient | 3D material options |
| `ADBE Diffuse` | Diffuse | 3D material options |
| `ADBE Specular` | Specular | 3D material options |
| `ADBE Shininess` | Shininess | 3D material options |

### Mask-Related MatchNames

| MatchName | Purpose | Usage |
|-----------|---------|-------|
| `ADBE Mask Shape` | Mask path vertices | Direct mask shape access |
| `ADBE Mask Offset` | Mask position | Mask transform |
| `ADBE Mask Feather` | Mask feather | Mask properties |
| `ADBE Mask Opacity` | Mask opacity | Mask properties |
| `ADBE Mask Expansion` | Mask expansion | Mask properties |

### Vector Shape Variants

| MatchName | Shape Type | When to Use |
|-----------|------------|-------------|
| `ADBE Vector Shape - Rect` | Rectangle | Quick rectangle creation |
| `ADBE Vector Shape - Ellipse` | Ellipse | Quick ellipse creation |
| `ADBE Vector Shape - Star` | Star | Quick star creation |
| `ADBE Vector Shape - Group` | Custom path | For custom Shape objects |

## Advanced Expression Patterns

### Time-Based Animation with Seeds

```jsx
function createSeededAnimationExpression(seed, frequency, amplitude) {
    return [
        "seedRandom(" + seed + ", true);",
        "var t = time * " + frequency + ";",
        "var noise = random() * 2 - 1;",
        "value + (noise * " + amplitude + ");"
    ].join("\n");
}
```

### Conditional Logic in Expressions

```jsx
function createConditionalExpression(conditionLayer, trueValue, falseValue) {
    var safeLayerName = escapeExpressionString(conditionLayer.name);
    
    return [
        "var cond = thisComp.layer(\"" + safeLayerName + "\");",
        "if (cond && cond.effect(\"Toggle\")(1) == 1) {",
        "    " + trueValue + ";",
        "} else {",
        "    " + falseValue + ";",
        "}"
    ].join("\n");
}
```

### Expression Error Handling

```jsx
function createSafeExpression(expression, fallback) {
    return [
        "try {",
        "    " + expression,
        "} catch(e) {",
        "    // Expression error: " + escapeExpressionString(expression),
        "    " + fallback,
        "}"
    ].join("\n");
}
```

## Production-Grade Patterns

### Effect Parameter Access

```jsx
function getEffectParameter(layer, effectName, parameterIndex) {
    var effect = layer.effect(effectName);
    if (!effect) return null;
    
    // Try direct matchName first (faster)
    var directMatch = effect.property("ADBE " + effectName + "-" + 
        String(parameterIndex - 1).padStart(4, "0"));
    if (directMatch) return directMatch;
    
    // Fallback to indexed access
    return effect.property(parameterIndex);
}

function setEffectParameter(layer, effectName, parameterIndex, value) {
    var param = getEffectParameter(layer, effectName, parameterIndex);
    if (param) {
        param.setValue(value);
        return true;
    }
    return false;
}
```

### Property Discovery

```jsx
function discoverEffectParameters(effect) {
    var params = [];
    for (var i = 1; i <= effect.numProperties; i++) {
        var prop = effect.property(i);
        params.push({
            index: i,
            name: prop.name,
            matchName: prop.matchName,
            value: prop.value,
            canSetExpression: prop.canSetExpression
        });
    }
    return params;
}
```

### Binary Data Utilities

```jsx
function stringToBinary(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
        var hex = str.charCodeAt(i).toString(16);
        result += "\\x" + (hex.length === 1 ? "0" + hex : hex);
    }
    return result;
}

function isValidBinaryData(data) {
    // Check if data looks like binary blob
    return typeof data === "string" && 
           data.length > 100 && 
           data.indexOf("__BLOB__") === 0;
}
```

## Security & Compatibility

### Permission Checking

```jsx
function checkScriptPermissions() {
    var prefs = [
        "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
        "Pref_SCRIPTING_FILE_NETWORK_SECURITY"
    ];
    
    for (var i = 0; i < prefs.length; i++) {
        if (!app.preferences.getPrefAsBool("Main Pref Section", prefs[i])) {
            return false;
        }
    }
    return true;
}

function requestPermissions() {
    try {
        app.executeCommand(2359); // Open preferences
        alert("Please enable 'Allow Scripts to Write Files and Access Network' in Preferences");
    } catch(e) {
        alert("Cannot open preferences. Please manually enable script permissions.");
    }
}
```

### Version-Specific Compatibility

```jsx
function getAEMajorVersion() {
    return parseFloat(app.version.split('.')[0]);
}

function isFeatureSupported(featureName) {
    var version = getAEMajorVersion();
    var features = {
        'modernExpressions': version >= 13,
        'enhancedShapeLayers': version >= 15,
        'advanced3D': version >= 16,
        'multiFrameRendering': version >= 22
    };
    
    return features[featureName] || false;
}
