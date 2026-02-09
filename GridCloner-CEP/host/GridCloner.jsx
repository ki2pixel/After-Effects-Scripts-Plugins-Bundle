(function () {
    // Minimal host-side mailbox transport for PyShiftBridge.
    // This is the fallback path when the CEP panel cannot use Node pipe transport.

    function joinPath(a, b) {
        if (!a) return b;
        if (!b) return a;
        var sep = '/';
        var s = String(a);
        if (s.indexOf('\\') !== -1) sep = '\\';
        if (s.charAt(s.length - 1) === sep) return s + b;
        return s + sep + b;
    }

    function getPyShiftBridgeDir() {
        var home = Folder('~');
        var docs = Folder(joinPath(home.fsName, 'Documents'));
        var base = docs.exists ? docs : home;
        var dir = Folder(joinPath(base.fsName, 'PyShiftAE_CEP_Bridge'));
        if (!dir.exists) dir.create();
        return dir.fsName;
    }

    function writeTextAtomic(fileObj, text) {
        var tmp = new File(fileObj.fsName + '.tmp');
        tmp.encoding = 'UTF-8';
        if (!tmp.open('w')) {
            throw new Error('Write failed: ' + tmp.fsName);
        }
        tmp.write(String(text || ''));
        tmp.close();

        if (fileObj.exists) {
            try { fileObj.remove(); } catch (e) {}
        }
        var ok = tmp.rename(fileObj.name);
        if (!ok) {
            throw new Error('Rename failed: ' + tmp.fsName + ' -> ' + fileObj.fsName);
        }
    }

    function ensurePyShiftBridgeMailbox() {
        var dir = getPyShiftBridgeDir();
        var req = new File(joinPath(dir, 'cep_to_py.json'));
        var resp = new File(joinPath(dir, 'py_to_cep.json'));
        if (!req.exists) writeTextAtomic(req, '');
        if (!resp.exists) writeTextAtomic(resp, '');
        return dir;
    }

    function readText(fileObj) {
        if (!fileObj || !fileObj.exists) return '';
        fileObj.encoding = 'UTF-8';
        if (!fileObj.open('r')) return '';
        var content = fileObj.read();
        fileObj.close();
        return content || '';
    }

    function safeJsonParse(raw) {
        try {
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) {
            return null;
        }
    }

    function newBridgeId() {
        return String(new Date().getTime()) + '-' + String(Math.floor(Math.random() * 100000));
    }

    function sendToPyShiftBridge(entrypoint, args, timeoutMs) {
        timeoutMs = timeoutMs || 20000;

        var dir = ensurePyShiftBridgeMailbox();
        var req = new File(joinPath(dir, 'cep_to_py.json'));
        var resp = new File(joinPath(dir, 'py_to_cep.json'));

        var msgId = newBridgeId();
        var payload = {
            id: msgId,
            entrypoint: entrypoint,
            args: args || {}
        };

        writeTextAtomic(req, JSON.stringify(payload));

        var start = new Date().getTime();
        while ((new Date().getTime() - start) < timeoutMs) {
            $.sleep(200);
            var raw = readText(resp);
            if (!raw) continue;
            var parsed = safeJsonParse(raw);
            if (!parsed || !parsed.id) continue;
            if (parsed.id !== msgId) continue;
            if (parsed.ok) {
                return { ok: true, result: parsed.result };
            }
            return { ok: false, error: parsed.error || 'Unknown bridge error' };
        }

        return { ok: false, error: 'PyShiftBridge timeout' };
    }

    $.global.gridclonerApply = function (argsJson, timeoutMs) {
        try {
            var args = safeJsonParse(argsJson);
            if (!args || typeof args !== 'object') args = {};
            var res = sendToPyShiftBridge('gridcloner_apply', args, timeoutMs || 20000);
            if (res && res.ok) {
                return JSON.stringify({ ok: true, result: res.result });
            }
            return JSON.stringify({ ok: false, error: (res && res.error) ? res.error : 'bridge_error' });
        } catch (e) {
            return JSON.stringify({ ok: false, error: String(e) });
        }
    };
})();
