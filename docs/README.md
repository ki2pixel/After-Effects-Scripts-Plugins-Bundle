# After Effects Scripts & Plugins Bundle — Documentation v2

**TL;DR**: Cette arborescence `docs/` consolide 20+ documents éparpillés en 8 fichiers majeurs suivant une structure SKILL unifiée, avec une archive `legacy-adobe/` pour la documentation Adobe originale.

Imagine une tour de contrôle qui remplace des cartes papier dispersées: tout le monde travaille avec le même radar. Cette page décrit pourquoi on a dû reconstruire le tableau de bord et comment garder ce réflexe.

## Le problème résolu par v2

Avant février 2026, chaque équipe suivait son propre plan: duplications dans `internal/`, guides contradictoires, liens cassés. Les onboarding duraient plus de deux jours parce que personne ne savait quelle version d'un guide suivre. Les migrations Hybrid 2.0 restaient invisibles, car la documentation ressemblait à un entrepôt.

### ❌ Ancienne arborescence vs ✅ Documentation v2

| Sujet | ❌ Avant (patchwork) | ✅ Maintenant (tour de contrôle) |
| --- | --- | --- |
| Navigation | Arborescence profonde (`docs/internal/official/...`) impossible à mémoriser | 4 dossiers thématiques (core, guides, API, références) accessibles en un clic |
| Patterns SKILL | Présence inégale, Golden Rule parfois absente | Tous les fichiers suivent TL;DR → Problème → Solution → Implémentation → Trade-offs → Golden Rule |
| Maintenance | Chaque migration exigeait 6+ MR pour aligner les liens | Une entrée unique (`docs/README.md`) décrit comment étendre l'arborescence |
| Legacy | Fichiers Adobe mélangés au contenu maison | Archive `legacy-adobe/` isolée pour la consultation historique |

La métaphore tour de contrôle revient dans chaque section: si un guide manque d'un bloc ❌/✅ ou d'un radar « Mauvaises interprétations », l'avion change de trajectoire sans qu'on s'en rende compte.

## Mauvaises interprétations fréquentes

1. **« Cette page n'est qu'un index décoratif. »** Non: elle définit le problème résolu par la v2 et rappelle que chaque nouvelle entrée doit suivre SKILL.md.
2. **« On peut ajouter un dossier avant de définir son problème. »** Seules les sections qui respectent le trio ❌/✅ + Mauvaises interprétations + analogie persistante sont acceptées.
3. **« Legacy = contenu obsolète donc supprimable. »** L'archive sert à documenter les comportements Adobe; on ne la modifie que lorsque les upstream changent.

**Golden Rule**: Maintiens la tour de contrôle claire : chaque document fusionné doit annoncer la douleur traitée, opposer un ❌/✅ et signaler les malentendus courants avant de rejoindre la piste d'atterrissage.

## 🗺️ Structure de la documentation

### `01-core/` — Architecture & Principes
- **[architecture.md](01-core/architecture.md)** — Vue d'ensemble Hybrid 2.0, Worker Threads + TaskScheduler, métriques (373k LOC)
- **[principles.md](01-core/principles.md)** — Règles d'or, Golden Rules, conventions du projet

### `02-guides/` — Guides pratiques
- **[installation-deployment.md](02-guides/installation-deployment.md)** — DLL Hell, isolation Python, scripts Windows
- **[cep-python-bridge.md](02-guides/cep-python-bridge.md)** — Transport adaptatif, registre handlers, polling CEP
- **[coding-patterns.md](02-guides/coding-patterns.md)** — Threading, Shape Navigator, gestion mémoire

### `03-api/` — Référence API
- **[api-reference.md](03-api/api-reference.md)** — Endpoints PyShiftAE + Bridge, TaskScheduler, AETK wrappers

### `04-reference/` — Données techniques
- **[ae-internals.md](04-reference/ae-internals.md)** — MatchNames, hiérarchie Shape Layers, conversions
- **[capabilities.md](04-reference/capabilities.md)** — Matrice PyShiftAE vs ExtendScript, arbitrage 80/20
- **[ae-script-audit.md](04-reference/ae-script-audit.md)** — Journal d'audit des scripts tiers servant de preuve brute avant dispatch dans les guides

### `legacy-adobe/` — Archive Adobe originale
- Copie brute de `docs/official/` pour référence historique
- Contient `general/`, `introduction/`, `layer/`, `matchnames/`, etc.
- **Important**: cette archive reste en lecture seule et ne suit pas les patterns SKILL; seule la doc v2 ci-dessus garantit les blocs ❌/✅, analogies et sections « Mauvaises interprétations ».

