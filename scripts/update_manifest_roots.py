#!/usr/bin/env python3
"""Utility to rewrite manifest root paths to the local workspace.

The historical manifests were generated on another machine where files lived
under ``/media/kidpixel/WORK/Backup``.  This script normalizes their
``root`` field so that it points at the current repository instead.  It updates
``blob_manifest.json``, ``blob_manifest_fresh.json`` and every manifest inside
``regenerated_manifests``.

Run from anywhere:

    python scripts/update_manifest_roots.py

Use ``--dry-run`` to preview the changes without touching the files.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Iterable


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--repo-root",
        type=Path,
        default=Path(__file__).resolve().parent.parent,
        help="Repository root (defaults to the parent of this script)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Compute the new roots but do not rewrite any file",
    )
    return parser.parse_args()


def iter_manifest_files(repo_root: Path) -> list[Path]:
    files = [
        repo_root / "blob_manifest.json",
        repo_root / "blob_manifest_fresh.json",
    ]
    regen_dir = repo_root / "regenerated_manifests"
    if regen_dir.is_dir():
        files.extend(sorted(regen_dir.glob("*.json")))
    return [path for path in files if path.is_file()]


def rewrite_root_value(original: str, prefixes: Iterable[Path], new_base: Path) -> str:
    source_path = Path(original)
    for prefix in prefixes:
        try:
            remainder = source_path.relative_to(prefix)
        except ValueError:
            continue
        new_path = new_base if str(remainder) == "." else new_base / remainder
        return str(new_path)
    return original


def process_file(path: Path, prefixes: Iterable[Path], new_base: Path, dry_run: bool) -> bool:
    with path.open("r", encoding="utf-8") as handle:
        data = json.load(handle)

    original_root = data.get("root")
    if not isinstance(original_root, str):
        print(f"[skip] {path} has no string 'root' field")
        return False

    updated_root = rewrite_root_value(original_root, prefixes, new_base)
    if updated_root == original_root:
        print(f"[ok]   {path} (no change)")
        return False

    data["root"] = updated_root
    if dry_run:
        print(f"[dry] {path}\n      {original_root}\n      -> {updated_root}")
        return True

    with path.open("w", encoding="utf-8") as handle:
        json.dump(data, handle, indent=2, ensure_ascii=False)
        handle.write("\n")

    print(f"[fix]  {path}\n      {original_root}\n      -> {updated_root}")
    return True


def main() -> None:
    args = parse_args()
    repo_root = args.repo_root.resolve()

    if not repo_root.is_dir():
        raise SystemExit(f"Repository root '{repo_root}' does not exist")

    target_files = iter_manifest_files(repo_root)
    if not target_files:
        raise SystemExit("No manifest files were found")

    old_prefixes = tuple(
        Path(prefix)
        for prefix in (
            "/media/kidpixel/WORK/Backup/regenerated_jsx",
            "/media/kidpixel/WORK/Backup/regenerated_jsx_fresh",
            "/media/kidpixel/WORK/Backup/decompiled_jsx",
            "/media/kidpixel/WORK/Backup/decompiled_jsx_fresh",
        )
    )

    changed_files = 0
    for file_path in target_files:
        changed = process_file(file_path, old_prefixes, repo_root, args.dry_run)
        changed_files += int(changed)

    status = "would be updated" if args.dry_run else "updated"
    print(f"\nSummary: {changed_files} file(s) {status}.")


if __name__ == "__main__":
    main()
