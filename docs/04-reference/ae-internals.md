# AE Internals Reference

**TL;DR**: Automatise tout avec les MatchNames (`ADBE ...`) et la hiérarchie réelle des Shape Layers, sinon tes scripts cassent dès qu'After Effects change de langue, de version ou d'ordre des propriétés.

## Analogie carte aeronautique

Imagine que l'UI est un panneau touristique qui change selon la langue, alors que les MatchNames sont les coordonnées GPS gravées sur la carte aéronautique. Piloter un script sans ces coordonnées revient à voler à vue dans le brouillard.

## Le problème

Tu cherches `layer.property("Effects")` parce que ça marche sur ta build anglaise. Tu déploies chez un client allemand, "Effects" devient "Effekte" et chaque appel retourne `null`. Même punition côté Shape Layers : la hiérarchie n'est pas visible dans l'UI, donc tu ajoutes des fills/strokes au mauvais endroit ou tu perds les tangentes en convertissant vers des masks. Bref, l'UI ment, les MatchNames seuls sont contractuels.

## La solution

Tu t'appuies exclusivement sur :

1. **MatchNames stables** (`ADBE Effect Parade`, `ADBE Vector Graphic - Fill`, etc.) — invariants langue/version.
2. **Hiérarchie Shape Layer documentée** — `ADBE Root Vectors Group` → `ADBE Vector Group` → `ADBE Vectors Group` → ...
3. **DynamicStreamSuite/GetNewStreamRefByMatchname** côté PyShiftAE — accès direct aux streams internes sans parcourir l'UI.
4. **Transform stack explicite** — pour convertir Shape ↔ Mask en préservant positions, anchors et scales.

## Implémentation

### Cartographie des MatchNames essentiels

| MatchName | UI label (EN) | Usage dominant | Notes |
| --- | --- | --- | --- |
| `ADBE Effect Parade` | Effects | Conteneur d'effets | Point d'entrée pour `addProperty()` |
| `ADBE Slider Control` | Slider Control | Effets paramétriques | Toujours accéder à `ADBE Slider Control-0001` pour la valeur |
| `ADBE Root Vectors Group` | Contents | Racine Shape Layer | Nécessaire avant tout ajout |
| `ADBE Vectors Group` | Group Contents | Sous-groupes shape | Imbriqué dans chaque `Vector Group` |
| `ADBE Vector Graphic - Fill` | Fill | Style | Expose `ADBE Vector Fill Color/Opacity` |
| `ADBE Vector Graphic - Stroke` | Stroke | Outline | Width, Color, Line Cap/Join |
| `ADBE Vector Filter - Trim` | Trim Paths | Animations | `ADBE Vector Trim End/Start/Offset` |
| `ADBE Mask Parade` | Masks | Gestion des masks | Conteneur `ADBE Mask Atom` |
| `ADBE Mask Shape` | Mask Path | Valeur du mask | Reçoit `Shape` transformé |

### MatchNames non documentés mais critiques

| MatchName | Pourquoi tu en as besoin |
| --- | --- |
| `ADBE Slider Control-0001` | Valeur numérique réelle du slider (OneDProperty) |
| `ADBE Color Control-0001` | RGBA du Color Control |
| `ADBE Point Control-0001` | Coordonnées 2D pour sampling |
| `ADBE Layer Control-0001` | Référence de calque (Layer Control) |
| `ADBE easyRulers` | Effet tiers très utilisé (3616 occurrences dans 376 scripts) |

### Hiérarchie Shape Layer (structure réelle)

```
ShapeLayer
└─ ADBE Root Vectors Group                # Contents racine
   └─ ADBE Vector Group                   # Groupe principal
      └─ ADBE Vectors Group               # Contents interne
         ├─ ADBE Vector Shape - Group     # Wrapper du path
         │  └─ ADBE Vector Shape          # Vertices
         ├─ ADBE Vector Graphic - Fill    # Fill
         ├─ ADBE Vector Graphic - Stroke  # Stroke
         └─ ADBE Vector Filter - Trim     # Trim Paths
```

### Pattern PyShiftAE : navigation fiable

