---
description: Expert spécialisé dans les scripts After Effects (ExtendScript) et les ponts Python pour la post-production MediaPipe. Opère les scripts AE, les ponts system.callSystem() et le pré-traitement STEP7.
globs: 
  - "**/*.{py,js,md}"
alwaysApply: true
---


# After Effects Scripts Expert (Post-Production MediaPipe v4.3)

Cette skill couvre l'exploitation des scripts After Effects (ExtendScript) et des ponts Python pour la post-production créative après le pipeline MediaPipe 8 étapes.

## 1. Contexte & Positionnement

### Rôle dans le Pipeline
Les scripts After Effects interviennent **offline sur Windows** (car AE n'existe pas sur Linux) comme phase de post-production créative **après STEP7** :

```
STEP7 (Pré-traitement AE) → Fichiers *_ae.json optimisés
↓
Scripts AE (Windows) → Post-production créative
```

### Scripts Principaux
| Script | Objectif | Fichiers consommés | Sorties |
|---|---|---|---|
| **Media-Solution-v11.2-production.jsx** | Création automatisée de projets AE | `*_ae.json`, CSV scènes, vidéos | Projets AEP avec découpes |
| **Analyse-Écart-X-depuis-JSON-et-Label-Vidéo36_good.jsx** | Recentrage intelligent basé sur tracking | `*_tracking.json` (prioritaire) ou `*.json` (STEP5) | Calques recentrés, analytics |
| **PyShiftBridge/mediasolution/** | Ponts Python modernes (Hybrid 2.0) | Manifestes `ms_*`, handlers Python | Segments, recentrage batch via PyShiftAE |
| **media_solution_bridge.py** | Pont Python legacy (system.callSystem) | Manifestes `ms_cuts_*`, `ms_analyzer_*` | Fallback si PyShiftBridge indisponible |

## 2. Prérequis & Environnement

### Système
- **Windows uniquement** (After Effects non disponible sur Linux)
- **After Effects 2023+** (v24.0) - compatible v13.0+ (Hybrid 2.0)
- **Python 3.11+** (pour ponts PyShiftBridge/PyShiftAE)

### Fichiers Requis
- `*_ae.json` (sortie STEP7 optimisée pour AE)
- `*_tracking.json` (sortie STEP6, source primaire)
- `*_audio.json` (données diarisation STEP4)
- CSV des scènes (STEP3) pour Media-Solution
- Vidéos sources dans `docs/legacy-adobe/` du projet

### Variables d'Environnement Clés
```bash
# STEP7 - Pré-traitement AE
STEP7_ENABLE_ANALYTICS=1          # Activer analytics dans *_ae.json
STEP7_INCLUDE_AUDIO_DATA=1       # Inclure données audio

# STEP6 - Réduction JSON (consommé par AE)
STEP6_INCLUDE_TRACKING_ANALYTICS=1    # Histogrammes confidence
STEP6_INCLUDE_EXPRESSION_SUMMARY=0    # Résumé expressions (défaut: désactivé)
STEP6_EXPRESSION_KEYS=jawOpen         # Clés expressions si activé

# Ponts Python (Hybrid 2.0)
PYTHON_EXECUTABLE=python3          # Chemin Python pour PyShiftBridge
PYSHIFTBRIDGE_ENABLED=1           # Activer ponts modernes (prioritaire)
DISABLE_UNDO_GROUP=0              # Désactiver undo groups pour batch (optionnel)
```

## 3. Procédures d'Opération

### 3.1 Lancement Standard Media-Solution
1. **Préparation** : Vérifier que STEP7 est terminé avec `*_ae.json` générés
2. **Ouverture AE** : Lancer After Effects et ouvrir un nouveau projet
3. **Exécution** : `File > Scripts > Run Script File > Media-Solution-v11.2-production.jsx`
4. **Sélection** : Choisir le dossier projet dans `CACHE_ROOT_DIR/`
5. **Validation** : Vérifier création des AEPs dans sous-dossier `projets/`

### 3.2 Recentrage Intelligent Analyse-Écart-X
1. **Détection automatique** : Le script cherche par ordre :
   - `*_tracking.json` (STEP6 - prioritaire, stable)
   - `*.json` (STEP5 - fallback streaming si massif)
2. **Parsing optimisé** : 
   - STEP6 : Lecture directe (JSON léger)
   - STEP5 : Streaming `readln()` + buffer (évite crashs mémoire)
3. **Application** : Recentrage automatique sur les calques sélectionnés
4. **Logs** : Vérifier la console AE pour les métriques `[PY]` et analytics

### 3.3 Ponts Python (Hybrid 2.0)

#### Mode PyShiftBridge (recommandé)
```javascript
// Depuis Media-Solution.jsx → PyShiftBridge → PyShiftAE
function tryRunPythonAnalyzer(comp, layer, frameRate, videoJsonFile) {
    // Via PyShiftBridge transport (voir docs/02-guides/cep-python-bridge.md)
    const result = sendToPyShiftBridge('mediasolution_apply_analyzer', {
        comp_name: comp.name,
        layer_name: layer.name,
        frame_rate: frameRate,
        video_json: videoJsonFile
    });
    return parsePythonResult(result);
}
```

#### Mode Legacy system.callSystem (fallback)
```javascript
// Fallback si PyShiftBridge indisponible
var pythonResult = system.callSystem(
    'python3 workflow_scripts/step7/preprocess_ae_json.py ' +
    '--manifest_path "' + manifestPath + '" ' +
    '--output_path "' + outputPath + '" ' +
    '--mode analyzer'
);
```

## 4. Diagnostic & Dépannage

### Points de Vigilance
1. **Mémoire AE** : Les JSON STEP5 complets (plusieurs MB) provoquent des crashs
   - **Solution** : Prioriser STEP6 ou utiliser parsing streaming
2. **Désalignement temporel** : Audio/vidéo décalé
   - **Diagnostic** : Vérifier `temporal_alignment` dans `*_tracking.json`
3. **Ponts Python** : Échec `system.callSystem()`
   - **Vérifier** : `PYTHON_EXECUTABLE` accessible, permissions
4. **Fichiers manquants** : `*_ae.json` ou `*_tracking.json` absent
   - **Action** : Relancer STEP6/STEP7, vérifier logs

### Logs & Monitoring
- **Console AE** : Messages `[PY]` pour les ponts Python
- **Logs STEP7** : `logs/step7/preprocess_ae_*.log`
- **Logs Bridge** : Sortie directe dans console AE via `system.callSystem()`

### Checklist Validation
- [ ] STEP7 terminé avec `*_ae.json` présents
- [ ] `*_tracking.json` (STEP6) disponible et valide
- [ ] Python accessible via `PYTHON_EXECUTABLE`
- [ ] After Effects redémarré après mise à jour des scripts
- [ ] Console AE visible pour les logs `[PY]`

## 5. Scénarios d'Usage

### 5.1 Pipeline Standard
```
STEP7 → *_ae.json → Media-Solution.jsx → Création AEPs
↓
Analyse-Écart-X.jsx → Recentrage intelligent
↓
Post-production créative manuelle
```

### 5.2 Recentrage Batch via Pont Python
```
Media-Solution.jsx → Manifest analyzer → system.callSystem()
↓
preprocess_ae_json.py --mode analyzer
↓
Logs [PY] + application Anchor Point/Position
```

### 5.3 Découpe CSV Optimisée
```
Media-Solution.jsx → Manifest cuts → system.callSystem()
↓
media_solution_bridge.py --mode cuts
↓
Segments générés + fallback ExtendScript si erreur
```

## 6. Tests & Validation

### Tests Unitaires Associés
```bash
# STEP7 - Pré-traitement AE
pytest -q tests/unit/test_step7_preprocess_ae_json.py

# Pont Python cuts
pytest -q tests/unit/test_media_solution_bridge.py

# STEP6 - Sortie tracking
pytest -q tests/unit/test_step6_json_reducer.py
```

### Validation Manuelle
1. **Fichier test** : Vérifier un `*_ae.json` de test
2. **Parsing** : Ouvrir dans éditeur JSON pour validation structure
3. **Recentrage** : Tester sur calque simple dans AE
4. **Performance** : Surveiller mémoire AE pendant traitement

## 7. Bonnes Pratiques

### Sécurité & Robustesse
- **Jamais de secrets** dans les scripts ExtendScript
- **Validation des chemins** avant `system.callSystem()`
- **Fallback automatique** : STEP5 → STEP6 si erreur
- **Redémarrage AE** requis après mise à jour des scripts

### Performance
- **Prioriser STEP6** : JSON léger vs STEP5 massif
- **Parsing streaming** : Pour les gros fichiers STEP5
- **Batch processing** : Utiliser les ponts Python pour les opérations répétitives
- **Monitoring mémoire** : Surveiller consommation AE

### Documentation
- **Logs `[PY]`** visibles dans console AE pour diagnostiquer les ponts
- **Commentaires** dans les scripts pour les points d'entrée clés
- **Metadata** : Conserver les versions des scripts dans les AEPs générés

## 9. Dispatch Documentation (Labo → Guides)

**TL;DR** : Ce skill utilise la documentation v2 comme source de vérité. Les patterns génériques sont dans `coding-patterns.md`, les données brutes dans `ae-internals.md`, et les preuves brutes dans `ae-script-audit.md`.

### Flux Documentation
1. **Labo** (`ae-script-audit.md`) : Preuves brutes des scripts analysés
2. **Manuel de Chimie** (`coding-patterns.md`) : Patterns universels extraits du labo
3. **Pharmacie** (`ae-internals.md`) : Données brutes (MatchNames, tags, registres)
4. **Catalogue** (`capabilities.md`) : Capacités fonctionnelles et arbitrage 80/20

### Golden Rule
*Tout pattern script doit être validé dans `ae-script-audit.md` avant d'être dispatché dans les guides génériques.*

## 10. Références Techniques

### Documentation Projet
| Document | Rôle | Cible |
|---|---|---|
| **[docs/README.md](../../docs/README.md)** | Vue d'ensemble documentation v2 | Tous |
| **[docs/02-guides/coding-patterns.md](../../docs/02-guides/coding-patterns.md)** | Patterns production (app.settings, parsing) | Développeurs |
| **[docs/04-reference/ae-internals.md](../../docs/04-reference/ae-internals.md)** | Registres MatchNames, tags, contrôles | Scripts avancés |
| **[docs/04-reference/ae-script-audit.md](../../docs/04-reference/ae-script-audit.md)** | Labo d'audit des scripts tiers | Références |
| **[docs/04-reference/capabilities.md](../../docs/04-reference/capabilities.md)** | Arbitrage PyShiftAE vs ExtendScript (80/20) | Architecture |
| **docs/legacy-adobe/** | Archive Adobe originale | Consultation historique |

### Scripts Clés
- `workflow_scripts/step7/preprocess_ae_json.py` - Moteur STEP7
- `PyShiftBridge/mediasolution/` - Ponts Python modernes (Hybrid 2.0)
- `scripts/after_effects/media_solution_bridge.py` - Pont Python legacy
- `scripts/after_effects/Media-Solution-v11.2-production.jsx` - Script principal
- `scripts/after_effects/Analyse-Écart-X-depuis-JSON-et-Label-Vidéo36_good.jsx` - Recentrage

### Conformité
- **Architecture Services/State** respectée via les ponts Python
- **Environnements virtuels** : `env/` pour STEP7, ponts Python autonomes
- **Sécurité** : Pas de secrets en dur, validation des entrées
- **Tests** : Suite unitaire complète pour les composants critiques
