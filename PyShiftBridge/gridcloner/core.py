from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List, Tuple

import pyshiftae as ae
import PyFx


DEFAULT_MAX_CLONES = 200


@dataclass(frozen=True)
class Spacing:
    x: float
    y: float
    z: float


def compute_grid_positions(
    rows: int,
    columns: int,
    depth: int,
    spacing: Spacing,
    max_clones: int = DEFAULT_MAX_CLONES,
) -> List[Tuple[float, float, float]]:
    if rows <= 0 or columns <= 0 or depth <= 0:
        raise ValueError("rows/columns/depth must be > 0")
    if max_clones <= 0:
        raise ValueError("max_clones must be > 0")

    coords: List[Tuple[float, float, float]] = []
    for dz in range(depth):
        for r in range(rows):
            for c in range(columns):
                if len(coords) >= max_clones:
                    return coords
                coords.append((c * spacing.x, r * spacing.y, dz * spacing.z))
    return coords


def _ensure_controller_null(comp: ae.CompItem, name: str, notes: List[str]) -> ae.Layer:
    layers = comp.layers

    base_name = name
    chosen = base_name
    n = 1
    while True:
        try:
            existing = layers[chosen]
            notes.append("controller_exists")
            return existing
        except Exception:
            pass

        try:
            ctrl = layers.add_null(chosen, duration=float(comp.duration))
            return ctrl
        except Exception:
            n += 1
            chosen = f"{base_name} ({n})"


def _apply_slider(ctrl: ae.Layer, effect_match_name: str, slider_name: str, default_value: float) -> None:
    fx = ae.Effect.apply(ctrl, effect_match_name)
    if fx is None:
        raise RuntimeError(f"Effect apply failed: {effect_match_name}")

    p = fx.param("Slider")
    if p is None:
        p = fx.param("ADBE Slider Control-0001")
    if p is None:
        raise RuntimeError("Slider parameter not found")

    try:
        p.set_value(float(default_value))
    except Exception as e:
        raise RuntimeError(f"Failed setting slider value: {e}")

    try:
        fx_name = getattr(fx, "name", None)
        if isinstance(fx_name, str) and fx_name:
            pass
    except Exception:
        pass


def gridcloner_apply(
    rows: int,
    columns: int,
    depth: int,
    spacing: Dict[str, Any],
    enable_3d: bool,
    link_opacity_to_null: bool,
    link_scale_to_null: bool,
    controller_name: str,
    max_clones: int = DEFAULT_MAX_CLONES,
    disable_undo_group: bool = False,
) -> Dict[str, Any]:
    layer = ae.Layer.active_layer()
    if layer is None:
        raise RuntimeError("No active layer. Select a base layer and retry.")

    comp = layer.parent_comp
    if comp is None:
        raise RuntimeError("Active layer has no parent comp")

    sp = Spacing(
        x=float(spacing.get("x", 0.0) or 0.0),
        y=float(spacing.get("y", 0.0) or 0.0),
        z=float(spacing.get("z", 0.0) or 0.0),
    )

    coords = compute_grid_positions(rows, columns, depth, sp, max_clones=max_clones)

    notes: List[str] = []
    if rows * columns * depth > len(coords):
        notes.append("max_clones_reached")

    def _apply() -> int:
        base = ae.Layer.active_layer()
        if base is None:
            raise RuntimeError("Base layer lost. Re-select and retry.")

        created = 0

        if enable_3d or depth > 1 or abs(sp.z) > 0.0:
            try:
                PyFx.LayerSuite().SetLayerFlag(base.layer, PyFx.LayerFlag.LAYER_IS_3D, True)
            except Exception:
                notes.append("cannot_force_3d_base")

        ctrl = None
        if link_opacity_to_null or link_scale_to_null:
            ctrl = _ensure_controller_null(comp, controller_name, notes)
            try:
                PyFx.LayerSuite().SetLayerFlag(ctrl.layer, PyFx.LayerFlag.LAYER_IS_3D, True)
            except Exception:
                pass

            try:
                _apply_slider(ctrl, "ADBE Slider Control", "Opacity Control", 100.0)
            except Exception:
                notes.append("slider_create_failed")

            notes.append("expressions_not_supported")

        try:
            base_pos = base.position.get_value(PyFx.LTimeMode.CompTime, 0.0, True)
        except Exception:
            base_pos = (0.0, 0.0, 0.0)

        for (dx, dy, dz) in coords:
            dup = base.duplicate()
            try:
                if enable_3d or depth > 1 or abs(dz) > 0.0:
                    PyFx.LayerSuite().SetLayerFlag(dup.layer, PyFx.LayerFlag.LAYER_IS_3D, True)
            except Exception:
                notes.append("cannot_force_3d_clone")

            dup.position.set_value((float(base_pos[0]) + dx, float(base_pos[1]) + dy, float(base_pos[2]) + dz))
            created += 1

        return created

    if disable_undo_group:
        created_count = _apply()
    else:
        with ae.UndoGroup("GridCloner Apply"):
            created_count = _apply()

    return {"status": "ok", "created_count": int(created_count), "notes": notes}
