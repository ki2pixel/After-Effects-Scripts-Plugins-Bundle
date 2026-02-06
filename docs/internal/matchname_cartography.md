# Cartographie croisée Scripts (SOURCE_A) vs Documentation (SOURCE_B)

## 1. Synthèse MatchName ↔ UI

Extraction automatique sur 376 scripts JSX/JS (SOURCE_A) et rapprochement avec `docs/matchnames/` (SOURCE_B). Le tableau ci-dessous liste les 20 matchNames les plus sollicités.

| MatchName | UI label (doc) | Usage count | Exemple (fichier:ligne) | Snippet |
| --- | --- | --- | --- | --- |
| `ADBE easyRulers` | **Non documenté** | 3616 | Aescripts-easyRulers 2 v2.01/easyRulers.jsx:3306 | `'" ).effect("ADBE easyRulers")("ADBE easyRulers-0080") } catch(e) {…` |
| `ADBE Vectors Group` | Contents | 3475 | origami_fix.jsx:6676 | `var p = g.addProperty("ADBE Vectors Group");` |
| `ADBE Effect Parade` | Effects | 2515 | origami_fix.jsx:691 | `var eff = this.property("ADBE Effect Parade");` |
| `ADBE Root Vectors Group` | Contents | 1518 | origami_fix.jsx:6122 | `layer.property("ADBE Root Vectors Group"),` |
| `ADBE Transform Group` | Transform | 1110 | origami_fix.jsx:4989 | `.property("ADBE Transform Group")` |
| `ADBE Slider Control-0001` | **Non documenté** | 885 | Aescripts-circuitFX v1.75/circuitFX.jsx:3499 | `"ADBE Slider Control-0001",` |
| `ADBE Vector Filter - Repeater` | Repeater | 675 | Aescripts-circuitFX v1.75/circuitFX.jsx:3235 | `.addProperty("ADBE Vector Filter - Repeater").name =…` |
| `ADBE Vector Transform Group` | Transform | 522 | origami_fix.jsx:6094 | `var transformName = "ADBE Vector Transform Group";` |
| `ADBE Position` | Position | 475 | origami_fix.jsx:4999 | `.property("ADBE Position").expression = "";` |
| `ADBE Vector Group` | Group | 449 | origami_fix.jsx:6675 | `var g = contents.addProperty("ADBE Vector Group");` |
| `ADBE Vector Graphic - Fill` | Fill | 365 | origami_fix.jsx:6280 | `var fillName = "ADBE Vector Graphic - Fill";` |
| `ADBE Color Control-0001` | **Non documenté** | 344 | origami_fix.jsx:6313 | `this.col.property("ADBE Color Control-0001").expression =` |
| `ADBE Slider Control` | Slider Control | 310 | origami_fix.jsx:7762 | `type: "ADBE Slider Control",` |
| `ADBE Vector Shape - Rect` | Rectangle | 305 | origami_fix.jsx:10050 | `mn: "ADBE Vector Shape - Rect",` |
| `ADBE Vector Graphic - Stroke` | Stroke | 294 | origami_fix.jsx:6720 | `group.addProperty("ADBE Vector Graphic - Stroke");` |
| `ADBE Vector Fill Color` | Color | 291 | origami_fix.jsx:6283 | `.property("ADBE Vector Fill Color").value *…` |
| `ADBE Vector Repeater Transform` | Transform | 290 | Aescripts-circuitFX v1.75/circuitFX.jsx:3244 | `)("ADBE Root Vectors Group")(r)("ADBE Vectors…` |
| `ADBE Fill` | Fill | 264 | Aescripts-Easy Clones v1.1/Easy Clones.jsx:729 | `.addProperty("ADBE Fill");` |
| `ADBE Mask Parade` | Masks | 244 | origami_fix.jsx:5917 | `var masks = layer.property("ADBE Mask Parade");` |
| `ADBE Text Properties` | Text | 240 | origami_fix.jsx:9984 | `mn: "ADBE Text Properties",` |

### 1.1 MatchNames introuvables côté doc (échantillon)

