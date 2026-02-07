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

import mediasolution_cuts_core as ms_cuts


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


def _iter_project_item_ptrs(proj_ptr: PyFx.ProjectPtr):
    suite = PyFx.ItemSuite()
    item = suite.GetFirstProjItem(proj_ptr)
    while item:
        yield item
        item = suite.GetNextProjItem(proj_ptr, item)


def _layer_name(layer_ptr: Any) -> str:
    try:
        n = PyFx.LayerSuite().GetLayerName(layer_ptr)
        if isinstance(n, tuple) and n:
            return str(n[0])
        return str(n)
    except Exception:
        return ""


def _select_main_video_layer_index(comp_ptr: Any) -> int:
    lsuite = PyFx.LayerSuite()
    isuite = PyFx.ItemSuite()

    best_idx = -1
    best_score = -1
    try:
        num_layers = int(lsuite.GetCompNumLayers(comp_ptr) or 0)
    except Exception:
        num_layers = 0

    for i in range(num_layers):
        layer_ptr = lsuite.GetCompLayerByIndex(comp_ptr, i)
        if not layer_ptr:
            continue

        flags = lsuite.GetLayerFlags(layer_ptr)
        if not (flags & PyFx.LayerFlag.VIDEO_ACTIVE):
            continue
        if flags & PyFx.LayerFlag.LOCKED:
            continue

        src_item = lsuite.GetLayerSourceItem(layer_ptr)
        if not src_item:
            continue
        if isuite.GetItemType(src_item) != PyFx.ItemType.FOOTAGE:
            continue
        src_flags = isuite.GetItemFlags(src_item)
        if not (src_flags & PyFx.ItemFlag.HAS_VIDEO):
            continue
        if src_flags & PyFx.ItemFlag.STILL:
            continue

        score = 10
        lname = _layer_name(layer_ptr).lower()
        if "audio" in lname:
            score -= 5

        try:
            layer_index = int(lsuite.GetLayerIndex(layer_ptr) or 0)
        except Exception:
            layer_index = 0

        if score > best_score and layer_index > 0:
            best_score = score
            best_idx = layer_index

    return best_idx


def mediasolution_open_project_and_select_comp(
    aep_path: str,
    comp_name_suffix: str,
    config: Dict[str, Any],
) -> Dict[str, Any]:
    """STEP3.1 helper: open a project and return comp name + main video layer index."""
    if not isinstance(aep_path, str) or not aep_path:
        raise ValueError("Missing aep_path")
    if not os.path.exists(aep_path):
        raise ValueError(f"AEP not found: {aep_path}")

    _ = config or {}
    suffix = str(comp_name_suffix or "")

    proj = ae.Project.open(aep_path)
    proj_ptr = proj.proj

    isuite = PyFx.ItemSuite()
    csuite = PyFx.CompSuite()
    comp_items: List[Dict[str, Any]] = []

    for item_ptr in _iter_project_item_ptrs(proj_ptr):
        try:
            if isuite.GetItemType(item_ptr) != PyFx.ItemType.COMP:
                continue
        except Exception:
            continue

        try:
            name = str(isuite.GetItemName(item_ptr))
        except Exception:
            name = ""

        comp_items.append({"item": item_ptr, "name": name})

    if not comp_items:
        raise RuntimeError("No composition found in the project")

    preferred = [c for c in comp_items if suffix and suffix in (c.get("name") or "")]
    others = [c for c in comp_items if c not in preferred]
    candidates = preferred + others

    chosen_name = ""
    chosen_layer_index = -1
    for c in candidates:
        item_ptr = c.get("item")
        name = str(c.get("name") or "")
        comp_ptr = csuite.GetCompFromItem(item_ptr)
        if not comp_ptr:
            continue
        layer_index = _select_main_video_layer_index(comp_ptr)
        if layer_index > 0:
            chosen_name = name
            chosen_layer_index = int(layer_index)
            break

    if chosen_layer_index <= 0:
        raise RuntimeError("Could not find a main video layer in any composition")

    return {
        "status": "ok",
        "active_comp_name": chosen_name,
        "video_layer_index": chosen_layer_index,
        "warnings": [],
    }


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


