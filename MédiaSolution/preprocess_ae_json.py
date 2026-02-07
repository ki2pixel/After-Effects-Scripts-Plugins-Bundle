#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
import json
import logging
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple


logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

VIDEO_EXTENSIONS = (".mp4", ".mov", ".avi", ".mkv", ".webm")
AUDIO_SUFFIX = "_audio.json"
TRACKING_SUFFIX = "_tracking.json"
AE_PREPROCESSED_SUFFIX = "_ae.json"


DEFAULT_ANALYZER_CONFIG: Dict[str, Any] = {
    "SPREAD_THRESHOLD": 200,
    "ENABLE_CONFIDENCE_WEIGHTING": True,
    "CONFIDENCE_WEIGHT": 0.35,
    "LABEL_HIGH_SPREAD": 12,
    "LABEL_STABLE": 3,
}


def setup_logging(log_dir: str) -> str:
    os.makedirs(log_dir, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    log_path = os.path.join(log_dir, f"preprocess_ae_{timestamp}.log")

    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")

    fh = logging.FileHandler(log_path, encoding="utf-8")
    fh.setLevel(logging.INFO)
    fh.setFormatter(formatter)

    ch = logging.StreamHandler(sys.stdout)
    ch.setLevel(logging.INFO)
    ch.setFormatter(formatter)

    logger.handlers.clear()
    logger.addHandler(fh)
    logger.addHandler(ch)
    logger.propagate = False

    logger.info("Log file initialized: %s", log_path)
    return log_path


def _load_json(path: Path) -> Optional[Dict[str, Any]]:
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data if isinstance(data, dict) else None
    except Exception as e:
        logger.warning("Impossible de lire JSON '%s': %s", path, e)
        return None


def _write_json_atomically(path: Path, payload: Dict[str, Any]) -> None:
    tmp_path = path.with_suffix(path.suffix + ".tmp")
    with open(tmp_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)
    os.replace(tmp_path, path)


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


def _normalize_str_list(value: Any) -> List[str]:
    if value is None:
        return []
    if isinstance(value, list):
        out: List[str] = []
        for v in value:
            if isinstance(v, str) and v:
                out.append(v)
        return out
    if isinstance(value, str) and value:
        if "," in value:
            parts = [p.strip() for p in value.split(",")]
            return [p for p in parts if p]
        return [value]
    return []


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


def _compute_presence_score(presence: int, avg_confidence: float, config: Dict[str, Any]) -> float:
    if not config.get("ENABLE_CONFIDENCE_WEIGHTING", True):
        return float(presence)
    weight = config.get("CONFIDENCE_WEIGHT", 0.0)
    try:
        w = float(weight)
    except Exception:
        w = 0.0
    if w < 0.0:
        w = 0.0
    return float(presence) * (1.0 + (_clamp01(avg_confidence) * w))


def _find_audio_json_for_video_json(video_json_path: Path) -> Optional[Path]:
    if not video_json_path.exists():
        return None
    base_name = video_json_path.name
    stem = base_name
    if stem.lower().endswith("_ae.json"):
        stem = stem[: -len("_ae.json")]
    elif stem.lower().endswith("_tracking.json"):
        stem = stem[: -len("_tracking.json")]
    elif stem.lower().endswith(".json"):
        stem = stem[: -len(".json")]

    audio_path = video_json_path.parent / f"{stem}{AUDIO_SUFFIX}"
    return audio_path if audio_path.exists() else None


def _load_ae_or_tracking_index(video_json_path: Path) -> Optional[Dict[str, Any]]:
    root = _load_json(video_json_path)
    if not root:
        return None

    if isinstance(root.get("dataByFrame"), dict):
        return root

    frames = _extract_frames_analysis(root)
    if not frames:
        return None

    data_by_frame, max_frame = _index_reduced_tracking_frames(frames)
    out: Dict[str, Any] = {
        "dataByFrame": {str(k): v for k, v in data_by_frame.items()},
        "maxFrame": max_frame,
    }
    if isinstance(root.get("tracking_analytics"), dict):
        out["tracking_analytics"] = root.get("tracking_analytics")
    if isinstance(root.get("expression_summary"), dict):
        out["expression_summary"] = root.get("expression_summary")
    if isinstance(root.get("temporal_alignment"), dict):
        out["temporal_alignment"] = root.get("temporal_alignment")
    if root.get("fps") is not None:
        out["fps"] = root.get("fps")
    if root.get("total_frames") is not None:
        out["total_frames"] = root.get("total_frames")
    return out


def _parse_int(value: Any) -> Optional[int]:
    try:
        return int(value)
    except Exception:
        return None


def _compute_video_frame_scale(video_max_frame: int, reference_max_frame: int) -> float:
    if video_max_frame <= 0 or reference_max_frame <= 0:
        return 1.0
    diff_ratio = abs(float(video_max_frame - reference_max_frame)) / float(reference_max_frame)
    if diff_ratio > 0.05:
        return float(video_max_frame) / float(reference_max_frame)
    return 1.0


def _to_int_keyed_map(raw_map: Any) -> Dict[int, Any]:
    if not isinstance(raw_map, dict):
        return {}
    out: Dict[int, Any] = {}
    for k, v in raw_map.items():
        ki = _parse_int(k)
        if ki is None:
            continue
        out[ki] = v
    return out


def _analyze_layer(
    layer_info: Dict[str, Any],
    data_by_frame: Dict[int, List[Dict[str, Any]]],
    audio_by_frame: Dict[int, Dict[str, Any]],
    config: Dict[str, Any],
    video_frame_scale: float,
    video_max_frame: int,
) -> Optional[Dict[str, Any]]:
    min_frame = _parse_int(layer_info.get("in_frame"))
    max_frame = _parse_int(layer_info.get("out_frame"))
    if min_frame is None or max_frame is None:
        return None

    objects_in_layer: Dict[str, Dict[str, Any]] = {}

    layer_scale_raw = layer_info.get("video_scale", 1.0)
    try:
        layer_scale = float(layer_scale_raw)
    except Exception:
        layer_scale = 1.0
    if layer_scale <= 0.0:
        layer_scale = 1.0

    effective_frame_scale = video_frame_scale * layer_scale

    for frame in range(min_frame, max_frame + 1):
        video_frame = frame
        if effective_frame_scale != 1.0:
            mapped = int(round(float(frame) * effective_frame_scale))
            if mapped < 1:
                mapped = 1
            if video_max_frame > 0 and mapped > video_max_frame:
                mapped = video_max_frame
            video_frame = mapped

        frame_objs = data_by_frame.get(video_frame)
        audio_info = audio_by_frame.get(frame)

        if not isinstance(frame_objs, list):
            continue

        for obj in frame_objs:
            if not isinstance(obj, dict):
                continue
            obj_id = obj.get("id")
            if not isinstance(obj_id, str) or not obj_id:
                continue

            source = obj.get("source")
            label = obj.get("label")

            cx = obj.get("centroid_x")
            try:
                cx_f = float(cx)
            except Exception:
                continue

            bbox_surface = 0.0
            try:
                bbox_surface = float(obj.get("bbox_surface") or 0.0)
            except Exception:
                bbox_surface = 0.0
            if bbox_surface < 0.0:
                bbox_surface = 0.0

            conf_f = _clamp01(obj.get("confidence"))
            speakers = _normalize_str_list(obj.get("video_speakers"))

            if obj_id not in objects_in_layer:
                objects_in_layer[obj_id] = {
                    "id": obj_id,
                    "source": source,
                    "label": label,
                    "x_values": [],
                    "bbox_surfaces": [],
                    "confidence_values": [],
                    "audio_confirm_count": 0,
                    "total_bbox_surface": 0.0,
                    "total_confidence": 0.0,
                    "avg_bbox_surface": 0.0,
                    "avg_confidence": 0.0,
                    "video_speakers": speakers,
                }

            d = objects_in_layer[obj_id]
            d["x_values"].append(cx_f)
            d["bbox_surfaces"].append(bbox_surface)
            d["confidence_values"].append(conf_f)
            d["total_bbox_surface"] += bbox_surface
            d["total_confidence"] += conf_f

            is_eligible_for_audio = (source == "face_landmarker") or (
                source == "object_detector" and label == "person"
            )
            if is_eligible_for_audio and audio_info and audio_info.get("is_speech_present") and speakers:
                active_labels = _normalize_str_list(audio_info.get("active_speaker_labels"))
                if active_labels and (set(active_labels) & set(speakers)):
                    d["audio_confirm_count"] += 1

    if not objects_in_layer:
        return None

    best_audio_face: Optional[Dict[str, Any]] = None
    best_audio_person: Optional[Dict[str, Any]] = None
    best_face: Optional[Dict[str, Any]] = None
    best_person: Optional[Dict[str, Any]] = None
    best_fallback: Optional[Dict[str, Any]] = None

    max_audio_face_confirm = 0
    max_audio_person_confirm = 0
    max_face_presence = -1.0
    max_person_presence = -1.0
    max_fallback_presence = -1.0
    max_audio_face_bbox = 0.0
    max_face_bbox = 0.0

    for oid, obj in objects_in_layer.items():
        x_vals: List[float] = obj.get("x_values") or []
        presence = len(x_vals)
        if presence <= 0:
            continue

        bbox_count = len(obj.get("bbox_surfaces") or [])
        conf_count = len(obj.get("confidence_values") or [])
        obj["avg_bbox_surface"] = (obj["total_bbox_surface"] / float(bbox_count)) if bbox_count > 0 else 0.0
        obj["avg_confidence"] = (obj["total_confidence"] / float(conf_count)) if conf_count > 0 else 0.0

        presence_score = _compute_presence_score(presence, float(obj["avg_confidence"]), config)

        source = obj.get("source")
        label = obj.get("label")
        audio_confirm = int(obj.get("audio_confirm_count") or 0)

        if source == "face_landmarker":
            if audio_confirm > 0:
                current_best_score = (
                    _compute_presence_score(
                        len(best_audio_face.get("x_values") or []),
                        float(best_audio_face.get("avg_confidence") or 0.0),
                        config,
                    )
                    if best_audio_face
                    else -1.0
                )
                if (
                    audio_confirm > max_audio_face_confirm
                    or (audio_confirm == max_audio_face_confirm and presence_score > current_best_score)
                    or (
                        audio_confirm == max_audio_face_confirm
                        and presence_score == current_best_score
                        and float(obj["avg_bbox_surface"]) > max_audio_face_bbox
                    )
                ):
                    best_audio_face = obj
                    max_audio_face_confirm = audio_confirm
                    max_audio_face_bbox = float(obj["avg_bbox_surface"])

            if presence_score > max_face_presence or (
                presence_score == max_face_presence and float(obj["avg_bbox_surface"]) > max_face_bbox
            ):
                best_face = obj
                max_face_presence = presence_score
                max_face_bbox = float(obj["avg_bbox_surface"])

        elif source == "object_detector" and label == "person":
            if audio_confirm > 0:
                current_best_score = (
                    _compute_presence_score(
                        len(best_audio_person.get("x_values") or []),
                        float(best_audio_person.get("avg_confidence") or 0.0),
                        config,
                    )
                    if best_audio_person
                    else -1.0
                )
                if (
                    audio_confirm > max_audio_person_confirm
                    or (audio_confirm == max_audio_person_confirm and presence_score > current_best_score)
                ):
                    best_audio_person = obj
                    max_audio_person_confirm = audio_confirm

            if presence_score > max_person_presence:
                best_person = obj
                max_person_presence = presence_score

        if presence_score > max_fallback_presence:
            best_fallback = obj
            max_fallback_presence = presence_score

    target = best_audio_face or best_audio_person or best_face or best_person or best_fallback
    if not target:
        return None

    stats = _calculate_stats(target.get("x_values") or [])
    spread_threshold = config.get("SPREAD_THRESHOLD", DEFAULT_ANALYZER_CONFIG["SPREAD_THRESHOLD"])
    try:
        spread_threshold_f = float(spread_threshold)
    except Exception:
        spread_threshold_f = float(DEFAULT_ANALYZER_CONFIG["SPREAD_THRESHOLD"])

    label_high = int(config.get("LABEL_HIGH_SPREAD", DEFAULT_ANALYZER_CONFIG["LABEL_HIGH_SPREAD"]))
    label_stable = int(config.get("LABEL_STABLE", DEFAULT_ANALYZER_CONFIG["LABEL_STABLE"]))

    label_to_apply = label_stable
    if stats["spread"] > spread_threshold_f and target.get("source") == "face_landmarker":
        label_to_apply = label_high

    reason = "fallback"
    if best_audio_face and target is best_audio_face:
        reason = "audio_confirm_face"
    elif best_audio_person and target is best_audio_person:
        reason = "audio_confirm_person"
    elif best_face and target is best_face:
        reason = "face_presence"
    elif best_person and target is best_person:
        reason = "person_presence"

    return {
        "center_x": stats["average"],
        "spread": stats["spread"],
        "label_color": label_to_apply,
        "selected_id": target.get("id"),
        "reason": reason,
    }


def analyze_manifest(manifest: Dict[str, Any]) -> Dict[str, Any]:
    raw_layers = manifest.get("layers")
    if not isinstance(raw_layers, dict):
        raise ValueError("manifest.layers doit être un objet")

    cfg = dict(DEFAULT_ANALYZER_CONFIG)
    raw_cfg = manifest.get("config")
    if isinstance(raw_cfg, dict):
        cfg.update(raw_cfg)

    comp_max_frame = _parse_int(manifest.get("comp_max_frame")) or 0

    loaded_cache: Dict[str, Dict[str, Any]] = {}
    results: Dict[str, Any] = {}

    for layer_id, layer_info_raw in raw_layers.items():
        if not isinstance(layer_id, str):
            layer_id = str(layer_id)
        if not isinstance(layer_info_raw, dict):
            continue

        json_path_raw = layer_info_raw.get("json_path") or manifest.get("json_path")
        if not isinstance(json_path_raw, str) or not json_path_raw:
            continue
        video_json_path = Path(json_path_raw)

        cache_key = str(video_json_path)
        if cache_key not in loaded_cache:
            idx = _load_ae_or_tracking_index(video_json_path)
            if not idx:
                loaded_cache[cache_key] = {"dataByFrame": {}, "maxFrame": 0, "audioByFrame": {}, "audioMaxFrame": None}
            else:
                if isinstance(idx.get("audioByFrame"), dict):
                    loaded_cache[cache_key] = idx
                else:
                    audio_path = _find_audio_json_for_video_json(video_json_path)
                    audio_root = _load_json(audio_path) if audio_path else None
                    audio_by_frame, audio_max_frame = _index_audio_by_frame(audio_root) if audio_root else ({}, None)
                    idx["audioByFrame"] = {str(k): v for k, v in audio_by_frame.items()}
                    idx["audioMaxFrame"] = audio_max_frame
                    loaded_cache[cache_key] = idx

        idx = loaded_cache[cache_key]
        data_by_frame = _to_int_keyed_map(idx.get("dataByFrame"))
        audio_by_frame = _to_int_keyed_map(idx.get("audioByFrame"))

        video_max_frame = _parse_int(idx.get("maxFrame")) or 0
        audio_max_frame = _parse_int(idx.get("audioMaxFrame"))
        reference_max_frame = audio_max_frame if audio_max_frame is not None else comp_max_frame
        video_frame_scale = _compute_video_frame_scale(video_max_frame, reference_max_frame) if reference_max_frame > 0 else 1.0

        res = _analyze_layer(
            layer_info_raw,
            data_by_frame,
            audio_by_frame,
            cfg,
            video_frame_scale,
            video_max_frame,
        )
        if res is not None:
            results[layer_id] = res

    return results


def _extract_frames_analysis(tracking: Dict[str, Any]) -> Optional[List[Dict[str, Any]]]:
    frames = tracking.get("frames_analysis")
    if isinstance(frames, list):
        return frames

    frames = tracking.get("frames")
    if isinstance(frames, list):
        return frames

    return None


def _index_reduced_tracking_frames(frames: List[Dict[str, Any]]) -> Tuple[Dict[int, List[Dict[str, Any]]], int]:
    data_by_frame: Dict[int, List[Dict[str, Any]]] = {}
    max_frame_seen = 0

    for frame_obj in frames:
        if not isinstance(frame_obj, dict):
            continue
        frame_num = frame_obj.get("frame")
        try:
            frame_i = int(frame_num)
        except Exception:
            continue

        max_frame_seen = max(max_frame_seen, frame_i)

        tracked = frame_obj.get("tracked_objects")
        if not isinstance(tracked, list):
            continue

        out_tracked: List[Dict[str, Any]] = []
        for obj in tracked:
            if not isinstance(obj, dict):
                continue
            source = obj.get("source")
            label = obj.get("label")
            is_relevant = (source == "face_landmarker") or (source == "object_detector" and label == "person")
            if not is_relevant:
                continue

            obj_id = obj.get("id")
            if not isinstance(obj_id, str) or not obj_id:
                continue

            cx = obj.get("centroid_x")
            try:
                cx_f = float(cx)
            except Exception:
                continue

            bbox_w = obj.get("bbox_width")
            bbox_h = obj.get("bbox_height")
            try:
                bbox_w_f = float(bbox_w) if bbox_w is not None else 0.0
            except Exception:
                bbox_w_f = 0.0
            try:
                bbox_h_f = float(bbox_h) if bbox_h is not None else 0.0
            except Exception:
                bbox_h_f = 0.0

            bbox_surface = max(0.0, bbox_w_f) * max(0.0, bbox_h_f)

            conf = obj.get("confidence")
            try:
                conf_f = float(conf) if conf is not None else 0.0
            except Exception:
                conf_f = 0.0
            if conf_f < 0.0:
                conf_f = 0.0
            if conf_f > 1.0:
                conf_f = 1.0

            speakers = obj.get("active_speakers")
            if not isinstance(speakers, list):
                speakers = []
            speakers_out: List[str] = []
            for s in speakers:
                if isinstance(s, str) and s:
                    speakers_out.append(s)

            out_tracked.append(
                {
                    "id": obj_id,
                    "centroid_x": cx_f,
                    "source": source,
                    "label": label,
                    "video_speakers": speakers_out,
                    "bbox_width": bbox_w_f,
                    "bbox_height": bbox_h_f,
                    "bbox_surface": bbox_surface,
                    "confidence": conf_f,
                }
            )

        if out_tracked:
            data_by_frame[frame_i] = out_tracked

    return data_by_frame, max_frame_seen


def _index_audio_by_frame(audio: Dict[str, Any]) -> Tuple[Dict[int, Dict[str, Any]], Optional[int]]:
    frames = audio.get("frames_analysis")
    if not isinstance(frames, list):
        return {}, None

    by_frame: Dict[int, Dict[str, Any]] = {}
    max_frame = None

    for frame_obj in frames:
        if not isinstance(frame_obj, dict):
            continue
        frame_num = frame_obj.get("frame")
        try:
            frame_i = int(frame_num)
        except Exception:
            continue

        audio_info = frame_obj.get("audio_info")
        if not isinstance(audio_info, dict):
            continue

        by_frame[frame_i] = audio_info
        if max_frame is None or frame_i > max_frame:
            max_frame = frame_i

    return by_frame, max_frame


def build_ae_payload(tracking: Dict[str, Any], audio: Optional[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    frames = _extract_frames_analysis(tracking)
    if not frames:
        return None

    data_by_frame, max_frame = _index_reduced_tracking_frames(frames)
    audio_by_frame, audio_max_frame = _index_audio_by_frame(audio) if audio else ({}, None)

    fps = tracking.get("fps")
    total_frames = tracking.get("total_frames")

    out: Dict[str, Any] = {
        "schema": "ae_preprocessed",
        "schema_version": 1,
        "dataByFrame": {str(k): v for k, v in data_by_frame.items()},
        "maxFrame": max_frame,
        "audioByFrame": {str(k): v for k, v in audio_by_frame.items()},
        "audioMaxFrame": audio_max_frame,
    }

    if fps is not None:
        out["fps"] = fps
    if total_frames is not None:
        out["total_frames"] = total_frames

    if isinstance(tracking.get("tracking_analytics"), dict):
        out["tracking_analytics"] = tracking.get("tracking_analytics")
    if isinstance(tracking.get("expression_summary"), dict):
        out["expression_summary"] = tracking.get("expression_summary")
    if isinstance(tracking.get("temporal_alignment"), dict):
        out["temporal_alignment"] = tracking.get("temporal_alignment")

    if audio and isinstance(audio.get("speaker_embeddings"), dict):
        out["speaker_embeddings"] = audio.get("speaker_embeddings")

    return out


def _find_docs_dirs(work_dir: Path, keyword: str) -> List[Path]:
    if not work_dir.is_dir():
        return []

    docs_dirs: List[Path] = []
    for project_dir in work_dir.iterdir():
        if not project_dir.is_dir():
            continue
        if keyword and keyword not in project_dir.name:
            continue
        docs_dir = project_dir / "docs"
        if docs_dir.is_dir():
            docs_dirs.append(docs_dir)
    return docs_dirs


def _iter_videos_in_docs(docs_dir: Path) -> List[Path]:
    videos: List[Path] = []
    for p in docs_dir.iterdir():
        if p.is_file() and p.suffix.lower() in VIDEO_EXTENSIONS:
            videos.append(p)
    return videos


def _resolve_tracking_paths(docs_dir: Path, stem: str) -> Tuple[Optional[Path], Optional[Path]]:
    reduced = docs_dir / f"{stem}{TRACKING_SUFFIX}"
    legacy = docs_dir / f"{stem}.json"

    if reduced.exists():
        return reduced, legacy if legacy.exists() else None
    if legacy.exists():
        return legacy, None
    return None, None


def preprocess_docs_dir(docs_dir: Path) -> int:
    written = 0
    videos = _iter_videos_in_docs(docs_dir)

    for idx, video_path in enumerate(videos, start=1):
        stem = video_path.stem
        tracking_in, _legacy = _resolve_tracking_paths(docs_dir, stem)
        if tracking_in is None:
            logger.info("Tracking introuvable pour '%s'", video_path.name)
            continue

        tracking = _load_json(tracking_in)
        if not tracking:
            continue

        audio_path = docs_dir / f"{stem}{AUDIO_SUFFIX}"
        audio = _load_json(audio_path) if audio_path.exists() else None

        payload = build_ae_payload(tracking, audio)
        if payload is None:
            continue

        out_path = docs_dir / f"{stem}{AE_PREPROCESSED_SUFFIX}"
        _write_json_atomically(out_path, payload)
        written += 1

        print(
            f"INTERNAL_PROGRESS: {idx}/{len(videos)} items ({int(round((idx / float(len(videos))) * 100))}%) - {video_path.name}"
        )

    return written


def main() -> None:
    parser = argparse.ArgumentParser(description="Étape 7 - Pré-traitement AE (JSON AE-ready)")
    parser.add_argument("--manifest_path", type=str, default=None, help="Mode analyse AE: manifest JSON")
    parser.add_argument("--output_path", type=str, default=None, help="Mode analyse AE: output JSON")
    parser.add_argument(
        "--base_dir",
        type=str,
        default=os.environ.get("BASE_PATH_SCRIPTS", ""),
        help="Chemin base du projet (contenant projets_extraits)",
    )
    parser.add_argument("--work_dir", type=str, default=None, help="Chemin explicite vers projets_extraits")
    parser.add_argument(
        "--keyword",
        type=str,
        default=os.environ.get("FOLDER_KEYWORD", "Camille"),
        help="Mot-clé pour filtrer les dossiers projet",
    )
    parser.add_argument(
        "--log_dir",
        type=str,
        default=str(os.path.join(os.path.dirname(__file__), "..", "..", "..", "logs", "step7")),
        help="Répertoire pour les logs (par défaut logs/step7)",
    )

    args = parser.parse_args()

    if args.manifest_path:
        if not args.output_path:
            raise SystemExit("--output_path requis lorsque --manifest_path est fourni")
        manifest_path = Path(args.manifest_path)
        out_path = Path(args.output_path)

        try:
            with open(manifest_path, "r", encoding="utf-8") as f:
                manifest = json.load(f)
            if not isinstance(manifest, dict):
                raise ValueError("Manifest invalide (doit être un objet JSON)")

            results = analyze_manifest(manifest)
            _write_json_atomically(out_path, results)
        except Exception as e:
            _write_json_atomically(out_path, {"error": str(e)})
        return

    if args.work_dir:
        work_dir = Path(args.work_dir)
    else:
        base_dir = Path(args.base_dir) if args.base_dir else Path(os.getcwd())
        work_dir = base_dir / "projets_extraits"

    setup_logging(args.log_dir)

    docs_dirs = _find_docs_dirs(work_dir, keyword=args.keyword)
    print(f"TOTAL_AE_PREPROCESS: {len(docs_dirs)}")

    for p_idx, docs_dir in enumerate(docs_dirs, start=1):
        logger.info("PREPROCESS_AE: %s/%s: %s", p_idx, len(docs_dirs), docs_dir)
        print(f"PREPROCESS_AE: {p_idx}/{len(docs_dirs)}: {docs_dir.name}")
        preprocess_docs_dir(docs_dir)
        print(f"Succès: pré-traitement AE terminé pour {docs_dir.parent.name}")

    logger.info("--- Pré-traitement AE terminé ! ---")


if __name__ == "__main__":
    main()
