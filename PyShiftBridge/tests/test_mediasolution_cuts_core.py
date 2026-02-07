import pytest

from PyShiftBridge.mediasolution_cuts_core import (
    CutSegment,
    parse_segments_from_csv_content,
    snap_and_clamp_segments,
    timecode_to_seconds,
)


def test_timecode_to_seconds_valid():
    # Given: valid timecode inputs
    # When:  converting to seconds
    # Then:  values are converted correctly
    assert timecode_to_seconds("00:00:01,000") == pytest.approx(1.0)
    assert timecode_to_seconds("00:01:00,000") == pytest.approx(60.0)


def test_timecode_to_seconds_invalid():
    # Given: invalid / empty timecode inputs
    # When:  converting to seconds
    # Then:  function returns -1.0
    assert timecode_to_seconds("abc") == -1.0
    assert timecode_to_seconds("") == -1.0


def test_timecode_to_seconds_boundary_values():
    # Given: boundary values
    # When:  converting to seconds
    # Then:  - negative times are rejected, 0 works
    assert timecode_to_seconds("00:00:00,000") == pytest.approx(0.0)
    assert timecode_to_seconds("-00:00:01,000") == -1.0


def test_parse_segments_header_detection():
    # Given: CSV content where first row looks like a segment row (timecode-like columns)
    # When:  parsing segments
    # Then:  the first line is treated as data (start index 0)
    content = "Num,00:00:00,00:00:01\n1,00:00:00,00:00:01\n"
    segs = parse_segments_from_csv_content(content, frame_rate=25.0)
    assert len(segs) == 2
    assert segs[0].num == "Num"


def test_parse_segments_skips_invalid_rows():
    # Given: CSV with invalid rows
    # When:  parsing segments
    # Then:  only valid segments are returned
    content = "header1,header2,header3\n" "bad,row\n" "1,00:00:00,00:00:01\n" "2,00:00:02,00:00:01\n"
    segs = parse_segments_from_csv_content(content, frame_rate=25.0)
    assert len(segs) == 1
    assert segs[0].num == "1"


def test_parse_segments_empty_content_returns_empty_list():
    # Given: empty CSV content
    # When:  parsing segments
    # Then:  no segments are returned
    segs = parse_segments_from_csv_content("", frame_rate=25.0)
    assert segs == []


def test_parse_segments_missing_columns_are_skipped():
    # Given: CSV content with rows missing columns
    # When:  parsing segments
    # Then:  those rows are skipped
    content = "h1,h2,h3\n" "1,00:00:00\n" "2,00:00:00,00:00:01\n"
    segs = parse_segments_from_csv_content(content, frame_rate=25.0)
    assert [s.num for s in segs] == ["2"]


def test_parse_segments_sorts_unsorted_rows():
    # Given: CSV content where segments are not sorted by start time
    # When:  parsing segments
    # Then:  segments are sorted by start_time
    content = "h1,h2,h3\n" "2,00:00:02,00:00:03\n" "1,00:00:00,00:00:01\n"
    segs = parse_segments_from_csv_content(content, frame_rate=25.0)
    assert [s.num for s in segs] == ["1", "2"]


def test_parse_segments_uses_frame_in_out_when_available():
    # Given: CSV content with frame in/out columns
    # When:  parsing segments
    # Then:  start/end seconds are computed from frame indices
    content = "h1,h2,h3,frameIn,frameOut\n" "1,00:00:00,00:00:00,1,25\n"
    segs = parse_segments_from_csv_content(content, frame_rate=25.0)
    assert len(segs) == 1
    assert segs[0].start_time == pytest.approx(0.0)
    assert segs[0].end_time == pytest.approx(1.0)


def test_parse_segments_large_input_is_handled():
    # Given: large CSV content
    # When:  parsing segments
    # Then:  parsing completes and returns expected count
    lines = ["h1,h2,h3"]
    for i in range(1, 1001):
        lines.append(f"{i},00:00:00,00:00:01")
    content = "\n".join(lines) + "\n"
    segs = parse_segments_from_csv_content(content, frame_rate=25.0)
    assert len(segs) == 1000


def test_parse_segments_rejects_invalid_frame_rate():
    # Given: invalid frame_rate
    # When:  parsing segments
    # Then:  raises ValueError with message
    with pytest.raises(ValueError, match=r"frame_rate must be > 0"):
        parse_segments_from_csv_content("1,00:00:00,00:00:01\n", frame_rate=0.0)


def test_snap_and_clamp_segments_snaps_micro_gap_and_clamps_to_end():
    # Given: two segments with a micro-gap within snap threshold and a comp duration slightly after last out
    # When:  snapping/clamping
    # Then:  gap is snapped and last segment clamped to comp end
    segs = [
        CutSegment(num="1", start_time=0.0, end_time=1.0),
        CutSegment(num="2", start_time=1.04, end_time=2.0),
    ]
    # frame duration at 25fps = 0.04. snap_factor 1.5 => threshold 0.06
    out = snap_and_clamp_segments(segs, frame_rate=25.0, comp_duration=2.02, snap_factor=1.5)
    assert len(out) == 2
    assert out[0].end_time == pytest.approx(1.04)
    assert out[-1].end_time == pytest.approx(2.02)


def test_snap_and_clamp_segments_drops_too_short_segments():
    # Given: a segment shorter than 1 frame
    # When:  snapping/clamping
    # Then:  segment is dropped
    segs = [
        CutSegment(num="1", start_time=0.0, end_time=0.01),
        CutSegment(num="2", start_time=0.04, end_time=0.08),
    ]
    out = snap_and_clamp_segments(segs, frame_rate=25.0, comp_duration=None, snap_factor=1.5)
    assert [s.num for s in out] == ["2"]


def test_snap_and_clamp_segments_rejects_invalid_inputs():
    # Given: invalid frame_rate and snap_factor
    # When:  snapping/clamping
    # Then:  raises ValueError with message
    with pytest.raises(ValueError, match=r"frame_rate must be > 0"):
        snap_and_clamp_segments([], frame_rate=0.0, comp_duration=None, snap_factor=1.5)
    with pytest.raises(ValueError, match=r"snap_factor must be > 0"):
        snap_and_clamp_segments([], frame_rate=25.0, comp_duration=None, snap_factor=0.0)
