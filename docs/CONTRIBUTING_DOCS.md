# Contributing to Documentation

> **Guide de contribution** pour la documentation After Effects Scripts & Plugins Bundle • Workflow & standards

## 🚀 Workflow de contribution

### 1. Création d'un nouveau document

1. **Choisir le bon emplacement**
   - `docs/` : Documents cross-cutting (architecture, ponts, produits actifs)
   - `docs/internal/` : Référentiels techniques approfondis
   - `docs/mediasolution/` : Guides MediaSolution spécifiques

2. **Partir du gabarit approprié**
   - Guide technique : Voir [DOCS_PLAYBOOK.md](./DOCS_PLAYBOOK.md#3-gabarits-prêts-à-lemploi)
   - README de dossier : Voir [DOCS_PLAYBOOK.md](./DOCS_PLAYBOOK.md#32-gabarit-readme-de-dossier)

3. **Ajouter les métadonnées obligatoires**
   ```yaml
   ---
   title: "Titre concrètement descriptif"
   version: "1.0"
   audience: "Développeurs [niveau] en [technologie]"
   maintainer: "@pseudo"
   status: "draft|review|stable|deprecated"
   last_updated: "YYYY-MM-DD"
   estimated_read: "XX min"
   ---
   ```

### 2. Processus de revue

| Étape | Action | Responsable | Validation |
| ----- | ------ | ----------- | ---------- |
| **Brouillon** | Status `draft` | Auteur | Auto-validation checklist |
| **Revue technique** | Status `review` | Lead domaine | Contenu + structure |
| **Revue éditoriale** | Status `review` | Lead docs | Style + liens |
| **Publication** | Status `stable` | Mainteneur principal | Intégration liens |

### 3. Mise à jour de documents existants

1. **Vérifier le statut actuel** via métadonnées
2. **Appliquer les changements** en respectant le style existant
3. **Mettre à jour les métadonnées** (version, date)
4. **Vérifier les liens croisés** impactés
5. **Notifier les dépendances** (autres docs référençant ce document)

## 📋 Standards de qualité

### 4.1 Checklist avant publication
- [ ] TL;DR présent et informatif
- [ ] Problème identifié avec contexte concret
- [ ] Exemples testables et réels
- [ ] Métadonnées complètes et à jour
- [ ] Liens croisés vérifiés
- [ ] Pas de listes inutiles ou marketing
- [ ] Voice directe et factuelle

### 4.2 Checklist de revue
- [ ] La structure suit le gabarit du [DOCS_PLAYBOOK.md](./DOCS_PLAYBOOK.md)
- [ ] Les exemples sont fonctionnels
- [ ] Les trade-offs sont honnêtes et équilibrés
- [ ] La Golden Rule est mémorable
- [ ] Les références sont correctement formatées

### 4.3 Checklist de maintenance
- [ ] Référencé depuis [docs/index.md](./index.md)
- [ ] Liens depuis d'autres docs vérifiés
- [ ] README de dossier mis à jour
- [ ] Pas de documents orphelins

## 🏗️ Architecture documentaire

### 5.1 Taxonomie des contenus

```
docs/
├── index.md                    # Portail principal
├── DOCS_PLAYBOOK.md           # Règles éditoriales
├── CONTRIBUTING_DOCS.md       # Ce document
├── architecture_overview.md   # Vue d'ensemble
├── bridge_communication.md    # Documentation cross-cutting
├── mediasolution/             # Guides produit
│   ├── README.md
│   └── *.md
├── internal/                  # Référentiels techniques
│   ├── pyshiftae/
│   ├── after_effects/
│   └── repomix/
└── official/                  # Documentation héritée (inchangé)
```

### 5.2 Propriétaires par domaine

| Domaine | Lead | Fréquence de revue |
| ------- | ---- | ------------------ |
| **PyShiftAE** | @pseudo-pyshift | Trimestrielle |
| **ExtendScript** | @pseudo-extendscript | Semestrielle |
| **Bridge/CEP** | @pseudo-cep | Trimestrielle |
| **MediaSolution** | @pseudo-mediasolution | Mensuelle |
| **Architecture** | @pseudo-architecte | Trimestrielle |

## 🔗 Gestion des liens

### 6.1 Références croisées
- Utiliser des chemins relatifs (`./`, `../`)
- Vérifier tous les liens lors des modifications
- Mettre à jour les index automatiquement

### 6.2 Navigation transversale
- Chaque document doit référencer les documents connexes
- Utiliser la section "Références" standardisée
- Maintenir les pistes de lecture dans [docs/index.md](./index.md)

## 📝 Gabarits rapides

### 7.1 Mini-gabarit pour corrections
```markdown
---
title: "Correction de [problème]"
version: "1.0.1"
audience: "Développeurs [technologie]"
maintainer: "@pseudo"
status: "stable"
last_updated: "YYYY-MM-DD"
---

**TL;DR**: Pour corriger [problème], appliquez [solution] car [raison].

## Problème identifié
[Description brève]

## Solution appliquée
[Correction avec exemple]

## Impact
[Changements induits]
```

### 7.2 Gabarit mise à jour
```markdown
---
title: "Mise à jour [sujet]"
version: "X.Y"
audience: "Développeurs [technologie]"
maintainer: "@pseudo"
status: "stable"
last_updated: "YYYY-MM-DD"
---

## Changements depuis vX.Y-1
- ✅ [Nouveau contenu/feature]
- 🔄 [Modification majeure]
- 🐛 [Correction importante]

## Impact sur les utilisateurs
[Description des changements]

## Migration nécessaire
[Si applicable]
```

## 🚨 Pièges à éviter

### 8.1 Anti-patterns rédactionnels
- Démarrer par des définitions abstraites
- Utiliser des listes exhaustives sans regroupement
- Marketing language ("révolutionnaire", "seamless")
- Oublier le TL;DR

### 8.2 Anti-patterns structurels
- Documents sans métadonnées
- Liens cassés ou obsolètes
- Documents orphelins (non référencés)
- Versions non synchronisées

### 8.3 Vérification des liens (obligatoire)
1. **Lancer la vérification automatique**
   ```bash
   python3 scripts/check_links.py docs/
   ```
2. **Corriger tous les liens cassés** avant la PR
3. **Valider** que le score de cohérence est ≥ 98%

### 8.4 Validation finale
Avant de soumettre :
- [ ] Tous les liens internes fonctionnent
- [ ] Métadonnées complètes et valides
- [ ] Document référencé depuis les index appropriés
- [ ] Aucun avertissement dans la check-list qualité

---

## 🛠 9. Outils et automatisation

### 9.1 Scripts de maintenance
- **check_links.py** : Vérification automatique des liens
- **validate_metadata.py** : Validation des métadonnées
- **update_index.py** : Mise à jour automatique des index

### 9.2 Workflow CI/CD
1. **PR trigger** : Lancement automatique des vérifications
2. **Link check** : Détection des liens cassés
3. **Metadata validation** : Contrôle des métadonnées
4. **Coverage report** : Rapport de couverture documentation

---

## 📞 Support & communication

### 9.1 Canaux de discussion
- **Issues GitHub** : Rapports de bugs et demandes de features
- **Discussions GitHub** : Questions et échanges
- **Discord/Slack** : Canal #documentation pour les discussions rapides

### 9.2 Signalement de problèmes
1. **Vérifier** si le problème est déjà documenté
2. **Créer une issue** avec le tag `documentation`
3. **Décrire** le problème de manière précise
4. **Proposer** une solution si possible

---

## 📊 Métriques & KPIs

### 10.1 Indicateurs de qualité
- **Couverture** : % de documents avec métadonnées complètes
- **Fraîcheur** : Âge moyen des dernières mises à jour
- **Accessibilité** : % de documents accessibles depuis l'index
- **Cohérence** : % de liens valides

### 10.2 Objectifs cibles
- Couverture métadonnées : 95%
- Âge moyen max : 6 mois
- Accessibilité : 100%
- Cohérence liens : 98%

---

*Document créé le 7 février 2026 • Basé sur DOCS_PLAYBOOK.md • Version 1.0*
