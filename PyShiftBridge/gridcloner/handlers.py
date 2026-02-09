from __future__ import annotations

from typing import Any, Callable, Dict

ArgsDict = Dict[str, Any]
HandlerFn = Callable[[ArgsDict], Dict[str, Any]]
ResolveFn = Callable[[str], Callable[..., Dict[str, Any]]]


MAX_CLONES = 200
MAX_SPACING = 5000.0


def register_handlers(registry: Dict[str, HandlerFn], resolve: ResolveFn) -> None:
    registry["gridcloner_apply"] = _handle_gridcloner_apply(resolve)


def _coerce_int(value: Any, default: int) -> int:
    try:
        return int(value)
    except Exception:
        return int(default)


def _coerce_float(value: Any, default: float) -> float:
    try:
        return float(value)
    except Exception:
        return float(default)


def _coerce_bool(value: Any, default: bool = False) -> bool:
    if isinstance(value, bool):
        return value
    if isinstance(value, (int, float)):
        return bool(value)
    if isinstance(value, str):
        v = value.strip().lower()
        if v in ("1", "true", "yes", "on"):
            return True
        if v in ("0", "false", "no", "off"):
            return False
    return bool(default)


def _coerce_spacing(value: Any) -> Dict[str, float]:
    if not isinstance(value, dict):
        value = {}
    x = _coerce_float(value.get("x"), 0.0)
    y = _coerce_float(value.get("y"), 0.0)
    z = _coerce_float(value.get("z"), 0.0)

    if abs(x) > MAX_SPACING or abs(y) > MAX_SPACING or abs(z) > MAX_SPACING:
        raise ValueError(f"Invalid args.spacing (max abs {MAX_SPACING})")

    return {"x": x, "y": y, "z": z}


def _handle_gridcloner_apply(resolve: ResolveFn) -> HandlerFn:
    def _handler(args: ArgsDict) -> Dict[str, Any]:
        rows = _coerce_int(args.get("rows"), 1)
        columns = _coerce_int(args.get("columns"), 1)
        depth = _coerce_int(args.get("depth"), 1)

        if rows <= 0:
            raise ValueError("Invalid args.rows")
        if columns <= 0:
            raise ValueError("Invalid args.columns")
        if depth <= 0:
            raise ValueError("Invalid args.depth")

        total = rows * columns * depth
        if total <= 0:
            raise ValueError("Invalid clone count")

        spacing = _coerce_spacing(args.get("spacing"))

        enable_3d = _coerce_bool(args.get("enable3D"), False)
        link_opacity = _coerce_bool(args.get("linkOpacityToNull"), False)
        link_scale = _coerce_bool(args.get("linkScaleToNull"), False)
        controller_name = args.get("controllerName")
        if not isinstance(controller_name, str) or not controller_name.strip():
            controller_name = "Grid CTRL"

        max_clones = _coerce_int(args.get("max_clones"), MAX_CLONES)
        if max_clones <= 0:
            max_clones = MAX_CLONES
        if max_clones > MAX_CLONES:
            max_clones = MAX_CLONES

        disable_undo = _coerce_bool(args.get("DISABLE_UNDO_GROUP"), False)

        fn = resolve("gridcloner_apply")
        return fn(
            rows=rows,
            columns=columns,
            depth=depth,
            spacing=spacing,
            enable_3d=enable_3d,
            link_opacity_to_null=link_opacity,
            link_scale_to_null=link_scale,
            controller_name=controller_name,
            max_clones=max_clones,
            disable_undo_group=disable_undo,
        )

    return _handler
