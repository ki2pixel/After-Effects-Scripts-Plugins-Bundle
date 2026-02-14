---
description: Expert spécialisé dans les extensions CEP (Common Extensibility Platform) pour Adobe After Effects. Développe, débogue et maintient les panels HTML/CSS/JS intégrés avec ponts ExtendScript.
globs: ["**/CSXS/**", "**/client/**/*.js", "**/client/**/*.html"]
alwaysApply: false
---


# After Effects CEP Panel Expert (Media Solution v12.0)

Cette skill couvre le développement, le débogage et la maintenance des extensions CEP (Common Extensibility Platform) pour Adobe After Effects, avec un focus sur le panel Media Solution intégré.

## 1. Architecture CEP & Positionnement

### Rôle dans l'Écosystème
Les extensions CEP remplacent les scripts ExtendScript traditionnels par des panels modernes HTML/CSS/JS intégrés à After Effects. Dans l'architecture **Hybrid 2.0**, les panels CEP pilotent des ponts PyShiftBridge/PyShiftAE pour les opérations lourdes :

```
Pipeline MediaPipe → STEP7 (fichiers *_ae.json)
↓
Panel CEP (Media Solution v12.0) → Interface moderne dans AE
↓
Hybrid 2.0 Bridge (PyShiftBridge) → Transport adaptatif (pipes/sockets + mailbox)
↓
PyShiftAE (Python 3.11+) → Mutations AE optimisées
```

### Structure Technique
| Composant | Technologie | Rôle |
|---|---|---|
| **Client** | HTML/CSS/JS | Interface utilisateur moderne |
| **Host** | ExtendScript (.jsx) | Logique métier côté After Effects |
| **Bridge** | PyShiftBridge (Python) | Transport adaptatif + registre handlers |
| **Backend** | PyShiftAE (Python) | Mutations AE via SDK natif |
| **Communication** | CSInterface + Hybrid 2.0 | Client ↔ Bridge ↔ PyShiftAE |

## 2. Prérequis & Environnement

### Système & Logiciels
- **Windows 10+** (principal) ou **macOS 10.15+**
- **After Effects 2023+** (v24.0) - compatible v13.0+ (Hybrid 2.0)
- **CEP Runtime 6.0+** (manifest CEP 5.0 recommandé)
- **Python 3.11+** (pour ponts PyShiftBridge/PyShiftAE)

### Outils de Développement
- **Éditeur de code** (VS Code avec dossier `.vscode/` inclus)
- **Console CEP** (F12 dans le panel)
- **Console ExtendScript** (Help > Open Console dans AE)
- **Extension Builder** (pour packaging .zxp)

### Structure des Dossiers CEP
```
MediaSolution-CEP/
├── CSXS/
│   └── manifest.xml          # Configuration CEP
├── client/
│   ├── index.html            # UI principale
│   ├── style.css             # Styles (thème sombre AE)
│   ├── main.js               # Logique client
│   └── CSInterface.js        # Bibliothèque Adobe CEP
├── host/
│   └── MediaSolution.jsx     # Logique ExtendScript
└── .vscode/                  # Configuration développement
```

## 3. Développement & Implémentation

### 3.1 Manifest CEP (CSXS/manifest.xml)
```xml
<!-- Points clés à vérifier -->
<ExtensionManifest Version="5.0" ExtensionBundleId="com.workflowmediapipe.mediasolution">
    <HostList>
        <Host Name="AEFT" Version="[13.0,99.9]" />
    </HostList>
    <RequiredRuntimeList>
        <RequiredRuntime Name="CSXS" Version="5.0" />
    </RequiredRuntimeList>
    <DispatchInfo>
        <MainPath>./client/index.html</MainPath>
        <ScriptPath>./host/MediaSolution.jsx</ScriptPath>
    </DispatchInfo>
</ExtensionManifest>
```

### 3.2 Communication Client ↔ Host

#### Client → Host (evalScript)
```javascript
// client/main.js
const csInterface = new CSInterface();

function callHostFunction(functionName, params) {
    const script = `${functionName}(${JSON.stringify(params)})`;
    csInterface.evalScript(script, function(result) {
        console.log('Host response:', result);
    });
}

// Exemple : sélection de dossier
callHostFunction('selectProjectFolder', { path: folderPath });
```

#### Host → Client (événements CEP)
```javascript
// host/MediaSolution.jsx
function sendToClient(eventType, data) {
    const event = new CSXSEvent();
    event.type = "com.adobe.host.event.message";
    event.data = JSON.stringify({ type: eventType, payload: data });
    event.dispatch();
}

// Exemple : progression traitement
sendToClient('batchProgress', { 
    current: i, 
    total: total, 
    project: projectName 
});
```

### 3.3 Ponts PyShiftBridge/PyShiftAE (Hybrid 2.0)

#### Architecture Recommandée
Voir [**docs/02-guides/cep-python-bridge.md**](../../docs/02-guides/cep-python-bridge.md) pour le pattern complet :
- **Transport adaptatif** : Named pipes/Unix sockets (prioritaire) + mailbox JSON (fallback)
- **Registre dynamique** : `bridge_daemon.py` centralise les handlers de chaque panel CEP
- **Single Daemon, Multi-Domain** : Chaque panel = package Python avec `register_handlers()`

