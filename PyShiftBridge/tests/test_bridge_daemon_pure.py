import re
import sys
import time
import types

import pytest


# --- Test perspectives table ---
#
# | Case ID | Input / Precondition | Perspective (Equivalence / Boundary) | Expected Result | Notes |
# |--------|----------------------|---------------------------------------|-----------------|-------|
# | BD-N-01 | handle_entrypoint('ping', {}) | Equivalence – normal | Returns ok schema | Pure python |
# | BD-A-01 | handle_entrypoint('unknown', {}) | Equivalence – error | Raises ValueError w/ message | - |
# | BD-A-02 | handle_entrypoint('mediasolution_apply_cuts_active_layer', {}) | Boundary – missing required field | Raises ValueError missing csv | No AE calls |
# | BD-A-03 | handle_entrypoint('mediasolution_apply_cuts_active_layer', {csv_path:'x', frame_rate:0}) | Boundary – invalid numeric | Raises ValueError invalid frame_rate | No AE calls |
# | BD-A-04 | handle_entrypoint('mediasolution_apply_auto_recentering', {...}) with no active layer | Equivalence – error path | Raises RuntimeError no active layer | Stub ae |
# | BD-N-04 | mediasolution_apply_cuts_active_layer(..., config={'DISABLE_UNDO_GROUP': True}) | Equivalence – normal | Does not enter UndoGroup | Stub AE + PyFx |
# | BD-N-05 | mediasolution_apply_cuts_active_layer(..., config={}) | Equivalence – normal | Enters UndoGroup once | Stub AE + PyFx |
# | BD-N-06 | is_running() with no daemon | Equivalence – normal | Returns False | Pure python |
# | BD-N-07 | is_running() with alive thread stub | Equivalence – normal | Returns True | Pure python |
# | BD-A-07 | handle_entrypoint('mediasolution_import_images_from_folder', {}) | Boundary – missing required field | Raises ValueError missing folder_path | No AE calls |
# | BD-A-08 | handle_entrypoint('mediasolution_import_images_from_folder', {folder_path:'missing'}) | Boundary – invalid folder | Raises ValueError folder not found | No AE calls |
# | BD-A-09 | handle_entrypoint('mediasolution_batch_prepare_active_layer', {config:{}}) with no active layer | Equivalence – error path | Raises RuntimeError no active layer | Stub ae |
# | BD-N-08 | mediasolution_apply_auto_recentering(..., DISABLE_UNDO_GROUP=True) | Equivalence – normal | Does not enter UndoGroup | Stub AE + PyFx |
# | BD-N-09 | mediasolution_apply_auto_recentering(..., DISABLE_UNDO_GROUP=False) | Equivalence – normal | Enters UndoGroup once | Stub AE + PyFx |
# | BD-A-10 | handle_entrypoint('mediasolution_create_base_aep_for_video', {}) | Boundary – missing required field | Raises ValueError missing video_path | No AE calls |
# | BD-A-11 | handle_entrypoint('mediasolution_create_base_aep_for_video', {video_path:'missing', aep_path:'x.aep', comp_name:'C'}) | Boundary – invalid video | Raises ValueError video not found | No AE calls |
# | BD-A-12 | handle_entrypoint('mediasolution_create_base_aep_for_video', {video_path:'x', comp_name:'C'}) | Boundary – missing required field | Raises ValueError missing aep_path | No AE calls |
# | BD-A-13 | handle_entrypoint('mediasolution_create_base_aep_for_video', {video_path:'x', aep_path:'x.aep'}) | Boundary – missing required field | Raises ValueError missing comp_name | No AE calls |
# | BD-N-10 | handle_entrypoint('mediasolution_create_base_aep_for_video', {video_path:existing, aep_path:'x.aep', comp_name:'C', config:'bad'}) | Equivalence – normal | Coerces config to {} and dispatches | Monkeypatch handler |
# | BD-A-14 | handle_entrypoint('mediasolution_open_project_and_select_comp', {}) | Boundary – missing required field | Raises ValueError missing aep_path | No AE calls |
# | BD-A-15 | handle_entrypoint('mediasolution_open_project_and_select_comp', {aep_path:'missing'}) | Boundary – invalid file | Raises ValueError AEP not found | No AE calls |
# | BD-N-11 | handle_entrypoint('mediasolution_open_project_and_select_comp', valid stubs) | Equivalence – normal | Returns ok + comp name + layer index | Stub ae + PyFx |
# | BD-N-02 | _load_tracking_data_by_frame: dataByFrame dict | Equivalence – normal | Parses dict and int keys | - |
# | BD-N-03 | _load_tracking_data_by_frame: frames_analysis list | Equivalence – normal | Parses list and filters non-dicts | - |
# | BD-A-05 | _load_tracking_data_by_frame: invalid JSON | Equivalence – error path | Returns {} | - |
# | BD-A-06 | _load_tracking_data_by_frame: missing file | Boundary – missing | Returns {} | - |


