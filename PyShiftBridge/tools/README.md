# PyShiftBridge Diagnostic Tools

## Overview
This directory contains diagnostic scripts to discover PyShiftAE's named pipes or Unix domain sockets.

---

## Files

### `diagnose_pipes.ps1` (Windows)
PowerShell script to scan for named pipes that might belong to PyShiftAE.

**Usage:**
```powershell
cd PyShiftBridge\tools
.\diagnose_pipes.ps1
```

**Features:**
- Lists all named pipes on the system
- Filters for PyShiftAE-related patterns
- Identifies UUID patterns (common in Adobe extensions)
- Provides next-step instructions

### `diagnose_pipes.sh` (macOS/Linux)
Bash script to scan for Unix domain sockets that might belong to PyShiftAE.

**Usage:**
```bash
cd PyShiftBridge/tools
./diagnose_pipes.sh
```

**Features:**
- Scans common socket directories (`/tmp`, `/var/run`, Adobe CEP directories)
- Filters for PyShiftAE-related patterns
- Identifies UUID patterns
- Provides platform-specific guidance

---

## When to Use

### Before First Setup
Run these scripts when:
- Setting up PyShiftBridge for the first time
- PyShiftAE version has changed
- Switching between different PyShiftAE installations

### Troubleshooting
Run when:
- "Pipe unavailable" errors occur
- Connection fails unexpectedly
- Need to verify pipe/socket availability

---

## Expected Output

### Success Case
```
=== RELEVANT PIPES FOUND ===
• PyShiftAE
  Path: \\.\pipe\PyShiftAE
  Type: Likely PyShiftAE

=== NEXT STEPS ===
1. Try these pipe names in PyShiftBridge...
```

### No Pipes Found
```
=== NO RELEVANT PIPES FOUND ===
Possible reasons:
- PyShiftAE is not loaded/running
- PyShiftAE doesn't expose a named pipe
```

---

## Common Pipe Names

Based on PyShiftAE patterns:
- `PyShiftAE` (default)
- `CEPy` (from CEPy-Resources)
- `PyFX` (from PyFX project)
- UUID patterns (Adobe-style)

---

## Platform Notes

### Windows
- Requires PowerShell
- May need Administrator privileges for some pipes
- Named pipes use format: `\\.\pipe\<name>`

### macOS/Linux
- Requires bash/zsh
- Unix domain sockets use filesystem paths
- Common locations: `/tmp`, `/var/run`, Adobe CEP directories

---

## Integration with PyShiftBridge

Once you find the pipe name:

1. **Set via console:**
   ```javascript
   localStorage.setItem('pyshift_pipe_name', 'YourPipeName');
   ```

2. **Reload the panel** to apply changes

3. **Check console** for "Pipe connected" message

---

## Advanced Usage

### Custom Filters
Edit the scripts to add custom patterns:
```powershell
# PowerShell
if ($pipeName -match "YourCustomPattern") { ... }
```

```bash
# Bash
if [[ "$socket_name" =~ YourCustomPattern ]]; then ... fi
```

### Manual Inspection
If automatic filtering misses pipes:
```powershell
# Show all pipes
[System.IO.Directory]::GetFiles("\\.\pipe\")
```

```bash
# Show all sockets
find /tmp -type s
```

---

## Troubleshooting

### Script Errors
- **PowerShell**: Run as Administrator
- **Bash**: Check script permissions: `chmod +x diagnose_pipes.sh`

### No Results
- Verify PyShiftAE is running
- Check if PyShiftAE version supports pipes
- Try running with elevated privileges

### Too Many Results
- Refine filter patterns in scripts
- Focus on recently created pipes/sockets
- Cross-reference with PyShiftAE documentation

---

## Security Notes

- These scripts only read pipe/socket names
- No data is transmitted through pipes/sockets
- No modification of system files
- Safe to run in production environments
