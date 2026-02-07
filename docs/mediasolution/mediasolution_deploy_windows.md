---
title: "MediaSolution — Guide de Déploiement Windows"
description: "Déploiement robuste de MediaSolution CEP avec PyShiftBridge sur Windows en production"
author: "MediaSolution Team"
created: "2026-02-06"
updated: "2026-02-07"
version: "1.0"
tags: ["deployment", "windows", "mediasolution", "pyshiftae", "cep"]
category: "technical-guide"
audience: "production-engineers"
estimated_read_time: "8 min"
---

# MediaSolution — Guide de Déploiement Windows

**TL;DR**: Pour déployer sans crash, isolez Python et respectez les chemins admin.

Vous déployez MediaSolution sur une station Windows et After Effects crash au démarrage. Le message d'erreur parle de "DLL Hell" Python. Vous réalisez que AE charge la mauvaise version de Python depuis le PATH système, et que votre environnement de développement propre ne correspond pas du tout à la complexité d'une machine de production avec multiples versions Python.

## Le Problème : DLL Hell Python

Le "DLL Hell" est un cauchemar classique sur Windows. Quand After Effects démarre, il cherche Python dans le PATH système. Si la machine a plusieurs versions Python (Python 3.9 pour un vieux script, Python 3.11 pour PyShiftAE, Python 3.12 pour un autre outil), AE peut charger la mauvaise DLL Python.

Le résultat : crash au démarrage, erreurs de compatibilité, ou comportements imprévisibles. Pire encore, le PATH peut changer entre les sessions ou après l'installation d'un autre logiciel.

## La Solution : L'Isolation par Copie Locale

Au lieu de dépendre du PATH système, nous copions Python et toutes ses dépendances directement dans le répertoire d'After Effects. AE trouvera toujours la bonne version parce qu'elle sera à côté de lui, pas quelque part dans le système.

### ❌ L'approche risquée (PATH dépendant)
```bash
# AE cherche Python dans le PATH - risqué !
pip install pyshiftae  # Installe dans Python système
```

### ✅ L'approche robuste (isolation locale)
```bash
# Python est copié localement avec AE - fiable !
cp -r Python311/ "F:\Adobe\Adobe After Effects 2024\Support Files\Python\"
```

## Prérequis Techniques

- **After Effects 2024/2025** avec support PyShiftAE
- **Python 3.11+** portable ou installé
- **Droits administrateur** pour écriture dans Program Files
- **Accès réseau** pour signature CEP (production)

---

## Étape 1 : Isolation Python

### 1.1 Préparer l'environnement Python local

```bash
# Créer le répertoire Python dans AE
mkdir "F:\Adobe\Adobe After Effects 2024\Support Files\Python"

# Copier Python 3.11 portable (ou installer localement)
cp -r C:\Python311\* "F:\Adobe\Adobe After Effects 2024\Support Files\Python\"

# Vérifier l'isolation
"F:\Adobe\Adobe After Effects 2024\Support Files\Python\python.exe" --version
# Doit retourner Python 3.11.x
```

### 1.2 Installer PyShiftAE dans l'environnement isolé

```bash
# Utiliser l'exécutable Python local, pas celui du PATH
"F:\Adobe\Adobe After Effects 2024\Support Files\Python\python.exe" -m pip install pyshiftae

# Tester l'installation isolée
"F:\Adobe\Adobe After Effects 2024\Support Files\Python\python.exe" -c "import pyshiftae as ae; print('PyShiftAE OK:', ae.__version__)"
```

### ⚠️ Warnings Critiques

❌ **Ne jamais installer via double-clic sur .whl**  
Windows peut associer le mauvais Python et installer dans le système.

✅ **Toujours utiliser pip install avec le chemin complet**  
Garantit l'installation dans le bon environnement.

❌ **Ne pas se fier au `python --version` du PATH**  
Il peut afficher la bonne version mais AE utilisera une autre.

✅ **Toujours vérifier avec le chemin complet vers Python AE**

---

## Étape 2 : Déploiement PyShiftBridge

