# Installation & Déploiement Windows (PyShiftAE + MediaSolution)

**TL;DR**: Copie l'environnement Python entier dans `Support Files` avant d'installer PyShiftAE, puis fais voyager PyShiftBridge et l'extension CEP avec ce même Python. Sans isolation locale, AE retombera dans le DLL Hell.

## Analogie « valise personnelle »

Chaque composant (Python, PyShiftAE, PyShiftBridge, CEP) voyage dans la même valise que le fichier `AfterFX.exe`. Si tu laisses ne serait-ce qu'une DLL dans la valise commune (PATH système), un autre logiciel peut y glisser une chaussure incompatible et ton vol plante.

### ❌ Valise partagée vs ✅ Valise personnelle

| Sujet | ❌ Valise partagée (PATH) | ✅ Valise personnelle (`Support Files`) |
| --- | --- | --- |
| Installation | `pip install` sur Python global → AE charge une version imprévisible | Copie complète de `Lib`, `DLLs`, `python*.dll` à côté d'AE |
| PyShiftBridge | Démarré avec `python bridge_daemon.py` système | Toujours démarré via `Support Files\Python\python.exe` |
| CEP | `manifest.xml` qui référence `%PATH%` | NodeJS/Python pointant vers le dossier isolé |
| Maintenance | Mise à jour windows = DLL remplacée | Tu recopies ta valise lors de chaque release |

## Le Problème

Tu installes PyShiftAE sur Windows, `psc-install` termine sans erreur, mais After Effects balance un `Effect Plug-in ... failed to initialize (48 :: 72)` ou refuse d'afficher `Fenêtre → Python Console`. Sur les machines de prod, c'est pire: plusieurs Python traînent dans le PATH et AE charge la mauvaise DLL. Résultat: crash, daemon PyShiftBridge introuvable, panel CEP qui refuse de parser CSV.

## La Solution

Isoler Python et toutes ses dépendances à l'intérieur du dossier d'After Effects. AE charge **toujours** ce qui se trouve à côté de `AfterFX.exe`. Tu construis PyShiftAE avec ton Python local, tu recopies `Lib`, `DLLs`, `python311.dll`, `python3.dll` dans `Support Files`, puis tu profites du même binaire pour démarrer PyShiftBridge et ton panel CEP. Cette approche élimine le PATH système, autorise plusieurs versions d'AE sur la même machine et fige les dépendances connues.

## Implémentation

### 1. Préparer l'environnement Python local

```powershell
$aePath = "F:\Adobe\Adobe After Effects 2024\Support Files"
$pythonPath = "C:\Python311"  # adapte ce chemin à ton install

mkdir "$aePath\Python"
Copy-Item "$pythonPath\Lib" "$aePath\" -Recurse
Copy-Item "$pythonPath\DLLs" "$aePath\" -Recurse
Copy-Item "$pythonPath\python311.dll" "$aePath\"
Copy-Item "$pythonPath\python3.dll" "$aePath\"
```

Vérifie que la version est bien locale :

```powershell
"$aePath\Python\python.exe" --version
```

### 2. Construire et installer PyShiftAE dans l'environnement isolé

```powershell
cd PyShiftAE/Python
pip install --upgrade pip wheel setuptools
python setup.py bdist_wheel
pip install dist\pyshiftae-<version>-cp<xyz>-win_amd64.whl

"$aePath\Python\python.exe" -m pip install pyshiftae
"$aePath\Python\python.exe" -c "import pyshiftae as ae; print('PyShiftAE OK:', ae.__version__)"
psc-install
```

Quand tu mets à jour PyShiftAE, recopie `Lib/site-packages/pyshiftae` depuis ton Python source vers chaque dossier `Support Files` (2024, 2025, etc.).

### 3. Déployer PyShiftBridge dans le même périmètre

```powershell
cp -r PyShiftBridge/ "$aePath\Lib\site-packages\PyShiftBridge\"
cd "$aePath\Lib\site-packages\PyShiftBridge\"
"$aePath\Python\python.exe" bridge_daemon.py --start
# Expected: PyShiftBridge daemon started on pipe: \\.\pipe\pyshift_default
```

Active l'autoboot :

```python
# C:\Users\<user>\Documents\Scripts\bridge_bootstrap_mediasolution.py
from PyShiftBridge import bridge_daemon

if not bridge_daemon.is_running():
    bridge_daemon.start()
    print("PyShiftBridge mailbox daemon démarré")
else:
    print("Daemon déjà actif")
```

