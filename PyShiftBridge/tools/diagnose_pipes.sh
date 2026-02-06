#!/bin/bash
# diagnose_pipes.sh
# Script to discover Unix Domain Sockets that might belong to PyShiftAE on macOS/Linux
# Run this while After Effects is running with PyShiftAE loaded

echo "=== PyShiftAE Unix Domain Socket Diagnostic ==="
echo "Scanning common socket directories..."

# Common socket directories
SOCK_DIRS=("/tmp" "/var/run" "$HOME/Library/Application Support/Adobe/CEP" "$HOME/.adobe")

found_sockets=()

for dir in "${SOCK_DIRS[@]}"; do
    if [[ -d "$dir" ]]; then
        echo "Scanning: $dir"
        # Find socket files (type s) and filter for likely PyShiftAE-related names
        while IFS= read -r -d '' socket; do
            socket_name=$(basename "$socket")
            
            # Filter for likely PyShiftAE-related sockets
            if [[ "$socket_name" =~ (Py|Shift|AE|CEPy|pyfx|aefx|PyShift|PyFX|AEFX|CEP|adobe) ]]; then
                found_sockets+=("$socket|$socket_name|Likely PyShiftAE")
            # Also catch UUID-like patterns
            elif [[ "$socket_name" =~ ^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$ ]]; then
                found_sockets+=("$socket|$socket_name|UUID (possible Adobe extension)")
            fi
        done < <(find "$dir" -type s -print0 2>/dev/null)
    fi
done

if [[ ${#found_sockets[@]} -gt 0 ]]; then
    echo ""
    echo "=== RELEVANT SOCKETS FOUND ==="
    for socket_info in "${found_sockets[@]}"; do
        IFS='|' read -r socket_path socket_name socket_type <<< "$socket_info"
        echo "• $socket_name"
        echo "  Path: $socket_path"
        echo "  Type: $socket_type"
        echo ""
    done
    
    echo "=== NEXT STEPS ==="
    echo "1. Try these socket paths in PyShiftBridge by setting localStorage:"
    echo "   In browser console: localStorage.setItem('pyshift_pipe_name', '<socket_path>');"
    echo "2. Reload the CEP panel and check console for 'Pipe connected' message"
    echo "3. If none work, PyShiftAE might not expose a Unix Domain Socket"
else
    echo ""
    echo "=== NO RELEVANT SOCKETS FOUND ==="
    echo "Possible reasons:"
    echo "- PyShiftAE is not loaded/running"
    echo "- PyShiftAE doesn't expose a Unix Domain Socket"
    echo "- Socket name doesn't match our filters"
    echo ""
    echo "Showing ALL sockets in /tmp for manual inspection:"
    find /tmp -type s 2>/dev/null | head -20
fi

echo ""
echo "=== TIPS ==="
echo "- Run this script AFTER launching After Effects with PyShiftAE"
echo "- Some sockets might appear/disappear dynamically"
echo "- Check PyShiftAE documentation for socket naming conventions"
echo "- On macOS, Adobe CEP sockets are often in ~/Library/Application Support/Adobe/CEP"
