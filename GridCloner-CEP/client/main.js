(function() {
    'use strict';

    var csInterface = new CSInterface();

    var DEFAULT_TIMEOUT_MS = 20000;
    var DEFAULT_LOG_PREVIEW_CHARS = 280;

    var COMMON_PIPE_NAMES = ['PyShiftAE', 'CEPy', 'PyFX'];

    var state = {
        pythonTransport: 'mailbox',
        pipeName: null
    };

    var elements = {};

    function supportsNodeRequire() {
        return typeof require === 'function';
    }

    function isCepEvalScriptAvailable() {
        return !!(typeof window !== 'undefined' && window.__adobe_cep__ && typeof window.__adobe_cep__.evalScript === 'function');
    }

    function getPipeName() {
        try {
            return localStorage.getItem('pyshift_pipe_name') || 'PyShiftAE';
        } catch (e) {
            return 'PyShiftAE';
        }
    }

    function getPipePath(name) {
        name = String(name || '');
        if (!name) name = 'PyShiftAE';
        var isWin = typeof process !== 'undefined' && process.platform === 'win32';
        if (isWin) {
            // Allow callers to pass the full pipe path (e.g. "\\\\.\\pipe\\PyShiftAE").
            // This is useful if we enumerate pipes via \\.\pipe\ on Windows.
            if (name.indexOf('\\\\.\\pipe\\') === 0) {
                return name;
            }
            return '\\\\.\\pipe\\' + name;
        }
        if (name.indexOf('/') !== -1) {
            return name;
        }
        return '/tmp/' + name;
    }

    function escapeForEvalScriptSingleQuoted(value) {
        return String(value || '')
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'")
            .replace(/\r/g, '\\r')
            .replace(/\n/g, '\\n')
            .replace(/\u2028/g, '\\u2028')
            .replace(/\u2029/g, '\\u2029');
    }

    function previewForLog(value, maxLen) {
        var s = String(value == null ? '' : value);
        maxLen = maxLen || DEFAULT_LOG_PREVIEW_CHARS;
        if (s.length <= maxLen) return s;
        return s.substring(0, maxLen) + '…';
    }

    function parseMailboxResponse(raw) {
        if (typeof raw !== 'string' || !raw.length) {
            return { payload: null, parseError: 'empty_response' };
        }
        if (raw.indexOf('__JSX_CALL_FAILED__:') === 0) {
            return { payload: null, parseError: raw };
        }
        if (raw === '__EVALSCRIPT_EMPTY__') {
            return { payload: null, parseError: 'evalscript_empty' };
        }
        if (raw === '__CEP_RUNTIME_UNAVAILABLE__') {
            return { payload: null, parseError: 'cep_runtime_unavailable' };
        }
        if (raw.indexOf('__CSINTERFACE_THROW__:') === 0) {
            return { payload: null, parseError: raw };
        }
        try {
            return { payload: JSON.parse(raw), parseError: null };
        } catch (e) {
            return { payload: null, parseError: String(e || 'invalid_json') };
        }
    }

    function buildLegacyGridclonerScript(args, timeoutMs) {
        var json = JSON.stringify(args || {});
        json = json.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        var callExpr = '$.global.gridclonerApply("' + json + '",' + String(timeoutMs) + ')';
        return wrapEvalScriptCall(callExpr);
    }

    function buildEncodedGridclonerScript(args, timeoutMs) {
        var encodedArgs = encodeURIComponent(JSON.stringify(args || {}));
        var callExpr = "$.global.gridclonerApplyEncoded('" + escapeForEvalScriptSingleQuoted(encodedArgs) + "'," + String(timeoutMs) + ')';
        return wrapEvalScriptCall(callExpr);
    }

    function wrapEvalScriptCall(callExpr) {
        return '(function(){try{return ' + callExpr + ';}catch(e){return "__JSX_CALL_FAILED__:" + String(e);}})()';
    }

    function resolveMailboxErrorMessage(payload, parsed, raw) {
        var errorMessage = parsed && parsed.parseError ? ('mailbox_' + parsed.parseError) : 'unknown';
        if (payload && payload.error) {
            return String(payload.error);
        }
        if (parsed && typeof parsed.parseError === 'string' && parsed.parseError.indexOf('__JSX_CALL_FAILED__:') === 0) {
            return 'jsx_call_failed';
        }
        if (parsed && parsed.parseError === 'evalscript_empty') {
            return 'mailbox_evalscript_empty';
        }
        if (parsed && parsed.parseError === 'cep_runtime_unavailable') {
            return 'cep_runtime_unavailable';
        }
        if (typeof raw === 'string' && raw.indexOf('__CSINTERFACE_THROW__:') === 0) {
            return 'csinterface_evalscript_throw';
        }
        if (typeof raw === 'string' && raw.length) {
            if (raw.indexOf('EvalScript error.') !== -1) {
                return 'evalscript_error (vérifier host JSX / encodage args)';
            }
            return 'invalid_mailbox_response';
        }
        return errorMessage;
    }

    function handleMailboxCallback(raw, dt, okLabel) {
        var parsed = parseMailboxResponse(raw);
        var payload = parsed.payload;

        if (parsed.parseError) {
            addLog('Mailbox réponse invalide (' + parsed.parseError + ')', 'warning');
            if (typeof raw === 'string' && raw.length) {
                addLog('Mailbox raw: ' + previewForLog(raw), 'warning');
            }
        }

        if (payload && payload.ok && payload.result && payload.result.status === 'ok') {
            updateStatus('ready', 'OK');
            addLog('OK (' + okLabel + ') - ' + (payload.result.created_count || 0) + ' clones (' + dt + 'ms)', 'success');
            if (payload.result.notes && payload.result.notes.length) {
                addLog('Notes: ' + JSON.stringify(payload.result.notes), 'info');
            }
            return { ok: true, parsed: parsed, payload: payload };
        }

        return { ok: false, parsed: parsed, payload: payload };
    }

    function logMailboxDebug(payload) {
        try {
            if (!payload || !payload.debug) return;
            addLog('Mailbox debug.bridgeDir: ' + String(payload.debug.bridgeDir || ''), 'info');
            if (payload.debug.request) {
                addLog('Mailbox debug.request: ' + previewForLog(JSON.stringify(payload.debug.request)), 'info');
            }
            if (payload.debug.response) {
                addLog('Mailbox debug.response: ' + previewForLog(JSON.stringify(payload.debug.response)), 'info');
            }
            if (payload.debug.responseBaseline) {
                addLog('Mailbox debug.responseBaseline: ' + previewForLog(JSON.stringify(payload.debug.responseBaseline)), 'info');
            }
            if (typeof payload.debug.responseChanged !== 'undefined') {
                addLog('Mailbox debug.responseChanged: ' + String(payload.debug.responseChanged), 'info');
            }
            if (typeof payload.debug.sawOtherId !== 'undefined') {
                addLog('Mailbox debug.sawOtherId: ' + String(payload.debug.sawOtherId), 'info');
            }
            if (typeof payload.debug.parseErrorCount !== 'undefined') {
                addLog('Mailbox debug.parseErrorCount: ' + String(payload.debug.parseErrorCount), 'info');
            }
            if (payload.debug.bootstrap) {
                addLog('Mailbox debug.bootstrap: ' + previewForLog(JSON.stringify(payload.debug.bootstrap)), 'info');
            }
            if (payload.debug.pyStatus) {
                addLog('Mailbox debug.pyStatus: ' + previewForLog(JSON.stringify(payload.debug.pyStatus)), 'info');
            }
        } catch (e) {
            // never break UI
        }
    }

    function updateStatus(status, text) {
        var dot = document.querySelector('.status-dot');
        var label = document.querySelector('.status-text');
        if (dot) dot.className = 'status-dot ' + status;
        if (label) label.textContent = text;
    }

    function updateBridgeHealth(ok, text, title) {
        if (!elements.bridgeHealthDot) return;
        if (!elements.bridgeHealthLabel) return;

        var cls = 'daemon-dot ';
        if (ok === true) {
            cls += 'ready';
        } else if (ok === false) {
            cls += 'error';
        } else {
            cls += 'working';
        }

        elements.bridgeHealthDot.className = cls;
        elements.bridgeHealthLabel.textContent = text || 'Daemon: …';
        if (title) {
            elements.bridgeHealthDot.title = title;
            elements.bridgeHealthLabel.title = title;
        }
    }

    function addLog(message, type) {
        type = type || 'info';
        var entry = document.createElement('div');
        entry.className = 'log-entry ' + type;
        entry.textContent = new Date().toLocaleTimeString() + ' - ' + message;
        elements.logsContainer.appendChild(entry);
        elements.logsContainer.scrollTop = elements.logsContainer.scrollHeight;
    }

    function startBridgeHealthMonitoring() {
        if (!isCepEvalScriptAvailable()) {
            updateBridgeHealth(false, 'Daemon: n/a', 'CEP runtime indisponible');
            return;
        }

        function checkOnce() {
            // Prefer mailbox health check (works even when pipe detection failed)
            // and includes pyStatus diagnostics.
            updateBridgeHealth(null, 'Daemon: check…', 'Checking PyShiftBridge daemon...');
            csInterface.evalScript('$.global.gridclonerCheckBridgeHealth(1500)', function (raw) {
                var payload = null;
                try {
                    if (raw && raw !== 'undefined' && raw !== 'null') {
                        payload = JSON.parse(String(raw));
                    }
                } catch (e) {
                    payload = null;
                }

                if (payload && payload.ok) {
                    updateBridgeHealth(true, 'Daemon: online', 'PyShiftBridge daemon online');
                    return;
                }

                var err = (payload && payload.error) ? String(payload.error) : 'offline';
                var title = 'PyShiftBridge daemon offline: ' + previewForLog(err);

                // If we have pyStatus, surface the most actionable hint.
                try {
                    if (payload && payload.debug && payload.debug.pyStatus) {
                        var ps = payload.debug.pyStatus;
                        if (ps.pythonConsoleMenuId === 0) {
                            if (ps.pythonExecuteMenuId && ps.pythonExecuteMenuId !== 0) {
                                title += ' | Hint: menu File → Execute (.py) présent, mais bridge JS (executePythonFile) absent';
                            } else {
                                title += ' | Hint: aucun menu PyShiftAE détecté (Python Console / Execute (.py))';
                            }
                        } else if (ps.pyAnyExecuteAvailable === false) {
                            title += ' | Hint: executePythonFile introuvable';
                        }
                        if (ps.pyShiftAePluginFound === false && ps.pyShiftAePluginCandidates && ps.pyShiftAePluginCandidates.length) {
                            title += ' | Checked: ' + ps.pyShiftAePluginCandidates.join(' ; ');
                        }
                    }
                } catch (e2) {}

                updateBridgeHealth(false, 'Daemon: offline', title);
            });
        }

        checkOnce();
        window.setInterval(checkOnce, 30000);
    }

    function clearLogs() {
        elements.logsContainer.innerHTML = '';
    }

    function sendCommandToPythonPipeWithName(pipeName, entrypoint, args, timeoutMs, callback) {
        callback = callback || function () {};
        timeoutMs = timeoutMs || 3000;

        if (!supportsNodeRequire()) {
            callback({ ok: false, result: null, error: 'node_require_unavailable' });
            return;
        }

        var net = null;
        try {
            net = require('net');
        } catch (e) {
            callback({ ok: false, result: null, error: 'net_require_failed' });
            return;
        }

        var name = String(pipeName || state.pipeName || getPipeName() || '');
        var pipePath = getPipePath(name);

        var client = new net.Socket();
        var buffer = '';
        var settled = false;

        function cleanup() {
            try { client.removeAllListeners(); } catch (e) {}
            try { client.destroy(); } catch (e) {}
        }

        function finish(obj) {
            if (settled) return;
            settled = true;
            cleanup();
            callback(obj);
        }

        function finishErr(err) {
            var code = '';
            try {
                if (err && typeof err === 'object' && err.code) {
                    code = String(err.code);
                }
            } catch (e) {}
            finish({ ok: false, result: null, error: String(err || 'pipe_error'), errorCode: code, pipeName: name, pipePath: pipePath });
        }

        try {
            client.setTimeout(timeoutMs);
            client.on('timeout', function () { finishErr({ message: 'pipe_timeout', code: 'TIMEOUT' }); });
            client.on('error', function (err) { finishErr(err); });
            client.on('data', function (chunk) {
                buffer += chunk.toString();
                var idx = buffer.indexOf('\n');
                if (idx === -1) return;
                var raw = buffer.substring(0, idx);
                try {
                    var parsed = JSON.parse(raw);
                    finish(parsed);
                } catch (e) {
                    finishErr({ message: 'pipe_invalid_response', code: 'INVALID_RESPONSE' });
                }
            });

            client.connect(pipePath, function () {
                var payload = {
                    endpoint: 'Response',
                    functionName: entrypoint,
                    args: { param1: JSON.stringify(args || {}) }
                };
                client.write(JSON.stringify(payload) + '\n');
            });
        } catch (e) {
            finishErr(e);
        }
    }

    function sendCommandToPythonPipe(entrypoint, args, timeoutMs, callback) {
        return sendCommandToPythonPipeWithName(null, entrypoint, args, timeoutMs, callback);
    }

    function uniqueList(list) {
        var seen = {};
        var out = [];
        for (var i = 0; i < list.length; i += 1) {
            var v = String(list[i] || '');
            if (!v) continue;
            if (seen[v]) continue;
            seen[v] = true;
            out.push(v);
        }
        return out;
    }

    function isWindowsRuntime() {
        try {
            return typeof process !== 'undefined' && process.platform === 'win32';
        } catch (e) {
            return false;
        }
    }

    function listWindowsPipeCandidates() {
        if (!isWindowsRuntime()) return [];
        if (!supportsNodeRequire()) return [];

        var fs;
        try {
            fs = require('fs');
        } catch (e) {
            return [];
        }

        var entries;
        try {
            // Windows named pipes are listed under the magic filesystem path "\\\\.\\pipe\\".
            entries = fs.readdirSync('\\\\.\\pipe\\');
        } catch (err) {
            addLog('Windows pipe enumeration failed: ' + previewForLog(err), 'warning');
            return [];
        }

        if (!entries || !entries.length) {
            return [];
        }

        var filtered = [];
        for (var i = 0; i < entries.length; i += 1) {
            var name = String(entries[i] || '');
            if (!name) continue;

            var low = name.toLowerCase();
            // Heuristic filters: try to avoid probing random OS pipes.
            if (low.indexOf('pyshift') !== -1 || low.indexOf('pyfx') !== -1 || low.indexOf('py') !== -1 || low.indexOf('shift') !== -1 || low.indexOf('cep') !== -1) {
                filtered.push(name);
            }
        }

        // Prioritize likely names first.
        filtered.sort(function (a, b) {
            var aa = String(a).toLowerCase();
            var bb = String(b).toLowerCase();
            var scoreA = (aa.indexOf('pyshift') !== -1 ? 0 : (aa.indexOf('pyfx') !== -1 ? 1 : (aa.indexOf('py') !== -1 ? 2 : (aa.indexOf('cep') !== -1 ? 3 : 4))));
            var scoreB = (bb.indexOf('pyshift') !== -1 ? 0 : (bb.indexOf('pyfx') !== -1 ? 1 : (bb.indexOf('py') !== -1 ? 2 : (bb.indexOf('cep') !== -1 ? 3 : 4))));
            if (scoreA !== scoreB) return scoreA - scoreB;
            return aa < bb ? -1 : (aa > bb ? 1 : 0);
        });

        // Keep the list short: each probe costs time at panel init.
        if (filtered.length > 12) {
            filtered = filtered.slice(0, 12);
        }

        if (!filtered.length) {
            // Keep a tiny sample for support/debugging, without probing everything.
            var sample = [];
            try {
                sample = entries.slice(0, 8);
            } catch (eS) {
                sample = [];
            }
            addLog('Windows pipes trouvés: ' + entries.length + ' (aucun ne matche les filtres py/shift/cep). Sample: ' + (sample.length ? sample.join(', ') : 'n/a'), 'info');
        } else {
            addLog('Windows pipes candidats: ' + filtered.join(', ') + (entries.length > filtered.length ? (' (+ ' + (entries.length - filtered.length) + ' autres)') : ''), 'info');
        }

        return filtered;
    }

    function listUnixSocketCandidates() {
        if (isWindowsRuntime()) return [];

        var fs;
        var path;
        try {
            fs = require('fs');
            path = require('path');
        } catch (e) {
            return [];
        }

        var dir = '/tmp';
        var entries;
        try {
            entries = fs.readdirSync(dir);
        } catch (e2) {
            return [];
        }

        var sockets = [];
        for (var i = 0; i < entries.length; i += 1) {
            var name = String(entries[i] || '');
            if (!name) continue;
            if (name.charAt(0) === '.') continue;

            var full = '';
            try {
                full = path.join(dir, name);
            } catch (e3) {
                continue;
            }

            try {
                var st = fs.statSync(full);
                if (st && typeof st.isSocket === 'function' && st.isSocket()) {
                    sockets.push(full);
                }
            } catch (e4) {
                // ignore
            }
        }

        // Prioritize likely names first.
        sockets.sort(function (a, b) {
            var aa = String(a).toLowerCase();
            var bb = String(b).toLowerCase();
            var scoreA = (aa.indexOf('pyshift') !== -1 ? 0 : (aa.indexOf('py') !== -1 ? 1 : 2));
            var scoreB = (bb.indexOf('pyshift') !== -1 ? 0 : (bb.indexOf('py') !== -1 ? 1 : 2));
            if (scoreA !== scoreB) return scoreA - scoreB;
            return aa < bb ? -1 : (aa > bb ? 1 : 0);
        });

        // Keep a short list to avoid long init sequences.
        if (sockets.length > 10) {
            sockets = sockets.slice(0, 10);
        }

        return sockets;
    }

    function detectPythonTransport(callback) {
        callback = callback || function () {};

        if (!supportsNodeRequire()) {
            state.pythonTransport = 'mailbox';
            state.pipeName = null;
            callback(false);
            return;
        }

        var preferredName = getPipeName();
        var namesToTry = uniqueList([preferredName].concat(COMMON_PIPE_NAMES));

        // Windows: enumerate named pipes and probe likely candidates.
        if (isWindowsRuntime()) {
            var winCandidates = listWindowsPipeCandidates();
            if (winCandidates && winCandidates.length) {
                namesToTry = uniqueList(namesToTry.concat(winCandidates));
            }
        }

        // As last resort on Unix: probe /tmp for socket files.
        var unixCandidates = listUnixSocketCandidates();
        if (unixCandidates.length) {
            addLog('Sockets /tmp détectés: ' + unixCandidates.slice(0, 6).join(', ') + (unixCandidates.length > 6 ? (' (+ ' + (unixCandidates.length - 6) + ')') : ''), 'info');
            namesToTry = uniqueList(namesToTry.concat(unixCandidates));
        }

        function tryIndex(idx) {
            if (idx >= namesToTry.length) {
                state.pythonTransport = 'mailbox';
                state.pipeName = null;
                callback(false);
                return;
            }

            var name = namesToTry[idx];
            sendCommandToPythonPipeWithName(name, 'ping', {}, 800, function (res) {
                var ok = !!(res && res.ok && res.result && res.result.status === 'ok');
                if (ok) {
                    state.pythonTransport = 'pipe';
                    state.pipeName = name;
                    callback(true);
                    return;
                }

                if (res && res.error) {
                    var extra = '';
                    if (res.pipePath) extra += ' path=' + res.pipePath;
                    addLog('Pipe ping failed (' + name + '): ' + previewForLog(res.error) + (res.errorCode ? (' [' + res.errorCode + ']') : '') + extra, 'warning');
                } else {
                    addLog('Pipe ping failed (' + name + ')', 'warning');
                }
                tryIndex(idx + 1);
            });
        }

        tryIndex(0);
    }

    function setTransportInfo() {
        if (!elements.transportInfo) return;
        elements.transportInfo.textContent = 'Transport: ' + state.pythonTransport;
    }

    function readFormArgs() {
        return {
            rows: parseInt(elements.rows.value, 10),
            columns: parseInt(elements.columns.value, 10),
            depth: parseInt(elements.depth.value, 10),
            spacing: {
                x: parseFloat(elements.spacingX.value),
                y: parseFloat(elements.spacingY.value),
                z: parseFloat(elements.spacingZ.value)
            },
            enable3D: !!elements.enable3D.checked,
            linkOpacityToNull: !!elements.linkOpacityToNull.checked,
            linkScaleToNull: !!elements.linkScaleToNull.checked,
            controllerName: String(elements.controllerName.value || 'Grid CTRL')
        };
    }

    function callGridcloner(args) {
        var timeoutMs = DEFAULT_TIMEOUT_MS;
        updateStatus('working', 'Génération…');

        var t0 = new Date().getTime();

        if (state.pythonTransport === 'pipe') {
            sendCommandToPythonPipe('gridcloner_apply', args, timeoutMs, function (res) {
                var dt = new Date().getTime() - t0;
                if (res && res.ok && res.result && res.result.status === 'ok') {
                    updateStatus('ready', 'OK');
                    addLog('OK (pipe) - ' + (res.result.created_count || 0) + ' clones (' + dt + 'ms)', 'success');
                    if (res.result.notes && res.result.notes.length) {
                        addLog('Notes: ' + JSON.stringify(res.result.notes), 'info');
                    }
                    return;
                }

                addLog('Pipe failed, fallback mailbox', 'warning');
                state.pythonTransport = 'mailbox';
                state.pipeName = null;
                setTransportInfo();
                callGridclonerViaMailbox(args, timeoutMs, t0);
            });
            return;
        }

        callGridclonerViaMailbox(args, timeoutMs, t0);
    }

    function callGridclonerViaMailbox(args, timeoutMs, t0) {
        if (!isCepEvalScriptAvailable()) {
            updateStatus('error', 'Erreur');
            addLog('Erreur mailbox: cep_evalscript_unavailable', 'error');
            return;
        }

        function callGridclonerViaMailboxLegacy() {
            var legacyScript = buildLegacyGridclonerScript(args, timeoutMs);
            csInterface.evalScript(legacyScript, function (rawLegacy) {
                var dtLegacy = new Date().getTime() - t0;
                var handledLegacy = handleMailboxCallback(rawLegacy, dtLegacy, 'mailbox-legacy');
                if (handledLegacy.ok) {
                    return;
                }

                updateStatus('error', 'Erreur');
                if (handledLegacy.payload) {
                    logMailboxDebug(handledLegacy.payload);
                }
                addLog('Erreur mailbox: ' + resolveMailboxErrorMessage(handledLegacy.payload, handledLegacy.parsed, rawLegacy), 'error');
            });
        }

        var script = buildEncodedGridclonerScript(args, timeoutMs);

        var typeCheckScript = wrapEvalScriptCall('typeof $.global.gridclonerApplyEncoded');
        csInterface.evalScript(typeCheckScript, function (encodedTypeRaw) {
            var encodedType = String(encodedTypeRaw || '');
            if (encodedType !== 'function') {
                if (encodedType.indexOf('__JSX_CALL_FAILED__:') === 0) {
                    addLog('Host API check threw: ' + previewForLog(encodedType), 'warning');
                }
                addLog('Host API gridclonerApplyEncoded indisponible (' + previewForLog(encodedType || 'empty') + '), fallback legacy', 'warning');
                callGridclonerViaMailboxLegacy();
                return;
            }

            csInterface.evalScript(script, function (raw) {
                var dt = new Date().getTime() - t0;
                var handled = handleMailboxCallback(raw, dt, 'mailbox');
                if (handled.ok) {
                    return;
                }

                if (handled.parsed && (handled.parsed.parseError === 'empty_response' || handled.parsed.parseError === 'evalscript_empty')) {
                    addLog('Mailbox encoded réponse vide, retry legacy', 'warning');
                    callGridclonerViaMailboxLegacy();
                    return;
                }

                updateStatus('error', 'Erreur');
                if (handled.payload) {
                    logMailboxDebug(handled.payload);
                }
                addLog('Erreur mailbox: ' + resolveMailboxErrorMessage(handled.payload, handled.parsed, raw), 'error');
            });
        });
    }

    function cacheElements() {
        elements.rows = document.getElementById('rows');
        elements.columns = document.getElementById('columns');
        elements.depth = document.getElementById('depth');
        elements.spacingX = document.getElementById('spacingX');
        elements.spacingY = document.getElementById('spacingY');
        elements.spacingZ = document.getElementById('spacingZ');
        elements.enable3D = document.getElementById('enable3D');
        elements.linkOpacityToNull = document.getElementById('linkOpacityToNull');
        elements.linkScaleToNull = document.getElementById('linkScaleToNull');
        elements.controllerName = document.getElementById('controllerName');
        elements.generate = document.getElementById('generate');
        elements.clearLogs = document.getElementById('clearLogs');
        elements.logsContainer = document.getElementById('logsContainer');
        elements.transportInfo = document.getElementById('transportInfo');
        elements.bridgeHealthDot = document.getElementById('bridgeHealthDot');
        elements.bridgeHealthLabel = document.getElementById('bridgeHealthLabel');
    }

    function bindEvents() {
        elements.generate.addEventListener('click', function () {
            try {
                callGridcloner(readFormArgs());
            } catch (e) {
                updateStatus('error', 'Erreur');
                addLog(String(e || 'error'), 'error');
            }
        });
        elements.clearLogs.addEventListener('click', clearLogs);
    }

    function init() {
        cacheElements();
        bindEvents();

        if (!isCepEvalScriptAvailable()) {
            addLog('CEP runtime indisponible (window.__adobe_cep__). Ouvrir ce panel dans After Effects.', 'error');
        }

        detectPythonTransport(function (pipeOk) {
            addLog('Transport: ' + (pipeOk ? 'pipe' : 'mailbox'), pipeOk ? 'success' : 'info');
            setTransportInfo();
        });

        startBridgeHealthMonitoring();
        updateStatus('ready', 'Prêt');
    }

    document.addEventListener('DOMContentLoaded', init);
})();
