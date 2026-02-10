# Vector Shapes & Shape Layer Architecture

## The Infernal Hierarchy

### Complete Shape Layer Structure

Shape layers follow this exact hierarchy. Navigate it carefully:

```text
ShapeLayer
└─ "ADBE Root Vectors Group"           // Contents (root)
   └─ "ADBE Vector Group"              // Group (optional)
      └─ "ADBE Vectors Group"          // Contents (of group)
         ├─ "ADBE Vector Shape - Group" // Path group
         │  └─ "ADBE Vector Shape"      // Path (Shape object)
         ├─ "ADBE Vector Graphic - Fill" // Fill
         │  └─ "ADBE Vector Fill Color" // Color property
         ├─ "ADBE Vector Graphic - Stroke" // Stroke
         │  ├─ "ADBE Vector Stroke Width" // Width property
         │  └─ "ADBE Vector Stroke Color" // Color property
         └─ "ADBE Vector Filter - Trim"   // Trim Paths
            └─ "ADBE Vector Trim End"    // End property
```

### Navigation Pattern

Always start from the root and work down:

```jsx
function getShapeLayerContents(shapeLayer) {
    return shapeLayer.property("ADBE Root Vectors Group");
}

function addShapeGroup(contents) {
    var group = contents.addProperty("ADBE Vector Group");
    return group.property("ADBE Vectors Group");
}

function addPathToGroup(vectorsGroup) {
    var pathGroup = vectorsGroup.addProperty("ADBE Vector Shape - Group");
    return pathGroup.property("ADBE Vector Shape");
}
```

## Shape Object Structure

### Complete Shape() Definition

```jsx
function createShape(vertices, closed) {
    var shape = new Shape();
    
    // Required: vertices array of [x, y] coordinates
    shape.vertices = vertices || [];
    
    // Required: closed path boolean
    shape.closed = closed !== undefined ? closed : true;
    
    // Optional: tangents for curves (same length as vertices)
    // Default is [[0,0], [0,0], ...] for straight lines
    shape.inTangents = vertices ? vertices.map(function() { return [0, 0]; }) : [];
    shape.outTangents = vertices ? vertices.map(function() { return [0, 0]; }) : [];
    
    return shape;
}
```

### Shape Creation Examples

```jsx
// Rectangle
function createRectangle(width, height) {
    var halfW = width / 2;
    var halfH = height / 2;
    var vertices = [
        [-halfW, -halfH],  // Top-left
        [halfW, -halfH],   // Top-right
        [halfW, halfH],    // Bottom-right
        [-halfW, halfH]    // Bottom-left
    ];
    return createShape(vertices, true);
}

// Circle approximation
function createCircle(radius, segments) {
    segments = segments || 32;
    var vertices = [];
    var angleStep = (2 * Math.PI) / segments;
    
    for (var i = 0; i < segments; i++) {
        var angle = i * angleStep;
        vertices.push([
            Math.cos(angle) * radius,
            Math.sin(angle) * radius
        ]);
    }
    
    return createShape(vertices, true);
}

// Bezier curve shape
function createBezierCurve(start, cp1, cp2, end) {
    var shape = new Shape();
    shape.vertices = [start, end];
    shape.closed = false;
    shape.inTangents = [[0, 0], cp2];
    shape.outTangents = [cp1, [0, 0]];
    return shape;
}
```

## Critical MatchNames

### Essential Shape Layer MatchNames

