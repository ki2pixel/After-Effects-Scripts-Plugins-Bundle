# Interfaces Utilisateur & ScriptUI en Production

Contexte SOURCE_A vs SOURCE_B : `docs/matchname_cartography.md` met surtout en évidence des *matchNames* et l’écart de documentation (ex. `ADBE easyRulers` non documenté). Pour la partie **ScriptUI**, les bonnes pratiques “terrain” se lisent directement dans `easyRulers.jsx`, `Easy Clones.jsx` et, de façon plus “UI framework”, `goodParents.jsx` (construction d’UI + états hover/click + ressources écrites sur disque).

---

## 1) Le Pattern Dockable (Palette vs Panel docké)

### Problème
Un script ScriptUI peut être lancé :
- depuis **Fenêtre >** (il doit créer une `Window("palette", ...)` et faire `show()`),
- ou comme **panneau docké** (AE passe un `Panel` via `this`, et il ne faut pas appeler `show()` pareil).

La plupart des scripts “production” utilisent un test simple : `thisObj instanceof Panel`.

### Solution Production
- **Entrée unique** : fonction principale `MyScript(this)` ou `MW_EasyClones(this)`.
- **Construction conditionnelle** : `thisObj instanceof Panel ? thisObj : new Window("palette", ...)`
- **Fin de flow** :
  - si `Window` : `show()`
  - si `Panel` : `layout.layout(true)` (ou rien) + `onResizing/onResize` si UI resizable

### Code Snippet (boilerplate exact)

#### Easy Clones — `MW_EasyClones` / `easyClonesUI`
```jsx
      var win =
        thisObj instanceof Panel
          ? thisObj
          : new Window("palette", "Easy Clones", undefined, {
              resizeable: true,
            });
```

Et gestion “Window vs Panel” :
```jsx
      if (win instanceof Window) {
        win.show();
      } else {
        win.layout.layout(true);
      }
```

#### easyRulers — `easyRulers(this)`
```jsx
    var mainPalette =
      thisObj instanceof Panel
        ? thisObj
        : new Window(
            "palette",
            FF092D.t() ? "easyRulers 2 - Trial" : "easyRulers 2",
            undefined,
            { resizeable: true },
          );
    if (mainPalette == null) {
      return;
    }
```

Resizing + show uniquement si pas docké :
```jsx
    mainPalette.layout.layout(true);
    mainPalette.layout.resize();
    mainPalette.onResizing = mainPalette.onResize = function () {
      mainPalette.layout.resize();
    };
    ...
      if (!(mainPalette instanceof Panel)) {
        mainPalette.show();
      }
```

#### Good Parents — dockable + `new Window(...)`
```jsx
    thisObj[_0x4169[202]] =
      thisObj instanceof Panel
        ? thisObj
        : new Window(
            _0x4169[203],
            thisObj[_0x4169[0]] + _0x4169[204] + thisObj[_0x4169[2]],
            undefined,
            { resizeable: true },
          );
```

*(Le script est obfusqué, mais le pattern dockable est identique.)*

---

## 2) Gestion des Assets Binaires (blobs internes → fichiers temporaires)

### Problème
En production, beaucoup de scripts évitent des `.png` distribués à côté du `.jsx` :
- compatibilité ZXP / copies manuelles / chemins incertains
- distribution “single file”
- limitation des loaders

Ils embarquent donc des blobs : `__BLOB__BLOB_...` puis doivent les transformer en **fichiers réels** pour `ScriptUI.newImage(...)` ou `iconbutton`.

### Solution Production
Deux patterns observés :

1) **Écrire un fichier `.png` au premier run** dans un dossier “stable” (`Folder.userData/...`) puis réutiliser.
2) **Retourner un `File`** (ou chemin) utilisable directement dans ScriptUI.

Points “production” visibles dans le code :
- créer un dossier cible si besoin
- `encoding = "BINARY"`
- `open("w")` + `write(blob)` + `close()`
- *optionnel mais crucial* : vérifier la préférence AE “Allow Scripts to Write Files and Access Network”, sinon prompt + ouverture prefs

### Code Snippet

#### easyRulers — `loadImage` (exact)
```jsx
    function loadImage(e, r, t) {
      var s = Folder.userData.fsName + "/Adobe/ScriptData/" + t;
      if (!Folder(s).exists) {
        Folder(s).create();
        if (!Folder(s).exists) {
          alert("Could not create folder: " + s + ".");
          return;
        }
      }
      var o = s + "/" + r + ".png";
      var a = new File(o);
      if (!a.exists) {
        a.encoding = "BINARY";
        a.open("w");
        a.write(e);
        a.close();
        if (!a.exists) {
          alert("Could not create file in: " + s + ".");
          return;
        }
      }
      return a;
    }
```

Usage direct dans un `iconbutton` (write-if-needed uniquement sur anciennes versions ici) :
```jsx
    var logo = myWin.add(
      "iconbutton",
      undefined,
      parseFloat(app.version) < 12
        ? loadImage(imagelogo, "easyRulersLogoSmall", "easyRulers")
        : imagelogo,
      { style: "toolbutton" },
    );
```

#### Easy Clones — `createResourceFile` + sécurité (exact)
```jsx
      function createResourceFile(filename, binaryString, resourceFolder) {
        var myFile = new File(resourceFolder + "/" + filename);
        if (!File(myFile).exists) {
          if (!isSecurityPrefSet()) {
            alert(
              "This script requires access to write files. Go to the General panel of the application preferences and make sure Allow Scripts to Write Files and Access Network is checked.",
            );
            try {
              app.executeCommand(2359);
            } catch (e) {
              alert(e);
            }
            if (!isSecurityPrefSet()) {
              return null;
            }
          }
          myFile.encoding = "BINARY";
          myFile.open("w");
          myFile.write(binaryString);
          myFile.close();
        }
        return myFile;
      }
```

