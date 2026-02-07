# Référence API Scripts ExtendScript

**Version**: 1.0 – 7 février 2026  
**Statut**: Documentation de référence technique  
**Audience**: Développeurs After Effects  

---

## Easy Rulers 2 v2.01

**Description**: Création de règles flottantes pour alignement précis dans les compositions.

### Requête d'initialisation

```jsx
var rulers = new EasyRulers();
rulers.show();
```

### Paramètres

| Nom | Type | Requis | Description |
|-----|------|--------|-------------|
| precision | Number | Non | Nombre de décimales (défaut: 2) |
| unit | String | Non | Unité de mesure: "pixels" ou "percent" |
| orientation | String | Non | "horizontal", "vertical" ou "both" |

### Retour

```jsx
{
  status: "success",
  rulers: [
    {id: "ruler_h1", position: 960, orientation: "horizontal"},
    {id: "ruler_v1", position: 540, orientation: "vertical"}
  ]
}
```

### Cas d'erreur

- **AE_VERSION_INCOMPATIBLE**: Versions CS5.5 et inférieures non supportées
- **NO_ACTIVE_COMPOSITION**: Aucune composition active détectée

---

## Easy Clones v1.1

**Description**: Duplication intelligente de calques avec transformations distribuées.

### Requête de clonage

```jsx
var clones = EasyClones.duplicate({
  source: layer,
  count: 5,
  spacing: {x: 100, y: 0},
  distribution: "linear"
});
```

### Paramètres

| Nom | Type | Requis | Description |
|-----|------|--------|-------------|
| source | Layer | Oui | Calque source à dupliquer |
| count | Number | Oui | Nombre de clones (1-50) |
| spacing | Object | Non | Espacement X/Y en pixels |
| distribution | String | Non | "linear", "circular", "grid" |
| transform | Object | Non | Rotation/échelle par clone |

### Retour

```jsx
{
  status: "success",
  clones: [
    {layer: Layer, index: 1, position: [100, 0]},
    {layer: Layer, index: 2, position: [200, 0]}
  ],
  total: 5
}
```

### Cas d'erreur

- **INVALID_SOURCE**: Le calque source n'existe pas
- **EXCEEDS_LIMIT**: Nombre de clones supérieur à 50
- **PARENTING_CONFLICT**: Conflit de hiérarchie détecté

---

## Good Parents v1.4.1

**Description**: Gestion des hiérarchies parentales avec préservation des transformations.

### Requête d'assignation

```jsx
var result = GoodParents.assign({
  parent: parentLayer,
  child: childLayer,
  preserveTransform: true
});
```

### Paramètres

| Nom | Type | Requis | Description |
|-----|------|--------|-------------|
| parent | Layer | Oui | Calque parent |
| child | Layer | Oui | Calque enfant |
| preserveTransform | Boolean | Non | Préserver position globale (défaut: true) |
| updateHierarchy | Boolean | Non | Mettre à jour l'arborescence (défaut: true) |

### Retour

```jsx
{
  status: "success",
  hierarchy: {
    parent: "Layer_Parent",
    children: ["Layer_Child_1", "Layer_Child_2"],
    depth: 2
  },
  transformMatrix: [1,0,0,1,0,0]
}
```

### Cas d'erreur

- **CIRCULAR_REFERENCE**: Tentative de création de référence circulaire
- **LAYER_LOCKED**: Calque verrouillé détecté
- **TRANSFORM_MATRIX_ERROR**: Impossible de calculer la matrice

---

## Origami v1.4.0

**Description**: Simulation de pliage papier 3D sur calques shape vectoriels.

### Requête de pliage

```jsx
var fold = Origami.createFold({
  shape: shapeLayer,
  angle: {x: 45, y: 0, z: 0},
  axis: "horizontal",
  animate: true
});
```

### Paramètres

| Nom | Type | Requis | Description |
|-----|------|--------|-------------|
| shape | ShapeLayer | Oui | Calque shape cible |
| angle | Object | Oui | Angles de pliage X/Y/Z en degrés |
| axis | String | Non | Axe de pliage: "horizontal", "vertical", "custom" |
| animate | Boolean | Non | Générer l'animation (défaut: false) |
| duration | Number | Non | Durée d'animation en secondes |

### Retour

```jsx
{
  status: "success",
  fold: {
    id: "fold_001",
    shape: "Shape_Layer",
    angles: {x: 45, y: 0, z: 0},
    keyframes: [
      {time: 0, value: 0},
      {time: 1, value: 45}
    ]
  }
}
```

### Cas d'erreur

- **INVALID_SHAPE**: Le calque n'est pas un shape fermé
- **GEOMETRY_TOO_COMPLEX**: Géométrie trop complexe (>1000 points)
- **FOLD_ANGLE_LIMIT**: Angle de pliage hors limites (-180 à 180)

---

## origami_fix.jsx

**Description**: Patch de compatibilité pour script Origami v1.4.0 sur AE 2023+.

### Requête d'application

```jsx
var fix = OrigamiFix.apply({
  targetVersion: "2024",
  preserveSettings: true
});
```

### Paramètres

| Nom | Type | Requis | Description |
|-----|------|--------|-------------|
| targetVersion | String | Non | Version AE cible ("2023", "2024") |
| preserveSettings | Boolean | Non | Conserver paramètres existants |
| backupOriginal | Boolean | Non | Sauvegarder script original |

### Retour

```jsx
{
  status: "success",
  fixes: [
    {issue: "transform_matrix", resolved: true},
    {issue: "keyframe_interpolation", resolved: true}
  ],
  compatibility: "AE 2024+"
}
```

### Cas d'erreur

- **ORIGAMI_NOT_FOUND**: Script Origami v1.4.0 non installé
- **VERSION_MISMATCH**: Version incompatible détectée
- **INSUFFICIENT_PERMISSIONS**: Permissions d'écriture insuffisantes

---

## Référence rapide

| Script | Méthode principale | Paramètres requis | Retour typique |
|--------|-------------------|-------------------|----------------|
| Easy Rulers | `show()` | orientation | `{rulers: Array}` |
| Easy Clones | `duplicate()` | source, count | `{clones: Array}` |
| Good Parents | `assign()` | parent, child | `{hierarchy: Object}` |
| Origami | `createFold()` | shape, angle | `{fold: Object}` |
| origami_fix | `apply()` | (aucun) | `{fixes: Array}` |

---

## Codes d'erreur standards

| Code | Description | Résolution |
|------|-------------|------------|
| AE_VERSION_INCOMPATIBLE | Version AE non supportée | Mettre à jour AE ou utiliser script compatible |
| NO_ACTIVE_COMPOSITION | Aucune composition active | Ouvrir ou créer une composition |
| INVALID_SOURCE | Source invalide | Vérifier que le calque existe |
| LAYER_LOCKED | Calque verrouillé | Déverrouiller le calque |
| PERMISSION_DENIED | Permissions insuffisantes | Exécuter avec droits administrateur |

---

*Documentation technique générée le 7 février 2026 – Basée sur l'analyse de 2.3k LOC JSX*
