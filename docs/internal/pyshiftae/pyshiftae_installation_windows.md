# Guide de Déploiement & Dépannage Windows

**TL;DR**: Le "DLL Hell" des conflits de versions Python est la cause n°1 des échecs d'installation. La solution est de rendre l'environnement Python portable en le copiant localement dans le dossier d'After Effects.

## Le Problème: DLL Hell sur Windows

Vous installez PyShiftAE. L'installation semble réussie, mais After Effects refuse de charger le plugin. Vous voyez des pop-ups `Entry Point Not Found` ou `Effect Plug-in PyShiftAE.aex failed to initialize (48 :: 72)`. Le panneau "Python Console" n'apparaît nulle part.

Ce que vous vivez est le classique "DLL Hell" Windows. After Effects trouve `python311.dll` mais cette DLL ne trouve pas sa bibliothèque standard (`Lib`) et ses modules (`DLLs`). Quand Python est installé sur `C:` et After Effects sur `F:`, les chemins relatifs cassent tout.

## ❌ L'approche PATH et pip global

L'approche classique semble logique: installer Python globalement, ajouter au PATH, puis installer PyShiftAE avec `pip`. En pratique, c'est une recette pour l'échec.

```powershell
# ❌ Ne faites PAS ça
pip install pyshiftae
psc-install
# Résultat: pop-ups d'erreur, pas de panneau Python Console
```

Pourquoi ça échoue? `psc-install` copie `PyShiftAE.aex` dans After Effects, mais le plugin dépend de `python311.dll` qui cherche ses `Lib` et `DLLs` sur le disque système. Quand After Effects est sur un autre disque, la DLL est perdue.

## ✅ La méthode Portable: l'environnement voyage avec le plugin

La solution qui fonctionne à tous les coups: copier l'environnement Python complet dans le dossier d'After Effects. Le plugin et ses dépendances voyagent ensemble.

```powershell
# ✅ La bonne approche
# 1. Installer PyShiftAE normalement
pip install pyshiftae

# 2. Copier l'environnement Python dans AE
Copy-Item "C:\Python311\Lib" "F:\Adobe\Adobe After Effects 2024\Support Files\Lib" -Recurse
Copy-Item "C:\Python311\DLLs" "F:\Adobe\Adobe After Effects 2024\Support Files\DLLs" -Recurse
Copy-Item "C:\Python311\python311.dll" "F:\Adobe\Adobe After Effects 2024\Support Files\"
Copy-Item "C:\Python311\python3.dll" "F:\Adobe\Adobe After Effects 2024\Support Files\"

# 3. Installer le plugin
psc-install
```

Maintenant `python311.dll` trouve tout ce dont il a besoin localement. Plus de dépendance au PATH, plus de conflits de versions.

## Table de Dépannage

| Erreur | Cause | Solution |
| --- | --- | --- |
| `No suitable Python runtime found` | Le script `build.py` cherche Python 3.11 via `pylauncher` qui n'existe pas | Utiliser `python setup.py bdist_wheel` avec votre version installée |
| Pop-up `48::72` + disparition Python Console | `python311.dll` ne trouve pas sa stdlib (`Lib`, `DLLs`) | Copier `Lib`, `DLLs`, `python3.dll`, `python311.dll` dans `Support Files` d'AE |
| Aucune entrée dans `Fenêtre` | Plugin blacklisté par AE après plantage | Démarrer AE en maintenant Shift (rescan forcé) |
| Mise à jour `pip` sans effet dans AE | Méthode portable figée, ancienne version copiée | Recopier `Lib/site-packages/pyshiftae` depuis l'installation Python vers AE |
| Double-clic sur `.whl` ouvre Notepad | Windows ne sait pas installer un wheel | `pip install dist\xxx.whl` obligatoirement |

## Procédure Complète d'Installation

### 1. Prérequis

