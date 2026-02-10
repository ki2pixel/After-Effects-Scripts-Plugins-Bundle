# UI Layout & ScriptUI Production Patterns

## Dockable Panel Pattern

### Complete Window/Panel Detection

Always use this exact pattern for dockable compatibility:

```jsx
function createMainWindow(thisObj, title) {
    var win = thisObj instanceof Panel 
        ? thisObj 
        : new Window("palette", title, undefined, { resizeable: true });
    
    if (win == null) return null;
    
    // Build UI here...
    
    // Layout and resize handling
    win.layout.layout(true);
    win.layout.resize();
    win.onResizing = win.onResize = function() {
        win.layout.resize();
    };
    
    // Show only for palette, not panel
    if (!(win instanceof Panel)) {
        win.show();
    }
    
    return win;
}

// Usage
var mainWin = createMainWindow(this, "My Script");
```

## Binary Asset Management

### Resource File Creation

Use this pattern to convert embedded blobs to temporary files:

```jsx
function createResourceFile(filename, binaryString, resourceFolder) {
    var myFile = new File(resourceFolder + "/" + filename);
    
    // Write only if file doesn't exist
    if (!myFile.exists) {
        // Check security preferences first
        if (!isSecurityPrefSet()) {
            alert("This script requires access to write files. Go to the General panel of the application preferences and make sure 'Allow Scripts to Write Files and Access Network' is checked.");
            try {
                app.executeCommand(2359); // Open preferences
            } catch (e) {
                // User cancelled
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

function isSecurityPrefSet() {
    return app.preferences.getPrefAsBool("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY");
}

function getUserDataFolder() {
    var userData = Folder.userData;
    var scriptData = new Folder(userData.fsName + "/Adobe/ScriptData");
    if (!scriptData.exists) {
        scriptData.create();
    }
    return scriptData.fsName;
}
```

### Icon Button Implementation

```jsx
function createIconButton(parent, iconBlob, iconName, tooltip, clickHandler) {
    var iconFile = createResourceFile(iconName + ".png", iconBlob, getUserDataFolder());
    
    var btn = parent.add("iconbutton", undefined, ScriptUI.newImage(iconFile), { 
        style: "toolbutton" 
    });
    
    if (tooltip) btn.helpTip = tooltip;
    if (clickHandler) btn.onClick = clickHandler;
    
    return btn;
}
```

## Resilient Layout Structure

### Column + Row Pattern

Use this hierarchy for stable layouts:

```jsx
// Root container
win.orientation = "column";
win.spacing = 0;
win.margins = [10, 10, 10, 10];

// Tabbed panel (if needed)
var tabPanel = win.add("tabbedpanel");
tabPanel.maximumSize = [300, 600];
tabPanel.spacing = 0;
tabPanel.margins = 0;

var tab = tabPanel.add("tab", undefined, "Main Tab");
tab.orientation = "column";
tab.spacing = 5;
tab.margins = [10, 10, 10, 10];

// Row groups for controls
function createRowGroup(parent) {
    var group = parent.add("group");
    group.orientation = "row";
    group.spacing = 5;
    group.alignment = ["fill", ""];
    return group;
}

// Column groups for vertical sections
function createColumnGroup(parent) {
    var group = parent.add("group");
    group.orientation = "column";
    group.spacing = 5;
    group.alignment = ["fill", "fill"];
    return group;
}
```

### Version-Specific Sizing

```jsx
var version = parseFloat(app.version);

// Handle different AE versions
if (version < 12) {
    tabPanel.minimumSize = [260, "fill"];
    tab.margins = [8, 8, 8, 8];
} else {
    tabPanel.minimumSize = [280, "fill"];
    tab.margins = [10, 8, 0, 0];
}
```

## Critical UI Properties to Avoid

### Properties That Cause Crashes

**NEVER use these properties:**

- `preferredSize` - Causes crashes in many AE versions
- `size` on containers - Use `minimumSize`/`maximumSize` instead
- `text` on non-text widgets - Only use on `edittext`, `statictext`
- `enabled = false` on panels - Use on individual controls only

**SAFE alternatives:**

```jsx
// GOOD: Use minimumSize/maximumSize
control.minimumSize = [100, 20];
control.maximumSize = [200, 20];

// BAD: Avoid preferredSize
// control.preferredSize = [100, 20]; // CRASH RISK

// GOOD: Use alignment for layout
group.alignment = ["fill", "fill"];

// BAD: Direct size manipulation
// group.size = [200, 100]; // UNRELIABLE
```

### Safe Property Patterns

```jsx
// Text controls
var editText = parent.add("edittext", undefined, "default text");
editText.characters = 20;  // Width in characters
editText.active = true;     // Focus state

// Buttons
var btn = parent.add("button", undefined, "Click Me");
btn.alignment = ["center", ""];  // Center horizontally

// Groups
var group = parent.add("group");
group.orientation = "row";
group.alignment = ["fill", ""];   // Fill width, natural height
group.spacing = 5;
group.margins = [0, 0, 0, 0];
```

## Advanced UI Patterns

### Toggle Button Groups

```jsx
function createToggleGroup(parent, items, selectedIndex) {
    var group = createRowGroup(parent);
    var buttons = [];
    
    for (var i = 0; i < items.length; i++) {
        var btn = group.add("button", undefined, items[i]);
        btn.value = (i === selectedIndex);
        
        btn.onClick = function() {
            // Clear all buttons
            for (var j = 0; j < buttons.length; j++) {
                buttons[j].value = false;
            }
            // Set clicked button
            this.value = true;
        };
        
        buttons.push(btn);
    }
    
    return buttons;
}
```

### Progress Indicators

```jsx
function createProgressBar(parent, width, height) {
    var group = createRowGroup(parent);
    
    var progressBg = group.add("panel", undefined, "");
    progressBg.minimumSize = [width, height];
    progressBg.maximumSize = [width, height];
    
    var progressFg = progressBg.add("panel", undefined, "");
    progressFg.minimumSize = [1, height - 4];
    progressFg.maximumSize = [width - 4, height - 4];
    progressFg.alignment = ["left", "center"];
    progressFg.margins = [2, 2, 2, 2];
    
    return {
        container: progressBg,
        bar: progressFg,
        setProgress: function(percent) {
            var maxWidth = width - 4;
            this.bar.minimumSize = [Math.floor(maxWidth * percent / 100), height - 4];
            this.bar.maximumSize = [Math.floor(maxWidth * percent / 100), height - 4];
        }
    };
}
```

## Version Compatibility Matrix

| AE Version | UI Limitations | Recommended Patterns |
|-----------|----------------|-------------------|
| < 12.0 | No `iconbutton` direct blobs | Use `loadImage` fallback |
| 12.0-13.0 | Limited `tabbedpanel` sizing | Set explicit `minimumSize` |
| 13.0+ | Full modern UI support | Use all patterns |
| 22.0+ | Enhanced resize handling | Use `onResizing` + `onResize` |

## Common UI Gotchas

### Event Handler Scope

```jsx
// WRONG: 'this' is window object, not button
btn.onClick = function() {
    alert(this.text); // undefined
};

// RIGHT: Use button reference directly
btn.onClick = function() {
    alert(btn.text); // works
};
```

### Layout Refresh

Always call layout refresh after dynamic changes:

```jsx
function updateUI() {
    // Make changes to UI elements
    someText.text = "Updated";
    someGroup.visible = false;
    
    // Refresh layout
    win.layout.layout(true);
    win.layout.resize();
}
```