def _clamp01(value: Any) -> float:
    try:
        f = float(value)
    except Exception:
        return 0.0
    if f < 0.0:
        return 0.0
    if f > 1.0:
        return 1.0
    return f


def _tuple_len(value: Any) -> int:
    try:
        return len(value)
    except Exception:
        return 0


def _load_tracking_data_by_frame(path: str) -> Dict[int, List[Dict[str, Any]]]:
    if not path or not os.path.exists(path):
        return {}

    try:
        with open(path, "r", encoding="utf-8") as f:
            root = json.load(f)
    except Exception:
        return {}

    if not isinstance(root, dict):
        return {}

    raw_dbf = root.get("dataByFrame")
    if isinstance(raw_dbf, dict):
        out: Dict[int, List[Dict[str, Any]]] = {}
        for k, v in raw_dbf.items():
            try:
                ki = int(k)
            except Exception:
                continue
            if isinstance(v, list):
                out[ki] = [x for x in v if isinstance(x, dict)]
        return out

    frames = root.get("frames_analysis")
    if isinstance(frames, list):
        out = {}
        for row in frames:
            if not isinstance(row, dict):
                continue
            fnum = row.get("frame")
            try:
                fi = int(fnum)
            except Exception:
                continue
            objs = row.get("objects")
            if isinstance(objs, list):
                out[fi] = [x for x in objs if isinstance(x, dict)]
        return out

    return {}


def _compute_presence_score(presence: int, avg_confidence: float, enable_weighting: bool, confidence_weight: float) -> float:
    if not enable_weighting:
        return float(presence)
    w = float(confidence_weight)
    if w < 0.0:
        w = 0.0
    return float(presence) * (1.0 + (_clamp01(avg_confidence) * w))


def _calculate_stats(values: List[float]) -> Dict[str, float]:
    if not values:
        return {"min": 0.0, "max": 0.0, "spread": 0.0, "average": 0.0}
    min_v = values[0]
    max_v = values[0]
    s = 0.0
    for v in values:
        s += v
        if v < min_v:
            min_v = v
        if v > max_v:
            max_v = v
    avg = s / float(len(values))
    return {"min": float(min_v), "max": float(max_v), "spread": float(max_v - min_v), "average": float(avg)}


def _get_label_enum(label_index: int) -> PyFx.Label:
    if label_index <= 0:
        return PyFx.Label.NO_LABEL
    if label_index >= 1 and label_index <= 16:
        return getattr(PyFx.Label, f"LABEL_{label_index}")
    return PyFx.Label.NO_LABEL


def _set_layer_label(layer: ae.Layer, label_index: int) -> None:
    PyFx.LayerSuite().SetLayerLabel(layer.layer, _get_label_enum(int(label_index)))


def _recenter_layer_x(layer: ae.Layer, center_x: float, comp_width: float) -> None:
    anchor_prop = layer.get_property(PyFx.LayerStream.ANCHORPOINT)
    pos_prop = layer.get_property(PyFx.LayerStream.POSITION)

    anchor = anchor_prop.get_value(PyFx.LTimeMode.CompTime, 0.0, False)
    pos = pos_prop.get_value(PyFx.LTimeMode.CompTime, 0.0, False)

    if _tuple_len(anchor) >= 3:
        anchor_prop.set_value((float(center_x), float(anchor[1]), float(anchor[2])))
    else:
        anchor_prop.set_value((float(center_x), float(anchor[1])))

    if comp_width > 0.0:
        if _tuple_len(pos) >= 3:
            pos_prop.set_value((float(comp_width) / 2.0, float(pos[1]), float(pos[2])))
        else:
            pos_prop.set_value((float(comp_width) / 2.0, float(pos[1])))