| MatchName | Purpose | Usage |
|-----------|---------|-------|
| `ADBE Root Vectors Group` | Contents root | `layer.property("ADBE Root Vectors Group")` |
| `ADBE Vector Group` | Group container | `contents.addProperty("ADBE Vector Group")` |
| `ADBE Vectors Group` | Group contents | `group.property("ADBE Vectors Group")` |
| `ADBE Vector Shape - Group` | Path group | `vectors.addProperty("ADBE Vector Shape - Group")` |
| `ADBE Vector Shape` | Path property | `pathGroup.property("ADBE Vector Shape")` |
| `ADBE Vector Shape - Rect` | Rectangle path | `vectors.addProperty("ADBE Vector Shape - Rect")` |
| `ADBE Vector Shape - Ellipse` | Ellipse path | `vectors.addProperty("ADBE Vector Shape - Ellipse")` |
| `ADBE Vector Shape - Star` | Star path | `vectors.addProperty("ADBE Vector Shape - Star")` |
| `ADBE Vector Graphic - Fill` | Fill effect | `vectors.addProperty("ADBE Vector Graphic - Fill")` |
| `ADBE Vector Fill Color` | Fill color | `fill.property("ADBE Vector Fill Color")` |
| `ADBE Vector Graphic - Stroke` | Stroke effect | `vectors.addProperty("ADBE Vector Graphic - Stroke")` |
| `ADBE Vector Stroke Width` | Stroke width | `stroke.property("ADBE Vector Stroke Width")` |
| `ADBE Vector Stroke Color` | Stroke color | `stroke.property("ADBE Vector Stroke Color")` |
| `ADBE Vector Filter - Trim` | Trim Paths | `vectors.addProperty("ADBE Vector Filter - Trim")` |
| `ADBE Vector Trim End` | Trim end property | `trim.property("ADBE Vector Trim End")` |
| `ADBE Vector Trim Start` | Trim start property | `trim.property("ADBE Vector Trim Start")` |
| `ADBE Vector Trim Offset` | Trim offset | `trim.property("ADBE Vector Trim Offset")` |
| `ADBE Vector Transform Group` | Transform group | `pathGroup.property("ADBE Vector Transform Group")` |
| `ADBE Vector Position` | Position | `transform.property("ADBE Vector Position")` |
| `ADBE Vector Scale` | Scale | `transform.property("ADBE Vector Scale")` |
| `ADBE Vector Rotation` | Rotation | `transform.property("ADBE Vector Rotation")` |
| `ADBE Vector Anchor Point` | Anchor point | `transform.property("ADBE Vector Anchor Point")` |

### Hidden MatchNames (From Field Analysis)

These are frequently used but not well documented:

| MatchName | Context | Why Important |
|-----------|---------|----------------|
| `ADBE Mask Shape` | Mask vertices | Direct access to mask path data |
| `ADBE Mask Atom` | Mask container | Individual mask creation |
| `ADBE Mask Parade` | Masks group | Root mask container |
| `ADBE Layer Control-0001` | Layer picker | Parameter in pseudo-effects |
| `ADBE Slider Control-0001` | Slider value | Direct parameter access |
| `ADBE Color Control-0001` | Color value | Direct parameter access |

## Shape Creation Patterns

### Basic Shape Layer Creation

```jsx
function createShapeLayer(comp, name) {
    var shapeLayer = comp.layers.addShape();
    shapeLayer.name = name;
    shapeLayer.position.setValue([comp.width/2, comp.height/2]);
    return shapeLayer;
}

function addPathToShapeLayer(shapeLayer, shapeObj, groupName) {
    var contents = shapeLayer.property("ADBE Root Vectors Group");
    var group = contents.addProperty("ADBE Vector Group");
    group.name = groupName || "Path Group";
    
    var vectors = group.property("ADBE Vectors Group");
    var pathGroup = vectors.addProperty("ADBE Vector Shape - Group");
    var path = pathGroup.property("ADBE Vector Shape");
    
    path.setValue(shapeObj);
    
    return {
        group: group,
        vectors: vectors,
        pathGroup: pathGroup,
        path: path
    };
}
```

### Adding Fill and Stroke

```jsx
function addFill(pathGroup, color, opacity, name) {
    var fill = pathGroup.addProperty("ADBE Vector Graphic - Fill");
    fill.property("ADBE Vector Fill Color").setValue(color || [1, 1, 1]);
    if (opacity !== undefined) {
        fill.property("ADBE Vector Fill Opacity").setValue(opacity);
    }
    if (name) fill.name = name;
    return fill;
}

function addStroke(pathGroup, width, color, opacity, name) {
    var stroke = pathGroup.addProperty("ADBE Vector Graphic - Stroke");
    stroke.property("ADBE Vector Stroke Width").setValue(width || 1);
    stroke.property("ADBE Vector Stroke Color").setValue(color || [0, 0, 0]);
    if (opacity !== undefined) {
        stroke.property("ADBE Vector Stroke Opacity").setValue(opacity);
    }
    if (name) stroke.name = name;
    return stroke;
}

function addTrimPaths(pathGroup, start, end, offset) {
    var trim = pathGroup.addProperty("ADBE Vector Filter - Trim");
    if (start !== undefined) trim.property("ADBE Vector Trim Start").setValue(start);
    if (end !== undefined) trim.property("ADBE Vector Trim End").setValue(end);
    if (offset !== undefined) trim.property("ADBE Vector Trim Offset").setValue(offset);
    return trim;
}
```

