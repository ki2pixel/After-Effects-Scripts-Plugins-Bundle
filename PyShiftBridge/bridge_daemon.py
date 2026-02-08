from __future__ import annotations

import json
import os
import socket
import sys
import threading
import time
import traceback
from dataclasses import dataclass
from typing import Any, Dict, List, Optional

import pyshiftae as ae
import PyFx

_THIS_DIR = os.path.dirname(os.path.abspath(__file__))
if _THIS_DIR not in sys.path:
    sys.path.insert(0, _THIS_DIR)

try:
    from PyShiftBridge.mediasolution import core as mediasolution_core
    from PyShiftBridge.mediasolution import register_handlers
except Exception:
    from mediasolution import core as mediasolution_core
    from mediasolution import register_handlers


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


def _default_socket_path() -> Optional[str]:
    if os.name == "nt":
        return None

    name = os.environ.get("PYSHIFT_PIPE_NAME") or "PyShiftAE"
    name = str(name)
    if "/" in name:
        return name
    return os.path.join("/tmp", name)


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


def mediasolution_open_project_and_select_comp(
    aep_path: str,
    comp_name_suffix: str,
    config: Dict[str, Any],
) -> Dict[str, Any]:
    return mediasolution_core.mediasolution_open_project_and_select_comp(
        aep_path=aep_path,
        comp_name_suffix=comp_name_suffix,
        config=config,
    )


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


def _load_tracking_data_by_frame(path: str) -> Dict[int, List[Dict[str, Any]]]:
    return mediasolution_core._load_tracking_data_by_frame(path)


def mediasolution_apply_auto_recentering(
    tracking_json_path: Optional[str],
    config: Dict[str, Any],
) -> Dict[str, Any]:
    return mediasolution_core.mediasolution_apply_auto_recentering(
        tracking_json_path=tracking_json_path,
        config=config,
    )


def mediasolution_import_images_from_folder(folder_path: str, extensions: List[str]) -> Dict[str, Any]:
    return mediasolution_core.mediasolution_import_images_from_folder(
        folder_path=folder_path,
        extensions=extensions,
    )


def mediasolution_batch_prepare_active_layer(config: Dict[str, Any]) -> Dict[str, Any]:
    return mediasolution_core.mediasolution_batch_prepare_active_layer(config=config)


def mediasolution_create_base_aep_for_video(
    video_path: str,
    aep_path: str,
    comp_name: str,
    config: Dict[str, Any],
) -> Dict[str, Any]:
    return mediasolution_core.mediasolution_create_base_aep_for_video(
        video_path=video_path,
        aep_path=aep_path,
        comp_name=comp_name,
        config=config,
    )


def mediasolution_apply_cuts_active_layer(
    csv_path: str,
    frame_rate: float,
    comp_duration: Optional[float],
    snap_factor: float,
    tracking_json_path: Optional[str],
    config: Dict[str, Any],
) -> Dict[str, Any]:
    return mediasolution_core.mediasolution_apply_cuts_active_layer(
        csv_path=csv_path,
        frame_rate=frame_rate,
        comp_duration=comp_duration,
        snap_factor=snap_factor,
        tracking_json_path=tracking_json_path,
        config=config,
    )


def _resolve(name: str) -> Callable[..., Dict[str, Any]]:
    return globals()[name]


# Global handler registry
_HANDLERS: Dict[str, Callable[[Dict[str, Any]], Dict[str, Any]]] = {}


def _register_all_handlers() -> None:
    register_handlers(_HANDLERS, _resolve)


def handle_entrypoint(entrypoint: str, args: Dict[str, Any]) -> Dict[str, Any]:
    if entrypoint == "ping":
        return {
            "status": "ok",
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "version": "1.0.0",
            "transport": "mailbox",
        }

    if entrypoint == "set_opacity":
        opacity = args.get("opacity")
        if opacity is None:
            raise ValueError("Missing args.opacity")
        with ae.UndoGroup("PyShiftBridge: Set Fill Opacity"):
            return set_first_fill_opacity(float(opacity))

    # Initialize handlers registry if needed
    if not _HANDLERS:
        _register_all_handlers()

    # Dispatch to registered handlers (mediasolution functions)
    if entrypoint in _HANDLERS:
        return _HANDLERS[entrypoint](args)

    if entrypoint == "selection_changed":
        # Placeholder: useful for logging / future state machines.
        return {"selection": args.get("signature", "")}

    raise ValueError(f"Unknown entrypoint: {entrypoint}")


