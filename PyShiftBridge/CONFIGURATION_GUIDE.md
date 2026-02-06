# PyShiftBridge - Configuration Guide

## Named Pipe/Socket Configuration

Once you've identified the pipe name using the diagnostic script, here's how to configure it:

---

## 1. Setting the Pipe Name

### Method A: Browser Console (Recommended)
1. Open PyShiftBridge panel in After Effects
2. Right-click → "Inspect" to open Developer Console
3. Run:
```javascript
localStorage.setItem('pyshift_pipe_name', 'YourPipeName');
```
4. Reload the panel

### Method B: Code Configuration
Edit `PyShiftBridge/js/main.js` in `getPipeName()` function:
```javascript
function getPipeName() {
  // Uncomment and set your pipe name here
  return "YourPipeName";
  
  // Current logic (localStorage fallback)
  // try {
  //   return localStorage.getItem("pyshift_pipe_name") || "PyShiftAE";
  // } catch (e) {
  //   return "PyShiftAE";
  // }
}
```

---

## 2. Common Pipe Names

Based on PyShiftAE patterns, try these in order:

1. **"PyShiftAE"** - Default assumption
2. **"CEPy"** - From CEPy-Resources
3. **"PyFX"** - From PyFX project
4. **UUID patterns** - Found via diagnostic script
5. **Manifest-based** - Check PyShiftAE's manifest.xml for `<Name>` field

---

## 3. File Modifications Required

### `manifest.xml`
**Usually NOT needed** for pipe configuration. Only modify if:
- Extension ID needs to match PyShiftAE's expectations
- Host application needs adjustment

### `js/main.js`
**Already configured** for dynamic pipe names. Only modify `getPipeName()` if you want a hardcoded default.

### `bridge_daemon.py`
**NOT needed** for pipe mode. The daemon is only used in mailbox fallback mode.

---

## 4. Cross-Platform Considerations

### Windows
- Pipe format: `\\.\pipe\<name>`
- Example: `\\.\pipe\PyShiftAE`

### macOS/Linux
- Socket format: `/tmp/<name>` or absolute path
- Example: `/tmp/PyShiftAE` or `/var/run/pyshift.sock`

### Cross-Platform Detection
The code automatically handles platform differences:
```javascript
// In makePyInterface()
var isWin = typeof process !== "undefined" && process.platform === "win32";
if (isWin) {
  this.pipePath = path.join("\\\\.\\pipe\\", name);
} else {
  this.pipePath = path.join("/tmp", String(name));
}
```

---

## 5. Testing Configuration

### Quick Test
1. Set pipe name via localStorage
2. Reload panel
3. Check console for: `Pipe connected: [name]`

### Advanced Test
```javascript
// In console
async function testPipe() {
  if (transport === "pipe") {
    try {
      const result = await sendCommandToPython('test_connection', {});
      console.log('Pipe test successful:', result);
    } catch (e) {
      console.error('Pipe test failed:', e);
    }
  } else {
    console.log('Not using pipe transport');
  }
}
testPipe();
```

---

## 6. Troubleshooting

### Connection Failed
- Verify PyShiftAE is running
- Check pipe name spelling (case-sensitive on Unix)
- Run diagnostic script again
- Try fallback to mailbox mode

### Permission Issues
#### Windows
- Run After Effects as Administrator
- Check pipe permissions

#### macOS/Linux
- Verify socket file permissions: `ls -la /tmp/YourPipeName`
- Check if After Effects can access `/tmp`

### Multiple Pipe Names
If multiple pipes exist, test each one:
```javascript
['PyShiftAE', 'CEPy', 'PyFX'].forEach(async (name) => {
  localStorage.setItem('pyshift_pipe_name', name);
  console.log(`Testing: ${name}`);
  // Reload panel or test connection
});
```

---

## 7. Production Deployment

For production deployment:

1. **Hardcode the pipe name** in `getPipeName()`
2. **Remove debug console logs** if needed
3. **Test on target systems**
4. **Document the pipe name** for users

Example production config:
```javascript
function getPipeName() {
  return "PyShiftAE_Production"; // Hardcoded for stability
}
```

---

## 8. Monitoring

### Connection Status
```javascript
// Check current status
console.log('Transport:', transport);
console.log('Pipe name:', pipeName);
```

### Performance Monitoring
```javascript
// Measure response time
async function measureLatency() {
  const start = performance.now();
  await sendCommandToPython('ping', {});
  const end = performance.now();
  console.log(`Latency: ${end - start}ms`);
}
```

---

## 9. Security Considerations

- **Pipe names are discoverable** - don't use sensitive information
- **Local only** - pipes/sockets don't expose over network
- **Permissions** - ensure only authorized users can access

---

## 10. Advanced Configuration

### Custom Socket Paths
For non-standard socket locations:
```javascript
localStorage.setItem('pyshift_pipe_name', '/full/path/to/custom.sock');
```

### Multiple Instances
For running multiple PyShiftAE instances:
```javascript
localStorage.setItem('pyshift_pipe_name', 'PyShiftAE_Instance1');
```

### Development vs Production
```javascript
function getPipeName() {
  const isDev = window.location.hostname === 'localhost';
  return isDev ? 'PyShiftAE_Dev' : 'PyShiftAE_Prod';
}
```
