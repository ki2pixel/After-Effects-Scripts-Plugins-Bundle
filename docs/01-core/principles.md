---
title: "Principes PyShiftAE – Golden Rules & Style Guide"
version: "0.9"
audience: "Développeurs PyShiftAE, auteurs CEP, maintainers documentation"
maintainer: "@pyshift-core"
status: "draft"
last_updated: "2026-02-08"
estimated_read: "6 min"
---

**TL;DR**: **Tu ne mélanges jamais calculs Python et appels AEGP, tu documentes comme un lead technique (TL;DR → Problème → Solution → Implémentation → Pièges) et tu considères chaque règle comme un garde-fou contre les freezes AE.**

## Analogie chef d'orchestre

Considère le système comme un orchestre: les instrumentistes (workers Python) répètent hors scène, le chef (TaskScheduler) décide quand chacun joue sur la scène principale (main thread AE), et la partition SKILL garantit que tout le monde lit les mêmes mesures.

### ❌ Partition improvisée vs ✅ Partition SKILL

| Sujet | ❌ Impro totale | ✅ Partition SKILL |
| --- | --- | --- |
| Code | Worker qui manipule des handles AE directement | Worker pur + `ae.schedule_task` pour chaque mutation |
| Documentation | « Voici nos fichiers » sans douleur ni ❌/✅ | TL;DR → Problème → Solution → Implémentation → Trade-offs → Golden Rule |
| Onboarding | Chaque équipe raconte Hybrid 2.0 différemment | Tous les guides reprennent la même analogie et les mêmes garde-fous |

## Le problème

Les 373k LOC du bundle proviennent de sources hétérogènes: C++ AEGP lifetimes, Python embarqué, scripts JSX historiques, docs rédigées à la volée. Sans principes unifiés:
- Les auteurs confondent worker threads et main thread, ce qui fige l'UI.
- Les docs deviennent des listes sans valeur; aucune Golden Rule ne survit au temps.
- Les nouveaux contributeurs ignorent les patterns critiques (TaskScheduler, lock→use→unlock→free) parce qu'ils sont disséminés dans cinq fichiers.

## La solution

On fusionne les règles intro du `pyshiftae_guide` et du `DOCS_PLAYBOOK` pour former un manifeste unique qui sert à la fois de boussole technique et stylistique:
1. **Thread Boundary**: Python calcule, TaskScheduler applique.
2. **Handle Discipline**: Aucun cache longue durée; toujours lock→use→unlock→free.
3. **Transport Clair**: Hybrid 2.0 (pipes prioritaire, mailbox fallback) est l'unique histoire.
4. **Docs Pattern**: TL;DR, problème réel, solution concrète, snippets testables, trade-offs honnêtes, Golden Rule mémorable.
5. **Ton Direct**: «Tu fais X» plutôt que «Ce document explique X». Pas de marketing, pas de fluff.

## Implémentation

### 1. Appliquer les règles techniques
```python
import threading
import pyshiftae as ae

def worker(batch):
    return [(i / 24.0, value) for i, value in enumerate(batch)]

def apply(keyframes):
    comp = ae.Item.active_item()
    if not comp:
        raise RuntimeError("Aucune comp active")
    layer = comp.layers.add_solid("Solid_IA", (0,1,0,1), 1920, 1080, 10)
    prop = layer.position
    for t, value in keyframes:
        k = prop.add_key(t)
        prop.set_value_at_key(k, value)

threading.Thread(target=lambda: (
    data := worker(batch=input_data),
    ae.schedule_task(lambda: apply(data))
)).start()
```
- **Worker uniquement Python** (aucun handle AE)
- **Scheduler** pour chaque mutation
- **Exceptions contextualisées** plutôt que `pass`

### 2. Documenter avec le gabarit SKILL
```markdown
**TL;DR**: dis exactement pourquoi on gagne.

## Le problème
Décris la douleur concrète (gel UI, DLL hell, etc.).

## La solution
Expose l'architecture choisie et pourquoi.

### Implémentation
Snippets prêts à l'emploi (JSX, Python, C++). Aucun code fictif.

## Pièges (Trade-offs)
Tableau honnête (latence, complexité, risques).

## Golden Rule
Une phrase mémorisable.
```
- Utilise ❌/✅ pour contraster.
- Remplacement systématique des « - » flottants par `:` `;` ou `—` selon `.windsurf/skills/documentation/SKILL.md`.
- Pas de bullet lists vides: chaque point doit mener à une action.

### 3. Synchroniser Bridge + Docs
```javascript
const pipeName = window.__cep__.getPersistentValue('pyshift_pipe') || 'pyshift_default';
const transport = pipeAvailable ? new PyInterface(pipeName) : new MailboxJSON();

function sendCommand(functionName, args) {
  return transport.send({ endpoint: "Response", functionName, args });
}
```
- Toujours montrer CEP + Python côte à côte.
- Mentionner les latences (<10 ms pipes, ~300 ms mailbox) pour que la doc reste décisionnelle.

## Pièges / Trade-offs

| Décision | ✅ Gains | ❌ Risques | Comment décider |
|---|---|---|---|
| Worker + TaskScheduler | UI fluide, sécurité threads | Nécessite discipline (micro-tâches) | Toujours, sauf script jetable local |
| Mailbox JSON fallback | Fonctionne sans pipe | Latence élevée (~300 ms) | Batch offline uniquement |
| Documentation SKILL-compliant | Onboarding rapide, cohérence | Investissement rédactionnel | Obligatoire pour tout fichier fusionné |
| Ton direct («Tu fais…») | Lecture plus claire | Peut sembler abrupt | Atténuer via contexte concret |

## Mauvaises interprétations récurrentes

1. **« On peut conserver un worker hybride pour gagner du temps. »** Dès qu'un worker touche un handle AE, la tour de contrôle perd la main et AE peut se bloquer.
2. **« La structure SKILL est optionnelle pour les documents courts. »** Même une note de 20 lignes doit contenir TL;DR, problème, ❌/✅ et Golden Rule pour rester compatible avec la partition.
3. **« Bridge et documentation peuvent diverger. »** Toute évolution (handler, transport, métrique) doit être synchronisée avec ce manifeste pour éviter les écarts d'interprétation.

## La Golden Rule

**Chaque fois que tu touches After Effects ou que tu écris une doc, applique le duo Worker + TaskScheduler et TL;DR → Problème → Solution → Implémentation → Trade-offs → Golden Rule.**

## Références
- `../internal/pyshiftae/pyshiftae_guide.md`
- `../internal/pyshiftae/pyshiftae_safe_patterns_checklist.md`
- `../DOCS_PLAYBOOK.md`
- `../architecture_overview.md`