def mediasolution_apply_auto_recentering(
    tracking_json_path: Optional[str],
    config: Dict[str, Any],
) -> Dict[str, Any]:
    layer = ae.Layer.active_layer()
    if layer is None:
        raise RuntimeError("No active layer. Select a layer and retry.")

    cfg = config or {}
    apply_to_all_layers = bool(cfg.get("apply_to_all_layers", False))

    comp = layer.parent_comp
    try:
        frame_rate = float(comp.frame_rate) if comp else 0.0
    except Exception:
        frame_rate = 0.0
    if frame_rate <= 0.0:
        raise ValueError("Invalid comp frame_rate")

    comp_width = 0.0
    try:
        comp_width = float(comp.dimensions[0]) if comp and comp.dimensions else 0.0
    except Exception:
        comp_width = 0.0

    data_by_frame = _load_tracking_data_by_frame(tracking_json_path or "") if tracking_json_path else {}

    enable_weighting = bool(cfg.get("ENABLE_CONFIDENCE_WEIGHTING", True))
    confidence_weight = float(cfg.get("CONFIDENCE_WEIGHT", 0.0) or 0.0)
    spread_threshold = float(cfg.get("SPREAD_THRESHOLD", 200.0) or 200.0)
    label_high_spread = int(cfg.get("LABEL_HIGH_SPREAD", 12) or 12)
    label_stable = int(cfg.get("LABEL_STABLE", 3) or 3)
    score_threshold = float(cfg.get("score_threshold", 0.0) or 0.0)
    area_threshold = float(cfg.get("area_threshold", 0.0) or 0.0)
    disable_undo_group = bool(cfg.get("DISABLE_UNDO_GROUP", False))

    layers: List[ae.Layer]
    if apply_to_all_layers and comp:
        layers = [l for l in comp.layers]
    else:
        layers = [layer]

    layers_updated = 0
    notes: List[str] = []

    def _apply() -> None:
        nonlocal layers_updated
        for target in layers:
            try:
                start_t = float(target.in_point)
            except Exception:
                start_t = 0.0
            try:
                end_t = start_t + float(target.duration)
            except Exception:
                end_t = start_t

            min_frame = int(start_t * frame_rate)
            max_frame = int(end_t * frame_rate)
            if max_frame < min_frame:
                max_frame = min_frame

            objects: Dict[str, Dict[str, Any]] = {}
            if data_by_frame:
                for f in range(min_frame, max_frame + 1):
                    frame_objs = data_by_frame.get(f)
                    if not frame_objs:
                        continue
                    for obj in frame_objs:
                        obj_id = obj.get("id")
                        if not isinstance(obj_id, str) or not obj_id:
                            continue
                        try:
                            cx = float(obj.get("centroid_x"))
                        except Exception:
                            continue

                        conf = _clamp01(obj.get("confidence"))
                        try:
                            bbox_surface = float(obj.get("bbox_surface") or 0.0)
                        except Exception:
                            bbox_surface = 0.0
                        if bbox_surface < 0.0:
                            bbox_surface = 0.0

                        if obj_id not in objects:
                            objects[obj_id] = {
                                "id": obj_id,
                                "source": obj.get("source"),
                                "x_values": [],
                                "confidence_values": [],
                                "bbox_surfaces": [],
                                "total_bbox_surface": 0.0,
                            }
                        d = objects[obj_id]
                        d["x_values"].append(cx)
                        d["confidence_values"].append(conf)
                        d["bbox_surfaces"].append(bbox_surface)
                        d["total_bbox_surface"] += bbox_surface

            best = None
            best_score = -1.0
            best_avg_surf = -1.0
            for oid, cand in objects.items():
                x_vals = cand.get("x_values") or []
                presence = len(x_vals)
                if presence <= 0:
                    continue
                conf_vals = cand.get("confidence_values") or []
                avg_conf = (sum(conf_vals) / float(len(conf_vals))) if conf_vals else 0.0
                score = _compute_presence_score(presence, float(avg_conf), enable_weighting, confidence_weight)
                bbox_vals = cand.get("bbox_surfaces") or []
                avg_surf = (float(cand.get("total_bbox_surface") or 0.0) / float(len(bbox_vals))) if bbox_vals else 0.0

                if score > best_score or (score == best_score and avg_surf > best_avg_surf):
                    best = cand
                    best_score = score
                    best_avg_surf = avg_surf

            if best and best_score >= score_threshold and best_avg_surf >= area_threshold:
                stats = _calculate_stats(best.get("x_values") or [])
                center_x = float(stats.get("average") or 0.0)
                spread = float(stats.get("spread") or 0.0)
                is_high_spread = spread > spread_threshold and best.get("source") == "face_landmarker"
                label_index = label_high_spread if is_high_spread else label_stable

                _recenter_layer_x(target, center_x, comp_width)
                _set_layer_label(target, label_index)
                layers_updated += 1
            else:
                if comp_width > 0.0:
                    _recenter_layer_x(target, comp_width / 2.0, comp_width)
                    layers_updated += 1
                else:
                    notes.append("comp_width_unknown")

    if disable_undo_group:
        _apply()
    else:
        with ae.UndoGroup("MediaSolution: Auto-Recentering"):
            _apply()

    return {
        "status": "success",
        "layers_updated": layers_updated,
        "notes": notes,
    }


