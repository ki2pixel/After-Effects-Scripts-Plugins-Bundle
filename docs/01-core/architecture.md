---
title: "Architecture PyShiftAE – Worker Threads + TaskScheduler"
version: "0.9"
audience: "Développeurs Python/C++ et équipes CEP"
maintainer: "@pyshift-core"
status: "draft"
last_updated: "2026-02-07"
estimated_read: "7 min"
---

**TL;DR**: **Tu gardes After Effects réactif en séparant strictement calculs Python (workers) et mutations AE (TaskScheduler sur le main thread) tout en utilisant le bridge Hybrid 2.0 pour relier CEP, Python et C++.**

## Le problème

After Effects reste une application C++ single-threaded: chaque appel AEGP doit passer par le main thread. Mélanger calculs lourds Python, transport CEP et mutations AE sur le même thread fait geler l'UI, provoque des deadlocks et rend impossible l'automatisation à grande échelle. L'audit 2026 montre 373k LOC dominés par du C++ difficile à maintenir alors que les scripts JSX saturent le runtime.

## La solution

Tu racontes une seule histoire: **Hybrid 2.0**. On garde CEP pour l'UI, PyShiftBridge pour l'IPC, PyShiftAE pour la logique et AETK/TaskScheduler pour marshaler les appels SDK.

### Analogie tour de contrôle

Pense au TaskScheduler comme à une tour de contrôle: les workers Python sont les avions qui préparent leurs plans de vol, CEP est le hall passagers, et AE Main Thread est la piste unique. Tant que chaque avion (mutation) demande l'autorisation d'atterrir via la tour, aucune collision n'est possible.

### ❌ Mélange des rôles vs ✅ Hybrid 2.0 discipliné

| Sujet | ❌ Script monolithique | ✅ Architecture Hybrid 2.0 |
| --- | --- | --- |
| Calculs lourds | Exécutés sur le main thread AE → gel | Workers Python hors AE, pure logique |
| Appels SDK | Lancer `layer.add_solid` depuis un thread aléatoire | Toujours via TaskScheduler → AE Main Thread |
| Transport | `evalScript` bloquant côté CEP | Bridge unique, pipe <10 ms + mailbox fallback |
| Tests | Pas de séparation, impossible à isoler | Handlers unitaires + workers testables |

```mermaid
graph TB
    subgraph UI
        CEP[CEP Panel]
        JSX[ExtendScript]
    end
    subgraph Bridge
        PS[PyShiftBridge]
        PIPE[Named Pipes / Unix Sockets]
        JSON[Mailbox JSON]
    end
    subgraph Python
        PYA[PyShiftAE]
        PYF[PyFx]
    end
    subgraph C++
        AETK[AETK]
        TS[TaskScheduler]
    end
    subgraph AE
        AE[AE Main Thread]
    end
    CEP --> PS
    PS --> PIPE
    PS --> JSON
    PIPE --> PYA
    JSON --> PYA
    PYA --> PYF --> AETK --> TS --> AE
    JSX --> AE
```

### Architecture logique
1. **CEP/JSX**: capte l'intention utilisateur et sérialise les commandes JSON.
2. **PyShiftBridge**: choisit le meilleur transport (pipe <10 ms, mailbox fallback) et relaie vers Python.
3. **PyShiftAE**: exécute la logique métier en Python pur, prépare les mutations.
4. **TaskScheduler (C++)**: réordonne les tâches pour le main thread et applique les suites AEGP.

## Implémentation

### Étape 1 — Identifier ce qui bloque
- Repère les sections du pipeline où les scripts JSX gèlent l'UI ou où PyShiftAE mélange calculs + SDK.
- Quantifie la latence cible: <16 ms côté UI, <10 ms pour chaque mutation AE, <5 ms pour l'IPC pipe.