| MatchName | Usage count | Exemple (fichier:ligne) | Snippet |
| --- | --- | --- | --- |
| `ADBE easyRulers` | 3616 | Aescripts-easyRulers 2 v2.01/easyRulers.jsx:3306 | `'" ).effect("ADBE easyRulers")("ADBE easyRulers-0080") } catch(e) {…` |
| `ADBE Slider Control-0001` | 885 | Aescripts-circuitFX v1.75/circuitFX.jsx:3499 | `"ADBE Slider Control-0001",` |
| `ADBE Color Control-0001` | 344 | origami_fix.jsx:6313 | `this.col.property("ADBE Color Control-0001").expression =` |
| `ADBE easyRulers-0032` | 144 | Aescripts-easyRulers 2 v2.01/easyRulers.jsx:4790 | `'try { if (effect("ADBE easyRulers")("Link to Pointer Completion %")…` |
| `ADBE Layer Control-0001` | 142 | origami_fix.jsx:9977 | `layer: { mn: "ADBE Layer Control-0001" },` |
| `ADBE Fill-0002` | 130 | Aescripts-Easy Clones v1.1/Easy Clones.jsx:765 | `.property("ADBE Fill-0002").expression = applyFillExpression;` |
| `ADBE Mask Shape` | 121 | origami_fix.jsx:6138 | `.property("ADBE Mask Shape").value.vertices;` |
| `ADBE Point Control-0001` | 105 | origami_fix.jsx:10913 | `gettySlider.property("ADBE Point Control-0001").expression =` |
| `ADBE Vector Repeater Opacity 2` | 75 | Aescripts-AEInfoGraphics v2.0.3/AEInfoGraphics2/panel/jsx/main.jsx:3330 | `.property("ADBE Vector Repeater Transform").property("ADBE Vector…` |
| `ADBE Vector Repeater Position` | 74 | Aescripts-circuitFX v1.75/circuitFX.jsx:3244 | `)("ADBE Root Vectors Group")(r)("ADBE Vectors…` |
| `ADBE easyRulers-0034` | 48 | Aescripts-easyRulers 2 v2.01/easyRulers.jsx:4765 | `'try { effect("ADBE easyRulers")("ADBE easyRulers-0034").value?100:0;…` |
| `ADBE Checkbox Control-0001` | 72 | Aescripts-Easy Clones v1.1/Easy Clones.jsx:692 | `colourDelayCheckbox("ADBE Checkbox Control-0001").setValue(true);` |
| `ADBE Vector Repeater Rotation` | 68 | Aescripts-AEInfoGraphics v2.0.3/AEInfoGraphics2/panel/jsx/main.jsx:1128 | `.property("ADBE Vector Repeater Transform").property("ADBE Vector…` |
| `ADBE easyRulers-0015` | 47 | Aescripts-easyRulers 2 v2.01/easyRulers.jsx:3851 | `'").effect("ADBE easyRulers")("ADBE easyRulers-0015").value +…` |
| `ADBE easyRulers-0035` | 40 | Aescripts-easyRulers 2 v2.01/easyRulers.jsx:5111 | `'try { effect("ADBE easyRulers")("ADBE easyRulers-0035").value?100:0…` |

**Observations :**

