# PyShiftAE: Best Practices & Anti-Patterns

**TL;DR**: Ne jamais appeler l'API AEGP hors du TaskScheduler. Utilisez un worker thread pour les calculs et le main thread via scheduler pour les mutations AE.

## Le problème critique qui fait tout exploser

Vous écrivez un script PyShiftAE. After Effects freeze complètement. L'interface ne répond plus. Le crash est inévitable. Pourquoi? Vous avez mélangé calculs Python et appels AE sur le même thread.

## La Golden Rule

**Ne jamais appeler l'API AEGP hors du TaskScheduler.**

C'est la règle qui sépare le code qui fonctionne du code qui crash AE. Tout le reste en découle.

---

## Threading: L'Architecte et le Maçon

Imaginez un chantier. L'architecte (Python worker) conçoit les plans dans son bureau. Le maçon (AE main thread) exécute les modifications sur le chantier. Ils ne peuvent pas travailler au même endroit en même temps.

### ❌ Le Pattern qui Freeze AE

```python
import pyshiftae as ae
import time

# DÉSASTRE: calcul lent + appels AE mélangés
comp = ae.Item.active_item()
layer = comp.layers.add_solid("Solid", (1,0,0,1), 1920, 1080, 10)

for i in range(1000):
    time.sleep(0.01)  # Calcul sur main thread = UI bloquée
    layer.position.set_value((i, i, 0))  # Ping-pong C++ constant
```

**Ce qui se passe**: Le thread principal AE est occupé avec `time.sleep()` ET les appels SDK. L'UI ne reçoit aucun temps de traitement. Résultat: AE freeze.

### ✅ Le Pattern qui Fluidifie AE

```python
import pyshiftae as ae
import threading

def calculs_lourds_ia():
    """PUR PYTHON - aucun appel AE"""
    resultats = []
    for i in range(1000):
        val = (i, i * 1.5, 0)
        resultats.append((i/24.0, val))  # (Temps, Valeur)
    return resultats

def appliquer_changements(donnees):
    """Exécuté dans AE main thread via scheduler - RAPIDE"""
    comp = ae.Item.active_item()
    if not comp: return
    
    layer = comp.layers.add_solid("Solid_IA", (0,1,0,1), 1920, 1080, 10)
    pos_prop = layer.position
    
    for temps, valeur in donnees:
        idx = pos_prop.add_key(temps)
        pos_prop.set_value_at_key(idx, valeur)

# Exécution: worker thread → scheduler → main thread
threading.Thread(target=lambda: (
    data := calculs_lourds_ia(),
    ae.schedule_task(lambda: appliquer_changements(data))
)).start()
```

**Ce qui se passe**: Le worker thread fait les calculs lourds SANS toucher à AE. Une fois terminé, il envoie une petite tâche au scheduler qui s'exécute sur le main thread. L'UI reste fluide.

---

## Mémoire: La Bombe à Retardement des Handles

Les handles AE sont comme des références à des objets qui peuvent disparaître à tout moment.

### ❌ Le Pattern du Crash par Handle Stale

```python
# DANGER: cache long-terme de handles AE
cached_layer = comp.layers[1]  # Handle stocké

# ...plus tard dans le code...
if cached_layer:  # Handle peut être invalide!
    cached_layer.position.set_value((100, 100, 0))  # CRASH GARANTI
```

**Ce qui se passe**: L'utilisateur a supprimé le layer entre-temps. Le handle pointe vers une mémoire invalide. Crash immédiat.

### ✅ Le Pattern de la Survie

```python
# SÉCURITÉ: re-validation systématique
layer_id = 1  # ID stable

def apply_to_layer():
    comp = ae.Item.active_item()
    if not comp: return
    
    # Re-récupérer le handle à chaque usage
    if layer_id <= comp.layers.num_layers:
        layer = comp.layers[layer_id]
        layer.position.set_value((100, 100, 0))
```

