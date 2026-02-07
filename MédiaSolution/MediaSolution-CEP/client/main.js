/* Media Solution v12.0 CEP - Main JavaScript */
(function() {
    'use strict';

    // Global state
    var csInterface = new CSInterface();
    var state = {
        folderPath: '',
        csvPath: '',
        isBatchRunning: false,
        bridgeOk: null,
        bridgeLastError: '',
        pythonTransport: 'mailbox',
        pipeName: null,
        config: {
            pythonCmd: 'C:/Python313/python.exe',
            enablePythonCutsParser: true,
            enableAutoRecentering: true,
            enablePythonAnalyzer: true,
            enablePythonRecentering: false,
            enablePythonProjectOpen: false,
            enablePythonBaseAepCreation: false
        }
    };

    // DOM Elements
    var elements = {};

    // Initialize
    function init() {
        cacheElements();
        loadConfig();
        bindEvents();
        setupCSInterface();
        addLog('Media Solution v12.0 CEP - Initialisé', 'info');
        startBridgeHealthMonitoring();
        updateUI();
    }

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

    function detectPythonTransport(callback) {
        callback = callback || function () { };
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

    function sendCommandToPythonPipe(entrypoint, args, timeoutMs, callback) {
        callback = callback || function () { };
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
            try { client.removeAllListeners(); } catch (e) { }
            try { client.destroy(); } catch (e) { }
        }

        function finishOk(obj) {
            if (settled) return;
            settled = true;
            cleanup();
            callback(obj);
        }

        function finishErr(msg) {
            if (settled) return;
            settled = true;
            cleanup();
            callback({ ok: false, result: null, error: String(msg || 'pipe_error') });
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
                    finishOk(parsed);
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

    // Cache DOM elements
    function cacheElements() {
        elements = {
            statusIndicator: document.getElementById('statusIndicator'),
            statusDot: document.querySelector('.status-dot'),
            statusText: document.querySelector('.status-text'),
            folderPath: document.getElementById('folderPath'),
            browseFolder: document.getElementById('browseFolder'),
            folderInfo: document.getElementById('folderInfo'),
            pythonCmd: document.getElementById('pythonCmd'),
            enablePythonCutsParser: document.getElementById('enablePythonCutsParser'),
            bridgeHealthDot: document.getElementById('bridgeHealthDot'),
            enableAutoRecentering: document.getElementById('enableAutoRecentering'),
            enablePythonAnalyzer: document.getElementById('enablePythonAnalyzer'),
            enablePythonRecentering: document.getElementById('enablePythonRecentering'),
            enablePythonProjectOpen: document.getElementById('enablePythonProjectOpen'),
            enablePythonBaseAepCreation: document.getElementById('enablePythonBaseAepCreation'),
            exportConfig: document.getElementById('exportConfig'),
            importConfig: document.getElementById('importConfig'),
            startBatch: document.getElementById('startBatch'),
            cancelBatch: document.getElementById('cancelBatch'),
            runDiagnostics: document.getElementById('runDiagnostics'),
            batchProgress: document.getElementById('batchProgress'),
            progressFill: document.getElementById('progressFill'),
            progressText: document.getElementById('progressText'),
            csvPath: document.getElementById('csvPath'),
            browseCsv: document.getElementById('browseCsv'),
            applyCuts: document.getElementById('applyCuts'),
            logsContainer: document.getElementById('logsContainer'),
            clearLogs: document.getElementById('clearLogs'),
            exportLogs: document.getElementById('exportLogs')
        };
    }

    // Setup CSInterface
    function setupCSInterface() {
        // UN SEUL ÉCOUTEUR ROBUSTE
        csInterface.addEventListener('com.workflowmediapipe.mediasolution.hostMessage', function(event) {
            try {
                // Vérification si donnée valide
                if (!event.data || event.data === "undefined") return;
                
                // Si c'est déjà un objet (certaines versions de CEP le font auto), on l'utilise
                if (typeof event.data === "object") {
                    handleHostMessage(event.data);
                    return;
                }

                // Si c'est une string mal formée [object Object], on l'ignore proprement
                if (typeof event.data === "string") {
                    if (event.data === "[object Object]") {
                        console.warn("Reçu [object Object] du host - Ignoré");
                        return;
                    }
                    var data = JSON.parse(event.data);
                    handleHostMessage(data);
                }
            } catch (e) {
                console.error("Erreur parsing:", e);
                // On n'affiche plus l'erreur dans le panel pour éviter le spam visuel si un event est malformé
            }
        });

        // Set theme
        var skinInfo = JSON.parse(window.__adobe_cep__.getHostEnvironment()).appSkinInfo;
        updateTheme(skinInfo);
        csInterface.addEventListener('com.adobe.csxs.events.ThemeChanged', function(event) {
            var skinInfo = JSON.parse(window.__adobe_cep__.getHostEnvironment()).appSkinInfo;
            updateTheme(skinInfo);
        });
    }

    // Update theme based on AE theme
    function updateTheme(skinInfo) {
        var basePanelColor = skinInfo.panelBackgroundColor.color;
        var baseTextColor = skinInfo.panelTextColor.color;
        var bgColor = 'rgb(' + basePanelColor.red + ',' + basePanelColor.green + ',' + basePanelColor.blue + ')';
        var textColor = 'rgb(' + baseTextColor.red + ',' + baseTextColor.green + ',' + baseTextColor.blue + ')';
        document.body.style.backgroundColor = bgColor;
        document.body.style.color = textColor;
    }

    // Bind events
    function bindEvents() {
        elements.browseFolder.addEventListener('click', selectFolder);
        elements.exportConfig.addEventListener('click', exportConfig);
        elements.importConfig.addEventListener('click', importConfig);
        elements.startBatch.addEventListener('click', startBatch);
        elements.cancelBatch.addEventListener('click', cancelBatch);
        elements.runDiagnostics.addEventListener('click', runDiagnostics);
        elements.browseCsv.addEventListener('click', selectCsv);
        elements.applyCuts.addEventListener('click', applyCuts);
        elements.clearLogs.addEventListener('click', clearLogs);
        elements.exportLogs.addEventListener('click', exportLogs);
        elements.pythonCmd.addEventListener('change', updateConfig);
        elements.enablePythonCutsParser.addEventListener('change', updateConfig);
        elements.enableAutoRecentering.addEventListener('change', updateConfig);
        elements.enablePythonAnalyzer.addEventListener('change', updateConfig);
        elements.enablePythonRecentering.addEventListener('change', updateConfig);
        if (elements.enablePythonProjectOpen) {
            elements.enablePythonProjectOpen.addEventListener('change', updateConfig);
        }
        if (elements.enablePythonBaseAepCreation) {
            elements.enablePythonBaseAepCreation.addEventListener('change', updateConfig);
        }
    }

    // Update status
    function updateStatus(status, text) {
        if(elements.statusDot) elements.statusDot.className = 'status-dot ' + status;
        if(elements.statusText) elements.statusText.textContent = text;
    }

    // Add log entry
    function addLog(message, type) {
        type = type || 'info';
        var logEntry = document.createElement('div');
        logEntry.className = 'log-entry ' + type;
        logEntry.textContent = new Date().toLocaleTimeString() + ' - ' + message;
        elements.logsContainer.appendChild(logEntry);
        elements.logsContainer.scrollTop = elements.logsContainer.scrollHeight;
    }

    // Handle messages from ExtendScript
    function handleHostMessage(data) {
        // Log discret dans la console JS, pas dans l'UI pour éviter le spam
        console.log('Message reçu:', data);

        if (!data || typeof data !== 'object') return;

        switch (data.type) {
            case 'log':
                addLog(data.message, data.level || 'info');
                break;
            case 'progress':
                updateProgress(data.current, data.total, data.message);
                break;
            case 'folderSelected':
                if (data.success === false) {
                    addLog('Erreur dossier: ' + (data.error || 'Annulé'), 'warning');
                } else if (data.path) {
                    state.folderPath = data.path;
                    elements.folderPath.value = data.path;
                    elements.folderInfo.textContent = data.info || '';
                    updateUI();
                    addLog('Dossier OK: ' + data.path, 'success');
                }
                break;
            case 'csvSelected':
                if (data.path) {
                    state.csvPath = data.path;
                    elements.csvPath.value = data.path;
                    updateUI();
                    addLog('CSV OK: ' + data.path, 'success');
                }
                break;
            case 'batchCompleted':
                state.isBatchRunning = false;
                updateStatus('ready', 'Prêt');
                updateUI();
                addLog('Batch terminé: ' + data.results, 'success');
                break;
            case 'error':
                addLog(data.message, 'error');
                state.isBatchRunning = false;
                updateStatus('error', 'Erreur');
                updateUI();
                break;
        }
    }

    function updateProgress(current, total, message) {
        var percentage = total > 0 ? (current / total) * 100 : 0;
        elements.progressFill.style.width = percentage + '%';
        elements.progressText.textContent = message || (current + ' / ' + total);
    }

    function updateUI() {
        var hasFolder = state.folderPath.length > 0;
        var hasCsv = state.csvPath.length > 0;
        var bridgeUnknown = state.bridgeOk === null;
        var bridgeOffline = state.bridgeOk === false;
        elements.startBatch.disabled = !hasFolder || state.isBatchRunning;
        elements.cancelBatch.disabled = !state.isBatchRunning;
        elements.runDiagnostics.disabled = !hasFolder || state.isBatchRunning;
        elements.applyCuts.disabled = !hasCsv || state.isBatchRunning;
        elements.batchProgress.style.display = state.isBatchRunning ? 'block' : 'none';

        if (elements.enablePythonProjectOpen) {
            elements.enablePythonProjectOpen.disabled = (bridgeOffline || bridgeUnknown) || state.isBatchRunning;
        }

        if (elements.enablePythonBaseAepCreation) {
            elements.enablePythonBaseAepCreation.disabled = (bridgeOffline || bridgeUnknown) || state.isBatchRunning;
        }

        if (elements.bridgeHealthDot) {
            var dotClass = 'daemon-dot';
            var title = 'PyShiftBridge daemon status';
            if (bridgeOffline) {
                dotClass += ' error';
                title = 'PyShiftBridge daemon offline. Restart AE or run bootstrap script.';
                if (state.bridgeLastError) title += ' (' + state.bridgeLastError + ')';
            } else if (bridgeUnknown) {
                dotClass += ' working';
                title = 'Checking PyShiftBridge daemon...';
            } else {
                dotClass += ' ready';
                title = 'PyShiftBridge daemon online';
            }
            elements.bridgeHealthDot.className = dotClass;
            elements.bridgeHealthDot.title = title;
        }
        
        if (state.isBatchRunning) updateStatus('working', 'Traitement...');
        else updateStatus('ready', 'Prêt');
    }

    function getEffectiveConfigForHost() {
        var cfg = {
            pythonCmd: state.config.pythonCmd,
            enablePythonCutsParser: state.config.enablePythonCutsParser,
            enableAutoRecentering: state.config.enableAutoRecentering,
            enablePythonAnalyzer: state.config.enablePythonAnalyzer,
            enablePythonRecentering: state.config.enablePythonRecentering,
            enablePythonProjectOpen: state.config.enablePythonProjectOpen,
            enablePythonBaseAepCreation: state.config.enablePythonBaseAepCreation
        };

        if (state.bridgeOk !== true) {
            cfg.enablePythonCutsParser = false;
            cfg.enablePythonAnalyzer = false;
            cfg.enablePythonRecentering = false;
            cfg.enablePythonProjectOpen = false;
            cfg.enablePythonBaseAepCreation = false;
        }

        return cfg;
    }

    function startBridgeHealthMonitoring() {
        state.bridgeOk = null;
        state.bridgeLastError = '';
        detectPythonTransport(function (pipeOk) {
            addLog('Transport PyShiftBridge: ' + (pipeOk ? 'pipe' : 'mailbox'), pipeOk ? 'success' : 'info');
            checkBridgeHealthOnce();
        });
        window.setInterval(checkBridgeHealthOnce, 30000);
    }

    function checkBridgeHealthOnce() {
        if (state.pythonTransport === 'pipe') {
            sendCommandToPythonPipe('ping', {}, 1500, function (res) {
                var ok = !!(res && res.ok);
                if (ok) {
                    state.bridgeOk = true;
                    state.bridgeLastError = '';
                    updateUI();
                    return;
                }

                state.pythonTransport = 'mailbox';
                state.pipeName = null;
                csInterface.evalScript('checkPyShiftBridgeHealth()', function (result) {
                    var ok2 = false;
                    var payload = null;
                    try {
                        if (result && result !== 'undefined' && result !== 'null') {
                            payload = JSON.parse(result);
                        }
                    } catch (e) {
                        payload = null;
                    }

                    ok2 = !!(payload && payload.ok);
                    state.bridgeOk = ok2;
                    state.bridgeLastError = (!ok2 && payload && payload.error) ? payload.error : '';
                    updateUI();
                });
            });
            return;
        }

        csInterface.evalScript('checkPyShiftBridgeHealth()', function (result) {
            var ok = false;
            var payload = null;
            try {
                if (result && result !== 'undefined' && result !== 'null') {
                    payload = JSON.parse(result);
                }
            } catch (e) {
                payload = null;
            }

            ok = !!(payload && payload.ok);
            state.bridgeOk = ok;
            state.bridgeLastError = (!ok && payload && payload.error) ? payload.error : '';
            updateUI();
        });
    }

    // Calls to ExtendScript
    function selectFolder() {
        addLog('Sélection dossier...', 'info');
        csInterface.evalScript('selectFolder()', function(result) {
            // Le résultat est traité via l'event folderSelected, 
            // mais on check aussi le retour direct au cas où
            if(result && result !== 'undefined' && result !== 'null') {
                try {
                    var data = JSON.parse(result);
                    // Si le message n'a pas été envoyé via event, on le traite ici
                    // (Evite doublon si sendToCEP a marché)
                } catch(e) {}
            }
        });
    }

    function selectCsv() {
        csInterface.evalScript('selectCsv()');
    }

    function startBatch() {
        if (!state.folderPath) return;
        state.isBatchRunning = true;
        updateUI();
        var config = JSON.stringify(getEffectiveConfigForHost());
        // Échappement des backslashes pour la string ExtendScript
        config = config.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        csInterface.evalScript('startBatch("' + state.folderPath.replace(/\\/g, "\\\\") + '", "' + config + '")');
    }

    function cancelBatch() {
        csInterface.evalScript('cancelBatch()');
    }

    function runDiagnostics() {
        if (!state.folderPath) return;
        csInterface.evalScript('runDiagnostics("' + state.folderPath.replace(/\\/g, "\\\\") + '")', function(result) {
            if (result && result !== 'null') {
                var data = JSON.parse(result);
                if (data.ok) {
                    addLog('Diagnostics OK', 'success');
                    if (data.warnings) data.warnings.forEach(w => addLog('WARN: ' + w, 'warning'));
                } else {
                    addLog('Diagnostics KO', 'error');
                    if (data.errors) data.errors.forEach(e => addLog('ERR: ' + e, 'error'));
                }
            }
        });
    }

    function applyCuts() {
        if (!state.csvPath) return;

        if (state.config.enablePythonCutsParser && state.bridgeOk === true && state.pythonTransport === 'pipe') {
            var jsx = '(function(){\n'
                + 'var comp = app.project.activeItem;\n'
                + 'if (!comp || !(comp instanceof CompItem)) return JSON.stringify({ok:false,error:"Aucune composition active"});\n'
                + 'var layer = comp.selectedLayers.length > 0 ? comp.selectedLayers[0] : comp.layer(1);\n'
                + 'if (!layer) return JSON.stringify({ok:false,error:"Aucun calque trouvé"});\n'
                + 'try { for (var i=0;i<comp.selectedLayers.length;i++){ comp.selectedLayers[i].selected=false; } } catch(e) {}\n'
                + 'layer.selected = true;\n'
                + 'var videoName = "";\n'
                + 'try { videoName = decodeURI(layer.source.name); } catch(e) { videoName = layer.source.name; }\n'
                + 'return JSON.stringify({ok:true,frameRate:comp.frameRate,duration:comp.duration,videoName:videoName});\n'
                + '})();';

            csInterface.evalScript(jsx, function (result) {
                var info = null;
                try { info = JSON.parse(result); } catch (e) { info = null; }
                if (!info || info.ok !== true) {
                    addLog('Cuts Python: ' + (info && info.error ? info.error : 'Erreur info AE'), 'error');
                    applyCutsViaHostFallback();
                    return;
                }

                var trackingPath = null;
                if (supportsNodeRequire() && state.folderPath) {
                    try {
                        var fs = require('fs');
                        var path = require('path');
                        var docsFolder = path.join(state.folderPath, 'docs');
                        var baseName = String(info.videoName || '');
                        var dot = baseName.lastIndexOf('.');
                        if (dot !== -1) baseName = baseName.substring(0, dot);
                        var variants = [
                            baseName + '_ae.json',
                            baseName + '_tracking.json',
                            baseName + '.json'
                        ];
                        for (var i = 0; i < variants.length; i++) {
                            var p = path.join(docsFolder, variants[i]);
                            if (fs.existsSync(p)) {
                                trackingPath = p;
                                break;
                            }
                        }
                    } catch (e) {
                        trackingPath = null;
                    }
                }

                csInterface.evalScript('getPyShiftBridgeConfig()', function (cfgRaw) {
                    var bridgeCfg = {};
                    try {
                        bridgeCfg = JSON.parse(cfgRaw || '{}');
                    } catch (e) {
                        bridgeCfg = {};
                    }

                    sendCommandToPythonPipe(
                        'mediasolution_apply_cuts_active_layer',
                        {
                            csv_path: state.csvPath,
                            frame_rate: info.frameRate,
                            comp_duration: info.duration,
                            snap_factor: 1.5,
                            tracking_json_path: trackingPath,
                            config: bridgeCfg
                        },
                        20000,
                        function (res) {
                            if (res && res.ok && res.result && res.result.created !== undefined) {
                                addLog('Cuts (pipe): ' + res.result.created + ' créés', 'success');
                                return;
                            }

                            addLog('Cuts Python failed, fallback ExtendScript', 'warning');
                            applyCutsViaHostFallback();
                        }
                    );
                });
            });
            return;
        }

        applyCutsViaHostFallback();
    }

    function applyCutsViaHostFallback() {
        var config = JSON.stringify(getEffectiveConfigForHost());
        config = config.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        csInterface.evalScript('applyCuts("' + state.csvPath.replace(/\\/g, "\\\\") + '", "' + config + '")', function (result) {
            if (result) {
                var data = JSON.parse(result);
                if (data.success) addLog('Cuts: ' + data.count + ' créés', 'success');
                else addLog('Erreur Cuts: ' + data.error, 'error');
            }
        });
    }

    function updateConfig() {
        state.config.pythonCmd = elements.pythonCmd.value;
        state.config.enablePythonCutsParser = elements.enablePythonCutsParser.checked;
        state.config.enableAutoRecentering = elements.enableAutoRecentering.checked;
        state.config.enablePythonAnalyzer = elements.enablePythonAnalyzer.checked;
        state.config.enablePythonRecentering = elements.enablePythonRecentering.checked;
        if (elements.enablePythonProjectOpen) {
            state.config.enablePythonProjectOpen = elements.enablePythonProjectOpen.checked;
        }
        if (elements.enablePythonBaseAepCreation) {
            state.config.enablePythonBaseAepCreation = elements.enablePythonBaseAepCreation.checked;
        }
        saveConfig();

        var config = JSON.stringify(state.config);
        config = config.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        csInterface.evalScript('updateRuntimeConfig("' + config + '")');
    }

    function loadConfig() {
        var saved = localStorage.getItem('mediasolution_config');
        if (saved) {
            try {
                state.config = JSON.parse(saved);
                state.config.enablePythonProjectOpen = state.config.enablePythonProjectOpen === true;
                state.config.enablePythonBaseAepCreation = state.config.enablePythonBaseAepCreation === true;
                if(elements.pythonCmd) elements.pythonCmd.value = state.config.pythonCmd;
                if(elements.enablePythonCutsParser) elements.enablePythonCutsParser.checked = state.config.enablePythonCutsParser;
                if(elements.enableAutoRecentering) elements.enableAutoRecentering.checked = state.config.enableAutoRecentering;
                if(elements.enablePythonAnalyzer) elements.enablePythonAnalyzer.checked = state.config.enablePythonAnalyzer;
                if(elements.enablePythonRecentering) elements.enablePythonRecentering.checked = state.config.enablePythonRecentering;
                if(elements.enablePythonProjectOpen) elements.enablePythonProjectOpen.checked = state.config.enablePythonProjectOpen;
                if(elements.enablePythonBaseAepCreation) elements.enablePythonBaseAepCreation.checked = state.config.enablePythonBaseAepCreation;
            } catch (e) {}
        }
    }

    function saveConfig() {
        localStorage.setItem('mediasolution_config', JSON.stringify(state.config));
    }

    function exportConfig() {
        var configJson = JSON.stringify(state.config, null, 2);
        configJson = configJson.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        csInterface.evalScript('saveConfigFile("' + configJson + '")', function(res) {
            if(res && res != 'null') addLog('Config exportée', 'success');
        });
    }

    function importConfig() {
        csInterface.evalScript('loadConfigFile()', function(res) {
            if (res && res !== 'null') {
                try {
                    state.config = JSON.parse(res);
                    loadConfig();
                    saveConfig();
                    addLog('Config importée', 'success');
                } catch(e) { addLog('Erreur import config', 'error'); }
            }
        });
    }

    function clearLogs() {
        elements.logsContainer.innerHTML = '';
    }

    function exportLogs() {
        var logs = [];
        elements.logsContainer.querySelectorAll('.log-entry').forEach(e => logs.push(e.textContent));
        var logText = logs.join('\n').replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, '\\n');
        csInterface.evalScript('saveLogFile("' + logText + '")', function(res){
            if(res && res != 'null') addLog('Logs exportés', 'success');
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();