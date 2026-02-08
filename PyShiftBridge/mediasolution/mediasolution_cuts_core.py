from __future__ import annotations

import re
from dataclasses import dataclass
from typing import List, Optional


@dataclass(frozen=True)
class Segment:
    num: int
    start_time: float
    end_time: float


def seconds_to_timecode(seconds: float) -> str:
    """Convert seconds (float) to HH:MM:SS:FF timecode."""
    if seconds < 0:
        seconds = 0.0
    int_seconds = int(seconds)
    frames = int(round((seconds - int_seconds) * 25.0))
    hours = int_seconds // 3600
    minutes = (int_seconds % 3600) // 60
    secs = int_seconds % 60
    return f"{hours:02d}:{minutes:02d}:{secs:02d}:{frames:02d}"


def parse_segments_from_csv_content(csv_content: str, frame_rate: float) -> List[Segment]:
    """Parse CSV content and return a list of Segment objects."""
    if not csv_content:
        return []

    lines = csv_content.strip().splitlines()
    segments: List[Segment] = []

    for line in lines:
        line = line.strip()
        if not line or line.startswith(","):
            continue

        parts = [p.strip() for p in line.split(",")]
        if len(parts) < 2:
            continue

        try:
            num = int(parts[0])
        except Exception:
            continue

        try:
            start_tc = parts[1]
        except Exception:
            continue

        try:
            end_tc = parts[2] if len(parts) > 2 and parts[2] else start_tc
        except Exception:
            end_tc = start_tc

        start_time = _timecode_to_seconds(start_tc, frame_rate)
        end_time = _timecode_to_seconds(end_tc, frame_rate)

        if start_time >= 0 and end_time >= 0 and end_time >= start_time:
            segments.append(Segment(num=num, start_time=start_time, end_time=end_time))

    return segments


def _timecode_to_seconds(tc: str, frame_rate: float) -> float:
    """Convert HH:MM:SS:FF timecode to seconds."""
    if not tc:
        return -1.0

    match = re.match(r"^(\d{1,2}):(\d{2}):(\d{2}):(\d{2})$", tc.strip())
    if not match:
        return -1.0

    try:
        hours = int(match.group(1))
        minutes = int(match.group(2))
        seconds = int(match.group(3))
        frames = int(match.group(4))
    except Exception:
        return -1.0

    total_seconds = hours * 3600 + minutes * 60 + seconds + frames / frame_rate
    return total_seconds


def snap_and_clamp_segments(
    raw_segments: List[Segment],
    frame_rate: float,
    comp_duration: Optional[float],
    snap_factor: float,
) -> List[Segment]:
    """Snap segment boundaries to nearest frame and clamp to comp duration."""
    if not raw_segments:
        return []

    if snap_factor <= 0:
        snap_factor = 1.0

    snapped: List[Segment] = []
    for seg in raw_segments:
        snapped_start = round(seg.start_time * frame_rate / snap_factor) * snap_factor / frame_rate
        snapped_end = round(seg.end_time * frame_rate / snap_factor) * snap_factor / frame_rate

        if snapped_end < snapped_start:
            snapped_end = snapped_start

        if comp_duration is not None and comp_duration > 0:
            if snapped_end > comp_duration:
                snapped_end = comp_duration
            if snapped_start > comp_duration:
                continue

        snapped.append(Segment(num=seg.num, start_time=snapped_start, end_time=snapped_end))

    return snapped