**Ce qui se passe**: On vérifie l'existence du layer à chaque usage. Le handle est toujours valide.

### ❌ Memory Leak avec HandleWrapper

```python
# FUITE MÉMOIRE: lock sans unlock
handle = ae.get_some_handle()
locked_data = handle.lock()  # Lock acquis
# Oubli de unlock() → fuite mémoire garantie
```

### ✅ Pattern Lock→Use→Unlock→Free

```python
# SÉCURITÉ: cycle mémoire complet
handle = ae.get_some_handle()
try:
    locked_data = handle.lock()
    # Utilisation rapide des données
    process_data(locked_data)
finally:
    handle.unlock()  # Libération systématique
    handle.free()    # Nettoyage final
```

---

## TaskScheduler: Le Seul Canal Autorisé

Le TaskScheduler est le seul pont sécurisé entre Python et AE.

### ❌ Appel Direct depuis Thread Arbitraire

```python
# CRASH: appel SDK depuis thread non-main
def background_task():
    comp = ae.Item.active_item()  # Appel SDK hors main thread!

threading.Thread(target=background_task).start()
```

### ✅ Passage Forcé par Scheduler

```python
# SÉCURITÉ: tout passe par le scheduler
def background_task():
    # Calculs purs Python seulement
    return calculate_positions()

def apply_results(positions):
    # Exécuté dans main thread
    comp = ae.Item.active_item()
    if comp:
        apply_positions(comp, positions)

# Worker → Scheduler → Main Thread
threading.Thread(target=lambda: (
    positions := background_task(),
    ae.schedule_task(lambda: apply_results(positions))
)).start()
```

---

## Micro-tâches: Éviter la Monolithique

Une grosse tâche bloque l'UI. Des micro-tâches gardent AE responsive.

### ❌ La Tâche Monolithique

```python
# BLOCAGE: une tâche de 1 seconde
def massive_update():
    for i in range(1000):
        layer.position.set_value((i, i, 0))
        time.sleep(0.001)  # UI morte pendant 1 seconde

ae.schedule_task(massive_update)
```

### ✅ La Découpe en Micro-tâches

```python
# FLUIDITÉ: 1000 tâches de 1ms
def update_step(step_num):
    layer.position.set_value((step_num, step_num, 0))
    if step_num < 999:
        # Re-scheduler la prochaine étape
        ae.schedule_task(lambda: update_step(step_num + 1))

# Démarrage
ae.schedule_task(lambda: update_step(0))
```

---

## GIL: La Prison Python

Le GIL (Global Interpreter Lock) peut affamer d'autres tâches Python.

### ❌ GIL Captif

```python
# GIL bloqué pendant toute l'opération
def long_operation_with_ae():
    ae.begin_computation()  # GIL acquis
    time.sleep(2.0)         # Calcul long avec GIL
    ae.end_computation()    # GIL relâché trop tard
```

### ✅ GIL Minimal

```python
# GIL relâché dès que possible
def smart_operation():
    # Phase 1: calcul sans GIL
    results = heavy_computation()  # GIL relâché entre appels
    
    # Phase 2: mutation AE avec GIL bref
    ae.begin_computation()
    try:
        apply_results(results)  # Rapide
    finally:
        ae.end_computation()    # GIL relâché immédiatement
```

---

## Architecture UI: CEP ou Rien

### ❌ UI Native dans Process AE

```python
# CRASH: Qt/Tkinter dans process AE
import tkinter as tk
root = tk.Tk()  # Conflit boucles événementielles garanti
```

### ✅ Architecture Découplée

```
CEP Panel (HTML/JS) → [Pipe/Socket] → PyShiftAE → réponse directe
                → fallback JSON → bridge_daemon.py → PyShiftAE
```

**Configuration CEP**:
```javascript
// Détection automatique du transport
const pipeName = localStorage.getItem('pyshift_pipe_name') || 'pyshift_default';
const transport = pipeAvailable ? new PyInterface(pipeName) : new MailboxJSON();
```

