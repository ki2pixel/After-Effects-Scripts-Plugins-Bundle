(function() {
    'use strict';

    var csInterface = new CSInterface();

    var DEFAULT_TIMEOUT_MS = 20000;

    var state = {
        pythonTransport: 'mailbox',
        pipeName: null
    };

    var elements = {};

    function supportsNodeRequire() {
        return typeof require === 'function';
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
            return '\\\\.\\pipe\\' + name;
        }
        if (name.indexOf('/') !== -1) {
            return name;
        }
        return '/tmp/' + name;
    }

    function updateStatus(status, text) {
        var dot = document.querySelector('.status-dot');
        var label = document.querySelector('.status-text');
        if (dot) dot.className = 'status-dot ' + status;
        if (label) label.textContent = text;
    }

    function addLog(message, type) {
        type = type || 'info';
        var entry = document.createElement('div');
        entry.className = 'log-entry ' + type;
        entry.textContent = new Date().toLocaleTimeString() + ' - ' + message;
        elements.logsContainer.appendChild(entry);
        elements.logsContainer.scrollTop = elements.logsContainer.scrollHeight;
    }

    function clearLogs() {
        elements.logsContainer.innerHTML = '';
    }

    function sendCommandToPythonPipe(entrypoint, args, timeoutMs, callback) {
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

        var name = state.pipeName || getPipeName();
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

        function finishErr(msg) {
            finish({ ok: false, result: null, error: String(msg || 'pipe_error') });
        }

        try {
            client.setTimeout(timeoutMs);
            client.on('timeout', function () { finishErr('pipe_timeout'); });
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
                    finishErr('pipe_invalid_response');
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

    function detectPythonTransport(callback) {
        callback = callback || function () {};

        if (!supportsNodeRequire()) {
            state.pythonTransport = 'mailbox';
            state.pipeName = null;
            callback(false);
            return;
        }

        var name = getPipeName();
        state.pipeName = name;

        sendCommandToPythonPipe('ping', {}, 800, function (res) {
            var ok = !!(res && res.ok && res.result && res.result.status === 'ok');
            if (ok) {
                state.pythonTransport = 'pipe';
                state.pipeName = name;
            } else {
                state.pythonTransport = 'mailbox';
                state.pipeName = null;
            }
            callback(ok);
        });
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
        var json = JSON.stringify(args || {});
        json = json.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

        csInterface.evalScript('gridclonerApply("' + json + '",' + String(timeoutMs) + ')', function (raw) {
            var dt = new Date().getTime() - t0;
            var payload = null;
            try {
                payload = raw ? JSON.parse(raw) : null;
            } catch (e) {
                payload = null;
            }

            if (payload && payload.ok && payload.result && payload.result.status === 'ok') {
                updateStatus('ready', 'OK');
                addLog('OK (mailbox) - ' + (payload.result.created_count || 0) + ' clones (' + dt + 'ms)', 'success');
                if (payload.result.notes && payload.result.notes.length) {
                    addLog('Notes: ' + JSON.stringify(payload.result.notes), 'info');
                }
                return;
            }

            updateStatus('error', 'Erreur');
            addLog('Erreur mailbox: ' + (payload && payload.error ? payload.error : 'unknown'), 'error');
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
        detectPythonTransport(function (pipeOk) {
            addLog('Transport: ' + (pipeOk ? 'pipe' : 'mailbox'), pipeOk ? 'success' : 'info');
            setTransportInfo();
        });
        updateStatus('ready', 'Prêt');
    }

    document.addEventListener('DOMContentLoaded', init);
})();