---

## 3) Layouts Résilients (tabbedpanel + groupes imbriqués)

### Problème
Les UIs ScriptUI cassent facilement :
- tailles non cohérentes entre versions AE
- widgets qui ne “fill” pas correctement
- layouts imbriqués qui “collapsent” si `alignment`/`orientation` mal réglés

### Solution Production
Dans `easyRulers.jsx`, le layout est robuste parce qu’il combine :
- une colonne racine (`myWin.orientation = "column"`)
- des `group` en `row` pour les lignes de contrôles
- un `tabbedpanel` isolé avec `minimumSize` selon version, `maximumSize` fixe
- des sous-groupes avec `alignment = ["fill","fill"]` et des `spacing/margins` explicites
- un handler de resize global sur la palette

### Code Snippet (structure “qui tient”)

Création du `tabbedpanel` :
```jsx
    var er_panels = myWin.add("tabbedpanel");
    if (parseFloat(app.version) < 13) {
      er_panels.minimumSize = [260, "fill"];
    }
    er_panels.maximumSize = [260, 500];
    er_panels.spacing = 0;
    er_panels.margins = 0;
    var rulerType_tab = er_panels.add("tab", undefined, "type");
    rulerType_tab.spacing = 0;
    rulerType_tab.margins =
      parseFloat(app.version) < 12 ? [8, 8, 8, 8] : [10, 8, 0, 0];
```

Exemple de groupes imbriqués avec alignements pragmatiques :
```jsx
    var rulerLineCircleGroup = rulerType_tab.add(
      parseFloat(app.version) < 12 ? "group" : "panel",
      undefined,
      "",
    );
    rulerLineCircleGroup.orientation = "row";
    rulerLineCircleGroup.spacing = 0;
    rulerLineCircleGroup.alignment = ["fill", "fill"];
    var rulerLineIconGroup = rulerLineCircleGroup.add(
      "group",
      undefined,
      "Line Icon",
    );
    rulerLineIconGroup.orientation = "column";
    rulerLineIconGroup.alignment = ["fill", ""];
```

*(Le “truc” ici : parent en `row` avec `["fill","fill"]`, enfants en `column` avec `["fill",""]` pour éviter que la hauteur force un stretch non désiré.)*

---

## 4) Boutons Graphiques (IconButtons) + icônes custom

### Problème
Un `Button` standard est limité visuellement. Les scripts “tooling” (KBar / palettes) veulent :
- des boutons carrés type toolbar
- icône PNG custom
- états toggle / toolbutton
- aide (`helpTip`)

Mais ScriptUI a besoin d’un objet image (`ScriptUI.newImage`) et, souvent, d’un fichier sur disque.

### Solution Production
Deux implémentations complémentaires :

1) **Approche “resource file”** (Easy Clones)
- stocker un blob `__BLOB__...`
- le transformer en fichier avec `createResourceFile(...)`
- passer le `File` à `ScriptUI.newImage(...)`
- injecter dans un `iconbutton`

2) **Approche “UI framework maison”** (Good Parents)
- pas forcément `iconbutton`, mais composition de `group/panel/image` + “click zone”
- gestion hover/out via listeners qui changent couleurs / image

### Code Snippet

#### Easy Clones — `createClonesBtn` (exact)
```jsx
      var createClonesImage = __BLOB__BLOB_000137__;
      var createClonesBtn = win.add(
        "iconbutton",
        [5, 5, 40, 40],
        ScriptUI.newImage(
          createResourceFile(
            "createClonesImage.png",
            createClonesImage,
            getUserDataFolder(),
          ),
        ),
        { style: "toolbutton", toggle: 0 },
      );
      createClonesBtn.onClick = function () {
        checkLicense;
        isTrial = !checkLicense;
        createClones(trialMode);
      };
      createClonesBtn.helpTip = "Click to create a Clone System.";
```

#### easyRulers — `iconbutton` avec `loadImage(...)` fallback (exact)
```jsx
    var rulerLine = rulerLineIconGroup.add(
      "iconbutton",
      undefined,
      parseFloat(app.version) < 12
        ? loadImage(button_linear, "rulerLineIcon", "easyRulers")
        : button_linear,
      { style: "toolbutton", toggle: true },
    );
```

#### Good Parents — pattern “button composite” (extrait exact, logique hover)
Le script fabrique un bouton en plusieurs couches (BG, contenu, click-zone) et switch l’icône au survol :
```jsx
        } else {
          newBttn[_0x4169[173]][_0x4169[174]] = iconOver;
        }
...
        } else {
          newBttn[_0x4169[173]][_0x4169[174]] = icon;
        }
```

Et la création dockable se fait dans la même fonction UI (snippet dockable montré plus haut), ce qui est typique d’un “framework UI interne”.

---

## Références

- `Aescripts-easyRulers 2 v2.01/easyRulers.jsx` : pattern dockable, `loadImage`, `tabbedpanel`, `iconbutton`
- `Aescripts-Easy Clones v1.1/Easy Clones.jsx` : `MW_EasyClones`, `createResourceFile`, `createClonesBtn`
- `Aescripts-Good Parents v1.4.1/goodParents.jsx` : dockable, UI framework maison, gestion hover/click
- `docs/matchname_cartography.md` : contexte général (matchNames, écart doc/terrain)

---

*Généré le 2026‑02‑05 à partir du bundle « After Effects Scripts & Plugins »*