---

## Erreurs: Jamais Silencieuses

### ❌ Échec Muet

```python
# DANGER: erreur ignorée
try:
    comp = ae.Item.active_item()
    layer = comp.layers.add_solid(...)
except:
    pass  # L'utilisateur ne sait pas que ça a échoué
```

### ✅ Erreur Contextualisée

```python
# SÉCURITÉ: erreur actionnable
try:
    comp = ae.Item.active_item()
    if not comp:
        raise ValueError("Aucune composition active")
    
    layer = comp.layers.add_solid("MySolid", (1,0,0,1), 1920, 1080, 10)
except Exception as e:
    logger.error(f"Erreur création solid - Comp: {comp.name if comp else 'None'} - {e}")
    raise  # Propager pour rollback
```

---

## Performance: Le Coût des Allers-Retours

### ❌ N+1 Queries

```python
# GASPILLAGE: un appel par propriété
for layer in comp.layers:
    pos = layer.position  # Appel SDK
    scale = layer.scale  # Appel SDK
    opacity = layer.opacity  # Appel SDK
```

### ✅ Batch Reading

```python
# OPTIMISATION: lecture groupée
properties = []
for layer in comp.layers:
    properties.append({
        'position': layer.position,
        'scale': layer.scale,
        'opacity': layer.opacity
    })
# Un seul passage SDK par layer
```

---

## Dépendances: La Règle du Pure Python

### ❌ Dépendances Natives Lourdes

```python
# RISQUE: conflits ABI dans interpreter embarqué
import tensorflow  # CUDA/BLAS/OpenSSL = crash probable
import cv2         # Dépendances natives = conflit garanti
```

### ✅ Pure Python Uniquement

```python
# SÉCURITÉ: libs pure Python
import json        # Standard, safe
import pillow      # Pure Python (version allégée)
import numpy       # OK si version compatible testée
```

---

## Résumé des Commandements

### ✅ FAITES
- Worker thread pour calculs + main thread pour mutations AE
- Micro-tâches via scheduler pour garder l'UI responsive
- Lock→use→unlock→free systématique sur les handles
- Re-validation des handles à chaque usage
- Architecture CEP découplée (pipes/sockets prioritaires)
- Erreurs contextualisées avec rollback
- Dépendances pure Python uniquement

### ❌ NE FAITES JAMAIS
- Appels SDK AE depuis threads arbitraires
- Calculs longs sur le main thread
- Cache long-terme de handles AE
- PyQt/Tkinter dans le process AE
- Références circulaires Python ↔ PyFx
- GIL captif pendant des opérations longues
- Dépendances natives non testées

---

## La Checklist de Survie

Avant d'exécuter du PyShiftAE en production:

1. **Version alignée**: Python ↔ .aex compatible?
2. **Thread boundary**: Calculs worker, mutations main thread?
3. **Handle lifecycle**: Lock→use→unlock→free?
4. **Scheduler usage**: Tout passe par `ae.schedule_task()`?
5. **Error handling**: Contexte + rollback?
6. **Dependencies**: Pure Python uniquement?
7. **UI architecture**: CEP découplé?

Si vous répondez "non" à l'une de ces questions, votre code va crasher AE. C'est mathématique.

---

## Références Techniques

- `AETK-main/AETK/AEGP/Util/TaskScheduler.hpp` - Scheduler singleton
- `AETK-main/AETK/AEGP/TaskScheduler/TaskScheduler.cpp` - Idle hook et exécution
- `AETK-main/AETK/src/AEGP/Core/Suites.cpp` - Pattern ScheduleOrExecute
- `AETK-main/AETK/AEGP/Core/Suites.hpp` - memHandleToString (lock/unlock/free)
- `AETK-main/AEGP/Grabba/Grabba.cpp` - GIL acquisition pattern

**La règle d'or reste la même: Ne jamais appeler l'API AEGP hors du TaskScheduler.**