1. Les tables officielles couvrent bien les ensembles Shape/Text (`docs/matchnames/layer/shapelayer.md`, `docs/matchnames/effects/firstparty.md`). En revanche, aucun inventaire des identifiants internes des contrôles d’effets (indexés `-0001`, `-0002`, etc.) n’est publié. Ces suffixes restent nécessaires pour accéder aux sous-propriétés (ex. sliders, couleurs) mais constituent une dette documentaire majeure.
2. Les options matériaux 3D (`"ADBE Accepts Lights"`, `"ADBE Accepts Shadows"`, etc.) sont utilisées massivement dans les scripts de rigging (@Aescripts-Sliced Box 3 v3.25/Sliced Box.jsx#4050-4072), mais la doc `property/propertygroup.md` ne liste que les noms d’accès « Accepts Lights », sans rappeler les matchNames correspondants.

## 2. Hacks identifiés vs API officielles récentes

| Pattern legacy | Evidence scripts | API moderne (doc) | Analyse & recommandations |
| --- | --- | --- | --- |
| Gestion manuelle des fontes : scan de dossiers utilisateur (`Folder.userData…/aescripts/aw_FontManager`) puis parsing JSON | @Aescripts-Font Manager v2.0.1 (WIN+MAC)/FontManager.jsx#125-144 | `app.fonts.*` (24.0+) expose l’écosystème complet, la recherche par PostScript/family, les duplicata et favoris (@docs/text/fontsobject.md#1-314) | Migrer la découverte/inspection de fontes vers `app.fonts` évite le scraping filesystem, fiabilise la détection de substitutions et simplifie le support des polices variables. Revoir le stockage local pour ne conserver que les presets UI. |
| Détection d’images consécutives par duplication de calques, blending mode difference + `sampleImage` pour repérer coupe/duplication | @Aescripts-Duplicate Frame Remover v3.0/DuplicateFrameRemover.jsx#100-270 | `Layer.doSceneEditDetection(applyOptions)` (AE 22.3) réalise nativement le split/marker sur les coupes vidéo (@docs/layer/layer.md#434-464) | Pour les workflows « cut detection », privilégier l’API native (plus rapide, multi-frame rendering friendly). Le script peut se recentrer sur la gestion ROI/retime ou proposer un fallback <22.3. |
| Appels HTTP via `system.callSystem('curl…')` + scripts auxiliaires VB pour contourner l’absence de réseau JSX | @Aescripts-Origami v1.4.0/Origami.jsx#2249-2369 | Doc rappelle uniquement `system.callSystem(cmd)` (@docs/general/system.md#81-103) – aucune nouvelle API réseau n’est fournie | Ces hacks restent nécessaires faute d’API officielle. Documenter clairement les prérequis de sécurité (« Allow Scripts to write files and access network »), sandboxer les URLs et ajouter des timeouts côté Socket() pour réduire les blocages UI. |

## 3. Propriétés / attributs non documentés (échantillon à haut risque)

| MatchName / API | Contexte script | Pourquoi risqué |
| --- | --- | --- |
| `ADBE easyRulers` + sous-propriétés `ADBE easyRulers-00xx` | Contrôle personnalisé pilotant des expressions texte (@Aescripts-easyRulers 2 v2.01/easyRulers.jsx#3280-3318) | Aucun équivalent dans SOURCE_B : maintenance impossible pour d’autres équipes, nécessite rétro‑ingénierie en cas de refactor UI. |
| `ADBE Slider Control-0001`, `ADBE Color Control-0001`, `ADBE Point Control-0001` | Accès direct aux valeurs internes des Effect Controls (ex. origami_fix.jsx#6313, #10913) | Les tables officielles ne listent que les matchNames parent (`ADBE Slider Control`). Les suffixes `-000x` sont indispensables mais non documentés ⇒ casse potentielle lors de renames Adobe. |
| `ADBE Layer Control-0001` | Binding layer selectors pour rigs typographiques (origami_fix.jsx#9970-9985) | Idem ci-dessus ; aucune garantie de stabilité sans doc. |
| `ADBE Mask Shape` | Manipulation directe des courbes de masques (origami_fix.jsx#6124-6138) | MatchName absent des sections Mask dans SOURCE_B ; pourtant critique pour extraire `vertices`. |
| `ADBE Accepts Lights` / `ADBE Accepts Shadows` | Scripts 3D box builder (@Aescripts-Sliced Box 3 v3.25/Sliced Box.jsx#4050-4072) | La doc `property/propertygroup.md` ne donne que les noms lisibles. Confusion fréquente pour cibler ces propriétés via expressions/scripting. |

## 4. Pistes d’alignement doc ↔ terrain

1. **Documenter les suffixes de sous-propriétés** des effets standards (Slider, Color, Layer, Fill…). Une table « Effect Parameter MatchNames » éviterait la multiplication de constantes magiques dans les scripts d’automation.
2. **Ajouter une section « Material Options MatchNames »** dans `docs/matchnames/layer/avlayer.md`, couvrant `ADBE Accepts Lights/Shadows`, `ADBE Ambient/Diffuse`, etc., afin d’outiller les scripts 3D.
3. **Mettre en avant `app.fonts` dans la doc communautaire** pour inciter les mainteneurs d’outils typographiques (Font Manager, Type Morph, etc.) à migrer vers l’API officielle plutôt que des scans disque fragiles.
4. **Comparer les outils legacy de détection de coupes** (Duplicate Frame Remover, RenderHogs) avec `Layer.doSceneEditDetection` dans la doc pour encourager la bascule vers l’API GPU.

## 5. Presets Dynamiques & Expression Engineering

Ce bundle illustre une technique “pro” extrêmement répandue chez les éditeurs Aescripts : **bootstrapper des rigs complets (Pseudo Effects + expressions + paramètres)** en passant par des presets `.ffx`, puis **compléter/paramétrer** le rig via scripting.

L’objectif n’est pas “d’appliquer un preset”, mais d’obtenir une structure d’effets et de contrôles **impossible (ou trop coûteuse/fragile) à reproduire** avec `addProperty()` seul.

### 5.1 Le hack du Preset binaire (`.ffx`)

**Easy Clones v1.1** embarque un preset sous forme de *binary string* (placeholder `__BLOB__...__`). Le script reconstruit un fichier `.ffx` sur disque puis l’applique.

Points clés observés :

- **[écriture conditionnelle]** `getAnimationPreset()` écrit le fichier uniquement si absent.
- **[écriture “binaire” ExtendScript]** `presetFile.encoding = "BINARY"; presetFile.open("w"); presetFile.write(presetBinary);`.
- **[bootstrap Pseudo Effect]** `makePseudoEffectAvailable()` crée un *null temporaire*, applique le preset, puis le supprime. Ce détour force After Effects à **charger/enregistrer** la définition du Pseudo Effect, rendant ensuite possible `addProperty("Pseudo/...")`.

**Pourquoi ils font ça (raison technique) :**

- Un Pseudo Effect n’est pas un effet “natif” accessible via un matchName standard (`ADBE ...`). Tant que la définition du Pseudo Effect n’est pas “installée/connue” par AE, `addProperty("Pseudo/... ")` échoue (ou `canAddProperty()` renvoie `false`).
- Un `.ffx` peut encapsuler :
  - des effets + paramètres + valeurs par défaut,
  - des expressions déjà attachées,
  - des contrôles (sliders/checkbox/etc.) et leurs IDs internes (`-0001`, `-0002`, …),
  - des structures difficiles à reconstruire proprement via script.

**Faux Parent 1.1** applique aussi des `.ffx`, mais dans un mode “packagé” (pas de BLOB) : les presets sont fournis en fichiers sur disque et référencés via `File($.fileName).path + "/fp_presets/FP_position.ffx"` (idem Scale/Rotation/Opacity), puis `layer.applyPreset(ffxFile)`.

#### Snippet “safe” : écrire un `.ffx` binaire en temp + appliquer

```jsx
function ensureBinaryPresetFile(presetName, presetBinary) {
  var presetFolder = Folder(Folder.temp.fsName + "/aescripts_presets");
  if (!presetFolder.exists) {
    presetFolder.create();
  }

  var presetFile = File(presetFolder.fsName + "/" + presetName);
  if (!presetFile.exists) {
    presetFile.encoding = "BINARY";
    if (!presetFile.open("w")) {
      throw new Error("Unable to open preset for writing: " + presetFile.fsName);
    }
    try {
      presetFile.write(presetBinary);
    } finally {
      presetFile.close();
    }
  }
  return presetFile;
}

function applyPresetSafely(targetLayer, presetFile) {
  if (!targetLayer || !presetFile || !presetFile.exists) {
    throw new Error("Invalid layer or preset file.");
  }

  var comp = app.project && app.project.activeItem;
  if (!comp || !(comp instanceof CompItem)) {
    throw new Error("Active comp required.");
  }

  var prevSelection = comp.selectedLayers;
  for (var i = 0; i < prevSelection.length; i += 1) {
    prevSelection[i].selected = false;
  }

  targetLayer.selected = true;
  targetLayer.applyPreset(presetFile);
}
```

Notes :

- **[préférence AE]** nécessite l’autorisation “Scripts may write files…” pour écrire dans `Folder.temp` / `Folder.userData`.
- **[cleanup]** certains scripts gardent volontairement le `.ffx` sur disque (cache) pour éviter de réécrire à chaque run.

### 5.2 Injection d’expressions (construction & quoting)

**Easy Clones** construit ses expressions comme des *templates string* via tableaux + `join("\n")` (`createCloneExpressions`). Le pattern récurrent :

- **[expression multi-lignes]** assemblage stable par `[].join("\n")` (lisible, maintenable, évite les `+` partout).
- **[référence au layer contrôle]** injection de `controlLayer.name` dans des fragments comme :
  - `thisComp.layer("<CONTROL_LAYER_NAME>").effect("Easy Clones")(13)`
- **[accès à des paramètres Pseudo Effect]** ciblage direct via IDs internes :
  - `cloneControlEffect.property("Pseudo/cloneControls1.1-0001").expression = ...`
- **[random stable par clone]** usage de `seedRandom()`.
  - seed global depuis un slider (`effect("Easy Clones")(12)`),
  - seed par clone depuis un index dérivé du nom : `parseInt(thisLayer.name.split("-").pop(), 10)`.
- **[time remapping / delay]** `valueAtTime(time - (delay - randomDelay))` pour “décaler” les clones dans le temps tout en restant déterministes.
- **[2D vs 3D]** tests sur `transform.position.value.length` / `transform.scale.value.length` pour retourner `[x,y]` vs `[x,y,z]`.

**Point d’attention (robustesse) :** dans le code observé, `controlLayer.name` est injecté tel quel entre guillemets. Si un nom de calque contient `"` ou `\`, l’expression générée peut devenir invalide.

#### Snippet : quote robuste pour injecter un nom dans une expression

```jsx
function exprStringLiteral(value) {
  var s = String(value);
  s = s.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"");
  return "\"" + s + "\"";
}

// Exemple : 'thisComp.layer(' + exprStringLiteral(controlLayer.name) + ')'
```

### 5.3 Pseudo Effects : détection & stratégie défensive

**Easy Clones** utilise explicitement des matchNames de type :

- `Pseudo/easyClones1.1`
- `Pseudo/cloneControls1.1`

La logique défensive observée :

- **[détection installation]** `layer.property("Effects").canAddProperty("Pseudo/... ")`.
- **[si absent]** écrire le `.ffx` (depuis BLOB) puis l’appliquer sur un *null temporaire* pour rendre le Pseudo Effect “disponible”.
- **[ensuite]** `effects.addProperty("Pseudo/... ")` sur le layer cible.

Ce pattern évite :

- les crashs/erreurs sur des postes où le Pseudo Effect n’a jamais été chargé,
- les dépendances à une installation manuelle de presets.

#### Pattern recommandé (résumé)

```jsx
function ensurePseudoEffectOnLayer(layer, pseudoMatchName, displayName, presetName, presetBinary) {
  var effects = layer.property("ADBE Effect Parade");

  if (effects.canAddProperty(pseudoMatchName) === false) {
    var presetFile = ensureBinaryPresetFile(presetName, presetBinary);

    // Bootstrap : appliquer 1 fois dans la session pour enregistrer le Pseudo Effect
    var comp = app.project.activeItem;
    var tmp = comp.layers.addNull();
    tmp.selected = true;
    tmp.applyPreset(presetFile);
    tmp.remove();
  }

  var eff = effects.property(pseudoMatchName);
  if (!eff) {
    eff = effects.addProperty(pseudoMatchName);
  }
  eff.name = displayName;
  return eff;
}
```

Différence notable avec **Faux Parent** : le script ne s’appuie pas sur des Pseudo Effects (pas de `Pseudo/...` repéré), mais sur des `.ffx` packagés qui déposent des effets nommés “Faux Parent - Position/Scale/Rotation/Opacity”, puis le script orchestre :

- désactivation temporaire d’expressions (`expressionEnabled = false`) après application du preset,
- bake via `Convert Expression to Keyframes` quand l’utilisateur déclenche la synchronisation,
- marquage/cleanup par `MarkerValue("FP_S")`.

---
_rapport généré le 2026‑02‑05 à partir du bundle « After Effects Scripts & Plugins »_
