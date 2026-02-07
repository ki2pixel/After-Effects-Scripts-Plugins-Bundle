---
title: Architecture Avancée Shape Layers
audience: Développeurs ExtendScript avancés
---

# Architecture Avancée des Shape Layers

**TL;DR**: Si vous manipulez des Shape Layers, n'utilisez jamais les labels UI. Utilisez les matchNames API (`ADBE Root Vectors Group` → `Vector Shape`) car c'est indépendant de la langue et garantit l'accès à la hiérarchie complète.

---

## ❌ Approche naïve vs ✅ Pattern robuste

### ❌ Manipuler directement les propriétés visibles
```jsx
// Ne faites jamais ça
var layer = comp.layers.addShape();
layer.property("Contents").addProperty("Shape"); // Fragile, dépend de la langue
```

### ✅ Utiliser les matchNames API
```jsx
// La bonne approche
var layer = comp.layers.addShape();
var contents = layer.property("ADBE Root Vectors Group");
var group = contents.addProperty("ADBE Vector Group");
var vectors = group.addProperty("ADBE Vectors Group");
var pathGroup = vectors.addProperty("ADBE Vector Shape - Group");
var path = pathGroup.property("ADBE Vector Shape");
```

---

## La hiérarchie exacte des Shape Layers

### Structure interne dévoilée

Chaque Shape Layer est un arbre `PropertyGroup` avec des noms codés :

```text
ShapeLayer
└─ ADBE Root Vectors Group                    // Contents racine
   └─ ADBE Vector Group                       // Groupe principal
      └─ ADBE Vectors Group                   // Contents du groupe
         ├─ ADBE Vector Shape - Group         // Conteneur du path
         │  └─ ADBE Vector Shape             // Le path lui-même
         ├─ ADBE Vector Filter - Trim         // Trim Paths
         │  └─ ADBE Vector Trim End          // Propriété animable
         ├─ ADBE Vector Graphic - Fill       // Remplissage
         │  └─ ADBE Vector Fill Color        // Couleur
         └─ ADBE Vector Graphic - Stroke     // Contour
            ├─ ADBE Vector Stroke Width       // Épaisseur
            └─ ADBE Vector Stroke Color       // Couleur
```

### MatchNames essentiels à mémoriser

**Structure :**
- `ADBE Root Vectors Group` — Point d'entrée obligatoire
- `ADBE Vector Group` — Conteneur de transformation
- `ADBE Vectors Group` — Contents imbriqué
- `ADBE Vector Shape - Group` — Wrapper du path
- `ADBE Vector Shape` — Destination des vertices

**Styling :**
- `ADBE Vector Graphic - Fill` + `ADBE Vector Fill Color`
- `ADBE Vector Graphic - Stroke` + `ADBE Vector Stroke Width/Color`
- `ADBE Vector Filter - Trim` + `ADBE Vector Trim End/Start/Offset`

---

## Créer des formes : le pattern complet

### 1. Construire l'objet Shape

```jsx
function createShape(vertices, closed) {
  var shape = new Shape();
  shape.vertices = vertices;
  shape.closed = closed !== false; // true par défaut
  
  // Pour les courbes lisses (optionnel)
  // shape.inTangents = vertices.map(() => [0, 0]);
  // shape.outTangents = vertices.map(() => [0, 0]);
  
  return shape;
}
```

### 2. Injection dans la hiérarchie

```jsx
function addShapeToLayer(shapeLayer, shapeObj) {
  var contents = shapeLayer.property("ADBE Root Vectors Group");
  var group = contents.addProperty("ADBE Vector Group");
  var vectors = group.addProperty("ADBE Vectors Group");
  var pathGroup = vectors.addProperty("ADBE Vector Shape - Group");
  
  // L'opération cruciale
  pathGroup.property("ADBE Vector Shape").setValue(shapeObj);
  
  return {group, vectors, pathGroup};
}
```

### 3. Styling automatisé