def mediasolution_import_images_from_folder(folder_path: str, extensions: List[str]) -> Dict[str, Any]:
    if not isinstance(folder_path, str) or not folder_path:
        raise ValueError("Missing folder_path")
    if not os.path.isdir(folder_path):
        raise ValueError(f"Folder not found: {folder_path}")

    exts = [str(e or "").lower().lstrip(".") for e in (extensions or [])]
    exts = [e for e in exts if e]
    if not exts:
        return {"imported": 0, "skipped": 0, "errors": 0}

    proj = ae.Project()
    imported = 0
    skipped = 0
    errors = 0

    for name in os.listdir(folder_path):
        p = os.path.join(folder_path, name)
        if not os.path.isfile(p):
            continue
        ext = os.path.splitext(name)[1].lower().lstrip(".")
        if ext not in exts:
            skipped += 1
            continue
        try:
            proj.Import(p)
            imported += 1
        except Exception:
            errors += 1

    return {"imported": imported, "skipped": skipped, "errors": errors}


def mediasolution_batch_prepare_active_layer(config: Dict[str, Any]) -> Dict[str, Any]:
    layer = ae.Layer.active_layer()
    if layer is None:
        raise RuntimeError("No active layer. Select a layer and retry.")

    cfg = config or {}
    disable_undo_group = bool(cfg.get("DISABLE_UNDO_GROUP", False))

    try:
        target_width = int(cfg.get("targetCompWidth", 1080) or 1080)
        target_height = int(cfg.get("targetCompHeight", 1920) or 1920)
    except Exception:
        target_width = 1080
        target_height = 1920

    try:
        scale_x = float(cfg.get("defaultVideoScaleX", 180.0) or 180.0)
        scale_y = float(cfg.get("defaultVideoScaleY", 180.0) or 180.0)
    except Exception:
        scale_x = 180.0
        scale_y = 180.0

    comp = layer.parent_comp
    if comp is None:
        raise RuntimeError("Active layer has no parent comp")

    def _apply() -> None:
        PyFx.CompSuite().SetCompDimensions(comp.comp, int(target_width), int(target_height))

        comp_width = 0.0
        try:
            comp_width = float(comp.dimensions[0]) if comp.dimensions else 0.0
        except Exception:
            comp_width = 0.0

        # Anchor/Position: top-center like legacy JSX.
        src_dims = None
        try:
            src_dims = layer.source_item.dimensions
        except Exception:
            src_dims = None

        layer_width = float(src_dims[0]) if src_dims and len(src_dims) >= 2 else 0.0
        anchor_prop = layer.get_property(PyFx.LayerStream.ANCHORPOINT)
        pos_prop = layer.get_property(PyFx.LayerStream.POSITION)
        anchor = anchor_prop.get_value(PyFx.LTimeMode.CompTime, 0.0, False)
        pos = pos_prop.get_value(PyFx.LTimeMode.CompTime, 0.0, False)

        anchor_x = (layer_width / 2.0) if layer_width > 0.0 else float(anchor[0])
        pos_x = (comp_width / 2.0) if comp_width > 0.0 else float(pos[0])

        if _tuple_len(anchor) >= 3:
            anchor_prop.set_value((anchor_x, 0.0, float(anchor[2])))
        else:
            anchor_prop.set_value((anchor_x, 0.0))

        if _tuple_len(pos) >= 3:
            pos_prop.set_value((pos_x, 0.0, float(pos[2])))
        else:
            pos_prop.set_value((pos_x, 0.0))

        scale_prop = layer.get_property(PyFx.LayerStream.SCALE)
        scale_v = scale_prop.get_value(PyFx.LTimeMode.CompTime, 0.0, False)
        if _tuple_len(scale_v) >= 3:
            scale_prop.set_value((float(scale_x), float(scale_y), float(scale_v[2])))
        else:
            scale_prop.set_value((float(scale_x), float(scale_y)))

    if disable_undo_group:
        _apply()
    else:
        with ae.UndoGroup("MediaSolution: Batch Prepare"):
            _apply()

    return {"status": "ok"}


