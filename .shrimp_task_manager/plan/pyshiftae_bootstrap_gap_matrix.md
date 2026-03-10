# Matrice d'écarts — debug/session_debug_pyshiftae.md → cibles bootstrap

## Invariants validés (source debug)
1. Startup JSX = **config-only** (pas d'exécution Python directe).
2. Bootstrap Python = `os.add_dll_directory(Support Files)` **avant** `from PyShiftBridge import bridge_daemon`.
3. Daemon unique in-AE = `is_running()` / `start()` + script maintenu vivant (boucle keepalive).

## Écarts constatés

| Zone | État actuel | État cible | Action de correction |
|---|---|---|---|
| `PyShiftBridge/bootstrap/bridge_bootstrap_mediasolution.py` | Import direct `bridge_daemon` sans pré-init DLL | DLL path initialisé avant import bridge | Ajouter résolution robuste `Support Files` + `os.add_dll_directory` (Windows) avant import |
| `PyShiftBridge/bootstrap/bridge_bootstrap_mediasolution.py` | Démarrage daemon sans keepalive | Daemon unique + boucle active | Conserver `is_running/start`, ajouter boucle `while True: sleep(...)` + arrêt propre `KeyboardInterrupt` |
| `PyShiftBridge/bootstrap/bridge_bootstrap_mediasolution.py` | Messages minimaux | Erreurs contextualisées | Encadrer résolution de chemins / startup par messages explicites, pas de catch silencieux |
| `PyShiftBridge/bootstrap/PyShiftBridgeBootstrap.jsx` | Exécute directement `py.executePythonFile` avec retry `scheduleTask` | Mode config-only | Retirer auto-run Python, ne garder que `$.setenv(...)` |
| `PyShiftBridge/bootstrap/PyShiftBridgeBootstrap.jsx` | Chemin script hardcodé + logique run | Contrat env stable | Définir explicitement `PYSHIFTBRIDGE_ALLOW_SYSTEM_FALLBACK`, `PYSHIFTBRIDGE_PYTHON`, `PYSHIFTBRIDGE_BOOTSTRAP_PY`, `PYSHIFTBRIDGE_DIR` |

## Contrat conservé (non-régression)
- Aucun changement des entrypoints/handlers de `PyShiftBridge/bridge_daemon.py`.
- Aucune modification du schéma message Hybrid 2.0 (`{id, entrypoint, args}` / mailbox `cep_to_py.json`, `py_to_cep.json`).
- Réutilisation stricte des variables d'environnement existantes (pas de nouveau contrat externe).

## Spécification finale de correction
- **Startup JSX**: configuration env uniquement, IIFE ES3, chemins dynamiques basés sur `Folder.appPackage.parent` et `Folder.myDocuments`.
- **Bootstrap Python**: préparation DLL avant import bridge, démarrage daemon idempotent, keepalive basse charge CPU, diagnostic lisible.
- **Documentation**: aligner architecture/guide bridge/patterns sur cette séquence comme « source de vérité opérationnelle ».