## Coordinate System Warning

### ⚠️ Critical: Layer vs Composition Space

**Shape vertices are ALWAYS in layer space, not composition space!**

```jsx
// WRONG: This creates a shape at comp coordinates
var comp = app.project.activeItem;
var shape = createShape([100, 100], true); // This is layer space

// RIGHT: Convert comp coordinates to layer space
function compToLayerSpace(compPoint, layer) {
    var layerPos = layer.position.value;
    var layerAnchor = layer.anchorPoint.value;
    var layerScale = layer.scale.value;
    
    // Convert to percentage scale
    var scaleX = layerScale[0] / 100;
    var scaleY = layerScale[1] / 100;
    
    // Apply inverse transform
    var localX = (compPoint[0] - layerPos[0]) / scaleX + layerAnchor[0];
    var localY = (compPoint[1] - layerPos[1]) / scaleY + layerAnchor[1];
    
    return [localX, localY];
}

// Usage
var compPoint = [100, 100];  // Comp coordinates
var layerPoint = compToLayerSpace(compPoint, shapeLayer);
var shape = createShape([layerPoint], true);
```

### Transform Stack Considerations

When working with nested groups, each group has its own transform:

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
    
    // Recursively search
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

## Shape ↔ Mask Conversion

### Shape Layer to Mask

```jsx
function shapeLayerToMasks(shapeLayer, targetLayer) {
    var paths = getAllPathsObjects(
        shapeLayer.property("ADBE Root Vectors Group")
    );
    
    var maskParade = targetLayer.property("ADBE Mask Parade");
    
    for (var i = 0; i < paths.length; i++) {
        var pathData = paths[i];
        var mask = maskParade.addProperty("ADBE Mask Atom");
        
        // Apply shape to mask
        mask.property("ADBE Mask Shape").setValue(pathData.path.value);
        
        // Apply transforms if needed
        if (pathData.transforms.length > 0) {
            // Complex transform calculation needed here
            // See untransformVerts helper in analysis
        }
    }
}
```

### Mask to Shape Layer

```jsx
function maskToShapeLayer(maskLayer, targetShapeLayer) {
    var maskParade = maskLayer.property("ADBE Mask Parade");
    var contents = targetShapeLayer.property("ADBE Root Vectors Group");
    
    for (var i = 1; i <= maskParade.numProperties; i++) {
        var mask = maskParade.property(i);
        if (mask.matchName === "ADBE Mask Atom") {
            var maskShape = mask.property("ADBE Mask Shape").value;
            
            var group = contents.addProperty("ADBE Vector Group");
            var vectors = group.property("ADBE Vectors Group");
            var pathGroup = vectors.addProperty("ADBE Vector Shape - Group");
            var path = pathGroup.property("ADBE Vector Shape");
            
            path.setValue(maskShape);
        }
    }
}
```

## Common Shape Layer Gotchas

### Tangent Management

```jsx
// WRONG: Forgetting tangents on curves
var shape = new Shape();
shape.vertices = [[0,0], [100,0], [100,100], [0,100]];
// No tangents = straight lines

// RIGHT: Setting tangents for curves
shape.inTangents = [[0,0], [0,0], [0,-50], [0,-50]];
shape.outTangents = [[0,50], [0,50], [0,0], [0,0]];
```

### Property Access Timing

```jsx
// WRONG: Accessing properties immediately after creation
var pathGroup = vectors.addProperty("ADBE Vector Shape - Group");
var path = pathGroup.property("ADBE Vector Shape"); // Might be null

// RIGHT: Wait a frame or use try-catch
var pathGroup = vectors.addProperty("ADBE Vector Shape - Group");
var path;
try {
    path = pathGroup.property("ADBE Vector Shape");
} catch(e) {
    // Handle error
}
```

### Expression Safety

```jsx
// WRONG: Complex expressions in setValue
path.property("ADBE Vector Trim End").expression = 
    "time * 10;"; // Too simple, might break

// RIGHT: Robust expressions
path.property("ADBE Vector Trim End").expression = 
    "var t = time * thisComp.frameRate * 0.1;\n" +
    "Math.min(100, Math.max(0, t));";
```
