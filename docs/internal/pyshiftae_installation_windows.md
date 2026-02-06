# Installation PyShiftAE sur Windows

## 1. Prérequis validés

| Élément | Version / Détails | Points de vigilance |
| --- | --- | --- |
| Windows | 10 ou 11 x64 | Exécuter PowerShell en mode Admin pour copier dans `Program Files`. |
| Python | **3.11 recommandé**, 3.12/3.13 supportés côté Python pur | Le builder officiel cherche 3.11, donc bâtir manuellement avec la version réellement installée. |
| After Effects | 2023+ (tests sur 2024 et 2025) | Installer Visual C++ Redistributable 2015-2022 x64. |
| Espace disque | Python côté C:, AE côté F: dans notre scénario | Les chemins multi-disques imposent une étape "portable" détaillée plus bas. |

## 2. Procédure d'installation propre

### 2.1 Construire et installer la roue Python
1. `cd <repo>/PyShiftAE/Python`
2. Installer les outils: `pip install --upgrade pip wheel setuptools`
3. Construire avec **votre** Python actuel (ex. 3.13):
   ```powershell
   python setup.py bdist_wheel
   ```
4. Installer la roue générée:
   ```powershell
   pip install dist\pyshiftae-<version>-cp<xyz>-win_amd64.whl
   ```
5. Vérifier: `pip show pyshiftae` doit pointer sur `C:\Users\<user>\AppData\Local\Programs\Python\Python3xx`.

> Pourquoi ne pas utiliser `build.py` ? Le script boucle sur 3.11/3.12/3.13 via `pylauncher`. Sans runtime 3.11 installé, on tombe sur `No suitable Python runtime found` (exit 103). Lancer directement `setup.py bdist_wheel` supprime cette dépendance.

### 2.2 Installer le plugin After Effects
1. Lancer `psc-install` (installé avec la roue):
   ```powershell
   psc-install
   ```
2. Lorsque demandé, fournir le dossier des plugins AE, ex. `F:\Adobe\Adobe After Effects 2024\Support Files\Plug-ins\Effects`.
3. Redémarrer After Effects.

## 3. Cas particulier : AE sur F:, Python sur C:

### 3.1 Symptômes observés
- Pop-ups au lancement: `Entry Point Not Found`, `Effect Plug-in PyShiftAE.aex failed to initialize (48 :: 72)`.
- `psc-install` réussit mais aucun panneau "Python Console" dans `Fenêtre`.

### 3.2 Causes racines
1. `python311.dll` copié à côté de `AfterFX.exe` cherche **son** `Lib` (standard library + `site-packages`) localement. Comme les dossiers restent sur C:, l'initialisation échoue en silence.
2. Variables d'environnement `Path` pleines de Python 3.9/3.10 provoquant un DLL Hell.
3. AE « blackliste » les plugins qui ont déjà planté, même après correction.

### 3.3 Correctifs éprouvés
1. **Méthode portable (préférée)**
   - Copier depuis `C:\...\Python311\` vers `F:\Adobe\Adobe After Effects 2024\Support Files\` :
     - dossiers `Lib` et `DLLs` (incluant `site-packages\pyshiftae`).
     - fichiers `python311.dll` **et** `python3.dll`.
   - Laisser `PyShiftAE.aex` dans `Plug-ins` (racine) ou `Plug-ins\PyShift` plutôt que `Plug-ins\Effects` si le panneau n'est pas visible.
2. **Option temporaire** : définir `PYTHONHOME=C:\...\Python311`. À retirer dès que la copie locale est en place pour éviter d'altérer les autres versions de Python.
3. **Purge du cache plugins** : démarrer After Effects en maintenant **Shift** enfoncé pour forcer un rescan complet.
4. **Vérifier `site-packages`** : `F:\...\Lib\site-packages\pyshiftae` doit contenir `__init__.py`, `ae.py`, etc. Recopier depuis C: après chaque mise à jour `pip install --upgrade pyshiftae`.
5. **Emplacement alternatif** : si le menu n'apparaît toujours pas, déplacer `PyShiftAE.aex` vers `C:\Program Files\Adobe\Common\Plug-ins\7.0\MediaCore\` (la DLL Python reste sur F:).

## 4. Checklist post-install
- [`Fenêtre` → `Python Console`] visible.
- Dans la console :
  ```python
  import pyshiftae
  print(pyshiftae.__version__)
  ```
- Aucun pop-up d'erreur au démarrage.
- `Lib/site-packages/pyshiftae` présent sur le même disque que `AfterFX.exe`.

## 5. Best practices et erreurs à éviter

1. **Toujours builder avec la version de Python réellement installée** pour éviter l'erreur 103.
2. **Ne jamais double-cliquer un `.whl`** : installation exclusivement via `pip install <wheel>`.
3. **Isoler Python embarqué** : copie locale de `Lib`, `DLLs`, `python311.dll`, `python3.dll` dans `Support Files` afin de ne pas dépendre de PATH ou PYLAUNCHER.
4. **Path hygiene** : garder la version 3.11 en tête de PATH, ou mieux, ne pas s'appuyer sur PATH grâce à la méthode portable.
5. **Rescan forcé après plantage** : démarrer AE avec Shift pour sortir un plugin de la liste noire interne.
6. **Maintenance** : après mise à jour du package sur C:, recopier `Lib/site-packages/pyshiftae` sur F: (sinon le plugin reste sur l'ancienne version).
7. **Vérifier la localisation du `.aex`** : préférer `Plug-ins` (racine) ou `MediaCore` pour les panneaux/UI plutôt que `Effects`.
8. **Installer les VC++ Redistributable 2015-2022** pour garantir la présence des runtimes MSVC requis par PyShiftAE.
9. **Sur multi-versions AE** (2024 + 2025), répliquer la même structure `Lib + DLLs + .aex` pour chaque `Support Files`.

## 6. Troubleshooting rapide

| Symptôme | Diagnostic | Solution testée |
| --- | --- | --- |
| `No suitable Python runtime found` en lançant `build.py` | Script tente `py -3.11` inexistant | Utiliser `python setup.py bdist_wheel` avec la version installée. |
| Double-clic sur `.whl` ouvre Notepad | Windows ne sait pas installer un wheel | `pip install dist\xxx.whl`. |
| Pop-up 48::72 + disparition de Python Console | DLL trouve pas sa stdlib | Copier `Lib`, `DLLs`, `python3.dll`, `python311.dll` à côté d'AE ou définir `PYTHONHOME`. |
| Aucune entrée dans `Fenêtre` | Plugin non scanné ou caché | Déplacer `.aex`, lancer AE + Shift, vérifier `site-packages`. |
| Mise à jour `pip` sans effet dans AE | Méthode portable figée | Re-copier `Lib/site-packages` depuis C: vers F:. |

## 7. Ressources utiles
- README du repo PyShiftAE (procédure officielle).
- `psc-install` (copie automatisée du `.aex`).
- Installer VC Redist x64 : <https://aka.ms/vs/17/release/vc_redist.x64.exe>.

---
**Dernière mise à jour :** 2026-02-06.
