/**
 * Basic After Effects Script Template
 * Use this as starting point for simple scripts
 */

(function() {
    
    // Undo group - always wrap operations
    app.beginUndoGroup("Script Action");
    
    try {
        // Basic validation
        var comp = app.project.activeItem;
        if (!comp || !(comp instanceof CompItem)) {
            alert("Please select a composition first.");
            return;
        }
        
        // Your main logic here
        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length === 0) {
            alert("Please select at least one layer.");
            return;
        }
        
        // Example: Process each selected layer
        for (var i = 0; i < selectedLayers.length; i++) {
            var layer = selectedLayers[i];
            
            // Example operation: add marker
            var marker = new MarkerValue("Processed by script");
            layer.property("Marker").setValue(marker);
            
            // Example: log layer info
            $.writeln("Processed layer: " + layer.name);
        }
        
        alert("Script completed successfully.");
        
    } catch(e) {
        alert("Error: " + e.toString());
    } finally {
        app.endUndoGroup();
    }
    
})();
