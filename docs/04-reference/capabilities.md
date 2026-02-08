# PyShiftAE Capabilities Matrix

**TL;DR**: PyShiftAE couvre 80 % des besoins (navigation, propriétés primitives, automation rapide) si tu restes sur des streams simples; pour les 20 % restants (Bézier, API opaques, hooks natifs), bascule vers un fallback ExtendScript ciblé. L'audit du SDK C++ confirme que l'injection de presets `.ffx` et la lecture des `layer.comment` sont les angles morts majeurs du natif.

## Analogie boîte à outils

PyShiftAE est ta boîte à outils principale: rapide, testable, prête pour 80 % des interventions (et 100x plus rapide pour scanner 1000 calques). ExtendScript est ton tournevis de secours pour les vis exotiques (Bézier, FFX). Tu ne portes pas toute la quincaillerie sur toi, tu sais simplement quand sortir le bon outil.

## Le problème

Tu veux écrire un outil shape-aware ou un gestionnaire de rigs rapide. Les loops Python gèrent sans broncher 200 calques, mais la première fois que tu dois appliquer un pseudo-effet via un `.ffx`, tout s’écroule : la suite C++ `AEGP_EffectSuite` ne permet d'appliquer que des effets *déjà installés*, pas des presets depuis le disque. Bref, tu as besoin d'une matrice claire pour savoir quand PyShiftAE suffit et quand tu dois ressortir ExtendScript.

## La solution

1. **Capacités natives** : Exploiter PyShiftAE (via AETK) pour tout ce qui relève de la navigation hiérarchique lourde (`DynamicStreamSuite`), du filtrage de calques (`LayerFlags`) et de la persistance de données globales (`PersistentDataSuite`).
2. **Architecture hybride** : Encapsuler les 20 % d’opérations impossibles en C++ natif (Bézier, application de FFX, lecture de `layer.comment`) derrière un fallback ExtendScript déclenché par le bridge.
3. **Batching C++** : Ne jamais faire 10 000 appels Python -> C++ unitaires pour lire des tags. Utiliser des wrappers C++ qui scannent et renvoient des listes d'IDs en une seule passe.

### Matrice d’arbitrage rapide (Audit C++ AEGP)

| Besoin / Pattern | Solution PyShiftAE (Natif AETK) | Quand basculer ExtendScript (JSX Fallback) | Gain de perf (Natif) |
| :--- | :--- | :--- | :--- |
| **Navigation Shape Layer** | ✅ `DynamicStreamSuite` + MatchNames | Jamais. L'itérateur DFS C++ couvre tout. | **Très élevé** (Traversal batché) |
| **Filtrage Calques de Contrôle** | ✅ `LayerSuite` + Flags (`VIDEO_ACTIVE`, etc.) | Jamais. Récupère les IDs/Index/Noms en une passe C++. | **Très élevé** (Pas de DOM JS) |
| **Settings (`app.settings`)** | ✅ `AEGP_PersistentDataSuite4` | Seulement si la suite C++ n'est pas encore wrappée. | **Élevé** (Accès direct) |
| **Tags Métadonnées (Markers)** | ✅ `MarkerSuite` + `KeyframeSuite` (t=0) | Si le tag est stocké dans un `layer.comment`. | **Élevé** (Batching requis) |
| **Tags Métadonnées (Layers)** | ❌ Pas d'API AEGP pour `layer.comment` | ✅ Utiliser JSX pour lire/écrire `layer.comment`. | N/A |
| **Application d'Effets Natifs** | ✅ `AEGP_ApplyEffect` (Effets installés) | Jamais pour les effets natifs (ex: *Slider Control*). | **Élevé** |
| **Pseudo-Effects / `.ffx`** | ❌ Impossible d'appliquer un fichier `.ffx` | ✅ `layer.applyPreset(File)` via `ae.execute_script`. | N/A |
| **Vertices Bézier / Tangentes**| ❌ Types `ARB` inaccessibles via StreamSuite | ✅ Modification via JSX (`ADBE Vector Shape`). | N/A |

---

## Capacités par Domaine Fonctionnel

Cette section liste les "Capabilities" logiques. Pour les détails d'implémentation spécifiques à un script tiers (noms de fichiers, clés JSON), consultez `ae-internals.md`.

### 1. External DCC JSON Imports (Ex: Blenderae)

**Capacité** : Lire un JSON généré par un DCC externe (Blender, Maya) et reconstruire caméras/lumières dans AE.

*   **Implémentation PyShiftAE** :
    *   Lire le JSON via Python standard (rapide).
    *   Créer Comp/Caméra/Lumières via PyShiftAE API.
    *   **Limitation** : Gérer les limites "Trial" (durée de comp, résolution) en amont.
*   **Golden Rule** : Valider le JSON et la licence utilisateur avant de lancer la création d'objets dans AE.

### 2. Multi-format Export Pipelines (Ex: Bodymovin/Lottie)

