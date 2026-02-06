This file is a merged representation of a subset of the codebase, containing specifically included files and files not matching ignore patterns, combined into a single document by Repomix.
The content has been processed where line numbers have been added.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: docs/**/*.md, .windsurf/rules/codingstandards.md, .windsurf/skills/**/*
- Files matching these patterns are excluded: Scripts_AE/**, docs/internal/repomix/**, repomix.md, repomix-after-effects-output.md, .idea/**, **/*.mp4, **/*.mov, **/*.mp3, **/*.wav, **/*.aep, **/*.ffx, **/*.zip, **/*.rar, **/*.7z, **/*.exe, **/*.dmg, **/*.pkg, **/*.pdf, **/*.png, **/*.jpg, **/*.jpeg, **/*.gif, **/*.svg, **/*.ico, **/*.psd, **/*.ai, **/*.reg, **/*.url, Aescripts-Social Importer 1.0.3 for After Effects/Social Importer/panel.js
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Line numbers have been added to the beginning of each line
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.windsurf/
  rules/
    codingstandards.md
  skills/
    ae-scripting-expert/
      assets/
        basic-script-template.jsx
        dockable-ui-template.jsx
        shape-layer-template.jsx
      references/
        hacks-and-internals.md
        ui-layout.md
        vector-shapes.md
      SKILL.md
    pyshiftae/
      SKILL.md
docs/
  internal/
    after_effects/
      architecture_avancee_shape_layers.md
      interfaces_scriptUI_production.md
      matchname_cartography.md
  official/
    _global/
      readme.md
    general/
      application.md
      globals.md
      project.md
      system.md
    introduction/
      changelog.md
      classhierarchy.md
      javascript.md
      objectmodel.md
      overview.md
    item/
      avitem.md
      compitem.md
      folderitem.md
      footageitem.md
      item.md
      itemcollection.md
    layer/
      avlayer.md
      cameralayer.md
      layer.md
      layercollection.md
      lightlayer.md
      shapelayer.md
      textlayer.md
      threedmodellayer.md
    matchnames/
      effects/
        expression-control-parameters.md
        firstparty.md
      layer/
        3dlayer.md
        avlayer.md
        cameralayer.md
        layerstyles.md
        lightlayer.md
        shapelayer.md
        textlayer.md
    other/
      collection.md
      importoptions.md
      keyframeease.md
      markervalue.md
      preferences.md
      settings.md
      shape.md
      view.md
      viewer.md
      viewoptions.md
    property/
      maskpropertygroup.md
      property.md
      propertybase.md
      propertygroup.md
    renderqueue/
      omcollection.md
      outputmodule.md
      renderqueue.md
      renderqueueitem.md
      rqitemcollection.md
    sources/
      filesource.md
      footagesource.md
      placeholdersource.md
      solidsource.md
    text/
      characterrange.md
      composedlinerange.md
      fontobject.md
      fontsobject.md
      paragraphrange.md
      textdocument.md
    index.md
```

# Files

## File: .windsurf/rules/codingstandards.md
````markdown
  1: ---
  2: description: After Effects development standards covering PyShiftAE runtime patterns, ExtendScript/JSX conventions, CEP bridge, shape layers, ScriptUI panels, and production-ready patterns
  3: globs:
  4:   - "PyShiftAE/**/*.py"
  5:   - "PyShiftBridge/**/*.py"
  6:   - "PyShiftBridge/**/*.js"
  7:   - "docs/internal/pyshiftae/**/*.md"
  8:   - "Scripts_AE/**/*.jsx"
  9:   - "docs/internal/after_effects/**/*.md"
 10: alwaysApply: true
 11: ---
 12: 
 13: # After Effects Development - Windsurf Rules
 14: 
 15: ## Tech Stack
 16: 
 17: **Runtimes:** PyShiftAE (AEGP plugin embedding CPython 3.11+) for Python automation, ExtendScript/JSX (ES3) for traditional scripting
 18: 
 19: **Languages:** Python 3.11+ (pure Python preferred), ExtendScript/JSX (ES3 compatible, var only)
 20: 
 21: **Bridges:** CEP (HTML/JS) ↔ PyInterface (named pipes/Unix sockets) or Mailbox JSON fallback, ScriptUI panels (dockable/palette)
 22: 
 23: **SDKs:** After Effects SDK via AETK wrappers (TaskScheduler, Suites) for PyShiftAE, Native AE API for ExtendScript
 24: 
 25: **Testing:** pytest for Python logic, manual edge case testing for AE integration, undo groups for ExtendScript
 26: 
 27: ## Code Style
 28: 
 29: ### PyShiftAE (Python)
 30: - **Threading:** Worker threads for computation, AE main thread for mutations via TaskScheduler
 31: - **Memory:** Short-lived AE handles, lock→use→unlock→free pattern
 32: - **Error Handling:** try/except with contextual messages (comp/layer/prop), never silent failures
 33: - **Dependencies:** Pure Python libraries only, document version strategy
 34: 
 35: ### ExtendScript/JSX
 36: - **ES3 Compatibility:** Use `var` only, no `const`/`let`, no arrow functions, no template literals
 37: - **Namespace:** Wrap in IIFE to avoid global pollution, unique function names
 38: - **Undo Groups:** Always wrap operations in `app.beginUndoGroup()` / `app.endUndoGroup()`
 39: - **Indexing:** Remember 1-based indexing for AE collections
 40: 
 41: ## Patterns
 42: 
 43: ### PyShiftAE: Worker Thread + Scheduler Pattern
 44: 
 45: ```python
 46: import pyshiftae as ae
 47: import threading
 48: 
 49: def heavy_computation():
 50:     """Pure Python - no AE calls"""
 51:     return [(i/24.0, (i, i*1.5, 0)) for i in range(1000)]
 52: 
 53: def apply_changes(data):
 54:     """Executed in AE main thread via scheduler - FAST"""
 55:     comp = ae.Item.active_item()
 56:     if not comp: return
 57:     layer = comp.layers.add_solid("Solid_IA", (0,1,0,1), 1920, 1080, 10)
 58: 
 59: threading.Thread(target=lambda: (
 60:     data := heavy_computation(),
 61:     ae.schedule_task(lambda: apply_changes(data))
 62: )).start()
 63: ```
 64: 
 65: ### ExtendScript: Dockable Panel Pattern
 66: 
 67: ```jsx
 68: (function() {
 69:     function buildUI(thisObj) {
 70:         var win = thisObj instanceof Panel 
 71:             ? thisObj 
 72:             : new Window("palette", "Script Name", undefined, {resizeable: true});
 73:         
 74:         if (win instanceof Window) {
 75:             win.show();
 76:         } else {
 77:             win.layout.layout(true);
 78:         }
 79:         return win;
 80:     }
 81:     
 82:     var myUI = buildUI(this);
 83: })();
 84: ```
 85: 
 86: ### Shape Layers: Hierarchy Navigation
 87: 
 88: ```jsx
 89: function getAllShapePaths(layer) {
 90:     var paths = [];
 91:     var rootGroup = layer.property("ADBE Root Vectors Group");
 92:     if (!rootGroup) return paths;
 93:     
 94:     function traverseGroup(group, transforms) {
 95:         for (var i = 1; i <= group.numProperties; i++) {
 96:             var prop = group.property(i);
 97:             if (prop.matchName === "ADBE Vector Shape") {
 98:                 paths.push({path: prop, transforms: transforms.slice()});
 99:             } else if (prop.propertyGroup) {
100:                 traverseGroup(prop, transforms);
101:             }
102:         }
103:     }
104:     
105:     traverseGroup(rootGroup, []);
106:     return paths;
107: }
108: ```
109: 
110: ### CEP Bridge Hybrid 2.0
111: 
112: ```javascript
113: // CEP side
114: const pipeName = localStorage.getItem('pyshift_pipe_name') || 'pyshift_default';
115: const transport = pipeAvailable ? new PyInterface(pipeName) : new MailboxJSON();
116: 
117: function sendCommand(func, args) {
118:   return transport.send({
119:     endpoint: "Response", functionName: func, args: args
120:   });
121: }
122: ```
123: 
124: ```python
125: # Python side
126: def handle_command(command):
127:     try:
128:         func = globals()[command['functionName']]
129:         result = func(**command['args'])
130:         return {"status": "success", "result": result}
131:     except Exception as e:
132:         return {"status": "error", "message": str(e)}
133: ```
134: 
135: ## Common Tasks
136: 
137: ### PyShiftAE Operations
138: 1. **Thread boundary**: Pure Python vs AE SDK calls
139: 2. **Worker function**: Implement computation without AE calls
140: 3. **Scheduler function**: Apply results via `ae.schedule_task()`
141: 4. **Error handling**: Wrap in try/except with context
142: 
143: ### ExtendScript UI Panels
144: 1. **Dockable detection**: Test `thisObj instanceof Panel`
145: 2. **IIFE wrapper**: Prevent global namespace pollution
146: 3. **Undo groups**: Wrap all AE operations
147: 4. **Asset management**: Handle binary blobs for icons/presets
148: 
149: ### Shape Layers
150: 1. **MatchNames**: Use documented matchNames (ADBE Root Vectors Group, etc.)
151: 2. **Hierarchy**: Navigate Contents → Group → Shape → Fill/Stroke
152: 3. **Transforms**: Track transform stack for coordinate conversion
153: 
154: ## Anti-Patterns
155: 
156: ### ❌ PyShiftAE Don'ts
157: - Blocking UI operations on main thread
158: - Long-term handle caching (stale references)
159: - Native UI (PyQt/Tkinter) in AE process
160: 
161: ### ❌ ExtendScript Don'ts
162: - Modern JavaScript (const/let, arrow functions, template literals)
163: - Missing undo groups
164: - Silent failures without user feedback
165: - Undocumented matchNames with `-0001` suffixes
166: 
167: ## Testing
168: 
169: ### PyShiftAE
170: ```python
171: import pytest
172: def test_heavy_computation():
173:     result = heavy_computation()
174:     assert len(result) == 1000
175: ```
176: 
177: ### ExtendScript
178: Test scenarios: project closed, layer deleted, comp inactive, undo groups
179: 
180: ## Conventions
181: 
182: ### PyShiftAE
183: - Version alignment: CPython ↔ .aex compatibility
184: - Performance: Batch writes, avoid N+1 queries
185: - IPC: Pipes/sockets preferred, mailbox fallback
186: 
187: ### ExtendScript
188: - File encoding: UTF-8, avoid BOM
189: - Collections: 1-based indexing
190: - Binary assets: Use blob placeholders
191: 
192: ## Skills Invocation Guide
193: 
194: ### Use PyShiftAE Skill (@.windsurf/skills/pyshiftae/SKILL.md)
195: - Python automation with PyShiftAE
196: - Threading patterns (worker + scheduler)
197: - CEP bridge integration
198: - Installation troubleshooting
199: - Advanced API usage
200: 
201: ### Use AE Scripting Expert Skill (@.windsurf/skills/ae-scripting-expert/SKILL.md)
202: - Traditional ExtendScript/JSX development
203: - ScriptUI panel creation
204: - Shape layer manipulation
205: - Binary asset management
206: - ES3 compatibility
207: 
208: ### Decision Flow
209: ```
210: Python automation? → PyShiftAE skill
211: Traditional scripting? → AE Scripting Expert skill
212: ```
213: 
214: For hybrid projects: Use primary skill + reference this file for unified conventions.
````

## File: docs/internal/after_effects/architecture_avancee_shape_layers.md
````markdown
  1: # Architecture Avancée des Shape Layers (Origami v1.4.0 / SOURCE_A)
  2: 
  3: Ce chapitre documente **la façon dont Origami navigue et construit des Shape Layers** via l’API After Effects (ExtendScript), en se concentrant sur :
  4: 
  5: - **La hiérarchie `ADBE Root Vectors Group`** (Vectors/Contents imbriqués)
  6: - **La création et l’injection d’objets `Shape()`** dans `ADBE Vector Shape`
  7: - **L’ajout dynamique de “Trim Paths”, Fill et Stroke** via `addProperty(matchName)`
  8: - **La conversion Shape → Masks** (`origami.shapesToMasks`) et les implications de coordonnées
  9: 
 10: > Hypothèse clé (conforme au code) : Origami génère majoritairement des **polygones (segments droits)**. Il **ne renseigne pas** explicitement `inTangents/outTangents` dans `drawShape`, donc les tangentes sont implicitement nulles.
 11: 
 12: ---
 13: 
 14: ## 1) Hiérarchie “Vectors Group” et navigation dans `ADBE Root Vectors Group`
 15: 
 16: ### 1.1 Le “vrai” arbre de propriétés côté API
 17: 
 18: Origami manipule les Shape Layers au niveau des `PropertyGroup` en s’appuyant sur les *matchNames* (plus robustes que les labels UI localisés).
 19: 
 20: **Arbre typique construit par `origami.drawShape` (~l.6655) :**
 21: 
 22: ```text
 23: ShapeLayer
 24: └─ ("ADBE Root Vectors Group")                  // Contents (racine)
 25:    └─ addProperty("ADBE Vector Group")          // Group
 26:       └─ addProperty("ADBE Vectors Group")      // Contents (du groupe)
 27:          ├─ addProperty("ADBE Vector Shape - Group")   // Path group
 28:          │  └─ property("ADBE Vector Shape")           // Path (Shape)
 29:          ├─ addProperty("ADBE Vector Filter - Trim")   // Trim Paths
 30:          │  └─ property("ADBE Vector Trim End")        // End (anim / expression)
 31:          ├─ addProperty("ADBE Vector Graphic - Fill")  // Fill
 32:          │  └─ property("ADBE Vector Fill Color")      // Color
 33:          └─ addProperty("ADBE Vector Graphic - Stroke")// Stroke
 34:             ├─ property("ADBE Vector Stroke Width")    // Width
 35:             └─ property("ADBE Vector Stroke Color")    // Color
 36: ```
 37: 
 38: MatchNames confirmés dans `Origami.jsx` :
 39: 
 40: - **Root / Grouping**
 41:   - `ADBE Root Vectors Group`
 42:   - `ADBE Vector Group`
 43:   - `ADBE Vectors Group`
 44: - **Path**
 45:   - `ADBE Vector Shape - Group`
 46:   - `ADBE Vector Shape`
 47: - **Styling**
 48:   - `ADBE Vector Graphic - Fill`
 49:   - `ADBE Vector Fill Color`
 50:   - `ADBE Vector Graphic - Stroke`
 51:   - `ADBE Vector Stroke Width`
 52:   - `ADBE Vector Stroke Color`
 53: - **Trim**
 54:   - `ADBE Vector Filter - Trim`
 55:   - `ADBE Vector Trim End`
 56: - **Transforms**
 57:   - `ADBE Vector Transform Group`
 58:   - `ADBE Vector Position`
 59:   - `ADBE Vector Anchor`
 60:   - `ADBE Vector Scale`
 61:   - `ADBE Vector Rotation`
 62: 
 63: Origami maintient aussi une table interne `origami.matchNames.shape...` qui centralise ces matchNames (utile comme “source of truth” interne).
 64: 
 65: ### 1.2 Navigation “profonde” : récupérer tous les Paths, même imbriqués
 66: 
 67: Dans `origami.getSliceVertices` (~l.6092), Origami définit un helper local `getAllPathsObjects(_group, _transformsArr)` :
 68: 
 69: - Il parcourt récursivement tous les `PropertyGroup`
 70: - Il collecte les propriétés dont `curProp.matchName == "ADBE Vector Shape"`
 71: - Il **accumule** au passage les groupes de transform `ADBE Vector Transform Group` dans un tableau `transformsArr`
 72: 
 73: La structure retournée est :
 74: 
 75: ```js
 76: { prop: /* Property ADBE Vector Shape */, transformsArr: [/* ...transform groups... */] }
 77: ```
 78: 
 79: Ce pattern est central : un Path de Shape Layer est rarement “dans le vide”, il est **dans l’espace local d’un groupe**, donc comprendre la pile de transforms est indispensable pour convertir correctement les coordonnées.
 80: 
 81: ---
 82: 
 83: ## 2) Création de Formes (Shape Objects) : `origami.drawShape`
 84: 
 85: ### 2.1 Définition du `Shape()` (vertices / tangents / closed)
 86: 
 87: Dans `origami.drawShape` (~l.6655), Origami construit un objet `Shape` minimal :
 88: 
 89: - `triangle = new Shape()`
 90: - `triangle.vertices = vertices`
 91: - `triangle.closed = true`
 92: - **Tangentes** : non définies (`inTangents/outTangents` absents)
 93: 
 94: Implications :
 95: 
 96: - L’absence de `inTangents/outTangents` est cohérente avec une géométrie “mesh fragments” (polygones).
 97: - Si tu veux produire des courbes, tu dois fournir :
 98:   - `shape.inTangents = [[x,y], ...]` (même longueur que `vertices`)
 99:   - `shape.outTangents = [[x,y], ...]`
100: 
101: Origami fait aussi un nettoyage simple : si le dernier point est égal au premier, il enlève le doublon pour éviter une redondance dans la boucle.
102: 
103: ### 2.2 Injection dans un Shape Layer (`ADBE Vector Shape`)
104: 
105: Le “point d’injection” API est :
106: 
107: - Création du groupe Path :
108:   - `t1 = p.addProperty("ADBE Vector Shape - Group")`
109: - Puis :
110:   - `t1.property("ADBE Vector Shape").setValue(triangle)`
111: 
112: Ce `setValue()` est l’opération déterminante : elle pousse l’objet `Shape` (ExtendScript) dans la propriété Path du Shape Layer.
113: 
114: ---
115: 
116: ## 3) Trimming & Styling : ajout dynamique de Trim/Fill/Stroke
117: 
118: ### 3.1 Trim Paths (matchName + expression)
119: 
120: Toujours dans `drawShape` :
121: 
122: - `trim = p.addProperty("ADBE Vector Filter - Trim")`
123: - `trim.property("ADBE Vector Trim End").expression = origami.expressions.trimPath`
124: 
125: Points clés :
126: 
127: - Le trim est attaché au **contenu du groupe** `p` (`ADBE Vectors Group`)
128: - Origami pilote au moins **`ADBE Vector Trim End`** par expression (donc animation “procedurale”)
129: 
130: ### 3.2 Fill et Stroke : “constructeurs” dédiés
131: 
132: Origami factorise en helpers :
133: 
134: - `origami.setStroke(group, thick, color)`
135:   - `group.addProperty("ADBE Vector Graphic - Stroke")`
136:   - setValue sur :
137:     - `ADBE Vector Stroke Width`
138:     - `ADBE Vector Stroke Color`
139: - `origami.setFill(group, color, _name, hide)`
140:   - `group.addProperty("ADBE Vector Graphic - Fill")`
141:   - setValue sur :
142:     - `ADBE Vector Fill Color`
143:   - optionnel :
144:     - renomme le fill (`colGroup.name = name`)
145:     - peut le cacher (`colGroup.enabled = false`) pour stocker une “Original Color” sans l’afficher
146: 
147: On voit explicitement un pattern “multi-fills” nommé :
148: 
149: - `origami.names.currentColor` → `"Origami Fill"`
150: - `origami.names.originalColor` → `"Original Color"`
151: - `origami.names.strokeColor` (utilisé comme nom de stroke)
152: 
153: Cela sert ensuite au recoloring : le script retrouve ces fills/strokes par leur `name` dans `Contents` (ex: `.property("Contents").property(origami.names.currentColor)...`).
154: 
155: ---
156: 
157: ## 4) Conversion Masque <-> Shape : focus `origami.shapesToMasks`
158: 
159: ### 4.1 Objectif fonctionnel
160: 
161: `origami.shapesToMasks` (~l.10776) :
162: 
163: - Prend un `ShapeLayer`
164: - Extrait tous ses paths
165: - Crée un nouveau Solid
166: - Recrée chaque path en **masque** sur ce solid (`ADBE Mask Atom` / `ADBE Mask Shape`)
167: 
168: ### 4.2 Extraction des paths et lecture des vertices
169: 
170: Le code s’appuie sur :
171: 
172: - `layer.property("ADBE Root Vectors Group").getAllPathsObjects()`
173: 
174: Même si la définition de `getAllPathsObjects()` “en prototype” n’apparaît pas clairement dans ce fichier décompilé, le comportement attendu est identique au helper local vu dans `getSliceVertices` :
175: 
176: - Retourne une liste d’objets `{ prop, transformsArr }`
177: - Où `prop.value.vertices` donne les points du Path (`ADBE Vector Shape`)
178: 
179: ### 4.3 Conversion de coordonnées : du local “vector group” vers l’espace layer
180: 
181: Le code calcule ensuite un offset à partir de la **première transform** :
182: 
183: ```js
184: t.transformsArr[0].property("ADBE Vector Position").value
185: - t.transformsArr[0].property("ADBE Vector Anchor").value
186: ```
187: 
188: Puis il translate tous les vertices :
189: 
190: - `polygons[p].vertices = polygons[p].vertices.addToAll(transforms[p])`
191: 
192: Interprétation :
193: 
194: - Un `ADBE Vector Shape` vit dans un espace local.
195: - Origami applique une **translation** `Position - Anchor` (et seulement sur `transformsArr[0]`).
196: - Cela peut suffire si les groupes sont simples, mais c’est une approximation si :
197:   - il y a plusieurs niveaux de `ADBE Vector Transform Group`
198:   - il y a scale/rotation non nulles (non appliquées ici)
199: 
200: À noter : Origami possède un helper plus complet `origami.untransformVerts(vertices, transformsArr)` (~l.5893) qui applique anchor/scale/rotation/position sur une pile de transforms. C’est ce genre de routine qu’on attend pour une conversion robuste entre espaces.
201: 
202: ### 4.4 Création des masques sur un nouveau solid
203: 
204: Le solid est créé et “neutralisé” (position/anchor à `[0,0]`) :
205: 
206: - `comp.layers.addSolid([...], "maskSolid", ...)`
207: - `maskSolid.property("ADBE Transform Group").property("ADBE Position").setValue([0,0])`
208: - `maskSolid.property("ADBE Transform Group").property("ADBE Anchor Point").setValue([0,0])`
209: 
210: Puis chaque polygone devient un masque via `drawMask` (même logique que `origami.drawMask` ~l.6699) :
211: 
212: - `mask = masterLayer.property("ADBE Mask Parade")`
213: - `g = mask.addProperty("ADBE Mask Atom")`
214: - `g.property("ADBE Mask Shape").setValue(triangle)`
215: - `g.property("ADBE Mask Offset").setValue(offset)`
216: 
217: MatchNames importants côté masks :
218: 
219: - `ADBE Mask Parade`
220: - `ADBE Mask Atom`
221: - `ADBE Mask Shape`
222: - `ADBE Mask Offset`
223: 
224: ---
225: 
226: ## 5) Patterns réutilisables (best practices)
227: 
228: ### 5.1 Helper universel “get all paths”
229: 
230: ```js
231: function getAllPathsObjects(_group, _transformsArr) {
232:   var transformName = "ADBE Vector Transform Group";
233:   var pathName = "ADBE Vector Shape";
234:   var arr = [];
235:   if (!_transformsArr) _transformsArr = [];
236:   var localTrArr = _group.property(transformName) !== null
237:     ? _transformsArr.concat([_group.property(transformName)])
238:     : _transformsArr;
239:   for (var i = 1; i <= _group.numProperties; i++) {
240:     var curProp = _group.property(i);
241:     if (curProp instanceof PropertyGroup) {
242:       arr = arr.concat(getAllPathsObjects(curProp, localTrArr));
243:     } else if (curProp.matchName === pathName) {
244:       arr.push({ prop: curProp, transformsArr: localTrArr });
245:     }
246:   }
247:   return arr;
248: }
249: ```
250: 
251: ### 5.2 Créer un Shape + Path propre
252: 
253: ```js
254: function createShapePath(vertices, closed) {
255:   var shape = new Shape();
256:   shape.vertices = vertices;
257:   shape.closed = closed || true;
258:   // Optionnel : tangentes
259:   // shape.inTangents = vertices.map(() => [0,0]);
260:   // shape.outTangents = vertices.map(() => [0,0]);
261:   return shape;
262: }
263: ```
264: 
265: ### 5.3 Insérer un Path dans un Shape Layer
266: 
267: ```js
268: function addPathToShapeLayer(shapeLayer, shapeObj) {
269:   var contents = shapeLayer.property("ADBE Root Vectors Group");
270:   var group = contents.addProperty("ADBE Vector Group");
271:   var vectors = group.addProperty("ADBE Vectors Group");
272:   var pathGroup = vectors.addProperty("ADBE Vector Shape - Group");
273:   pathGroup.property("ADBE Vector Shape").setValue(shapeObj);
274:   return pathGroup; // pour ajouter Fill/Stroke/Trim ensuite
275: }
276: ```
277: 
278: ### 5.4 Ajouter Fill/Stroke/Trim
279: 
280: ```js
281: function addFill(pathGroup, color, name) {
282:   var fill = pathGroup.addProperty("ADBE Vector Graphic - Fill");
283:   fill.property("ADBE Vector Fill Color").setValue(color);
284:   if (name) fill.name = name;
285:   return fill;
286: }
287: function addStroke(pathGroup, width, color, name) {
288:   var stroke = pathGroup.addProperty("ADBE Vector Graphic - Stroke");
289:   stroke.property("ADBE Vector Stroke Width").setValue(width);
290:   stroke.property("ADBE Vector Stroke Color").setValue(color);
291:   if (name) stroke.name = name;
292:   return stroke;
293: }
294: function addTrim(pathGroup) {
295:   var trim = pathGroup.addProperty("ADBE Vector Filter - Trim");
296:   // trim.property("ADBE Vector Trim End").expression = "...";
297:   return trim;
298: }
299: ```
300: 
301: ### 5.5 Conversion Shape → Mask robuste
302: 
303: ```js
304: function shapeLayerToMasks(shapeLayer, targetLayer) {
305:   var paths = shapeLayer.property("ADBE Root Vectors Group").getAllPathsObjects();
306:   var maskParade = targetLayer.property("ADBE Mask Parade");
307:   paths.forEach(function(p) {
308:     var mask = maskParade.addProperty("ADBE Mask Atom");
309:     mask.property("ADBE Mask Shape").setValue(p.prop.value);
310:     // Appliquer les transforms si nécessaire (voir untransformVerts)
311:   });
312: }
313: ```
314: 
315: ---
316: 
317: ## 6) Références croisées (SOURCE_A ↔ docs officielles)
318: 
319: | MatchName (Origami) | UI label (docs) | Fichier/line (Origami.jsx) |
320: |---|---|---|
321: | `ADBE Root Vectors Group` | Contents | 6674, 6122, 6160, 10789 |
322: | `ADBE Vector Shape - Group` | Path Group | 6678 |
323: | `ADBE Vector Shape` | Path | 6679, 6110 |
324: | `ADBE Vector Graphic - Fill` | Fill | 6727, 6280 |
325: | `ADBE Vector Graphic - Stroke` | Stroke | 6720 |
326: | `ADBE Vector Filter - Trim` | Trim Paths | 6680 |
327: | `ADBE Mask Parade` | Masks | 6712, 6136 |
328: | `ADBE Mask Atom` | Mask | 6713 |
329: | `ADBE Mask Shape` | Mask Shape | 6714, 6138 |
330: 
331: ---
332: 
333: ## 7) Limites observées dans Origami
334: 
335: - **Tangentes non gérées** : `inTangents/outTangents` absents → pas de courbes lisses.
336: - **Conversion Shape→Mask simplifiée** : applique seulement un offset `Position - Anchor` sur la première transform (pas scale/rotation).
337: - **Dépendance à des helpers non standards** (`getAllPathsObjects`, `getFirstPath`) – probablement ajoutés par un polyfill ou une lib externe.
338: - **Pas de gestion des “holes”** (polygones intérieurs) dans `shapesToMasks`.
339: 
340: ---
341: 
342: ## 8) Conclusion
343: 
344: Origami illustre **la manière pragmatique de construire des Shape Layers par l’API** :
345: 
346: - Toujours commencer par `ADBE Root Vectors Group`
347: - Créer la hiérarchie `Vector Group → Vectors Group → Vector Shape - Group → Vector Shape`
348: - Utiliser `addProperty(matchName)` pour ajouter Fill/Stroke/Trim
349: - Nommer les fills/strokes pour les retrouver plus tard
350: - Pour les conversions Shape ↔ Mask, bien comprendre la pile de `ADBE Vector Transform Group` et appliquer les transformations de coordonnées (voir `untransformVerts`).
351: 
352: Ces patterns sont réutilisables dans n’importe quel script ExtendScript qui doit générer ou manipuler des Shape Layers de façon programmatique.
353: 
354: ---
355: 
356: *Document généré à partir de l’analyse du code source décompilé Origami.jsx (v1.4.0) – SOURCE_A*
````

## File: docs/internal/after_effects/interfaces_scriptUI_production.md
````markdown
  1: # Interfaces Utilisateur & ScriptUI en Production
  2: 
  3: Contexte SOURCE_A vs SOURCE_B : `docs/matchname_cartography.md` met surtout en évidence des *matchNames* et l’écart de documentation (ex. `ADBE easyRulers` non documenté). Pour la partie **ScriptUI**, les bonnes pratiques “terrain” se lisent directement dans `easyRulers.jsx`, `Easy Clones.jsx` et, de façon plus “UI framework”, `goodParents.jsx` (construction d’UI + états hover/click + ressources écrites sur disque).
  4: 
  5: ---
  6: 
  7: ## 1) Le Pattern Dockable (Palette vs Panel docké)
  8: 
  9: ### Problème
 10: Un script ScriptUI peut être lancé :
 11: - depuis **Fenêtre >** (il doit créer une `Window("palette", ...)` et faire `show()`),
 12: - ou comme **panneau docké** (AE passe un `Panel` via `this`, et il ne faut pas appeler `show()` pareil).
 13: 
 14: La plupart des scripts “production” utilisent un test simple : `thisObj instanceof Panel`.
 15: 
 16: ### Solution Production
 17: - **Entrée unique** : fonction principale `MyScript(this)` ou `MW_EasyClones(this)`.
 18: - **Construction conditionnelle** : `thisObj instanceof Panel ? thisObj : new Window("palette", ...)`
 19: - **Fin de flow** :
 20:   - si `Window` : `show()`
 21:   - si `Panel` : `layout.layout(true)` (ou rien) + `onResizing/onResize` si UI resizable
 22: 
 23: ### Code Snippet (boilerplate exact)
 24: 
 25: #### Easy Clones — `MW_EasyClones` / `easyClonesUI`
 26: ```jsx
 27:       var win =
 28:         thisObj instanceof Panel
 29:           ? thisObj
 30:           : new Window("palette", "Easy Clones", undefined, {
 31:               resizeable: true,
 32:             });
 33: ```
 34: 
 35: Et gestion “Window vs Panel” :
 36: ```jsx
 37:       if (win instanceof Window) {
 38:         win.show();
 39:       } else {
 40:         win.layout.layout(true);
 41:       }
 42: ```
 43: 
 44: #### easyRulers — `easyRulers(this)`
 45: ```jsx
 46:     var mainPalette =
 47:       thisObj instanceof Panel
 48:         ? thisObj
 49:         : new Window(
 50:             "palette",
 51:             FF092D.t() ? "easyRulers 2 - Trial" : "easyRulers 2",
 52:             undefined,
 53:             { resizeable: true },
 54:           );
 55:     if (mainPalette == null) {
 56:       return;
 57:     }
 58: ```
 59: 
 60: Resizing + show uniquement si pas docké :
 61: ```jsx
 62:     mainPalette.layout.layout(true);
 63:     mainPalette.layout.resize();
 64:     mainPalette.onResizing = mainPalette.onResize = function () {
 65:       mainPalette.layout.resize();
 66:     };
 67:     ...
 68:       if (!(mainPalette instanceof Panel)) {
 69:         mainPalette.show();
 70:       }
 71: ```
 72: 
 73: #### Good Parents — dockable + `new Window(...)`
 74: ```jsx
 75:     thisObj[_0x4169[202]] =
 76:       thisObj instanceof Panel
 77:         ? thisObj
 78:         : new Window(
 79:             _0x4169[203],
 80:             thisObj[_0x4169[0]] + _0x4169[204] + thisObj[_0x4169[2]],
 81:             undefined,
 82:             { resizeable: true },
 83:           );
 84: ```
 85: 
 86: *(Le script est obfusqué, mais le pattern dockable est identique.)*
 87: 
 88: ---
 89: 
 90: ## 2) Gestion des Assets Binaires (blobs internes → fichiers temporaires)
 91: 
 92: ### Problème
 93: En production, beaucoup de scripts évitent des `.png` distribués à côté du `.jsx` :
 94: - compatibilité ZXP / copies manuelles / chemins incertains
 95: - distribution “single file”
 96: - limitation des loaders
 97: 
 98: Ils embarquent donc des blobs : `__BLOB__BLOB_...` puis doivent les transformer en **fichiers réels** pour `ScriptUI.newImage(...)` ou `iconbutton`.
 99: 
100: ### Solution Production
101: Deux patterns observés :
102: 
103: 1) **Écrire un fichier `.png` au premier run** dans un dossier “stable” (`Folder.userData/...`) puis réutiliser.
104: 2) **Retourner un `File`** (ou chemin) utilisable directement dans ScriptUI.
105: 
106: Points “production” visibles dans le code :
107: - créer un dossier cible si besoin
108: - `encoding = "BINARY"`
109: - `open("w")` + `write(blob)` + `close()`
110: - *optionnel mais crucial* : vérifier la préférence AE “Allow Scripts to Write Files and Access Network”, sinon prompt + ouverture prefs
111: 
112: ### Code Snippet
113: 
114: #### easyRulers — `loadImage` (exact)
115: ```jsx
116:     function loadImage(e, r, t) {
117:       var s = Folder.userData.fsName + "/Adobe/ScriptData/" + t;
118:       if (!Folder(s).exists) {
119:         Folder(s).create();
120:         if (!Folder(s).exists) {
121:           alert("Could not create folder: " + s + ".");
122:           return;
123:         }
124:       }
125:       var o = s + "/" + r + ".png";
126:       var a = new File(o);
127:       if (!a.exists) {
128:         a.encoding = "BINARY";
129:         a.open("w");
130:         a.write(e);
131:         a.close();
132:         if (!a.exists) {
133:           alert("Could not create file in: " + s + ".");
134:           return;
135:         }
136:       }
137:       return a;
138:     }
139: ```
140: 
141: Usage direct dans un `iconbutton` (write-if-needed uniquement sur anciennes versions ici) :
142: ```jsx
143:     var logo = myWin.add(
144:       "iconbutton",
145:       undefined,
146:       parseFloat(app.version) < 12
147:         ? loadImage(imagelogo, "easyRulersLogoSmall", "easyRulers")
148:         : imagelogo,
149:       { style: "toolbutton" },
150:     );
151: ```
152: 
153: #### Easy Clones — `createResourceFile` + sécurité (exact)
154: ```jsx
155:       function createResourceFile(filename, binaryString, resourceFolder) {
156:         var myFile = new File(resourceFolder + "/" + filename);
157:         if (!File(myFile).exists) {
158:           if (!isSecurityPrefSet()) {
159:             alert(
160:               "This script requires access to write files. Go to the General panel of the application preferences and make sure Allow Scripts to Write Files and Access Network is checked.",
161:             );
162:             try {
163:               app.executeCommand(2359);
164:             } catch (e) {
165:               alert(e);
166:             }
167:             if (!isSecurityPrefSet()) {
168:               return null;
169:             }
170:           }
171:           myFile.encoding = "BINARY";
172:           myFile.open("w");
173:           myFile.write(binaryString);
174:           myFile.close();
175:         }
176:         return myFile;
177:       }
178: ```
179: 
180: ---
181: 
182: ## 3) Layouts Résilients (tabbedpanel + groupes imbriqués)
183: 
184: ### Problème
185: Les UIs ScriptUI cassent facilement :
186: - tailles non cohérentes entre versions AE
187: - widgets qui ne “fill” pas correctement
188: - layouts imbriqués qui “collapsent” si `alignment`/`orientation` mal réglés
189: 
190: ### Solution Production
191: Dans `easyRulers.jsx`, le layout est robuste parce qu’il combine :
192: - une colonne racine (`myWin.orientation = "column"`)
193: - des `group` en `row` pour les lignes de contrôles
194: - un `tabbedpanel` isolé avec `minimumSize` selon version, `maximumSize` fixe
195: - des sous-groupes avec `alignment = ["fill","fill"]` et des `spacing/margins` explicites
196: - un handler de resize global sur la palette
197: 
198: ### Code Snippet (structure “qui tient”)
199: 
200: Création du `tabbedpanel` :
201: ```jsx
202:     var er_panels = myWin.add("tabbedpanel");
203:     if (parseFloat(app.version) < 13) {
204:       er_panels.minimumSize = [260, "fill"];
205:     }
206:     er_panels.maximumSize = [260, 500];
207:     er_panels.spacing = 0;
208:     er_panels.margins = 0;
209:     var rulerType_tab = er_panels.add("tab", undefined, "type");
210:     rulerType_tab.spacing = 0;
211:     rulerType_tab.margins =
212:       parseFloat(app.version) < 12 ? [8, 8, 8, 8] : [10, 8, 0, 0];
213: ```
214: 
215: Exemple de groupes imbriqués avec alignements pragmatiques :
216: ```jsx
217:     var rulerLineCircleGroup = rulerType_tab.add(
218:       parseFloat(app.version) < 12 ? "group" : "panel",
219:       undefined,
220:       "",
221:     );
222:     rulerLineCircleGroup.orientation = "row";
223:     rulerLineCircleGroup.spacing = 0;
224:     rulerLineCircleGroup.alignment = ["fill", "fill"];
225:     var rulerLineIconGroup = rulerLineCircleGroup.add(
226:       "group",
227:       undefined,
228:       "Line Icon",
229:     );
230:     rulerLineIconGroup.orientation = "column";
231:     rulerLineIconGroup.alignment = ["fill", ""];
232: ```
233: 
234: *(Le “truc” ici : parent en `row` avec `["fill","fill"]`, enfants en `column` avec `["fill",""]` pour éviter que la hauteur force un stretch non désiré.)*
235: 
236: ---
237: 
238: ## 4) Boutons Graphiques (IconButtons) + icônes custom
239: 
240: ### Problème
241: Un `Button` standard est limité visuellement. Les scripts “tooling” (KBar / palettes) veulent :
242: - des boutons carrés type toolbar
243: - icône PNG custom
244: - états toggle / toolbutton
245: - aide (`helpTip`)
246: 
247: Mais ScriptUI a besoin d’un objet image (`ScriptUI.newImage`) et, souvent, d’un fichier sur disque.
248: 
249: ### Solution Production
250: Deux implémentations complémentaires :
251: 
252: 1) **Approche “resource file”** (Easy Clones)
253: - stocker un blob `__BLOB__...`
254: - le transformer en fichier avec `createResourceFile(...)`
255: - passer le `File` à `ScriptUI.newImage(...)`
256: - injecter dans un `iconbutton`
257: 
258: 2) **Approche “UI framework maison”** (Good Parents)
259: - pas forcément `iconbutton`, mais composition de `group/panel/image` + “click zone”
260: - gestion hover/out via listeners qui changent couleurs / image
261: 
262: ### Code Snippet
263: 
264: #### Easy Clones — `createClonesBtn` (exact)
265: ```jsx
266:       var createClonesImage = __BLOB__BLOB_000137__;
267:       var createClonesBtn = win.add(
268:         "iconbutton",
269:         [5, 5, 40, 40],
270:         ScriptUI.newImage(
271:           createResourceFile(
272:             "createClonesImage.png",
273:             createClonesImage,
274:             getUserDataFolder(),
275:           ),
276:         ),
277:         { style: "toolbutton", toggle: 0 },
278:       );
279:       createClonesBtn.onClick = function () {
280:         checkLicense;
281:         isTrial = !checkLicense;
282:         createClones(trialMode);
283:       };
284:       createClonesBtn.helpTip = "Click to create a Clone System.";
285: ```
286: 
287: #### easyRulers — `iconbutton` avec `loadImage(...)` fallback (exact)
288: ```jsx
289:     var rulerLine = rulerLineIconGroup.add(
290:       "iconbutton",
291:       undefined,
292:       parseFloat(app.version) < 12
293:         ? loadImage(button_linear, "rulerLineIcon", "easyRulers")
294:         : button_linear,
295:       { style: "toolbutton", toggle: true },
296:     );
297: ```
298: 
299: #### Good Parents — pattern “button composite” (extrait exact, logique hover)
300: Le script fabrique un bouton en plusieurs couches (BG, contenu, click-zone) et switch l’icône au survol :
301: ```jsx
302:         } else {
303:           newBttn[_0x4169[173]][_0x4169[174]] = iconOver;
304:         }
305: ...
306:         } else {
307:           newBttn[_0x4169[173]][_0x4169[174]] = icon;
308:         }
309: ```
310: 
311: Et la création dockable se fait dans la même fonction UI (snippet dockable montré plus haut), ce qui est typique d’un “framework UI interne”.
312: 
313: ---
314: 
315: ## Références
316: 
317: - `Aescripts-easyRulers 2 v2.01/easyRulers.jsx` : pattern dockable, `loadImage`, `tabbedpanel`, `iconbutton`
318: - `Aescripts-Easy Clones v1.1/Easy Clones.jsx` : `MW_EasyClones`, `createResourceFile`, `createClonesBtn`
319: - `Aescripts-Good Parents v1.4.1/goodParents.jsx` : dockable, UI framework maison, gestion hover/click
320: - `docs/matchname_cartography.md` : contexte général (matchNames, écart doc/terrain)
321: 
322: ---
323: 
324: *Généré le 2026‑02‑05 à partir du bundle « After Effects Scripts & Plugins »*
````

## File: docs/internal/after_effects/matchname_cartography.md
````markdown
  1: # Cartographie croisée Scripts (SOURCE_A) vs Documentation (SOURCE_B)
  2: 
  3: ## 1. Synthèse MatchName ↔ UI
  4: 
  5: Extraction automatique sur 376 scripts JSX/JS (SOURCE_A) et rapprochement avec `docs/matchnames/` (SOURCE_B). Le tableau ci-dessous liste les 20 matchNames les plus sollicités.
  6: 
  7: | MatchName | UI label (doc) | Usage count | Exemple (fichier:ligne) | Snippet |
  8: | --- | --- | --- | --- | --- |
  9: | `ADBE easyRulers` | **Non documenté** | 3616 | Aescripts-easyRulers 2 v2.01/easyRulers.jsx:3306 | `'" ).effect("ADBE easyRulers")("ADBE easyRulers-0080") } catch(e) {…` |
 10: | `ADBE Vectors Group` | Contents | 3475 | origami_fix.jsx:6676 | `var p = g.addProperty("ADBE Vectors Group");` |
 11: | `ADBE Effect Parade` | Effects | 2515 | origami_fix.jsx:691 | `var eff = this.property("ADBE Effect Parade");` |
 12: | `ADBE Root Vectors Group` | Contents | 1518 | origami_fix.jsx:6122 | `layer.property("ADBE Root Vectors Group"),` |
 13: | `ADBE Transform Group` | Transform | 1110 | origami_fix.jsx:4989 | `.property("ADBE Transform Group")` |
 14: | `ADBE Slider Control-0001` | **Non documenté** | 885 | Aescripts-circuitFX v1.75/circuitFX.jsx:3499 | `"ADBE Slider Control-0001",` |
 15: | `ADBE Vector Filter - Repeater` | Repeater | 675 | Aescripts-circuitFX v1.75/circuitFX.jsx:3235 | `.addProperty("ADBE Vector Filter - Repeater").name =…` |
 16: | `ADBE Vector Transform Group` | Transform | 522 | origami_fix.jsx:6094 | `var transformName = "ADBE Vector Transform Group";` |
 17: | `ADBE Position` | Position | 475 | origami_fix.jsx:4999 | `.property("ADBE Position").expression = "";` |
 18: | `ADBE Vector Group` | Group | 449 | origami_fix.jsx:6675 | `var g = contents.addProperty("ADBE Vector Group");` |
 19: | `ADBE Vector Graphic - Fill` | Fill | 365 | origami_fix.jsx:6280 | `var fillName = "ADBE Vector Graphic - Fill";` |
 20: | `ADBE Color Control-0001` | **Non documenté** | 344 | origami_fix.jsx:6313 | `this.col.property("ADBE Color Control-0001").expression =` |
 21: | `ADBE Slider Control` | Slider Control | 310 | origami_fix.jsx:7762 | `type: "ADBE Slider Control",` |
 22: | `ADBE Vector Shape - Rect` | Rectangle | 305 | origami_fix.jsx:10050 | `mn: "ADBE Vector Shape - Rect",` |
 23: | `ADBE Vector Graphic - Stroke` | Stroke | 294 | origami_fix.jsx:6720 | `group.addProperty("ADBE Vector Graphic - Stroke");` |
 24: | `ADBE Vector Fill Color` | Color | 291 | origami_fix.jsx:6283 | `.property("ADBE Vector Fill Color").value *…` |
 25: | `ADBE Vector Repeater Transform` | Transform | 290 | Aescripts-circuitFX v1.75/circuitFX.jsx:3244 | `)("ADBE Root Vectors Group")(r)("ADBE Vectors…` |
 26: | `ADBE Fill` | Fill | 264 | Aescripts-Easy Clones v1.1/Easy Clones.jsx:729 | `.addProperty("ADBE Fill");` |
 27: | `ADBE Mask Parade` | Masks | 244 | origami_fix.jsx:5917 | `var masks = layer.property("ADBE Mask Parade");` |
 28: | `ADBE Text Properties` | Text | 240 | origami_fix.jsx:9984 | `mn: "ADBE Text Properties",` |
 29: 
 30: ### 1.1 MatchNames introuvables côté doc (échantillon)
 31: 
 32: | MatchName | Usage count | Exemple (fichier:ligne) | Snippet |
 33: | --- | --- | --- | --- |
 34: | `ADBE easyRulers` | 3616 | Aescripts-easyRulers 2 v2.01/easyRulers.jsx:3306 | `'" ).effect("ADBE easyRulers")("ADBE easyRulers-0080") } catch(e) {…` |
 35: | `ADBE Slider Control-0001` | 885 | Aescripts-circuitFX v1.75/circuitFX.jsx:3499 | `"ADBE Slider Control-0001",` |
 36: | `ADBE Color Control-0001` | 344 | origami_fix.jsx:6313 | `this.col.property("ADBE Color Control-0001").expression =` |
 37: | `ADBE easyRulers-0032` | 144 | Aescripts-easyRulers 2 v2.01/easyRulers.jsx:4790 | `'try { if (effect("ADBE easyRulers")("Link to Pointer Completion %")…` |
 38: | `ADBE Layer Control-0001` | 142 | origami_fix.jsx:9977 | `layer: { mn: "ADBE Layer Control-0001" },` |
 39: | `ADBE Fill-0002` | 130 | Aescripts-Easy Clones v1.1/Easy Clones.jsx:765 | `.property("ADBE Fill-0002").expression = applyFillExpression;` |
 40: | `ADBE Mask Shape` | 121 | origami_fix.jsx:6138 | `.property("ADBE Mask Shape").value.vertices;` |
 41: | `ADBE Point Control-0001` | 105 | origami_fix.jsx:10913 | `gettySlider.property("ADBE Point Control-0001").expression =` |
 42: | `ADBE Vector Repeater Opacity 2` | 75 | Aescripts-AEInfoGraphics v2.0.3/AEInfoGraphics2/panel/jsx/main.jsx:3330 | `.property("ADBE Vector Repeater Transform").property("ADBE Vector…` |
 43: | `ADBE Vector Repeater Position` | 74 | Aescripts-circuitFX v1.75/circuitFX.jsx:3244 | `)("ADBE Root Vectors Group")(r)("ADBE Vectors…` |
 44: | `ADBE easyRulers-0034` | 48 | Aescripts-easyRulers 2 v2.01/easyRulers.jsx:4765 | `'try { effect("ADBE easyRulers")("ADBE easyRulers-0034").value?100:0;…` |
 45: | `ADBE Checkbox Control-0001` | 72 | Aescripts-Easy Clones v1.1/Easy Clones.jsx:692 | `colourDelayCheckbox("ADBE Checkbox Control-0001").setValue(true);` |
 46: | `ADBE Vector Repeater Rotation` | 68 | Aescripts-AEInfoGraphics v2.0.3/AEInfoGraphics2/panel/jsx/main.jsx:1128 | `.property("ADBE Vector Repeater Transform").property("ADBE Vector…` |
 47: | `ADBE easyRulers-0015` | 47 | Aescripts-easyRulers 2 v2.01/easyRulers.jsx:3851 | `'").effect("ADBE easyRulers")("ADBE easyRulers-0015").value +…` |
 48: | `ADBE easyRulers-0035` | 40 | Aescripts-easyRulers 2 v2.01/easyRulers.jsx:5111 | `'try { effect("ADBE easyRulers")("ADBE easyRulers-0035").value?100:0…` |
 49: 
 50: **Observations :**
 51: 
 52: 1. Les tables officielles couvrent bien les ensembles Shape/Text (`docs/matchnames/layer/shapelayer.md`, `docs/matchnames/effects/firstparty.md`). En revanche, aucun inventaire des identifiants internes des contrôles d’effets (indexés `-0001`, `-0002`, etc.) n’est publié. Ces suffixes restent nécessaires pour accéder aux sous-propriétés (ex. sliders, couleurs) mais constituent une dette documentaire majeure.
 53: 2. Les options matériaux 3D (`"ADBE Accepts Lights"`, `"ADBE Accepts Shadows"`, etc.) sont utilisées massivement dans les scripts de rigging (@Aescripts-Sliced Box 3 v3.25/Sliced Box.jsx#4050-4072), mais la doc `property/propertygroup.md` ne liste que les noms d’accès « Accepts Lights », sans rappeler les matchNames correspondants.
 54: 
 55: ## 2. Hacks identifiés vs API officielles récentes
 56: 
 57: | Pattern legacy | Evidence scripts | API moderne (doc) | Analyse & recommandations |
 58: | --- | --- | --- | --- |
 59: | Gestion manuelle des fontes : scan de dossiers utilisateur (`Folder.userData…/aescripts/aw_FontManager`) puis parsing JSON | @Aescripts-Font Manager v2.0.1 (WIN+MAC)/FontManager.jsx#125-144 | `app.fonts.*` (24.0+) expose l’écosystème complet, la recherche par PostScript/family, les duplicata et favoris (@docs/text/fontsobject.md#1-314) | Migrer la découverte/inspection de fontes vers `app.fonts` évite le scraping filesystem, fiabilise la détection de substitutions et simplifie le support des polices variables. Revoir le stockage local pour ne conserver que les presets UI. |
 60: | Détection d’images consécutives par duplication de calques, blending mode difference + `sampleImage` pour repérer coupe/duplication | @Aescripts-Duplicate Frame Remover v3.0/DuplicateFrameRemover.jsx#100-270 | `Layer.doSceneEditDetection(applyOptions)` (AE 22.3) réalise nativement le split/marker sur les coupes vidéo (@docs/layer/layer.md#434-464) | Pour les workflows « cut detection », privilégier l’API native (plus rapide, multi-frame rendering friendly). Le script peut se recentrer sur la gestion ROI/retime ou proposer un fallback <22.3. |
 61: | Appels HTTP via `system.callSystem('curl…')` + scripts auxiliaires VB pour contourner l’absence de réseau JSX | @Aescripts-Origami v1.4.0/Origami.jsx#2249-2369 | Doc rappelle uniquement `system.callSystem(cmd)` (@docs/general/system.md#81-103) – aucune nouvelle API réseau n’est fournie | Ces hacks restent nécessaires faute d’API officielle. Documenter clairement les prérequis de sécurité (« Allow Scripts to write files and access network »), sandboxer les URLs et ajouter des timeouts côté Socket() pour réduire les blocages UI. |
 62: 
 63: ## 3. Propriétés / attributs non documentés (échantillon à haut risque)
 64: 
 65: | MatchName / API | Contexte script | Pourquoi risqué |
 66: | --- | --- | --- |
 67: | `ADBE easyRulers` + sous-propriétés `ADBE easyRulers-00xx` | Contrôle personnalisé pilotant des expressions texte (@Aescripts-easyRulers 2 v2.01/easyRulers.jsx#3280-3318) | Aucun équivalent dans SOURCE_B : maintenance impossible pour d’autres équipes, nécessite rétro‑ingénierie en cas de refactor UI. |
 68: | `ADBE Slider Control-0001`, `ADBE Color Control-0001`, `ADBE Point Control-0001` | Accès direct aux valeurs internes des Effect Controls (ex. origami_fix.jsx#6313, #10913) | Les tables officielles ne listent que les matchNames parent (`ADBE Slider Control`). Les suffixes `-000x` sont indispensables mais non documentés ⇒ casse potentielle lors de renames Adobe. |
 69: | `ADBE Layer Control-0001` | Binding layer selectors pour rigs typographiques (origami_fix.jsx#9970-9985) | Idem ci-dessus ; aucune garantie de stabilité sans doc. |
 70: | `ADBE Mask Shape` | Manipulation directe des courbes de masques (origami_fix.jsx#6124-6138) | MatchName absent des sections Mask dans SOURCE_B ; pourtant critique pour extraire `vertices`. |
 71: | `ADBE Accepts Lights` / `ADBE Accepts Shadows` | Scripts 3D box builder (@Aescripts-Sliced Box 3 v3.25/Sliced Box.jsx#4050-4072) | La doc `property/propertygroup.md` ne donne que les noms lisibles. Confusion fréquente pour cibler ces propriétés via expressions/scripting. |
 72: 
 73: ## 4. Pistes d’alignement doc ↔ terrain
 74: 
 75: 1. **Documenter les suffixes de sous-propriétés** des effets standards (Slider, Color, Layer, Fill…). Une table « Effect Parameter MatchNames » éviterait la multiplication de constantes magiques dans les scripts d’automation.
 76: 2. **Ajouter une section « Material Options MatchNames »** dans `docs/matchnames/layer/avlayer.md`, couvrant `ADBE Accepts Lights/Shadows`, `ADBE Ambient/Diffuse`, etc., afin d’outiller les scripts 3D.
 77: 3. **Mettre en avant `app.fonts` dans la doc communautaire** pour inciter les mainteneurs d’outils typographiques (Font Manager, Type Morph, etc.) à migrer vers l’API officielle plutôt que des scans disque fragiles.
 78: 4. **Comparer les outils legacy de détection de coupes** (Duplicate Frame Remover, RenderHogs) avec `Layer.doSceneEditDetection` dans la doc pour encourager la bascule vers l’API GPU.
 79: 
 80: ## 5. Presets Dynamiques & Expression Engineering
 81: 
 82: Ce bundle illustre une technique “pro” extrêmement répandue chez les éditeurs Aescripts : **bootstrapper des rigs complets (Pseudo Effects + expressions + paramètres)** en passant par des presets `.ffx`, puis **compléter/paramétrer** le rig via scripting.
 83: 
 84: L’objectif n’est pas “d’appliquer un preset”, mais d’obtenir une structure d’effets et de contrôles **impossible (ou trop coûteuse/fragile) à reproduire** avec `addProperty()` seul.
 85: 
 86: ### 5.1 Le hack du Preset binaire (`.ffx`)
 87: 
 88: **Easy Clones v1.1** embarque un preset sous forme de *binary string* (placeholder `__BLOB__...__`). Le script reconstruit un fichier `.ffx` sur disque puis l’applique.
 89: 
 90: Points clés observés :
 91: 
 92: - **[écriture conditionnelle]** `getAnimationPreset()` écrit le fichier uniquement si absent.
 93: - **[écriture “binaire” ExtendScript]** `presetFile.encoding = "BINARY"; presetFile.open("w"); presetFile.write(presetBinary);`.
 94: - **[bootstrap Pseudo Effect]** `makePseudoEffectAvailable()` crée un *null temporaire*, applique le preset, puis le supprime. Ce détour force After Effects à **charger/enregistrer** la définition du Pseudo Effect, rendant ensuite possible `addProperty("Pseudo/...")`.
 95: 
 96: **Pourquoi ils font ça (raison technique) :**
 97: 
 98: - Un Pseudo Effect n’est pas un effet “natif” accessible via un matchName standard (`ADBE ...`). Tant que la définition du Pseudo Effect n’est pas “installée/connue” par AE, `addProperty("Pseudo/... ")` échoue (ou `canAddProperty()` renvoie `false`).
 99: - Un `.ffx` peut encapsuler :
100:   - des effets + paramètres + valeurs par défaut,
101:   - des expressions déjà attachées,
102:   - des contrôles (sliders/checkbox/etc.) et leurs IDs internes (`-0001`, `-0002`, …),
103:   - des structures difficiles à reconstruire proprement via script.
104: 
105: **Faux Parent 1.1** applique aussi des `.ffx`, mais dans un mode “packagé” (pas de BLOB) : les presets sont fournis en fichiers sur disque et référencés via `File($.fileName).path + "/fp_presets/FP_position.ffx"` (idem Scale/Rotation/Opacity), puis `layer.applyPreset(ffxFile)`.
106: 
107: #### Snippet “safe” : écrire un `.ffx` binaire en temp + appliquer
108: 
109: ```jsx
110: function ensureBinaryPresetFile(presetName, presetBinary) {
111:   var presetFolder = Folder(Folder.temp.fsName + "/aescripts_presets");
112:   if (!presetFolder.exists) {
113:     presetFolder.create();
114:   }
115: 
116:   var presetFile = File(presetFolder.fsName + "/" + presetName);
117:   if (!presetFile.exists) {
118:     presetFile.encoding = "BINARY";
119:     if (!presetFile.open("w")) {
120:       throw new Error("Unable to open preset for writing: " + presetFile.fsName);
121:     }
122:     try {
123:       presetFile.write(presetBinary);
124:     } finally {
125:       presetFile.close();
126:     }
127:   }
128:   return presetFile;
129: }
130: 
131: function applyPresetSafely(targetLayer, presetFile) {
132:   if (!targetLayer || !presetFile || !presetFile.exists) {
133:     throw new Error("Invalid layer or preset file.");
134:   }
135: 
136:   var comp = app.project && app.project.activeItem;
137:   if (!comp || !(comp instanceof CompItem)) {
138:     throw new Error("Active comp required.");
139:   }
140: 
141:   var prevSelection = comp.selectedLayers;
142:   for (var i = 0; i < prevSelection.length; i += 1) {
143:     prevSelection[i].selected = false;
144:   }
145: 
146:   targetLayer.selected = true;
147:   targetLayer.applyPreset(presetFile);
148: }
149: ```
150: 
151: Notes :
152: 
153: - **[préférence AE]** nécessite l’autorisation “Scripts may write files…” pour écrire dans `Folder.temp` / `Folder.userData`.
154: - **[cleanup]** certains scripts gardent volontairement le `.ffx` sur disque (cache) pour éviter de réécrire à chaque run.
155: 
156: ### 5.2 Injection d’expressions (construction & quoting)
157: 
158: **Easy Clones** construit ses expressions comme des *templates string* via tableaux + `join("\n")` (`createCloneExpressions`). Le pattern récurrent :
159: 
160: - **[expression multi-lignes]** assemblage stable par `[].join("\n")` (lisible, maintenable, évite les `+` partout).
161: - **[référence au layer contrôle]** injection de `controlLayer.name` dans des fragments comme :
162:   - `thisComp.layer("<CONTROL_LAYER_NAME>").effect("Easy Clones")(13)`
163: - **[accès à des paramètres Pseudo Effect]** ciblage direct via IDs internes :
164:   - `cloneControlEffect.property("Pseudo/cloneControls1.1-0001").expression = ...`
165: - **[random stable par clone]** usage de `seedRandom()`.
166:   - seed global depuis un slider (`effect("Easy Clones")(12)`),
167:   - seed par clone depuis un index dérivé du nom : `parseInt(thisLayer.name.split("-").pop(), 10)`.
168: - **[time remapping / delay]** `valueAtTime(time - (delay - randomDelay))` pour “décaler” les clones dans le temps tout en restant déterministes.
169: - **[2D vs 3D]** tests sur `transform.position.value.length` / `transform.scale.value.length` pour retourner `[x,y]` vs `[x,y,z]`.
170: 
171: **Point d’attention (robustesse) :** dans le code observé, `controlLayer.name` est injecté tel quel entre guillemets. Si un nom de calque contient `"` ou `\`, l’expression générée peut devenir invalide.
172: 
173: #### Snippet : quote robuste pour injecter un nom dans une expression
174: 
175: ```jsx
176: function exprStringLiteral(value) {
177:   var s = String(value);
178:   s = s.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"");
179:   return "\"" + s + "\"";
180: }
181: 
182: // Exemple : 'thisComp.layer(' + exprStringLiteral(controlLayer.name) + ')'
183: ```
184: 
185: ### 5.3 Pseudo Effects : détection & stratégie défensive
186: 
187: **Easy Clones** utilise explicitement des matchNames de type :
188: 
189: - `Pseudo/easyClones1.1`
190: - `Pseudo/cloneControls1.1`
191: 
192: La logique défensive observée :
193: 
194: - **[détection installation]** `layer.property("Effects").canAddProperty("Pseudo/... ")`.
195: - **[si absent]** écrire le `.ffx` (depuis BLOB) puis l’appliquer sur un *null temporaire* pour rendre le Pseudo Effect “disponible”.
196: - **[ensuite]** `effects.addProperty("Pseudo/... ")` sur le layer cible.
197: 
198: Ce pattern évite :
199: 
200: - les crashs/erreurs sur des postes où le Pseudo Effect n’a jamais été chargé,
201: - les dépendances à une installation manuelle de presets.
202: 
203: #### Pattern recommandé (résumé)
204: 
205: ```jsx
206: function ensurePseudoEffectOnLayer(layer, pseudoMatchName, displayName, presetName, presetBinary) {
207:   var effects = layer.property("ADBE Effect Parade");
208: 
209:   if (effects.canAddProperty(pseudoMatchName) === false) {
210:     var presetFile = ensureBinaryPresetFile(presetName, presetBinary);
211: 
212:     // Bootstrap : appliquer 1 fois dans la session pour enregistrer le Pseudo Effect
213:     var comp = app.project.activeItem;
214:     var tmp = comp.layers.addNull();
215:     tmp.selected = true;
216:     tmp.applyPreset(presetFile);
217:     tmp.remove();
218:   }
219: 
220:   var eff = effects.property(pseudoMatchName);
221:   if (!eff) {
222:     eff = effects.addProperty(pseudoMatchName);
223:   }
224:   eff.name = displayName;
225:   return eff;
226: }
227: ```
228: 
229: Différence notable avec **Faux Parent** : le script ne s’appuie pas sur des Pseudo Effects (pas de `Pseudo/...` repéré), mais sur des `.ffx` packagés qui déposent des effets nommés “Faux Parent - Position/Scale/Rotation/Opacity”, puis le script orchestre :
230: 
231: - désactivation temporaire d’expressions (`expressionEnabled = false`) après application du preset,
232: - bake via `Convert Expression to Keyframes` quand l’utilisateur déclenche la synchronisation,
233: - marquage/cleanup par `MarkerValue("FP_S")`.
234: 
235: ---
236: _rapport généré le 2026‑02‑05 à partir du bundle « After Effects Scripts & Plugins »_
````

## File: .windsurf/skills/ae-scripting-expert/assets/basic-script-template.jsx
````javascript
 1: /**
 2:  * Basic After Effects Script Template
 3:  * Use this as starting point for simple scripts
 4:  */
 5: 
 6: (function() {
 7:     
 8:     // Undo group - always wrap operations
 9:     app.beginUndoGroup("Script Action");
10:     
11:     try {
12:         // Basic validation
13:         var comp = app.project.activeItem;
14:         if (!comp || !(comp instanceof CompItem)) {
15:             alert("Please select a composition first.");
16:             return;
17:         }
18:         
19:         // Your main logic here
20:         var selectedLayers = comp.selectedLayers;
21:         if (selectedLayers.length === 0) {
22:             alert("Please select at least one layer.");
23:             return;
24:         }
25:         
26:         // Example: Process each selected layer
27:         for (var i = 0; i < selectedLayers.length; i++) {
28:             var layer = selectedLayers[i];
29:             
30:             // Example operation: add marker
31:             var marker = new MarkerValue("Processed by script");
32:             layer.property("Marker").setValue(marker);
33:             
34:             // Example: log layer info
35:             $.writeln("Processed layer: " + layer.name);
36:         }
37:         
38:         alert("Script completed successfully.");
39:         
40:     } catch(e) {
41:         alert("Error: " + e.toString());
42:     } finally {
43:         app.endUndoGroup();
44:     }
45:     
46: })();
````

## File: .windsurf/skills/ae-scripting-expert/assets/dockable-ui-template.jsx
````javascript
  1: /**
  2:  * Dockable UI Template
  3:  * Complete pattern for ScriptUI panels that work docked or as palette
  4:  */
  5: 
  6: (function() {
  7:     
  8:     // Embedded binary data placeholder
  9:     var ICON_BLOB = "__BLOB__BLOB_ICON_PLACEHOLDER__";
 10:     
 11:     /**
 12:      * Create resource file from binary data
 13:      */
 14:     function createResourceFile(filename, binaryString, resourceFolder) {
 15:         var myFile = new File(resourceFolder + "/" + filename);
 16:         
 17:         if (!myFile.exists) {
 18:             if (!isSecurityPrefSet()) {
 19:                 alert("This script requires access to write files. Enable 'Allow Scripts to Write Files and Access Network' in Preferences.");
 20:                 return null;
 21:             }
 22:             
 23:             myFile.encoding = "BINARY";
 24:             myFile.open("w");
 25:             myFile.write(binaryString);
 26:             myFile.close();
 27:         }
 28:         
 29:         return myFile;
 30:     }
 31:     
 32:     function isSecurityPrefSet() {
 33:         return app.preferences.getPrefAsBool("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY");
 34:     }
 35:     
 36:     function getUserDataFolder() {
 37:         var userData = Folder.userData;
 38:         var scriptData = new Folder(userData.fsName + "/Adobe/ScriptData");
 39:         if (!scriptData.exists) {
 40:             scriptData.create();
 41:         }
 42:         return scriptData.fsName;
 43:     }
 44:     
 45:     /**
 46:      * Create main window (dockable or palette)
 47:      */
 48:     function createMainWindow(thisObj, title) {
 49:         var win = thisObj instanceof Panel 
 50:             ? thisObj 
 51:             : new Window("palette", title, undefined, { resizeable: true });
 52:         
 53:         if (win == null) return null;
 54:         
 55:         // Build UI
 56:         buildUI(win);
 57:         
 58:         // Layout and resize handling
 59:         win.layout.layout(true);
 60:         win.layout.resize();
 61:         win.onResizing = win.onResize = function() {
 62:             win.layout.resize();
 63:         };
 64:         
 65:         // Show only for palette
 66:         if (!(win instanceof Panel)) {
 67:             win.show();
 68:         }
 69:         
 70:         return win;
 71:     }
 72:     
 73:     /**
 74:      * Build the user interface
 75:      */
 76:     function buildUI(win) {
 77:         win.orientation = "column";
 78:         win.spacing = 5;
 79:         win.margins = [10, 10, 10, 10];
 80:         
 81:         // Header with icon
 82:         var headerGroup = win.add("group");
 83:         headerGroup.orientation = "row";
 84:         headerGroup.spacing = 10;
 85:         headerGroup.alignment = ["fill", ""];
 86:         
 87:         // Add icon button if binary data available
 88:         if (ICON_BLOB !== "__BLOB__BLOB_ICON_PLACEHOLDER__") {
 89:             var iconFile = createResourceFile("icon.png", ICON_BLOB, getUserDataFolder());
 90:             if (iconFile) {
 91:                 var iconBtn = headerGroup.add("iconbutton", undefined, ScriptUI.newImage(iconFile), { 
 92:                     style: "toolbutton" 
 93:                 });
 94:                 iconBtn.helpTip = "Script Icon";
 95:             }
 96:         }
 97:         
 98:         var titleText = headerGroup.add("statictext", undefined, "Script Title");
 99:         titleText.characters = 20;
100:         
101:         // Tabbed panel
102:         var tabPanel = win.add("tabbedpanel");
103:         tabPanel.maximumSize = [300, 400];
104:         tabPanel.spacing = 0;
105:         tabPanel.margins = 0;
106:         
107:         // Main tab
108:         var mainTab = tabPanel.add("tab", undefined, "Main");
109:         mainTab.orientation = "column";
110:         mainTab.spacing = 5;
111:         mainTab.margins = [10, 10, 10, 10];
112:         
113:         // Controls section
114:         var controlsGroup = mainTab.add("panel", undefined, "Controls");
115:         controlsGroup.orientation = "column";
116:         controlsGroup.spacing = 5;
117:         controlsGroup.alignment = ["fill", "fill"];
118:         
119:         // Example controls
120:         var sliderGroup = createRowGroup(controlsGroup);
121:         sliderGroup.add("statictext", undefined, "Value:");
122:         var slider = sliderGroup.add("slider", undefined, 50, 0, 100);
123:         slider.alignment = ["fill", ""];
124:         
125:         var valueText = sliderGroup.add("statictext", undefined, "50");
126:         valueText.characters = 5;
127:         
128:         slider.onChanging = function() {
129:             valueText.text = Math.round(this.value);
130:         };
131:         
132:         // Buttons
133:         var buttonGroup = createRowGroup(mainTab);
134:         var applyBtn = buttonGroup.add("button", undefined, "Apply");
135:         var resetBtn = buttonGroup.add("button", undefined, "Reset");
136:         
137:         applyBtn.onClick = function() {
138:             applySettings();
139:         };
140:         
141:         resetBtn.onClick = function() {
142:             resetSettings();
143:         };
144:         
145:         // Settings tab
146:         var settingsTab = tabPanel.add("tab", undefined, "Settings");
147:         settingsTab.orientation = "column";
148:         settingsTab.spacing = 5;
149:         settingsTab.margins = [10, 10, 10, 10];
150:         
151:         var checkboxGroup = settingsTab.add("panel", undefined, "Options");
152:         checkboxGroup.orientation = "column";
153:         checkboxGroup.spacing = 5;
154:         
155:         var option1 = checkboxGroup.add("checkbox", undefined, "Option 1");
156:         var option2 = checkboxGroup.add("checkbox", undefined, "Option 2");
157:         
158:         // Store references
159:         win.controls = {
160:             slider: slider,
161:             valueText: valueText,
162:             option1: option1,
163:             option2: option2
164:         };
165:     }
166:     
167:     function createRowGroup(parent) {
168:         var group = parent.add("group");
169:         group.orientation = "row";
170:         group.spacing = 5;
171:         group.alignment = ["fill", ""];
172:         return group;
173:     }
174:     
175:     /**
176:      * Main functionality
177:      */
178:     function applySettings() {
179:         app.beginUndoGroup("Apply Script Settings");
180:         
181:         try {
182:             var comp = app.project.activeItem;
183:             if (!comp || !(comp instanceof CompItem)) {
184:                 alert("Please select a composition.");
185:                 return;
186:             }
187:             
188:             var selectedLayers = comp.selectedLayers;
189:             if (selectedLayers.length === 0) {
190:                 alert("Please select layers to process.");
191:                 return;
192:             }
193:             
194:             // Process layers with current settings
195:             for (var i = 0; i < selectedLayers.length; i++) {
196:                 var layer = selectedLayers[i];
197:                 processLayer(layer);
198:             }
199:             
200:             alert("Settings applied to " + selectedLayers.length + " layers.");
201:             
202:         } catch(e) {
203:             alert("Error: " + e.toString());
204:         } finally {
205:             app.endUndoGroup();
206:         }
207:     }
208:     
209:     function resetSettings() {
210:         // Reset UI controls to default values
211:         if (this && this.controls) {
212:             this.controls.slider.value = 50;
213:             this.controls.valueText.text = "50";
214:             this.controls.option1.value = false;
215:             this.controls.option2.value = false;
216:         }
217:     }
218:     
219:     function processLayer(layer) {
220:         // Example layer processing
221:         var value = this.controls.slider.value;
222:         
223:         // Add expression or modify properties
224:         if (layer.property("Position")) {
225:             var expr = "value + [" + value + ", " + value + "]";
226:             layer.property("Position").expression = expr;
227:         }
228:     }
229:     
230:     /**
231:      * Main entry point
232:      */
233:     var mainWin = createMainWindow(this, "Dockable UI Template");
234:     
235: })();
````

## File: .windsurf/skills/ae-scripting-expert/assets/shape-layer-template.jsx
````javascript
  1: /**
  2:  * Shape Layer Template
  3:  * Helpers and patterns for programmatic shape layer creation
  4:  */
  5: 
  6: (function() {
  7:     
  8:     app.beginUndoGroup("Shape Layer Operations");
  9:     
 10:     try {
 11:         var comp = app.project.activeItem;
 12:         if (!comp || !(comp instanceof CompItem)) {
 13:             alert("Please select a composition first.");
 14:             return;
 15:         }
 16:         
 17:         // Main shape layer creation
 18:         var shapeLayer = createShapeLayer(comp, "Generated Shape");
 19:         
 20:         // Example: Create multiple shapes
 21:         var rectPath = addRectangle(shapeLayer, 200, 100, [0, 0], "Rectangle");
 22:         var circlePath = addCircle(shapeLayer, 50, [150, 0], "Circle");
 23:         
 24:         // Add styling
 25:         addFill(rectPath, [1, 0, 0, 1], 100, "Rect Fill");
 26:         addStroke(circlePath, 3, [0, 0, 1, 1], 100, "Circle Stroke");
 27:         
 28:         // Add trim animation
 29:         var trim = addTrimPaths(rectPath, 0, 100, 0);
 30:         trim.property("ADBE Vector Trim End").expression = "time * 10;";
 31:         
 32:         alert("Shape layer created successfully!");
 33:         
 34:     } catch(e) {
 35:         alert("Error: " + e.toString());
 36:     } finally {
 37:         app.endUndoGroup();
 38:     }
 39:     
 40:     /**
 41:      * Create a new shape layer
 42:      */
 43:     function createShapeLayer(comp, name) {
 44:         var shapeLayer = comp.layers.addShape();
 45:         shapeLayer.name = name || "Shape Layer";
 46:         shapeLayer.position.setValue([comp.width/2, comp.height/2]);
 47:         return shapeLayer;
 48:     }
 49:     
 50:     /**
 51:      * Create a shape object from vertices
 52:      */
 53:     function createShape(vertices, closed) {
 54:         var shape = new Shape();
 55:         shape.vertices = vertices || [];
 56:         shape.closed = closed !== undefined ? closed : true;
 57:         
 58:         // Initialize tangents (straight lines)
 59:         shape.inTangents = vertices ? vertices.map(function() { return [0, 0]; }) : [];
 60:         shape.outTangents = vertices ? vertices.map(function() { return [0, 0]; }) : [];
 61:         
 62:         return shape;
 63:     }
 64:     
 65:     /**
 66:      * Add a path group to shape layer
 67:      */
 68:     function addPathGroup(shapeLayer, groupName) {
 69:         var contents = shapeLayer.property("ADBE Root Vectors Group");
 70:         var group = contents.addProperty("ADBE Vector Group");
 71:         group.name = groupName || "Path Group";
 72:         
 73:         var vectors = group.property("ADBE Vectors Group");
 74:         var pathGroup = vectors.addProperty("ADBE Vector Shape - Group");
 75:         var path = pathGroup.property("ADBE Vector Shape");
 76:         
 77:         return {
 78:             group: group,
 79:             vectors: vectors,
 80:             pathGroup: pathGroup,
 81:             path: path
 82:         };
 83:     }
 84:     
 85:     /**
 86:      * Add rectangle to shape layer
 87:      */
 88:     function addRectangle(shapeLayer, width, height, position, groupName) {
 89:         var pathData = addPathGroup(shapeLayer, groupName || "Rectangle");
 90:         
 91:         // Create rectangle vertices
 92:         var halfW = width / 2;
 93:         var halfH = height / 2;
 94:         var vertices = [
 95:             [-halfW + (position[0] || 0), -halfH + (position[1] || 0)],
 96:             [halfW + (position[0] || 0), -halfH + (position[1] || 0)],
 97:             [halfW + (position[0] || 0), halfH + (position[1] || 0)],
 98:             [-halfW + (position[0] || 0), halfH + (position[1] || 0)]
 99:         ];
100:         
101:         var rectShape = createShape(vertices, true);
102:         pathData.path.setValue(rectShape);
103:         
104:         return pathData;
105:     }
106:     
107:     /**
108:      * Add circle to shape layer
109:      */
110:     function addCircle(shapeLayer, radius, position, groupName) {
111:         var pathData = addPathGroup(shapeLayer, groupName || "Circle");
112:         
113:         // Create circle vertices
114:         var segments = 32;
115:         var vertices = [];
116:         var angleStep = (2 * Math.PI) / segments;
117:         
118:         for (var i = 0; i < segments; i++) {
119:             var angle = i * angleStep;
120:             vertices.push([
121:                 Math.cos(angle) * radius + (position[0] || 0),
122:                 Math.sin(angle) * radius + (position[1] || 0)
123:             ]);
124:         }
125:         
126:         var circleShape = createShape(vertices, true);
127:         pathData.path.setValue(circleShape);
128:         
129:         return pathData;
130:     }
131:     
132:     /**
133:      * Add custom shape from vertices
134:      */
135:     function addCustomShape(shapeLayer, vertices, closed, groupName) {
136:         var pathData = addPathGroup(shapeLayer, groupName || "Custom Shape");
137:         
138:         var customShape = createShape(vertices, closed);
139:         pathData.path.setValue(customShape);
140:         
141:         return pathData;
142:     }
143:     
144:     /**
145:      * Add fill to path group
146:      */
147:     function addFill(pathData, color, opacity, name) {
148:         var fill = pathData.pathGroup.addProperty("ADBE Vector Graphic - Fill");
149:         
150:         if (color) {
151:             fill.property("ADBE Vector Fill Color").setValue(color);
152:         }
153:         
154:         if (opacity !== undefined) {
155:             fill.property("ADBE Vector Fill Opacity").setValue(opacity);
156:         }
157:         
158:         if (name) {
159:             fill.name = name;
160:         }
161:         
162:         return fill;
163:     }
164:     
165:     /**
166:      * Add stroke to path group
167:      */
168:     function addStroke(pathData, width, color, opacity, name) {
169:         var stroke = pathData.pathGroup.addProperty("ADBE Vector Graphic - Stroke");
170:         
171:         if (width !== undefined) {
172:             stroke.property("ADBE Vector Stroke Width").setValue(width);
173:         }
174:         
175:         if (color) {
176:             stroke.property("ADBE Vector Stroke Color").setValue(color);
177:         }
178:         
179:         if (opacity !== undefined) {
180:             stroke.property("ADBE Vector Stroke Opacity").setValue(opacity);
181:         }
182:         
183:         if (name) {
184:             stroke.name = name;
185:         }
186:         
187:         return stroke;
188:     }
189:     
190:     /**
191:      * Add trim paths to path group
192:      */
193:     function addTrimPaths(pathData, start, end, offset) {
194:         var trim = pathData.pathGroup.addProperty("ADBE Vector Filter - Trim");
195:         
196:         if (start !== undefined) {
197:             trim.property("ADBE Vector Trim Start").setValue(start);
198:         }
199:         
200:         if (end !== undefined) {
201:             trim.property("ADBE Vector Trim End").setValue(end);
202:         }
203:         
204:         if (offset !== undefined) {
205:             trim.property("ADBE Vector Trim Offset").setValue(offset);
206:         }
207:         
208:         return trim;
209:     }
210:     
211:     /**
212:      * Add gradient fill
213:      */
214:     function addGradientFill(pathData, colors, rampType, name) {
215:         var gradientFill = pathData.pathGroup.addProperty("ADBE Vector Graphic - G-Fill");
216:         
217:         if (colors && colors.length >= 2) {
218:             var colorsProp = gradientFill.property("ADBE Vector Grad Colors");
219:             var rampProp = gradientFill.property("ADBE Vector Grad Ramp");
220:             
221:             // Set colors (simplified - real implementation needs more setup)
222:             colorsProp.setValue(colors);
223:             
224:             if (rampType) {
225:                 rampProp.setValue(rampType);
226:             }
227:         }
228:         
229:         if (name) {
230:             gradientFill.name = name;
231:         }
232:         
233:         return gradientFill;
234:     }
235:     
236:     /**
237:      * Transform path group
238:      */
239:     function transformPathGroup(pathData, position, scale, rotation, anchorPoint) {
240:         var transform = pathData.pathGroup.property("ADBE Vector Transform Group");
241:         
242:         if (position) {
243:             transform.property("ADBE Vector Position").setValue(position);
244:         }
245:         
246:         if (scale) {
247:             transform.property("ADBE Vector Scale").setValue(scale);
248:         }
249:         
250:         if (rotation !== undefined) {
251:             transform.property("ADBE Vector Rotation").setValue(rotation);
252:         }
253:         
254:         if (anchorPoint) {
255:             transform.property("ADBE Vector Anchor Point").setValue(anchorPoint);
256:         }
257:         
258:         return transform;
259:     }
260:     
261:     /**
262:      * Get all paths from shape layer (recursive)
263:      */
264:     function getAllPaths(shapeLayer) {
265:         var paths = [];
266:         
267:         function collectPaths(group, transformStack) {
268:             if (!transformStack) transformStack = [];
269:             
270:             // Add current transform to stack
271:             var currentTransform = group.property("ADBE Vector Transform Group");
272:             var newStack = currentTransform ? 
273:                 transformStack.concat([currentTransform]) : 
274:                 transformStack;
275:             
276:             for (var i = 1; i <= group.numProperties; i++) {
277:                 var prop = group.property(i);
278:                 
279:                 if (prop instanceof PropertyGroup) {
280:                     collectPaths(prop, newStack);
281:                 } else if (prop.matchName === "ADBE Vector Shape") {
282:                     paths.push({
283:                         path: prop,
284:                         transforms: newStack
285:                     });
286:                 }
287:             }
288:         }
289:         
290:         var contents = shapeLayer.property("ADBE Root Vectors Group");
291:         collectPaths(contents);
292:         
293:         return paths;
294:     }
295:     
296:     /**
297:      * Convert shape layer to masks on solid layer
298:      */
299:     function shapeLayerToMasks(shapeLayer, targetLayer) {
300:         var paths = getAllPaths(shapeLayer);
301:         var maskParade = targetLayer.property("ADBE Mask Parade");
302:         
303:         for (var i = 0; i < paths.length; i++) {
304:             var pathData = paths[i];
305:             var mask = maskParade.addProperty("ADBE Mask Atom");
306:             
307:             // Copy shape to mask
308:             mask.property("ADBE Mask Shape").setValue(pathData.path.value);
309:             
310:             // Apply transforms (simplified - real implementation needs coordinate conversion)
311:             if (pathData.transforms.length > 0) {
312:                 var firstTransform = pathData.transforms[0];
313:                 var pos = firstTransform.property("ADBE Vector Position").value;
314:                 var anchor = firstTransform.property("ADBE Vector Anchor Point").value;
315:                 
316:                 mask.property("ADBE Mask Offset").setValue([pos[0] - anchor[0], pos[1] - anchor[1]]);
317:             }
318:         }
319:     }
320:     
321:     // Export utility functions for use in other scripts
322:     global.ShapeLayerUtils = {
323:         createShapeLayer: createShapeLayer,
324:         createShape: createShape,
325:         addRectangle: addRectangle,
326:         addCircle: addCircle,
327:         addCustomShape: addCustomShape,
328:         addFill: addFill,
329:         addStroke: addStroke,
330:         addTrimPaths: addTrimPaths,
331:         addGradientFill: addGradientFill,
332:         transformPathGroup: transformPathGroup,
333:         getAllPaths: getAllPaths,
334:         shapeLayerToMasks: shapeLayerToMasks
335:     };
336:     
337: })();
````

## File: .windsurf/skills/ae-scripting-expert/references/hacks-and-internals.md
````markdown
  1: # Hacks & Advanced Internals
  2: 
  3: ## Expression Injection
  4: 
  5: ### Safe String Escaping for Expressions
  6: 
  7: When injecting layer names or values into expressions, always escape properly:
  8: 
  9: ```jsx
 10: function escapeExpressionString(str) {
 11:     return String(str)
 12:         .replace(/\\/g, "\\\\")   // Escape backslashes
 13:         .replace(/\"/g, "\\\"")   // Escape double quotes
 14:         .replace(/\'/g, "\\\'")   // Escape single quotes
 15:         .replace(/\n/g, "\\n")    // Escape newlines
 16:         .replace(/\r/g, "\\r");   // Escape carriage returns
 17: }
 18: 
 19: function buildLayerReferenceExpression(layerName, propertyName) {
 20:     var safeLayerName = escapeExpressionString(layerName);
 21:     var safePropertyName = escapeExpressionString(propertyName);
 22:     
 23:     return [
 24:         "var ctrl = thisComp.layer(\"" + safeLayerName + "\");",
 25:         "if (ctrl) {",
 26:         "    ctrl.effect(\"Easy Clones\")(\"" + safePropertyName + "\");",
 27:         "} else {",
 28:         "    0;",
 29:         "}"
 30:     ].join("\n");
 31: }
 32: 
 33: // Usage
 34: var controlLayer = app.project.activeItem.layer("Control");
 35: var expr = buildLayerReferenceExpression(controlLayer.name, "Clone Delay");
 36: someProperty.expression = expr;
 37: ```
 38: 
 39: ### Multi-line Expression Builder
 40: 
 41: ```jsx
 42: function createCloneExpression(controlLayer, cloneIndex) {
 43:     var safeLayerName = escapeExpressionString(controlLayer.name);
 44:     
 45:     var expressionLines = [
 46:         "var ctrl = thisComp.layer(\"" + safeLayerName + "\");",
 47:         "if (!ctrl) { value; }",
 48:         "",
 49:         "// Clone-specific parameters",
 50:         "var cloneIndex = " + cloneIndex + ";",
 51:         "var baseDelay = ctrl.effect(\"Easy Clones\")(12);", // Delay slider
 52:         "var randomDelay = ctrl.effect(\"Easy Clones\")(13);", // Random delay
 53:         "var seed = ctrl.effect(\"Easy Clones\")(14);", // Seed
 54:         "",
 55:         "// Stable random per clone",
 56:         "seedRandom(seed + cloneIndex, true);",
 57:         "var delay = baseDelay + (randomDelay * random());",
 58:         "",
 59:         "// Time remapping with delay",
 60:         "valueAtTime(time - delay);"
 61:     ];
 62:     
 63:     return expressionLines.join("\n");
 64: }
 65: ```
 66: 
 67: ### Expression Template System
 68: 
 69: ```jsx
 70: var expressionTemplates = {
 71:     positionFollow: [
 72:         "var target = thisComp.layer(\"{LAYER_NAME}\");",
 73:         "if (target) {",
 74:         "    var offset = [{X_OFFSET}, {Y_OFFSET}];",
 75:         "    target.position + offset;",
 76:         "} else {",
 77:         "    value;",
 78:         "}"
 79:     ].join("\n"),
 80:     
 81:     randomRotation: [
 82:         "seedRandom({SEED}, true);",
 83:         "var minRot = {MIN_ROTATION};",
 84:         "var maxRot = {MAX_ROTATION};",
 85:         "linear(random(), minRot, maxRot);"
 86:     ].join("\n")
 87: };
 88: 
 89: function fillTemplate(template, replacements) {
 90:     var result = template;
 91:     for (var key in replacements) {
 92:         var pattern = new RegExp("\\{" + key + "\\}", "g");
 93:         result = result.replace(pattern, escapeExpressionString(replacements[key]));
 94:     }
 95:     return result;
 96: }
 97: ```
 98: 
 99: ## Binary Preset Management
100: 
101: ### Binary File Writing Pattern
102: 
103: ```jsx
104: function writeBinaryPreset(presetName, binaryData) {
105:     var tempFolder = Folder.temp.fsName + "/ae_presets";
106:     var presetFolder = new Folder(tempFolder);
107:     
108:     // Create folder if needed
109:     if (!presetFolder.exists) {
110:         presetFolder.create();
111:         if (!presetFolder.exists) {
112:             throw new Error("Cannot create preset folder: " + tempFolder);
113:         }
114:     }
115:     
116:     var presetFile = new File(presetFolder.fsName + "/" + presetName);
117:     
118:     // Write binary data
119:     presetFile.encoding = "BINARY";
120:     if (!presetFile.open("w")) {
121:         throw new Error("Cannot open preset file for writing: " + presetFile.fsName);
122:     }
123:     
124:     try {
125:         presetFile.write(binaryData);
126:     } finally {
127:         presetFile.close();
128:     }
129:     
130:     return presetFile;
131: }
132: ```
133: 
134: ### Pseudo-Effect Bootstrapping
135: 
136: ```jsx
137: function ensurePseudoEffectAvailable(matchName, presetName, binaryData) {
138:     // Check if pseudo-effect is already available
139:     var comp = app.project.activeItem;
140:     if (!comp) return false;
141:     
142:     var testLayer = comp.layers.addNull();
143:     var effects = testLayer.property("ADBE Effect Parade");
144:     
145:     var isAvailable = effects.canAddProperty(matchName);
146:     
147:     if (!isAvailable) {
148:         // Bootstrap: apply preset to temporary layer
149:         var presetFile = writeBinaryPreset(presetName, binaryData);
150:         
151:         testLayer.selected = true;
152:         testLayer.applyPreset(presetFile);
153:         
154:         // Now the pseudo-effect should be available
155:         isAvailable = effects.canAddProperty(matchName);
156:     }
157:     
158:     // Clean up
159:     testLayer.remove();
160:     
161:     return isAvailable;
162: }
163: 
164: function addPseudoEffectToLayer(layer, matchName, displayName, presetName, binaryData) {
165:     if (!ensurePseudoEffectAvailable(matchName, presetName, binaryData)) {
166:         throw new Error("Failed to make pseudo-effect available: " + matchName);
167:     }
168:     
169:     var effects = layer.property("ADBE Effect Parade");
170:     var effect = effects.addProperty(matchName);
171:     
172:     if (displayName) {
173:         effect.name = displayName;
174:     }
175:     
176:     return effect;
177: }
178: ```
179: 
180: ### Preset Caching Strategy
181: 
182: ```jsx
183: var presetCache = {};
184: 
185: function getCachedPreset(presetName, binaryData) {
186:     if (presetCache[presetName]) {
187:         var cachedFile = new File(presetCache[presetName]);
188:         if (cachedFile.exists) {
189:             return cachedFile;
190:         }
191:     }
192:     
193:     // Create new cached preset
194:     var presetFile = writeBinaryPreset(presetName, binaryData);
195:     presetCache[presetName] = presetFile.fsName;
196:     
197:     return presetFile;
198: }
199: ```
200: 
201: ## Hidden MatchNames Reference
202: 
203: ### Undocumented Effect Parameter MatchNames
204: 
205: | MatchName | Context | Usage Count | Description |
206: |-----------|---------|-------------|-------------|
207: | `ADBE Slider Control-0001` | Slider Control value | 885+ | Direct access to slider value |
208: | `ADBE Color Control-0001` | Color Control value | 344+ | Direct access to color value |
209: | `ADBE Point Control-0001` | Point Control value | 105+ | Direct access to point value |
210: | `ADBE Layer Control-0001` | Layer Control selection | 142+ | Direct access to layer picker |
211: | `ADBE Checkbox Control-0001` | Checkbox Control state | 72+ | Direct access to checkbox value |
212: | `ADBE Angle Control-0001` | Angle Control value | 45+ | Direct access to angle value |
213: 
214: ### Custom Effect MatchNames
215: 
216: | MatchName | Source | Purpose |
217: |-----------|--------|---------|
218: | `ADBE easyRulers` | easyRulers script | Custom rulers effect |
219: | `ADBE easyRulers-0032` | easyRulers script | Parameter 32 |
220: | `ADBE easyRulers-0034` | easyRulers script | Parameter 34 |
221: | `ADBE easyRulers-0035` | easyRulers script | Parameter 35 |
222: 
223: ### 3D Material Property MatchNames
224: 
225: | MatchName | UI Label | Context |
226: |-----------|----------|---------|
227: | `ADBE Accepts Lights` | Accepts Lights | 3D material options |
228: | `ADBE Accepts Shadows` | Accepts Shadows | 3D material options |
229: | `ADBE Ambient` | Ambient | 3D material options |
230: | `ADBE Diffuse` | Diffuse | 3D material options |
231: | `ADBE Specular` | Specular | 3D material options |
232: | `ADBE Shininess` | Shininess | 3D material options |
233: 
234: ### Mask-Related MatchNames
235: 
236: | MatchName | Purpose | Usage |
237: |-----------|---------|-------|
238: | `ADBE Mask Shape` | Mask path vertices | Direct mask shape access |
239: | `ADBE Mask Offset` | Mask position | Mask transform |
240: | `ADBE Mask Feather` | Mask feather | Mask properties |
241: | `ADBE Mask Opacity` | Mask opacity | Mask properties |
242: | `ADBE Mask Expansion` | Mask expansion | Mask properties |
243: 
244: ### Vector Shape Variants
245: 
246: | MatchName | Shape Type | When to Use |
247: |-----------|------------|-------------|
248: | `ADBE Vector Shape - Rect` | Rectangle | Quick rectangle creation |
249: | `ADBE Vector Shape - Ellipse` | Ellipse | Quick ellipse creation |
250: | `ADBE Vector Shape - Star` | Star | Quick star creation |
251: | `ADBE Vector Shape - Group` | Custom path | For custom Shape objects |
252: 
253: ## Advanced Expression Patterns
254: 
255: ### Time-Based Animation with Seeds
256: 
257: ```jsx
258: function createSeededAnimationExpression(seed, frequency, amplitude) {
259:     return [
260:         "seedRandom(" + seed + ", true);",
261:         "var t = time * " + frequency + ";",
262:         "var noise = random() * 2 - 1;",
263:         "value + (noise * " + amplitude + ");"
264:     ].join("\n");
265: }
266: ```
267: 
268: ### Conditional Logic in Expressions
269: 
270: ```jsx
271: function createConditionalExpression(conditionLayer, trueValue, falseValue) {
272:     var safeLayerName = escapeExpressionString(conditionLayer.name);
273:     
274:     return [
275:         "var cond = thisComp.layer(\"" + safeLayerName + "\");",
276:         "if (cond && cond.effect(\"Toggle\")(1) == 1) {",
277:         "    " + trueValue + ";",
278:         "} else {",
279:         "    " + falseValue + ";",
280:         "}"
281:     ].join("\n");
282: }
283: ```
284: 
285: ### Expression Error Handling
286: 
287: ```jsx
288: function createSafeExpression(expression, fallback) {
289:     return [
290:         "try {",
291:         "    " + expression,
292:         "} catch(e) {",
293:         "    // Expression error: " + escapeExpressionString(expression),
294:         "    " + fallback,
295:         "}"
296:     ].join("\n");
297: }
298: ```
299: 
300: ## Production-Grade Patterns
301: 
302: ### Effect Parameter Access
303: 
304: ```jsx
305: function getEffectParameter(layer, effectName, parameterIndex) {
306:     var effect = layer.effect(effectName);
307:     if (!effect) return null;
308:     
309:     // Try direct matchName first (faster)
310:     var directMatch = effect.property("ADBE " + effectName + "-" + 
311:         String(parameterIndex - 1).padStart(4, "0"));
312:     if (directMatch) return directMatch;
313:     
314:     // Fallback to indexed access
315:     return effect.property(parameterIndex);
316: }
317: 
318: function setEffectParameter(layer, effectName, parameterIndex, value) {
319:     var param = getEffectParameter(layer, effectName, parameterIndex);
320:     if (param) {
321:         param.setValue(value);
322:         return true;
323:     }
324:     return false;
325: }
326: ```
327: 
328: ### Property Discovery
329: 
330: ```jsx
331: function discoverEffectParameters(effect) {
332:     var params = [];
333:     for (var i = 1; i <= effect.numProperties; i++) {
334:         var prop = effect.property(i);
335:         params.push({
336:             index: i,
337:             name: prop.name,
338:             matchName: prop.matchName,
339:             value: prop.value,
340:             canSetExpression: prop.canSetExpression
341:         });
342:     }
343:     return params;
344: }
345: ```
346: 
347: ### Binary Data Utilities
348: 
349: ```jsx
350: function stringToBinary(str) {
351:     var result = "";
352:     for (var i = 0; i < str.length; i++) {
353:         var hex = str.charCodeAt(i).toString(16);
354:         result += "\\x" + (hex.length === 1 ? "0" + hex : hex);
355:     }
356:     return result;
357: }
358: 
359: function isValidBinaryData(data) {
360:     // Check if data looks like binary blob
361:     return typeof data === "string" && 
362:            data.length > 100 && 
363:            data.indexOf("__BLOB__") === 0;
364: }
365: ```
366: 
367: ## Security & Compatibility
368: 
369: ### Permission Checking
370: 
371: ```jsx
372: function checkScriptPermissions() {
373:     var prefs = [
374:         "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
375:         "Pref_SCRIPTING_FILE_NETWORK_SECURITY"
376:     ];
377:     
378:     for (var i = 0; i < prefs.length; i++) {
379:         if (!app.preferences.getPrefAsBool("Main Pref Section", prefs[i])) {
380:             return false;
381:         }
382:     }
383:     return true;
384: }
385: 
386: function requestPermissions() {
387:     try {
388:         app.executeCommand(2359); // Open preferences
389:         alert("Please enable 'Allow Scripts to Write Files and Access Network' in Preferences");
390:     } catch(e) {
391:         alert("Cannot open preferences. Please manually enable script permissions.");
392:     }
393: }
394: ```
395: 
396: ### Version-Specific Compatibility
397: 
398: ```jsx
399: function getAEMajorVersion() {
400:     return parseFloat(app.version.split('.')[0]);
401: }
402: 
403: function isFeatureSupported(featureName) {
404:     var version = getAEMajorVersion();
405:     var features = {
406:         'modernExpressions': version >= 13,
407:         'enhancedShapeLayers': version >= 15,
408:         'advanced3D': version >= 16,
409:         'multiFrameRendering': version >= 22
410:     };
411:     
412:     return features[featureName] || false;
413: }
````

## File: .windsurf/skills/ae-scripting-expert/references/ui-layout.md
````markdown
  1: # UI Layout & ScriptUI Production Patterns
  2: 
  3: ## Dockable Panel Pattern
  4: 
  5: ### Complete Window/Panel Detection
  6: 
  7: Always use this exact pattern for dockable compatibility:
  8: 
  9: ```jsx
 10: function createMainWindow(thisObj, title) {
 11:     var win = thisObj instanceof Panel 
 12:         ? thisObj 
 13:         : new Window("palette", title, undefined, { resizeable: true });
 14:     
 15:     if (win == null) return null;
 16:     
 17:     // Build UI here...
 18:     
 19:     // Layout and resize handling
 20:     win.layout.layout(true);
 21:     win.layout.resize();
 22:     win.onResizing = win.onResize = function() {
 23:         win.layout.resize();
 24:     };
 25:     
 26:     // Show only for palette, not panel
 27:     if (!(win instanceof Panel)) {
 28:         win.show();
 29:     }
 30:     
 31:     return win;
 32: }
 33: 
 34: // Usage
 35: var mainWin = createMainWindow(this, "My Script");
 36: ```
 37: 
 38: ## Binary Asset Management
 39: 
 40: ### Resource File Creation
 41: 
 42: Use this pattern to convert embedded blobs to temporary files:
 43: 
 44: ```jsx
 45: function createResourceFile(filename, binaryString, resourceFolder) {
 46:     var myFile = new File(resourceFolder + "/" + filename);
 47:     
 48:     // Write only if file doesn't exist
 49:     if (!myFile.exists) {
 50:         // Check security preferences first
 51:         if (!isSecurityPrefSet()) {
 52:             alert("This script requires access to write files. Go to the General panel of the application preferences and make sure 'Allow Scripts to Write Files and Access Network' is checked.");
 53:             try {
 54:                 app.executeCommand(2359); // Open preferences
 55:             } catch (e) {
 56:                 // User cancelled
 57:             }
 58:             if (!isSecurityPrefSet()) {
 59:                 return null;
 60:             }
 61:         }
 62:         
 63:         myFile.encoding = "BINARY";
 64:         myFile.open("w");
 65:         myFile.write(binaryString);
 66:         myFile.close();
 67:     }
 68:     
 69:     return myFile;
 70: }
 71: 
 72: function isSecurityPrefSet() {
 73:     return app.preferences.getPrefAsBool("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY");
 74: }
 75: 
 76: function getUserDataFolder() {
 77:     var userData = Folder.userData;
 78:     var scriptData = new Folder(userData.fsName + "/Adobe/ScriptData");
 79:     if (!scriptData.exists) {
 80:         scriptData.create();
 81:     }
 82:     return scriptData.fsName;
 83: }
 84: ```
 85: 
 86: ### Icon Button Implementation
 87: 
 88: ```jsx
 89: function createIconButton(parent, iconBlob, iconName, tooltip, clickHandler) {
 90:     var iconFile = createResourceFile(iconName + ".png", iconBlob, getUserDataFolder());
 91:     
 92:     var btn = parent.add("iconbutton", undefined, ScriptUI.newImage(iconFile), { 
 93:         style: "toolbutton" 
 94:     });
 95:     
 96:     if (tooltip) btn.helpTip = tooltip;
 97:     if (clickHandler) btn.onClick = clickHandler;
 98:     
 99:     return btn;
100: }
101: ```
102: 
103: ## Resilient Layout Structure
104: 
105: ### Column + Row Pattern
106: 
107: Use this hierarchy for stable layouts:
108: 
109: ```jsx
110: // Root container
111: win.orientation = "column";
112: win.spacing = 0;
113: win.margins = [10, 10, 10, 10];
114: 
115: // Tabbed panel (if needed)
116: var tabPanel = win.add("tabbedpanel");
117: tabPanel.maximumSize = [300, 600];
118: tabPanel.spacing = 0;
119: tabPanel.margins = 0;
120: 
121: var tab = tabPanel.add("tab", undefined, "Main Tab");
122: tab.orientation = "column";
123: tab.spacing = 5;
124: tab.margins = [10, 10, 10, 10];
125: 
126: // Row groups for controls
127: function createRowGroup(parent) {
128:     var group = parent.add("group");
129:     group.orientation = "row";
130:     group.spacing = 5;
131:     group.alignment = ["fill", ""];
132:     return group;
133: }
134: 
135: // Column groups for vertical sections
136: function createColumnGroup(parent) {
137:     var group = parent.add("group");
138:     group.orientation = "column";
139:     group.spacing = 5;
140:     group.alignment = ["fill", "fill"];
141:     return group;
142: }
143: ```
144: 
145: ### Version-Specific Sizing
146: 
147: ```jsx
148: var version = parseFloat(app.version);
149: 
150: // Handle different AE versions
151: if (version < 12) {
152:     tabPanel.minimumSize = [260, "fill"];
153:     tab.margins = [8, 8, 8, 8];
154: } else {
155:     tabPanel.minimumSize = [280, "fill"];
156:     tab.margins = [10, 8, 0, 0];
157: }
158: ```
159: 
160: ## Critical UI Properties to Avoid
161: 
162: ### Properties That Cause Crashes
163: 
164: **NEVER use these properties:**
165: 
166: - `preferredSize` - Causes crashes in many AE versions
167: - `size` on containers - Use `minimumSize`/`maximumSize` instead
168: - `text` on non-text widgets - Only use on `edittext`, `statictext`
169: - `enabled = false` on panels - Use on individual controls only
170: 
171: **SAFE alternatives:**
172: 
173: ```jsx
174: // GOOD: Use minimumSize/maximumSize
175: control.minimumSize = [100, 20];
176: control.maximumSize = [200, 20];
177: 
178: // BAD: Avoid preferredSize
179: // control.preferredSize = [100, 20]; // CRASH RISK
180: 
181: // GOOD: Use alignment for layout
182: group.alignment = ["fill", "fill"];
183: 
184: // BAD: Direct size manipulation
185: // group.size = [200, 100]; // UNRELIABLE
186: ```
187: 
188: ### Safe Property Patterns
189: 
190: ```jsx
191: // Text controls
192: var editText = parent.add("edittext", undefined, "default text");
193: editText.characters = 20;  // Width in characters
194: editText.active = true;     // Focus state
195: 
196: // Buttons
197: var btn = parent.add("button", undefined, "Click Me");
198: btn.alignment = ["center", ""];  // Center horizontally
199: 
200: // Groups
201: var group = parent.add("group");
202: group.orientation = "row";
203: group.alignment = ["fill", ""];   // Fill width, natural height
204: group.spacing = 5;
205: group.margins = [0, 0, 0, 0];
206: ```
207: 
208: ## Advanced UI Patterns
209: 
210: ### Toggle Button Groups
211: 
212: ```jsx
213: function createToggleGroup(parent, items, selectedIndex) {
214:     var group = createRowGroup(parent);
215:     var buttons = [];
216:     
217:     for (var i = 0; i < items.length; i++) {
218:         var btn = group.add("button", undefined, items[i]);
219:         btn.value = (i === selectedIndex);
220:         
221:         btn.onClick = function() {
222:             // Clear all buttons
223:             for (var j = 0; j < buttons.length; j++) {
224:                 buttons[j].value = false;
225:             }
226:             // Set clicked button
227:             this.value = true;
228:         };
229:         
230:         buttons.push(btn);
231:     }
232:     
233:     return buttons;
234: }
235: ```
236: 
237: ### Progress Indicators
238: 
239: ```jsx
240: function createProgressBar(parent, width, height) {
241:     var group = createRowGroup(parent);
242:     
243:     var progressBg = group.add("panel", undefined, "");
244:     progressBg.minimumSize = [width, height];
245:     progressBg.maximumSize = [width, height];
246:     
247:     var progressFg = progressBg.add("panel", undefined, "");
248:     progressFg.minimumSize = [1, height - 4];
249:     progressFg.maximumSize = [width - 4, height - 4];
250:     progressFg.alignment = ["left", "center"];
251:     progressFg.margins = [2, 2, 2, 2];
252:     
253:     return {
254:         container: progressBg,
255:         bar: progressFg,
256:         setProgress: function(percent) {
257:             var maxWidth = width - 4;
258:             this.bar.minimumSize = [Math.floor(maxWidth * percent / 100), height - 4];
259:             this.bar.maximumSize = [Math.floor(maxWidth * percent / 100), height - 4];
260:         }
261:     };
262: }
263: ```
264: 
265: ## Version Compatibility Matrix
266: 
267: | AE Version | UI Limitations | Recommended Patterns |
268: |-----------|----------------|-------------------|
269: | < 12.0 | No `iconbutton` direct blobs | Use `loadImage` fallback |
270: | 12.0-13.0 | Limited `tabbedpanel` sizing | Set explicit `minimumSize` |
271: | 13.0+ | Full modern UI support | Use all patterns |
272: | 22.0+ | Enhanced resize handling | Use `onResizing` + `onResize` |
273: 
274: ## Common UI Gotchas
275: 
276: ### Event Handler Scope
277: 
278: ```jsx
279: // WRONG: 'this' is window object, not button
280: btn.onClick = function() {
281:     alert(this.text); // undefined
282: };
283: 
284: // RIGHT: Use button reference directly
285: btn.onClick = function() {
286:     alert(btn.text); // works
287: };
288: ```
289: 
290: ### Layout Refresh
291: 
292: Always call layout refresh after dynamic changes:
293: 
294: ```jsx
295: function updateUI() {
296:     // Make changes to UI elements
297:     someText.text = "Updated";
298:     someGroup.visible = false;
299:     
300:     // Refresh layout
301:     win.layout.layout(true);
302:     win.layout.resize();
303: }
304: ```
````

## File: .windsurf/skills/ae-scripting-expert/references/vector-shapes.md
````markdown
  1: # Vector Shapes & Shape Layer Architecture
  2: 
  3: ## The Infernal Hierarchy
  4: 
  5: ### Complete Shape Layer Structure
  6: 
  7: Shape layers follow this exact hierarchy. Navigate it carefully:
  8: 
  9: ```text
 10: ShapeLayer
 11: └─ "ADBE Root Vectors Group"           // Contents (root)
 12:    └─ "ADBE Vector Group"              // Group (optional)
 13:       └─ "ADBE Vectors Group"          // Contents (of group)
 14:          ├─ "ADBE Vector Shape - Group" // Path group
 15:          │  └─ "ADBE Vector Shape"      // Path (Shape object)
 16:          ├─ "ADBE Vector Graphic - Fill" // Fill
 17:          │  └─ "ADBE Vector Fill Color" // Color property
 18:          ├─ "ADBE Vector Graphic - Stroke" // Stroke
 19:          │  ├─ "ADBE Vector Stroke Width" // Width property
 20:          │  └─ "ADBE Vector Stroke Color" // Color property
 21:          └─ "ADBE Vector Filter - Trim"   // Trim Paths
 22:             └─ "ADBE Vector Trim End"    // End property
 23: ```
 24: 
 25: ### Navigation Pattern
 26: 
 27: Always start from the root and work down:
 28: 
 29: ```jsx
 30: function getShapeLayerContents(shapeLayer) {
 31:     return shapeLayer.property("ADBE Root Vectors Group");
 32: }
 33: 
 34: function addShapeGroup(contents) {
 35:     var group = contents.addProperty("ADBE Vector Group");
 36:     return group.property("ADBE Vectors Group");
 37: }
 38: 
 39: function addPathToGroup(vectorsGroup) {
 40:     var pathGroup = vectorsGroup.addProperty("ADBE Vector Shape - Group");
 41:     return pathGroup.property("ADBE Vector Shape");
 42: }
 43: ```
 44: 
 45: ## Shape Object Structure
 46: 
 47: ### Complete Shape() Definition
 48: 
 49: ```jsx
 50: function createShape(vertices, closed) {
 51:     var shape = new Shape();
 52:     
 53:     // Required: vertices array of [x, y] coordinates
 54:     shape.vertices = vertices || [];
 55:     
 56:     // Required: closed path boolean
 57:     shape.closed = closed !== undefined ? closed : true;
 58:     
 59:     // Optional: tangents for curves (same length as vertices)
 60:     // Default is [[0,0], [0,0], ...] for straight lines
 61:     shape.inTangents = vertices ? vertices.map(function() { return [0, 0]; }) : [];
 62:     shape.outTangents = vertices ? vertices.map(function() { return [0, 0]; }) : [];
 63:     
 64:     return shape;
 65: }
 66: ```
 67: 
 68: ### Shape Creation Examples
 69: 
 70: ```jsx
 71: // Rectangle
 72: function createRectangle(width, height) {
 73:     var halfW = width / 2;
 74:     var halfH = height / 2;
 75:     var vertices = [
 76:         [-halfW, -halfH],  // Top-left
 77:         [halfW, -halfH],   // Top-right
 78:         [halfW, halfH],    // Bottom-right
 79:         [-halfW, halfH]    // Bottom-left
 80:     ];
 81:     return createShape(vertices, true);
 82: }
 83: 
 84: // Circle approximation
 85: function createCircle(radius, segments) {
 86:     segments = segments || 32;
 87:     var vertices = [];
 88:     var angleStep = (2 * Math.PI) / segments;
 89:     
 90:     for (var i = 0; i < segments; i++) {
 91:         var angle = i * angleStep;
 92:         vertices.push([
 93:             Math.cos(angle) * radius,
 94:             Math.sin(angle) * radius
 95:         ]);
 96:     }
 97:     
 98:     return createShape(vertices, true);
 99: }
100: 
101: // Bezier curve shape
102: function createBezierCurve(start, cp1, cp2, end) {
103:     var shape = new Shape();
104:     shape.vertices = [start, end];
105:     shape.closed = false;
106:     shape.inTangents = [[0, 0], cp2];
107:     shape.outTangents = [cp1, [0, 0]];
108:     return shape;
109: }
110: ```
111: 
112: ## Critical MatchNames
113: 
114: ### Essential Shape Layer MatchNames
115: 
116: | MatchName | Purpose | Usage |
117: |-----------|---------|-------|
118: | `ADBE Root Vectors Group` | Contents root | `layer.property("ADBE Root Vectors Group")` |
119: | `ADBE Vector Group` | Group container | `contents.addProperty("ADBE Vector Group")` |
120: | `ADBE Vectors Group` | Group contents | `group.property("ADBE Vectors Group")` |
121: | `ADBE Vector Shape - Group` | Path group | `vectors.addProperty("ADBE Vector Shape - Group")` |
122: | `ADBE Vector Shape` | Path property | `pathGroup.property("ADBE Vector Shape")` |
123: | `ADBE Vector Shape - Rect` | Rectangle path | `vectors.addProperty("ADBE Vector Shape - Rect")` |
124: | `ADBE Vector Shape - Ellipse` | Ellipse path | `vectors.addProperty("ADBE Vector Shape - Ellipse")` |
125: | `ADBE Vector Shape - Star` | Star path | `vectors.addProperty("ADBE Vector Shape - Star")` |
126: | `ADBE Vector Graphic - Fill` | Fill effect | `vectors.addProperty("ADBE Vector Graphic - Fill")` |
127: | `ADBE Vector Fill Color` | Fill color | `fill.property("ADBE Vector Fill Color")` |
128: | `ADBE Vector Graphic - Stroke` | Stroke effect | `vectors.addProperty("ADBE Vector Graphic - Stroke")` |
129: | `ADBE Vector Stroke Width` | Stroke width | `stroke.property("ADBE Vector Stroke Width")` |
130: | `ADBE Vector Stroke Color` | Stroke color | `stroke.property("ADBE Vector Stroke Color")` |
131: | `ADBE Vector Filter - Trim` | Trim Paths | `vectors.addProperty("ADBE Vector Filter - Trim")` |
132: | `ADBE Vector Trim End` | Trim end property | `trim.property("ADBE Vector Trim End")` |
133: | `ADBE Vector Trim Start` | Trim start property | `trim.property("ADBE Vector Trim Start")` |
134: | `ADBE Vector Trim Offset` | Trim offset | `trim.property("ADBE Vector Trim Offset")` |
135: | `ADBE Vector Transform Group` | Transform group | `pathGroup.property("ADBE Vector Transform Group")` |
136: | `ADBE Vector Position` | Position | `transform.property("ADBE Vector Position")` |
137: | `ADBE Vector Scale` | Scale | `transform.property("ADBE Vector Scale")` |
138: | `ADBE Vector Rotation` | Rotation | `transform.property("ADBE Vector Rotation")` |
139: | `ADBE Vector Anchor Point` | Anchor point | `transform.property("ADBE Vector Anchor Point")` |
140: 
141: ### Hidden MatchNames (From Field Analysis)
142: 
143: These are frequently used but not well documented:
144: 
145: | MatchName | Context | Why Important |
146: |-----------|---------|----------------|
147: | `ADBE Mask Shape` | Mask vertices | Direct access to mask path data |
148: | `ADBE Mask Atom` | Mask container | Individual mask creation |
149: | `ADBE Mask Parade` | Masks group | Root mask container |
150: | `ADBE Layer Control-0001` | Layer picker | Parameter in pseudo-effects |
151: | `ADBE Slider Control-0001` | Slider value | Direct parameter access |
152: | `ADBE Color Control-0001` | Color value | Direct parameter access |
153: 
154: ## Shape Creation Patterns
155: 
156: ### Basic Shape Layer Creation
157: 
158: ```jsx
159: function createShapeLayer(comp, name) {
160:     var shapeLayer = comp.layers.addShape();
161:     shapeLayer.name = name;
162:     shapeLayer.position.setValue([comp.width/2, comp.height/2]);
163:     return shapeLayer;
164: }
165: 
166: function addPathToShapeLayer(shapeLayer, shapeObj, groupName) {
167:     var contents = shapeLayer.property("ADBE Root Vectors Group");
168:     var group = contents.addProperty("ADBE Vector Group");
169:     group.name = groupName || "Path Group";
170:     
171:     var vectors = group.property("ADBE Vectors Group");
172:     var pathGroup = vectors.addProperty("ADBE Vector Shape - Group");
173:     var path = pathGroup.property("ADBE Vector Shape");
174:     
175:     path.setValue(shapeObj);
176:     
177:     return {
178:         group: group,
179:         vectors: vectors,
180:         pathGroup: pathGroup,
181:         path: path
182:     };
183: }
184: ```
185: 
186: ### Adding Fill and Stroke
187: 
188: ```jsx
189: function addFill(pathGroup, color, opacity, name) {
190:     var fill = pathGroup.addProperty("ADBE Vector Graphic - Fill");
191:     fill.property("ADBE Vector Fill Color").setValue(color || [1, 1, 1]);
192:     if (opacity !== undefined) {
193:         fill.property("ADBE Vector Fill Opacity").setValue(opacity);
194:     }
195:     if (name) fill.name = name;
196:     return fill;
197: }
198: 
199: function addStroke(pathGroup, width, color, opacity, name) {
200:     var stroke = pathGroup.addProperty("ADBE Vector Graphic - Stroke");
201:     stroke.property("ADBE Vector Stroke Width").setValue(width || 1);
202:     stroke.property("ADBE Vector Stroke Color").setValue(color || [0, 0, 0]);
203:     if (opacity !== undefined) {
204:         stroke.property("ADBE Vector Stroke Opacity").setValue(opacity);
205:     }
206:     if (name) stroke.name = name;
207:     return stroke;
208: }
209: 
210: function addTrimPaths(pathGroup, start, end, offset) {
211:     var trim = pathGroup.addProperty("ADBE Vector Filter - Trim");
212:     if (start !== undefined) trim.property("ADBE Vector Trim Start").setValue(start);
213:     if (end !== undefined) trim.property("ADBE Vector Trim End").setValue(end);
214:     if (offset !== undefined) trim.property("ADBE Vector Trim Offset").setValue(offset);
215:     return trim;
216: }
217: ```
218: 
219: ## Coordinate System Warning
220: 
221: ### ⚠️ Critical: Layer vs Composition Space
222: 
223: **Shape vertices are ALWAYS in layer space, not composition space!**
224: 
225: ```jsx
226: // WRONG: This creates a shape at comp coordinates
227: var comp = app.project.activeItem;
228: var shape = createShape([100, 100], true); // This is layer space
229: 
230: // RIGHT: Convert comp coordinates to layer space
231: function compToLayerSpace(compPoint, layer) {
232:     var layerPos = layer.position.value;
233:     var layerAnchor = layer.anchorPoint.value;
234:     var layerScale = layer.scale.value;
235:     
236:     // Convert to percentage scale
237:     var scaleX = layerScale[0] / 100;
238:     var scaleY = layerScale[1] / 100;
239:     
240:     // Apply inverse transform
241:     var localX = (compPoint[0] - layerPos[0]) / scaleX + layerAnchor[0];
242:     var localY = (compPoint[1] - layerPos[1]) / scaleY + layerAnchor[1];
243:     
244:     return [localX, localY];
245: }
246: 
247: // Usage
248: var compPoint = [100, 100];  // Comp coordinates
249: var layerPoint = compToLayerSpace(compPoint, shapeLayer);
250: var shape = createShape([layerPoint], true);
251: ```
252: 
253: ### Transform Stack Considerations
254: 
255: When working with nested groups, each group has its own transform:
256: 
257: ```jsx
258: function getAllPathsObjects(group, transformStack) {
259:     var transformName = "ADBE Vector Transform Group";
260:     var pathName = "ADBE Vector Shape";
261:     var results = [];
262:     
263:     if (!transformStack) transformStack = [];
264:     
265:     // Add current group's transform to stack
266:     var currentTransform = group.property(transformName);
267:     var newStack = currentTransform ? 
268:         transformStack.concat([currentTransform]) : 
269:         transformStack;
270:     
271:     // Recursively search
272:     for (var i = 1; i <= group.numProperties; i++) {
273:         var prop = group.property(i);
274:         if (prop instanceof PropertyGroup) {
275:             results = results.concat(getAllPathsObjects(prop, newStack));
276:         } else if (prop.matchName === pathName) {
277:             results.push({
278:                 path: prop,
279:                 transforms: newStack
280:             });
281:         }
282:     }
283:     
284:     return results;
285: }
286: ```
287: 
288: ## Shape ↔ Mask Conversion
289: 
290: ### Shape Layer to Mask
291: 
292: ```jsx
293: function shapeLayerToMasks(shapeLayer, targetLayer) {
294:     var paths = getAllPathsObjects(
295:         shapeLayer.property("ADBE Root Vectors Group")
296:     );
297:     
298:     var maskParade = targetLayer.property("ADBE Mask Parade");
299:     
300:     for (var i = 0; i < paths.length; i++) {
301:         var pathData = paths[i];
302:         var mask = maskParade.addProperty("ADBE Mask Atom");
303:         
304:         // Apply shape to mask
305:         mask.property("ADBE Mask Shape").setValue(pathData.path.value);
306:         
307:         // Apply transforms if needed
308:         if (pathData.transforms.length > 0) {
309:             // Complex transform calculation needed here
310:             // See untransformVerts helper in analysis
311:         }
312:     }
313: }
314: ```
315: 
316: ### Mask to Shape Layer
317: 
318: ```jsx
319: function maskToShapeLayer(maskLayer, targetShapeLayer) {
320:     var maskParade = maskLayer.property("ADBE Mask Parade");
321:     var contents = targetShapeLayer.property("ADBE Root Vectors Group");
322:     
323:     for (var i = 1; i <= maskParade.numProperties; i++) {
324:         var mask = maskParade.property(i);
325:         if (mask.matchName === "ADBE Mask Atom") {
326:             var maskShape = mask.property("ADBE Mask Shape").value;
327:             
328:             var group = contents.addProperty("ADBE Vector Group");
329:             var vectors = group.property("ADBE Vectors Group");
330:             var pathGroup = vectors.addProperty("ADBE Vector Shape - Group");
331:             var path = pathGroup.property("ADBE Vector Shape");
332:             
333:             path.setValue(maskShape);
334:         }
335:     }
336: }
337: ```
338: 
339: ## Common Shape Layer Gotchas
340: 
341: ### Tangent Management
342: 
343: ```jsx
344: // WRONG: Forgetting tangents on curves
345: var shape = new Shape();
346: shape.vertices = [[0,0], [100,0], [100,100], [0,100]];
347: // No tangents = straight lines
348: 
349: // RIGHT: Setting tangents for curves
350: shape.inTangents = [[0,0], [0,0], [0,-50], [0,-50]];
351: shape.outTangents = [[0,50], [0,50], [0,0], [0,0]];
352: ```
353: 
354: ### Property Access Timing
355: 
356: ```jsx
357: // WRONG: Accessing properties immediately after creation
358: var pathGroup = vectors.addProperty("ADBE Vector Shape - Group");
359: var path = pathGroup.property("ADBE Vector Shape"); // Might be null
360: 
361: // RIGHT: Wait a frame or use try-catch
362: var pathGroup = vectors.addProperty("ADBE Vector Shape - Group");
363: var path;
364: try {
365:     path = pathGroup.property("ADBE Vector Shape");
366: } catch(e) {
367:     // Handle error
368: }
369: ```
370: 
371: ### Expression Safety
372: 
373: ```jsx
374: // WRONG: Complex expressions in setValue
375: path.property("ADBE Vector Trim End").expression = 
376:     "time * 10;"; // Too simple, might break
377: 
378: // RIGHT: Robust expressions
379: path.property("ADBE Vector Trim End").expression = 
380:     "var t = time * thisComp.frameRate * 0.1;\n" +
381:     "Math.min(100, Math.max(0, t));";
382: ```
````

## File: .windsurf/skills/ae-scripting-expert/SKILL.md
````markdown
  1: ---
  2: name: ae-scripting-expert
  3: description: Expert guidance for Adobe After Effects ExtendScript/JSX development including ScriptUI panels, shape layers manipulation, expression engineering, and production-ready patterns. Use this skill when asked to write, debug, or analyze Adobe After Effects scripts (ExtendScript/JSX), create ScriptUI panels, or manipulate shape layers. Covers ES3 compatibility, dockable UI patterns, binary asset management, pseudo-effects, matchNames, and advanced shape layer architecture.
  4: ---
  5: 
  6: # After Effects Scripting Expert
  7: 
  8: ## Quick Start
  9: 
 10: ### Basic Script Structure
 11: 
 12: Always wrap your code in an IIFE to avoid global namespace pollution:
 13: 
 14: ```jsx
 15: (function() {
 16:     // Your code here
 17: })();
 18: ```
 19: 
 20: ### Essential ES3 Rules
 21: 
 22: - Use `var` only (no `const`/`let`)
 23: - No `map()`, `filter()`, `reduce()` without polyfills
 24: - Use `for` loops or `while` for iteration
 25: - String concatenation with `+`, not template literals
 26: - Function declarations only, no arrow functions
 27: 
 28: ### Official Guide Gotchas (API / Runtime)
 29: 
 30: - **Global environment persists**
 31: Scripts share a global environment during a given AE session; names can collide. Prefer IIFEs and unique names.
 32: - **File encoding matters**
 33: Save `.jsx` as UTF-8 text. Some editors add headers that can cause “line 0” errors.
 34: - **Dockable panels require `this` plumbing**
 35: When running as a ScriptUI Panel, `this` is a `Panel`. If you build UI inside a function, pass `this` into that function.
 36: - **`instanceof` caveats for base classes**
 37: Some AE API base classes do not behave as expected with `instanceof` (can be always `false` or undefined). Prefer the most specific concrete classes you can (e.g. `CompItem`, `AVLayer`, `TextLayer`).
 38: 
 39: ### Working With Decompiled JSXBIN Sources
 40: 
 41: - **Blob placeholders**
 42: Treat variables like `__BLOB__BLOB_000123__` / `__BLOB__CLEANED__` as embedded binary assets. Don’t inspect contents; infer usage by call sites (e.g. passed to `ScriptUI.newImage(...)` => icon; written to disk with `encoding = "BINARY"` => preset/icon).
 43: - **Obfuscated variable names**
 44: Names like `e/t/n/r` are meaningless. Infer types by APIs used (e.g. `.add("iconbutton")` => ScriptUI container; `.layers.addNull()` => `CompItem`).
 45: - **Verbose boolean checks**
 46: Prefer idiomatic patterns in documentation/code you write (`if (x)` not `if (x === true)`), while preserving behavioral intent.
 47: 
 48: ### Critical Patterns
 49: 
 50: Always use undo groups:
 51: 
 52: ```jsx
 53: app.beginUndoGroup("Your Action Name");
 54: try {
 55:     // Your operations
 56: } catch(e) {
 57:     alert("Error: " + e.toString());
 58: } finally {
 59:     app.endUndoGroup();
 60: }
 61: ```
 62: 
 63: Remember 1-based indexing for After Effects collections:
 64: 
 65: ```jsx
 66: // First layer
 67: var firstLayer = comp.layer(1);  // NOT layer(0)
 68: 
 69: // First property
 70: var firstProp = layer.property(1);  // NOT property(0)
 71: ```
 72: 
 73: ## When to Read References
 74: 
 75: ### UI and Dockable Panels
 76: **Read:** `references/ui-layout.md`
 77: - Dockable vs palette patterns
 78: - Binary asset management (blobs → files)
 79: - Resilient layouts with tabbedpanel
 80: - Icon buttons and custom graphics
 81: 
 82: ### Shape Layers and Vector Graphics
 83: **Read:** `references/vector-shapes.md`
 84: - ADBE Root Vectors Group hierarchy
 85: - Shape creation and manipulation
 86: - Shape ↔ Mask conversion
 87: - Transform stack management
 88: 
 89: ### Advanced Internals and Production Patterns
 90: **Read:** `references/hacks-and-internals.md`
 91: - Binary preset files (.ffx)
 92: - Pseudo Effects bootstrapping
 93: - Hidden MatchNames and parameter IDs
 94: - Expression engineering patterns
 95: 
 96: ## Common Gotchas
 97: 
 98: ### Object Validity (Stale References)
 99: 
100: Some operations invalidate existing references (e.g. removing or reordering items in indexed groups). Prefer reacquiring objects, or guard with `isValid(obj)`:
101: 
102: ```jsx
103: var effect1 = layer.effect(1);
104: var effect2 = layer.effect(2);
105: 
106: effect1.remove();
107: 
108: if (!isValid(effect2)) {
109:     // Reacquire by index/name/matchName as needed
110:     effect2 = layer.effect(1);
111: }
112: ```
113: 
114: ### Randomness
115: 
116: Prefer `generateRandomNumber()` over `Math.random()` for randomness that will be written into project values.
117: 
118: ### File Permissions
119: Always check script write permissions before file operations:
120: 
121: ```jsx
122: function isSecurityPrefSet() {
123:     var prefSection = parseFloat(app.version) < 12
124:         ? "Main Pref Section"
125:         : "Main Pref Section v2";
126:     return app.preferences.getPrefAsLong(
127:         prefSection,
128:         "Pref_SCRIPTING_FILE_NETWORK_SECURITY"
129:     ) === 1;
130: }
131: 
132: if (!isSecurityPrefSet()) {
133:     alert("Enable 'Allow Scripts to Write Files and Access Network' in Preferences");
134:     try {
135:         app.executeCommand(parseFloat(app.version) < 16.1 ? 2359 : 3131);
136:     } catch (e) {
137:         // Ignore: user may cancel or command may not exist
138:     }
139:     if (!isSecurityPrefSet()) return;
140: }
141: ```
142: 
143: ### Version Compatibility
144: Always check AE version for UI differences:
145: 
146: ```jsx
147: var version = parseFloat(app.version);
148: if (version < 12) {
149:     // Use legacy UI patterns
150: } else {
151:     // Use modern UI patterns
152: }
153: ```
154: 
155: ### Error Handling
156: Wrap all external API calls in try-catch:
157: 
158: ```jsx
159: try {
160:     var comp = app.project.activeItem;
161:     if (!comp || !(comp instanceof CompItem)) {
162:         throw new Error("No active composition selected");
163:     }
164: } catch(e) {
165:     alert("Error: " + e.toString());
166:     return;
167: }
168: ```
169: 
170: ### Production-Specific Gotchas
171: 
172: #### MatchName Numbered Suffixes
173: Real-world scripts use numbered suffixes that aren't in official docs:
174: 
175: ```jsx
176: // These patterns appear in production but aren't documented:
177: "ADBE Slider Control-0001"  // First slider instance
178: "ADBE Color Control-0001"   // First color instance  
179: "ADBE easyRulers-0032"      // EasyRulers parameter 32
180: "ADBE Fill-0002"            // Second fill instance
181: ```
182: 
183: #### Property Access Timing
184: Properties may not be immediately available after creation:
185: 
186: ```jsx
187: // WRONG: Accessing immediately might fail
188: var pathGroup = vectors.addProperty("ADBE Vector Shape - Group");
189: var path = pathGroup.property("ADBE Vector Shape"); // Could be null
190: 
191: // RIGHT: Use defensive patterns
192: var path;
193: var attempts = 0;
194: while (!path && attempts < 3) {
195:     try {
196:         path = pathGroup.property("ADBE Vector Shape");
197:     } catch(e) {
198:         attempts++;
199:         // Brief pause or retry logic
200:     }
201: }
202: ```
203: 
204: #### Coordinate Space Confusion
205: Shape vertices are in layer space, not composition space:
206: 
207: ```jsx
208: // WRONG: Using comp coordinates directly
209: var shape = createShape([100, 100], true); // This is layer space
210: 
211: // RIGHT: Convert comp to layer space
212: function compToLayerSpace(compPoint, layer) {
213:     var layerPos = layer.position.value;
214:     var layerAnchor = layer.anchorPoint.value;
215:     var layerScale = layer.scale.value;
216:     
217:     var scaleX = layerScale[0] / 100;
218:     var scaleY = layerScale[1] / 100;
219:     
220:     var localX = (compPoint[0] - layerPos[0]) / scaleX + layerAnchor[0];
221:     var localY = (compPoint[1] - layerPos[1]) / scaleY + layerAnchor[1];
222:     
223:     return [localX, localY];
224: }
225: ```
226: 
227: #### Expression Safety in Production
228: Production scripts use robust expression patterns:
229: 
230: ```jsx
231: // WRONG: Simple expressions can break
232: property.expression = "time * 10;";
233: 
234: // RIGHT: Defensive expressions
235: property.expression = 
236:     "try {\n" +
237:     "  var t = time * thisComp.frameRate * 0.1;\n" +
238:     "  Math.min(100, Math.max(0, t));\n" +
239:     "} catch(e) {\n" +
240:     "  0; // Safe fallback\n" +
241:     "}";
242: ```
243: 
244: ## Production-Grade Patterns
245: 
246: ### Persisting Settings (app.settings)
247: 
248: Many commercial scripts persist user preferences with `app.settings` (not `app.preferences`). Pattern is:
249: 
250: ```jsx
251: var SETTINGS_SECTION = "myScript";
252: 
253: function getSetting(key, defaultValue) {
254:     if (!app.settings.haveSetting(SETTINGS_SECTION, key)) {
255:         return defaultValue;
256:     }
257:     return app.settings.getSetting(SETTINGS_SECTION, key);
258: }
259: 
260: function setSetting(key, value) {
261:     app.settings.saveSetting(SETTINGS_SECTION, key, String(value));
262:     app.preferences.saveToDisk();
263: }
264: ```
265: 
266: Use this for UI toggles, last-used values, feature flags, etc.
267: 
268: ### `app.settings` Size Limit (1999 bytes)
269: 
270: `app.settings.getSetting()` / `saveSetting()` can throw if a value exceeds ~1999 bytes (documented for AE 15.0.1). Keep values small (booleans, numbers, short strings) and avoid storing large JSON blobs.
271: 
272: ### Preferences Storage (PREFType + reload/save)
273: 
274: Use `app.preferences` for internal AE prefs, and `app.settings` for script prefs. Both APIs accept an optional `PREFType` argument to target different preference files.
275: 
276: ```jsx
277: var enabled = app.preferences.getPrefAsBool(
278:     "Main Pref Section v2",
279:     "Pref_JAVASCRIPT_DEBUGGER",
280:     PREFType.PREF_Type_MACHINE_INDEPENDENT
281: );
282: 
283: // When you write prefs and need them visible in the same session:
284: app.preferences.saveToDisk();
285: app.preferences.reload();
286: ```
287: 
288: ### Render Queue Automation Callbacks
289: 
290: When automating renders, use callbacks to respond to errors or status changes:
291: 
292: - `app.onError` receives `(errorString, severityString)`.
293: - `RenderQueueItem.onStatusChanged` fires when the item status changes.
294: 
295: While rendering is in progress/paused, you generally **cannot modify** the project/render queue; callbacks can be used to pause/stop rendering via `renderQueue.pauseRendering(...)` / `renderQueue.stopRendering()`.
296: 
297: ### Stateful ScriptUI Panels with Dual Rendering Modes
298: 
299: Commercial panels often support both compact and full UI modes, with user preferences persisted:
300: 
301: ```jsx
302: // Global state management
303: var globalVar = {
304:     winObjSettings: {
305:         winSizeBig: [0, 0, 293, 180],
306:         winSizeSmall: [0, 0, 194, 180],
307:         iconsUI: false,
308:         showTools: true
309:     },
310:     savedSettings: {
311:         iconsUI: false,
312:         showTools: true,
313:         hideBgImage: false
314:     }
315: };
316: 
317: // Dual panel builders
318: this.buildToolsPanel_small = function(win) {
319:     win.panelTools = win.add("panel", [6, 176, 286, 236], "Tools");
320:     win.panelTools.groupToolsButtons = win.panelTools.add("group", [5, 13, 495, 69], "");
321:     
322:     // Icon buttons with binary assets
323:     var iconData = __BLOB__BLOB_000079__;
324:     var iconFile = this.utils.createResourceFile(
325:         "iconbut_NullParent.png", 
326:         iconData, 
327:         this.utils.getUserDataFolder()
328:     );
329:     
330:     win.panelTools.groupToolsButtons.but_addNull = win.panelTools.groupToolsButtons.add(
331:         "iconbutton", 
332:         [0, 0, 53, 30], 
333:         ScriptUI.newImage(iconFile)
334:     );
335: };
336: 
337: this.buildToolsPanel_big = function(win) {
338:     win.panelTools = win.add("panel", [6, 176, 286, 236], "Tools");
339:     win.panelTools.groupToolsButtons = win.panelTools.add("group", [5, 13, 495, 69], "");
340:     
341:     // Text buttons
342:     win.panelTools.groupToolsButtons.but_addNull = win.panelTools.groupToolsButtons.add(
343:         "button", 
344:         [0, 0, 84, 28], 
345:         "Null Parent"
346:     );
347: };
348: 
349: // Toggle based on saved settings
350: this.toggleToolsPanel = function(win) {
351:     if (globalVar.winObjSettings.showTools) {
352:         if (globalVar.winObjSettings.iconsUI) {
353:             this.buildToolsPanel_small(win);
354:         } else {
355:             this.buildToolsPanel_big(win);
356:         }
357:     }
358: };
359: ```
360: 
361: ### Settings Persistence and Dialog Orchestration
362: 
363: Production scripts need robust settings management and modal dialogs:
364: 
365: ```jsx
366: // Settings persistence
367: this.loadAnchorSNIPERSettings = function() {
368:     this.utils.loadSettings(
369:         this.globalConstants.settingsSection,
370:         this.globalVar.savedSettings
371:     );
372: };
373: 
374: this.openSettingsDialog = function() {
375:     var settingsWin = new Window("dialog", "Settings", [0, 0, 285, 216], {
376:         resizeable: false
377:     });
378:     
379:     settingsWin.panelSettings = settingsWin.add("panel", [5, 5, 272, 169], "Settings");
380:     settingsWin.panelSettings.check_iconsUI = settingsWin.panelSettings.add(
381:         "checkbox", [14, 72, 304, 92], "Small User Interface (requires script restart)"
382:     );
383:     settingsWin.panelSettings.check_iconsUI.value = this.globalVar.savedSettings.iconsUI;
384:     
385:     settingsWin.but_save = settingsWin.add("button", [200, 180, 270, 200], "Save");
386:     settingsWin.but_save.onClick = function() {
387:         var newSettings = {
388:             iconsUI: settingsWin.panelSettings.check_iconsUI.value,
389:             showTools: settingsWin.panelSettings.check_showTools.value
390:         };
391:         
392:         // Check if restart required
393:         if (newSettings.iconsUI !== vn_AnchorSniperUI.globalVar.savedSettings.iconsUI) {
394:             alert("Changing UI size requires script restart.");
395:         }
396:         
397:         vn_AnchorSniperUI.utils.saveSettings(
398:             vn_AnchorSniperUI.globalConstants.settingsSection,
399:             newSettings
400:         );
401:         settingsWin.close();
402:     };
403:     
404:     settingsWin.center();
405:     settingsWin.show();
406: };
407: ```
408: 
409: ### Tabbed Panels with Resource Strings
410: 
411: For complex UIs, use resource strings to define layouts centrally:
412: 
413: ```jsx
414: // Define layout as resource string
415: var panelResource = 
416:     "group{orientation:'column', alignChildren:'center'," +
417:     "mainTabs: Panel{type:'tabbedpanel', orientation:'column'," +
418:     "joyTab: Panel{type:'tab', text:'Joysticks'," +
419:     "joyImg: Image{preferredSize: [228, 43]}," +
420:     "stickPnl: Panel{text:'Joystick tools'," +
421:     "groupJ: Group{orientation:'row'," +
422:     "rigButn: IconButton{preferredSize:[100,23]}," +
423:     "upPath: IconButton{preferredSize:[43,23]}" +
424:     "}" +
425:     "}" +
426:     "}" +
427:     "}";
428: 
429: // Build panel from resource
430: var win = new Window("palette", "Joysticks n Sliders", undefined, { resizeable: true });
431: win.grp = win.add(panelResource);
432: 
433: // Assign assets and tooltips
434: win.grp.mainTabs.joyTab.stickPnl.groupJ.rigButn.image = newJoystickIcon;
435: win.grp.mainTabs.joyTab.stickPnl.groupJ.rigButn.helpTip = "Create new joystick";
436: 
437: // Set defaults after layout
438: win.grp.mainTabs.joyTab.stickPnl.groupOne.existDrop.selection = 0;
439: ```
440: 
441: ### Expression Templating and Safe String Injection
442: 
443: When building expressions dynamically, always quote strings safely:
444: 
445: ```jsx
446: function exprStringLiteral(value) {
447:     var s = String(value);
448:     s = s.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"");
449:     return "\"" + s + "\"";
450: }
451: 
452: // Build expression with safe layer name injection
453: var expression = 
454:     "try {\n" +
455:     "  var controlLayer = thisComp.layer(" + exprStringLiteral(controlLayer.name) + ");\n" +
456:     "  var completion = controlLayer.effect(\"ADBE easyRulers\")(\"Completion\");\n" +
457:     "  var range = controlLayer.effect(\"ADBE easyRulers\")(\"ADBE easyRulers-0063\");\n" +
458:     "  \n" +
459:     "  if (completion >= -range && completion <= range) {\n" +
460:     "    var x_before = range == 0 ? 0 : (completion + range) / range;\n" +
461:     "    var x_after = range == 0 ? 0 : -(completion - range) / range;\n" +
462:     "    \n" +
463:     "    // Apply easing based on control slider\n" +
464:     "    switch (controlLayer.effect(\"ADBE easyRulers\")(\"ADBE easyRulers-0064\").value) {\n" +
465:     "      case 1: return x_after * scale_fx;\n" +
466:     "      case 2: return value;\n" +
467:     "      case 4: return Math.pow(x_after, 4) * scale_fx;\n" +
468:     "      case 5: return ((x_after-1)*(x_after-1)*(x_after-1)+1) * scale_fx;\n" +
469:     "      case 6: return (x_after < 0.5 ? 2*x_after*x_after : -1+(4-2*x_after)*x_after) * scale_fx;\n" +
470:     "    }\n" +
471:     "  }\n" +
472:     "} catch(e) {\n" +
473:     "  value; // Safe fallback\n" +
474:     "}";
475: 
476: property.expression = expression;
477: ```
478: 
479: ### Binary Asset Lifecycle Management
480: 
481: For embedded assets (icons, presets), use a consistent write-once pattern:
482: 
483: ```jsx
484: function ensureBinaryAssetFile(assetName, assetBinary) {
485:     var assetFolder = Folder(Folder.temp.fsName + "/aescripts_assets");
486:     if (!assetFolder.exists) {
487:         assetFolder.create();
488:     }
489: 
490:     var assetFile = File(assetFolder.fsName + "/" + assetName);
491:     if (!assetFile.exists) {
492:         assetFile.encoding = "BINARY";
493:         if (!assetFile.open("w")) {
494:             throw new Error("Unable to write asset: " + assetFile.fsName);
495:         }
496:         try {
497:             assetFile.write(assetBinary);
498:         } finally {
499:             assetFile.close();
500:         }
501:     }
502:     return assetFile;
503: }
504: 
505: // Usage with blob placeholder
506: var iconFile = ensureBinaryAssetFile(
507:     "tool_icon.png", 
508:     __BLOB__BLOB_000079__
509: );
510: ```
511: 
512: ### Advanced Shape ↔ Mask Conversion
513: Based on Origami production patterns:
514: 
515: ```jsx
516: function shapeLayerToMasks(shapeLayer, targetLayer) {
517:     var paths = getAllPathsObjects(
518:         shapeLayer.property("ADBE Root Vectors Group")
519:     );
520:     
521:     var maskParade = targetLayer.property("ADBE Mask Parade");
522:     
523:     for (var i = 0; i < paths.length; i++) {
524:         var pathData = paths[i];
525:         var mask = maskParade.addProperty("ADBE Mask Atom");
526:         
527:         // Apply shape to mask with coordinate transformation
528:         mask.property("ADBE Mask Shape").setValue(pathData.path.value);
529:         
530:         // Handle nested transforms (production pattern)
531:         if (pathData.transforms.length > 0) {
532:             applyTransformStackToMask(mask, pathData.transforms);
533:         }
534:     }
535: }
536: ```
537: 
538: ### Transform Stack Management
539: Production scripts handle nested group transforms:
540: 
541: ```jsx
542: function getAllPathsObjects(group, transformStack) {
543:     var transformName = "ADBE Vector Transform Group";
544:     var pathName = "ADBE Vector Shape";
545:     var results = [];
546:     
547:     if (!transformStack) transformStack = [];
548:     
549:     // Add current group's transform to stack
550:     var currentTransform = group.property(transformName);
551:     var newStack = currentTransform ? 
552:         transformStack.concat([currentTransform]) : 
553:         transformStack;
554:     
555:     // Recursively search with transform tracking
556:     for (var i = 1; i <= group.numProperties; i++) {
557:         var prop = group.property(i);
558:         if (prop instanceof PropertyGroup) {
559:             results = results.concat(getAllPathsObjects(prop, newStack));
560:         } else if (prop.matchName === pathName) {
561:             results.push({
562:                 path: prop,
563:                 transforms: newStack
564:             });
565:         }
566:     }
567:     
568:     return results;
569: }
570: ```
571: 
572: ## Asset Templates
573: 
574: Use the templates in `assets/` as starting points:
575: - `basic-script-template.jsx` - Minimal script structure
576: - `dockable-ui-template.jsx` - Complete dockable panel
577: - `shape-layer-template.jsx` - Shape layer manipulation helpers
578: 
579: ## Essential References
580: 
581: ### Production Script Analysis
582: For real-world patterns and undocumented matchNames, see:
583: - `docs/internal/matchname_cartography.md` - Analysis of 376 production scripts
584: - Binary asset lifecycle patterns from Easy Clones, Anchor Sniper
585: - Expression templating patterns from easyRulers
586: 
587: ### Core Documentation Areas
588: - UI and Dockable Panels → `references/ui-layout.md`
589: - Shape Layers and Vector Graphics → `references/vector-shapes.md`
590: - Advanced Internals → `references/hacks-and-internals.md`
591: 
592: ## Essential MatchNames
593: 
594: ### Core Shape Layer MatchNames
595: Keep these core MatchNames handy:
596: - `ADBE Effect Parade` - Effects group
597: - `ADBE Transform Group` - Transform properties
598: - `ADBE Root Vectors Group` - Shape layer contents
599: - `ADBE Mask Parade` - Mask group
600: 
601: ### Production-Grade MatchNames (Frequently Used)
602: These matchNames are heavily used in production scripts but often undocumented:
603: - `ADBE easyRulers` - EasyRulers effect (most used non-standard effect)
604: - `ADBE Slider Control-0001` - Slider parameter in pseudo-effects
605: - `ADBE Color Control-0001` - Color parameter in pseudo-effects
606: - `ADBE Layer Control-0001` - Layer picker parameter
607: - `ADBE Point Control-0001` - Point/position parameter
608: - `ADBE Checkbox Control-0001` - Checkbox parameter
609: 
610: ### Parameter Suffix Patterns
611: Production scripts use numbered suffixes for multiple instances:
612: - `ADBE easyRulers-0032` through `ADBE easyRulers-0080` (EasyRulers parameters)
613: - `ADBE Fill-0002` - Additional fill instances
614: - `ADBE Vector Repeater Opacity 2` - Repeater variations
615: 
616: ### Critical Undocumented MatchNames
617: Based on analysis of 376 production scripts, these high-usage matchNames are missing from official docs:
618: 
619: | MatchName | Usage Count | Context |
620: |-----------|-------------|---------|
621: | `ADBE easyRulers` | 3616 | Custom effect for text rulers and guides |
622: | `ADBE Slider Control-0001` | 885 | Pseudo-effect slider parameters |
623: | `ADBE Color Control-0001` | 344 | Pseudo-effect color parameters |
624: | `ADBE Layer Control-0001` | 142 | Layer picker controls |
625: | `ADBE Mask Shape` | 121 | Direct mask vertex access |
626: | `ADBE Point Control-0001` | 105 | Point/position controls |
627: 
628: ### Material Options MatchNames (3D Scripts)
629: 3D box builders and rigging scripts use these undocumented material options:
630: - `ADBE Accepts Lights` - Enable lighting on layer
631: - `ADBE Accepts Shadows` - Enable shadow reception
632: - `ADBE Casts Shadows` - Enable shadow casting
633: - `ADBE Ambient` - Ambient material property
634: - `ADBE Diffuse` - Diffuse material property
635: 
636: For complete MatchName reference, see the individual reference files and `docs/internal/matchname_cartography.md` for real-world usage patterns.
````

## File: .windsurf/skills/pyshiftae/SKILL.md
````markdown
  1: ---
  2: name: pyshiftae
  3: description: Expert guidance for automating Adobe After Effects with PyShiftAE (Python) via the native PyShiftAE.aex / PyFx bridge (C++ SDK). Use this skill when asked to write, debug, or design Python automation that manipulates AE projects, comps, layers, properties, effects, masks, or when troubleshooting installation (wheel + psc-install) and version alignment (Python 3.11-3.13). Covers core API objects (Project/Item/CompItem/Layer/Property/Effect/Mask), common gotchas, production-safe patterns, and Hybrid 2.0 CEP bridge workflows décrits dans docs/internal/pyshiftae/.
  4: ---
  5: 
  6: # PyShiftAE (Python for After Effects)
  7: 
  8: > **Sources** : [Guide principal](../../docs/internal/pyshiftae/pyshiftae_guide.md) + annexes A–D (faisabilité, installation Windows, CEP bridge, checklist safe patterns). Les infos C++ manquantes proviennent des extractions Repomix (`docs/internal/repomix/`).
  9: 
 10: ## Quick Start
 11: 
 12: ### Mental model
 13: 
 14: - **PyShiftAE is not ExtendScript**
 15: It is a Python API built on top of a native plugin (`PyShiftAE.aex`) exposing SDK suites through `PyFx`.
 16: 
 17: - **Two layers**
 18: - `pyshiftae` (pure Python): high-level classes (`Layer`, `CompItem`, `Effect`, etc.)
 19: - `PyFx` (native module): low-level SDK access (Suites + pointers)
 20: 
 21: ### Installation / first run checklist (Win 10/11, AE 2023+)
 22: 
 23: 1. `pip install --upgrade pip wheel setuptools`
 24: 2. Build the wheel with your current Python (`python setup.py bdist_wheel`) and install it (`pip install dist/pyshiftae-<version>-cp311-win_amd64.whl`).
 25: 3. Run `psc-install` and point it to AE’s plugin folder (ex: `...\Support Files\Plug-ins\PyShift`).
 26: 4. Copy `Lib`, `DLLs`, `python311.dll`, `python3.dll` next to `AfterFX.exe` when AE and Python live on different drives (portable layout).
 27: 5. Restart AE while holding **Shift** if the plugin was previously blacklisted.
 28: 
 29: Symptoms like `import pyshiftae` failing or pop-up `48::72` generally mean the wheel/runtime version mismatch or the portable Python files are missing. See Annexe B for full troubleshooting.
 30: 
 31: ### Minimal usage patterns
 32: 
 33: Get the active layer and its comp:
 34: 
 35: ```python
 36: import pyshiftae as ae
 37: 
 38: layer = ae.Layer.active_layer()
 39: comp = layer.parent_comp
 40: print(comp.name)
 41: ```
 42: 
 43: Create layers in the active comp:
 44: 
 45: ```python
 46: import pyshiftae as ae
 47: 
 48: comp = ae.Layer.active_layer().parent_comp
 49: 
 50: solid = comp.layers.add_solid(
 51:     name="My Solid",
 52:     color=(1.0, 0.0, 0.0, 1.0),
 53:     width=1920,
 54:     height=1080,
 55:     duration=10.0,
 56: )
 57: 
 58: null = comp.layers.add_null(name="CTRL", duration=10.0)
 59: ```
 60: 
 61: Apply an effect by matchName (or display name):
 62: 
 63: ```python
 64: import pyshiftae as ae
 65: 
 66: layer = ae.Layer.active_layer()
 67: fx = ae.Effect.apply(layer, "ADBE Gaussian Blur 2")
 68: print(fx.name, fx.match_name)
 69: ```
 70: 
 71: Set properties:
 72: 
 73: ```python
 74: import pyshiftae as ae
 75: 
 76: layer = ae.Layer.active_layer()
 77: layer.opacity.set_value(50.0)
 78: layer.position.set_value((960.0, 540.0, 0.0))
 79: ```
 80: 
 81: ## Core workflow
 82: 
 83: ### 1) Choose your entry point
 84: 
 85: - Use `Layer.active_layer()` when the user is “in context” (they selected something in AE).
 86: - Use `Item.active_item()` when targeting the Project panel selection.
 87: - Use `Project()` when you need project-wide operations (root items, save/import, open/new).
 88: 
 89: ### 2) Work with collections like Python lists
 90: 
 91: - `comp.layers` returns a `LayerCollection` (list-like).
 92: - `project.items` returns an `ItemCollection` (list-like).
 93: 
 94: Prefer filtering with `get_layer(...)`, `get_layers(...)`, `get_item(...)`, `get_items(...)` when you need search-by-criteria.
 95: 
 96: ### 3) Use properties as typed objects
 97: 
 98: Properties are streams wrapped into classes:
 99: 
100: - `OneDProperty` for scalar values (`opacity`, many sliders)
101: - `TwoDProperty` for `(x, y)`
102: - `ThreeDProperty` for `(x, y, z)`
103: - `ColorProperty` for RGBA
104: - `MarkerProperty` for markers
105: - `TextDocumentProperty` for text streams
106: 
107: Use `.set_value(...)` to write.
108: 
109: ## Production-safe patterns
110: 
111: ### Scheduler & threading (critical)
112: 
113: - Any call into AE SDK must execute on the AE main thread via `TaskScheduler`. Heavy computation runs on Python workers, then enqueue micro-tasks via `ae.schedule_task`.
114: - Never block the UI thread with long loops or `future.get()` inside hooks.
115: - Acquire the GIL only when running Python (`py::gil_scoped_acquire` at the edge) and release ASAP.
116: 
117: ### Undo groups
118: 
119: Prefer `UndoGroup` as a context manager so the user can undo cleanly:
120: 
121: ```python
122: import pyshiftae as ae
123: 
124: with ae.UndoGroup("Batch edits"):
125:     layer = ae.Layer.active_layer()
126:     layer.opacity.set_value(0.0)
127: ```
128: 
129: Or decorate a function:
130: 
131: ```python
132: import pyshiftae as ae
133: 
134: @ae.undo_group("My operation")
135: def run():
136:     layer = ae.Layer.active_layer()
137:     layer.opacity.set_value(25.0)
138: ```
139: 
140: ### Quiet errors
141: 
142: Use `QuietErrors` (or `@quiet_errors`) when probing optional streams/effects and you expect failures.
143: 
144: ### Hybrid 2.0 CEP bridge
145: 
146: - **Primary transport** : Named pipes / Unix sockets exposés par PyInterface (voir Annexe C).
147: - **Fallback** : Mailbox JSON (`cep_to_py.json` / `py_to_cep.json`).
148: - CEP pilote l’UI, Python exécute les ops AE, latence <10 ms via pipe (sliders, interactions temps réel).
149: - Configurer `localStorage.setItem('pyshift_pipe_name', '...')` dans la console CEP, scripts de diagnostic fournis.
150: 
151: ## Common gotchas
152: 
153: ### MatchName vs display name
154: 
155: - Effects can be applied by matchName or by their UI name.
156: - Many AE concepts (effects/properties) are identified more reliably by matchName.
157: 
158: ### Pointer / lifetime behavior
159: 
160: Objects wrap native pointers. If you delete/reorder items/layers, previously-held references may become invalid.
161: 
162: Prefer:
163: - reacquire via collections (`comp.layers["Name"]`, `project.items.get_item(...)`)
164: - keep operations short inside a single undo group
165: 
166: ### Indexing
167: 
168: PyShiftAE collections are implemented in Python and are 0-based from the Python side (unlike ExtendScript).
169: Don’t assume ExtendScript’s 1-based indexing.
170: 
171: ### Platform / runtime constraints
172: 
173: PyShiftAE in this repo targets **Windows 10/11 x64**, **After Effects 2023+**, **CPython 3.11–3.13**. macOS/Linux builds are not shipped.
174: 
175: `PyShiftAE/AEGP/` is a broken symlink: the actual `.aex` sources are absent. Architecture details rely on AETK + Repomix dumps.
176: 
177: ## API map (high-level)
178: 
179: - `App`
180:   - `report_info(message)`
181: 
182: - `Project`
183:   - `Project.new(name, path)`
184:   - `Project.open(path)`
185:   - `items` (root `ItemCollection`)
186:   - `save(path)`
187:   - `Import(path)`
188: 
189: - `Item` / `FolderItem` / `CompItem` / `FootageItem`
190:   - `Item.active_item()`
191:   - `CompItem.create(...)`
192:   - `FootageItem.create(path, name)`
193:   - `FootageItem.replace_from_path(path)`
194: 
195: - `Layer` (+ `AVLayer`, `CameraLayer`, `LightLayer`, `TextLayer`, `VectorLayer`)
196:   - `Layer.active_layer()`
197:   - frequently-used streams: `position`, `scale`, `rotation`, `opacity`, `anchor_point`, `text`, `marker`
198: 
199: - `Effect`
200:   - `Effect.apply(layer, match_name)`
201:   - `param(index_or_name)`
202: 
203: - `Mask`
204:   - `Mask.getMask(layer, maskIndex)`
205:   - `mode`, `opacity`, `feather`, `expansion`, `outline`, etc.
206: 
207: ## Debugging checklist
208: 
209: - Confirm Python version matches the wheel tag and sits next to AE if using portable mode.
210: - Confirm `PyShiftAE.aex` is in the right folder and AE was restarted (Shift to rescan after crash).
211: - If `import pyshiftae` fails, isolate whether the Python package or `PyFx` native module is missing (check `site-packages` vs plugin path).
212: - Run `psc-install` instead of manually copying files; never import `pyshiftae` inside the installer scripts.
213: - Diagnose CEP bridge issues by checking the pipe name and falling back to mailbox JSON if needed.
214: 
215: ## When to read code in this repo
216: 
217: - Read `PyShiftAE/Python/pyshiftae/ae.py` to confirm class names, method signatures, and supported operations.
218: - Read `docs/internal/pyshiftae/pyshiftae_guide.md` for architecture, safe patterns, workflows.
219: - Read the annexes (A: faisabilité shapes/hooks, B: installation Windows, C: CEP bridge, D: checklist) for deeper dives.
220: - Review Repomix outputs in `docs/internal/repomix/` for CEPy/PyFx native references when required.
````

## File: docs/official/_global/readme.md
````markdown
 1: # docsforadobe.dev MkDocs Config
 2: 
 3: This repo holds the common components shared between this org's hosted MkDocs documentation projects.
 4: 
 5: The idea is that this repo will be kept up-to-date with global config, and each child repo will use the provided script to download the latest commit from this repo, and have its "local" MkDocs config point to the downloaded files from this repo.
 6: 
 7: In all cases, each child repo will be able to *override* config items here as needed.
 8: 
 9: ## Updating This Repo
10: 
11: See [Modifying Common Components](https://docsforadobe.dev/contributing/common-components/modifying-common-components/) in the org contribution guide for info on how this repo works, and best practices for modifying it.
````

## File: docs/official/general/application.md
````markdown
  1: # Application object
  2: 
  3: `app`
  4: 
  5: #### Description
  6: 
  7: Provides access to objects and application settings within the After Effects application. The single global object is always available by its name, app.
  8: 
  9: Attributes of the Application object provide access to specific objects within After Effects. Methods of the Application object can create a project, open an existing project, control Watch Folder mode, purge memory, and quit the After Effects application. When the After Effects application quits, it closes the open project, prompting the user to save or discard changes as necessary, and creates a project file as necessary.
 10: 
 11: ---
 12: 
 13: ## Attributes
 14: 
 15: ### app.activeViewer
 16: 
 17: `app.activeViewer`
 18: 
 19: #### Description
 20: 
 21: The Viewer object for the currently focused or active-focused viewer (Composition, Layer, or Footage) panel. Returns `null` if no viewers are open.
 22: 
 23: #### Type
 24: 
 25: [Viewer object](../other/viewer.md) object; read-only.
 26: 
 27: ---
 28: 
 29: ### app.availableGPUAccelTypes
 30: 
 31: `app.availableGPUAccelTypes`
 32: 
 33: !!! note
 34:     This functionality was added in After Effects 14.0 (CC 2017)
 35: 
 36: #### Description
 37: 
 38: Use this in conjunction with `app.project.gpuAccelType` to set the value for Project Settings > Video Rendering and Effects > Use.
 39: 
 40: #### Type
 41: 
 42: Array of `GpuAccelType` enums, or `null` if no viewers are open; read-only. One of:
 43: 
 44: - `CUDA`
 45: - `Metal`
 46: - `OPENCL`
 47: - `SOFTWARE`
 48: 
 49: #### Example
 50: The following sample code checks the current computer's available GPU acceleration types, and sets it to Metal if available.
 51: 
 52: ```javascript
 53: // app.availableGPUAccelTypes returns GPU acceleration types available on the current system.
 54: // You can use this to check before setting the GPU acceleration type.
 55: var newType = GpuAccelType.METAL;
 56: 
 57: // Before trying to set, check which GPU acceleration types are available on the current system.
 58: var canSet = false;
 59: var currentOptions = app.availableGPUAccelTypes;
 60: for (var op in currentOptions) {
 61:     if (currentOptions[op] === newType) {
 62:         canSet = true;
 63:     }
 64: }
 65: 
 66: if (canSet) {
 67:     // Set the GPU acceleration type.
 68:     app.project.gpuAccelType = newType;
 69: } else {
 70:     alert("Metal is not available on this OS.");
 71: }
 72: ```
 73: 
 74: ---
 75: 
 76: ### app.buildName
 77: 
 78: `app.buildName`
 79: 
 80: #### Description
 81: 
 82: The name of the build of After Effects being run, used internally by Adobe for testing and troubleshooting.
 83: 
 84: #### Type
 85: 
 86: String; read-only.
 87: 
 88: ---
 89: 
 90: ### app.buildNumber
 91: 
 92: `app.buildNumber`
 93: 
 94: #### Description
 95: 
 96: The number of the build of After Effects being run, used internally by Adobe for testing and troubleshooting.
 97: 
 98: #### Type
 99: 
100: Integer; read-only.
101: 
102: ---
103: 
104: ### app.disableRendering
105: 
106: `app.disableRendering`
107: 
108: !!! note
109:     This functionality was added in After Effects 16.0 (CC 2019)
110: 
111: #### Description
112: 
113: When `false` (the default), rendering proceeds as normal. Set to `true` to disable rendering as if Caps Lock were turned on.
114: 
115: #### Type
116: 
117: Boolean; read/write.
118: 
119: ---
120: 
121: ### app.effects
122: 
123: `app.effects`
124: 
125: #### Description
126: 
127: The effects available in the application.
128: 
129: #### Type
130: 
131: Array, with each element containing the following properties; read-only:
132: 
133: |   Property    |  Type  |                                                                           Description                                                                           |
134: | ------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
135: | `displayName` | String | A string representing the localized display name of the effect as seen in the Effect menu.                                                                      |
136: | `category`    | String | A string representing the localized category label as seen in the Effect menu. This can be `""` for synthetic effects that aren't normally shown to the user.   |
137: | `matchName`   | String | A string representing the internal unique name for the effect. This name does not change between versions of After Effects. Use this value to apply the effect. |
138: | `version`     | String | Effect's internal version string. This value might be different than the version number the plug-in vendor decides to show in the effect's about box.           |
139: 
140: #### Example
141: 
142: ```javascript
143: var effectName = app.effects[12].displayName;
144: ```
145: 
146: ---
147: 
148: ### app.exitAfterLaunchAndEval
149: 
150: `app.exitAfterLaunchAndEval`
151: 
152: #### Description
153: 
154: This attribute is used only when executing a script from a command line on Windows. When the application is launched from the command line, the `-r` or `-s` command line flag causes the application to run a script (from a file or from a string, respectively).
155: 
156: If this attribute is set to `true`, After Effects will exit after the script is run; if it is `false`, the application will remain open. This attribute only has an effect when After Effects is run from the Windows command line. It has no effect in Mac OS.
157: 
158: #### Type
159: 
160: Boolean; read/write.
161: 
162: ---
163: 
164: ### app.exitCode
165: 
166: `app.exitCode`
167: 
168: #### Description
169: 
170: A numeric status code used when executing a script externally (that is, from a command line or AppleScript).
171: 
172: - In Windows, the value is returned on the command line when After Effects was launched on the command line (using the `afterfx` or `afterfx -m` command), and a script was specified with the `-r` or `-s` option.
173: - In Mac OS, the value is returned as the AppleScript `DoScript` result for each script.
174: - In both Mac OS and Windows, the value is set to 0 (`EXIT_SUCCESS`) at the beginning of each script evaluation. In the event of an error while the script is running, the script can set this to a positive integer that indicates what error occurred.
175: 
176: #### Type
177: 
178: Integer; read/write.
179: 
180: #### Example
181: 
182: ```javascript
183: app.exitCode = 2; // on quit, if value is 2, an error has occurred
184: ```
185: 
186: ---
187: 
188: ### app.fonts
189: 
190: `app.fonts`
191: 
192: !!! note
193:     This functionality was added in After Effects 24.0
194: 
195: #### Description
196: 
197: Returns an object to navigate and retreive all the fonts currently available on your system.
198: 
199: #### Type
200: 
201: [Fonts object](../text/fontsobject.md); read-only.
202: 
203: ---
204: 
205: ### app.isoLanguage
206: 
207: `app.isoLanguage`
208: 
209: #### Description
210: 
211: A string indicating the locale (language and regional designations) After Effects is running.
212: 
213: !!! tip
214:     `$.locale` returns the operating system language, not the language of the After Effects application.
215: 
216: #### Type
217: 
218: String; read-only. Some common values include:
219: 
220: - `en_US` for English (United States)
221: - `de_DE` for German (Germany)
222: - `es_ES` for Spanish (Spain)
223: - `fr_FR` for French (France)
224: - `it_IT` for Italian (Italy)
225: - `ja_JP` for Japanese (Japan)
226: - `ko_KR` for Korean (Korea)
227: 
228: #### Example
229: 
230: ```javascript
231: var lang = app.isoLanguage;
232: if (lang === "en_US") {
233:     alert("After Effects is running in English.");
234: } else if (lang === "fr_FR") {
235:     alert("After Effects is running in French.");
236: } else {
237:     alert("After Effects is running not in English or French.");
238: }
239: ```
240: 
241: ---
242: 
243: ### app.isRenderEngine
244: 
245: `app.isRenderEngine`
246: 
247: #### Description
248: 
249: `true` if After Effects is running as a render engine.
250: 
251: #### Type
252: 
253: Boolean; read-only.
254: 
255: ---
256: 
257: ### app.isWatchFolder
258: 
259: `app.isWatchFolder`
260: 
261: #### Description
262: 
263: `true` if the Watch Folder dialog box is currently displayed and the application is currently watching a folder for rendering.
264: 
265: #### Type
266: 
267: Boolean; read-only.
268: 
269: ---
270: 
271: ### app.memoryInUse
272: 
273: `app.memoryInUse`
274: 
275: #### Description
276: 
277: The number of bytes of memory currently used by this application.
278: 
279: #### Type
280: 
281: Number; read-only.
282: 
283: ---
284: 
285: ### app.onError
286: 
287: `app.onError`
288: 
289: #### Description
290: 
291: The name of a callback function that is called when an error occurs. By creating a function and assigning it to this attribute, you can respond to errors systematically; for example, you can close and restart the application, noting the error in a log file if it occurred during rendering. See [RenderQueue.render()](../renderqueue/renderqueue.md#renderqueuerender). The callback function is passed the error string and a severity string. It should not return any value.
292: 
293: #### Type
294: 
295: A function name string, or `null` if no function is assigned; read/write.
296: 
297: #### Example
298: 
299: ```javascript
300: function err(errString) {
301:     alert(errString) ;
302: }
303: app.onError = err;
304: ```
305: 
306: ---
307: 
308: ### app.preferences
309: 
310: `app.preferences`
311: 
312: #### Description
313: 
314: The currently loaded AE app preferences. See [Preferences object](../other/preferences.md).
315: 
316: #### Type
317: 
318: Preferences object; read-only.
319: 
320: ---
321: 
322: ### app.project
323: 
324: `app.project`
325: 
326: #### Description
327: 
328: The project that is currently loaded. See [Project object](project.md).
329: 
330: #### Type
331: 
332: [Project object](./project.md); read-only.
333: 
334: ---
335: 
336: ### app.saveProjectOnCrash
337: 
338: `app.saveProjectOnCrash`
339: 
340: #### Description
341: 
342: When `true` (the default), After Effects attempts to display a dialog box that allows you to save the current project if an error causes the application to quit unexpectedly.
343: 
344: Set to `false` to suppress this dialog box and quit without saving.
345: 
346: #### Type
347: 
348: Boolean; read/write.
349: 
350: ---
351: 
352: ### app.settings
353: 
354: `app.settings`
355: 
356: #### Description
357: 
358: The currently loaded settings. See [Settings object](../other/settings.md).
359: 
360: #### Type
361: 
362: Settings object; read-only.
363: 
364: ---
365: 
366: ### app.version
367: 
368: `app.version`
369: 
370: !!! note
371:     This functionality was added in After Effects 12.0 (CC)
372: 
373: #### Description
374: 
375: An alphanumeric string indicating which version of After Effects is running.
376: 
377: #### Type
378: 
379: String; read-only.
380: 
381: #### Example
382: 
383: ```javascript
384: var ver = app.version;
385: alert("This machine is running version " + ver + " of AfterEffects.");
386: ```
387: 
388: ---
389: 
390: ## Methods
391: 
392: ### app.activate()
393: 
394: `app.activate()`
395: 
396: #### Description
397: 
398: Opens the application main window if it is minimized or iconified, and brings it to the front of the desktop.
399: 
400: #### Parameters
401: 
402: None.
403: 
404: #### Returns
405: 
406: Nothing.
407: 
408: ---
409: 
410: ### app.beginSuppressDialogs()
411: 
412: `app.beginSuppressDialogs()`
413: 
414: #### Description
415: 
416: Begins suppression of script error dialog boxes in the user interface. Use [app.endSuppressDialogs()](#appendsuppressdialogs) to resume the display of error dialogs.
417: 
418: #### Parameters
419: 
420: None.
421: 
422: #### Returns
423: 
424: Nothing.
425: 
426: ---
427: 
428: ### app.beginUndoGroup()
429: 
430: `app.beginUndoGroup(undoString)`
431: 
432: #### Description
433: 
434: Marks the beginning of an undo group, which allows a script to logically group all of its actions as a single undoable action (for use with the Edit > Undo/Redo menu items). Use the [app.endUndoGroup()](#appendundogroup) method to mark the end of the group.
435: 
436: `beginUndoGroup()` and `endUndoGroup()` pairs can be nested. Groups within groups become part of the larger group, and will undo correctly. In this case, the names of inner groups are ignored.
437: 
438: #### Parameters
439: 
440: |  Parameter   |  Type  |                                    Description                                    |
441: | ------------ | ------ | --------------------------------------------------------------------------------- |
442: | `undoString` | String | The text that will appear for the Undo command in the Edit menu (that is, "Undo") |
443: 
444: #### Returns
445: 
446: Nothing.
447: 
448: ---
449: 
450: ### app.cancelTask()
451: 
452: `app.cancelTask(taskID)`
453: 
454: #### Description
455: 
456: Removes the specified task from the queue of tasks scheduled for delayed execution.
457: 
458: #### Parameters
459: 
460: | Parameter |  Type   |                                         Description                                         |
461: | --------- | ------- | ------------------------------------------------------------------------------------------- |
462: | `taskID`  | Integer | An integer that identifies the task, as returned by [app.scheduleTask()](#appscheduletask). |
463: 
464: #### Returns
465: 
466: Nothing.
467: 
468: ---
469: 
470: ### app.endSuppressDialogs()
471: 
472: `app.endSuppressDialogs(alert)`
473: 
474: #### Description
475: 
476: Ends the suppression of script error dialog boxes in the user interface. Error dialogs are displayed by default;call this method only if [app.beginSuppressDialogs()](#appbeginsuppressdialogs) has previously been called.
477: 
478: #### Parameters
479: 
480: | Parameter |  Type   |                                                     Description                                                      |
481: | --------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
482: | `alert`   | Boolean | When `true`, errors that have occurred following the call to `beginSuppressDialogs()` are displayed in a dialog box. |
483: 
484: #### Returns
485: 
486: Nothing.
487: 
488: ---
489: 
490: ### app.endUndoGroup()
491: 
492: `app.endUndoGroup()`
493: 
494: #### Description
495: 
496: Marks the end of an undo group begun with the [app.beginUndoGroup()](#appbeginundogroup) method. You can use this method to place an end to an undo group in the middle of a script, should you wish to use more than one undo group for a single script. If you are using only a single undo group for a given script, you do not need to use this method; in its absence at the end of a script, the system will close the undo group automatically. Calling this method without having set a `beginUndoGroup()` method yields an error.
497: 
498: #### Parameters
499: 
500: None.
501: 
502: #### Returns
503: 
504: Nothing.
505: 
506: ---
507: 
508: ### app.endWatchFolder()
509: 
510: `app.endWatchFolder()`
511: 
512: #### Description
513: 
514: Ends Watch Folder mode.
515: 
516: #### Parameters
517: 
518: None.
519: 
520: #### Returns
521: 
522: Nothing.
523: 
524: #### See Also
525: 
526: - [app.watchFolder()](#appwatchfolder)
527: - [app.parseSwatchFile()](#appparseswatchfile)
528: - [app.isWatchFolder](#appiswatchfolder)
529: 
530: ---
531: 
532: ### app.executeCommand()
533: 
534: `app.executeCommand(id)`
535: 
536: #### Description
537: 
538: Menu Commands in the GUI application have an individual ID number, which can be used as the parameter for this method. For some functions not included in the API this is the only way to access them.
539: 
540: The [app.findMenuCommandId()](#appfindmenucommandid) method can be used to find the ID number for a command.
541: 
542: These web sites have more information and lists of the known numbers:
543: 
544: - [https://www.provideocoalition.com/after-effects-menu-command-ids/](https://www.provideocoalition.com/after-effects-menu-command-ids/)
545: - [https://hyperbrew.co/blog/after-effects-command-ids/](https://hyperbrew.co/blog/after-effects-command-ids/)
546: 
547: #### Parameters
548: 
549: | Parameter |  Type   |          Description          |
550: | --------- | ------- | ----------------------------- |
551: | `id`      | Integer | The ID number of the command. |
552: 
553: #### Returns
554: 
555: None.
556: 
557: #### Example
558: 
559: ```javascript
560: // calls the Convert to Bezier Path command
561: app.executeCommand(4162);
562: ```
563: 
564: ---
565: 
566: ### app.findMenuCommandId()
567: 
568: `app.findMenuCommandId(command)`
569: 
570: #### Description
571: 
572: Menu Commands in the GUI application have an individual ID number, which can be used as a parameter for the [app.executeCommand()](#appexecutecommand) command. For some functions not included in the API this is the only way to access them.
573: 
574: It should be noted that this method is not reliable across different language packages of AE, so you'll likely want to find the command ID number during development and then call it directly using the number in production.
575: 
576: These web sites have more information and lists of the known numbers:
577: 
578: - [https://www.provideocoalition.com/after-effects-menu-command-ids/](https://www.provideocoalition.com/after-effects-menu-command-ids/)
579: - [https://hyperbrew.co/blog/after-effects-command-ids/](https://hyperbrew.co/blog/after-effects-command-ids/)
580: 
581: #### Parameters
582: 
583: | Parameter |  Type  |                           Description                           |
584: | --------- | ------ | --------------------------------------------------------------- |
585: | `command` | String | The text of the menu command, exactly as it is shown in the UI. |
586: 
587: #### Returns
588: 
589: Integer, the ID number of the menu command.
590: 
591: #### Example
592: 
593: ```javascript
594: app.findMenuCommandId("Convert To Bezier Path")
595: ```
596: 
597: ---
598: 
599: ### app.newProject()
600: 
601: `app.newProject()`
602: 
603: #### Description
604: 
605: Creates a new project in After Effects, replicating the File > New > New Project menu command. If the current project has been edited, the user is prompted to save it. If the user cancels out of the Save dialog box, the new project is not created and the method returns `null`.
606: 
607: Use `app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES)` to close the current project before opening a new one. See [Project.close()](project.md#projectclose)
608: 
609: #### Parameters
610: 
611: None.
612: 
613: #### Returns
614: 
615: A new [Project object](./project.md), or `null` if no new project is created.
616: 
617: #### Example
618: 
619: ```javascript
620: app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
621: app.newProject();
622: ```
623: 
624: ---
625: 
626: ### app.open()
627: 
628: `app.open()`
629: 
630: `app.open(file)`
631: 
632: 
633: #### Description
634: 
635: Opens a project.
636: 
637: #### Parameters
638: 
639: | Parameter |                                              Type                                              |                                              Description                                               |
640: | --------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
641: | `file`    | [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) | Optional. Project file to open. If not supplied, the method prompts the user to select a project file. |
642: 
643: #### Returns
644: 
645: A new [Project object](./project.md) for the specified project, or `null` if the user cancels the Open dialog box.
646: 
647: #### Example
648: 
649: ```javascript
650: var my_file = new File("../my_folder/my_test.aep");
651: if (my_file.exists) {
652:     var new_project = app.open(my_file);
653:     if (new_project) {
654:         alert(new_project.file.name);
655:     }
656: }
657: ```
658: 
659: ---
660: 
661: ### app.openFast()
662: 
663: `app.openFast(file)`
664: 
665: !!! warning
666:     This method/property is officially undocumented and was found via research. The information here may be inaccurate, and this whole method/property may disappear or stop working some point. Please contribute if you have more information on it!
667: 
668: #### Description
669: 
670: Opens a project faster than `app.open()` by skipping some checks.
671: 
672: #### Parameters
673: 
674: | Parameter |                                              Type                                              |      Description      |
675: | --------- | ---------------------------------------------------------------------------------------------- | --------------------- |
676: | `file`    | [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) | Project file to open. |
677: 
678: #### Returns
679: 
680: A new [Project object](./project.md) for the specified project.
681: 
682: #### Example
683: 
684: ```javascript
685: var projectFile = new File("someFile.aep");
686: 
687: $.hiresTimer;
688: app.openFast(projectFile);
689: var fastEnd = $.hiresTimer / 1000;
690: 
691: app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
692: 
693: $.hiresTimer;
694: app.open(projectFile);
695: var normalEnd = $.hiresTimer / 1000;
696: 
697: app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
698: 
699: alert( "The difference is " + parseInt(normalEnd-fastEnd) + " ms" +
700:         "\n\nFast: " + fastEnd + " ms" +
701:         "\nNormal:" + normalEnd + " ms" );
702: ```
703: 
704: ---
705: 
706: ### app.parseSwatchFile()
707: 
708: `app.parseSwatchFile(file)`
709: 
710: #### Description
711: 
712: Loads color swatch data from an Adobe Swatch Exchange (ASE) file.
713: 
714: #### Parameters
715: 
716: | Parameter |                                              Type                                              |      Description       |
717: | --------- | ---------------------------------------------------------------------------------------------- | ---------------------- |
718: | `file`    | [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) | The ASE file to parse. |
719: 
720: #### Returns
721: 
722: The swatch data, in this format:
723: 
724: +---------------------+-------------------------------------------------------------------+
725: |      Property       |                            Description                            |
726: +=====================+===================================================================+
727: | `data.majorVersion` | The ASE version number.                                           |
728: | `data.minorVersion` |                                                                   |
729: +---------------------+-------------------------------------------------------------------+
730: | `data.values`       | An array of Swatch Value.                                         |
731: +---------------------+-------------------------------------------------------------------+
732: | `SwatchValue.type`  | One of "RGB", "CMYK", "LAB", "Gray"                               |
733: +---------------------+-------------------------------------------------------------------+
734: | `SwatchValue.r`     | When `type = "RGB"`, the color values in the range `[0.0..1.0]`.  |
735: | `SwatchValue.g`     |                                                                   |
736: | `SwatchValue.b`     | `[0, 0, 0]` is Black.                                             |
737: +---------------------+-------------------------------------------------------------------+
738: | `SwatchValue.c`     | When `type = "CMYK"`, the color values in the range `[0.0..1.0]`. |
739: | `SwatchValue.m`     |                                                                   |
740: | `SwatchValue.y`     | `[0, 0, 0, 0]` is White.                                          |
741: | `SwatchValue.k`     |                                                                   |
742: +---------------------+-------------------------------------------------------------------+
743: | `SwatchValue.L`     | When `type = "LAB"`, the color values.                            |
744: | `SwatchValue.a`     |                                                                   |
745: | `SwatchValue.b`     | - `L` is in the range `[0.0..1.0]`                                |
746: |                     | - `a` and `b`are in the range `[-128.0..+128.0]`                  |
747: |                     |                                                                   |
748: |                     | `[0, 0, 0]` is Black.                                             |
749: +---------------------+-------------------------------------------------------------------+
750: | `SwatchValue.value` | When `type = "Gray"`, the `value` range is `[0.0..1.0]`.          |
751: |                     |                                                                   |
752: |                     | `0.0` is Black.                                                   |
753: +---------------------+-------------------------------------------------------------------+
754: 
755: ---
756: 
757: ### app.pauseWatchFolder()
758: 
759: `app.pauseWatchFolder(pause)`
760: 
761: #### Description
762: 
763: Pauses or resumes the search of the target watch folder for items to render.
764: 
765: #### Parameters
766: 
767: | Parameter |  Type   |             Description             |
768: | --------- | ------- | ----------------------------------- |
769: | `pause`   | Boolean | `true` to pause, `false` to resume. |
770: 
771: #### Returns
772: 
773: Nothing.
774: 
775: #### See Also
776: 
777: - [app.isWatchFolder](#appiswatchfolder)
778: - [app.watchFolder()](#appwatchfolder)
779: - [app.endWatchFolder()](#appendwatchfolder)
780: 
781: ---
782: 
783: ### app.purge()
784: 
785: `app.purge(target)`
786: 
787: !!! tip
788:     This functionality was updated in After Effects 24.3 to allow the `ALL_CACHES` enumerated value to clear both the RAM and disk cache, with the ALL_MEMORY_CACHES enumerated value added to purge only the RAM. In versions prior to 24.3, `ALL_CACHES` will only clear the RAM cache.
789: 
790: #### Description
791: 
792: Purges unused data of the specified types. Replicates the Purge options in the Edit menu.
793: 
794: #### Parameters
795: 
796: +-----------+--------------------+----------------------------------------------------------------------------------------------------------+
797: | Parameter |        Type        |                                               Description                                                |
798: +===========+====================+==========================================================================================================+
799: | `target`  | `PurgeTarget` enum | The type of elements to purge from memory. One of:                                                       |
800: |           |                    |                                                                                                          |
801: |           |                    | - `PurgeTarget.ALL_CACHES`: Purges all data that After Effects has cached to both RAM and disk cache.    |
802: |           |                    | - `PurgeTarget.ALL_MEMORY_CACHES`: Purges all data that After Effects has cached to RAM. *(new in 24.3)* |
803: |           |                    | - `PurgeTarget.UNDO_CACHES`: Purges all data saved in the undo cache.                                    |
804: |           |                    | - `PurgeTarget.SNAPSHOT_CACHES`: Purges all data cached as composition/layer snapshots.                  |
805: |           |                    | - `PurgeTarget.IMAGE_CACHES`: Purges all saved image data.                                               |
806: +-----------+--------------------+----------------------------------------------------------------------------------------------------------+
807: 
808: #### Returns
809: 
810: Nothing.
811: 
812: ---
813: 
814: ### app.quit()
815: 
816: `app.quit()`
817: 
818: #### Description
819: 
820: Quits the After Effects application.
821: 
822: #### Parameters
823: 
824: None.
825: 
826: #### Returns
827: 
828: Nothing.
829: 
830: ---
831: 
832: ### app.restart()
833: 
834: `app.restart()`
835: 
836: #### Description
837: 
838: Restarts the After Effects application.
839: 
840: #### Parameters
841: 
842: None.
843: 
844: #### Returns
845: 
846: Nothing.
847: 
848: ---
849: 
850: ### app.scheduleTask()
851: 
852: `app.scheduleTask(stringToExecute, delay, repeat)`
853: 
854: #### Description
855: 
856: Schedules the specified JavaScript for delayed execution.
857: 
858: #### Parameters
859: 
860: |     Parameter     |  Type   |                                                                 Description                                                                  |
861: | ----------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
862: | `stringToExecute` | String  | A string containing JavaScript to be executed.                                                                                               |
863: | `delay`           | Float   | A number of milliseconds to wait before executing the JavaScript.                                                                            |
864: | `repeat`          | Boolean | When `true`, execute the script repeatedly, with the specified delay between each execution. When `false`, the script is executed only once. |
865: 
866: #### Returns
867: 
868: Integer, a unique identifier for this task, which can be used to cancel it with [app.cancelTask()](#appcanceltask).
869: 
870: ---
871: 
872: ### app.setMemoryUsageLimits()
873: 
874: `app.setMemoryUsageLimits(imageCachePercentage, maximumMemoryPercentage)`
875: 
876: #### Description
877: 
878: Sets memory usage limits as in the Memory & Cache preferences area. For both values, if installed RAM is less than a given amount (`n` gigabytes), the value is a percentage of the installed RAM, and is otherwise a percentage of `n`. The value of `n` is: 2 GB for 32-bit Windows, 4 GB for 64-bit Windows, 3.5 GB for Mac OS.
879: 
880: #### Parameters
881: 
882: |         Parameter         | Type  |                    Description                    |
883: | ------------------------- | ----- | ------------------------------------------------- |
884: | `imageCachePercentage`    | Float | The percentage of memory assigned to image cache. |
885: | `maximumMemoryPercentage` | Float | The maximum usable percentage of memory.          |
886: 
887: #### Returns
888: 
889: Nothing.
890: 
891: ---
892: 
893: ### app.setMultiFrameRenderingConfig()
894: 
895: `app.setMultiFrameRenderingConfig(mfr_on, max_cpu_perc)`
896: 
897: !!! note
898:     This functionality was added in After Effects 22.0 (2022)
899: 
900: #### Description
901: 
902: Calling this function from a script will set the Multi-Frame Rendering configuration for the next render.
903: After execution of the script is complete, these settings will be reset to what was previously set in the UI.
904: 
905: #### Parameters
906: 
907: |   Parameter    |                     Type                      |                                                 Description                                                  |
908: | -------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
909: | `mfr_on`       | Boolean                                       | Set to `true` to enable Multi-Frame Rendering.                                                               |
910: | `max_cpu_perc` | Floating-point value, in the range `[1..100]` | The maximum CPU percentage Multi-Frame Rendering should utilize. If `mfr_on` is set to `false`, pass in 100. |
911: 
912: #### Returns
913: 
914: Nothing.
915: 
916: ---
917: 
918: ### app.setSavePreferencesOnQuit()
919: 
920: `app.setSavePreferencesOnQuit(doSave)`
921: 
922: #### Description
923: 
924: Set or clears the flag that determines whether preferences are saved when the application is closed.
925: 
926: #### Parameters
927: 
928: | Parameter |  Type   |                            Description                             |
929: | --------- | ------- | ------------------------------------------------------------------ |
930: | `doSave`  | Boolean | When `true`, preferences saved on quit, when `false` they are not. |
931: 
932: #### Returns
933: 
934: Nothing.
935: 
936: ---
937: 
938: ### app.watchFolder()
939: 
940: `app.watchFolder(folder_object_to_watch)`
941: 
942: #### Description
943: 
944: Starts a Watch Folder (network rendering) process pointed at a specified folder.
945: 
946: #### Parameters
947: 
948: |        Parameter         |                                                Type                                                |     Description      |
949: | ------------------------ | -------------------------------------------------------------------------------------------------- | -------------------- |
950: | `folder_object_to_watch` | [Extendscript Folder](https://extendscript.docsforadobe.dev/file-system-access/folder-object.html) | The folder to watch. |
951: 
952: #### Returns
953: 
954: Nothing.
955: 
956: #### Example
957: 
958: ```javascript
959: var theFolder = new Folder("c:/tool");
960: app.watchFolder(theFolder);
961: ```
962: 
963: #### See Also
964: 
965: - [app.endWatchFolder()](#appendwatchfolder)
966: - [app.parseSwatchFile()](#appparseswatchfile)
967: - [app.isWatchFolder](#appiswatchfolder)
````

## File: docs/official/general/globals.md
````markdown
  1: # Global functions
  2: 
  3: #### Description
  4: 
  5: These globally available functions that are specific to After Effects. Any JavaScript object or function can call these functions, which allow you to display text in a small (3-line) area of the Info panel, to convert numeric time values to and from string values, or to generate a random number.
  6: 
  7: |     Global function      |                          Description                           |
  8: | ------------------------ | -------------------------------------------------------------- |
  9: | `clearOutput()`          | Clears text from the Info panel.                               |
 10: | `currentFormatToTime()`  | Converts string time value to a numeric time value.            |
 11: | `generateRandomNumber()` | Generates a random number.                                     |
 12: | `getEnumAsString()`      | Converts an Enum value to it's string name.                    |
 13: | `timeToCurrentFormat()`  | Converts a numeric time value to a string time value.          |
 14: | `write()`                | Writes text to the Info panel, with no line break added.       |
 15: | `writeLn()`              | Writes text to the Info panel, adding a line break at the end. |
 16: | `isValid()`              | When `true`, the specified object exists.                      |
 17: 
 18: Additional global functions for standard user I/O (`alert`, `confirm` , and `prompt`) and static functions for file I/O, are defined by ExtendScript; for detailed reference information, see the [JavaScript Tools Guide](https://extendscript.docsforadobe.dev/).
 19: 
 20: ---
 21: 
 22: ## Methods
 23: 
 24: ### clearOutput()
 25: 
 26: `clearOutput()`
 27: 
 28: #### Description
 29: 
 30: Clears the output in the Info panel.
 31: 
 32: #### Parameters
 33: 
 34: None.
 35: 
 36: #### Returns
 37: 
 38: Nothing.
 39: 
 40: ---
 41: 
 42: ### currentFormatToTime()
 43: 
 44: `currentFormatToTime(formattedTime, fps[, isDuration])`
 45: 
 46: #### Description
 47: 
 48: Converts a formatted string for a frame time value to a number of seconds, given a specified frame rate. For example, if the formatted frame time value is 0:00:12 (the exact string format is determined by a project setting), and the frame rate is 24 fps, the time would be 0.5 seconds (12/24). If the frame rate is 30 fps, the time would be 0.4 seconds (12/30). If the time is a duration, the frames are counted from 0. Otherwise, the frames are counted from the project's starting frame (see [Project.displayStartFrame](project.md#projectdisplaystartframe)).
 49: 
 50: #### Parameters
 51: 
 52: |    Parameter    |                                                                        Description                                                                         |
 53: | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
 54: | `formattedTime` | The frame time value, a string specifying a number of frames in the project's current time display format.                                                 |
 55: | `fps`           | The frames-per-second, a floating-point value.                                                                                                             |
 56: | `isDuration`    | Optional. When `true`, the time is a duration (measured from frame 0). When `false` (the default), the time is measured from the project's starting frame. |
 57: 
 58: #### Returns
 59: 
 60: Floating-point value, the number of seconds.
 61: 
 62: ---
 63: 
 64: ### generateRandomNumber()
 65: 
 66: `generateRandomNumber()`
 67: 
 68: !!! note
 69:     This functionality was added in After Effects 13.6 (CC 2015)
 70: 
 71: #### Description
 72: 
 73: Generates random numbers. This function is recommended instead of `Math.random()` for generating random numbers that will be applied as values in a project (e.g., when using setValue).
 74: 
 75: This method avoids a problem where `Math.random()` would not return random values in After Effects CC 2015 (13.5.x) due to a concurrency issue with multiple CPU threads.
 76: 
 77: #### Returns
 78: 
 79: Floating-point, pseudo-random number in the range `[0..1]`.
 80: 
 81: #### Example
 82: 
 83: ```javascript
 84: // change the position X of all layers with random number
 85: 
 86: var myComp = app.project.activeItem;
 87: var x = 0;
 88: 
 89: for (var i = 1; i <= myComp.numLayers; i++) {
 90:     // If you use Math.random(), this does not work
 91:     // x = 400 * (Math.random()) - 200;
 92:     // use new generateRandomNumber() instead
 93: 
 94:     x = 400 * generateRandomNumber() - 200;
 95:     var currentPos = myComp.layer(i).property("Position").value;
 96:     myComp.layer(i).property("Position").setValue([currentPos[0] + x, currentPos[1]]);
 97: }
 98: ```
 99: 
100: ---
101: 
102: ### getEnumAsString()
103: 
104: `getEnumAsString()`
105: 
106: !!! note
107:     This functionality was added in After Effects 24.0
108: 
109: #### Description
110: 
111: Returns the string value of an Enum.
112: 
113: #### Parameters
114: 
115: Enum.
116: 
117: #### Returns
118: 
119: String.
120: 
121: #### Example
122: 
123: ```javascript
124: // Returns: "BlendingMode.ADD"
125: alert(getEnumAsString(5220));
126: ```
127: 
128: ---
129: 
130: ### isValid()
131: 
132: `isValid(obj)`
133: 
134: #### Description
135: 
136: Determines if the specified After Effects object (e.g., composition, layer, mask, etc.) still exists. Some operations, such as [PropertyBase.moveTo()](../property/propertybase.md#propertybasemoveto), might invalidate existing variable assignments to related objects. This function allows you to test whether those assignments are still valid before attempting to access them.
137: 
138: #### Parameters
139: 
140: | Parameter |                   Description                   |
141: | --------- | ----------------------------------------------- |
142: | `obj`     | The After Effects object to check for validity. |
143: 
144: #### Returns
145: 
146: Boolean.
147: 
148: #### Example
149: 
150: ```javascript
151: var layer = app.project.activeItem.layer(1); // assume layer has three masks
152: alert(isValid(layer)); // displays "true"
153: var mask1 = layer.mask(1);
154: var mask2 = layer.mask(2);
155: var mask3 = layer.mask(3);
156: mask3.moveTo(1); // move the third mask to the top of the mask stack
157: alert(isValid(mask1)); // displays "false"; mask2 and mask3 do as well
158: ```
159: 
160: ---
161: 
162: ### timeToCurrentFormat()
163: 
164: `timeToCurrentFormat(time, fps[, isDuration])`
165: 
166: #### Description
167: 
168: Converts a numeric time value (a number of seconds) to a frame time value; that is, a formatted string thatshows which frame corresponds to that time, at the specified rate. For example, if the time is 0.5 seconds, andthe frame rate is 24 fps, the frame would be 0:00:12 (when the project is set to display as timecode). If the framerate is 30 fps, the frame would be 0:00:15. The format of the timecode string is determined by a project setting. If the time is a duration, the frames are counted from 0. Otherwise, the frames are counted from the project's starting frame (see [Project displayStartFrame](project.md#projectdisplaystartframe) attribute).
169: 
170: #### Parameters
171: 
172: |  Parameter   |                                                                      Description                                                                       |
173: | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
174: | `time`       | The number of seconds, a floating-point value.                                                                                                         |
175: | `fps`        | The frames-per-second, a floating-point value.                                                                                                         |
176: | `isDuration` | Optional. When `true`, the time is a duration (measured from frame 0). When `false` (the default), the time is measured from the project's starting frame. |
177: 
178: #### Returns
179: 
180: String in the project's current time display format.
181: 
182: ---
183: 
184: ### write()
185: 
186: `write(text)`
187: 
188: #### Description
189: 
190: Writes output to the Info panel, with no line break added.
191: 
192: #### Parameters
193: 
194: | Parameter |                           Description                            |
195: | --------- | ---------------------------------------------------------------- |
196: | `text`    | The string to display. Truncated if too long for the Info panel. |
197: 
198: #### Returns
199: 
200: Nothing.
201: 
202: #### Example
203: 
204: ```javascript
205: write("This text appears in Info panel ");
206: write("with more on same line.");
207: ```
208: 
209: ---
210: 
211: ### writeLn()
212: 
213: `writeLn(text)`
214: 
215: #### Description
216: 
217: Writes output to the Info panel and adds a line break at the end.
218: 
219: #### Parameters
220: 
221: | Parameter |      Description       |
222: | --------- | ---------------------- |
223: | `text`    | The string to display. |
224: 
225: #### Returns
226: 
227: Nothing.
228: 
229: #### Example
230: 
231: ```javascript
232: writeLn("This text appears on first line");
233: writeLn("This text appears on second line");
234: ```
````

## File: docs/official/general/project.md
````markdown
   1: # Project object
   2: 
   3: `app.project`
   4: 
   5: #### Description
   6: 
   7: The project object represents an After Effects project. Attributes provide access to specific objects within the project, such as imported files or footage and compositions, and also to project settings such as the timecode base. Methods can import footage, create solids, compositions and folders, and save changes.
   8: 
   9: ---
  10: 
  11: ## Attributes
  12: 
  13: ### Project.activeItem
  14: 
  15: `app.project.activeItem`
  16: 
  17: #### Description
  18: 
  19: The item that is currently active and is to be acted upon, or `null` if no item is currently selected or if multiple items are selected.
  20: 
  21: #### Type
  22: 
  23: [Item object](../item/item.md) or `null`; read-only.
  24: 
  25: ---
  26: 
  27: ### Project.bitsPerChannel
  28: 
  29: `app.project.bitsPerChannel`
  30: 
  31: #### Description
  32: 
  33: The color depth of the current project, either 8, 16, or 32 bits.
  34: 
  35: #### Type
  36: 
  37: Integer (8, 16, or 32 only); read/write.
  38: 
  39: ---
  40: 
  41: ### Project.compensateForSceneReferredProfiles
  42: 
  43: `app.project.compensateForSceneReferredProfiles`
  44: 
  45: !!! note
  46:     This functionality was added in After Effects 16.0 (CC 2019)
  47: 
  48: #### Description
  49: 
  50: `true` if Compensate for Scene-referred Profiles should be enabled for this project; otherwise `false`.
  51: 
  52: #### Type
  53: 
  54: Boolean; read/write.
  55: 
  56: ---
  57: 
  58: ### Project.dirty
  59: 
  60: `app.project.dirty`
  61: 
  62: !!! note
  63:     This functionality was added in After Effects 17.5 (CC2020).
  64: 
  65: !!! warning
  66:     This method/property is officially undocumented and was found via research. The information here may be inaccurate, and this whole method/property may disappear or stop working some point. Please contribute if you have more information on it!
  67: 
  68: #### Description
  69: 
  70: `true` if the project has been modified from the last save; otherwise `false`.
  71: 
  72: "Dirty" projects will have an `*` in the project window title.
  73: 
  74: #### Type
  75: 
  76: Boolean; read-only.
  77: 
  78: ---
  79: 
  80: ### Project.displayStartFrame
  81: 
  82: `app.project.displayStartFrame`
  83: 
  84: #### Description
  85: 
  86: An alternate way of setting the Frame Count menu setting in the Project Settings dialog box to 0 or 1, and is equivalent to using the `FramesCountType.FC_START_0` or `FramesCountType.FC_START_1` enumerated values for the [framesCountType](#projectframescounttype).
  87: 
  88: #### Type
  89: 
  90: Integer (0 or 1); read/write.
  91: 
  92: ---
  93: 
  94: ### Project.expressionEngine
  95: 
  96: `app.project.expressionEngine`
  97: 
  98: !!! note
  99:     This functionality was added in After Effects 16.0 (CC 2019)
 100: 
 101: #### Description
 102: 
 103: The Expressions Engine setting in the Project Settings dialog box, as a string. One of:
 104: 
 105: - `extendscript`
 106: - `javascript-1.0`
 107: 
 108: #### Type
 109: 
 110: String; read/write.
 111: 
 112: ---
 113: 
 114: ### Project.feetFramesFilmType
 115: 
 116: `app.project.feetFramesFilmType`
 117: 
 118: #### Description
 119: 
 120: The Use Feet + Frames menu setting in the Project Settings dialog box. Use this attribute instead of the old `timecodeFilmType` attribute.
 121: 
 122: #### Type
 123: 
 124: A `FeetFramesFilmType` enumerated value; read/write. One of:
 125: 
 126: - `FeetFramesFilmType.MM16`
 127: - `FeetFramesFilmType.MM35`
 128: 
 129: ---
 130: 
 131: ### Project.file
 132: 
 133: `app.project.file`
 134: 
 135: #### Description
 136: 
 137: The [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) object for the file containing the project that is currently open.
 138: 
 139: #### Type
 140: 
 141: [File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) object or `null` if project has not been saved; read-only.
 142: 
 143: ---
 144: 
 145: ### Project.footageTimecodeDisplayStartType
 146: 
 147: `app.project.footageTimecodeDisplayStartType`
 148: 
 149: #### Description
 150: 
 151: The Footage Start Time setting in the Project Settings dialog box, which is enabled when Timecode is selected as the time display style.
 152: 
 153: #### Type
 154: 
 155: A `FootageTimecodeDisplayStartType` enumerated value; read/write. One of:
 156: 
 157: - `FootageTimecodeDisplayStartType.FTCS_START_0`
 158: - `FootageTimecodeDisplayStartType.FTCS_USE_SOURCE_MEDIA`
 159: 
 160: ---
 161: 
 162: ### Project.framesCountType
 163: 
 164: `app.project.framesCountType`
 165: 
 166: #### Description
 167: 
 168: The Frame Count menu setting in the Project Settings dialog box.
 169: 
 170: #### Type
 171: 
 172: A `FramesCountType` enumerated value; read/write. One of:
 173: 
 174: - `FramesCountType.FC_START_1`
 175: - `FramesCountType.FC_START_0`
 176: - `FramesCountType.FC_TIMECODE_CONVERSION`
 177: 
 178: !!! warning
 179:     Setting this attribute to `FramesCountType.FC_TIMECODE_CONVERSION` resets the `displayStartFrame` attribute to 0.
 180: 
 181: ---
 182: 
 183: ### Project.framesUseFeetFrames
 184: 
 185: `app.project.framesUseFeetFrames`
 186: 
 187: #### Description
 188: 
 189: The "Use Feet + Frames" setting in the Project Settings dialog box.
 190: 
 191: `true` if using Feet + Frames; `false` if using Frames.
 192: 
 193: #### Type
 194: 
 195: Boolean; read/write.
 196: 
 197: ---
 198: 
 199: ### Project.gpuAccelType
 200: 
 201: `app.project.gpuAccelType`
 202: 
 203: !!! note
 204:     This functionality was added in After Effects 13.8 (CC 2015.3)
 205: 
 206: #### Description
 207: 
 208: Get or set the current projects GPU Acceleration option.
 209: see [app.availableGPUAccelTypes](application.md#appavailablegpuacceltypes)
 210: 
 211: #### Type
 212: 
 213: A `GpuAccelType` enumerated value; read/write. One of:
 214: 
 215: - `GpuAccelType.CUDA`
 216: - `GpuAccelType.Metal`
 217: - `GpuAccelType.OPENCL`
 218: - `GpuAccelType.SOFTWARE`
 219: 
 220: #### Example
 221: 
 222: ```javascript
 223: // access via scripting to Project Settings -> Video Rendering and Effects -> Use
 224: 
 225: var currentGPUSettings = app.project.gpuAccelType; // returns the current value
 226: var type_str = "";
 227: 
 228: // check the current value and alert the user
 229: 
 230: switch (currentGPUSettings) {
 231:     case GpuAccelType.CUDA:
 232:         type_str = "CUDA";
 233:         break;
 234:     case GpuAccelType.METAL:
 235:         type_str = "Metal";
 236:         break;
 237:     case GpuAccelType.OPENCL:
 238:         type_str = "OpenCL";
 239:         break;
 240:     case GpuAccelType.SOFTWARE:
 241:         type_str = "Software";
 242:         break;
 243:     default:
 244:         type_str = "UNKNOWN";
 245: }
 246: 
 247: alert("Your current setting is " + type_str);
 248: 
 249: // set the value to Metal
 250: app.project.gpuAccelType = GpuAccelType.METAL;
 251: ```
 252: 
 253: ---
 254: 
 255: ### Project.items
 256: 
 257: `app.project.items`
 258: 
 259: #### Description
 260: 
 261: All of the items in the project.
 262: 
 263: #### Type
 264: 
 265: [ItemCollection object](../item/itemcollection.md); read-only.
 266: 
 267: ---
 268: 
 269: ### Project.linearBlending
 270: 
 271: `app.project.linearBlending`
 272: 
 273: #### Description
 274: 
 275: `true` if linear blending should be used for this project; otherwise `false`.
 276: 
 277: #### Type
 278: 
 279: Boolean; read/write.
 280: 
 281: ---
 282: 
 283: ### Project.linearizeWorkingSpace
 284: 
 285: `app.project.linearizeWorkingSpace`
 286: 
 287: !!! note
 288:     This functionality was added in After Effects 16.0 (CC 2019)
 289: 
 290: #### Description
 291: 
 292: `true` if Linearize Working Space should be enabled for this project; otherwise `false`.
 293: 
 294: #### Type
 295: 
 296: Boolean; read/write.
 297: 
 298: ---
 299: 
 300: ### Project.numItems
 301: 
 302: `app.project.numItems`
 303: 
 304: #### Description
 305: 
 306: The total number of items contained in the project, including folders and all types of footage.
 307: 
 308: #### Type
 309: 
 310: Integer; read-only.
 311: 
 312: #### Example
 313: 
 314: ```javascript
 315: var numItems = app.project.numItems;
 316: alert("There are " + numItems + " items in this project.")
 317: ```
 318: 
 319: ---
 320: 
 321: ### Project.renderQueue
 322: 
 323: `app.project.renderQueue`
 324: 
 325: #### Description
 326: 
 327: The [Render Queue](../renderqueue/renderqueue.md) of the project.
 328: 
 329: 
 330: #### Type
 331: 
 332: [RenderQueue object](../renderqueue/renderqueue.md); read-only.
 333: 
 334: ---
 335: 
 336: ### Project.revision
 337: 
 338: `app.project.revision`
 339: 
 340: #### Description
 341: 
 342: The current revision of the project. Every user action increases the revision number. New project starts at revision 1.
 343: 
 344: #### Type
 345: 
 346: Integer; the current revision version of the project; read-only.
 347: 
 348: ---
 349: 
 350: ### Project.rootFolder
 351: 
 352: `app.project.rootFolder`
 353: 
 354: #### Description
 355: 
 356: The root folder containing the contents of the project; this is a virtual folder that contains all items in the Project panel, but not items contained inside other folders in the Project panel.
 357: 
 358: #### Type
 359: 
 360: [FolderItem object](../item/folderitem.md); read-only.
 361: 
 362: ---
 363: 
 364: ### Project.selection
 365: 
 366: `app.project.selection`
 367: 
 368: #### Description
 369: 
 370: All items selected in the Project panel, in the sort order shown in the Project panel.
 371: 
 372: #### Type
 373: 
 374: Array of [Item objects](../item/item.md); read-only.
 375: 
 376: ---
 377: 
 378: ### Project.timeDisplayType
 379: 
 380: `app.project.timeDisplayType`
 381: 
 382: #### Description
 383: 
 384: The time display style, corresponding to the Time Display Style section in the Project Settings dialog box.
 385: 
 386: #### Type
 387: 
 388: A `TimeDisplayType` enumerated value; read/write. One of:
 389: 
 390: - `TimeDisplayType.FRAMES`
 391: - `TimeDisplayType.TIMECODE`
 392: 
 393: ---
 394: 
 395: ### Project.toolType
 396: 
 397: `app.project.toolType`
 398: 
 399: !!! note
 400:     This functionality was added in After Effects 14.0 (CC 2017)
 401: 
 402: #### Description
 403: 
 404: Get and sets the active tool in the Tools panel.
 405: 
 406: #### Type
 407: 
 408: A `ToolType` enumerated value; read/write. One of:
 409: 
 410: - `ToolType.Tool_Arrow`: Selection Tool
 411: - `ToolType.Tool_Rotate`: Rotation Tool
 412: - `ToolType.Tool_CameraMaya`: Unified Camera Tool
 413: - `ToolType.Tool_CameraOrbit`: Orbit Camera Tool
 414: - `ToolType.Tool_CameraTrackXY`: Track XY Camera Tool
 415: - `ToolType.Tool_CameraTrackZ`: Track Z Camera Tool
 416: - `ToolType.Tool_Paintbrush`: Brush Tool
 417: - `ToolType.Tool_CloneStamp`: Clone Stamp Tool
 418: - `ToolType.Tool_Eraser`: Eraser Tool
 419: - `ToolType.Tool_Hand`: Hand Tool
 420: - `ToolType.Tool_Magnify`: Zoom Tool
 421: - `ToolType.Tool_PanBehind`: Pan Behind (Anchor Point) Tool
 422: - `ToolType.Tool_Rect`: Rectangle Tool
 423: - `ToolType.Tool_RoundedRect`: Rounded Rectangle Tool
 424: - `ToolType.Tool_Oval`: Ellipse Tool
 425: - `ToolType.Tool_Polygon`: Polygon Tool
 426: - `ToolType.Tool_Star`: Star Tool
 427: - `ToolType.Tool_TextH`: Horizontal Type Tool
 428: - `ToolType.Tool_TextV`: Vertical Type Tool
 429: - `ToolType.Tool_Pen`: Pen Tool
 430: - `ToolType.Tool_Feather`: Mask Feather Tool
 431: - `ToolType.Tool_PenPlus`: Add Vertex Tool
 432: - `ToolType.Tool_PenMinus`: Delete Vertex Tool
 433: - `ToolType.Tool_PenConvert`: Convert Vertex Tool
 434: - `ToolType.Tool_Pin`: Puppet Pin Tool
 435: - `ToolType.Tool_PinStarch`: Puppet Starch Tool
 436: - `ToolType.Tool_PinDepth`: Puppet Overlap Tool
 437: - `ToolType.Tool_Quickselect`: Roto Brush Tool
 438: - `ToolType.Tool_Hairbrush`: Refine Edge Tool
 439: 
 440: #### Examples
 441: 
 442: The following sample code checks the current tool, and if it is not the Unified Camera Tool, sets the current tool to that:
 443: 
 444: ```javascript
 445: // Check the current tool, then set it to Unified Camera Tool (UCT).
 446: // Assume a composition is selected in the project.
 447: var comp = app.project.activeItem;
 448: if (comp instanceof CompItem) {
 449:     // Add a camera to the current comp. (Requirement for UCT)
 450:     var cameraLayer = comp.layers.addCamera("Test Camera", [comp.width / 2, comp.height / 2]);
 451:     comp.openInViewer();
 452: 
 453:     // If the currently selected tool is not one of the camera tools, set it to UCT.
 454:     if (( app.project.toolType !== ToolType.Tool_CameraMaya) &&
 455:         ( app.project.toolType !== ToolType.Tool_CameraOrbit ) &&
 456:         ( app.project.toolType !== ToolType.Tool_CameraTrackXY) &&
 457:         ( app.project.toolType !== ToolType.Tool_CameraTrackZ)) {
 458:             app.project.toolType = ToolType.Tool_CameraMaya;
 459:         }
 460: }
 461: ```
 462: 
 463: The following sample code uses the new app.project.toolType attribute to create a 360-degrees composition (environment layer and camera) from a selected footage item or composition selected in the Project panel. This script a good starting point for building VR compositions from equirectangular footage:
 464: 
 465: ```javascript
 466: // Create a 360 VR comp from a footage item or comp selected in the Project panel.
 467: 
 468: var item = app.project.activeItem;
 469: if (item !== null && (item.typeName === "Footage" || item.typeName === "Composition")) {
 470:     // Create a comp with the footage.
 471:     var comp = app.project.items.addComp(item.name, item.width, item.height, item.pixelAspect, item.duration, item.frameRate);
 472:     var layers = comp.layers;
 473:     var footageLayer = layers.add(item);
 474: 
 475:     // Apply the CC Environment effect and create a camera.
 476:     var effect = footageLayer.Effects.addProperty("CC Environment");
 477:     var camera = layers.addCamera("360 Camera", [item.width / 2, item.height / 2]);
 478:     comp.openInViewer();
 479:     app.project.toolType = ToolType.Tool_CameraMaya;
 480: } else {
 481:     alert("Select a single footage item or composition in the Project panel.");
 482: }
 483: ```
 484: 
 485: ---
 486: 
 487: ### Project.transparencyGridThumbnails
 488: 
 489: `app.project.transparencyGridThumbnails`
 490: 
 491: #### Description
 492: 
 493: When `true`, thumbnail views use the transparency checkerboard pattern.
 494: 
 495: #### Type
 496: 
 497: Boolean; read/write.
 498: 
 499: ---
 500: 
 501: ### Project.usedFonts
 502: 
 503: `app.project.usedFonts`
 504: 
 505: !!! note
 506:     This functionality was added in After Effects 24.5
 507: 
 508: #### Description
 509: 
 510: Returns an Array of Objects containing references to used fonts and the Text Layers and times on which they appear in the current [Project](#project-object).
 511: 
 512: Each object is composed of `font` which is a [Font object](../text/fontobject.md), and `usedAt` which is an Array of Objects, each composed of `layerID`, a [Layer.id](../layer/layer.md#layerid), and `layerTimeD` for when. See [Project.layerByID()](#projectlayerbyid) to retrieve the layers.
 513: 
 514: ```javascript
 515: var usedList = app.project.usedFonts;
 516: if (usedList.length) {
 517:     var font = usedList[0].font;
 518:     var usedAt = usedList[0].usedAt;
 519: 
 520:     var str = "[0]:" + font.postScriptName + "\n";
 521:     for (var i = 0; i < usedAt.length; i++) {
 522:         var layerID = usedAt[i].layerID;
 523:         // valueAtTime() for Source Text property is expecting timed
 524:         // to be in Layer Time instead of Comp Time, unlike any of
 525:         // the other properties. So we have adjusted the name returned
 526:         // by usedFonts to make this clear as we expect that is where
 527:         // it will be used next.
 528:         var layerTimeD = usedAt[i].layerTimeD;
 529: 
 530:         var layer = app.project.layerByID(layerID);
 531:         str += "    Layer:'" + String(layer.property("Source Text").valueAtTime(layerTimeD, false)) + "'\n";
 532:     }
 533:     alert(str);
 534: }
 535: ```
 536: 
 537: #### Type
 538: 
 539: Array of Objects; read-only.
 540: 
 541: ---
 542: 
 543: ### Project.workingGamma
 544: 
 545: `app.project.workingGamma`
 546: 
 547: #### Description
 548: 
 549: The current project's working gamma value, either 2.2 or 2.4.
 550: 
 551: Setting values other than 2.2 or 2.4 will cause a scripting error.
 552: 
 553: !!! tip
 554:     When the project's color working space is set, the working gamma value is ignored by After Effects.
 555: 
 556: #### Type
 557: 
 558: `2.2` or `2.4`; read/write.
 559: 
 560: #### Examples
 561: 
 562: * To set the working gamma to 2.4 (Rec. 709): `app.project.workingGamma = 2.4;`
 563: * To get the current working gamma: `var currentGamma = app.project.workingGamma;`
 564: 
 565: ---
 566: 
 567: ### Project.workingSpace
 568: 
 569: `app.project.workingSpace`
 570: 
 571: #### Description
 572: 
 573: A string which is the color profile description for the project's color working space. To set the working space to None, set `workingSpace` to an empty string.
 574: 
 575: Use `app.project.listColorProfiles()` to return an array of available color profile descriptions that can be used to set the color working space.
 576: 
 577: #### Type
 578: 
 579: String; read/write.
 580: 
 581: #### Examples
 582: 
 583: * To set the working space to Rec.709 Gamma 2.4: `app.project.workingSpace = "Rec.709 Gamma 2.4";`
 584: * To set the working space to None: `app.project.workingSpace = "";`
 585: * To get the current working space: `var currentSpace = app.project.workingSpace;`
 586: 
 587: ---
 588: 
 589: ### Project.xmpPacket
 590: 
 591: `app.project.xmpPacket`
 592: 
 593: #### Description
 594: 
 595: The project's XMP metadata, stored as RDF (XML-based). For more information on XMP, see the [JavaScript Tools Guide](https://extendscript.docsforadobe.dev/).
 596: 
 597: #### Type
 598: 
 599: String; read/write.
 600: 
 601: #### Example
 602: 
 603: The following example code accesses the XMP metadata of the current project, and modifies the Label project metadata field.
 604: 
 605: ```javascript
 606: var proj = app.project;
 607: 
 608: // load the XMPlibrary as an ExtendScript ExternalObject
 609: if (ExternalObject.AdobeXMPScript === undefined){
 610:     ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
 611: }
 612: var mdata = new XMPMeta(app.project.xmpPacket); //get the project's XMPmetadata
 613: // update the Label project metadata's value
 614: var schemaNS = XMPMeta.getNamespaceURI("xmp");
 615: var propName = "xmp:Label";
 616: try{
 617:     mdata.setProperty(schemaNS, propName, "finalversion...no, really!");
 618: } catch (e) {
 619:     alert(e);
 620: }
 621: 
 622: app.project.xmpPacket = mdata.serialize();
 623: ```
 624: 
 625: ---
 626: 
 627: ## Methods
 628: 
 629: ### Project.autoFixExpressions()
 630: 
 631: `app.project.autoFixExpressions(oldText, newText)`
 632: 
 633: #### Description
 634: 
 635: Automatically replaces text found in broken expressions in the project, if the new text causes the expression to evaluate without errors.
 636: 
 637: #### Parameters
 638: 
 639: | Parameter |  Type  |     Description      |
 640: | --------- | ------ | -------------------- |
 641: | `oldText` | String | The text to replace. |
 642: | `newText` | String | The new text.        |
 643: 
 644: #### Returns
 645: 
 646: Nothing.
 647: 
 648: ---
 649: 
 650: ### Project.close()
 651: 
 652: `app.project.close(closeOptions)`
 653: 
 654: #### Description
 655: 
 656: Closes the project with the option of saving changes automatically, prompting the user to save changes or closing without saving changes.
 657: 
 658: #### Parameters
 659: 
 660: +----------------+---------------------+-------------------------------------------------------------------------------------------+
 661: |   Parameter    |        Type         |                                        Description                                        |
 662: +================+=====================+===========================================================================================+
 663: | `closeOptions` | `CloseOptions` enum | Action to be performed on close. One of:                                                  |
 664: |                |                     |                                                                                           |
 665: |                |                     | - `CloseOptions.DO_NOT_SAVE_CHANGES`: Close without saving.                               |
 666: |                |                     | - `CloseOptions.PROMPT_TO_SAVE_CHANGES`: Prompt for whether to save changes before close. |
 667: |                |                     | - `CloseOptions.SAVE_CHANGES`: Save automatically on close.                               |
 668: +----------------+---------------------+-------------------------------------------------------------------------------------------+
 669: 
 670: #### Returns
 671: 
 672: Boolean. `true` on success. `false` if the file has not been previously saved, the user is prompted, and the user cancels the save.
 673: 
 674: ---
 675: 
 676: ### Project.consolidateFootage()
 677: 
 678: `app.project.consolidateFootage()`
 679: 
 680: #### Description
 681: 
 682: Consolidates all footage in the project. Same as the File > Consolidate All Footage command.
 683: 
 684: #### Parameters
 685: 
 686: None.
 687: 
 688: #### Returns
 689: 
 690: Integer; the total number of footage items removed.
 691: 
 692: ---
 693: 
 694: ### Project.importFile()
 695: 
 696: `app.project.importFile(importOptions)`
 697: 
 698: #### Description
 699: 
 700: Imports the file specified in the specified ImportOptions object, using the specified options. Same as the File > Import File command.
 701: 
 702: Creates and returns a new FootageItem object from the file, and adds it to the project's items array.
 703: 
 704: #### Parameters
 705: 
 706: |    Parameter    |                    Type                    |                               Description                                |
 707: | --------------- | ------------------------------------------ | ------------------------------------------------------------------------ |
 708: | `importOptions` | [ImportOptions](../other/importoptions.md) | Options specifying the file to import and the options for the operation. |
 709: 
 710: #### Returns
 711: 
 712: [FootageItem object](../item/footageitem.md).
 713: 
 714: #### Example
 715: 
 716: ```javascript
 717: app.project.importFile(new ImportOptions(new File("sample.psd"));
 718: ```
 719: 
 720: ---
 721: 
 722: ### Project.importFileWithDialog()
 723: 
 724: `app.project.importFileWithDialog()`
 725: 
 726: #### Description
 727: 
 728: Shows an Import File dialog box. Same as the File > Import > File command.
 729: 
 730: #### Returns
 731: 
 732: Array of [Item objects](../item/item.md) created during import; or `null` if the user cancels the dialog box.
 733: 
 734: ---
 735: 
 736: ### Project.importPlaceholder()
 737: 
 738: `app.project.importPlaceholder(name, width, height, frameRate, duration)`
 739: 
 740: #### Description
 741: 
 742: Creates and returns a new PlaceholderItem and adds it to the project's items array. Same as the File > Import > Placeholder command.
 743: 
 744: #### Parameters
 745: 
 746: |  Parameter  |                        Type                         |                 Description                 |
 747: | ----------- | --------------------------------------------------- | ------------------------------------------- |
 748: | `name`      | String                                              | The name of the placeholder.                |
 749: | `width`     | Integer, in the range `[4..30000]`                  | The width of the placeholder in pixels.     |
 750: | `height`    | Integer, in the range `[4..30000]`                  | The height of the placeholder in pixels.    |
 751: | `frameRate` | Floating-point value, in the range `[1.0..99.0]`    | The frame rate of the placeholder.          |
 752: | `duration`  | Floating-point value, in the range `[0.0..10800.0]` | The duration of the placeholder in seconds. |
 753: 
 754: #### Returns
 755: 
 756: PlaceholderItem object.
 757: 
 758: ---
 759: 
 760: ### Project.item()
 761: 
 762: `app.project.item(index)`
 763: 
 764: #### Description
 765: 
 766: Retrieves an item at a specified index position.
 767: 
 768: #### Parameters
 769: 
 770: | Parameter |  Type   |                          Description                          |
 771: | --------- | ------- | ------------------------------------------------------------- |
 772: | `index`   | Integer | The index position of the item. The first item is at index 1. |
 773: 
 774: #### Returns
 775: 
 776: [Item object](../item/item.md).
 777: 
 778: ---
 779: 
 780: ### Project.itemByID()
 781: 
 782: `app.project.itemByID(id)`
 783: 
 784: !!! note
 785:     This functionality was added in After Effects 13.0 (CC 2014)
 786: 
 787: #### Description
 788: 
 789: Retrieves an item by its [Item ID](../item/item.md#itemid)
 790: 
 791: #### Parameters
 792: 
 793: | Parameter |  Type   |    Description    |
 794: | --------- | ------- | ----------------- |
 795: | `id`      | Integer | The ID of an item |
 796: 
 797: #### Returns
 798: 
 799: [Item object](../item/item.md).
 800: 
 801: ---
 802: 
 803: ### Project.layerByID()
 804: 
 805: `app.project.layerByID(id)`
 806: 
 807: !!! note
 808:     This functionality was added in After Effects 22.0 (2022)
 809: 
 810: #### Description
 811: 
 812: Instance method on Project which, when given a valid ID value, returns the Layer object in the Project with that given ID.
 813: 
 814: #### Parameters
 815: 
 816: | Parameter |          Type          |                      Description                      |
 817: | --------- | ---------------------- | ----------------------------------------------------- |
 818: | `id`      | Integer (non-negative) | The ID of the Layer to be retrieved from the Project. |
 819: 
 820: #### Returns
 821: 
 822: [Layer object](../layer/layer.md) with the given ID if it exists on the project; otherwise null. Non-valid IDs will throw an exception stating that the input parameter is not an unsigned integer.
 823: 
 824: #### Example
 825: 
 826: ```javascript
 827: var firstComp = app.project.item(1);
 828: var firstLayer = firstComp.layer(1);
 829: var layerID = firstLayer.id;
 830: 
 831: if (app.project.layerByID(layerID) === firstLayer) {
 832:     alert("You can get the Layer from the ID!");
 833: }
 834: ```
 835: 
 836: ---
 837: 
 838: ### Project.listColorProfiles()
 839: 
 840: `app.project.listColorProfiles()`
 841: 
 842: #### Description
 843: 
 844: Returns an array of color profile descriptions that can be set as the project's color working space.
 845: 
 846: #### Parameters
 847: 
 848: None.
 849: 
 850: #### Returns
 851: 
 852: Array of strings.
 853: 
 854: ---
 855: 
 856: ### Project.reduceProject()
 857: 
 858: `app.project.reduceProject(array_of_items)`
 859: 
 860: #### Description
 861: 
 862: Removes all items from the project except those specified. Same as the File > Reduce Project command.
 863: 
 864: #### Parameters
 865: 
 866: |    Parameter     |                   Type                   |      Description      |
 867: | ---------------- | ---------------------------------------- | --------------------- |
 868: | `array_of_items` | Array of [Item objects](../item/item.md) | The items to be kept. |
 869: 
 870: #### Returns
 871: 
 872: Integer; the total number of items removed.
 873: 
 874: #### Example
 875: 
 876: ```javascript
 877: var items = [];
 878: items[items.length] = app.project.item(1);
 879: items[items.length] = app.project.item(3);
 880: app.project.reduceProject(items);
 881: ```
 882: 
 883: ---
 884: 
 885: ### Project.removeUnusedFootage()
 886: 
 887: `app.project.removeUnusedFootage()`
 888: 
 889: #### Description
 890: 
 891: Removes unused footage from the project. Same as the File > Remove Unused Footage command.
 892: 
 893: #### Parameters
 894: 
 895: None.
 896: 
 897: #### Returns
 898: 
 899: Integer; the total number of FootageItem objects removed.
 900: 
 901: ---
 902: 
 903: ### Project.replaceFont()
 904: 
 905: `app.project.replaceFont(fromFont, toFont, [noFontLocking = false])`
 906: 
 907: !!! note
 908:     This functionality was added in After Effects 24.5
 909: 
 910: #### Description
 911: 
 912: This function will replace all the usages of [Font object](../text/fontobject.md) `fromFont` with [Font object](../text/fontobject.md) `toFont`.
 913: 
 914: This operation exposes the same mechanism and policy used for automatic font replacement of missing or substituted fonts and is therefore a complete and precise replacement, even on [TextDocuments](../text/textdocument.md) which have mixed styling, preserving the character range the `fromFont` was applied to.
 915: 
 916: This operation is not undoable.
 917: 
 918: The optional parameter `noFontLocking` controls what happens when the `toFont` has no glyphs for the text it is applied to. By default a fallback font will be selected which will have the necessary glyphs, but if this parameter is set to `true` then this fallback will not take place and missing glyphs will result. There is no way at the current time to detect or report this.
 919: 
 920: Note that when `fromFont` is a substituted font and the `toFont` has the same font properties no fallback can occur and the parameter is ignored and treated as `true`.
 921: 
 922: ```javascript
 923: var fromFont = app.project.usedFonts[0].font;
 924: var fontList = app.fonts.getFontsByPostScriptName("TimesNewRomanPSMT");
 925: var toFont = fontList[0];
 926: var layerChanged = app.project.replaceFont(fromFont, toFont);
 927: ```
 928: 
 929: #### Parameters
 930: 
 931: |    Parameter    |                 Type                 |          Description          |
 932: | --------------- | ------------------------------------ | ----------------------------- |
 933: | `fromFont`      | [Font object](../text/fontobject.md) | Font to be replaced.          |
 934: | `toFont`        | [Font object](../text/fontobject.md) | Font to replace it with.      |
 935: | `noFontLocking` | Boolean                              | Optional. Defaults to `false` |
 936: 
 937: #### Returns
 938: 
 939: Boolean. `true` if at least one Layer was changed.
 940: 
 941: ---
 942: 
 943: ### Project.save()
 944: 
 945: `app.project.save([file])`
 946: 
 947: #### Description
 948: 
 949: Saves the project. The same as the File > Save or File > Save As command. If the project has never previously been saved and no file is specified, prompts the user for a location and file name.
 950: 
 951: Pass a [File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) object to save a project to a new file without prompting.
 952: 
 953: #### Parameters
 954: 
 955: | Parameter |                                              Type                                              |         Description         |
 956: | --------- | ---------------------------------------------------------------------------------------------- | --------------------------- |
 957: | `file`    | [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) | Optional. The file to save. |
 958: 
 959: #### Returns
 960: 
 961: None.
 962: 
 963: ---
 964: 
 965: ### Project.saveWithDialog()
 966: 
 967: `app.project.saveWithDialog()`
 968: 
 969: #### Description
 970: 
 971: Shows the Save dialog box. The user can name a file with a location and save the project, or click Cancel to exit the dialog box.
 972: 
 973: #### Parameters
 974: 
 975: None.
 976: 
 977: #### Returns
 978: 
 979: Boolean; `true` if the project was saved.
 980: 
 981: ---
 982: 
 983: ### Project.setDefaultImportFolder()
 984: 
 985: `app.project.setDefaultImportFolder(folder)`
 986: 
 987: #### Description
 988: 
 989: Sets the folder that will be shown in the file import dialog. This location will be used as an override until setDefaultImportFolder() is called with no parameters, or until After Effects is quit.
 990: 
 991: #### Parameters
 992: 
 993: | Parameter |                                                Type                                                |       Description        |
 994: | --------- | -------------------------------------------------------------------------------------------------- | ------------------------ |
 995: | `folder`  | [Extendscript Folder](https://extendscript.docsforadobe.dev/file-system-access/folder-object.html) | Folder to set as default |
 996: 
 997: #### Returns
 998: 
 999: Boolean; indicates if the operation was successful.
1000: 
1001: #### Examples
1002: 
1003: Any of the following will set the default import folder to C:/My Folder:
1004: 
1005: * `var myFolder = new Folder("C:/My Folder"); app.project.setDefaultImportFolder(myFolder);`
1006: * `app.project.setDefaultImportFolder(new Folder("C:/My Folder"));`
1007: * `app.project.setDefaultImportFolder(Folder("C:/My Folder"));`
1008: 
1009: Note: if the path refers to an existing file and not a folder, the Folder function returns a File object instead of a Folder object, which will cause `setDefaultImportFolder()` to return `false`.
1010: 
1011: To set the default import folder to the current user's desktop folder: `app.project.setDefaultImportFolder(Folder.desktop);`
1012: 
1013: To disable the default folder, call `setDefaultImportFolder()` with no parameters: `app.project.setDefaultImportFolder();`
1014: 
1015: ---
1016: 
1017: ### Project.showWindow()
1018: 
1019: `app.project.showWindow(doShow)`
1020: 
1021: #### Description
1022: 
1023: Shows or hides the Project panel.
1024: 
1025: #### Parameters
1026: 
1027: | Parameter |  Type   |                                Description                                 |
1028: | --------- | ------- | -------------------------------------------------------------------------- |
1029: | `doShow`  | Boolean | When `true`, show the Project panel. When `false`, hide the Project panel. |
1030: 
1031: #### Returns
1032: 
1033: Nothing.
1034: 
1035: ---
1036: 
1037: ## Team Projects
1038: 
1039: ### Project.newTeamProject()
1040: 
1041: `app.project.newTeamProject(teamProjectName, description)`
1042: 
1043: !!! note
1044:     This functionality was added in After Effects 14.2 (CC 2017.1)
1045: 
1046: #### Description
1047: 
1048: Creates a new team project.
1049: 
1050: #### Parameters
1051: 
1052: |     Parameter     |  Type  |          Description          |
1053: | ----------------- | ------ | ----------------------------- |
1054: | `teamProjectName` | String | Team project name             |
1055: | `description`     | String | Optional. Project description |
1056: 
1057: #### Returns
1058: 
1059: Boolean. `true` if the team project is successfully created, otherwise `false`.
1060: 
1061: ---
1062: 
1063: ### Project.openTeamProject()
1064: 
1065: `app.project.openTeamProject(teamProjectName)`
1066: 
1067: !!! note
1068:     This functionality was added in After Effects 14.2 (CC 2017.1)
1069: 
1070: #### Description
1071: 
1072: Opens a team project.
1073: 
1074: #### Parameters
1075: 
1076: |     Parameter     |  Type  |    Description    |
1077: | ----------------- | ------ | ----------------- |
1078: | `teamProjectName` | String | Team project name |
1079: 
1080: #### Returns
1081: 
1082: Boolean. `true` if the team project is successfully opened, otherwise `false`.
1083: 
1084: ---
1085: 
1086: ### Project.shareTeamProject()
1087: 
1088: `app.project.shareTeamProject(comment)`
1089: 
1090: !!! note
1091:     This functionality was added in After Effects 14.2 (CC 2017.1)
1092: 
1093: #### Description
1094: 
1095: Shares the currently open team project.
1096: 
1097: #### Parameters
1098: 
1099: | Parameter |  Type  |    Description     |
1100: | --------- | ------ | ------------------ |
1101: | `comment` | String | Optional. Comment. |
1102: 
1103: #### Returns
1104: 
1105: Boolean. `true` if the team project is successfully shared, otherwise `false`.
1106: 
1107: ---
1108: 
1109: ### Project.syncTeamProject()
1110: 
1111: `app.project.syncTeamProject()`
1112: 
1113: !!! note
1114:     This functionality was added in After Effects 14.2 (CC 2017.1)
1115: 
1116: #### Description
1117: 
1118: Syncs the currently open team project.
1119: 
1120: #### Returns
1121: 
1122: Boolean. `true` if the team project is successfully synced, otherwise `false`.
1123: 
1124: ---
1125: 
1126: ### Project.closeTeamProject()
1127: 
1128: `app.project.closeTeamProject()`
1129: 
1130: !!! note
1131:     This functionality was added in After Effects 14.2 (CC 2017.1)
1132: 
1133: #### Description
1134: 
1135: Closes a currently open team project.
1136: 
1137: #### Returns
1138: 
1139: Boolean. `true` if the team project is successfully closed, otherwise `false`.
1140: 
1141: ---
1142: 
1143: ### Project.convertTeamProjectToProject()
1144: 
1145: `app.project.convertTeamProjectToProject(project_file)`
1146: 
1147: !!! note
1148:     This functionality was added in After Effects 14.2 (CC 2017.1)
1149: 
1150: #### Description
1151: 
1152: Converts a team project to an After Effects project on a local disk.
1153: 
1154: #### Parameters
1155: 
1156: |   Parameter    |                                              Type                                              |                                               Description                                               |
1157: | -------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
1158: | `project_file` | [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) | The local After Effects project. File extension should be either .aep or .aet (.aepx is not supported). |
1159: 
1160: #### Returns
1161: 
1162: Boolean. `true` if the team project is successfully converted, otherwise `false`.
1163: 
1164: ---
1165: 
1166: ### Project.listTeamProjects()
1167: 
1168: `app.project.listTeamProjects()`
1169: 
1170: !!! note
1171:     This functionality was added in After Effects 14.2 (CC 2017.1)
1172: 
1173: #### Description
1174: 
1175: Returns an array containing the name strings for all team projects available for the current user.
1176: Archived Team Projects are not included.
1177: 
1178: #### Returns
1179: 
1180: Array of strings.
1181: 
1182: ---
1183: 
1184: ### Project.isTeamProjectOpen()
1185: 
1186: `app.project.isTeamProjectOpen(teamProjectName)`
1187: 
1188: !!! note
1189:     This functionality was added in After Effects 14.2 (CC 2017.1)
1190: 
1191: #### Description
1192: 
1193: Checks whether specified team project is currently open.
1194: 
1195: #### Parameters
1196: 
1197: |     Parameter     |  Type  |    Description    |
1198: | ----------------- | ------ | ----------------- |
1199: | `teamProjectName` | String | Team project name |
1200: 
1201: #### Returns
1202: 
1203: Boolean. `true` if the specified team project is currently open, otherwise `false`.
1204: 
1205: ---
1206: 
1207: ### Project.isAnyTeamProjectOpen()
1208: 
1209: `app.project.isAnyTeamProjectOpen()`
1210: 
1211: !!! note
1212:     This functionality was added in After Effects 14.2 (CC 2017.1)
1213: 
1214: #### Description
1215: 
1216: Checks whether any team project is currently open.
1217: 
1218: #### Returns
1219: 
1220: Boolean. `true` if any team project is currently open, otherwise `false`.
1221: 
1222: ---
1223: 
1224: ### Project.isTeamProjectEnabled()
1225: 
1226: `app.project.isTeamProjectEnabled()`
1227: 
1228: !!! note
1229:     This functionality was added in After Effects 14.2 (CC 2017.1)
1230: 
1231: #### Description
1232: 
1233: Checks whether or not team project is enabled for After Effects. (This will almost always return `true`.)
1234: 
1235: #### Returns
1236: 
1237: Boolean. `true` if team project is currently enabled, otherwise `false`.
1238: 
1239: ---
1240: 
1241: ### Project.isLoggedInToTeamProject()
1242: 
1243: `app.project.isLoggedInToTeamProject()`
1244: 
1245: !!! note
1246:     This functionality was added in After Effects 14.2 (CC 2017.1)
1247: 
1248: #### Description
1249: 
1250: Checks whether or not the client (After Effects) is currently logged into the team project server.
1251: 
1252: #### Returns
1253: 
1254: Boolean. `true` if the client (After Effects) is currently logged into the team projects server, otherwise `false`.
1255: 
1256: ---
1257: 
1258: ### Project.isSyncCommandEnabled()
1259: 
1260: `app.project.isSyncCommandEnabled()`
1261: 
1262: !!! note
1263:     This functionality was added in After Effects 14.2 (CC 2017.1)
1264: 
1265: #### Description
1266: 
1267: Checks whether or not the Sync command is enabled.
1268: 
1269: #### Returns
1270: 
1271: Boolean. `true` if the team projects Sync command is enabled, otherwise `false`.
1272: 
1273: ---
1274: 
1275: ### Project.isShareCommandEnabled()
1276: 
1277: `app.project.isShareCommandEnabled()`
1278: 
1279: !!! note
1280:     This functionality was added in After Effects 14.2 (CC 2017.1)
1281: 
1282: #### Description
1283: 
1284: Checks whether or not the Share command is enabled.
1285: 
1286: #### Returns
1287: 
1288: Boolean. `true` if the team projects Share command is enabled, otherwise `false`.
1289: 
1290: ---
1291: 
1292: ### Project.isResolveCommandEnabled()
1293: 
1294: `app.project.isResolveCommandEnabled()`
1295: 
1296: !!! note
1297:     This functionality was added in After Effects 14.2 (CC 2017.1)
1298: 
1299: #### Description
1300: 
1301: Checks whether or not the Resolve command is enabled.
1302: 
1303: #### Returns
1304: 
1305: Boolean. `true` if the team projects Resolve command is enabled, otherwise `false`.
1306: 
1307: ---
1308: 
1309: ### Project.resolveConflict()
1310: 
1311: `app.project.resolveConflict(ResolveType)`
1312: 
1313: !!! note
1314:     This functionality was added in After Effects 14.2 (CC 2017.1)
1315: 
1316: #### Description
1317: 
1318: Resolves a conflict between the open team project and the version on the team projects server, using the specified resolution method.
1319: 
1320: #### Parameters
1321: 
1322: +---------------+--------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
1323: |   Parameter   |        Type        |                                                                      Description                                                                       |
1324: +===============+====================+========================================================================================================================================================+
1325: | `ResolveType` | `ResolveType` enum | The type of conflict resolution to use. One of:                                                                                                        |
1326: |               |                    |                                                                                                                                                        |
1327: |               |                    | - `ResolveType.ACCEPT_THEIRS`: Take the shared version. The shared version replaces your version.                                                      |
1328: |               |                    | - `ResolveType.ACCEPT_YOURS`: Keep your version of the project. The shared version is not taken.                                                       |
1329: |               |                    | - `ResolveType.ACCEPT_THEIRS_AND_COPY`: Copy and rename your version, then take the shared version. The shared version replaces your original version. |
1330: +---------------+--------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------+
1331: 
1332: #### Returns
1333: 
1334: Boolean. `true` if the resolution of the specified type was successful, otherwise `false`.
````

## File: docs/official/general/system.md
````markdown
  1: # System object
  2: 
  3: `system`
  4: 
  5: #### Description
  6: 
  7: The System object provides access to attributes found on the user's system, such as the user name and the name and version of the operating system. It is available through the `system` global variable.
  8: 
  9: #### Example
 10: 
 11: ```javascript
 12: alert("Your OS is " + system.osName + " running version" + system.osVersion);
 13: confirm("You are: " + system.userName + " running on " + system.machineName + ".");
 14: ```
 15: 
 16: ---
 17: 
 18: ## Attributes
 19: 
 20: ### System.machineName
 21: 
 22: `system.machineName`
 23: 
 24: #### Description
 25: 
 26: The name of the computer on which After Effects is running.
 27: 
 28: #### Type
 29: 
 30: String; read-only.
 31: 
 32: ---
 33: 
 34: ### System.osName
 35: 
 36: `system.osName`
 37: 
 38: #### Description
 39: 
 40: The name of the operating system on which After Effects is running.
 41: 
 42: !!! warning
 43:     As of Windows 7, this attribute returns a blank value. Use $.os instead.
 44: 
 45: #### Type
 46: 
 47: String; read-only.
 48: 
 49: ---
 50: 
 51: ### System.osVersion
 52: 
 53: `system.osVersion`
 54: 
 55: #### Description
 56: 
 57: The version of the current local operating system.
 58: 
 59: #### Type
 60: 
 61: String; read-only.
 62: 
 63: ---
 64: 
 65: ### System.userName
 66: 
 67: `system.userName`
 68: 
 69: #### Description
 70: 
 71: The name of the user currently logged on to the system.
 72: 
 73: #### Type
 74: 
 75: String; read-only.
 76: 
 77: ---
 78: 
 79: ## Methods
 80: 
 81: ### System.callSystem()
 82: 
 83: `system.callSystem(cmdLineToExecute);`
 84: 
 85: #### Description
 86: 
 87: Executes a system command, as if you had typed it on the operating system's command line. Returns whatever the system outputs in response to the command, if anything. In Windows, you can invoke commands using the `/c` switch for the `cmd.exe` command, passing the command to run in escaped quotes (`\"...\"`). For example, the following retrieves the current time and displays it to the user:
 88: 
 89: ```javascript
 90: var timeStr = system.callSystem("cmd.exe /c \"time /t\"");
 91: alert("Current time is " + timeStr);
 92: ```
 93: 
 94: #### Parameters
 95: 
 96: |     Parameter      |  Type  |           Description           |
 97: | ------------------ | ------ | ------------------------------- |
 98: | `cmdLineToExecute` | String | The command and its parameters. |
 99: 
100: #### Returns
101: 
102: The output from the command.
````

## File: docs/official/introduction/changelog.md
````markdown
  1: ---
  2: toc_depth: 2
  3: ---
  4: 
  5: # Changelog
  6: 
  7: What's new and changed for scripting?
  8: 
  9: ---
 10: 
 11: ## After Effects 26
 12: 
 13: ### [After Effects 26.0](https://helpx.adobe.com/after-effects/using/whats-new.html) (January 2026)
 14: 
 15: - Scripting methods and attributes added:
 16:     - Added: [PropertyGroup.addVariableFontAxis()](../property/propertygroup.md#propertygroupaddvariablefontaxis)
 17:     - Added: [Property.propertyParameters](../property/property.md#propertypropertyparameters)
 18:     - Added: [Property.valueText](../property/property.md#propertyvaluetext)
 19: 
 20: ---
 21: 
 22: ## After Effects 25
 23: 
 24: ### [After Effects 25.4](https://helpx.adobe.com/after-effects/using/whats-new/2025-4.html) (August 2025)
 25: 
 26: - Scripting method added: [app.restart()](../general/application.md#apprestart)
 27: 
 28: ### [After Effects 25.2](https://helpx.adobe.com/after-effects/using/whats-new/2025-2.html) (April 2025)
 29: 
 30: - Scripting methods and attributes added:
 31:     - Updated: [LightLayer.lightSource](../layer/lightlayer.md#lightlayerlightsource)
 32: 
 33: ### [After Effects 25.1](https://helpx.adobe.com/after-effects/using/whats-new/2025-1.html) (December 2024)
 34: 
 35: - Scripting methods and attributes added:
 36:     - Added: [CharacterRange.pasteFrom()](../text/characterrange.md#characterrangepastefrom)
 37:     - Added: [FontObject.hasGlyphsFor()](../text/fontobject.md#fontobjecthasglyphsfor)
 38:     - Added: [FontObject.otherFontsWithSameDict](../text/fontobject.md#fontobjectotherfontswithsamedict)
 39:     - Added: [FontsObject.getCTScriptForString()](../text/fontsobject.md#fontsobjectgetctscriptforstring)
 40:     - Added: [FontsObject.getDefaultFontForCTScript()](../text/fontsobject.md#fontsobjectgetdefaultfontforctscript)
 41:     - Added: [FontsObject.setDefaultFontForCTScript()](../text/fontsobject.md#fontsobjectsetdefaultfontforctscript)
 42: 
 43: ---
 44: 
 45: ## After Effects 24
 46: 
 47: ### [After Effects 24.6](https://helpx.adobe.com/after-effects/using/whats-new/2024-6.html) (August 2024)
 48: 
 49: - Scripting methods and attributes added:
 50:     - Added: [FontsObject.favoriteFontFamilyList](../text/fontsobject.md#fontsobjectfavoritefontfamilylist)
 51:     - Added: [FontsObject.fontsDuplicateByPostScriptName](../text/fontsobject.md#fontsobjectfontsduplicatebypostscriptname)
 52:     - Added: [FontsObject.freezeSyncSubstitutedFonts](../text/fontsobject.md#fontsobjectfreezesyncsubstitutedfonts)
 53:     - Added: [FontsObject.mruFontFamilyList](../text/fontsobject.md#fontsobjectmrufontfamilylist)
 54:     - Added: [FontsObject.substitutedFontReplacementMatchPolicy](../text/fontsobject.md#fontsobjectsubstitutedfontreplacementmatchpolicy)
 55:     - Added: [FontsObject.pollForAndPushNonSystemFontFoldersChanges()](../text/fontsobject.md#fontsobjectpollforandpushnonsystemfontfolderschanges)
 56:     - Added: [TextDocument.boxAutoFitPolicy](../text/textdocument.md#textdocumentboxautofitpolicy)
 57:     - Added: [TextDocument.boxFirstBaselineAlignment](../text/textdocument.md#textdocumentboxfirstbaselinealignment)
 58:     - Added: [TextDocument.boxFirstBaselineAlignmentMinimum](../text/textdocument.md#textdocumentboxfirstbaselinealignmentminimum)
 59:     - Added: [TextDocument.boxInsetSpacing](../text/textdocument.md#textdocumentboxinsetspacing)
 60:     - Added: [TextDocument.boxOverflow](../text/textdocument.md#textdocumentboxoverflow)
 61:     - Added: [TextDocument.boxVerticalAlignment](../text/textdocument.md#textdocumentboxverticalalignment)
 62: 
 63: ### [After Effects 24.5](https://helpx.adobe.com/after-effects/using/whats-new/2024-5.html) (May 2024)
 64: 
 65: - Scripting methods and attributes added:
 66:     - Added: [Project.replaceFont()](../general/project.md#projectreplacefont)
 67:     - Added: [Project.usedFonts](../general/project.md#projectusedfonts)
 68: 
 69: ### [After Effects 24.4](https://helpx.adobe.com/after-effects/using/whats-new/2024-4.html) (May 2024)
 70: 
 71: - Added: [ThreeDModelLayer object](../layer/threedmodellayer.md)
 72: 
 73: ### [After Effects 24.3](https://helpx.adobe.com/after-effects/using/whats-new/2024-3.html) (March 2024)
 74: 
 75: - Scripting methods and attributes added:
 76:     - Added: [CharacterRange object](../text/characterrange.md)
 77:     - Added: [ParagraphRange object](../text/paragraphrange.md)
 78:     - Added: [ComposedLineRange object](../text/composedlinerange.md)
 79:     - Added: [TextDocument.characterRange()](../text/textdocument.md#textdocumentcharacterrange)
 80:     - Added: [TextDocument.composedLineCharacterIndexesAt()](../text/textdocument.md#textdocumentcomposedlinecharacterindexesat)
 81:     - Added: [TextDocument.composedLineCount](../text/textdocument.md#textdocumentcomposedlinecount)
 82:     - Added: [TextDocument.composedLineRange()](../text/textdocument.md#textdocumentcomposedlinerange)
 83:     - Added: [TextDocument.paragraphCharacterIndexesAt()](../text/textdocument.md#textdocumentparagraphcharacterindexesat)
 84:     - Added: [TextDocument.paragraphCount](../text/textdocument.md#textdocumentparagraphcount)
 85:     - Added: [TextDocument.paragraphRange()](../text/textdocument.md#textdocumentparagraphrange)
 86:     - Changed: [app.purge()](../general/application.md#apppurge) - PurgeTarget.ALL_CACHES now includes the disk cache
 87: 
 88: ### [After Effects 24.2](https://helpx.adobe.com/after-effects/using/whats-new/2024-2.html) (February 2024)
 89: 
 90: - Scripting methods and attributes added or changed:
 91:     - Added: [LayerCollection.addVerticalText()](../layer/layercollection.md#layercollectionaddverticaltext)
 92:     - Added: [LayerCollection.addVerticalBoxText()](../layer/layercollection.md#layercollectionaddverticalboxtext)
 93:     - Added: [TextDocument.lineOrientation](../text/textdocument.md#textdocumentlineorientation)
 94:     - Added: [FontsObject.fontServerRevision](../text/fontsobject.md#fontsobjectfontserverrevision)
 95:     - Added: [FontsObject.getFontByID()](../text/fontsobject.md#fontsobjectgetfontbyid)
 96:     - Added: [FontObject.fontID](../text/fontobject.md#fontobjectfontid)
 97: 
 98: ### [After Effects 24.0](https://helpx.adobe.com/after-effects/using/whats-new/2024.html) (October 2023)
 99: 
100: - Scripting methods and attributes added:
101:     - Added: [getEnumAsString()](../general/globals.md#getenumasstring)
102:     - Added: [app.fonts](../general/application.md#appfonts)
103:     - Added: [Fonts object](../text/fontsobject.md)
104:     - Added: [FontsObject.allFonts](../text/fontsobject.md#fontsobjectallfonts)
105:     - Added: [FontsObject.fontsWithDefaultDesignAxes](../text/fontsobject.md#fontsobjectfontswithdefaultdesignaxes)
106:     - Added: [FontsObject.getFontsByFamilyNameAndStyleName()](../text/fontsobject.md#fontsobjectgetfontsbyfamilynameandstylename)
107:     - Added: [FontsObject.getFontsByPostScriptName()](../text/fontsobject.md#fontsobjectgetfontsbypostscriptname)
108:     - Added: [FontsObject.missingOrSubstitutedFonts](../text/fontsobject.md#fontsobjectmissingorsubstitutedfonts)
109:     - Added: [Font object](../text/fontobject.md)
110:     - Added: [FontObject.designAxesData](../text/fontobject.md#fontobjectdesignaxesdata)
111:     - Added: [FontObject.designVector](../text/fontobject.md#fontobjectdesignvector)
112:     - Added: [FontObject.familyPrefix](../text/fontobject.md#fontobjectfamilyprefix)
113:     - Added: [FontObject.hasDesignAxes](../text/fontobject.md#fontobjecthasdesignaxes)
114:     - Added: [FontObject.hasSameDict()](../text/fontobject.md#fontobjecthassamedict)
115:     - Added: [FontObject.postScriptNameForDesignVector()](../text/fontobject.md#fontobjectpostscriptnamefordesignvector)
116:     - Added: [FontObject.familyName](../text/fontobject.md#fontobjectfamilyname)
117:     - Added: [FontObject.fullName](../text/fontobject.md#fontobjectfullname)
118:     - Added: [FontObject.isFromAdobeFonts](../text/fontobject.md#fontobjectisfromadobefonts)
119:     - Added: [FontObject.isSubstitute](../text/fontobject.md#fontobjectissubstitute)
120:     - Added: [FontObject.location](../text/fontobject.md#fontobjectlocation)
121:     - Added: [FontObject.nativeFamilyName](../text/fontobject.md#fontobjectnativefamilyname)
122:     - Added: [FontObject.nativeFullName](../text/fontobject.md#fontobjectnativefullname)
123:     - Added: [FontObject.nativeStyleName](../text/fontobject.md#fontobjectnativestylename)
124:     - Added: [FontObject.postScriptName](../text/fontobject.md#fontobjectpostscriptname)
125:     - Added: [FontObject.styleName](../text/fontobject.md#fontobjectstylename)
126:     - Added: [FontObject.technology](../text/fontobject.md#fontobjecttechnology)
127:     - Added: [FontObject.type](../text/fontobject.md#fontobjecttype)
128:     - Added: [FontObject.version](../text/fontobject.md#fontobjectversion)
129:     - Added: [FontObject.writingScripts](../text/fontobject.md#fontobjectwritingscripts)
130:     - Added: [TextDocument.autoHyphenate](../text/textdocument.md#textdocumentautohyphenate)
131:     - Added: [TextDocument.autoKernType](../text/textdocument.md#textdocumentautokerntype)
132:     - Added: [TextDocument.baselineDirection](../text/textdocument.md#textdocumentbaselinedirection)
133:     - Added: [TextDocument.composerEngine](../text/textdocument.md#textdocumentcomposerengine)
134:     - Added: [TextDocument.digitSet](../text/textdocument.md#textdocumentdigitset)
135:     - Added: [TextDocument.direction](../text/textdocument.md#textdocumentdirection)
136:     - Added: [TextDocument.endIndent](../text/textdocument.md#textdocumentendindent)
137:     - Added: [TextDocument.everyLineComposer](../text/textdocument.md#textdocumenteverylinecomposer)
138:     - Added: [TextDocument.firstLineIndent](../text/textdocument.md#textdocumentfirstlineindent)
139:     - Added: [TextDocument.fontBaselineOption](../text/textdocument.md#textdocumentfontbaselineoption)
140:     - Added: [TextDocument.fontCapsOption](../text/textdocument.md#textdocumentfontcapsoption)
141:     - Added: [TextDocument.fontObject](../text/textdocument.md#textdocumentfontobject)
142:     - Added: [TextDocument.hangingRoman](../text/textdocument.md#textdocumenthangingroman)
143:     - Added: [TextDocument.kerning](../text/textdocument.md#textdocumentkerning)
144:     - Added: [TextDocument.leadingType](../text/textdocument.md#textdocumentleadingtype)
145:     - Added: [TextDocument.ligature](../text/textdocument.md#textdocumentligature)
146:     - Added: [TextDocument.lineJoinType](../text/textdocument.md#textdocumentlinejointype)
147:     - Added: [TextDocument.noBreak](../text/textdocument.md#textdocumentnobreak)
148:     - Added: [TextDocument.spaceAfter](../text/textdocument.md#textdocumentspaceafter)
149:     - Added: [TextDocument.spaceBefore](../text/textdocument.md#textdocumentspacebefore)
150:     - Added: [TextDocument.startIndent](../text/textdocument.md#textdocumentstartindent)
151: - Scripting attributes updated:
152:     - Updated: [TextDocument.fauxBold](../text/textdocument.md#textdocumentfauxbold)
153:     - Updated: [TextDocument.fauxItalic](../text/textdocument.md#textdocumentfauxitalic)
154:     - Updated: [TextDocument.justification](../text/textdocument.md#textdocumentjustification)
155: 
156: ---
157: 
158: ## After Effects 23
159: 
160: ### [After Effects 23.0](https://helpx.adobe.com/after-effects/using/whats-new/2023.html) (October 2022)
161: 
162: - Scripting methods and attributes added:
163:     - Added: [AVLayer.setTrackMatte()](../layer/avlayer.md#avlayersettrackmatte)
164:     - Added: [AVLayer.removeTrackMatte()](../layer/avlayer.md#avlayerremovetrackmatte)
165:     - Added: [AVLayer.trackMatteLayer](../layer/avlayer.md#avlayertrackmattelayer)
166: - Scripting attributes updated:
167:     - Updated: [AVLayer.trackMatteType](../layer/avlayer.md#avlayertrackmattetype)
168:     - Updated: [AVLayer.isTrackMatte](../layer/avlayer.md#avlayeristrackmatte)
169:     - Updated: [AVLayer.hasTrackMatte](../layer/avlayer.md#avlayerhastrackmatte)
170: 
171: ---
172: 
173: ## After Effects 22
174: 
175: ### [After Effects 22.6](https://helpx.adobe.com/after-effects/using/whats-new/2022-2.html) (August 2022)
176: 
177: - Scripting methods added:
178:     - Added: [Property.keyLabel()](../property/property.md#propertykeylabel)
179:     - Added: [Property.setLabelAtKey()](../property/property.md#propertysetlabelatkey)
180: 
181: ### [After Effects 22.3](https://helpx.adobe.com/after-effects/using/whats-new/2022-2.html) (April 2022)
182: 
183: - Scripting methods added:
184:     - Added: [Layer.doSceneEditDetection()](../layer/layer.md#layerdosceneeditdetection)
185: 
186: 
187: ### [After Effects 22.0](https://helpx.adobe.com/after-effects/using/whats-new/2022.html) (October 2021)
188: 
189: - Scripting methods added:
190:     - Added: [Layer.id](../layer/layer.md#layerid)
191:     - Added: [Project.layerByID()](../general/project.md#projectlayerbyid)
192:     - Added: [Property.essentialPropertySource](../property/property.md#propertyessentialpropertysource)
193: - Scripting Access to Render Queue Notifications:
194:     - Added: [RenderQueue.queueNotify](../renderqueue/renderqueue.md#renderqueuequeuenotify)
195:     - Added: [RenderQueueItem.queueItemNotify](../renderqueue/renderqueueitem.md#renderqueueitemqueueitemnotify)
196: - Scripting Access to Multi-Frame Rendering, Maximum CPU Percentage Overrides:
197:     - Added: [app.setMultiFrameRenderingConfig()](../general/application.md#appsetmultiframerenderingconfig)
198: 
199: ---
200: 
201: ## After Effects 18
202: 
203: ### [After Effects 18.0](https://helpx.adobe.com/after-effects/using/whats-new/2021-2.html) (March 2021)
204: 
205: - Scripting methods and attributes to support Media Replacement:
206:     - Added: [AVItem.isMediaReplacementCompatible](../item/avitem.md#avitemismediareplacementcompatible)
207:     - Added: [AVLayer.addToMotionGraphicsTemplate()](../layer/avlayer.md#avlayeraddtomotiongraphicstemplate)
208:     - Added: [AVLayer.addToMotionGraphicsTemplateAs()](../layer/avlayer.md#avlayeraddtomotiongraphicstemplateas)
209:     - Added: [AVLayer.canAddToMotionGraphicsTemplate()](../layer/avlayer.md#avlayercanaddtomotiongraphicstemplate)
210:     - Added: [Property.alternateSource](../property/property.md#propertyalternatesource)
211:     - Added: [Property.canSetAlternateSource](../property/property.md#propertycansetalternatesource)
212:     - Added: [Property.setAlternateSource()](../property/property.md#propertysetalternatesource)
213:     - Added relevant [match names](../matchnames/layer/avlayer.md)
214: - Added [match name for Essential Properties](../matchnames/layer/avlayer.md) property group.
215: 
216: ---
217: 
218: ## After Effects 17
219: 
220: ### [After Effects 17.1.1](https://helpx.adobe.com/after-effects/using/whats-new/2020-1.html) (May 2020)
221: 
222: - Scripting access to Shape Layer Stroke Taper, Stroke Waves, Offset Paths Copies, Offset Path Copy Offset:
223:     - Added relevant [match names](../matchnames/layer/shapelayer.md)
224: - Fixed an issue to allow negative values for [CompItem.displayStartTime](../item/compitem.md#compitemdisplaystarttime):
225:     - Added [CompItem.displayStartFrame](../item/compitem.md#compitemdisplaystartframe)
226:     - Now matches the valid range allowed when setting the Start Timecode in the Composition Settings Dialog (-3:00:00:00 to 23:59:00:00).
227: 
228: ### [After Effects 17.0.1](https://helpx.adobe.com/after-effects/using/whats-new/2020.html) (November 2019)
229: 
230: - Scripted creation and modification of Dropdown Menu Control items:
231:     - Added: [Property.isDropdownEffect](../property/property.md#propertyisdropdowneffect)
232:     - Added: [Property.setPropertyParameters()](../property/property.md#propertysetpropertyparameters)
233: 
234: ---
235: 
236: ## After Effects 16
237: 
238: ### After Effects 16.1
239: 
240: - Scripting access to [ViewOptions object](../other/viewoptions.md) guide and ruler booleans:
241:     - Added: [ViewOptions.guidesLocked](../other/viewoptions.md#viewoptionsguideslocked)
242:     - Added: [ViewOptions.guidesSnap](../other/viewoptions.md#viewoptionsguidessnap)
243:     - Added: [ViewOptions.guidesVisibility](../other/viewoptions.md#viewoptionsguidesvisibility)
244:     - Added: [ViewOptions.rulers](../other/viewoptions.md#viewoptionsrulers)
245: - Scripting access to add, remove, and set existing guides:
246:     - Added: [Item.addGuide()](../item/item.md#itemaddguide)
247:     - Added: [Item.removeGuide()](../item/item.md#itemremoveguide)
248:     - Added: [Item.setGuide()](../item/item.md#itemsetguide)
249: - Scripting access to additional EGP property attributes:
250:     - Added: [CompItem.motionGraphicsTemplateControllerCount](../item/compitem.md#compitemmotiongraphicstemplatecontrollercount)
251:     - Added: [CompItem.getMotionGraphicsTemplateControllerName()](../item/compitem.md#compitemgetmotiongraphicstemplatecontrollername)
252:     - Added: [CompItem.setMotionGraphicsControllerName()](../item/compitem.md#compitemsetmotiongraphicscontrollername)
253:     - Added: [Property.addToMotionGraphicsTemplateAs()](../property/property.md#propertyaddtomotiongraphicstemplateas)
254: 
255: ### [After Effects 16.0](https://helpx.adobe.com/after-effects/using/whats-new/2019.html) (October 2018)
256: 
257: - Scripting access to marker label and protectedRegion attributes:
258:     - Added: [MarkerValue.label](../other/markervalue.md#markervaluelabel)
259:     - Added: [MarkerValue.protectedRegion](../other/markervalue.md#markervalueprotectedregion)
260: - Scripting access to additional project color management settings:
261:     - Added: [Project.workingSpace](../general/project.md#projectworkingspace)
262:     - Added: [Project.workingGamma](../general/project.md#projectworkinggamma)
263:     - Added: [Project.listColorProfiles()](../general/project.md#projectlistcolorprofiles)
264:     - Added: [Project.linearizeWorkingSpace](../general/project.md#projectlinearizeworkingspace)
265:     - Added: [Project.compensateForSceneReferredProfiles](../general/project.md#projectcompensateforscenereferredprofiles)
266: - Scripting access to the expression engine attribute:
267:     - Added: [Project.expressionEngine](../general/project.md#projectexpressionengine)
268: - Added project method [Project.setDefaultImportFolder()](../general/project.md#projectsetdefaultimportfolder), which sets the folder that will be shown in the file import dialog.
269: - Added app property [app.disableRendering](../general/application.md#appdisablerendering), which disables rendering via the same mechanism as the Caps Lock key.
270: 
271: ---
272: 
273: ## After Effects 15
274: 
275: ### [After Effects 15.1](https://helpx.adobe.com/after-effects/using/whats-new/2018.html) (April 2018)
276: 
277: - [Project.autoFixExpressions()](../general/project.md#projectautofixexpressions) will now fix expression name references in single quotes (ex., ('Effect Name')), as well as double quotes.
278: - Fixes [CompItem.exportAsMotionGraphicsTemplate()](../item/compitem.md#compitemexportasmotiongraphicstemplate) not returning a boolean as expected
279: 
280: ### [After Effects 15.0](https://forums.adobe.com/docs/DOC-8872) (October 2017)
281: 
282: - Scripting Access to motion graphics templates:
283:     - Added: [CompItem.motionGraphicsTemplateName](../item/compitem.md#compitemmotiongraphicstemplatename)
284:     - Added: [CompItem.exportAsMotionGraphicsTemplate()](../item/compitem.md#compitemexportasmotiongraphicstemplate)
285:     - Added: [CompItem.openInEssentialGraphics()](../item/compitem.md#compitemopeninessentialgraphics)
286:     - Added: [Property.addToMotionGraphicsTemplate()](../property/property.md#propertyaddtomotiongraphicstemplate)
287:     - Added: [Property.canAddToMotionGraphicsTemplate()](../property/property.md#propertycanaddtomotiongraphicstemplate)
288: 
289: ---
290: 
291: ## After Effects 14
292: 
293: ### [After Effects 14.2.1 (CC 2017.2)](https://blogs.adobe.com/creativecloud/a-june-2017-update-to-after-effects-cc-is-now-available/) (June 2017)
294: 
295: - Buttons in ScriptUI panels have been reverted to the rectangular appearance seen in After Effects 14.1 and previous releases.
296: - The [AVItem.setProxyToNone()](../item/avitem.md#avitemsetproxytonone) scripting method no longer fails with an error message, "After Effects error: AEGP trying to add invalid footage".
297: - The [System.callSystem()](../general/system.md#systemcallsystem) scripting method now waits for all tasks called by the command to complete, instead of failing when the command takes a long time to complete.
298: 
299: ### [After Effects 14.2 (CC 2017.1)](https://blogs.adobe.com/creativecloud/after-effects-cc-april-2017-in-depth-scripting-improvements/) (April 2017)
300: 
301: - Scripting Access to text leading:
302:     - Added: [TextDocument.leading](../text/textdocument.md#textdocumentleading)
303: - Scripting Access to Team Projects (Beta):
304:     - Added: [Project.newTeamProject()](../general/project.md#projectnewteamproject)
305:     - Added: [Project.openTeamProject()](../general/project.md#projectopenteamproject)
306:     - Added: [Project.shareTeamProject()](../general/project.md#projectshareteamproject)
307:     - Added: [Project.syncTeamProject()](../general/project.md#projectsyncteamproject)
308:     - Added: [Project.closeTeamProject()](../general/project.md#projectcloseteamproject)
309:     - Added: [Project.convertTeamProjectToProject()](../general/project.md#projectconvertteamprojecttoproject)
310:     - Added: [Project.listTeamProjects()](../general/project.md#projectlistteamprojects)
311:     - Added: [Project.isTeamProjectOpen()](../general/project.md#projectisteamprojectopen)
312:     - Added: [Project.isAnyTeamProjectOpen()](../general/project.md#projectisanyteamprojectopen)
313:     - Added: [Project.isTeamProjectEnabled()](../general/project.md#projectisteamprojectenabled)
314:     - Added: [Project.isLoggedInToTeamProject()](../general/project.md#projectisloggedintoteamproject)
315:     - Added: [Project.isSyncCommandEnabled()](../general/project.md#projectissynccommandenabled)
316:     - Added: [Project.isShareCommandEnabled()](../general/project.md#projectissharecommandenabled)
317:     - Added: [Project.isResolveCommandEnabled()](../general/project.md#projectisresolvecommandenabled)
318:     - Added: [Project.resolveConflict()](../general/project.md#projectresolveconflict)
319: - Drop-down menus in ScriptUI panels are no longer clipped on HiDPI displays on Windows.
320: - The appearance of buttons, sliders, disclosure triangles ("twirly arrow"), scroll bar, progress bar, radio buttons, and checkboxes in ScriptUI embedded panels have been updated to match the appearance of After Effects native controls.
321: - After Effects no longer crashes when the [AVLayer.compPointToSource()](../layer/avlayer.md#avlayercomppointtosource) scripting method is used with a 3D text layer.
322: - The match name of the Fast Box Blur effect is "ADBE Box Blur2". The older match name "ADBE Box Blur" will continue to work: when used to add the effect, "ADBE Box Blur" will apply the Fast Box Blur effect, but with the older name "Box Blur"; the Iterations parameter will be set to the new default of 3.
323: 
324: ### [After Effects 14.0 (CC 2017)](https://forums.adobe.com/message/9108589) (November 2016)
325: 
326: - Scripting Access to Tools:
327:     - Added: [Project.toolType](../general/project.md#projecttooltype)
328: - Scripting Access to Composition Markers:
329:     - Added: [CompItem.markerProperty](../item/compitem.md#compitemmarkerproperty)
330: - Scripting Access to Queue in AME:
331:     - Added: [RenderQueue.queueInAME()](../renderqueue/renderqueue.md#renderqueuequeueiname)
332: - Scripting Access to Available GPU Acceleration Options:
333:     - Added: [app.availableGPUAccelTypes](../general/application.md#appavailablegpuacceltypes)
334: 
335: ---
336: 
337: ## After Effects 13
338: 
339: ### [After Effects 13.8 (CC 2015.3)](https://blogs.adobe.com/creativecloud/after-effects-cc-2015-3-in-depth-gpu-accelerated-effects/) (June 2016)
340: 
341: - Enable GPU effect rendering via scripting:
342:     - Added: [Project.gpuAccelType](../general/project.md#projectgpuacceltype)
343: - New Gaussian Blur effect added w/ matchname `ADBE Gaussian Blur 2`
344: 
345: ### [After Effects 13.6 (CC 2015)](https://blogs.adobe.com/creativecloud/whats-new-and-changed-in-the-upcoming-update-to-after-effects-cc-2015/) (November 2015)
346: 
347: - Scripting access to text baselines:
348:     - Added: [baselineLocs](../text/textdocument.md#textdocumentbaselinelocs)
349: - New scripting method to generate random numbers:
350:     - Added: [generateRandomNumber()](../general/globals.md#generaterandomnumber)
351: - Using the [copyToComp()](../layer/layer.md#layercopytocomp) scripting method no longer causes After Effects to crash when the layer has a parent.
352: - The [valueAtTime()](../property/property.md#propertyvalueattime) scripting method now waits for time-intensive expressions, like `sampleImage`, to finish evaluating before it returns the result.
353: - ScriptUI panels now display and resize correctly on high-DPI displays on Windows.
354: - After Effects no longer crashes when you click OK or Cancel buttons in a scriptUI dialog with tabbed panels.
355: 
356: ### [After Effects 13.2 (CC 2014.2)](https://blogs.adobe.com/creativecloud/after-effects-cc-2014-2-13-2/) (December 2014)
357: 
358: - Scripting improvements for text layers (read-only):
359:     - Returns boolean value:
360:         - Added: [fauxBold](../text/textdocument.md#textdocumentfauxbold)
361:         - Added: [fauxItalic](../text/textdocument.md#textdocumentfauxitalic)
362:         - Added: [allCaps](../text/textdocument.md#textdocumentallcaps)
363:         - Added: [smallCaps](../text/textdocument.md#textdocumentsmallcaps)
364:         - Added: [superscript](../text/textdocument.md#textdocumentsuperscript)
365:         - Added: [subscript](../text/textdocument.md#textdocumentsubscript)
366:     - Returns float:
367:         - Added: [verticalScale](../text/textdocument.md#textdocumentverticalscale)
368:         - Added: [horizontalScale](../text/textdocument.md#textdocumenthorizontalscale)
369:         - Added: [baselineShift](../text/textdocument.md#textdocumentbaselineshift)
370:         - Added: [tsume](../text/textdocument.md#textdocumenttsume)
371:     - Returns array of ([X,Y]) position coordinates (paragraph text layers only):
372:         - Added: [boxTextPos](../text/textdocument.md#textdocumentboxtextpos)
373: - Layer space / comp space conversion:
374:     - Added: [sourcePointToComp()](../layer/avlayer.md#avlayersourcepointtocomp)
375:     - Added: [compPointToSource()](../layer/avlayer.md#avlayercomppointtosource)
376: 
377: ### [After Effects 13.1 (CC 2014.1)](https://blogs.adobe.com/creativecloud/after-effects-cc-2014-1-13-1/) (September 2014)
378: 
379: - Scripting improvements for text layers (read-only):
380:     - returns string:
381:         - Added: [fontLocation](../text/textdocument.md#textdocumentfontlocation)
382:         - Added: [fontStyle](../text/textdocument.md#textdocumentfontstyle)
383:         - Added: [fontFamily](../text/textdocument.md#textdocumentfontfamily)
384: - "Use Legacy UI" toggle implemented
385: 
386: ---
387: 
388: ### [After Effects 13.0 (CC 2014)](https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/) (June 2014)
389: 
390: - Scripting access to render settings and output module settings:
391:     - Added: RenderQueueItem object [getSetting](../renderqueue/renderqueueitem.md#renderqueueitemgetsetting), [setSetting](../renderqueue/renderqueueitem.md#renderqueueitemsetsetting) methods
392:     - Added: RenderQueueItem object [getSettings](../renderqueue/renderqueueitem.md#renderqueueitemgetsettings), [setSettings](../renderqueue/renderqueueitem.md#renderqueueitemsetsettings) methods
393:     - Added: OutputModule object [getSetting](../renderqueue/outputmodule.md#outputmodulegetsetting), [setSetting](../renderqueue/outputmodule.md#outputmodulesetsetting) methods
394:     - Added: OutputModule object [getSettings](../renderqueue/outputmodule.md#outputmodulegetsettings), [setSettings](../renderqueue/outputmodule.md#outputmodulesetsettings) methods
395: - Fetch project item by id: [Project.itemByID()](../general/project.md#projectitembyid)
396: - CEP panels implemented
397: 
398: ---
399: 
400: ## After Effects 12
401: 
402: ### [After Effects 12.0 (CC)](https://blogs.adobe.com/creativecloud/scripting-changes-in-after-effects-cc-12-0-12-2/) (June 2013)
403: 
404: - Access to effect's internal version string:
405:     - Added: Application effects object's version attribute, see [app.effects](../general/application.md#appeffects)
406: - Ability to get and set preview mode:
407:     - Added: [ViewOptions.fastPreview](../other/viewoptions.md#viewoptionsfastpreview)
408: - Access to layer sampling method (see [samplingQuality](../layer/avlayer.md#avlayersamplingquality))
409: - Changed preference and settings methods (see [Settings object](../other/settings.md))
410: - ScriptUI is now based on the same controls as the main application.
411: 
412: ---
413: 
414: ## After Effects 11
415: 
416: ### [After Effects 11.0 (CS6)](https://web.archive.org/web/20120623073355/https://blogs.adobe.com/toddkopriva/2012/06/scripting-changes-in-after-effects-cs6-plus-new-scripting-guide.html/) (April 2012)
417: 
418: - Added: Access to [Viewer object](../other/viewer.md) object and controls:
419:     - Added: [app.activeViewer](../general/application.md#appactiveviewer)
420:     - Added: [AVLayer.openInViewer()](../layer/avlayer.md#avlayeropeninviewer) to open a layer in the layer viewer
421:     - Added: [CompItem.openInViewer()](../item/compitem.md#compitemopeninviewer) to open a composition in the composition viewer
422:     - Added: [FootageItem.openInViewer()](../item/footageitem.md#footageitemopeninviewer) to open a footage item in the footage viewer
423: - Added: [Property.canSetExpression](../property/property.md#propertycansetexpression)
424: - Added: [AVLayer.environmentLayer](../layer/avlayer.md#avlayerenvironmentlayer)
425: - Added: [MaskPropertyGroup.maskFeatherFalloff](../property/maskpropertygroup.md#maskpropertygroupmaskfeatherfalloff)
426: - Access to Shape Feather properties via scripting:
427:     - Added: [Shape.featherSegLocs](../other/shape.md#shapefeatherseglocs)
428:     - Added: [Shape.featherRelSegLocs](../other/shape.md#shapefeatherrelseglocs)
429:     - Added: [Shape.featherRadii](../other/shape.md#shapefeatherradii)
430:     - Added: [Shape.featherInterps](../other/shape.md#shapefeatherinterps)
431:     - Added: [Shape.featherTensions](../other/shape.md#shapefeathertensions)
432:     - Added: [Shape.featherTypes](../other/shape.md#shapefeathertypes)
433:     - Added: [Shape.featherRelCornerAngles](../other/shape.md#shapefeatherrelcornerangles)
434: 
435: ---
436: 
437: ## After Effects 10
438: 
439: ### [After Effects 10.5 (CS5.5)](https://web.archive.org/web/20121022055915/http://blogs.adobe.com/toddkopriva/2008/12/after-effects-cs4-scripting-ch.html/) (April 2011)
440: 
441: - Added to the [Project object](../general/project.md) object:
442:     - [Project.framesCountType](../general/project.md#projectframescounttype)
443:     - [Project.feetFramesFilmType](../general/project.md#projectfeetframesfilmtype)
444:     - [Project.framesUseFeetFrames](../general/project.md#projectframesusefeetframes)
445:     - [Project.footageTimecodeDisplayStartType](../general/project.md#projectfootagetimecodedisplaystarttype)
446:     - [Project.timeDisplayType](../general/project.md#projecttimedisplaytype)
447: - Removed from the [Project object](../general/project.md) object:
448:     - `timecodeDisplayType` attribute
449:     - `timecodeBaseType` attribute
450:     - `timecodeNTSCDropFrame` attribute
451:     - `timecodeFilmType` attribute
452:     - `TimecodeDisplayType` enum
453:     - `TimecodeFilmType` enum
454:     - `TimecodeBaseType` enum
455: - Added: [CompItem.dropFrame](../item/compitem.md#compitemdropframe)
456: - Added support for Paragraph Box Text:
457:     - Added [LayerCollection.addBoxText()](../layer/layercollection.md#layercollectionaddboxtext)
458:     - Added [TextDocument.boxText](../text/textdocument.md#textdocumentboxtext)
459:     - Added [TextDocument.pointText](../text/textdocument.md#textdocumentpointtext)
460:     - Added [TextDocument.boxTextSize](../text/textdocument.md#textdocumentboxtextsize)
461: - Added [LightLayer.lightType](../layer/lightlayer.md#lightlayerlighttype)
462: 
463: ---
464: 
465: ## After Effects 9
466: 
467: ### [After Effects 9.0 (CS4)](https://web.archive.org/web/20121022055915/http://blogs.adobe.com/toddkopriva/2008/12/after-effects-cs4-scripting-ch.html/) (September 2008)
468: 
469: - Added: [app.isoLanguage](../general/application.md#appisolanguage)
470: - Added: [MarkerValue.duration](../other/markervalue.md#markervalueduration)
471: - Added: [OutputModule.includeSourceXMP](../renderqueue/outputmodule.md#outputmoduleincludesourcexmp)
472: - Added: [Project.xmpPacket](../general/project.md#projectxmppacket)
473: - Added the following Property methods and attributes related to the Separate Dimensions feature:
474:     - [Property.dimensionsSeparated](../property/property.md#propertydimensionsseparated)
475:     - [Property.getSeparationFollower()](../property/property.md#propertygetseparationfollower)
476:     - [Property.isSeparationFollower](../property/property.md#propertyisseparationfollower)
477:     - [Property.isSeparationLeader](../property/property.md#propertyisseparationleader)
478:     - [Property.separationDimension](../property/property.md#propertyseparationdimension)
479:     - [Property.separationLeader](../property/property.md#propertyseparationleader)
480: - Added [TextDocument object](../text/textdocument.md) access, including:
481:     - Added: [TextDocument.applyFill](../text/textdocument.md#textdocumentapplyfill)
482:     - Added: [TextDocument.applyStroke](../text/textdocument.md#textdocumentapplystroke)
483:     - Added: [TextDocument.fillColor](../text/textdocument.md#textdocumentfillcolor)
484:     - Added: [TextDocument.font](../text/textdocument.md#textdocumentfont)
485:     - Added: [TextDocument.fontSize](../text/textdocument.md#textdocumentfontsize)
486:     - Added: [TextDocument.justification](../text/textdocument.md#textdocumentjustification)
487:     - Added: [TextDocument.resetCharStyle()](../text/textdocument.md#textdocumentresetcharstyle)
488:     - Added: [TextDocument.resetParagraphStyle()](../text/textdocument.md#textdocumentresetparagraphstyle)
489:     - Added: [TextDocument.strokeColor](../text/textdocument.md#textdocumentstrokecolor)
490:     - Added: [TextDocument.strokeOverFill](../text/textdocument.md#textdocumentstrokeoverfill)
491:     - Added: [TextDocument.strokeWidth](../text/textdocument.md#textdocumentstrokewidth)
````

## File: docs/official/introduction/classhierarchy.md
````markdown
 1: # After Effects Class Hierarchy
 2: 
 3: This section lists the class hierarchies for relevant AE API elements. For a primer on what this means, see [Javascript Classes](javascript.md#javascript-classes)
 4: 
 5: When using this guide, any objects that exist as part of a class hierarchy will note whether they exist as a subclass or base class (or both) of another object.
 6: 
 7: As it can be useful to see all available class hierarchies in one place, we've created this list below.
 8: 
 9: Note that some classes exist only as base classes, and demonstrate unexpected behaviour when type checking via `instanceof`, as noted in the table below. Classes with no symbol behave as expected.
10: 
11: #### Symbol Legend
12: 
13: | Symbol |                      Definition                      |
14: | ------ | ---------------------------------------------------- |
15: | ⚠      | `instanceof` is always `false`                       |
16: | ❌      | Class is undefined; `instanceof` will throw an error |
17: 
18: ---
19: 
20: ## Properties, Property Groups, and Layers
21: 
22: - [PropertyBase object](../property/propertybase.md) ⚠
23:     - [Property object](../property/property.md)
24:     - [PropertyGroup object](../property/propertygroup.md)
25:         - [MaskPropertyGroup object](../property/maskpropertygroup.md)
26:         - [Layer object](../layer/layer.md) ⚠
27:             - [AVLayer object](../layer/avlayer.md)
28:                 - [ShapeLayer object](../layer/shapelayer.md)
29:                 - [TextLayer object](../layer/textlayer.md)
30:             - [CameraLayer object](../layer/cameralayer.md)
31:             - [LightLayer object](../layer/lightlayer.md)
32: 
33: ---
34: 
35: ## Project Items
36: 
37: - [Item object](../item/item.md) ❌
38:     - [AVItem object](../item/avitem.md) ❌
39:         - [CompItem object](../item/compitem.md)
40:         - [FootageItem object](../item/footageitem.md)
41:     - [FolderItem object](../item/folderitem.md)
42: 
43: ---
44: 
45: ## Footage Item Sources
46: 
47: - [FootageSource object](../sources/footagesource.md) ❌
48:     - [FileSource object](../sources/filesource.md)
49:     - [PlaceholderSource object](../sources/placeholdersource.md)
50:     - [SolidSource object](../sources/solidsource.md)
51: 
52: ---
53: 
54: ## Collections
55: 
56: - [Collection object](../other/collection.md) ❌
57:     - [ItemCollection object](../item/itemcollection.md)
58:     - [LayerCollection object](../layer/layercollection.md)
59:     - [OMCollection object](../renderqueue/omcollection.md)
60:     - [RQItemCollection object](../renderqueue/rqitemcollection.md)
````

## File: docs/official/introduction/javascript.md
````markdown
  1: # Elements of basic JavaScript relevant to After Effects scripting
  2: 
  3: ## Javascript Variables
  4: 
  5: Scripting shares a global environment, so any script executed at startup can define variables and functions that are available to all scripts. In all cases, variables and functions, once defined by running a script that contains them, persist in subsequent scripts during a given After Effects session. Once the application is quit, all such globally defined variables and functions are cleared. Scripters should be careful about giving variables in scripts unique names, so that a script does not inadvertently reassign global variables intended to persist throughout a session.
  6: 
  7: ### Keywords and Statement Syntax
  8: 
  9: | Keyword/Statement |                                                             Description                                                              |
 10: | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
 11: | `break`           | Standard JavaScript; exit the currently executing loop.                                                                              |
 12: | `continue`        | JavaScript; cease execution of the current loop iteration.                                                                           |
 13: | `case`            | Label used in a `switch` statement.                                                                                                  |
 14: | `default`         | Label used in a `switch` statement when a `case` label is not found.                                                                 |
 15: | `do...while`      | Standard JavaScript construct. Similar to the while loop, except loop condition evaluation occurs at the end of the loop.            |
 16: | `false`           | Literal representing the Boolean false value.                                                                                        |
 17: | `for`             | Standard JavaScript loop construct.                                                                                                  |
 18: | `for...in`        | Standard JavaScript construct. Provides a way to easily loop through the properties of an object.                                    |
 19: | `function`        | Used to define a function.                                                                                                           |
 20: | `if/if...else`    | Standard JavaScript conditional constructs.                                                                                          |
 21: | `new`             | Standard JavaScript constructor statement.                                                                                           |
 22: | `null`            | Assigned to a variable, array element, or object property to indicate that it does not contain a legalvalue.                         |
 23: | `return`          | Standard JavaScript way of returning a value from a function or exiting a function.                                                  |
 24: | `switch`          | Standard JavaScript way of evaluating a JavaScript expression and attempting to match the expression's value to a `case` label.      |
 25: | `this`            | Standard JavaScript method of indicating the current object.                                                                         |
 26: | `true`            | Literal representing the Boolean true value.                                                                                         |
 27: | `undefined`       | Indicates that the variable, array element, or object property has not yet been assigned a value.                                    |
 28: | `var`             | Standard JavaScript syntax used to declare a local variable.                                                                         |
 29: | `while`           | Standard JavaScript construct. Similar to the do...while loop, except loop condition evaluation occurs at the beginning of the loop. |
 30: | `with`            | Standard JavaScript construct used to specify an object to use in subsequent statements.                                             |
 31: 
 32: ---
 33: 
 34: ## Javascript Operators
 35: 
 36: The following tables list and describe all operators recognized by the After Effects scripting engine and show the precedence and associativity for all operators.
 37: 
 38: ### Description of Operators
 39: 
 40: |         Operators         |                       Description                       |
 41: | ------------------------- | ------------------------------------------------------- |
 42: | `new`                     | Create new object instance.                             |
 43: | `delete`                  | Delete property from an object.                         |
 44: | `typeof`                  | Returns data type.                                      |
 45: | `void`                    | Returns undefined value.                                |
 46: | `.`                       | Object member.                                          |
 47: | `[]`                      | Array element.                                          |
 48: | `()`                      | Function call.                                          |
 49: | `++`                      | Pre- or post-increment.                                 |
 50: | `--`                      | Pre- or post-decrement.                                 |
 51: | `-`                       | Unary negation or subtraction.                          |
 52: | `~`                       | Bitwise NOT.                                            |
 53: | `!`                       | Logical NOT.                                            |
 54: | `*`                       | Multiply.                                               |
 55: | `/`                       | Divide.                                                 |
 56: | `%`                       | Modulo division.                                        |
 57: | `+`                       | Add.                                                    |
 58: | `<<`                      | Bitwise left shift.                                     |
 59: | `>>`                      | Bitwise right shift.                                    |
 60: | `>>>`                     | Unsigned bitwise right shift.                           |
 61: | `<`                       | Less than.                                              |
 62: | `<=`                      | Less than or equal.                                     |
 63: | `>`                       | Greater than.                                           |
 64: | `>=`                      | Greater than or equal.                                  |
 65: | `==`                      | Equal.                                                  |
 66: | `!=`                      | Not equal.                                              |
 67: | `&`                       | Bitwise AND.                                            |
 68: | `^`                       | Bitwise XOR.                                            |
 69: | <code>&#124;</code>       | Bitwise OR.                                             |
 70: | `&&`                      | Logical AND.                                            |
 71: | <code>&#124;&#124;</code> | Logical OR.                                             |
 72: | `?:`                      | Conditional (ternary).                                  |
 73: | `=`                       | Assignment.                                             |
 74: | `+=`                      | Assignment with add operation.                          |
 75: | `-=`                      | Assignment with subtract operation.                     |
 76: | `*=`                      | Assignment with multiply operation.                     |
 77: | `/=`                      | Assignment with divide operation.                       |
 78: | `%=`                      | Assignment with modulo division operation.              |
 79: | `<<=`                     | Assignment with bitwise left shift operation.           |
 80: | `>>=`                     | Assignment with bitwise right shift operation.          |
 81: | `>>>=`                    | Assignment with unsigned bitwise right shift operation. |
 82: | `&=`                      | Assignment with bitwise AND operation.                  |
 83: | `^=`                      | Assignment with bitwise XOR operation.                  |
 84: | <code>&#124;=</code>      | Assignment with bitwise OR operation.                   |
 85: | `,`                       | Multiple evaluation.                                    |
 86: 
 87: ### Operator Precedence
 88: 
 89: |                  Operators (highest precedence to lowest)                  | Associativity |
 90: | -------------------------------------------------------------------------- | ------------- |
 91: | `[]`, `()`, `.`                                                            | left to right |
 92: | `new`, `delete`, `-` (unary negation), `!`, `typeof`, `void`, `++`, `--`   | right to left |
 93: | `*`, `/`, `%`                                                              | left to right |
 94: | `+`, `-` (subtraction)                                                     | left to right |
 95: | `<<`, `>>`, `>>>`                                                          | left to right |
 96: | `<`, `<=`, `>`, `>=`                                                       | left to right |
 97: | `==`, `!=`                                                                 | left to right |
 98: | `&`                                                                        | left to right |
 99: | `^`                                                                        | left to right |
100: | `\`                                                                        | left to right |
101: | `&&`                                                                       | left to right |
102: | <code>&#124;&#124;</code>                                                  | left to right |
103: | `?:`                                                                       | right to left |
104: | `==`, `/=`, `%=`, `<<=`, `>>=`, `>>>=`, `&=`, `^=`, `\=`, `+=`, `-=`, `*=` | right to left |
105: | `,`                                                                        | left to right |
106: 
107: ---
108: 
109: ## Javascript Classes
110: 
111: ### Class Inheritance
112: 
113: This is section gives you a brief overview in oriented programming and inheritance. If you already know about this, you can skip this section.
114: 
115: In Javascript/Extendscript, Class Inheritance is the idea that you can define some properties or methods for a given object, and then create a *subclass* (or "child class") that inherits all of those properties & methods and adds more, further refining it.
116: 
117: For example, "automobile" could be one base class, with "cars" being a subclass of the "automobile" base class, with "sedan" and "convertible" being two subclasses of the "car" base class. Any properties or methods from "automobile" are also accessible by "convertible," because there's a direct inheritance from "automobile" -> "car" -> "convertible".
118: 
119: ### Class Inheritance in After Effects
120: 
121: As a script developer, this is useful to know because many elements in the After Effects scripting environment follows this pattern.
122: 
123: As a user, you can see this in After Effects layers; every layer exists in the timeline, has a Name and Index and Label Color, but some types of layers have different properties than others - for example, Audio layers can't be enable/disabled, and Camera and Light layers can't have effects. They share the base "Layer" features, but are each **subclasses** with their own properties.
124: 
125: The same idea exists in After Effects scripting. Many API-accessible elements are part of class hierarchies that inherit and refine properties & methods. This lets the After Effects developers use existing structures to create new API-accessible components, and it allows script developers to use this same hierarchy to work with the After Effects DOM.
126: 
127: For the same example above, [Layer object](../layer/layer.md) (itself a subclass of [PropertyGroup object](../property/propertygroup.md)) is the *base class* for [AVLayer object](../layer/avlayer.md), [CameraLayer object](../layer/cameralayer.md), and [LightLayer object](../layer/lightlayer.md). This means that CameraLayer inherits everything from the Layer object, which inherits everything from the PropertyGroup object, which inherits everything from the PropertyBase object.
128: 
129: This is why you won't see the `name` property on the Layer page, but you can still use `layer.name` in your script; `name` is inherited from [PropertyBase.name](../property/propertybase.md#propertybasename).
130: 
131: !!! warning
132:     In a few specific cases, properties & methods are **removed** with inheritance, not just added. Those cases are noted on the relevant object page.
133: 
134: ### Checking Classes
135: 
136: Typically in Javascript, you can use `instanceof` to check whether any given element matches an expected object type.
137: 
138: Keep in mind that you will need to check against the *most specific* class possible; an AE Text Layer will only return `true` for `layer instanceof TextLayer`, and `false` for all parent classes (`layer instanceof AVLayer`, `layer instanceof Layer`, etc.)
139: 
140: With that said, there exist some elements in the API that are *only* base classes for other classes; they exist to hold inherited properties & methods, but no DOM element is exactly of this type.
141: 
142: When checking `object instanceof {class}` with these classes, AE will either throw an error that `{class} is undefined` or return `false`, depending on how the class was implemented. The list below documents which base-only classes report which behaviours.
````

## File: docs/official/introduction/objectmodel.md
````markdown
 1: # The After Effects Object Model
 2: 
 3: As you look through this reference section, which is organized alphabetically by object, you can refer to the following diagrams for an overview of where the various objects fall within the hierarchy, and their correspondence to the user interface.
 4: 
 5: ![After Effects Object Model](../_static/objectmodel.png "After Effects Object Model")
 6: *Hierarchy diagram of the main After Effects scripting objects*
 7: 
 8: Note that the [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html), Folder, and Socket objects are defined by ExtendScript, and are documented in the [JavaScript Tools Guide](https://extendscript.docsforadobe.dev/).
 9: 
10: ExtendScript also defines the ScriptUI module, a set of window and user-interface control objects, which are available to After Effects scripts. These are also documented in the [JavaScript Tools Guide](https://extendscript.docsforadobe.dev/).
11: 
12: The hierarchy of objects in scripting corresponds to the hierarchy in the user interface.
13: 
14: ![After Effects User Interface](../_static/application.png "After Effects User Interface")
15: 
16: The application contains a Project panel, which displays a project. The project contains compositions, which contain layers. The source for a layer can be a footage file, placeholder, or solid, also listed in the Project panel. Each layer contains settings known as properties, and these can contain markers and keyframes. The renderqueue contains render-queue items as well as render settings and output modules. All of these entities are represented by objects in scripting.
17: 
18: !!! note
19:     To avoid ambiguity, this manual uses the term "attribute" to refer to JavaScript object properties, and the term "property" or "AE property" to refer to After Effects layer properties.
20: 
21: #### Object summary
22: 
23: The following table lists all objects alphabetically, with links to the documentation page for each.
24: 
25: |                            Object                             |                                                                     Description                                                                     |
26: | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
27: | [Global functions](../general/globals.md)                     | Globally available functions that allow you to display text for script debugging purposes, and help convert time values between seconds and frames. |
28: | [Application object](../general/application.md)               | A single global object, available by its name (app), that provides access to objects and application settings within the After Effects application. |
29: | [AVItem object](../item/avitem.md)                            | Represents audio/visual files imported into After Effects.                                                                                          |
30: | [AVLayer object](../layer/avlayer.md)                         | Represents those layers that contain AVItem objects (composition layers, footage layers, solid layers, text layers, and sound layers).              |
31: | [CameraLayer object](../layer/cameralayer.md)                 | Represents a camera layer within a composition.                                                                                                     |
32: | [Collection object](../other/collection.md)                   | Associates a set of objects or values as a logical group and provides access to them by index.                                                      |
33: | [CompItem object](../item/compitem.md)                        | Represents a composition, and allows you to manipulate it and get information about it.                                                             |
34: | [FileSource object](../sources/filesource.md)                 | Describes footage that comes from a file.                                                                                                           |
35: | [FolderItem object](../item/folderitem.md)                    | Represents a folder in the Project panel.                                                                                                           |
36: | [FootageItem object](../item/footageitem.md)                  | Represents a footage item imported into a project, which appears in the Project panel.                                                              |
37: | [FootageSource object](../sources/footagesource.md)           | Describes the file source of some footage.                                                                                                          |
38: | [ImportOptions object](../other/importoptions.md)             | Encapsulates options for importing files into After Effects.                                                                                        |
39: | [Item object](../item/item.md)                                | Represents an item in a project that appears in the Project panel.                                                                                  |
40: | [ItemCollection object](../item/itemcollection.md)            | Collects items in a project.                                                                                                                        |
41: | [KeyframeEase object](../other/keyframeease.md)               | Encapsulates keyframe ease values in an After Effects property.                                                                                     |
42: | [Layer object](../layer/layer.md)                             | A base class for layer classes.                                                                                                                     |
43: | [LayerCollection object](../layer/layercollection.md)         | Collects layers in a project.                                                                                                                       |
44: | [LightLayer object](../layer/lightlayer.md)                   | Represents a light layer within a composition.                                                                                                      |
45: | [MarkerValue object](../other/markervalue.md)                 | Encapsulates marker values in an After Effects property.                                                                                            |
46: | [MaskPropertyGroup object](../property/maskpropertygroup.md)  | Encapsulates mask attributes in a layer.                                                                                                            |
47: | [OMCollection object](../renderqueue/omcollection.md)         | Collects output modules in a render queue.                                                                                                          |
48: | [OutputModule object](../renderqueue/outputmodule.md)         | Represents an output module for a render queue.                                                                                                     |
49: | [PlaceholderSource object](../sources/placeholdersource.md)   | Describes a placeholder for footage.                                                                                                                |
50: | [Project object](../general/project.md)                       | Represents an After Effects project.                                                                                                                |
51: | [Property object](../property/property.md)                    | Represents an After Effects property.                                                                                                               |
52: | [PropertyBase object](../property/propertybase.md)            | A base class for After Effects property and property group classes.                                                                                 |
53: | [PropertyGroup object](../property/propertygroup.md)          | Represents an After Effects property group.                                                                                                         |
54: | [RenderQueue object](../renderqueue/renderqueue.md)           | Represents the After Effects render queue.                                                                                                          |
55: | [RenderQueueItem object](../renderqueue/renderqueueitem.md)   | Represents a renderable item in a render queue.                                                                                                     |
56: | [RenderQueueItem object](../renderqueue/renderqueueitem.md)   | Collects render-queue items in a render queue.                                                                                                      |
57: | [RQItemCollection object](../renderqueue/rqitemcollection.md) | Provides access to application settings and preferences.                                                                                            |
58: | [Shape object](../other/shape.md)                             | Encapsulates the outline shape information for a mask.                                                                                              |
59: | [ShapeLayer object](../layer/shapelayer.md)                   | Represents a shape layer within a composition.                                                                                                      |
60: | [SolidSource object](../sources/solidsource.md)               | Describes a solid color that is the source of some footage.                                                                                         |
61: | [System object](../general/system.md)                         | Provides access to the operating system from the application.                                                                                       |
62: | [TextDocument object](../text/textdocument.md)                | Encapsulates the text in a text layer.                                                                                                              |
63: | [TextLayer object](../layer/textlayer.md)                     | Represents a text layer within a composition.                                                                                                       |
64: | [Viewer object](../other/viewer.md)                           | Represents a Composition, Layer, or Footage panel.                                                                                                  |
````

## File: docs/official/introduction/overview.md
````markdown
  1: ---
  2: toc_depth: 2
  3: ---
  4: 
  5: # Overview
  6: 
  7: ## Introduction to scripting in After Effects
  8: 
  9: A script is a series of commands that tells an application to perform a series of operations. You can use scripts in most Adobe applications to automate repetitive tasks, perform complex calculations, and even use some functionality not directly exposed through the graphical user interface. For example, you can direct After Effects to reorder the layers in a composition, find and replace source text in text layers, or send an e-mail message when rendering is complete.
 10: 
 11: Although both the After Effects expressions language and the After Effects ExtendScript scripting language is based on JavaScript, the expressions features and scripting features of After Effects are separate and distinct. Expressions cannot access information from scripts (such as variables and functions). Whereas a script tells an application to do something, an expression says that a property is something. However, because the After Effects expression language and ExtendScript are both based on JavaScript, familiarity with either one is very helpful in understanding the other.
 12: 
 13: The heart of a scriptable application is the object model. When you use Adobe After Effects, you create projects, compositions, and render queue items along with all of the elements that they contain: footage, images, solids, layers, masks, effects, and properties. Each of these items, in scripting terms, is an object. This guide describes the ExtendScript objects that have been defined for After Effects projects.
 14: 
 15: The After Effects object model is composed of a project, items, compositions, layers, and render queue items. Each object has its own special attributes, and every object in an After Effects project has its own identity (although not all are accessible to scripting). You should be familiar with the After Effects object model in order to create scripts.
 16: 
 17: !!! note
 18:     JavaScript objects normally referred to as "properties" are consistently called "attributes" in this guide, to avoid confusion with After Effects' own definition of a property (an animatable value of an effect, mask, or transform within an individual layer).
 19: 
 20: Nearly all of what scripting can accomplish replicates what can be done by means of the After Effects graphical user interface. A thorough knowledge of the application itself and its graphical user interface is essential to understanding how to use scripting in After Effects.
 21: 
 22: ---
 23: 
 24: ## The ExtendScript language
 25: 
 26: After Effects scripts use the Adobe ExtendScript language, which is an extended form of JavaScript used by several Adobe applications, including Photoshop, Illustrator, and InDesign. ExtendScript implements the JavaScript language according to the ECMA-262 specification. The After Effects scripting engine supports the 3rd Edition of the ECMA-262 Standard, including its notational and lexical conventions, types, objects, expressions, and statements. ExtendScript also implements the E4X ECMA-357 specification, which defines access to data in XML format.
 27: 
 28: ExtendScript defines a global debugging object, the dollar (`$`) object, and a reporting utility for ExtendScript elements, the ExtendScript Reflection interface.
 29: 
 30: ### File and Folder Objects
 31: 
 32: Because pathname syntax is very different in different operating systems, Adobe ExtendScript defines [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) and [Extendscript Folder](https://extendscript.docsforadobe.dev/file-system-access/folder-object.html) objects to provide platform-independent access to the underlying file system.
 33: 
 34: ### ScriptUI User Interface Module
 35: 
 36: The ExtendScript ScriptUI module provides the ability to create and interact with user interface elements. ScriptUI provides an object model for windows and UI control elements that you can use to create a user interface for your scripts.
 37: 
 38: ### Tools and Utilities
 39: 
 40: In addition, ExtendScript provides tools and features such as a localization utility for providing user-interface string values in different languages and global functions for displaying short messages in dialog boxes (alert, confirm, and prompt).
 41: 
 42: ### External Communication
 43: 
 44: ExtendScript provides a Socket object that allows you to communicate with remote systems from your After Effects scripts.
 45: 
 46: ### Interapplication Communication
 47: 
 48: ExtendScript provide s a common scripting environment for all Adobe applications, and allows inter-application communication through scripts.
 49: 
 50: ---
 51: 
 52: ## The ExtendScript Toolkit (ESTK)
 53: 
 54: After Effects includes a script editor and debugger, the ExtendScript Toolkit (ESTK), which provides a convenient interface for creating and testing your own scripts.
 55: 
 56: To start the ESTK, choose File > Scripts > Open Script Editor.
 57: 
 58: If you choose to use another text editor to create, edit, and save scripts, be sure to choose an application that does not automatically add header information when saving files and that saves with Unicode (UTF-8) encoding. In many text editors, you can set preferences for saving with UTF-8 encoding. Some applications (such as Microsoft Word) by default add header information to files that can cause "line 0" errors in scripts, causing them to fail.
 59: 
 60: For detailed information on the ExtendScript Toolkit, see the [JavaScript Tools Guide](https://extendscript.docsforadobe.dev/).
 61: 
 62: ---
 63: 
 64: ## The .jsx and .jsxbin file-name extensions
 65: 
 66: ExtendScript script files are distinguished by the `.jsx` file-name extension, a variation on the standard `.js` extension used with JavaScript files. After Effects scripts must include the `.jsx` file extension in order to be properly recognized by the application. Any UTF-8-encoded text file with the `.jsx` extension is recognized as an ExtendScript file.
 67: 
 68: You can use the ExtendScript Toolkit to export a binary version of an ExtendScript file, which has the extension .jsxbin. Such a binary file may not be usable with all of the scripting integration features in After Effects.
 69: 
 70: ---
 71: 
 72: ## Activating full scripting features
 73: 
 74: The default is for scripts to not be allowed to write files or send or receive communication over a network. To allow scripts to write files and communicate over a network, choose Edit > Preferences > General (Windows) or After Effects > Preferences > General (Mac OS), and select the Allow Scripts To Write Files And Access Network option.
 75: 
 76: Any After Effects script that contains an error preventing it from being completed generates an error message from the application. This error message includes information about the nature of the error and the line of the script on which it occurred. The ExtendScript Toolkit (ESTK) debugger can open automatically when the application encounters a script error. This feature is disabled by default so that casual users do not encounter it. To activate this feature, choose Preferences > General, and select Enable JavaScript Debugger.
 77: 
 78: ---
 79: 
 80: ## Loading and running scripts
 81: 
 82: ### Running scripts directly from the File > Scripts menu
 83: 
 84: When After Effects starts, it searches the Scripts folder for scripts to load. Loaded scripts are available from the File > Scripts menu.
 85: 
 86: To run a loaded script, choose File > Scripts > [script name].
 87: 
 88: If you edit a script while After Effects is running, you must save your changes for the changes to be applied. If you place a script in the Scripts folder while After Effects is running, you must restart After Effects for the script to appear in the Scripts menu, though you can immediately run the new script using the Run Script File command.
 89: 
 90: ### Running scripts using File > Scripts > Run Script File
 91: 
 92: To run a script that has not been loaded, choose File > Scripts > Run Script File, locate and select a script, and click Open.
 93: 
 94: ### Running scripts from the command line, a batch file, or an AppleScript script
 95: 
 96: If you are familiar with how to run a script from the command line in Windows or via AppleScript, you can send a script directly to the open After Effects application, so that the application automatically runs the script.
 97: 
 98: To run a script from the command line, call afterfx.exe from the command line. Use the `-r` switch and the full path of the script to run as arguments. This command does not open a new instance of the After Effects application; it runs the script in the existing instance.
 99: 
100: Example (for Windows):
101: 
102: ```bat
103: afterfx -r c:\script_path\example_script.jsx
104: ```
105: 
106: You can use this command-line technique—together with the software that comes with a customizable keyboard—to bind the invocation of a script to a keyboard shortcut.
107: 
108: Following are examples of Windows command-line entries that will send an After Effects script to the application without using the After Effects user interface to execute the script.
109: 
110: In the first example, you copy and paste your After Effects script directly on the command line and then run it. The script text appears in quotation marks following the `afterfx.exe -s` command:
111: 
112: ```javascript
113: afterfx.exe -s "alert("You just sent an alert to After Effects")"
114: ```
115: 
116: Alternatively, you can specify the location of the JSX file to be executed. For example:
117: 
118: ```bat
119: afterfx.exe -r c:\myDocuments\Scripts\yourAEScriptHere.jsx
120: afterfx.exe -r "c:\myDocuments\Scripts\Script Name with Spaces.jsx"
121: ```
122: 
123: If the program closes immediately after executing the command, you may need to remove the quotes from the script path in this command line:
124: 
125: ```bat
126: afterfx.exe -r c:\myDocuments\Scripts\Script Name with Spaces.jsx
127: ```
128: 
129: ### How to include After Effects scripting in an AppleScript (Mac OS)
130: 
131: The following are three examples of AppleScript scripts that will send an existing JSX file containing an After Effects script to the application without using the After Effects user interface to execute the script.
132: 
133: In the first example, you copy your After Effects script directly into the Script Editor and then run it. The script text appears within quotation marks following the DoScript command, so internal quotes in the script must be escaped using the backslash escape character, as follows
134: 
135: ```applescript
136: tell application "Adobe After Effects CS6"
137:     DoScript "alert(\"You just sent an alert to After Effects\")"
138: end tell
139: ```
140: 
141: Alternatively, you could display a dialog box asking for the location of the JSX file to be executed, as follows:
142: 
143: ```applescript
144: set theFile to choose file
145: tell application "Adobe After Effects CS6"
146:     DoScriptFile theFile
147: end tell
148: ```
149: 
150: Finally, this script is perhaps most useful when you are working directly on editing a JSX script and want to send it to After Effects for testing or to run. To use it effectively you must enter the application that contains the open JSX file (in this example it is TextEdit); if you do not know the proper name of the application, type in your best guess to replace "TextEdit" and AppleScript prompts you to locate it.
151: 
152: Simply highlight the script text that you want to run, and then activate this AppleScript:
153: 
154: ```applescript
155: (*
156: This script sends the current selection to After Effects as a script.
157: *)
158: 
159: tell application "TextEdit"
160:     set the_script to text of front document
161: end tell
162: 
163: tell application "Adobe After Effects CS6" activate
164:     DoScript the_script
165: end tell
166: ```
167: 
168: ### Running scripts automatically during application startup or shutdown
169: 
170: Within the Scripts folder are two folders called Startup and Shutdown. After Effects runs scripts in these folders automatically, in alphabetical order, on starting and quitting, respectively.
171: 
172: In the Startup folder, you can place scripts that you wish to execute at startup of the application. They are executed after the application is initialized and all plug-ins are loaded.
173: 
174: Scripting shares a global environment, so any script executed at startup can define variables and functions that are available to all scripts. In all cases, variables and functions, once defined by running a script that contains them, persist in subsequent scripts during a given After Effects session. Once the application is quit, all such globally defined variables and functions are cleared. Be sure to give variables in scripts unique names, so that a script does not inadvertently reassign global variables intended to persist throughout a session.
175: 
176: Attributes can also be added to existing objects such as the [Application object](../general/application.md) to extend the application for other scripts.
177: 
178: The Shutdown folder scripts are executed as the application quits. This occurs after the project is closed but before any other application shutdown occurs
179: 
180: ### Running scripts from the Window menu
181: 
182: Scripts in the ScriptUI Panels folder are available from the bottom of the Window menu. If a script has been written to provide a user interface in a dockable panel, the script should be put in the ScriptUI folder. ScriptUI panels work much the same as the default panels in the After Effects user interface.
183: 
184: Instead of creating a Window object and adding controls to it, a ScriptUI Panels script uses the `this` object that represents the panel. For example, the following code adds a button to a panel:
185: 
186: ```javascript
187: var myPanel = this;
188: myPanel.add("button", [10, 10, 100, 30], "Tool #1");
189: ```
190: 
191: If your script creates its user interface in a function, you cannot use `this` as it will refer to the function itself, not the panel. In this case, you should pass the `this` object as an argument to your function. For example:
192: 
193: ```javascript
194: function createUI(thisObj) {
195:     var myPanel = thisObj;
196:     myPanel.add("button", [10, 10, 100, 30], "Tool #1");
197:     return myPanel;
198: }
199: var myToolsPanel = createUI(this);
200: ```
201: 
202: You cannot use the File > Scripts > Run Script File menu command to run a script that refers to this. To make your script work with either a Window object (accessible from the File > Scripts menu) or a native panel (accessible from the Window menu), check whether this is a Panel object. For example:
203: 
204: ```javascript
205: function createUI(thisObj) {
206:     var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "My Tools",
207:     [100, 100, 300, 300]);
208:     myPanel.add("button", [10, 10, 100, 30], "Tool #1");
209:     return myPanel;
210: }
211: var myToolsPanel = createUI(this);
212: ```
213: 
214: ### Stopping a running script
215: 
216: A script can be stopped by pressing Esc or Cmd+period (in Mac OS) when the After Effects or the script's user interface has focus. However, a script that is busy processing a lot of data might not be very responsive.
````

## File: docs/official/item/avitem.md
````markdown
  1: # AVItem object
  2: 
  3: `app.project.item(index)`
  4: 
  5: #### Description
  6: 
  7: The AVItem object provides access to attributes and methods of audio/visual files imported into After Effects.
  8: 
  9: !!! info
 10:     AVItem is a subclass of Item. All methods and attributes of Item, in addition to those listed below, are available when working with AVItem. See [Item object](item.md)
 11: 
 12: !!! info
 13:     AVItem is the base class for both CompItem and FootageItem, so AVItem attributes and methods are also available when working with CompItem and FootageItem objects. See [CompItem object](compitem.md) and [FootageItem object](footageitem.md).
 14: 
 15: !!! warning
 16:     CompItems and FootageItems, while logical descendants of AVItem, are not *really* subclasses of AVItem as AVItem doesn't exist in Extendscript, ie. attempting to check if `item instanceof AVItem` will fail because AVItem is undefined. This is also true for `Item` itself.
 17: 
 18: See [Javascript Classes](../introduction/javascript.md#javascript-classes) and [After Effects Class Hierarchy](../introduction/classhierarchy.md) for more info.
 19: 
 20: ---
 21: 
 22: ## Attributes
 23: 
 24: ### AVItem.duration
 25: 
 26: `app.project.item(index).duration`
 27: 
 28: #### Description
 29: 
 30: Returns the duration, in seconds, of the item. Still footage items have a duration of 0.
 31: 
 32: - In a CompItem, the value is linked to the duration of the composition, and is read/write.
 33: - In a FootageItem, the value is linked to the `duration` of the `mainSource` object, and is read-only.
 34: 
 35: #### Type
 36: 
 37: Floating-point value, in the range `[0.0..10800.0]`; read/write for a [CompItem](../item/compitem.md); otherwise, read-only.
 38: 
 39: ---
 40: 
 41: ### AVItem.footageMissing
 42: 
 43: `app.project.item(index).footageMissing`
 44: 
 45: #### Description
 46: 
 47: When `true`, the AVItem is a placeholder, or represents footage with a source file that cannot be found. In this case, the path of the missing source file is in the `missingFootagePath` attribute of the footage item's source-file object. See [FootageItem.mainSource](footageitem.md#footageitemmainsource) and [FileSource.missingFootagePath](../sources/filesource.md#filesourcemissingfootagepath).
 48: 
 49: #### Type
 50: 
 51: Boolean; read-only.
 52: 
 53: ---
 54: 
 55: ### AVItem.frameDuration
 56: 
 57: `app.project.item(index).frameDuration`
 58: 
 59: #### Description
 60: 
 61: Returns the length of a frame for this AVItem, in seconds. This is the reciprocal of `frameRate`. When set, the reciprocal is automatically set as a new `frameRate` value. This attribute returns the reciprocal of the `frameRate`, which may not be identical to a value you set, if that value is not evenly divisible into 1.0 (for example, 0.3). Due to numerical limitations, (1 / (1 / 0.3)) is close to, but not exactly, 0.3. If the AVItem is a FootageItem, this value is linked to the `mainSource`, and is read-only. To change it, set the `conformFrameRate` of the `mainSource` object. This sets both the `frameRate` and `frameDuration` of the FootageItem.
 62: 
 63: #### Type
 64: 
 65: Floating-point value, in the range `[1/99..1.0]`; read-only for a [FootageItem](../item/footageitem.md), otherwise read/write.
 66: 
 67: ---
 68: 
 69: ### AVItem.frameRate
 70: 
 71: `app.project.item(index).frameRate`
 72: 
 73: #### Description
 74: 
 75: The frame rate of the AVItem, in frames-per-second. This is the reciprocal of the `frameDuration` . When set, the reciprocal is automatically set as a new `frameDuration` value.
 76: 
 77: - In a CompItem, the value is linked to the `frameRate` of the composition, and is read/write.
 78: - In a FootageItem, the value is linked to the `frameRate` of the `mainSource` object, and is read-only. To change it, set the `conformFrameRate` of the `mainSource` object. This sets both the `frameRate` and `frameDuration` of the FootageItem.
 79: 
 80: #### Type
 81: 
 82: Floating-point value, in the range `[1.0..99.0]`; read-only for a [FootageItem](../item/footageitem.md), otherwise read/write.
 83: 
 84: ---
 85: 
 86: ### AVItem.hasAudio
 87: 
 88: `app.project.item(index).hasAudio`
 89: 
 90: #### Description
 91: 
 92: When `true`, the AVItem has an audio component.
 93: 
 94: - In a CompItem, the value is linked to the composition.
 95: - In a FootageItem, the value is linked to the `mainSource` object.
 96: 
 97: #### Type
 98: 
 99: Boolean; read-only.
100: 
101: ---
102: 
103: ### AVItem.hasVideo
104: 
105: `app.project.item(index).hasVideo`
106: 
107: #### Description
108: 
109: When `true`, the AVItem has a video component.
110: 
111: - In a CompItem, the value is linked to the composition.
112: - In a FootageItem, the value is linked to the `mainSource` object.
113: 
114: #### Type
115: 
116: Boolean; read-only.
117: 
118: ---
119: 
120: ### AVItem.height
121: 
122: `app.project.item(index).height`
123: 
124: #### Description
125: 
126: The height of the item in pixels.
127: 
128: - In a CompItem, the value is linked to the composition, and is read/write.
129: - In a FootageItem, the value is linked to the `mainSource` object, and is read/write only if the `mainSource` object is a SolidSource. Otherwise, it is read-only.
130: 
131: #### Type
132: 
133: Integer, in the range `[1..30000]`; read/write, except as noted.
134: 
135: ---
136: 
137: ### AVItem.isMediaReplacementCompatible
138: 
139: `app.project.item(index).isMediaReplacementCompatible`
140: 
141: !!! note
142:     This functionality was added in After Effects 18.0 (2021)
143: 
144: #### Description
145: 
146: Test whether the AVItem can be used as an alternate source when calling [Property.setAlternateSource()](../property/property.md#propertysetalternatesource).
147: 
148: Returns `true` if the item can be used, or otherwise `false`.
149: 
150: A CompItem or a FootageItem can be used as an alternate source for the layer, with some restrictions:
151: 
152: - If the AVItem is a [FootageItem object](footageitem.md), then FootageItem.FootageSource should not be a [SolidSource object](../sources/solidsource.md).
153: - If the AVItem is a [FootageItem object](footageitem.md) and the FootageItem.FootageSource is a [FileSource object](../sources/filesource.md) then that FileSource should not point to a non-media file e.g. a JSX script file.
154: - Setting the AVItem cannot create a cyclical reference within the project.
155: 
156: #### Type
157: 
158: Boolean; read only.
159: 
160: ---
161: 
162: ### AVItem.name
163: 
164: `app.project.item(index).name`
165: 
166: #### Description
167: 
168: The name of the item, as shown in the Project panel.
169: 
170: - In a FootageItem, the value is linked to the `mainSource` object. If the `mainSource` object is a `FileSource`, this value controls the display name in the Project panel, but does not affect the file name.
171: 
172: #### Type
173: 
174: String; read/write.
175: 
176: ---
177: 
178: ### AVItem.pixelAspect
179: 
180: `app.project.item(index).pixelAspect`
181: 
182: #### Description
183: 
184: The pixel aspect ratio (PAR) of the item.
185: 
186: - In a CompItem, the value is linked to the composition.
187: - In a FootageItem, the value is linked to the mainSource object.
188: 
189: The value you retrieve after setting may be slightly different from the value you supplied. The following table compares the value as it appears in the UI with the more accurate value returned by this attribute.
190: 
191: | PAR in the After Effects UI | PAR returned by the pixelAspect attribute |
192: | --------------------------- | ----------------------------------------- |
193: | 0.91                        | 0.909091                                  |
194: | 1                           | 1                                         |
195: | 1.5                         | 1.5                                       |
196: | 1.09                        | 1.09402                                   |
197: | 1.21                        | 1.21212                                   |
198: | 1.33                        | 1.33333                                   |
199: | 1.46                        | 1.45869                                   |
200: | 2                           | 2                                         |
201: 
202: #### Type
203: 
204: Floating-point value, in the range `[0.01..100.0]`; read/write.
205: 
206: ---
207: 
208: ### AVItem.proxySource
209: 
210: `app.project.item(index).proxySource`
211: 
212: #### Description
213: 
214: The FootageSource being used as a proxy. The attribute is read-only; to change it, call any of the AVItem methods that change the proxy source: `setProxy()`, `setProxyWithSequence()`, `setProxyWithSolid()`, or `setProxyWithPlaceholder()`.
215: 
216: #### Type
217: `FootageSource` object; read-only.
218: 
219: ---
220: 
221: ### AVItem.time
222: 
223: `app.project.item(index).time`
224: 
225: #### Description
226: 
227: The current time of the item when it is being previewed directly from the Project panel. This value is a number of seconds. Use the global method [timeToCurrentFormat()](../general/globals.md#timetocurrentformat) to convert it to a string value that expresses the time in terms of frames. It is an error to set this value for a FootageItem whose `mainSource` is still (`item.mainSource.isStill` is `true`).
228: 
229: #### Type
230: 
231: Floating-point value; read/write.
232: 
233: ---
234: 
235: ### AVItem.usedIn
236: 
237: `app.project.item(index).usedIn`
238: 
239: #### Description
240: 
241: All the compositions that use this AVItem. Note that upon retrieval, the array value is copied, so it is not automatically updated. If you get this value, then add this item into another composition, you must retrieve the value again to get an array that includes the new item.
242: 
243: #### Type
244: 
245: Array of CompItem objects; read-only.
246: 
247: ---
248: 
249: ### AVItem.useProxy
250: 
251: `app.project.item(index).useProxy`
252: 
253: #### Description
254: 
255: When `true`, a proxy is used for the item. It is set to `true` by all the `SetProxy` methods, and to `false` by the `SetProxyToNone()` method.
256: 
257: #### Type
258: 
259: Boolean; read/write.
260: 
261: ---
262: 
263: ### AVItem.width
264: 
265: `app.project.item(index).width`
266: 
267: #### Description
268: 
269: The width of the item, in pixels.
270: 
271: - In a CompItem, the value is linked to the composition, and is read/write.
272: - In a FootageItem, the value is linked to the `mainSource` object, and is read/write only if the `mainSource` object is a SolidSource. Otherwise, it is read-only.
273: 
274: #### Type
275: 
276: Integer, in the range `[1..30000]`; read/write, except as noted.
277: 
278: ---
279: 
280: ## Methods
281: 
282: ### AVItem.setProxy()
283: 
284: `app.project.item(index).setProxy(file)`
285: 
286: #### Description
287: 
288: Sets a file as the proxy of this AVItem.
289: 
290: Loads the specified file into a new FileSource object, sets this as the value of the `proxySource` attribute, and sets `useProxy` to `true`.
291: 
292: It does not preserve the interpretation parameters, instead using the user preferences. If the file has an unlabeled alpha channel, and the user preference says to ask the user what to do, the method estimates the alpha interpretation, rather than asking the user.
293: 
294: This differs from setting a FootageItem's `mainSource`, but both actions are performed as in the user interface.
295: 
296: #### Parameters
297: 
298: | Parameter |                                                 Type                                                  |           Description           |
299: | --------- | ----------------------------------------------------------------------------------------------------- | ------------------------------- |
300: | `file`    | [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) object | The file to be used as a proxy. |
301: 
302: #### Returns
303: 
304: None.
305: 
306: ---
307: 
308: ### AVItem.setProxyToNone()
309: 
310: `app.project.item(index).setProxyToNone()`
311: 
312: #### Description
313: 
314: Removes the proxy from this AVItem, sets the value of `proxySource` to `null`, and sets the value of `useProxy` to `false`.
315: 
316: #### Parameters
317: 
318: None.
319: 
320: #### Returns
321: 
322: Nothing.
323: 
324: ---
325: 
326: ### AVItem.setProxyWithPlaceholder()
327: 
328: `app.project.item(index).setProxyWithPlaceholder(name, width, height ,frameRate, duration)`
329: 
330: #### Description
331: 
332: Creates a PlaceholderSource object with specified values, sets this as the value of the `proxySource` attribute, and sets `useProxy` to `true`. It does not preserve the interpretation parameters, instead using the user preferences.
333: 
334: !!! note
335:     There is no direct way to set a placeholder as a proxy in the user interface; this behavior occurs when a proxy has been set and then moved or deleted.
336: 
337: #### Parameters
338: 
339: |  Parameter  |                  Type                  |                 Description                 |
340: | ----------- | -------------------------------------- | ------------------------------------------- |
341: | `name`      | String                                 | The name of the new object.                 |
342: | `width`     | Integer, in the range `[4..30000]`     | The pixel dimensions of the placeholder.    |
343: | `height`    | Integer, in the range `[4..30000]`     | The pixel dimensions of the placeholder.    |
344: | `frameRate` | Integer, in the range `[1..99]`        | Frame rate for the proxy.                   |
345: | `duration`  | Integer, in the range `[0.0..10800.0]` | The total length in seconds, up to 3 hours. |
346: 
347: #### Returns
348: 
349: Nothing.
350: 
351: ---
352: 
353: ### AVItem.setProxyWithSequence()
354: 
355: `app.project.item(index).setProxyWithSequence(file,forceAlphabetical)`
356: 
357: #### Description
358: 
359: Sets a sequence of files as the proxy of this AVItem, with the option of forcing alphabetical order.
360: Loads the specified file sequence into a new FileSource object, sets this as the value of the `proxySource` attribute, and sets `useProxy` to `true`.
361: 
362: It does not preserve the interpretation parameters, instead using the user preferences.
363: If any file has an unlabeled alpha channel, and the user preference says to ask the user what to do, the method estimates the alpha interpretation, rather than asking the user.
364: 
365: #### Parameters
366: 
367: |      Parameter      |                                                 Type                                                  |                       Description                       |
368: | ------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
369: | `file`              | [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) object | The first file in the sequence.                         |
370: | `forceAlphabetical` | Boolean                                                                                               | When `true`, use the "Force alphabetical order" option. |
371: 
372: #### Returns
373: 
374: Nothing.
375: 
376: ---
377: 
378: ### AVItem.setProxyWithSolid()
379: 
380: `app.project.item(index).setProxyWithSolid(color, name, width, height, pixelAspect)`
381: 
382: #### Description
383: 
384: Creates a [SolidSource object](../sources/solidsource.md) with specified values, sets this as the value of the `proxySource` attribute, and sets `useProxy` to `true`. It does not preserve the interpretation parameters, instead using the user preferences.
385: 
386: !!! note
387:     There is no way, using the user interface, to set a solid as a proxy; this feature is available only through scripting.
388: 
389: #### Parameters
390: 
391: |     Parameter     |                                     Type                                      |               Description                |
392: | ----------------- | ----------------------------------------------------------------------------- | ---------------------------------------- |
393: | `color`           | Array of three floating-point values, `[R, G, B]`, in the range `[0.0..1.0]`. | The color of the solid.                  |
394: | `name`            | String                                                                        | The name of the new object.              |
395: | `width`, `height` | Integer, in the range `[1..30000]`                                            | The pixel dimensions of the placeholder. |
396: | `pixelAspect`     | Floating-point value, in the range `[0.01..100.0]`                            | The pixel aspect ratio of the solid.     |
397: 
398: #### Returns
399: 
400: Nothing.
````

## File: docs/official/item/compitem.md
````markdown
  1: # CompItem object
  2: 
  3: `app.project.item(index)`
  4: 
  5: `app.project.items[index]`
  6: 
  7: 
  8: #### Description
  9: 
 10: The CompItem object represents a composition, and allows you to manipulate and get information about it. Access the objects by position index number in a project's item collection.
 11: 
 12: !!! info
 13:     CompItem is a subclass of [AVItem object](avitem.md), which is a subclass of [Item object](item.md). All methods and attributes of AVItem and Item, in addition to those listed below, are available when working with CompItem.
 14: 
 15: #### Example
 16: 
 17: Given that the first item in the project is a CompItem, the following code displays two alerts. The first shows the number of layers in the CompItem, and the second shows the name of the last layer in the CompItem.
 18: 
 19: ```javascript
 20: var firstComp = app.project.item(1);
 21: alert("number of layers is " + firstComp.numLayers);
 22: alert("name of last layer is " + firstComp.layer(firstComp.numLayers).name);
 23: ```
 24: 
 25: ---
 26: 
 27: ## Attributes
 28: 
 29: ### CompItem.activeCamera
 30: 
 31: `app.project.item(index).activeCamera`
 32: 
 33: #### Description
 34: 
 35: The active camera, which is the front-most camera layer that is enabled. The value is `null` if the composition contains no enabled camera layers.
 36: 
 37: #### Type
 38: 
 39: CameraLayer object; read-only.
 40: 
 41: ---
 42: 
 43: ### CompItem.bgColor
 44: 
 45: `app.project.item(index).bgColor`
 46: 
 47: #### Description
 48: 
 49: The background color of the composition. The three array values specify the red, green, and blue components of the color.
 50: 
 51: #### Type
 52: 
 53: An array containing three floating-point values, `[R, G, B]`, in the range `[0.0..1.0]`; read/write.
 54: 
 55: ---
 56: 
 57: ### CompItem.counters
 58: 
 59: `app.project.item(index).counters`
 60: 
 61: !!! note
 62:     This functionality was added in After Effects 13.2 (CC2014).
 63: 
 64: !!! warning
 65:     This method/property is officially undocumented and was found via research. The information here may be inaccurate, and this whole method/property may disappear or stop working some point. Please contribute if you have more information on it!
 66: 
 67: #### Description
 68: 
 69: This attribute works app-wide: if changed on one CompItem, it will change it for every CompItem in the project. The value stays until restarting AE. Once restarted, it will revert to `false`.
 70: 
 71: This parameter doesn't do anything.
 72: 
 73: #### Type
 74: 
 75: Boolean; read/write.
 76: 
 77: ---
 78: 
 79: ### CompItem.displayStartFrame
 80: 
 81: `app.project.item(index).displayStartFrame`
 82: 
 83: #### Description
 84: 
 85: The frame value of the beginning of the composition.
 86: 
 87: This value is an alternative to calculating the start frame using [CompItem.displayStartTime](#compitemdisplaystarttime) and [CompItem.frameDuration](#compitemframeduration) to compensate for floating-point problems.
 88: 
 89: !!! note
 90:     This functionality was added in After Effects 17.1.
 91: 
 92: #### Type
 93: 
 94: Integer; read/write.
 95: 
 96: ---
 97: 
 98: ### CompItem.displayStartTime
 99: 
100: `app.project.item(index).displayStartTime`
101: 
102: #### Description
103: 
104: The time set as the beginning of the composition, in seconds. This is the equivalent of the Start Timecode or Start Frame setting in the Composition Settings dialog box.
105: 
106: !!! note
107:     As of After Effects 17.1, the minimum value is `-10800.0`. Before 17.1, the minimum value was `0.0`
108: 
109: #### Type
110: 
111: Floating-point valuem in the range `[-10800.0..86339.0]` (-3:00:00:00 to 23:59:00:00); read/write.
112: 
113: ---
114: 
115: ### CompItem.draft3d
116: 
117: `app.project.item(index).draft3d`
118: 
119: #### Description
120: 
121: When `true`, Draft 3D mode is enabled for the Composition panel. This corresponds to the value of the Draft 3D button in the Composition panel.
122: 
123: #### Type
124: 
125: Boolean; read/write.
126: 
127: ---
128: 
129: ### CompItem.dropFrame
130: 
131: `app.project.item(index).dropFrame`
132: 
133: #### Description
134: 
135: When `true`, indicates that the composition uses drop-frame timecode. When `false`, indicates non-drop-frame timecode. This corresponds to the setting in the Composition Settings dialog box.
136: 
137: #### Type
138: 
139: Boolean; read/write.
140: 
141: ---
142: 
143: ### CompItem.frameBlending
144: 
145: `app.project.item(index).frameBlending`
146: 
147: #### Description
148: 
149: When `true`, frame blending is enabled for this Composition. Corresponds to the value of the Frame Blending button in the Composition panel.
150: 
151: #### Type
152: 
153: Boolean; if `true`, frame blending is enabled; read/write.
154: 
155: ---
156: 
157: ### CompItem.frameDuration
158: 
159: `app.project.item(index).frameDuration`
160: 
161: #### Description
162: 
163: The duration of a frame, in seconds. This is the inverse of the `frameRate` value (frames-per-second).
164: 
165: #### Type
166: 
167: Floating-point value; read/write.
168: 
169: ---
170: 
171: ### CompItem.hideShyLayers
172: 
173: `app.project.item(index).hideShyLayers`
174: 
175: #### Description
176: 
177: When `true`, only layers with shy set to `false` are shown in the Timeline panel. When `false`, all layers are visible, including those whose shy value is `true`. Corresponds to the value of the Hide All Shy Layers button in the Composition panel.
178: 
179: #### Type
180: 
181: Boolean; read/write.
182: 
183: ---
184: 
185: ### CompItem.layers
186: 
187: `app.project.item(index).layers`
188: 
189: #### Description
190: 
191: A [LayerCollection object](../layer/layercollection.md) that contains all the Layer objects for layers in this composition.
192: 
193: #### Type
194: 
195: LayerCollection object; read-only.
196: 
197: ---
198: 
199: ### CompItem.markerProperty
200: 
201: `app.project.item(index).markerProperty`
202: 
203: !!! note
204:     This functionality was added in After Effects 14.0 (CC 2017)
205: 
206: #### Description
207: 
208: A [PropertyGroup object](../property/propertygroup.md) that contains all a composition's markers. Composition marker scripting has the same functionality as [Layer markers](../layer/layer.md#layermarker).
209: 
210: See [MarkerValue object](../other/markervalue.md).
211: 
212: #### Type
213: 
214: PropertyGroup object or `null`; read-only.
215: 
216: #### Example
217: 
218: The following sample code creates a project and composition, then creates two composition markers with different properties
219: 
220: ```javascript
221: // comp.markerProperty allows you to add markers to a comp.
222: // It has the same functionality as layer.property("Marker")
223: var currentProj = app.newProject();
224: var comp = currentProj.items.addComp("mycomp", 1920, 1080, 1.0, 5, 29.97);
225: var solidLayer = comp.layers.addSolid([1, 1, 1], "mylayer", 1920, 1080, 1.0);
226: 
227: var compMarker = new MarkerValue("This is a comp marker!");
228: compMarker.duration = 1;
229: 
230: var compMarker2 = new MarkerValue("Another comp marker!");
231: compMarker2.duration = 1;
232: 
233: comp.markerProperty.setValueAtTime(1, compMarker);
234: comp.markerProperty.setValueAtTime(3, compMarker2);
235: ```
236: 
237: ---
238: 
239: ### CompItem.motionBlur
240: 
241: `app.project.item(index).motionBlur`
242: 
243: #### Description
244: 
245: When `true`, motion blur is enabled for the composition. Corresponds to the value of the Motion Blur button in the Composition panel.
246: 
247: #### Type
248: 
249: Boolean; read/write.
250: 
251: ---
252: 
253: ### CompItem.motionBlurAdaptiveSampleLimit
254: 
255: `app.project.item(index).motionBlurAdaptiveSampleLimit`
256: 
257: #### Description
258: 
259: The maximum number of motion blur samples of 2D layer motion. This corresponds to the Adaptive Sample Limit setting in the Advanced tab of the Composition Settings dialog box.
260: 
261: #### Type
262: 
263: Integer (between 16 and 256); read/write.
264: 
265: ---
266: 
267: ### CompItem.motionBlurSamplesPerFrame
268: 
269: `app.project.item(index).motionBlurSamplesPerFrame`
270: 
271: #### Description
272: 
273: The minimum number of motion blur samples per frame for Classic 3D layers, shape layers, and certain effects. This corresponds to the Samples Per Frame setting in the Advanced tab of the Composition Settings dialog box.
274: 
275: #### Type
276: 
277: Integer (between 2 and 64); read/write.
278: 
279: ---
280: 
281: ### CompItem.motionGraphicsTemplateControllerCount
282: 
283: `app.project.item(index).motionGraphicsTemplateControllerCount`
284: 
285: !!! note
286:     This functionality was added in After Effects 16.1 (CC 2019)
287: 
288: #### Description
289: 
290: The number of properties in the Essential Graphics panel for the composition.
291: 
292: #### Type
293: 
294: Integer; read-only.
295: 
296: ---
297: 
298: ### CompItem.motionGraphicsTemplateName
299: 
300: `app.project.item(index).motionGraphicsTemplateName`
301: 
302: !!! note
303:     This functionality was added in After Effects 15.0 (CC 2018)
304: 
305: #### Description
306: 
307: Read or write the name property in the Essential Graphics panel for the composition.
308: 
309: The name in the Essential Graphics panel is used for the file name of an exported Motion Graphics template (ex., "My Template.mogrt").
310: 
311: The following example will set the name for the active composition and then return it as an alert
312: 
313: ```javascript
314: app.project.activeItem.motionGraphicsTemplateName = "My Template";
315: alert(app.project.activeItem.motionGraphicsTemplateName);
316: ```
317: 
318: #### Type
319: 
320: String; read/write.
321: 
322: ---
323: 
324: ### CompItem.numLayers
325: 
326: `app.project.item(index).numLayers`
327: 
328: #### Description
329: 
330: The number of layers in the composition.
331: 
332: #### Type
333: 
334: Integer; read-only.
335: 
336: ---
337: 
338: ### CompItem.preserveNestedFrameRate
339: 
340: `app.project.item(index).preserveNestedFrameRate`
341: 
342: #### Description
343: 
344: When `true`, the frame rate of nested compositions is preserved in the current composition. Corresponds to the value of the "Preserve frame rate when nested or in render queue" option in the Advanced tab of the Composition Settings dialog box.
345: 
346: #### Type
347: 
348: Boolean; read/write.
349: 
350: ---
351: 
352: ### CompItem.preserveNestedResolution
353: 
354: `app.project.item(index).preserveNestedResolution`
355: 
356: #### Description
357: 
358: When `true`, the resolution of nested compositions is preserved in the current composition. Corresponds to the value of the "Preserve Resolution When Nested" option in the Advanced tab of the Composition Settings dialog box.
359: 
360: #### Type
361: 
362: Boolean; read/write.
363: 
364: ---
365: 
366: ### CompItem.renderer
367: 
368: `app.project.item(index).renderer`
369: 
370: #### Description
371: 
372: The current rendering plug-in module to be used to render this composition, as set in the Advanced tab of the Composition Settings dialog box. Allowed values are the members of [CompItem.renderers](#compitemrenderers).
373: 
374: #### Type
375: 
376: String; read/write.
377: 
378: ---
379: 
380: ### CompItem.renderers
381: 
382: `app.project.item(index).renderers`
383: 
384: #### Description
385: 
386: The available rendering plug-in modules. Member strings reflect installed modules, as seen in the Advanced tab of the Composition Settings dialog box.
387: 
388: #### Type
389: 
390: Array of strings; read-only.
391: 
392: ---
393: 
394: ### CompItem.resolutionFactor
395: 
396: `app.project.item(index).resolutionFactor`
397: 
398: #### Description
399: 
400: The x and y downsample resolution factors for rendering the composition. The two values in the array specify how many pixels to skip when sampling; the first number controls horizontal sampling, the second controls vertical sampling. Full resolution is `[1, 1]`, half resolution is `[2, 2]`, and quarter resolution is `[4, 4]`. The default is `[1, 1]`.
401: 
402: #### Type
403: 
404: Array of two integers in the range `[1..99]`; read/write.
405: 
406: ---
407: 
408: ### CompItem.selectedLayers
409: 
410: `app.project.item(index).selectedLayers`
411: 
412: #### Description
413: 
414: All of the selected layers in this composition. This is a 0-based array (the first object is at index 0).
415: 
416: #### Type
417: 
418: Array of [Layer](../layer/layer.md) objects; read-only.
419: 
420: ---
421: 
422: ### CompItem.selectedProperties
423: 
424: `app.project.item(index).selectedProperties`
425: 
426: #### Description
427: 
428: All of the selected properties (Property and PropertyGroup objects) in this composition. The first property is at index position 0.
429: 
430: #### Type
431: 
432: Array of [Property](../property/property.md) and [PropertyGroup](../property/propertygroup.md) objects; read-only.
433: 
434: ---
435: 
436: ### CompItem.shutterAngle
437: 
438: `app.project.item(index).shutterAngle`
439: 
440: #### Description
441: 
442: The shutter angle setting for the composition. This corresponds to the Shutter Angle setting in the Advanced tab of the Composition Settings dialog box.
443: 
444: #### Type
445: 
446: Integer, in the range `[0..720]`; read/write.
447: 
448: ---
449: 
450: ### CompItem.shutterPhase
451: 
452: `app.project.item(index).shutterPhase`
453: 
454: #### Description
455: 
456: The shutter phase setting for the composition. This corresponds to the Shutter Phase setting in the Advanced tab of the Composition Settings dialog box.
457: 
458: #### Type
459: 
460: Integer, in the range `[-360..360]`; read/write.
461: 
462: ---
463: 
464: ### CompItem.workAreaDuration
465: 
466: `app.project.item(index).workAreaDuration`
467: 
468: #### Description
469: 
470: The duration of the work area in seconds. This is the difference of the start-point and end-point times of the Composition work area.
471: 
472: #### Type
473: 
474: Floating-point value; read/write.
475: 
476: ---
477: 
478: ### CompItem.workAreaStart
479: 
480: `app.project.item(index).workAreaStart`
481: 
482: #### Description
483: 
484: The time when the Composition work area begins, in seconds.
485: 
486: #### Type
487: 
488: Floating-point value; read/write.
489: 
490: ---
491: 
492: ## Methods
493: 
494: ### CompItem.duplicate()
495: 
496: `app.project.item(index).duplicate()`
497: 
498: #### Description
499: 
500: Creates and returns a duplicate of this composition, which contains the same layers as the original.
501: 
502: #### Parameters
503: 
504: None.
505: 
506: #### Returns
507: 
508: CompItem object.
509: 
510: ---
511: 
512: ### CompItem.exportAsMotionGraphicsTemplate()
513: 
514: `app.project.item(index).exportAsMotionGraphicsTemplate(doOverWriteFileIfExisting[, file_path])`
515: 
516: !!! note
517:     This functionality was added in After Effects 15.0 (CC 2018)
518: 
519: #### Description
520: 
521: Exports the composition as a Motion Graphics template. Returns `true` if the Motion Graphics template is successfully exported, otherwise `false`.
522: 
523: The name in the Essential Graphics panel is used for the file name of the Motion Graphics template (ex., "My Template.mogrt").
524: Use the `motionGraphicsTemplateName` attribute to set the name.
525: 
526: Optionally specify the path to the folder where the Motion Graphics template file is saved. If not specified, the file will be saved in the current
527: user's Motion Graphics Templates folder:
528: 
529: |   OS    |                                        Path                                         |
530: | ------- | ----------------------------------------------------------------------------------- |
531: | macOS   | `/Users/<name>/Library/Application Support/Adobe/Common/Motion Graphics Templates/` |
532: | Windows | `C:\Users\<name>\AppData\Roaming\Adobe\Common\Motion Graphics Templates\`           |
533: 
534: 
535: If the project has been changed since the last time it was saved, After Effects will prompt the user to save the project. To avoid this, use the
536: project `save()` method before exporting the Motion Graphics template.
537: 
538: #### Parameters
539: 
540: |          Parameter          |  Type   |                        Description                         |
541: | --------------------------- | ------- | ---------------------------------------------------------- |
542: | `doOverWriteFileIfExisting` | Boolean | Whether to overwrite an existing file of the same name.    |
543: | `file_path`                 | String  | Optional. Path to the folder where the file will be saved. |
544: 
545: #### Returns
546: 
547: Boolean.
548: 
549: ---
550: 
551: ### CompItem.getMotionGraphicsTemplateControllerName()
552: 
553: `app.project.item(index).getMotionGraphicsTemplateControllerName(index)`
554: 
555: !!! note
556:     This functionality was added in After Effects 16.1 (CC 2019)
557: 
558: #### Description
559: 
560: Gets the name of a single property in the Essential Graphics panel.
561: 
562: #### Parameters
563: 
564: | Parameter |  Type   |                        Description                         |
565: | --------- | ------- | ---------------------------------------------------------- |
566: | `index`   | Integer | The index of the EGP property whose name will be returned. |
567: 
568: #### Returns
569: 
570: String; read-only.
571: 
572: ---
573: 
574: ### CompItem.setMotionGraphicsControllerName()
575: 
576: `app.project.item(index).setMotionGraphicsControllerName(index, newName)`
577: 
578: !!! note
579:     This functionality was added in After Effects 16.1 (CC 2019)
580: 
581: #### Description
582: 
583: Sets the name of a single property in the Essential Graphics panel.
584: 
585: !!! tip
586:     To rename a property as it is added to the EGP, see [Property.addToMotionGraphicsTemplateAs()](../property/property.md#propertyaddtomotiongraphicstemplateas).
587: 
588: #### Parameters
589: 
590: | Parameter |  Type   |                 Description                  |
591: | --------- | ------- | -------------------------------------------- |
592: | `index`   | Integer | The index of the EGP property to be renamed. |
593: | `newName` | String  | The new name for the EGP property.           |
594: 
595: #### Returns
596: 
597: String; read-only.
598: 
599: ---
600: 
601: ### CompItem.layer()
602: 
603: `app.project.item(index).layer(index)`
604: 
605: `app.project.item(index).layer(otherLayer, relIndex)`
606: 
607: `app.project.item(index).layer(name)`
608: 
609: 
610: #### Description
611: 
612: Returns a Layer object, which can be specified by name, an index position in this layer, or an index position relative to another layer.
613: 
614: #### Parameters
615: 
616: | Parameter |                                                 Type                                                 |                        Description                         |
617: | --------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
618: | `index`   | Integer, in the range `[1..numLayers]`, where `numLayers` is the number of layers in the composition | The index number of the desired layer in this composition. |
619: 
620: or:
621: 
622: |  Parameter   |                                                                     Type                                                                      |                                                                           Description                                                                           |
623: | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
624: | `otherLayer` | [Layer object](../layer/layer.md) in this composition.                                                                                       | The `relIndex` value is added to the index value of this layer to find the position of the desired layer.                                                       |
625: | `relIndex`   | Integer, in the range `[1 - otherLayer.index .. numLayers - otherLayer.index]`, where `numLayers` is the number of layers in the composition. | The position of the desired layer, relative to `otherLayer`. This value is added to the `otherLayer` value to derive the absolute index of the layer to return. |
626: 
627: or:
628: 
629: | Parameter |  Type  |          Description           |
630: | --------- | ------ | ------------------------------ |
631: | `name`    | String | The name of the desired layer. |
632: 
633: #### Returns
634: 
635: [Layer object](../layer/layer.md).
636: 
637: ---
638: 
639: ### CompItem.openInEssentialGraphics()
640: 
641: `app.project.item(index).openInEssentialGraphics()`
642: 
643: !!! note
644:     This functionality was added in After Effects 15.0 (CC 2018)
645: 
646: #### Description
647: 
648: Opens the composition in the Essential Graphics panel.
649: 
650: #### Parameters
651: 
652: None.
653: 
654: #### Returns
655: 
656: Nothing.
657: 
658: ---
659: 
660: ### CompItem.openInViewer()
661: 
662: `app.project.item(index).openInViewer()`
663: 
664: #### Description
665: 
666: Opens the composition in a Composition panel, and moves the Composition panel to front and gives it focus.
667: 
668: #### Parameters
669: 
670: None.
671: 
672: #### Returns
673: 
674: [Viewer object](../other/viewer.md) object for the Composition panel, or `null` if the composition could not be opened.
````

## File: docs/official/item/folderitem.md
````markdown
 1: # FolderItem object
 2: 
 3: `app.project.FolderItem`
 4: 
 5: #### Description
 6: 
 7: The FolderItem object corresponds to a folder in your Project panel. It can contain various types of items (footage, compositions, solids) as well as other folders.
 8: 
 9: #### Example
10: 
11: Given that the second item in the project is a FolderItem, the following code puts up an alert for each top-level item in the folder, showing that item's name.
12: 
13: ```javascript
14: var secondItem = app.project.item(2);
15: if (!(secondItem instanceof FolderItem)) {
16:     alert("problem: second item is not a folder");
17: } else {
18:     for (var i = 1; i <= secondItem.numItems; i++) {
19:         alert("item number " + i + " within the folder is named " + secondItem.item(i).name);
20:     }
21: }
22: ```
23: 
24: ---
25: 
26: ## Attributes
27: 
28: ### FolderItem.items
29: 
30: `app.project.item(index).items`
31: 
32: #### Description
33: 
34: An [ItemCollection object](../item/itemcollection.md) containing Item object that represents the top-level contents of this folder.
35: 
36: Unlike the ItemCollection in the [Project object](../general/project.md), this collection contains only the top-level items in the folder. The top-level within the folder is not the same as top-level within the project.
37: 
38: Only those items that are top-level in the root folder are also top-level in the Project.
39: 
40: #### Type
41: 
42: [ItemCollection object](../item/itemcollection.md); read-only.
43: 
44: ---
45: 
46: ### FolderItem.numItems
47: 
48: `app.project.item(index).numItems`
49: 
50: #### Description
51: 
52: The number of items contained in the items collection (`folderItem.items.length`).
53: 
54: If the folder contains another folder, only the FolderItem for that folder is counted, not any subitems contained in it.
55: 
56: #### Type
57: 
58: Integer; read-only.
59: 
60: ---
61: 
62: ## Methods
63: 
64: ### FolderItem.item()
65: 
66: `app.project.item(index).item(subIndex)`
67: 
68: #### Description
69: 
70: Returns the top-level item in this folder at the specified index position.
71: 
72: Note that "top-level" here means top-level within the folder, not necessarily within the project.
73: 
74: #### Parameters
75: 
76: | Parameter  |  Type   |                                Description                                |
77: | ---------- | ------- | ------------------------------------------------------------------------- |
78: | `subIndex` | Integer | The position index of the item to retrieve. The first item is at index 1. |
79: 
80: #### Returns
81: Item object.
````

## File: docs/official/item/footageitem.md
````markdown
  1: # FootageItem object
  2: 
  3: `app.project.item(index)`
  4: `app.project.items[index]`
  5: 
  6: #### Description
  7: 
  8: The FootageItem object represents a footage item imported into a project, which appears in the Project panel. These are accessed by position index number in a project's item collection.
  9: 
 10: !!! info
 11:     FootageItem is a subclass of [AVItem object](avitem.md), which is a subclass of [Item object](item.md). All methods and attributes of AVItem and Item, in addition to those listed below, are available when working with FootageItem.
 12: 
 13: ---
 14: 
 15: ## Attributes
 16: 
 17: ### FootageItem.file
 18: 
 19: `app.project.item(index).file`
 20: 
 21: #### Description
 22: 
 23: The [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) object for the footage's source file.
 24: 
 25: If the FootageItem's `mainSource` is a FileSource, this is the same as [FootageItem.mainSource.file](../sources/filesource.md#filesourcefile). Otherwise it is `null`.
 26: 
 27: #### Type
 28: 
 29: [File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) object; read-only.
 30: 
 31: ---
 32: 
 33: ### FootageItem.mainSource
 34: 
 35: `app.project.item(index).mainSource`
 36: 
 37: #### Description
 38: 
 39: The footage source, an object that contains all of the settings related to that footage item, including those that are normally accessed through the Interpret Footage dialog box. The attribute is read-only. To change its value, call one of the FootageItem "replace" methods. See the [FootageSource object](../sources/footagesource.md), and its three types:
 40: 
 41: - [SolidSource object](../sources/solidsource.md)
 42: - [FileSource object](../sources/filesource.md)
 43: - [PlaceholderSource object](../sources/placeholdersource.md)
 44: 
 45: If this is a FileSource object, and the [footageMissing](avitem.md#avitemfootagemissing) value is `true`, the path to the missing footage file is in the [FileSource.missingFootagePath](../sources/filesource.md#filesourcemissingfootagepath) attribute.
 46: 
 47: #### Type
 48: 
 49: [FootageSource object](../sources/footagesource.md); read-only.
 50: 
 51: ---
 52: 
 53: ## Methods
 54: 
 55: ### FootageItem.openInViewer()
 56: 
 57: `app.project.item(index).openInViewer()`
 58: 
 59: #### Description
 60: 
 61: Opens the footage in a Footage panel, and moves the Footage panel to front and gives it focus.
 62: 
 63: !!! tip
 64:     Missing and placeholder footage can be opened using this method, but cannot manually (via double-clicking it).
 65: 
 66: #### Parameters
 67: 
 68: None.
 69: 
 70: #### Returns
 71: 
 72: [Viewer object](../other/viewer.md) for the Footage panel, or `null` if the footage could not be opened.
 73: 
 74: ---
 75: 
 76: ### FootageItem.replace()
 77: 
 78: `app.project.item(index).replace(file)`
 79: 
 80: #### Description
 81: 
 82: Changes the source of this FootageItem to the specified file.
 83: 
 84: In addition to loading the file, the method creates a new FileSource object for the file and sets mainSource to that object. In the new source object, it sets the `name`, `width`, `height`, `frameDuration`, and `duration` attributes (see [AVItem object](avitem.md)) based on the contents of the file.
 85: 
 86: The method preserves interpretation parameters from the previous `mainSource` object.
 87: 
 88: If the specified file has an unlabeled alpha channel, the method estimates the alpha interpretation.
 89: 
 90: #### Parameters
 91: 
 92: | Parameter |                                                 Type                                                  |                   Description                   |
 93: | --------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
 94: | `file`    | [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) object | The file to be used as the footage main source. |
 95: 
 96: ---
 97: 
 98: ### FootageItem.replaceWithPlaceholder()
 99: 
100: `app.project.item(index).replaceWithPlaceholder(name, width, height, frameRate, duration)`
101: 
102: #### Description
103: 
104: Changes the source of this FootageItem to the specified placeholder. Creates a new PlaceholderSource object, sets its values from the parameters, and sets `mainSource` to that object.
105: 
106: #### Parameters
107: 
108: |  Parameter  |                        Type                         |                 Description                 |
109: | ----------- | --------------------------------------------------- | ------------------------------------------- |
110: | `name`      | String                                              | The name of the placeholder.                |
111: | `width`     | Integer, in the range `[4..30000]`                  | The width of the placeholder in pixels.     |
112: | `height`    | Integer, in the range `[4..30000]`                  | The height of the placeholder in pixels.    |
113: | `frameRate` | Floating-point value, in the range `[1.0..99.0]`    | The frame rate of the placeholder.          |
114: | `duration`  | Floating-point value, in the range `[0.0..10800.0]` | The duration of the placeholder in seconds. |
115: 
116: ---
117: 
118: ### FootageItem.replaceWithSequence()
119: 
120: `app.project.item(index).replaceWithSequence(file, forceAlphabetical)`
121: 
122: #### Description
123: 
124: Changes the source of this FootageItem to the specified image sequence.
125: 
126: In addition to loading the file, the method creates a new FileSource object for the file and sets `mainSource` to that object. In the new source object, it sets the `name`, `width`, `height`, `frameDuration`, and `duration` attributes (see [AVItem object](avitem.md)) based on the contents of the file.
127: 
128: The method preserves interpretation parameters from the previous `mainSource` object. If the specified file has an unlabeled alpha channel, the method estimates the alpha interpretation.
129: 
130: #### Parameters
131: 
132: |      Parameter      |                                                 Type                                                  |                              Description                              |
133: | ------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
134: | `file`              | [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) object | The first file in the sequence to be used as the footage main source. |
135: | `forceAlphabetical` | Boolean                                                                                               | When `true`, use the "Force alphabetical order" option.               |
136: 
137: ---
138: 
139: ### FootageItem.replaceWithSolid()
140: 
141: `app.project.item(index).replaceWithSolid(color, name, width, height, pixelAspect)`
142: 
143: #### Description
144: 
145: Changes the source of this FootageItem to the specified solid. Creates a new SolidSource object, sets its values from the parameters, and sets `mainSource` to that object.
146: 
147: #### Parameters
148: 
149: |   Parameter   |                                     Type                                      |             Description              |
150: | ------------- | ----------------------------------------------------------------------------- | ------------------------------------ |
151: | `color`       | Array of three floating-point values, `[R, G, B]`, in the range `[0.0..1.0]`. | The color of the solid.              |
152: | `name`        | String                                                                        | The name of the solid.               |
153: | `width`       | Integer, in the range `[4..30000]`                                            | The width of the solid in pixels.    |
154: | `height`      | Integer, in the range `[4..30000]`                                            | The height of the solid in pixels.   |
155: | `pixelAspect` | Floating-point value, in the range `[0.01..100.0]`                            | The pixel aspect ratio of the solid. |
````

## File: docs/official/item/item.md
````markdown
  1: # Item object
  2: 
  3: `app.project.item(index)`
  4: 
  5: `app.project.items[index]`
  6: 
  7: 
  8: #### Description
  9: 
 10: The Item object represents an item that can appear in the Project panel. The first item is at index 1.
 11: 
 12: !!! info
 13:     Item is the base class for [AVItem object](avitem.md) and for [FolderItem object](folderitem.md), which are in turn the base classes for various other item types, so Item attributes and methods are available when working with all of these item types.
 14: 
 15: #### Example
 16: 
 17: This example gets the second item from the project and checks that it is a folder. It then removes from the folder any top-level item that is not currently selected. It also checks to make sure that, for each item in the folder, the parent is properly set to the correct folder.
 18: 
 19: ```javascript
 20: var myFolder = app.project.item(2);
 21: if (!(myFolder instanceof FolderItem)) {
 22:     alert("error: second item is not a folder");
 23: } else {
 24:     var numInFolder = myFolder.numItems;
 25:     //Always run loops backwards when deleting things:
 26:     for (var i = numInFolder; i >= 1; i--) {
 27:         var curItem = myFolder.item(i);
 28:         if (curItem.parentFolder !== myFolder) {
 29:             alert("error within AE: the parentFolder is not set correctly");
 30:         } else {
 31:             if (!curItem.selected) {
 32:                 //found an unselected solid.
 33:                 curItem.remove();
 34:             }
 35:         }
 36:     }
 37: }
 38: ```
 39: 
 40: ---
 41: 
 42: ## Attributes
 43: 
 44: ### Item.comment
 45: 
 46: `app.project.item(index).comment`
 47: 
 48: #### Description
 49: 
 50: A string that holds a comment, up to 15,999 bytes in length after any encoding conversion. The comment is for the user's purpose only; it has no effect on the item's appearance or behavior.
 51: 
 52: #### Type
 53: 
 54: String; read/write.
 55: 
 56: ---
 57: 
 58: ### Item.dynamicLinkGUID
 59: 
 60: `app.project.item(index).dynamicLinkGUID`
 61: 
 62: #### Description
 63: 
 64: A unique and persistent identification number used for the dynamic link, in form of `00000000-0000-0000-0000-000000000000`.
 65: 
 66: #### Type
 67: 
 68: String; read-only.
 69: 
 70: ---
 71: 
 72: ### Item.guides
 73: 
 74: `app.project.item(index).guides`
 75: 
 76: !!! note
 77:     This functionality was added in After Effects 16.1 (CC 2019)
 78: 
 79: #### Description
 80: 
 81: An array of `guide` objects, containing `orientationType`, `positionType`, and `position` attributes.
 82: 
 83: #### Type
 84: 
 85: Array; read-only.
 86: 
 87: ---
 88: 
 89: ### Item.id
 90: 
 91: `app.project.item(index).id`
 92: 
 93: #### Description
 94: 
 95: A unique and persistent identification number used internally to identify an item between sessions. The value of the ID remains the same when the project is saved to a file and later reloaded. However, when you import this project into another project, new IDs are assigned to all items in the imported project. The ID is not displayed anywhere in the user interface.
 96: 
 97: #### Type
 98: 
 99: Integer; read-only.
100: 
101: ---
102: 
103: ### Item.label
104: 
105: `app.project.item(index).label`
106: 
107: #### Description
108: 
109: The label color for the item. Colors are represented by their number (0 for None, or 1 to 16 for one of the preset colors in the Labels preferences).
110: 
111: !!! tip
112:     Custom label colors cannot be set programmatically.
113: 
114: #### Type
115: 
116: Integer (0 to 16); read/write.
117: 
118: ---
119: 
120: ### Item.name
121: 
122: `app.project.item(index).name`
123: 
124: #### Description
125: 
126: The name of the item as displayed in the Project panel.
127: 
128: #### Type
129: 
130: String; read/write.
131: 
132: ---
133: 
134: ### Item.parentFolder
135: 
136: `app.project.item(index).parentFolder`
137: 
138: #### Description
139: 
140: The FolderItem object for the folder that contains this item. If this item is at the top level of the project, this is the project's root folder (`app.project.rootFolder`). You can use [ItemCollection.addFolder()](itemcollection.md#itemcollectionaddfolder) to add a new folder, and set this value to put items in the new folder.
141: 
142: #### Type
143: 
144: FolderItem object; read/write.
145: 
146: #### Example
147: 
148: This script creates a new FolderItem in the Project panel and moves compositions into it.
149: 
150: ```javascript
151: //create a new FolderItem in project, with name "comps"
152: var compFolder = app.project.items.addFolder("comps");
153: 
154: //move all compositions into new folder by setting
155: //compItem's parentFolder to "comps" folder
156: for (var i = 1; i <= app.project.numItems; i++){
157:     if (app.project.item(i) instanceof CompItem) {
158:         app.project.item(i).parentFolder = compFolder;
159:     }
160: }
161: ```
162: 
163: ---
164: 
165: ### Item.selected
166: 
167: `app.project.item(index).selected`
168: 
169: #### Description
170: 
171: When `true`, this item is selected. Multiple items can be selected at the same time. Set to `true` to select the item programmatically, or to `false` to deselect it.
172: 
173: #### Type
174: 
175: Boolean; read/write.
176: 
177: ---
178: 
179: ### Item.typeName
180: 
181: `app.project.item(index).typeName`
182: 
183: #### Description
184: 
185: A user-readable name for the item type; for example, "Folder", "Footage", or "Composition". These names are application locale-dependent, meaning that they are different depending on the application's interface language.
186: 
187: #### Type
188: 
189: String; read-only.
190: 
191: #### Localized strings
192: 
193: | Locale  |  Composition   |   Folder   |       Footage       |
194: | ------- | -------------- | ---------- | ------------------- |
195: | `en_US` | Composition    | Folder     | Footage             |
196: | `de_DE` | Komposition    | Ordner     | Footage             |
197: | `es_ES` | Composición    | Carpeta    | Material de archivo |
198: | `fr_FR` | Composition    | Dossier    | Métrage             |
199: | `it_IT` | Composizione   | Cartella   | Metraggio           |
200: | `ja_JP` | コンポジション | フォルダー | フッテージ          |
201: | `ko_KR` | 컴포지션       | 폴더       | 푸티지              |
202: | `pt_BR` | Composição     | Pasta      | Gravação            |
203: | `ru_ru` | Композиция     | Папка      | Видеоряд            |
204: | `zh_CN` | 合成           | 文件夹     | 素材                |
205: 
206: #### Example
207: 
208: ```javascript
209: if (/Composition|Komposition|Composición|Composizione|コンポジション|컴포지션|Composição|Композиция|合成/.test(app.project.item(index).typeName)) {
210:     // item is a composition
211: } else if (/Folder|Ordner|Carpeta|Dossier|Cartella|フォルダー|폴더|Pasta|Папка|文件夹/.test(app.project.item(index).typeName)) {
212:     // item is a folder
213: }
214: ```
215: 
216: ---
217: 
218: ## Methods
219: 
220: ### Item.addGuide()
221: 
222: `app.project.item(index).addGuide(orientationType, position)`
223: 
224: !!! note
225:     This functionality was added in After Effects 16.1 (CC 2019)
226: 
227: #### Description
228: 
229: Creates a new guide and adds it to the `guides` object of the Item.
230: 
231: #### Parameters
232: 
233: |     Parameter     |  Type   |                                          Description                                          |
234: | ----------------- | ------- | --------------------------------------------------------------------------------------------- |
235: | `orientationType` | Integer | `0` for a horizontal guide, `1` for a vertical guide. Any other value defaults to horizontal. |
236: | `position`        | Integer | The X or Y coordinate position of the guide in pixels, depending on its `orientationType`.    |
237: 
238: #### Returns
239: 
240: Integer; the index of the newly-created guide.
241: 
242: #### Example
243: 
244: Adds a vertical guide at 500 pixels on the X axis to the `activeItem` of a project.
245: 
246: ```javascript
247: app.project.activeItem.addGuide(1, 500);
248: ```
249: 
250: ---
251: 
252: ### Item.remove()
253: 
254: `app.project.item(index).remove()`
255: 
256: #### Description
257: 
258: Deletes this item from the project and the Project panel. If the item is a FolderItem, all the items contained in the folder are also removed from the project. No files or folders are removed from the disk.
259: 
260: #### Parameters
261: 
262: None.
263: 
264: #### Returns
265: 
266: Nothing.
267: 
268: ---
269: 
270: ### Item.removeGuide()
271: 
272: `app.project.item(index).removeGuide(guideIndex)`
273: 
274: !!! note
275:     This functionality was added in After Effects 16.1 (CC 2019)
276: 
277: #### Description
278: 
279: Removes an existing guide. Choose the guide based on its index inside the `Item.guides` object.
280: 
281: #### Parameters
282: 
283: |  Parameter   |  Type   |              Description              |
284: | ------------ | ------- | ------------------------------------- |
285: | `guideIndex` | Integer | The index of the guide to be removed. |
286: 
287: #### Returns
288: 
289: Nothing.
290: 
291: #### Example
292: 
293: Removes the first guide in `activeItem`.
294: 
295: ```javascript
296: app.project.activeItem.removeGuide(0);
297: ```
298: 
299: !!! warning
300:     Removing a guide will cause all higher guide indexes to shift downward.
301: 
302: ---
303: 
304: ### Item.setGuide()
305: 
306: `app.project.item(index).setGuide(position,guideIndex)`
307: 
308: !!! note
309:     This functionality was added in After Effects 16.1 (CC 2019)
310: 
311: #### Description
312: 
313: Modifies the `position` of an existing guide. Choose the guide based on its `guideIndex` inside the `Item.guides` array.
314: 
315: A guide's `orientationType` may not be changed after it is created.
316: 
317: #### Parameters
318: 
319: |  Parameter   |  Type   |                                               Description                                               |
320: | ------------ | ------- | ------------------------------------------------------------------------------------------------------- |
321: | `position`   | Integer | The new X or Y coordinate position of the guide in pixels, depending on its existing `orientationType`. |
322: | `guideIndex` | Integer | The index of the guide to be modified.                                                                  |
323: 
324: #### Returns
325: 
326: Nothing.
327: 
328: #### Example
329: 
330: Changes the position of the first guide in `activeItem` to 1200 pixels.
331: 
332: ```javascript
333: app.project.activeItem.setGuide(1200, 0);
334: ```
````

## File: docs/official/item/itemcollection.md
````markdown
 1: # ItemCollection object
 2: 
 3: `app.project.items`
 4: 
 5: #### Description
 6: 
 7: The ItemCollection object represents a collection of [Items](../item/item.md).
 8: 
 9: The ItemCollection belonging to a [Project object](../general/project.md) contains all the Item objects for [items in the project](../general/project.md#projectitems).
10: 
11: The ItemCollection belonging to a [FolderItem object](../item/folderitem.md) contains all the Item objects for [items in that folder](../item/folderitem.md#folderitemitems).
12: 
13: !!! info
14:     ItemCollection is a subclass of [Collection object](../other/collection.md). All methods and attributes of Collection, in addition to those listed below, are available when working with ItemCollection.
15: 
16: ---
17: 
18: ## Methods
19: 
20: ### ItemCollection.addComp()
21: 
22: `app.project.items.addComp(name, width, height, pixelAspect, duration, frameRate)`
23: 
24: #### Description
25: 
26: Creates and returns a new [CompItem object](../item/compitem.md) and adds it to this collection.
27: 
28: If the ItemCollection belongs to the project or the root folder, then the new item's [`parentFolder`](../item/item.md#itemparentfolder) is the [root folder](../general/project.md#projectrootfolder).
29: 
30: If the ItemCollection belongs to any other folder, the new item's `parentFolder` is that [FolderItem](../item/folderitem.md).
31: 
32: #### Parameters
33: 
34: |   Parameter   |                        Type                         |                 Description                 |
35: | ------------- | --------------------------------------------------- | ------------------------------------------- |
36: | `name`        | String                                              | The name of the composition.                |
37: | `width`       | Integer, in the range `[4..30000]`                  | The width of the composition in pixels.     |
38: | `height`      | Integer, in the range `[4..30000]`                  | The height of the composition in pixels.    |
39: | `pixelAspect` | Floating-point value, in the range `[0.01..100.0]`  | The pixel aspect ratio of the composition.  |
40: | `duration`    | Floating-point value, in the range `[0.0..10800.0]` | The duration of the composition in seconds. |
41: | `frameRate`   | Floating-point value, in the range `[1.0..99.0]`    | The frame rate of the composition.          |
42: 
43: #### Returns
44: 
45: [CompItem object](../item/compitem.md)
46: 
47: ---
48: 
49: ### ItemCollection.addFolder()
50: 
51: `app.project.items.addFolder(name)`
52: 
53: #### Description
54: 
55: Creates and returns a new [FolderItem object](../item/folderitem.md) and adds it to this collection.
56: 
57: If the ItemCollection belongs to the [project](../general/project.md#projectitems) or the [root folder](../general/project.md#projectrootfolder), then the new folder's `parentFolder` is the root folder.
58: 
59: If the ItemCollection belongs to any other folder, the new folder's `parentFolder` is that FolderItem. To put items in the folder, set the [Item.parentFolder](item.md#itemparentfolder) attribute.
60: 
61: #### Parameters
62: 
63: | Parameter |  Type  |       Description       |
64: | --------- | ------ | ----------------------- |
65: | `name`    | String | The name of the folder. |
66: 
67: #### Returns
68: 
69: [FolderItem object](../item/folderitem.md).
70: 
71: #### Example
72: 
73: This script creates a new [FolderItem](../item/folderitem.md) in the Project panel and moves compositions into it.
74: 
75: ```javascript
76: //create a new FolderItem in project, with name "comps"
77: var compFolder = app.project.items.addFolder("comps");
78: //move all compositions into new folder by setting
79: //comp Item's parentFolder to "comps" folder
80: for (var i = 1; i <= app.project.numItems; i++) {
81:     if (app.project.item(i) instanceof CompItem) {
82:         app.project.item(i).parentFolder = compFolder;
83:     }
84: }
85: ```
````

## File: docs/official/layer/avlayer.md
````markdown
  1: # AVLayer object
  2: 
  3: `app.project.item(index).layer(index)`
  4: 
  5: #### Description
  6: 
  7: The AVLayer object provides an interface to those layers that contain AVItem objects (composition layers, footage layers, solid layers, text layers, and sound layers).
  8: 
  9: !!! info
 10:     AVLayer is a subclass of [Layer object](layer.md). All methods and attributes of Layer, in addition to those listed below, are available when working with AVLayer.
 11: 
 12: !!! info
 13:     AVLayer is a base class for [TextLayer object](textlayer.md), so AVLayer attributes and methods are available when working with TextLayer objects.
 14: 
 15: #### AE Properties
 16: 
 17: Different types of layers have different AE properties. AVLayer has the following properties and property groups:
 18: 
 19: - Marker
 20: - Time Remap
 21: - Motion Trackers
 22: - Masks
 23: - Effects
 24: - Transform
 25:     - Anchor Point
 26:     - Position
 27:     - Scale
 28:     - Orientation
 29:     - X Rotation
 30:     - Y Rotation
 31:     - Rotation
 32:     - Opacity
 33: - Layer Styles
 34: - Geometry Options // Ray-traced 3D
 35: - Material Options
 36:     - Casts Shadows
 37:     - Light Transmission
 38:     - Accepts Shadows
 39:     - Accepts Lights
 40:     - Appears in Reflections // Ray-traced 3D
 41:     - Ambient
 42:     - Diffuse
 43:     - Specular Intensity
 44:     - Specular Shininess
 45:     - Metal
 46:     - Reflection Intensity // Ray-traced 3D
 47:     - Reflection Sharpness // Ray-traced 3D
 48:     - Reflection Rolloff // Ray-traced 3D
 49:     - Transparency // Ray-traced 3D
 50:     - Transparency Rolloff // Ray-traced 3D
 51:     - Index of Refraction // Ray-traced 3D
 52: - Audio
 53:     - AudioLevels
 54: 
 55: #### Example
 56: 
 57: If the first item in the project is a CompItem, and the first layer of that CompItem is an AVLayer, the following sets the layer `quality`, `startTime`, and `inPoint`.
 58: 
 59: ```javascript
 60: var firstLayer = app.project.item(1).layer(1);
 61: firstLayer.quality = LayerQuality.BEST;
 62: firstLayer.startTime = 1;
 63: firstLayer.inPoint = 2;
 64: ```
 65: 
 66: ---
 67: 
 68: ## Attributes
 69: 
 70: ### AVLayer.adjustmentLayer
 71: 
 72: `app.project.item(index).layer(index).adjustmentLayer`
 73: 
 74: #### Description
 75: 
 76: `true` if the layer is an adjustment layer.
 77: 
 78: #### Type
 79: 
 80: Boolean; read/write.
 81: 
 82: ---
 83: 
 84: ### AVLayer.audioActive
 85: 
 86: `app.project.item(index).layer(index).audioActive`
 87: 
 88: #### Description
 89: 
 90: `true` if the layer's audio is active at the current time. For this value to be true, `audioEnabled` must be true, no other layer with audio may be soloing unless this layer is soloed too, and the time must be between the `inPoint`
 91: and `outPoint` of this layer.
 92: 
 93: #### Type
 94: 
 95: Boolean; read-only.
 96: 
 97: ---
 98: 
 99: ### AVLayer.audioEnabled
100: 
101: `app.project.item(index).layer(index).audioEnabled`
102: 
103: #### Description
104: 
105: When `true`, the layer's audio is enabled. This value corresponds to the audio toggle switch in the Timeline panel.
106: 
107: #### Type
108: 
109: Boolean; read/write.
110: 
111: ---
112: 
113: ### AVLayer.blendingMode
114: 
115: `app.project.item(index).layer(index).blendingMode`
116: 
117: #### Description
118: 
119: The blending mode of the layer.
120: 
121: #### Type
122: 
123: A BlendingMode enumerated value; read/write. One of:
124: 
125: - `BlendingMode.ADD`
126: - `BlendingMode.ALPHA_ADD`
127: - `BlendingMode.CLASSIC_COLOR_BURN`
128: - `BlendingMode.CLASSIC_COLOR_DODGE`
129: - `BlendingMode.CLASSIC_DIFFERENCE`
130: - `BlendingMode.COLOR`
131: - `BlendingMode.COLOR_BURN`
132: - `BlendingMode.COLOR_DODGE`
133: - `BlendingMode.DANCING_DISSOLVE`
134: - `BlendingMode.DARKEN`
135: - `BlendingMode.DARKER_COLOR`
136: - `BlendingMode.DIFFERENCE`
137: - `BlendingMode.DISSOLVE`
138: - `BlendingMode.DIVIDE`
139: - `BlendingMode.EXCLUSION`
140: - `BlendingMode.HARD_LIGHT`
141: - `BlendingMode.HARD_MIX`
142: - `BlendingMode.HUE`
143: - `BlendingMode.LIGHTEN`
144: - `BlendingMode.LIGHTER_COLOR`
145: - `BlendingMode.LINEAR_BURN`
146: - `BlendingMode.LINEAR_DODGE`
147: - `BlendingMode.LINEAR_LIGHT`
148: - `BlendingMode.LUMINESCENT_PREMUL`
149: - `BlendingMode.LUMINOSITY`
150: - `BlendingMode.MULTIPLY`
151: - `BlendingMode.NORMAL`
152: - `BlendingMode.OVERLAY`
153: - `BlendingMode.PIN_LIGHT`
154: - `BlendingMode.SATURATION`
155: - `BlendingMode.SCREEN`
156: - `BlendingMode.SUBTRACT`
157: - `BlendingMode.SILHOUETE_ALPHA` - note the mispelling of 'SILHOUETTE'!
158: - `BlendingMode.SILHOUETTE_LUMA`
159: - `BlendingMode.SOFT_LIGHT`
160: - `BlendingMode.STENCIL_ALPHA`
161: - `BlendingMode.STENCIL_LUMA`
162: - `BlendingMode.SUBTRACT`
163: - `BlendingMode.VIVID_LIGHT`
164: 
165: ---
166: 
167: ### AVLayer.canSetCollapseTransformation
168: 
169: `app.project.item(index).layer(index).canSetCollapseTransformation`
170: 
171: #### Description
172: 
173: `true` if it is legal to change the value of the `collapseTransformation` attribute on this layer.
174: 
175: #### Type
176: 
177: Boolean; read-only.
178: 
179: ---
180: 
181: ### AVLayer.canSetTimeRemapEnabled
182: 
183: `app.project.item(index).layer(index).canSetTimeRemapEnabled`
184: 
185: #### Description
186: 
187: `true` if it is legal to change the value of the `timeRemapEnabled` attribute on this layer.
188: 
189: #### Type
190: 
191: Boolean; read-only.
192: 
193: ---
194: 
195: ### AVLayer.collapseTransformation
196: 
197: `app.project.item(index).layer(index).collapseTransformation`
198: 
199: #### Description
200: 
201: `true` if collapse transformation is on for this layer.
202: 
203: #### Type
204: 
205: Boolean; read/write.
206: 
207: ---
208: 
209: ### AVLayer.effectsActive
210: 
211: `app.project.item(index).layer(index).effectsActive`
212: 
213: #### Description
214: 
215: `true` if the layer's effects are active, as indicated by the `<f>` icon next to it in the user interface.
216: 
217: #### Type
218: 
219: Boolean; read/write.
220: 
221: ---
222: 
223: ### AVLayer.environmentLayer
224: 
225: `app.project.item(index).layer(index).environmentLayer`
226: 
227: #### Description
228: 
229: `true` if this is an environment layer in a Ray-traced 3D composition. Setting this attribute to `true` automatically makes the layer 3D (`threeDLayer` becomes true).
230: 
231: #### Type
232: 
233: Boolean; read/write.
234: 
235: ---
236: 
237: ### AVLayer.frameBlending
238: 
239: `app.project.item(index).layer(index).frameBlending`
240: 
241: #### Description
242: 
243: `true` if frame blending is enabled for the layer.
244: 
245: #### Type
246: 
247: Boolean; read-only.
248: 
249: ---
250: 
251: ### AVLayer.frameBlendingType
252: 
253: `app.project.item(index).layer(index).frameBlendingType`
254: 
255: #### Description
256: 
257: The type of frame blending to perform when frame blending is enabled for the layer.
258: 
259: #### Type
260: 
261: A FrameBlendingType enumerated value; read/write. One of:
262: 
263: - `FrameBlendingType.FRAME_MIX`
264: - `FrameBlendingType.NO_FRAME_BLEND`
265: - `FrameBlendingType.PIXEL_MOTION`
266: 
267: ---
268: 
269: ### AVLayer.guideLayer
270: 
271: `app.project.item(index).layer(index).guideLayer`
272: 
273: #### Description
274: 
275: `true` if the layer is a guide layer.
276: 
277: #### Type
278: 
279: Boolean; read/write.
280: 
281: ---
282: 
283: ### AVLayer.hasAudio
284: 
285: `app.project.item(index).layer(index).hasAudio`
286: 
287: #### Description
288: 
289: `true` if the layer contains an audio component, regardless of whether it is audio-enabled or soloed.
290: 
291: #### Type
292: 
293: Boolean; read-only.
294: 
295: ---
296: 
297: ### AVLayer.hasTrackMatte
298: 
299: `app.project.item(index).layer(index).hasTrackMatte`
300: 
301: !!! note
302:     This functionality was updated in After Effects 23.0. Track Matte is no longer dependent on layer order.
303: 
304: #### Description
305: 
306: `true` if this layer has track matte. When `true`, this layer's `trackMatteType` value controls how the matte is applied.
307: 
308: See [AVLayer.trackMatteType](#avlayertrackmattetype) for available track matte types.
309: 
310: #### Type
311: 
312: Boolean; read-only.
313: 
314: ---
315: 
316: ### AVLayer.height
317: 
318: `app.project.item(index).layer(index).height`
319: 
320: #### Description
321: 
322: The height of the layer in pixels.
323: 
324: #### Type
325: 
326: Floating-point value; read-only.
327: 
328: ---
329: 
330: ### AVLayer.isNameFromSource
331: 
332: `app.project.item(index).layer(index).isNameFromSource`
333: 
334: #### Description
335: 
336: `true` if the layer has no expressly set name, but contains a named source. In this case, `layer.name` has the same value as `layer.source.name`. `false` if the layer has an expressly set name, or if the layer does not have a source.
337: 
338: #### Type
339: 
340: Boolean; read-only.
341: 
342: ---
343: 
344: ### AVLayer.isTrackMatte
345: 
346: `app.project.item(index)layer(index).isTrackMatte`
347: 
348: !!! note
349:     This functionality was updated in After Effects 23.0. Track Matte is no longer dependent on layer order.
350: 
351: #### Description
352: 
353: `true` if this layer is being used as a track matte.
354: 
355: #### Type
356: 
357: Boolean; read-only.
358: 
359: ---
360: 
361: ### AVLayer.motionBlur
362: 
363: `app.project.item(index).layer(index).motionBlur`
364: 
365: #### Description
366: 
367: `true` if motion blur is enabled for the layer.
368: 
369: #### Type
370: 
371: Boolean; read/write.
372: 
373: ---
374: 
375: ### AVLayer.preserveTransparency
376: 
377: `app.project.item(index).layer(index).preserveTransparency`
378: 
379: #### Description
380: 
381: `true` if preserve transparency is enabled for the layer.
382: 
383: #### Type
384: 
385: Boolean; read/write.
386: 
387: ---
388: 
389: ### AVLayer.quality
390: 
391: `app.project.item(index).layer(index).quality`
392: 
393: #### Description
394: 
395: The quality with which this layer is displayed.
396: 
397: #### Type
398: 
399: A `LayerQuality` enumerated value; read/write. One of:
400: 
401: - `LayerQuality.BEST`
402: - `LayerQuality.DRAFT`
403: - `LayerQuality.WIREFRAME`
404: 
405: ---
406: 
407: ### AVLayer.samplingQuality
408: 
409: `app.project.item(index).layer(index).samplingQuality`
410: 
411: !!! note
412:     This functionality was added in After Effects 12.0 (CC)
413: 
414: #### Description
415: 
416: Set/get layer sampling method (bicubic or bilinear)
417: 
418: #### Type
419: 
420: A `LayerSamplingQuality` enumerated value; read/write. One of:
421: 
422: - `LayerSamplingQuality.BICUBIC`
423: - `LayerSamplingQuality.BILINEAR`
424: 
425: ---
426: 
427: ### AVLayer.source
428: 
429: `app.project.item(index).layer(index).source`
430: 
431: #### Description
432: 
433: The source AVItem for this layer. The value is `null` in a Text layer. Use [AVLayer.replaceSource()](#avlayerreplacesource) to change the value.
434: 
435: #### Type
436: 
437: AVItem object; read-only.
438: 
439: ---
440: 
441: ### AVLayer.threeDLayer
442: 
443: `app.project.item(index).layer(index).threeDLayer`
444: 
445: #### Description
446: 
447: `true` if this is a 3D layer.
448: 
449: #### Type
450: 
451: Boolean; read/write.
452: 
453: ---
454: 
455: ### AVLayer.threeDPerChar
456: 
457: `app.project.item(index).layer(index).threeDPerChar`
458: 
459: #### Description
460: 
461: `true` if this layer has the Enable Per-character 3D switch set, allowing its characters to be animated off the plane of the text layer. Applies only to text layers.
462: 
463: #### Type
464: 
465: Boolean; read/write.
466: 
467: ---
468: 
469: ### AVLayer.timeRemapEnabled
470: 
471: `app.project.item(index).layer(index).timeRemapEnabled`
472: 
473: #### Description
474: 
475: `true` if time remapping is enabled for this layer.
476: 
477: #### Type
478: 
479: Boolean; read/write.
480: 
481: ---
482: 
483: ### AVLayer.trackMatteLayer
484: 
485: `app.project.item(index).layer(index).trackMatteLayer`
486: 
487: !!! note
488:     This functionality was added in After Effects 23.0
489: 
490: #### Description
491: 
492: Returns the track matte layer for this layer. Returns `null` if this layer has no track matte layer.
493: 
494: #### Type
495: 
496: AVLayer object; read only.
497: 
498: ---
499: 
500: ### AVLayer.trackMatteType
501: 
502: `app.project.item(index).layer(index).trackMatteType`
503: 
504: !!! note
505:     This functionality was updated in After Effects 23.0
506: 
507: !!! warning
508:     This is a Legacy API we don't recommend using for setting Track Matte Type in new scripts. Please consider using the latest track matte APIs [AVLayer.setTrackMatte()](#avlayersettrackmatte) and [AVLayer.removeTrackMatte()](#avlayerremovetrackmatte) for your tasks.
509: 
510: #### Description
511: 
512: If this layer has a track matte, specifies the way the track matte is applied.
513: Specifying the `TrackMatteType.NO_TRACK_MATTE` type will remove the track matte for this layer and reset the track matte type.
514: 
515: #### Type
516: 
517: A `TrackMatteType` enumerated value; read/write. One of:
518: 
519: - `TrackMatteType.ALPHA`
520: - `TrackMatteType.ALPHA_INVERTED`
521: - `TrackMatteType.LUMA`
522: - `TrackMatteType.LUMA_INVERTED`
523: - `TrackMatteType.NO_TRACK_MATTE`
524: 
525: #### Example
526: 
527: ```javascript
528: // Returns the current track matte type for myLayer
529: var type = myLayer.trackMatteType;
530: 
531: // *** We recommend using the new Track Matte APIs for the operations below (See Warning) ***
532: 
533: // Changes the track matte type for myLayer to TrackMatteType.ALPHA_INVERTED
534: myLayer.trackMatteType = TrackMatteType.ALPHA_INVERTED;
535: 
536: // Removes the track matte and also resets the type
537: myLayer.trackMatteType = TrackMatteType.NO_TRACK_MATTE;
538: ```
539: 
540: ---
541: 
542: ### AVLayer.width
543: 
544: `app.project.item(index).layer(index).width`
545: 
546: #### Description
547: 
548: The width of the layer in pixels.
549: 
550: #### Type
551: 
552: Floating-point value; read-only.
553: 
554: ---
555: 
556: ## Methods
557: 
558: ### AVLayer.addToMotionGraphicsTemplate()
559: 
560: `app.project.item(index).layer(index).addToMotionGraphicsTemplate(comp)`
561: 
562: !!! note
563:     This functionality was added in After Effects 18.0 (2021)
564: 
565: #### Description
566: 
567: Adds the layer to the Essential Graphics Panel for the specified composition.
568: 
569: Returns `true` if the layer is successfully added, or otherwise `false`.
570: 
571: If the layer cannot be added, it is either because it is not a layer type for which media can be replaced (referred to as Media Replacement Layers), or the layer has already been added to the EGP for that composition. After Effects will present a warning dialog if the layer cannot be added to the EGP.
572: 
573: Use the [AVLayer.canAddToMotionGraphicsTemplate()](#avlayercanaddtomotiongraphicstemplate) method to test whether the layer can be added to a Motion Graphics template.
574: 
575: #### Parameters
576: 
577: | Parameter |                  Type                   |                          Description                           |
578: | --------- | --------------------------------------- | -------------------------------------------------------------- |
579: | `comp`    | [CompItem object](../item/compitem.md) | The composition where you wish to add the property to the EGP. |
580: 
581: #### Returns
582: 
583: Boolean.
584: 
585: ---
586: 
587: ### AVLayer.addToMotionGraphicsTemplateAs()
588: 
589: `app.project.item(index).layer(index).addToMotionGraphicsTemplateAs(comp, name)`
590: 
591: !!! note
592:     This functionality was added in After Effects 18.0 (2021)
593: 
594: #### Description
595: 
596: Adds the layer to the Essential Graphics Panel for the specified composition.
597: 
598: Returns `true` if the layer is successfully added, or otherwise `false`.
599: 
600: If the layer cannot be added, it is either because it is not a layer type for which media can be replaced (referred to as Media Replacement Layers), or the layer has already been added to the EGP for that composition. After Effects will present a warning dialog if the layer cannot be added to the EGP.
601: 
602: Use the [AVLayer.canAddToMotionGraphicsTemplate()](#avlayercanaddtomotiongraphicstemplate) method to test whether the layer can be added to a Motion Graphics template.
603: 
604: #### Parameters
605: 
606: | Parameter |                  Type                   |                          Description                           |
607: | --------- | --------------------------------------- | -------------------------------------------------------------- |
608: | `comp`    | [CompItem object](../item/compitem.md) | The composition where you wish to add the property to the EGP. |
609: | `name`    | String                                  | The new name.                                                  |
610: 
611: #### Returns
612: 
613: Boolean.
614: 
615: ---
616: 
617: ### AVLayer.audioActiveAtTime()
618: 
619: `app.project.item(index).layer(index).audioActiveAtTime(time)`
620: 
621: #### Description
622: 
623: Returns `true` if this layer's audio will be active at the specified time.
624: 
625: For this method to return `true`, `audioEnabled` must be `true`, no other layer with audio may be soloing unless this layer is soloed too, and the time must be between the `inPoint` and `outPoint` of this layer.
626: 
627: #### Parameters
628: 
629: | Parameter |         Type         |      Description      |
630: | --------- | -------------------- | --------------------- |
631: | `time`    | Floating-point value | The time, in seconds. |
632: 
633: #### Returns
634: 
635: Boolean.
636: 
637: ---
638: 
639: ### AVLayer.calculateTransformFromPoints()
640: 
641: `app.project.item(index).layer(index).calculateTransformFromPoints(pointTopLeft, pointTopRight, pointBottomRight)`
642: 
643: #### Description
644: 
645: Calculates a transformation from a set of points in this layer.
646: 
647: #### Parameters
648: 
649: |     Parameter      |                    Type                     |             Description             |
650: | ------------------ | ------------------------------------------- | ----------------------------------- |
651: | `pointTopLeft`     | Array of floating-point values, `[x, y, z]` | The top left point coordinates.     |
652: | `pointTopRight`    | Array of floating-point values, `[x, y, z]` | The top right point coordinates.    |
653: | `pointBottomRight` | Array of floating-point values, `[x, y, z]` | The bottom right point coordinates. |
654: 
655: #### Returns
656: 
657: An Object with the transformation properties set.
658: 
659: #### Example
660: 
661: ```javascript
662: var newLayer = comp.layers.add(newFootage);
663: newLayer.threeDLayer = true;
664: newLayer.blendingMode = BlendingMode.ALPHA_ADD;
665: var transform = newLayer.calculateTransformFromPoints(tl, tr, bl);
666: for (var sel in transform) {
667:     newLayer.transform[sel].setValue(transform[sel]);
668: }
669: ```
670: 
671: ---
672: 
673: ### AVLayer.canAddToMotionGraphicsTemplate()
674: 
675: `app.project.item(index).layer(index).canAddToMotionGraphicsTemplate(comp)`
676: 
677: !!! note
678:     This functionality was added in After Effects 18.0 (2021)
679: 
680: #### Description
681: 
682: Test whether or not the layer can be added to the Essential Graphics Panel for the specified composition.
683: 
684: Returns `true` if the layer can be added, or otherwise `false`.
685: 
686: If the layer cannot be added, it is either because it is not a layer type for which media can be replaced (referred to as Media Replacement Layers), or the layer has already been added to the EGP for that composition.
687: 
688: Media Replacement layers are recognized as AVLayers with an [AVLayer.source](#avlayersource) set to a [FootageItem object](../item/footageitem.md) (with specific source types) or a [CompItem object](../item/compitem.md).
689: 
690: The AVLayer needs to comply with the restrictions below in order to be treated as a Media Replacement layer:
691: 
692: - [Layer.hasVideo](../layer/layer.md#layerhasvideo) should return `true`.
693: - [AVLayer.adjustmentLayer](#avlayeradjustmentlayer) should return `false`.
694: - [Layer.nullLayer](../layer/layer.md#layernulllayer) should return `false`.
695: - If the [AVLayer.source](#avlayersource) is a [FootageItem object](../item/footageitem.md), then FootageItem.FootageSource should not be a [SolidSource object](../sources/solidsource.md).
696: - If the [AVLayer.source](#avlayersource) is a [FootageItem object](../item/footageitem.md) and the FootageItem.FootageSource is a [FileSource object](../sources/filesource.md) then that FileSource should not point to a non-media file e.g. a JSX script file.
697: 
698: #### Parameters
699: 
700: | Parameter |                  Type                   |                          Description                           |
701: | --------- | --------------------------------------- | -------------------------------------------------------------- |
702: | `comp`    | [CompItem object](../item/compitem.md) | The composition where you wish to add the property to the EGP. |
703: 
704: #### Returns
705: 
706: Boolean.
707: 
708: ---
709: 
710: ### AVLayer.compPointToSource()
711: 
712: `app.project.item(index).layer(index).compPointToSource()`
713: 
714: !!! note
715:     This functionality was added in After Effects 13.2 (CC 2014.2)
716: 
717: #### Description
718: 
719: Converts composition coordinates, such as `sourcePointToComp`, to layer coordinates.
720: 
721: !!! warning
722:     This value only reflects the first character in the text layer at the current time.
723: 
724: #### Parameters
725: 
726: |      Parameter      |                   Type                   |                Description                |
727: | ------------------- | ---------------------------------------- | ----------------------------------------- |
728: | `sourcePointToComp` | Array of floating-point values, `[x, y]` | Position array of composition coordinates |
729: 
730: #### Returns
731: 
732: Array of ([X,Y]) position coordinates; read-only.
733: 
734: ---
735: 
736: ### AVLayer.openInViewer()
737: 
738: `app.project.item(index).layer(index).openInViewer()`
739: 
740: #### Description
741: 
742: Opens the layer in a Layer panel, and moves the Layer panel to front and gives it focus.
743: 
744: #### Parameters
745: 
746: None.
747: 
748: #### Returns
749: 
750: Viewer object for the Layer panel, or `null` if the layer could not be opened (e.g., for text or shape layers, which cannot be opened in the Layer panel).
751: 
752: ---
753: 
754: ### AVLayer.removeTrackMatte()
755: 
756: `app.project.item(index).layer(index).removeTrackMatte()`
757: 
758: !!! note
759:     This functionality was added in After Effects 23.0
760: 
761: #### Description
762: 
763: Removes the track matte for this layer while preserving the TrackMatteType.
764: See [AVLayer.setTrackMatte()](#avlayersettrackmatte) for another way of removing track matte.
765: 
766: #### Parameters
767: 
768: None.
769: 
770: #### Returns
771: 
772: Nothing.
773: 
774: ```javascript
775: // Sets the track matte layer of myLayer with otherLayer as LUMA type
776: myLayer.setTrackMatte(otherLayer, TrackMatteType.LUMA);
777: 
778: // Removes the track matte for myLayer but preserves the LUMA type
779: myLayer.removeTrackMatte();
780: 
781: // Still returns TrackMatteType.LUMA
782: alert(myLayer.trackMatteType);
783: ```
784: 
785: ---
786: 
787: ### AVLayer.replaceSource()
788: 
789: `app.project.item(index).layer(index).replaceSource(newSource, fixExpressions)`
790: 
791: #### Description
792: 
793: Replaces the source for this layer.
794: 
795: !!! warning
796:     If this method is performed on a null layer, the layers `isNull` attribute is not changed from `true`. This causes the layer not to be visible in comp viewer and renders.
797: 
798: #### Parameters
799: 
800: +------------------+------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
801: |    Parameter     |                Type                |                                                                                                       Description                                                                                                        |
802: +==================+====================================+==========================================================================================================================================================================================================================+
803: | `newSource`      | [AVItem object](../item/avitem.md) | The new source AVItem object.                                                                                                                                                                                            |
804: +------------------+------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
805: | `fixExpressions` | Boolean                            | `true` to adjust expressions for the new source, otherwise `false`.                                                                                                                                                      |
806: |                  |                                    |                                                                                                                                                                                                                          |
807: |                  |                                    | !!! warning                                                                                                                                                                                                              |
808: |                  |                                    |      This feature can be resource-intensive; if replacing a large amount of footage, do this only at the end of the operation. See also [Project.autoFixExpressions()](../general/project.md#projectautofixexpressions). |
809: +------------------+------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
810: 
811: #### Returns
812: 
813: Nothing.
814: 
815: ---
816: 
817: ### AVLayer.setTrackMatte()
818: 
819: `app.project.item(index).layer(index).setTrackMatte(trackMatteLayer, trackMatteType)`
820: 
821: !!! note
822:     This functionality was added in After Effects 23.0
823: 
824: #### Description
825: 
826: Sets the track matte layer and type for this layer. Passing in `null` to trackMatteLayer parameter removes the track matte.
827: See [AVLayer.removeTrackMatte()](#avlayerremovetrackmatte) for another way of removing track matte.
828: 
829: #### Parameters
830: 
831: |     Parameter     |                     Type                      |                  Description                   |
832: | ----------------- | --------------------------------------------- | ---------------------------------------------- |
833: | `trackMatteLayer` | [AVLayer](../layer/avlayer.md)               | The layer to be used as the track matte layer. |
834: | `trackMatteType`  | [TrackMatteType](#avlayertrackmattetype) enum | The type of the track matte to be used.        |
835: 
836: !!! warning
837:     Passing in `TrackMatteType.NO_TRACK_MATTE` as type is invalid and will result in no-op.
838: 
839: #### Returns
840: 
841: Nothing
842: 
843: #### Example
844: 
845: ```javascript
846: // Sets the track matte layer of myLayer with otherLayer as Alpha type
847: myLayer.setTrackMatte(otherLayer, TrackMatteType.ALPHA);
848: 
849: // Keeps the same trackMatteLayer and only changes the track matte type
850: myLayer.setTrackMatte(myLayer.trackMatteLayer, TrackMatteType.LUMA);
851: 
852: // Changes the track matte layer but keep the same track matte type
853: myLayer.setTrackMatte(newTrackMatteLayer, myLayer.trackMatteType);
854: 
855: // Removes the track matte for myLayer and sets the new specified TrackMatteType
856: myLayer.setTrackMatte(null, TrackMatteType.ALPHA);
857: myLayer.setTrackMatte(null, TrackMatteType.NO_TRACK_MATTE);
858: 
859: // Invalid. Nothing happens
860: myLayer.setTrackMatte(otherLayer, TrackMatteType.NO_TRACK_MATTE);
861: ```
862: 
863: ---
864: 
865: ### AVLayer.sourcePointToComp()
866: 
867: `app.project.item(index).layer(index).sourcePointToComp()`
868: 
869: !!! note
870:     This functionality was added in After Effects 13.2 (CC 2014.2)
871: 
872: #### Description
873: 
874: Converts layer coordinates, such as `boxTextPos`, to composition coordinates.
875: 
876: !!! warning
877:     This value only reflects the first character in the text layer at the current time.
878: 
879: #### Parameters
880: 
881: |  Parameter   |                   Type                   |              Description               |
882: | ------------ | ---------------------------------------- | -------------------------------------- |
883: | `boxTextPos` | Array of floating-point values, `[x, y]` | A position array of layer coordinates. |
884: 
885: #### Returns
886: 
887: Array of ([X,Y]) position coordinates; read-only.
888: 
889: #### Example
890: 
891: ```javascript
892: // For a paragraph text layer.
893: // Converts position in layer coordinates to comp coordinates.
894: var boxTextCompPos = myTextLayer.sourcePointToComp(boxTextLayerPos);
895: ```
896: 
897: ---
898: 
899: ### AVLayer.sourceRectAtTime()
900: 
901: `app.project.item(index).layer(index).sourceRectAtTime(timeT, extents)`
902: 
903: #### Description
904: 
905: Retrieves the rectangle bounds of the layer at the specified time index, corrected for text or shape layer content. Use, for example, to write text that is properly aligned to the baseline.
906: 
907: #### Parameters
908: 
909: | Parameter |         Type         |                                                              Description                                                               |
910: | --------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
911: | `timeT`   | Floating-point value | The time index, in seconds.                                                                                                            |
912: | `extents` | Boolean              | `true` to include the extents, otherwise `false`. Extents apply to shape layers, increasing the size of the layer bounds as necessary. |
913: 
914: #### Returns
915: 
916: A JavaScript object with four attributes, [`top`, `left`, `width`, `height`].
````

## File: docs/official/layer/cameralayer.md
````markdown
 1: # CameraLayer object
 2: 
 3: `app.project.item(index).layer(index)`
 4: 
 5: #### Description
 6: 
 7: The CameraLayer object represents a camera layer within a composition. Create it using [LayerCollection.addCamera()](layercollection.md#layercollectionaddcamera). It can be accessed in an item's layer collection either by index number or by a name string.
 8: 
 9: !!! info
10:     CameraLayer is a subclass of [Layer object](layer.md). All methods and attributes of Layer are available when working with CameraLayer.
11: 
12: #### AE Properties
13: 
14: CameraLayer defines no additional attributes, but has different AE properties than other layer types. It has the following properties and property groups:
15: 
16: - `Marker`
17: - `Transform`
18:     - `PointofInterest`
19:     - `Position`
20:     - `Scale`
21:     - `Orientation`
22:     - `XRotation`
23:     - `YRotation`
24:     - `Rotation`
25:     - `Opacity`
26: - `CameraOptions`
27:     - `Zoom`
28:     - `DepthofField`
29:     - `FocusDistance`
30:     - `BlurLevel`
````

## File: docs/official/layer/layer.md
````markdown
  1: # Layer object
  2: 
  3: `app.project.item(index).layer(index)`
  4: 
  5: #### Description
  6: 
  7: The Layer object provides access to layers within compositions. It can be accessed from an item's layer collection either by index number or by a name string.
  8: 
  9: !!! info
 10:     Layer is a subclass of [PropertyGroup](../property/propertygroup.md), which is a subclass of [PropertyBase](../property/propertybase.md). All methods and attributes of PropertyGroup, in addition to those listed below, are available when working with Layer, with the exception that `propertyIndex` attribute is set to `undefined`.
 11: 
 12: !!! info
 13:     Layer is the base class for [CameraLayer object](cameralayer.md), [LightLayer object](lightlayer.md), and [AVLayer object](avlayer.md), so Layer attributes and methods are available when working with all layer types. Layers contain AE properties, in addition to their JavaScript attributes and methods. For examples of how to access properties in layers, see [PropertyBase object](../property/propertybase.md).
 14: 
 15: #### Example
 16: 
 17: If the first item in the project is a [CompItem](../item/compitem.md), this example disables the first layer in that composition and renames it. This might, for example, turn an icon off in the composition.
 18: 
 19: ```javascript
 20: var firstLayer = app.project.item(1).layer(1);
 21: firstLayer.enabled = false;
 22: firstLayer.name = "DisabledLayer";
 23: ```
 24: 
 25: ---
 26: 
 27: ## Attributes
 28: 
 29: ### Layer.autoOrient
 30: 
 31: `app.project.item(index).layer(index).autoOrient`
 32: 
 33: #### Description
 34: 
 35: The type of automatic orientation to perform for the layer.
 36: 
 37: #### Type
 38: 
 39: An `AutoOrientType` enumerated value; read/write. One of:
 40: 
 41: - `AutoOrientType.ALONG_PATH` Layer faces in the direction of the motion path.
 42: - `AutoOrientType.CAMERA_OR_POINT_OF_INTEREST` Layer always faces the active camera or points at its point of interest.
 43: - `AutoOrientType.CHARACTERS_TOWARD_CAMERA` Each character in a per-character 3D text layer automatically faces the active camera.
 44: - `AutoOrientType.NO_AUTO_ORIENT` Layer rotates freely, independent of any motion path, point of interest, or other layers.
 45: 
 46: ---
 47: 
 48: ### Layer.comment
 49: 
 50: `app.project.item(index).layer(index).comment`
 51: 
 52: #### Description
 53: 
 54: A descriptive comment for the layer.
 55: 
 56: #### Type
 57: 
 58: String; read/write.
 59: 
 60: ---
 61: 
 62: ### Layer.containingComp
 63: 
 64: `app.project.item(index).layer(index).containingComp`
 65: 
 66: #### Description
 67: 
 68: The composition that contains this layer.
 69: 
 70: #### Type
 71: 
 72: CompItem object; read-only.
 73: 
 74: ---
 75: 
 76: ### Layer.hasVideo
 77: 
 78: `app.project.item(index).layer(index).hasVideo`
 79: 
 80: #### Description
 81: 
 82: When `true`, the layer has a video switch (the eyeball icon) in the Timeline panel; otherwise `false`.
 83: 
 84: #### Type
 85: 
 86: Boolean; read-only.
 87: 
 88: ---
 89: 
 90: ### Layer.id
 91: 
 92: `app.project.item(index).layer(index).id`
 93: 
 94: !!! note
 95:     This functionality was added in After Effects 22.0 (2022)
 96: 
 97: #### Description
 98: 
 99: Instance property on Layer which returns a unique and persistent identification number used internally to identify a Layer between sessions.
100: 
101: The value of the ID remains the same when the project is saved to a file and later reloaded.
102: 
103: However, when you import this project into another project, new IDs are assigned to all Layers in the imported project.
104: The ID is not displayed anywhere in the user interface..
105: 
106: #### Type
107: 
108: Integer; read-only.
109: 
110: ---
111: 
112: ### Layer.index
113: 
114: `app.project.item(index).layer(index).index`
115: 
116: #### Description
117: 
118: The index position of the layer.
119: 
120: #### Type
121: 
122: Integer, in the range `[1..numLayers]`; read-only.
123: 
124: ---
125: 
126: ### Layer.inPoint
127: 
128: `app.project.item(index).layer(index).inPoint`
129: 
130: #### Description
131: 
132: The "in" point of the layer, expressed in composition time (seconds).
133: 
134: #### Type
135: 
136: Floating-point value, in the range `[-10800.0..10800.0]` (minus or plus three hours); read/write.
137: 
138: ---
139: 
140: ### Layer.isNameSet
141: 
142: `app.project.item(index).layer(index).isNameSet`
143: 
144: #### Description
145: 
146: `true` if the value of the name attribute has been set explicitly, rather than automatically from the source.
147: 
148: !!! tip
149:     This always returns `true` for layers that do not have a [AVLayer.source](avlayer.md#avlayersource)
150: 
151: #### Type
152: 
153: Boolean; read-only.
154: 
155: ---
156: 
157: ### Layer.label
158: 
159: `app.project.item(index).layer(index).label`
160: 
161: #### Description
162: 
163: The label color for the item. Colors are represented by their number (0 for None, or 1 to 16 for one of the preset colors in the Labels preferences).
164: 
165: !!! tip
166:     Custom label colors cannot be set programmatically.
167: 
168: #### Type
169: 
170: Integer (0 to 16); read/write.
171: 
172: ---
173: 
174: ### Layer.locked
175: 
176: `app.project.item(index).layer(index).locked`
177: 
178: #### Description
179: 
180: When `true`, the layer is locked; otherwise `false`. This corresponds to the lock toggle in the Layer panel.
181: 
182: #### Type
183: 
184: Boolean; read/write.
185: 
186: ---
187: 
188: ### Layer.marker
189: 
190: `app.project.item(index).layer(index).marker`
191: 
192: #### Description
193: 
194: A [PropertyGroup object](../property/propertygroup.md) that contains all a layer's markers. Layer marker scripting has the same functionality as [Comp markers](../item/compitem.md#compitemmarkerproperty).
195: 
196: See [MarkerValue object](../other/markervalue.md).
197: 
198: #### Type
199: 
200: PropertyGroup object or `null`; read-only.
201: 
202: #### Example
203: 
204: The following sample code creates two layer markers with different properties
205: 
206: ```javascript
207: var solidLayer = comp.layers.addSolid([1, 1, 1], "mylayer", 1920, 1080, 1.0);
208: 
209: var layerMarker = new MarkerValue("This is a layer marker!");
210: layerMarker.duration = 1;
211: 
212: var layerMarker2 = new MarkerValue("Another comp marker!");
213: layerMarker2.duration = 1;
214: 
215: solidLayer.marker.setValueAtTime(1, layerMarker);
216: solidLayer.marker.setValueAtTime(3, layerMarker2);
217: ```
218: 
219: ---
220: 
221: ### Layer.nullLayer
222: 
223: `app.project.item(index).layer(index).nullLayer`
224: 
225: #### Description
226: 
227: When `true`, the layer was created as a null object; otherwise `false`.
228: 
229: #### Type
230: 
231: Boolean; read-only.
232: 
233: ---
234: 
235: ### Layer.outPoint
236: 
237: `app.project.item(index).layer(index).outPoint`
238: 
239: #### Description
240: 
241: The "out" point of the layer, expressed in composition time (seconds).
242: 
243: #### Type
244: 
245: Floating-point value, in the range `[-10800.0..10800.0]` (minus or plus three hours); read/write.
246: 
247: ---
248: 
249: ### Layer.parent
250: 
251: `app.project.item(index).layer(index).parent`
252: 
253: #### Description
254: 
255: The parent of this layer; can be `null`.
256: 
257: Offset values are calculated to counterbalance any transforms above this layer in the hierarchy, so that when you set the parent there is no apparent jump in the layer's transform.
258: 
259: For example, if the new parent has a rotation of 30 degrees, the child layer is assigned a rotation of -30 degrees.
260: 
261: To set the parent without changing the child layer's transform values, use the [setParentWithJump](#layersetparentwithjump) method.
262: 
263: #### Type
264: 
265: Layer object or `null`; read/write.
266: 
267: ---
268: 
269: ### Layer.selectedProperties
270: 
271: `app.project.item(index).layer(index).selectedProperties`
272: 
273: #### Description
274: 
275: An array containing all of the currently selected [Property](../property/property.md) and [PropertyGroup](../property/propertygroup.md) objects in the layer.
276: 
277: #### Type
278: 
279: Array of [PropertyBase](../property/propertybase.md) objects; read-only.
280: 
281: ---
282: 
283: ### Layer.shy
284: 
285: `app.project.item(index).layer(index).shy`
286: 
287: #### Description
288: 
289: When `true`, the layer is "shy", meaning that it is hidden in the Layer panel if the composition's "Hide all shy layers" option is toggled on.
290: 
291: #### Type
292: 
293: Boolean; read/write.
294: 
295: ---
296: 
297: ### Layer.solo
298: 
299: `app.project.item(index).layer(index).solo`
300: 
301: #### Description
302: 
303: When `true`, the layer is soloed, otherwise `false`.
304: 
305: #### Type
306: 
307: Boolean; read/write.
308: 
309: ---
310: 
311: ### Layer.startTime
312: 
313: `app.project.item(index).layer(index).startTime`
314: 
315: #### Description
316: 
317: The start time of the layer, expressed in composition time (seconds).
318: 
319: #### Type
320: 
321: Floating-point value, in the range `[-10800.0..10800.0]` (minus or plus three hours); read/write.
322: 
323: ---
324: 
325: ### Layer.stretch
326: 
327: `app.project.item(index).layer(index).stretch`
328: 
329: #### Description
330: 
331: The layer's time stretch, expressed as a percentage. A value of 100 means no stretch. Values between 0 and 1 are set to 1, and values between -1 and 0 (not including 0) are set to -1.
332: 
333: #### Type
334: 
335: Floating-point value, in the range `[-9900.0..9900.0]`; read/write.
336: 
337: ---
338: 
339: ### Layer.time
340: 
341: `app.project.item(index).layer(index).time`
342: 
343: #### Description
344: 
345: The current time of the layer, expressed in composition time (seconds).
346: 
347: #### Type
348: 
349: Floating-point value; read-only.
350: 
351: ---
352: 
353: ## Methods
354: 
355: ### Layer.activeAtTime()
356: 
357: `app.project.item(index).layer(index).activeAtTime(time)`
358: 
359: #### Description
360: 
361: Returns `true` if this layer will be active at the specified time.
362: 
363: To return `true`, the layer must be enabled, no other layer may be soloing unless this layer is soloed too, and the time must be between the `inPoint` and `outPoint` values of this layer.
364: 
365: #### Parameters
366: 
367: | Parameter |         Type         |     Description      |
368: | --------- | -------------------- | -------------------- |
369: | `time`    | Floating-point value | The time in seconds. |
370: 
371: #### Returns
372: 
373: Boolean.
374: 
375: ---
376: 
377: ### Layer.applyPreset()
378: 
379: `app.project.item(index).layer(index).applyPreset(presetName);`
380: 
381: #### Description
382: 
383: Applies the specified collection of animation settings (an animation preset) to all the currently selected layers of the comp to which the layer belongs. If no layer is selected, it applies the animation preset to a new solid layer.
384: 
385: Predefined animation preset files are installed in the Presets folder, and users can create new animation presets through the user interface.
386: 
387: !!! warning
388:     The animation preset is applied to the the selected layer(s) of the comp, not to the layer whose applyPreset function is called. Hence, the layer whose applyPreset function is called effectively just determines the comp whose layers are processed.
389: 
390: #### Parameters
391: 
392: |  Parameter   |                                                 Type                                                  |                Description                |
393: | ------------ | ----------------------------------------------------------------------------------------------------- | ----------------------------------------- |
394: | `presetName` | [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) object | The file containing the animation preset. |
395: 
396: #### Returns
397: 
398: Nothing.
399: 
400: ---
401: 
402: ### Layer.copyToComp()
403: 
404: `app.project.item(index).layer(index).copyToComp(intoComp)`
405: 
406: #### Description
407: 
408: Copies the layer into the specified composition. The original layer remains unchanged.
409: 
410: Creates a new Layer object with the same values as this one, and prepends the new object to the [LayerCollection object](layercollection.md) in the target CompItem. Retrieve the copy using into `Comp.layer(1)`.
411: 
412: Copying in a layer changes the index positions of previously existing layers in the target composition.
413: 
414: This is the same as copying and pasting a layer through the user interface.
415: 
416: !!! note
417:     As of After Effects 13.6, this method no longer causes After Effects to crash when the layer has a parent.
418: 
419: !!! warning
420:     As of After Effects 13.7 (13.6, has not been tested), if the copied layer has an effect on it and the user undoes the action, After Effects will Crash.
421: 
422: #### Parameters
423: 
424: | Parameter  |                  Type                  |       Description       |
425: | ---------- | -------------------------------------- | ----------------------- |
426: | `intoComp` | [CompItem object](../item/compitem.md) | The target composition. |
427: 
428: #### Returns
429: 
430: Nothing.
431: 
432: ---
433: 
434: ### Layer.doSceneEditDetection()
435: 
436: `app.project.item(index).layer(index).doSceneEditDetection(applyOptions)`
437: 
438: !!! note
439:     This functionality was added in After Effects 22.3 (2022)
440: 
441: #### Description
442: 
443: Runs Scene Edit Detection on the layer that the method is called on and returns an array containing the times of any detected scenes. This is the same as selecting a layer in the Timeline and choosing "Layer > Scene Edit Detection" with the single argument determining whether the edits are applied as markers, layer splits, pre-comps, or are not applied to the layer.
444: 
445: Just as in the UI, `doSceneEditDetection` will fail and error if called on a non-video layer or a video layer with Time Remapping enabled.
446: 
447: #### Parameters
448: 
449: +----------------+-------------------------------+------------------------------------------------------------------------------------------------+
450: |   Parameter    |             Type              |                                          Description                                           |
451: +================+===============================+================================================================================================+
452: | `applyOptions` | `SceneEditDetectionMode` enum | How the detected edits will be applied. One of:                                                |
453: |                |                               |                                                                                                |
454: |                |                               | - `SceneEditDetectionMode.MARKERS`: Create markers at edit points.                             |
455: |                |                               | - `SceneEditDetectionMode.SPLIT`: Split layer.                                                 |
456: |                |                               | - `SceneEditDetectionMode.SPLIT_PRECOMP`: Split layer at edit points and pre-compose each one. |
457: |                |                               | - `SceneEditDetectionMode.NONE`: Detected edits are not applied to the layer.                  |
458: +----------------+-------------------------------+------------------------------------------------------------------------------------------------+
459: 
460: #### Returns
461: 
462: Array of floating-point values; the times of the detected edit points expressed in composition time.
463: 
464: ---
465: 
466: ### Layer.duplicate()
467: 
468: `app.project.item(index).layer(index).duplicate()`
469: 
470: #### Description
471: 
472: Duplicates the layer. Creates a new Layer object in which all values are the same as in this one. This has the same effect as selecting a layer in the user interface and choosing Edit > Duplicate, except the selection in the user interface does not change when you call this method.
473: 
474: #### Parameters
475: 
476: None.
477: 
478: #### Returns
479: 
480: Layer object.
481: 
482: ---
483: 
484: ### Layer.moveAfter()
485: 
486: `app.project.item(index).layer(index).moveAfter(layer)`
487: 
488: #### Description
489: 
490: Moves this layer to a position immediately after (below) the specified layer.
491: 
492: #### Parameters
493: 
494: | Parameter |           Type           |                Description                |
495: | --------- | ------------------------ | ----------------------------------------- |
496: | `layer`   | [Layer object](layer.md) | The target layer in the same composition. |
497: 
498: 
499: #### Returns
500: 
501: Nothing.
502: 
503: ---
504: 
505: ### Layer.moveBefore()
506: 
507: `app.project.item(index).layer(index).moveBefore(layer)`
508: 
509: #### Description
510: 
511: Moves this layer to a position immediately before (above) the specified layer.
512: 
513: #### Parameters
514: 
515: | Parameter |           Type           |                Description                |
516: | --------- | ------------------------ | ----------------------------------------- |
517: | `layer`   | [Layer object](layer.md) | The target layer in the same composition. |
518: 
519: #### Returns
520: 
521: Nothing.
522: 
523: ---
524: 
525: ### Layer.moveToBeginning()
526: 
527: `app.project.item(index).layer(index).moveToBeginning()`
528: 
529: #### Description
530: 
531: Moves this layer to the topmost position of the layer stack (the first layer).
532: 
533: #### Parameters
534: 
535: None.
536: 
537: #### Returns
538: 
539: Nothing.
540: 
541: ---
542: 
543: ### Layer.moveToEnd()
544: 
545: `app.project.item(index).layer(index).moveToEnd()`
546: 
547: #### Description
548: 
549: Moves this layer to the bottom position of the layer stack (the last layer).
550: 
551: #### Parameters
552: 
553: None.
554: 
555: #### Returns
556: 
557: Nothing.
558: 
559: ---
560: 
561: ### Layer.remove()
562: 
563: `app.project.item(index).layer(index).remove()`
564: 
565: #### Description
566: 
567: Deletes the specified layer from the composition.
568: 
569: #### Parameters
570: 
571: None.
572: 
573: #### Returns
574: 
575: Nothing.
576: 
577: ---
578: 
579: ### Layer.setParentWithJump()
580: 
581: `app.project.item(index).layer(index).setParentWithJump([newParent])`
582: 
583: #### Description
584: 
585: Sets the parent of this layer to the specified layer, without changing the transform values of the child layer.
586: 
587: There may be an apparent jump in the rotation, translation, or scale of the child layer, as this layer's transform values are combined with those of its ancestors.
588: 
589: If you do not want the child layer to jump, set the [parent](#layerparent) attribute directly. In this case, an offset is calculated and set in the child layer's transform fields, to prevent the jump from occurring.
590: 
591: #### Parameters
592: 
593: |  Parameter  |           Type           |                                       Description                                        |
594: | ----------- | ------------------------ | ---------------------------------------------------------------------------------------- |
595: | `newParent` | [Layer object](layer.md) | Optional. A layer in the same composition. If not specified, it sets the parent to None. |
596: 
597: #### Returns
598: 
599: Nothing.
````

## File: docs/official/layer/layercollection.md
````markdown
  1: # LayerCollection object
  2: 
  3: `app.project.item(index).layers`
  4: 
  5: #### Description
  6: 
  7: The LayerCollection object represents a set of layers. The LayerCollection belonging to a [CompItem object](../item/compitem.md) contains all the layer objects for layers in the composition. The methods of the collection object allow you to manipulate the layer list.
  8: 
  9: !!! info
 10:     LayerCollection is a subclass of [Collection object](../other/collection.md). All methods and attributes of Collection, in addition to those listed below, are available when working with LayerCollection.
 11: 
 12: #### Example
 13: 
 14: Given that the first item in the project is a CompItem and the second item is an AVItem, this example shows the number of layers in the CompItem's layer collection, adds a new layer based on an AVItem in the project, then displays the new number of layers.
 15: 
 16: ```javascript
 17: var firstComp = app.project.item(1);
 18: var layerCollection = firstComp.layers;
 19: alert("number of layers before is " + layerCollection.length);
 20: var anAVItem = app.project.item(2);
 21: layerCollection.add(anAVItem);
 22: alert("number of layers after is " + layerCollection.length);
 23: ```
 24: 
 25: ---
 26: 
 27: ## Methods
 28: 
 29: ### LayerCollection.add()
 30: 
 31: `app.project.item(index).layers.add(item[, duration])`
 32: 
 33: #### Description
 34: 
 35: Creates a new [AVLayer object](avlayer.md) containing the specified item, and adds it to this collection. The new layer honors the "Create Layers at Composition Start Time" preference. This method generates an exception if the item cannot be added as a layer to this CompItem.
 36: 
 37: #### Parameters
 38: 
 39: +------------+------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 40: | Parameter  |                Type                |                                                                                                                                Description                                                                                                                                |
 41: +============+====================================+===========================================================================================================================================================================================================================================================================+
 42: | `item`     | [AVItem object](../item/avitem.md) | The item to be added.                                                                                                                                                                                                                                                     |
 43: +------------+------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 44: | `duration` | Floating-point value               | Optional. The length of a still layer in seconds. Used only if the item contains a piece of still footage. Has no effect on movies, sequences or audio.                                                                                                                   |
 45: |            |                                    |                                                                                                                                                                                                                                                                           |
 46: |            |                                    | If supplied, sets the duration value of the new layer. Otherwise, the duration value is set according to user preferences.                                                                                                                                                |
 47: |            |                                    |                                                                                                                                                                                                                                                                           |
 48: |            |                                    | By default, this is the same as the duration of the containing [CompItem](../item/compitem.md). To set another preferred value, open `Edit > Preferences > Import` (Windows) or `After Effects > Preferences > Import` (Mac OS), and specify options under Still Footage. |
 49: +------------+------------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 50: 
 51: #### Returns
 52: 
 53: [AVLayer object](avlayer.md);
 54: 
 55: ---
 56: 
 57: ### LayerCollection.addBoxText()
 58: 
 59: `app.project.item(index).layers.addBoxText([width, height])`
 60: 
 61: #### Description
 62: 
 63: Creates a new paragraph (box) text layer with [TextDocument.lineOrientation](../text/textdocument.md#textdocumentlineorientation) set to `LineOrientation.HORIZONTAL` and adds the new [TextLayer object](textlayer.md) to this collection. To create a point text layer, use the [LayerCollection.addText()](#layercollectionaddtext) method.
 64: 
 65: #### Parameters
 66: 
 67: |     Parameter     |              Type              |             Description             |
 68: | ----------------- | ------------------------------ | ----------------------------------- |
 69: | `[width, height]` | Array of floating-point values | The dimensions of the new text box. |
 70: 
 71: #### Returns
 72: 
 73: TextLayer object.
 74: 
 75: ---
 76: 
 77: ### LayerCollection.addCamera()
 78: 
 79: `app.project.item(index).layers.addCamera(name, centerPoint)`
 80: 
 81: #### Description
 82: 
 83: Creates a new camera layer and adds the [CameraLayer object](cameralayer.md) to this collection. The new layer honors the "Create Layers at Composition Start Time" preference.
 84: 
 85: #### Parameters
 86: 
 87: |   Parameter   |                   Type                   |                                             Description                                             |
 88: | ------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------- |
 89: | `name`        | String                                   | The name of the new layer.                                                                          |
 90: | `centerPoint` | Array of floating-point values, `[x, y]` | The initial X and Y values of the new camera's Point of Interest property. The z value is set to 0. |
 91: 
 92: #### Returns
 93: 
 94: [CameraLayer object](cameralayer.md).
 95: 
 96: ---
 97: 
 98: ### LayerCollection.addLight()
 99: 
100: `app.project.item(index).layers.addLight(name, centerPoint)`
101: 
102: #### Description
103: 
104: Creates a new light layer and adds the [LightLayer object](lightlayer.md) to this collection. The new layer honors the "Create Layers at Composition Start Time" preference.
105: 
106: #### Parameters
107: 
108: |   Parameter   |                   Type                   |         Description         |
109: | ------------- | ---------------------------------------- | --------------------------- |
110: | `name`        | String                                   | The name of the new layer.  |
111: | `centerPoint` | Array of floating-point values, `[x, y]` | The center of the new light |
112: 
113: #### Returns
114: 
115: [LightLayer object](lightlayer.md).
116: 
117: ---
118: 
119: ### LayerCollection.addNull()
120: 
121: `app.project.item(index).layers.addNull([duration])`
122: 
123: #### Description
124: 
125: Creates a new null layer and adds the [AVLayer object](avlayer.md) to this collection. This is the same as choosing Layer > New > Null Object.
126: 
127: #### Parameters
128: 
129: +------------+----------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
130: | Parameter  |         Type         |                                                                                                                                Description                                                                                                                                |
131: +============+======================+===========================================================================================================================================================================================================================================================================+
132: | `duration` | Floating-point value | Optional. The length of a still layer in seconds. If supplied, sets the `duration` value of the new layer. Otherwise, the `duration` value is set according to user preferences.                                                                                          |
133: |            |                      |                                                                                                                                                                                                                                                                           |
134: |            |                      | By default, this is the same as the duration of the containing [CompItem](../item/compitem.md). To set another preferred value, open `Edit > Preferences > Import (Windows)` or `After Effects > Preferences > Import (Mac OS)`, and specify options under Still Footage. |
135: +------------+----------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
136: 
137: #### Returns
138: 
139: [AVLayer object](avlayer.md).
140: 
141: ---
142: 
143: ### LayerCollection.addShape()
144: 
145: `app.project.item(index).layers.addShape()`
146: 
147: #### Description
148: 
149: Creates a new [ShapeLayer object](shapelayer.md) for a new, empty Shape layer. Use the ShapeLayer object to add properties, such as shape, fill, stroke, and path filters. This is the same as using a shape tool in "Tool Creates Shape" mode. Tools automatically add a vector group that includes Fill and Stroke as specified in the tool options.
150: 
151: #### Parameters
152: 
153: None.
154: 
155: #### Returns
156: 
157: ShapeLayer object.
158: 
159: ---
160: 
161: ### LayerCollection.addSolid()
162: 
163: `app.project.item(index).layers.addSolid(color, name, width, height, pixelAspect[, duration])`
164: 
165: #### Description
166: 
167: Creates a new [SolidSource object](../sources/solidsource.md), with values set as specified; sets the new SolidSource as the `mainSource` value of a new [FootageItem object](../item/footageitem.md), and adds the FootageItem to the project. Creates a new [AVLayer object](avlayer.md), sets the new Footage Item as its `source`, and adds the layer to this collection.
168: 
169: #### Parameters
170: 
171: +---------------+--------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
172: |   Parameter   |                 Type                 |                                                                                                                               Description                                                                                                                                |
173: +===============+======================================+==========================================================================================================================================================================================================================================================================+
174: | `color`       | Array of three floating-point values | The color of the solid. Three numbers, `[R, G, B]`, in the range `[0.0..1.0]`                                                                                                                                                                                            |
175: +---------------+--------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
176: | `name`        | String                               | The name of the solid.                                                                                                                                                                                                                                                   |
177: +---------------+--------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
178: | `width`       | Integer                              | The width of the solid in pixels, in the range `[4..30000]`                                                                                                                                                                                                              |
179: +---------------+--------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
180: | `height`      | Integer                              | The height of the solid in pixels, in the range `[4..30000]`                                                                                                                                                                                                             |
181: +---------------+--------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
182: | `pixelAspect` | Floating-point value                 | The pixel aspect ratio of the solid, in the range `[0.01..100.0]`                                                                                                                                                                                                        |
183: +---------------+--------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
184: | `duration`    | Floating-point value                 | Optional. The length of a still layer in seconds. If supplied, sets the `duration` value of the new layer. Otherwise, the `duration` value is set according to user preferences.                                                                                         |
185: |               |                                      |                                                                                                                                                                                                                                                                          |
186: |               |                                      | By default, this is the same as the duration of the containing [CompItem](../item/compitem.md). To set another preferred value, open `Edit > Preferences > Import` (Windows) or `After Effects > Preferences > Import` (MacOS), and specify options under Still Footage. |
187: +---------------+--------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
188: 
189: #### Returns
190: 
191: [AVLayer object](avlayer.md).
192: 
193: ---
194: 
195: ### LayerCollection.addText()
196: 
197: `app.project.item(index).layers.addText([sourceText])`
198: 
199: #### Description
200: 
201: Creates a new point text layer with [TextDocument.lineOrientation](../text/textdocument.md#textdocumentlineorientation) set to `LineOrientation.HORIZONTAL` and adds the new [TextLayer object](textlayer.md) to this collection. To create a paragraph (box) text layer, use [LayerCollection.addBoxText()](#layercollectionaddboxtext).
202: 
203: #### Parameters
204: 
205: |  Parameter   |  Type  |                                                                 Description                                                                  |
206: | ------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
207: | `sourceText` | String | Optional. The source text of the new layer, or a [TextDocument object](../text/textdocument.md) containing the source text of the new layer. |
208: 
209: #### Returns
210: 
211: [TextLayer object](textlayer.md).
212: 
213: ---
214: 
215: ### LayerCollection.addVerticalBoxText()
216: 
217: `app.project.item(index).layers.addVerticalBoxText([width, height])`
218: 
219: !!! note
220:     This functionality was added in After Effects 24.2
221: 
222: #### Description
223: 
224: Creates a new paragraph (box) text layer with [TextDocument.lineOrientation](../text/textdocument.md#textdocumentlineorientation) set to `LineOrientation.VERTICAL_RIGHT_TO_LEFT` and adds the new [TextLayer object](textlayer.md) to this collection. To create a point text layer, use the [LayerCollection.addText()](#layercollectionaddtext) or [LayerCollection.addVerticalText()](#layercollectionaddverticaltext) methods.
225: 
226: #### Parameters
227: 
228: |     Parameter     |              Type              |             Description             |
229: | ----------------- | ------------------------------ | ----------------------------------- |
230: | `[width, height]` | Array of floating-point values | The dimensions of the new text box. |
231: 
232: 
233: #### Returns
234: 
235: TextLayer object.
236: 
237: ---
238: 
239: ### LayerCollection.addVerticalText()
240: 
241: `app.project.item(index).layers.addVerticalText([sourceText])`
242: 
243: !!! note
244:     This functionality was added in After Effects 24.2
245: 
246: #### Description
247: 
248: Creates a new point text layer with [TextDocument.lineOrientation](../text/textdocument.md#textdocumentlineorientation) set to `LineOrientation.VERTICAL_RIGHT_TO_LEFT` and adds the new [TextLayer object](textlayer.md) to this collection. To create a paragraph (box) text layer, use the [LayerCollection.addBoxText()](#layercollectionaddboxtext) or [LayerCollection.addVerticalBoxText()](#layercollectionaddverticalboxtext) methods.
249: 
250: #### Parameters
251: 
252: |  Parameter   |  Type  |                                                                 Description                                                                  |
253: | ------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
254: | `sourceText` | String | Optional. The source text of the new layer, or a [TextDocument object](../text/textdocument.md) containing the source text of the new layer. |
255: 
256: #### Returns
257: 
258: [TextLayer object](textlayer.md).
259: 
260: ---
261: 
262: ### LayerCollection.byName()
263: 
264: `app.project.item(index).layers.byName(name)`
265: 
266: #### Description
267: 
268: Returns the first (topmost) layer found in this collection with the specified name, or `null` if no layer with the given name is found.
269: 
270: #### Parameters
271: 
272: | `name` | A string containing the name. |
273: 
274: #### Returns
275: 
276: [Layer object](layer.md) or `null`.
277: 
278: ---
279: 
280: ### LayerCollection.precompose()
281: 
282: `app.project.item(index).layers.precompose(layerIndicies, name[, moveAllAttributes])`
283: 
284: #### Description
285: 
286: Creates a new [CompItem object](../item/compitem.md) and moves the specified layers into its layer collection. It removes the individual layers from this collection, and adds the new CompItem to this collection.
287: 
288: #### Parameters
289: 
290: |      Parameter      |       Type        |                                                                                                                                                                                              Description                                                                                                                                                                                              |
291: | ------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
292: | `layerIndices`      | Array of integers | The position indexes of the layers to be collected.                                                                                                                                                                                                                                                                                                                                                   |
293: | `name`              | String            | The name of the new [CompItem](../item/compitem.md) object.                                                                                                                                                                                                                                                                                                                                          |
294: | `moveAllAttributes` | Boolean           | Optional. When `true` (the default), retains all attributes in the new composition. This is the same as selecting the "Move all attributes into the new composition" option in the Pre-compose dialog box. You can only set this to `false` if there is just one index in the `layerIndices` array. This is the same as selecting the "Leave all attributes in" option in the Pre-compose dialog box. |
295: 
296: #### Returns
297: 
298: [CompItem object](../item/compitem.md).
````

## File: docs/official/layer/lightlayer.md
````markdown
 1: # LightLayer object
 2: 
 3: `app.project.item(index).layer(index)`
 4: 
 5: #### Description
 6: 
 7: The LightLayer object represents a light layer within a composition. Create it using the [LayerCollection.addLight()](layercollection.md#layercollectionaddlight) method. It can be accessed in an item's layer collection either by index number or by a name string.
 8: 
 9: !!! info
10:     LightLayer is a subclass of [Layer object](layer.md). All methods and attributes of Layer are available when working with Light-Layer.
11: 
12: #### AE Properties
13: 
14: LightLayer defines no additional attributes, but has different AE properties than other layer types. It has thefollowing properties and property groups:
15: 
16: - `Marker`
17: - `Transform`:
18:     - `PointofInterest`
19:     - `Position`
20:     - `Scale`
21:     - `Orientation`
22:     - `XRotation`
23:     - `YRotation`
24:     - `Rotation`
25:     - `Opacity`
26: - `LightOptions`:
27:     - `Intensity`
28:     - `Color`
29:     - `ConeAngle`
30:     - `ConeFeather`
31:     - `CastsShadows`
32:     - `ShadowDarkness`
33:     - `ShadowDiffusion`
34: 
35: ---
36: 
37: ## Attributes
38: 
39: ### LightLayer.lightSource:
40: 
41: `app.project.item(index).layer(index).lightSource`
42: 
43: !!! note
44:     `LightLayer.lightSource` was added in After Effects 24.3, but allowed only HDR and EXR layers as sources.
45: 
46:     In After Effects 25.2, it was updated to allow any 2D layer type as a source.
47: 
48: #### Description
49: 
50: For a light layer, the layer to use as a light source when `LightLayer.lightType` is `LightType.ENVIRONMENT`.
51: 
52: `LightLayer.lightSource` can be any 2D video, still, or pre-composition layer in the same composition. Attempting to assign a 3D layer as the `.lightSource` will result in an "Invalid light source specified" error.
53: 
54: ---
55: 
56: ### LightLayer.lightType
57: 
58: `app.project.item(index).layer(index).lightType`
59: 
60: !!! note
61:     `LightType.ENVIRONMENT` was added in After Effects 24.3
62: 
63: #### Description
64: 
65: For a light layer, its light type. Trying to set this attribute for a non-light layer produces an error.
66: 
67: #### Type
68: 
69: A `LightType` enumerated value; read/write. One of:
70: 
71: - `LightType.PARALLEL`
72: - `LightType.SPOT`
73: - `LightType.POINT`
74: - `LightType.AMBIENT`
75: - `LightType.ENVIRONMENT`
````

## File: docs/official/layer/shapelayer.md
````markdown
 1: # ShapeLayer object
 2: 
 3: `app.project.item(index).layer(index)`
 4: 
 5: #### Description
 6: 
 7: The ShapeLayer object represents a shape layer within a composition. Create it using [LayerCollection.addShape()](layercollection.md#layercollectionaddshape). It can be accessed in an item's layer collection either by index number or by a name string.
 8: 
 9: !!! info
10:     ShapeLayer is a subclass of [AVLayer](avlayer.md), which is a subclass of [Layer](layer.md). All methods and attributes of AVLayer and Layer are available when working with ShapeLayer.
````

## File: docs/official/layer/textlayer.md
````markdown
 1: # TextLayer object
 2: 
 3: `app.project.item(index).layer(index)`
 4: 
 5: #### Description
 6: 
 7: The TextLayer object represents a text layer within a composition. Create it using the [LayerCollection object's addText method](layercollection.md#layercollectionaddtext). It can be accessed in an item's layer collection either by index number or by a name string.
 8: 
 9: !!! info
10:     TextLayer is a subclass of [AVLayer](avlayer.md), which is a subclass of [Layer](layer.md). All methods and attributes of AVLayer and Layer are available when working with TextLayer.
11: 
12: #### AE Properties
13: 
14: TextLayer defines no additional attributes, but has the following AE properties and property groups, in addition to those inherited from AVLayer:
15: 
16: - `Text`
17: - `SourceText`
18: - `PathOptions`
19: - `Path`
20: - `ReversePath`
21: - `PerpendicularToPath`
22: - `ForceAlignment`
23: - `FirstMargin`
24: - `LastMargin`
25: - `MoreOptions`
26: - `AnchorPointGrouping`
27: - `GroupingAlignment`
28: - `Fill&Stroke`
29: - `InterCharacterBlending`
30: - `Animators`
31: 
32: #### Unused Properties and Attributes
33: 
34: The `TimeRemapandMotionTrackers` properties, inherited from AVLayer, are not applicable to text layers, and their related AVLayer attributes are not used:
35: 
36: - `canSetTimeRemapEnabled`
37: - `timeRemapEnabled`
38: - `trackMatteType`
39: - `isTrackMatte`
40: - `hasTrackMatte`
````

## File: docs/official/layer/threedmodellayer.md
````markdown
 1: # ThreeDModelLayer object
 2: 
 3: `app.project.item(index).layer(index)`
 4: 
 5: !!! note
 6:     This functionality was added in After Effects 24.4
 7: 
 8: #### Description
 9: 
10: The ThreeDModelLayer object represents a 3D Model layer within a composition.
11: 
12: !!! info
13:     ThreeDModelLayer is a subclass of [AVLayer object](avlayer.md). All methods and attributes of AVLayer are available when working with ThreeDModelLayer.
14: 
15: #### AE Properties
16: 
17: ThreeDModelLayer inherits the following properties and property groups from [AVLayer object](avlayer.md):
18: 
19: - Marker
20: - Time Remap
21: - Transform
22:     - Anchor Point
23:     - Position
24:     - Scale
25:     - Orientation
26:     - X Rotation
27:     - Y Rotation
28:     - Rotation
29:     - Opacity
30: - Layer Styles
31: - Audio
32:     - AudioLevels
33: 
34: #### Example
35: 
36: If the first item in the project is a CompItem, and the first layer of that CompItem is an ThreeDModelLayer, the following checks its type.
37: 
38: ```javascript
39: var modelLayer = app.project.item(1).layer(1);
40: if (modelLayer instanceof ThreeDModelLayer)
41: {
42:     // do something
43: }
44: ```
````

## File: docs/official/matchnames/effects/expression-control-parameters.md
````markdown
 1: # Expression Control Parameter Match Names
 2: 
 3: ---
 4: 
 5: ## Overview
 6: 
 7: In After Effects scripting, Expression Controls (Slider/Color/Layer/etc.) are effects added to a layer via `ADBE Effect Parade`.
 8: 
 9: Each Expression Control effect has one primary parameter property. In practice, scripts frequently access that parameter by an internal matchName suffixed with `-0001`.
10: 
11: These parameter matchNames are widely used in production scripts, but are not listed in the regular First-Party Effect matchName table.
12: 
13: ---
14: 
15: ## Parameter properties (observed in SOURCE_A)
16: 
17: | Parent Effect Match Name | Parameter Match Name | Typical UI Label (EN) | Example usage (from scripts) |
18: | --- | --- | --- | --- |
19: | `ADBE Slider Control` | `ADBE Slider Control-0001` | Slider | `layer("ADBE Effect Parade")("My Slider")("ADBE Slider Control-0001")` |
20: | `ADBE Angle Control` | `ADBE Angle Control-0001` | Angle | `effect("My Angle")("ADBE Angle Control-0001")` |
21: | `ADBE Checkbox Control` | `ADBE Checkbox Control-0001` | Checkbox | `effect("My Checkbox")("ADBE Checkbox Control-0001")` |
22: | `ADBE Color Control` | `ADBE Color Control-0001` | Color | `effect("My Color")("ADBE Color Control-0001")` |
23: | `ADBE Layer Control` | `ADBE Layer Control-0001` | Layer | `effect("My Layer")("ADBE Layer Control-0001")` |
24: | `ADBE Point Control` | `ADBE Point Control-0001` | Point | `effect("My Point")("ADBE Point Control-0001")` |
25: | `ADBE Point3D Control` | `ADBE Point3D Control-0001` | 3D Point | `effect("My 3D Point")("ADBE Point3D Control-0001")` |
26: 
27: ---
28: 
29: ## Examples (real-world)
30: 
31: ### Slider Control → `ADBE Slider Control-0001`
32: 
33: From `Aescripts-circuitFX v1.75/circuitFX.jsx`:
34: 
35: ```javascript
36: j.Effects.addProperty("ADBE Slider Control").name = "Masks Expansion";
37: j("ADBE Effect Parade")("Masks Expansion")(
38:   "ADBE Slider Control-0001",
39: ).setValue(0);
40: ```
41: 
42: ### Checkbox + Angle Control parameters used in expressions
43: 
44: From `Aescripts-circuitFX v1.75/circuitFX.jsx`:
45: 
46: ```javascript
47: "effect(\"[ LINES ]: trim individually\")(\"ADBE Checkbox Control-0001\").value?0:effect(\"[ LINES ]: trim Offset\")(\"ADBE Angle Control-0001\")"
48: ```
49: 
50: ### Color Control → `ADBE Color Control-0001`
51: 
52: From `origami_fix.jsx`:
53: 
54: ```javascript
55: this.col.property("ADBE Color Control-0001").expression =
56:   'bgLayer = thisComp.layer("' + this.layer.name + '"' +
57:   "\nbgLayer.sampleImage([" + coordinate[0] + ", " + coordinate[1] + "], [5,5], true, time)";
58: ```
59: 
60: ### Point Control → `ADBE Point Control-0001`
61: 
62: From `origami_fix.jsx`:
63: 
64: ```javascript
65: var gettySlider = _layer
66:   .property("ADBE Effect Parade")
67:   .addProperty("ADBE Point Control");
68: gettySlider.property("ADBE Point Control-0001").expression =
69:   "thisLayer.sourceRectAtTime(time, true).width * [1,1]";
70: ```
71: 
72: ### Point3D / Layer Control usage
73: 
74: From `Aescripts-Font Manager v2.0.1 (WIN+MAC)/FontManager.jsx`:
75: 
76: ```javascript
77: prop = controllerLayer("ADBE Effect Parade").addProperty("ADBE Point3D Control");
78: propChild = prop("ADBE Point3D Control-0001");
79: 
80: prop = controllerLayer("ADBE Effect Parade").addProperty("ADBE Layer Control");
81: propChild = prop("ADBE Layer Control-0001");
82: ```
83: 
84: ---
85: 
86: ## Notes / risks
87: 
88: - These parameter matchNames behave like stable “internal IDs” in practice, but they are **not consistently enumerated** in the matchName reference tables.
89: - If you need maximum resilience, prefer accessing the parameter by **property index** (`effect.property(1)`) *after* you have a safe reference to the effect itself.
90: - This page documents only parameter matchNames **observed in SOURCE_A** (production scripts).
````

## File: docs/official/matchnames/effects/firstparty.md
````markdown
  1: # First-Party Effect Match Names
  2: 
  3: This list also details effect Bits Per Channel (BPC) and the AE version GPU-acceleration was introduced, if applicable.
  4: 
  5: ---
  6: 
  7: ## 3D Channel
  8: 
  9: |         Match Name         | Display Name (EN)  | BPC | GPU |
 10: | -------------------------- | ------------------ | --- | --- |
 11: | `ADBE AUX CHANNEL EXTRACT` | 3D Channel Extract | 8   |     |
 12: | `ADBE DEPTH MATTE`         | Depth Matte        | 32  |     |
 13: | `ADBE DEPTH FIELD`         | Depth of Field     | 32  |     |
 14: | `EXtractoR`                | EXtractoR          | 32  |     |
 15: | `ADBE FOG_3D`              | Fog 3D             | 32  |     |
 16: | `ADBE ID MATTE`            | ID Matte           | 32  |     |
 17: | `IDentifier`               | IDentifier         | 32  |     |
 18: 
 19: ---
 20: 
 21: ## Audio
 22: 
 23: |       Match Name        | Display Name (EN) | BPC | GPU |
 24: | ----------------------- | ----------------- | --- | --- |
 25: | `ADBE Aud Reverse`      | Backwards         |     |     |
 26: | `ADBE Aud BT`           | Bass & Treble     |     |     |
 27: | `ADBE Aud Delay`        | Delay             |     |     |
 28: | `ADBE Aud_Flange`       | Flange & Chorus   |     |     |
 29: | `ADBE Aud HiLo`         | High-Low Pass     |     |     |
 30: | `ADBE Aud Modulator`    | Modulator         |     |     |
 31: | `ADBE Param EQ`         | Parametric EQ     |     |     |
 32: | `ADBE Aud Reverb`       | Reverb            |     |     |
 33: | `ADBE Aud Stereo Mixer` | Stereo Mixer      |     |     |
 34: | `ADBE Aud Tone`         | Tone              |     |     |
 35: 
 36: ---
 37: 
 38: ## Blur & Sharpen
 39: 
 40: |        Match Name        |  Display Name (EN)  | BPC | GPU  |
 41: | ------------------------ | ------------------- | --- | ---- |
 42: | `ADBE Bilateral`         | Bilateral Blur      | 32  |      |
 43: | `ADBE Camera Lens Blur`  | Camera Lens Blur    | 32  |      |
 44: | `ADBE CameraShakeDeblur` | Camera-Shake Deblur | 32  |      |
 45: | `CS CrossBlur`           | CC Cross Blur       | 32  |      |
 46: | `CC Radial Blur`         | CC Radial Blur      | 32  |      |
 47: | `CC Radial Fast Blur`    | CC Radial Fast Blur | 16  |      |
 48: | `CC Vector Blur`         | CC Vector Blur      | 16  |      |
 49: | `ADBE Channel Blur`      | Channel Blur        | 32  |      |
 50: | `ADBE Compound Blur`     | Compound Blur       | 32  |      |
 51: | `ADBE Motion Blur`       | Directional Blur    | 32  | 15.0 |
 52: | `ADBE Box Blur2`         | Fast Box Blur       | 32  | 14.2 |
 53: | `ADBE Gaussian Blur 2`   | Gaussian Blur       | 32  | 13.8 |
 54: | `ADBE Radial Blur`       | Radial Blur         | 32  |      |
 55: | `ADBE Sharpen`           | Sharpen             | 32  | 13.8 |
 56: | `ADBE Smart Blur`        | Smart Blur          | 16  |      |
 57: | `ADBE Unsharp Mask2`     | Unsharp Mask        | 32  |      |
 58: 
 59: ---
 60: 
 61: ## Channel
 62: 
 63: |         Match Name          |  Display Name (EN)   | BPC | GPU  |
 64: | --------------------------- | -------------------- | --- | ---- |
 65: | `ADBE Arithmetic`           | Arithmetic           | 8   |      |
 66: | `ADBE Blend`                | Blend                | 16  |      |
 67: | `ADBE Calculations`         | Calculations         | 16  |      |
 68: | `CC Composite`              | CC Composite         | 16  |      |
 69: | `ADBE Channel Combiner`     | Channel Combiner     | 8   |      |
 70: | `ADBE Compound Arithmetic`  | Compound Arithmetic  | 8   |      |
 71: | `ADBE Invert`               | Invert               | 32  | 14.1 |
 72: | `ADBE Minimax`              | Minimax              | 16  |      |
 73: | `ADBE Remove Color Matting` | Remove Color Matting | 32  |      |
 74: | `ADBE Set Channels`         | Set Channels         | 16  |      |
 75: | `ADBE Set Matte3`           | Set Matte            | 32  |      |
 76: | `ADBE Shift Channels`       | Shift Channels       | 32  |      |
 77: | `ADBE Solid Composite`      | Solid Composite      | 32  |      |
 78: 
 79: ---
 80: 
 81: ## CINEMA 4D
 82: 
 83: |     Match Name     | Display Name (EN) | BPC | GPU |
 84: | ------------------ | ----------------- | --- | --- |
 85: | `CINEMA 4D Effect` | CINEWARE          | 32  |     |
 86: 
 87: ---
 88: 
 89: ## Color Correction
 90: 
 91: |           Match Name           |      Display Name (EN)       | BPC | GPU  |
 92: | ------------------------------ | ---------------------------- | --- | ---- |
 93: | `ADBE AutoColor`               | Auto Color                   | 16  |      |
 94: | `ADBE AutoContrast`            | Auto Contrast                | 16  |      |
 95: | `ADBE AutoLevels`              | Auto Levels                  | 16  |      |
 96: | `ADBE Black&White`             | Black & White                | 16  |      |
 97: | `ADBE Brightness & Contrast 2` | Brightness & Contrast        | 32  | 14.1 |
 98: | `ADBE Broadcast Colors`        | Broadcast Colors             | 8   |      |
 99: | `CS Color Neutralizer`         | CC Color Neutralizer         | 32  |      |
100: | `CC Color Offset`              | CC Color Offset              | 16  |      |
101: | `CS Kernel`                    | CC Kernel                    | 32  |      |
102: | `CC Toner`                     | CC Toner                     | 32  |      |
103: | `ADBE Change Color`            | Change Color                 | 16  |      |
104: | `ADBE Change To Color`         | Change to Color              | 16  |      |
105: | `ADBE CHANNEL MIXER`           | Channel Mixer                | 32  |      |
106: | `ADBE Color Balance 2`         | Color Balance                | 16  |      |
107: | `ADBE Color Balance (HLS)`     | Color Balance (HLS)          | 16  |      |
108: | `ADBE Color Link`              | Color Link                   | 8   |      |
109: | `ADBE Deflicker`               | Color Stabilizer             | 16  |      |
110: | `APC Colorama`                 | Colorama                     | 16  |      |
111: | `ADBE CurvesCustom`            | Curves                       | 32  |      |
112: | `ADBE Equalize`                | Equalize                     | 8   |      |
113: | `ADBE Exposure2`               | Exposure                     | 32  |      |
114: | `ADBE Gamma/Pedestal/Gain2`    | Gamma/Pedestal/Gain          | 8   |      |
115: | `ADBE HUE SATURATION`          | Hue/Saturation               | 32  | 14.1 |
116: | `ADBE Leave Color`             | Leave Color                  | 8   |      |
117: | `ADBE Easy Levels2`            | Levels                       | 32  | 14.2 |
118: | `ADBE Pro Levels2`             | Levels (Individual Controls) | 32  | 14.2 |
119: | `ADBE Lumetri`                 | Lumetri Color                | 32  | 13.8 |
120: | `ADBE PhotoFilterPS`           | Photo Filter                 | 32  |      |
121: | `ADBE PS Arbitrary Map`        | PS Arbitrary Map             | 8   |      |
122: | `ADBE SelectiveColor`          | Selective Color              | 16  |      |
123: | `ADBE ShadowHighlight`         | Shadow/Highlight             | 16  |      |
124: | `ADBE Tint`                    | Tint                         | 32  | 14.1 |
125: | `ADBE Tritone`                 | Tritone                      | 32  |      |
126: | `ADBE Vibrance`                | Vibrance                     | 16  |      |
127: 
128: ---
129: 
130: ## Distort
131: 
132: |         Match Name         |     Display Name (EN)     | BPC | GPU  |
133: | -------------------------- | ------------------------- | --- | ---- |
134: | `ADBE BEZMESH`             | Bezier Warp               | 16  |      |
135: | `ADBE Bulge`               | Bulge                     | 16  |      |
136: | `CC Bend It`               | CC Bend It                | 16  |      |
137: | `CC Bender`                | CC Bender                 | 16  |      |
138: | `CC Blobbylize`            | CC Blobbylize             | 16  |      |
139: | `CC Flo Motion`            | CC Flo Motion             | 32  |      |
140: | `CC Griddler`              | CC Griddler               | 32  |      |
141: | `CC Lens`                  | CC Lens                   | 32  |      |
142: | `CC Page Turn`             | CC Page Turn              | 16  |      |
143: | `CC Power Pin`             | CC Power Pin              | 32  |      |
144: | `CC Ripple Pulse`          | CC Ripple Pulse           | 32  |      |
145: | `CC Slant`                 | CC Slant                  | 16  |      |
146: | `CC Smear`                 | CC Smear                  | 32  |      |
147: | `CC Split`                 | CC Split                  | 16  |      |
148: | `CC Split 2`               | CC Split 2                | 16  |      |
149: | `CC Tiler`                 | CC Tiler                  | 32  |      |
150: | `ADBE Corner Pin`          | Corner Pin                | 32  |      |
151: | `ADBE Upscale`             | Detail-preserving Upscale | 32  |      |
152: | `ADBE Displacement Map`    | Displacement Map          | 32  |      |
153: | `ADBE LIQUIFY`             | Liquify                   | 16  |      |
154: | `ADBE Magnify`             | Magnify                   | 8   |      |
155: | `ADBE MESH WARP`           | Mesh Warp                 | 16  |      |
156: | `ADBE Mirror`              | Mirror                    | 16  |      |
157: | `ADBE Offset`              | Offset                    | 16  | 14.2 |
158: | `ADBE Optics Compensation` | Optics Compensation       | 32  |      |
159: | `ADBE Polar Coordinates`   | Polar Coordinates         | 32  |      |
160: | `ADBE RESHAPE`             | Reshape                   | 16  |      |
161: | `ADBE Ripple`              | Ripple                    | 16  |      |
162: | `ADBE Rolling Shutter`     | Rolling Shutter Repair    | 32  |      |
163: | `ADBE SCHMEAR`             | Smear                     | 16  |      |
164: | `ADBE Spherize`            | Spherize                  | 16  |      |
165: | `ADBE Geometry2`           | Transform                 | 32  | 15.0 |
166: | `ADBE Turbulent Displace`  | Turbulent Displace        | 32  |      |
167: | `ADBE Twirl`               | Twirl                     | 32  |      |
168: | `ADBE WRPMESH`             | Warp                      | 16  |      |
169: | `ADBE SubspaceStabilizer`  | Warp Stabilizer VFX       | 32  |      |
170: | `ADBE Wave Warp`           | Wave Warp                 | 16  |      |
171: 
172: ---
173: 
174: ## Expression Controls
175: 
176: See also: [Expression Control Parameter Match Names](expression-control-parameters.md)
177: 
178: |       Match Name        | Display Name (EN) | BPC | GPU |
179: | ----------------------- | ----------------- | --- | --- |
180: | `ADBE Point3D Control`  | 3D Point Control  | 32  |     |
181: | `ADBE Angle Control`    | Angle Control     | 32  |     |
182: | `ADBE Checkbox Control` | Checkbox Control  | 32  |     |
183: | `ADBE Color Control`    | Color Control     | 32  |     |
184: | `ADBE Dropdown Control` | Dropdown Control  | 32  |     |
185: | `ADBE Layer Control`    | Layer Control     | 32  |     |
186: | `ADBE Point Control`    | Point Control     | 32  |     |
187: | `ADBE Slider Control`   | Slider Control    | 32  |     |
188: 
189: ---
190: 
191: ## Generate
192: 
193: |       Match Name       | Display Name (EN)  | BPC | GPU  |
194: | ---------------------- | ------------------ | --- | ---- |
195: | `ADBE 4ColorGradient`  | 4-Color Gradient   | 16  |      |
196: | `ADBE Lightning 2`     | Advanced Lightning | 8   |      |
197: | `ADBE AudSpect`        | Audio Spectrum     | 32  |      |
198: | `ADBE AudWave`         | Audio Waveform     | 32  |      |
199: | `ADBE Laser`           | Beam               | 32  |      |
200: | `CC Glue Gun`          | CC Glue Gun        | 32  |      |
201: | `CC Light Burst 2.5`   | CC Light Burst 2.5 | 32  |      |
202: | `CC Light Rays`        | CC Light Rays      | 32  |      |
203: | `CC Light Sweep`       | CC Light Sweep     | 32  |      |
204: | `CS Threads`           | CC Threads         | 32  |      |
205: | `ADBE Cell Pattern`    | Cell Pattern       | 8   |      |
206: | `ADBE Checkerboard`    | Checkerboard       | 8   |      |
207: | `ADBE Circle`          | Circle             | 8   |      |
208: | `ADBE ELLIPSE`         | Ellipse            | 32  |      |
209: | `ADBE Eyedropper Fill` | Eyedropper Fill    | 8   |      |
210: | `ADBE Fill`            | Fill               | 32  |      |
211: | `ADBE Fractal`         | Fractal            | 16  |      |
212: | `ADBE Ramp`            | Gradient Ramp      | 32  | 14.2 |
213: | `ADBE Grid`            | Grid               | 8   |      |
214: | `ADBE Lens Flare`      | Lens Flare         | 8   |      |
215: | `ADBE Paint Bucket`    | Paint Bucket       | 8   |      |
216: | `APC Radio Waves`      | Radio Waves        | 8   |      |
217: | `ADBE Scribble Fill`   | Scribble           | 8   |      |
218: | `ADBE Stroke`          | Stroke             | 8   |      |
219: | `APC Vegas`            | Vegas              | 8   |      |
220: | `ADBE Write-on`        | Write-on           | 8   |      |
221: 
222: ---
223: 
224: ## Keying
225: 
226: |         Match Name          |     Display Name (EN)     | BPC | GPU |
227: | --------------------------- | ------------------------- | --- | --- |
228: | `ADBE Spill2`               | Advanced Spill Suppressor | 32  |     |
229: | `CC Simple Wire Removal`    | CC Simple Wire Removal    | 32  |     |
230: | `ADBE Color Difference Key` | Color Difference Key      | 16  |     |
231: | `ADBE Color Range`          | Color Range               | 8   |     |
232: | `ADBE Difference Matte2`    | Difference Matte          | 16  |     |
233: | `ADBE Extract`              | Extract                   | 16  |     |
234: | `ADBE ATG Extract`          | Inner/Outer Key           | 16  |     |
235: | `ADBE KeyCleaner`           | Key Cleaner               | 32  |     |
236: | `Keylight 906`              | Keylight (1.2)            | 32  |     |
237: | `ADBE Linear Color Key2`    | Linear Color Key          | 32  |     |
238: 
239: ---
240: 
241: ## Matte
242: 
243: |        Match Name        | Display Name (EN) | BPC | GPU |
244: | ------------------------ | ----------------- | --- | --- |
245: | `ADBE Matte Choker`      | Matte Choker      | 16  |     |
246: | `ISL MochaShapeImporter` | mocha shape       | 32  |     |
247: | `ADBE RefineRBMatte`     | Refine Hard Matte | 32  |     |
248: | `ADBE RefineMatte2`      | Refine Soft Matte | 32  |     |
249: | `ADBE Simple Choker`     | Simple Choker     | 32  |     |
250: 
251: ---
252: 
253: ## Noise & Grain
254: 
255: |         Match Name         | Display Name (EN) | BPC | GPU  |
256: | -------------------------- | ----------------- | --- | ---- |
257: | `VISINF Grain Implant`     | Add Grain         | 16  |      |
258: | `ADBE Dust & Scratches`    | Dust & Scratches  | 16  |      |
259: | `ADBE Fractal Noise`       | Fractal Noise     | 32  | 14.2 |
260: | `VISINF Grain Duplication` | Match Grain       | 16  |      |
261: | `ADBE Median`              | Median            | 16  |      |
262: | `ADBE Noise`               | Noise             | 32  |      |
263: | `ADBE Noise Alpha2`        | Noise Alpha       | 8   |      |
264: | `ADBE Noise HLS2`          | Noise HLS         | 8   |      |
265: | `ADBE Noise HLS Auto2`     | Noise HLS Auto    | 8   |      |
266: | `VISINF Grain Removal`     | Remove Grain      | 16  |      |
267: | `ADBE AIF Perlin Noise 3D` | Turbulent Noise   | 32  |      |
268: 
269: ---
270: 
271: ## Obsolete
272: 
273: |           Match Name            |    Display Name (EN)     | BPC | GPU |
274: | ------------------------------- | ------------------------ | --- | --- |
275: | `ADBE Basic 3D`                 | Basic 3D                 | 8   |     |
276: | `ADBE Basic Text2`              | Basic Text               | 8   |     |
277: | `ADBE Color Key`                | Color Key                | 16  |     |
278: | `ADBE Fast Blur`                | Fast Blur (Legacy)       | 32  |     |
279: | `ADBE Gaussian Blur`            | Gaussian Blur (Legacy)   | 32  |     |
280: | `ADBE Lightning`                | Lightning                | 8   |     |
281: | `ADBE Luma Key`                 | Luma Key                 | 16  |     |
282: | `ADBE Path Text`                | Path Text                | 8   |     |
283: | `ADBE Reduce Interlace Flicker` | Reduce Interlace Flicker | 32  |     |
284: | `ADBE Spill Suppressor`         | Spill Suppressor         | 32  |     |
285: 
286: ---
287: 
288: ## Perspective
289: 
290: |      Match Name      | Display Name (EN) | BPC | GPU  |
291: | -------------------- | ----------------- | --- | ---- |
292: | `ADBE 3D Tracker`    | 3D Camera Tracker | 32  |      |
293: | `ADBE 3D Glasses2`   | 3D Glasses        | 32  |      |
294: | `ADBE Bevel Alpha`   | Bevel Alpha       | 16  |      |
295: | `ADBE Bevel Edges`   | Bevel Edges       | 8   |      |
296: | `CC Cylinder`        | CC Cylinder       | 16  |      |
297: | `CC Environment`     | CC Environment    | 32  |      |
298: | `CC Sphere`          | CC Sphere         | 32  |      |
299: | `CC Spotlight`       | CC Spotlight      | 16  |      |
300: | `ADBE Drop Shadow`   | Drop Shadow       | 32  | 14.2 |
301: | `ADBE Radial Shadow` | Radial Shadow     | 8   |      |
302: 
303: ---
304: 
305: ## Simulation
306: 
307: |        Match Name        |   Display Name (EN)    | BPC | GPU |
308: | ------------------------ | ---------------------- | --- | --- |
309: | `APC CardDanceCam`       | Card Dance             | 8   |     |
310: | `APC Caustics`           | Caustics               | 8   |     |
311: | `CC Ball Action`         | CC Ball Action         | 16  |     |
312: | `CC Bubbles`             | CC Bubbles             | 32  |     |
313: | `CC Drizzle`             | CC Drizzle             | 32  |     |
314: | `CC Hair`                | CC Hair                | 16  |     |
315: | `CC Mr. Mercury`         | CC Mr. Mercury         | 32  |     |
316: | `CC Particle Systems II` | CC Particle Systems II | 32  |     |
317: | `CC Particle World`      | CC Particle World      | 16  |     |
318: | `CC Pixel Polly`         | CC Pixel Polly         | 16  |     |
319: | `CSRainfall`             | CC Rainfall            | 32  |     |
320: | `CC Scatterize`          | CC Scatterize          | 16  |     |
321: | `CSSnowfall`             | CC Snowfall            | 32  |     |
322: | `CC Star Burst`          | CC Star Burst          | 16  |     |
323: | `APC Foam`               | Foam                   | 8   |     |
324: | `ADBE Playgnd`           | Particle Playground    | 8   |     |
325: | `APC Shatter`            | Shatter                | 8   |     |
326: | `APC Wave World`         | Wave World             | 8   |     |
327: 
328: 
329: ---
330: 
331: ## Stylize
332: 
333: |      Match Name      | Display Name (EN) | BPC | GPU  |
334: | -------------------- | ----------------- | --- | ---- |
335: | `ADBE Brush Strokes` | Brush Strokes     | 8   |      |
336: | `ADBE Cartoonify`    | Cartoon           | 32  |      |
337: | `CS BlockLoad`       | CC Block Load     | 32  |      |
338: | `CC Burn Film`       | CC Burn Film      | 32  |      |
339: | `CC Glass`           | CC Glass          | 16  |      |
340: | `CS HexTile`         | CC HexTile        | 32  |      |
341: | `CC Kaleida`         | CC Kaleida        | 32  |      |
342: | `CC Mr. Smoothie`    | CC Mr. Smoothie   | 16  |      |
343: | `CC Plastic`         | CC Plastic        | 16  |      |
344: | `CC RepeTile`        | CC RepeTile       | 32  |      |
345: | `CC Threshold`       | CC Threshold      | 32  |      |
346: | `CC Threshold RGB`   | CC Threshold RGB  | 32  |      |
347: | `CS Vignette`        | CC Vignette       | 32  |      |
348: | `ADBE Color Emboss`  | Color Emboss      | 16  |      |
349: | `ADBE Emboss`        | Emboss            | 16  |      |
350: | `ADBE Find Edges`    | Find Edges        | 8   | 14.1 |
351: | `ADBE Glo2`          | Glow              | 32  | 14.1 |
352: | `ADBE Mosaic`        | Mosaic            | 16  |      |
353: | `ADBE Tile`          | Motion Tile       | 8   |      |
354: | `ADBE Posterize`     | Posterize         | 32  |      |
355: | `ADBE Roughen Edges` | Roughen Edges     | 8   |      |
356: | `ADBE Scatter`       | Scatter           | 16  |      |
357: | `ADBE Strobe`        | Strobe Light      | 8   |      |
358: | `ADBE Texturize`     | Texturize         | 8   |      |
359: | `ADBE Threshold2`    | Threshold         | 32  |      |
360: 
361: ---
362: 
363: ## Synthetic Aperture
364: 
365: |          Match Name          | Display Name (EN)  | BPC | GPU |
366: | ---------------------------- | ------------------ | --- | --- |
367: | `SYNTHAP CF Color Finesse 2` | SA Color Finesse 3 | 32  |     |
368: 
369: ---
370: 
371: ## Text
372: 
373: |   Match Name    | Display Name (EN) | BPC | GPU |
374: | --------------- | ----------------- | --- | --- |
375: | `ADBE Numbers2` | Numbers           | 8   |     |
376: | `ADBE Timecode` | Timecode          | 8   |     |
377: 
378: ---
379: 
380: ## Time
381: 
382: |        Match Name        |  Display Name (EN)   | BPC | GPU |
383: | ------------------------ | -------------------- | --- | --- |
384: | `CC Force Motion Blur`   | CC Force Motion Blur | 32  |     |
385: | `CC Wide Time`           | CC Wide Time         | 32  |     |
386: | `ADBE Echo`              | Echo                 | 32  |     |
387: | `ADBE OFMotionBlur`      | Pixel Motion Blur    | 32  |     |
388: | `ADBE Posterize Time`    | Posterize Time       | 32  |     |
389: | `ADBE Difference`        | Time Difference      | 8   |     |
390: | `ADBE Time Displacement` | Time Displacement    | 16  |     |
391: | `ADBE Timewarp`          | Timewarp             | 32  |     |
392: 
393: ---
394: 
395: ## Transition
396: 
397: |       Match Name       |  Display Name (EN)  | BPC | GPU |
398: | ---------------------- | ------------------- | --- | --- |
399: | `ADBE Block Dissolve`  | Block Dissolve      | 16  |     |
400: | `APC CardWipeCam`      | Card Wipe           | 8   |     |
401: | `CC Glass Wipe`        | CC Glass Wipe       | 16  |     |
402: | `CC Grid Wipe`         | CC Grid Wipe        | 32  |     |
403: | `CC Image Wipe`        | CC Image Wipe       | 16  |     |
404: | `CC Jaws`              | CC Jaws             | 32  |     |
405: | `CC Light Wipe`        | CC Light Wipe       | 16  |     |
406: | `CS LineSweep`         | CC Line Sweep       | 32  |     |
407: | `CC Radial ScaleWipe`  | CC Radial ScaleWipe | 16  |     |
408: | `CC Scale Wipe`        | CC Scale Wipe       | 32  |     |
409: | `CC Twister`           | CC Twister          | 16  |     |
410: | `CC WarpoMatic`        | CC WarpoMatic       | 16  |     |
411: | `ADBE Gradient Wipe`   | Gradient Wipe       | 16  |     |
412: | `ADBE IRIS_WIPE`       | Iris Wipe           | 32  |     |
413: | `ADBE Linear Wipe`     | Linear Wipe         | 32  |     |
414: | `ADBE Radial Wipe`     | Radial Wipe         | 32  |     |
415: | `ADBE Venetian Blinds` | Venetian Blinds     | 32  |     |
416: 
417: ---
418: 
419: ## Utility
420: 
421: |        Match Name        |     Display Name (EN)     | BPC | GPU |
422: | ------------------------ | ------------------------- | --- | --- |
423: | `ADBE Apply Color LUT2`  | Apply Color LUT           | 32  |     |
424: | `CC Overbrights`         | CC Overbrights            | 32  |     |
425: | `ADBE Cineon Converter2` | Cineon Converter          | 32  |     |
426: | `ADBE ProfileToProfile`  | Color Profile Converter   | 32  |     |
427: | `ADBE GROW BOUNDS`       | Grow Bounds               | 32  |     |
428: | `ADBE Compander`         | HDR Compander             | 32  |     |
429: | `ADBE HDR ToneMap`       | HDR Highlight Compression | 32  |     |
430: 
431: ---
432: 
433: ## \_Obsolete
434: 
435: |            Match Name            |      Display Name (EN)       | BPC | GPU |
436: | -------------------------------- | ---------------------------- | --- | --- |
437: | `ADBE Paint`                     | Paint                        |     |     |
438: | `ADBE Samurai`                   | Roto Brush & Refine Edge     |     |     |
439: | `ADBE FreePin3`                  | Puppet                       |     |     |
440: | `ADBE RefineMatte`               | Refine Matte                 |     |     |
441: | `ADBE 3D Glasses`                | 3D Glasses (Obsolete)        |     |     |
442: | `ADBE Alpha Levels2`             | Alpha Levels                 |     |     |
443: | `ADBE Alpha Levels3`             | Alpha Levels                 |     |     |
444: | `ADBE Apply Color LUT`           | Apply Color LUT              |     |     |
445: | `ADBE Brightness & Contrast`     | Brightness & Contrast        |     |     |
446: | `ADBE Box Blur`                  | Box Blur                     |     |     |
447: | `ADBE Cineon Converter`          | Cineon Converter             |     |     |
448: | `ADBE Color Balance`             | Color Balance                |     |     |
449: | `CC PS Classic`                  | CC PS Classic (obsolete)     |     |     |
450: | `CC PS LE Classic`               | CC PS LE Classic (obsolete)  |     |     |
451: | `CC Rain`                        | CC Rain                      |     |     |
452: | `CC Snow`                        | CC Snow                      |     |     |
453: | `CC Time Blend`                  | CC Time Blend                |     |     |
454: | `CC Time Blend FX`               | CC Time Blend FX             |     |     |
455: | `ADBE Exposure`                  | Exposure                     |     |     |
456: | `ADBE Easy Levels`               | Levels                       |     |     |
457: | `ADBE Pro Levels`                | Levels (Individual Controls) |     |     |
458: | `ADBE Noise Alpha`               | Noise Alpha                  |     |     |
459: | `ADBE Noise HLS`                 | Noise HLS                    |     |     |
460: | `ADBE Noise HLS Auto`            | Noise HLS Auto               |     |     |
461: | `ADBE PSL Bevel Emboss`          | Photoshop Bevel And Emboss   |     |     |
462: | `ADBE PSL Drop Shadow`           | Photoshop Drop Shadow        |     |     |
463: | `ADBE PSL Inner Glow`            | Photoshop Inner Glow         |     |     |
464: | `ADBE PSL Inner Shadow`          | Photoshop Inner Shadow       |     |     |
465: | `ADBE PSL Outer Glow`            | Photoshop Outer Glow         |     |     |
466: | `ADBE PSL Solid Fill`            | Photoshop Solid Fill         |     |     |
467: | `ADBE Photo Filter`              | Photo Filter                 |     |     |
468: | `ADBE Set Matte2`                | Set Matte                    |     |     |
469: | `ADBE Three-Way Color Corrector` | Three-Way Color Corrector    |     |     |
470: | `ADBE Threshold`                 | Threshold                    |     |     |
471: | `ADBE Geometry`                  | Transform                    |     |     |
472: | `ADBE Unsharp Mask`              | Unsharp Mask                 |     |     |
473: | `ADBE Vector Paint`              | Vector Paint                 |     |     |
````

## File: docs/official/matchnames/layer/3dlayer.md
````markdown
 1: # 3d Layer Match Names
 2: 
 3: ---
 4: 
 5: ## Plane
 6: 
 7: |         Match Name          | Display Name (EN) |
 8: | --------------------------- | ----------------- |
 9: | `ADBE Plane Options Group`  | Geometry Options  |
10: | `ADBE Plane Curvature`      | Curvature         |
11: | `ADBE Plane Subdivision`    | Segments          |
12: | `ADBE Extrsn Options Group` | Geometry Options  |
13: | `ADBE Bevel Depth`          | Bevel Depth       |
14: | `ADBE Hole Bevel Depth`     | Hole Bevel Depth  |
15: | `ADBE Extrsn Depth`         | Extrusion Depth   |
16: 
17: ---
18: 
19: ## Materials
20: 
21: |           Match Name            |  Display Name (EN)   |
22: | ------------------------------- | -------------------- |
23: | `ADBE Material Options Group`   | Material Options     |
24: | `ADBE Light Transmission`       | Light Transmission   |
25: | `ADBE Ambient Coefficient`      | Ambient              |
26: | `ADBE Diffuse Coefficient`      | Diffuse              |
27: | `ADBE Specular Coefficient`     | Specular Intensity   |
28: | `ADBE Shininess Coefficient`    | Specular Shininess   |
29: | `ADBE Metal Coefficient`        | Metal                |
30: | `ADBE Reflection Coefficient`   | Reflection Intensity |
31: | `ADBE Glossiness Coefficient`   | Reflection Sharpness |
32: | `ADBE Fresnel Coefficient`      | Reflection Rolloff   |
33: | `ADBE Transparency Coefficient` | Transparency         |
34: | `ADBE Transp Rolloff`           | Transparency Rolloff |
35: | `ADBE Index of Refraction`      | Index of Refraction  |
````

## File: docs/official/matchnames/layer/avlayer.md
````markdown
 1: # AVLayer Match Names
 2: 
 3: ---
 4: 
 5: ## Layer
 6: 
 7: |   Match Name    | Display Name (EN) |
 8: | --------------- | ----------------- |
 9: | `ADBE AV Layer` |                   |
10: 
11: ---
12: 
13: ## Top-Level
14: 
15: |       Match Name       |  Display Name (EN)   |
16: | ---------------------- | -------------------- |
17: | `ADBE Marker`          | Marker               |
18: | `ADBE Time Remapping`  | Time Remap           |
19: | `ADBE MTrackers`       | Motion Trackers      |
20: | `ADBE Mask Parade`     | Masks                |
21: | `ADBE Effect Parade`   | Effects              |
22: | `ADBE Layer Overrides` | Essential Properties |
23: 
24: 
25: ---
26: 
27: ## Transform
28: 
29: |       Match Name       | Display Name (EN) |
30: | ---------------------- | ----------------- |
31: | `ADBE Transform Group` | Transform         |
32: | `ADBE Anchor Point`    | Anchor Point      |
33: | `ADBE Position`        | Position          |
34: | `ADBE Position_0`      | X Position        |
35: | `ADBE Position_1`      | Y Position        |
36: | `ADBE Position_2`      | Z Position        |
37: | `ADBE Scale`           | Scale             |
38: | `ADBE Orientation`     | Orientation       |
39: | `ADBE Rotate X`        | X Rotation        |
40: | `ADBE Rotate Y`        | Y Rotation        |
41: | `ADBE Rotate Z`        | Z Rotation        |
42: | `ADBE Opacity`         | Opacity           |
43: 
44: ---
45: 
46: ## Material Options (3D)
47: 
48: See also: [3d Layer Match Names](3dlayer.md)
49: 
50: |            Match Name            |   Display Name (EN)   |
51: | ------------------------------- | --------------------- |
52: | `ADBE Material Options Group`   | Material Options      |
53: | `ADBE Casts Shadows`            | Casts Shadows         |
54: | `ADBE Accepts Shadows`          | Accepts Shadows       |
55: | `ADBE Accepts Lights`           | Accepts Lights        |
56: | `ADBE Appears in Reflections`   | Appears in Reflections |
57: 
58: Example usage:
59: 
60: ```javascript
61: layer
62:   .property("ADBE Material Options Group")
63:   .property("ADBE Accepts Lights")
64:   .setValue(true);
65: ```
66: 
67: ---
68: 
69: ## Audio
70: 
71: |     Match Name      | Display Name (EN) |
72: | ------------------- | ----------------- |
73: | `ADBE Audio Group`  | Audio             |
74: | `ADBE Audio Levels` | Audio Levels      |
75: 
76: ---
77: 
78: ## Essential Properties
79: 
80: |          Match Name           | Display Name (EN) |
81: | ----------------------------- | ----------------- |
82: | `ADBE Layer Source Alternate` |                   |
````

## File: docs/official/matchnames/layer/cameralayer.md
````markdown
 1: # Camera Layer Match Names
 2: 
 3: ---
 4: 
 5: ## Layer
 6: 
 7: |     Match Name      | Display Name (EN) |
 8: | ------------------- | ----------------- |
 9: | `ADBE Camera Layer` |                   |
10: 
11: ---
12: 
13: ## Camera
14: 
15: |          Match Name          | Display Name (EN) |
16: | ---------------------------- | ----------------- |
17: | `ADBE Camera Options Group`  | Camera Options    |
18: | `ADBE Camera Zoom`           | Zoom              |
19: | `ADBE Camera Depth of Field` | Depth of Field    |
20: | `ADBE Camera Focus Distance` | Focus Distance    |
21: | `ADBE Camera Aperture`       | Aperture          |
22: | `ADBE Camera Blur Level`     | Blur Level        |
23: 
24: ---
25: 
26: ## Iris
27: 
28: |            Match Name             |    Display Name (EN)    |
29: | --------------------------------- | ----------------------- |
30: | `ADBE Iris Shape`                 | Iris Shape              |
31: | `ADBE Iris Rotation`              | Iris Rotation           |
32: | `ADBE Iris Roundness`             | Iris Roundness          |
33: | `ADBE Iris Aspect Ratio`          | Iris Aspect Ratio       |
34: | `ADBE Iris Diffraction Fringe`    | Iris Diffraction Fringe |
35: | `ADBE Iris Highlight Gain`        | Highlight Gain          |
36: | `ADBE Iris Highlight Threshold`   | Highlight Threshold     |
37: | `ADBE Iris Hightlight Saturation` | Highlight Saturation    |
````

## File: docs/official/matchnames/layer/layerstyles.md
````markdown
  1: # Layer Styles Match Names
  2: 
  3: ---
  4: 
  5: ## Styles
  6: 
  7: |         Match Name         |       Display Name (EN)        |
  8: | -------------------------- | ------------------------------ |
  9: | `ADBE Blend Options Group` | Blending Options               |
 10: | `ADBE Global Angle2`       | Global Light Angle             |
 11: | `ADBE Global Altitude2`    | Global Light Altitude          |
 12: | `ADBE Adv Blend Group`     | Advanced Blending              |
 13: | `ADBE Layer Fill Opacity2` | Fill Opacity                   |
 14: | `ADBE R Channel Blend`     | Red                            |
 15: | `ADBE G Channel Blend`     | Green                          |
 16: | `ADBE B Channel Blend`     | Blue                           |
 17: | `ADBE Blend Interior`      | Blend Interior Styles as Group |
 18: | `ADBE Blend Ranges`        | Use Blend Ranges from Source   |
 19: 
 20: ---
 21: 
 22: ## Drop Shadow
 23: 
 24: |           Match Name            |      Display Name (EN)       |
 25: | ------------------------------- | ---------------------------- |
 26: | `dropShadow/enabled`            | Drop Shadow                  |
 27: | `dropShadow/mode2`              | Blend Mode                   |
 28: | `dropShadow/color`              | Color                        |
 29: | `dropShadow/opacity`            | Opacity                      |
 30: | `dropShadow/useGlobalAngle`     | Use Global Light             |
 31: | `dropShadow/localLightingAngle` | Angle                        |
 32: | `dropShadow/distance`           | Distance                     |
 33: | `dropShadow/chokeMatte`         | Spread                       |
 34: | `dropShadow/blur`               | Size                         |
 35: | `dropShadow/noise`              | Noise                        |
 36: | `dropShadow/layerConceals`      | Layer Knocks Out Drop Shadow |
 37: 
 38: ---
 39: 
 40: ## Inner Shadow
 41: 
 42: |            Match Name            | Display Name (EN) |
 43: | -------------------------------- | ----------------- |
 44: | `innerShadow/enabled`            | Inner Shadow      |
 45: | `innerShadow/mode2`              | Blend Mode        |
 46: | `innerShadow/color`              | Color             |
 47: | `innerShadow/opacity`            | Opacity           |
 48: | `innerShadow/useGlobalAngle`     | Use Global Light  |
 49: | `innerShadow/localLightingAngle` | Angle             |
 50: | `innerShadow/distance`           | Distance          |
 51: | `innerShadow/chokeMatte`         | Choke             |
 52: | `innerShadow/blur`               | Size              |
 53: | `innerShadow/noise`              | Noise             |
 54: 
 55: ---
 56: 
 57: ## Outer Glow
 58: 
 59: |           Match Name           |  Display Name (EN)  |
 60: | ------------------------------ | ------------------- |
 61: | `outerGlow/enabled`            | Outer Glow          |
 62: | `outerGlow/mode2`              | Blend Mode          |
 63: | `outerGlow/opacity`            | Opacity             |
 64: | `outerGlow/noise`              | Noise               |
 65: | `outerGlow/AEColorChoice`      | Color Type          |
 66: | `outerGlow/color`              | Color               |
 67: | `outerGlow/gradient`           | Colors              |
 68: | `outerGlow/gradientSmoothness` | Gradient Smoothness |
 69: | `outerGlow/glowTechnique`      | Technique           |
 70: | `outerGlow/chokeMatte`         | Spread              |
 71: | `outerGlow/blur`               | Size                |
 72: | `outerGlow/inputRange`         | Range               |
 73: | `outerGlow/shadingNoise`       | Jitter              |
 74: 
 75: ---
 76: 
 77: ## Inner Glow
 78: 
 79: |           Match Name           |  Display Name (EN)  |
 80: | ------------------------------ | ------------------- |
 81: | `innerGlow/enabled`            | Inner Glow          |
 82: | `innerGlow/mode2`              | Blend Mode          |
 83: | `innerGlow/opacity`            | Opacity             |
 84: | `innerGlow/noise`              | Noise               |
 85: | `innerGlow/AEColorChoice`      | Color Type          |
 86: | `innerGlow/color`              | Color               |
 87: | `innerGlow/gradient`           | Colors              |
 88: | `innerGlow/gradientSmoothness` | Gradient Smoothness |
 89: | `innerGlow/glowTechnique`      | Technique           |
 90: | `innerGlow/innerGlowSource`    | Source              |
 91: | `innerGlow/chokeMatte`         | Choke               |
 92: | `innerGlow/blur`               | Size                |
 93: | `innerGlow/inputRange`         | Range               |
 94: | `innerGlow/shadingNoise`       | Jitter              |
 95: 
 96: ---
 97: 
 98: ## Bevel/Emboss
 99: 
100: |             Match Name              | Display Name (EN) |
101: | ----------------------------------- | ----------------- |
102: | `bevelEmboss/enabled`               | Bevel and Emboss  |
103: | `bevelEmboss/bevelStyle`            | Style             |
104: | `bevelEmboss/bevelTechnique`        | Technique         |
105: | `bevelEmboss/strengthRatio`         | Depth             |
106: | `bevelEmboss/bevelDirection`        | Direction         |
107: | `bevelEmboss/blur`                  | Size              |
108: | `bevelEmboss/softness`              | Soften            |
109: | `bevelEmboss/useGlobalAngle`        | Use Global Light  |
110: | `bevelEmboss/localLightingAngle`    | Angle             |
111: | `bevelEmboss/localLightingAltitude` | Altitude          |
112: | `bevelEmboss/highlightMode`         | Highlight Mode    |
113: | `bevelEmboss/highlightColor`        | Highlight Color   |
114: | `bevelEmboss/highlightOpacity`      | Highlight Opacity |
115: | `bevelEmboss/shadowMode`            | Shadow Mode       |
116: | `bevelEmboss/shadowColor`           | Shadow Color      |
117: | `bevelEmboss/shadowOpacity`         | Shadow Opacity    |
118: 
119: ---
120: 
121: ## Satin
122: 
123: |          Match Name           | Display Name (EN) |
124: | ----------------------------- | ----------------- |
125: | `chromeFX/enabled`            | Satin             |
126: | `chromeFX/mode2`              | Blend Mode        |
127: | `chromeFX/color`              | Color             |
128: | `chromeFX/opacity`            | Opacity           |
129: | `chromeFX/localLightingAngle` | Angle             |
130: | `chromeFX/distance`           | Distance          |
131: | `chromeFX/blur`               | Size              |
132: | `chromeFX/invert`             | Invert            |
133: 
134: ---
135: 
136: ## Solid Fill
137: 
138: |     Match Name      | Display Name (EN) |
139: | ------------------- | ----------------- |
140: | `solidFill/enabled` | Color Overlay     |
141: | `solidFill/mode2`   | Blend Mode        |
142: | `solidFill/color`   | Color             |
143: | `solidFill/opacity` | Opacity           |
144: 
145: ---
146: 
147: ## Grad Fill
148: 
149: |            Match Name             |  Display Name (EN)  |
150: | --------------------------------- | ------------------- |
151: | `gradientFill/enabled`            | Gradient Overlay    |
152: | `gradientFill/mode2`              | Blend Mode          |
153: | `gradientFill/opacity`            | Opacity             |
154: | `gradientFill/gradient`           | Colors              |
155: | `gradientFill/gradientSmoothness` | Gradient Smoothness |
156: | `gradientFill/angle`              | Angle               |
157: | `gradientFill/type`               | Style               |
158: | `gradientFill/reverse`            | Reverse             |
159: | `gradientFill/align`              | Align with Layer    |
160: | `gradientFill/scale`              | Scale               |
161: | `gradientFill/offset`             | Offset              |
162: 
163: ---
164: 
165: ## Pattern
166: 
167: |      Match Name       | Display Name (EN) |
168: | --------------------- | ----------------- |
169: | `patternFill/enabled` | Pattern Overlay   |
170: | `patternFill/mode2`   | Blend Mode        |
171: | `patternFill/opacity` | Opacity           |
172: | `patternFill/align`   | Link with Layer   |
173: | `patternFill/scale`   | Scale             |
174: | `patternFill/phase`   | Offset            |
175: 
176: ---
177: 
178: ## Stroke
179: 
180: |    Match Name     | Display Name (EN) |
181: | ----------------- | ----------------- |
182: | `frameFX/enabled` | Stroke            |
183: | `frameFX/mode2`   | Blend Mode        |
184: | `frameFX/color`   | Color             |
185: | `frameFX/size`    | Size              |
186: | `frameFX/opacity` | Opacity           |
187: | `frameFX/style`   | Position          |
````

## File: docs/official/matchnames/layer/lightlayer.md
````markdown
 1: # Light Layer Match Names
 2: 
 3: ---
 4: 
 5: ## Layer
 6: 
 7: |     Match Name     | Display Name (EN) |
 8: | ------------------ | ----------------- |
 9: | `ADBE Light Layer` |                   |
10: 
11: ---
12: 
13: ## Light
14: 
15: |         Match Name          | Display Name (EN) |
16: | --------------------------- | ----------------- |
17: | `ADBE Light Options Group`  | Light Options     |
18: | `ADBE Light Intensity`      | Intensity         |
19: | `ADBE Light Color`          | Color             |
20: | `ADBE Light Cone Angle`     | Cone Angle        |
21: | `ADBE Light Cone Feather 2` | Cone Feather      |
22: 
23: ---
24: 
25: ## Falloff
26: 
27: |          Match Name           | Display Name (EN) |
28: | ----------------------------- | ----------------- |
29: | `ADBE Light Falloff Type`     | Falloff           |
30: | `ADBE Light Falloff Start`    | Radius            |
31: | `ADBE Light Falloff Distance` | Falloff Distance  |
32: 
33: ---
34: 
35: ## Shadow
36: 
37: |          Match Name           | Display Name (EN) |
38: | ----------------------------- | ----------------- |
39: | `ADBE Light Shadow Darkness`  | Shadow Darkness   |
40: | `ADBE Light Shadow Diffusion` | Shadow Diffusion  |
````

## File: docs/official/matchnames/layer/shapelayer.md
````markdown
  1: # Shape Layer Match Names
  2: 
  3: ---
  4: 
  5: ## Layer
  6: 
  7: |     Match Name      | Display Name (EN) |
  8: | ------------------- | ----------------- |
  9: | `ADBE Vector Layer` | Shape Layer       |
 10: 
 11: ---
 12: 
 13: ## Contents
 14: 
 15: |        Match Name         | Display Name (EN) |
 16: | ------------------------- | ----------------- |
 17: | `ADBE Root Vectors Group` | Contents          |
 18: 
 19: ---
 20: 
 21: ## Group
 22: 
 23: |          Match Name           | Display Name (EN) |
 24: | ----------------------------- | ----------------- |
 25: | `ADBE Vector Group`           | Group             |
 26: | `ADBE Vector Blend Mode`      | Blend Mode        |
 27: | `ADBE Vectors Group`          | Contents          |
 28: | `ADBE Vector Transform Group` | Transform         |
 29: | `ADBE Vector Materials Group` | Material Options  |
 30: 
 31: ---
 32: 
 33: ## Group Transform Properties
 34: 
 35: |          Match Name           | Display Name (EN)                  |
 36: | ----------------------------- | ---------------------------------- |
 37: | `ADBE Vector Anchor`          | Shape Group Transform Anchor Point |
 38: | `ADBE Vector Position`        | Shape Group Transform Position     |
 39: | `ADBE Vector Scale`           | Shape Group Transform Scale        |
 40: | `ADBE Vector Skew`            | Shape Group Transform Skew         |
 41: | `ADBE Vector Skew Axis`       | Shapw Group Transform Skew Axis    |
 42: | `ADBE Vector Rotation`        | Shape Group Transform Rotation     |
 43: | `ADBE Vector Group Opacity`   | Shape Group Transform Opacity      |
 44: 
 45: ---
 46: 
 47: ## Rectangle
 48: 
 49: |          Match Name           | Display Name (EN) |
 50: | ----------------------------- | ----------------- |
 51: | `ADBE Vector Shape - Rect`    | Rectangle         |
 52: | `ADBE Vector Shape Direction` | Shape Direction   |
 53: | `ADBE Vector Rect Size`       | Size              |
 54: | `ADBE Vector Rect Position`   | Position          |
 55: | `ADBE Vector Rect Roundness`  | Roundness         |
 56: 
 57: ---
 58: 
 59: ## Ellipse
 60: 
 61: |           Match Name           | Display Name (EN) |
 62: | ------------------------------ | ----------------- |
 63: | `ADBE Vector Shape - Ellipse`  | Ellipse           |
 64: | `ADBE Vector Shape Direction`  | Shape Direction   |
 65: | `ADBE Vector Ellipse Size`     | Size              |
 66: | `ADBE Vector Ellipse Position` | Position          |
 67: 
 68: ---
 69: 
 70: ## Polystar
 71: 
 72: |            Match Name             | Display Name (EN) |
 73: | --------------------------------- | ----------------- |
 74: | `ADBE Vector Shape - Star`        | Polystar          |
 75: | `ADBE Vector Shape Direction`     | Shape Direction   |
 76: | `ADBE Vector Star Type`           | Type              |
 77: | `ADBE Vector Star Points`         | Points            |
 78: | `ADBE Vector Star Position`       | Position          |
 79: | `ADBE Vector Star Rotation`       | Rotation          |
 80: | `ADBE Vector Star Inner Radius`   | Inner Radius      |
 81: | `ADBE Vector Star Outer Radius`   | Outer Radius      |
 82: | `ADBE Vector Star Inner Roundess` | Inner Roundness   |
 83: | `ADBE Vector Star Outer Roundess` | Outer Roundness   |
 84: 
 85: ---
 86: 
 87: ## Path
 88: 
 89: |          Match Name           | Display Name (EN) |
 90: | ----------------------------- | ----------------- |
 91: | `ADBE Vector Shape - Group`   | Path              |
 92: | `ADBE Vector Shape Direction` | Shape Direction   |
 93: | `ADBE Vector Shape`           | Path              |
 94: 
 95: ---
 96: 
 97: ## Fill
 98: 
 99: |          Match Name           | Display Name (EN) |
100: | ----------------------------- | ----------------- |
101: | `ADBE Vector Graphic - Fill`  | Fill              |
102: | `ADBE Vector Blend Mode`      | Blend Mode        |
103: | `ADBE Vector Composite Order` | Composite         |
104: | `ADBE Vector Fill Rule`       | Fill Rule         |
105: | `ADBE Vector Fill Color`      | Color             |
106: | `ADBE Vector Fill Opacity`    | Opacity           |
107: 
108: ---
109: 
110: ## Stroke
111: 
112: |            Match Name            | Display Name (EN) |
113: | -------------------------------- | ----------------- |
114: | `ADBE Vector Graphic - Stroke`   | Stroke            |
115: | `ADBE Vector Blend Mode`         | Blend Mode        |
116: | `ADBE Vector Composite Order`    | Composite         |
117: | `ADBE Vector Stroke Color`       | Color             |
118: | `ADBE Vector Stroke Opacity`     | Opacity           |
119: | `ADBE Vector Stroke Width`       | Stroke Width      |
120: | `ADBE Vector Stroke Line Cap`    | Line Cap          |
121: | `ADBE Vector Stroke Line Join`   | Line Join         |
122: | `ADBE Vector Stroke Miter Limit` | Miter Limit       |
123: 
124: ---
125: 
126: ## Stroke Dashes
127: 
128: |         Match Name          | Display Name (EN) |
129: | --------------------------- | ----------------- |
130: | `ADBE Vector Stroke Dashes` | Dashes            |
131: | `ADBE Vector Stroke Dash 1` | Dash              |
132: | `ADBE Vector Stroke Gap 1`  | Gap               |
133: | `ADBE Vector Stroke Dash 2` | Dash 2            |
134: | `ADBE Vector Stroke Gap 2`  | Gap 2             |
135: | `ADBE Vector Stroke Dash 3` | Dash 3            |
136: | `ADBE Vector Stroke Gap 3`  | Gap 3             |
137: | `ADBE Vector Stroke Offset` | Offset            |
138: 
139: ---
140: 
141: ## Stroke Taper
142: 
143: |            Match Name            | Display Name (EN) |
144: | -------------------------------- | ----------------- |
145: | `ADBE Vector Stroke Taper`       | Taper             |
146: | `ADBE Vector Taper Start Width`  | Start Width       |
147: | `ADBE Vector Taper Length Units` | Length Units      |
148: | `ADBE Vector Taper End Width`    | End Width         |
149: | `ADBE Vector Taper End Ease`     | End Ease          |
150: | `ADBE Vector Taper End Length`   | End Length        |
151: | `ADBE Vector Taper Start Length` | Start Length      |
152: | `ADBE Vector Taper Start Ease`   | Start Ease        |
153: 
154: ---
155: 
156: ## Stroke Wave
157: 
158: |           Match Name            | Display Name (EN) |
159: | ------------------------------- | ----------------- |
160: | `ADBE Vector Stroke Wave`       | Wave              |
161: | `ADBE Vector Taper Wave Amount` | Amount            |
162: | `ADBE Vector Taper Wave Units`  | Units             |
163: | `ADBE Vector Taper Wave Phase`  | Phase             |
164: | `ADBE Vector Taper Wavelength`  | Wavelength        |
165: 
166: ---
167: 
168: ## Gradient Fill
169: 
170: |            Match Name            | Display Name (EN) |
171: | -------------------------------- | ----------------- |
172: | `ADBE Vector Graphic - G-Fill`   | Gradient Fill     |
173: | `ADBE Vector Blend Mode`         | Blend Mode        |
174: | `ADBE Vector Composite Order`    | Composite         |
175: | `ADBE Vector Fill Rule`          | Fill Rule         |
176: | `ADBE Vector Grad Type`          | Type              |
177: | `ADBE Vector Grad Start Pt`      | Start Point       |
178: | `ADBE Vector Grad End Pt`        | End Point         |
179: | `ADBE Vector Grad HiLite Length` | Highlight Length  |
180: | `ADBE Vector Grad HiLite Angle`  | Highlight Angle   |
181: | `ADBE Vector Grad Colors`        | Colors            |
182: | `ADBE Vector Fill Opacity`       | Opacity           |
183: 
184: ---
185: 
186: ## Gradient Stroke
187: 
188: |            Match Name            | Display Name (EN) |
189: | -------------------------------- | ----------------- |
190: | `ADBE Vector Graphic - G-Stroke` | Gradient Stroke   |
191: | `ADBE Vector Blend Mode`         | Blend Mode        |
192: | `ADBE Vector Composite Order`    | Composite         |
193: | `ADBE Vector Grad Type`          | Type              |
194: | `ADBE Vector Grad Start Pt`      | Start Point       |
195: | `ADBE Vector Grad End Pt`        | End Point         |
196: | `ADBE Vector Grad HiLite Length` | Highlight Length  |
197: | `ADBE Vector Grad HiLite Angle`  | Highlight Angle   |
198: | `ADBE Vector Grad Colors`        | Colors            |
199: | `ADBE Vector Stroke Opacity`     | Opacity           |
200: | `ADBE Vector Stroke Width`       | Stroke Width      |
201: | `ADBE Vector Stroke Line Cap`    | Line Cap          |
202: | `ADBE Vector Stroke Line Join`   | Line Join         |
203: | `ADBE Vector Stroke Miter Limit` | Miter Limit       |
204: | `ADBE Vector Stroke Dashes`      | Dashes            |
205: 
206: ---
207: 
208: ## Merge Paths
209: 
210: |          Match Name          | Display Name (EN) |
211: | ---------------------------- | ----------------- |
212: | `ADBE Vector Filter - Merge` | Merge Paths       |
213: | `ADBE Vector Merge Type`     | Mode              |
214: 
215: ---
216: 
217: ## Offset Paths
218: 
219: |            Match Name            | Display Name (EN) |
220: | -------------------------------- | ----------------- |
221: | `ADBE Vector Filter - Offset`    | Offset Paths      |
222: | `ADBE Vector Offset Amount`      | Amount            |
223: | `ADBE Vector Offset Line Join`   | Line Join         |
224: | `ADBE Vector Offset Miter Limit` | Miter Limit       |
225: | `ADBE Vector Offset Copies`      | Copies            |
226: | `ADBE Vector Offset Copy Offset` | Copy Offset       |
227: 
228: ---
229: 
230: ## Pucker & Bloat
231: 
232: |            Match Name            | Display Name (EN) |
233: | -------------------------------- | ----------------- |
234: | `ADBE Vector Filter - PB`        | Pucker & Bloat    |
235: | `ADBE Vector PuckerBloat Amount` | Amount            |
236: 
237: ---
238: 
239: ## Repeater
240: 
241: |            Match Name            | Display Name (EN) |
242: | -------------------------------- | ----------------- |
243: | `ADBE Vector Filter - Repeater`  | Repeater          |
244: | `ADBE Vector Repeater Copies`    | Copies            |
245: | `ADBE Vector Repeater Offset`    | Offset            |
246: | `ADBE Vector Repeater Order`     | Composite         |
247: | `ADBE Vector Repeater Transform` | Transform         |
248: 
249: ---
250: 
251: ## Round Corners
252: 
253: |            Match Name            | Display Name (EN) |
254: | -------------------------------- | ----------------- |
255: | `ADBE Vector Filter - RC`        | Round Corners     |
256: | `ADBE Vector RoundCorner Radius` | Radius            |
257: 
258: ---
259: 
260: ## Trim Paths
261: 
262: |         Match Name          |  Display Name (EN)   |
263: | --------------------------- | -------------------- |
264: | `ADBE Vector Filter - Trim` | Trim Paths           |
265: | `ADBE Vector Trim Start`    | Start                |
266: | `ADBE Vector Trim End`      | End                  |
267: | `ADBE Vector Trim Offset`   | Offset               |
268: | `ADBE Vector Trim Type`     | Trim Multiple Shapes |
269: 
270: ---
271: 
272: ## Twist
273: 
274: |          Match Name          | Display Name (EN) |
275: | ---------------------------- | ----------------- |
276: | `ADBE Vector Filter - Twist` | Twist             |
277: | `ADBE Vector Twist Angle`    | Angle             |
278: | `ADBE Vector Twist Center`   | Center            |
279: 
280: ---
281: 
282: ## Wiggle Paths
283: 
284: |           Match Name           | Display Name (EN) |
285: | ------------------------------ | ----------------- |
286: | `ADBE Vector Filter - Roughen` | Wiggle Paths      |
287: | `ADBE Vector Roughen Size`     | Size              |
288: | `ADBE Vector Roughen Detail`   | Detail            |
289: | `ADBE Vector Roughen Points`   | Points            |
290: | `ADBE Vector Temporal Freq`    | Wiggles/Second    |
291: | `ADBE Vector Correlation`      | Correlation       |
292: | `ADBE Vector Temporal Phase`   | Temporal Phase    |
293: | `ADBE Vector Spatial Phase`    | Spatial Phase     |
294: | `ADBE Vector Random Seed`      | Random Seed       |
295: 
296: ---
297: 
298: ## Wiggle Transform
299: 
300: |            Match Name             | Display Name (EN) |
301: | --------------------------------- | ----------------- |
302: | `ADBE Vector Filter - Wiggler`    | Wiggle Transform  |
303: | `ADBE Vector Xform Temporal Freq` | Wiggles/Second    |
304: | `ADBE Vector Correlation`         | Correlation       |
305: | `ADBE Vector Temporal Phase`      | Temporal Phase    |
306: | `ADBE Vector Spatial Phase`       | Spatial Phase     |
307: | `ADBE Vector Random Seed`         | Random Seed       |
308: | `ADBE Vector Wiggler Transform`   | Transform         |
309: 
310: ---
311: 
312: ## Zig Zag
313: 
314: |          Match Name           | Display Name (EN)  |
315: | ----------------------------- | ------------------ |
316: | `ADBE Vector Filter - Zigzag` | Zig Zag            |
317: | `ADBE Vector Zigzag Size`     | Size               |
318: | `ADBE Vector Zigzag Detail`   | Ridges per segment |
319: | `ADBE Vector Zigzag Points`   | Points             |
````

## File: docs/official/matchnames/layer/textlayer.md
````markdown
  1: # Text Layer Match Names
  2: 
  3: ---
  4: 
  5: ## Layer
  6: 
  7: |    Match Name     | Display Name (EN) |
  8: | ----------------- | ----------------- |
  9: | `ADBE Text Layer` |                   |
 10: 
 11: ---
 12: 
 13: ## Text
 14: 
 15: |            Match Name             |   Display Name (EN)   |
 16: | --------------------------------- | --------------------- |
 17: | `ADBE Text Properties`            | Text                  |
 18: | `ADBE Text Document`              | Source Text           |
 19: | `ADBE Text Path Options`          | Path Options          |
 20: | `ADBE Text Reverse Path`          | Reverse Path          |
 21: | `ADBE Text Perpendicular To Path` | Perpendicular To Path |
 22: | `ADBE Text Force Align Path`      | Force Alignment       |
 23: | `ADBE Text First Margin`          | First Margin          |
 24: | `ADBE Text Last Margin`           | Last Margin           |
 25: | `ADBE Text More Options`          | More Options          |
 26: | `ADBE Text Variable Font Spacing` | Variable Font Spacing |
 27: | `ADBE Text Anchor Point Align`    | Grouping Alignment    |
 28: | `ADBE Text Animators`             | Animators             |
 29: 
 30: ---
 31: 
 32: ## Animators
 33: 
 34: |           Match Name            | Display Name (EN) |
 35: | ------------------------------- | ----------------- |
 36: | `ADBE Text Animator`            | Animator          |
 37: | `ADBE Text Selectors`           | Selectors         |
 38: | `ADBE Text Selector`            | Range Selector    |
 39: | `ADBE Text Percent Start`       | Start             |
 40: | `ADBE Text Percent End`         | End               |
 41: | `ADBE Text Percent Offset`      | Offset            |
 42: | `ADBE Text Index Start`         | Start             |
 43: | `ADBE Text Index End`           | End               |
 44: | `ADBE Text Index Offset`        | Offset            |
 45: | `ADBE Text Range Advanced`      | Advanced          |
 46: | `ADBE Text Range Units`         | Units             |
 47: | `ADBE Text Selector Mode`       | Mode              |
 48: | `ADBE Text Selector Max Amount` | Amount            |
 49: | `ADBE Text Selector Smoothness` | Smoothness        |
 50: | `ADBE Text Levels Max Ease`     | Ease High         |
 51: | `ADBE Text Levels Min Ease`     | Ease Low          |
 52: | `ADBE Text Random Seed`         | Random Seed       |
 53: | `ADBE Text Animator Properties` | Properties        |
 54: | `ADBE Text Anchor Point 3D`     | Anchor Point      |
 55: | `ADBE Text Position 3D`         | Position          |
 56: | `ADBE Text Scale 3D`            | Scale             |
 57: | `ADBE Text Skew`                | Skew              |
 58: | `ADBE Text Skew Axis`           | Skew Axis         |
 59: | `ADBE Text Rotation X`          | X Rotation        |
 60: | `ADBE Text Rotation Y`          | Y Rotation        |
 61: | `ADBE Text Rotation`            | Z Rotation        |
 62: | `ADBE Text Opacity`             | Opacity           |
 63: | `ADBE Text Fill Opacity`        | Fill Opacity      |
 64: | `ADBE Text Stroke Opacity`      | Stroke Opacity    |
 65: | `ADBE Text Fill Color`          | Fill Color        |
 66: | `ADBE Text Stroke Color`        | Stroke Color      |
 67: | `ADBE Text Fill Hue`            | Fill Hue          |
 68: | `ADBE Text Stroke Hue`          | Stroke Hue        |
 69: | `ADBE Text Fill Saturation`     | Fill Saturation   |
 70: | `ADBE Text Stroke Saturation`   | Stroke Saturation |
 71: | `ADBE Text Fill Brightness`     | Fill Brightness   |
 72: | `ADBE Text Stroke Brightness`   | Stroke Brightness |
 73: | `ADBE Text Stroke Width`        | Stroke Width      |
 74: | `ADBE Text Line Anchor`         | Line Anchor       |
 75: | `ADBE Text Track Type`          | Tracking Type     |
 76: | `ADBE Text Tracking Amount`     | Tracking Amount   |
 77: | `ADBE Text Character Replace`   | Character Value   |
 78: | `ADBE Text Character Offset`    | Character Offset  |
 79: | `ADBE Text Line Spacing`        | Line Spacing      |
 80: | `ADBE Text Blur`                | Blur              |
 81: 
 82: ---
 83: 
 84: ## 3d Text
 85: 
 86: |           Match Name           |     Display Name (EN)      |
 87: | ------------------------------ | -------------------------- |
 88: | `ADBE 3DText Front RGB`        | Front Color                |
 89: | `ADBE 3DText Front Hue`        | Front Hue                  |
 90: | `ADBE 3DText Front Sat`        | Front Saturation           |
 91: | `ADBE 3DText Front Bright`     | Front Brightness           |
 92: | `ADBE 3DText Front Opacity`    | Front Opacity              |
 93: | `ADBE 3DText Front Ambient`    | Front Ambient              |
 94: | `ADBE 3DText Front Diffuse`    | Front Diffuse              |
 95: | `ADBE 3DText Front Specular`   | Front Specular Intensity   |
 96: | `ADBE 3DText Front Shininess`  | Front Specular Shininess   |
 97: | `ADBE 3DText Front Metal`      | Front Metal                |
 98: | `ADBE 3DText Front Reflection` | Front Reflection Intensity |
 99: | `ADBE 3DText Front Gloss`      | Front Reflection Sharpness |
100: | `ADBE 3DText Front Fresnel`    | Front Reflection Rolloff   |
101: | `ADBE 3DText Front Xparency`   | Front Transparency         |
102: | `ADBE 3DText Front XparRoll`   | Front Transparency Rolloff |
103: | `ADBE 3DText Front IOR`        | Front Index of Refraction  |
104: | `ADBE 3DText Bevel RGB`        | Bevel Color                |
105: | `ADBE 3DText Bevel Hue`        | Bevel Hue                  |
106: | `ADBE 3DText Bevel Sat`        | Bevel Saturation           |
107: | `ADBE 3DText Bevel Bright`     | Bevel Brightness           |
108: | `ADBE 3DText Bevel Opacity`    | Bevel Opacity              |
109: | `ADBE 3DText Bevel Ambient`    | Bevel Ambient              |
110: | `ADBE 3DText Bevel Diffuse`    | Bevel Diffuse              |
111: | `ADBE 3DText Bevel Specular`   | Bevel Specular Intensity   |
112: | `ADBE 3DText Bevel Shininess`  | Bevel Specular Shininess   |
113: | `ADBE 3DText Bevel Metal`      | Bevel Metal                |
114: | `ADBE 3DText Bevel Reflection` | Bevel Reflection Intensity |
115: | `ADBE 3DText Bevel Gloss`      | Bevel Reflection Sharpness |
116: | `ADBE 3DText Bevel Fresnel`    | Bevel Reflection Rolloff   |
117: | `ADBE 3DText Bevel Xparency`   | Bevel Transparency         |
118: | `ADBE 3DText Bevel XparRoll`   | Bevel Transparency Rolloff |
119: | `ADBE 3DText Bevel IOR`        | Bevel Index of Refraction  |
120: | `ADBE 3DText Side RGB`         | Side Color                 |
121: | `ADBE 3DText Side Hue`         | Side Hue                   |
122: | `ADBE 3DText Side Sat`         | Side Saturation            |
123: | `ADBE 3DText Side Bright`      | Side Brightness            |
124: | `ADBE 3DText Side Opacity`     | Side Opacity               |
125: | `ADBE 3DText Side Ambient`     | Side Ambient               |
126: | `ADBE 3DText Side Diffuse`     | Side Diffuse               |
127: | `ADBE 3DText Side Specular`    | Side Specular Intensity    |
128: | `ADBE 3DText Side Shininess`   | Side Specular Shininess    |
129: | `ADBE 3DText Side Metal`       | Side Metal                 |
130: | `ADBE 3DText Side Reflection`  | Side Reflection Intensity  |
131: | `ADBE 3DText Side Gloss`       | Side Reflection Sharpness  |
132: | `ADBE 3DText Side Fresnel`     | Side Reflection Rolloff    |
133: | `ADBE 3DText Side Xparency`    | Side Transparency          |
134: | `ADBE 3DText Side XparRoll`    | Side Transparency Rolloff  |
135: | `ADBE 3DText Side IOR`         | Side Index of Refraction   |
136: | `ADBE 3DText Back RGB`         | Back Color                 |
137: | `ADBE 3DText Back Hue`         | Back Hue                   |
138: | `ADBE 3DText Back Sat`         | Back Saturation            |
139: | `ADBE 3DText Back Bright`      | Back Brightness            |
140: | `ADBE 3DText Back Opacity`     | Back Opacity               |
141: | `ADBE 3DText Back Ambient`     | Back Ambient               |
142: | `ADBE 3DText Back Diffuse`     | Back Diffuse               |
143: | `ADBE 3DText Back Specular`    | Back Specular Intensity    |
144: | `ADBE 3DText Back Shininess`   | Back Specular Shininess    |
145: | `ADBE 3DText Back Metal`       | Back Metal                 |
146: | `ADBE 3DText Back Reflection`  | Back Reflection Intensity  |
147: | `ADBE 3DText Back Gloss`       | Back Reflection Sharpness  |
148: | `ADBE 3DText Back Fresnel`     | Back Reflection Rolloff    |
149: | `ADBE 3DText Back Xparency`    | Back Transparency          |
150: | `ADBE 3DText Back XparRoll`    | Back Transparency Rolloff  |
151: | `ADBE 3DText Back IOR`         | Back Index of Refraction   |
152: | `ADBE 3DText Bevel Depth`      | Bevel Depth                |
153: | `ADBE 3DText Extrude Depth`    | Extrusion Depth            |
````

## File: docs/official/other/collection.md
````markdown
 1: # Collection object
 2: 
 3: #### Description
 4: 
 5: Like an array, a collection associates a set of objects or values as a logical group and provides access to them by index. However, most collection objects are read-only. You do not assign objects to them yourself—their contents update automatically as objects are created or deleted.
 6: 
 7: !!! tip
 8:     The index numbering of a collection starts with 1, not 0.
 9: 
10: ## Objects
11: 
12: - [ItemCollection object](../item/itemcollection.md) All of the items (imported files, folders, solids, and so on) found in the Project panel.
13: - [LayerCollection object](../layer/layercollection.md) All of the layers in a composition.
14: - [OMCollection object](../renderqueue/omcollection.md) All of the Output Module items in the project.
15: - [RQItemCollection object](../renderqueue/rqitemcollection.md) All of the render-queue items in the project.
16: 
17: ---
18: 
19: ## Attributes
20: 
21: | Attribute |  Type   |               Description                |
22: | --------- | ------- | ---------------------------------------- |
23: | `length`  | Integer | The number of objects in the collection. |
24: 
25: ---
26: 
27: ## Methods
28: 
29: | Method | Return Type |                                        Description                                         |
30: | ------ | ----------- | ------------------------------------------------------------------------------------------ |
31: | `[]`   | Object      | Retrieves an object in the collection by its index number. The first object is at index 1. |
````

## File: docs/official/other/importoptions.md
````markdown
  1: # ImportOptions object
  2: 
  3: `new ImportOptions();`
  4: 
  5: `new ImportOptions(file);`
  6: 
  7: 
  8: #### Description
  9: 
 10: The ImportOptions object encapsulates the options used to import a file with the [Project.importFile()](../general/project.md#projectimportfile) methods.
 11: 
 12: The constructor takes an optional parameter, an [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) object for the file.
 13: 
 14: If it is not supplied, you must explicitly set the value of the `file` attribute before using the object with the `importFile` method. For example:
 15: 
 16: ```javascript
 17: new ImportOptions().file = new File("myfile.psd");
 18: ```
 19: 
 20: ---
 21: 
 22: ## Attributes
 23: 
 24: ### ImportOptions.file
 25: 
 26: `importOptions.file`
 27: 
 28: #### Description
 29: 
 30: The file to be imported. If a file is set in the constructor, you can access it through this attribute.
 31: 
 32: #### Type
 33: 
 34: [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) object; read/write.
 35: 
 36: ---
 37: 
 38: ### ImportOptions.forceAlphabetical
 39: 
 40: `importOptions.forceAlphabetical`
 41: 
 42: #### Description
 43: 
 44: When `true`, has the same effect as setting the "Force alphabetical order" option in the File > Import > File dialog box.
 45: 
 46: #### Type
 47: 
 48: Boolean; read/write.
 49: 
 50: ---
 51: 
 52: ### ImportOptions.importAs
 53: 
 54: `importOptions.importAs`
 55: 
 56: #### Description
 57: 
 58: The type of object for which the imported file is to be the source. Before setting, use [canImportAs](#importoptionscanimportas) to check that a given file can be imported as the source of the given object type.
 59: 
 60: #### Type
 61: 
 62: An `ImportAsType` enumerated value; read/write. One of:
 63: 
 64: - `ImportAsType.COMP_CROPPED_LAYERS`
 65: - `ImportAsType.FOOTAGE`
 66: - `ImportAsType.COMP`
 67: - `ImportAsType.PROJECT`
 68: 
 69: ---
 70: 
 71: ### ImportOptions.rangeEnd
 72: 
 73: `importOptions.rangeEnd`
 74: 
 75: !!! warning
 76:     This method/property is officially undocumented and was found via research. The information here may be inaccurate, and this whole method/property may disappear or stop working some point. Please contribute if you have more information on it!
 77: 
 78: #### Description
 79: 
 80: Sets the end clipping range of the sequence, that is going to be imported.
 81: 
 82: - Creates 'missing frames' (video-bards) if the `rangeEnd` exceeds the duration of the sequence to be imported.
 83: - Has no effect if [sequence](#importoptionssequence) is set to `false`.
 84: - Throws an exception if [forceAlphabetical](#importoptionsforcealphabetical) is set to `true`.
 85: - Throws an exception if `rangeEnd` is less then [rangeStart](#importoptionsrangestart) and resets the range to include all the files.
 86: 
 87: #### Type
 88: 
 89: Integer; read/write.
 90: 
 91: ---
 92: 
 93: ### ImportOptions.rangeStart
 94: 
 95: `importOptions.rangeStart`
 96: 
 97: !!! warning
 98:     This method/property is officially undocumented and was found via research. The information here may be inaccurate, and this whole method/property may disappear or stop working some point. Please contribute if you have more information on it!
 99: 
100: #### Description
101: 
102: Sets the start clipping range of the sequence, that is going to be imported.
103: 
104: - Has no effect if [sequence](#importoptionssequence) is set to `false`.
105: - Throws an exception if [forceAlphabetical](#importoptionsforcealphabetical) is set to `true`.
106: - Throws an exception if [rangeEnd](#importoptionsrangeend) value is 0.
107: - Throws an exception if `rangeStart` is greater then [rangeEnd](#importoptionsrangeend) and resets the range to include all the files.
108: 
109: #### Type
110: 
111: Integer; read/write.
112: 
113: #### Example
114: 
115: ```javascript
116: /*
117:     Import 20 frames of the sequence, starting at frame 10 and ending at frame 30
118:  */
119: var mySequence = '~/Desktop/sequence/image_000.png';
120: 
121: var importOptions = new ImportOptions();
122: importOptions.file = new File(mySequence);
123: importOptions.sequence = true;
124: importOptions.forceAlphabetical = false;
125: importOptions.rangeStart = 10;
126: importOptions.rangeEnd = 30;
127: 
128: var item = app.project.importFile(importOptions);
129: ```
130: 
131: ---
132: 
133: ### ImportOptions.sequence
134: 
135: `importOptions.sequence`
136: 
137: #### Description
138: 
139: When `true`, a sequence is imported; otherwise, an individual file is imported.
140: 
141: #### Type
142: 
143: Boolean; read/write.
144: 
145: ---
146: 
147: ## Methods
148: 
149: ### ImportOptions.canImportAs()
150: 
151: `importOptions.canImportAs(type)`
152: 
153: #### Description
154: 
155: Reports whether the file can be imported as the source of a particular object type. If this method returns `true`, you can set the given type as the value of the [importAs](#importoptionsimportas) attribute.
156: 
157: #### Parameters
158: 
159: +-----------+----------------------+------------------------------------------------+
160: | Parameter |         Type         |                  Description                   |
161: +===========+======================+================================================+
162: | `type`    | `ImportAsType` enum. | The type of file that can be imported. One of: |
163: |           |                      |                                                |
164: |           |                      | - `ImportAsType.COMP`                          |
165: |           |                      | - `ImportAsType.FOOTAGE`                       |
166: |           |                      | - `ImportAsType.COMP_CROPPED_LAYERS`           |
167: |           |                      | - `ImportAsType.PROJECT`                       |
168: +-----------+----------------------+------------------------------------------------+
169: 
170: #### Returns
171: 
172: Boolean.
173: 
174: #### Example
175: 
176: ```javascript
177: var io = new ImportOptions(new File("c:\\myFile.psd"));
178: if (io.canImportAs(ImportAsType.COMP)) {
179:     io.importAs = ImportAsType.COMP;
180: }
181: ```
182: 
183: ---
184: 
185: ### ImportOptions.isFileNameNumbered()
186: 
187: `importOptions.isFileNameNumbered(file)`
188: 
189: !!! warning
190:     This method/property is officially undocumented and was found via research. The information here may be inaccurate, and this whole method/property may disappear or stop working some point. Please contribute if you have more information on it!
191: 
192: #### Description
193: 
194: Reports whether the file object is numbered, i.e. file name has a digit.
195: 
196: #### Parameters
197: 
198: | Parameter |                                                 Type                                                  |    Description    |
199: | --------- | ----------------------------------------------------------------------------------------------------- | ----------------- |
200: | `file`    | [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) object | The file to check |
201: 
202: #### Returns
203: 
204: Object, containing 2 keys:
205: 
206: - `isNumbered`: Boolean; wether the file name contains any digit,
207: - `num`: Integer; a number found in file name. Returns 0 when `isNumbered` is `false`.
208: 
209: #### Example
210: 
211: ```javascript
212: var importOptions = new ImportOptions();
213: importOptions.isFileNameNumbered('image.png');     // "isNumbered": false, "num": 0
214: importOptions.isFileNameNumbered('003image.png');  // "isNumbered": true, "num": 3
215: importOptions.isFileNameNumbered('ima0102ge.png'); // "isNumbered": true, "num": 102
216: importOptions.isFileNameNumbered('image0120.png'); // "isNumbered": true, "num": 120
217: ```
````

## File: docs/official/other/keyframeease.md
````markdown
 1: # KeyframeEase object
 2: 
 3: `myKey = new KeyframeEase(speed, influence);`
 4: 
 5: #### Description
 6: 
 7: The KeyframeEase object encapsulates the keyframe ease settings of a layer's AE property. Keyframe ease is determined by the speed and influence values that you set using the property's [setTemporalEaseAtKey](../property/property.md#propertysettemporaleaseatkey) method. The constructor creates a KeyframeEase object. Both parameters are required.
 8: 
 9: - `speed`: A floating-point value. Sets the `speed` attribute.
10: - `influence`: A floating-pointvalue in the range `[0.1..100.0]`. Sets the `influence` attribute.
11: 
12: #### Example
13: 
14: This example assumes that the Position, a spatial property, has more than two keyframes.
15: 
16: ```javascript
17: var easeIn = new KeyframeEase(0.5, 50);
18: var easeOut = new KeyframeEase(0.75, 85);
19: var myPositionProperty = app.project.item(1).layer(1).property("Position");
20: myPositionProperty.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
21: ```
22: 
23: This example sets the Scale, a temporal property with either two or three dimensions. For 2D and 3D properties you must set an `easeIn` and `easeOut` value for each dimension:
24: 
25: ```javascript
26: var easeIn = new KeyframeEase(0.5, 50);
27: var easeOut = new KeyframeEase(0.75, 85);
28: var myScaleProperty = app.project.item(1).layer(1).property("Scale")
29: myScaleProperty.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
30: ```
31: 
32: ---
33: 
34: ## Attributes
35: 
36: ### KeyframeEase.influence
37: 
38: `myKey.influence`
39: 
40: #### Description
41: 
42: The influence value of the keyframe, as shown in the Keyframe Velocity dialog box.
43: 
44: #### Type
45: 
46: Floating-point value, in the range `[0.1..100.0]`; read/write.
47: 
48: ---
49: 
50: ### KeyframeEase.speed
51: 
52: `myKey.speed`
53: 
54: #### Description
55: 
56: The speed value of the keyframe. The units depend on the type of keyframe, and are displayed in the Keyframe Velocity dialog box.
57: 
58: #### Type
59: 
60: Floating-point value; read/write.
````

## File: docs/official/other/markervalue.md
````markdown
  1: # MarkerValue object
  2: 
  3: `new MarkerValue(comment, chapter, url, frameTarget, cuePointName, params)`
  4: 
  5: #### Description
  6: 
  7: The MarkerValue object represents a layer or composition marker, which associates a comment, and optionally a chapter reference point, Web-page link, or Flash Video cue point with a particular point in a layer.
  8: 
  9: Create it with the constructor; all arguments except `comment` are optional.
 10: 
 11: All arguments are strings that set in the corresponding attributes of the returned MarkerValue object, except `params`; this is an array containing key-value pairs, which can then be accessed with the [getParameters()](#markervaluegetparameters) and [setParameters()](#markervaluesetparameters) methods.
 12: 
 13: A script can set any number of parameter pairs; the order does not reflect the order displayed in the application.
 14: 
 15: To associate a marker with a layer, set the MarkerValue object in the [Layer.marker](../layer/layer.md#layermarker) property of the layer: `layerObject.property("Marker").setValueAtTime(time, markerValueObject);`
 16: 
 17: To associate a marker with a composition, set the MarkerValue object in the [CompItem.markerProperty](../item/compitem.md#compitemmarkerproperty) property of the comp: `compObject.markerProperty.setValueAtTime(time, markerValueObject);`
 18: 
 19: For information on the usage of markers see "Using markers" in After Effects Help.
 20: 
 21: #### Examples
 22: 
 23: - To set a **layer** marker that says "Fade Up" at the 2 second mark:
 24:     ```javascript
 25:     var myMarker = new MarkerValue("FadeUp");
 26:     myLayer.property("Marker").setValueAtTime(2, myMarker);
 27:     // or
 28:     myLayer.marker.setValueAtTime(2, myMarker);
 29:     ```
 30: 
 31: - To set a **comp** marker that says "Fade Up" at the 2 second mark:
 32:     ```javascript
 33:     var myMarker = new MarkerValue("FadeUp");
 34:     comp.markerProperty.setValueAtTime(2, myMarker);
 35:     ```
 36: 
 37: - To get comment values from a particular marker:
 38:     ```javascript
 39:     var layer = app.project.item(1).layer(1);
 40:     var markerProperty = layer.marker;
 41: 
 42:     var commentOfFirstMarker = markerProperty.keyValue(1).comment;
 43: 
 44:     // or
 45:     var commentOfMarkerAtTime4 = markerProperty.valueAtTime(4.0, true).comment;
 46: 
 47:     // or
 48:     var markerValueAtTimeClosestToTime4 = markerProperty.keyValue(markerProperty.nearestKeyIndex(4.0));
 49:     var commentOfMarkerClosestToTime4 = markerValueAtTimeClosestToTime4.comment;
 50:     ```
 51: 
 52: ---
 53: 
 54: ## Attributes
 55: 
 56: ### MarkerValue.chapter
 57: 
 58: `app.project.item(index).layer(index).property("Marker").keyValue(index).chapter`
 59: 
 60: #### Description
 61: 
 62: A text chapter link for this marker. Chapter links initiate a jump to a chapter in a QuickTime movie or in other formats that support chapter marks.
 63: 
 64: #### Type
 65: 
 66: String; read/write.
 67: 
 68: ---
 69: 
 70: ### MarkerValue.comment
 71: 
 72: `app.project.item(index).layer(index).property("Marker").keyValue(index).comment`
 73: 
 74: #### Description
 75: 
 76: A text comment for this marker. This comment appears in the Timeline panel next to the layer marker.
 77: 
 78: #### Type
 79: 
 80: String; read/write.
 81: 
 82: ---
 83: 
 84: ### MarkerValue.cuePointName
 85: 
 86: `app.project.item(index).layer(index).property("Marker").keyValue(index).cuePointName`
 87: 
 88: #### Description
 89: 
 90: The Flash Video cue point name, as shown in the Marker dialog box.
 91: 
 92: #### Type
 93: 
 94: String; read/write.
 95: 
 96: ---
 97: 
 98: ### MarkerValue.duration
 99: 
100: `app.project.item(index).layer(index).property("Marker").keyValue(index).duration`
101: 
102: #### Description
103: 
104: The marker's duration, in seconds. The duration appears in the Timeline panel as a short bar extending from the marker location.
105: 
106: #### Type
107: 
108: Floating-point value; read/write.
109: 
110: ---
111: 
112: ### MarkerValue.eventCuePoint
113: 
114: `app.project.item(index).layer(index).property("Marker").keyValue(index).eventCuePoint`
115: 
116: #### Description
117: 
118: When `true`, the FlashVideo cue point is for an event; otherwise, it is for navigation.
119: 
120: #### Type
121: 
122: Boolean; read/write.
123: 
124: ---
125: 
126: ### MarkerValue.frameTarget
127: 
128: `app.project.item(index).layer(index).property("Marker").keyValue(index).frameTarget`
129: 
130: #### Description
131: 
132: A text frame target for this marker. Together with the URL value, this targets a specific frame within a Web page.
133: 
134: #### Type
135: 
136: String; read/write.
137: 
138: ---
139: 
140: ### MarkerValue.url
141: 
142: `app.project.item(index).layer(index).property("Marker").keyValue(index).url`
143: 
144: #### Description
145: 
146: A URL for this marker. This URL is an automatic link to a Web page.
147: 
148: #### Type
149: 
150: String; read/write.
151: 
152: ---
153: 
154: ### MarkerValue.label
155: 
156: `app.project.item(index).layer(index).property("Marker").keyValue(index).label`
157: 
158: #### Description
159: 
160: The label color for a composition or layer marker. Colors are represented by their number (0 for None, or 1 to 16 for one of the preset colors in the Labels preferences). Custom label colors cannot be set programmatically.
161: 
162: Available in After Effects 16.0 or later.
163: 
164: #### Type
165: 
166: Integer (0 to 16); read/write.
167: 
168: ---
169: 
170: ### MarkerValue.protectedRegion
171: 
172: `app.project.item(index).markerProperty.keyValue(index).protectedRegion`
173: 
174: #### Description
175: 
176: State of the Protected Region option in the Composition Marker dialog box. When `true`, the composition marker behaves as a protected region. Will also return `true` for protected region markers on nested composition layers, but is otherwise not applicable to layer markers.
177: 
178: Available in After Effects 16.0 or later.
179: 
180: #### Type
181: 
182: Boolean; read/write.
183: 
184: ---
185: 
186: ## Methods
187: 
188: ### MarkerValue.getParameters()
189: 
190: `app.project.item(index).layer(index).property("Marker").keyValue(index).getParameters()`
191: 
192: #### Description
193: 
194: Returns the key-value pairs for Flash Video cue-point parameters, for a cue point associated with this marker value.
195: 
196: #### Parameters
197: 
198: None.
199: 
200: #### Returns
201: 
202: An object with an attribute matching each parameter name, containing that parameter's value.
203: 
204: ---
205: 
206: ### MarkerValue.setParameters()
207: 
208: `app.project.item(index).layer(index).property("Marker").keyValue(index).setParameters(keyValuePairs)`
209: 
210: #### Description
211: 
212: Associates a set of key-value pairs for Flash Video cue-point parameters, for a cue point associated with this marker value. A cue point can have any number of parameters, but you can add only three through the user interface; use this method to add more than three parameters.
213: 
214: #### Parameters
215: 
216: |    Parameter    |         Type          |                                                                                Description                                                                                |
217: | --------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
218: | `keyValuePairs` | Key-value pair object | Object containing the key-value pairs as attributes and values. The object's `toString()` method is called to assign the string value of each attribute to the named key. |
219: 
220: #### Returns
221: 
222: Nothing.
223: 
224: #### Example
225: 
226: ```javascript
227: var mv = new MarkerValue("MyMarker");
228: var parms = {};
229: parms.timeToBlink = 1;
230: parms.assignMe = "A string"
231: mv.setParameters(parms);
232: myLayer.property("Marker").setValueAtTime(2, mv);
233: ```
````

## File: docs/official/other/preferences.md
````markdown
  1: # Preferences object
  2: 
  3: `app.preferences`
  4: 
  5: #### Description
  6: 
  7: The Preferences object provides an easy way to manage internal AE preferences, such as you'd find in AE's Preferences menu. These are saved in the After Effects preference files, and are persistent between application sessions.
  8: 
  9: Preferences are identified by section and key within the file, and each key name is associated with a value.
 10: 
 11: In the preferences file, section names are enclosed in brackets and quotation marks, and key names are listing in quotation marks below the sectionname. All values are strings.
 12: 
 13: You can create new preferences with this object, as well as accessing existing preferences.
 14: 
 15: As of Version 12/CC, preferences and settings methods now take a third argument to specify the target preferences file if Section/Key is not in "Adobe After Effects $versionNumber.x Prefs.txt".
 16: 
 17: If the third argument is not passed, default value (`PREFType.PREF_Type_MACHINE_SPECIFIC`) is used and After Effects tries to save/get from the "Adobe After Effects $versionNumber.x Prefs.txt" preferences file.
 18: 
 19: #### PREFType Enum
 20: 
 21: The third argument is enum `PREFType` value, one of:
 22: 
 23: - `PREF_Type_MACHINE_SPECIFIC`: Adobe After Effects $versionNumber.x Prefs.txt
 24: - `PREF_Type_MACHINE_INDEPENDENT`: Adobe After Effects $versionNumber.x Prefs-indep-general.txt
 25: - `PREF_Type_MACHINE_INDEPENDENT_RENDER`: Adobe After Effects $versionNumber.x Prefs-indep-render.txt
 26: - `PREF_Type_MACHINE_INDEPENDENT_OUTPUT`: Adobe After Effects $versionNumber.x Prefs-indep-output.txt
 27: - `PREF_Type_MACHINE_INDEPENDENT_COMPOSITION`: Adobe After Effects $versionNumber.x Prefs-indep-composition.txt
 28: - `PREF_Type_MACHINE_SPECIFIC_TEXT`: Adobe After Effects $versionNumber.x Prefs-text.txt
 29: - `PREF_Type_MACHINE_SPECIFIC_PAINT`: Adobe After Effects $versionNumber.x Prefs-paint.txt
 30: 
 31: ---
 32: 
 33: ## Methods
 34: 
 35: ### Preferences.deletePref()
 36: 
 37: `app.preferences.deletePref(sectionName, keyName[, prefType])`
 38: 
 39: #### Description
 40: 
 41: Deletes a preference from the preference file.
 42: 
 43: #### Parameters
 44: 
 45: |   Parameter   |               Type                |               Description               |
 46: | ------------- | --------------------------------- | --------------------------------------- |
 47: | `sectionName` | String                            | The name of a preferences section.      |
 48: | `keyName`     | String                            | The key name of the preference.         |
 49: | `prefType`    | [`PREFType` enum](#preftype-enum) | Optional. Which preference file to use. |
 50: 
 51: #### Returns
 52: 
 53: Nothing.
 54: 
 55: #### Example
 56: 
 57: If you have saved a setting named with the key name "trimPrecomps" in a section called "Precomp Cropper", you can delete the setting by:
 58: 
 59: ```javascript
 60: app.preferences.deletePref("Settings_Precomp Cropper", "trimPrecomps");
 61: ```
 62: 
 63: ---
 64: 
 65: ### Preferences.getPrefAsBool()
 66: 
 67: `app.preferences.getPrefAsBool(sectionName, keyName[, prefType])`
 68: 
 69: #### Description
 70: 
 71: Retrieves a preference value from the preferences file, and parses it as a boolean.
 72: 
 73: #### Parameters
 74: 
 75: |   Parameter   |               Type                |               Description               |
 76: | ------------- | --------------------------------- | --------------------------------------- |
 77: | `sectionName` | String                            | The name of a preferences section.      |
 78: | `keyName`     | String                            | The key name of the preference.         |
 79: | `prefType`    | [`PREFType` enum](#preftype-enum) | Optional. Which preference file to use. |
 80: 
 81: #### Returns
 82: 
 83: Boolean.
 84: 
 85: #### Example
 86: 
 87: To retrieve the value of the Flow Chart "Expand Flowchart Comps by Default" preference:
 88: 
 89: ```javascript
 90: var expandByDefault = app.preferences.getPrefAsBool("Flowchart Settings", "Expand Flowchart Comps by Default");
 91: alert("The setting is: " + expandByDefault);
 92: ```
 93: 
 94: To retrieve the value of the main preference "Javascript Debugger Enabled":
 95: 
 96: ```javascript
 97: var debuggerEnabled = app.preferences.getPrefAsBool("Main Pref Section v2", "Pref_JAVASCRIPT_DEBUGGER", PREFType.PREF_Type_MACHINE_INDEPENDENT);
 98: alert("The setting is: " + debuggerEnabled);
 99: ```
100: 
101: ---
102: 
103: ### Preferences.getPrefAsFloat()
104: 
105: `app.preferences.getPrefAsFloat(sectionName, keyName[, prefType])`
106: 
107: #### Description
108: 
109: Retrieves a preference value from the preferences file, and parses it as a float.
110: 
111: #### Parameters
112: 
113: |   Parameter   |               Type                |               Description               |
114: | ------------- | --------------------------------- | --------------------------------------- |
115: | `sectionName` | String                            | The name of a preferences section.      |
116: | `keyName`     | String                            | The key name of the preference.         |
117: | `prefType`    | [`PREFType` enum](#preftype-enum) | Optional. Which preference file to use. |
118: 
119: #### Returns
120: 
121: Float.
122: 
123: ---
124: 
125: ### Preferences.getPrefAsLong()
126: 
127: `app.preferences.getPrefAsLong(sectionName, keyName[, prefType])`
128: 
129: #### Description
130: 
131: Retrieves a preference value from the preferences file, and parses it as a long (number).
132: 
133: #### Parameters
134: 
135: |   Parameter   |               Type                |               Description               |
136: | ------------- | --------------------------------- | --------------------------------------- |
137: | `sectionName` | String                            | The name of a preferences section.      |
138: | `keyName`     | String                            | The key name of the preference.         |
139: | `prefType`    | [`PREFType` enum](#preftype-enum) | Optional. Which preference file to use. |
140: 
141: #### Returns
142: 
143: Long.
144: 
145: ---
146: 
147: ### Preferences.getPrefAsString()
148: 
149: `app.preferences.getPrefAsString(sectionName, keyName[, prefType])`
150: 
151: #### Description
152: 
153: Retrieves a preference value from the preferences file, and parses it as a string.
154: 
155: #### Parameters
156: 
157: |   Parameter   |               Type                |               Description               |
158: | ------------- | --------------------------------- | --------------------------------------- |
159: | `sectionName` | String                            | The name of a preferences section.      |
160: | `keyName`     | String                            | The key name of the preference.         |
161: | `prefType`    | [`PREFType` enum](#preftype-enum) | Optional. Which preference file to use. |
162: 
163: #### Returns
164: 
165: String.
166: 
167: ---
168: 
169: ### Preferences.havePref()
170: 
171: `app.preferences.havePref(sectionName, keyName[, prefType])`
172: 
173: #### Description
174: 
175: Returns `true` if the specified preference item exists and has a value.
176: 
177: #### Parameters
178: 
179: |   Parameter   |               Type                |               Description               |
180: | ------------- | --------------------------------- | --------------------------------------- |
181: | `sectionName` | String                            | The name of a preferences section.      |
182: | `keyName`     | String                            | The key name of the preference.         |
183: | `prefType`    | [`PREFType` enum](#preftype-enum) | Optional. Which preference file to use. |
184: 
185: #### Returns
186: 
187: Boolean.
188: 
189: ---
190: 
191: ### Preferences.reload()
192: 
193: `app.preferences.reload()`
194: 
195: #### Description
196: 
197: Reloads the preferences file manually. Otherwise, changes to preferences will only be accessible by scripting after an application restart.
198: 
199: #### Parameters
200: 
201: None.
202: 
203: #### Returns
204: 
205: Nothing.
206: 
207: ---
208: 
209: ### Preferences.savePrefAsBool()
210: 
211: `app.preferences.savePrefAsBool(sectionName, keyName, value[, prefType])`
212: 
213: #### Description
214: 
215: Saves a preference item as a boolean.
216: 
217: #### Parameters
218: 
219: |   Parameter   |               Type                |               Description               |
220: | ------------- | --------------------------------- | --------------------------------------- |
221: | `sectionName` | String                            | The name of a preferences section.      |
222: | `keyName`     | String                            | The key name of the preference.         |
223: | `value`       | Boolean                           | The new value.                          |
224: | `prefType`    | [`PREFType` enum](#preftype-enum) | Optional. Which preference file to use. |
225: 
226: #### Returns
227: 
228: Nothing.
229: 
230: ---
231: 
232: ### Preferences.savePrefAsFloat()
233: 
234: `app.preferences.savePrefAsFloat(sectionName, keyName, value[, prefType])`
235: 
236: #### Description
237: 
238: Saves a preference item as a float.
239: 
240: #### Parameters
241: 
242: |   Parameter   |               Type                |               Description               |
243: | ------------- | --------------------------------- | --------------------------------------- |
244: | `sectionName` | String                            | The name of a preferences section.      |
245: | `keyName`     | String                            | The key name of the preference.         |
246: | `value`       | Floating-point value              | The new value.                          |
247: | `prefType`    | [`PREFType` enum](#preftype-enum) | Optional. Which preference file to use. |
248: 
249: #### Returns
250: 
251: Nothing.
252: 
253: ---
254: 
255: ### Preferences.savePrefAsLong()
256: 
257: `app.preferences.savePrefAsLong(sectionName, keyName, value[, prefType])`
258: 
259: #### Description
260: 
261: Saves a preference item as a long.
262: 
263: #### Parameters
264: 
265: |   Parameter   |               Type                |               Description               |
266: | ------------- | --------------------------------- | --------------------------------------- |
267: | `sectionName` | String                            | The name of a preferences section.      |
268: | `keyName`     | String                            | The key name of the preference.         |
269: | `value`       | Long value                        | The new value.                          |
270: | `prefType`    | [`PREFType` enum](#preftype-enum) | Optional. Which preference file to use. |
271: 
272: #### Returns
273: 
274: Nothing.
275: 
276: ---
277: 
278: ### Preferences.savePrefAsString()
279: 
280: `app.preferences.savePrefAsString(sectionName, keyName, value[, prefType])`
281: 
282: #### Description
283: 
284: Saves a preference item as a string.
285: 
286: #### Parameters
287: 
288: |   Parameter   |               Type                |               Description               |
289: | ------------- | --------------------------------- | --------------------------------------- |
290: | `sectionName` | String                            | The name of a preferences section.      |
291: | `keyName`     | String                            | The key name of the preference.         |
292: | `value`       | String                            | The new value.                          |
293: | `prefType`    | [`PREFType` enum](#preftype-enum) | Optional. Which preference file to use. |
294: 
295: #### Returns
296: 
297: Nothing.
298: 
299: ---
300: 
301: ### Preferences.saveToDisk()
302: 
303: `app.preferences.saveToDisk()`
304: 
305: #### Description
306: 
307: Saves the preferences to disk manually. Otherwise, changes to preferences will only be accessible by scripting after an application restart.
308: 
309: #### Parameters
310: 
311: None.
312: 
313: #### Returns
314: 
315: Nothing.
````

## File: docs/official/other/settings.md
````markdown
  1: # Settings object
  2: 
  3: `app.settings`
  4: 
  5: #### Description
  6: 
  7: The Settings object provides an easy way to manage settings for third-party scripts. The settings are saved in the main After Effects preferences file, and are persistent between application sessions.
  8: 
  9: Settings are identified by section and key within the file, and each key name is associated with a value.
 10: 
 11: In the settings file, section names are enclosed in brackets and quotation marks, and key names are listing in quotation marks below the sectionname. All values are strings.
 12: 
 13: You can create new settings with this object, as well as accessing existing settings.
 14: 
 15: As of Version 12/CC, preferences and settings methods now take a third argument to specify the target preferences file if Section/Key is not in the main preferences file. See [Preferences object](preferences.md) for more info.
 16: 
 17: !!! tip
 18:     - These values aren't shared between versions of AE; each new install brings new settings files, and so these prefs won't carry over.
 19:     - Internally, all saved settings have their section name preprended with `"Settings_"`
 20:     - If you're looking to get or set internal AE preferences, see [Preferences object](preferences.md)
 21: 
 22: ---
 23: 
 24: ## Methods
 25: 
 26: ### Settings.getSetting()
 27: 
 28: `app.settings.getSetting(sectionName, keyName[, prefType])`
 29: 
 30: #### Description
 31: 
 32: Retrieves a script settings item value from the preferences file.
 33: 
 34: !!! warning
 35:     If the value is greater than 1999 bytes, `getSetting` that item will throw an error (seen in AE 15.0.1)
 36: 
 37: #### Parameters
 38: 
 39: |   Parameter   |                       Type                        |               Description               |
 40: | ------------- | ------------------------------------------------- | --------------------------------------- |
 41: | `sectionName` | String                                            | The name of a settings section.         |
 42: | `keyName`     | String                                            | The key name of the setting item.       |
 43: | `prefType`    | [`PREFType` enum](./preferences.md#preftype-enum) | Optional. Which preference file to use. |
 44: 
 45: 
 46: #### Returns
 47: 
 48: String.
 49: 
 50: #### Example
 51: 
 52: If you have saved a setting named with the key name "trimPrecomps" in a section called "Precomp Cropper", you can retrieve the value by:
 53: 
 54: ```javascript
 55: var trimPrecompsSetting = app.settings.getSetting("Precomp Cropper", "trimPrecomps");
 56: alert("The setting is: " + trimPrecompsSetting);
 57: ```
 58: 
 59: ---
 60: 
 61: ### Settings.haveSetting()
 62: 
 63: `app.settings.haveSetting(sectionName, keyName[, prefType])`
 64: 
 65: #### Description
 66: 
 67: Returns `true` if the specified script settings item exists and has a value.
 68: 
 69: #### Parameters
 70: 
 71: |   Parameter   |                       Type                        |               Description               |
 72: | ------------- | ------------------------------------------------- | --------------------------------------- |
 73: | `sectionName` | String                                            | The name of a settings section.         |
 74: | `keyName`     | String                                            | The key name of the setting item.       |
 75: | `prefType`    | [`PREFType` enum](./preferences.md#preftype-enum) | Optional. Which preference file to use. |
 76: 
 77: #### Returns
 78: 
 79: Boolean.
 80: 
 81: ---
 82: 
 83: ### Settings.saveSetting()
 84: 
 85: `app.settings.saveSetting(sectionName, keyName, value[, prefType])`
 86: 
 87: #### Description
 88: 
 89: Saves a value for a script settings item.
 90: 
 91: !!! warning
 92:     If the value is greater than 1999 bytes, `saveSetting` that item will throw an error (seen in AE 15.0.1)
 93: 
 94: #### Parameters
 95: 
 96: |   Parameter   |                       Type                        |               Description               |
 97: | ------------- | ------------------------------------------------- | --------------------------------------- |
 98: | `sectionName` | String                                            | The name of a settings section.         |
 99: | `keyName`     | String                                            | The key name of the setting item.       |
100: | `value`       | String                                            | The new value.                          |
101: | `prefType`    | [`PREFType` enum](./preferences.md#preftype-enum) | Optional. Which preference file to use. |
102: 
103: #### Returns
104: 
105: Nothing.
106: 
107: #### Example
108: 
109: If you want to save a setting called "trimPrecomps" for a script named "Precomp Cropper", you could save that setting via
110: 
111: ```javascript
112: var trimPrecompsSetting = true;
113: app.settings.saveSetting("Precomp Cropper", "trimPrecomps", trimPrecompsSetting);
114: ```
115: 
116: Note that the setting will be saved as a string. You'll want to parse it into a bool later, if needed.
````

## File: docs/official/other/shape.md
````markdown
  1: # Shape object
  2: 
  3: `app.project.item(index).layer(index).property(index).property("maskShape").value`
  4: 
  5: #### Description
  6: 
  7: The Shape object encapsulates information describing a shape in a shape layer, or the outline shape of a Mask. It is the value of the "Mask Path" AE properties, and of the "Path" AE property of a shape layer. Use the constructor, `new Shape()`, to create a new, empty Shape object, then set the attributes individually to define the shape.
  8: 
  9: A shape has a set of anchor points, or vertices, and a pair of direction handles, or tangent vectors, for each anchor point. A tangent vector (in a non-RotoBezier mask) determines the direction of the line that is drawn to or from an anchor point. There is one incoming tangent vector and one outgoing tangent vector associated with each vertex in the shape.
 10: 
 11: A tangent value is a pair of x,y coordinates specified relative to the associated vertex. For example, a tangent of [-1,-1] is located above and to the left of the vertex and has a 45 degree slope, regardless of the actual location of the vertex. The longer a handle is, the greater its influence; for example, an incoming shape segment stays closer to the vector for an `inTangent` of [-2,-2] than it does for an `inTangent` of [-1,-1], even though both of these come toward the vertex from the same direction.
 12: 
 13: If a shape is not closed, the `inTangent` for the first vertex and the `outTangent` for the final vertex are ignored. If the shape is closed, these two vectors specify the direction handles of the final connecting segment out of the final vertex and back into the first vertex.
 14: 
 15: RotoBezier masks calculate their tangents automatically. (See [MaskPropertyGroup.rotoBezier](../property/maskpropertygroup.md#maskpropertygrouprotobezier)) If a shape is used in a RotoBezier mask, the tangent values are ignored. This means that, for RotoBezier masks, you can construct a shape by setting only the `vertices` attribute and setting both `inTangents` and `outTangents` to `null`. When you access the new shape, its tangent values are filled with the automatically calculated tangent values.
 16: 
 17: For closed mask shapes, variable-width mask feather points can exist anywhere along the mask path. Feather points are part of the Mask Path property. Reference a specific feather point by the number of the mask path segment (portion of the path between adjacent vertices) where it appears.
 18: 
 19: !!! tip
 20:     The feather points on a mask are listed in an array in the order that they were created.
 21: 
 22: #### Examples
 23: 
 24: - Create a square mask. A square is a closed shape with 4 vertices. The `inTangents` and `outTangents` for connected straight-line segments are 0, the default, and do not need to be explicitly set.
 25:     ```javascript
 26:     var myShape = new Shape();
 27:     myShape.vertices = [[0,0], [0,100], [100,100], [100,0]];
 28:     myShape.closed = true;
 29:     ```
 30: - Create a "U" shaped mask. A "U" is an open shape with the same 4 vertices used in the square.
 31:     ```javascript
 32:     var myShape = new Shape();
 33:     myShape.vertices = [[0,0], [0,100], [100,100], [100,0]];
 34:     myShape.closed = false;
 35:     ```
 36: - Create an oval. An oval is a closed shape with 4 vertices and with inTangent and outTangent values.
 37:     ```javascript
 38:     var myShape = new Shape();
 39:     myShape.vertices = [[300,50], [200,150],[300,250],[400,150]];
 40:     myShape.inTangents = [[55.23,0],[0,-55.23],[-55.23,0],[0,55.23]];
 41:     myShape.outTangents = [[-55.23,0],[0,55.23],[55.23,0],[0,-55.23]];
 42:     myShape.closed = true;
 43:     ```
 44: - Create a square mask with two feather points. A large square mask with two feather points, one closer to the left end the second mask segment (off the bottom edge) with a radius of 30 pixels and the other one centered the third mask segment (off the right edge) with a larger radius of 100 pixels.
 45:     ```javascript
 46:     var myShape = new Shape();
 47:     myShape.vertices = [[100,100], [100,400], [400,400], [400,100]]; // segments drawn counter clockwise
 48:     myShape.closed = true;
 49:     myShape.featherSegLocs = [1, 2]; // segments are numbered starting at 0, so second segment is 1
 50:     myShape.featherRelSegLocs = [0.15, 0.5]; // 0.15 is closer to the lower-left corner of the square
 51:     myShape.featherRadii = [30, 100]; // second feather point (onright-sidesegment) has a larger radius
 52:     ```
 53: 
 54: ---
 55: 
 56: ## Attributes
 57: 
 58: ### Shape.closed
 59: 
 60: `shapeObject.value.closed`
 61: 
 62: #### Description
 63: 
 64: When `true`, the first and last vertices are connected to form a closed curve. When `false`, the closing segment is not drawn.
 65: 
 66: #### Type
 67: 
 68: Boolean; read/write.
 69: 
 70: ---
 71: 
 72: ### Shape.featherInterps
 73: 
 74: `shapeObject.value.featherInterps`
 75: 
 76: #### Description
 77: 
 78: An array containing each feather point's radius interpolation type (0 for non-Hold feather points, 1 for Hold feather points).
 79: 
 80: !!! tip
 81:     Values are stored in the array in the order that feather points are created.
 82: 
 83: #### Type
 84: 
 85: Array of integers (0 or 1); read/write.
 86: 
 87: ---
 88: 
 89: ### Shape.featherRadii
 90: 
 91: `shapeObject.value.featherRadii`
 92: 
 93: #### Description
 94: 
 95: An array containing each feather point's radius (feather amount); inner feather points have negative values.
 96: 
 97: !!! tip
 98:     Values are stored in the array in the order that feather points are created.
 99: 
100: #### Type
101: 
102: Array of floating-point values; read/write.
103: 
104: ---
105: 
106: ### Shape.featherRelCornerAngles
107: 
108: `shapeObject.value.featherRelCornerAngles`
109: 
110: #### Description
111: 
112: An array containing each feather point's relative angle percentage between the two normals on either side of a curved outer feather boundary at a corner on a mask path. The angle value is 0% for feather points not at corners.
113: 
114: !!! tip
115:     Values are stored in the array in the order that feather points are created.
116: 
117: #### Type
118: 
119: Array of floating-point percentage values (0 to 100); read/write.
120: 
121: ---
122: 
123: ### Shape.featherRelSegLocs
124: 
125: `shapeObject.value.featherRelSegLocs`
126: 
127: #### Description
128: 
129: An array containing each feather point's relative position, from 0 to 1, on its mask path segment (section of the mask path between vertices, numbered starting at 0).
130: 
131: !!! tip
132:     Values are stored in the array in the order that feather points are created. To move a feather point to a different mask path segment, first change the [featherSegLocs](#shapefeatherseglocs) attribute value, then this attribute.
133: 
134: #### Type
135: 
136: Array of floating-point values (0 to 1); read/write.
137: 
138: ---
139: 
140: ### Shape.featherSegLocs
141: 
142: `shapeObject.value.featherSegLocs`
143: 
144: #### Description
145: 
146: An array containing each feather point's mask path segment number (section of the mask path between vertices, numbered starting at 0).
147: 
148: !!! tip
149:     Values are stored in the array in the order that feather points are created. Move a feather point to a different segment by changing both its segment number (this attribute) and, optionally, its [featherRelSegLocs](#shapefeatherrelseglocs) attribute value.
150: 
151: #### Type
152: 
153: Array of integers; read/write.
154: 
155: #### Example
156: 
157: ```javascript
158: // Assuming a rectangle closed mask (segments numbered 0-3) has 3 mask feather points,
159: // move all 3 feather points to the first mask segment.
160: 
161: // Get the Shape object for the mask, assumed here to be the first mask on the layer.
162: var my_maskShape = layer.mask(1).property("ADBE Mask Shape").value;
163: 
164: // Check where mask feather points are located.
165: // Note: They are stored in the order that they are added.
166: var where_are_myMaskFeatherPoints = my_maskShape.featherSegLocs;
167: 
168: // Move all 3 feather points to the first mask segment (numbered 0).
169: my_maskShape.featherSegLocs = [0, 0, 0];
170: 
171: // Update the mask path.
172: layer.mask(1).property("ADBE Mask Shape").setValue(my_maskShape);
173: ```
174: 
175: ---
176: 
177: ### Shape.featherTensions
178: 
179: `shapeObject.value.featherTensions`
180: 
181: #### Description
182: 
183: An array containing each feather point's tension amount, from 0 (0% tension) to 1 (100% tension).
184: 
185: !!! tip
186:     Values are stored in the array in the order that feather points are created.
187: 
188: #### Type
189: 
190: Array of floating-point values (0 to 1); read/write.
191: 
192: ---
193: 
194: ### Shape.featherTypes
195: 
196: `shapeObject.value.featherTypes`
197: 
198: #### Description
199: 
200: An array containing each feather point's direction, either 0 (outer feather point) or 1 (inner feather point).
201: 
202: !!! tip
203:     You cannot change the direction of a feather point after it has been created.
204:     Values are stored in the array in the order that feather points are created.
205: 
206: #### Type
207: 
208: Array of integers (0 or 1); read/write.
209: 
210: ---
211: 
212: ### Shape.inTangents
213: 
214: `shapeObject.value.inTangents`
215: 
216: #### Description
217: 
218: The incoming tangent vectors, or direction handles, associated with the vertices of the shape. Specify each vector as an array of two floating-point values, and collect the vectors into an array the same length as the `vertices` array.
219: 
220: Each tangent value defaults to [0,0]. When the mask shape is not RotoBezier, this results in a straight line segment.
221: 
222: If the shape is in a RotoBezier mask, all tangent values are ignored and the tangents are automatically calculated.
223: 
224: #### Type
225: 
226: Array of floating-point pair arrays; read/write.
227: 
228: ---
229: 
230: ### Shape.outTangents
231: 
232: `shapeObject.value.outTangents`
233: 
234: #### Description
235: 
236: The outgoing tangent vectors, or direction handles, associated with the vertices of the shape. Specify each vector as an array of two floating-point values, and collect the vectors into an array the same length as the `vertices` array.
237: 
238: Each tangent value defaults to [0,0]. When the mask shape is not RotoBezier, this results in a straight line segment.
239: 
240: If the shape is in a RotoBezier mask, all tangent values are ignored and the tangents are automatically calculated.
241: 
242: #### Type
243: 
244: Array of floating-point pair arrays; read/write.
245: 
246: ---
247: 
248: ### Shape.vertices
249: 
250: `shapeObject.value.vertices`
251: 
252: #### Description
253: 
254: The anchor points of the shape. Specify each point as an array of two floating-point values, and collect the point pairs into an array for the complete set of points.
255: 
256: #### Example
257: 
258: ```javascript
259: myShape.vertices = [[0,0], [0,1], [1,1], [1,0]];
260: ```
261: 
262: #### Type
263: 
264: Array of floating-point pair arrays; read/write.
````

## File: docs/official/other/view.md
````markdown
 1: # View object
 2: 
 3: `app.activeViewer.views[0]`
 4: 
 5: #### Description
 6: 
 7: The View object represents a specific view.
 8: 
 9: ---
10: 
11: ## Attributes
12: 
13: ### View.active
14: 
15: `app.activeViewer.views[0].active`
16: 
17: #### Description
18: 
19: When `true`, indicates if the viewer panel is focused, and thereby frontmost.
20: 
21: #### Type
22: 
23: Boolean; read-only.
24: 
25: ---
26: 
27: ### View.options
28: 
29: `app.activeViewer.views[0].options`
30: 
31: #### Description
32: 
33: Options object for this View
34: 
35: #### Type
36: 
37: [ViewOptions object](viewoptions.md)
38: 
39: ---
40: 
41: ## Methods
42: 
43: ### View.setActive()
44: 
45: `app.activeViewer.views[0].setActive()`
46: 
47: #### Description
48: 
49: Moves this view panel to the front and places focus on it, making it active.
50: Calling this method will set the [view's active attribute](#viewactive) to `true`.
51: 
52: #### Parameters
53: 
54: None.
55: 
56: #### Returns
57: 
58: Boolean, indicating if the view panel was made active.
````

## File: docs/official/other/viewer.md
````markdown
  1: # Viewer object
  2: 
  3: `app.activeViewer`
  4: 
  5: #### Description
  6: 
  7: The Viewer object represents a Composition, Layer, or Footage panel.
  8: 
  9: #### Example
 10: 
 11: This maximizes the active viewer panel, and displays its type if it contains a composition.
 12: 
 13: ```javascript
 14: var activeViewer = app.activeViewer;
 15: activeViewer.maximized = true;
 16: if (activeViewer.type === ViewerType.VIEWER_COMPOSITION) {
 17:     alert("Composition panel is active.");
 18: }
 19: ```
 20: 
 21: ---
 22: 
 23: ## Attributes
 24: 
 25: ### Viewer.active
 26: 
 27: `viewer.active`
 28: 
 29: #### Description
 30: 
 31: When `true`, indicates if the viewer panel is focused, and thereby frontmost.
 32: 
 33: #### Type
 34: 
 35: Boolean; read-only.
 36: 
 37: ---
 38: 
 39: ### Viewer.activeViewIndex
 40: 
 41: `viewer.activeViewIndex`
 42: 
 43: #### Description
 44: 
 45: The index of the current active [View object](view.md), in the [Viewer.views](#viewerviews) array.
 46: 
 47: #### Type
 48: 
 49: Integer; read/write.
 50: 
 51: ---
 52: 
 53: ### Viewer.maximized
 54: 
 55: `viewer.maximized`
 56: 
 57: #### Description
 58: 
 59: When `true`, indicates if the viewer panel is at its maximized size.
 60: 
 61: #### Type
 62: 
 63: Boolean; read/write.
 64: 
 65: ---
 66: 
 67: ### Viewer.views
 68: 
 69: `viewer.views`
 70: 
 71: #### Description
 72: 
 73: All of the Views associated with this viewer.
 74: 
 75: #### Type
 76: 
 77: Array of [View object](view.md) objects; read-only.
 78: 
 79: ---
 80: 
 81: ### Viewer.type
 82: 
 83: `viewer.type`
 84: 
 85: #### Description
 86: 
 87: The content in the viewer panel.
 88: 
 89: #### Type
 90: 
 91: A `ViewerType` enumerated value; read-only. One of:
 92: 
 93: - `ViewerType.VIEWER_COMPOSITION`
 94: - `ViewerType.VIEWER_LAYER`
 95: - `ViewerType.VIEWER_FOOTAGE`
 96: 
 97: ---
 98: 
 99: ## Methods
100: 
101: ### Viewer.setActive()
102: 
103: `viewer.setActive()`
104: 
105: #### Description
106: 
107: Moves the viewer panel to the front and places focus on it, making it active.
108: Calling this method will set the [viewer's active attribute](#vieweractive) to `true`.
109: 
110: #### Parameters
111: 
112: None.
113: 
114: #### Returns
115: 
116: Boolean indicating if the viewer panel was made active.
````

## File: docs/official/other/viewoptions.md
````markdown
  1: # ViewOptions object
  2: 
  3: `app.activeViewer.views[0].options`
  4: 
  5: #### Description
  6: 
  7: The ViewOptions object represents the options for a given [View object](view.md)
  8: 
  9: #### Example
 10: 
 11: This enables checkerboards and locks guides for a given view
 12: 
 13: ```javascript
 14: var activeViewer = app.activeViewer;
 15: var viewOptions = activeViewer.views[0].options;
 16: viewOptions.checkerboards = true;
 17: viewOptions.guidesLocked = true;
 18: ```
 19: 
 20: ---
 21: 
 22: ## Attributes
 23: 
 24: ### ViewOptions.channels
 25: 
 26: `app.activeViewer.views[0].options.channels`
 27: 
 28: #### Description
 29: 
 30: The state of the Channels menu.
 31: 
 32: #### Type
 33: 
 34: A `ChannelType` enumerated value; read/write. One of:
 35: 
 36: - `CHANNEL_ALPHA`
 37: - `CHANNEL_ALPHA_BOUNDARY`
 38: - `CHANNEL_ALPHA_OVERLAY`
 39: - `CHANNEL_BLUE`
 40: - `CHANNEL_BLUE_COLORIZE`
 41: - `CHANNEL_GREEN`
 42: - `CHANNEL_GREEN_COLORIZE`
 43: - `CHANNEL_RED`
 44: - `CHANNEL_RED_COLORIZE`
 45: - `CHANNEL_RGB`
 46: - `CHANNEL_RGB_STRAIGHT`
 47: 
 48: ---
 49: 
 50: ### ViewOptions.checkerboards
 51: 
 52: `app.activeViewer.views[0].options.checkerboards`
 53: 
 54: #### Description
 55: 
 56: When `true`, checkerboards (transparency grid) is enabled in the current view.
 57: 
 58: #### Type
 59: 
 60: Boolean; read/write.
 61: 
 62: ---
 63: 
 64: ### ViewOptions.exposure
 65: 
 66: `app.activeViewer.views[0].options.exposure`
 67: 
 68: #### Description
 69: 
 70: The exposure value for the current view.
 71: 
 72: #### Type
 73: 
 74: Floating-point value, in the range `[-40..40]`
 75: 
 76: ---
 77: 
 78: ### ViewOptions.fastPreview
 79: 
 80: `app.activeViewer.views[0].options.fastPreview`
 81: 
 82: !!! note
 83:     This functionality was added in After Effects 12.0 (CC)
 84: 
 85: #### Description
 86: 
 87: The state of the Fast Previews menu. This is a read/write attribute using an enumerated value:
 88: 
 89: !!! warning
 90:     If you try to get or set the attribute's value in the Layer or Footage panel, you'll get an error message.
 91: 
 92: !!! tip
 93:     The Draft preview mode is only available in ray-traced 3D compositions. If you try to use it in a Classic 3D composition, you'll get an error: "Cannot set Draft fast preview mode in a Classic 3D composition."
 94: 
 95: #### Type
 96: 
 97: A `FastPreviewType` enumerated value; read/write. One of:
 98: 
 99: - `FastPreviewType.FP_OFF`: Off (Final Quality)
100: - `FastPreviewType.FP_ADAPTIVE_RESOLUTION`: Adaptive Resolution
101: - `FastPreviewType.FP_DRAFT`: Draft
102: - `FastPreviewType.FP_FAST_DRAFT`: Fast Draft
103: - `FastPreviewType.FP_WIREFRAME`: Wireframe
104: 
105: #### Example
106: 
107: ```javascript
108: app.activeViewer.views[0].options.fastPreview === FastPreviewType.FP_ADAPTIVE_RESOLUTION;
109: app.activeViewer.views[0].options.fastPreview === FastPreviewType.FP_DRAFT;
110: app.activeViewer.views[0].options.fastPreview === FastPreviewType.FP_FAST_DRAFT;
111: app.activeViewer.views[0].options.fastPreview === FastPreviewType.FP_OFF;
112: app.activeViewer.views[0].options.fastPreview === FastPreviewType.FP_WIREFRAME;
113: ```
114: 
115: ---
116: 
117: ### ViewOptions.guidesLocked
118: 
119: `app.activeViewer.views[0].options.guidesLocked`
120: 
121: !!! note
122:     This functionality was added in After Effects 16.1 (CC 2019)
123: 
124: #### Description
125: 
126: When `true`, indicates guides are locked in the view.
127: 
128: #### Type
129: 
130: Boolean; read/write.
131: 
132: #### Example
133: 
134: ```javascript
135: app.activeViewer.views[0].options.guidesLocked;
136: ```
137: 
138: ---
139: 
140: ### ViewOptions.guidesSnap
141: 
142: `app.activeViewer.views[0].options.guidesSnap`
143: 
144: !!! note
145:     This functionality was added in After Effects 16.1 (CC 2019)
146: 
147: #### Description
148: 
149: When `true`, indicates layers snap to guides when dragged in the view.
150: 
151: #### Type
152: 
153: Boolean; read/write.
154: 
155: #### Example
156: 
157: ```javascript
158: app.activeViewer.views[0].options.guidesSnap;
159: ```
160: 
161: ---
162: 
163: ### ViewOptions.guidesVisibility
164: 
165: `app.activeViewer.views[0].options.guidesVisibility`
166: 
167: !!! note
168:     This functionality was added in After Effects 16.1 (CC 2019)
169: 
170: #### Description
171: 
172: When `true`, indicates guides are visible in the view.
173: 
174: #### Type
175: 
176: Boolean; read/write.
177: 
178: #### Example
179: 
180: ```javascript
181: app.activeViewer.views[0].options.guidesVisibility;
182: ```
183: 
184: ---
185: 
186: ### ViewOptions.rulers
187: 
188: `app.activeViewer.views[0].options.rulers`
189: 
190: !!! note
191:     This functionality was added in After Effects 16.1 (CC 2019)
192: 
193: #### Description
194: 
195: When `true`, indicates rulers are shown in the view.
196: 
197: #### Type
198: 
199: Boolean; read/write.
200: 
201: #### Example
202: 
203: ```javascript
204: app.activeViewer.views[0].options.rulers;
205: ```
206: 
207: ---
208: 
209: ### ViewOptions.zoom
210: 
211: `app.activeViewer.views[0].options.zoom`
212: 
213: #### Description
214: 
215: Sets the current zoom value for the view, as a normalized percentage between 1% (0.01) and 1600% (16).
216: 
217: #### Type
218: 
219: Floating-point value, in the range `[0.01..16]`
````

## File: docs/official/property/maskpropertygroup.md
````markdown
  1: # MaskPropertyGroup object
  2: 
  3: `app.project.item(index).layer(index).mask`
  4: 
  5: #### Description
  6: 
  7: The MaskPropertyGroup object encapsulates mask attributes in a layer.
  8: 
  9: !!! info
 10:     MaskPropertyGroup is a subclass of [PropertyGroup object](propertygroup.md). All methods and attributes of [PropertyBase object](propertybase.md) and PropertyGroup, in addition to those listed below, are available when working with MaskPropertyGroup.
 11: 
 12: ---
 13: 
 14: ## Attributes
 15: 
 16: ### MaskPropertyGroup.color
 17: 
 18: `app.project.item(index).layer(index).mask(index).color`
 19: 
 20: #### Description
 21: 
 22: The color used to draw the mask outline as it appears in the user interface (Composition panel, Layer panel, and Timeline panel).
 23: 
 24: #### Type
 25: 
 26: Array of three floating-point values, `[R, G, B]`, in the range `[0.0..1.0]`; read/write.
 27: 
 28: ---
 29: 
 30: ### MaskPropertyGroup.inverted
 31: 
 32: `app.project.item(index).layer(index).mask(index).inverted`
 33: 
 34: #### Description
 35: 
 36: When `true`, the mask is inverted; otherwise `false`.
 37: 
 38: #### Type
 39: 
 40: Boolean; read/write.
 41: 
 42: ---
 43: 
 44: ### MaskPropertyGroup.locked
 45: 
 46: `app.project.item(index).layer(index).mask(index).locked`
 47: 
 48: #### Description
 49: 
 50: When `true`, the mask is locked and cannot be edited in the user interface; otherwise `false`.
 51: 
 52: #### Type
 53: 
 54: Boolean; read/write.
 55: 
 56: ---
 57: 
 58: ### MaskPropertyGroup.maskFeatherFalloff
 59: 
 60: `app.project.item(index).layer(index).mask(index).maskFeatherFalloff`
 61: 
 62: #### Description
 63: 
 64: The feather falloff mode for the mask. Equivalent to the Layer > Mask > Feather Falloff setting.
 65: 
 66: #### Type
 67: 
 68: A `MaskFeatherFalloff` enumerated value; read/write. One of:
 69: 
 70: - `MaskFeatherFalloff.FFO_LINEAR`
 71: - `MaskFeatherFalloff.FFO_SMOOTH`
 72: 
 73: ---
 74: 
 75: ### MaskPropertyGroup.maskMode
 76: 
 77: `app.project.item(index).layer(index).mask(index).maskMode`
 78: 
 79: #### Description
 80: 
 81: The masking mode for this mask.
 82: 
 83: #### Type
 84: 
 85: A `MaskMode` enumerated value; read/write. One of:
 86: 
 87: - `MaskMode.NONE`
 88: - `MaskMode.ADD`
 89: - `MaskMode.SUBTRACT`
 90: - `MaskMode.INTERSECT`
 91: - `MaskMode.LIGHTEN`
 92: - `MaskMode.DARKEN`
 93: - `MaskMode.DIFFERENCE`
 94: 
 95: ---
 96: 
 97: ### MaskPropertyGroup.maskMotionBlur
 98: 
 99: `app.project.item(index).layer(index).mask(index).maskMotionBlur`
100: 
101: #### Description
102: 
103: How motion blur is applied to this mask.
104: 
105: #### Type
106: 
107: A `MakMotionBlur` enumerated value; read/write. One of:
108: 
109: - `MaskMotionBlur.SAME_AS_LAYER`
110: - `MaskMotionBlur.ON`
111: - `MaskMotionBlur.OFF`
112: 
113: ---
114: 
115: ### MaskPropertyGroup.rotoBezier
116: 
117: `app.project.item(index).layer(index).mask(index).rotoBezier`
118: 
119: #### Description
120: 
121: When `true`, the mask is a RotoBezier shape; otherwise `false`.
122: 
123: #### Type
124: 
125: Boolean; read/write.
````

## File: docs/official/property/property.md
````markdown
   1: # Property object
   2: 
   3: `app.project.item(index).layer(index).propertySpec`
   4: 
   5: #### Description
   6: 
   7: The Property object contains value, keyframe, and expression information about a particular AE property of a layer. An AE property is a value, often animatable, of an effect, mask, or transform within an individual layer. For examples of how to access properties, see [PropertyBase object](propertybase.md) and [PropertyGroup.property()](propertygroup.md#propertygroupproperty).
   8: 
   9: !!! info
  10:     Property is a subclass of [PropertyBase](propertybase.md). All methods and attributes of PropertyBase, in addition to those listed below, are available when working with Property.
  11: 
  12: !!! note
  13:     JavaScript objects commonly referred to as "properties" are called "attributes" in this guide, to avoid confusion with the After Effects definition of property.
  14: 
  15: #### Examples
  16: 
  17: Get and set the value of opacity:
  18: ```javascript
  19: var myProperty = myLayer.opacity;
  20: // opacity has propertyValueType of OneD, and is stored as a float
  21: myProperty.setValue(50); //set opacity to 50%
  22: // Variable my Opacity is a float value
  23: var myOpacity = myProperty.value;
  24: ```
  25: 
  26: Get and set the value of a position:
  27: 
  28: ```javascript
  29: var myProperty = myLayer.position;
  30: // position has propertyValueType of ThreeD_SPATIAL, and is stored as an array of 3 floats
  31: myProperty.setValue([10.0, 30.0, 0.0]);
  32: // Variable my Position is an array of 3 floats
  33: var myPosition = myProperty.value;
  34: ```
  35: 
  36: Change the value of a mask shape to be open instead of closed:
  37: 
  38: ```javascript
  39: var myMask = mylayer.mask(1);
  40: var myProperty = myMask.maskPath;
  41: myShape = myProperty.value;
  42: myShape.closed = false;
  43: myProperty.setValue(myShape);
  44: ```
  45: 
  46: Get the value of a color at a particular time. A color is stored as an array of four floats, `[r, g, b, opacity]`. This sets the value of the red component of a light's color at time 4 to be half of that at time 2:
  47: 
  48: ```javascript
  49: var myProperty = myLight.color;
  50: var colorValue = myProperty.valueAtTime(2, true);
  51: colorValue[0] = 0.5 * colorValue[0];
  52: myProperty.setValueAtTime(4, colorValue);
  53: ```
  54: 
  55: Check that a scale calculated by an expression at time 3.5 is the expected value of [10,50]:
  56: 
  57: ```javascript
  58: var myProperty = myLayer.scale;
  59: // false value of preExpression means evaluate the expression
  60: var scaleValue = myProperty.valueAtTime(3.5, false);
  61: 
  62: if (scaleValue[0] === 10 && scaleValue[1] === 50) {
  63:     alert("hurray");
  64: } else {
  65:     alert("oops");
  66: }
  67: ```
  68: 
  69: Keyframe a rotation from 0 to 90 and back again. The animation is 10 seconds, and the middle keyframe is at the 5 second mark. Rotation properties are stored as a OneD value:
  70: 
  71: ```javascript
  72: var myProperty = myLayer.rotation;
  73: myProperty.setValueAtTime(0, 0);
  74: myProperty.setValueAtTime(5, 90);
  75: myProperty.setValueAtTime(10, 0);
  76: ```
  77: 
  78: Change the key frame values for the first three keyframes of some sourcetext:
  79: 
  80: ```javascript
  81: var myProperty = myTextLayer.sourceText;
  82: if (myProperty.numKeys < 3) {
  83:     alert("error, I thought there were 3 keyframes");
  84: } else {
  85:     myProperty.setValueAtKey(1, newTextDocument("keynumber1"));
  86:     myProperty.setValueAtKey(2, newTextDocument("keynumber2"));
  87:     myProperty.setValueAtKey(3, newTextDocument("keynumber3"));
  88: }
  89: ```
  90: 
  91: Set values using the convenience syntax for position, scale, color, or source text:
  92: 
  93: ```javascript
  94: // These two are equivalent. The second fills in a default of 0.
  95: myLayer.position.setValue([20, 30, 0]);
  96: myLayer.position.setValue([20, 30]);
  97: // These two are equivalent. The second fills in a defaultof 100.
  98: myLayer.scale.setValue([50, 50, 100]);
  99: myLayer.scale.setValue([50, 50]);
 100: // These two are equivalent. The second fills in a defaultof 1.0
 101: myLight.color.setValue([0.8, 0.3, 0.1, 1.0]);
 102: myLight.color.setValue([0.8, 0.3, 0.1]);
 103: // These two are equivalent. The second creates a TextDocument
 104: myTextLayer.sourceText.setValue(newTextDocument("foo"));
 105: myTextLayer.sourceText.setValue("foo");
 106: ```
 107: 
 108: ---
 109: 
 110: ## Attributes
 111: 
 112: ### Property.alternateSource
 113: 
 114: `app.project.item(index).layer(index).propertySpec.alternateSource`
 115: 
 116: !!! note
 117:     This functionality was added in After Effects 18.0 (2021)
 118: 
 119: #### Description
 120: 
 121: The value is `null` when:
 122: 
 123: - The alternate source is not set for the associated layer.
 124: - The property cannot be used to set an alternate source.
 125: 
 126: Use [Property.canSetAlternateSource](#propertycansetalternatesource) to determine if the property is a Media Replacement Essential Property.
 127: 
 128: All Media Replacement Layers have an alternate source item that can be set.
 129: 
 130: A layer is "marked" for media replacement when the layer is added to the Essential Graphics Panel (see [AVLayer.addToMotionGraphicsTemplate()](../layer/avlayer.md#avlayeraddtomotiongraphicstemplate) or [AVLayer.addToMotionGraphicsTemplateAs()](../layer/avlayer.md#avlayeraddtomotiongraphicstemplateas)).
 131: 
 132: - If present, the render workflow will pick up the alternate source while rendering the layer.
 133: - If the alternate source for the layer is not set, then the source layer of the Media Replacement control is used for rendering (this is the normal workflow).
 134: 
 135: Use [Property.setAlternateSource()](#propertysetalternatesource) to change the value.
 136: 
 137: #### Type
 138: 
 139: AVItem object; read-only.
 140: 
 141: ---
 142: 
 143: ### Property.canSetAlternateSource
 144: 
 145: `app.project.item(index).layer(index).propertySpec.canSetAlternateSource`
 146: 
 147: !!! note
 148:     This functionality was added in After Effects 18.0 (2021)
 149: 
 150: #### Description
 151: 
 152: Test whether the property is an Essential Property that supports Media Replacement.
 153: 
 154: Returns `true` if the property allows Media Replacement, otherwise `false`.
 155: 
 156: #### Type
 157: 
 158: Boolean; read-only.
 159: 
 160: ---
 161: 
 162: ### Property.canSetExpression
 163: 
 164: `app.project.item(index).layer(index).propertySpec.canSetExpression`
 165: 
 166: #### Description
 167: 
 168: When `true`, the named property is of a type whose expression can be set by a script. See also [Property expression](#propertyexpression) attribute.
 169: 
 170: #### Type
 171: 
 172: Boolean; read-only.
 173: 
 174: ---
 175: 
 176: ### Property.canVaryOverTime
 177: 
 178: `app.project.item(index).layer(index).propertySpec.canVaryOverTime`
 179: 
 180: #### Description
 181: 
 182: When `true`, the named property can vary over time—that is, keyframe values or expressions can be written to this property.
 183: 
 184: #### Type
 185: 
 186: Boolean; read-only.
 187: 
 188: ---
 189: 
 190: ### Property.dimensionsSeparated
 191: 
 192: `app.project.item(index).layer(index).propertySpec.dimensionsSeparated`
 193: 
 194: #### Description
 195: 
 196: When `true`, the property's dimensions are represented as separate properties. For example, if the layer's position is represented as X Position and Y Position properties in the Timeline panel, the Position property has this attribute set to `true`.
 197: 
 198: !!! tip
 199:     This attribute applies only when the [isSeparationLeader](#propertyisseparationleader) attribute is `true`.
 200: 
 201: #### Type
 202: 
 203: Boolean; read/write.
 204: 
 205: ---
 206: 
 207: ### Property.essentialPropertySource
 208: 
 209: `app.project.item(index).layer(index).essentialProperty.property(index).essentialPropertySource`
 210: 
 211: !!! note
 212:     This functionality was added in After Effects 22.0 (2022)
 213: 
 214: #### Description
 215: 
 216: Instance property on an Essential Property object which returns the original source Property which was used to create the Essential Property.
 217: 
 218: #### Type
 219: 
 220: Can be either:
 221: 
 222: - A read/write [Property object](#property-object), in the case that the source object used to create the Essential Property was a Property
 223: - A read/write [AVLayer object](../layer/avlayer.md), in the case that the source object used to create the Essential Property was a Media Replacement Footage item
 224: - `null` if called on a non-Essential Property
 225: 
 226: #### Example
 227: 
 228: ```javascript
 229: var firstComp = app.project.item(1);
 230: var opacityProp = firstComp.layer(1).property("Transform").property("Opacity");
 231: 
 232: opacityProp.addToMotionGraphicsTemplate(firstComp);
 233: 
 234: var secondComp = app.project.item(2);
 235: secondComp.layers.add(firstComp);
 236: 
 237: var essentialOpacity = secondComp.layer(1).essentialProperty.property(1);
 238: if (essentialOpacity.essentialPropertySource == opacityProp) {
 239:     alert("You can get the source Property from an Essential Property!");
 240: }
 241: ```
 242: 
 243: ---
 244: 
 245: ### Property.expression
 246: 
 247: `app.project.item(index).layer(index).propertySpec.expression`
 248: 
 249: #### Description
 250: 
 251: The expression for the named property. Writeable only when [canSetExpression](#propertycansetexpression) for the named property is `true`. When you specify a value for this attribute, the string is evaluated.
 252: 
 253: - If the string contains a valid expression, [expressionEnabled](#propertyexpressionenabled) becomes true.
 254: - If the string does not contain a valid expression, an error is generated, and [expressionEnabled](#propertyexpressionenabled) becomes `false`.
 255: - If you set the attribute to the empty string, [expressionEnabled](#propertyexpressionenabled) becomes `false`, but no error is generated.
 256: 
 257: #### Type
 258: 
 259: String; read/write if [canSetExpression](#propertycansetexpression) for the named property is `true`.
 260: 
 261: ---
 262: 
 263: ### Property.expressionEnabled
 264: 
 265: `app.project.item(index).layer(index).propertySpec.expressionEnabled`
 266: 
 267: #### Description
 268: 
 269: When `true`, the named property uses its associated expression to generate a value. When `false`, the keyframe information or static value of the property is used. This attribute can be set to `true` only if [canSetExpression](#propertycansetexpression) for the named property is `true` and [expression](#propertyexpression) contains a valid expression string.
 270: 
 271: #### Type
 272: 
 273: Boolean; read/write.
 274: 
 275: ---
 276: 
 277: ### Property.expressionError
 278: 
 279: `app.project.item(index).layer(index).propertySpec.expressionError`
 280: 
 281: #### Description
 282: 
 283: Contains the error, if any, generated by evaluation of the string most recently set in [expression](#propertyexpression). If no expression string has been specified, or if the last expression string evaluated without error, contains the empty string `("")`.
 284: 
 285: #### Type
 286: 
 287: String; read-only.
 288: 
 289: ---
 290: 
 291: ### Property.hasMax
 292: 
 293: `app.project.item(index).layer(index).propertySpec.hasMax`
 294: 
 295: #### Description
 296: 
 297: When `true`, there is a maximum permitted value for the named property; otherwise `false`.
 298: 
 299: #### Type
 300: 
 301: Boolean; read-only.
 302: 
 303: ---
 304: 
 305: ### Property.hasMin
 306: 
 307: `app.project.item(index).layer(index).propertySpec.hasMin`
 308: 
 309: #### Description
 310: 
 311: When `true`, there is a minimum permitted value for the named property; otherwise `false`.
 312: 
 313: #### Type
 314: 
 315: Boolean; read-only.
 316: 
 317: ---
 318: 
 319: ### Property.isDropdownEffect
 320: 
 321: `app.project.item(index).layer(index).propertySpec.isDropdownEffect`
 322: 
 323: !!! note
 324:     This functionality was added in After Effects 17.0.1 (2020)
 325: 
 326: #### Description
 327: 
 328: When `true`, the property is the Menu property of a Dropdown Menu Control effect and can have its items updated with [setPropertyParameters](#propertysetpropertyparameters).
 329: 
 330: #### Examples
 331: 
 332: ```javascript
 333: appliedEffect.property("Menu").isDropdownEffect;    // true
 334: appliedEffect.property("Color").isDropdownEffect;   // false
 335: appliedEffect.property("Feather").isDropdownEffect; // false
 336: ```
 337: 
 338: #### Type
 339: 
 340: Boolean; read-only.
 341: 
 342: ---
 343: 
 344: ### Property.isSeparationFollower
 345: 
 346: `app.project.item(index).layer(index).propertySpec.isSeparationFollower`
 347: 
 348: #### Description
 349: 
 350: When `true`, the property represents one of the separated dimensions for a multidimensional property. For example, the X Position property has this attribute set to `true`.
 351: 
 352: !!! tip
 353:     The original, consolidated, multidimensional property is the "separation leader" and the new, separated, single-dimensional properties are its "separation followers".
 354: 
 355: #### Type
 356: 
 357: Boolean; read-only.
 358: 
 359: ---
 360: 
 361: ### Property.isSeparationLeader
 362: 
 363: `app.project.item(index).layer(index).propertySpec.isSeparationLeader`
 364: 
 365: #### Description
 366: 
 367: When `true`, the property is multidimensional and can be separated. For example, the Position property has this attribute set to `true`.
 368: 
 369: !!! tip
 370:     The original, consolidated, multidimensional property is the "separation leader" and the new, separated, single-dimensional properties are its "separation followers".
 371: 
 372: #### Type
 373: 
 374: Boolean; read-only.
 375: 
 376: ---
 377: 
 378: ### Property.isSpatial
 379: 
 380: `app.project.item(index).layer(index).propertySpec.isSpatial`
 381: 
 382: #### Description
 383: 
 384: When `true`, the named property defines a spatial value. Examples are position and effect point controls.
 385: 
 386: #### Type
 387: 
 388: Boolean; read-only.
 389: 
 390: ---
 391: 
 392: ### Property.isTimeVarying
 393: 
 394: `app.project.item(index).layer(index).propertySpec.isTimeVarying`
 395: 
 396: #### Description
 397: 
 398: When `true`, the named property is time varying — that is, it has keyframes or an enabled expression. When this attribute is `true`, the attribute `canVaryOverTime`
 399: must also be true.
 400: 
 401: #### Type
 402: 
 403: Boolean; read-only.
 404: 
 405: ---
 406: 
 407: ### Property.maxValue
 408: 
 409: `app.project.item(index).layer(index).propertySpec.maxValue`
 410: 
 411: #### Description
 412: 
 413: The maximum permitted value of the named property. If the `hasMax` attribute is `false`, an exception occurs, and an error is generated.
 414: 
 415: #### Type
 416: 
 417: Floating-point value; read-only.
 418: 
 419: ---
 420: 
 421: ### Property.minValue
 422: 
 423: `app.project.item(index).layer(index).propertySpec.minValue`
 424: 
 425: #### Description
 426: 
 427: The minimum permitted value of the named property. If the `hasMin` attribute is `false`, an exception occurs, and an error is generated.
 428: 
 429: #### Type
 430: 
 431: Floating-point value; read-only.
 432: 
 433: ---
 434: 
 435: ### Property.numKeys
 436: 
 437: `app.project.item(index).layer(index).propertySpec.numKeys`
 438: 
 439: #### Description
 440: 
 441: The number of keyframes in the named property. If the value is 0, the property is not being keyframed.
 442: 
 443: #### Type
 444: 
 445: Integer; read-only.
 446: 
 447: ---
 448: 
 449: ### Property.propertyIndex
 450: 
 451: `app.project.item(index).layer(index).propertySpec.propertyIndex`
 452: 
 453: #### Description
 454: 
 455: The position index of the named property. The first property is at index position 1.
 456: 
 457: #### Type
 458: 
 459: Integer; read-only.
 460: 
 461: ---
 462: 
 463: ### Property.propertyParameters
 464: 
 465: `app.project.item(index).layer(index).propertySpec.propertyParameters`
 466: 
 467: !!! note
 468:     This functionality was added in After Effects 26.0
 469: 
 470: #### Description
 471: 
 472: An array of all item strings in a dropdown menu property. This attribute applies to dropdown menu properties of effects and layers, including custom strings in the Menu property of the Dropdown Menu Control.
 473: 
 474: This property corresponds to [Property.setPropertyParameters()](#propertysetpropertyparameters), acting as the getter for the strings in a dropdown menu.
 475: 
 476: #### Examples
 477: 
 478: ```javascript
 479: // Get all options from a Dropdown Menu Control
 480: var comp = app.project.activeItem;
 481: if (comp && comp.selectedLayers.length > 0) {
 482:     var lyr = comp.selectedLayers[0];
 483:     var fx = lyr.property("ADBE Effect Parade").property("Dropdown Menu Control");
 484:     var menuProp = fx.property("Menu");
 485:     var options = menuProp.propertyParameters; // Array of strings
 486: }
 487: ```
 488: 
 489: #### Type
 490: 
 491: Array of strings; read-only.
 492: 
 493: ---
 494: 
 495: ### Property.propertyValueType
 496: 
 497: `app.project.item(index).layer(index).propertySpec.propertyValueType`
 498: 
 499: #### Description
 500: 
 501: The type of value stored in the named property. The `PropertyValueType` enumeration has one value for each type of data that can be stored in or retrieved from a property. Each type of data is stored and retrieved in a different kind of structure. All property objects store data according to one of these categories. For example, a 3D spatial property (such as a layer's position) is stored as an array of three floating-point values. When setting a value for position, pass in such an array, as follows: `mylayer.property("position").setValue([10, 20, 0]);`
 502: 
 503: In contrast, a shape property (such as a layer's mask shape) is stored as a Shape object. When setting a value for a shape, pass a Shape object, as follows:
 504: 
 505: ```javascript
 506: var myShape = new Shape();
 507: myShape.vertices = [[0,0], [0,100], [100,100], [100,0]];
 508: var myMask = mylayer.property("ADBE Mask Parade").property(1);
 509: myMask.property("ADBE Mask Shape").setValue(myShape);
 510: ```
 511: 
 512: #### Type
 513: 
 514: A `PropertyValueType` enumerated value; read/write. One of:
 515: 
 516: - `PropertyValueType.NO_VALUE`: Stores no data.
 517: - `PropertyValueType.ThreeD_SPATIAL`: Array of three floating-point positional values. For example, an Anchor Point value might be [10.0, 20.2, 0.0]
 518: - `PropertyValueType.ThreeD`: Array of three floating-point quantitative values. For example, a Scale value might be [100.0, 20.2, 0.0]
 519: - `PropertyValueType.TwoD_SPATIAL`: Array of 2 floating-point positional values. For example, an Anchor Point value might be [5.1, 10.0]
 520: - `PropertyValueType.TwoD`: Array of 2 floating-point quantitative values. For example, a Scale value might be [5.1, 100.0]
 521: - `PropertyValueType.OneD`: A floating-point value.
 522: - `PropertyValueType.COLOR`:Array of 4 floating-point values in the range `[0.0..1.0]`. For example, [0.8, 0.3, 0.1, 1.0]
 523: - `PropertyValueType.CUSTOM_VALUE` : Custom property value, such as the Histogram property for the Levels effect.
 524: - `PropertyValueType.MARKER`: [MarkerValue object](../other/markervalue.md)
 525: - `PropertyValueType.LAYER_INDEX`: Integer; a value of 0 means no layer.
 526: - `PropertyValueType.MASK_INDEX`: Integer; a value of 0 means no mask.
 527: - `PropertyValueType.SHAPE`: [Shape object](../other/shape.md)
 528: - `PropertyValueType.TEXT_DOCUMENT`: [TextDocument object](../text/textdocument.md)
 529: 
 530: ---
 531: 
 532: ### Property.selectedKeys
 533: 
 534: `app.project.item(index).layer(index).propertySpec.selectedKeys`
 535: 
 536: #### Description
 537: 
 538: The indices of all the selected keyframes in the named property. If no keyframes are selected, or if the property has no keyframes, returns an empty array.
 539: 
 540: #### Type
 541: 
 542: Array of integers; read-only.
 543: 
 544: ---
 545: 
 546: ### Property.separationDimension
 547: 
 548: `app.project.item(index).layer(index).propertySpec.separationDimension`
 549: 
 550: #### Description
 551: 
 552: For a separated follower, the dimension number it represents in the multidimensional leader. The first dimension starts at 0. For example, the Y Position property has a `separationDimension` value of 1; X Position has a value of 0.
 553: 
 554: #### Type
 555: 
 556: Integer; read-only.
 557: 
 558: ---
 559: 
 560: ### Property.separationLeader
 561: 
 562: `app.project.item(index).layer(index).propertySpec.separationLeader`
 563: 
 564: #### Description
 565: 
 566: The original multidimensional property for this separated follower. For example, if the current property is Y Position, this attribute's value points to the Position property.
 567: 
 568: !!! tip
 569:     The original, consolidated, multidimensional property is the "separation leader" and the new, separated, single-dimensional properties are its "separation followers".
 570: 
 571: #### Type
 572: 
 573: Property object; read-only.
 574: 
 575: ---
 576: 
 577: ### Property.unitsText
 578: 
 579: `app.project.item(index).layer(index).propertySpec.unitsText`
 580: 
 581: #### Description
 582: 
 583: The text description of the units in which the value is expressed.
 584: 
 585: #### Type
 586: 
 587: String; read-only.
 588: 
 589: ---
 590: 
 591: ### Property.value
 592: 
 593: `app.project.item(index).layer(index).propertySpec.value`
 594: 
 595: #### Description
 596: 
 597: The value of the named property at the current time.
 598: 
 599: - If `expressionEnabled` is `true`, returns the evaluated expression value.
 600: - If there are keyframes, returns the keyframed value at the current time.
 601: - Otherwise, returns the static value.
 602: 
 603: The type of value returned depends on the property value type. See [examples for Property object](#examples).
 604: 
 605: #### Type
 606: 
 607: A value appropriate for the type of the property (see [Property.propertyValueType](#propertypropertyvaluetype)); read-only.
 608: 
 609: ---
 610: 
 611: ### Property.valueText
 612: 
 613: `app.project.item(index).layer(index).propertySpec.valueText`
 614: 
 615: !!! note
 616:     This functionality was added in After Effects 26.0
 617: 
 618: #### Description
 619: 
 620: The text string of the currently-selected item in a dropdown menu property. This attribute applies to dropdown menu properties of effects and layers, including custom strings in the Menu property of Dropdown Menu Controls.
 621: 
 622: #### Examples
 623: 
 624: ```javascript
 625: // Get the currently-selected text string from a Dropdown Menu Control
 626: var comp = app.project.activeItem;
 627: if (comp && comp.selectedLayers.length > 0) {
 628:     var lyr = comp.selectedLayers[0];
 629:     var fx = lyr.property("ADBE Effect Parade").property("Dropdown Menu Control");
 630:     var menuProp = fx.property("Menu");
 631:     var selectedText = menuProp.valueText; // e.g., "Sunday"
 632: }
 633: ```
 634: 
 635: #### Type
 636: 
 637: String; read-only.
 638: 
 639: ---
 640: 
 641: ## Methods
 642: 
 643: ### Property.addKey()
 644: 
 645: `app.project.item(index).layer(index).propertySpec.addKey(time)`
 646: 
 647: #### Description
 648: 
 649: Adds a new keyframe or marker to the named property at the specified time and returns the index of the new keyframe.
 650: 
 651: #### Parameters
 652: 
 653: | Parameter |         Type         |                                        Description                                         |
 654: | --------- | -------------------- | ------------------------------------------------------------------------------------------ |
 655: | `time`    | Floating-point value | The time, in seconds, at which to add the keyframe. The beginning of the composition is 0. |
 656: 
 657: #### Returns
 658: 
 659: Integer; the index of the new keyframe or marker.
 660: 
 661: ---
 662: 
 663: ### Property.addToMotionGraphicsTemplate()
 664: 
 665: `app.project.item(index).layer(index).propertySpec.addToMotionGraphicsTemplate(comp)`
 666: 
 667: !!! note
 668:     This functionality was added in After Effects 15.0 (CC 2018)
 669: 
 670: #### Description
 671: 
 672: Adds the property to the Essential Graphics panel for the specified composition.
 673: 
 674: Returns `true` if the property is successfully added, otherwise `false`.
 675: 
 676: If the property is not added, it is either because it is not one of the supported property types or the property has already been added to the EGP for that composition. After Effects will present a warning dialog if the property cannot be added to the EGP.
 677: 
 678: Use the [Property.canAddToMotionGraphicsTemplate()](#propertycanaddtomotiongraphicstemplate) method to test whether the property can be added to a Motion Graphics template.
 679: 
 680: #### Parameters
 681: 
 682: | Parameter |              Type               |                      Description                      |
 683: | --------- | ------------------------------- | ----------------------------------------------------- |
 684: | `comp`    | [CompItem](../item/compitem.md) | The composition that you wish to add the property to. |
 685: 
 686: #### Returns
 687: 
 688: Boolean.
 689: 
 690: ---
 691: 
 692: ### Property.addToMotionGraphicsTemplateAs()
 693: 
 694: `app.project.item(index).layer(index).propertySpec.addToMotionGraphicsTemplateAs(comp, name)`
 695: 
 696: !!! note
 697:     This functionality was added in After Effects 16.1 (CC 2019)
 698: 
 699: #### Description
 700: 
 701: Adds the property to the Essential Graphics panel for the specified composition, but with an additional option to give the EGP property a custom name.
 702: 
 703: Returns `true` if the property is successfully added, otherwise `false`.
 704: 
 705: If the property is not added, it is either because it is not one of the supported property types or the property has already been added to the EGP for that composition. After Effects will present a warning dialog if the property cannot be added to the EGP.
 706: 
 707: Use the [Property.canAddToMotionGraphicsTemplate()](#propertycanaddtomotiongraphicstemplate) method to test whether the property can be added to a Motion Graphics template.
 708: 
 709: #### Parameters
 710: 
 711: | Parameter |              Type               |                      Description                      |
 712: | --------- | ------------------------------- | ----------------------------------------------------- |
 713: | `comp`    | [CompItem](../item/compitem.md) | The composition that you wish to add the property to. |
 714: | `name`    | String                          | The new name.                                         |
 715: 
 716: #### Returns
 717: 
 718: Boolean.
 719: 
 720: ---
 721: 
 722: ### Property.canAddToMotionGraphicsTemplate()
 723: 
 724: `app.project.item(index).layer(index).propertySpec.canAddToMotionGraphicsTemplate(comp)`
 725: 
 726: !!! note
 727:     This functionality was added in After Effects 15.0 (CC 2018)
 728: 
 729: #### Description
 730: 
 731: Test whether or not the property can be added to the Essential Graphics panel for the specified composition.
 732: 
 733: Returns `true` if the property can be added, otherwise `false`.
 734: 
 735: If the property can not be added, it is either because it is not one of the supported property types or the property has already been added to the EGP for that composition. After Effects will present a warning dialog if the property cannot be added to the EGP.
 736: 
 737: Supported property types are:
 738: 
 739: - Checkbox
 740: - Color
 741: - Numerical Slider (i.e., a single-value numerical property, such as Transform > Opacity or the Slider Control expression control effect)
 742: - Source Text
 743: 
 744: #### Parameters
 745: 
 746: | Parameter |              Type               |                      Description                      |
 747: | --------- | ------------------------------- | ----------------------------------------------------- |
 748: | `comp`    | [CompItem](../item/compitem.md) | The composition that you wish to add the property to. |
 749: 
 750: #### Returns
 751: 
 752: Boolean.
 753: 
 754: ---
 755: 
 756: ### Property.getSeparationFollower()
 757: 
 758: `app.project.item(index).layer(index).propertySpec.getSeparationFollower(dim)`
 759: 
 760: #### Description
 761: 
 762: For a separated, multidimensional property, retrieves a specific follower property. For example, you can use this method on the Position property to access the separated X Position and Y Position properties
 763: 
 764: !!! tip
 765:     This attribute applies only when the [isSeparationLeader](#propertyisseparationleader) attribute is `true`.
 766: 
 767: #### Parameters
 768: 
 769: | Parameter |  Type   |              Description              |
 770: | --------- | ------- | ------------------------------------- |
 771: | `dim`     | Integer | The dimension number (starting at 0). |
 772: 
 773: #### Returns
 774: 
 775: Property object, or an error if the property is not multidimensional or does not have the specified dimension.
 776: 
 777: ---
 778: 
 779: ### Property.isInterpolationTypeValid()
 780: 
 781: `app.project.item(index).layer(index).propertySpec.isInterpolationTypeValid(type)`
 782: 
 783: #### Description
 784: 
 785: Returns `true` if the named property can be interpolated using the specified keyframe interpolation type.
 786: 
 787: #### Parameters
 788: 
 789: #### Type
 790: 
 791: A `KeyframeInterpolationType` enumerated value; one of:
 792: 
 793: - `KeyframeInterpolationType.LINEAR`
 794: - `KeyframeInterpolationType.BEZIER`
 795: - `KeyframeInterpolationType.HOLD`
 796: 
 797: #### Returns
 798: 
 799: Boolean.
 800: 
 801: ---
 802: 
 803: ### Property.keyInInterpolationType()
 804: 
 805: `app.project.item(index).layer(index).propertySpec.keyInInterpolationType(keyIndex)`
 806: 
 807: #### Description
 808: 
 809: Returns the 'in' interpolation type for the specified keyframe.
 810: 
 811: #### Parameters
 812: 
 813: | Parameter  |                 Type                 |                                                       Description                                                        |
 814: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
 815: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
 816: 
 817: #### Returns
 818: 
 819: A `KeyframeInterpolationType` enumerated value; one of:
 820: 
 821: - `KeyframeInterpolationType.LINEAR`
 822: - `KeyframeInterpolationType.BEZIER`
 823: - `KeyframeInterpolationType.HOLD`
 824: 
 825: ---
 826: 
 827: ### Property.keyInSpatialTangent()
 828: 
 829: `app.project.item(index).layer(index).propertySpec.keyInSpatialTangent(keyIndex)`
 830: 
 831: #### Description
 832: 
 833: Returns the incoming spatial tangent for the specified keyframe, if the named property is spatial (that is, the value type is `TwoD_SPATIALorThreeD_SPATIAL`).
 834: 
 835: #### Parameters
 836: 
 837: | Parameter  |                 Type                 |                                                       Description                                                        |
 838: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
 839: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
 840: 
 841: #### Returns
 842: 
 843: Array of floating-point values:
 844: 
 845: - If the property value type is `PropertyValueType.TwoD_SPATIAL`, the array contains 2 floating-point values.
 846: - If the property value type is `PropertyValueType.ThreeD_SPATIAL`, the array contains 3 floating-point values.
 847: - If the property value type is neither of these types, an exception is generated.
 848: 
 849: ---
 850: 
 851: ### Property.keyInTemporalEase()
 852: 
 853: `app.project.item(index).layer(index).propertySpec.keyInTemporalEase(keyIndex)`
 854: 
 855: #### Description
 856: 
 857: Returns the incoming temporal ease for the specified keyframe.
 858: 
 859: #### Parameters
 860: 
 861: | Parameter  |                 Type                 |                                                       Description                                                        |
 862: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
 863: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
 864: 
 865: #### Returns
 866: 
 867: Array of [KeyframeEase objects](../other/keyframeease.md):
 868: 
 869: - If the property value type is `PropertyValueType.TwoD`, the array contains 2 objects.
 870: - If the property value type is `PropertyValueType.ThreeD`, the array contains 3 objects.
 871: - For any other value type, the array contains 1 object.
 872: 
 873: ---
 874: 
 875: ### Property.keyLabel()
 876: 
 877: `app.project.item(index).layer(index).propertySpec.keyLabel(keyIndex)`
 878: 
 879: !!! note
 880:     This functionality was added in After Effects 22.6.
 881: 
 882: #### Description
 883: 
 884: The label color for the keyframe. Colors are represented by their number (0 for None, or 1 to 16 for one of the preset colors in the Labels preferences).
 885: 
 886: Read only. Keyframe color labels can be set by [setLabelAtKey](#propertysetlabelatkey).
 887: 
 888: #### Parameters
 889: 
 890: | Parameter  |                 Type                 |                                                       Description                                                        |
 891: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
 892: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
 893: 
 894: #### Returns
 895: 
 896: Integer (0 to 16); read only.
 897: 
 898: ---
 899: 
 900: ### Property.keyOutInterpolationType()
 901: 
 902: `app.project.item(index).layer(index).propertySpec.keyOutInterpolationType(keyIndex)`
 903: 
 904: #### Description
 905: 
 906: Returns the outgoing interpolation type for the specified keyframe.
 907: 
 908: #### Parameters
 909: 
 910: | Parameter  |                 Type                 |                                                       Description                                                        |
 911: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
 912: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
 913: 
 914: #### Returns
 915: 
 916: A `KeyframeInterpolationType` enumerated value; one of:
 917: 
 918: - `KeyframeInterpolationType.LINEAR`
 919: - `KeyframeInterpolationType.BEZIER`
 920: - `KeyframeInterpolationType.HOLD`
 921: 
 922: ---
 923: 
 924: ### Property.keyOutSpatialTangent()
 925: 
 926: `app.project.item(index).layer(index).propertySpec.keyOutSpatialTangent(keyIndex)`
 927: 
 928: #### Description
 929: 
 930: Returns the outgoing spatial tangent for the specified keyframe.
 931: 
 932: #### Parameters
 933: 
 934: | Parameter  |                 Type                 |                                                       Description                                                        |
 935: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
 936: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
 937: 
 938: #### Returns
 939: 
 940: Array of floating-point values:
 941: 
 942: - If the property value type is `PropertyValueType.TwoD_SPATIAL`, the array contains 2 floating-point values.
 943: - If the property value type is `PropertyValueType.ThreeD_SPATIAL`, the array contains 3 floating-point values.
 944: - If the property value type is neither of these types, an exception is generated.
 945: 
 946: ---
 947: 
 948: ### Property.keyOutTemporalEase()
 949: 
 950: `app.project.item(index).layer(index).propertySpec.keyOutTemporalEase(keyIndex)`
 951: 
 952: #### Description
 953: 
 954: Returns the outgoing temporal ease for the specified keyframe.
 955: 
 956: #### Parameters
 957: 
 958: | Parameter  |                 Type                 |                                                       Description                                                        |
 959: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
 960: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
 961: 
 962: #### Returns
 963: 
 964: Array of KeyframeEase objects:
 965: 
 966: - If the property value type is `PropertyValueType.TwoD`, the array contains 2 objects.
 967: - If the property value type is `PropertyValueType.ThreeD`, the array contains 3 objects.
 968: - For any other value type, the array contains 1 object.
 969: 
 970: ---
 971: 
 972: ### Property.keyRoving()
 973: 
 974: `app.project.item(index).layer(index).propertySpec.keyRoving(keyIndex)`
 975: 
 976: #### Description
 977: 
 978: Returns `true` if the specified keyframe is roving. The first and last keyframe in a property cannot rove; if you try to set roving for one of these, the operation is ignored, and keyRoving() continues to return `false`. If the property value type is neither `TwoD_SPATIAL` nor `ThreeD_SPATIAL`, an exception is generated.
 979: 
 980: #### Parameters
 981: 
 982: | Parameter  |                 Type                 |                                                       Description                                                        |
 983: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
 984: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
 985: 
 986: #### Returns
 987: 
 988: Boolean.
 989: 
 990: ---
 991: 
 992: ### Property.keySelected()
 993: 
 994: `app.project.item(index).layer(index).propertySpec.keySelected(keyIndex)`
 995: 
 996: #### Description
 997: 
 998: Returns `true` if the specified keyframe is selected.
 999: 
1000: #### Parameters
1001: 
1002: | Parameter  |                 Type                 |                                                       Description                                                        |
1003: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
1004: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
1005: 
1006: #### Returns
1007: 
1008: Boolean.
1009: 
1010: ---
1011: 
1012: ### Property.keySpatialAutoBezier()
1013: 
1014: `app.project.item(index).layer(index).propertySpec.keySpatialAutoBezier(keyIndex)`
1015: 
1016: #### Description
1017: 
1018: Returns `true` if the specified keyframe has spatial auto-Bezier interpolation. (This type of interpolation affects this keyframe only if `keySpatialContinuous(keyIndex)` is also true.) If the property value type is neither `TwoD_SPATIAL` nor `ThreeD_SPATIAL`, an exception is generated.
1019: 
1020: #### Parameters
1021: 
1022: | Parameter  |                 Type                 |                                                       Description                                                        |
1023: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
1024: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
1025: 
1026: #### Returns
1027: 
1028: Boolean.
1029: 
1030: ---
1031: 
1032: ### Property.keySpatialContinuous()
1033: 
1034: `app.project.item(index).layer(index).propertySpec.keySpatialContinuous(keyIndex)`
1035: 
1036: #### Description
1037: 
1038: Returns `true` if the specified keyframe has spatial continuity. If the property value type is neither `TwoD_SPATIAL` nor `ThreeD_SPATIAL`, an exception is generated.
1039: 
1040: #### Parameters
1041: 
1042: | Parameter  |                 Type                 |                                                       Description                                                        |
1043: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
1044: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
1045: 
1046: #### Returns
1047: 
1048: Boolean.
1049: 
1050: ---
1051: 
1052: ### Property.keyTemporalAutoBezier()
1053: 
1054: `app.project.item(index).layer(index).propertySpec.keyTemporalAutoBezier(keyIndex)`
1055: 
1056: #### Description
1057: 
1058: Returns `true` if the specified keyframe has temporal auto-Bezier interpolation. Temporal auto-Bezier interpolation affects this keyframe only if the keyframe interpolation type is `KeyframeInterpolationType.BEZIER` for both `keyInInterpolationType(keyIndex)` and `keyOutInterpolationType(keyIndex)`.
1059: 
1060: #### Parameters
1061: 
1062: | Parameter  |                 Type                 |                                                       Description                                                        |
1063: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
1064: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
1065: 
1066: #### Returns
1067: 
1068: Boolean.
1069: 
1070: ---
1071: 
1072: ### Property.keyTemporalContinuous()
1073: 
1074: `app.project.item(index).layer(index).propertySpec.keyTemporalContinuous(keyIndex)`
1075: 
1076: #### Description
1077: 
1078: Returns `true` if the specified keyframe has temporal continuity. Temporal continuity affects this keyframe only if keyframe interpolation type is `KeyframeInterpolationType.BEZIER` for both `keyInInterpolationType(keyIndex)` and `keyOutInterpolationType(keyIndex)`.
1079: 
1080: #### Parameters
1081: 
1082: | Parameter  |                 Type                 |                                                       Description                                                        |
1083: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
1084: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
1085: 
1086: #### Returns
1087: 
1088: Boolean.
1089: 
1090: ---
1091: 
1092: ### Property.keyTime()
1093: 
1094: `app.project.item(index).layer(index).propertySpec.keyTime(keyIndex)`
1095: `app.project.item(index).layer(index).propertySpec.keyTime(markerComment)`
1096: 
1097: #### Description
1098: 
1099: Finds the specified keyframe or marker and returns the time at which it occurs. If no keyframe or marker can be found that matches the argument, this method generates an exception, and an error is displayed.
1100: 
1101: #### Parameters
1102: 
1103: 
1104: |    Parameter    |                 Type                 |                                                       Description                                                        |
1105: | --------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
1106: | `keyIndex`      | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
1107: | `markerComment` | String                               | The comment attached to a marker (see [MarkerValue.comment](../other/markervalue.md#markervaluecomment) attribute).      |
1108: 
1109: #### Returns
1110: 
1111: Floating-point value.
1112: 
1113: ---
1114: 
1115: ### Property.keyValue()
1116: 
1117: `app.project.item(index).layer(index).propertySpec.keyValue(keyIndex)`
1118: 
1119: `app.project.item(index).layer(index).propertySpec.keyValue(markerComment)`
1120: 
1121: 
1122: #### Description
1123: 
1124: Finds the specified keyframe or marker and returns its current value. If no keyframe or marker can be found that matches the argument, this method generates an exception, and an error is displayed.
1125: 
1126: #### Parameters
1127: 
1128: |    Parameter    |                 Type                 |                                                       Description                                                        |
1129: | --------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
1130: | `keyIndex`      | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
1131: | `markerComment` | String                               | The comment attached to a marker (see [MarkerValue.comment](../other/markervalue.md#markervaluecomment) attribute).      |
1132: 
1133: #### Returns
1134: 
1135: Returns the value of the type corresponding to the [PropertyValueType](#propertypropertyvaluetype).
1136: 
1137: ---
1138: 
1139: ### Property.nearestKeyIndex()
1140: 
1141: `app.project.item(index).layer(index).propertySpec.nearestKeyIndex(time)`
1142: 
1143: #### Description
1144: 
1145: Returns the index of the keyframe nearest to the specified time.
1146: 
1147: #### Parameters
1148: 
1149: | Parameter |         Type         |                         Description                          |
1150: | --------- | -------------------- | ------------------------------------------------------------ |
1151: | `time`    | Floating-point value | The time, in seconds. The beginning of the composition is 0. |
1152: 
1153: #### Returns
1154: 
1155: Integer.
1156: 
1157: ---
1158: 
1159: ### Property.removeKey()
1160: 
1161: `app.project.item(index).layer(index).propertySpec.removeKey(keyIndex)`
1162: 
1163: #### Description
1164: 
1165: Removes the specified keyframe from the named property. If no keyframe with the specified index exists, generates an exception and displays an error. When a keyframe is removed, the remaining index numbers change. To remove more than one keyframe, you must start with the highest index number and work down to the lowest to ensure that the remaining indices reference the same keyframe after each removal.
1166: 
1167: #### Parameters
1168: 
1169: | Parameter  |                 Type                 |                                                       Description                                                        |
1170: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
1171: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
1172: 
1173: #### Returns
1174: 
1175: Nothing.
1176: 
1177: ---
1178: 
1179: ### Property.setAlternateSource()
1180: 
1181: `app.project.item(index).layer(index).propertySpec.setAlternateSource(newSource)`
1182: 
1183: !!! note
1184:     This functionality was added in After Effects 18.0 (2021)
1185: 
1186: #### Description
1187: 
1188: Set the alternate source for this property.
1189: 
1190: The Property object and the input parameters for the AVItem that is being called needs to be Media Replacement compatible for the action to go through.
1191: 
1192: - Use the [AVItem.isMediaReplacementCompatible](../item/avitem.md#avitemismediareplacementcompatible) method to test whether the AVItem can be used as an alternate source for Media Replacement.
1193: - Use [Property.canSetAlternateSource](#propertycansetalternatesource) to test if the property allows Media Replacement.
1194: 
1195: #### Parameters
1196: 
1197: |  Parameter  |                Type                |      Description       |
1198: | ----------- | ---------------------------------- | ---------------------- |
1199: | `newSource` | [AVItem object](../item/avitem.md) | The new source AVItem. |
1200: 
1201: #### Returns
1202: 
1203: Nothing.
1204: 
1205: ---
1206: 
1207: ### Property.setInterpolationTypeAtKey()
1208: 
1209: `app.project.item(index).layer(index).propertySpec.setInterpolationTypeAtKey(keyIndex, inType[, outType])`
1210: 
1211: #### Description
1212: 
1213: Sets the `in` and `out` interpolation types for the specified keyframe.
1214: 
1215: #### Parameters
1216: 
1217: +------------+-----------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
1218: | Parameter  |               Type                |                                                                      Description                                                                      |
1219: +============+===================================+=======================================================================================================================================================+
1220: | `keyIndex` | Integer                           | The index for the keyframe, in the range `[1..numKeys]`, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
1221: +------------+-----------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
1222: | `inType`   | `KeyframeInterpolationType` enum. | The incoming interpolation type. One of:                                                                                                              |
1223: |            |                                   |                                                                                                                                                       |
1224: |            |                                   | - `KeyframeInterpolationType.LINEAR`                                                                                                                  |
1225: |            |                                   | - `KeyframeInterpolationType.BEZIER`                                                                                                                  |
1226: |            |                                   | - `KeyframeInterpolationType.HOLD`                                                                                                                    |
1227: +------------+-----------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
1228: | `outType`  | `KeyframeInterpolationType` enum. | Optional. The outgoing interpolation type. If not supplied, the 'out' type is set to the `inType` value. One of:                                      |
1229: |            |                                   |                                                                                                                                                       |
1230: |            |                                   | - `KeyframeInterpolationType.LINEAR`                                                                                                                  |
1231: |            |                                   | - `KeyframeInterpolationType.BEZIER`                                                                                                                  |
1232: |            |                                   | - `KeyframeInterpolationType.HOLD`                                                                                                                    |
1233: +------------+-----------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
1234: 
1235: #### Returns
1236: 
1237: Nothing.
1238: 
1239: ---
1240: 
1241: ### Property.setLabelAtKey()
1242: 
1243: `app.project.item(index).layer(index).propertySpec.setLabelAtKey(keyIndex, labelIndex)`
1244: 
1245: !!! note
1246:     This functionality was added in After Effects 22.6 (2022)
1247: 
1248: #### Description
1249: 
1250: Set the label color for the keyframe. Colors are represented by their number (0 for None, or 1 to 16 for one of the preset colors in the Labels preferences).
1251: 
1252: #### Parameters
1253: 
1254: |  Parameter   |                 Type                 |                                                       Description                                                        |
1255: | ------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
1256: | `keyIndex`   | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
1257: | `labelIndex` | Integer, in the range `[0..16]`      | The index for the new label value.                                                                                       |
1258: 
1259: #### Returns
1260: 
1261: Nothing.
1262: 
1263: ---
1264: 
1265: ### Property.setPropertyParameters()
1266: 
1267: `app.project.item(index).layer(index).propertySpec.setPropertyParameters(items)`
1268: 
1269: !!! note
1270:     This functionality was added in After Effects 17.0.1 (2020)
1271: 
1272: #### Description
1273: 
1274: Sets parameters for a Dropdown Menu Control's Menu Property. This method will overwrite the existing set of Menu items with the provided array of strings.
1275: 
1276: - The Dropdown Menu Control effect's Menu property is the only property that allows parameters to be set.
1277: - To check if a property allows parameters to be set, check with [isDropdownEffect](#propertyisdropdowneffect) before calling this method.
1278: - An exception is raised whenever this method fails.
1279: 
1280: #### Parameters
1281: 
1282: +-----------+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1283: | Parameter |       Type       |                                                                                  Description                                                                                  |
1284: +===========+==================+===============================================================================================================================================================================+
1285: | `items`   | Array of strings | Values which will replace the existing menu entries in a Dropdown Menu Control.                                                                                               |
1286: |           |                  |                                                                                                                                                                               |
1287: |           |                  | - Only strings are allowed.                                                                                                                                                   |
1288: |           |                  | - Empty item strings are not allowed.                                                                                                                                         |
1289: |           |                  | - Duplicate item strings are not allowed.                                                                                                                                     |
1290: |           |                  | - The character `"\"` is not allowed in the item strings.                                                                                                                     |
1291: |           |                  | - The string `"(-"` can be specified as of the item strings, to create a separator line in the dropdown menu. The separator lines will claim an index for each of themselves. |
1292: +-----------+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1293: 
1294: !!! tip
1295:     Item strings should be in ASCII or MultiByte encodable in the current code-page. In other words, the item strings should be provided in the script of the running system.
1296: 
1297:     For example: Specifying the item strings in Japanese while running the script on an English system will create a dropdown effect with illegible characters in the item strings.
1298: 
1299: #### Example
1300: 
1301: ```javascript
1302: var dropdownItems = [
1303:     "First Item",
1304:     "Second Item",
1305:     "(-",
1306:     "Another Item",
1307:     "Last Item"
1308: ];
1309: 
1310: var dropdownEffect = layer.property("ADBE Effect Parade").addProperty("ADBE Dropdown Control");
1311: dropdownEffect.property(1).setPropertyParameters(dropdownItems);
1312: ```
1313: 
1314: #### Returns
1315: 
1316: Property object, the updated Dropdown Menu Control's Menu property.
1317: 
1318: ---
1319: 
1320: ### Property.setRovingAtKey()
1321: 
1322: `app.project.item(index).layer(index).propertySpec.setRovingAtKey(keyIndex, newVal)`
1323: 
1324: #### Description
1325: 
1326: Turns roving on or off for the specified keyframe. The first and last keyframe in a property cannot rove; if you try to set roving for one of these, the operation is ignored, and `keyRoving()` continues to return `false`. If the property value type is neither `TwoD_SPATIAL` nor `ThreeD_SPATIAL`, an exception is generated.
1327: 
1328: #### Parameters
1329: 
1330: | Parameter  |                 Type                 |                                                       Description                                                        |
1331: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
1332: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
1333: | `newVal`   | Boolean                              | `true` to turn roving on, `false` to turn roving off.                                                                    |
1334: 
1335: #### Returns
1336: 
1337: Nothing.
1338: 
1339: ---
1340: 
1341: ### Property.setSelectedAtKey()
1342: 
1343: `app.project.item(index).layer(index).propertySpec.setSelectedAtKey(keyIndex, onOff)`
1344: 
1345: #### Description
1346: 
1347: Selects or deselects the specified keyframe.
1348: 
1349: #### Parameters
1350: 
1351: | Parameter  |                 Type                 |                                                       Description                                                        |
1352: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
1353: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
1354: | `onOff`    | Boolean                              | `true` to select the keyframe, `false` to deselect it.                                                                   |
1355: 
1356: #### Returns
1357: 
1358: Nothing.
1359: 
1360: ---
1361: 
1362: ### Property.setSpatialAutoBezierAtKey()
1363: 
1364: `app.project.item(index).layer(index).propertySpec.setSpatialAutoBezierAtKey(keyIndex, newVal)`
1365: 
1366: #### Description
1367: 
1368: Turns spatial auto-Bezier interpolation on or off for the specified keyframe. If the property value type is neither `TwoD_SPATIAL` nor `ThreeD_SPATIAL`, an exception is generated.
1369: 
1370: #### Parameters
1371: 
1372: | Parameter  |                 Type                 |                                                       Description                                                        |
1373: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
1374: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
1375: | `newVal`   | Boolean                              | `true` to turn spatial auto-Bezier on, `false` to turn it off.                                                           |
1376: 
1377: #### Returns
1378: 
1379: Nothing.
1380: 
1381: ---
1382: 
1383: ### Property.setSpatialContinuousAtKey()
1384: 
1385: `app.project.item(index).layer(index).propertySpec.setSpatialContinuousAtKey(keyIndex, newVal)`
1386: 
1387: #### Description
1388: 
1389: Turns spatial continuity on or off for the specified keyframe. If the property value type is neither `TwoD_SPATIAL` nor `ThreeD_SPATIAL`, an exception is generated.
1390: 
1391: #### Parameters
1392: 
1393: | Parameter  |                 Type                 |                                                       Description                                                        |
1394: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
1395: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
1396: | `newVal`   | Boolean                              | `true` to turn spatial auto-Bezier on, `false` to turn it off.                                                           |
1397: 
1398: #### Returns
1399: 
1400: Nothing.
1401: 
1402: ---
1403: 
1404: ### Property.setSpatialTangentsAtKey()
1405: 
1406: `app.project.item(index).layer(index).propertySpec.setSpatialTangentsAtKey(keyIndex, inTangent[, outTangent])`
1407: 
1408: #### Description
1409: 
1410: Sets the incoming and outgoing tangent vectors for the specified keyframe. If the property value type is neither `TwoD_SPATIAL` nor `ThreeD_SPATIAL`, an exception is generated.
1411: 
1412: #### Parameters
1413: 
1414: +--------------+-------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
1415: |  Parameter   |                   Type                    |                                                                      Description                                                                      |
1416: +==============+===========================================+=======================================================================================================================================================+
1417: | `keyIndex`   | Integer                                   | The index for the keyframe, in the range `[1..numKeys]`, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
1418: +--------------+-------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
1419: | `inTangent`  | An array of 2 or 3 floating-point values. | The incoming tangent vector.                                                                                                                          |
1420: |              |                                           |                                                                                                                                                       |
1421: |              |                                           | - If the property value type is `PropertyValueType.TwoD_SPATIAL`, the array contains 2 values.                                                        |
1422: |              |                                           | - If the property value type is `PropertyValueType.ThreeD_SPATIAL`, the array contains 3 values.                                                      |
1423: +--------------+-------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
1424: | `outTangent` | An array of 2 or 3 floating-point values. | Optional. The outgoing tangent vector. If not supplied, the `out` tangent is set to the `inTangent` value.                                            |
1425: |              |                                           |                                                                                                                                                       |
1426: |              |                                           | - If the property value type is `PropertyValueType.TwoD_SPATIAL`, the array contains 2 values.                                                        |
1427: |              |                                           | - If the property value type is `PropertyValueType.ThreeD_SPATIAL`, the array contains 3 values.                                                      |
1428: +--------------+-------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
1429: 
1430: #### Returns
1431: 
1432: Nothing.
1433: 
1434: ---
1435: 
1436: ### Property.setTemporalAutoBezierAtKey()
1437: 
1438: `app.project.item(index).layer(index).propertySpec.setTemporalAutoBezierAtKey(keyIndex, newVal)`
1439: 
1440: #### Description
1441: 
1442: Turns temporal auto-Bezier interpolation on or off for the specified keyframe. When this is turned on, it affects this keyframe only if `keySpatialContinuous(keyIndex)` is also true.
1443: 
1444: #### Parameters
1445: 
1446: | Parameter  |                 Type                 |                                                       Description                                                        |
1447: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
1448: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
1449: | `newVal`   | Boolean                              | `true` to turn temporal auto-Bezier on, `false` to turn it off.                                                          |
1450: 
1451: #### Returns
1452: 
1453: Nothing.
1454: 
1455: ---
1456: 
1457: ### Property.setTemporalContinuousAtKey()
1458: 
1459: `app.project.item(index).layer(index).propertySpec.setTemporalContinuousAtKey(keyIndex, newVal)`
1460: 
1461: #### Description
1462: 
1463: Turns temporal continuity on or off for the specified keyframe. When temporal continuity is turned on, it affects this keyframe only if the keyframe interpolation type is `KeyframeInterpolationType.BEZIER` for both `keyInInterpolationType(keyIndex)` and `keyOutInterpolationType(keyIndex)`.
1464: 
1465: #### Parameters
1466: 
1467: | Parameter  |                 Type                 |                                                       Description                                                        |
1468: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
1469: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
1470: | `newVal`   | Boolean                              | `true` to turn temporal auto-Bezier on, `false` to turn it off.                                                          |
1471: 
1472: #### Returns
1473: 
1474: Nothing.
1475: 
1476: ---
1477: 
1478: ### Property.setTemporalEaseAtKey()
1479: 
1480: `app.project.item(index).layer(index).propertySpec.setTemporalEaseAtKey(keyIndex, inTemporalEase[, outTemporalEase])`
1481: 
1482: #### Description
1483: 
1484: Sets the incoming and outgoing temporal ease for the specified keyframe. See [KeyframeEase object](../other/keyframeease.md).
1485: 
1486: #### Parameters
1487: 
1488: +-------------------+-------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
1489: |     Parameter     |                                  Type                                   |                                                                      Description                                                                      |
1490: +===================+=========================================================================+=======================================================================================================================================================+
1491: | `keyIndex`        | Integer                                                                 | The index for the keyframe, in the range `[1..numKeys]`, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
1492: +-------------------+-------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
1493: | `inTemporalEase`  | An array of 1, 2, or 3 [KeyframeEase objects](../other/keyframeease.md) | The incoming temporal ease.                                                                                                                           |
1494: |                   |                                                                         |                                                                                                                                                       |
1495: |                   |                                                                         | - If the property value type is `PropertyValueType.TwoD`, the array contains 2 objects.                                                               |
1496: |                   |                                                                         | - If the property value type is `PropertyValueType.ThreeD`, the array contains 3 objects.                                                             |
1497: |                   |                                                                         | - For all other value types, the array contains 1 object.                                                                                             |
1498: +-------------------+-------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
1499: | `outTemporalEase` | An array of 1, 2, or 3 [KeyframeEase objects](../other/keyframeease.md) | Optional. The outgoing temporal ease. If not supplied, the outgoing ease is set to the `inTemporalEase` value.                                        |
1500: |                   |                                                                         |                                                                                                                                                       |
1501: |                   |                                                                         | - If the property value type is `PropertyValueType.TwoD`, the array contains 2 objects.                                                               |
1502: |                   |                                                                         | - If the property value type is `PropertyValueType.ThreeD`, the array contains 3 objects.                                                             |
1503: |                   |                                                                         | - For all other value types, the array contains 1 object.                                                                                             |
1504: +-------------------+-------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------+
1505: 
1506: #### Returns
1507: 
1508: Nothing.
1509: 
1510: ---
1511: 
1512: ### Property.setValue()
1513: 
1514: `app.project.item(index).layer(index).propertySpec.setValue(newValue)`
1515: 
1516: #### Description
1517: 
1518: Sets the static value of a property that has no keyframes. If the named property has keyframes, this method generates an exception and displays an error. To set the value of a property with keyframes, use [Property.setValueAtTime()](#propertysetvalueattime) or [Property.setValueAtKey()](#propertysetvalueatkey).
1519: 
1520: #### Parameters
1521: 
1522: | Parameter  | Type  |                                                      Description                                                      |
1523: | ---------- | ----- | --------------------------------------------------------------------------------------------------------------------- |
1524: | `newValue` | Value | A value appropriate for the type of property being set; see [Property.propertyValueType](#propertypropertyvaluetype). |
1525: 
1526: #### Returns
1527: 
1528: Nothing.
1529: 
1530: ---
1531: 
1532: ### Property.setValueAtKey()
1533: 
1534: `app.project.item(index).layer(index).propertySpec.setValueAtKey(keyIndex, newValue)`
1535: 
1536: #### Description
1537: 
1538: Finds the specified keyframe and sets its value. If the named property has no keyframes, or no keyframe with the specified index, this method generates an exception and displays an error.
1539: 
1540: #### Parameters
1541: 
1542: | Parameter  |                 Type                 |                                                       Description                                                        |
1543: | ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
1544: | `keyIndex` | Integer, in the range `[1..numKeys]` | The index for the keyframe, as returned by the [addKey](#propertyaddkey) or [nearestKeyIndex](#propertynearestkeyindex). |
1545: | `newValue` | Value                                | A value appropriate for the type of property being set; see [Property.propertyValueType](#propertypropertyvaluetype).    |
1546: 
1547: #### Returns
1548: 
1549: Nothing.
1550: 
1551: ---
1552: 
1553: ### Property.setValueAtTime()
1554: 
1555: `app.project.item(index).layer(index).propertySpec.setValueAtTime(time, newValue)`
1556: 
1557: #### Description
1558: 
1559: Sets the value of a keyframe at the specified time. Creates a new keyframe for the named property, if one does not currently exist for the specified time, and sets its value.
1560: 
1561: #### Parameters
1562: 
1563: | Parameter  |         Type         |                                                      Description                                                      |
1564: | ---------- | -------------------- | --------------------------------------------------------------------------------------------------------------------- |
1565: | `time`     | Floating-point value | The time, in seconds, at which to set the value. The beginning of the composition is 0.                               |
1566: | `newValue` | Value                | A value appropriate for the type of property being set; see [Property.propertyValueType](#propertypropertyvaluetype). |
1567: 
1568: #### Returns
1569: 
1570: Nothing.
1571: 
1572: ---
1573: 
1574: ### Property.setValuesAtTimes()
1575: 
1576: `app.project.item(index).layer(index).propertySpec.setValuesAtTimes(times, newValues)`
1577: 
1578: #### Description
1579: 
1580: Sets values for a set of keyframes at specified times. Creates a new keyframe for the named property, if one does not currently exist for a specified time, and sets its value. Times and values are expressed as arrays; the arrays must be of the same length.
1581: 
1582: #### Parameters
1583: 
1584: |  Parameter  |              Type              |                                                           Description                                                           |
1585: | ----------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
1586: | `times`     | Array of floating-point values | An array of times, in seconds. The beginning of the composition is 0.                                                           |
1587: | `newValues` | Array of values                | A array of values appropriate for the type of property being set; see [Property.propertyValueType](#propertypropertyvaluetype). |
1588: 
1589: #### Returns
1590: 
1591: Nothing.
1592: 
1593: ---
1594: 
1595: ### Property.valueAtTime()
1596: 
1597: `app.project.item(index).layer(index).propertySpec.valueAtTime(time, preExpression)`
1598: 
1599: #### Description
1600: 
1601: The value of the named property as evaluated at the specified time. Note that the type of value returned is not made explicit; it will be of a different type, depending on the property evaluated.
1602: 
1603: !!! tip
1604:     As After Effects 13.6, this method now waits for time-intensive expressions, like `sampleImage`, to finish evaluating before it returns the result.
1605: 
1606: #### Parameters
1607: 
1608: |    Parameter    |         Type         |                                                                                                                                        Description                                                                                                                                        |
1609: | --------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
1610: | `time`          | Floating-point value | The time, in seconds, at which to set the value. The beginning of the composition is 0.                                                                                                                                                                                                   |
1611: | `preExpression` | Boolean              | If the property has an expression and this is `true`, return the value for the specified time without applying the expression to it. When `false`, return the result of evaluating the expression for the specified time. Ignored if the property does not have an associated expression. |
1612: 
1613: #### Returns
1614: 
1615: A value appropriate for the type of the property (see "Property propertyValueType attribute" on page 138).
````

## File: docs/official/property/propertybase.md
````markdown
  1: # PropertyBase object
  2: 
  3: `app.project.item(index).layer(index).propertySpec`
  4: 
  5: #### Description
  6: 
  7: Properties are accessed by name through layers, using various kinds of expression syntax, as controlled by application preferences. For example, the following are all ways of access properties in the Effects group
  8: 
  9: ```javascript
 10: var effect1 = app.project.item(1).layer(1).effect("AddGrain")("Viewing Mode");
 11: var effect1again = app.project.item(1).layer(1).effect.addGrain.viewingMode;
 12: var effect1againtoo = app.project.item(1).layer(1)("Effects").addGrain.viewingMode;
 13: var effect1againtoo2 = app.project.item(1).layer(1)("Effects")("Add Grain")("Viewing Mode");
 14: ```
 15: 
 16: See also [PropertyGroup.property()](propertygroup.md#propertygroupproperty).
 17: 
 18: !!! info
 19:     PropertyBase is the base class for both [Property](property.md) and [PropertyGroup](propertygroup.md), so PropertyBase attributes and methods are available when working with properties and property groups.
 20: 
 21: #### Reference invalidation
 22: 
 23: When something occurs that changes an object sufficiently for the reference to become invalid, script references to that object can generate errors. In simple cases this is straightforward. For example, if you delete anobject, a reference to the deleted object generates the warning "Object is Invalid":
 24: 
 25: ```javascript
 26: var layer1 = app.project.item(1).layer(1);
 27: layer1.remove();
 28: alert(layer1.name); // invalid reference to deleted object
 29: ```
 30: 
 31: Similarly, if you reference an AE property in a deleted object, the warning occurs
 32: 
 33: ```javascript
 34: var layer1 = app.project.item(1).layer(1);
 35: var layer1position = layer1.transform.position;
 36: layer1.remove();
 37: alert(layer1position.value); // invalid reference to property inselected object
 38: ```
 39: 
 40: A less straightforward case is when a property is removed from a property group. In this case, After Effectsgenerates the "Object is Invalid" error when you subsequently reference that item or other items in the group,because their index positions have changed. For example:
 41: 
 42: ```javascript
 43: var effect1 = app.project.item(1).layer(1).effect(1);
 44: var effect2 = app.project.item(1).layer(1).effect(2);
 45: var effect2param = app.project.item(1).layer(1).effect(2).blendWithOriginal;
 46: effect1.remove();
 47: alert(effect2.name); // invalid reference because group index positions have changed
 48: ```
 49: 
 50: ---
 51: 
 52: ## Attributes
 53: 
 54: ### PropertyBase.active
 55: 
 56: `app.project.item(index).layer(index).active`
 57: 
 58: `app.project.item(index).layer(index).propertySpec.active`
 59: 
 60: 
 61: #### Description
 62: 
 63: For a layer, this corresponds to the setting of the eyeball icon. When `true`, the layer's video is active at the current time. For this to be `true`, the layer must be enabled, no other layer may be soloing unless this layer is soloed too, and the time must be between the `inPoint` and `outPoint` values of this layer.
 64: 
 65: This value is never `true` in an audio layer; there is a separate `audioActive` attribute in the AVLayer object [AVLayer.audioActive](../layer/avlayer.md#avlayeraudioactive).
 66: 
 67: For an effect and all properties, it is the same as the enabled attribute, except that it's read-only.
 68: 
 69: #### Type
 70: 
 71: Boolean; read-only.
 72: 
 73: ---
 74: 
 75: ### PropertyBase.canSetEnabled
 76: 
 77: `app.project.item(index).layer(index).propertySpec.canSetEnabled`
 78: 
 79: #### Description
 80: 
 81: When `true`, you can set the `enabled` attribute value. Generally, this is `true` if the user interface displays an eyeball icon for this property; it is `true` for all layers.
 82: 
 83: #### Type
 84: 
 85: Boolean; read-only.
 86: 
 87: ---
 88: 
 89: ### PropertyBase.elided
 90: 
 91: `app.project.item(index).layer(index).propertySpec.elided`
 92: 
 93: #### Description
 94: 
 95: When `true`, this property is a group used to organize other properties. The property is not displayed in the user interface and its child properties are not indented in the Timeline panel.For example, for a text layer with two animators and no properties twirled down, you might see:
 96: 
 97: - `Text`
 98: - `PathOptions`
 99: - `MoreOptions`
100: - `Animator1`
101: - `Animator2`
102: 
103: In this example, "Animator 1" and "Animator 2" are contained in a PropertyBase called "Text Animators." This parent group is not displayed in the user interface, and so the two child properties are not indented in the Timeline panel.
104: 
105: #### Type
106: 
107: Boolean; read-only.
108: 
109: ---
110: 
111: ### PropertyBase.enabled
112: 
113: `app.project.item(index).layer(index).enabled`
114: 
115: `app.project.item(index).layer(index).propertySpec.enabled`
116: 
117: 
118: #### Description
119: 
120: For layer, this corresponds to the video switch state of the layer in the Timeline panel. For an effect and all properties, it corresponds to the setting of the eyeball icon, if there is one.
121: 
122: When `true`, the layer or property is enabled; otherwise `false`.
123: 
124: #### Type
125: 
126: Boolean; read/write if `canSetEnabled` is `true`, read-only if `canSetEnabled` is `false`.
127: 
128: ---
129: 
130: ### PropertyBase.isEffect
131: 
132: `app.project.item(index).layer(index).propertySpec.isEffect`
133: 
134: #### Description
135: 
136: When `true`, this property is an effect PropertyGroup.
137: 
138: #### Type
139: 
140: Boolean; read-only.
141: 
142: ---
143: 
144: ### PropertyBase.isMask
145: 
146: `app.project.item(index).layer(index).propertySpec.isMask`
147: 
148: #### Description
149: 
150: When `true`, this property is a mask PropertyGroup.
151: 
152: #### Type
153: 
154: Boolean; read-only.
155: 
156: ---
157: 
158: ### PropertyBase.isModified
159: 
160: `app.project.item(index).layer(index).propertySpec.isModified`
161: 
162: #### Description
163: 
164: When `true`, this property has been changed since its creation.
165: 
166: #### Type
167: 
168: Boolean; read-only.
169: 
170: ---
171: 
172: ### PropertyBase.matchName
173: 
174: `app.project.item(index).layer(index).propertySpec.matchName`
175: 
176: #### Description
177: 
178: A special name for the property used to build unique naming paths. The match name is not displayed, but you can refer to it in scripts. Every property has a unique match-name identifier. Match names are stable from version to version regardless of the display name (the name attribute value) or any changes to the application. Unlike the display name, it is not localized. An indexed group may not have a name value, but always has a matchName value. (An indexed group has the type `PropertyType.INDEXED_GROUP`; see [PropertyBase.propertyType](#propertybasepropertytype).)
179: 
180: #### Type
181: 
182: String; read-only.
183: 
184: ---
185: 
186: ### PropertyBase.name
187: 
188: `app.project.item(index).layer(index).name`
189: 
190: `app.project.item(index).layer(index).propertySpec.name`
191: 
192: 
193: #### Description
194: 
195: For a layer, the name of the layer. By default, this is the same as the Source name, unless [Layer.isNameSet](../layer/layer.md#layerisnameset) returns `false`.
196: 
197: For an effect and all properties - the display name of the property. (Compare [PropertyBase.matchName](#propertybasematchname).) It is an error to set the name value if the property is not a child of an indexed group (that is, a property group that has the type `PropertyType.INDEXED_GROUP`; see [PropertyBase.propertyType](#propertybasepropertytype)).
198: 
199: #### Type
200: 
201: String; read/write for a child of an indexed group; otherwise read-only.
202: 
203: ---
204: 
205: ### PropertyBase.parentProperty
206: 
207: `app.project.item(index).layer(index).propertySpec.parentProperty`
208: 
209: #### Description
210: 
211: The property group that is the immediate parent of this property, or `null` if this PropertyBase is a layer.
212: 
213: #### Type
214: 
215: PropertyGroup object or `null`; read-only.
216: 
217: ---
218: 
219: ### PropertyBase.propertyDepth
220: 
221: `app.project.item(index).layer(index).propertySpec.propertyDepth`
222: 
223: #### Description
224: 
225: The number of levels of parent groups between this property and the containing layer. The value 0 for a layer.
226: 
227: #### Type
228: 
229: Integer; read-only.
230: 
231: ---
232: 
233: ### PropertyBase.propertyIndex
234: 
235: `app.project.item(index).layer(index).propertySpec.propertyIndex`
236: 
237: #### Description
238: 
239: The position index of this property within its parent group, if it is a child of an indexed group (a property group that has the type `PropertyType.INDEXED_GROUP`; see [PropertyBase.propertyType](#propertybasepropertytype)).
240: 
241: #### Type
242: 
243: Integer; read-only.
244: 
245: ---
246: 
247: ### PropertyBase.propertyType
248: 
249: `app.project.item(index).layer(index).propertySpec.propertyType`
250: 
251: #### Description
252: 
253: The type of this property.
254: 
255: #### Type
256: 
257: A `PropertyType` enumerated value; read/write. One of:
258: 
259: - `PropertyType.PROPERTY`: A single property such as position or zoom.
260: - `PropertyType.INDEXED_GROUP`: A property group whose members have an editable name and an index. Effects and masks are indexed groups. For example, the masks property of a layer refers to a variable number of individual masks by index number.
261: - `PropertyType.NAMED_GROUP`: A property group in which the member names are not editable. Layers are named groups.
262: 
263: ---
264: 
265: ### PropertyBase.selected
266: 
267: `app.project.item(index).layer(index).propertySpec.selected`
268: 
269: #### Description
270: 
271: When `true`, this property is selected. Set to `true` to select the property, or to `false` to deselect it. Sampling this attribute repeatedly for a large number of properties can slow down system performance. To read the full set of selected properties of a composition or layer, use either [CompItem.selectedProperties](../item/compitem.md#compitemselectedproperties) or [Layer.selectedProperties](../layer/layer.md#layerselectedproperties).
272: 
273: #### Type
274: 
275: Boolean; read/write.
276: 
277: ## Methods
278: 
279: ### PropertyBase.duplicate()
280: 
281: `app.project.item(index).layer(index).propertySpec.duplicate()`
282: 
283: #### Description
284: 
285: If this property is a child of an indexed group, creates and returns a new PropertyBase object with the same attribute values as this one. If this property is not a child of an indexed group, the method generates an exception and displays an error. An indexed group has the type `PropertyType.INDEXED_GROUP`; see [PropertyBase.propertyType](#propertybasepropertytype).
286: 
287: #### Parameters
288: 
289: None.
290: 
291: #### Returns
292: 
293: PropertyBase object.
294: 
295: ---
296: 
297: ### PropertyBase.moveTo()
298: 
299: `app.project.item(index).layer(index).propertySpec.moveTo(newIndex)`
300: 
301: #### Description
302: 
303: Moves this property to a new position in its parent property group. This method is valid only for children of indexed groups; if it is not, or if the index value is not valid, the method generates an exception and displays an error. (An indexed group has the type `PropertyType.INDEXED_GROUP`; see [PropertyBase.propertyType](#propertybasepropertytype).)
304: 
305: !!! warning
306:     Using this method invalidates existing references to other children in the same indexed group. For example, if you have three effects on a layer, each effect assigned to a different variable, moving one of the effects invalidates the references for all of these variables. You will need to reassign them.
307: 
308: #### Parameters
309: 
310: | Parameter  |  Type   |                             Description                              |
311: | ---------- | ------- | -------------------------------------------------------------------- |
312: | `newIndex` | Integer | The new index position at which to place this property in its group. |
313: 
314: #### Returns
315: 
316: Nothing.
317: 
318: ---
319: 
320: ### PropertyBase.propertyGroup()
321: 
322: `app.project.item(index).layer(index).propertySpec.propertyGroup([countUp])`
323: 
324: #### Description
325: 
326: Gets the PropertyGroup object for an ancestor group of this property at a specified level of the parent-child hierarchy.
327: 
328: #### Parameters
329: 
330: | Parameter |                    Type                    |                                                        Description                                                         |
331: | --------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
332: | `countUp` | Integer, in the range `[1..propertyDepth]` | Optional. The number of levels to ascend within the parent-child hierarchy. Default is 1, which gets the immediate parent. |
333: 
334: #### Returns
335: 
336: PropertyGroup object, or [Layer object](../layer/layer.md) if the count reaches the containing layer.
337: 
338: #### Example
339: 
340: ```javascript
341: var containing_layer = my_property.propertyGroup(my_property.propertyDepth);
342: ```
343: 
344: ---
345: 
346: ### PropertyBase.remove()
347: 
348: `app.project.item(index).layer(index).propertySpec.remove()`
349: 
350: #### Description
351: 
352: Removes this property from its parent group. If this is a property group, it removes the child properties as well. This method is valid only for children of indexed groups; if it is not, or if the index value is not valid, the method generates an exception and displays an error. (An indexed group has the type `PropertyType.INDEXED_GROUP`; see [PropertyBase.propertyType](#propertybasepropertytype).) This method can be called on a text animation property (that is, any animator that has been set to a text layer).
353: 
354: #### Parameters
355: 
356: None.
357: 
358: #### Returns
359: 
360: Nothing.
````

## File: docs/official/property/propertygroup.md
````markdown
  1: # PropertyGroup object
  2: 
  3: `app.project.item(index).layer(index).propertyGroupSpec`
  4: 
  5: #### Description
  6: 
  7: The PropertyGroup object represents a group of properties. It can contain Property objects and other PropertyGroup objects. Property groups can be nested to provide a parent-child hierarchy, with a Layer object at the top (root) down to a single Property object, such as the mask feather of the third mask. To traverse the group hierarchy, use PropertyBase methods and attributes; see [PropertyBase.propertyGroup()](propertybase.md#propertybasepropertygroup). For examples of how to access properties and property groups, see [PropertyBase object](propertybase.md).
  8: 
  9: !!! info
 10:     PropertyGroup is a subclass of [PropertyBase](propertybase.md). All methods and attributes of PropertyBase, in addition to those listed below, are available when working with PropertyGroup.
 11: 
 12: !!! info
 13:     PropertyGroup is a base class for [Layer](../layer/layer.md) and [MaskPropertyGroup](maskpropertygroup.md). PropertyGroup attributes and methods are available when working with layer or mask groups.
 14: 
 15: ---
 16: 
 17: ## Attributes
 18: 
 19: ### PropertyGroup.numProperties
 20: 
 21: `app.project.item(index).layer(index).propertyGroupSpec.numProperties`
 22: 
 23: #### Description
 24: 
 25: The number of indexed properties in this group.
 26: 
 27: For layers, this method returns a value of 3, corresponding to the mask, effect, and motion tracker groups, which are the indexed groups within the layer.
 28: 
 29: However, layers also have many other properties available only by name; see [PropertyGroup.property()](#propertygroupproperty).
 30: 
 31: #### Type
 32: 
 33: Integer; read-only.
 34: 
 35: ---
 36: 
 37: ## Methods
 38: 
 39: ### PropertyGroup.addProperty()
 40: 
 41: `app.project.item(index).layer(index).propertyGroupSpec.addProperty(name)`
 42: 
 43: #### Description
 44: 
 45: Creates and returns a PropertyBase object with the specified name, and adds it to this group.
 46: 
 47: In general, you can only add properties to an indexed group (a property group that has the type `PropertyType.INDEXED_GROUP`; see [PropertyBase.propertyType](propertybase.md#propertybasepropertytype)).
 48: The only exception is a text animator property, which can be added to a named group (a property group that has the type `PropertyType.NAMED_GROUP`).
 49: 
 50: If this method cannot create a property with the specified name, it generates an exception.
 51: 
 52: To check that you can add a particular property to this group, call `canAddProperty` before calling this method. (See [PropertyGroup.canAddProperty()](#propertygroupcanaddproperty).)
 53: 
 54: !!! warning
 55:     When you add a new property to an indexed group, the indexed group gets recreated from scratch, invalidating all existing references to properties.
 56: 
 57: One workaround is to store the index of the added property with property.propertyIndex.
 58: 
 59: #### Examples
 60: 
 61: 
 62: This won't work, as the slider object becomes invalid once we add the Color Control property:
 63: 
 64: ```javascript
 65: var effectsProperty = layer.property("ADBE Effect Parade");
 66: var slider = effectsProperty.addProperty("ADBE Slider Control");
 67: var color = effectsProperty.addProperty("ADBE Color Control");
 68: 
 69: var sliderProperty = slider.property("ADBE Slider Control-0001"); // Object 'slider' is Invalid
 70: ```
 71: 
 72: This revised method will work:
 73: 
 74: ```javascript
 75: var effectsProperty = layer.property("ADBE Effect Parade");
 76: var slider = effectsProperty.addProperty("ADBE Slider Control");
 77: var sliderIndex = slider.propertyIndex; // Store 'slider' effect index so it can be reused later
 78: var color = effectsProperty.addProperty("ADBE Color Control");
 79: 
 80: var sliderProperty = effectsProperty.property(sliderIndex).property("ADBE Slider Control-0001");
 81: ```
 82: 
 83: #### Parameters
 84: 
 85: +-----------+--------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 86: | Parameter |  Type  |                                                                                                Description                                                                                                |
 87: +===========+========+===========================================================================================================================================================================================================+
 88: | `name`    | String | The display name or [matchName](propertybase.md#propertybasematchname) of the property to add. The following names are supported:                                                                         |
 89: |           |        |                                                                                                                                                                                                           |
 90: |           |        | - Any match name for a property that can be added through the user interface. For example, `"ADBE Mask Atom`", `"ADBE Paint Atom`", `"ADBE Text Position`", `"ADBE Text Anchor Point`".                   |
 91: |           |        | - When adding to an ADBE Mask Parade: `"ADBE Mask Atom`", `"Mask`".                                                                                                                                       |
 92: |           |        | - When adding to an ADBE Effect Parade, any effect by match name, such as `"ADBE Bulge`", `"ADBE Glo2`", `"APC Vegas`".                                                                                   |
 93: |           |        | - Any effect by display name, such as `"Bulge`", `"Glow`", `"Vegas`".                                                                                                                                     |
 94: |           |        | - For text animators, `"ADBE Text Animator`".                                                                                                                                                             |
 95: |           |        | - For selectors, Range Selector has the name `"ADBE Text Selector`", Wiggly Selector has the name `"ADBE Text Wiggly Selector`", and Expression Selector has the name `"ADBE Text Expressible Selector`". |
 96: +-----------+--------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
 97: 
 98: #### Returns
 99: 
100: [PropertyBase object](propertybase.md).
101: 
102: ---
103: 
104: ### PropertyGroup.canAddProperty()
105: 
106: `app.project.item(index).layer(index).propertyGroupSpec.canAddProperty(name)`
107: 
108: #### Description
109: 
110: Returns `true` if a property with the given name can be added to this property group.
111: 
112: For example, you can only add mask to a mask group. The only legal input arguments are "mask" or "ADBE Mask Atom".
113: 
114: ```javascript
115: maskGroup.canAddProperty("mask"); // returns `true`
116: maskGroup.canAddProperty("ADBE Mask Atom"); // returns `true`
117: maskGroup.canAddProperty("blend"); // returns false
118: ```
119: 
120: #### Parameters
121: 
122: | Parameter |  Type  |                                                          Description                                                          |
123: | --------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
124: | `name`    | String | The display name or match name of the property to be checked. (See [PropertyGroup.addProperty()](#propertygroupaddproperty)). |
125: 
126: #### Returns
127: 
128: Boolean.
129: 
130: ---
131: 
132: ### PropertyGroup.addVariableFontAxis()
133: 
134: `app.project.item(index).layer(index).propertyGroupSpec.addVariableFontAxis(axisTag)`
135: 
136: !!! note
137:     This functionality was added in After Effects 26.0
138: 
139: #### Description
140: 
141: Creates and returns a Property object for a variable font axis, and adds it to this property group. This method can only be called on the "ADBE Text Animator Properties" property group within a text animator.
142: 
143: Common axis tags include (but are not limited to):
144: 
145: - `"wght"` - Weight (100-900 typical range)
146: - `"wdth"` - Width (percentage of normal width)
147: - `"slnt"` - Slant (angle in degrees)
148: - `"ital"` - Italic (0-1 range)
149: - `"opsz"` - Optical Size (point size)
150: 
151: Fonts may also include custom axes with 4-character uppercase tags (e.g., `"INFM"` for Informality).
152: 
153: #### Variable Font Spacing
154: 
155: When animating Variable Font axes, individual characters can change width. The Variable Font Spacing property (found in the "More Options" section of a text animator) controls how After Effects handles character spacing compensation for these width changes.
156: 
157: The Variable Font Spacing property can be accessed via its matchName `"ADBE Text Variable Font Spacing"` and is a dropdown control property. This property appears only when at least one variable font axis is active in the animator.
158: 
159: 
160: !!! tip
161:     Axes must exist on the font to have any impact. To discover what axes a font supports, use [FontObject.designAxesData](../text/fontobject.md#fontobjectdesignaxesdata).
162: 
163: #### Parameters
164: 
165: | Parameter |  Type  |                                              Description                                               
166: | --------- | ------ | -----------------------------------------------------------------------------------------------------|
167: | `axisTag` | String | The 4-character tag identifying the variable font axis (e.g., `"wght"`, `"wdth"`, `"slnt"`, `"ital"`).
168: 
169: #### Returns
170: 
171: [Property object](property.md) representing the variable font axis.
172: 
173: #### Examples
174: 
175: ```javascript
176: // Create a comp
177: var comp = app.project.items.addComp("Create Axis Comp", 1920, 1080, 1, 30, 30);
178: comp.openInViewer();
179: 
180: // Create a text layer
181: var textLayer = comp.layers.addText("Hello World!");
182: 
183: // Set the font to variable font
184: var textDocument = textLayer.property("Source Text").value;
185: textDocument.font = 'ShantellSans'; // Must be a variable font
186: textLayer.property("Source Text").setValue(textDocument);
187: 
188: // Get the text property and animators group
189: var textProp = textLayer.property("Text");
190: var animators = textProp.property("Animators");
191: 
192: // Add a new animator
193: var animator = animators.addProperty("ADBE Text Animator");
194: var animatorProps = animator.property("ADBE Text Animator Properties");
195: 
196: // Add the Weight axis
197: var axisProp = animatorProps.addVariableFontAxis("wght");
198: 
199: // Set a static value
200: axisProp.setValue(700);
201: 
202: // Set keyframes
203: axisProp.setValueAtTime(0, 300);  // Light at 0 seconds
204: axisProp.setValueAtTime(2, 900);  // Heavy at 2 seconds
205: ```
206: 
207: ---
208: 
209: ### PropertyGroup.property()
210: 
211: `app.project.item(index).layer(index).propertyGroupSpec.property(index)`
212: 
213: `app.project.item(index).layer(index).propertyGroupSpec.property(name)`
214: 
215: 
216: #### Description
217: 
218: Finds and returns a child property of this group, as specified by either its index or name. A name specification can use the same syntax that is available with expressions. The following are all allowed and are equivalent:
219: 
220: ```javascript
221: mylayer.position;
222: mylayer("position");
223: mylayer.property("position");
224: mylayer(1);
225: mylayer.property(1);
226: ```
227: 
228: Some properties of a layer, such as position and zoom, can be accessed only by name. When using the name to find a property that is multiple levels down, you must make more than one call to this method.
229: 
230: For example, the following call searches two levels down, and returns the first mask in the mask group: `myLayer.property("ADBE Masks").property(1)`
231: 
232: #### Parameters
233: 
234: +-----------+---------+-----------------------------------------------------------------------------------------------------------+
235: | Parameter |  Type   |                                                Description                                                |
236: +===========+=========+===========================================================================================================+
237: | `index`   | Integer | The index for the child property, in the range `[1..numProperties]`, if this is an indexed group.         |
238: +-----------+---------+-----------------------------------------------------------------------------------------------------------+
239: | `name`    | String  | The name of the child property. This can be:                                                              |
240: |           |         |                                                                                                           |
241: |           |         | - Any match name                                                                                          |
242: |           |         | - Any name in expression "parenthesis style" syntax, meaning the display name or the compact English name |
243: |           |         | - Any name in expression "intercap style" syntax.                                                         |
244: |           |         |                                                                                                           |
245: |           |         | For supported property names, see the table below.                                                        |
246: +-----------+---------+-----------------------------------------------------------------------------------------------------------+
247: 
248: #### Returns
249: 
250: [PropertyBase object](propertybase.md) or `null` if no child property with the specified string name is found.
251: 
252: #### Properties accessible by name
253: 
254: +-----------------------------------------+----------------------------------------------------------------------------------+
255: |                 Source                  |                                      Values                                      |
256: +=========================================+==================================================================================+
257: | From any Layer                          | - `"ADBE Mask Parade`", or `"Masks`"                                             |
258: |                                         | - `"ADBE Effect Parade`", or `"Effects`"                                         |
259: |                                         | - `"ADBE MTrackers`", or `"Motion Trackers`"                                     |
260: +-----------------------------------------+----------------------------------------------------------------------------------+
261: | From an AVLayer                         | - `"Anchor Point`" or `"anchorPoint`"                                            |
262: |                                         | - `"Position`" or `"position`"                                                   |
263: |                                         | - `"Scale`" or `"scale`"                                                         |
264: |                                         | - `"Rotation`" or `"rotation`"                                                   |
265: |                                         | - `"Z Rotation`" or `"zRotation`" or `"Rotation Z`" or `"rotationZ`"             |
266: |                                         | - `"Opacity`" or `"opacity`"                                                     |
267: |                                         | - `"Marker`" or `"marker`"                                                       |
268: +-----------------------------------------+----------------------------------------------------------------------------------+
269: | From an AVLayer with a non-still source | - `"Time Remap`" or `"timeRemapEnabled`"                                         |
270: +-----------------------------------------+----------------------------------------------------------------------------------+
271: | From an AVLayer with an audio component | - `"Audio Levels`" or `"audioLevels`"                                            |
272: +-----------------------------------------+----------------------------------------------------------------------------------+
273: | From a camera layer                     | - `"Zoom`" or `"zoom`"                                                           |
274: |                                         | - `"Depth of Field`" or `"depthOfField`"                                         |
275: |                                         | - `"Focus Distance`" or `"focusDistance`"                                        |
276: |                                         | - `"Aperture`" or `"aperture`"                                                   |
277: |                                         | - `"Blur Level`" or `"blurLevel`"                                                |
278: +-----------------------------------------+----------------------------------------------------------------------------------+
279: | From a light layer                      | - `"Intensity`" or `"intensity`"                                                 |
280: |                                         | - `"Color`" or `"color`"                                                         |
281: |                                         | - `"Cone Angle`" or `"coneAngle`"                                                |
282: |                                         | - `"Cone Feather`" or `"coneFeather`"                                            |
283: |                                         | - `"Shadow Darkness`" or `"shadowDarkness`"                                      |
284: |                                         | - `"Shadow Diffusion`" or `"shadowDiffusion`"                                    |
285: |                                         | - `"Casts Shadows`" or `"castsShadows`"                                          |
286: +-----------------------------------------+----------------------------------------------------------------------------------+
287: | From a 3D layer                         | - `"Accepts Shadows`" or `"acceptsShadows`"                                      |
288: |                                         | - `"Accepts Lights`" or `"acceptsLights`"                                        |
289: |                                         | - `"Ambient`" or `"ambient`"                                                     |
290: |                                         | - `"Diffuse`" or `"diffuse`"                                                     |
291: |                                         | - `"Specular`" or `"specular`" (these are for the Specular Intensity property)   |
292: |                                         | - `"Shininess`" or `"shininess`" (these are for the Specular Shininess property) |
293: |                                         | - `"Casts Shadows`" or `"castsShadows`"                                          |
294: |                                         | - `"Light Transmission`" or `"lightTransmission`"                                |
295: |                                         | - `"Metal`" or `"metal`"                                                         |
296: +-----------------------------------------+----------------------------------------------------------------------------------+
297: | From a camera, light or 3D layer        | - `"X Rotation`" or `"xRotation`" or `"Rotation X`" or `"rotationX`"             |
298: |                                         | - `"Y Rotation`" or `"yRotation`" or `"Rotation Y`" or `"rotationY`"             |
299: |                                         | - `"Orientation`" or `"orientation`"                                             |
300: +-----------------------------------------+----------------------------------------------------------------------------------+
301: | From a text layer                       | - `"Source Text`" or `"source Text`" or `"Text`" or `"text`"                     |
302: +-----------------------------------------+----------------------------------------------------------------------------------+
303: | From PropertyGroup `"ADBE Mask Parade`" | - `"ADBE Mask Atom`"                                                             |
304: +-----------------------------------------+----------------------------------------------------------------------------------+
305: | From PropertyGroup `"ADBE Mask Atom`"   | - `"ADBE Mask Shape`", or `"maskShape`", or `"maskPath`"                         |
306: |                                         | - `"ADBE Mask Feather`", or `"maskFeather`"                                      |
307: |                                         | - `"ADBE Mask Opacity`", or `"maskOpacity`"                                      |
308: |                                         | - `"ADBE Mask Offset`", or `"maskOffset"`                                        |
309: +-----------------------------------------+----------------------------------------------------------------------------------+
310: 
311: #### Examples
312: 
313: If a layer named "myLayer" has a Box Blur effect, you can retrieve the effect in any of the following ways:
314: 
315: ```javascript
316: myLayer.property("Effects").property("Box Blur");
317: myLayer.property("Effects").property("boxBlur");
318: myLayer.property("Effects").property("ADBE Box Blur");
319: ```
320: 
321: If a layer named "myLayer" has a mask named "Mask 1" you can retrieve it as follows:
322: 
323: ```javascript
324: myLayer.property("Masks").property("Mask1");
325: ```
326: 
327: To get a Bulge Center value from a Bulge effect, you can use either of the following:
328: 
329: ```javascript
330: myLayer.property("Effects").property("Bulge").property("Bulge Center");
331: myLayer.property("Effects").property("Bulge").property("bulgeCenter");
332: ```
````

## File: docs/official/renderqueue/omcollection.md
````markdown
 1: # OMCollection object
 2: 
 3: `app.project.renderQueue.items.outputModules`
 4: 
 5: #### Description
 6: 
 7: The OMCollection contains all of the output modules in a render queue. The collection provides access to the [OutputModule objects](outputmodule.md), and allows you to create them. The first OutputModule object in the collection is at index position 1.
 8: 
 9: !!! info
10:     OMCollection is a subclass of [Collection object](../other/collection.md). All methods and attributes of Collection are available when working with OMCollection.
11: 
12: ---
13: 
14: ## Methods
15: 
16: ### OMCollection.add()
17: 
18: `app.project.renderQueue.item(1).outputModules.add()`
19: 
20: #### Description
21: 
22: Adds a new Output Module to the Render Queue Item, creating an OutputModule.
23: 
24: #### Returns
25: 
26: [OutputModule object](outputmodule.md).
````

## File: docs/official/renderqueue/outputmodule.md
````markdown
  1: # OutputModule object
  2: 
  3: `app.project.renderQueue.item(index).outputModule(index)`
  4: 
  5: #### Description
  6: 
  7: An OutputModule object of a [RenderQueueItem](renderqueueitem.md) generates a single file or sequence via a render operation, and contains attributes and methods relating to the file to be rendered.
  8: 
  9: ---
 10: 
 11: ## Attributes
 12: 
 13: ### OutputModule.file
 14: 
 15: `app.project.renderQueue.item(index).outputModule(index).file`
 16: 
 17: #### Description
 18: 
 19: The [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) object for the file this output module is set to render.
 20: 
 21: #### Type
 22: 
 23: [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) object; read/write.
 24: 
 25: ---
 26: 
 27: ### OutputModule.includeSourceXMP
 28: 
 29: `app.project.renderQueue.item(index).outputModule(index).includeSourceXMP`
 30: 
 31: #### Description
 32: 
 33: When `true`, writes all source footage XMP metadata to the output file. Corresponds to the Include Source XMP Metadata option in the Output Module Settings dialog box.
 34: 
 35: #### Type
 36: 
 37: Boolean; read/write.
 38: 
 39: ---
 40: 
 41: ### OutputModule.name
 42: 
 43: `app.project.renderQueue.item(index).outputModule(index).name`
 44: 
 45: #### Description
 46: 
 47: The name of the output module, as shown in the user interface.
 48: 
 49: #### Type
 50: 
 51: String; read-only.
 52: 
 53: ---
 54: 
 55: ### OutputModule.postRenderAction
 56: 
 57: `app.project.renderQueue.item(index).outputModule(index).postRenderAction`
 58: 
 59: #### Description
 60: 
 61: An action to be performed when the render operation is completed.
 62: 
 63: #### Type
 64: 
 65: A `PostRenderAction` enumerated value (read/write); one of:
 66: 
 67: - `PostRenderAction.NONE`
 68: - `PostRenderAction.IMPORT`
 69: - `PostRenderAction.IMPORT_AND_REPLACE_USAGE`
 70: - `PostRenderAction.SET_PROXY`
 71: 
 72: ---
 73: 
 74: ### OutputModule.templates
 75: 
 76: `app.project.renderQueue.item(index).outputModule(index).templates`
 77: 
 78: #### Description
 79: 
 80: The names of all output-module templates available in the local installation of After Effects.
 81: 
 82: #### Type
 83: 
 84: Array of strings; read-only.
 85: 
 86: ---
 87: 
 88: ## Methods
 89: 
 90: ### OutputModule.applyTemplate()
 91: 
 92: `app.project.renderQueue.item(index).outputModule(index).applyTemplate(templateName)`
 93: 
 94: #### Description
 95: 
 96: Applies the specified existing output-module template.
 97: 
 98: #### Parameters
 99: 
100: |   Parameter    |  Type  |               Description               |
101: | -------------- | ------ | --------------------------------------- |
102: | `templateName` | String | The name of the template to be applied. |
103: 
104: #### Returns
105: 
106: Nothing.
107: 
108: ---
109: 
110: ### OutputModule.getSetting()
111: 
112: `app.project.renderQueue.item(index).outputModule(index).getSetting()`
113: 
114: !!! note
115:     This functionality was added in After Effects 13.0 (CC 2014)
116: 
117: #### Description
118: 
119: Gets a specific setting for a given Output Module.
120: 
121: - Depreciated Source: [https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva](https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva)
122: - Archived version: [https://web.archive.org/web/20200622100656/https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva](https://web.archive.org/web/20200622100656/https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva)
123: 
124: #### Example
125: 
126: See the example in [RenderQueueItem.getSetting()](renderqueueitem.md#renderqueueitemgetsetting) for structure reference.
127: 
128: ---
129: 
130: ### OutputModule.getSettings()
131: 
132: `app.project.renderQueue.item(index).outputModule(index).getSettings()`
133: 
134: !!! note
135:     This functionality was added in After Effects 13.0 (CC 2014)
136: 
137: #### Description
138: 
139: Gets all settings for a given Output Module.
140: 
141: - Depreciated Source: [https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva](https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva)
142: - Archived version: [https://web.archive.org/web/20200622100656/https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva](https://web.archive.org/web/20200622100656/https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva)
143: 
144: #### Example
145: 
146: ```javascript
147: // Get object that contains the string version of all current output module setting
148: // values of output module item 1 from render queue item 1.
149: // To get the values in the number format, use GetSettingsFormat.NUMBER as an argument.
150: 
151: var omItem1_all_str= app.project.renderQueue.item(1).outputModule(1).getSettings( GetSettingsFormat.STRING );
152: 
153: // Convert to JSON format so that it is human-readable.
154: 
155: var omItem1_all_str_json = omItem1_all_str.toSource();
156: 
157: // Get object that contains string version of settable output module setting values
158: // of output module item 1 from render queue item 1.
159: // If you want to get the values in the number format, use
160: // GetSettingsFormat.NUMBER_SETTABLE as an argument.
161: 
162: var omItem1_settable_str = app.project.renderQueue.item(1).outputModule(1).getSettings( GetSettingsFormat.STRING_SETTABLE );
163: 
164: // Currently, the format setting in the output module is not settable, but it
165: // is readable. The next line will tell you the current format of output module
166: // item 1 from render queue item 1.
167: 
168: var current_format = app.project.renderQueue.item(1).outputModule(1).getSettings(GetSettingsFormat.STRING).Format;
169: 
170: // This line will tell you the output module file info.
171: 
172: var current_omFileTempalte = app.project.renderQueue.item(1).outputModule(1).getSettings(GetSettingsFormat.STRING)["Output File Info"]["File Template"];
173: ```
174: 
175: ---
176: 
177: ### OutputModule.remove()
178: 
179: `app.project.renderQueue.item(index).outputModule(index).remove()`
180: 
181: #### Description
182: 
183: Removes this OutputModule object from the collection.
184: 
185: #### Parameters
186: 
187: None.
188: 
189: #### Returns
190: 
191: Nothing.
192: 
193: ---
194: 
195: ### OutputModule.saveAsTemplate()
196: 
197: `app.project.renderQueue.item(index).outputModule(index).saveAsTemplate(name)`
198: 
199: #### Description
200: 
201: Saves this output module as a template and adds it to the te mpl ate s array.
202: 
203: #### Parameters
204: 
205: | Parameter |  Type  |          Description          |
206: | --------- | ------ | ----------------------------- |
207: | `name`    | String | The name of the new template. |
208: 
209: #### Returns
210: 
211: Nothing.
212: 
213: ---
214: 
215: ### OutputModule.setSetting()
216: 
217: `app.project.renderQueue.item(index).outputModule(index).setSetting()`
218: 
219: !!! note
220:     This functionality was added in After Effects 13.0 (CC 2014)
221: 
222: #### Description
223: 
224: Sets a specific setting for a given Output Module.
225: 
226: - Depreciated Source: [https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva](https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva)
227: - Archived version: [https://web.archive.org/web/20200622100656/https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva](https://web.archive.org/web/20200622100656/https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva)
228: 
229: #### Example
230: 
231: See the example in [RenderQueueItem.setSetting()](renderqueueitem.md#renderqueueitemsetsetting) for structure reference.
232: 
233: ---
234: 
235: ### OutputModule.setSettings()
236: 
237: `app.project.renderQueue.item(index).outputModule(index).setSettings()`
238: 
239: !!! note
240:     This functionality was added in After Effects 13.0 (CC 2014)
241: 
242: #### Description
243: 
244: - Depreciated Source: [https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva](https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva)
245: - Archived version: [https://web.archive.org/web/20200622100656/https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva](https://web.archive.org/web/20200622100656/https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva)
246: 
247: !!! warning
248:     There is a bug that causes OutputModule object to be invalidated after the output module setting is modified, so you need to retrieve the Output Module again after you modify it.
249: 
250: #### Examples
251: 
252: Get the settings from one item's output module and use them on another:
253: 
254: ```javascript
255: // If you want to get the values in the number format, use
256: // GetSettingsFormat.NUMBER_SETTABLE as an argument.
257: 
258: var omItem1_settable_str = app.project.renderQueue.item(1).outputModule(1).getSettings( GetSettingsFormat.STRING_SETTABLE );
259: 
260: // Set output module item 1 of render queue item 2 with values that you get from
261: // output module 1 of render queue item 1
262: 
263: app.project.renderQueue.item(2).outputModule(1).setSettings( omItem1_settable_str );
264: ```
265: 
266: Set output module item 1 of render queue item 3 with values that you create:
267: 
268: ```javascript
269: var crop_data = {
270:     "Crop":        true,
271:     "Crop Bottom": 0,
272:     "Crop Left":   0,
273:     "Crop Right":  8,
274:     "Crop Top":    10
275: };
276: 
277: app.project.renderQueue.item(1).outputModule(3).setSettings( crop_data );
278: ```
279: 
280: Route the output file to the user directory:
281: 
282: ```javascript
283: var om1 = app.project.renderQueue.item(1).outputModule(1);
284: var file_name = File.decode( om1.file.name ); // Name contains special character, space?
285: var new_dir = new Folder( "~/new_output" );
286: var new_path = new_dir.fsName;
287: 
288: var new_data = {
289:     "Output File Info": {
290:         "Base Path":      new_path,
291:         "Subfolder Path": "draft",
292:         "File Name":      file_name
293:     }
294: };
295: 
296: om1.setSettings( new_data );
297: ```
298: 
299: In this example, the output file is routed to the user directory, but this time using the full path:
300: 
301: ```javascript
302: var om1 = app.project.renderQueue.item(1).outputModule(1);
303: 
304: // Name contains special character, such as space?
305: var file_name = File.decode( om1.file.name );
306: var new_path = "/Users/myAccount/new_output";
307: var separator = "/";
308: 
309: if ($.os.indexOf("Mac") == -1) {
310:     new_path = "C:\Users\myAccount\new_output";
311:     separator = "\\";
312: }
313: 
314: var new_data = {
315:     "Output File Info": {
316:         "Full Flat Path": new_path + separator + file_name
317:     }
318: };
319: 
320: om1.setSettings( new_data );
321: ```
````

## File: docs/official/renderqueue/renderqueue.md
````markdown
  1: # RenderQueue object
  2: 
  3: `app.project.renderQueue`
  4: 
  5: #### Description
  6: 
  7: The RenderQueue object represents the render automation process, the data and functionality that is available through the Render Queue panel of a particular After Effects project. Attributes provide access to items in the render queue and their render status. Methods can start, pause, and stop the rendering process. The [RenderQueueItem object](renderqueueitem.md) provides access to the specific settings for an item to be rendered.
  8: 
  9: ---
 10: 
 11: ## Attributes
 12: 
 13: ### RenderQueue.canQueueInAME
 14: 
 15: `app.project.renderQueue.canQueueInAME`
 16: 
 17: !!! note
 18:     This functionality was added in After Effects 14.0 (CC 2017)
 19: 
 20: #### Description
 21: 
 22: indicates whether or not there are queued render items in the After Effects render queue. Only queued items can be added to the AME queue.
 23: 
 24: [RenderQueue.queueInAME()](#renderqueuequeueiname)
 25: 
 26: #### Type
 27: 
 28: Boolean; read-only.
 29: 
 30: ---
 31: 
 32: ### RenderQueue.queueNotify
 33: 
 34: `app.project.renderQueue.queueNotify`
 35: 
 36: !!! note
 37:     This functionality was added in After Effects 22.0 (2022)
 38: 
 39: #### Description
 40: 
 41: Read or write the **Notify** property for the entire Render Queue.
 42: This is exposed in the UI as a checkbox in the lower right corner of the Render Queue panel.
 43: 
 44: #### Type
 45: 
 46: Boolean; read/write.
 47: 
 48: ---
 49: 
 50: ### RenderQueue.items
 51: 
 52: `app.project.renderQueue.items`
 53: 
 54: #### Description
 55: 
 56: A collection of all items in the render queue. See [RenderQueueItem object](renderqueueitem.md).
 57: 
 58: #### Type
 59: 
 60: [RQItemCollection object](rqitemcollection.md); read-only.
 61: 
 62: ---
 63: 
 64: ### RenderQueue.numItems
 65: 
 66: `app.project.renderQueue.numItems`
 67: 
 68: #### Description
 69: 
 70: The total number of items in the render queue.
 71: 
 72: #### Type
 73: 
 74: Integer; read-only.
 75: 
 76: ---
 77: 
 78: ### RenderQueue.rendering
 79: 
 80: `app.project.renderQueue.rendering`
 81: 
 82: #### Description
 83: 
 84: When `true`, the rendering process is in progress or paused. When `false`, it is stopped.
 85: 
 86: #### Type
 87: 
 88: Boolean; read-only.
 89: 
 90: ---
 91: 
 92: ## Methods
 93: 
 94: ### RenderQueue.item()
 95: 
 96: `app.project.renderQueue.item(index)`
 97: 
 98: #### Description
 99: 
100: Gets a specified item from the ite ms collection.
101: 
102: #### Parameters
103: 
104: | Parameter |                 Type                  |           Description           |
105: | --------- | ------------------------------------- | ------------------------------- |
106: | `index`   | Integer, in the range `[0..numItems]` | The position index of the item. |
107: 
108: #### Returns
109: 
110: [RenderQueueItem object](renderqueueitem.md).
111: 
112: ---
113: 
114: ### RenderQueue.pauseRendering()
115: 
116: `app.project.renderQueue.pauseRendering(pause)`
117: 
118: #### Description
119: 
120: Pauses the current rendering process, or continues a paused rendering process. This is the same as clicking Pause in the Render Queue panel during a render. You can call this method from an [RenderQueueItem.onstatus](renderqueueitem.md#renderqueueitemonstatus) or [app.onError](../general/application.md#apponerror) callback.
121: 
122: #### Parameters
123: 
124: | Parameter |  Type   |                                  Description                                   |
125: | --------- | ------- | ------------------------------------------------------------------------------ |
126: | `pause`   | Boolean | `true` to pause a current render process, `false` to continue a paused render. |
127: 
128: #### Returns
129: 
130: Nothing.
131: 
132: ---
133: 
134: ### RenderQueue.render()
135: 
136: `app.project.renderQueue.render()`
137: 
138: #### Description
139: 
140: Starts the rendering process. This is the same as clicking Render in the Render Queue panel. The method does not return until the render process is complete. To pause or stop the rendering process, call [RenderQueue.pauseRendering()](#renderqueuepauserendering) or [RenderQueue.stopRendering()](#renderqueuestoprendering) from an `onError` or `onstatus` callback.
141: 
142: - To respond to errors during the rendering process, define a callback function in [app.onError](../general/application.md#apponerror).
143: - To respond to changes in the status of a particular item while the render is progressing, define a callback function in [RenderQueueItem.onstatus](renderqueueitem.md#renderqueueitemonstatus) in the associated RenderQueueItem object.
144: 
145: #### Parameters
146: 
147: None.
148: 
149: #### Returns
150: 
151: Nothing.
152: 
153: ---
154: 
155: ### RenderQueue.showWindow()
156: 
157: `app.project.renderQueue.showWindow(doShow)`
158: 
159: #### Description
160: 
161: Shows or hides the Render Queue panel.
162: 
163: #### Parameters
164: 
165: | Parameter |  Type   |                           Description                            |
166: | --------- | ------- | ---------------------------------------------------------------- |
167: | `doShow`  | Boolean | When `true`, show the Render Queue panel. When `false`, hide it. |
168: 
169: #### Returns
170: 
171: Nothing.
172: 
173: ---
174: 
175: ### RenderQueue.stopRendering()
176: 
177: `app.project.renderQueue.stopRendering()`
178: 
179: #### Description
180: 
181: Stops the rendering process. This is the same as clicking Stop in the Render Queue panel during a render. You can call this method from an [RenderQueueItem.onstatus](renderqueueitem.md#renderqueueitemonstatus) or [app.onError](../general/application.md#apponerror) callback.
182: 
183: #### Parameters
184: 
185: None.
186: 
187: #### Returns
188: 
189: Nothing.
190: 
191: ---
192: 
193: ### RenderQueue.queueInAME()
194: 
195: `app.project.renderQueue.queueInAME(render_immediately_in_AME)`
196: 
197: !!! note
198:     This functionality was added in After Effects 14.0 (CC 2017)
199: 
200: #### Description
201: 
202: Calls the Queue In AME command. This method requires passing a boolean value, telling AME whether to only queue the render items (`false`) or if AME should also start processing its queue (`true`).
203: 
204: !!! note
205:     This requires Adobe Media Encoder CC 2017 (11.0) or later.
206: 
207: !!! tip
208:     When AME receives the queued items, it applies the most recently used encoding preset. If `render_immediately_in_AME` is set to `true`, you will not have an opportunity to change the encoding settings.
209: 
210: #### Parameters
211: 
212: |          Parameter          |  Type   |                                                       Description                                                       |
213: | --------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
214: | `render_immediately_in_AME` | Boolean | Telling AME whether to only queue the render items (`false`) or if AME should also start processing its queue (`true`). |
215: 
216: #### Returns
217: 
218: Nothing.
219: 
220: #### Example
221: 
222: The following sample code checks to see if there are queued items in the render queue, and if so queues them in AME but does not immediately start rendering:
223: 
224: ```javascript
225: // Scripting support for Queue in AME.
226: // Requires Adobe Media Encoder 11.0.
227: if (app.project.renderQueue.canQueueInAME === true) {
228:     // Send queued items to AME, but do not start rendering.
229:     app.project.renderQueue.queueInAME(false);
230: } else {
231:     alert("There are no queued item in the Render Queue.");
232: }
233: ```
````

## File: docs/official/renderqueue/renderqueueitem.md
````markdown
  1: # RenderQueueItem object
  2: 
  3: `app.project.renderQueue.item(index)`
  4: 
  5: #### Description
  6: 
  7: The RenderQueueItem object represents an individual item in the render queue. It provides access to the specific settings for an item to be rendered. Create the object by adding a composition to the Render Queue with the [RQItemCollection object](rqitemcollection.md); see [RQItemCollection.add()](rqitemcollection.md#rqitemcollectionadd).
  8: 
  9: ---
 10: 
 11: ## Attributes
 12: 
 13: ### RenderQueueItem.comp
 14: 
 15: `app.project.renderQueue.item(index).comp`
 16: 
 17: #### Description
 18: 
 19: The composition that will be rendered by this render-queue item. To change the composition, you must delete this render-queue item and create a new one.
 20: 
 21: #### Type
 22: 
 23: [CompItem object](../item/compitem.md); read-only.
 24: 
 25: ---
 26: 
 27: ### RenderQueueItem.elapsedSeconds
 28: 
 29: `app.project.renderQueue.item(index).elapsedSeconds`
 30: 
 31: #### Description
 32: 
 33: The number of seconds spent rendering this item.
 34: 
 35: #### Type
 36: 
 37: Integer, or `null` if item has not been rendered; read-only.
 38: 
 39: ---
 40: 
 41: ### RenderQueueItem.logType
 42: 
 43: `app.project.renderQueue.item(index).logType`
 44: 
 45: #### Description
 46: 
 47: A log type for this item, indicating which events should be logged while this item is being rendered.
 48: 
 49: #### Type
 50: 
 51: A `LogType` enumerated value; (read/write). One of:
 52: 
 53: - `LogType.ERRORS_ONLY`
 54: - `LogType.ERRORS_AND_SETTINGS`
 55: - `LogType.ERRORS_AND_PER_FRAME_INFO`
 56: 
 57: ---
 58: 
 59: ### RenderQueueItem.numOutputModules
 60: 
 61: `app.project.renderQueue.item(index).numOutputModules`
 62: 
 63: #### Description
 64: 
 65: The total number of Output Modules assigned to this item.
 66: 
 67: #### Type
 68: 
 69: Integer; read-only.
 70: 
 71: ---
 72: 
 73: ### RenderQueueItem.onStatusChanged
 74: 
 75: `app.project.renderQueue.item(index).onStatusChanged`
 76: 
 77: #### Description
 78: 
 79: The name of a callback function that is called whenever the value of the [RenderQueueItem.status](#renderqueueitemstatus) attribute changes.
 80: 
 81: You cannot make changes to render queue items or to the application while rendering is in progress or paused; you can, however, use this callback to pause or stop the rendering process. See [RenderQueue.pauseRendering()](renderqueue.md#renderqueuepauserendering) and [RenderQueue.stopRendering()](renderqueue.md#renderqueuestoprendering). See also [app.onError](../general/application.md#apponerror).
 82: 
 83: #### Type
 84: 
 85: A function name string, or `null` if no function is assigned.
 86: 
 87: #### Example
 88: 
 89: ```javascript
 90: function myStatusChanged() {
 91:     alert(app.project.renderQueue.item(1).status);
 92: }
 93: 
 94: app.project.renderQueue.item(1).onStatusChanged = myStatusChanged;
 95: app.project.renderQueue.item(1).render = false; // changes status and shows dialog
 96: ```
 97: 
 98: ---
 99: 
100: ### RenderQueueItem.outputModules
101: 
102: `app.project.renderQueue.item(index).outputModules`
103: 
104: #### Description
105: 
106: The collection of Output Modules for the item.
107: 
108: #### Type
109: 
110: [OMCollection object](omcollection.md); read-only.
111: 
112: ---
113: 
114: ### RenderQueueItem.queueItemNotify
115: 
116: `app.project.renderQueue.item(index).queueItemNotify`
117: 
118: !!! note
119:     This functionality was added in After Effects 22.0 (2022)
120: 
121: #### Description
122: 
123: Scripts can read and write the **Notify** checkbox for each individual item in the Render Queue. This is exposed in the UI as a checkbox next to each Render Queue item in the Notify column.
124: 
125: This column is hidden by default and may need to be selected to be visible by right clicking on the Render Queue column headers and choosing Notify.
126: 
127: #### Type
128: 
129: Boolean; read/write.
130: 
131: ---
132: 
133: ### RenderQueueItem.render
134: 
135: `app.project.renderQueue.item(index).render`
136: 
137: #### Description
138: 
139: When `true`, the item will be rendered when the render queue is started. When set to `true`, the [RenderQueueItem.status](#renderqueueitemstatus) is set to `RQItemStatus.QUEUED`. When set to `false`, `status` is set to
140: `RQItemStatus.UNQUEUED`.
141: 
142: #### Type
143: 
144: Boolean; read/write.
145: 
146: ---
147: 
148: ### RenderQueueItem.skipFrames
149: 
150: `app.project.renderQueue.item(index).skipFrames`
151: 
152: #### Description
153: 
154: The number of frames to skip when rendering this item. Use this to do rendering tests that are faster than a full render. A value of 0 skip no frames, and results in regular rendering of all frames. A value of 1 skips every other frame. This is equivalent to "rendering on twos." Higher values skip a larger number of frames. The total length of time remains unchanged. For example, if skip has a value of 1, a sequence output would have half the number of frames and in movie output, each frame would be double the duration.
155: 
156: #### Type
157: 
158: Integer, in the range `[0..99]`; read/write.
159: 
160: ---
161: 
162: ### RenderQueueItem.startTime
163: 
164: `app.project.renderQueue.item(index).startTime`
165: 
166: #### Description
167: 
168: The day and time that this item started rendering.
169: 
170: #### Type
171: 
172: Date object, or `null` if the item has not started rendering; read-only.
173: 
174: ---
175: 
176: ### RenderQueueItem.status
177: 
178: `app.project.renderQueue.item(index).status`
179: 
180: #### Description
181: 
182: The current render status of the item.
183: 
184: #### Type
185: 
186: An `RQItemStatus` enumerated value; read-only. One of:
187: 
188: - `RQItemStatus.WILL_CONTINUE`: Rendering process has been paused.
189: - `RQItemStatus.NEEDS_OUTPUT`: Item lacks a valid output path.
190: - `RQItemStatus.UNQUEUED`: Item is listed in the Render Queue panel but composition is not ready to render.
191: - `RQItemStatus.QUEUED`: Composition is ready to render.
192: - `RQItemStatus.RENDERING`: Composition is rendering
193: - `RQItemStatus.USER_STOPPED`: Rendering process was stopped by user or script.
194: - `RQItemStatus.ERR_STOPPED`: Rendering process was stopped due to an error.
195: - `RQItemStatus.DONE`: Rendering process for the item is complete.
196: 
197: ---
198: 
199: ### RenderQueueItem.templates
200: 
201: `app.project.renderQueue.item(index).templates`
202: 
203: #### Description
204: 
205: The names of all Render Settings templates available for the item. See also [RenderQueueItem.saveAsTemplate()](#renderqueueitemsaveastemplate).
206: 
207: #### Type
208: 
209: Array of strings; read-only.
210: 
211: ---
212: 
213: ### RenderQueueItem.timeSpanDuration
214: 
215: `app.project.renderQueue.item(index).timeSpanDuration`
216: 
217: #### Description
218: 
219: The duration in seconds of the composition to be rendered. The duration is determined by subtracting the start time from the end time. Setting this value is the same as setting a custom end time in the Render Settings dialog box.
220: 
221: #### Type
222: 
223: Floating-point value; read/write.
224: 
225: ---
226: 
227: ### RenderQueueItem.timeSpanStart
228: 
229: `app.project.renderQueue.item(index).timeSpanStart`
230: 
231: #### Description
232: 
233: The time in the composition, in seconds, at which rendering will begin. Setting this value is the same as setting a custom start time in the Render Settings dialog box.
234: 
235: #### Type
236: 
237: Floating-point value; read/write.
238: 
239: ---
240: 
241: ## Methods
242: 
243: ### RenderQueueItem.applyTemplate()
244: 
245: `app.project.renderQueue.item(index).applyTemplate(templateName)`
246: 
247: #### Description
248: 
249: Applies a Render Settings template to the item. See also [RenderQueueItem.saveAsTemplate()](#renderqueueitemsaveastemplate) and [RenderQueueItem.templates](#renderqueueitemtemplates).
250: 
251: #### Parameters
252: 
253: |   Parameter    |  Type  |            Description             |
254: | -------------- | ------ | ---------------------------------- |
255: | `templateName` | String | The name of the template to apply. |
256: 
257: #### Returns
258: 
259: Nothing.
260: 
261: ---
262: 
263: ### RenderQueueItem.duplicate()
264: 
265: `app.project.renderQueue.item(index).duplicate()`
266: 
267: #### Description
268: 
269: Creates a duplicate of this item and adds it this render queue.
270: 
271: !!! tip
272:     Duplicating an item whose status is "Done" sets the new item's status to "Queued".
273: 
274: #### Parameters
275: 
276: None.
277: 
278: #### Returns
279: 
280: RenderQueueItem object.
281: 
282: ---
283: 
284: ### RenderQueueItem.getSetting()
285: 
286: `app.project.renderQueue.item(index).getSetting()`
287: 
288: !!! note
289:     This functionality was added in After Effects 13.0 (CC 2014)
290: 
291: #### Description
292: 
293: Gets a specific Render Queue Item setting.
294: 
295: - Depreciated Source: [https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva](https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva)
296: - Archived version: [https://web.archive.org/web/20200622100656/https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva](https://web.archive.org/web/20200622100656/https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva)
297: 
298: #### Example
299: 
300: ```javascript
301: // Get current value of render setting's "Proxy Use"
302: // Key and value strings are English.
303: var rqItem1_proxyUse = app.project.renderQueue.item(1).getSetting("Proxy Use");
304: 
305: // Get string version of same setting, add "-str" at the end of key string
306: var rqItem1_proxyUse_str = app.project.renderQueue.item(1).getSetting("Proxy Use-str");
307: ```
308: 
309: ---
310: 
311: ### RenderQueueItem.getSettings()
312: 
313: `app.project.renderQueue.item(index).getSettings()`
314: 
315: !!! note
316:     This functionality was added in After Effects 13.0 (CC 2014)
317: 
318: #### Description
319: 
320: Gets all settings for a given Render Queue Item.
321: 
322: - Depreciated Source: [https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva](https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva)
323: - Archived version: [https://web.archive.org/web/20200622100656/https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva](https://web.archive.org/web/20200622100656/https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva)
324: 
325: #### Example
326: 
327: ```javascript
328: // Get object that contains all possible values of all render settings of
329: // render queue item 1 and convert to JSON format.
330: 
331: var rqItem1_spec_str = app.project.renderQueue.item(1).getSettings(GetSettingsFormat.SPEC);
332: var rqItem1_spec_str_json = rqItem1_spec_str.toSource();
333: ```
334: 
335: ---
336: 
337: ### RenderQueueItem.outputModule()
338: 
339: `app.project.renderQueue.item(index).outputModule(index)`
340: 
341: #### Description
342: 
343: Gets an output module with the specified index position.
344: 
345: #### Parameters
346: 
347: | Parameter |                     Type                      |               Description                |
348: | --------- | --------------------------------------------- | ---------------------------------------- |
349: | `index`   | Integer, in the range `[1..numOutputModules]` | The position index of the output module. |
350: 
351: #### Returns
352: 
353: OutputModule object.
354: 
355: ---
356: 
357: ### RenderQueueItem.remove()
358: 
359: `app.project.renderQueue.item(index).remove()`
360: 
361: #### Description
362: 
363: Removes this item from the render queue.
364: 
365: #### Parameters
366: 
367: None.
368: 
369: #### Returns
370: 
371: Nothing.
372: 
373: ---
374: 
375: ### RenderQueueItem.saveAsTemplate()
376: 
377: `app.project.renderQueue.item(index).saveAsTemplate(name)`
378: 
379: #### Description
380: 
381: Saves the item's current render settings as a new template with the specified name.
382: 
383: #### Parameters
384: 
385: | Parameter |  Type  |          Description          |
386: | --------- | ------ | ----------------------------- |
387: | `name`    | String | The name of the new template. |
388: 
389: 
390: #### Returns
391: 
392: Nothing.
393: 
394: ---
395: 
396: ### RenderQueueItem.setSetting()
397: 
398: `app.project.renderQueue.item(index).setSetting()`
399: 
400: !!! note
401:     This functionality was added in After Effects 13.0 (CC 2014)
402: 
403: #### Description
404: 
405: Sets a specific setting for a given Render Queue Item.
406: 
407: Depreciated Source: [https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva](https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva)
408: 
409: Archived version: [https://web.archive.org/web/20200622100656/https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva](https://web.archive.org/web/20200622100656/https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva)
410: 
411: #### Example
412: 
413: ```javascript
414: // Set value of "Proxy Use" to "Use All Proxies"
415: 
416: app.project.renderQueue.item(1).setSetting("Proxy Use", "Use All Proxies");
417: 
418: // You can use numbers, too.
419: // The next line does the same as the previous example.
420: 
421: app.project.renderQueue.item(1).setSetting("Proxy Use", 1);
422: ```
423: 
424: ---
425: 
426: ### RenderQueueItem.setSettings()
427: 
428: `app.project.renderQueue.item(index).setSettings()`
429: 
430: !!! note
431:     This functionality was added in After Effects 13.0 (CC 2014)
432: 
433: #### Description
434: 
435: Sets a multiple settings for a given Render Queue Item.
436: 
437: - Depreciated Source: [https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva](https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva)
438: - Archived version: [https://web.archive.org/web/20200622100656/https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva](https://web.archive.org/web/20200622100656/https://blogs.adobe.com/creativecloud/new-changed-after-effects-cc-2014/?segment=dva)
439: 
440: #### Example
441: 
442: ```javascript
443: // Get an object that contains string version of settable render setting
444: // values of render queue item 1.
445: // To get the values in the number format, use
446: // GetSettingsFormat.NUMBER_SETTABLE as an argument.
447: 
448: var rqItem1_settable_str = app.project.renderQueue.item(1).getSettings( GetSettingsFormat.STRING_SETTABLE );
449: 
450: // Set render queue item 2 with values that you got from render
451: //queue item 1.
452: 
453: app.project.renderQueue.item(2).setSettings( rqItem1_settable_str );
454: 
455: // Set render queue item 3 with values you create.
456: 
457: var my_renderSettings = {
458:     "Color Depth":        "32 bits per channel",
459:     "Quality":            "Best",
460:     "Effects":            "All On",
461:     "Time Span Duration": "1.0",
462:     "Time Span Start":    "2.0"
463: };
464: 
465: app.project.renderQueue.item(2).setSettings( my_renderSettings );
466: ```
````

## File: docs/official/renderqueue/rqitemcollection.md
````markdown
 1: # RQItemCollection object
 2: 
 3: `app.project.renderQueue.items`
 4: 
 5: #### Description
 6: 
 7: The RQItemCollection contains all of the render-queue items in a project, as shown in the Render Queue panel of the project. The collection provides access to the [RenderQueueItem objects](renderqueueitem.md), and allows you to create them from compositions. The first RenderQueueItem object in the collection is at index position 1.
 8: 
 9: !!! info
10:     RQItemCollection is a subclass of [Collection object](../other/collection.md). All methods and attributes of Collection are available when working with RQItemCollection.
11: 
12: ---
13: 
14: ## Methods
15: 
16: ### RQItemCollection.add()
17: 
18: `app.project.renderQueue.items.add(comp)`
19: 
20: #### Description
21: 
22: Adds a composition to the Render Queue, creating a RenderQueueItem.
23: 
24: #### Parameters
25: 
26: | Parameter |                  Type                   |         Description          |
27: | --------- | --------------------------------------- | ---------------------------- |
28: | `comp`    | [CompItem object](../item/compitem.md) | The composition to be added. |
29: 
30: #### Returns
31: 
32: [RenderQueueItem object](renderqueueitem.md).
````

## File: docs/official/sources/filesource.md
````markdown
 1: # FileSource object
 2: 
 3: `app.project.item(index).mainSource`
 4: 
 5: `app.project.item(index).proxySource`
 6: 
 7: 
 8: #### Description
 9: 
10: The FileSource object describes footage that comes from a file.
11: 
12: !!! info
13:     FileSource is a subclass of [FootageSource object](footagesource.md). All methods and attributes of FootageSource, in addition to those listed below, are available when working with FileSource.
14: 
15: ---
16: 
17: ## Attributes
18: 
19: ### FileSource.file
20: 
21: `app.project.item(index).mainSource.file`
22: 
23: `app.project.item(index).proxySource.file`
24: 
25: 
26: #### Description
27: 
28: The [Extendscript File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) object for the file that defines this asset. To change the value:
29: 
30: - If this FileSource is a [proxySource](../item/avitem.md#avitemproxysource) of an [AVItem](../item/avitem.md), call [setProxy()](../item/avitem.md#avitemsetproxy) or [setProxyWithSequence()](../item/avitem.md#avitemsetproxywithsequence).
31: - If this FileSource is a [mainSource](../item/footageitem.md#footageitemmainsource) of a [FootageItem](../item/footageitem.md), call [replace()](../item/footageitem.md#footageitemreplace) or [replaceWithSequence()](../item/footageitem.md#footageitemreplacewithsequence).
32: 
33: #### Type
34: 
35: [File](https://extendscript.docsforadobe.dev/file-system-access/file-object.html) object; read-only.
36: 
37: ---
38: 
39: ### FileSource.missingFootagePath
40: 
41: `app.project.item(index).mainSource.missingFootagePath`
42: 
43: `app.project.item(index).proxySource.missingFootagePath`
44: 
45: 
46: #### Description
47: 
48: The path and filename of footage that is missing from this asset. See also [AVItem.footageMissing](../item/avitem.md#avitemfootagemissing).
49: 
50: #### Type
51: 
52: String; read-only.
53: 
54: ---
55: 
56: ## Methods
57: 
58: ### FileSource.reload()
59: 
60: `app.project.item(index).mainSource.reload()`
61: 
62: #### Description
63: 
64: Reloads the asset from the file. This method can be called only on a `mainSource`, not a `proxySource`.
65: 
66: #### Parameters
67: 
68: None.
69: 
70: #### Returns
71: 
72: Nothing.
````

## File: docs/official/sources/footagesource.md
````markdown
  1: # FootageSource object
  2: 
  3: `app.project.item(index).mainSource`
  4: 
  5: `app.project.item(index).proxySource`
  6: 
  7: 
  8: #### Description
  9: 
 10: The FootageSource object holds information describing the source of some footage. It is used as the `mainSource` of a [FootageItem object](../item/footageitem.md), or the `proxySource` of a [CompItem object](../item/compitem.md) or FootageItem.
 11: 
 12: !!! info
 13:     FootageSource is the base class for [SolidSource object](solidsource.md), so FootageSource attributes and methods are available when working with SolidSource objects.
 14: 
 15: ---
 16: 
 17: ## Attributes
 18: 
 19: ### FootageSource.alphaMode
 20: 
 21: `app.project.item(index).mainSource.alphaMode`
 22: 
 23: `app.project.item(index).proxySource.alphaMode`
 24: 
 25: 
 26: #### Description
 27: 
 28: Defines how the alpha information in the footage is interpreted. If `hasAlpha` is `false`, this attribute has no relevant meaning.
 29: 
 30: #### Type
 31: 
 32: An Alpha Mode enumerated value; (read/write). One of:
 33: 
 34: - `AlphaMode.IGNORE`
 35: - `AlphaMode.STRAIGHT`
 36: - `AlphaMode.PREMULTIPLIED`
 37: 
 38: ---
 39: 
 40: ### FootageSource.conformFrameRate
 41: 
 42: `app.project.item(index).mainSource.conformFrameRate`
 43: 
 44: `app.project.item(index).proxySource.conformFrameRate`
 45: 
 46: 
 47: #### Description
 48: 
 49: A frame rate to use instead of the `nativeFrameRate` value. If set to 0, the `nativeFrameRate` is used instead. It is an error to set this value if [FootageSource.isStill](#footagesourceisstill) is `true`. It is an error to set this value to 0 if [removePulldown](#footagesourceremovepulldown) is not set to `PulldownPhase.OFF`. If this is 0 when you set `removePulldown` to a value other than `PulldownPhase.OFF`, then this is automatically set to the value of `nativeFrameRate`.
 50: 
 51: #### Type
 52: 
 53: Floating-point value, in the range `[0.0..99.0]`; read/write.
 54: 
 55: ---
 56: 
 57: ### FootageSource.displayFrameRate
 58: 
 59: `app.project.item(index).mainSource.displayFrameRate`
 60: 
 61: `app.project.item(index).proxySource.displayFrameRate`
 62: 
 63: 
 64: #### Description
 65: 
 66: The effective frame rate as displayed and rendered in compositions by After Effects. If [removePulldown](#footagesourceremovepulldown) is `PulldownPhase.OFF`, then this is the same as the `conformFrameRate` (if non-zero) or the `nativeFrameRate` (if `conformFrameRate` is 0). If `removePulldown` is not `PulldownPhase.OFF`, this is `conformFrameRate * 0.8`, the effective frame rate after removing 1 of every 5 frames.
 67: 
 68: #### Type
 69: 
 70: Floating-point value, in the range `[0.0..99.0]`; read-only.
 71: 
 72: ---
 73: 
 74: ### FootageSource.fieldSeparationType
 75: 
 76: `app.project.item(index).mainSource.fieldSeparationType`
 77: 
 78: `app.project.item(index).proxySource.fieldSeparationType`
 79: 
 80: 
 81: #### Description
 82: 
 83: How the fields are to be separated in non-still footage. It is an error to set this attribute if `isStill` is `true`. It is an error to set this value to `FieldSeparationType.OFF` if [removePulldown](#footagesourceremovepulldown) is not `PulldownPhase.OFF`.
 84: 
 85: #### Type
 86: 
 87: A `FieldSeparationType` enumerated value; read/write. One of:
 88: 
 89: - `FieldSeparationType.OFF`
 90: - `FieldSeparationType.UPPER_FIELD_FIRST`
 91: - `FieldSeparationType.LOWER_FIELD_FIRST`
 92: 
 93: ---
 94: 
 95: ### FootageSource.hasAlpha
 96: 
 97: `app.project.item(index).mainSource.hasAlpha`
 98: 
 99: `app.project.item(index).proxySource.hasAlpha`
100: 
101: 
102: #### Description
103: 
104: When `true`, the footage has an alpha component. In this case, the attributes `alphaMode`, `invertAlpha`, and `premulColor` have valid values. When `false`, those attributes have no relevant meaning for the footage.
105: 
106: #### Type
107: 
108: Boolean; read-only.
109: 
110: ---
111: 
112: ### FootageSource.highQualityFieldSeparation
113: 
114: `app.project.item(index).mainSource.highQualityFieldSeparation`
115: 
116: `app.project.item(index).proxySource.highQualityFieldSeparation`
117: 
118: 
119: #### Description
120: 
121: When `true`, After Effects uses special algorithms to determine how to perform high-quality field separation. It is an error to set this attribute if `isStill` is `true`, or if `fieldSeparationType` is `FieldSeparationType.OFF`.
122: 
123: #### Type
124: 
125: Boolean; read/write.
126: 
127: ---
128: 
129: ### FootageSource.invertAlpha
130: 
131: `app.project.item(index).mainSource.invertAlpha`
132: 
133: `app.project.item(index).proxySource.invertAlpha`
134: 
135: 
136: #### Description
137: 
138: When `true`, an alpha channel in a footage clip or proxy should be inverted. This attribute is valid only if an alpha is present. If `hasAlpha` is `false`, or if `alphaMode` is `AlphaMode.IGNORE`, this attribute is ignored.
139: 
140: #### Type
141: 
142: Boolean; read/write.
143: 
144: ---
145: 
146: ### FootageSource.isStill
147: 
148: `app.project.item(index).mainSource.isStill`
149: 
150: `app.project.item(index).proxySource.isStill`
151: 
152: 
153: #### Description
154: 
155: When `true` the footage is still; When `false`, it has a time-based component. Examples of still footage are JPEG files, solids, and placeholders with a duration of 0. Examples of non-still footage are movie files, sound files, sequences, and placeholders of non-zero duration.
156: 
157: #### Type
158: 
159: Boolean; read-only.
160: 
161: ---
162: 
163: ### FootageSource.loop
164: 
165: `app.project.item(index).mainSource.loop`
166: 
167: `app.project.item(index).proxySource.loop`
168: 
169: 
170: #### Description
171: 
172: The number of times that the footage is to be played consecutively when used in a composition. It is an error to set this attribute if `isStill` is `true`.
173: 
174: #### Type
175: 
176: Integer, in the range `[1..9999]`; default is 1; read/write.
177: 
178: ---
179: 
180: ### FootageSource.nativeFrameRate
181: 
182: `app.project.item(index).mainSource.nativeFrameRate`
183: 
184: `app.project.item(index).proxySource.nativeFrameRate`
185: 
186: 
187: #### Description
188: 
189: The native frame rate of the footage.
190: 
191: #### Type
192: 
193: Floating-point value; read-only.
194: 
195: ---
196: 
197: ### FootageSource.premulColor
198: 
199: `app.project.item(index).mainSource.premulColor`
200: 
201: `app.project.item(index).proxySource.premulColor`
202: 
203: 
204: #### Description
205: 
206: The color to be premultiplied. This attribute is valid only if the `alphaMode` is `alphaMode.PREMULTIPLIED`.
207: 
208: #### Type
209: 
210: Array of three floating-point values, `[R, G, B]`, in the range `[0.0..1.0]`; read/write.
211: 
212: ---
213: 
214: ### FootageSource.removePulldown
215: 
216: `app.project.item(index).mainSource.removePulldown`
217: 
218: `app.project.item(index).proxySource.removePulldown`
219: 
220: 
221: #### Description
222: 
223: How the pulldowns are to be removed when field separation is used. It is an error to set this attribute if `isStill` is `true`. It is an error to attempt to set this to a value other than `PulldownPhase.OFF` in the case where `fieldSeparationType` is `FieldSeparationType.OFF`.
224: 
225: #### Type
226: 
227: A `PulldownPhase` enumerated value; read/write. One of:
228: 
229: - `PulldownPhase.RemovePulldown.OFF`
230: - `PulldownPhase.RemovePulldown.WSSWW`
231: - `PulldownPhase.RemovePulldown.SSWWW`
232: - `PulldownPhase.RemovePulldown.SWWWS`
233: - `PulldownPhase.RemovePulldown.WWWSS`
234: - `PulldownPhase.RemovePulldown.WWSSW`
235: - `PulldownPhase.RemovePulldown.WSSWW_24P_ADVANCE`
236: - `PulldownPhase.RemovePulldown.SSWWW_24P_ADVANCE`
237: - `PulldownPhase.RemovePulldown.SWWWS_24P_ADVANCE`
238: - `PulldownPhase.RemovePulldown.WWWSS_24P_ADVANCE`
239: - `PulldownPhase.RemovePulldown.WWSSW_24P_ADVANCE`
240: 
241: ---
242: 
243: ## Methods
244: 
245: ### FootageSource.guessAlphaMode()
246: 
247: `app.project.item(index).mainSource.guessAlphaMode()`
248: 
249: `app.project.item(index).proxySource.guessAlphaMode()`
250: 
251: 
252: #### Description
253: 
254: Sets `alphaMode`, `premulColor`, and `invertAlpha` to the best estimates for this footage source. If `hasAlpha` is `false`, no change is made.
255: 
256: #### Parameters
257: 
258: None.
259: 
260: #### Returns
261: 
262: Nothing.
263: 
264: ---
265: 
266: ### FootageSource.guessPulldown()
267: 
268: `app.project.item(index).mainSource.guessPulldown(method)`
269: 
270: `app.project.item(index).proxySource.guessPulldown(method)`
271: 
272: 
273: #### Description
274: 
275: Sets `fieldSeparationType` and [removePulldown](#footagesourceremovepulldown) to the best estimates for this footage source. If `isStill` is `true`, no change is made.
276: 
277: #### Parameters
278: 
279: +-----------+------------------------+-------------------------------------------+
280: | Parameter |          Type          |                Description                |
281: +===========+========================+===========================================+
282: | `method`  | `PulldownMethod` enum. | The method to use for estimation. One of: |
283: |           |                        |                                           |
284: |           |                        | - `PulldownMethod.PULLDOWN_3_2`           |
285: |           |                        | - `PulldownMethod.ADVANCE_24P`            |
286: +-----------+------------------------+-------------------------------------------+
287: 
288: #### Returns
289: 
290: Nothing.
````

## File: docs/official/sources/placeholdersource.md
````markdown
 1: # PlaceholderSource object
 2: 
 3: `app.project.item(index).mainSource`
 4: 
 5: `app.project.item(index).proxySource`
 6: 
 7: 
 8: #### Description
 9: 
10: The PlaceholderSource object describes the footage source of a placeholder.
11: 
12: !!! info
13:     PlaceholderSource is a subclass of [FootageSource object](footagesource.md). All methods and attributes of FootageSource are available when working with PlaceholderSource. PlaceholderSource does not define any additional methods or attributes.
````

## File: docs/official/sources/solidsource.md
````markdown
 1: # SolidSource object
 2: 
 3: `app.project.item(index).mainSource`
 4: 
 5: `app.project.item(index).proxySource`
 6: 
 7: 
 8: #### Description
 9: 
10: The SolidSource object represents a solid-color footage source.
11: 
12: !!! info
13:     SolidSource is a subclass of [FootageSource](footagesource.md). All methods and attributes of FootageSource, in addition to those listed below, are available when working with SolidSource.
14: 
15: ---
16: 
17: ## Attributes
18: 
19: ### SolidSource.color
20: 
21: `solidSource.color`
22: 
23: #### Description
24: 
25: The color of the solid, expressed as red, green, and blue values.
26: 
27: #### Type
28: 
29: Array of three floating-point values, `[R, G, B]`, in the range `[0.0..1.0]`; read/write.
````

## File: docs/official/text/characterrange.md
````markdown
  1: # CharacterRange object
  2: 
  3: `app.project.item(index).layer(index).text.sourceText.value.characterRange(characterIndexStart, [signedCharacterIndexEnd])`
  4: 
  5: 
  6: !!! note
  7:     This functionality was added in After Effects 24.3
  8: 
  9: #### Description
 10: 
 11: The CharacterRange object is an accessor to a character range of the [TextDocument object](textdocument.md) instance it was created from.
 12: 
 13: Unlike the [TextDocument object](textdocument.md), which looks at only the first character when returning character attributes, here the character range can span zero or more characters. As a consequence, two or more characters *may not have the same attribute value* and this mixed state will be signaled by returning `undefined`.
 14: 
 15: - The [characterStart](#characterrangecharacterstart) attribute is the first character index of the range.
 16: - The [characterEnd](#characterrangecharacterend) attribue will report the (last + 1) character index of the range, such that ([characterEnd](#characterrangecharacterend) - [characterStart](#characterrangecharacterstart)) represents the number of characters in the range.
 17: 
 18: It is acceptable for most attributes for the effective range to be zero - otherwise known as an insertion point.
 19: 
 20: When accessed, the CharacterRange object will check that [characterStart](#characterrangecharacterstart) and effective [characterEnd](#characterrangecharacterend) of the range remains valid for the current span of the related [TextDocument object](textdocument.md). This is the same rule as applied when the CharacterRange was created, but because the length of the related [TextDocument object](textdocument.md) can change through the addition or removal of characters, the [characterStart](#characterrangecharacterstart) and effective [characterEnd](#characterrangecharacterend) may no longer be valid. In this situation an exception will be thrown on access, either read or write. The [isRangeValid](#characterrangeisrangevalid) attribute will return `false` if the effective range is no longer valid.
 21: 
 22: Note that if the [TextDocument object](textdocument.md) length changes, the [CharacterRange object](#characterrange-object) range could become valid again.
 23: 
 24: #### Differences from TextDocument
 25: 
 26: Because CharacterRange is an accessor of [TextDocument object](textdocument.md), most methods and attributes of TextDocument are available when working with CharacterRange. The attributes and methods that are unique to CharacterRange or exhibit unique behaviors are included on this page.
 27: 
 28: The following attributes and methods are **not** available on instances of CharacterRange:
 29: 
 30: |    Attributes     |            Methods            |
 31: | ----------------- | ----------------------------- |
 32: | `baselineLocs`    | `characterRange`              |
 33: | `boxText`         | `paragraphCharacterIndexesAt` |
 34: | `boxTextPos`      | `paragraphRange`              |
 35: | `boxTextSize`     |                               |
 36: | `lineOrientation` |                               |
 37: | `paragraphCount`  |                               |
 38: | `pointText`       |                               |
 39: 
 40: #### Examples
 41: 
 42: This increases the font size of the first character in the TextDocument, and set the rest of the characters to fontSize 40.
 43: 
 44: ```javascript
 45: var textDocument = app.project.item(index).layer(index).property("Source Text").value;
 46: var characterRange = textDocument.characterRange(0,1);
 47: 
 48: characterRange.fontSize = characterRange.fontSize + 5;
 49: textDocument.characterRange(1,-1).fontSize = 40;
 50: ```
 51: 
 52: ---
 53: 
 54: ## Attributes
 55: 
 56: ### CharacterRange.characterEnd
 57: 
 58: `CharacterRange.characterEnd`
 59: 
 60: #### Description
 61: 
 62: The Text layer range calculated character end value.
 63: 
 64: Throws an exception on access if the effective value would exceed the bounds of the related [TextDocument object](textdocument.md).
 65: 
 66: #### Type
 67: 
 68: Unsigned integer; read-only.
 69: 
 70: ---
 71: 
 72: ### CharacterRange.characterStart
 73: 
 74: `CharacterRange.characterStart`
 75: 
 76: #### Description
 77: 
 78: The Text layer range calculated character start value.
 79: 
 80: Throws an exception on access if the effective value would exceed the bounds of the related [TextDocument object](textdocument.md).
 81: 
 82: #### Type
 83: 
 84: Unsigned integer; read-only.
 85: 
 86: ---
 87: 
 88: ### CharacterRange.fillColor
 89: 
 90: `CharacterRange.fillColor`
 91: 
 92: #### Description
 93: 
 94: The Text layer range CharacterRange attribute Fill Color, as an array of `[r, g, b]` floating-point values.
 95: 
 96: For example, in an 8-bpc project, a red value of 255 would be 1.0, and in a 32-bpc project, an overbright blue value can be something like 3.2.
 97: 
 98: Setting this value will also set `applyFill` to `true` across the affected characters.
 99: 
100: If this attribute has a mixed value for the range of characters, it will be read as `undefined`.
101: 
102: !!! warning
103:     In contrast to the same attribute on the TextDocument API, we will *not* throw an exception on read if `applyFill` is not `true`.
104: 
105: #### Type
106: 
107: Array `[r, g, b]` of floating-point values; read/write.
108: 
109: ---
110: 
111: ### CharacterRange.isRangeValid
112: 
113: `CharacterRange.isRangeValid`
114: 
115: #### Description
116: 
117: Returns `true` if the current range is within the bounds of the related [TextDocument object](textdocument.md), otherwise `false`.
118: 
119: #### Type
120: 
121: Boolean; read-only.
122: 
123: ---
124: 
125: ### CharacterRange.kerning
126: 
127: `CharacterRange.kerning`
128: 
129: #### Description
130: 
131: The Text layer range character attribute kerning option.
132: 
133: This effectively reports the manual kerning value, and not the calculated kerning value from auto kerning.
134: 
135: - If [autoKernType](textdocument.md#textdocumentautokerntype) in the range is set to `AutoKernType.METRIC_KERN`, `AutoKernType.OPTICAL_KERN`, or is mixed, then this attribute will be returned as `undefined`.
136: - If [autoKernType](textdocument.md#textdocumentautokerntype) in the range is set to `AutoKernType.NO_AUTO_KERN`, and this attribute has a mixed value, it will be read as `undefined`.
137: 
138: Setting this value will also set `AutoKernType.NO_AUTO_KERN` to `true` across the affected characters.
139: 
140: #### Type
141: 
142: Integer value; read/write.
143: 
144: ---
145: 
146: ### CharacterRange.strokeColor
147: 
148: `CharacterRange.strokeColor`
149: 
150: #### Description
151: 
152: The Text layer CharacterRange stroke color character property, as an array of [r, g, b] floating-point values.
153: 
154: For example, in an 8-bpc project, a red value of 255 would be 1.0, and in a 32-bpc project, an overbright blue value can be something like 3.2.
155: 
156: If this attribute has a mixed value, it will be read as `undefined`.
157: 
158: Setting this value will also set [applyStroke](textdocument.md#textdocumentapplystroke) to `true` across the affected characters.
159: 
160: !!! warning
161:     In contrast to the same attribute on the TextDocument API, we will *not* throw an exception on read if [applyStroke](textdocument.md#textdocumentapplystroke) is not `true`.
162: 
163: #### Type
164: 
165: Array [r, g, b] of floating-point values; read/write.
166: 
167: ---
168: 
169: ### CharacterRange.strokeOverFill
170: 
171: `CharacterRange.strokeOverFill`
172: 
173: #### Description
174: 
175: The Text layer CharacterRange Stroke Over Fill character property.
176: 
177: Indicates the rendering order for the fill and stroke for characters in the range. When `true`, the stroke appears over the fill.
178: 
179: If this attribute has a mixed value, it will be read as `undefined`.
180: 
181: !!! warning
182:     The Text layer can override per-character attribute setting via the All Strokes First or All Fills First setting on the CharPanel.
183: 
184:     The value returned here represents what is applied to the characters, without regard to the possible Text layer override.
185: 
186: 
187: #### Type
188: 
189: Boolean; read/write.
190: 
191: ---
192: 
193: ### CharacterRange.text
194: 
195: `CharacterRange.text`
196: 
197: #### Description
198: 
199: The text value for the Text layer range.
200: 
201: On read, the same number of characters as the span of the range will be returned. If the span is zero (an insertion point) it return an empty string.
202: 
203: On write, the characters in the range will be replaced with whatever string value is supplied. If an empty string, then the characters in the range will be effectively deleted.
204: 
205: To insert characters without deleting any existing, call [TextDocument.characterRange()](textdocument.md#textdocumentcharacterrange) with the same value for start as end to get an insertion point range.
206: 
207: #### Type
208: 
209: String; read/write.
210: 
211: ---
212: 
213: ## Methods
214: 
215: ### CharacterRange.pasteFrom()
216: 
217: `CharacterRange.pasteFrom(characterRange)`
218: 
219: !!! note
220:     This functionality was added in After Effects 25.1
221: 
222: #### Description
223: 
224: Copies, using paste semantics, from the `characterRange` parameter to the callee [CharacterRange object](#characterrange-object). The two instances may be the same, and the spans may be different.
225: 
226: Checks will be made that both [CharacterRange object](#characterrange-object) instances are valid.
227: 
228: The internal steps of the operation are:
229: 
230: - Delete the text from the target instance.
231: - Paste the text from the source instance.
232: 
233: As the span of the [CharacterRange object](#characterrange-object) is not adjusted by this call, when the source [CharacterRange object](#characterrange-object) instance has a shorter span than the target [CharacterRange object](#characterrange-object) instance, the target instance may become invalid.
234: 
235: #### Parameters
236: 
237: |    Parameter     |                      Type                       |                                                     Description                                                      |
238: | ---------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
239: | `characterRange` | [CharacterRange object](#characterrange-object) | Object whose text and styling will be pasted in place of the callee [CharacterRange object](#characterrange-object). |
240: 
241: #### Returns
242: 
243: None.
244: 
245: ---
246: 
247: ### CharacterRange.toString()
248: 
249: `CharacterRange.toString()`
250: 
251: #### Description
252: 
253: Returns a string with the parameters used to create the CharacterRange instance, e.g. `"CharacterRange(0,-1)"`.
254: 
255: This may be safely called on an instance where isRangeValid returns `false`.
256: 
257: #### Parameters
258: 
259: None.
260: 
261: #### Returns
262: 
263: String; read-only.
````

## File: docs/official/text/composedlinerange.md
````markdown
  1: # ComposedLineRange object
  2: 
  3: `app.project.item(index).layer(index).text.sourceText.value.composedLineRange(composedLineIndexStart, [signedComposedLineIndexEnd])`
  4: 
  5: !!! note
  6:     This functionality was added in After Effects 24.3
  7: 
  8: #### Description
  9: 
 10: The ComposedLineRange object is an accessor to a composed line range of the [TextDocument object](textdocument.md) instance it was created from.
 11: 
 12: Composed lines are initialized in the [TextDocument object](textdocument.md) when it is created and remain unchanged while the [TextDocument object](textdocument.md) is changed.
 13: It is important to note that the [TextDocument object](textdocument.md) instance is not recomposed when changes are made to it - that only occurs when the instance is applied back to a [TextLayer object](../layer/textlayer.md).
 14: So if you delete all the text in the [TextDocument object](textdocument.md) instance the number of composed lines will remain constant.
 15: 
 16: - The [characterStart](#composedlinerangecharacterstart) attribute will report the first character index of the range.
 17: - The [characterEnd](#composedlinerangecharacterend) attribute will report the (last + 1) character index of the range, such that ([characterEnd](#composedlinerangecharacterend) - [characterStart](#composedlinerangecharacterstart)) represents the number of characters in the range.
 18: - A composed line always has some length.
 19: 
 20: When accessed, the ComposedLineRange object will check that effective [characterStart](#composedlinerangecharacterstart) and effective [characterEnd](#composedlinerangecharacterend) of the range remains valid for the current span of the related [TextDocument object](textdocument.md). This is the same rule as applied when the ComposedLineRange was created, but because the length of the related [TextDocument object](textdocument.md) can change through the addition or removal of characters, the effective [characterStart](#composedlinerangecharacterstart) and effective [characterEnd](#composedlinerangecharacterend) may no longer be valid. In this situation an exception will be thrown on access, either read or write. The property [isRangeValid](#composedlinerangeisrangevalid) will return `false` if the effective range is no longer valid.
 21: 
 22: Note that if the [TextDocument object](textdocument.md) length changes, the character range could become valid again.
 23: 
 24: As a convenience, the function [ComposedLineRange.characterRange()](#composedlinerangecharacterrange) can be invoked which will return a [CharacterRange object](characterrange.md) instance initialized from [characterStart](#composedlinerangecharacterstart) and [characterEnd](#composedlinerangecharacterend).
 25: This instance becomes independent of the ComposedLineRange instance it came from so subsequent changes to the ComposedLineRange limits are not communicated to the [CharacterRange object](characterrange.md) instance.
 26: 
 27: For performance reasons, when accessing multiple attributes it is adviseable to retrieve the [CharacterRange object](characterrange.md) once and re-use it rather than create a new one each time.
 28: 
 29: #### Examples
 30: 
 31: This changes the fill color to red of the first composed line in the TextDocument, and set the rest of the lines to color blue.
 32: 
 33: ```javascript
 34: var textDocument = app.project.item(index).layer(index).property("Source Text").value;
 35: 
 36: var composedLineRange0 = textDocument.composedLineRange(0,1);
 37: var characterRange0 = composedLineRange0.characterRange();
 38: characterRange0.fillColor = [1.0, 0, 0];
 39: 
 40: textDocument.composedLineRange(1,-1).characterRange().fillColor = [0, 0, 1.0];
 41: ```
 42: 
 43: ---
 44: 
 45: ## Attributes
 46: 
 47: ### ComposedLineRange.characterEnd
 48: 
 49: `ComposedLineRange.characterEnd`
 50: 
 51: #### Description
 52: 
 53: The Text layer range calculated character end value.
 54: 
 55: Throws an exception on access if the effective value would exceed the bounds of the related [TextDocument object](textdocument.md).
 56: 
 57: #### Type
 58: 
 59: Unsigned integer; read-only.
 60: 
 61: ---
 62: 
 63: ### ComposedLineRange.characterStart
 64: 
 65: `ComposedLineRange.characterStart`
 66: 
 67: #### Description
 68: 
 69: The Text layer range calculated character start value.
 70: 
 71: Throws an exception on access if the effective value would exceed the bounds of the related [TextDocument object](textdocument.md).
 72: 
 73: #### Type
 74: 
 75: Unsigned integer; read-only.
 76: 
 77: ---
 78: 
 79: ### ComposedLineRange.isRangeValid
 80: 
 81: `ComposedLineRange.isRangeValid`
 82: 
 83: #### Description
 84: 
 85: Returns `true` if the current range is within the bounds of the related [TextDocument object](textdocument.md), otherwise `false`.
 86: 
 87: #### Type
 88: 
 89: Boolean; read-only.
 90: 
 91: ---
 92: 
 93: ## Methods
 94: 
 95: ### ComposedLineRange.characterRange()
 96: 
 97: `ComposedLineRange.characterRange()`
 98: 
 99: #### Description
100: 
101: Returns a [CharacterRange object](characterrange.md) initialized from [characterStart](#composedlinerangecharacterstart) and [characterEnd](#composedlinerangecharacterend).
102: 
103: Will throw an exception if isRangeValid would return `false`.
104: 
105: The returned instance, once created, is independent of subsequent changes to the ComposedLineRange it came from.
106: 
107: #### Parameters
108: 
109: None.
110: 
111: #### Returns
112: 
113: [CharacterRange object](characterrange.md);
114: 
115: ---
116: 
117: ### ComposedLineRange.toString()
118: 
119: `ComposedLineRange.toString()`
120: 
121: #### Description
122: 
123: Returns a string with the parameters used to create the ComposedLineRange instance, e.g. `"ComposedLineRange(0,-1)"`
124: 
125: This may be safely called on an instance where isRangeValid returns `false`.
126: 
127: #### Parameters
128: 
129: None.
130: 
131: #### Returns
132: 
133: String;
````

## File: docs/official/text/fontobject.md
````markdown
  1: # Font object
  2: 
  3: !!! note
  4:     This functionality was added in After Effects 24.0
  5: 
  6: #### Description
  7: 
  8: The Font object provides information about a specific font, along with the font technology used, helping disambiguate when multiple fonts sharing the same Postscript name are installed on the system.
  9: 
 10: Most of these APIs simply return information which is contained in the Font data file itself, seek more information there.
 11: 
 12: ---
 13: 
 14: ## Attributes
 15: 
 16: ### FontObject.designAxesData
 17: 
 18: `app.fonts.allFonts[0][0].designAxesData`
 19: 
 20: #### Description
 21: 
 22: Returns an Array of Objects, containing the design axes data from the font.
 23: Each object is composed of the axis `name`, `tag`, `min` value, `max` value, and `default` value.
 24: 
 25: !!! tip
 26:     Will return undefined for non-variable fonts.
 27: 
 28: #### Example
 29: 
 30: This example demonstrates how to see the axes of a variable font on a selected Text layer:
 31: 
 32: ```javascript
 33: // Prerequisite: Create and select a Text layer that uses a variable font
 34: var textLayer = app.project.activeItem.selectedLayers[0];
 35: 
 36: // Get the font object
 37: var textDocument = textLayer.property("Source Text").value;
 38: var fontObject = textDocument.fontObject;
 39: 
 40: // Check for axes and display any that are found
 41: if (fontObject && fontObject.designAxesData) {
 42:     var axes = fontObject.designAxesData;
 43:     var message = "Variable Font Axes (" + axes.length + " total):\n\n";
 44:     
 45:     for (var i = 0; i < axes.length; i++) {
 46:         var axis = axes[i];
 47:         message += "Axis " + (i + 1) + ":\n";
 48:         message += "  Tag: " + axis.tag + "\n";
 49:         message += "  Name: " + axis.name + "\n";
 50:         message += "  Min: " + axis.min + "\n";
 51:         message += "  Max: " + axis.max + "\n";
 52:         message += "  Default: " + axis.default + "\n";
 53:         
 54:         if (i < axes.length - 1) {
 55:             message += "\n";
 56:         }
 57:     }
 58:     
 59:     alert(message);
 60: } else {
 61:     alert("No variable font axes found");
 62: }
 63: ```
 64: 
 65: #### Type
 66: 
 67: Array of Objects; read-only.
 68: 
 69: ---
 70: 
 71: ### FontObject.designVector
 72: 
 73: `app.fonts.fontsWithDefaultDesignAxes[0].designVector`
 74: 
 75: #### Description
 76: 
 77: For Variable fonts will return an ordered array with a length matching the number of design axes defined by the font.
 78: 
 79: !!! tip
 80:     Will return undefined for non-variable fonts.
 81: 
 82: #### Type
 83: 
 84: Array of floating-point values; read-only.
 85: 
 86: ---
 87: 
 88: ### FontObject.familyName
 89: 
 90: `app.fonts.allFonts[0][0].familyName`
 91: 
 92: #### Description
 93: 
 94: The family name of the font, in the ASCII character set.
 95: 
 96: #### Type
 97: 
 98: String; read-only.
 99: 
100: ---
101: 
102: ### FontObject.familyPrefix
103: 
104: `app.fonts.fontsWithDefaultDesignAxes[0].familyPrefix`
105: 
106: #### Description
107: 
108: The family prefix of the variable font. For example, the family of the PostScript name "SFPro-Bold" is "SFPro".
109: 
110: !!! tip
111:     Will return undefined for non-variable fonts.
112: 
113: #### Type
114: 
115: String; read-only.
116: 
117: ---
118: 
119: ### FontObject.fontID
120: 
121: `app.fonts.allFonts[0][0].fontID`
122: 
123: !!! note
124:     This functionality was added in After Effects 24.2
125: 
126: #### Description
127: 
128: A unique number assigned to the FontObject instance when it is created, value is greater than or equal to 1. It never changes during the application session but may be different in subsequent launches of the application.
129: 
130: Can be used to compare two FontObject instances to see if they refer to the same underlying native font instance.
131: 
132: FontObjects can be looked up by fontID with [getFontByID](fontsobject.md#fontsobjectgetfontbyid) .
133: 
134: #### Type
135: 
136: Integer; read-only.
137: 
138: ---
139: 
140: ### FontObject.fullName
141: 
142: `app.fonts.allFonts[0][0].fullName`
143: 
144: #### Description
145: 
146: The full name of the font, in the ASCII character set. Usually composed of the family name and the style name.
147: 
148: #### Type
149: 
150: String; read-only.
151: 
152: ---
153: 
154: ### FontObject.hasDesignAxes
155: 
156: `app.fonts.allFonts[0][0].hasDesignAxes`
157: 
158: #### Description
159: 
160: Returns `true` if the font is a variable font.
161: 
162: #### Type
163: 
164: Boolean; read-only.
165: 
166: ---
167: 
168: ### FontObject.isFromAdobeFonts
169: 
170: `app.fonts.allFonts[0][0].isFromAdobeFonts`
171: 
172: #### Description
173: 
174: Returns `true` if the font is from Adobe Fonts.
175: 
176: #### Type
177: 
178: Boolean; read-only.
179: 
180: ---
181: 
182: ### FontObject.isSubstitute
183: 
184: `app.fonts.allFonts[0][0].isSubstitute`
185: 
186: #### Description
187: 
188: returns `true` when this font instance represents a font reference which was missing on project open.
189: 
190: #### Type
191: 
192: Boolean; read-only.
193: 
194: ---
195: 
196: ### FontObject.location
197: 
198: `app.fonts.allFonts[0][0].location`
199: 
200: #### Description
201: 
202: The location of the font file on your system.
203: 
204: !!! warning
205:     Not guaranteed to be returned for all font types; return value may be empty string for some kinds of fonts.
206: 
207: #### Type
208: 
209: String; read-only.
210: 
211: ---
212: 
213: ### FontObject.nativeFamilyName
214: 
215: `app.fonts.allFonts[0][0].nativeFamilyName`
216: 
217: #### Description
218: 
219: The native family name of the font in full 16 bit Unicode. Often different than what is returned by [FontObject.familyName](#fontobjectfamilyname) for non-Latin fonts.
220: 
221: #### Type
222: 
223: String; read-only.
224: 
225: ---
226: 
227: ### FontObject.nativeFullName
228: 
229: `app.fonts.allFonts[0][0].nativeFullName`
230: 
231: #### Description
232: 
233: The native full name of the font in full 16 bit Unicode. Often different than what is returned by [FontObject.fullName](#fontobjectfullname) for non-Latin fonts.
234: 
235: #### Type
236: 
237: String; read-only.
238: 
239: ---
240: 
241: ### FontObject.nativeStyleName
242: 
243: `app.fonts.allFonts[0][0].nativeStyleName`
244: 
245: #### Description
246: 
247: The native style name of the font in full 16 bit Unicode. Often different than what is returned by [FontObject.styleName](#fontobjectstylename) for non-Latin fonts.
248: 
249: #### Type
250: 
251: String; read-only.
252: 
253: ---
254: 
255: ### FontObject.otherFontsWithSameDict
256: 
257: `app.fonts.fontsWithDefaultDesignAxes[0].otherFontsWithSameDict`
258: 
259: !!! note
260:     This functionality was added in After Effects 25.1
261: 
262: #### Description
263: 
264: Returns an Array of [Font object](#font-object) instances which share the same font dictionary as this [Font object](#font-object).
265: 
266: Will return an empty Array if this [Font object](#font-object) is not a Variable font, or the Variable font only has one instance.
267: 
268: #### Type
269: 
270: Array of [Font objects](#font-object); read-only.
271: 
272: ---
273: 
274: ### FontObject.postScriptName
275: 
276: `app.fonts.allFonts[0][0].postScriptName`
277: 
278: #### Description
279: 
280: The postscript name of the font.
281: 
282: #### Type
283: 
284: String; read-only.
285: 
286: ---
287: 
288: ### FontObject.styleName
289: 
290: `app.fonts.allFonts[0][0].styleName`
291: 
292: #### Description
293: 
294: The style name of the font, in the ASCII character set.
295: 
296: #### Type
297: 
298: String; read-only.
299: 
300: ---
301: 
302: ### FontObject.technology
303: 
304: `app.fonts.allFonts[0][0].technology`
305: 
306: #### Description
307: 
308: The technology used by the font.
309: 
310: #### Type
311: 
312: An `CTFontTechnology` enumerated value; read-only. One of:
313: 
314: - `CTFontTechnology.CT_TYPE1_FONT`
315: - `CTFontTechnology.CT_TRUETYPE_FONT`
316: - `CTFontTechnology.CT_CID_FONT`
317: - `CTFontTechnology.CT_BITMAP_FONT`
318: - `CTFontTechnology.CT_ATC_FONT`
319: - `CTFontTechnology.CT_TYPE3_FONT`
320: - `CTFontTechnology.CT_SVG_FONT`
321: - `CTFontTechnology.CT_ANYTECHNOLOGY`
322: 
323: ---
324: 
325: ### FontObject.type
326: 
327: `app.fonts.allFonts[0][0].type`
328: 
329: #### Description
330: 
331: The internal type of the font.
332: 
333: #### Type
334: 
335: An `CTFontType` enumerated value; read-only. One of:
336: 
337: - `CTFontType.CT_TYPE1_FONTTYPE`
338: - `CTFontType.CT_TRUETYPE_FONTTYPE`
339: - `CTFontType.CT_CID_FONTTYPE`
340: - `CTFontType.CT_ATC_FONTTYPE`
341: - `CTFontType.CT_BITMAP_FONTTYPE`
342: - `CTFontType.CT_OPENTYPE_CFF_FONTTYPE`
343: - `CTFontType.CT_OPENTYPE_CID_FONTTYPE`
344: - `CTFontType.CT_OPENTYPE_TT_FONTTYPE`
345: - `CTFontType.CT_TYPE3_FONTTYPE`
346: - `CTFontType.CT_SVG_FONTTYPE`
347: 
348: ---
349: 
350: ### FontObject.version
351: 
352: `app.fonts.allFonts[0][0].version`
353: 
354: #### Description
355: 
356: The version number of the font.
357: 
358: #### Type
359: 
360: String; read-only.
361: 
362: ---
363: 
364: ### FontObject.writingScripts
365: 
366: `app.fonts.allFonts[0][0].writingScripts`
367: 
368: #### Description
369: 
370: The supported character sets of the font.
371: 
372: #### Type
373: 
374: An array of `CTScript` enumerated values; read-only. One or more of:
375: 
376: - `CTScript.CT_ROMAN_SCRIPT`
377: - `CTScript.CT_JAPANESE_SCRIPT`
378: - `CTScript.CT_TRADITIONALCHINESE_SCRIPT`
379: - `CTScript.CT_KOREAN_SCRIPT`
380: - `CTScript.CT_ARABIC_SCRIPT`
381: - `CTScript.CT_HEBREW_SCRIPT`
382: - `CTScript.CT_GREEK_SCRIPT`
383: - `CTScript.CT_CYRILLIC_SCRIPT`
384: - `CTScript.CT_RIGHTLEFT_SCRIPT`
385: - `CTScript.CT_DEVANAGARI_SCRIPT`
386: - `CTScript.CT_GURMUKHI_SCRIPT`
387: - `CTScript.CT_GUJARATI_SCRIPT`
388: - `CTScript.CT_ORIYA_SCRIPT`
389: - `CTScript.CT_BENGALI_SCRIPT`
390: - `CTScript.CT_TAMIL_SCRIPT`
391: - `CTScript.CT_TELUGU_SCRIPT`
392: - `CTScript.CT_KANNADA_SCRIPT`
393: - `CTScript.CT_MALAYALAM_SCRIPT`
394: - `CTScript.CT_SINHALESE_SCRIPT`
395: - `CTScript.CT_BURMESE_SCRIPT`
396: - `CTScript.CT_KHMER_SCRIPT`
397: - `CTScript.CT_THAI_SCRIPT`
398: - `CTScript.CT_LAOTIAN_SCRIPT`
399: - `CTScript.CT_GEORGIAN_SCRIPT`
400: - `CTScript.CT_ARMENIAN_SCRIPT`
401: - `CTScript.CT_SIMPLIFIEDCHINESE_SCRIPT`
402: - `CTScript.CT_TIBETAN_SCRIPT`
403: - `CTScript.CT_MONGOLIAN_SCRIPT`
404: - `CTScript.CT_GEEZ_SCRIPT`
405: - `CTScript.CT_EASTEUROPEANROMAN_SCRIPT`
406: - `CTScript.CT_VIETNAMESE_SCRIPT`
407: - `CTScript.CT_EXTENDEDARABIC_SCRIPT`
408: - `CTScript.CT_KLINGON_SCRIPT`
409: - `CTScript.CT_EMOJI_SCRIPT`
410: - `CTScript.CT_ROHINGYA_SCRIPT`
411: - `CTScript.CT_JAVANESE_SCRIPT`
412: - `CTScript.CT_SUNDANESE_SCRIPT`
413: - `CTScript.CT_LONTARA_SCRIPT`
414: - `CTScript.CT_SYRIAC_SCRIPT`
415: - `CTScript.CT_TAITHAM_SCRIPT`
416: - `CTScript.CT_BUGINESE_SCRIPT`
417: - `CTScript.CT_BALINESE_SCRIPT`
418: - `CTScript.CT_CHEROKEE_SCRIPT`
419: - `CTScript.CT_MANDAIC_SCRIPT`
420: - `CTScript.CT_VAI_SCRIPT`
421: - `CTScript.CT_THAANA_SCRIPT`
422: - `CTScript.CT_BRAVANESE_SCRIPT`
423: - `CTScript.CT_BRAHMI_SCRIPT`
424: - `CTScript.CT_CARIAN_SCRIPT`
425: - `CTScript.CT_CYPRIOT_SCRIPT`
426: - `CTScript.CT_EGYPTIAN_SCRIPT`
427: - `CTScript.CT_IMPERIALARAMAIC_SCRIPT`
428: - `CTScript.CT_PAHLAVI_SCRIPT`
429: - `CTScript.CT_PARTHIAN_SCRIPT`
430: - `CTScript.CT_KHAROSHTHI_SCRIPT`
431: - `CTScript.CT_LYCIAN_SCRIPT`
432: - `CTScript.CT_LYDIAN_SCRIPT`
433: - `CTScript.CT_PHOENICIAN_SCRIPT`
434: - `CTScript.CT_PERSIAN_SCRIPT`
435: - `CTScript.CT_SHAVIAN_SCRIPT`
436: - `CTScript.CT_SUMAKKCUNEIFORM_SCRIPT`
437: - `CTScript.CT_UGARITIC_SCRIPT`
438: - `CTScript.CT_GLAGOLITIC_SCRIPT`
439: - `CTScript.CT_GOTHIC_SCRIPT`
440: - `CTScript.CT_OGHAM_SCRIPT`
441: - `CTScript.CT_OLDITALIC_SCRIPT`
442: - `CTScript.CT_ORKHON_SCRIPT`
443: - `CTScript.CT_RUNIC_SCRIPT`
444: - `CTScript.CT_MEROITICCURSIVE_SCRIPT`
445: - `CTScript.CT_COPTIC_SCRIPT`
446: - `CTScript.CT_OLCHIKI_SCRIPT`
447: - `CTScript.CT_SORASOMPENG_SCRIPT`
448: - `CTScript.CT_OLDHANGUL_SCRIPT`
449: - `CTScript.CT_LISU_SCRIPT`
450: - `CTScript.CT_NKO_SCRIPT`
451: - `CTScript.CT_ADLAM_SCRIPT`
452: - `CTScript.CT_BAMUM_SCRIPT`
453: - `CTScript.CT_BASSAVAH_SCRIPT`
454: - `CTScript.CT_NEWA_SCRIPT`
455: - `CTScript.CT_NEWTAILU_SCRIPT`
456: - `CTScript.CT_SCRIPT`
457: - `CTScript.CT_OSAGE_SCRIPT`
458: - `CTScript.CT_UCAS_SCRIPT`
459: - `CTScript.CT_TIFINAGH_SCRIPT`
460: - `CTScript.CT_KAYAHLI_SCRIPT`
461: - `CTScript.CT_LAO_SCRIPT`
462: - `CTScript.CT_TAILE_SCRIPT`
463: - `CTScript.CT_TAIVIET_SCRIPT`
464: - `CTScript.CT_DONTKNOW_SCRIPT`
465: 
466: ## Methods
467: 
468: ### FontObject.hasGlyphsFor()
469: 
470: `app.fonts.allFonts[0][0].hasGlyphsFor(charString)`
471: 
472: !!! note
473:     This functionality was added in After Effects 25.1
474: 
475: #### Description
476: 
477: Fonts do not contain glyphs for all possible ranges of Unicode and this method gives the caller the opportunity to query the Font about support for one or more characters.
478: 
479: Returns `true` if the font has a glyph for every character in the `charString`.
480: 
481: The character order does not matter, and in the case of a parameter string with more than one character, it is not possible though this API to determine which character had no glyph support.
482: 
483: #### Parameters
484: 
485: |  Parameter   |  Type  |                                Description                                |
486: | ------------ | ------ | ------------------------------------------------------------------------- |
487: | `charString` | String | Text that will be checked for support in the [Font object](#font-object). |
488: 
489: 
490: #### Returns
491: 
492: Boolean.
493: 
494: ---
495: 
496: ### FontObject.hasSameDict()
497: 
498: `app.fonts.fontsWithDefaultDesignAxes[0].hasSameDict(fontObject)`
499: 
500: #### Description
501: 
502: This function will `true` if the [Font object](#font-object) passed as an argument shares the same variable font dictionary as the [Font object](#font-object) the function is called on.
503: 
504: !!! tip
505:     Can only return `true` when called on a variable [Font object](#font-object) with the argument also being a [Font object](#font-object) of a variable font.
506: 
507: #### Parameters
508: 
509: |  Parameter   |            Type             |   Description   |
510: | ------------ | --------------------------- | --------------- |
511: | `fontObject` | [Font object](#font-object) | Object to check |
512: 
513: #### Returns
514: 
515: Boolean.
516: 
517: ---
518: 
519: 
520: ### FontObject.postScriptNameForDesignVector()
521: 
522: `app.fonts.fontsWithDefaultDesignAxes[0].postScriptNameForDesignVector([...vectorValues])`
523: 
524: #### Description
525: 
526: This function will return the postscript name of the variable font for the specific design vectors passed as the argument.
527: 
528: #### Parameters
529: 
530: |   Parameter    |              Type              |                                           Description                                           |
531: | -------------- | ------------------------------ | ----------------------------------------------------------------------------------------------- |
532: | `vectorValues` | Array of floating-point values | Values to check [FontObject.designVector](#fontobjectdesignvector) for the given variable font. |
533: 
534: #### Returns
535: 
536: A String.
````

## File: docs/official/text/fontsobject.md
````markdown
  1: # Fonts object
  2: 
  3: `app.fonts`
  4: 
  5: !!! note
  6:     This functionality was added in After Effects 24.0
  7: 
  8: #### Description
  9: 
 10: The Fonts objects provides information about the current font ecosystem on your device.
 11: 
 12: After Effects maintains an internal font proxy to a real font which it has enumerated in the font ecosystem. As the fonts in the font ecosystem are added and removed these internal font proxies are kept in sync as well by being added and removed.
 13: 
 14: The properties we report via the proxy [Font object](fontobject.md) are the data that is available to us from the font files themselves, which of course will vary according to technology and type of font. It is not possible here to describe all the possible interesting variations and troubles that this causes us and in general it is advisable to be careful with assuming that the behavior and properties for one font type or technology are common to all other font types and technology - the answer as always is "it depends".
 15: 
 16: A [Font object](fontobject.md) is a soft reference to one of these internal font proxies and as a consequence is not sufficient to keep the internal font proxy alive. As a result if the internal font proxy is removed, the referencing [Font object](fontobject.md) will throw an invalid exception for any property reference.
 17: 
 18: On project open, and a few other situations, it may come to pass that the font which is being referenced in the persisted data cannot be found in the current font ecosystem. In these situations an internal font proxy will be created which will contain the desired properties, such as PostScript name, and will return `true` for [isSubstitute](fontobject.md#fontobjectissubstitute). There will be an underlying real font which will be selected to support this internal font proxy, but we do not reveal what it is and there is no way to influence this selection.
 19: 
 20: Continuing the open process with created substitute fonts, an attempt will be made to sync matching fonts from Creative Cloud Adobe Fonts. This is an asynchronous activity and the project will usually finish opening and be ready for use before any fonts are brought down from Adobe Fonts. Depending on how many fonts are being synced, they may be installed at different times. There is no way to disable this attempt.
 21: 
 22: After any change to the font ecosystem from installing new real fonts, the outstanding list of substitute fonts will be evaluated to see if there now exists a real font which is a valid replacement for it - currently only requiring the PostScript name to match - and if one is found automatically all the references in the project to the substitute will be replaced with the newly installed font.
 23: 
 24: ---
 25: 
 26: ## Attributes
 27: 
 28: ### FontsObject.allFonts
 29: 
 30: `app.fonts.allFonts`
 31: 
 32: #### Description
 33: 
 34: The list of all the fonts currently available on your system.
 35: 
 36: They are grouped into what is named a family group which are Arrays of [Font object](fontobject.md).
 37: 
 38: The Family Name of the group is simply the [familyName](fontobject.md#fontobjectfamilyname) of any of the [Font objects](fontobject.md) in the group.
 39: 
 40: The Family Name in one font group is not guaranteed to have unique name compared to different font groups - the grouping is determined by a number of factors including the returned value of [FontObject.technology](fontobject.md#fontobjecttechnology) and [FontObject.writingScripts](fontobject.md#fontobjectwritingscripts).
 41: 
 42: In addition, it is perfectly acceptable to have multiple fonts with the same PostScript name, though only one will have the same (PostScript name, Technology, Primary Writing Script) tuple. In the case of true duplicates, it is undefined which will be returned and which will be suppressed.
 43: 
 44: The family groups and [Font objects](fontobject.md) in the group are sorted according to the setting in the Character Panel dropdown "Show Font Names in English". If set to `true`, the [familyName](fontobject.md#fontobjectfamilyname) and [styleName](fontobject.md#fontobjectstylename) property is used, otherwise the [nativeFamilyName](fontobject.md#fontobjectnativefamilyname) and [nativeStyleName](fontobject.md#fontobjectnativestylename) property is used.
 45: 
 46: [Font object](fontobject.md) for which [isSubstitute](fontobject.md#fontobjectissubstitute) returns `true` are always sorted to the end as individual family groups.
 47: 
 48: #### Type
 49: 
 50: Array of Arrays of [Font objects](fontobject.md); read-only.
 51: 
 52: #### Example
 53: 
 54: This example will select the first returned Font Family Array.
 55: 
 56: ```javascript
 57: // Getting the first available Font Family Group on the system
 58: var firstFontGroup = app.fonts.allFonts[0];
 59: 
 60: // Getting the first Style for that Font Family
 61: var firstFontFamilyName = firstFontGroup[0].familyName;
 62: var firstFamilyStyle = firstFontGroup[0].styleName;
 63: 
 64: alert(firstFontFamilyName+" "+firstFamilyStyle);
 65: ```
 66: 
 67: ---
 68: 
 69: ### FontsObject.favoriteFontFamilyList
 70: 
 71: `app.fonts.favoriteFontFamilyList`
 72: 
 73: !!! note
 74:     This functionality was added in After Effects 24.6
 75: 
 76: #### Description
 77: 
 78: Provides access to the Favorites list presented in the Character panel and Properties panel. To set the Favorites simply provide an (unsorted) array of strings based on the [familyName](fontobject.md#fontobjectfamilyname). To clear the list simply assign an empty Array.
 79: 
 80: #### Type
 81: 
 82: Array of Strings; read/write.
 83: 
 84: ---
 85: 
 86: ### FontsObject.fontsDuplicateByPostScriptName
 87: 
 88: `app.fonts.fontsDuplicateByPostScriptName`
 89: 
 90: !!! note
 91:     This functionality was added in After Effects 24.6
 92: 
 93: #### Description
 94: 
 95: It is perfectly legal and common for more than one [Font object](fontobject.md) to return the same value for [postScriptName](fontobject.md#fontobjectpostscriptname) but as this can sometimes lead to confusion about what [Font object](fontobject.md) will actually be used when using [TextDocument.font](textdocument.md#textdocumentfont) or the `.font` attribute of a [CharacterRange object](characterrange.md), this property exists to both reveal what duplicates exist and also their relative order.
 96: 
 97: This returns an Array in which each element is an Array of [Font objects](fontobject.md), where the 0th element [Font object](fontobject.md) is considered the primary [Font object](fontobject.md) for the given PostScript name.
 98: 
 99: #### Type
100: 
101: Array of Arrays of [Font Objects](fontobject.md); read-only.
102: 
103: ---
104: 
105: ### FontsObject.fontServerRevision
106: 
107: `app.fonts.fontServerRevision`
108: 
109: !!! note
110:     This functionality was added in After Effects 24.2
111: 
112: #### Description
113: 
114: Returns an unsigned number representing the current revision of the font environment.
115: 
116: The revision is advanced when anything happens to the font environment which would change the contents, properties, or order of [Font objects](fontobject.md) returned from a call to [FontsObject.allFonts](#fontsobjectallfonts).
117: 
118: Among these are: installing or removing fonts in the font environment, opening or closing a project with substituted fonts, causing a custom Variable font instance to be created, and changing the setting in the Character Panel dropdown "Show Font Names in English".
119: 
120: #### Type
121: 
122: Floating-point value; read-only.
123: 
124: #### Example
125: 
126: ```javascript
127: var fsRev = app.fonts.fontServerRevision;
128: alert(fsRev);
129: ```
130: 
131: ---
132: 
133: ### FontsObject.fontsWithDefaultDesignAxes
134: 
135: `app.fonts.fontsWithDefaultDesignAxes`
136: 
137: #### Description
138: 
139: Returns an array of variable [Font objects](fontobject.md), each using a unique font dictionary and with default values for their design axes. This API is a convenient way to quickly filter for a unique instance of each installed variable font.
140: 
141: #### Type
142: 
143: Array of [Font objects](fontobject.md); read-only.
144: 
145: #### Example
146: 
147: ```javascript
148: var variableFontList = app.fonts.fontsWithDefaultDesignAxes;
149: alert(variableFontList.length);
150: ```
151: 
152: ---
153: 
154: ### FontsObject.freezeSyncSubstitutedFonts
155: 
156: `app.fonts.freezeSyncSubstitutedFonts`
157: 
158: !!! note
159:     This functionality was added in After Effects 24.6
160: 
161: #### Description
162: 
163: When a Project is opened and one or more fonts are not found in the local font environment, a *sync* process is initiated with Adobe Fonts to see if one or more Fonts could be activated and installed.
164: 
165: By default this happens automatically—this property will disable it from happening.
166: 
167: !!! warning
168:     The rules for deciding if Adobe Fonts has a matching font is entirely based on the PostScript name. With some Variable Fonts, due to ambiguity about which font has which named instance, it is possible that more than one face (Regular/Italic) may be installed during an activation. Whether the installed font is a valid replacement is controlled by the [FontsObject.substitutedFontReplacementMatchPolicy](#fontsobjectsubstitutedfontreplacementmatchpolicy).
169: 
170: #### Type
171: 
172: Boolean; read/write. One of:
173: 
174: - `false` is the default—sync from Adobe Fonts may be attempted.
175: - `true` means that no sync or install will be attempted.
176: 
177: ---
178: 
179: ### FontsObject.missingOrSubstitutedFonts
180: 
181: `app.fonts.missingOrSubstitutedFonts`
182: 
183: #### Description
184: 
185: The list of all the missing or substituted fonts of the current Project.
186: 
187: !!! tip
188:     A substituted font is a font that was already missing when the project is opened. A missing font is a font that went missing (font being uninstalled, for example) *while* the project was open.
189: 
190: #### Type
191: 
192: Array of [Font objects](fontobject.md); read-only.
193: 
194: ---
195: 
196: ### FontsObject.mruFontFamilyList
197: 
198: `app.fonts.mruFontFamilyList`
199: 
200: !!! note
201:     This functionality was added in After Effects 24.6
202: 
203: #### Description
204: 
205: Provides access to the Most Recently Used (MRU) list presented in the Character panel and Properties panel. To set the MRU simply provide an (unsorted) array of strings based on the [familyName](fontobject.md#fontobjectfamilyname). To clear the list simply assign an empty Array.
206: 
207: #### Type
208: 
209: Array of Strings; read/write.
210: 
211: ---
212: 
213: ### FontsObject.substitutedFontReplacementMatchPolicy
214: 
215: `app.fonts.substitutedFontReplacementMatchPolicy`
216: 
217: !!! note
218:     This functionality was added in After Effects 24.6
219: 
220: #### Description
221: 
222: Controls the rules which are used to determine which fonts are considered matching for automatic replacement for a substituted [Font object](fontobject.md).
223: 
224: #### Type
225: 
226: A `SubstitutedFontReplacementMatchPolicy` enumerated value; read/write. One of:
227: 
228: - `SubstitutedFontReplacementMatchPolicy.POSTSCRIPT_NAME` is the default; any [Font object](fontobject.md) which has the same PostScript name is a valid candidate for replacement of a substituted [Font object](fontobject.md).
229: - `SubstitutedFontReplacementMatchPolicy.CTFI_EQUAL` requires that the following properties of substituted [Font object](fontobject.md) must match to be considered a valid candidate:
230:     - [postScriptName](fontobject.md#fontobjectpostscriptname)
231:     - [technology](fontobject.md#fontobjecttechnology)
232:     - [writingScripts](fontobject.md#fontobjectwritingscripts) (primary)
233:     - [designVector](fontobject.md#fontobjectdesignvector)
234: - `SubstitutedFontReplacementMatchPolicy.DISABLED` means that no [Font object](fontobject.md) is an acceptable replacement for a the substituted [Font object](fontobject.md).
235: 
236: ---
237: 
238: ## Methods
239: 
240: ### FontsObject.getCTScriptForString()
241: 
242: `app.fonts.getCTScriptForString(charString, preferredCTScript)`
243: 
244: !!! note
245:     This functionality was added in After Effects 25.1
246: 
247: #### Description
248: 
249: This function will return an array of generic objects describing the number of characters in the range and the `CTScript` enum assigned to them. See [FontObject.writingScripts](fontobject.md#fontobjectwritingscripts) for a full list of `CTScript` enumerated values.
250: 
251: If a character is deemed to be included in one or more `CTScript` values, the value specfied in the second argument `preferredCTScript` will break the tie.
252: 
253: ```javascript
254: var scriptsV = app.fonts.getCTScriptForString("ABヂ", CTScript.CT_ROMAN_SCRIPT);
255: var str = "[0] chars:" + scriptsV[0].chars +   // 2
256:             " ctScript:" + getEnumAsString(scriptsV[0].ctScript) +
257:             "\n[1] chars:" + scriptsV[1].chars + // 1
258:             " ctScript:" + getEnumAsString(scriptsV[1].ctScript);
259: alert(str);
260: ```
261: 
262: #### Parameters
263: 
264: |      Parameter      |      Type       |                        Description                         |
265: | ------------------- | --------------- | ---------------------------------------------------------- |
266: | `charString`        | String          | Characters to check. If empty, will return an empty array. |
267: | `preferredCTScript` | `CTScript` enum | CT Script to prefer                                        |
268: 
269: #### Returns
270: 
271: Array of generic objects;
272: 
273: - Key `chars` will be set to number of characters the in the range.
274: - Key `ctScript` will be set to the `CTScript` which applies to the characters in the range.
275: 
276: —
277: 
278: ### FontsObject.getDefaultFontForCTScript()
279: 
280: `app.fonts.getDefaultFontForCTScript(ctScript)`
281: 
282: !!! note
283:     This functionality was added in After Effects 25.1
284: 
285: #### Description
286: 
287: This function will return an instance of [Font object](fontobject.md) mapped as the default font based on `CTScript`.
288: 
289: After Effects uses these mappings when typing or applying a font where it finds
290: that the font does not contain a glyph for the character.
291: In this situation it will attempt to map the character to a `CTScript` value
292: and then use this default mapping to select an alternate font which may have a
293: glyph for the character.
294: 
295: This mechanism is also used with text and fonts in Scripting thus providing a way
296: to expose which fonts will be used for which `CTScript` values.
297: 
298: There is no guarantee that what is returned will support all, or even any, of the
299: Unicode characters mapped to the `CTScript`.
300: 
301: ```javascript
302: var font = app.fonts.getDefaultFontForCTScript(CTScript.CT_JAPANESE_SCRIPT);
303: ```
304: 
305: #### Parameters
306: 
307: | Parameter  |      Type       |                   Description                    |
308: | ---------- | --------------- | ------------------------------------------------ |
309: | `ctScript` | `CTScript` enum | Corresponding CTScript to get default font from. |
310: 
311: #### Returns
312: 
313: [Font object](fontobject.md)
314: 
315: ---
316: 
317: ### FontsObject.getFontByID()
318: 
319: `app.fonts.getFontByID(fontID)`
320: 
321: !!! note
322:     This functionality was added in After Effects 24.2
323: 
324: #### Description
325: 
326: This function will return an instance of [Font object](fontobject.md) based on the ID of a previously found font.
327: 
328: If no matching font is found, it will return undefined. This can occur with an unknown ID or if the original font has been removed from the font environment.
329: 
330: ```javascript
331: var font1 = app.fonts.allFonts[0][0];
332: var font2 = app.fonts.getFontByID(font1.fontID);
333: alert(font1.fontID == font2.fontID);
334: ```
335: 
336: #### Parameters
337: 
338: | Parameter |  Type   |     Description     |
339: | --------- | ------- | ------------------- |
340: | fontID    | Integer | The ID of the font. |
341: 
342: #### Returns
343: 
344: [Font object](fontobject.md), or undefined if no font by that ID.
345: 
346: ---
347: 
348: ### FontsObject.getFontsByFamilyNameAndStyleName()
349: 
350: `app.fonts.getFontsByFamilyNameAndStyleName(familyName, styleName)`
351: 
352: #### Description
353: 
354: This function will return an array of [Font object](fontobject.md) based on the Family Name and Style Name of a font. If no suitable font is found, it will return an empty Array.
355: 
356: !!! tip
357:     The returned array length can be more than 1 if you have multiple copies of a same font.
358: 
359: ```javascript
360: var fontList = app.fonts.getFontsByFamilyNameAndStyleName("Abolition", "Regular")
361: alert(fontList.length);
362: ```
363: 
364: #### Parameters
365: 
366: | Parameter  |  Type  |         Description          |
367: | ---------- | ------ | ---------------------------- |
368: | FamilyName | String | The Family Name of the font. |
369: | StyleName  | String | The Style Name of the font.  |
370: 
371: #### Returns
372: 
373: Array of [Font objects](fontobject.md); read-only.
374: 
375: ---
376: 
377: ### FontsObject.getFontsByPostScriptName()
378: 
379: `app.fonts.getFontsByPostScriptName(postscriptName)`
380: 
381: #### Description
382: 
383: This function will return an array of [Font objects](fontobject.md) based on the PostScript name of previously found Fonts.
384: 
385: It is perfectly valid to have multiple [Font objects](fontobject.md) which share the same PostScript name, the order of these is determined by the order in which they were enumerated in the font environment. The entry at `[0]` will be used when setting the [TextDocument.fontObject](textdocument.md#textdocumentfontobject) property.
386: 
387: In addition, there is a special property of this API with regards to Variable fonts. If no [Font object](fontobject.md) matching the requested PostScript exists, but we find that there exist a variable font which matches the requested PostScript name prefix, then this Variable font instance will be requested to create a matching [Font object](fontobject.md). This is the only way that we will return an instance which did not exist prior to invoking this method.
388: 
389: If no matching font is found, it will return an empty Array.
390: 
391: ```javascript
392: var fontList = app.fonts.getFontsByPostScriptName("Abolition")
393: alert(fontList.length);
394: ```
395: 
396: #### Parameters
397: 
398: |   Parameter    |  Type  |           Description            |
399: | -------------- | ------ | -------------------------------- |
400: | postscriptName | String | The PostScript Name of the font. |
401: 
402: #### Returns
403: 
404: Array of [Font objects](fontobject.md); read-only.
405: 
406: ---
407: 
408: ### FontsObject.pollForAndPushNonSystemFontFoldersChanges()
409: 
410: `app.fonts.pollForAndPushNonSystemFontFoldersChanges()`
411: 
412: !!! note
413:     This functionality was added in After Effects 24.6
414: 
415: #### Description
416: 
417: The addition and removal of font files in what is considered the *system font folders* is recognized and handled automatically without user intervention to update the font environment. Non-system font folders are not automatically handled and so additions and removal of font files in these folders are not recognized until the After Effects is restarted.
418: 
419: This function will trigger a check against the known non-system font folders, and if it is recognized that there has been a change, an asynchronous update to the font environment will be scheduled to process this change.
420: 
421: The non-system font folders After Effects knows about are here:
422: 
423: ```text
424: Windows: <systemDrive>:\Program Files\Common Files\Adobe\Fonts
425: 
426: Mac: /Library/Application Support/Adobe/Fonts
427: ```
428: 
429: #### Returns
430: 
431: Boolean; One of:
432: 
433: - `false` if no changes to the font environment are known.
434: - `true` if a change in the font environment has been detected and an asynchronous update scheduled to deal with it. This state will be cleared once the update has been processed, at which time [FontsObject.fontServerRevision](#fontsobjectfontserverrevision) will return an incremented value.
435: 
436: —
437: 
438: ### FontsObject.setDefaultFontForCTScript()
439: 
440: `app.fonts.setDefaultFontForCTScript(ctScript, font)`
441: 
442: !!! note
443:     This functionality was added in After Effects 25.1
444: 
445: #### Description
446: 
447: This function will set an instance of [Font object](fontobject.md) mapped based on `CTScript` parameter.
448: 
449: After Effects uses these mappings when typing or applying a font where it finds
450: that the font does not contain a glyph for a given character.
451: In this situation it will attempt to map the character to a `CTScript` value
452: and then use this default mapping to select an alternate font which may have a glyph
453: for the character.
454: 
455: Variable fonts are not acceptable as defaults and will result in an exception being thrown.
456: 
457: There is no requirement that the specfied font has glyphs for any or all of the characters
458: mapped to the `CTScript`.
459: 
460: This mechanism is also used with text and fonts in Scripting thus providing a way
461: to expose which fonts will be used for which `CTScript` values (see [FontsObject.getDefaultFontForCTScript()](#fontsobjectgetdefaultfontforctscript)).
462: 
463: The font assigned to the `CTScript.CT_ROMAN_SCRIPT` is the one which is used to re-initialize the Character Panel after resetting the character style.
464: 
465: To reset the default for a specific `CTScript` back to the value it had at App launch, simply pass in `null`.
466: 
467: ```javascript
468: var font = app.fonts.getFontsByPostScriptName("MyriadPro-Regular")[0];
469: var ret = app.fonts.setDefaultFontForCTScript(CTScript.CT_ROMAN_SCRIPT, font);
470: alert("set:" + ret);
471: ```
472: 
473: #### Parameters
474: 
475: | Parameter  |             Type             |                           Description                            |
476: | ---------- | ---------------------------- | ---------------------------------------------------------------- |
477: | `ctScript` | `CTScript` enum              | CTScript for font to be mapped                                   |
478: | `font`     | [Font object](fontobject.md) | The font to be mapped. If `null`, then current mapping is reset. |
479: 
480: #### Returns
481: 
482: Boolean; One of:
483: 
484: - `false` if the specfied mapping is the same the current one.
485: - `true` if the specified mapping is different from the current one.
````

## File: docs/official/text/paragraphrange.md
````markdown
  1: # ParagraphRange object
  2: 
  3: `app.project.item(index).layer(index).text.sourceText.value.paragraphRange(paragraphIndexStart, [signedParagraphIndexEnd])`
  4: 
  5: !!! note
  6:     This functionality was added in After Effects 24.3
  7: 
  8: #### Description
  9: 
 10: The ParagraphRange object is an accessor to a paragraph range of the [TextDocument object](textdocument.md) instance it was created from.
 11: 
 12: - The [characterStart](#paragraphrangecharacterstart) attribute will report the first character index of the range.
 13: - The [characterEnd](#paragraphrangecharacterend) attribute will report the (last + 1) character index of the range, such that ([characterEnd](#paragraphrangecharacterend) - [characterStart](#paragraphrangecharacterstart)) represents the number of characters in the range.
 14: - The only time these two properties will equal will on an empty last paragraph of the [TextDocument object](textdocument.md).
 15: 
 16: When accessed, the ParagraphRange object will check that effective [characterStart](#paragraphrangecharacterstart) and effective [characterEnd](#paragraphrangecharacterend) of the range remains valid for the current span of the related [TextDocument object](textdocument.md). This is the same rule as applied when the ParagraphRange was created, but because the length of the related [TextDocument object](textdocument.md) can change through the addition or removal of characters, the effective [characterStart](#paragraphrangecharacterstart) and effective [characterEnd](#paragraphrangecharacterend) may no longer be valid. In this situation an exception will be thrown on access, either read or write. The [isRangeValid](#paragraphrangeisrangevalid) attribute will return `false` if the effective range is no longer valid.
 17: 
 18: Note that if the [TextDocument object](textdocument.md) length changes, the character range could become valid again.
 19: 
 20: As a convenience, the function [ParagraphRange.characterRange()](#paragraphrangecharacterrange) can be invoked which will return a [CharacterRange object](characterrange.md) instance initialized from [characterStart](#paragraphrangecharacterstart) and [characterEnd](#paragraphrangecharacterend).
 21: This instance becomes independent of the ParagraphRange instance it came from so subsequent changes to the ParagraphRange limits are not communicated to the [CharacterRange object](characterrange.md) instance.
 22: 
 23: For performance reasons, when accessing multiple attributes it is adviseable to retrieve the [CharacterRange object](characterrange.md) once and re-use it rather than create a new one each time.
 24: 
 25: #### Examples
 26: 
 27: This increases the font size of the first paragraph in the TextDocument, and set the rest of the paragraphs to fontSize 40.
 28: 
 29: ```javascript
 30: var textDocument = app.project.item(index).layer(index).property("Source Text").value;
 31: 
 32: var paragraphRange0 = textDocument.paragraphRange(0,1);
 33: var characterRange0 = paragraphRange0.characterRange();
 34: characterRange0.fontSize = characterRange0.fontSize + 5;
 35: 
 36: textDocument.paragraphRange(1,-1).characterRange().fontSize = 40;
 37: ```
 38: 
 39: ---
 40: 
 41: ## Attributes
 42: 
 43: ### ParagraphRange.characterEnd
 44: 
 45: `ParagraphRange.characterEnd`
 46: 
 47: #### Description
 48: 
 49: The Text layer range calculated character end value.
 50: 
 51: Throws an exception on access if the effective value would exceed the bounds of the related [TextDocument object](textdocument.md).
 52: 
 53: #### Type
 54: 
 55: Unsigned integer; read-only.
 56: 
 57: ---
 58: 
 59: ### ParagraphRange.characterStart
 60: 
 61: `ParagraphRange.characterStart`
 62: 
 63: #### Description
 64: 
 65: The Text layer range calculated character start value.
 66: 
 67: Throws an exception on access if the effective value would exceed the bounds of the related [TextDocument object](textdocument.md).
 68: 
 69: #### Type
 70: 
 71: Unsigned integer; read-only.
 72: 
 73: ---
 74: 
 75: ### ParagraphRange.isRangeValid
 76: 
 77: `ParagraphRange.isRangeValid`
 78: 
 79: #### Description
 80: 
 81: Returns `true` if the current range is within the bounds of the related [TextDocument object](textdocument.md), otherwise `false`.
 82: 
 83: #### Type
 84: 
 85: Boolean; read-only.
 86: 
 87: ---
 88: 
 89: ## Methods
 90: 
 91: ### ParagraphRange.characterRange()
 92: 
 93: `ParagraphRange.characterRange()`
 94: 
 95: #### Description
 96: 
 97: Returns a [CharacterRange object](characterrange.md) initialized from [characterStart](#paragraphrangecharacterstart) and [characterEnd](#paragraphrangecharacterend).
 98: 
 99: Will throw an exception if [isRangeValid](#paragraphrangeisrangevalid) would return `false`.
100: 
101: The returned instance, once created, is independent of subsequent changes to the ParagraphRange it came from.
102: 
103: #### Parameters
104: 
105: None.
106: 
107: #### Returns
108: 
109: [CharacterRange object](characterrange.md);
110: 
111: ---
112: 
113: ### ParagraphRange.toString()
114: 
115: `ParagraphRange.toString()`
116: 
117: #### Description
118: 
119: Returns a string with the parameters used to create the ParagraphRange instance, e.g. `"ParagraphRange(0,-1)"`
120: 
121: This may be safely called on an instance where [isRangeValid](#paragraphrangeisrangevalid) returns `false`.
122: 
123: #### Parameters
124: 
125: None.
126: 
127: #### Returns
128: 
129: String;
````

## File: docs/official/text/textdocument.md
````markdown
   1: # TextDocument object
   2: 
   3: `new TextDocument(docText)`
   4: 
   5: `app.project.item(index).layer(index).property("Source Text").value`
   6: 
   7: 
   8: #### Description
   9: 
  10: The TextDocument object stores a value for a TextLayer's Source Text property. Create it with the constructor, passing the string to be encapsulated.
  11: 
  12: #### Examples
  13: 
  14: This sets a value of some source text and displays an alert showing the new value.
  15: 
  16: ```javascript
  17: var myTextDocument = new TextDocument("HappyCake");
  18: myTextLayer.property("Source Text").setValue(myTextDocument);
  19: alert(myTextLayer.property("Source Text").value);
  20: ```
  21: 
  22: This sets keyframe values for text that show different words over time
  23: 
  24: ```javascript
  25: var textProp = myTextLayer.property("Source Text");
  26: textProp.setValueAtTime(0, newTextDocument("Happy"));
  27: textProp.setValueAtTime(.33, newTextDocument("cake"));
  28: textProp.setValueAtTime(.66, newTextDocument("is"));
  29: textProp.setValueAtTime(1, newTextDocument("yummy!"));
  30: ```
  31: 
  32: This sets various character and paragraph settings for some text
  33: 
  34: ```javascript
  35: var textProp = myTextLayer.property("Source Text");
  36: var textDocument = textProp.value;
  37: myString = "Happy holidays!";
  38: textDocument.resetCharStyle();
  39: textDocument.fontSize = 60;
  40: textDocument.fillColor = [1, 0, 0];
  41: textDocument.strokeColor = [0, 1, 0];
  42: textDocument.strokeWidth = 2;
  43: textDocument.font = "Times New Roman PSMT";
  44: textDocument.strokeOverFill = true;
  45: textDocument.applyStroke = true;
  46: textDocument.applyFill = true;
  47: textDocument.text = myString;
  48: textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
  49: textDocument.tracking = 50;
  50: textProp.setValue(textDocument);
  51: ```
  52: 
  53: ---
  54: 
  55: ## Attributes
  56: 
  57: ### TextDocument.allCaps
  58: 
  59: `textDocument.allCaps`
  60: 
  61: !!! note
  62:     This functionality was added in After Effects 13.2 (CC 2014.2)
  63: 
  64: #### Description
  65: 
  66: `true` if a Text layer has All Caps enabled; otherwise `false`. To set this value, use [fontCapsOption](#textdocumentfontcapsoption) added in After Effects 24.0.
  67: 
  68: !!! warning
  69:     This value only reflects the first character in the Text layer.
  70: 
  71: #### Type
  72: 
  73: Boolean; read-only.
  74: 
  75: ---
  76: 
  77: ### TextDocument.applyFill
  78: 
  79: `textDocument.applyFill`
  80: 
  81: #### Description
  82: 
  83: When `true`, the Text layer shows a fill. Access the [fillColor](#textdocumentfillcolor) attribute for the actual color. When `false`, only a stroke is shown.
  84: 
  85: #### Type
  86: 
  87: Boolean; read/write.
  88: 
  89: ---
  90: 
  91: ### TextDocument.applyStroke
  92: 
  93: `textDocument.applyStroke`
  94: 
  95: #### Description
  96: 
  97: When `true`, the Text layer shows a stroke. Access the [strokeColor](#textdocumentstrokecolor) attribute for the actual color and [strokeWidth](#textdocumentstrokewidth) for its thickness. When `false`, only a fill is shown.
  98: 
  99: #### Type
 100: 
 101: Boolean; read/write.
 102: 
 103: ---
 104: 
 105: ### TextDocument.autoHyphenate
 106: 
 107: `textDocument.autoHyphenate`
 108: 
 109: !!! note
 110:     This functionality was added in After Effects 24.0
 111: 
 112: #### Description
 113: 
 114: The Text layer's auto hyphenate paragraph option.
 115: 
 116: If this attribute has a mixed value, it will be read as `undefined`.
 117: 
 118: !!! warning
 119:     This value reflects all paragraphs in the Text layer.
 120: If you change this value, it will set all paragraphs in the Text layer to the specified setting.
 121: 
 122: #### Type
 123: 
 124: Boolean; read/write.
 125: 
 126: ---
 127: 
 128: ### TextDocument.autoLeading
 129: 
 130: `textDocument.autoLeading`
 131: 
 132: #### Description
 133: 
 134: The Text layer's auto leading character option.
 135: 
 136: If this attribute has a mixed value, it will be read as `undefined`.
 137: 
 138: !!! warning
 139:     This value reflects all paragraphs in the Text layer.
 140: If you change this value, it will set all paragraphs in the Text layer to the specified setting.
 141: 
 142: #### Type
 143: 
 144: Boolean; read/write.
 145: 
 146: ---
 147: 
 148: ### TextDocument.autoKernType
 149: 
 150: `textDocument.autoKernType`
 151: 
 152: !!! note
 153:     This functionality was added in After Effects 24.0
 154: 
 155: #### Description
 156: 
 157: The Text layer's auto kern type option.
 158: 
 159: !!! warning
 160:     This value only reflects the first character in the Text layer.
 161: If you change this value, it will set all characters in the Text layer to the specified setting.
 162: 
 163: #### Type
 164: 
 165: An `AutoKernType` enumerated value; read/write. One of:
 166: 
 167: - `AutoKernType.NO_AUTO_KERN`
 168: - `AutoKernType.METRIC_KERN`
 169: - `AutoKernType.OPTICAL_KERN`
 170: 
 171: ---
 172: 
 173: ### TextDocument.baselineDirection
 174: 
 175: `textDocument.baselineDirection`
 176: 
 177: !!! note
 178:     This functionality was added in After Effects 24.0
 179: 
 180: #### Description
 181: 
 182: The Text layer's baseline direction option. This is significant for Japanese language in vertical texts. "BASELINE_VERTICAL_CROSS_STREAM" is also know as Tate-Chu-Yoko.
 183: 
 184: !!! warning
 185:     This value only reflects the first character in the Text layer.
 186: If you change this value, it will set all characters in the Text layer to the specified setting.
 187: 
 188: #### Type
 189: 
 190: A `BaselineDirection` enumerated value; read/write. One of:
 191: 
 192: - `BaselineDirection.BASELINE_WITH_STREAM`
 193: - `BaselineDirection.BASELINE_VERTICAL_ROTATED`
 194: - `BaselineDirection.BASELINE_VERTICAL_CROSS_STREAM`
 195: 
 196: ---
 197: 
 198: ### TextDocument.baselineLocs
 199: 
 200: `textDocument.baselineLocs`
 201: 
 202: !!! note
 203:     This functionality was added in After Effects 13.6 (CC 2015)
 204: 
 205: #### Description
 206: 
 207: The baseline (x,y) locations for a Text layer. Line wraps in a paragraph text box are treated as multiple lines.
 208: 
 209: !!! tip
 210:     If a line has no characters, the x and y values for start and end will be the maximum float value (`3.402823466e+38F`).
 211: 
 212: #### Type
 213: 
 214: Array of floating-point values in the form of
 215: 
 216: ```javascript
 217: [
 218:     line0.start_x,
 219:     line0.start_y,
 220:     line0.end_x,
 221:     line0.end_y,
 222:     line1.start_x,
 223:     line1.start_y,
 224:     line1.end_x,
 225:     line1.end_y,
 226:     ...
 227:     lineN-1.start_x,
 228:     lineN-1.start_y,
 229:     lineN-1.end_x,
 230:     lineN-1.end_y
 231: ]
 232: ```
 233: 
 234: ---
 235: 
 236: ### TextDocument.baselineShift
 237: 
 238: `textDocument.baselineShift`
 239: 
 240: !!! note
 241:     This functionality was added in After Effects 13.2 (CC 2014.2)
 242: 
 243: #### Description
 244: 
 245: This Text layer's baseline shift in pixels.
 246: 
 247: !!! warning
 248:     This value only reflects the first character in the Text layer.
 249: If you change this value, it will set all characters in the Text layer to the specified setting.
 250: 
 251: #### Type
 252: 
 253: Floating-point value; read-write.
 254: 
 255: ---
 256: 
 257: ### TextDocument.boxAutoFitPolicy
 258: 
 259: `textDocument.boxAutoFitPolicy`
 260: 
 261: !!! note
 262:     This functionality was added in After Effects 24.6
 263: 
 264: #### Description
 265: 
 266: Enables the automated change of the box height to fit the text content in the box.
 267: The box only grows down.
 268: 
 269: Defaults to `BoxAutoFitPolicy.NONE`.
 270: 
 271: Will be disabled if [TextDocument.boxVerticalAlignment](#textdocumentboxverticalalignment) is anything other than `BoxVerticalAlignment.TOP`.
 272: 
 273: #### Type
 274: 
 275: A `BoxAutoFitPolicy` enumerated value; read-write. One of:
 276: 
 277: - `BoxAutoFitPolicy.NONE`
 278: - `BoxAutoFitPolicy.HEIGHT_CURSOR`
 279: - `BoxAutoFitPolicy.HEIGHT_PRECISE_BOUNDS`
 280: - `BoxAutoFitPolicy.HEIGHT_BASELINE`
 281: 
 282: ---
 283: 
 284: ### TextDocument.boxFirstBaselineAlignment
 285: 
 286: `textDocument.boxFirstBaselineAlignment`
 287: 
 288: !!! note
 289:     This functionality was added in After Effects 24.6
 290: 
 291: #### Description
 292: 
 293: Controls the position of the first line of composed text relative to the top of the box.
 294: 
 295: Disabled if [TextDocument.boxFirstBaselineAlignmentMinimum](#textdocumentboxfirstbaselinealignmentminimum) is anything other than zero.
 296: 
 297: Defaults to `BoxFirstBaselineAlignment.ASCENT`.
 298: 
 299: #### Type
 300: 
 301: A `BoxFirstBaselineAlignment` enumerated value; read-write. One of:
 302: 
 303: - `BoxFirstBaselineAlignment.ASCENT`
 304: - `BoxFirstBaselineAlignment.CAP_HEIGHT`
 305: - `BoxFirstBaselineAlignment.EM_BOX`
 306: - `BoxFirstBaselineAlignment.LEADING`
 307: - `BoxFirstBaselineAlignment.LEGACY_METRIC`
 308: - `BoxFirstBaselineAlignment.MINIMUM_VALUE_ASIAN`
 309: - `BoxFirstBaselineAlignment.MINIMUM_VALUE_ROMAN`
 310: - `BoxFirstBaselineAlignment.TYPO_ASCENT`
 311: - `BoxFirstBaselineAlignment.X_HEIGHT`
 312: 
 313: ---
 314: 
 315: ### TextDocument.boxFirstBaselineAlignmentMinimum
 316: 
 317: `textDocument.boxFirstBaselineAlignmentMinimum`
 318: 
 319: !!! note
 320:     This functionality was added in After Effects 24.6
 321: 
 322: #### Description
 323: 
 324: Manually controls the position of the first line of composed text relative to the top of the box.
 325: 
 326: A value set here other than zero will override the effect of the [TextDocument.boxFirstBaselineAlignment](#textdocumentboxfirstbaselinealignment) value.
 327: 
 328: Defaults to zero.
 329: 
 330: #### Type
 331: 
 332: Floating-point value; read/write.
 333: 
 334: ---
 335: 
 336: ### TextDocument.boxInsetSpacing
 337: 
 338: `textDocument.boxInsetSpacing`
 339: 
 340: !!! note
 341:     This functionality was added in After Effects 24.6
 342: 
 343: #### Description
 344: 
 345: Controls the inner space between the box bounds and where the composable text box begins. The same value is applied to all four sides of the box.
 346: 
 347: Defaults to zero.
 348: 
 349: #### Type
 350: 
 351: Floating-point value; read/write.
 352: 
 353: ---
 354: 
 355: ### TextDocument.boxOverflow
 356: 
 357: `textDocument.boxOverflow`
 358: 
 359: !!! note
 360:     This functionality was added in After Effects 24.6
 361: 
 362: #### Description
 363: 
 364: Returns `true` if some part of the text did not compose into the box.
 365: 
 366: #### Type
 367: 
 368: Boolean; read-only.
 369: 
 370: ---
 371: 
 372: ### TextDocument.boxText
 373: 
 374: `textDocument.boxText`
 375: 
 376: #### Description
 377: 
 378: `true` if a Text layer is a layer of paragraph (bounded) text; otherwise `false`.
 379: 
 380: #### Type
 381: 
 382: Boolean; read-only.
 383: 
 384: ---
 385: 
 386: ### TextDocument.boxTextPos
 387: 
 388: `textDocument.boxTextPos`
 389: 
 390: !!! note
 391:     This functionality was added in After Effects 13.2 (CC 2014.2)
 392: 
 393:     As of After Effects 14 (CC2017), it seems this is also writeable.
 394: 
 395: #### Description
 396: 
 397: The layer coordinates from a paragraph (box) Text layer's anchor point as a [width, height] array of pixel dimensions.
 398: 
 399: !!! warning
 400:     Throws an exception if [boxText](#textdocumentboxtext) does not return `true` for the Text layer.
 401: 
 402: #### Type
 403: 
 404: Array of ([X,Y]) position coordinates; read/write.
 405: 
 406: #### Example
 407: 
 408: ```javascript
 409: // For a paragraph Text layer returns [x, y] position from layer anchor point in layer coordinates.
 410: // e.g. approximately [0, -25] with default character panel settings.
 411: var boxTextLayerPos = myTextLayer.sourceText.value.boxTextPos;
 412: ```
 413: 
 414: ---
 415: 
 416: ### TextDocument.boxTextSize
 417: 
 418: `textDocument.boxTextSize`
 419: 
 420: #### Description
 421: 
 422: The size of a paragraph (box) Text layer as a [width, height] array of pixel dimensions.
 423: 
 424: !!! warning
 425:     Throws an exception if [boxText](#textdocumentboxtext) does not return `true` for the Text layer.
 426: 
 427: #### Type
 428: 
 429: Array of two integers (minimum value of 1); read/write.
 430: 
 431: ---
 432: 
 433: ### TextDocument.boxVerticalAlignment
 434: 
 435: `textDocument.boxVerticalAlignment`
 436: 
 437: !!! note
 438:     This functionality was added in After Effects 24.6
 439: 
 440: #### Description
 441: 
 442: Enables the automated vertical alignment of the composed text in the box.
 443: 
 444: Defaults to `BoxVerticalAlignment.TOP`
 445: 
 446: #### Type
 447: 
 448: A `BoxVerticalAlignment` enumerated value; read-write. One of:
 449: 
 450: - `BoxVerticalAlignment.TOP`
 451: - `BoxVerticalAlignment.CENTER`
 452: - `BoxVerticalAlignment.BOTTOM`
 453: - `BoxVerticalAlignment.JUSTIFY`
 454: 
 455: ---
 456: 
 457: ### TextDocument.composedLineCount
 458: 
 459: `textDocument.composedLineCount`
 460: 
 461: #### Description
 462: 
 463: Returns the number of composed lines in the Text layer, may be zero if all text is overset.
 464: 
 465: The [TextDocument object](#textdocument-object) instance is initialized from the composed state and subsequent changes to the [TextDocument object](#textdocument-object) instance does not cause recomposition.
 466: 
 467: Even if you remove all the text from the [TextDocument object](#textdocument-object) instance, the value returned here remains unchanged.
 468: 
 469: #### Type
 470: 
 471: Integer; read-only.
 472: 
 473: ---
 474: 
 475: ### TextDocument.composerEngine
 476: 
 477: `textDocument.composerEngine`
 478: 
 479: !!! note
 480:     This functionality was added in After Effects 24.0
 481: 
 482: #### Description
 483: 
 484: The Text layer's paragraph composer engine option. By default new Text layers will use the `ComposerEngine.UNIVERSAL_TYPE_ENGINE`; the other enum value will only be encountered in projects created before the Universal Type Engine engine (formerly known as the South Asian and Middle Eastern engine) became the default in [After Effects 22.1.1](https://helpx.adobe.com/after-effects/using/whats-new/2022-1.html).
 485: 
 486: If this attribute has a mixed value, it will be read as `undefined`.
 487: 
 488: This attrribute is read-write, but an exception will be thrown if any enum value other than `ComposerEngine.UNIVERSAL_TYPE_ENGINE` is written.
 489: 
 490: In effect, you can change an older document from `ComposerEngine.LATIN_CJK_ENGINE` to `ComposerEngine.UNIVERSAL_TYPE_ENGINE`, but not the reverse.
 491: 
 492: !!! warning
 493:     This value reflects all paragraphs in the Text layer.
 494: If you change this value, it will set all paragraphs in the Text layer to the specified setting.
 495: 
 496: #### Type
 497: 
 498: A `ComposerEngine` enumerated value; read-write. One of:
 499: 
 500: - `ComposerEngine.LATIN_CJK_ENGINE`
 501: - `ComposerEngine.UNIVERSAL_TYPE_ENGINE`
 502: 
 503: ---
 504: 
 505: ### TextDocument.digitSet
 506: 
 507: `textDocument.digitSet`
 508: 
 509: !!! note
 510:     This functionality was added in After Effects 24.0
 511: 
 512: #### Description
 513: 
 514: The Text layer's digit set option.
 515: 
 516: !!! warning
 517:     This value only reflects the first character in the Text layer.
 518: If you change this value, it will set all characters in the Text layer to the specified setting.
 519: 
 520: #### Type
 521: 
 522: A `DigitSet` enumerated value; read/write. One of:
 523: 
 524: - `DigitSet.DEFAULT_DIGITS`
 525: - `DigitSet.ARABIC_DIGITS`
 526: - `DigitSet.HINDI_DIGITS`
 527: - `DigitSet.FARSI_DIGITS`
 528: - `DigitSet.ARABIC_DIGITS_RTL`
 529: 
 530: ---
 531: 
 532: ### TextDocument.direction
 533: 
 534: `textDocument.direction`
 535: 
 536: !!! note
 537:     This functionality was added in After Effects 24.0
 538: 
 539: #### Description
 540: 
 541: The Text layer's paragraph direction option.
 542: 
 543: If this attribute has a mixed value, it will be read as `undefined`.
 544: 
 545: !!! warning
 546:     This value reflects all paragraphs in the Text layer.
 547: If you change this value, it will set all paragraphs in the Text layer to the specified setting.
 548: 
 549: #### Type
 550: 
 551: A `ParagraphDirection` enumerated value; read/write. One of:
 552: 
 553: - `ParagraphDirection.DIRECTION_LEFT_TO_RIGHT`
 554: - `ParagraphDirection.DIRECTION_RIGHT_TO_LEFT`
 555: 
 556: ---
 557: 
 558: ### TextDocument.endIndent
 559: 
 560: `textDocument.endIndent`
 561: 
 562: !!! note
 563:     This functionality was added in After Effects 24.0
 564: 
 565: #### Description
 566: 
 567: The Text layer's paragraph end indent option.
 568: 
 569: If this attribute has a mixed value, it will be read as `undefined`.
 570: 
 571: !!! warning
 572:     This value reflects all paragraphs in the Text layer.
 573: If you change this value, it will set all paragraphs in the Text layer to the specified setting.
 574: 
 575: #### Type
 576: 
 577: Floating-point value; read/write.
 578: 
 579: ---
 580: 
 581: ### TextDocument.everyLineComposer
 582: 
 583: `textDocument.everyLineComposer`
 584: 
 585: !!! note
 586:     This functionality was added in After Effects 24.0
 587: 
 588: #### Description
 589: 
 590: The Text layer's Every-Line Composer paragraph option. If set to `false`, the TextDocument will use the Single-Line Composer.
 591: 
 592: If this attribute has a mixed value, it will be read as `undefined`.
 593: 
 594: !!! warning
 595:     This value reflects all paragraphs in the Text layer.
 596: If you change this value, it will set all paragraphs in the Text layer to the specified setting.
 597: 
 598: #### Type
 599: 
 600: Boolean; read/write.
 601: 
 602: ---
 603: 
 604: ### TextDocument.fauxBold
 605: 
 606: `textDocument.fauxBold`
 607: 
 608: !!! note
 609:     The read functionality was added in After Effects 13.2 (CC 2014.2).
 610: 
 611:     The write functionality was added in After Effects 24.0
 612: 
 613: 
 614: #### Description
 615: 
 616: `true` if a Text layer has faux bold enabled; otherwise `false`.
 617: 
 618: !!! warning
 619:     This value only reflects the first character in the Text layer.
 620: If you change this value, it will set all characters in the Text layer to the specified setting.
 621: 
 622: #### Type
 623: 
 624: Boolean; read/write.
 625: 
 626: #### Example
 627: 
 628: ```javascript
 629: var isFauxBold = myTextLayer.sourceText.value.fauxBold;
 630: ```
 631: 
 632: ---
 633: 
 634: ### TextDocument.fauxItalic
 635: 
 636: `textDocument.fauxItalic`
 637: 
 638: !!! note
 639:     The read functionality was added in After Effects 13.2 (CC 2014.2).
 640: 
 641:     The write functionality was added in After Effects 24.0
 642: 
 643: #### Description
 644: 
 645: `true` if a Text layer has faux italic enabled; otherwise `false`.
 646: 
 647: !!! warning
 648:     This value only reflects the first character in the Text layer.
 649: If you change this value, it will set all characters in the Text layer to the specified setting.
 650: 
 651: #### Type
 652: 
 653: Boolean; read/write.
 654: 
 655: ---
 656: 
 657: ### TextDocument.fillColor
 658: 
 659: `textDocument.fillColor`
 660: 
 661: #### Description
 662: 
 663: The Text layer's fill color, as an array of `[r, g, b]` floating-point values. For example, in an 8-bpc project, a red value of 255 would be 1.0, and in a 32-bpc project, an overbright blue value can be something like 3.2.
 664: 
 665: Throws an exception on read if [applyFill](#textdocumentapplyfill) is not `true`.
 666: 
 667: Setting this value will also set [applyFill](#textdocumentapplyfill) to `true` across the affected characters.
 668: 
 669: !!! warning
 670:     This value only reflects the first character in the Text layer.
 671: If you change this value, it will set all characters in the Text layer to the specified setting.
 672: 
 673: #### Type
 674: 
 675: Array `[r, g, b]` of floating-point values; read/write.
 676: 
 677: ---
 678: 
 679: ### TextDocument.firstLineIndent
 680: 
 681: `textDocument.firstLineIndent`
 682: 
 683: !!! note
 684:     This functionality was added in After Effects 24.0
 685: 
 686: #### Description
 687: 
 688: The Text layer's paragraph first line indent option.
 689: 
 690: If this attribute has a mixed value, it will be read as `undefined`.
 691: 
 692: !!! warning
 693:     This value reflects all paragraphs in the Text layer.
 694: If you change this value, it will set all paragraphs in the Text layer to the specified setting.
 695: 
 696: #### Type
 697: 
 698: Floating-point value; read/write.
 699: 
 700: ---
 701: 
 702: ### TextDocument.font
 703: 
 704: `textDocument.font`
 705: 
 706: #### Description
 707: 
 708: The Text layer's font specified by its PostScript name.
 709: 
 710: On write, there are very few resrictions on what can be supplied - if the underlying font management system does not have a matching [Font object](fontobject.md) instance matching the supplied PostScript name a substitute instance will be created.
 711: The Font instance returned in the case of duplicate PostScript names will be the 0th element of the array returned from [FontsObject.getFontsByPostScriptName()](fontsobject.md#fontsobjectgetfontsbypostscriptname).
 712: 
 713: You should use the [Font object](fontobject.md) attribute for precise control.
 714: 
 715: !!! warning
 716:     This value only reflects the first character in the Text layer.
 717: If you change this value, it will set all characters in the Text layer to the specified setting.
 718: 
 719: #### Type
 720: 
 721: String; read/write.
 722: 
 723: ---
 724: 
 725: ### TextDocument.fontBaselineOption
 726: 
 727: `textDocument.fontBaselineOption`
 728: 
 729: !!! note
 730:     This functionality was added in After Effects 24.0
 731: 
 732: #### Description
 733: 
 734: The Text layer's font baseline option. This is for setting a textDocument to superscript or subscript.
 735: 
 736: !!! warning
 737:     This value only reflects the first character in the Text layer.
 738: If you change this value, it will set all characters in the Text layer to the specified setting.
 739: 
 740: #### Type
 741: 
 742: A `FontBaselineOption` enumerated value; read/write. One of:
 743: 
 744: - `FontBaselineOption.FONT_NORMAL_BASELINE`
 745: - `FontBaselineOption.FONT_FAUXED_SUPERSCRIPT`
 746: - `FontBaselineOption.FONT_FAUXED_SUBSCRIPT`
 747: 
 748: ---
 749: 
 750: ### TextDocument.fontCapsOption
 751: 
 752: `textDocument.fontCapsOption`
 753: 
 754: !!! note
 755:     This functionality was added in After Effects 24.0
 756: 
 757: #### Description
 758: 
 759: The Text layer's font caps option.
 760: 
 761: !!! warning
 762:     This value only reflects the first character in the Text layer.
 763: If you change this value, it will set all characters in the Text layer to the specified setting.
 764: 
 765: #### Type
 766: 
 767: A `FontCapsOption` enumerated value; read/write. One of:
 768: 
 769: - `FontCapsOption.FONT_NORMAL_CAPS`
 770: - `FontCapsOption.FONT_SMALL_CAPS`
 771: - `FontCapsOption.FONT_ALL_CAPS`
 772: - `FontCapsOption.FONT_ALL_SMALL_CAPS`
 773: 
 774: ---
 775: 
 776: ### TextDocument.fontFamily
 777: 
 778: `textDocument.fontFamily`
 779: 
 780: !!! note
 781:     This functionality was added in After Effects 13.1 (CC 2014.1)
 782: 
 783: #### Description
 784: 
 785: String with with the name of the font family.
 786: 
 787: !!! warning
 788:     This value only reflects the first character in the Text layer.
 789: 
 790: #### Type
 791: 
 792: String; read-only.
 793: 
 794: ---
 795: 
 796: ### TextDocument.fontLocation
 797: 
 798: `textDocument.fontLocation`
 799: 
 800: !!! note
 801:     This functionality was added in After Effects 13.1 (CC 2014.1)
 802: 
 803: #### Description
 804: 
 805: Path of font file, providing its location on disk.
 806: 
 807: !!! warning
 808:     Not guaranteed to be returned for all font types; return value may be empty string for some kinds of fonts.
 809: 
 810: !!! warning
 811:     This value only reflects the first character in the Text layer.
 812: 
 813: #### Type
 814: 
 815: String; read-only.
 816: 
 817: ---
 818: 
 819: ### TextDocument.fontObject
 820: 
 821: `textDocument.fontObject`
 822: 
 823: !!! note
 824:     This functionality was added in After Effects 24.0
 825: 
 826: #### Description
 827: 
 828: The Text layer's [Font object](fontobject.md) specified by its PostScript name.
 829: 
 830: !!! warning
 831:     This value only reflects the first character in the Text layer.
 832: 
 833: #### Type
 834: 
 835: [Font object](fontobject.md); read/write.
 836: 
 837: ---
 838: 
 839: ### TextDocument.fontSize
 840: 
 841: `textDocument.fontSize`
 842: 
 843: #### Description
 844: 
 845: The Text layer's font size in pixels.
 846: 
 847: !!! warning
 848:     This value only reflects the first character in the Text layer.
 849: If you change this value, it will set all characters in the Text layer to the specified setting.
 850: 
 851: #### Type
 852: 
 853: Floating-point value (0.1 to 1296, inclusive); read/write.
 854: 
 855: ---
 856: 
 857: ### TextDocument.fontStyle
 858: 
 859: `textDocument.fontStyle`
 860: 
 861: !!! note
 862:     This functionality was added in After Effects 13.1 (CC 2014.1)
 863: 
 864: #### Description
 865: 
 866: String with style information, e.g., "bold", "italic"
 867: 
 868: !!! warning
 869:     This value only reflects the first character in the Text layer.
 870: 
 871: #### Type
 872: 
 873: String; read-only.
 874: 
 875: ---
 876: 
 877: ### TextDocument.hangingRoman
 878: 
 879: `textDocument.hangingRoman`
 880: 
 881: !!! note
 882:     This functionality was added in After Effects 24.0
 883: 
 884: #### Description
 885: 
 886: The Text layer's Roman Hanging Punctuation paragraph option. This is only meaningful to box Text layers—it allows punctuation to fit outside the box rather than flow to the next line.
 887: 
 888: If this attribute has a mixed value, it will be read as `undefined`.
 889: 
 890: !!! warning
 891:     This value reflects all paragraphs in the Text layer.
 892: If you change this value, it will set all paragraphs in the Text layer to the specified setting.
 893: 
 894: #### Type
 895: 
 896: Boolean; read/write.
 897: 
 898: ---
 899: 
 900: ### TextDocument.horizontalScale
 901: 
 902: `textDocument.horizontalScale`
 903: 
 904: !!! note
 905:     This functionality was added in After Effects 13.2 (CC 2014.2)
 906: 
 907: #### Description
 908: 
 909: This Text layer's horizontal scale in pixels.
 910: 
 911: !!! warning
 912:     This value only reflects the first character in the Text layer.
 913: If you change this value, it will set all characters in the Text layer to the specified setting.
 914: 
 915: #### Type
 916: 
 917: Floating-point value; read-write.
 918: 
 919: #### Example
 920: 
 921: ```javascript
 922: var valOfHScale = myTextLayer.sourceText.value.horizontalScale;
 923: ```
 924: 
 925: ---
 926: 
 927: ### TextDocument.justification
 928: 
 929: `textDocument.justification`
 930: 
 931: #### Description
 932: 
 933: The paragraph justification for the Text layer.
 934: 
 935: #### Type
 936: 
 937: A `ParagraphJustification` enumerated value; read/write. One of:
 938: 
 939: - `ParagraphJustification.LEFT_JUSTIFY`
 940: - `ParagraphJustification.RIGHT_JUSTIFY`
 941: - `ParagraphJustification.CENTER_JUSTIFY`
 942: - `ParagraphJustification.FULL_JUSTIFY_LASTLINE_LEFT`
 943: - `ParagraphJustification.FULL_JUSTIFY_LASTLINE_RIGHT`
 944: - `ParagraphJustification.FULL_JUSTIFY_LASTLINE_CENTER`
 945: - `ParagraphJustification.FULL_JUSTIFY_LASTLINE_FULL`
 946: - `ParagraphJustification.MULTIPLE_JUSTIFICATIONS`
 947: 
 948: Text layers with mixed justification values will be read as `ParagraphJustification.MULTIPLE_JUSTIFICATIONS`.
 949: 
 950: Setting a TextDocument to use `ParagraphJustification.MULTIPLE_JUSTIFICATIONS` will result in `ParagraphJustification.CENTER_JUSTIFY` instead.
 951: 
 952: !!! warning
 953:     This value reflects all paragraphs in the Text layer.
 954: If you change this value, it will set all paragraphs in the Text layer to the specified setting.
 955: 
 956: ---
 957: 
 958: ### TextDocument.kerning
 959: 
 960: `textDocument.kerning`
 961: 
 962: !!! note
 963:     This functionality was added in After Effects 24.0
 964: 
 965: #### Description
 966: 
 967: The Text layer's kerning option.
 968: 
 969: Returns zero for `AutoKernType.METRIC_KERN` and `AutoKernType.OPTICAL_KERN`.
 970: 
 971: Setting this value will also set `AutoKernType.NO_AUTO_KERN` to `true` across the affected characters.
 972: 
 973: !!! warning
 974:     This value only reflects the first character in the Text layer.
 975: If you change this value, it will set all characters in the Text layer to the specified setting.
 976: 
 977: #### Type
 978: 
 979: Integer value; read/write.
 980: 
 981: ---
 982: 
 983: ### TextDocument.leading
 984: 
 985: `textDocument.leading`
 986: 
 987: !!! note
 988:     This functionality was added in After Effects 14.2 (CC 2017.1)
 989: 
 990: #### Description
 991: 
 992: The Text layer's spacing between lines.
 993: 
 994: Returns zero if [TextDocument.autoLeading](#textdocumentautoleading) is `true`.
 995: 
 996: Setting this value will also set [TextDocument.autoLeading](#textdocumentautoleading) to `true` across the affected characters.
 997: 
 998: !!! warning
 999:     This value only reflects the first character in the Text layer.
1000: If you change this value, it will set all characters in the Text layer to the specified setting.
1001: 
1002: The minimum accepted value to set is 0, but this will be silently clipped to 0.01.
1003: 
1004: #### Type
1005: 
1006: Floating-point value; read/write.
1007: 
1008: #### Example
1009: 
1010: ```javascript
1011: // This creates a Text layer and sets the leading to 100
1012: 
1013: var composition = app.project.activeItem;
1014: var myTextLayer = comp.layers.addText("Spring\nSummer\nAutumn\nWinter");
1015: var myTextSource = myTextLayer.sourceText;
1016: var myTextDocument = myTextSource.value;
1017: myTextDocument.leading = 100;
1018: myTextSource.setValue(myTextDocument);
1019: ```
1020: 
1021: ---
1022: 
1023: ### TextDocument.leadingType
1024: 
1025: `textDocument.leadingType`
1026: 
1027: !!! note
1028:     This functionality was added in After Effects 24.0
1029: 
1030: #### Description
1031: 
1032: The Text layer's paragraph leading type option.
1033: 
1034: If this attribute has a mixed value, it will be read as `undefined`.
1035: 
1036: !!! warning
1037:     This value reflects all paragraphs in the Text layer.
1038: If you change this value, it will set all paragraphs in the Text layer to the specified setting.
1039: 
1040: #### Type
1041: 
1042: A `LeadingType` enumerated value; read/write. One of:
1043: 
1044: - `LeadingType.ROMAN_LEADING_TYPE`
1045: - `LeadingType.JAPANESE_LEADING_TYPE`
1046: 
1047: ---
1048: 
1049: ### TextDocument.ligature
1050: 
1051: `textDocument.ligature`
1052: 
1053: !!! note
1054:     This functionality was added in After Effects 24.0
1055: 
1056: #### Description
1057: 
1058: The Text layer's ligature option.
1059: 
1060: !!! warning
1061:     This value only reflects the first character in the Text layer.
1062: If you change this value, it will set all characters in the Text layer to the specified setting.
1063: 
1064: #### Type
1065: 
1066: Boolean; read/write.
1067: 
1068: ---
1069: 
1070: ### TextDocument.lineJoinType
1071: 
1072: `textDocument.lineJoinType`
1073: 
1074: !!! note
1075:     This functionality was added in After Effects 24.0
1076: 
1077: #### Description
1078: 
1079: The Text layer's line join type option for Stroke.
1080: 
1081: !!! warning
1082:     This value only reflects the first character in the Text layer.
1083: If you change this value, it will set all characters in the Text layer to the specified setting.
1084: 
1085: #### Type
1086: 
1087: A `LineJoinType` enumerated value; read/write. One of:
1088: 
1089: - `LineJoinType.LINE_JOIN_MITER`
1090: - `LineJoinType.LINE_JOIN_ROUND`
1091: - `LineJoinType.LINE_JOIN_BEVEL`
1092: 
1093: ---
1094: 
1095: ### TextDocument.lineOrientation
1096: 
1097: `textDocument.lineOrientation`
1098: 
1099: !!! note
1100:     This functionality was added in After Effects 24.2
1101: 
1102: #### Description
1103: 
1104: The Text layer's line orientation, in general horizontal vs vertical, which affects how all text in the layer is composed.
1105: 
1106: #### Type
1107: 
1108: A `LineOrientation` enumerated value; read/write. One of:
1109: 
1110: - `LineOrientation.HORIZONTAL`
1111: - `LineOrientation.VERTICAL_RIGHT_TO_LEFT`
1112: - `LineOrientation.VERTICAL_LEFT_TO_RIGHT`
1113: 
1114: ---
1115: 
1116: ### TextDocument.noBreak
1117: 
1118: `textDocument.noBreak`
1119: 
1120: !!! note
1121:     This functionality was added in After Effects 24.0
1122: 
1123: #### Description
1124: 
1125: The Text layer's no break attribute.
1126: 
1127: !!! warning
1128:     This value only reflects the first character in the Text layer.
1129: If you change this value, it will set all characters in the Text layer to the specified setting.
1130: 
1131: #### Type
1132: 
1133: Boolean; read/write.
1134: 
1135: ---
1136: 
1137: ### TextDocument.paragraphCount
1138: 
1139: `textDocument.paragraphCount`
1140: 
1141: #### Description
1142: 
1143: Returns the number of paragraphs in the text layer, always greater than or equal to 1.
1144: 
1145: #### Type
1146: 
1147: Integer; read-only.
1148: 
1149: ---
1150: 
1151: ### TextDocument.pointText
1152: 
1153: `textDocument.pointText`
1154: 
1155: #### Description
1156: 
1157: `true` if a Text layer is a layer of point (unbounded) text; otherwise `false`.
1158: 
1159: #### Type
1160: 
1161: Boolean; read-only.
1162: 
1163: ---
1164: 
1165: ### TextDocument.smallCaps
1166: 
1167: `textDocument.smallCaps`
1168: 
1169: !!! note
1170:     This functionality was added in After Effects 13.2 (CC 2014.2)
1171: 
1172: #### Description
1173: 
1174: `true` if a Text layer has small caps enabled; otherwise `false`. To set this value, use [TextDocument.fontCapsOption](#textdocumentfontcapsoption) added in After Effects 24.0.
1175: 
1176: !!! warning
1177:     This value only reflects the first character in the Text layer.
1178: 
1179: #### Type
1180: 
1181: Boolean; read-only.
1182: 
1183: ---
1184: 
1185: ### TextDocument.spaceAfter
1186: 
1187: `textDocument.spaceAfter`
1188: 
1189: !!! note
1190:     This functionality was added in After Effects 24.0
1191: 
1192: #### Description
1193: 
1194: The Text layer's paragraph space after option.
1195: 
1196: If this attribute has a mixed value, it will be read as `undefined`.
1197: 
1198: !!! warning
1199:     This value reflects all paragraphs in the Text layer.
1200: If you change this value, it will set all paragraphs in the Text layer to the specified setting.
1201: 
1202: #### Type
1203: 
1204: Floating-point value; read/write.
1205: 
1206: ---
1207: 
1208: ### TextDocument.spaceBefore
1209: 
1210: `textDocument.spaceBefore`
1211: 
1212: !!! note
1213:     This functionality was added in After Effects 24.0
1214: 
1215: #### Description
1216: 
1217: The Text layer's paragraph space before option.
1218: 
1219: If this attribute has a mixed value, it will be read as `undefined`.
1220: 
1221: !!! warning
1222:     This value reflects all paragraphs in the Text layer.
1223: If you change this value, it will set all paragraphs in the Text layer to the specified setting.
1224: 
1225: #### Type
1226: 
1227: Floating-point value; read/write.
1228: 
1229: ---
1230: 
1231: ### TextDocument.startIndent
1232: 
1233: `textDocument.startIndent`
1234: 
1235: !!! note
1236:     This functionality was added in After Effects 24.0
1237: 
1238: #### Description
1239: 
1240: The Text layer's paragraph start indent option.
1241: 
1242: If this attribute has a mixed value, it will be read as `undefined`.
1243: 
1244: !!! warning
1245:     This value reflects all paragraphs in the Text layer.
1246: If you change this value, it will set all paragraphs in the Text layer to the specified setting.
1247: 
1248: #### Type
1249: 
1250: Floating-point value; read/write.
1251: 
1252: ---
1253: 
1254: ### TextDocument.strokeColor
1255: 
1256: `textDocument.strokeColor`
1257: 
1258: #### Description
1259: 
1260: The Text layer's stroke color, as an array of [r, g, b] floating-point values. For example, in an 8-bpc project, a red value of 255 would be 1.0, and in a 32-bpc project, an overbright blue value can be something like 3.2.
1261: 
1262: Throws an exception on read if [applyStroke](#textdocumentapplystroke) is not `true`.
1263: 
1264: Setting this value will also set [applyStroke](#textdocumentapplystroke) to `true` across the affected characters.
1265: 
1266: !!! warning
1267:     This value only reflects the first character in the Text layer.
1268: If you change this value, it will set all characters in the Text layer to the specified setting.
1269: 
1270: #### Type
1271: 
1272: Array [r, g, b] of floating-point values; read/write.
1273: 
1274: ---
1275: 
1276: ### TextDocument.strokeOverFill
1277: 
1278: `textDocument.strokeOverFill`
1279: 
1280: #### Description
1281: 
1282: Indicates the rendering order for the fill and stroke of a Text layer. When `true`, the stroke appears over the fill.
1283: 
1284: The Text layer can override the per-character attribute setting if the Text layer is set to use All Strokes Over All Fills or All Fills Over All Strokes in the Character Panel. Thus the value returned here might be different than the actual attribute value set on the character. It is possible to set the Fill/Stroke render order via the "Fill & Stroke" property under More Options on the Text layer using TextLayer.text("ADBE Text More Options")("ADBE Text Render Order").
1285: 
1286: !!! warning
1287:     This value only reflects the first character in the Text layer.
1288: If you change this value, it will set all characters in the Text layer to the specified setting.
1289: 
1290: #### Type
1291: 
1292: Boolean; read/write.
1293: 
1294: ---
1295: 
1296: ### TextDocument.strokeWidth
1297: 
1298: `textDocument.strokeWidth`
1299: 
1300: #### Description
1301: 
1302: The Text layer's stroke thickness in pixels.
1303: 
1304: !!! warning
1305:     This value only reflects the first character in the Text layer.
1306: If you change this value, it will set all characters in the Text layer to the specified setting.
1307: 
1308: The minimum accepted value to set is 0, but this will be silently clipped to 0.01.
1309: 
1310: #### Type
1311: 
1312: Floating-point value (0 to 1000, inclusive); read/write.
1313: 
1314: ---
1315: 
1316: ### TextDocument.subscript
1317: 
1318: `textDocument.subscript`
1319: 
1320: !!! note
1321:     This functionality was added in After Effects 13.2 (CC 2014.2)
1322: 
1323: #### Description
1324: 
1325: `true` if a Text layer has subscript enabled; otherwise `false`. To set this value, use [TextDocument.fontBaselineOption](#textdocumentfontbaselineoption) added in After Effects 24.0.
1326: 
1327: !!! warning
1328:     This value only reflects the first character in the Text layer.
1329: 
1330: #### Type
1331: 
1332: Boolean; read-only.
1333: 
1334: ---
1335: 
1336: ### TextDocument.superscript
1337: 
1338: `textDocument.superscript`
1339: 
1340: !!! note
1341:     This functionality was added in After Effects 13.2 (CC 2014.2)
1342: 
1343: #### Description
1344: 
1345: `true` if a Text layer has superscript enabled; otherwise `false`. To set this value, use [TextDocument.fontBaselineOption](#textdocumentfontbaselineoption) added in After Effects 24.0.
1346: 
1347: !!! warning
1348:     This value only reflects the first character in the Text layer.
1349: 
1350: #### Type
1351: 
1352: Boolean; read-only.
1353: 
1354: ---
1355: 
1356: ### TextDocument.text
1357: 
1358: `textDocument.text`
1359: 
1360: #### Description
1361: 
1362: The text value for the Text layer's Source Text property.
1363: 
1364: #### Type
1365: 
1366: String; read/write.
1367: 
1368: ---
1369: 
1370: ### TextDocument.tracking
1371: 
1372: `textDocument.tracking`
1373: 
1374: #### Description
1375: 
1376: The Text layer's spacing between characters.
1377: 
1378: !!! warning
1379:     This value only reflects the first character in the Text layer.
1380: If you change this value, it will set all characters in the Text layer to the specified setting.
1381: 
1382: #### Type
1383: 
1384: Floating-point value; read/write.
1385: 
1386: ---
1387: 
1388: ### TextDocument.tsume
1389: 
1390: `textDocument.tsume`
1391: 
1392: !!! note
1393:     This functionality was added in After Effects 13.2 (CC 2014.2)
1394: 
1395: #### Description
1396: 
1397: This Text layer's tsume value as a normalized percentage, from 0.0 -> 1.0.
1398: 
1399: !!! warning
1400:     This value only reflects the first character in the Text layer.
1401: If you change this value, it will set all characters in the Text layer to the specified setting.
1402: 
1403: This attribute accepts values from 0.0 -> 100.0, however the value IS expecting a normalized value from 0.0 -> 1.0. Using a value higher than 1.0 will produce unexpected results; AE's Character Panel will clamp the value at 100%, despite the higher value set by scripting (ie `TextDocument.tsume = 100` \_really_ sets a value of 10,000%)
1404: 
1405: #### Type
1406: 
1407: Floating-point value; read-write.
1408: 
1409: ---
1410: 
1411: ### TextDocument.verticalScale
1412: 
1413: `textDocument.verticalScale`
1414: 
1415: !!! note
1416:     This functionality was added in After Effects 13.2 (CC 2014.2)
1417: 
1418: #### Description
1419: 
1420: This Text layer's vertical scale in pixels.
1421: 
1422: !!! warning
1423:     This value only reflects the first character in the Text layer.
1424: If you change this value, it will set all characters in the Text layer to the specified setting.
1425: 
1426: #### Type
1427: 
1428: Floating-point value; read-write.
1429: 
1430: ---
1431: 
1432: ## Methods
1433: 
1434: ### TextDocument.characterRange()
1435: 
1436: `textDocument.characterRange(characterStart, [signedCharacterEnd])`
1437: 
1438: !!! note
1439:     This functionality was added in After Effects 24.3
1440: 
1441: #### Description
1442: 
1443: Returns an instance of the Text layer range accessor CharacterRange.
1444: 
1445: The instance will remember the parameters passed in the constructor - they remain constant and changes to the [TextDocument](#textdocument-object) length may cause the instance to throw exceptions on access until the [TextDocument](#textdocument-object) length is changed to a length which makes the range valid again.
1446: 
1447: Use toString() to find out what the constructed parameters were.
1448: 
1449: #### Parameters
1450: 
1451: +----------------------+------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1452: |      Parameter       |       Type       |                                                                                            Description                                                                                             |
1453: +======================+==================+====================================================================================================================================================================================================+
1454: | `characterStart`     | Unsigned integer | Starts at zero, must be the less than or equal to the (text) length of the [TextDocument object](#textdocument-object).                                                                            |
1455: +----------------------+------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1456: | `signedCharacterEnd` | Signed integer.  | Optional. If not specified, will be computed at `(characterStart + 1)`.                                                                                                                            |
1457: |                      |                  |                                                                                                                                                                                                    |
1458: |                      |                  | If set to `-1`, then the [CharacterRange object](characterrange.md) will dynamically calculate this on access to be equal to the (text) length of the [TextDocument object](#textdocument-object). |
1459: |                      |                  |                                                                                                                                                                                                    |
1460: |                      |                  | `signedCharacterEnd` must be greater than or equal to `characterStart`, and less than or equal to the (text) length of the [TextDocument object](#textdocument-object).                            |
1461: +----------------------+------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1462: 
1463: Throws an exception if the parameters would result in an invalid range.
1464: 
1465: It is not possible to create a [CharacterRange object](characterrange.md) which spans the final carriage return in the [TextDocument object](#textdocument-object).
1466: 
1467: #### Returns
1468: 
1469: An instance of [CharacterRange object](characterrange.md)
1470: 
1471: ---
1472: 
1473: ### TextDocument.composedLineCharacterIndexesAt()
1474: 
1475: `textDocument.composedLineCharacterIndexesAt(characterIndex)`
1476: 
1477: !!! note
1478:     This functionality was added in After Effects 24.3
1479: 
1480: #### Description
1481: 
1482: Returns the character index bounds of a [ComposedLineRange object](composedlinerange.md) in the Text layer.
1483: 
1484: #### Parameters
1485: 
1486: |    Parameter     |       Type       |                                       Description                                        |
1487: | ---------------- | ---------------- | ---------------------------------------------------------------------------------------- |
1488: | `characterIndex` | Unsigned integer | A text index in the Text layer, which will be mapped to the composed line it intersects. |
1489: 
1490: #### Returns
1491: 
1492: Generic object;
1493: Key `start` will be set to text index of the start of the composed line (greater than or equal to zero).
1494: Key `end` will be set to text index of the end of the composed line (greater than start, or equal to start if it is the last composed line).
1495: 
1496: Will throw an exception if the computed start and end are outside of the current [TextDocument object](#textdocument-object)
1497: Remember that the composed lines are static and subsequent changes to the [TextDocument object](#textdocument-object) instance which changes its length may render the composed line data invalid.
1498: 
1499: ---
1500: 
1501: ### TextDocument.composedLineRange()
1502: 
1503: `textDocument.composedLineRange(composedLineIndexStart, [signedComposedLineIndexEnd])`
1504: 
1505: !!! note
1506:     This functionality was added in After Effects 24.3
1507: 
1508: #### Description
1509: 
1510: Returns an instance of the Text layer range accessor [ComposedLineRange object](composedlinerange.md).
1511: 
1512: The instance will remember the parameters passed in the constructor - they remain constant and changes to the [TextDocument](#textdocument-object) contents may cause the instance to throw exceptions on access until the [TextDocument](#textdocument-object) contents are changed which makes the range valid again.
1513: 
1514: Use [ComposedLineRange.toString()](composedlinerange.md#composedlinerangetostring) to find out what the constructed parameters were.
1515: 
1516: #### Parameters
1517: 
1518: +------------------------------+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1519: |          Parameter           |       Type       |                                                                                           Description                                                                                           |
1520: +==============================+==================+=================================================================================================================================================================================================+
1521: | `composedLineIndexStart`     | Unsigned integer | Starts at zero, must be the less than the number of composed lines in the [TextDocument object](#textdocument-object).                                                                          |
1522: +------------------------------+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1523: | `signedComposedLineIndexEnd` | Signed integer.  | Optional. If not specified, will be computed at `(composedLineIndexStart + 1)`.                                                                                                                 |
1524: |                              |                  |                                                                                                                                                                                                 |
1525: |                              |                  | If set to -1, then the [ComposedLineRange object](composedlinerange.md) will dynamically calculate this on access to the last composed line of the [TextDocument object](#textdocument-object). |
1526: |                              |                  |                                                                                                                                                                                                 |
1527: |                              |                  | `signedComposedLineIndexEnd` must be greater than `composedLineIndexStart`, and less than or equal to the number of composed lines in the [TextDocument object](#textdocument-object).          |
1528: +------------------------------+------------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1529: 
1530: Throws an exception if the parameters would result in an invalid range.
1531: 
1532: Remember that the composed lines are static and subsequent changes to the [TextDocument object](#textdocument-object) instance which changes its length may render the composed line data invalid.
1533: 
1534: #### Returns
1535: 
1536: An instance of [ComposedLineRange object](composedlinerange.md)
1537: 
1538: ---
1539: 
1540: ### TextDocument.paragraphCharacterIndexesAt()
1541: 
1542: `textDocument.paragraphCharacterIndexesAt(characterIndex)`
1543: 
1544: !!! note
1545:     This functionality was added in After Effects 24.3
1546: 
1547: #### Description
1548: 
1549: Returns the character index bounds of a paragraph in the Text layer.
1550: 
1551: #### Parameters
1552: 
1553: |    Parameter     |       Type       |                                     Description                                      |
1554: | ---------------- | ---------------- | ------------------------------------------------------------------------------------ |
1555: | `characterIndex` | Unsigned integer | A text index in the Text layer, which will be mapped to the paragraph it intersects. |
1556: 
1557: #### Returns
1558: 
1559: Generic object;
1560: Key `start` will be set to text index of the start of the paragraph (greater than or equal to zero).
1561: Key `end` will be set to text index of the end of the paragraph (greater than start, or equal to start if it is the last paragraph).
1562: 
1563: ---
1564: 
1565: ### TextDocument.paragraphRange()
1566: 
1567: `textDocument.paragraphRange(paragraphIndexStart, [signedParagraphIndexEnd])`
1568: 
1569: !!! note
1570:     This functionality was added in After Effects 24.3
1571: 
1572: #### Description
1573: 
1574: Returns an instance of the Text layer range accessor [ParagraphRange object](paragraphrange.md).
1575: 
1576: The instance will remember the parameters passed in the constructor - they remain constant and changes to the [TextDocument](#textdocument-object) contents may cause the instance to throw exceptions on access until the [TextDocument](#textdocument-object) contents are changed which makes the range valid again.
1577: 
1578: Use [ParagraphRange.toString()](paragraphrange.md#paragraphrangetostring) to find out what the constructed parameters were.
1579: 
1580: #### Parameters
1581: 
1582: +---------------------------+------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1583: |         Parameter         |       Type       |                                                                                      Description                                                                                      |
1584: +===========================+==================+=======================================================================================================================================================================================+
1585: | `paragraphIndexStart`     | Unsigned integer | Starts at zero, must be the less than the number of paragraphs in the [TextDocument object](#textdocument-object).                                                                    |
1586: +---------------------------+------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1587: | `signedParagraphIndexEnd` | Signed integer   | Optional. If not specified, will be computed at `(paragraphIndexStart + 1)`.                                                                                                          |
1588: |                           |                  |                                                                                                                                                                                       |
1589: |                           |                  | If set to -1, then the [ParagraphRange object](paragraphrange.md) will dynamically calculate this on access to the last paragraph of the [TextDocument object](#textdocument-object). |
1590: |                           |                  |                                                                                                                                                                                       |
1591: |                           |                  | `signedParagraphIndexEnd` must be greater than `paragraphIndexStart`, and less than or equal to the number of paragraphs in the [TextDocument object](#textdocument-object).          |
1592: +---------------------------+------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1593: 
1594: Throws an exception if the parameters would result in an invalid range.
1595: 
1596: #### Returns
1597: 
1598: An instance of [ParagraphRange object](paragraphrange.md)
1599: 
1600: ---
1601: 
1602: ### TextDocument.resetCharStyle()
1603: 
1604: `textDocument.resetCharStyle()`
1605: 
1606: #### Description
1607: 
1608: Restores all characters in the Text layer to the default text character characteristics in the Character panel.
1609: 
1610: #### Parameters
1611: 
1612: None.
1613: 
1614: #### Returns
1615: 
1616: Nothing.
1617: 
1618: ---
1619: 
1620: ### TextDocument.resetParagraphStyle()
1621: 
1622: `textDocument.resetParagraphStyle()`
1623: 
1624: #### Description
1625: 
1626: Restores all paragraphs in the Text layer to the default text paragraph characteristics in the Paragraph panel.
1627: 
1628: #### Parameters
1629: 
1630: None.
1631: 
1632: #### Returns
1633: 
1634: Nothing.
````

## File: docs/official/index.md
````markdown
 1: ---
 2: hide:
 3:     - toc
 4: ---
 5: 
 6: # After Effects Scripting Guide
 7: 
 8: This repo hosts the After Effects Scripting Guide community docs.
 9: 
10: This initially came from the Adobe After Effects CS6 Scripting Guide, and has been added to and adjusted to reflect the current state of scripting within AE.
11: 
12: ## Navigating the Guide
13: 
14: If you're not sure where to start, take a look at the [Overview](./introduction/overview.md) for how scripting works in After Effects, or [Changelog](./introduction/changelog.md) for updates to the scripting API over time.
15: 
16: ## Contribution
17: 
18: This endeavour is primarily community-supported & run; contributors are welcome and encouraged to suggest fixes, adjustments, notes/warnings, and anything else that may help the project.
19: 
20: For specific information on how to contribute & best practices, see the [Documentation Contribution Guide](https://docsforadobe.dev/contributing/contribution-guide/).
21: 
22: ## Licensing & Ownership
23: 
24: This project exists for educational purposes only.
25: 
26: All content is copyright Adobe Systems Incorporated.
````