#### Auto-recentrage (STEP7 Analyzer)
```javascript
// host/MediaSolution.jsx → PyShiftBridge → PyShiftAE
function tryRunPythonAnalyzerForLayer(comp, layer, frameRate, videoJsonFile) {
    // Via PyShiftBridge transport (pas direct system.callSystem)
    const result = sendToPyShiftBridge('mediasolution_apply_analyzer', {
        comp_name: comp.name,
        layer_name: layer.name,
        frame_rate: frameRate,
        video_json: videoJsonFile
    });
    return parsePythonResult(result);
}
```

#### Parsing CSV (Cuts Parser)
```javascript
// host/MediaSolution.jsx → PyShiftBridge → PyShiftAE
function tryRunPythonCutsParserForCsv(comp, frameRate, csvFile) {
    const result = sendToPyShiftBridge('mediasolution_apply_cuts', {
        comp_name: comp.name,
        frame_rate: frameRate,
        csv_path: csvFile
    });
    return parseCutsResult(result);
}
```

## 4. Installation & Déploiement

### Installation Développement (Debug)
```bash
# Windows
copy /s MediaSolution-CEP "%APPDATA%\Adobe\CEP\extensions\"

# macOS
cp -r MediaSolution-CEP ~/Library/Application\ Support/Adobe/CEP/extensions/
```

### Activation Debug Mode
1. **After Effects** : `Help > Enable Debugging`
2. **Redémarrer** After Effects
3. **Vérifier** : `Window > Extensions > Media Solution v12.0 CEP`

### Packaging Distribution
1. **Adobe Extension Builder** : Créer package `.zxp`
2. **Signature** : Certificat Adobe requis
3. **Distribution** : Adobe Exchange ou installation manuelle

## 5. Diagnostic & Dépannage

### Checklist de Debug Complète

#### 1. Vérification Structure
- [ ] `CSXS/manifest.xml` existe et valide
- [ ] `client/index.html` accessible
- [ ] `host/MediaSolution.jsx` présent
- [ ] `CSInterface.js` inclus

#### 2. Manifest Validation
- [ ] Bundle ID unique : `com.workflowmediapipe.mediasolution`
- [ ] Version CEP : 5.0 (plus compatible)
- [ ] Host AEFT : `[13.0,99.9]`
- [ ] Chemins relatifs corrects

#### 3. Installation Correcte
```bash
# Vérifier emplacement Windows
dir "%APPDATA%\Adobe\CEP\extensions\MediaSolution-CEP\"

# Vérifier emplacement macOS
ls ~/Library/Application\ Support/Adobe/CEP/extensions/MediaSolution-CEP/
```

#### 4. Tests Console
```javascript
// Test existence manifest (console AE)
var f = new File(Folder.userData + "/Adobe/CEP/extensions/MediaSolution-CEP/CSXS/manifest.xml");
$.writeln("Manifest exists: " + f.exists);

// Lister extensions (console AE)
var extensions = [];
var folder = new File(Folder.userData + "/Adobe/CEP/extensions/");
// ... (voir DEBUG_CHECKLIST.md complet)
```

### Problèmes Communs & Solutions

#### ❌ Extension n'apparaît pas
**Causes** : Manifest invalide, mauvais emplacement, debug off
**Solutions** :
1. Valider syntaxe XML manifest
2. Vérifier emplacement installation
3. Activer debug mode et redémarrer AE

#### ❌ Interface vide ou erreur
**Causes** : Erreur JavaScript, CSInterface manquant
**Solutions** :
1. Ouvrir console CEP (F12)
2. Vérifier erreurs JavaScript
3. Confirmer CSInterface.js présent

#### ❌ Communication client/host rompue
**Causes** : Erreur evalScript, mauvais format
**Solutions** :
1. Vérifier syntaxe evalScript
2. Logger les appels côté client
3. Tester fonctions host individuellement

#### ❌ Ponts Python non fonctionnels
**Causes** : Chemins Python incorrects, permissions
**Solutions** :
1. Vérifier `PYTHON_EXECUTABLE` dans config
2. Tester commandes Python manuellement
3. Vérifier logs `[PY]` dans console

### Logs & Monitoring

#### Console CEP (F12)
```javascript
// Vérifier environnement
console.log("CSInterface:", typeof CSInterface);
console.log("Host Environment:", window.__adobe_cep__.getHostEnvironment());

// Logs communication
csInterface.addEventListener("com.adobe.host.event.message", function(event) {
    const data = JSON.parse(event.data);
    console.log("Host message:", data);
});
```

#### Console ExtendScript
```javascript
// Logs depuis host
$.writeln("Media Solution Host Loaded");
$.writeln("Python result: " + pythonResult);
```

## 6. Workflow de Développement

