import os
import sys
import time

# 1. INDISPENSABLE : On dit à Python d'aller chercher les DLL de After Effects
# Adaptez bien le chemin vers vos "Support Files"
ae_support_path = r"F:\Adobe\Adobe After Effects 2024\Support Files"
if os.path.exists(ae_support_path):
    os.add_dll_directory(ae_support_path)

from PyShiftBridge import bridge_daemon

if not bridge_daemon.is_running():
    d = bridge_daemon.start()
    print("PyShiftBridge mailbox daemon demarre !")
    print("En attente de After Effects...")
    
    try:
        while True:
            time.sleep(1.0)
    except KeyboardInterrupt:
        d.stop()
else:
    print("Daemon deja actif.")