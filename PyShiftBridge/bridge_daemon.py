from __future__ import annotations

import json
import os
import threading
import time
import traceback
from dataclasses import dataclass
from typing import Any, Dict, Optional

import pyshiftae as ae


@dataclass(frozen=True)
class BridgePaths:
    bridge_dir: str
    request_path: str
    response_path: str


def _default_bridge_dir() -> str:
    home = os.path.expanduser("~")
    docs = os.path.join(home, "Documents")
    base = docs if os.path.isdir(docs) else home
    return os.path.join(base, "PyShiftAE_CEP_Bridge")


def get_paths(bridge_dir: Optional[str] = None) -> BridgePaths:
    bridge_dir = bridge_dir or _default_bridge_dir()
    return BridgePaths(
        bridge_dir=bridge_dir,
        request_path=os.path.join(bridge_dir, "cep_to_py.json"),
        response_path=os.path.join(bridge_dir, "py_to_cep.json"),
    )


def _atomic_write_text(path: str, text: str) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        f.write(text)
    os.replace(tmp, path)


def _atomic_write_json(path: str, obj: Dict[str, Any]) -> None:
    _atomic_write_text(path, json.dumps(obj, ensure_ascii=False, indent=2))


def _safe_read_json(path: str) -> Optional[Dict[str, Any]]:
    if not os.path.exists(path):
        return None

    try:
        with open(path, "r", encoding="utf-8") as f:
            raw = f.read().strip()
        if not raw:
            return None
        return json.loads(raw)
    except Exception:
        # The file should be written atomically by CEP, but keep this robust.
        return None


def _try_get_by_matchname(group: ae.PropertyGroup, match_name: str):
    stream = group._dyn_suite.GetNewStreamRefByMatchname(group.property, match_name)
    if not stream:
        return None
    return ae.PropertyFactory.create_property(stream)


def set_first_fill_opacity(opacity: float) -> Dict[str, Any]:
    """Set the first found Vector Fill opacity on the active layer.

    This is the server-side equivalent of the validated "Shape Navigator".
    """

    layer = ae.Layer.active_layer()
    if layer is None:
        raise RuntimeError("No active layer. Select a Shape Layer and retry.")

    root = _try_get_by_matchname(layer, "ADBE Root Vectors Group")
    if root is None or not isinstance(root, ae.PropertyGroup):
        raise RuntimeError("Active layer has no 'ADBE Root Vectors Group' (not a Shape Layer?).")

    fill_group: Optional[ae.PropertyGroup] = None
    for node in root:
        if isinstance(node, ae.PropertyGroup):
            # Deep search
            stack = [node]
            while stack:
                g = stack.pop()
                if isinstance(g, ae.PropertyGroup) and g.match_name == "ADBE Vector Graphic - Fill":
                    fill_group = g
                    break
                if isinstance(g, ae.PropertyGroup):
                    for child in g:
                        if isinstance(child, ae.PropertyGroup):
                            stack.append(child)
            if fill_group:
                break

    if fill_group is None:
        raise RuntimeError("No Fill group found (matchName 'ADBE Vector Graphic - Fill').")

    fill_opacity = _try_get_by_matchname(fill_group, "ADBE Vector Fill Opacity")
    if not isinstance(fill_opacity, ae.OneDProperty):
        raise RuntimeError("Fill opacity stream not found or not OneD.")

    value = max(0.0, min(100.0, float(opacity)))

    before = fill_opacity.get_value(ae.LTimeMode.CompTime, 0.0, False)
    fill_opacity.set_value(value)
    after = fill_opacity.get_value(ae.LTimeMode.CompTime, 0.0, False)

    return {
        "layer": {"name": layer.name, "match_name": layer.match_name},
        "opacity": {"before": before, "after": after},
    }


def handle_entrypoint(entrypoint: str, args: Dict[str, Any]) -> Dict[str, Any]:
    if entrypoint == "set_opacity":
        opacity = args.get("opacity")
        if opacity is None:
            raise ValueError("Missing args.opacity")
        with ae.UndoGroup("PyShiftBridge: Set Fill Opacity"):
            return set_first_fill_opacity(float(opacity))

    if entrypoint == "selection_changed":
        # Placeholder: useful for logging / future state machines.
        return {"selection": args.get("signature", "")}

    raise ValueError(f"Unknown entrypoint: {entrypoint}")


class BridgeDaemon:
    def __init__(self, bridge_dir: Optional[str] = None, poll_interval_s: float = 0.2) -> None:
        self.paths = get_paths(bridge_dir)
        self.poll_interval_s = poll_interval_s
        self._stop_event = threading.Event()
        self._thread: Optional[threading.Thread] = None
        self._last_id: Optional[str] = None

        os.makedirs(self.paths.bridge_dir, exist_ok=True)
        # Ensure files exist to simplify CEP side logic
        if not os.path.exists(self.paths.request_path):
            _atomic_write_text(self.paths.request_path, "")
        if not os.path.exists(self.paths.response_path):
            _atomic_write_text(self.paths.response_path, "")

    def start(self) -> None:
        if self._thread and self._thread.is_alive():
            return
        self._thread = threading.Thread(target=self._loop, name="PyShiftBridgeDaemon", daemon=True)
        self._thread.start()

    def stop(self) -> None:
        self._stop_event.set()

    def _write_response_ok(self, msg_id: str, result: Dict[str, Any]) -> None:
        _atomic_write_json(
            self.paths.response_path,
            {"id": msg_id, "ok": True, "result": result, "error": None},
        )

    def _write_response_err(self, msg_id: str, err: str) -> None:
        _atomic_write_json(
            self.paths.response_path,
            {"id": msg_id, "ok": False, "result": None, "error": err},
        )

    def _loop(self) -> None:
        while not self._stop_event.is_set():
            msg = _safe_read_json(self.paths.request_path)
            if msg and isinstance(msg, dict):
                msg_id = msg.get("id")
                entrypoint = msg.get("entrypoint")
                args = msg.get("args")

                if msg_id and msg_id != self._last_id:
                    self._last_id = msg_id

                    try:
                        if not isinstance(entrypoint, str):
                            raise ValueError("Invalid entrypoint")
                        if args is None:
                            args = {}
                        if not isinstance(args, dict):
                            raise ValueError("Invalid args")

                        result = handle_entrypoint(entrypoint, args)
                        self._write_response_ok(msg_id, result)
                    except Exception as e:
                        tb = traceback.format_exc()
                        self._write_response_err(msg_id, f"{e}\n{tb}")

            time.sleep(self.poll_interval_s)


_daemon: Optional[BridgeDaemon] = None


def start(bridge_dir: Optional[str] = None) -> BridgeDaemon:
    global _daemon
    if _daemon is None:
        _daemon = BridgeDaemon(bridge_dir=bridge_dir)
    _daemon.start()
    return _daemon


def main() -> None:
    d = start()
    print("PyShiftBridge daemon started")
    print("Bridge dir:", d.paths.bridge_dir)
    try:
        while True:
            time.sleep(1.0)
    except KeyboardInterrupt:
        d.stop()


if __name__ == "__main__":
    main()
