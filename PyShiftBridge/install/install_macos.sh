#!/usr/bin/env bash
set -euo pipefail

EXT_SRC="$(cd "$(dirname "$0")/.." && pwd)"
CEP_EXT_DIR="$HOME/Library/Application Support/Adobe/CEP/extensions/PyShiftBridge"

echo "Installing PyShiftBridge CEP extension..."
echo "Source: $EXT_SRC"
echo "Target: $CEP_EXT_DIR"

mkdir -p "$(dirname "$CEP_EXT_DIR")"
rm -rf "$CEP_EXT_DIR"
cp -R "$EXT_SRC" "$CEP_EXT_DIR"

echo "Done. Restart After Effects."
echo "NOTE: You may need to enable unsigned CEP extensions (PlayerDebugMode)."
