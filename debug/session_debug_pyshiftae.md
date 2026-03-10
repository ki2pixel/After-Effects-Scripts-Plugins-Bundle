# PyShiftAE / PyShiftBridge — Setup stable (AE 2024 sur F:)

## Objectif

Avoir un **daemon Python unique** (PyShiftBridge) qui sert vos panels CEP (ex. GridCloner + MediaSolution) via le transport **Mailbox (JSON)**, en évitant les démarrages externes qui provoquent des erreurs DLL (`PyFx`). 

---

## 1) Chemins (validés)

### After Effects “Support Files”

* `F:\Adobe\Adobe After Effects 2024\Support Files` 

### Scripts utilisateur

* `C:\Users\kidpixel\Documents\Scripts\`

  * `bridge_bootstrap_mediasolution.py`
  * `PyShiftBridge\` (dossier) *(contient notamment `bridge_daemon.py`, handlers, etc.)*

---

## 2) Principe de fonctionnement (Mailbox)

Les panels CEP communiquent via un dossier partagé (Mailbox) contenant notamment :

* `cep_to_py.json` (CEP → Python)
* `py_to_cep.json` (Python → CEP)

Le dossier est fourni via la variable d’environnement :

* `PYSHIFTBRIDGE_DIR = %USERPROFILE%\Documents\PyShiftAE_CEP_Bridge` 

---

## 3) Startup JSX (version stable “config only”)

### Emplacement recommandé

Copier le fichier dans le Startup d’After Effects :

* `F:\Adobe\Adobe After Effects 2024\Support Files\Scripts\Startup\PyShiftBridgeBootstrap.jsx`

### Contenu (stable)

> But : **uniquement configurer** le dossier mailbox et **désactiver** le fallback système qui tente de lancer un Python externe (source fréquente d’erreurs DLL).

```jsx
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
```



*(Optionnel mais pratique : laisser un pointeur vers le bootstrap Python, même si vous le lancez manuellement)* 

---

## 4) Bootstrap Python (version stable)

### Emplacement

* `C:\Users\kidpixel\Documents\Scripts\bridge_bootstrap_mediasolution.py`

### Contenu (stable)

> Point crucial : **ajouter `Support Files` aux DLL search paths**, puis démarrer le daemon, puis **garder le script vivant** (sinon le daemon meurt avec la fin du script). 

```python
import os
import sys
import time

# 1. INDISPENSABLE : On dit à Python d'aller chercher les DLL de After Effects
# Adaptez bien le chemin vers vos "Support Files"
ae_support_path = r"F:\Adobe\Adobe After Effects 2024\Support Files"
if os.path.exists(ae_support_path):
    os.add_dll_directory(ae_support_path)

from PyShiftBridge import bridge_daemon

if not bridge_daemon.is_running():
    d = bridge_daemon.start()
    print("PyShiftBridge mailbox daemon demarre !")
    print("En attente de After Effects...")
    
    try:
        while True:
            time.sleep(1.0)
    except KeyboardInterrupt:
        d.stop()
else:
    print("Daemon deja actif.")
```



---

## 5) Workflow utilisateur (le plus stable)

1. **Lancer After Effects**
2. **Démarrer le daemon une seule fois par session AE :**
   `File > Run Script Python (.py)` → sélectionner :
   `C:\Users\kidpixel\Documents\Scripts\bridge_bootstrap_mediasolution.py` 
3. **Ouvrir les panels CEP** (GridCloner / MediaSolution)
   → Le statut doit passer **Online** (point vert) et ils partagent le même Mailbox. 

---

## 6) À ne pas faire

* **Ne pas lancer via `.bat` / Python externe** dans cette config : vous retombez typiquement sur des erreurs d’import/initialisation DLL autour de `PyFx`. 

---

## 7) Check rapide si “Offline”

* Si `cep_to_py.json` change mais `py_to_cep.json` reste vide → daemon non démarré / mort.
* Relancer **(dans AE)** : `File > Run Script Python (.py)` sur `bridge_bootstrap_mediasolution.py`. 