| Élément | Version requise | Pourquoi c'est important |
| --- | --- | --- |
| Windows | 10 ou 11 x64 | PowerShell Admin requis pour copier dans Program Files |
| Python | 3.11+ (3.12/3.13 supportés) | Le builder officiel cible 3.11 mais autres versions fonctionnent |
| After Effects | 2023+ | Tests validés sur 2024 et 2025 |
| Visual C++ Redistributable | 2015-2022 x64 | Runtimes MSVC requis par PyShiftAE |

### 2. Construction et Installation

1. **Builder la roue avec votre Python actuel**:
   ```powershell
   cd PyShiftAE/Python
   pip install --upgrade pip wheel setuptools
   python setup.py bdist_wheel
   ```

2. **Installer la roue générée**:
   ```powershell
   pip install dist\pyshiftae-<version>-cp<xyz>-win_amd64.whl
   ```

3. **Vérifier l'installation**:
   ```powershell
   pip show pyshiftae
   # Doit pointer sur votre installation Python
   ```

### 3. Déploiement Portable

1. **Localiser les dossiers AE**:
   ```powershell
   $aePath = "F:\Adobe\Adobe After Effects 2024\Support Files"
   $pythonPath = "C:\Python311"  # Adaptez à votre installation
   ```

2. **Copier l'environnement Python**:
   ```powershell
   Copy-Item "$pythonPath\Lib" "$aePath\" -Recurse
   Copy-Item "$pythonPath\DLLs" "$aePath\" -Recurse
   Copy-Item "$pythonPath\python311.dll" "$aePath\"
   Copy-Item "$pythonPath\python3.dll" "$aePath\"
   ```

3. **Installer le plugin AE**:
   ```powershell
   psc-install
   # Choisir le dossier Plug-ins d'AE
   ```

4. **Redémarrer After Effects** (avec Shift si nécessaire)

### 4. Automatisation du Daemon PyShiftBridge

Pour MediaSolution ou autres CEP, il faut démarrer le daemon PyShiftBridge dans le process AE.

**Script Python `bridge_bootstrap_mediasolution.py`**:
Le repo fournit les scripts prêts à copier :

- `PyShiftBridge/bootstrap/bridge_bootstrap_mediasolution.py` → `C:\Users\<user>\Documents\Scripts\bridge_bootstrap_mediasolution.py`
- `PyShiftBridge/bootstrap/PyShiftBridgeBootstrap.jsx` → `Support Files\Scripts\Startup\PyShiftBridgeBootstrap.jsx`

Les scripts supportent les variables d'environnement :
- `PYSHIFTBRIDGE_BOOTSTRAP_PY` : chemin complet vers le script Python (remplace le fallback `Documents\Scripts`)
- `PYSHIFTBRIDGE_DIR` : dossier du bridge mailbox (remplace le défaut)

Voir `docs/mediasolution/mediasolution_deploy_windows.md` pour les instructions détaillées.

## La Golden Rule: L'environnement Python doit voyager avec le plugin

Cette règle résout 90% des problèmes d'installation Windows. Quand l'environnement Python est copié localement dans le dossier d'After Effects, il n'y a plus de dépendance au PATH système, plus de conflits de versions, plus de problèmes de chemins multi-disques.

Chaque mise à jour de PyShiftAE nécessite de recopier `Lib/site-packages/pyshiftae` depuis l'installation Python vers AE. C'est le prix de la fiabilité.

## Checklist Post-Installation

- [ ] Panneau `Fenêtre → Python Console` visible
- [ ] Test dans la console: `import pyshiftae; print(pyshiftae.__version__)`
- [ ] Aucun pop-up d'erreur au démarrage AE
- [ ] `Lib/site-packages/pyshiftae` présent sur le même disque que `AfterFX.exe`
- [ ] Daemon PyShiftBridge démarré automatiquement (si requis)

## Maintenance Multi-versions

Si vous utilisez plusieurs versions d'After Effects (2024 + 2025), répliquez la même structure pour chaque `Support Files`. Chaque version obtient son propre environnement Python isolé.

---

**Dernière mise à jour**: 2026-02-07
