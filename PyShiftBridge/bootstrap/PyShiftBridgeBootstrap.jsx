(function() {
    var supportFilesFolder = Folder.appPackage.parent;
    var defaultPythonPath = supportFilesFolder.fsName + "\\python.exe";
    var defaultBootstrapPath = Folder.myDocuments.fsName + "\\Scripts\\bridge_bootstrap_mediasolution.py";
    var defaultBridgeDir = Folder.myDocuments.fsName + "\\PyShiftAE_CEP_Bridge";

    $.setenv("PYSHIFTBRIDGE_ALLOW_SYSTEM_FALLBACK", "1");
    $.setenv("PYSHIFTBRIDGE_PYTHON", defaultPythonPath);
    $.setenv("PYSHIFTBRIDGE_BOOTSTRAP_PY", defaultBootstrapPath);
    $.setenv("PYSHIFTBRIDGE_DIR", defaultBridgeDir);
})();