```python
import pyshiftae as ae

def _try_get_by_matchname(group: ae.PropertyGroup, match_name: str):
    stream = group._dyn_suite.GetNewStreamRefByMatchname(group.property, match_name)
    if not stream:
        return None
    return ae.PropertyFactory.create_property(stream)

def set_first_fill_opacity(value: float) -> None:
    layer = ae.Layer.active_layer()
    if layer is None:
        raise RuntimeError("Sélectionne un Shape Layer d'abord")

    root = _try_get_by_matchname(layer, "ADBE Root Vectors Group")
    if root is None:
        raise RuntimeError("Pas de Root Vectors Group : ce n'est pas un Shape Layer")

    stack = [root]
    while stack:
        node = stack.pop()
        if isinstance(node, ae.PropertyGroup):
            if node.match_name == "ADBE Vector Graphic - Fill":
                opacity = _try_get_by_matchname(node, "ADBE Vector Fill Opacity")
                if isinstance(opacity, ae.OneDProperty):
                    before = opacity.get_value(ae.LTimeMode.CompTime, 0.0, False)
                    opacity.set_value(max(0.0, min(100.0, value)))
                    after = opacity.get_value(ae.LTimeMode.CompTime, 0.0, False)
                    print(f"Fill Opacity: {before} → {after}")
                    return
            stack.extend(child for child in node if isinstance(child, ae.PropertyGroup))

    raise RuntimeError("Aucun Fill trouvé dans ce Shape Layer")
```

### ❌ UI labels vs ✅ MatchNames

```jsx
// ❌ Fragile, dépend de la langue
var sliderEffect = layer.property("Effects").property("Slider Control");

// ✅ Invariant, toutes langues / versions
var sliderEffect = layer.property("ADBE Effect Parade").property("ADBE Slider Control");
```

### Conversion Shape → Mask (respecter les transforms)

```jsx
function applyTransforms(vertices, transformStack) {
  var out = vertices.slice();
  for (var i = transformStack.length - 1; i >= 0; i--) {
    var t = transformStack[i];
    var pos = t.property("ADBE Vector Position").value;
    var anchor = t.property("ADBE Vector Anchor").value;
    var scale = t.property("ADBE Vector Scale").value;
    var offset = [pos[0] - anchor[0], pos[1] - anchor[1]];
    for (var j = 0; j < out.length; j++) {
      out[j][0] = (out[j][0] + offset[0]) * (scale[0] / 100);
      out[j][1] = (out[j][1] + offset[1]) * (scale[1] / 100);
    }
  }
  return out;
}
```

## Pièges (Trade-offs)

| Sujet | Avantage | Inconvénient | Mitigation |
| --- | --- | --- | --- |
| MatchNames | Portables, stables | Peu documentés (`-0001`) | Conserver un tableau interne et logguer les inconnus |
| Shape Layers | GPU, expressions natives | Hiérarchie profonde, transforms imbriqués | Helpers récursifs + transform stack |
| Masks | Simples, visibles | CPU-only, pas de Trim Paths | Convertir uniquement quand nécessaire |
| DynamicStreamSuite | Accès direct | Exceptions du SDK si stream introuvable | Toujours vérifier `None` et typer la propriété |
| Conversion Shape → Mask | Recyclage des shapes | Complexe à cause des transforms | Appliquer chaque transform dans l'ordre inverse |

## Mauvaises interprétations fréquentes

1. **« Les labels UI suffisent, surtout en anglais. »** Première localisation et tout tombe; seules les coordonnées (MatchNames) sont stables.
2. **« On peut convertir Shape → Mask sans tenir compte des transforms. »** Sans stack complète, les vertices dérivent et tes masques ne collent plus à l'image.
3. **« DynamicStreamSuite renvoie toujours un stream valide. »** Si le matchName n'existe pas, tu récupères `None` et tu crashe dès la première méthode; vérifie et typpe avant d'utiliser.

## Golden Rule

**UI pour les humains, MatchNames pour le code.** Dès que tu automatises After Effects, verrouille tout sur les identifiants internes et sur la hiérarchie documentée, sinon ta stack explose au prochain changement de langue ou d'UI.
