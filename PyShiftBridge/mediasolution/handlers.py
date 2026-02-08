from __future__ import annotations

from typing import Any, Callable, Dict, Optional

ArgsDict = Dict[str, Any]
HandlerFn = Callable[[ArgsDict], Dict[str, Any]]
ResolveFn = Callable[[str], Callable[..., Dict[str, Any]]]


def register_handlers(registry: Dict[str, HandlerFn], resolve: ResolveFn) -> None:
    registry["mediasolution_apply_cuts_active_layer"] = _handle_apply_cuts_active_layer(resolve)
    registry["mediasolution_apply_auto_recentering"] = _handle_apply_auto_recentering(resolve)
    registry["mediasolution_import_images_from_folder"] = _handle_import_images_from_folder(resolve)
    registry["mediasolution_batch_prepare_active_layer"] = _handle_batch_prepare_active_layer(resolve)
    registry["mediasolution_create_base_aep_for_video"] = _handle_create_base_aep_for_video(resolve)
    registry["mediasolution_open_project_and_select_comp"] = _handle_open_project_and_select_comp(resolve)


def _coerce_config(value: Any) -> Dict[str, Any]:
    if isinstance(value, dict):
        return value
    return {}


def _coerce_str_or_none(value: Any) -> Optional[str]:
    if isinstance(value, str):
        return value
    return None


def _handle_apply_cuts_active_layer(resolve: ResolveFn) -> HandlerFn:
    def _handler(args: ArgsDict) -> Dict[str, Any]:
        csv_path = args.get("csv_path")
        if not isinstance(csv_path, str) or not csv_path:
            raise ValueError("Missing args.csv_path")

        frame_rate = args.get("frame_rate")
        try:
            fr = float(frame_rate)
        except Exception:
            fr = 0.0
        if fr <= 0.0:
            raise ValueError("Invalid args.frame_rate")

        comp_duration = args.get("comp_duration")
        try:
            cd = float(comp_duration) if comp_duration is not None else None
        except Exception:
            cd = None

        snap_factor = args.get("snap_factor")
        try:
            sf = float(snap_factor) if snap_factor is not None else 1.5
        except Exception:
            sf = 1.5

        tracking_json_path = _coerce_str_or_none(args.get("tracking_json_path"))
        cfg = _coerce_config(args.get("config"))

        fn = resolve("mediasolution_apply_cuts_active_layer")
        return fn(
            csv_path=csv_path,
            frame_rate=fr,
            comp_duration=cd,
            snap_factor=sf,
            tracking_json_path=tracking_json_path,
            config=cfg,
        )

    return _handler


def _handle_apply_auto_recentering(resolve: ResolveFn) -> HandlerFn:
    def _handler(args: ArgsDict) -> Dict[str, Any]:
        tracking_json_path = _coerce_str_or_none(args.get("tracking_json_path"))
        cfg = _coerce_config(args.get("config"))

        fn = resolve("mediasolution_apply_auto_recentering")
        return fn(tracking_json_path=tracking_json_path, config=cfg)

    return _handler


def _handle_import_images_from_folder(resolve: ResolveFn) -> HandlerFn:
    def _handler(args: ArgsDict) -> Dict[str, Any]:
        folder_path = args.get("folder_path")
        if not isinstance(folder_path, str) or not folder_path:
            raise ValueError("Missing args.folder_path")
        extensions = args.get("extensions")
        if not isinstance(extensions, list):
            extensions = []

        fn = resolve("mediasolution_import_images_from_folder")
        return fn(folder_path=folder_path, extensions=extensions)

    return _handler


def _handle_batch_prepare_active_layer(resolve: ResolveFn) -> HandlerFn:
    def _handler(args: ArgsDict) -> Dict[str, Any]:
        cfg = _coerce_config(args.get("config"))
        fn = resolve("mediasolution_batch_prepare_active_layer")
        return fn(config=cfg)

    return _handler


def _handle_create_base_aep_for_video(resolve: ResolveFn) -> HandlerFn:
    def _handler(args: ArgsDict) -> Dict[str, Any]:
        video_path = args.get("video_path")
        if not isinstance(video_path, str) or not video_path:
            raise ValueError("Missing args.video_path")
        aep_path = args.get("aep_path")
        if not isinstance(aep_path, str) or not aep_path:
            raise ValueError("Missing args.aep_path")
        comp_name = args.get("comp_name")
        if not isinstance(comp_name, str) or not comp_name:
            raise ValueError("Missing args.comp_name")
        cfg = _coerce_config(args.get("config"))

        fn = resolve("mediasolution_create_base_aep_for_video")
        return fn(video_path=video_path, aep_path=aep_path, comp_name=comp_name, config=cfg)

    return _handler


def _handle_open_project_and_select_comp(resolve: ResolveFn) -> HandlerFn:
    def _handler(args: ArgsDict) -> Dict[str, Any]:
        aep_path = args.get("aep_path")
        if not isinstance(aep_path, str) or not aep_path:
            raise ValueError("Missing args.aep_path")
        suffix = args.get("comp_name_suffix")
        if not isinstance(suffix, str):
            suffix = ""
        cfg = _coerce_config(args.get("config"))

        fn = resolve("mediasolution_open_project_and_select_comp")
        return fn(aep_path=aep_path, comp_name_suffix=suffix, config=cfg)

    return _handler
