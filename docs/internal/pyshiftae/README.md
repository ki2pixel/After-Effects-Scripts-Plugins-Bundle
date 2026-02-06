# Documentation PyShiftAE

Ce dossier contient la documentation technique consolidée pour PyShiftAE (plugin After Effects avec binding Python).

## Structure

### 📖 Guide principal
- **[pyshiftae_guide.md](./pyshiftae_guide.md)** – Document de référence consolidé (architecture, patterns, workflows, installation)

### 📚 Annexes techniques
- **[Annexe A – Faisabilité avancée](./pyshiftae_feasibility_study_shape_layers_hooks.md)** – Étude détaillée Shape Layers & Hooks, verdicts techniques
- **[Annexe B – Installation Windows](./pyshiftae_installation_windows.md)** – Guide complet d'installation et troubleshooting Windows
- **[Annexe C – Recettes & snippets](./pyshiftae_implementation_shape_navigator_cep_bridge.md)** – Scripts complets (Shape Navigator) et architecture CEP Bridge
- **[Annexe D – Safe patterns checklist](./pyshiftae_safe_patterns_checklist.md)** – Checklist opérationnelle (threading, GIL, IPC, DO/DON'T)

## Navigation recommandée

1. **Nouveaux utilisateurs** : Commencer par le [guide principal](./pyshiftae_guide.md)
2. **Implémentation technique** : Consulter les annexes selon vos besoins
3. **Installation** : Suivre l'annexe B pour Windows
4. **Dépannage** : Voir les sections troubleshooting dans chaque annexe

## Historique

- **6 février 2026** : Création du guide consolidé et réorganisation des documents existants
- Documents originaux conservés en annexes pour référence détaillée

---

> **Note** : Cette documentation est basée sur l'analyse du code AETK et de l'API Python PyShiftAE, ainsi que sur les sources externes analysées dans `docs/internal/repomix/` (CEPy-Resources, PyFxCore, PyShift-Utils, etc.). Le code source C++ du plugin PyShiftAE lui-même n'est pas inclus dans ce bundle (symlink cassé dans `PyShiftAE/AEGP/`).
