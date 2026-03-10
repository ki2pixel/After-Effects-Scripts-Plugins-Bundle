# Installation & Déploiement Windows (PyShiftAE 0.1.1+ + MediaSolution)

**TL;DR**: PyShiftAE 0.1.1+ a supprimé la communication JavaScript interne. Le Bridge Daemon tourne maintenant depuis Python standard externe, plus besoin d'environnement "embed" dans Support Files. Le plugin `.aex` agit comme serveur silencieux dans AE, n'importe quel Python peut le contrôler à distance.


### ❌ Ancienne approche (embed) vs ✅ Nouvelle approche (externe)

| Sujet | ❌ Ancienne approche (embed) | ✅ Nouvelle approche (externe) |
| --- | --- | --- |
| Installation PyShiftAE | Copie `Lib`, `DLLs`, `python*.dll` dans `Support Files` | Installation standard via `pip install pyshiftae` |
| Communication | Objet JavaScript `py` interne | Bridge Daemon externe via librairie `PyFx` |
| Bridge Daemon | Démarré avec `Support Files\Python\python.exe` | Démarré avec Python standard externe |
| CEP | Dépend de l'environnement "embed" | Communique avec daemon externe via pipes/mailbox |
| Maintenance | Recopie manuelle après chaque mise à jour | `pip install --upgrade pyshiftae` suffit |

## Le Problème (Avant PyShiftAE 0.1.1)

Avant la version 0.1.1, tu devais injecter Python dans `Support Files` d'After Effects. L'objet JavaScript `py` permettait à ExtendScript/CEP de parler directement à Python interne. Mais cette approche créait des problèmes :

- **DLL Hell** : AE chargeait Python depuis PATH système, souvent une version incompatible
- **Complexité"embed"** : Copie manuelle de `Lib`, `DLLs`, `python*.dll` à côté d'AE
- **Bugs lanceur venv** : Faux lanceurs Python dans Support Files causaient des crashes
- **Maintenance lourde** : Chaque mise à jour PyShiftAE nécessitait recopie manuelle

## La Solution (PyShiftAE 0.1.1+)

**PyShiftAE 0.1.1+ a tout changé** :

- ❌ **"Removed JS communication"** : Plus d'objet `py` pour communication interne ExtendScript/CEP → Python
- ✅ **"Ability to control AE from ANY python process!"** : Le `.aex` agit comme serveur silencieux dans AE
- ✅ **Bridge Daemon externe** : Tourne depuis Python standard sur ta machine
- ✅ **Plus d'"embed"** : Fini la complexité Support Files, PyShiftAE est une vraie librairie externe

## Implémentation (PyShiftAE 0.1.1+)

### 1. Installer PyShiftAE en standard

```powershell
# Installation standard - plus besoin d'environnement "embed"
pip install pyshiftae

# Vérification
python -c "import pyshiftae as ae; print('PyShiftAE OK:', ae.__version__)"
```

### 2. Démarrer le Bridge Daemon avec Python standard

```powershell
cd PyShiftBridge
python bridge_daemon.py
# Expected: "PyShiftBridge daemon started" (utilise pipes/mailbox selon disponibilité)
```

### 3. Démarrage automatique (optionnel)

Crée le script Python de bootstrap (celui du repo `PyShiftBridge/bootstrap/bridge_bootstrap_mediasolution.py`) :

```python
# C:\\Users\\<user>\\Documents\\Scripts\\bridge_bootstrap_mediasolution.py
import os
import sys

# Ajoute PyShiftBridge au path si nécessaire
bridge_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if bridge_dir not in sys.path:
    sys.path.insert(0, bridge_dir)

from PyShiftBridge import bridge_daemon

bridge_dir = os.environ.get("PYSHIFTBRIDGE_DIR") or None

if not bridge_daemon.is_running():
    bridge_daemon.start(bridge_dir=bridge_dir)
    print("PyShiftBridge daemon démarré")
else:
    print("Daemon déjà actif")
```

2) **Le script JSX de startup n'est plus nécessaire avec PyShiftAE 0.1.1+**
## Golden Rule (PyShiftAE 0.1.1+)

