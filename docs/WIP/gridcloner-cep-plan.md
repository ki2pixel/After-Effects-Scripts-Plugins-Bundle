# GridCloner-CEP — Action Plan

**TL;DR**: Construire GridCloner-CEP en trois étages (CEP UI → PyShiftBridge handler → PyShiftAE core) en conservant l'asynchronisme Hybrid 2.0, en validant la sélection AE avant toute duplication massive et en monitorant les undo groups pour que les stress-tests de TaskScheduler restent réversibles.

## Le problème
Tu veux tester la création massive de clones (Flex/MazeFX/Cloners+Effectors) sans retomber dans les scripts JSX bloquants audités dans `ae-script-audit.md`. Tant que GridCloner n'est pas câblé sur Hybrid 2.0, chaque tentative de grille 3D risque de geler AE, de briser la sélection active ou de laisser des calques orphelins.

## Contraintes héritées de la doc
1. **Pipeline Hybrid 2.0 obligatoire** (`cep-python-bridge.md`): CEP reste asynchrone, la commande part dans `{entrypoint, args}`, PyShiftBridge choisit pipe/mailbox automatiquement.
2. **Patterns PyShiftAE** (`coding-patterns.md`): calculs et validation en worker/pure Python, mutations dans un `ae.UndoGroup` sur main thread, handles éphémères.
3. **Audit tiers** (`ae-script-audit.md`): scripts Grid-like (Flex, Cloners+Effectors, MazeFX) stockent des métadonnées (JSON, pseudo-effets) que nous devons pouvoir répliquer ou lire via MatchName.

## Architecture ciblée
| Couche | Rôle | Points clés |
| --- | --- | --- |
| CEP panel `GridCloner-CEP/` | UI lignes/colonnes/profondeur, spacing XYZ, toggles (3D, expression link) | `manifest.xml` v5, `index.html` minimal mais non bloquant, `main.js` => `sendCommandToPythonPipe("gridcloner_apply", args)` avec timeout configuré |
| PyShiftBridge `handlers.py` | Validation JSON, coercition types/limites, logging | Nouveau handler `gridcloner_apply` enregistré via `register_handlers(_HANDLERS, ...)`, renvoie `{status, created_count, notes}` |
| `gridcloner_core.py` | Calcul grilles + mutations AE | Vérifie comp active + sélection layer, prépare matrice coords, ouvre `ae.UndoGroup("GridCloner Apply")`, duplique calque, applique expressions/contrôleur |

### Données échangées
```json
{
  "entrypoint": "gridcloner_apply",
  "args": {
    "rows": 4,
    "columns": 6,
    "depth": 1,
    "spacing": {"x": 120, "y": 90, "z": 0},
    "linkOpacityToNull": true,
    "linkScaleToNull": false,
    "controllerName": "Grid CTRL",
    "expressionMode": "opacity"
  }
}
```
- Handler doit imposer bornes (1–200 clones totaux, spacing max 5000 px) pour éviter OOM.
- PyShiftAE core reconstruit les coordonnées sous forme de liste pure Python avant l'undo group.

## Étapes de travail
1. **Scaffold CEP panel**
   - Copier structure minimale (manifest + index + main.js) inspirée de MediaSolution mais sans surcharge.
   - Inputs: `rows`, `columns`, `depth`, `spacingX/Y/Z`, toggles `3D`, `Link opacity`, `Link scale`, bouton `Generate`.
   - Logger les réponses `{ok,error}` dans un panneau status.
2. **Handler PyShiftBridge**
   - Ajouter module `gridcloner.handlers` ou section dédiée.
   - Parser arguments, assurer types (ints positifs, floats), injecter defaults (`depth=1`, `spacingZ=0`).
   - Appeler `gridcloner_core.apply_grid_cloner(**validated_args)` et envelopper les exceptions dans `{status:"error", message}`.
3. **PyShiftAE core**
   - Vérifier comp active + layer sélectionné (`ae.Comp.active_comp()`, `comp.selected_layers`).
   - Construire coords via produit cartésien (rows × cols × depth) puis filtrer par `max_clones`.
   - Ouvrir `ae.UndoGroup("GridCloner Apply")` sauf si `DISABLE_UNDO_GROUP` flag reçu.
   - Pour chaque coord: `duplicate_layer = base_layer.duplicate()`, reposition, activer 3D si `depth>1` ou toggle.
   - Si `linkOpacityToNull`/`linkScaleToNull`: créer ou réutiliser Null contrôleur (match `controllerName`), ajouter `ADBE Slider Control-0001`, appliquer expression `value * effect("Opacity Control")("Slider")/100`.
   - Retourner `{"status":"ok","created_count":n,"notes":warnings}`.
4. **Observabilité et diagnostics**
   - CEP: badge latence, message success/error.
   - Handler: `notes.append("fallback_mailbox")` si transport lent (optionnel, via metadata).
   - Core: warnings si `created_count` atteint `max_clones`, si `controller` existait déjà, ou si AE a forcé 2D.
5. **Tests rapides**
   - Ajouter test pur Python sur calcul matrice (pas d’AE).
   - Préparer plan de test manuel: sélection absente → erreur, spacing négatif → rejet, 3D + depth>1 → layer 3D forcé.

## Trade-offs
| Choix | Avantage | Risque | Mitigation |
| --- | --- | --- | --- |
| Null contrôleur unique | Contrôle global simple | Collision si comp contient déjà même nom | Append suffix `Grid CTRL (2)` si trouvé |
| Expressions vs propriété directe | Réactivité live (Null) | Expressions lourdes sur centaines de clones | Mode `linkScaleToNull=false` pour limiter, future option keyframes |
| Matrice brute en Python | Tests rapides, pas d'AE tant qu'on ne mute pas | Double parcours (calcul + application) | Batch coords en générateur pour limiter mémoire |

## Risques et gardes fous
- **Undo saturé** : imposer `max_clones` configurables, signaler besoin `DISABLE_UNDO_GROUP` pour batch.
- **Handles périmés** : re-récupérer `base_layer` depuis comp juste avant duplication, jamais stocker pointer global (`coding-patterns`).
- **Transport indisponible** : CEP doit afficher fallback mailbox (<- addition au log) pour expliquer latence.

## Golden Rule
**Grille d'abord sur papier (Python pur), duplication ensuite sur dalle AE via UndoGroup unique.**