def _ensure_stubbed_pyshiftae_and_pyfx():
    if "pyshiftae" not in sys.modules:
        ae_stub = types.ModuleType("pyshiftae")

        class _UndoGroup:
            def __init__(self, _name: str):
                self._name = _name

            def __enter__(self):
                return self

            def __exit__(self, exc_type, exc, tb):
                return False

        class _Layer:
            @staticmethod
            def active_layer():
                return None

        class _LTimeMode:
            CompTime = 0

        ae_stub.UndoGroup = _UndoGroup
        ae_stub.Layer = _Layer
        ae_stub.LTimeMode = _LTimeMode
        sys.modules["pyshiftae"] = ae_stub

    if "PyFx" not in sys.modules:
        sys.modules["PyFx"] = types.ModuleType("PyFx")


_ensure_stubbed_pyshiftae_and_pyfx()

from PyShiftBridge import bridge_daemon as bd  # noqa: E402


def test_handle_entrypoint_ping_schema():
    # Given: a ping request
    # When:  dispatching ping
    # Then:  ok response schema is returned
    out = bd.handle_entrypoint("ping", {})
    assert out["status"] == "ok"
    assert out["version"]
    assert out["transport"]
    assert re.match(r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$", out["timestamp"])


def test_handle_entrypoint_unknown_raises():
    # Given: an unknown entrypoint
    # When:  dispatching
    # Then:  a ValueError is raised with a helpful message
    with pytest.raises(ValueError, match=r"Unknown entrypoint"):
        bd.handle_entrypoint("does_not_exist", {})


def test_handle_entrypoint_cuts_missing_csv_path_raises():
    # Given: cuts entrypoint with missing csv_path
    # When:  dispatching
    # Then:  validation raises ValueError before any AE calls
    with pytest.raises(ValueError, match=r"Missing args\.csv_path"):
        bd.handle_entrypoint("mediasolution_apply_cuts_active_layer", {})


def test_handle_entrypoint_cuts_invalid_frame_rate_raises():
    # Given: cuts entrypoint with invalid frame_rate
    # When:  dispatching
    # Then:  validation raises ValueError before any AE calls
    with pytest.raises(ValueError, match=r"Invalid args\.frame_rate"):
        bd.handle_entrypoint(
            "mediasolution_apply_cuts_active_layer",
            {"csv_path": "x.csv", "frame_rate": 0.0, "snap_factor": 1.5, "config": {}},
        )


def test_is_running_false_when_not_started():
    # Given: no daemon started
    # When:  checking is_running
    # Then:  False is returned
    assert bd.is_running() is False


def test_is_running_true_with_alive_thread_stub(monkeypatch):
    # Given: a daemon object with an alive thread
    # When:  checking is_running
    # Then:  True is returned
    class _T:
        def is_alive(self):
            return True

    class _D:
        _thread = _T()

    monkeypatch.setattr(bd, "_daemon", _D(), raising=False)
    assert bd.is_running() is True


def test_handle_entrypoint_import_images_missing_folder_path_raises():
    # Given: import images entrypoint with missing folder_path
    # When:  dispatching
    # Then:  validation raises ValueError before any AE calls
    with pytest.raises(ValueError, match=r"Missing args\.folder_path"):
        bd.handle_entrypoint("mediasolution_import_images_from_folder", {})


def test_handle_entrypoint_import_images_folder_not_found_raises(tmp_path):
    # Given: import images entrypoint with an invalid folder path
    # When:  dispatching
    # Then:  validation raises ValueError
    missing = tmp_path / "does_not_exist"
    with pytest.raises(ValueError, match=r"Folder not found"):
        bd.handle_entrypoint(
            "mediasolution_import_images_from_folder",
            {"folder_path": str(missing), "extensions": ["png"]},
        )


def test_handle_entrypoint_batch_prepare_no_active_layer_raises():
    # Given: batch prepare entrypoint but no active layer available
    # When:  dispatching
    # Then:  a RuntimeError is raised
    with pytest.raises(RuntimeError, match=r"No active layer"):
        bd.handle_entrypoint("mediasolution_batch_prepare_active_layer", {"config": {}})


def test_handle_entrypoint_create_base_aep_missing_video_path_raises():
    # Given: create base AEP entrypoint with missing video_path
    # When:  dispatching
    # Then:  validation raises ValueError before any AE calls
    with pytest.raises(ValueError, match=r"Missing args\.video_path"):
        bd.handle_entrypoint("mediasolution_create_base_aep_for_video", {})


def test_handle_entrypoint_create_base_aep_video_not_found_raises(tmp_path):
    # Given: create base AEP entrypoint with an invalid video path
    # When:  dispatching
    # Then:  validation raises ValueError
    missing = tmp_path / "missing.mp4"
    with pytest.raises(ValueError, match=r"Video not found"):
        bd.handle_entrypoint(
            "mediasolution_create_base_aep_for_video",
            {"video_path": str(missing), "aep_path": "x.aep", "comp_name": "C"},
        )


def test_handle_entrypoint_create_base_aep_missing_aep_path_raises(tmp_path):
    # Given: create base AEP entrypoint with missing aep_path
    # When:  dispatching
    # Then:  validation raises ValueError before any AE calls
    video = tmp_path / "video.mp4"
    video.write_text("x")
    with pytest.raises(ValueError, match=r"Missing args\.aep_path"):
        bd.handle_entrypoint(
            "mediasolution_create_base_aep_for_video",
            {"video_path": str(video), "comp_name": "C"},
        )


def test_handle_entrypoint_create_base_aep_missing_comp_name_raises(tmp_path):
    # Given: create base AEP entrypoint with missing comp_name
    # When:  dispatching
    # Then:  validation raises ValueError before any AE calls
    video = tmp_path / "video.mp4"
    video.write_text("x")
    with pytest.raises(ValueError, match=r"Missing args\.comp_name"):
        bd.handle_entrypoint(
            "mediasolution_create_base_aep_for_video",
            {"video_path": str(video), "aep_path": "x.aep"},
        )


def test_handle_entrypoint_create_base_aep_coerces_invalid_config_to_empty_dict(tmp_path, monkeypatch):
    # Given: a valid video path but a non-dict config
    # When:  dispatching via handle_entrypoint
    # Then:  config is coerced to {} before calling the underlying function
    video = tmp_path / "video.mp4"
    video.write_text("x")
    called = {"config": None}

    def _stub(video_path, aep_path, comp_name, config):
        called["config"] = config
        return {"status": "ok"}

    monkeypatch.setattr(bd, "mediasolution_create_base_aep_for_video", _stub)
    out = bd.handle_entrypoint(
        "mediasolution_create_base_aep_for_video",
        {
            "video_path": str(video),
            "aep_path": "x.aep",
            "comp_name": "C",
            "config": "bad",
        },
    )
    assert out["status"] == "ok"
    assert called["config"] == {}


def test_handle_entrypoint_open_project_missing_aep_path_raises():
    # Given: open project entrypoint with missing aep_path
    # When:  dispatching
    # Then:  validation raises ValueError before any AE calls
    with pytest.raises(ValueError, match=r"Missing args\.aep_path"):
        bd.handle_entrypoint("mediasolution_open_project_and_select_comp", {})


def test_handle_entrypoint_open_project_aep_not_found_raises(tmp_path):
    # Given: open project entrypoint with invalid aep_path
    # When:  dispatching
    # Then:  validation raises ValueError
    missing = tmp_path / "missing.aep"
    with pytest.raises(ValueError, match=r"AEP not found"):
        bd.handle_entrypoint(
            "mediasolution_open_project_and_select_comp",
            {"aep_path": str(missing), "comp_name_suffix": "_9x16", "config": {}},
        )


def test_handle_entrypoint_open_project_success_selects_suffix_comp_and_layer(monkeypatch, tmp_path):
    # Given: a stubbed project with 2 comps, only one matches suffix and has a valid main video layer
    # When:  dispatching open_project_and_select_comp
    # Then:  returns ok with comp name and a 1-based layer index
    aep_path = tmp_path / "p.aep"
    aep_path.write_text("x")

    class _ItemType:
        COMP = "COMP"
        FOOTAGE = "FOOTAGE"

    class _ItemFlag:
        HAS_VIDEO = 1 << 0
        STILL = 1 << 1

    class _LayerFlag:
        VIDEO_ACTIVE = 1 << 0
        LOCKED = 1 << 1

    comp_a = object()
    comp_b = object()
    item_a = object()
    item_b = object()
    layer_ptr = object()
    footage_item = object()

    class _ItemSuite:
        def GetFirstProjItem(self, _proj_ptr):
            return item_a

        def GetNextProjItem(self, _proj_ptr, cur):
            if cur is item_a:
                return item_b
            return None

        def GetItemType(self, item_ptr):
            if item_ptr is footage_item:
                return _ItemType.FOOTAGE
            return _ItemType.COMP

        def GetItemName(self, item_ptr):
            if item_ptr is item_a:
                return "C"
            return "C_9x16"

        def GetItemFlags(self, item_ptr):
            if item_ptr is footage_item:
                return _ItemFlag.HAS_VIDEO
            return 0

    class _CompSuite:
        def GetCompFromItem(self, item_ptr):
            if item_ptr is item_a:
                return comp_a
            if item_ptr is item_b:
                return comp_b
            return None

    class _LayerSuite:
        def GetCompNumLayers(self, comp_ptr):
            return 1

        def GetCompLayerByIndex(self, comp_ptr, _idx):
            return layer_ptr

        def GetLayerFlags(self, _layer_ptr):
            return _LayerFlag.VIDEO_ACTIVE

        def GetLayerSourceItem(self, _layer_ptr):
            return footage_item

        def GetLayerIndex(self, _layer_ptr):
            return 1

        def GetLayerName(self, _layer_ptr):
            return ("Video", "")

    class _ProjSuite:
        def OpenProjectFromPath(self, _path):
            return "PROJ"

    class _Project:
        def __init__(self, proj=None):
            self.proj = proj or "PROJ"

        @classmethod
        def open(cls, path: str):
            return cls(proj="PROJ")

    monkeypatch.setattr(bd.PyFx, "ItemSuite", _ItemSuite, raising=False)
    monkeypatch.setattr(bd.PyFx, "CompSuite", _CompSuite, raising=False)
    monkeypatch.setattr(bd.PyFx, "LayerSuite", _LayerSuite, raising=False)
    monkeypatch.setattr(bd.PyFx, "ProjSuite", _ProjSuite, raising=False)
    monkeypatch.setattr(bd.PyFx, "ItemType", _ItemType, raising=False)
    monkeypatch.setattr(bd.PyFx, "ItemFlag", _ItemFlag, raising=False)
    monkeypatch.setattr(bd.PyFx, "LayerFlag", _LayerFlag, raising=False)
    monkeypatch.setattr(bd.ae, "Project", _Project, raising=False)

    out = bd.handle_entrypoint(
        "mediasolution_open_project_and_select_comp",
        {
            "aep_path": str(aep_path),
            "comp_name_suffix": "_9x16",
            "config": {"DISABLE_UNDO_GROUP": True},
        },
    )
    assert out["status"] == "ok"
    assert out["active_comp_name"] == "C_9x16"
    assert out["video_layer_index"] == 1


def test_mediasolution_apply_cuts_disable_undo_group_skips_undo(tmp_path, monkeypatch):
    # Given: an active layer stub + a minimal CSV + an UndoGroup counter
    # When:  applying cuts with DISABLE_UNDO_GROUP=True
    # Then:  created segments > 0 and UndoGroup is not entered
    class _UndoGroupCounter:
        entered = 0

        def __init__(self, _name: str):
            self._name = _name

        def __enter__(self):
            _UndoGroupCounter.entered += 1
            return self

        def __exit__(self, exc_type, exc, tb):
            return False

    class _Comp:
        dimensions = (0.0, 0.0)

    class _DupLayer:
        def __init__(self):
            self.layer = object()
            self.name = ""

    class _Layer:
        def __init__(self):
            self.parent_comp = _Comp()
            self.deleted = False

        def duplicate(self):
            return _DupLayer()

        def delete(self):
            self.deleted = True

    class _LayerSuite:
        def SetLayerInPointAndDuration(self, *_args, **_kwargs):
            return None

    class _LTimeMode:
        CompTime = 0

    class _Time:
        def __init__(self, _value: float):
            self.value = float(_value)

    layer = _Layer()

    monkeypatch.setattr(bd.ae, "UndoGroup", _UndoGroupCounter)
    monkeypatch.setattr(bd.ae.Layer, "active_layer", staticmethod(lambda: layer))
    monkeypatch.setattr(bd.PyFx, "LayerSuite", _LayerSuite, raising=False)
    monkeypatch.setattr(bd.PyFx, "LTimeMode", _LTimeMode, raising=False)
    monkeypatch.setattr(bd.PyFx, "Time", _Time, raising=False)

    csv_path = tmp_path / "cuts.csv"
    csv_path.write_text("num,start,end\n1,00:00:00.000,00:00:01.000\n", encoding="utf-8")

    # When: applying cuts with DISABLE_UNDO_GROUP
    out = bd.mediasolution_apply_cuts_active_layer(
        csv_path=str(csv_path),
        frame_rate=25.0,
        comp_duration=None,
        snap_factor=1.5,
        tracking_json_path=None,
        config={"DISABLE_UNDO_GROUP": True, "ENABLE_CONFIDENCE_WEIGHTING": False},
    )

    # Then: the operation succeeds but does not open an UndoGroup
    assert out["created"] == 1
    assert layer.deleted is True
    assert _UndoGroupCounter.entered == 0


def test_mediasolution_apply_cuts_default_enters_undo_group_once(tmp_path, monkeypatch):
    # Given: an active layer stub + a minimal CSV + an UndoGroup counter
    # When:  applying cuts with default config
    # Then:  created segments > 0 and UndoGroup is entered exactly once
    class _UndoGroupCounter:
        entered = 0

        def __init__(self, _name: str):
            self._name = _name

        def __enter__(self):
            _UndoGroupCounter.entered += 1
            return self

        def __exit__(self, exc_type, exc, tb):
            return False

    class _Comp:
        dimensions = (0.0, 0.0)

    class _DupLayer:
        def __init__(self):
            self.layer = object()
            self.name = ""

    class _Layer:
        def __init__(self):
            self.parent_comp = _Comp()
            self.deleted = False

        def duplicate(self):
            return _DupLayer()

        def delete(self):
            self.deleted = True

    class _LayerSuite:
        def SetLayerInPointAndDuration(self, *_args, **_kwargs):
            return None

    class _LTimeMode:
        CompTime = 0

    class _Time:
        def __init__(self, _value: float):
            self.value = float(_value)

    layer = _Layer()

    monkeypatch.setattr(bd.ae, "UndoGroup", _UndoGroupCounter)
    monkeypatch.setattr(bd.ae.Layer, "active_layer", staticmethod(lambda: layer))
    monkeypatch.setattr(bd.PyFx, "LayerSuite", _LayerSuite, raising=False)
    monkeypatch.setattr(bd.PyFx, "LTimeMode", _LTimeMode, raising=False)
    monkeypatch.setattr(bd.PyFx, "Time", _Time, raising=False)

    csv_path = tmp_path / "cuts.csv"
    csv_path.write_text("num,start,end\n1,00:00:00.000,00:00:01.000\n", encoding="utf-8")

    # When: applying cuts with default config
    out = bd.mediasolution_apply_cuts_active_layer(
        csv_path=str(csv_path),
        frame_rate=25.0,
        comp_duration=None,
        snap_factor=1.5,
        tracking_json_path=None,
        config={"ENABLE_CONFIDENCE_WEIGHTING": False},
    )

    # Then: the operation succeeds and opens exactly one UndoGroup
    assert out["created"] == 1
    assert layer.deleted is True
    assert _UndoGroupCounter.entered == 1


def test_handle_entrypoint_auto_recentering_no_active_layer_raises():
    # Given: auto-recentering entrypoint but no active layer available
    # When:  dispatching
    # Then:  a RuntimeError is raised
    with pytest.raises(RuntimeError, match=r"No active layer"):
        bd.handle_entrypoint("mediasolution_apply_auto_recentering", {"tracking_json_path": None, "config": {}})


def test_mediasolution_auto_recentering_disable_undo_group_skips_undo(monkeypatch):
    # Given: an active layer stub + an UndoGroup counter
    # When:  applying auto-recentering with DISABLE_UNDO_GROUP=True
    # Then:  UndoGroup is not entered
    class _UndoGroupCounter:
        entered = 0

        def __init__(self, _name: str):
            self._name = _name

        def __enter__(self):
            _UndoGroupCounter.entered += 1
            return self

        def __exit__(self, exc_type, exc, tb):
            return False

    class _Prop:
        def __init__(self, value):
            self._value = value

        def get_value(self, *_args, **_kwargs):
            return self._value

        def set_value(self, value):
            self._value = value

    class _Comp:
        frame_rate = 25.0
        dimensions = (1080.0, 1920.0)

    class _Layer:
        def __init__(self):
            self.parent_comp = _Comp()
            self.in_point = 0.0
            self.duration = 1.0
            self._anchor = _Prop((0.0, 0.0))
            self._pos = _Prop((0.0, 0.0))

        def get_property(self, stream):
            if stream == bd.PyFx.LayerStream.ANCHORPOINT:
                return self._anchor
            if stream == bd.PyFx.LayerStream.POSITION:
                return self._pos
            raise KeyError("unknown stream")

    class _LayerStream:
        ANCHORPOINT = "ANCHORPOINT"
        POSITION = "POSITION"

    class _LTimeMode:
        CompTime = 0

    layer = _Layer()

    monkeypatch.setattr(bd.ae, "UndoGroup", _UndoGroupCounter)
    monkeypatch.setattr(bd.ae.Layer, "active_layer", staticmethod(lambda: layer))
    monkeypatch.setattr(bd.PyFx, "LayerStream", _LayerStream, raising=False)
    monkeypatch.setattr(bd.PyFx, "LTimeMode", _LTimeMode, raising=False)

    out = bd.mediasolution_apply_auto_recentering(
        tracking_json_path=None,
        config={"DISABLE_UNDO_GROUP": True, "apply_to_all_layers": False},
    )
    assert out["status"] == "success"
    assert out["layers_updated"] == 1
    assert _UndoGroupCounter.entered == 0


def test_mediasolution_auto_recentering_default_enters_undo_group_once(monkeypatch):
    # Given: an active layer stub + an UndoGroup counter
    # When:  applying auto-recentering with default config
    # Then:  UndoGroup is entered exactly once
    class _UndoGroupCounter:
        entered = 0

        def __init__(self, _name: str):
            self._name = _name

        def __enter__(self):
            _UndoGroupCounter.entered += 1
            return self

        def __exit__(self, exc_type, exc, tb):
            return False

    class _Prop:
        def __init__(self, value):
            self._value = value

        def get_value(self, *_args, **_kwargs):
            return self._value

        def set_value(self, value):
            self._value = value

    class _Comp:
        frame_rate = 25.0
        dimensions = (1080.0, 1920.0)

    class _Layer:
        def __init__(self):
            self.parent_comp = _Comp()
            self.in_point = 0.0
            self.duration = 1.0
            self._anchor = _Prop((0.0, 0.0))
            self._pos = _Prop((0.0, 0.0))

        def get_property(self, stream):
            if stream == bd.PyFx.LayerStream.ANCHORPOINT:
                return self._anchor
            if stream == bd.PyFx.LayerStream.POSITION:
                return self._pos
            raise KeyError("unknown stream")

    class _LayerStream:
        ANCHORPOINT = "ANCHORPOINT"
        POSITION = "POSITION"

    class _LTimeMode:
        CompTime = 0

    layer = _Layer()

    monkeypatch.setattr(bd.ae, "UndoGroup", _UndoGroupCounter)
    monkeypatch.setattr(bd.ae.Layer, "active_layer", staticmethod(lambda: layer))
    monkeypatch.setattr(bd.PyFx, "LayerStream", _LayerStream, raising=False)
    monkeypatch.setattr(bd.PyFx, "LTimeMode", _LTimeMode, raising=False)

    out = bd.mediasolution_apply_auto_recentering(
        tracking_json_path=None,
        config={"apply_to_all_layers": False},
    )
    assert out["status"] == "success"
    assert out["layers_updated"] == 1
    assert _UndoGroupCounter.entered == 1


def test_load_tracking_data_by_frame_reads_dataByFrame(tmp_path):
    # Given: a tracking json with dataByFrame
    # When:  loading
    # Then:  int keys are parsed and non-list entries are ignored
    p = tmp_path / "t.json"
    p.write_text('{"dataByFrame": {"1": [{"id": "a"}], "bad": [{"id": "x"}], "2": "nope"}}', encoding="utf-8")
    out = bd._load_tracking_data_by_frame(str(p))
    assert out == {1: [{"id": "a"}]}


def test_load_tracking_data_by_frame_reads_frames_analysis(tmp_path):
    # Given: a tracking json with frames_analysis
    # When:  loading
    # Then:  objects are indexed and non-dict objects are filtered
    p = tmp_path / "t.json"
    p.write_text(
        '{"frames_analysis": [{"frame": 0, "objects": [{"id": "a"}, "x"]}, {"frame": "1", "objects": []}]}',
        encoding="utf-8",
    )
    out = bd._load_tracking_data_by_frame(str(p))
    assert out == {0: [{"id": "a"}], 1: []}


def test_load_tracking_data_by_frame_invalid_json_returns_empty(tmp_path):
    # Given: an invalid json file
    # When:  loading
    # Then:  empty dict is returned
    p = tmp_path / "bad.json"
    p.write_text("not json", encoding="utf-8")
    assert bd._load_tracking_data_by_frame(str(p)) == {}


def test_load_tracking_data_by_frame_missing_file_returns_empty(tmp_path):
    # Given: a missing json path
    # When:  loading
    # Then:  empty dict is returned
    p = tmp_path / "missing.json"
    assert bd._load_tracking_data_by_frame(str(p)) == {}


@pytest.mark.skipif(sys.platform.startswith("win"), reason="AF_UNIX sockets not supported on Windows")
def test_socket_transport_ping(tmp_path):
    # Given: a running BridgeDaemon with socket transport enabled
    # When:  sending a pipe-style payload to ping
    # Then:  response is ok and transport is 'pipe'
    import socket

    sock_path = tmp_path / "pyshift.sock"
    daemon = bd.BridgeDaemon(bridge_dir=str(tmp_path / "bridge"), socket_path=str(sock_path))
    daemon.start()
    time.sleep(0.1)

    client = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    client.connect(str(sock_path))
    payload = {"endpoint": "Response", "functionName": "ping", "args": {"param1": "{}"}}
    client.sendall((bd.json.dumps(payload) + "\n").encode("utf-8"))

    buf = b""
    while b"\n" not in buf:
        chunk = client.recv(4096)
        if not chunk:
            break
        buf += chunk
    client.close()
    daemon.stop()

    raw = buf.split(b"\n", 1)[0].decode("utf-8")
    resp = bd.json.loads(raw)
    assert resp["ok"] is True
    assert resp["result"]["status"] == "ok"
    assert resp["result"]["transport"] == "pipe"
