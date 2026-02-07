# Media Solution CEP Panel — Rôle dans le pipeline 8 étapes

## 1. Contexte et objectif
- **But** : fournir aux motion designers une interface After Effects moderne (HTML/CSS/JS) pour piloter la phase de post-production directement à partir des artefacts STEP6/STEP7.
- **Code source** : `scripts/after_effects/MediaSolution-CEP/` (client CEP, ExtendScript host, manifest CEP 5.0).
- **Succession** : remplace le script standalone `Media-Solution-v11.2-production.jsx` en apportant UI persistante, suivi d'état et ponts Python intégrés.

## 2. Position dans le workflow v4.3
```
STEP6 → STEP7 → STEP8
  ↓        ↓        ↓
 *_tracking.json   *_ae.json   Fichiers finalisés/archives
        \___________/
             │
   Media Solution CEP Panel (After Effects)
```
1. **STEP6 – Réduction JSON** : produit `*_tracking.json` et `*_audio.json` stabilisés (voir @docs/workflow/features/STEP6_REDUCTION_JSON.md).
2. **STEP7 – Pré-traitement AE** : génère `*_ae.json` indexés et expose le **mode analyzer** consommé par le panel (voir @docs/workflow/pipeline/STEP7_PRETRAITEMENT_AE.md#mode-analyzer-sandwich).
3. **STEP8 – Finalisation** : archive les rendus; le panel prépare les projets AE avant cette étape pour accélérer la dernière validation créative.

## 3. Architecture du panel
| Couche | Technologies | Responsabilités |
| --- | --- | --- |
| **Client CEP** (`client/`) | HTML/CSS/JS + CSInterface | UI, préférences locales, écoute des événements host, suivi progression, export logs |
| **Host ExtendScript** (`host/MediaSolution.jsx`) | ExtendScript ES3 | Sélection dossier/CSV, diagnostics, orchestration batch, appels `system.callSystem()` |
| **Ponts Python** (`workflow_scripts/step7/preprocess_ae_json.py`, `scripts/after_effects/media_solution_bridge.py`) | Python 3.10 (`env/`) | Mode analyzer STEP7, auto-recentrage, parsing CSV cuts, consolidation des résultats |

## 4. Rappel pipeline STEP1 → STEP8
| Étape | Environnement | Résumé | Artefacts principaux |
| --- | --- | --- | --- |
| STEP1 — Extraction | `env/` | Décompresse les apports clients et normalise l'arborescence (`CACHE_ROOT_DIR`). | Dossiers `docs/`, `projets/`, médias bruts |
| STEP2 — Conversion vidéo | `env/` | Transcode les vidéos (25 fps, profils GPU si dispo) tout en instrumentant la progression. | Vidéos normalisées (`*_converted.mp4`) |
| STEP3 — Détection de scènes | `transnet_env/` | Utilise TransNetV2 pour identifier les coupures et générer les CSV segments. | `*_scenes.csv` |
| STEP4 — Analyse audio | `audio_env/` | Pipeline Lemonfox + Pyannote (embeddings optionnels) pour produire `*_audio.json`. | `*_audio.json` (VAD, diarization, embeddings) |
| STEP5 — Suivi vidéo | `tracking_env_slim/` (CPU) / `insightface_env/` (GPU) | MediaPipe Landmarker par défaut (multiprocessing), InsightFace optionnel. | JSON tracking complets (`*.json`) |
| STEP6 — Réduction JSON | `env/` | Consolide les données en `*_tracking.json` + analytics et gère `*_audio.json` réduit. | `*_tracking.json`, `*_audio.json` standardisés |
| STEP7 — Pré-traitement AE | `env/` | Génère `*_ae.json` indexés et expose le mode analyzer Python utilisé par le CEP Panel. | `*_ae.json`, résultats analyzer |
| STEP8 — Finalisation | `env/` | Copie/archives les sorties (ResultsArchiver) et prépare la remise. | Paquets finalisés, métadonnées |

> Réfs détaillées : @docs/workflow/core/ARCHITECTURE_COMPLETE_FR.md, @docs/workflow/pipeline/STEP7_PRETRAITEMENT_AE.md, @docs/workflow/features/STEP6_REDUCTION_JSON.md.

## 4. Fonctionnalités clés
1. **Traitement batch** : génération automatique des projets AE 9:16, duplication des comps, suivi d'avancement et annulation.
2. **Diagnostics intelligents** : validation structure `docs/`, détection des JSON manquants et affichage des avertissements avant lancement.
3. **Auto-recentrage Python** : appel `preprocess_ae_json.py --manifest_path --output_path` pour récupérer `center_x/center_y`, `avg_confidence` par calque, puis appliquer Anchor Point/Position.
4. **Cuts CSV assistés** : option `enablePythonCutsParser` pour externaliser le parsing CSV dans `media_solution_bridge.py --mode cuts` avec snap factor configuré.
5. **Logs intégrés** : flux `info/warning/error/py` visibles dans le panel + export texte pour support.
6. **Configuration persistée** : stockage `localStorage` (chemin Python, activation ponts, flags) + import/export JSON.

## 5. Priorité des données consommées
1. `*_ae.json` (STEP7) — accès instantané via `dataByFrame` (aucun parsing streaming).
2. `*_tracking.json` (STEP6) — fallback stable si STEP7 indisponible.
3. `*.json` legacy STEP5 — lecture streaming ligne par ligne (ultime recours pour compatibilité).

Cette hiérarchie est partagée avec `Analyse-Écart-X-depuis-JSON-et-Label-Vidéo36_good.jsx`, garantissant un comportement homogène en post-production.

## 6. Intégration avec STEP7 (mode analyzer)
- Le panel construit un **manifest** décrivant les calques AE (id, plage de frames, chemin JSON) puis appelle Python via `system.callSystem()`.
- Le résultat contient les métriques calculées en Python (`center_x`, `center_y`, `avg_confidence`, `label_color`) utilisées pour :
  1. **Auto-recentrage batch** (gain ≈30‑50 % vs ExtendScript pur grâce au sandwich Python).
  2. **Alignement visuel** (couleurs/badges cohérents avec les labels pipeline).
- Les logs `[PY]` du script Python sont relayés dans l’UI, facilitant le debug sans quitter After Effects.

## 7. Flux opérateur recommandé
1. **Sélection du dossier projet** → validation automatique du sous-dossier `docs/` et comptage des vidéos.
2. **Chargement configuration** → vérifier chemin Python, activer/désactiver `enablePythonCutsParser`, `enableAutoRecentering`, `enablePythonAnalyzer` selon le besoin.
3. **Diagnostics** → identifier en amont les JSON manquants (`*_ae.json`, `*_tracking.json`, CSV) et corriger avant batch.
4. **Traitement batch** → lancer l'automatisation, suivre la progression, annuler si nécessaire (le panel remet l’état à « Prêt » en fin de run).
5. **Cuts CSV** (optionnel) → sélectionner un CSV, laisser Python générer les segments, appliquer dans la comp active.
6. **Export logs/config** → archiver la configuration partagée ou transmettre les logs lors d'un support.

## 8. Prérequis & limitations
- **Plateforme** : After Effects 2020+ (Windows/macOS) avec CEP 5.0 (mode debug activé via `Help > Enable Debugging`).
- **Python** : 3.10 installé localement + accès aux scripts du repo workflow (chemins configurés dans le panel).
- **Artefacts requis** : pipeline STEP6/STEP7 terminé (sinon les ponts retombent sur les fallbacks ExtendScript).
- **Sécurité** : aucun secret dans les manifests; les chemins sont validés côté ExtendScript avant transmission aux scripts Python.
- **Fallbacks automatiques** : en cas d’échec Python, retour immédiat aux routines historiques (recentrage et cuts ExtendScript) pour garantir le fonctionnement.

## 9. Valeur ajoutée pour l’équipe
- **Gain de temps** : calcule en Python les opérations coûteuses (mode analyzer) et automatise la création de projets AE, réduisant le temps manuel.
- **Robustesse** : s’appuie sur les artefacts standardisés STEP6/STEP7, évitant les crashs liés aux JSON STEP5 volumineux.
- **Observabilité** : centralise les logs ExtendScript + Python et fournit export, ce qui simplifie le support cross-équipe.
- **Alignement pipeline** : documente clairement la manière dont les données produites par le backend sont exploitées par les motion designers, facilitant la collaboration avec les équipes travaillant sur les scripts `@[/scripts/after_effects]` et le panel CEP dans le repo dédié.
*** End Patch