```jsx
// Support Files\Scripts\Startup\PyShiftBridgeBootstrap.jsx
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
```

Variables d'environnement utiles :

- `PYSHIFTBRIDGE_BOOTSTRAP_PY` : chemin absolu du script Python (évite les chemins codés en dur).
- `PYSHIFTBRIDGE_DIR` : dossier mailbox pour déporter `Documents\PyShiftAE_CEP_Bridge`.

### 4. Installer l'extension CEP MediaSolution

```powershell
cp -r "MédiaSolution/MediaSolution-CEP/" "C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\MédiaSolution-CEP\"
```

Assure-toi que `CSXS/manifest.xml` pointe vers le Python isolé :

```xml
<CEFCommandLine>
  <Parameter>--enable-nodejs</Parameter>
  <Parameter>--nodejs-path>F:\Adobe\Adobe After Effects 2024\Support Files\Python\python.exe</Parameter>
</CEFCommandLine>
```

### 5. Validation

1. Redémarre AE (Shift pour forcer le rescan si besoin).
2. Vérifie `Fenêtre → Python Console` puis `Fenêtre → Extensions → MediaSolution`.
3. Active "Parser CSV Python" pour confirmer que le daemon répond.
4. Lance un batch complet (CSV cuts + tracking JSON) et surveille les logs : `SUCCESS (Segment): Created X segments`.

## Pièges & Trade-offs

| Piège | Pourquoi c'est dangereux | Comment l'éviter |
| --- | --- | --- |
| Installer PyShiftAE via pip global | AE chargera Python système (souvent mauvaise version) | Toujours utiliser `"...\Support Files\Python\python.exe" -m pip install ...` |
| Double-cliquer sur un `.whl` | Windows associe le mauvais interpréteur | Lancer `pip install dist\xxx.whl` depuis PowerShell/Admin |
| Supposer que le PATH restera stable | Un autre logiciel peut injecter sa propre DLL | Forcer tous les chemins absolus vers `Support Files` |
| Oublier de recopier `Lib/site-packages/pyshiftae` après mise à jour | L'environnement isolé reste sur une ancienne version | Ajouter la copie dans la checklist de release |
| Démarrer PyShiftBridge avec `python bridge_daemon.py` | Le daemon tourne avec un Python incompatible | Toujours utiliser l'exécutable isolé |
| Mode développeur CEP en production | Invite de confirmation à chaque ouverture | Signer l'extension avec un certificat Adobe |

## Checklist Post-Installation

- [ ] `Fenêtre → Python Console` affiche la version PyShiftAE
- [ ] Aucun pop-up `48 :: 72` au démarrage
- [ ] `"...\Support Files\Lib\site-packages\PyShiftBridge"` contient la dernière version
- [ ] Daemon PyShiftBridge démarre automatiquement (log "mailbox daemon démarré")
- [ ] Panel MediaSolution fonctionne avec "Parser CSV Python"

## Dépannage Express

| Symptôme | Cause probable | Action |
| --- | --- | --- |
| `No suitable Python runtime found` | Builder cherche `pylauncher` inexistant | `python setup.py bdist_wheel` avec ton interpréteur local |
| Panel CEP vide | Extension non chargée ou non signée | Vérifie `Window → Extensions` et la signature CEP |
| Mailbox timeout | Antivirus bloque `Documents/Temp` | Exécute AE en admin ou exclue le dossier |
| Mise à jour pip sans effet | Environnement isolé resté sur l'ancienne version | Recopie `Lib/site-packages/pyshiftae` dans chaque `Support Files` |

## Mauvaises interprétations fréquentes

1. **« Psc-install suffit, donc je peux laisser Python global. »** Faux: dès qu'un autre logiciel met une DLL dans le PATH, AE l'avale et ton panel ne démarre plus.
2. **« Démarrer PyShiftBridge avec n'importe quel Python ne change rien. »** En réalité, le daemon doit partager la valise isolée; sinon les modules PyShiftAE/PyFx ne se chargent pas.
3. **« Le manifest CEP peut rester générique. »** Sans `--nodejs-path` pointant vers ta valise, le panel retombera sur NodeJS système.

## Golden Rule

**L'environnement Python doit voyager avec le plugin**. Tant que Python, PyShiftAE, PyShiftBridge et l'extension CEP partagent le même dossier `Support Files`, AE ne retombera pas dans le DLL Hell et MediaSolution restera pilotable en production.
