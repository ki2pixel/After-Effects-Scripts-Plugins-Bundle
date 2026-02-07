# Documentation After Effects Scripts & Plugins

**TL;DR** : Ce dossier centralise toute la documentation technique pour automatiser Adobe After Effects, des scripts legacy ExtendScript aux APIs Python modernes.

---

## Pour qui ?

- **Développeurs Python/PyShiftAE** : API moderne et patterns d'automation
- **Développeurs CEP/Frontend** : Interfaces HTML et bridges IPC
- **Développeurs ExtendScript** : Scripts legacy et maintenance
- **Architectes système** : Vue d'ensemble et intégrations

---

## Organisation par intention

### `/internal/pyshiftae/`
Regroupe la documentation technique de PyShiftAE : l'API Python moderne pour After Effects. Vous y trouverez les patterns de développement, l'architecture des bindings C++ et les guides d'installation. C'est le point de départ pour tout nouveau développement Python.

### `/internal/after_effects/`
Contient les connaissances spécialisées sur After Effects : architecture avancée des shape layers, patterns de production ScriptUI, et cartographie des matchNames. Essentiel pour comprendre les subtilités de l'API AE native.

### `/mediasolution/`
Documente l'intégration complète de MediaSolution avec PyShiftAE : pipelines CSV, STEP7, et interfaces de santé. C'est notre référence d'implémentation hybride Python/CEP en production.

### `/WIP/`
Contient les documents de suivi des développements en cours et les migrations en progression. Permet de maintenir la continuité entre les sessions de développement et de documenter les étapes restantes.

### `/official/`
Héberge la documentation Adobe officielle et les références de scripts critiques. Utilisé comme source de vérité pour l'API ExtendScript native et les comportements documentés par Adobe.

### `/internal/repomix/`
Analyse les dépendances externes et les sources analysées par Repomix. Permet de comprendre l'écosystème des outils tiers et leur intégration.

---

## Par où commencer selon votre objectif

### Vous voulez développer en Python ?
Commencez par le guide PyShiftAE dans `/internal/pyshiftae/pyshiftae_guide.md`. Il couvre l'API complète, les patterns de threading, et les meilleures pratiques pour l'automation moderne. Pour comprendre l'architecture interne, consultez également `/internal/pyshiftae/architecture_interne_pyshiftae.md`.

### Vous devez maintenir des scripts existants ?
Consultez les références dans `/official/general/scripts_reference.md` et l'architecture shape layers dans `/internal/after_effects/`. Ces documents expliquent les patterns legacy et les subtilités de l'API ES3.

### Vous construisez une interface CEP ?
Le guide de bridge dans `/bridge_communication.md` explique les protocoles IPC et l'intégration avec PyShiftAE. Complétez avec l'exemple MediaSolution dans `/mediasolution/`.

### Vous voulez suivre les développements en cours ?
Consultez `/WIP/mediasolution_batch_pyshiftae_migration.md` pour le suivi de la migration du pipeline batch vers PyShiftAE et les étapes restantes.

### Vous architectez une solution complète ?
L'architecture overview dans `/architecture_overview.md` donne la vue d'ensemble complète, des bindings C++ aux interfaces utilisateur, en passant par les bridges IPC.

---

## Cas d'usage et documentation associée

### Automation pipeline de données
PyShiftAE + CEP est la combinaison idéale pour les pipelines de traitement batch. Le bridge IPC permet de séparer l'interface utilisateur des traitements lourds.

### Scripts de maintenance rapide
ExtendScript pur reste plus simple pour les corrections ponctuelles et les scripts legacy. La documentation officielle Adobe reste la référence.

### Prototypage d'outils
PyShiftAE seul permet de prototyper rapidement sans la complexité des interfaces CEP. Les patterns de threading sont documentés dans le guide principal.

### Outils de production
Les panels CEP avec bridge PyShiftAE offrent la meilleure expérience utilisateur pour les outils récurrents. MediaSolution illustre cette approche.

---

## Démarrage rapide

### Installation PyShiftAE
```bash
pip install pyshiftae  # Python 3.11+ requis
```

### Premier script
```python
import pyshiftae as ae
comp = ae.Item.active_item()
if comp:
    layer = comp.layers.add_solid("Test", (1,0,0,1), 1920, 1080, 10)
```

### Bridge CEP
```javascript
const bridge = new PyShiftBridge();
await bridge.sendCommand('create_solid_layer', {
    name: "Solid_Blue", color: [0.2, 0.4, 0.8, 1.0]
});
```

---

## Contribution et communauté

La documentation moderne est sur GitHub. Les discussions techniques se déroulent sur le canal #pyshiftae. Pour la documentation héritée Adobe, suivez le guide de contribution officiel.

---

*Basé sur l'analyse de 372k lignes de code • Documentation unifiée • Février 2026*
