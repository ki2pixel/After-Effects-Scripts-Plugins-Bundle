import sys
import types

import pytest


# --- Test perspectives table ---
#
# | Case ID | Input / Precondition | Perspective (Equivalence / Boundary) | Expected Result | Notes |
# |--------|----------------------|---------------------------------------|-----------------|-------|
# | GC-N-01 | compute_grid_positions(2,3,1, spacing=10/20/0) | Equivalence – normal | Returns 6 coords | - |
# | GC-N-02 | compute_grid_positions(2,3,2, max_clones=5) | Boundary – max_clones cap | Returns 5 coords | - |
# | GC-A-01 | compute_grid_positions(rows=0,...) | Boundary – 0 / invalid | Raises ValueError | - |
# | GC-A-02 | compute_grid_positions(max_clones=0) | Boundary – 0 / invalid | Raises ValueError | - |
# | GC-N-03 | handler gridcloner_apply with string/int/bool coercion | Equivalence – normal | Dispatches to resolved fn with coerced args | - |
# | GC-A-03 | handler with spacing abs > MAX_SPACING | Boundary – over max | Raises ValueError | - |
# | GC-A-04 | handler with depth<=0 | Boundary – invalid | Raises ValueError | - |
# | GC-N-04 | handler max_clones > 200 | Boundary – clamp | Dispatches with max_clones==200 | - |
#


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

        ae_stub.UndoGroup = _UndoGroup
        sys.modules["pyshiftae"] = ae_stub

    if "PyFx" not in sys.modules:
        sys.modules["PyFx"] = types.ModuleType("PyFx")


_ensure_stubbed_pyshiftae_and_pyfx()

from PyShiftBridge.gridcloner import core as gc_core  # noqa: E402
from PyShiftBridge.gridcloner import handlers as gc_handlers  # noqa: E402


def test_compute_grid_positions_returns_cartesian_coords():
    # Given: rows/cols/depth with spacing
    sp = gc_core.Spacing(x=10.0, y=20.0, z=0.0)

    # When: computing positions
    coords = gc_core.compute_grid_positions(rows=2, columns=3, depth=1, spacing=sp, max_clones=200)

    # Then: count and a few coordinates match expectations
    assert len(coords) == 6
    assert coords[0] == (0.0, 0.0, 0.0)
    assert coords[1] == (10.0, 0.0, 0.0)
    assert coords[3] == (0.0, 20.0, 0.0)


def test_compute_grid_positions_respects_max_clones_cap():
    # Given: a larger grid but a small max_clones
    sp = gc_core.Spacing(x=1.0, y=1.0, z=1.0)

    # When: computing positions
    coords = gc_core.compute_grid_positions(rows=2, columns=3, depth=2, spacing=sp, max_clones=5)

    # Then: it stops early
    assert len(coords) == 5


def test_compute_grid_positions_rows_zero_raises():
    # Given: invalid rows
    sp = gc_core.Spacing(x=1.0, y=1.0, z=1.0)

    # When/Then: ValueError
    with pytest.raises(ValueError, match=r"rows/columns/depth must be > 0"):
        gc_core.compute_grid_positions(rows=0, columns=1, depth=1, spacing=sp, max_clones=10)


def test_compute_grid_positions_max_clones_zero_raises():
    # Given: invalid max_clones
    sp = gc_core.Spacing(x=1.0, y=1.0, z=1.0)

    # When/Then: ValueError
    with pytest.raises(ValueError, match=r"max_clones must be > 0"):
        gc_core.compute_grid_positions(rows=1, columns=1, depth=1, spacing=sp, max_clones=0)


def test_handler_coerces_types_and_dispatches():
    # Given: a registry and a resolver capturing args
    called = {}

    def _resolved(**kwargs):
        called.update(kwargs)
        return {"status": "ok"}

    def _resolve(name: str):
        assert name == "gridcloner_apply"
        return _resolved

    registry = {}
    gc_handlers.register_handlers(registry, _resolve)

    # When: calling handler with mixed types
    out = registry["gridcloner_apply"](
        {
            "rows": "2",
            "columns": 3.0,
            "depth": 1,
            "spacing": {"x": "12", "y": 34, "z": 0},
            "enable3D": "true",
            "linkOpacityToNull": 1,
            "linkScaleToNull": 0,
            "controllerName": "CTRL",
            "max_clones": 199,
            "DISABLE_UNDO_GROUP": "false",
        }
    )

    # Then: dispatch succeeds with coerced values
    assert out["status"] == "ok"
    assert called["rows"] == 2
    assert called["columns"] == 3
    assert called["depth"] == 1
    assert called["spacing"] == {"x": 12.0, "y": 34.0, "z": 0.0}
    assert called["enable_3d"] is True
    assert called["link_opacity_to_null"] is True
    assert called["link_scale_to_null"] is False
    assert called["controller_name"] == "CTRL"
    assert called["max_clones"] == 199
    assert called["disable_undo_group"] is False


def test_handler_spacing_over_max_raises():
    # Given: a registered handler with resolver stub
    def _resolve(_name: str):
        return lambda **_kwargs: {"status": "ok"}

    registry = {}
    gc_handlers.register_handlers(registry, _resolve)

    # When/Then: spacing exceeds MAX_SPACING
    with pytest.raises(ValueError, match=r"Invalid args\.spacing"):
        registry["gridcloner_apply"](
            {
                "rows": 1,
                "columns": 1,
                "depth": 1,
                "spacing": {"x": gc_handlers.MAX_SPACING + 1.0, "y": 0, "z": 0},
            }
        )


def test_handler_invalid_depth_raises():
    # Given: a registered handler with resolver stub
    def _resolve(_name: str):
        return lambda **_kwargs: {"status": "ok"}

    registry = {}
    gc_handlers.register_handlers(registry, _resolve)

    # When/Then: invalid depth
    with pytest.raises(ValueError, match=r"Invalid args\.depth"):
        registry["gridcloner_apply"](
            {
                "rows": 1,
                "columns": 1,
                "depth": 0,
                "spacing": {"x": 0, "y": 0, "z": 0},
            }
        )


def test_handler_clamps_max_clones_to_200():
    # Given: a resolver capturing args
    called = {}

    def _resolved(**kwargs):
        called.update(kwargs)
        return {"status": "ok"}

    def _resolve(_name: str):
        return _resolved

    registry = {}
    gc_handlers.register_handlers(registry, _resolve)

    # When: providing max_clones > MAX_CLONES
    out = registry["gridcloner_apply"](
        {
            "rows": 1,
            "columns": 1,
            "depth": 1,
            "spacing": {"x": 0, "y": 0, "z": 0},
            "max_clones": 999,
        }
    )

    # Then: handler clamps it
    assert out["status"] == "ok"
    assert called["max_clones"] == gc_handlers.MAX_CLONES
