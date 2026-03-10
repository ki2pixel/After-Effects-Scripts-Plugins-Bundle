# Brief — PyShiftAE Bootstrap MediaSolution Fix

## Objectif principal
Implémenter la correction validée dans `debug/session_debug_pyshiftae.md` pour garantir un démarrage stable de PyShiftBridge/PyShiftAE dans After Effects via:
1. Startup JSX en mode **config-only** (aucun auto-run Python direct),
2. bootstrap Python avec `os.add_dll_directory(...)` **avant** import de `PyShiftBridge.bridge_daemon`,
3. daemon unique (`is_running`) démarré in-AE,
4. boucle de maintien active pour éviter l’arrêt immédiat du daemon,
5. documentation technique cohérente et alignée (architecture/guide bridge/patterns).

## Contraintes obligatoires
- Respect strict de `.clinerules/codingstandards.md`.
- Aucune rupture des entrypoints/handlers existants.
- Invariants Hybrid 2.0: daemon unique, transport adaptatif (pipe/socket prioritaire, mailbox fallback), opérations AE main thread.
- Gestion robuste de l’ordre d’initialisation DLL/PyFx.
- Documentation selon skill `documentation`: TL;DR first, opening problem-first, blocs ❌/✅, trade-offs, Golden Rule.

## Écarts observés (état actuel)
- `bridge_bootstrap_mediasolution.py`: import bridge direct, pas de pré-initialisation DLL, pas de boucle de maintien.
- `PyShiftBridgeBootstrap.jsx`: logique d’exécution directe `py.executePythonFile` + retries, pas en mode config-only.
- Documentation: décrit partiellement bootstrap et fallback, mais pas alignée explicitement avec la séquence stable validée debug (ordre DLL/import, config-only, run in-AE).

## Résultat attendu
- Bootstrap Python robuste aux erreurs PyFx liées aux DLL.
- Startup JSX réduit à la configuration d’environnement.
- Flux de démarrage documenté de façon unique et cohérente dans les 3 documents cible.
- Validation via `pytest PyShiftBridge/tests` et `python3 scripts/check_links.py`.