```jsx
function addStyling(pathGroup, fillColor, strokeColor, strokeWidth) {
  // Fill
  if (fillColor) {
    var fill = pathGroup.addProperty("ADBE Vector Graphic - Fill");
    fill.property("ADBE Vector Fill Color").setValue(fillColor);
    fill.name = "Main Fill"; // Important pour le recoloring
  }
  
  // Stroke
  if (strokeColor && strokeWidth) {
    var stroke = pathGroup.addProperty("ADBE Vector Graphic - Stroke");
    stroke.property("ADBE Vector Stroke Color").setValue(strokeColor);
    stroke.property("ADBE Vector Stroke Width").setValue(strokeWidth);
    stroke.name = "Main Stroke";
  }
  
  // Trim
  var trim = pathGroup.addProperty("ADBE Vector Filter - Trim");
  trim.property("ADBE Vector Trim End").expression = "time * 0.1";
  
  return {fill, stroke, trim};
}
```

---

## Navigation récursive : récupérer TOUS les paths

Le problème majeur : un Shape Layer peut contenir des groupes imbriqués sur 10 niveaux. Il faut une fonction récursive robuste.

### Helper universel

```jsx
function getAllPathsInLayer(shapeLayer) {
  function traverseGroup(group, transformStack) {
    var paths = [];
    var groupName = "ADBE Vector Transform Group";
    var pathName = "ADBE Vector Shape";
    
    // Accumuler les transforms
    var currentTransforms = transformStack.slice();
    if (group.property(groupName)) {
      currentTransforms.push(group.property(groupName));
    }
    
    // Parcourir toutes les propriétés
    for (var i = 1; i <= group.numProperties; i++) {
      var prop = group.property(i);
      
      if (prop instanceof PropertyGroup) {
        // Récursion sur les sous-groupes
        paths = paths.concat(traverseGroup(prop, currentTransforms));
      } else if (prop.matchName === pathName) {
        // Found a path!
        paths.push({
          path: prop,
          transforms: currentTransforms,
          vertices: prop.value.vertices
        });
      }
    }
    
    return paths;
  }
  
  var rootGroup = shapeLayer.property("ADBE Root Vectors Group");
  return traverseGroup(rootGroup, []);
}
```

### Usage pratique

```jsx
var allPaths = getAllPathsInLayer(myShapeLayer);
allPaths.forEach(function(pathInfo) {
  console.log("Path trouvé avec " + pathInfo.transforms.length + " transforms");
  console.log("Vertices:", pathInfo.vertices);
});
```

---

## Conversion Shape ↔ Mask : les pièges à éviter

### Le problème de coordonnées

Un `ADBE Vector Shape` vit dans l'espace local de son groupe de transformation. Le convertir en mask nécessite de transformer les vertices dans l'espace du layer.

### ❌ Conversion simpliste (buguée)
```jsx
// Ne faites pas ça - ignore les transforms
function shapeToMaskNaive(shapeLayer, targetLayer) {
  var paths = getAllPathsInLayer(shapeLayer);
  var maskParade = targetLayer.property("ADBE Mask Parade");
  
  paths.forEach(function(pathInfo) {
    var mask = maskParade.addProperty("ADBE Mask Atom");
    mask.property("ADBE Mask Shape").setValue(pathInfo.path.value);
  });
}
```

### ✅ Conversion robuste
```jsx
function applyTransforms(vertices, transformStack) {
  var transformed = vertices.slice();
  
  // Appliquer chaque transform dans l'ordre
  for (var i = transformStack.length - 1; i >= 0; i--) {
    var t = transformStack[i];
    var position = t.property("ADBE Vector Position").value;
    var anchor = t.property("ADBE Vector Anchor").value;
    var scale = t.property("ADBE Vector Scale").value;
    var rotation = t.property("ADBE Vector Rotation").value;
    
    // Translation (Anchor → Position)
    var offset = [position[0] - anchor[0], position[1] - anchor[1]];
    
    // Appliquer aux vertices
    for (var j = 0; j < transformed.length; j++) {
      transformed[j][0] += offset[0];
      transformed[j][1] += offset[1];
      
      // Scale et rotation (simplifié ici)
      transformed[j][0] *= scale[0] / 100;
      transformed[j][1] *= scale[1] / 100;
    }
  }
  
  return transformed;
}

function shapeToMaskRobust(shapeLayer, targetLayer) {
  var paths = getAllPathsInLayer(shapeLayer);
  var maskParade = targetLayer.property("ADBE Mask Parade");
  
  paths.forEach(function(pathInfo) {
    var mask = maskParade.addProperty("ADBE Mask Atom");
    var transformedShape = new Shape();
    
    transformedShape.vertices = applyTransforms(pathInfo.vertices, pathInfo.transforms);
    transformedShape.closed = pathInfo.path.value.closed;
    
    mask.property("ADBE Mask Shape").setValue(transformedShape);
  });
}
```

