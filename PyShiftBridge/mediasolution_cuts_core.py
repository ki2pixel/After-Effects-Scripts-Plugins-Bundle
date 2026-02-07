from __future__ import annotations

import re
from dataclasses import dataclass
from typing import List, Optional


_TIMECODE_RE = re.compile(r"^\d{2}:\d{2}:\d{2}([\.,]\d+)?$")


@dataclass(frozen=True)
class CutSegment:
    num: str
    start_time: float
    end_time: float


def timecode_to_seconds(timecode: str) -> float:
    raw = str(timecode).strip().replace(",", ".")
    if not raw or not _TIMECODE_RE.match(raw):
        return -1.0

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


def seconds_to_timecode(seconds_value: float) -> str:
    sign = "-" if seconds_value < 0 else ""
    abs_time = abs(seconds_value)
    hours = int(abs_time // 3600)
    minutes = int((abs_time % 3600) // 60)
    seconds = abs_time % 60.0
    return f"{sign}{hours:02d}:{minutes:02d}:{seconds:06.3f}".replace(".", ",")


def parse_segments_from_csv_content(content: str, frame_rate: float) -> List[CutSegment]:
    if frame_rate <= 0:
        raise ValueError("frame_rate must be > 0")

    lines = (content or "").splitlines()

    start_idx = 1
    if lines:
        first = lines[0].strip()
        if first:
            cols0 = [c.strip() for c in first.split(",")]
            if len(cols0) >= 3 and _TIMECODE_RE.match(cols0[1]) and _TIMECODE_RE.match(cols0[2]):
                start_idx = 0

    segments: List[CutSegment] = []
    for line in lines[start_idx:]:
        trimmed = line.strip()
        if not trimmed:
            continue

        cols = [c.strip() for c in trimmed.split(",")]
        if len(cols) < 3:
            continue

        start_time = -1.0
        end_time = -1.0

        if len(cols) >= 5:
            try:
                frame_in = int(cols[3])
                frame_out = int(cols[4])
            except Exception:
                frame_in = None
                frame_out = None
            if frame_in is not None and frame_out is not None and frame_in >= 1 and frame_out >= frame_in:
                start_time = (frame_in - 1) / frame_rate
                end_time = frame_out / frame_rate

        if start_time < 0 or end_time < 0:
            start_time = timecode_to_seconds(cols[1])
            end_time = timecode_to_seconds(cols[2])

        if start_time >= 0 and end_time > start_time:
            segments.append(CutSegment(num=cols[0], start_time=start_time, end_time=end_time))

    segments.sort(key=lambda s: s.start_time)
    return segments


def snap_and_clamp_segments(
    segments: List[CutSegment],
    frame_rate: float,
    comp_duration: Optional[float],
    snap_factor: float,
) -> List[CutSegment]:
    if frame_rate <= 0:
        raise ValueError("frame_rate must be > 0")
    if snap_factor <= 0:
        raise ValueError("snap_factor must be > 0")

    if not segments:
        return []

    frame_duration = 1.0 / frame_rate
    snap_threshold = frame_duration * snap_factor

    adjusted: List[CutSegment] = []
    for idx, seg in enumerate(segments):
        start_time = float(seg.start_time)
        end_time = float(seg.end_time)

        if end_time - start_time < frame_duration:
            continue

        next_seg = segments[idx + 1] if idx + 1 < len(segments) else None
        if next_seg is not None:
            gap = float(next_seg.start_time) - end_time
            if gap > 0 and gap <= snap_threshold:
                end_time = float(next_seg.start_time)
            else:
                end_time = min(end_time, float(next_seg.start_time))

        if comp_duration is not None:
            end_time = min(end_time, float(comp_duration))

        if end_time - start_time >= frame_duration:
            adjusted.append(CutSegment(num=seg.num, start_time=start_time, end_time=end_time))

    if comp_duration is not None and adjusted:
        last = adjusted[-1]
        gap_to_end = float(comp_duration) - float(last.end_time)
        if gap_to_end > 0 and gap_to_end <= snap_threshold:
            adjusted[-1] = CutSegment(num=last.num, start_time=last.start_time, end_time=float(comp_duration))

    return adjusted
