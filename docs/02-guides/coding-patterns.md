# Coding Patterns — PyShiftAE Recipes

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
- Worker thread = architecte, AE main thread = maçon. Tu ne mélanges jamais leurs tâches.
- Pas d'appels SDK hors main thread. Si tu n'es pas déjà dans bridge_daemon ou un callback TaskScheduler, tu prépares des données pures et tu les rejoues côté AE.
- Découpe les opérations longues en micro-tâches pour que l'UI reste fluide.

| Étape | ❌ Mauvais réflexe | ✅ Geste sûr |
| --- | --- | --- |
| Worker | Appelle `layer.add_solid` ou lit des suites | Prépare uniquement des données pures (keyframes, tableaux) |
| Main thread | Inexistant (tout reste côté worker) | `ae.schedule_task` ou code déjà sur AE thread |
| Impact | Deadlocks, AE gelé | UI stable, erreurs localisées |

```python
import pyshiftae as ae
import threading

def calculs_lourds():
    return [(i / 24.0, (i, i * 1.5, 0)) for i in range(1000)]

def appliquer(donnees):
    comp = ae.Item.active_item()
    if not comp:
        return
    layer = comp.layers.add_solid("Solid_IA", (0, 1, 0, 1), 1920, 1080, 10)
    for temps, valeur in donnees:
        idx = layer.position.add_key(temps)
        layer.position.set_value_at_key(idx, valeur)

threading.Thread(target=lambda: (
    data := calculs_lourds(),
    ae.schedule_task(lambda: appliquer(data))
)).start()
```

### 2. Shape Layers sans tâtonner
- Toujours chercher `ADBE Root Vectors Group`, puis naviguer récursivement par MatchName.
- Arrête-toi sur les groupes `ADBE Vector Graphic - Fill`, `Stroke`, etc., pour un accès stable.
- Utilise PropertyFactory pour obtenir des objets typés (OneDProperty, ColorProperty) et évite les conversions maison.

| Sujet | ❌ Mauvais réflexe | ✅ Geste sûr |
| --- | --- | --- |
| Sélection | Indices (`property(1)`) dépendants de l'ordre | MatchName (`ADBE Vector Graphic - Fill`) |
| Types | Conversion manuelle des tuples | `PropertyFactory.create_property` |
| Navigation | Boucle while sur `numProperties` | DFS récursif + filtre MatchName |

```python
import pyshiftae as ae

def _stream(group, match):
    stream = group._dyn_suite.GetNewStreamRefByMatchname(group.property, match)
    return ae.PropertyFactory.create_property(stream) if stream else None

def toggle_fill():
    layer = ae.Layer.active_layer()
    if layer is None:
        raise RuntimeError("Sélectionne un Shape Layer")

    root = _stream(layer, "ADBE Root Vectors Group")
    if root is None:
        raise RuntimeError("Pas de Root Vectors Group")

    fill = next((node for _, node in iter_tree(root)
                 if isinstance(node, ae.PropertyGroup) and node.match_name == "ADBE Vector Graphic - Fill"), None)
    if fill is None:
        raise RuntimeError("Aucun Fill trouvé")

    opacity = _stream(fill, "ADBE Vector Fill Opacity")
    if isinstance(opacity, ae.OneDProperty):
        before = opacity.get_value(ae.LTimeMode.CompTime, 0.0, False)
        opacity.set_value(25.0 if before > 25.0 else 75.0)
        return

    color = _stream(fill, "ADBE Vector Fill Color")
    if isinstance(color, ae.ColorProperty):
        color.set_value((1.0, 0.2, 0.2, 1.0))
        return

    raise RuntimeError("Fill trouvé mais aucune propriété modifiable")
```

### 3. Handles & Mémoire
- Ne garde jamais un handle AE longtemps : stocke un ID ou une position, puis re-récupère le handle juste avant usage.
- Applique systématiquement `try/finally` pour Lock → Use → Unlock → Free.
- Revalide tes collections : vérifie `layer_id <= comp.layers.num_layers` avant de manipuler.

| Sujet | ❌ Mauvais réflexe | ✅ Geste sûr |
| --- | --- | --- |
| Cache | Conserver un handle global entre deux frames | Stocker un ID puis re-récupérer le handle |
| Lifetime | Oublier `free()` ou `unlock()` | `try/finally` systématique |
| Validation | Supposer que le calque existe toujours | Vérifier `layer_id <= comp.layers.num_layers` |

```python
layer_id = 1

def apply_safe():
    comp = ae.Item.active_item()
    if not comp or layer_id > comp.layers.num_layers:
        return

    layer = comp.layers[layer_id]
    with ae.UndoGroup("Safe move"):
        layer.position.set_value((100, 100, 0))

handle = ae.get_some_handle()
try:
    locked = handle.lock()
    process_data(locked)
finally:
    handle.unlock()
    handle.free()
```

## Mauvaises interprétations fréquentes

1. **« Un worker hybride ira plus vite. »** Dès qu'il touche AE, la tour de contrôle (TaskScheduler) perd la main et tu déclenches un gel.
2. **« Les indices suffisent pour cibler un Shape Layer. »** Le premier designer qui réordonne les groupes casse ton script; seuls les MatchNames survivent.
3. **« Garder les handles en cache optimise les performances. »** Les handles expirent dès que la ressource meurt; re-récupération + Lock→Use→Unlock→Free reste obligatoire.

## Trade-offs

| Pattern | ✅ Avantage | ❌ Coût | Quand l'appliquer |
| --- | --- | --- | --- |
| Worker + Scheduler | UI fluide, pas de freeze | Discipline micro-tâches, code en deux fonctions | Toujours dès que l'opération dépasse 10 ms |
| Shape Navigator MatchName | Accès stable aux propriétés vectorielles | Boilerplate récursif | Dès que tu touches un Shape Layer |
| Lock→Use→Unlock→Free | Pas de crash ni fuite mémoire | Verbosité + try/finally obligatoire | Toute interaction avec les suites mémoire |

## Golden Rule
Chaque fois que tu écris du PyShiftAE, vérifie ce trio : Worker + Scheduler, navigation par MatchName, handles jetables. Si l'un des trois manque, ton script finira par crasher AE.
