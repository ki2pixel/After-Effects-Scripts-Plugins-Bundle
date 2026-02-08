from __future__ import annotations

import json
import os
from typing import Any, Dict, List, Optional

import pyshiftae as ae
import PyFx

try:
    from PyShiftBridge import mediasolution_cuts_core as ms_cuts
except Exception:
    import mediasolution_cuts_core as ms_cuts


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
            for _oid, cand in objects.items():
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
                for _oid, cand in objects.items():
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