**Le Bridge Daemon doit tourner avec Python standard externe**. PyShiftAE 0.1.1+ a transformé le plugin en serveur silencieux dans AE. Tant que le daemon externe tourne, n'importe quel Python peut contrôler AE à distance via la librairie `PyFx`. Fini la complexité de l'environnement "embed".

---

## Sources

- [README PyShiftAE 0.1.1](../../PyShiftAE/README.md) - "Removed JS communication" et "Ability to control AE from ANY python process!"
- [Architecture](../../docs/01-core/architecture.md) - Vue d'ensemble du système
- [Bridge CEP](../../docs/02-guides/cep-python-bridge.md) - Communication CEP ↔ Python

## Mauvaises interprétations fréquentes

1. **« Je dois encore copier Python dans Support Files. »** Faux: PyShiftAE 0.1.1+ utilise Python standard externe, plus d'environnement "embed".
2. **« Le script JSX de startup est toujours nécessaire. »** Faux: L'objet `py` n'existe plus, le daemon doit être démarré manuellement.
3. **« Je dois garder l'ancien manifest CEP avec --nodejs-path. »** Faux: Python standard peut être utilisé, plus besoin de pointer vers Support Files.
4. **« L'installation est plus compliquée maintenant. »** Faux: C'est beaucoup plus simple - juste `pip install pyshiftae` et `python bridge_daemon.py`.

## Dépannage Express (PyShiftAE 0.1.1+)

| Symptôme | Cause probable | Action |
| --- | --- | --- |
| `No suitable Python runtime found` | Builder cherche `pylauncher` inexistant | `python setup.py bdist_wheel` avec ton interpréteur local |
| Panel CEP vide | Extension non chargée ou daemon non démarré | Vérifie `Window → Extensions` et démarre `python bridge_daemon.py` |
| Mailbox timeout | Daemon non démarré ou firewall bloque communication | Démarre le daemon manuellement, vérifie firewall |
| Import pyshiftae échoue | Installation PyShiftAE incorrecte | `pip install pyshiftae` avec Python standard |

## Checklist Post-Installation (PyShiftAE 0.1.1+)

- [ ] PyShiftAE installé via `pip install pyshiftae`
- [ ] Bridge Daemon démarré avec `python bridge_daemon.py`
- [ ] Un menu PyShiftAE est présent (selon la version: `Fenêtre → Python Console` ou `File → Execute (.py)` )
- [ ] Aucun pop-up `48 :: 72` au démarrage
- [ ] Panel MediaSolution fonctionne avec "Parser CSV Python"
- [ ] Le daemon répond aux requêtes CEP (logs de communication visibles)

## Pièges & Trade-offs (PyShiftAE 0.1.1+)

| Piège | Pourquoi c'est dangereux | Comment l'éviter |
| --- | --- | --- |
| Utiliser l'ancienne procédure "embed" | Plus nécessaire avec 0.1.1+, ajoute de la complexité | Utiliser installation standard `pip install pyshiftae` |
| Oublier de démarrer le daemon externe | Le panel CEP ne trouvera pas de serveur Python | Démarrer `python bridge_daemon.py` avant AE |
| Supposer que l'objet `py` existe | Supprimé dans 0.1.1+, plus de communication JS interne | Utiliser bridge daemon externe |
| Garder l'ancien manifest CEP avec `--nodejs-path` | Plus nécessaire, peut causer des conflits | Simplifier le manifest, utiliser Python standard |

## Compatibilité avec anciennes versions PyShiftAE

### Si tu as PyShiftAE < 0.1.1

Les versions antérieures nécessitent encore l'environnement "embed" et l'objet `py` interne. Dans ce cas :

- Le script de startup `PyShiftBridgeBootstrap.jsx` est nécessaire
- L'installation doit suivre l'ancienne procédure (Support Files)
- Le daemon doit être démarré via `Support Files\Python\python.exe`

Réfère-toi à la section "Installation héritée" ci-dessous si tu utilises une ancienne version.

### Installation héritée (PyShiftAE < 0.1.1)

> **Note** : Cette section est conservée pour compatibilité avec les anciennes installations.