---

## 🚀 Parcours recommandés

### Pour les nouveaux développeurs
1. **[architecture.md](01-core/architecture.md)** — Comprendre l'écosystème Hybrid 2.0
2. **[installation-deployment.md](02-guides/installation-deployment.md)** — Mettre en place PyShiftAE
3. **[coding-patterns.md](02-guides/coding-patterns.md)** — Écrire du code PyShiftAE robuste

### Pour les intégrations CEP
1. **[cep-python-bridge.md](02-guides/cep-python-bridge.md)** — Architecture de communication
2. **[api-reference.md](03-api/api-reference.md)** — Endpoints disponibles
3. **[capabilities.md](04-reference/capabilities.md)** — Arbitrage Python vs ExtendScript

### Pour les experts techniques
1. **[ae-internals.md](04-reference/ae-internals.md)** — Bible des MatchNames
2. **[architecture.md](01-core/architecture.md)** — Détails C++/Python
3. **[legacy-adobe/](legacy-adobe/)** — Documentation Adobe originale

---

## 📊 Métriques clés

- **Total LOC projet** : 360 610 LOC (audit 2026-02-09 14:20 CET)
- **Ventilation détaillée** :
  - C/C++ Headers : 202 209 LOC
  - C++ : 73 310 LOC  
  - XML : 55 673 LOC
  - Markdown : 13 549 LOC
  - Python : 10 309 LOC (PyShiftAE: 7 fichiers, AETK-main: 40 fichiers)
- **Audits ciblés Scripts_AE** (cloc dédiés pour suivre les familles critiques) :
  - **Rigs procéduraux** (`3D Primitives`, `Crazy Shapes`, `Cloners + Effectors`) : 22 990 LOC — `3D Primitives Generator v3.jsx` dépasse toujours la fenêtre `cloc`, donc légère sous-estimation persistante.
  - **Toolkits pipeline/licensing** (`AW Autosaver`, `Automation Toolkit`, `KBar3`) : 11 299 LOC — `aw_Autosaver.jsx` continue de déclencher l'avertissement timeout.
  - **Panels CEP hybrides** (`AEInfoGraphics`, `Coco Color CoWorker`, `Infographics Toolkit`) : 9 547 LOC — `Coco Color CoWorker` embarque des blobs JSXBIN/binaire, `cloc` ignore encore ~230 lignes côté panel.
- **CEP MediaSolution + GridCloner** : 3 713 LOC (JSX 1 892, JavaScript 1 266, CSS 362, HTML 193)
- **GridCloner handler complet** : L’UI CEP ci-dessus pilote `gridcloner_apply` (validation PyShiftBridge + core PyShiftAE) pour générer jusqu’à 200 clones avec UndoGroup unique; voir [02-guides/cep-python-bridge.md](02-guides/cep-python-bridge.md#gridcloner-cep-panel) pour le pipeline UI → handler → AE.
- **Documents fusionnés** : 20+ → 8 majeurs
- **Couverture API** : PyShiftAE ~70%, ExtendScript 100%
- **Transport** : Named pipe/Unix socket + mailbox JSON fallback
- **Date d'audit** : 2026-02-09

---

## 🏗️ Architecture Hybrid 2.0

```
CEP Panel → PyShiftBridge → PyShiftAE → AETK → TaskScheduler → AE Main Thread
     ↓              ↓           ↓        ↓           ↓
  Async UI      IPC Daemon   Python   C++ SDK    Thread Safety
```

---

## 📚 Conventions appliquées

Tous les documents suivent la structure **SKILL.md** :
- **TL;DR** — Résumé exécutif
- **Le Problème** — Contexte et douleur
- **La Solution** — Approche architecturale
- **Implémentation** — Exemples de code concrets
- **Pièges (Trade-offs)** — Limites et mitigations
- **Golden Rule** — Principe mémorable

---

## 🔗 Références croisées

- **PyShiftAE patterns** → Voir [coding-patterns.md](02-guides/coding-patterns.md)
- **Bridge communication** → Voir [cep-python-bridge.md](02-guides/cep-python-bridge.md)
- **API endpoints** → Voir [api-reference.md](03-api/api-reference.md)
- **MatchNames complets** → Voir [ae-internals.md](04-reference/ae-internals.md)
- **Legacy Adobe docs** → Voir [legacy-adobe/](legacy-adobe/)

---

*Version v2 — Créé le 2026-02-08 — Basé sur MIGRATION_PLAN.md*
