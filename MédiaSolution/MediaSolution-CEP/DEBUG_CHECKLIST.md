# Checklist de Debug pour Extension CEP

## 🔍 Étapes de Diagnostic

### 1. Vérification de la Structure
```
MediaSolution-CEP/
├── CSXS/
│   └── manifest.xml          # ✅ Doit exister
├── client/
│   ├── index.html            # ✅ Doit exister
│   ├── style.css             # ✅ Doit exister
│   ├── main.js               # ✅ Doit exister
│   └── CSInterface.js        # ✅ Doit exister
└── host/
    └── MediaSolution.jsx     # ✅ Doit exister
```

### 2. Vérification du Manifest
- ✅ Bundle ID unique : `com.workflowmediapipe.mediasolution`
- ✅ Version CEP : 5.0 (plus compatible que 6.0/7.0)
- ✅ Host AEFT : `[13.0,99.9]` (compatible large)
- ✅ Chemins relatifs : `./client/index.html` et `./host/MediaSolution.jsx`

### 3. Installation Correcte

#### Windows
```cmd
# Copier vers :
%APPDATA%\Adobe\CEP\extensions\MediaSolution-CEP\
```

#### macOS
```bash
# Copier vers :
~/Library/Application Support/Adobe/CEP/extensions/MediaSolution-CEP/
```

### 4. Debug Mode After Effects

1. **Activer Debug** :
   - Menu `Help > Enable Debugging`
   - Redémarrer After Effects

2. **Vérifier Console** :
   - Ouvrir After Effects
   - Menu `Help > Open Console`
   - Chercher des erreurs CEP

### 5. Tests de Diagnostic

#### Test 1 : Vérification Fichier
```javascript
// Dans la console After Effects
var f = new File(Folder.userData + "/Adobe/CEP/extensions/MediaSolution-CEP/CSXS/manifest.xml");
$.writeln("Manifest exists: " + f.exists);
if (f.exists) {
    f.open("r");
    $.writeln("Manifest content: " + f.read());
    f.close();
}
```

#### Test 2 : Liste Extensions
```javascript
// Dans la console After Effects
var extensions = [];
var folder = new File(Folder.userData + "/Adobe/CEP/extensions/");
if (folder.exists) {
    var subfolders = folder.getFiles();
    for (var i = 0; i < subfolders.length; i++) {
        if (subfolders[i] instanceof Folder) {
            var manifest = new File(subfolders[i].fsName + "/CSXS/manifest.xml");
            if (manifest.exists) {
                extensions.push(subfolders[i].name);
            }
        }
    }
}
$.writeln("Found extensions: " + extensions.join(", "));
```

### 6. Problèmes Communs et Solutions

#### ❌ Extension n'apparaît pas
**Causes possibles :**
- Manifest XML invalide
- Mauvais emplacement d'installation
- Version CEP incompatible
- Debug mode non activé

**Solutions :**
1. Vérifier la syntaxe XML du manifest
2. Copier au bon endroit (voir étape 3)
3. Utiliser CEP 5.0 au lieu de 6.0/7.0
4. Activer debug mode et redémarrer AE

#### ❌ Erreur de chargement
**Causes possibles :**
- Chemins incorrects dans manifest
- Fichiers manquants
- Permissions insuffisantes

**Solutions :**
1. Vérifier que tous les fichiers existent
2. Corriger les chemins relatifs
3. Vérifier les permissions dossier

#### ❌ Interface vide
**Causes possibles :**
- Erreur JavaScript
- CSInterface manquant
- Chemin HTML incorrect

**Solutions :**
1. Ouvrir les outils de développement CEP (F12)
2. Vérifier la console pour erreurs JS
3. Confirmer CSInterface.js est présent

### 7. Logs et Debug

#### Console CEP (F12 dans le panel)
```javascript
// Vérifier CSInterface
console.log("CSInterface:", typeof CSInterface);
console.log("Host Environment:", window.__adobe_cep__.getHostEnvironment());
```

#### Console ExtendScript
```javascript
// Logs depuis le host
$.writeln("Media Solution Host Loaded");
```

### 8. Version Simplifiée (Test)

Si le problème persiste, tester avec cette structure minimale :

```xml
<!-- manifest.xml minimal -->
<?xml version="1.0" encoding="UTF-8"?>
<ExtensionManifest Version="5.0" ExtensionBundleId="com.test.mediasolution">
    <ExtensionList>
        <Extension Id="com.test.mediasolution" Version="1.0.0" />
    </ExtensionList>
    <ExecutionEnvironment>
        <HostList>
            <Host Name="AEFT" Version="[13.0,99.9]" />
        </HostList>
        <RequiredRuntimeList>
            <RequiredRuntime Name="CSXS" Version="5.0" />
        </RequiredRuntimeList>
    </ExecutionEnvironment>
    <DispatchInfoList>
        <Extension Id="com.test.mediasolution">
            <DispatchInfo>
                <Resources>
                    <MainPath>./index.html</MainPath>
                </Resources>
                <Lifecycle>
                    <AutoVisible>true</AutoVisible>
                </Lifecycle>
                <UI>
                    <Type>Panel</Type>
                    <Menu>Test Media Solution</Menu>
                    <Geometry>
                        <Size>
                            <Height>400</Height>
                            <Width>300</Width>
                        </Size>
                    </Geometry>
                </UI>
            </DispatchInfo>
        </Extension>
    </DispatchInfoList>
</ExtensionManifest>
```

### 9. Actions Immédiates

1. **Redémarrer After Effects** (essentiel après modifications)
2. **Vider le cache CEP** : Supprimer `%APPDATA%\Adobe\CEP\logs`
3. **Réinstaller l'extension** : Supprimer et recopier le dossier
4. **Tester avec un autre exemple** qui fonctionne pour comparer

### 10. Si Rien ne Fonctionne

Créer une extension de test minimale :
```html
<!-- index.html minimal -->
<!DOCTYPE html>
<html>
<head><title>Test</title></head>
<body>
    <h1>Test Extension</h1>
    <script src="CSInterface.js"></script>
    <script>
        var cs = new CSInterface();
        console.log("Extension loaded successfully");
    </script>
</body>
</html>
```

---

## 🚨 Si Toujours Problème

1. **Vérifier la version exacte d'After Effects**
2. **Consulter les logs système** Windows Event Viewer / macOS Console
3. **Tester avec une extension officielle Adobe** pour confirmer que CEP fonctionne
4. **Contacter le support Adobe** si nécessaire

**Dernière option :** Revenir au script JSX original qui fonctionne directement.
