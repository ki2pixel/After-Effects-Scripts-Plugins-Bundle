**TL;DR**: Garde trois réflexes : sépare calculs et mutations via Worker + TaskScheduler, parcours l'arbre des Shape Layers par MatchName, et traite chaque handle AE comme une ressource jetable.

## Analogie architecte / maçon / intendant

Considère le pipeline PyShiftAE comme un chantier: l'architecte (worker Python) prépare les plans hors site, le maçon (TaskScheduler/main thread) exécute sur la dalle AE, et l'intendant (gestion des handles) apporte les outils puis les range immédiatement. Chaque pattern ci-dessous réutilise cette image pour éviter les confusions.

## Le problème
Tu écris du PyShiftAE et After Effects freeze, tes Shape Layers restent inaccessibles, ou un handle disparu explose ton script. Les recettes sont éparpillées (safe patterns, shape navigator, annexes), donc personne n'a un guide unique pour coder en mode production.

## La solution
Centraliser les recettes critiques dans un guide unique :
1. **Threading discipliné** : Worker thread pour les calculs, main thread pour les mutations (TaskScheduler ou code déjà sur AE thread).
2. **Shape Navigator** : Accès systématique par MatchName avec DynamicStreamSuite pour manipuler les contenus vectoriels.
3. **Mémoire maîtrisée** : Re-valide chaque handle et applique Lock → Use → Unlock → Free.

## Implémentation

### 1. Threading & Scheduler Discipline
*Worker thread = architecte, AE main thread = maçon. Tu ne mélanges jamais leurs tâches.*

| Étape | ❌ Mauvais réflexe | ✅ Geste sûr |
| --- | --- | --- |
| Worker | Appelle `layer.add_solid` ou lit des suites | Prépare uniquement des données pures (keyframes, tableaux) |
| Main thread | Inexistant (tout reste côté worker) | `ae.schedule_task` ou code déjà sur AE thread |

```python
# Voir implementation complète dans architecture.md
threading.Thread(target=lambda: (
    data := calculs_lourds(),
    ae.schedule_task(lambda: appliquer(data))
)).start()
```

### 2. Shape Layers sans tâtonner
*Utilise PropertyFactory pour obtenir des objets typés (OneDProperty, ColorProperty) et évite les conversions maison.*

| Sujet | ❌ Mauvais réflexe | ✅ Geste sûr |
| --- | --- | --- |
| Sélection | Indices (`property(1)`) dépendants de l'ordre | MatchName (`ADBE Vector Graphic - Fill`) |
| Types | Conversion manuelle des tuples | `PropertyFactory.create_property` |

```python
# Navigation fiable par MatchName (voir ae-internals.md pour la liste)
root = _stream(layer, "ADBE Root Vectors Group")
fill = next((node for _, node in iter_tree(root) if node.match_name == "ADBE Vector Graphic - Fill"), None)
```

### 3. Handles & Mémoire
*Ne garde jamais un handle AE longtemps : stocke un ID ou une position, puis re-récupère le handle juste avant usage.*

```python
handle = ae.get_some_handle()
try:
    locked = handle.lock()
    process_data(locked)
finally:
    handle.unlock()
    handle.free()
```

## Patterns d'Architecture Scripts (Universels)

### Rigs pilotés par calque invisible (Data-Driven Rigs)

**TL;DR**: Pour les rigs complexes, masque les sliders/checkbox sur un Null « Control » (guidé par des expressions) plutôt que sur les calques de rendu.

#### Le problème
Les scripts avancés (Talking Head, Splash, Social Importer) créent des calques guides remplis d'effets `Control`. Si on copie-colle les calques de rendu sans ce "cerveau", les expressions cassent.

#### La solution
1. **Détecter** les layers taggés (masqués, nommés `CTRL` ou `GUIDE`).
2. **Inventorier** leurs effets `ADBE Slider/Color/Point Control`.
3. **Consulter** le registre `Data-driven Control Layers` dans `ae-internals.md` pour connaître les mappings spécifiques.

```python
def collect_control_layers(comp):
    # Scan générique des Nulls de contrôle
    result = []
    for layer in comp.layers:
        if "CTRL" not in layer.name.upper(): continue
        # ... Logique d'extraction des effets ...
    return result
```

#### Golden Rule
**Aucun rig data-driven ne quitte une comp sans que son Null de contrôle (référencé dans `ae-internals.md`) ne soit dupliqué avec lui.**