[... contenu original de l'ancienne installation ...]

### 5. Validation

1. **Démarre le Bridge Daemon manuellement** :
   ```powershell
   cd PyShiftBridge
   python bridge_daemon.py
   ```

2. Redémarre AE et vérifie qu'un menu PyShiftAE est présent (selon ta version: `Fenêtre → Python Console` **ou** `File → Execute (.py)`).

3. Vérifie `Fenêtre → Extensions → MediaSolution` et active "Parser CSV Python".

4. Lance un batch complet (CSV cuts + tracking JSON) et surveille les logs : `SUCCESS (Segment): Created X segments`.

### 4. Installer l'extension CEP MediaSolution

```powershell
cp -r "MédiaSolution/MediaSolution-CEP/" "C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\MédiaSolution-CEP\"
```

Le manifest CEP peut maintenant utiliser Python standard (plus besoin de `--nodejs-path` vers Support Files) :

```xml
<CEFCommandLine>
  <Parameter>--enable-nodejs</Parameter>
  <!-- Plus besoin de --nodejs-path vers Support Files avec PyShiftAE 0.1.1+ -->
</CEFCommandLine>
```

L'objet `py` n'existe plus, donc `PyShiftBridgeBootstrap.jsx` ne peut plus démarrer le daemon automatiquement. Le daemon doit être démarré manuellement ou via un script externe.

Si tu as besoin d'un démarrage automatique, utilise :
- **Task Scheduler Windows** pour lancer `python bridge_daemon.py`
- **Script de démarrage externe** qui vérifie si le daemon tourne
- **Lancement manuel** avant d'ouvrir AE


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
2. Vérifie qu'un menu PyShiftAE est présent (selon ta version: `Fenêtre → Python Console` **ou** `File → Execute (.py)`), puis `Fenêtre → Extensions → MediaSolution`.
3. Active "Parser CSV Python" pour confirmer que le daemon répond.
4. Lance un batch complet (CSV cuts + tracking JSON) et surveille les logs : `SUCCESS (Segment): Created X segments`.

### Si tu as `File → Execute (.py)` mais pas de `py.executePythonFile`

Certaines versions de PyShiftAE exposent un menu d'exécution de scripts, mais **n'injectent pas** l'objet `py.executePythonFile` dans ExtendScript. Dans ce cas:

- Le script de startup `PyShiftBridgeBootstrap.jsx` ne peut pas démarrer le daemon automatiquement.
- Le panel CEP GridCloner basculera en mailbox, puis en **fallback JSX** si le daemon ne répond pas.

Tu as alors 2 options:

1) **Démarrage manuel dans After Effects (recommandé pour diagnostiquer)**: utilise le menu PyShiftAE `File → Execute (.py)` et exécute le script :

- `C:\\Users\\<user>\\Documents\\Scripts\\bridge_bootstrap_mediasolution.py`

Ce script démarre le daemon mailbox **dans la session AE** (et crée les fichiers `cep_to_py.json` / `py_to_cep.json` si nécessaire).

2) **Démarrage externe via `system.callSystem` (optionnel)**: définis `PYSHIFTBRIDGE_ALLOW_SYSTEM_FALLBACK=1` et `PYSHIFTBRIDGE_PYTHON` (chemin absolu) pour permettre au host JSX d'essayer de démarrer le daemon.

## GridCloner : mode dégradé (sans PyShiftAE)

GridCloner repose normalement sur PyShiftAE + PyShiftBridge. Mais sur Windows, si PyShiftAE n’est pas chargé (pas de menu PyShiftAE, pas d’objet `executePythonFile`), le panel peut désormais basculer en **fallback ExtendScript** : il duplique et positionne la grille directement en JSX.

- ✅ Avantage : GridCloner reste utilisable même si le daemon ne démarre pas.
- ❌ Limite : certaines features liées au contrôleur / expressions (`linkOpacityToNull`, `linkScaleToNull`) restent non supportées (le fallback ajoute la note `expressions_not_supported`).

Si tu veux forcer un test de démarrage externe (optionnel) :

- `PYSHIFTBRIDGE_ALLOW_SYSTEM_FALLBACK=1`
- `PYSHIFTBRIDGE_PYTHON="...\\Support Files\\Python\\python.exe"` (chemin absolu)

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

- [ ] Un menu PyShiftAE est présent (selon la version: `Fenêtre → Python Console` ou `File → Execute (.py)`)
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
