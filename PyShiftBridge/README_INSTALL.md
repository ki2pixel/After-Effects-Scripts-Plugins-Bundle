# PyShiftBridge CEP Extension - Installation & Setup

## Overview
PyShiftBridge is a CEP (Common Extensibility Platform) panel that provides real-time communication between After Effects UI and PyShiftAE Python backend. It supports two transport modes:
- **Native Pipe/Socket** (high-performance, low-latency)
- **Mailbox JSON** (fallback, compatible)

---

## 1. Installation

### Windows
```powershell
# Copy to Adobe CEP extensions directory
Copy-Item -Recurse "PyShiftBridge" "$env:APPDATA\Adobe\CEP\extensions\com.kidpixel.pyshiftbridge"
```

### macOS
```bash
# Copy to Adobe CEP extensions directory
cp -r PyShiftBridge ~/Library/Application\ Support/Adobe/CEP/extensions/com.kidpixel.pyshiftbridge
```

### Linux
```bash
# Use the provided install script
./PyShiftBridge/install/install_linux.sh
# Or manually copy:
cp -r PyShiftBridge ~/.adobe/CEP/extensions/com.kidpixel.pyshiftbridge
```

---

## 2. Enable Debug Mode

### Windows
1. Open Registry Editor (`regedit`)
2. Navigate to `HKEY_CURRENT_USER\Software\Adobe\CSXS.11` (for AE 2024) or appropriate CSXS version
3. Create DWORD `PlayerDebugMode` with value `1`

### macOS/Linux
```bash
# Create debug preference file
mkdir -p ~/Library/Application\ Support/Adobe/CSXS.11
echo '<?xml version="1.0" encoding="UTF-8"?>
<Preference>
  <key>PlayerDebugMode</key>
  <integer>1</integer>
</Preference>' > ~/Library/Application\ Support/Adobe/CSXS.11/com.kidpixel.pyshiftbridge.plist
```

---

## 3. Discover Named Pipe/Socket

### Step 1: Launch After Effects with PyShiftAE
- Start After Effects
- Load/enable PyShiftAE plugin
- Keep PyShiftAE running

### Step 2: Run Diagnostic Script

#### Windows (PowerShell)
```powershell
cd PyShiftBridge\tools
.\diagnose_pipes.ps1
```

#### macOS/Linux
```bash
cd PyShiftBridge/tools
./diagnose_pipes.sh
```

### Step 3: Configure Pipe Name
The diagnostic will show potential pipe/socket names. Once identified:

1. Open After Effects
2. Open PyShiftBridge panel (`Window > Extensions > PyShiftBridge`)
3. Open Developer Console (right-click → Inspect)
4. Set the pipe name:
```javascript
localStorage.setItem('pyshift_pipe_name', 'YOUR_PIPE_NAME_HERE');
```
5. Reload the panel (close/reopen)

---

## 4. Verify Connection

### Success Indicators
- **Console shows**: `Pipe connected: [pipe_name]`
- **Status displays**: `Idle` (not `Booting` or `ERROR`)
- **Bridge path shows**: Extension path with `(pipe)` suffix
- **No polling errors** in console

### Troubleshooting
- **"Pipe unavailable, falling back to mailbox"**: PyShiftAE doesn't expose a pipe, or name is incorrect
- **"Python ERROR"**: Python backend not responding (check daemon)
- **Empty log**: Check if bridge_daemon.py is running

---

## 5. Transport Modes

### Native Pipe/Socket (Preferred)
- **Real-time**: Immediate request/response
- **Low latency**: No file I/O
- **Best for**: Sliders, mouse interactions, scrubbing
- **Requirement**: PyShiftAE must expose named pipe/Unix socket

### Mailbox JSON (Fallback)
- **Robust**: File-based communication
- **Universal**: Works without pipe server
- **Higher latency**: File polling (300ms intervals)
- **Best for**: Debugging, compatibility, slow operations

---

## 6. Development & Debugging

### Console Commands
```javascript
// Check current transport
console.log('Transport:', transport);

// Force transport mode
localStorage.setItem('pyshift_pipe_name', 'custom_pipe');

// Clear pipe preference (fallback to mailbox)
localStorage.removeItem('pyshift_pipe_name');

// Check bridge directory
$._PyShiftBridge.getBridgeDir();
```

### File Locations
- **CEP Panel**: `PyShiftBridge/js/main.js`
- **JSX Bridge**: `PyShiftBridge/jsx/bridge.jsx`
- **Python Daemon**: `PyShiftBridge/bridge_daemon.py`
- **Manifest**: `PyShiftBridge/CSXS/manifest.xml`

### Testing Commands
```javascript
// Test Python connection
sendCommandToPython('set_first_fill_opacity', {opacity: 50});

// Test selection polling
pollSelectionSignature();
```

---

## 7. Architecture Notes

### Hybrid 2.0
- **Auto-detection**: Tries pipe first, falls back to mailbox
- **Graceful degradation**: Works even if PyShiftAE doesn't expose pipes
- **Performance**: Uses native transport when available

### Communication Flow
```
CEP Panel → [Pipe/Socket] → PyShiftAE Python → Response → CEP Panel
     OR
CEP Panel → JSON Files → bridge_daemon.py → PyShiftAE → JSON Files → CEP Panel
```

---

## 8. Common Issues

### "Pipe unavailable"
- PyShiftAE not running
- Incorrect pipe name
- PyShiftAE version doesn't expose pipes

### "Python ERROR"
- bridge_daemon.py not running (mailbox mode)
- Python script errors
- Permission issues

### Panel not appearing
- Extension not installed correctly
- Debug mode not enabled
- After Effects restart required

---

## 9. Performance Tips

1. **Use Pipe Mode**: Enable for real-time interactions
2. **Reduce Polling**: Lower interval in mailbox mode if needed
3. **Batch Commands**: Group multiple operations
4. **Monitor Console**: Check for connection drops

---

## 10. Support

- **Documentation**: `docs/internal/pyshiftae_implementation_shape_navigator_cep_bridge.md`
- **Source Code**: `PyShiftBridge/` directory
- **Diagnostic Tools**: `PyShiftBridge/tools/`

For issues, check the console output first, then run the diagnostic script to verify pipe availability.