def mediasolution_create_base_aep_for_video(
    video_path: str,
    aep_path: str,
    comp_name: str,
    config: Dict[str, Any],
) -> Dict[str, Any]:
    if not isinstance(video_path, str) or not video_path:
        raise ValueError("Missing video_path")
    if not os.path.exists(video_path):
        raise ValueError(f"Video not found: {video_path}")
    if not isinstance(aep_path, str) or not aep_path:
        raise ValueError("Missing aep_path")
    if not isinstance(comp_name, str) or not comp_name:
        raise ValueError("Missing comp_name")

    cfg = config or {}
    disable_undo_group = bool(cfg.get("DISABLE_UNDO_GROUP", False))
    try:
        min_frame_rate = float(cfg.get("min_frame_rate", 25.0) or 25.0)
    except Exception:
        min_frame_rate = 25.0
    if min_frame_rate <= 0.0:
        min_frame_rate = 25.0

    proj = ae.Project()
    imported: Optional[ae.FootageItem] = None
    comp_ptr = None

    def _apply() -> None:
        nonlocal imported, comp_ptr
        imported = ae.FootageItem.create(video_path, comp_name)
        dims = None
        try:
            dims = imported.dimensions
        except Exception:
            dims = None

        width = int(dims[0]) if dims and len(dims) >= 2 else 1920
        height = int(dims[1]) if dims and len(dims) >= 2 else 1080

        try:
            pixel_aspect = float(imported.pixel_aspect)
        except Exception:
            pixel_aspect = 1.0
        if pixel_aspect <= 0.0:
            pixel_aspect = 1.0

        try:
            duration = float(imported.duration)
        except Exception:
            duration = 1.0
        if duration < 1.0:
            duration = 1.0

        # PyFx.CompSuite.CreateComp signature uses Ratio/Time.
        proj_ptr = PyFx.ProjSuite().GetProjectByIndex(0)
        root = PyFx.ProjSuite().GetProjectRootFolder(proj_ptr)
        pa = PyFx.Ratio(int(pixel_aspect * 1000.0), 1000)
        fr = PyFx.Ratio(int(min_frame_rate * 1000.0), 1000)
        comp_ptr = PyFx.CompSuite().CreateComp(root, comp_name, int(width), int(height), pa, PyFx.Time(float(duration)), fr)

        PyFx.LayerSuite().AddLayer(imported.item, comp_ptr)
        proj.save(aep_path)

    try:
        if disable_undo_group:
            _apply()
        else:
            with ae.UndoGroup("MediaSolution: Create Base AEP"):
                _apply()
    finally:
        # Cleanup: remove created items from the current project to keep the batch stable.
        try:
            if comp_ptr is not None:
                comp_item_ptr = PyFx.CompSuite().GetItemFromComp(comp_ptr)
                if comp_item_ptr:
                    ae.Item(comp_item_ptr).delete()
        except Exception:
            pass
        try:
            if imported is not None:
                imported.delete()
        except Exception:
            pass

    return {"status": "ok", "aep_path": aep_path, "comp_name": comp_name}