### 2.1 Copier les fichiers dans l'environnement AE

```bash
# Source depuis votre repo vers l'environnement isolé AE
cp -r PyShiftBridge/ "F:\Adobe\Adobe After Effects 2024\Support Files\Lib\site-packages\PyShiftBridge\"

# Vérifier la structure cible
ls "F:\Adobe\Adobe After Effects 2024\Support Files\Lib\site-packages\PyShiftBridge\"
# bridge_daemon.py  CONFIGURATION_GUIDE.md  css/  CSXS/  __init__.py  install/  mediasolution_cuts_core.py  README_INSTALL.md
```

### 2.2 Tester le daemon avec Python isolé

```bash
# Utiliser Python local, pas celui du PATH
cd "F:\Adobe\Adobe After Effects 2024\Support Files\Lib\site-packages\PyShiftBridge\"
"F:\..\Python\python.exe" bridge_daemon.py --start
# Expected: "PyShiftBridge daemon started on pipe: \\.\pipe\pyshift_default"
```

### ⚠️ Erreur Courante : Mauvais Python

❌ `python bridge_daemon.py --start`  
Utilise Python du PATH, peut être une version incompatible.

✅ `"F:\..\Python\python.exe" bridge_daemon.py --start`  
Utilise Python isolé avec AE, garantie de compatibilité.

---

## Étape 3 : Extension CEP MediaSolution

### 3.1 Déploiement de l'extension

```bash
# Copier l'extension dans le répertoire CEP système
cp -r "MédiaSolution/MediaSolution-CEP/" "C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\MédiaSolution-CEP\"

# Vérifier la structure d'installation
ls "C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\MédiaSolution-CEP\"
# CSXS/  client/  css/  host/  DEBUG_CHECKLIST.md  INSTALL.md  README.md
```

### 3.2 Configuration du manifest pour production

Le manifest doit pointer vers notre Python isolé :

```xml
<!-- CSXS/manifest.xml -->
<ExtensionManifest Version="6.0" ExtensionBundleId="com.mediasolution.cep">
  <ExtensionList>
    <Extension Id="com.mediasolution.cep.panel" Version="1.0.0" />
  </ExtensionList>
  <ExecutionEnvironment>
    <HostList>
      <Host Name="AEFT" Version="[23.0,99.9]" />
    </HostList>
  </ExecutionEnvironment>
  <DispatchInfo>
    <!-- Important: pointer vers Python local -->
    <Resources>
      <MainPath>./client/index.html</MainPath>
      <CEFCommandLine>
        <Parameter>--enable-nodejs</Parameter>
        <Parameter>--nodejs-path>F:\Adobe\Adobe After Effects 2024\Support Files\Python\python.exe</Parameter>
      </CEFCommandLine>
    </Resources>
  </DispatchInfo>
</ExtensionManifest>
```

### ⚠️ Warning : Signature CEP

❌ **Mode développeur en production**  
Fonctionne mais demande confirmation à chaque démarrage.

✅ **Signature avec certificat Adobe**  
Nécessite un certificat de développeur Adobe (payant) mais fiable pour déploiement.

---

## Étape 4 : Bootstrap Automatique

### 4.1 Script Python bootstrap

Le repo fournit un script prêt à copier :

`PyShiftBridge/bootstrap/bridge_bootstrap_mediasolution.py`

Copiez-le vers :

`C:\Users\<user>\Documents\Scripts\bridge_bootstrap_mediasolution.py`

```python
from PyShiftBridge import bridge_daemon

if not bridge_daemon.is_running():
    bridge_daemon.start()
    print("PyShiftBridge mailbox daemon démarré")
else:
    print("Daemon déjà actif")
```

### 4.2 Script JSX bootstrap

Le repo fournit un script prêt à copier :

`PyShiftBridge/bootstrap/PyShiftBridgeBootstrap.jsx`

Copiez-le vers :

`C:\Program Files\Adobe\Adobe After Effects 2024\Support Files\Scripts\Startup\PyShiftBridgeBootstrap.jsx`

