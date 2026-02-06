/**
 * Dockable UI Template
 * Complete pattern for ScriptUI panels that work docked or as palette
 */

(function() {
    
    // Embedded binary data placeholder
    var ICON_BLOB = "__BLOB__BLOB_ICON_PLACEHOLDER__";
    
    /**
     * Create resource file from binary data
     */
    function createResourceFile(filename, binaryString, resourceFolder) {
        var myFile = new File(resourceFolder + "/" + filename);
        
        if (!myFile.exists) {
            if (!isSecurityPrefSet()) {
                alert("This script requires access to write files. Enable 'Allow Scripts to Write Files and Access Network' in Preferences.");
                return null;
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
    
    /**
     * Create main window (dockable or palette)
     */
    function createMainWindow(thisObj, title) {
        var win = thisObj instanceof Panel 
            ? thisObj 
            : new Window("palette", title, undefined, { resizeable: true });
        
        if (win == null) return null;
        
        // Build UI
        buildUI(win);
        
        // Layout and resize handling
        win.layout.layout(true);
        win.layout.resize();
        win.onResizing = win.onResize = function() {
            win.layout.resize();
        };
        
        // Show only for palette
        if (!(win instanceof Panel)) {
            win.show();
        }
        
        return win;
    }
    
    /**
     * Build the user interface
     */
    function buildUI(win) {
        win.orientation = "column";
        win.spacing = 5;
        win.margins = [10, 10, 10, 10];
        
        // Header with icon
        var headerGroup = win.add("group");
        headerGroup.orientation = "row";
        headerGroup.spacing = 10;
        headerGroup.alignment = ["fill", ""];
        
        // Add icon button if binary data available
        if (ICON_BLOB !== "__BLOB__BLOB_ICON_PLACEHOLDER__") {
            var iconFile = createResourceFile("icon.png", ICON_BLOB, getUserDataFolder());
            if (iconFile) {
                var iconBtn = headerGroup.add("iconbutton", undefined, ScriptUI.newImage(iconFile), { 
                    style: "toolbutton" 
                });
                iconBtn.helpTip = "Script Icon";
            }
        }
        
        var titleText = headerGroup.add("statictext", undefined, "Script Title");
        titleText.characters = 20;
        
        // Tabbed panel
        var tabPanel = win.add("tabbedpanel");
        tabPanel.maximumSize = [300, 400];
        tabPanel.spacing = 0;
        tabPanel.margins = 0;
        
        // Main tab
        var mainTab = tabPanel.add("tab", undefined, "Main");
        mainTab.orientation = "column";
        mainTab.spacing = 5;
        mainTab.margins = [10, 10, 10, 10];
        
        // Controls section
        var controlsGroup = mainTab.add("panel", undefined, "Controls");
        controlsGroup.orientation = "column";
        controlsGroup.spacing = 5;
        controlsGroup.alignment = ["fill", "fill"];
        
        // Example controls
        var sliderGroup = createRowGroup(controlsGroup);
        sliderGroup.add("statictext", undefined, "Value:");
        var slider = sliderGroup.add("slider", undefined, 50, 0, 100);
        slider.alignment = ["fill", ""];
        
        var valueText = sliderGroup.add("statictext", undefined, "50");
        valueText.characters = 5;
        
        slider.onChanging = function() {
            valueText.text = Math.round(this.value);
        };
        
        // Buttons
        var buttonGroup = createRowGroup(mainTab);
        var applyBtn = buttonGroup.add("button", undefined, "Apply");
        var resetBtn = buttonGroup.add("button", undefined, "Reset");
        
        applyBtn.onClick = function() {
            applySettings();
        };
        
        resetBtn.onClick = function() {
            resetSettings();
        };
        
        // Settings tab
        var settingsTab = tabPanel.add("tab", undefined, "Settings");
        settingsTab.orientation = "column";
        settingsTab.spacing = 5;
        settingsTab.margins = [10, 10, 10, 10];
        
        var checkboxGroup = settingsTab.add("panel", undefined, "Options");
        checkboxGroup.orientation = "column";
        checkboxGroup.spacing = 5;
        
        var option1 = checkboxGroup.add("checkbox", undefined, "Option 1");
        var option2 = checkboxGroup.add("checkbox", undefined, "Option 2");
        
        // Store references
        win.controls = {
            slider: slider,
            valueText: valueText,
            option1: option1,
            option2: option2
        };
    }
    
    function createRowGroup(parent) {
        var group = parent.add("group");
        group.orientation = "row";
        group.spacing = 5;
        group.alignment = ["fill", ""];
        return group;
    }
    
    /**
     * Main functionality
     */
    function applySettings() {
        app.beginUndoGroup("Apply Script Settings");
        
        try {
            var comp = app.project.activeItem;
            if (!comp || !(comp instanceof CompItem)) {
                alert("Please select a composition.");
                return;
            }
            
            var selectedLayers = comp.selectedLayers;
            if (selectedLayers.length === 0) {
                alert("Please select layers to process.");
                return;
            }
            
            // Process layers with current settings
            for (var i = 0; i < selectedLayers.length; i++) {
                var layer = selectedLayers[i];
                processLayer(layer);
            }
            
            alert("Settings applied to " + selectedLayers.length + " layers.");
            
        } catch(e) {
            alert("Error: " + e.toString());
        } finally {
            app.endUndoGroup();
        }
    }
    
    function resetSettings() {
        // Reset UI controls to default values
        if (this && this.controls) {
            this.controls.slider.value = 50;
            this.controls.valueText.text = "50";
            this.controls.option1.value = false;
            this.controls.option2.value = false;
        }
    }
    
    function processLayer(layer) {
        // Example layer processing
        var value = this.controls.slider.value;
        
        // Add expression or modify properties
        if (layer.property("Position")) {
            var expr = "value + [" + value + ", " + value + "]";
            layer.property("Position").expression = expr;
        }
    }
    
    /**
     * Main entry point
     */
    var mainWin = createMainWindow(this, "Dockable UI Template");
    
})();
