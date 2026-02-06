# Checklist “safe patterns” (PyShiftAE / AETK)

## 1) Pré-vol (avant d'exécuter du Python dans AE)
- **Alignement versions** : vérifier que la version de Python ciblée correspond exactement au `.aex` packagé (cf. `PyShiftAE/Python/setup.py` et l'installateur `PyShiftAE/Python/plugin_installer.py`).
- **Projet de test minimal** : valider sur un projet AE "sandbox" (1 comp, 1 footage, 1 layer) avant tout run en prod.
- **Surface API** : identifier explicitement ce qui passe par des suites AE (risque thread) vs logique pure Python (safe).

## 2) Règle d'or threading : "AE main thread only" pour les appels SDK
- **Ne jamais appeler directement les suites AE depuis un thread Python** si tu n'as pas une garantie de marshaling vers le main thread.
- **Pattern recommandé** : encapsuler tout appel suite/handle AE dans un mécanisme type `ScheduleOrExecute` / file d'exécution main thread.
  - Référence : `AETK-main/AETK/src/AEGP/Core/Suites.cpp` (usage de `ae::ScheduleOrExecute(...)` pour sérialiser/exécuter côté main thread).
- **Longs traitements** : faire le calcul lourd dans un worker thread *sans toucher AE*, puis publier une petite tâche main thread pour appliquer les résultats.

## 3) Scheduler / Idle : découper en micro-tâches
- **Petites unités de travail** : préférer 100 tâches de 5–10 ms plutôt qu'une tâche de 1s qui freeze l'UI.
- **Exécution via idle hook** : s'appuyer sur l'exécution en idle pour éviter les blocages UI.
  - Référence : `AETK-main/AETK/AEGP/Util/TaskScheduler.hpp` + `AETK-main/AETK/AEGP/TaskScheduler/TaskScheduler.cpp` (`onIdle()` appelle `ExecuteTask()`).
- **Éviter les attentes bloquantes** : éviter de `wait()`/bloquer le thread UI sur un `future` si tu n'es pas certain que l'idle va tourner.

## 4) GIL (Python) : acquisition minimale, pas de GIL "global"
- **Pattern recommandé** : acquérir le GIL uniquement au moment d'exécuter du Python, et le relâcher dès que possible.
  - Référence : `AETK-main/AEGP/Grabba/Grabba.cpp` (`py::gil_scoped_acquire`).
- **Éviter** : garder le GIL durant des appels AE ou durant des I/O longues (risque d'affamer d'autres tâches Python).

## 5) Gestion des handles / objets AE : durée de vie courte, pas de cache "dangling"
- **Ne pas stocker** des handles AE (items, layers, streams) "longtemps" côté Python si la structure projet peut changer (suppression layer, fermeture projet).
- **Re-validation** : re-récupérer les handles par ID/index quand c'est possible, ou vérifier que l'objet est toujours valide avant usage.
- **Pattern mémoire AE** : si tu manipules des `AEGP_MemHandle`, respecter le triptyque lock → use → unlock → free.
  - Référence : `memHandleToString` dans `AETK-main/AETK/AEGP/Core/Suites.hpp` (lock/unlock/free).
- **Références circulaires** : éviter les références circulaires Python impliquant des objets PyFx (risque GC ↔ destructeurs C++).

## 6) Erreurs : jamais "silent fail", toujours contextualiser
- **Encapsuler** chaque commande "haut niveau" dans un `try/except` (Python) ou `try/catch` (C++).
- **Message actionnable** : inclure le contexte (comp/layer/property visé, matchName si pertinent, étape du pipeline).
- **Surface utilisateur** : préférer une erreur claire + rollback partiel plutôt qu'un état projet incohérent.
  - Référence : `TaskScheduler::onIdle` catch + `App::Alert(...)` dans `AETK-main/AETK/AEGP/TaskScheduler/TaskScheduler.cpp`.

## 7) Transactions / cohérence projet : appliquer en batch, minimiser les allers-retours
- **Batching** : regrouper les modifications sur un même layer/comp (set de propriétés) plutôt que ping-pong property par property.
- **Lecture vs écriture** : faire une passe "read snapshot" (collecte) puis une passe "write apply" (application) pour limiter les états intermédiaires.

## 8) Performance : réduire le coût des accès propriété
- **Éviter les boucles "N x property queries"** : les getters AE peuvent être chers.
- **Cache local courte durée** : ok pour une seule commande (ex: dictionnaire property->value) mais **pas** persistant entre commandes si le projet change.
- **I/O disque** : si tu exportes (images, JSON), le faire hors main thread.

## 9) UI / Interactivité : ne pas promettre du ScriptUI depuis Python
- **Attendu réaliste** : pas de panels dockables ScriptUI natifs depuis PyShiftAE ; limiter l'UI à messages, logs, commandes menu.
- **UI déportée** : utiliser CEP (HTML/JS) pour l'interface utilisateur, qui envoie des ordres à la couche Python.
- **Interdit** : ne pas utiliser PyQt/Tkinter dans le process AE (crash garanti).
- **Feedback utilisateur** : au minimum
  - début/fin d'exécution
  - progression grossière (étapes)
  - possibilité d'annuler (flag partagé lu entre micro-tâches)
- **Pattern CEP ↔ Python** : ne jamais faire d'appel bloquant côté UI CEP, laisser Python notifier quand terminé.

### 9.1 Architecture Hybrid 2.0 (CEP Bridge)
- **Transport natif** : Utiliser PyInterface (named pipes/Unix sockets) si disponible
- **Fallback** : Mailbox JSON si pipe non exposé
- **Temps réel** : Sliders et interactions continues possibles via pipe mode
- **Diagnostic** : Scripts PowerShell/Bash pour découvrir les pipes disponibles
- **Configuration** : `localStorage.setItem('pyshift_pipe_name', '...')` dans la console CEP
- **Monitoring** : Console CEP pour vérifier le transport actif (`"Pipe connected"` ou `"mailbox"`)

## 10) Dépendances Python : "vendoring" léger, éviter le natif lourd
- **Préférer** : libs pure Python, stables, sans extensions C.
- **Éviter** : packages nécessitant OpenSSL/BLAS/CUDA/etc (risque de conflits ABI dans un interpreter embarqué).
- **Isolation** : si tu dois ajouter des libs, documenter précisément la stratégie (venv vs site-packages embarqué) et tester sur machine "clean".

## 11) Observabilité : logs structurés + mode debug
- **Logger** : un logger Python unique (niveau INFO/DEBUG) et un mode "verbose" activable.
- **Trace IDs** : un identifiant d'exécution par commande pour recoller les logs.
- **Crash triage** : conserver la dernière commande, la dernière tâche scheduler, et la stacktrace Python.

## 12) Tests "safe"
- **Unit tests** : isoler la logique pure Python (sans AE) et la tester via `pytest`.
- **Integration tests manuels** : scripts idempotents (peuvent être relancés sans dupliquer/importer 10x).
- **Scénarios edge** : projet fermé pendant exécution, item supprimé, comp inactive, layer verrouillé, footage offline.

## 13) Patterns hybrides (Python ↔ ExtendScript)
- **Bridge** : utiliser Python pour logique métier + ExtendScript injecté pour shapes/propriétés non exposées.
- **Mécanisme** : Python formate commande JS → exécute via `UtilitySuite.executeScript` ou socket CEP.
- **Workflow pixels/IA** : RenderQueue → PNG/JPG → Python (Pillow/OpenCV) → réimport via AssetManager.

### 13.1 Communication CEP ↔ Python (Hybrid 2.0)
- **Mode natif** : CEP → Pipe/Socket → PyShiftAE (latence minimale)
- **Mode fallback** : CEP → JSON files → bridge_daemon.py → PyShiftAE
- **Format** : JSON newline-delimited `{endpoint: "Response|NoResponse", functionName: "...", args: {...}}`
- **Auto-détection** : Tentative de connexion pipe au boot avec fallback transparent

## 14) Interdictions spécifiques
- **Boucles infinies** : interdit `while True` ou `time.sleep()` long sur thread principal AE.
- **Deadlocks** : ne pas appeler `future.get()` dans un callback Hook AE (`CommandHook`).

## 15) Modèle mental & exemples concrets

### Architecture : Architecte (Python) ↔ Maçon (AE) via Talkie-Walkie (TaskScheduler)
- **Python Worker** : calculs, IA, réseau, fichiers (rapide, isolé)
- **AE Main Thread** : mutations projet (une seule tâche à la fois)
- **TaskScheduler** : seul canal de communication entre les deux

### ❌ Crash Pattern (à éviter)
```python
import pyshiftae as ae
import time

# MAUVAIS : calcul lent + appels AE mélangés
comp = ae.Item.active_item()
layer = comp.layers.add_solid("Solid", (1,0,0,1), 1920, 1080, 10)

for i in range(1000):
    time.sleep(0.01)  # Calcul sur main thread
    layer.position.set_value((i, i, 0))  # Ping-pong C++ constant
```

### ✅ Safe Pattern (recommandé)
```python
import pyshiftae as ae
import threading

def calculs_lourds_ia():
    """Pure Python - aucun appel AE"""
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

# Exécution
threading.Thread(target=lambda: (
    data := calculs_lourds_ia(),
    ae.schedule_task(lambda: appliquer_changements(data))
)).start()
```

### Interface utilisateur : architecture découplée
- **CEP (HTML/JS)** pour l'UI
- **Communication** : **priorité aux pipes/sockets** (PyInterface) ou **fichier JSON** (fallback)
- **Python** : surveille/détecte → déclenche action AE
- **Interdit** : PyQt/Tkinter dans process AE (conflits boucles événementielles)

### Architecture Hybrid 2.0 recommandée
```
CEP Panel → [Pipe/Socket] → PyShiftAE (natif) → réponse directe
     → fallback JSON files → bridge_daemon.py → PyShiftAE
```

---

## Règles "DO / DON'T" (résumé)
- **DO** : worker thread pour calcul + main thread pour mutation AE (via scheduler).
- **DO** : micro-tâches en idle + possibilité d'annuler.
- **DO** : lock/unlock/free strict sur `AEGP_MemHandle`.
- **DO** : pattern hybride Python ↔ ExtendScript pour shapes/propriétés manquantes.
- **DO** : workflow fichier pour traitement IA (RenderQueue → PNG → Python → réimport).
- **DO** : utiliser l'architecture Hybrid 2.0 (pipes/sockets) pour le temps réel si disponible.
- **DO** : configurer le nom du pipe via localStorage et utiliser les scripts de diagnostic.
- **DON'T** : appels suites AE depuis threads arbitraires.
- **DON'T** : blocage UI avec waits longs ou boucles infinies.
- **DON'T** : cache long-terme de handles AE.
- **DON'T** : références circulaires Python ↔ PyFx.
- **DON'T** : PyQt/Tkinter dans process AE.

---

## Références techniques
- `AETK-main/AETK/AEGP/Util/TaskScheduler.hpp` - Scheduler singleton
- `AETK-main/AETK/AEGP/TaskScheduler/TaskScheduler.cpp` - Idle hook et exécution
- `AETK-main/AETK/src/AEGP/Core/Suites.cpp` - Pattern ScheduleOrExecute
- `AETK-main/AETK/AEGP/Core/Suites.hpp` - memHandleToString (lock/unlock/free)
- `AETK-main/AEGP/Grabba/Grabba.cpp` - GIL acquisition pattern
- `PyShiftAE/Python/setup.py` - Packaging et version alignement
- `PyShiftAE/Python/plugin_installer.py` - Installation .aex