```jsx
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

> **Important** : Remplacer `<user>` par votre nom d'utilisateur Windows.

#### Chemins non hardcodés (optionnel)

Vous pouvez surcharger les chemins via variables d'environnement :

- `PYSHIFTBRIDGE_BOOTSTRAP_PY` : chemin complet vers `bridge_bootstrap_mediasolution.py` (si vous ne voulez pas utiliser `Documents\Scripts`).
- `PYSHIFTBRIDGE_DIR` : dossier du bridge mailbox (si vous ne voulez pas le défaut `Documents\PyShiftAE_CEP_Bridge`).

---

## Étape 5 : Validation et Tests

### 5.1 Démarrer After Effects

1. Lancer AE 2024/2025
2. Ouvrir la **Window → Extensions → MediaSolution**
3. Vérifier que le panneau s'affiche

### 5.2 Vérifier le daemon

Dans le panneau MediaSolution :
- Activer **"Parser CSV Python"**
- Le message doit indiquer "PyShiftBridge daemon actif"
- Logs AE doivent contenir "PyShiftBridge mailbox daemon démarré"

### 5.3 Test batch complet

1. Ouvrir une composition avec un calque vidéo
2. Charger un fichier CSV de cuts
3. Charger un tracking JSON (optionnel)
4. Lancer **"Appliquer les cuts"**
5. Vérifier dans les logs AE : "SUCCESS (Segment): Created X segments"

---

## Dépannage Production

| Symptôme | Cause probable | Solution |
|---|---|---|
| **Daemon ne démarre pas** | Python non trouvé ou mauvaise version | Utiliser le chemin complet vers Python AE |
| **Mailbox timeout** | Permissions dossier temp ou antivirus | Exécuter AE en administrateur ou exclure le dossier |
| **CEP panel vide** | Extension non chargée | Vérifier `Window → Extensions → MediaSolution` |
| **Parser Python désactivé** | Daemon inaccessible | Redémarrer AE ou lancer bootstrap manuellement |
| **Erreur CSV** | Format incorrect | Vérifier colonnes `start,end` et format timecode |

### ⚠️ Erreurs Courantes à Éviter

❌ **Installer PyShiftAE avec pip global**  
Utilise Python du système, pas celui isolé avec AE.

✅ **Toujours utiliser le chemin complet vers Python AE**  
`"F:\Adobe\Adobe After Effects 2024\Support Files\Python\python.exe"`

❌ **Supposer que le PATH est correct**  
Le PATH peut changer entre sessions ou après installation d'autres logiciels.

✅ **Vérifier la version Python avec le chemin complet**  
`"F:\..\Python\python.exe" --version`

---

## Maintenance

### Mise à jour PyShiftAE

```bash
"F:\Adobe\Adobe After Effects 2024\Support Files\Python\python.exe" -m pip install --upgrade pyshiftae
# Redémarrer AE
```

### Mise à jour PyShiftBridge

```bash
# Copier nouvelle version depuis repo
cp -r PyShiftBridge/ "F:\Adobe\Adobe After Effects 2024\Support Files\Lib\site-packages\PyShiftBridge\"
# Redémarrer AE
```

### Logs et monitoring

- **Logs AE** : `Help → Enable Logging... → Logging Level: INFO`
- **Daemon logs** : Console Python ou fichier temp `pyshift_bridge.log`
- **CEP debug** : Ouvrir les outils de développement du panel (F12)

---

## Références

- [Configuration Guide PyShiftBridge](../../PyShiftBridge/CONFIGURATION_GUIDE.md)
- [Architecture complète](../architecture_overview.md)
- [Guide d'intégration MediaSolution](./mediasolution_pyshiftae_integration.md)

---

## The Golden Rule : Hygiène des Environnements

**Build sur la machine cible, ne jamais supposer le PATH**

L'environnement de développement propre ne correspond jamais à la complexité d'une machine de production. Testez toujours sur la station exacte où le logiciel sera utilisé, avec les mêmes versions Python et les mêmes permissions.

---

*Créé le 6 février 2026 • Basé sur validation production (9 projets traités)*