**Capacité** : Exporter des compositions vers des formats web/vectoriels (JSON, AVD, SMIL).

*   **Implémentation Hybride** :
    *   PyShiftAE ne peut pas sérialiser le modèle interne d'AE vers JSON (accesseurs manquants).
    *   Utiliser ExtendScript pour l'extraction des données (ou les libs existantes type Bodymovin).
    *   Python pilote les options (Pretty print, compression assets) et le file system.
*   **Golden Rule** : Ne pas réécrire l'exporteur en Python ; piloter l'exporteur JS existant.

### 3. Procedural Grid Generation (Ex: MazeFX, Flex)

**Capacité** : Générer des structures de grille, labyrinthes ou layouts complexes basés sur des algorithmes.

*   **Implémentation PyShiftAE** :
    *   **Fortement recommandé en Python**. Calculer les coordonnées de grille en Python est 100x plus rapide qu'en JSX.
    *   Envoyer la liste des coordonnées (Points) à AE pour créer les Shapes/Masques.
    *   Utiliser le pattern "Data-Driven Rigs" (voir `coding-patterns.md`) pour lier les éléments.
*   **Golden Rule** : Calculer la grille hors d'AE (Python), dessiner le résultat dans AE.

### 4. Mograph-style Cloners (Ex: Cloners+Effectors, Easy Clones)

**Capacité** : Dupliquer des calques et les piloter via un effecteur maître.

*   **Implémentation PyShiftAE** :
    *   Gestion des "Effectors" (Objets de contrôle) via `ae-internals.md` (Registry).
    *   Injection d'expressions sur les clones.
    *   Stockage des métadonnées de clone dans un slider (ex: `aecdata`).
*   **Golden Rule** : Ne jamais modifier manuellement le slider de données (JSON sérialisé) ; utiliser un parser robuste.

### 5. Render Queue Automation & Security (Ex: Automation Toolkit)

**Capacité** : Manipuler la file de rendu, changer les output modules, exécuter des post-actions.

*   **Implémentation PyShiftAE** :
    *   Accès complet à `app.project.renderQueue`.
    *   **Sécurité** : Attention aux scripts qui permettent "Execute External Code". Toujours whitelister les actions.
*   **Golden Rule** : Toute commande Render Queue automatisée doit être loggée pour audit.

### 6. Complex Project Ingestion (Ex: Social Importer, Pro IO)

**Capacité** : Importer des projets entiers (.aep), fusionner des dossiers, re-linker des expressions.

*   **Implémentation PyShiftAE** :
    *   Utiliser `app.project.importFile` avec `ImportAsType.PROJECT`.
    *   Gérer la structure des dossiers (voir `ae-internals.md` pour les conventions de nommage spécifiques).
    *   Réparer les expressions cassées par le renommage des comps importées.
*   **Golden Rule** : Isoler l'import dans un dossier dédié avant de déplacer les items.

### 7. Advanced Text Tokenizing (Ex: TypeMonkey)

**Capacité** : Parser du texte, découper par mot/ligne, appliquer des styles dynamiques.

*   **Implémentation PyShiftAE** :
    *   Python est supérieur pour le parsing de texte (Regex, Tokenizers).
    *   Préparer les `TextDocument` en Python.
    *   Appliquer via `sourceText.setValue()`.
*   **Golden Rule** : Faire tout le traitement de texte en Python, n'envoyer que le résultat final à AE.

---

## Pièges et Bonnes Pratiques d'Architecture (C++)

1.  **Le goulot du "ScheduleOrExecute" (Batching)** :
    *   *Piège* : Faire une boucle Python qui lit le commentaire de 1000 markers en appelant le SDK C++ à chaque itération. Cela crée des milliers de tâches (futures) sur le main thread.
    *   *Solution* : Coder un wrapper C++ AETK `get_all_marker_comments(layer_id)` qui fait la boucle en interne et renvoie un dictionnaire à Python en **une seule tâche**.
2.  **Handles Jetables (Lifetime)** :
    *   *Piège* : Garder un `StreamRef` ou un `LayerID` en mémoire côté Python entre deux frames ou deux exécutions de scripts.
    *   *Solution* : Toujours appliquer le pattern "Lock -> Use -> Unlock -> Free". Les handles AEGP meurent vite.
3.  **L'illusion du "Layer.comment"** :
    *   *Piège* : Penser que `layer.comment` est accessible en natif comme `item.comment`. L'`AEGP_LayerSuite` ne l'expose pas.
    *   *Solution* : Pour du "Stateless Scripting" robuste 100% natif, stocke tes tags dans des **Markers à T=0**, ou utilise un TextLayer caché avec du JSON.

## Golden Rule

**Navigue et automatise en Python (80%); réserve ExtendScript aux gestes chirurgicaux (20% - Bézier, `layer.comment`, `.ffx`).** Dès que tu dois manipuler des milliers d'objets, assure-toi que la boucle itérative se fait côté C++ (Batching) et non côté Python pour éviter la saturation du `TaskScheduler`.