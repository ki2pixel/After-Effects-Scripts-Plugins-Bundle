#!/usr/bin/env bash
set -euo pipefail

EXT_SRC="$(cd "$(dirname "$0")/.." && pwd)"

# Common CEP extension locations on Linux. The exact path can vary by CEP/host version.
CANDIDATES=(
  "$HOME/.config/Adobe/CEP/extensions"
  "$HOME/.local/share/Adobe/CEP/extensions"
)

CEP_BASE=""
for d in "${CANDIDATES[@]}"; do
  if [[ -d "$d" ]]; then
    CEP_BASE="$d"
    break
  fi
done

if [[ -z "$CEP_BASE" ]]; then
  # Default to the first candidate if none exist.
  CEP_BASE="${CANDIDATES[0]}"
fi

CEP_EXT_DIR="$CEP_BASE/PyShiftBridge"

echo "Installing PyShiftBridge CEP extension..."
echo "Source: $EXT_SRC"
echo "Target: $CEP_EXT_DIR"

mkdir -p "$CEP_BASE"
rm -rf "$CEP_EXT_DIR"
cp -R "$EXT_SRC" "$CEP_EXT_DIR"

echo "Done. Restart After Effects."
echo "NOTE: You may need to enable unsigned CEP extensions (PlayerDebugMode)."