class BridgeDaemon:
    def __init__(
        self,
        bridge_dir: Optional[str] = None,
        poll_interval_s: float = 0.2,
        socket_path: Optional[str] = None,
    ) -> None:
        self.paths = get_paths(bridge_dir)
        self.poll_interval_s = poll_interval_s
        self._stop_event = threading.Event()
        self._thread: Optional[threading.Thread] = None
        self._socket_thread: Optional[threading.Thread] = None
        self._socket_path = socket_path if socket_path is not None else _default_socket_path()
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

        if self._socket_thread is None and self._socket_path:
            self._socket_thread = threading.Thread(
                target=self._socket_loop,
                name="PyShiftBridgeSocketServer",
                daemon=True,
            )
            self._socket_thread.start()

    def stop(self) -> None:
        self._stop_event.set()

    def _socket_loop(self) -> None:
        if not self._socket_path or os.name == "nt":
            return

        server = None
        try:
            try:
                if os.path.exists(self._socket_path):
                    probe = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
                    try:
                        probe.settimeout(0.2)
                        probe.connect(self._socket_path)
                        # Socket is active (likely owned by PyShiftAE). Do not override.
                        try:
                            probe.close()
                        except Exception:
                            pass
                        return
                    except Exception:
                        # Stale socket file.
                        try:
                            probe.close()
                        except Exception:
                            pass
                        os.remove(self._socket_path)
            except Exception:
                return

            server = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
            server.bind(self._socket_path)
            try:
                os.chmod(self._socket_path, 0o600)
            except Exception:
                pass
            server.listen(5)
            server.settimeout(0.25)

            while not self._stop_event.is_set():
                try:
                    conn, _addr = server.accept()
                except socket.timeout:
                    continue
                except Exception:
                    continue

                try:
                    conn.settimeout(2.0)
                    buf = ""
                    while "\n" not in buf:
                        chunk = conn.recv(4096)
                        if not chunk:
                            break
                        buf += chunk.decode("utf-8", errors="replace")

                    raw = buf.split("\n", 1)[0].strip()
                    if not raw:
                        conn.close()
                        continue

                    try:
                        msg = json.loads(raw)
                    except Exception:
                        conn.sendall((json.dumps({"ok": False, "result": None, "error": "invalid_json"}) + "\n").encode("utf-8"))
                        conn.close()
                        continue

                    entrypoint = msg.get("functionName")
                    raw_args = msg.get("args")
                    args: Dict[str, Any] = {}
                    if isinstance(raw_args, dict):
                        p1 = raw_args.get("param1")
                        if isinstance(p1, str):
                            try:
                                parsed = json.loads(p1)
                                if isinstance(parsed, dict):
                                    args = parsed
                            except Exception:
                                args = {}
                        else:
                            args = raw_args

                    try:
                        if not isinstance(entrypoint, str):
                            raise ValueError("Invalid entrypoint")

                        result = handle_entrypoint(entrypoint, args)
                        if entrypoint == "ping" and isinstance(result, dict):
                            result = dict(result)
                            result["transport"] = "pipe"

                        resp = {"ok": True, "result": result, "error": None}
                    except Exception as e:
                        tb = traceback.format_exc()
                        resp = {"ok": False, "result": None, "error": f"{e}\n{tb}"}

                    conn.sendall((json.dumps(resp, ensure_ascii=False) + "\n").encode("utf-8"))
                    conn.close()
                except Exception:
                    try:
                        conn.close()
                    except Exception:
                        pass
        finally:
            try:
                if server is not None:
                    server.close()
            except Exception:
                pass
            try:
                if self._socket_path and os.path.exists(self._socket_path):
                    os.remove(self._socket_path)
            except Exception:
                pass

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


def is_running() -> bool:
    if _daemon is None:
        return False
    try:
        return bool(_daemon._thread and _daemon._thread.is_alive())
    except Exception:
        return False


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
