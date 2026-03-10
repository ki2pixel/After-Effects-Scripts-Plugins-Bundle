import os
import sys
import time


def _resolve_bridge_dir():
    bridge_dir = (os.environ.get("PYSHIFTBRIDGE_DIR") or "").strip()
    if bridge_dir:
        return bridge_dir
    return None


def _resolve_support_files_dir():
    candidates = []

    explicit_support = (os.environ.get("PYSHIFTBRIDGE_SUPPORT_FILES") or "").strip()
    if explicit_support:
        candidates.append(explicit_support)

    env_python = (os.environ.get("PYSHIFTBRIDGE_PYTHON") or "").strip()
    if env_python:
        candidates.append(os.path.dirname(env_python))

    if sys.executable:
        candidates.append(os.path.dirname(sys.executable))

    for candidate in candidates:
        if candidate and os.path.isdir(candidate):
            return os.path.abspath(candidate)

    return None


def _prepare_dll_search_path():
    if os.name != "nt":
        print("[bootstrap] Plateforme non-Windows: add_dll_directory non requis.")
        return

    if not hasattr(os, "add_dll_directory"):
        print("[bootstrap] add_dll_directory indisponible sur cette version Python.")
        return

    support_files_dir = _resolve_support_files_dir()
    if not support_files_dir:
        raise RuntimeError(
            "Impossible de résoudre le dossier 'Support Files' pour initialiser les DLL "
            "(vérifiez PYSHIFTBRIDGE_PYTHON ou PYSHIFTBRIDGE_SUPPORT_FILES)."
        )

    os.add_dll_directory(support_files_dir)
    print("[bootstrap] DLL search path initialisé:", support_files_dir)


_prepare_dll_search_path()

from PyShiftBridge import bridge_daemon


def main():
    bridge_dir = _resolve_bridge_dir()

    if bridge_daemon.is_running():
        print("Daemon déjà actif.")
        return

    daemon = bridge_daemon.start(bridge_dir=bridge_dir)
    print("PyShiftBridge mailbox daemon démarré")
    print("Bridge dir:", daemon.paths.bridge_dir)
    print("En attente de After Effects...")

    try:
        while True:
            time.sleep(1.0)
    except KeyboardInterrupt:
        print("[bootstrap] Arrêt demandé (KeyboardInterrupt).")
        daemon.stop()


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print("[bootstrap] Erreur de démarrage:", exc)
        raise