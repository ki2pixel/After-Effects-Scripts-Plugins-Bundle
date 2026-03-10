/**
 * Shape Layer Template
 * Helpers and patterns for programmatic shape layer creation
 */

(function() {
    
    app.beginUndoGroup("Shape Layer Operations");
    
    try {
        var comp = app.project.activeItem;
        if (!comp || !(comp instanceof CompItem)) {
            alert("Please select a composition first.");
            return;
        }
        
        // Main shape layer creation
        var shapeLayer = createShapeLayer(comp, "Generated Shape");
        
        // Example: Create multiple shapes
        var rectPath = addRectangle(shapeLayer, 200, 100, [0, 0], "Rectangle");
        var circlePath = addCircle(shapeLayer, 50, [150, 0], "Circle");
        
        // Add styling
        addFill(rectPath, [1, 0, 0, 1], 100, "Rect Fill");
        addStroke(circlePath, 3, [0, 0, 1, 1], 100, "Circle Stroke");
        
        // Add trim animation
        var trim = addTrimPaths(rectPath, 0, 100, 0);
        trim.property("ADBE Vector Trim End").expression = "time * 10;";
        
        alert("Shape layer created successfully!");
        
    } catch(e) {
        alert("Error: " + e.toString());
    } finally {
        app.endUndoGroup();
    }
    
    /**
     * Create a new shape layer
     */
    function createShapeLayer(comp, name) {
        var shapeLayer = comp.layers.addShape();
        shapeLayer.name = name || "Shape Layer";
        shapeLayer.position.setValue([comp.width/2, comp.height/2]);
        return shapeLayer;
    }
    
    /**
     * Create a shape object from vertices
     */
    function createShape(vertices, closed) {
        var shape = new Shape();
        shape.vertices = vertices || [];
        shape.closed = closed !== undefined ? closed : true;
        
        // Initialize tangents (straight lines)
        shape.inTangents = vertices ? vertices.map(function() { return [0, 0]; }) : [];
        shape.outTangents = vertices ? vertices.map(function() { return [0, 0]; }) : [];
        
        return shape;
    }
    
    /**
     * Add a path group to shape layer
     */
    function addPathGroup(shapeLayer, groupName) {
        var contents = shapeLayer.property("ADBE Root Vectors Group");
        var group = contents.addProperty("ADBE Vector Group");
        group.name = groupName || "Path Group";
        
        var vectors = group.property("ADBE Vectors Group");
        var pathGroup = vectors.addProperty("ADBE Vector Shape - Group");
        var path = pathGroup.property("ADBE Vector Shape");
        
        return {
            group: group,
            vectors: vectors,
            pathGroup: pathGroup,
            path: path
        };
    }
    
    /**
     * Add rectangle to shape layer
     */
    function addRectangle(shapeLayer, width, height, position, groupName) {
        var pathData = addPathGroup(shapeLayer, groupName || "Rectangle");
        
        // Create rectangle vertices
        var halfW = width / 2;
        var halfH = height / 2;
        var vertices = [
            [-halfW + (position[0] || 0), -halfH + (position[1] || 0)],
            [halfW + (position[0] || 0), -halfH + (position[1] || 0)],
            [halfW + (position[0] || 0), halfH + (position[1] || 0)],
            [-halfW + (position[0] || 0), halfH + (position[1] || 0)]
        ];
        
        var rectShape = createShape(vertices, true);
        pathData.path.setValue(rectShape);
        
        return pathData;
    }
    
    /**
     * Add circle to shape layer
     */
    function addCircle(shapeLayer, radius, position, groupName) {
        var pathData = addPathGroup(shapeLayer, groupName || "Circle");
        
        // Create circle vertices
        var segments = 32;
        var vertices = [];
        var angleStep = (2 * Math.PI) / segments;
        
        for (var i = 0; i < segments; i++) {
            var angle = i * angleStep;
            vertices.push([
                Math.cos(angle) * radius + (position[0] || 0),
                Math.sin(angle) * radius + (position[1] || 0)
            ]);
        }
        
        var circleShape = createShape(vertices, true);
        pathData.path.setValue(circleShape);
        
        return pathData;
    }
    
    /**
     * Add custom shape from vertices
     */
    function addCustomShape(shapeLayer, vertices, closed, groupName) {
        var pathData = addPathGroup(shapeLayer, groupName || "Custom Shape");
        
        var customShape = createShape(vertices, closed);
        pathData.path.setValue(customShape);
        
        return pathData;
    }
    
    /**
     * Add fill to path group
     */
    function addFill(pathData, color, opacity, name) {
        var fill = pathData.pathGroup.addProperty("ADBE Vector Graphic - Fill");
        
        if (color) {
            fill.property("ADBE Vector Fill Color").setValue(color);
        }
        
        if (opacity !== undefined) {
            fill.property("ADBE Vector Fill Opacity").setValue(opacity);
        }
        
        if (name) {
            fill.name = name;
        }
        
        return fill;
    }
    
    /**
     * Add stroke to path group
     */
    function addStroke(pathData, width, color, opacity, name) {
        var stroke = pathData.pathGroup.addProperty("ADBE Vector Graphic - Stroke");
        
        if (width !== undefined) {
            stroke.property("ADBE Vector Stroke Width").setValue(width);
        }
        
        if (color) {
            stroke.property("ADBE Vector Stroke Color").setValue(color);
        }
        
        if (opacity !== undefined) {
            stroke.property("ADBE Vector Stroke Opacity").setValue(opacity);
        }
        
        if (name) {
            stroke.name = name;
        }
        
        return stroke;
    }
    
    /**
     * Add trim paths to path group
     */
    function addTrimPaths(pathData, start, end, offset) {
        var trim = pathData.pathGroup.addProperty("ADBE Vector Filter - Trim");
        
        if (start !== undefined) {
            trim.property("ADBE Vector Trim Start").setValue(start);
        }
        
        if (end !== undefined) {
            trim.property("ADBE Vector Trim End").setValue(end);
        }
        
        if (offset !== undefined) {
            trim.property("ADBE Vector Trim Offset").setValue(offset);
        }
        
        return trim;
    }
    
    /**
     * Add gradient fill
     */
    function addGradientFill(pathData, colors, rampType, name) {
        var gradientFill = pathData.pathGroup.addProperty("ADBE Vector Graphic - G-Fill");
        
        if (colors && colors.length >= 2) {
            var colorsProp = gradientFill.property("ADBE Vector Grad Colors");
            var rampProp = gradientFill.property("ADBE Vector Grad Ramp");
            
            // Set colors (simplified - real implementation needs more setup)
            colorsProp.setValue(colors);
            
            if (rampType) {
                rampProp.setValue(rampType);
            }
        }
        
        if (name) {
            gradientFill.name = name;
        }
        
        return gradientFill;
    }
    
    /**
     * Transform path group
     */
    function transformPathGroup(pathData, position, scale, rotation, anchorPoint) {
        var transform = pathData.pathGroup.property("ADBE Vector Transform Group");
        
        if (position) {
            transform.property("ADBE Vector Position").setValue(position);
        }
        
        if (scale) {
            transform.property("ADBE Vector Scale").setValue(scale);
        }
        
        if (rotation !== undefined) {
            transform.property("ADBE Vector Rotation").setValue(rotation);
        }
        
        if (anchorPoint) {
            transform.property("ADBE Vector Anchor Point").setValue(anchorPoint);
        }
        
        return transform;
    }
    
    /**
     * Get all paths from shape layer (recursive)
     */
    function getAllPaths(shapeLayer) {
        var paths = [];
        
        function collectPaths(group, transformStack) {
            if (!transformStack) transformStack = [];
            
            // Add current transform to stack
            var currentTransform = group.property("ADBE Vector Transform Group");
            var newStack = currentTransform ? 
                transformStack.concat([currentTransform]) : 
                transformStack;
            
            for (var i = 1; i <= group.numProperties; i++) {
                var prop = group.property(i);
                
                if (prop instanceof PropertyGroup) {
                    collectPaths(prop, newStack);
                } else if (prop.matchName === "ADBE Vector Shape") {
                    paths.push({
                        path: prop,
                        transforms: newStack
                    });
                }
            }
        }
        
        var contents = shapeLayer.property("ADBE Root Vectors Group");
        collectPaths(contents);
        
        return paths;
    }
    
    /**
     * Convert shape layer to masks on solid layer
     */
    function shapeLayerToMasks(shapeLayer, targetLayer) {
        var paths = getAllPaths(shapeLayer);
        var maskParade = targetLayer.property("ADBE Mask Parade");
        
        for (var i = 0; i < paths.length; i++) {
            var pathData = paths[i];
            var mask = maskParade.addProperty("ADBE Mask Atom");
            
            // Copy shape to mask
            mask.property("ADBE Mask Shape").setValue(pathData.path.value);
            
            // Apply transforms (simplified - real implementation needs coordinate conversion)
            if (pathData.transforms.length > 0) {
                var firstTransform = pathData.transforms[0];
                var pos = firstTransform.property("ADBE Vector Position").value;
                var anchor = firstTransform.property("ADBE Vector Anchor Point").value;
                
                mask.property("ADBE Mask Offset").setValue([pos[0] - anchor[0], pos[1] - anchor[1]]);
            }
        }
    }
    
    // Export utility functions for use in other scripts
    global.ShapeLayerUtils = {
        createShapeLayer: createShapeLayer,
        createShape: createShape,
        addRectangle: addRectangle,
        addCircle: addCircle,
        addCustomShape: addCustomShape,
        addFill: addFill,
        addStroke: addStroke,
        addTrimPaths: addTrimPaths,
        addGradientFill: addGradientFill,
        transformPathGroup: transformPathGroup,
        getAllPaths: getAllPaths,
        shapeLayerToMasks: shapeLayerToMasks
    };
    
})();
