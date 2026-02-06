# Architecture Avancée des Shape Layers (Origami v1.4.0 / SOURCE_A)

Ce chapitre documente **la façon dont Origami navigue et construit des Shape Layers** via l’API After Effects (ExtendScript), en se concentrant sur :

- **La hiérarchie `ADBE Root Vectors Group`** (Vectors/Contents imbriqués)
- **La création et l’injection d’objets `Shape()`** dans `ADBE Vector Shape`
- **L’ajout dynamique de “Trim Paths”, Fill et Stroke** via `addProperty(matchName)`
- **La conversion Shape → Masks** (`origami.shapesToMasks`) et les implications de coordonnées

> Hypothèse clé (conforme au code) : Origami génère majoritairement des **polygones (segments droits)**. Il **ne renseigne pas** explicitement `inTangents/outTangents` dans `drawShape`, donc les tangentes sont implicitement nulles.

---

## 1) Hiérarchie “Vectors Group” et navigation dans `ADBE Root Vectors Group`

### 1.1 Le “vrai” arbre de propriétés côté API

Origami manipule les Shape Layers au niveau des `PropertyGroup` en s’appuyant sur les *matchNames* (plus robustes que les labels UI localisés).

**Arbre typique construit par `origami.drawShape` (~l.6655) :**

```text
ShapeLayer
└─ ("ADBE Root Vectors Group")                  // Contents (racine)
   └─ addProperty("ADBE Vector Group")          // Group
      └─ addProperty("ADBE Vectors Group")      // Contents (du groupe)
         ├─ addProperty("ADBE Vector Shape - Group")   // Path group
         │  └─ property("ADBE Vector Shape")           // Path (Shape)
         ├─ addProperty("ADBE Vector Filter - Trim")   // Trim Paths
         │  └─ property("ADBE Vector Trim End")        // End (anim / expression)
         ├─ addProperty("ADBE Vector Graphic - Fill")  // Fill
         │  └─ property("ADBE Vector Fill Color")      // Color
         └─ addProperty("ADBE Vector Graphic - Stroke")// Stroke
            ├─ property("ADBE Vector Stroke Width")    // Width
            └─ property("ADBE Vector Stroke Color")    // Color
```

MatchNames confirmés dans `Origami.jsx` :

- **Root / Grouping**
  - `ADBE Root Vectors Group`
  - `ADBE Vector Group`
  - `ADBE Vectors Group`
- **Path**
  - `ADBE Vector Shape - Group`
  - `ADBE Vector Shape`
- **Styling**
  - `ADBE Vector Graphic - Fill`
  - `ADBE Vector Fill Color`
  - `ADBE Vector Graphic - Stroke`
  - `ADBE Vector Stroke Width`
  - `ADBE Vector Stroke Color`
- **Trim**
  - `ADBE Vector Filter - Trim`
  - `ADBE Vector Trim End`
- **Transforms**
  - `ADBE Vector Transform Group`
  - `ADBE Vector Position`
  - `ADBE Vector Anchor`
  - `ADBE Vector Scale`
  - `ADBE Vector Rotation`

Origami maintient aussi une table interne `origami.matchNames.shape...` qui centralise ces matchNames (utile comme “source of truth” interne).

### 1.2 Navigation “profonde” : récupérer tous les Paths, même imbriqués

Dans `origami.getSliceVertices` (~l.6092), Origami définit un helper local `getAllPathsObjects(_group, _transformsArr)` :

- Il parcourt récursivement tous les `PropertyGroup`
- Il collecte les propriétés dont `curProp.matchName == "ADBE Vector Shape"`
- Il **accumule** au passage les groupes de transform `ADBE Vector Transform Group` dans un tableau `transformsArr`

La structure retournée est :

```js
{ prop: /* Property ADBE Vector Shape */, transformsArr: [/* ...transform groups... */] }
```

Ce pattern est central : un Path de Shape Layer est rarement “dans le vide”, il est **dans l’espace local d’un groupe**, donc comprendre la pile de transforms est indispensable pour convertir correctement les coordonnées.

---

## 2) Création de Formes (Shape Objects) : `origami.drawShape`

### 2.1 Définition du `Shape()` (vertices / tangents / closed)

Dans `origami.drawShape` (~l.6655), Origami construit un objet `Shape` minimal :

- `triangle = new Shape()`
- `triangle.vertices = vertices`
- `triangle.closed = true`
- **Tangentes** : non définies (`inTangents/outTangents` absents)

Implications :

- L’absence de `inTangents/outTangents` est cohérente avec une géométrie “mesh fragments” (polygones).
- Si tu veux produire des courbes, tu dois fournir :
  - `shape.inTangents = [[x,y], ...]` (même longueur que `vertices`)
  - `shape.outTangents = [[x,y], ...]`

Origami fait aussi un nettoyage simple : si le dernier point est égal au premier, il enlève le doublon pour éviter une redondance dans la boucle.

### 2.2 Injection dans un Shape Layer (`ADBE Vector Shape`)

Le “point d’injection” API est :

- Création du groupe Path :
  - `t1 = p.addProperty("ADBE Vector Shape - Group")`
