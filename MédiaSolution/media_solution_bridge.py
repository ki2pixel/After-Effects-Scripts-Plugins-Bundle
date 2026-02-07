import argparse
import json
import os
import re
import tempfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple


_TIMEcode_RE = re.compile(r"^\d{2}:\d{2}:\d{2}([\.,]\d+)?$")


@dataclass(frozen=True)
class _Segment:
    num: str
    start_time: float
    end_time: float


def _is_timecode_like(value: str) -> bool:
    return bool(_TIMEcode_RE.match(value.strip()))


def _timecode_to_seconds(timecode: str) -> float:
    raw = timecode.strip().replace(",", ".")
    parts = raw.split(":")
    if len(parts) != 3:
        return -1.0

    try:
        hours = float(parts[0])
        minutes = float(parts[1])
        seconds = float(parts[2])
    except ValueError:
        return -1.0

    if hours < 0 or minutes < 0 or seconds < 0:
        return -1.0

    return (hours * 3600.0) + (minutes * 60.0) + seconds


def _seconds_to_precise_timecode(seconds_value: float) -> str:
    sign = "-" if seconds_value < 0 else ""
    abs_time = abs(seconds_value)

    hours = int(abs_time // 3600)
    minutes = int((abs_time % 3600) // 60)
    seconds = abs_time % 60.0

    return f"{sign}{hours:02d}:{minutes:02d}:{seconds:06.3f}".replace(".", ",")


def _parse_int(raw: Any) -> Optional[int]:
    if raw is None:
        return None
    try:
        return int(str(raw).strip())
    except (TypeError, ValueError):
        return None


def _parse_float(raw: Any) -> Optional[float]:
    if raw is None:
        return None
    try:
        return float(str(raw).strip())
    except (TypeError, ValueError):
        return None


def _read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8-sig")


def _write_json_atomically(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp_path = tempfile.mkstemp(prefix=path.name + ".tmp.", dir=str(path.parent))
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(payload, f, ensure_ascii=False, indent=2)
        os.replace(tmp_path, path)
    finally:
        try:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
        except OSError:
            pass


def _detect_start_line_index(lines: List[str]) -> int:
    if not lines:
        return 1

    first_line = lines[0].strip()
    if not first_line:
        return 1

    cols = [c.strip() for c in first_line.split(",")]
    if len(cols) >= 3 and _is_timecode_like(cols[1]) and _is_timecode_like(cols[2]):
        return 0

    return 1


def _parse_segments_from_csv_content(content: str, frame_rate: float) -> List[_Segment]:
    lines = content.splitlines()
    start_line_index = _detect_start_line_index(lines)

    segments: List[_Segment] = []
    for line in lines[start_line_index:]:
        trimmed = line.strip()
        if not trimmed:
            continue

        cols = [c.strip() for c in trimmed.split(",")]
        if len(cols) < 3:
            continue

        start_time = -1.0
        end_time = -1.0

        if len(cols) >= 5:
            frame_in = _parse_int(cols[3])
            frame_out = _parse_int(cols[4])
            if frame_in is not None and frame_out is not None and frame_in >= 1 and frame_out >= frame_in:
                start_time = (frame_in - 1) / frame_rate
                end_time = frame_out / frame_rate

        if start_time < 0 or end_time < 0:
            start_time = _timecode_to_seconds(cols[1])
            end_time = _timecode_to_seconds(cols[2])

        if start_time >= 0 and end_time > start_time:
            segments.append(_Segment(num=cols[0], start_time=start_time, end_time=end_time))

    segments.sort(key=lambda s: s.start_time)
    return segments


def _adjust_segments_for_comp(
    segments: List[_Segment],
    frame_rate: float,
    comp_duration: Optional[float],
    snap_factor: float,
) -> Tuple[List[Dict[str, Any]], List[str]]:
    frame_duration = 1.0 / frame_rate
    warnings: List[str] = []
    out: List[Dict[str, Any]] = []

    for idx, seg in enumerate(segments):
        next_seg = segments[idx + 1] if idx + 1 < len(segments) else None

        layer_in = seg.start_time
        layer_out = seg.end_time

        if next_seg is not None and next_seg.start_time > 0:
            gap_to_next = next_seg.start_time - layer_out
            if gap_to_next > 0 and gap_to_next <= (frame_duration * snap_factor):
                layer_out = next_seg.start_time
            else:
                layer_out = min(layer_out, next_seg.start_time)

        if comp_duration is not None:
            layer_out = min(layer_out, comp_duration)

        if (layer_out - layer_in) < frame_duration:
            warnings.append(f"segment_too_short:{seg.num}")
            continue

        out.append(
            {
                "num": seg.num,
                "startTime": layer_in,
                "endTime": layer_out,
                "startTc": _seconds_to_precise_timecode(layer_in),
                "endTc": _seconds_to_precise_timecode(layer_out),
            }
        )

    return out, warnings


def analyze_manifest(manifest: Dict[str, Any]) -> Dict[str, Any]:
    mode = manifest.get("mode")
    if mode != "cuts":
        raise ValueError("manifest.mode doit être 'cuts'")

    csv_path_raw = manifest.get("csv_path")
    if not isinstance(csv_path_raw, str) or not csv_path_raw:
        raise ValueError("manifest.csv_path requis")

    frame_rate = _parse_float(manifest.get("frame_rate"))
    if frame_rate is None or frame_rate <= 0:
        raise ValueError("manifest.frame_rate invalide")

    comp_duration = _parse_float(manifest.get("comp_duration"))

    snap_factor = 1.1
    raw_cfg = manifest.get("config")
    if isinstance(raw_cfg, dict):
        sf = _parse_float(raw_cfg.get("SNAP_FACTOR"))
        if sf is not None and sf > 0:
            snap_factor = sf

    csv_path = Path(csv_path_raw)
    if not csv_path.exists():
        raise ValueError(f"CSV introuvable: {csv_path}")

    content = _read_text(csv_path)
    raw_segments = _parse_segments_from_csv_content(content, frame_rate)

    adjusted, warnings = _adjust_segments_for_comp(raw_segments, frame_rate, comp_duration, snap_factor)

    return {
        "segments": adjusted,
        "warnings": warnings,
        "stats": {
            "raw_segments": len(raw_segments),
            "kept_segments": len(adjusted),
        },
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Media-Solution Python Bridge")
    parser.add_argument("--manifest_path", type=str, required=True)
    parser.add_argument("--output_path", type=str, required=True)
    args = parser.parse_args()

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


if __name__ == "__main__":
    main()
