import os

from PyShiftBridge import bridge_daemon


def main() -> None:
    bridge_dir = os.environ.get("PYSHIFTBRIDGE_DIR")
    if not bridge_dir:
        bridge_dir = None

    if not bridge_daemon.is_running():
        bridge_daemon.start(bridge_dir=bridge_dir)
        print("PyShiftBridge mailbox daemon démarré")
    else:
        print("Daemon déjà actif")


if __name__ == "__main__":
    main()
