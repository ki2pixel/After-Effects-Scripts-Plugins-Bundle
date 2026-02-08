# AE Internals Reference

**TL;DR**: Ce document est la "Base de Données" technique du projet. Il contient les tables de correspondance (MatchNames, IDs, Tags, Clés de registre) nécessaires pour implémenter les patterns génériques décrits dans `coding-patterns.md`.

---

## 1. Proprietary MatchNames & Pseudo-Effects Registry

*Utilisé par le pattern "Gestion générique des Pseudo-Effets".*

Ces effets nécessitent l'installation préalable d'un preset `.ffx`.

| Script Source | Pseudo-Effect MatchName (Prefix) | IDs Paramètres Clés | Permissions / Preset Path |
| :--- | :--- | :--- | :--- |
| **3D Primitives** | `Pseudo/3DPrimitiveControlsTop` | `-0002`...`-0015` | Requiert `applyPseudoEffect` dans précomp. |
| **Create Nulls** | `Pseudo/ADBE Trace Path` | `Layer Control-0001` | Workflow natif AE (Path points). |
| **Easy Clones** | `Pseudo/easyClones1.1` | - | `Folder.userData/Aescripts/Easy Clones/1.0` |
| **Flex** | `Pseudo/Flex Line Control` | - | Génère rulers dynamiques. |
| **Limber** | `Pseudo/Limber_16` | `-0002`...`-0033` | Nécessite copie preset JSON. |
| **LoopMaster** | `Pseudo/LoopMaster_` | (Wiggle, Spin, Orbit) | Applique `.ffx` cachés via `PseudoEffect`. |
| **Splash** | `Pseudo/aeSplashV1.03` | `-0001`...`-0042` | Presets `__BLOB__` en userData. |
| **Text Chain** | `Pseudo/0.4433...` (Dyn) | - | Preset écrit dans `~/Documents/TextChain`. |
| **Trails** | `OC Trails` (Dyn) | - | MatchName dynamique généré à la volée. |

---

## 2. Data-driven Control Layers Registry

*Utilisé par le pattern "Rigs pilotés par calque invisible".*

Liste des calques "cerveau" qui doivent être préservés lors des migrations/duplications.

| Script Source | Nom du Layer Contrôle | Effets de Contrôle (MatchNames) | Notes de comportement |
| :--- | :--- | :--- | :--- |
| **Talking Head** | `Talking Head CTRL` | `ADBE Slider Control` (visèmes), `Checkbox` | Pilote la bouche et les yeux via expressions. |
| **Splash** | `Splash Control` | `Pseudo/aeSplashV1.03` | Le script vérifie ce nom exact avant action. |
| **Social Importer** | `CONTROL - Social Importer` | `Social Importer` (custom) + Sliders | Inséré lors de l'import de projet. |
| **Boxcam** | `Boxcam Guide` | `ADBE Slider Control` | Solide masqué servant de repère spatial. |
| **FX StrokeSetter** | `FX_StrokeSetter CTRL` | `ADBE Slider Control` (Taper, Wave) | Pilote les strokes de multiples shapes. |

---

## 3. Metadata Tag Prefixes Registry

*Utilisé par le pattern "Tags métadonnées comme RAM".*

Préfixes réservés dans `layer.comment` ou `marker.comment`.

| Préfixe | Utilisé par (Outil) | Cible (Layer/Marker) | Description de la donnée |
| :--- | :--- | :--- | :--- |
| `MS_` | Magic Switcher | Layer | État (Locked, Shy, Hidden) pour restore. |
| `RH_` | RenderHogs | Marker | Statut de rendu, version de preset. |
| `BOXCAM_` | Boxcam | Layer | Résolution trial, ID liaison caméra. |
| `SOCIAL_` | Social Importer | Effect | Dossiers sources importés. |
| `FP_S` | Faux Parent | Marker | Clés de parenting bakées. |
| `[VR-*]` | VR Comp Editor | Comment | Rôle de la comp (Creator, Edit, Output). |
| `\|Structures\|`| Set Parent To Struct | Comment | Délimite la zone de parenting auto. |

---

## 4. Registre app.settings & Préférences

*Utilisé par le pattern "Stratégie app.settings".*

Namespace et clés utilisés pour la persistance.

| Namespace | Clé(s) | Script Source | Usage / Fallback |
| :--- | :--- | :--- | :--- |
| `AddEditMarkers` | `UI_split_toggle`, `last_scope` | Add Edit Markers | Mémorise l'état UI du panel. |
| `AnchorSniper` | `bitdepth`, `progressBar` | Anchor Sniper | Config sampling sourceRect. |
| `Ola_Keyboard` | `<shortcut_id>` | KEYboard | Mapping raccourcis (Fallback JSON). |
| `Ripple Edit` | `Orientation`, `Licence` | Ripple Edit | UI et DRM Trial. |
| `Autosaver` | `supportTicketSKU`, `diagnostic` | AW Autosaver | Payload pour tickets support. |
| `RayDynamicColor`| `LastPalette`, `License` | Ray Dynamic Color | Dernière palette active. |
| `mamoworld` | `TextExplode` | TextExploder | Options de découpe RegEx. |

---

## 5. Shape Layer Hierarchy & MatchNames (Standard)

Rappel de la structure native (ne change pas, contrairement aux scripts tiers).

```
ShapeLayer
└─ ADBE Root Vectors Group                # Racine
   └─ ADBE Vector Group                   # Groupe
      └─ ADBE Vectors Group               # Contents
         ├─ ADBE Vector Shape - Group     # Path
         ├─ ADBE Vector Graphic - Fill    # Fill
         ├─ ADBE Vector Graphic - Stroke  # Stroke
         └─ ADBE Vector Filter - Trim     # Trim Paths
```

### MatchNames Utilitaires (Expression Controls)

Ces noms sont utilisés pour scanner les rigs génériques.

| MatchName | Usage Typique | Propriété Valeur (Suffixe) |
| :--- | :--- | :--- |
| `ADBE Slider Control` | Valeur flottante animable | `-0001` |
| `ADBE Checkbox Control`| Booléen (Switch) | `-0001` |
| `ADBE Color Control` | Couleur (Array[4]) | `-0001` |
| `ADBE Point Control` | Position 2D | `-0001` |
| `ADBE Layer Control` | Référence Layer | `-0001` |
| `ADBE Effect Parade` | Conteneur d'effets | N/A |

---

**Golden Rule**: Si tu dois scripter une interaction avec un outil tiers, cherche d'abord ses identifiants dans ce fichier. Si tu crées un nouvel outil, enregistre tes préfixes et MatchNames ici.