- Puis :
  - `t1.property("ADBE Vector Shape").setValue(triangle)`

Ce `setValue()` est l’opération déterminante : elle pousse l’objet `Shape` (ExtendScript) dans la propriété Path du Shape Layer.

---

## 3) Trimming & Styling : ajout dynamique de Trim/Fill/Stroke

### 3.1 Trim Paths (matchName + expression)

Toujours dans `drawShape` :

- `trim = p.addProperty("ADBE Vector Filter - Trim")`
- `trim.property("ADBE Vector Trim End").expression = origami.expressions.trimPath`

Points clés :

- Le trim est attaché au **contenu du groupe** `p` (`ADBE Vectors Group`)
- Origami pilote au moins **`ADBE Vector Trim End`** par expression (donc animation “procedurale”)

### 3.2 Fill et Stroke : “constructeurs” dédiés

Origami factorise en helpers :

- `origami.setStroke(group, thick, color)`
  - `group.addProperty("ADBE Vector Graphic - Stroke")`
  - setValue sur :
    - `ADBE Vector Stroke Width`
    - `ADBE Vector Stroke Color`
- `origami.setFill(group, color, _name, hide)`
  - `group.addProperty("ADBE Vector Graphic - Fill")`
  - setValue sur :
    - `ADBE Vector Fill Color`
  - optionnel :
    - renomme le fill (`colGroup.name = name`)
    - peut le cacher (`colGroup.enabled = false`) pour stocker une “Original Color” sans l’afficher

On voit explicitement un pattern “multi-fills” nommé :

- `origami.names.currentColor` → `"Origami Fill"`
- `origami.names.originalColor` → `"Original Color"`
- `origami.names.strokeColor` (utilisé comme nom de stroke)

Cela sert ensuite au recoloring : le script retrouve ces fills/strokes par leur `name` dans `Contents` (ex: `.property("Contents").property(origami.names.currentColor)...`).

---

## 4) Conversion Masque <-> Shape : focus `origami.shapesToMasks`

### 4.1 Objectif fonctionnel

`origami.shapesToMasks` (~l.10776) :

- Prend un `ShapeLayer`
- Extrait tous ses paths
- Crée un nouveau Solid
- Recrée chaque path en **masque** sur ce solid (`ADBE Mask Atom` / `ADBE Mask Shape`)

### 4.2 Extraction des paths et lecture des vertices

Le code s’appuie sur :

- `layer.property("ADBE Root Vectors Group").getAllPathsObjects()`

Même si la définition de `getAllPathsObjects()` “en prototype” n’apparaît pas clairement dans ce fichier décompilé, le comportement attendu est identique au helper local vu dans `getSliceVertices` :

- Retourne une liste d’objets `{ prop, transformsArr }`
- Où `prop.value.vertices` donne les points du Path (`ADBE Vector Shape`)

### 4.3 Conversion de coordonnées : du local “vector group” vers l’espace layer

Le code calcule ensuite un offset à partir de la **première transform** :

```js
t.transformsArr[0].property("ADBE Vector Position").value
- t.transformsArr[0].property("ADBE Vector Anchor").value
```

Puis il translate tous les vertices :

- `polygons[p].vertices = polygons[p].vertices.addToAll(transforms[p])`

Interprétation :

- Un `ADBE Vector Shape` vit dans un espace local.
- Origami applique une **translation** `Position - Anchor` (et seulement sur `transformsArr[0]`).
- Cela peut suffire si les groupes sont simples, mais c’est une approximation si :
  - il y a plusieurs niveaux de `ADBE Vector Transform Group`
  - il y a scale/rotation non nulles (non appliquées ici)

À noter : Origami possède un helper plus complet `origami.untransformVerts(vertices, transformsArr)` (~l.5893) qui applique anchor/scale/rotation/position sur une pile de transforms. C’est ce genre de routine qu’on attend pour une conversion robuste entre espaces.

### 4.4 Création des masques sur un nouveau solid

Le solid est créé et “neutralisé” (position/anchor à `[0,0]`) :

- `comp.layers.addSolid([...], "maskSolid", ...)`
- `maskSolid.property("ADBE Transform Group").property("ADBE Position").setValue([0,0])`
- `maskSolid.property("ADBE Transform Group").property("ADBE Anchor Point").setValue([0,0])`

Puis chaque polygone devient un masque via `drawMask` (même logique que `origami.drawMask` ~l.6699) :

- `mask = masterLayer.property("ADBE Mask Parade")`
- `g = mask.addProperty("ADBE Mask Atom")`
- `g.property("ADBE Mask Shape").setValue(triangle)`
- `g.property("ADBE Mask Offset").setValue(offset)`

MatchNames importants côté masks :

- `ADBE Mask Parade`
- `ADBE Mask Atom`
- `ADBE Mask Shape`
- `ADBE Mask Offset`

---

## 5) Patterns réutilisables (best practices)

### 5.1 Helper universel “get all paths”

