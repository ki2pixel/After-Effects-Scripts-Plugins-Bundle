# Matrice de Capacités & Limitations PyShiftAE

**TL;DR**: PyShiftAE excelle en navigation et opérations sur les shapes, mais l'édition de Bézier nécessite ExtendScript; les hooks natifs sont limités, privilégiez l'architecture CEP polling.

---

## Shape Layers: Capacités vs Limitations

### ✅ Ce que vous pouvez faire aujourd'hui

**Navigation complète** : Vous pouvez descendre dans toute la hiérarchie des Shape Layers via matchNames :

```python
import pyshiftae as ae

layer = ae.Layer.active_layer()
root = layer.get_property("ADBE Root Vectors Group")

# Navigation récursive sans problème
def explore(pg, depth=0):
    for i in range(pg.num_properties()):
        prop = pg.get_property_by_index(i)
        print("  " * depth + prop.match_name)
        if isinstance(prop, ae.PropertyGroup):
            explore(prop, depth + 1)
```

**Manipulation des propriétés primitives** : Size, position, roundness, colors, stroke width, trim paths - tout ce qui est des valeurs numériques ou couleurs fonctionne parfaitement.

**Opérateurs et effets** : Repeater, Trim Paths, Stroke, Fill, Twist - tous accessibles et modifiables.

### ❌ Ce qui est impossible ou très complexe

**Édition des vertices Bézier** : Les Shape Paths (`ADBE Vector Shape`) ne sont pas accessibles. L'API actuelle ne supporte pas les types ARB ( Arbitrary Binary) qui contiennent les données vertices/tangentes.

**Limitation technique** : `StreamValue2` ne gère que `OneD`, `TwoD`, `ThreeD`, `COLOR`. Les types complexes comme `ARB` retournent 0.

### 🔄 Workaround recommandé

Pour l'édition Bézier, utilisez le bridge ExtendScript :

```python
import pyshiftae as ae

def edit_shape_bezier(layer_name, shape_index, vertices):
    """Édition Bézier via ExtendScript fallback"""
    jsx = f"""
    var layer = app.project.activeItem.layer("{layer_name}");
    var shape = layer.property("Contents").property({shape_index});
    var path = shape.property("ADBE Vector Shape");
    
    // Manipulation vertices/tangentes ici
    path.setValue([{vertices: {vertices}}]);
    """
    
    return ae.execute_script(jsx)
```

---

## Hooks & Events: Architecture Polling vs Natif

### 🟡 Limitations des hooks natifs

Les hooks AEGP (`IdleHook`, `CommandHook`) existent mais présentent des contraintes :

- **Main thread uniquement** : `IdleHook` s'exécute sur le thread principal d'AE
- **Risque de freeze** : Un callback lent (>50ms) bloque l'interface
- **Stockage complexe** : Nécessite modification C++ pour stocker les callbacks Python

### ✅ Architecture CEP Polling (recommandée)

**Pattern standard** : CEP panel → polling régulier → Python

```javascript
// CEP side
setInterval(() => {
    sendCommand('check_layer_changes', {layerId: currentLayer});
}, 100); // 100ms polling
```

**Avantages** :
- Non-bloquant pour AE
- Contrôle total de la fréquence
- Fallback robuste (mailbox JSON)
- Support temps réel pour sliders/interactions

---

## Trade-offs: Python Natif vs Hybrid ExtendScript

| Approche | Performance | Complexité | Maintenance | Couverture API |
| -------- | ----------- | ---------- | ----------- | -------------- |
| Python natif | ⚡ Rapide | 🟢 Simple | 🟢 Facile | 🟡 Partielle (70%) |
| Hybrid ExtendScript | 🐌 Plus lent | 🟡 Moyenne | 🟠 Modérée | ✅ Complète (100%) |

### Python Natif - Quand l'utiliser

- **Navigation et lecture** de propriétés
- **Opérations批量** sur des valeurs primitives
- **Automatisation** sans édition Bézier
- **Performance critique** (boucles serrées)

### Hybrid ExtendScript - Quand l'utiliser

- **Édition Bézier** (vertices/tangentes)
- **Opérations obscures** non exposées dans PyShiftAE
- **Compatibilité** avec scripts existants
- **Fonctionnalités avancées** nécessitant l'API complète

---

## Recommandations d'Architecture

### 1. Pattern Principal: CEP + Pipes

```javascript
// Auto-détection du transport
const transport = pipeAvailable 
    ? new PyInterface(pipeName) 
    : new MailboxJSON();
```

Priorité absolue : diagnostic du pipe nommé pour communication temps réel.

### 2. Fallback ExtendScript ciblé

N'utilisez ExtendScript que pour les opérations spécifiques non disponibles en Python :

```python
# Wrapper intelligent
def edit_shape(layer, operation, **kwargs):
    if operation == 'bezier_edit':
        return extendscript_fallback(layer, operation, **kwargs)
    else:
        return python_native_operation(layer, operation, **kwargs)
```

### 3. Monitoring Performance

```javascript
// CEP console monitoring
console.log(`Transport: ${transport.type}, Latency: ${latency}ms`);
```

Surveillez les temps de réponse pour ajuster la fréquence de polling.

---

## Golden Rule: Navigation Python, Édition ExtendScript

Utilisez PyShiftAE pour 80% des cas (navigation, propriétés primitives). Réservez ExtendScript aux 20% restants (Bézier, API manquantes). Cette approche hybride vous donne le meilleur des deux mondes: performance Python là où ça compte, puissance ExtendScript là où c'est indispensable.
