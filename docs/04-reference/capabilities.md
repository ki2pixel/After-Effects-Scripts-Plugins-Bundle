# PyShiftAE Capabilities Matrix

**TL;DR**: PyShiftAE couvre 80 % des besoins (navigation, propriétés primitives, automation rapide) si tu restes sur des streams simples; pour les 20 % restants (Bézier, API opaques, hooks natifs), bascule vers un fallback ExtendScript ciblé plutôt que d’insister côté Python.

## Analogie boîte à outils

PyShiftAE est ta boîte à outils principale: rapide, testable, prête pour 80 % des interventions. ExtendScript est ton tournevis de secours pour les vis exotiques (Bézier, hooks bas niveau). Tu ne portes pas toute la quincaillerie sur toi, tu sais simplement quand sortir le bon outil.

## Le problème

Tu veux écrire un outil shape-aware rapide. Les loops Python gèrent sans broncher 200 calques, mais la première fois que tu dois éditer les tangentes d’un path, tout s’écroule : `StreamValue2` renvoie `0` sur les types `ARB`, un `IdleHook` mal paramétré fige l’UI, et les contrôles « Slider » disparaissent dès que le panel change de langue. Bref, tu as besoin d’une matrice claire pour savoir quand PyShiftAE suffit et quand tu dois ressortir ExtendScript ou un polling CEP.

## La solution

1. **Capacités natives** : exploiter PyShiftAE pour tout ce qui relève des streams numériques (`OneD`, `TwoD`, `ThreeD`, `COLOR`), de la navigation hiérarchique et des opérateurs de Shape Layers.
2. **Architecture hybride** : encapsuler les 20 % d’opérations interdites (Bézier, hooks natifs risqués) derrière un fallback ExtendScript déclenché par ton bridge.
3. **Transport robuste** : piloter l’ensemble via un panel CEP qui poll les changements (100 ms) et envoie les ordres au daemon Python via named pipe ou mailbox JSON.

### Matrice d’arbitrage rapide

| Besoin | Solution PyShiftAE | Quand basculer ExtendScript |
| --- | --- | --- |
| Navigation hiérarchie Shape | ✅ `PropertyGroup` + `match_name` | Jamais, PyShiftAE couvre tout |
| Propriétés primitives (fill, stroke, trim) | ✅ Streams numériques | Seulement si un effet tiers expose un type non supporté |
| Vertices Bézier / tangentes | ❌ Types `ARB` inaccessibles | ✅ `ae.execute_script()` avec JSX ciblé |
| Hooks/event listeners | 🟡 `IdleHook` possible mais risqué | ✅ Polling CEP + ping Python |
| Compat legacy scripts | 🟡 Possible via wrappers | ✅ Étendre ExtendScript et appeler depuis Python |

## Implémentation

### ✅ Navigation et modifications primitives côté Python

```python
import pyshiftae as ae

def set_first_fill_opacity(value: float) -> None:
    layer = ae.Layer.active_layer()
    if layer is None:
        raise RuntimeError("Sélectionne un Shape Layer d'abord")

    root = layer.get_property("ADBE Root Vectors Group")
    stack = [root]
    while stack:
        node = stack.pop()
        if isinstance(node, ae.PropertyGroup):
            if node.match_name == "ADBE Vector Graphic - Fill":
                opacity = node.get_property("ADBE Vector Fill Opacity")
                if isinstance(opacity, ae.OneDProperty):
                    before = opacity.get_value(ae.LTimeMode.CompTime, 0.0, False)
                    opacity.set_value(max(0.0, min(100.0, value)))
                    after = opacity.get_value(ae.LTimeMode.CompTime, 0.0, False)
                    print(f"Fill Opacity: {before} → {after}")
                    return
            stack.extend(child for child in node if isinstance(child, ae.PropertyGroup))
    raise RuntimeError("Aucun Fill trouvé")
```

### ❌ Édition Bézier côté Python vs ✅ Fallback ExtendScript

```python
# ❌ Impossible: StreamValue2 renvoie 0 sur les Shape Paths
path_prop = shape.get_property("ADBE Vector Shape")
path_prop.set_value(new_vertices)  # Soulève PyShiftAEError

# ✅ Solution: wrapper ExtendScript déclenché depuis Python
from textwrap import dedent

def edit_shape_bezier(layer_name: str, shape_index: int, jsx_payload: str):
    script = dedent(f"""
        var layer = app.project.activeItem.layer("{layer_name}");
        var shape = layer.property("Contents").property({shape_index});
        var path = shape.property("ADBE Vector Shape");
        {jsx_payload}
    """)
    return ae.execute_script(script)
```

### Architecture CEP polling recommandée

```javascript
// CEP panel
const transport = pipeAvailable ? new PyInterface(pipeName) : new MailboxJSON();
setInterval(() => {
  transport.send({ functionName: 'check_layer_changes', args: { layerId: currentLayer } });
}, 100);
```

## Pièges (Trade-offs)

| Sujet | Avantage | Limite | Mitigation |
| --- | --- | --- | --- |
| StreamValue2 | Accès rapide aux OneD/TwoD/ThreeD/COLOR | Types `ARB` inaccessibles | Router ces cas via ExtendScript ciblé |
| Hooks AEGP | Intégration native | Thread principal saturé si >50 ms | Préférer polling CEP + timers |
| Python natif | Performance ⚡ et code testable | Couverture API ≈70 % | Maintenir une liste blanche des opérations sûres |
| Hybrid ExtendScript | Couverture 100 % | Plus lent, maintenance JSX | Générer les snippets JSX depuis Python pour éviter le drift |
| Transport | Named pipe quasi temps réel | Mailbox fallback plus lent | Logguer la latence et adapter la fréquence de polling |

## Mauvaises interprétations fréquentes

1. **« On peut tout faire en PyShiftAE si on insiste assez. »** Non: les streams `ARB`, les tangentes Bézier et certains hooks restent interdits; force un fallback JSX.
2. **« Une fois en fallback, autant tout écrire en ExtendScript. »** La discipline hybride impose de ne transférer que les 20 % bloquants, sinon tu perds la testabilité Python.
3. **« Les hooks AEGP remplacent le polling CEP. »** Les IdleHooks mal paramétrés saturent le thread AE; préfère CEP + ping tant que possible.

## Golden Rule

**Navigue et automatise en Python; réserve ExtendScript aux gestes chirurgicaux (Bézier, API opaques).** Cette discipline évite de réimplémenter l’UI, garde PyShiftAE sur ses forces (vitesse, testabilité) et maintient un filet de sécurité ExtendScript pour les 20 % bloquants.