```js
function getAllPathsObjects(_group, _transformsArr) {
  var transformName = "ADBE Vector Transform Group";
  var pathName = "ADBE Vector Shape";
  var arr = [];
  if (!_transformsArr) _transformsArr = [];
  var localTrArr = _group.property(transformName) !== null
    ? _transformsArr.concat([_group.property(transformName)])
    : _transformsArr;
  for (var i = 1; i <= _group.numProperties; i++) {
    var curProp = _group.property(i);
    if (curProp instanceof PropertyGroup) {
      arr = arr.concat(getAllPathsObjects(curProp, localTrArr));
    } else if (curProp.matchName === pathName) {
      arr.push({ prop: curProp, transformsArr: localTrArr });
    }
  }
  return arr;
}
```

### 5.2 Créer un Shape + Path propre

```js
function createShapePath(vertices, closed) {
  var shape = new Shape();
  shape.vertices = vertices;
  shape.closed = closed || true;
  // Optionnel : tangentes
  // shape.inTangents = vertices.map(() => [0,0]);
  // shape.outTangents = vertices.map(() => [0,0]);
  return shape;
}
```

### 5.3 Insérer un Path dans un Shape Layer

```js
function addPathToShapeLayer(shapeLayer, shapeObj) {
  var contents = shapeLayer.property("ADBE Root Vectors Group");
  var group = contents.addProperty("ADBE Vector Group");
  var vectors = group.addProperty("ADBE Vectors Group");
  var pathGroup = vectors.addProperty("ADBE Vector Shape - Group");
  pathGroup.property("ADBE Vector Shape").setValue(shapeObj);
  return pathGroup; // pour ajouter Fill/Stroke/Trim ensuite
}
```

### 5.4 Ajouter Fill/Stroke/Trim

```js
function addFill(pathGroup, color, name) {
  var fill = pathGroup.addProperty("ADBE Vector Graphic - Fill");
  fill.property("ADBE Vector Fill Color").setValue(color);
  if (name) fill.name = name;
  return fill;
}
function addStroke(pathGroup, width, color, name) {
  var stroke = pathGroup.addProperty("ADBE Vector Graphic - Stroke");
  stroke.property("ADBE Vector Stroke Width").setValue(width);
  stroke.property("ADBE Vector Stroke Color").setValue(color);
  if (name) stroke.name = name;
  return stroke;
}
function addTrim(pathGroup) {
  var trim = pathGroup.addProperty("ADBE Vector Filter - Trim");
  // trim.property("ADBE Vector Trim End").expression = "...";
  return trim;
}
```

### 5.5 Conversion Shape → Mask robuste

```js
function shapeLayerToMasks(shapeLayer, targetLayer) {
  var paths = shapeLayer.property("ADBE Root Vectors Group").getAllPathsObjects();
  var maskParade = targetLayer.property("ADBE Mask Parade");
  paths.forEach(function(p) {
    var mask = maskParade.addProperty("ADBE Mask Atom");
    mask.property("ADBE Mask Shape").setValue(p.prop.value);
    // Appliquer les transforms si nécessaire (voir untransformVerts)
  });
}
```

---

## 6) Références croisées (SOURCE_A ↔ docs officielles)

| MatchName (Origami) | UI label (docs) | Fichier/line (Origami.jsx) |
|---|---|---|
| `ADBE Root Vectors Group` | Contents | 6674, 6122, 6160, 10789 |
| `ADBE Vector Shape - Group` | Path Group | 6678 |
| `ADBE Vector Shape` | Path | 6679, 6110 |
| `ADBE Vector Graphic - Fill` | Fill | 6727, 6280 |
| `ADBE Vector Graphic - Stroke` | Stroke | 6720 |
| `ADBE Vector Filter - Trim` | Trim Paths | 6680 |
| `ADBE Mask Parade` | Masks | 6712, 6136 |
| `ADBE Mask Atom` | Mask | 6713 |
| `ADBE Mask Shape` | Mask Shape | 6714, 6138 |

---

## 7) Limites observées dans Origami

- **Tangentes non gérées** : `inTangents/outTangents` absents → pas de courbes lisses.
- **Conversion Shape→Mask simplifiée** : applique seulement un offset `Position - Anchor` sur la première transform (pas scale/rotation).
- **Dépendance à des helpers non standards** (`getAllPathsObjects`, `getFirstPath`) – probablement ajoutés par un polyfill ou une lib externe.
- **Pas de gestion des “holes”** (polygones intérieurs) dans `shapesToMasks`.

---

## 8) Conclusion

Origami illustre **la manière pragmatique de construire des Shape Layers par l’API** :

- Toujours commencer par `ADBE Root Vectors Group`
- Créer la hiérarchie `Vector Group → Vectors Group → Vector Shape - Group → Vector Shape`
- Utiliser `addProperty(matchName)` pour ajouter Fill/Stroke/Trim
- Nommer les fills/strokes pour les retrouver plus tard
- Pour les conversions Shape ↔ Mask, bien comprendre la pile de `ADBE Vector Transform Group` et appliquer les transformations de coordonnées (voir `untransformVerts`).

Ces patterns sont réutilisables dans n’importe quel script ExtendScript qui doit générer ou manipuler des Shape Layers de façon programmatique.

---

*Document généré à partir de l’analyse du code source décompilé Origami.jsx (v1.4.0) – SOURCE_A*
