(function() {
    // 1. On autorise le CEP à lancer un processus externe tout seul
    $.setenv("PYSHIFTBRIDGE_ALLOW_SYSTEM_FALLBACK", "1");

    // 2. On pointe vers votre Python de "Support Files" (celui qui a les DLLs et site-packages)
    // On utilise le chemin du dossier où est installé AE dynamiquement
    var aeFolder = Folder.appPackage.parent; // Pointe vers "Support Files"
    var pythonPath = aeFolder.fsName + "\\python.exe";
    $.setenv("PYSHIFTBRIDGE_PYTHON", pythonPath);

    // 3. On définit le chemin du script de bootstrap
    var scriptPath = "C:\\Users\\kidpixel\\Documents\\Scripts\\bridge_bootstrap_mediasolution.py";
    $.setenv("PYSHIFTBRIDGE_BOOTSTRAP_PY", scriptPath);
    
    // 4. On définit le dossier de travail pour que le CEP sache où lire les JSON
    var bridgeDir = Folder.myDocuments.fsName + "\\PyShiftAE_CEP_Bridge";
    $.setenv("PYSHIFTBRIDGE_DIR", bridgeDir);
})();