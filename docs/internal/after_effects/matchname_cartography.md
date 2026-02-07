---
title: "Cartographie des MatchNames"
version: "1.0"
audience: "Développeurs ExtendScript/C++"
maintainer: "@kidpixel"
status: "stable"
last_updated: "2026-02-07"
estimated_read: "12 min"
---

**TL;DR**: Si vous automatisez des effets ou des shapes, n'utilisez jamais les noms affichés (UI names). Utilisez les MatchNames internes car ils sont indépendants de la langue et ne changent jamais entre les versions d'After Effects.

## Le problème

Votre script fonctionne parfaitement sur votre After Effects en français. Vous le partagez avec un collègue allemand, et tout explose. "Effects" devient "Effekte", "Transform" devient "Transformation", et vos `layer.property("Effects")` retournent `null`. Vous passez des heures à debugger pourquoi votre automation casse uniquement sur certaines langues.

Ou pire : Adobe publie une mise à jour et "Slider Control" devient "Slider" dans l'interface. Tous vos scripts qui cherchaient le nom UI se retrouvent obsolètes du jour au lendemain.

## La solution

Les MatchNames sont les identifiants internes d'After Effects, invariant par langue et par version. `ADBE Slider Control` reste `ADBE Slider Control` que l'interface soit en français, allemand ou japonais. C'est pourquoi tous les scripts professionnels utilisent exclusivement ces identifiants.

### ✅ Le pattern MatchName stable

```jsx
// Fonctionne dans toutes les langues
var sliderEffect = layer.property("ADBE Effect Parade").property("ADBE Slider Control");
var position = layer.property("ADBE Transform Group").property("ADBE Position");
```

### ❌ L'anti-pattern UI fragile

```jsx
// Casse si AE n'est pas en anglais
var sliderEffect = layer.property("Effects").property("Slider Control");
var position = layer.property("Transform").property("Position");
```

## Exemples concrets

### Cas 1: Automation d'effets sur plusieurs langues

Vous créez un script qui ajoute un slider control et l'anime. Avec les MatchNames, vous n'avez aucun souci :

```jsx
function addAnimatedSlider(layer) {
  var effects = layer.property("ADBE Effect Parade");
  var slider = effects.addProperty("ADBE Slider Control");
  slider.name = "Mon Slider";
  
  // L'animation fonctionne quelle que soit la langue
  var sliderValue = slider.property("ADBE Slider Control-0001");
  sliderValue.setValueAtTime(0, 0);
  sliderValue.setValueAtTime(1, 100);
  
  return slider;
}
```

### Cas 2: Shape layers multilingues

Pour créer des shapes, vous devez naviguer dans la hiérarchie des groupes :

```jsx
function createRectangleShape(layer) {
  var contents = layer.property("ADBE Root Vectors Group");
  var rectGroup = contents.addProperty("ADBE Vector Group");
  var rectShape = rectGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect");
  var fill = rectGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
  
  return rectGroup;
}
```

### Cas 3: Accès aux sous-propriétés

Les effets ont des sous-propriétés avec des suffixes `-0001`, `-0002`, etc. :

```jsx
function getEffectValues(effect) {
  // Accès direct aux valeurs internes
  var sliderValue = effect.property("ADBE Slider Control-0001");
  var colorValue = effect.property("ADBE Color Control-0001");
  var pointValue = effect.property("ADBE Point Control-0001");
  
  return {
    slider: sliderValue ? sliderValue.value : null,
    color: colorValue ? colorValue.value : null,
    point: pointValue ? pointValue.value : null
  };
}
```

## Trade-offs

| Approche | Maintenance | Performance | Portabilité | Documentation |
| -------- | ----------- | ----------- | ----------- | ------------- |
| MatchNames | ✅ Stable | ✅ Immédiat | ✅ Universelle | 🟡 Partielle |
| UI Names | ❌ Fragile | ✅ Immédiat | ❌ Langue dépendante | ✅ Visible |

**Note sur la documentation** : Les MatchNames ne sont pas tous documentés par Adobe. Certains (surtout les suffixes `-000x`) nécessitent de la rétro-ingénierie.

## La Golden Rule: UI pour les humains, MatchNames pour le code

L'interface sert les utilisateurs, les MatchNames servent les développeurs. Ne mélangez jamais les deux.

## Références techniques

### MatchNames les plus utilisés (analyse sur 376 scripts)

| MatchName | UI label (EN) | Usage count | Contexte typique |
| --- | --- | --- | --- |
| `ADBE easyRulers` | **Non documenté** | 3616 | Effet tiers easyRulers |
| `ADBE Vectors Group` | Contents | 3475 | Shape layers groups |
| `ADBE Effect Parade` | Effects | 2515 | Conteneur d'effets |
| `ADBE Root Vectors Group` | Contents | 1518 | Racine shape layer |
| `ADBE Transform Group` | Transform | 1110 | Transformations calque |
| `ADBE Slider Control-0001` | **Non documenté** | 885 | Valeur slider control |
| `ADBE Vector Filter - Repeater` | Repeater | 675 | Répéteur shape |
| `ADBE Vector Transform Group` | Transform | 522 | Transform shape |
| `ADBE Position` | Position | 475 | Position calque |
| `ADBE Vector Group` | Group | 449 | Groupe shape |

### MatchNames non documentés critiques

| MatchName | Usage | Pourquoi important |
| --- | --- | --- |
| `ADBE Slider Control-0001` | 885 | Accès valeur slider |
| `ADBE Color Control-0001` | 344 | Accès couleur control |
| `ADBE Layer Control-0001` | 142 | Sélection calque |
| `ADBE Mask Shape` | 121 | Forme du masque |
| `ADBE Point Control-0001` | 105 | Point 2D control |

### Patterns avancés

#### Pseudo-Effects et presets dynamiques

Les scripts professionnels utilisent souvent des presets `.ffx` pour "bootstrapper" des structures complexes (Pseudo Effects + expressions). Le pattern :

1. Écrire un preset binaire en temporaire
2. Appliquer sur un null temporaire pour enregistrer le Pseudo Effect
3. Utiliser `addProperty("Pseudo/...")` ensuite

#### Injection d'expressions robuste

```jsx
function exprStringLiteral(value) {
  var s = String(value);
  s = s.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
  return "\"" + s + "\"";
}

// Usage safe dans les expressions
var expr = 'thisComp.layer(' + exprStringLiteral(controlLayer.name) + ')';
```

## Références

- [Guide PyShiftAE](../pyshiftae/pyshiftae_guide.md) – Patterns Python/JSX
- [Architecture Shape Layers](./architecture_avancee_shape_layers.md) – Hiérarchie complète
- [Bridge Communication](../../bridge_communication.md) – Patterns CEP/JSX

---
*Document généré le 2026-02-07 • Basé sur l'analyse de 376 scripts JSX/JS*