### Modifications Client-Side
1. **HTML** : `client/index.html` - Structure UI
2. **CSS** : `client/style.css` - Styles thème sombre AE
3. **JS** : `client/main.js` - Logique UI et communication

### Modifications Host-Side
1. **ExtendScript** : `host/MediaSolution.jsx` - Logique métier
2. **Export fonctions** : `this.functionName = function` pour accès CEP
3. **Gestion erreurs** : Try/catch systématique

### Cycle de Développement
1. **Modification** des fichiers
2. **Redémarrage** After Effects (essentiel)
3. **Test** via console CEP + ExtendScript
4. **Debug** avec logs détaillés
5. **Validation** fonctionnelle

## 7. Bonnes Pratiques

### Sécurité & Performance
- **Validation des entrées** côté client et host
- **Gestion erreurs** robuste avec try/catch
- **Async operations** pour les traitements longs
- **Memory management** : éviter leaks dans les boucles

### UX/UI Guidelines
- **Thème cohérent** avec interface AE (sombre)
- **Feedback temps réel** pour les opérations longues
- **Logs structurés** avec niveaux (info, warning, error)
- **Configuration persistante** via localStorage

### Communication Patterns
- **Messages structurés** JSON pour client ↔ host
- **Événements typés** pour différents types d'actions
- **Gestion timeouts** pour les appels system.callSystem()
- **Fallback mechanisms** si ponts Python échouent

## 8. Tests & Validation

### Tests Unitaires
```javascript
// Test communication client/host
function testHostCommunication() {
    csInterface.evalScript("testFunction()", function(result) {
        console.assert(result === "expected", "Host communication failed");
    });
}
```

### Tests Intégration
1. **Installation** : Vérifier apparition panel
2. **Communication** : Tester tous les ponts client/host
3. **Ponts Python** : Valider appels system.callSystem()
4. **Workflow complet** : Traitement batch de bout en bout

### Tests de Régression
- **Compatibilité** : Tester sur différentes versions AE
- **Performance** : Surveiller mémoire CPU
- **Stabilité** : Tests prolongés usage intensif

## 9. Références Techniques

### Documentation Projet
- **[docs/02-guides/cep-python-bridge.md](../../docs/02-guides/cep-python-bridge.md)** - Architecture Hybrid 2.0 complète
- **[docs/04-reference/capabilities.md](../../docs/04-reference/capabilities.md)** - Matrice d'arbitrage PyShiftAE vs ExtendScript (80/20)
- **[docs/04-reference/ae-script-audit.md](../../docs/04-reference/ae-script-audit.md)** - Audit des panels tiers (AEInfoGraphics, KBar, etc.)
- **[docs/01-core/architecture.md](../../docs/01-core/architecture.md)** - Vue d'ensemble Hybrid 2.0

### Documentation Adobe
- **CEP Documentation** : Adobe Developer Portal
- **ExtendScript Toolkit** : Référence API AE
- **CSInterface Reference** : Guide communication CEP

### Standards Projet
- **[.continue/rules/codingstandards.md](../../.continue/rules/codingstandards.md)** - Règles de développement
- **[docs/02-guides/coding-patterns.md](../../docs/02-guides/coding-patterns.md)** - Patterns PyShiftAE production
- **Tests Guidelines** : Stratégies de test

## 11. Panels Tiers & Audit (Hybrid 2.0)

### Analyse des Panels Existant
L'audit **[docs/04-reference/ae-script-audit.md](../../docs/04-reference/ae-script-audit.md)** documente les patterns des panels CEP tiers :

| Panel | Pattern observé | Payload CEP ↔ JSX | Risques |
|---|---|---|---|
| **AEInfoGraphics v2.0.3** | Génération comps via `transferData` | JSON avec `ADBE Color Control` multiples | Validation données requise |
| **KBar3 v3.1.1** | Toolbar RPC via `_kbar.*` | `_kbar.getAllEffects`, `_kbar.runFile` | Exécution JS arbitraire |
| **Social Importer** | Import projet + calques `CONTROL` | Mapping dossiers → effets | Dépendances externes |

### Intégration Hybrid 2.0
Pour chaque panel tiers, le pattern recommandé est :
1. **Wrapper PyShiftBridge** : Créer un package Python avec `register_handlers()`
2. **Validation** : Utiliser les handlers de validation PyShiftBridge
3. **Fallback** : Conserver logique JSX native si PyShiftAE indisponible

**Golden Rule** : *Tout panel CEP tiers doit être documenté dans ae-script-audit.md avant intégration Hybrid 2.0.*

## 12. Maintenance & Évolution

### Monitoring Production
- **Logs erreurs** : Collecte automatique des problèmes
- **Usage analytics** : Fonctionnalités les plus utilisées
- **Performance metrics** : Temps de réponse, mémoire

### Mises à Jour
- **Versioning sémantique** : Suivi des changements
- **Backward compatibility** : Support anciennes versions AE
- **Migration guides** : Documentation transitions

### Support Utilisateur
- **Documentation utilisateur** : Guides pas-à-pas
- **FAQ** : Problèmes communs et solutions
- **Templates** : Exemples de configuration
