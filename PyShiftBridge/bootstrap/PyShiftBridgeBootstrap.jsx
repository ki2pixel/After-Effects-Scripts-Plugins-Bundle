(function () {
    $.global.runPyShiftBootstrap = function () {
        if (typeof py === "undefined" || !py.executePythonFile) {
            app.scheduleTask("runPyShiftBootstrap()", 1000, false);
            return;
        }

        var scriptPath = $.getenv("PYSHIFTBRIDGE_BOOTSTRAP_PY");
        if (!scriptPath || scriptPath === "") {
            scriptPath = Folder.myDocuments.fsName + "/Scripts/bridge_bootstrap_mediasolution.py";
        }

        var scriptFile = new File(scriptPath);
        if (!scriptFile.exists) {
            alert("Script Python introuvable : " + scriptFile.fsName);
            return;
        }

        try {
            py.executePythonFile(scriptFile);
        } catch (e) {
            alert("Erreur lors de l'exécution du script Python : " + e.toString());
        }
    };

    app.scheduleTask("runPyShiftBootstrap()", 2000, false);
})();
