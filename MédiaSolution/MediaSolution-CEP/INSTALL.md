# Guide d'Installation - Media Solution v12.0 CEP

## Installation Rapide

### Étape 1: Copier l'Extension

1. Localiser le dossier d'extensions CEP :
   - **Windows** : `%APPDATA%\Adobe\CEP\extensions\`
   - **macOS** : `~/Library/Application Support/Adobe/CEP/extensions/`

2. Copier le dossier `MediaSolution-CEP` dans ce répertoire

### Étape 2: Activer le Mode Debug

1. Ouvrir After Effects
2. Menu : `Help > Enable Debugging`
3. Redémarrer After Effects

### Étape 3: Lancer l'Extension

1. Menu : `Window > Extensions > Media Solution v12.0 CEP`
2. Le panel devrait apparaître dans l'interface d'After Effects

## Installation Détaillée

### Prérequis

- **After Effects 2020** (v17.0) ou version récente **(compatible v13.0+)**
- **Python 3.10+** installé (pour les ponts Python)
- **Workflow MediaPipe v4.1** avec scripts STEP7 et bridge disponibles

### Configuration des Ponts Python

Dans le panel Media Solution, configurer les chemins suivants :

1. **Python Command** : Chemin complet vers python.exe
   - Exemple : `C:/Python313/python.exe` ou `/usr/bin/python3`

2. **Scripts Python** : Les scripts doivent être accessibles depuis After Effects
   - `preprocess_ae_json.py` : Pont STEP7 pour auto-recentrage
   - `media_solution_bridge.py` : Pont pour parsing CSV

### Vérification de l'Installation

1. Ouvrir le panel Media Solution
2. Cliquer sur "Parcourir..." pour sélectionner un dossier projet
3. Cliquer sur "Diagnostics" pour vérifier la structure
4. Les logs devraient apparaître dans la section Logs du panel

## Dépannage

### Problème: L'extension n'apparaît pas dans le menu

**Solutions:**
1. Vérifier que le dossier `MediaSolution-CEP` est bien dans le répertoire d'extensions CEP
2. Activer le mode debug : `Help > Enable Debugging`
3. Redémarrer After Effects
4. Vérifier les permissions du dossier (lecture/écriture)

### Problème: Erreur de communication CEP

**Solutions:**
1. Redémarrer After Effects pour purger le cache CEP
2. Vérifier que `CSInterface.js` est présent dans `client/`
3. Consulter la console de développement CEP (F12 dans le panel)

### Problème: Les ponts Python ne fonctionnent pas

**Solutions:**
1. Vérifier le chemin de l'exécutable Python dans la configuration
2. S'assurer que les scripts Python sont accessibles
3. Tester les scripts manuellement en ligne de commande
4. Vérifier les logs pour les messages d'erreur Python

### Problème: Le dossier projet n'est pas reconnu

**Solutions:**
1. Le dossier doit contenir un sous-dossier `docs/`
2. Le dossier `docs/` doit contenir des fichiers vidéo (mp4, mov, etc.)
3. Exécuter "Diagnostics" pour voir les erreurs spécifiques

## Développement et Debug

### Console CEP

Pour ouvrir la console de développement CEP :
1. Clic droit dans le panel Media Solution
2. "Inspect" ou "Inspecter"
3. Ou utiliser F12 si le focus est sur le panel

### Logs ExtendScript

Les logs ExtendScript apparaissent dans :
1. La console d'After Effects (si activée)
2. La section Logs du panel CEP
3. Les fichiers de log sauvegardés dans le dossier projet

### Modification des Scripts

Pour modifier les scripts pendant le développement :
1. Modifier les fichiers dans `MediaSolution-CEP/`
2. Recharger l'extension : `Window > Extensions > Reload Extensions`
3. Ou redémarrer After Effects

## Mise à Jour

### Depuis une Version Précédente

1. Fermer After Effects
2. Remplacer l'ancien dossier `MediaSolution-CEP` par la nouvelle version
3. Redémarrer After Effects
4. La configuration est préservée via localStorage

### Sauvegarde de la Configuration

1. Dans le panel, cliquer sur "Exporter Config"
2. Sauvegarder le fichier JSON
3. Pour restaurer, cliquer sur "Importer Config"

## Support

Pour toute question ou problème :
1. Consulter les logs dans le panel
2. Vérifier la documentation dans `README.md`
3. Consulter la documentation du projet Workflow MediaPipe v4.1
