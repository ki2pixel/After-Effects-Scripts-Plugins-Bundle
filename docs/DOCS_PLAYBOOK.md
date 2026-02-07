# Documentation Playbook – Règles éditoriales & Gabarits

> **TL;DR** : Structurez chaque doc avec TL;DR → Problème → Solution → Exemples → Trade-offs. Évitez les listes inutiles, utilisez la voix directe, et ajoutez des métadonnées normalisées.

---

## 1. Principes fondateurs

### 1.1 Architecture d'information
- **Racine (`docs/`)** : Documents cross-cutting et guides produits actifs
- **`internal/`** : Référentiels techniques approfondis par domaine
- **`official/`** : Documentation héritée Adobe (inchangée)

### 1.2 Voice & Style
- **Instructionnel (2e personne)** : "Quand vous avez X, utilisez Y"
- **Narratif (1re personne)** : "J'ai construit X parce que..."
- **Direct, factuel** : Pas de marketing, pas de superflus
- **Concret** : Nombres réels, exemples précis, pas de vagues généralités

---

## 2. Structure standard d'un document

### 2.1 Entête (métadonnées)
```markdown
---
title: "Titre concrètement descriptif"
version: "1.0"
audience: "Développeurs Python/C++ intermédiaires"
maintainer: "@pseudo"
status: "draft|review|stable|deprecated"
last_updated: "2026-02-07"
estimated_read: "15 min"
---
```

### 2.2 TL;DR (obligatoire)
```markdown
**TL;DR**: Si vous avez besoin de [résultat], ne faites pas [mauvaise approche]. Utilisez [bonne approche] car [raison concise].
```

### 2.3 Problème-first (pas de définitions)
```markdown
❌ "L'automation est l'automatisation des tâches..."
✅ "Vous perdez 2 heures par jour à renommer 500 calques. Vous cherchez une solution..."
```

### 2.4 Corps du document
- Sections courtes avec des titres parlants
- ❌/✅ comparatifs pour les patterns
- Exemples concrets, pas de code abstrait
- Une seule analogie utilisée de manière cohérente

### 2.5 Trade-offs (quand pertinent)
```markdown
| Approche | Performance | Maintenance | Complexité |
| -------- | ----------- | ----------- | ---------- |
| Solution A | ✅ Rapide | ❌ Élevée | 🟡 Moyenne |
| Solution B | 🟡 Moyenne | ✅ Faible | ✅ Simple |
```

### 2.6 Golden Rule (une phrase mémorable)
```markdown
## La Golden Rule: Métadonnées statiques, exécution dynamique
```

---

## 3. Gabarits prêts à l'emploi

### 3.1 Gabarit Guide Technique
```markdown
---
title: "Guide [Technologie] – [Problème résolu]"
version: "1.0"
audience: "Développeurs [niveau] en [technologie]"
maintainer: "@pseudo"
status: "draft"
last_updated: "YYYY-MM-DD"
estimated_read: "XX min"
---

**TL;DR**: Pour [résultat], utilisez [approche] car [avantage clé].

## Le problème

[Scénario douloureux avec chiffres si possible]

## La solution

[Approche recommandée avec explication du pourquoi]

### ✅ Le pattern [Nom]

[Code/exemple minimal]

### ❌ L'anti-pattern [Nom]

[Code à éviter]

## Exemples concrets

### Cas 1: [Scénario réel]
[Exemple détaillé]

### Cas 2: [Autre scénario]
[Exemple détaillé]

## Trade-offs

| Critère | Solution A | Solution B |
| -------- | ----------- | ---------- |

## La Golden Rule: [Phrase mémorable]

## Références
- [Guide PyShiftAE](./internal/pyshiftae/pyshiftae_guide.md)
- [Architecture complète](./architecture_overview.md)
```

### 3.2 Gabarit README de dossier
```markdown
# [Nom du domaine]

> Contenu technique pour [public cible] • [nombre] documents • [statut]

## Organisation

### 📖 Guides fondamentaux
- **[guide_principal.md]** – [description]

### 🔧 Outils & patterns
- **[outil1.md]** – [description]
- **[outil2.md]** – [description]

### 📚 Références
- **[reference.md]** – [description]

## Navigation recommandée

1. **Nouveaux** : Commencer par [guide_principal.md]
2. **Implémentation** : Consulter [outils] selon vos besoins
3. **Dépannage** : Voir sections troubleshooting dans chaque guide

## Propriétaire & maintenance

- **Lead** : [@pseudo]
- **Statut** : Actif | En pause | Déprécié
- **Dernière revue** : YYYY-MM-DD

---
*Document généré le YYYY-MM-DD • Basé sur [source]*
```

---

## 4. Check-list qualité

### 4.1 Avant publication
- [ ] TL;DR présent et informatif
- [ ] Problème identifié avec contexte
- [ ] Exemples concrets (pas abstraits)
- [ ] Métadonnées complètes
- [ ] Liens croisés vérifiés
- [ ] Pas de listes inutiles
- [ ] Voice directe, pas marketing

### 4.2 Pendant la revue
- [ ] La structure suit le gabarit
- [ ] Les exemples sont testables
- [ ] Les trade-offs sont honnêtes
- [ ] La Golden Rule est mémorable

### 4.3 Après publication
- [ ] Référencé depuis docs/index.md
- [ ] Liens depuis d'autres docs vérifiés
- [ ] README de dossier mis à jour

---

## 5. Workflow de contribution

1. **Création** : Partir du gabarit approprié
2. **Brouillon** : Status `draft`, demander revue rapide
3. **Revue** : Status `review`, appliquer feedback
4. **Publication** : Status `stable`, mettre à jour les liens
5. **Maintenance** : Réviser tous les 6 mois ou lors de changements majeurs

---

## 6. Pièges à éviter

### 6.1 Anti-patterns rédactionnels
- "Cet article explore..." → "J'ai résolu..."
- "**Key Benefits:**" → Intégrer dans le texte
- "seamlessly integrates" → "s'intègre en X lignes de code"
- Listes exhaustives → Regrouper par concept

### 6.2 Anti-patterns structurels
- Documents orphelins sans liens
- Métadonnées incomplètes
- Liens cassés vers d'autres docs
- Versions non synchronisées

---

## 7. Exemples de référence

- [Guide PyShiftAE](./internal/pyshiftae/pyshiftae_guide.md) – Structure technique complète
- [Architecture Shape Layers](./internal/after_effects/architecture_avancee_shape_layers.md) – Patterns avancés
- [Bridge Communication](./bridge_communication.md) – Documentation cross-cutting

---

*Playbook créé le 7 février 2026 • Basé sur le skill documentation • Version 1.0*
