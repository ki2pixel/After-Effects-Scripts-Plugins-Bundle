# Media Solution v12.0 CEP

Extension CEP (Common Extensibility Platform) pour Adobe After Effects qui adapte le script `Media-Solution-v11.2-production.jsx` en une interface panel moderne et intégrée.

## Fonctionnalités

- **Interface Panel Moderne** : Remplace les prompts/alertes par une UI HTML/CSS/JS intégrée à After Effects
- **Sélection de Dossier** : Interface intuitive pour choisir le dossier projet
- **Configuration Flexible** : Paramètres Python, flags de fonctionnalités, export/import de config
- **Traitement Batch** : Progression en temps réel, possibilité d'annulation, logs détaillés
- **Cuts CSV** : Application des segments depuis fichiers CSV avec pont Python optionnel
- **Auto-recentrage** : Recentrage automatique des calques via pont Python STEP7
- **Diagnostics** : Vérification de la structure du dossier avant traitement
- **Logs Intégrés** : Logs temps réel avec niveaux (info, success, warning, error, python)

## Architecture

### Structure des Dossiers

```
MediaSolution-CEP/
├── CSXS/
│   └── manifest.xml          # Configuration CEP pour After Effects
├── client/
│   ├── index.html            # Interface utilisateur principale
│   ├── style.css             # Styles CSS (thème sombre adapté AE)
│   ├── main.js               # Logique JavaScript client-side
│   └── CSInterface.js        # Bibliothèque Adobe CEP
├── host/
│   └── MediaSolution.jsx     # Logique ExtendScript host-side
└── README.md                 # Documentation
```

### Communication Client ↔ Host

- **Client → Host** : `csInterface.evalScript("functionName(params)")`
- **Host → Client** : Événements CEP `com.adobe.host.event.message` avec JSON

## Installation

### Pour Développement (Debug)

1. Copier le dossier `MediaSolution-CEP` vers le répertoire d'extensions CEP :
   - **Windows** : `%APPDATA%\Adobe\CEP\extensions\`
   - **macOS** : `~/Library/Application Support/Adobe/CEP/extensions/`

2. Activer le mode debug dans After Effects :
   - Menu `Help > Enable Debugging`
   - Redémarrer After Effects

3. Lancer l'extension :
   - Menu `Window > Extensions > Media Solution v12.0 CEP`

### Pour Distribution

1. Créer un package `.zxp` avec Adobe Extension Builder
2. Signer l'extension avec un certificat Adobe
3. Distribuer via Adobe Exchange ou installation manuelle

## Configuration

### Variables d'Environnement Requises

Le script s'attend à trouver les ponts Python suivants (configurables dans l'interface) :

- **Python Command** : Chemin vers l'exécutable Python (ex: `C:/Python313/python.exe`)
- **Analyzer Script** : `preprocess_ae_json.py` (pont STEP7 pour auto-recentrage)
- **Cuts Parser Script** : `media_solution_bridge.py` (pont pour parsing CSV)

### Flags de Configuration

- **Parser CSV Python** : Active le pont Python pour parsing CSV (fallback ExtendScript si erreur)
- **Auto-recentrage** : Applique le recentrage automatique via Python pendant le batch
- **Analyzer Python** : Active le pont Python pour calculs d'analyse

## Workflow d'Utilisation

1. **Sélectionner le Dossier** : Bouton "Parcourir..." pour choisir le dossier contenant `docs/` et les vidéos
2. **Configurer** : Ajuster les paramètres Python et flags selon besoins
3. **Diagnostics** : Vérifier la structure du dossier avec "Diagnostics"
4. **Traitement Batch** : "Démarrer Batch" pour traiter tous les projets automatiquement
5. **Cuts CSV** : Appliquer des segments manuellement sur une composition active
6. **Logs** : Surveiller les logs en temps réel et exporter si nécessaire

## Intégrations Pipeline MediaPipe

### Ponts Python

L'extension intègre les ponts Python récents du projet Workflow MediaPipe :

#### Auto-recentrage (STEP7 Analyzer)
```javascript
// Appelé depuis host/MediaSolution.jsx
tryRunPythonAnalyzerForLayer(comp, layer, frameRate, videoJsonFile)
```

#### Parsing CSV (Cuts Parser)
```javascript
// Appelé depuis host/MediaSolution.jsx
tryRunPythonCutsParserForCsv(comp, frameRate, csvFile)
```

### Fichiers JSON Supportés

- **Priorité 1** : `*_ae.json` (sortie STEP7 optimisée pour After Effects)
- **Priorité 2** : `*_tracking.json` (sortie STEP5/6)
- **Fallback** : `*.json` (format legacy)

## Développement

### Modifications Client-Side

- **HTML** : `client/index.html` - Structure de l'interface
- **CSS** : `client/style.css` - Styles et thème
- **JS** : `client/main.js` - Logique UI et communication CEP

### Modifications Host-Side

- **ExtendScript** : `host/MediaSolution.jsx` - Logique métier et appels AE
- **Nouvelles Fonctions** : Exporter les fonctions dans `this` pour accès CEP

### Debug

- **Console CEP** : Ouvrir les outils de développement CEP (F12)
- **Console ExtendScript** : Logs dans la console ExtendScript d'After Effects
- **Logs Fichier** : Logs sauvegardés dans le dossier projet

## Compatibilité

- **After Effects** : 2020 (v17.0+) et versions récentes **(compatible v13.0+)**
- **CEP Runtime** : 6.0+
- **Python** : 3.10+ (pour ponts Python)
- **Systèmes** : Windows 10+, macOS 10.15+

## Dépannage

### Problèmes Communs

1. **Extension n'apparaît pas** : Vérifier l'installation et activer le mode debug
2. **Erreur de communication** : Redémarrer After Effects pour purger le cache CEP
3. **Ponts Python non trouvés** : Vérifier les chemins dans la configuration
4. **Dossier non valide** : Le dossier doit contenir un sous-dossier `docs/`

### Logs Erreurs

- **CEP Interface** : Consulter les logs dans le panel
- **ExtendScript** : Vérifier la console After Effects
- **Python** : Les logs Python apparaissent avec le préfixe `[PY]` dans les logs CEP

## Historique

### v12.0 (CEP)
- Adaptation complète du script JSX v11.2 vers extension CEP
- Interface moderne HTML/CSS/JS remplaçant les prompts
- Intégration des ponts Python récents (STEP7 analyzer, cuts parser)
- Configuration flexible avec export/import
- Logs temps réel et diagnostics intégrés

### v11.2 (JSX)
- Script standalone avec interface prompts/alertes
- Ponts Python pour auto-recentrage et cuts CSV
- Suppression legacy ZIP extraction
- Optimisations batch et gestion erreurs

## Licence

Ce projet fait partie du Workflow MediaPipe v4.1 et suit les mêmes termes de licence.