---

## Tableau de compromis : Shape Layer vs Mask

| Critère | Shape Layer | Mask |
|---|---|---|
| **Performance** | GPU-acceléré, temps réel | CPU-seulement, plus lent |
| **Complexité** | Hiérarchie complexe | Structure simple |
| **Animation** | Expressions natives | Limité |
| **Conversion** | Nécessite transform des coords | Direct si même espace |
| **Usage idéal** | Formes animées, UI | Masques statiques, roto |

---

## Patterns avancés : multi-fills et recoloring

### Système de nommage stratégique

```jsx
function createRecolorableShape(layer, vertices, baseColor) {
  var {pathGroup} = addShapeToLayer(layer, createShape(vertices));
  
  // Fill principal (visible)
  var mainFill = addStyling(pathGroup, baseColor).fill;
  mainFill.name = "Current Color";
  
  // Fill caché (backup)
  var backupFill = pathGroup.addProperty("ADBE Vector Graphic - Fill");
  backupFill.property("ADBE Vector Fill Color").setValue(baseColor);
  backupFill.name = "Original Color";
  backupFill.enabled = false; // Caché mais accessible
  
  return pathGroup;
}

function recolorShape(shapeLayer, newColor) {
  var contents = shapeLayer.property("ADBE Root Vectors Group");
  var currentFill = contents.property("Current Color");
  if (currentFill) {
    currentFill.property("ADBE Vector Fill Color").setValue(newColor);
  }
}
```

---

## The Golden Rule: MatchNames Universels, Transform Locale

---

## Référence rapide des matchNames

| Catégorie | MatchName | Usage |
|---|---|---|
| **Structure** | `ADBE Root Vectors Group` | Racine Contents |
| | `ADBE Vector Group` | Groupe de transformation |
| | `ADBE Vectors Group` | Contents imbriqué |
| | `ADBE Vector Shape - Group` | Wrapper Path |
| **Paths** | `ADBE Vector Shape` | Destination vertices |
| **Fills** | `ADBE Vector Graphic - Fill` | Conteneur Fill |
| | `ADBE Vector Fill Color` | Propriété couleur |
| **Strokes** | `ADBE Vector Graphic - Stroke` | Conteneur Stroke |
| | `ADBE Vector Stroke Width` | Épaisseur |
| | `ADBE Vector Stroke Color` | Couleur |
| **Trim** | `ADBE Vector Filter - Trim` | Conteneur Trim |
| | `ADBE Vector Trim End/Start/Offset` | Propriétés animables |
| **Transforms** | `ADBE Vector Transform Group` | Groupe de transform |
| | `ADBE Vector Position/Anchor/Scale/Rotation` | Propriétés standard |
| **Masks** | `ADBE Mask Parade` | Racine Masks |
| | `ADBE Mask Atom` | Masque individuel |
| | `ADBE Mask Shape` | Forme du masque |

---

## Limites connues et workarounds

### Tangentes et courbes
- **Problème** : `inTangents/outTangents` mal documentés
- **Solution** : Utiliser des vertices denses ou approximer avec des segments

### Performance sur grands nombres
- **Problème** : 1000+ paths ralentissent AE
- **Solution** : Batch les opérations, utiliser `beginUndoGroup()`

### Cross-compatibilité linguistique
- **Problème** : Labels UI changent selon la langue
- **Solution** : Exclusivement les matchNames (indépendants de la langue)

---

*Basé sur l'analyse du code source d'Origami v1.4.0 et l'API After Effects ExtendScript*