def mediasolution_apply_cuts_active_layer(
    csv_path: str,
    frame_rate: float,
    comp_duration: Optional[float],
    snap_factor: float,
    tracking_json_path: Optional[str],
    config: Dict[str, Any],
) -> Dict[str, Any]:
    layer = ae.Layer.active_layer()
    if layer is None:
        raise RuntimeError("No active layer. Select a layer and retry.")

    if not csv_path or not os.path.exists(csv_path):
        raise ValueError(f"CSV not found: {csv_path}")

    if frame_rate <= 0:
        raise ValueError("frame_rate must be > 0")

    with open(csv_path, "r", encoding="utf-8-sig") as f:
        csv_content = f.read()

    raw_segments = ms_cuts.parse_segments_from_csv_content(csv_content, frame_rate)
    segments = ms_cuts.snap_and_clamp_segments(raw_segments, frame_rate, comp_duration, snap_factor)
    if not segments:
        return {"created": 0, "segments": [], "notes": ["no_segments"]}

    data_by_frame = _load_tracking_data_by_frame(tracking_json_path or "") if tracking_json_path else {}

    enable_weighting = bool(config.get("ENABLE_CONFIDENCE_WEIGHTING", True))
    confidence_weight = float(config.get("CONFIDENCE_WEIGHT", 0.0) or 0.0)
    spread_threshold = float(config.get("SPREAD_THRESHOLD", 200.0) or 200.0)
    label_high_spread = int(config.get("LABEL_HIGH_SPREAD", 12) or 12)
    label_stable = int(config.get("LABEL_STABLE", 3) or 3)

    comp = layer.parent_comp
    comp_width = float(comp.dimensions[0]) if comp and comp.dimensions else 0.0

    created = 0
    disable_undo_group = bool(config.get("DISABLE_UNDO_GROUP", False))

    def _apply() -> None:
        nonlocal created
        for seg in segments:
            seg_dur = float(seg.end_time - seg.start_time)
            if seg_dur <= 0:
                continue

            new_layer = layer.duplicate()
            new_layer.name = (
                "Segment "
                + str(seg.num)
                + " ("
                + ms_cuts.seconds_to_timecode(seg.start_time)
                + " - "
                + ms_cuts.seconds_to_timecode(seg.end_time)
                + ")"
            )

            PyFx.LayerSuite().SetLayerInPointAndDuration(
                new_layer.layer,
                PyFx.LTimeMode.CompTime,
                PyFx.Time(float(seg.start_time)),
                PyFx.Time(float(seg_dur)),
            )

            recentered = False
            if data_by_frame:
                min_frame = int(seg.start_time * frame_rate)
                max_frame = int(seg.end_time * frame_rate)
                objects: Dict[str, Dict[str, Any]] = {}
                for f in range(min_frame, max_frame + 1):
                    frame_objs = data_by_frame.get(f)
                    if not frame_objs:
                        continue
                    for obj in frame_objs:
                        obj_id = obj.get("id")
                        if not isinstance(obj_id, str) or not obj_id:
                            continue
                        try:
                            cx = float(obj.get("centroid_x"))
                        except Exception:
                            continue

                        conf = _clamp01(obj.get("confidence"))
                        try:
                            bbox_surface = float(obj.get("bbox_surface") or 0.0)
                        except Exception:
                            bbox_surface = 0.0
                        if bbox_surface < 0.0:
                            bbox_surface = 0.0

                        if obj_id not in objects:
                            objects[obj_id] = {
                                "id": obj_id,
                                "source": obj.get("source"),
                                "x_values": [],
                                "confidence_values": [],
                                "bbox_surfaces": [],
                                "total_bbox_surface": 0.0,
                            }
                        d = objects[obj_id]
                        d["x_values"].append(cx)
                        d["confidence_values"].append(conf)
                        d["bbox_surfaces"].append(bbox_surface)
                        d["total_bbox_surface"] += bbox_surface

                best = None
                best_score = -1.0
                best_avg_surf = -1.0
                for oid, cand in objects.items():
                    x_vals = cand.get("x_values") or []
                    presence = len(x_vals)
                    if presence <= 0:
                        continue
                    conf_vals = cand.get("confidence_values") or []
                    avg_conf = (sum(conf_vals) / float(len(conf_vals))) if conf_vals else 0.0
                    score = _compute_presence_score(presence, float(avg_conf), enable_weighting, confidence_weight)
                    bbox_vals = cand.get("bbox_surfaces") or []
                    avg_surf = (float(cand.get("total_bbox_surface") or 0.0) / float(len(bbox_vals))) if bbox_vals else 0.0

                    if score > best_score or (score == best_score and avg_surf > best_avg_surf):
                        best = cand
                        best_score = score
                        best_avg_surf = avg_surf

                if best:
                    stats = _calculate_stats(best.get("x_values") or [])
                    center_x = float(stats.get("average") or 0.0)
                    spread = float(stats.get("spread") or 0.0)
                    is_high_spread = spread > spread_threshold and best.get("source") == "face_landmarker"
                    label_index = label_high_spread if is_high_spread else label_stable

                    anchor_prop = new_layer.get_property(PyFx.LayerStream.ANCHORPOINT)
                    pos_prop = new_layer.get_property(PyFx.LayerStream.POSITION)
                    anchor = anchor_prop.get_value(PyFx.LTimeMode.CompTime, 0.0, False)
                    pos = pos_prop.get_value(PyFx.LTimeMode.CompTime, 0.0, False)

                    if _tuple_len(anchor) >= 3:
                        anchor_prop.set_value((center_x, float(anchor[1]), float(anchor[2])))
                    else:
                        anchor_prop.set_value((center_x, float(anchor[1])))

                    if comp_width > 0:
                        if _tuple_len(pos) >= 3:
                            pos_prop.set_value((comp_width / 2.0, float(pos[1]), float(pos[2])))
                        else:
                            pos_prop.set_value((comp_width / 2.0, float(pos[1])))

                    _set_layer_label(new_layer, label_index)
                    recentered = True

            if not recentered:
                if bool(config.get("DEFAULT_RECENTER_TO_COMP_CENTER", False)) and comp_width > 0:
                    anchor_prop = new_layer.get_property(PyFx.LayerStream.ANCHORPOINT)
                    pos_prop = new_layer.get_property(PyFx.LayerStream.POSITION)
                    anchor = anchor_prop.get_value(PyFx.LTimeMode.CompTime, 0.0, False)
                    pos = pos_prop.get_value(PyFx.LTimeMode.CompTime, 0.0, False)

                    center_x = float(comp_width) / 2.0
                    if _tuple_len(anchor) >= 3:
                        anchor_prop.set_value((center_x, float(anchor[1]), float(anchor[2])))
                    else:
                        anchor_prop.set_value((center_x, float(anchor[1])))

                    if _tuple_len(pos) >= 3:
                        pos_prop.set_value((center_x, float(pos[1]), float(pos[2])))
                    else:
                        pos_prop.set_value((center_x, float(pos[1])))

            created += 1

        if created > 0:
            layer.delete()

    if disable_undo_group:
        _apply()
    else:
        with ae.UndoGroup("MediaSolution: Apply Cuts"):
            _apply()

    return {
        "created": created,
        "segments": [
            {
                "num": s.num,
                "startTime": s.start_time,
                "endTime": s.end_time,
                "startTc": ms_cuts.seconds_to_timecode(s.start_time),
                "endTc": ms_cuts.seconds_to_timecode(s.end_time),
            }
            for s in segments
        ],
        "notes": [],
    }


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

    if entrypoint == "mediasolution_apply_cuts_active_layer":
        csv_path = args.get("csv_path")
        if not isinstance(csv_path, str) or not csv_path:
            raise ValueError("Missing args.csv_path")

        frame_rate = args.get("frame_rate")
        try:
            fr = float(frame_rate)
        except Exception:
            fr = 0.0
        if fr <= 0.0:
            raise ValueError("Invalid args.frame_rate")

        comp_duration = args.get("comp_duration")
        try:
            cd = float(comp_duration) if comp_duration is not None else None
        except Exception:
            cd = None

        snap_factor = args.get("snap_factor")
        try:
            sf = float(snap_factor) if snap_factor is not None else 1.5
        except Exception:
            sf = 1.5

        tracking_json_path = args.get("tracking_json_path")
        if not isinstance(tracking_json_path, str):
            tracking_json_path = None

        cfg = args.get("config")
        if not isinstance(cfg, dict):
            cfg = {}

        return mediasolution_apply_cuts_active_layer(
            csv_path=csv_path,
            frame_rate=fr,
            comp_duration=cd,
            snap_factor=sf,
            tracking_json_path=tracking_json_path,
            config=cfg,
        )

    if entrypoint == "mediasolution_apply_auto_recentering":
        tracking_json_path = args.get("tracking_json_path")
        if not isinstance(tracking_json_path, str):
            tracking_json_path = None

        cfg = args.get("config")
        if not isinstance(cfg, dict):
            cfg = {}

        return mediasolution_apply_auto_recentering(tracking_json_path=tracking_json_path, config=cfg)

    if entrypoint == "mediasolution_import_images_from_folder":
        folder_path = args.get("folder_path")
        if not isinstance(folder_path, str) or not folder_path:
            raise ValueError("Missing args.folder_path")
        extensions = args.get("extensions")
        if not isinstance(extensions, list):
            extensions = []
        return mediasolution_import_images_from_folder(folder_path=folder_path, extensions=extensions)

    if entrypoint == "mediasolution_batch_prepare_active_layer":
        cfg = args.get("config")
        if not isinstance(cfg, dict):
            cfg = {}
        return mediasolution_batch_prepare_active_layer(config=cfg)

    if entrypoint == "mediasolution_create_base_aep_for_video":
        video_path = args.get("video_path")
        if not isinstance(video_path, str) or not video_path:
            raise ValueError("Missing args.video_path")
        aep_path = args.get("aep_path")
        if not isinstance(aep_path, str) or not aep_path:
            raise ValueError("Missing args.aep_path")
        comp_name = args.get("comp_name")
        if not isinstance(comp_name, str) or not comp_name:
            raise ValueError("Missing args.comp_name")
        cfg = args.get("config")
        if not isinstance(cfg, dict):
            cfg = {}
        return mediasolution_create_base_aep_for_video(video_path=video_path, aep_path=aep_path, comp_name=comp_name, config=cfg)

    if entrypoint == "mediasolution_open_project_and_select_comp":
        aep_path = args.get("aep_path")
        if not isinstance(aep_path, str) or not aep_path:
            raise ValueError("Missing args.aep_path")
        suffix = args.get("comp_name_suffix")
        if not isinstance(suffix, str):
            suffix = ""
        cfg = args.get("config")
        if not isinstance(cfg, dict):
            cfg = {}
        return mediasolution_open_project_and_select_comp(aep_path=aep_path, comp_name_suffix=suffix, config=cfg)

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
