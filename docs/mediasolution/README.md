# MediaSolution – Intégration PyShiftAE

**TL;DR** : Suite d'automatisation pour After Effects qui transforme des fichiers CSV de découpes en segments vidéo directement dans la composition active.

## Pour qui ?

Ce dossier s'adresse aux **développeurs Python** travaillant sur l'intégration PyShiftAE, aux **artistes After Effects** needing d'automatiser des découpes rapides, et aux **ingénieurs système** responsables du déploiement en production.

## Architecture du dossier

Ce dossier regroupe la documentation stratégique de MediaSolution, organisée par intention plutôt que par technologie. Les guides d'intégration couvrent le workflow complet depuis l'import CSV jusqu'à la création des segments, tandis que les références API détaillent les points d'extension PyShiftAE. La documentation de déploiement assure la reproductibilité des environnements Windows.

## Navigation recommandée

Pour une **nouvelle intégration**, commencez par le guide d'intégration qui couvre l'ensemble du workflow. Si vous développez de **nouvelles fonctionnalités**, la référence API PyShiftAE fournit les détails techniques nécessaires. Pour la **mise en production**, suivez le guide de déploiement Windows qui couvre tous les prérequis système.

## Documentation technique

### Guides d'intégration
Le guide d'intégration explique comment connecter MediaSolution à PyShiftAE, incluant le parsing CSV robuste, la création automatique des segments, et le monitoring de santé du système. Il couvre également le transport hybride (pipes/sockets avec fallback mailbox) pour une communication fiable.

### Référence API
La documentation API détaille les interfaces PyShiftAE utilisées par MediaSolution, y compris les patterns de threading worker + scheduler, la gestion des handles AE, et les points d'extension pour les fonctionnalités personnalisées.

### Déploiement
Le guide de déploiement Windows couvre l'installation complète de l'écosystème PyShiftAE, la configuration des variables d'environnement, et les tests de validation pour garantir un environnement de production stable.

## Architecture technique

MediaSolution s'articule autour d'une interface CEP qui orchestre le parsing CSV et la création de segments. Le traitement s'effectue via des worker threads Python qui communiquent avec After Effects à travers le TaskScheduler PyShiftAE. Un système de monitoring de santé fournit des indicateurs en temps réel sur l'état des connexions et les traitements en cours.

## Fonctionnalités supportées

L'intégration supporte l'import CSV avec gestion des erreurs, la création automatique de segments dans la composition active, le recentering optionnel depuis des tracking JSON, et un monitoring de santé avec indicateurs UI. Le transport hybride assure une communication robuste entre Python et After Effects.

## Maintenance

**Responsable** : Équipe MediaSolution  
**Statut** : Actif en production  
**Version** : v1.0 (Hybrid 2.0)  

## Compléments techniques

Pour comprendre la communication inter-processus, consultez le guide des bridges. La documentation PyShiftAE interne détaille les patterns d'automatisation avancés, tandis que l'architecture globale explique l'intégration dans l'écosystème After Effects.