### Étape 2 — Isoler les workers Python
```python
import threading
import pyshiftae as ae

def heavy_computation(batch):
    return [(i / 24.0, value) for i, value in enumerate(batch)]

def apply_changes(keyframes):
    comp = ae.Item.active_item()
    if not comp:
        raise RuntimeError("Aucune comp active")
    layer = comp.layers.add_solid("Solid_IA", (0, 1, 0, 1), 1920, 1080, 10)
    position = layer.position
    for t, value in keyframes:
        k = position.add_key(t)
        position.set_value_at_key(k, value)

threading.Thread(target=lambda: (
    data := heavy_computation(batch=input_data),
    ae.schedule_task(lambda: apply_changes(data))
)).start()
```
- Worker = calcul pur (aucun accès AEGP).
- `ae.schedule_task` (ou wrapper TaskScheduler si tu es côté C++) applique les mutations par micro-tâches.

### Étape 3 — Choisir le transport Hybrid 2.0
```javascript
const pipeName = window.__cep__.getPersistentValue('pyshift_pipe') || 'pyshift_default';
const transport = pipeAvailable ? new PyInterface(pipeName) : new MailboxJSON();

function sendCommand(func, args) {
  return transport.send({ endpoint: "Response", functionName: func, args });
}
```
- Pipe/Socket pour sliders temps réel.
- Mailbox JSON (~300 ms) pour batch offline ou fallback de secours.

### Étape 4 — TaskScheduler côté C++
```cpp
void TaskScheduler::ScheduleTask(std::function<void()> fn) {
    {
        std::lock_guard<std::mutex> lk(queue_mutex_);
        queue_.push(std::move(fn));
    }
    AEGP_CauseIdleRoutinesToBeCalled();
}

void TaskScheduler::ExecuteTask() {
    std::function<void()> fn;
    {
        std::lock_guard<std::mutex> lk(queue_mutex_);
        if (queue_.empty()) return;
        fn = std::move(queue_.front());
        queue_.pop();
    }
    fn(); // Toujours sur le main thread AE
}
```
- Place ce scheduler dans un idle hook AE et garde les tâches atomiques (<2 ms chacune).

### Étape 5 — Boucler CEP ↔ Python ↔ AE
1. CEP envoie une commande `create_comp` → Bridge.
2. Bridge choisit pipe → PyShiftAE.
3. Python prépare les données → `schedule_task`.
4. TaskScheduler applique dans AE → JSON réponse remonte vers CEP → feedback utilisateur.

## Pièges / Trade-offs

| Approche | Avantages | Risques | Quand l'utiliser |
|---|---|---|---|
| **Hybrid 2.0 (CEP + Bridge + PyShiftAE)** | UI moderne, IPC rapide, Python + C++ équilibrés | Déploiement plus complexe (pipes, daemon) | Outils production temps réel, sliders, monitoring |
| **PyShiftAE seul (sans scheduler strict)** | Setup rapide, pas de CEP | Deadlocks, UI gelée, crashs sur appels SDK hors main thread | Jamais en prod; uniquement pour prototypes jetables |
| **ExtendScript pur** | Déploiement trivial, aucune dépendance externe | Pas de threading, performance limitée, maintenance pénible | Scripts legacy courts ou environnements verrouillés |
| **C++ natif direct** | Performance maximale, accès complet SDK | Courbe d'apprentissage élevée, build longs | Modules bas niveau (bindings, TaskScheduler) |

## Mauvaises interprétations

1. **« Le worker peut appeler le SDK si je verrouille un mutex. »** Faux: AE reste single-threaded; seul le scheduler côté main thread peut toucher les suites.
2. **« Un daemon par panel rend les choses plus fiables. »** Cela multiplie les pipes, ouvre des races et duplique les handlers; un daemon unique + registre suffit.
3. **« Mailbox JSON suffit pour tout. »** La latence ~300 ms est acceptable pour du batch, pas pour un slider animé; il faut privilégier les pipes tant que possible.

## La Golden Rule

**Calculs dans les workers, mutations via TaskScheduler.** Dès qu'un appel touche AE, il passe par le scheduler C++ depuis le main thread.

## Références
- `../architecture_overview.md`
- `../internal/pyshiftae/architecture_interne_pyshiftae.md`
- `../internal/pyshiftae/pyshiftae_safe_patterns_checklist.md`
- `../bridge_communication.md`