### Gestion générique des Pseudo-Effets

**TL;DR**: Traite chaque pseudo-effet (`Pseudo/...`) comme une DLL manquante. Vérifie la présence du preset `.ffx` sur le disque avant toute tentative d'application.

#### Le problème
Les scripts tiers (LoopMaster, Flex) s'appuient sur des définitions XML invisibles. Sans vérification préalable, l'application via PyShiftAE échoue silencieusement ou crée des propriétés corrompues.

#### La solution
Utiliser un helper universel qui prend le matchName et le chemin du preset (stockés dans la matrice `ae-internals.md`).

```python
def ensure_pseudo_effect(layer, match_name, preset_path):
    if layer.effects.has(match_name): return
    if not Path(preset_path).exists(): raise FileNotFoundError(preset_path)
    layer.app.apply_preset(preset_path)
```

#### Golden Rule
**Pas de pseudo-effet sans triptyque vérifié : matchName exact, preset disponible, permissions disque (voir `ae-internals.md` pour les chemins).**

### Tags métadonnées comme RAM (Stateless Scripting)

**TL;DR**: AE ne persiste aucun état JS/Python. Utilise des tags standardisés dans les commentaires (`MS_LOCKED`, `RH_TAKE=3`) pour simuler une mémoire persistante.

#### Le problème
Comment savoir si un calque a été "locké par mon script" ou "locké par l'utilisateur" ? Comment savoir quelle version de preset est appliquée ?

#### La solution
Standardiser les préfixes (voir tableau `Metadata Tag Prefixes` dans `ae-internals.md`) et utiliser des accesseurs.

```python
def read_tag(layer, prefix):
    # Lit le commentaire et extrait la valeur après le préfixe
    pass

def write_tag(layer, prefix, value):
    # Ajoute ou met à jour le tag sans écraser les commentaires utilisateur
    pass
```

#### Golden Rule
**Ce qui doit survivre au redémarrage d'AE vit dans un tag documenté (voir `ae-internals.md`), jamais dans une variable globale.**

### Stratégie `app.settings` & Préférences

**TL;DR**: Pour stocker des configurations UI, utilise toujours un namespace explicite (`Vendor_Tool`) et prévois un fallback JSON si l'écriture est interdite.

#### Le problème
Les scripts écrivent souvent à la racine de `app.settings` ou échouent si l'utilisateur n'a pas coché "Allow Scripts to Write Files".

#### La solution
Une fonction wrapper qui tente d'écrire dans les préférences AE, et bascule sur un fichier dans `Folder.userData` en cas d'échec.

**Référence** : Consulte le "Registre app.settings" dans `ae-internals.md` pour la liste des clés existantes afin d'éviter les collisions.

#### Golden Rule
**Chaque préférence a un namespace explicite, un fallback disque et est référencée dans le registre central.**

### Virtual Camera Solids & Cross-Comp Linking

**TL;DR**: Pour simuler des caméras virtuelles ou lier des compositions (pattern *Boxcam*), utilise un solide guide masqué comme référence spatiale.

#### Le problème
Synchroniser une caméra entre une précomp et une comp principale est mathématiquement complexe et fragile lors du scaling.

#### La solution
Créer un solide guide (souvent masqué) dans la comp source. Utiliser ce solide comme parent ou référence pour les expressions `toComp`/`toWorld` dans la comp cible. Cela permet de manipuler la "vue" sans toucher à la caméra réelle d'AE.

**Référence** : Voir la section "Virtual camera solids" dans `ae-internals.md` pour les implémentations spécifiques (Boxcam, etc.).

### Sampling Précis (sourceRectAtTime)

**TL;DR**: Mesure toujours via `sourceRectAtTime`/`sampleImage` entouré de duplication temporaire pour éviter les biais (effets, parents, temps).

#### Le problème
Calculer la taille d'un calque texte ou shape échoue si le calque est parenté, a des effets de distorsion ou n'est pas à l'instant T.

#### La solution
Pattern "Isolation Temporaire" :
1. Dupliquer le calque.
2. Retirer parents et effets non-génératifs.
3. Mesurer `sourceRectAtTime(t, false)`.
4. Supprimer le duplicata.

#### Golden Rule
**Ne déplace jamais un anchor ou un stroke sans recalcul frais dans un contexte isolé ; tout cache devient une dette.**