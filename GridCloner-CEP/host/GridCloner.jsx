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
        // Keep mailbox directory aligned with the daemon.
        // PyShiftBridge/bridge_daemon.py honors PYSHIFTBRIDGE_DIR.
        var envDir = '';
        try {
            envDir = $.getenv('PYSHIFTBRIDGE_DIR');
        } catch (e0) {
            envDir = '';
        }
        if (envDir && envDir !== '') {
            try {
                var envFolder = Folder(envDir);
                if (!envFolder.exists) envFolder.create();
                return envFolder.fsName;
            } catch (eEnv) {
                // Fall back to default.
            }
        }

        var home = Folder('~');
        var docs = Folder(joinPath(home.fsName, 'Documents'));
        var base = docs.exists ? docs : home;
        var dir = Folder(joinPath(base.fsName, 'PyShiftAE_CEP_Bridge'));
        if (!dir.exists) dir.create();
        return dir.fsName;
    }

    function formatDateSafe(d) {
        try {
            if (!d) return '';
            if (d && typeof d.toUTCString === 'function') return d.toUTCString();
            return String(d);
        } catch (e) {
            return '';
        }
    }

    function getFileStat(fileObj) {
        var st = {
            path: fileObj ? fileObj.fsName : '',
            exists: false,
            length: 0,
            modifiedUtc: ''
        };
        try {
            if (!fileObj) return st;
            st.exists = !!fileObj.exists;
            if (st.exists) {
                st.length = Number(fileObj.length || 0);
                st.modifiedUtc = formatDateSafe(fileObj.modified);
            }
        } catch (e) {}
        return st;
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

    function hasNativeJSON() {
        return typeof JSON !== 'undefined' && JSON && typeof JSON.parse === 'function' && typeof JSON.stringify === 'function';
    }

    function escapeJsonString(str) {
        return String(str || '')
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/\u0008/g, '\\b')
            .replace(/\f/g, '\\f')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t')
            .replace(/\u2028/g, '\\u2028')
            .replace(/\u2029/g, '\\u2029');
    }

    function stringifyFallback(value) {
        if (value === null) return 'null';

        var t = typeof value;
        if (t === 'string') return '"' + escapeJsonString(value) + '"';
        if (t === 'number') return isFinite(value) ? String(value) : 'null';
        if (t === 'boolean') return value ? 'true' : 'false';
        if (t === 'undefined' || t === 'function') return 'null';

        var i;
        if (value && value.constructor === Array) {
            var arr = [];
            for (i = 0; i < value.length; i += 1) {
                arr.push(stringifyFallback(value[i]));
            }
            return '[' + arr.join(',') + ']';
        }

        if (t === 'object') {
            var parts = [];
            for (var k in value) {
                if (!value.hasOwnProperty(k)) continue;
                var v = value[k];
                if (typeof v === 'undefined' || typeof v === 'function') continue;
                parts.push('"' + escapeJsonString(k) + '":' + stringifyFallback(v));
            }
            return '{' + parts.join(',') + '}';
        }

        return 'null';
    }

    function safeJsonStringify(value) {
        try {
            if (hasNativeJSON()) {
                return JSON.stringify(value);
            }
            return stringifyFallback(value);
        } catch (e) {
            return stringifyFallback(value);
        }
    }

    function safeJsonParse(raw) {
        try {
            if (!raw) return null;
            if (hasNativeJSON()) {
                return JSON.parse(raw);
            }
            return eval('(' + String(raw) + ')');
        } catch (e) {
            return null;
        }
    }

    function safeDecodeURIComponent(value) {
        try {
            return decodeURIComponent(String(value || ''));
        } catch (e) {
            return '';
        }
    }

    function getPyCandidateObject() {
        // Primary contract (expected): global `py` object.
        try {
            if (typeof py !== 'undefined' && py && typeof py.executePythonFile === 'function') {
                return { name: 'py', obj: py };
            }
        } catch (e0) {}

        // Heuristic fallback: scan $.global for any object exposing executePythonFile.
        try {
            for (var k in $.global) {
                if (!k) continue;
                try {
                    var o = $.global[k];
                    if (o && typeof o.executePythonFile === 'function') {
                        return { name: String(k), obj: o };
                    }
                } catch (e1) {}
            }
        } catch (e2) {}

        return null;
    }

    function getPyRuntimeStatus() {
        var st = {
            pyDefined: false,
            pyExecuteAvailable: false,
            pyAnyExecuteAvailable: false,
            pyCandidateName: '',
            os: '',
            runPyShiftBootstrapAvailable: false,
            pythonConsoleMenuId: 0,
            pythonExecuteMenuId: 0,
            pyCandidates: [],
            pyShiftAePluginCandidates: [],
            pyShiftAePluginFound: false
        };

        try {
            st.os = String($.os || '');
        } catch (eOs) {
            st.os = '';
        }

        try {
            st.runPyShiftBootstrapAvailable = (typeof $.global.runPyShiftBootstrap === 'function');
        } catch (eBoot) {
            st.runPyShiftBootstrapAvailable = false;
        }

        try {
            st.pyDefined = (typeof py !== 'undefined' && !!py);
            st.pyExecuteAvailable = (st.pyDefined && typeof py.executePythonFile === 'function');
        } catch (ePy) {
            st.pyDefined = false;
            st.pyExecuteAvailable = false;
        }

        // Unified view: some systems expose executePythonFile under a different symbol.
        try {
            var cand = getPyCandidateObject();
            if (cand) {
                st.pyAnyExecuteAvailable = true;
                st.pyCandidateName = String(cand.name || '');
            }
        } catch (eCand0) {
            st.pyAnyExecuteAvailable = false;
            st.pyCandidateName = '';
        }

        // Heuristic: sometimes the bridge object name differs. Scan $.global for any object
        // exposing executePythonFile so we can produce actionable diagnostics.
        try {
            var limit = 8;
            for (var k in $.global) {
                if (!k) continue;
                try {
                    var obj = $.global[k];
                    if (obj && typeof obj.executePythonFile === 'function') {
                        st.pyCandidates.push(String(k));
                        if (st.pyCandidates.length >= limit) break;
                    }
                } catch (eCand) {
                    // ignore
                }
            }
        } catch (eList) {
            // ignore
        }

        // Useful on Windows: if this returns 0, the menu item is not registered (plugin not loaded).
        try {
            if (app && typeof app.findMenuCommandId === 'function') {
                st.pythonConsoleMenuId = Number(app.findMenuCommandId('Python Console') || 0);
                if (!st.pythonConsoleMenuId) {
                    // Some locales may translate the menu.
                    st.pythonConsoleMenuId = Number(app.findMenuCommandId('Console Python') || 0);
                }
                if (!st.pythonConsoleMenuId) {
                    // Additional common variants (localization / punctuation).
                    st.pythonConsoleMenuId = Number(app.findMenuCommandId('Python console') || 0);
                }
                if (!st.pythonConsoleMenuId) {
                    st.pythonConsoleMenuId = Number(app.findMenuCommandId('Console de Python') || 0);
                }
                if (!st.pythonConsoleMenuId) {
                    st.pythonConsoleMenuId = Number(app.findMenuCommandId('Console Python…') || 0);
                }
                if (!st.pythonConsoleMenuId) {
                    st.pythonConsoleMenuId = Number(app.findMenuCommandId('Python Console…') || 0);
                }

                // Some PyShiftAE builds do not ship a console; instead they expose execution via
                // File → Execute (.py). We can't rely on localization here, but probing a few common
                // labels gives better diagnostics than “console missing”.
                // Keep this strict: "Execute" exists in many apps/menus and would produce
                // false positives. We only try to detect the PyShiftAE-specific label.
                st.pythonExecuteMenuId = Number(app.findMenuCommandId('Run Python Script (.py)') || 0);
                if (!st.pythonExecuteMenuId) {
                    st.pythonExecuteMenuId = Number(app.findMenuCommandId('Run Python Script (.py)…') || 0);
                }
                if (!st.pythonExecuteMenuId) {
                    st.pythonExecuteMenuId = Number(app.findMenuCommandId('Run Python Script (.py)...') || 0);
                }
            }
        } catch (eMenu) {
            st.pythonConsoleMenuId = 0;
            st.pythonExecuteMenuId = 0;
        }

        // Best-effort: locate PyShiftAE plugin binary in After Effects directories.
        // This helps determine if the plugin is missing vs just not loaded.
        try {
            var candidates = [];
            try {
                var base1 = Folder.appPackage.fsName;
                candidates.push(joinPath(joinPath(base1, 'Plug-ins'), 'PyShiftAE.aex'));
                candidates.push(joinPath(joinPath(joinPath(base1, 'Plug-ins'), 'PyShiftAE'), 'PyShiftAE.aex'));
            } catch (eC1) {}
            try {
                var base2 = Folder.appPackage.parent.fsName;
                candidates.push(joinPath(joinPath(joinPath(base2, 'Support Files'), 'Plug-ins'), 'PyShiftAE.aex'));
                candidates.push(joinPath(joinPath(joinPath(joinPath(base2, 'Support Files'), 'Plug-ins'), 'PyShiftAE'), 'PyShiftAE.aex'));
            } catch (eC2) {}

            // Filter + probe.
            for (var i = 0; i < candidates.length; i += 1) {
                var p = String(candidates[i] || '');
                if (!p) continue;
                st.pyShiftAePluginCandidates.push(p);
                try {
                    var f = new File(p);
                    if (f && f.exists) {
                        st.pyShiftAePluginFound = true;
                    }
                } catch (eP) {}
            }
        } catch (eBin) {
            // ignore
        }

        return st;
    }

    function newBridgeId() {
        return String(new Date().getTime()) + '-' + String(Math.floor(Math.random() * 100000));
    }

    function isWindowsOS() {
        try {
            return String($.os || '').toLowerCase().indexOf('windows') !== -1;
        } catch (e) {
            return false;
        }
    }

    function quoteForShell(value) {
        var s = String(value || '');
        if (isWindowsOS()) {
            return '"' + s.replace(/"/g, '""') + '"';
        }
        return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
    }

    function previewText(value, maxLen) {
        var s = String(value || '');
        maxLen = maxLen || 180;
        if (s.length <= maxLen) return s;
        return s.substring(0, maxLen) + '...';
    }

    function getRepoRootFromCurrentScript() {
        try {
            var currentFile = new File($.fileName);
            if (!currentFile || !currentFile.parent) return '';
            var hostDir = currentFile.parent;
            if (!hostDir || !hostDir.parent) return '';
            var panelDir = hostDir.parent;
            if (!panelDir || !panelDir.parent) return '';
            return panelDir.parent.fsName;
        } catch (e) {
            return '';
        }
    }

    function resolveBootstrapScriptFile() {
        var envPath = '';
        try {
            envPath = $.getenv('PYSHIFTBRIDGE_BOOTSTRAP_PY');
        } catch (e) {
            envPath = '';
        }

        if (envPath && envPath !== '') {
            return new File(envPath);
        }

        var repoRoot = getRepoRootFromCurrentScript();
        if (repoRoot) {
            var repoCandidate = new File(joinPath(repoRoot, 'PyShiftBridge/bootstrap/bridge_bootstrap_mediasolution.py'));
            if (repoCandidate.exists) {
                return repoCandidate;
            }
        }

        return new File(joinPath(Folder.myDocuments.fsName, 'Scripts/bridge_bootstrap_mediasolution.py'));
    }

    function resolveBootstrapJsxFile() {
        var repoRoot = getRepoRootFromCurrentScript();
        if (!repoRoot) return null;
        var jsxFile = new File(joinPath(repoRoot, 'PyShiftBridge/bootstrap/PyShiftBridgeBootstrap.jsx'));
        return jsxFile.exists ? jsxFile : null;
    }

    function tryBootstrapViaExistingGlobal(scriptFile, bridgeDir) {
        if (typeof $.global.runPyShiftBootstrap !== 'function') {
            return {
                ok: false,
                code: 'bootstrap_global_missing',
                detail: '$.global.runPyShiftBootstrap not available'
            };
        }

        // Ensure the bootstrap function uses the same script + dir we resolved here.
        try {
            if (scriptFile && scriptFile.exists) {
                $.setenv('PYSHIFTBRIDGE_BOOTSTRAP_PY', scriptFile.fsName);
            }
        } catch (eSet0) {}
        try {
            $.setenv('PYSHIFTBRIDGE_DIR', String(bridgeDir || ''));
        } catch (eSet1) {}

        try {
            $.global.runPyShiftBootstrap();
            return {
                ok: true,
                code: 'bootstrap_global_called',
                detail: 'runPyShiftBootstrap() called',
                pyStatus: getPyRuntimeStatus()
            };
        } catch (e) {
            return {
                ok: false,
                code: 'bootstrap_global_failed',
                detail: String(e)
            };
        }
    }

    function tryBootstrapViaLocalSchedule(scriptFile, bridgeDir) {
        if (!scriptFile || !scriptFile.exists) {
            return {
                ok: false,
                code: 'bootstrap_script_missing',
                detail: scriptFile ? scriptFile.fsName : 'unknown_script_path'
            };
        }

        if (!app || typeof app.scheduleTask !== 'function') {
            return {
                ok: false,
                code: 'schedule_task_unavailable',
                detail: 'app.scheduleTask indisponible'
            };
        }

        try {
            $.setenv('PYSHIFTBRIDGE_BOOTSTRAP_PY', scriptFile.fsName);
        } catch (e) {}
        try {
            $.setenv('PYSHIFTBRIDGE_DIR', String(bridgeDir || ''));
        } catch (e2) {}

        $.global.gridclonerRunPyShiftBootstrap = function () {
            try {
                var sp = $.getenv('PYSHIFTBRIDGE_BOOTSTRAP_PY');
                var sf = new File(sp || '');
                var cand = getPyCandidateObject();
                if (cand && cand.obj && typeof cand.obj.executePythonFile === 'function' && sf.exists) {
                    cand.obj.executePythonFile(sf);
                    return;
                }
            } catch (e3) {}

            try {
                app.scheduleTask('$.global.gridclonerRunPyShiftBootstrap()', 1000, false);
            } catch (e4) {}
        };

        try {
            app.scheduleTask('$.global.gridclonerRunPyShiftBootstrap()', 50, false);
            return {
                ok: true,
                code: 'local_bootstrap_scheduled',
                detail: 'gridclonerRunPyShiftBootstrap programmé'
            };
        } catch (e5) {
            return {
                ok: false,
                code: 'local_bootstrap_schedule_failed',
                detail: String(e5)
            };
        }
    }

    function tryBootstrapViaPyExecute(scriptFile, bridgeDir) {
        if (!scriptFile || !scriptFile.exists) {
            return {
                ok: false,
                code: 'bootstrap_script_missing',
                detail: scriptFile ? scriptFile.fsName : 'unknown_script_path'
            };
        }

        var pyCand = getPyCandidateObject();
        if (!pyCand || !pyCand.obj || typeof pyCand.obj.executePythonFile !== 'function') {
            return {
                ok: false,
                code: 'py_execute_unavailable',
                detail: 'executePythonFile unavailable'
            };
        }

        try {
            $.setenv('PYSHIFTBRIDGE_DIR', String(bridgeDir || ''));
        } catch (e) {}

        try {
            pyCand.obj.executePythonFile(scriptFile);
            return {
                ok: true,
                code: 'py_execute_started',
                detail: scriptFile.fsName
            };
        } catch (e2) {
            return {
                ok: false,
                code: 'py_execute_failed',
                detail: String(e2)
            };
        }
    }

    function tryBootstrapViaScheduledBootstrap(scriptFile, bridgeDir) {
        if (!scriptFile || !scriptFile.exists) {
            return {
                ok: false,
                code: 'bootstrap_script_missing',
                detail: scriptFile ? scriptFile.fsName : 'unknown_script_path'
            };
        }

        var jsxFile = resolveBootstrapJsxFile();
        if (!jsxFile) {
            return {
                ok: false,
                code: 'bootstrap_jsx_missing',
                detail: 'PyShiftBridge/bootstrap/PyShiftBridgeBootstrap.jsx introuvable'
            };
        }

        try {
            $.setenv('PYSHIFTBRIDGE_BOOTSTRAP_PY', scriptFile.fsName);
        } catch (e) {}
        try {
            $.setenv('PYSHIFTBRIDGE_DIR', String(bridgeDir || ''));
        } catch (e2) {}

        try {
            if (typeof $.global.runPyShiftBootstrap !== 'function') {
                $.evalFile(jsxFile);
            }
        } catch (eEval) {
            return {
                ok: false,
                code: 'bootstrap_jsx_eval_failed',
                detail: String(eEval)
            };
        }

        if (typeof $.global.runPyShiftBootstrap !== 'function') {
            return {
                ok: false,
                code: 'bootstrap_function_missing',
                detail: 'runPyShiftBootstrap indisponible après chargement'
            };
        }

        try {
            $.global.runPyShiftBootstrap();
            return {
                ok: true,
                code: 'bootstrap_scheduled',
                detail: 'runPyShiftBootstrap déclenché (scheduleTask)'
            };
        } catch (eRun) {
            return {
                ok: false,
                code: 'bootstrap_function_failed',
                detail: String(eRun)
            };
        }
    }

    function tryBootstrapViaSystemCall(scriptFile, bridgeDir) {
        if (!scriptFile || !scriptFile.exists) {
            return {
                ok: false,
                code: 'bootstrap_script_missing',
                detail: scriptFile ? scriptFile.fsName : 'unknown_script_path'
            };
        }

        // Security/ops gate: never spawn external processes unless explicitly allowed.
        var allowSystem = false;
        try {
            allowSystem = String($.getenv('PYSHIFTBRIDGE_ALLOW_SYSTEM_FALLBACK') || '') === '1';
        } catch (eAllow) {
            allowSystem = false;
        }

        if (!allowSystem) {
            return {
                ok: false,
                code: 'system_fallback_disabled',
                detail: 'Set PYSHIFTBRIDGE_ALLOW_SYSTEM_FALLBACK=1 to enable system.callSystem bootstrap.'
            };
        }

        if (typeof system === 'undefined' || !system || typeof system.callSystem !== 'function') {
            return {
                ok: false,
                code: 'system_call_unavailable',
                detail: 'system.callSystem unavailable'
            };
        }

        function resolveWindowsSupportFilesPythonExe() {
            try {
                var base1 = Folder.appPackage.fsName; // often "...\\Support Files"
                var cand1 = new File(joinPath(joinPath(base1, 'Python'), 'python.exe'));
                if (cand1.exists) return cand1.fsName;
            } catch (e1) {}

            try {
                // Check venv path used in current installation
                var candVenv = new File(joinPath(joinPath(joinPath(joinPath(base1, 'Lib'), 'venv'), 'Scripts'), 'nt/python.exe'));
                if (candVenv.exists) return candVenv.fsName;
            } catch (eVenv) {}

            try {
                // Sometimes appPackage points to "...\\Adobe After Effects 20xx".
                var base2 = Folder.appPackage.parent.fsName;
                var cand2 = new File(joinPath(joinPath(joinPath(base2, 'Support Files'), 'Python'), 'python.exe'));
                if (cand2.exists) return cand2.fsName;
            } catch (e2) {}

            return '';
        }

        var pyExec = '';
        try {
            pyExec = $.getenv('PYSHIFTBRIDGE_PYTHON');
        } catch (e) {
            pyExec = '';
        }
        if (!pyExec || pyExec === '') {
            if (isWindowsOS()) {
                pyExec = resolveWindowsSupportFilesPythonExe();
            } else {
                pyExec = 'python3';
            }
        }

        if (!pyExec || pyExec === '') {
            return {
                ok: false,
                code: 'system_python_unresolved',
                detail: 'Set PYSHIFTBRIDGE_PYTHON (absolute path to python.exe) or install python next to AfterFX.exe (Support Files/Python/python.exe).'
            };
        }

        var cmd;
        if (isWindowsOS()) {
            // Keep command short and non-blocking: this script should print a one-liner and exit.
            cmd = 'cmd /c "set PYSHIFTBRIDGE_DIR=' + String(bridgeDir || '') + ' && ' + quoteForShell(pyExec) + ' ' + quoteForShell(scriptFile.fsName) + '"';
        } else {
            cmd = 'PYSHIFTBRIDGE_DIR=' + quoteForShell(bridgeDir) + ' ' + quoteForShell(pyExec) + ' ' + quoteForShell(scriptFile.fsName) + ' 2>&1';
        }

        try {
            var output = String(system.callSystem(cmd) || '');
            if (!output) {
                return {
                    ok: false,
                    code: 'system_call_no_output',
                    detail: 'empty_output'
                };
            }
            var low = output.toLowerCase();
            if (output && output.toLowerCase().indexOf('traceback') !== -1) {
                return {
                    ok: false,
                    code: 'system_bootstrap_traceback',
                    detail: previewText(output)
                };
            }
            if (low.indexOf('module not found') !== -1 || low.indexOf('no module named') !== -1 || low.indexOf('not recognized') !== -1 || low.indexOf('command not found') !== -1) {
                return {
                    ok: false,
                    code: 'system_bootstrap_env_error',
                    detail: previewText(output)
                };
            }
            if (low.indexOf('démarré') === -1 && low.indexOf('deja actif') === -1 && low.indexOf('déjà actif') === -1 && low.indexOf('started') === -1 && low.indexOf('already active') === -1) {
                return {
                    ok: false,
                    code: 'system_bootstrap_unconfirmed',
                    detail: previewText(output)
                };
            }
            return {
                ok: true,
                code: 'system_call_started',
                detail: output ? previewText(output) : 'no_output'
            };
        } catch (e2) {
            return {
                ok: false,
                code: 'system_call_failed',
                detail: String(e2)
            };
        }
    }

    function bootstrapPyShiftBridgeDaemon(bridgeDir) {
        var scriptFile = resolveBootstrapScriptFile();
        var viaPy = tryBootstrapViaPyExecute(scriptFile, bridgeDir);
        if (viaPy.ok) {
            return {
                ok: true,
                method: 'py.executePythonFile',
                detail: viaPy.detail
            };
        }

        var viaExisting = tryBootstrapViaExistingGlobal(scriptFile, bridgeDir);
        if (viaExisting.ok) {
            return {
                ok: true,
                method: 'global.runPyShiftBootstrap',
                detail: viaExisting.detail,
                pyStatus: viaExisting.pyStatus,
                fallbackFrom: viaPy.code
            };
        }

        var viaLocal = tryBootstrapViaLocalSchedule(scriptFile, bridgeDir);
        if (viaLocal.ok) {
            return {
                ok: true,
                method: 'local.scheduleTask',
                detail: viaLocal.detail,
                fallbackFrom: viaExisting.code
            };
        }

        var viaScheduled = tryBootstrapViaScheduledBootstrap(scriptFile, bridgeDir);
        if (viaScheduled.ok) {
            return {
                ok: true,
                method: 'jsx.scheduleTask',
                detail: viaScheduled.detail,
                fallbackFrom: viaLocal.code
            };
        }

        var viaSystem = tryBootstrapViaSystemCall(scriptFile, bridgeDir);
        if (viaSystem.ok) {
            return {
                ok: true,
                method: 'system.callSystem',
                detail: viaSystem.detail,
                fallbackFrom: viaScheduled.code
            };
        }

        return {
            ok: false,
            method: 'none',
            detail: 'py=' + viaPy.code + ':' + viaPy.detail + '; existing=' + viaExisting.code + ':' + viaExisting.detail + '; local=' + viaLocal.code + ':' + viaLocal.detail + '; scheduled=' + viaScheduled.code + ':' + viaScheduled.detail + '; system=' + viaSystem.code + ':' + viaSystem.detail
        };
    }

    function sendToPyShiftBridgeOnce(entrypoint, args, timeoutMs) {
        timeoutMs = timeoutMs || 20000;

        var dir = ensurePyShiftBridgeMailbox();
        var req = new File(joinPath(dir, 'cep_to_py.json'));
        var resp = new File(joinPath(dir, 'py_to_cep.json'));

        var respBaseline = getFileStat(resp);
        var respChanged = false;
        var sawOtherId = false;
        var parseErrorCount = 0;

        var msgId = newBridgeId();
        var payload = {
            id: msgId,
            entrypoint: entrypoint,
            args: args || {}
        };

        writeTextAtomic(req, safeJsonStringify(payload));

        var start = new Date().getTime();
        while ((new Date().getTime() - start) < timeoutMs) {
            $.sleep(200);

            try {
                if (resp.exists) {
                    var m = formatDateSafe(resp.modified);
                    if (m && respBaseline.modifiedUtc && m !== respBaseline.modifiedUtc) {
                        respChanged = true;
                    }
                    if (m && !respBaseline.modifiedUtc) {
                        respChanged = true;
                    }
                    if (respBaseline.length && Number(resp.length || 0) !== respBaseline.length) {
                        respChanged = true;
                    }
                }
            } catch (eSt) {}

            var raw = readText(resp);
            if (!raw) continue;
            var parsed = safeJsonParse(raw);
            if (!parsed || !parsed.id) {
                parseErrorCount += 1;
                continue;
            }
            if (parsed.id !== msgId) {
                sawOtherId = true;
                continue;
            }
            if (parsed.ok) {
                return { ok: true, result: parsed.result };
            }
            return {
                ok: false,
                error: parsed.error || 'Unknown bridge error',
                debug: {
                    bridgeDir: String(dir || ''),
                    entrypoint: String(entrypoint || ''),
                    timeoutMs: Number(timeoutMs || 0),
                    msgId: String(msgId || ''),
                    request: getFileStat(req),
                    response: getFileStat(resp),
                    responseBaseline: respBaseline,
                    responseChanged: !!respChanged,
                    sawOtherId: !!sawOtherId,
                    parseErrorCount: Number(parseErrorCount || 0)
                }
            };
        }

        return {
            ok: false,
            error: 'PyShiftBridge timeout',
            debug: {
                bridgeDir: String(dir || ''),
                entrypoint: String(entrypoint || ''),
                timeoutMs: Number(timeoutMs || 0),
                msgId: String(msgId || ''),
                request: getFileStat(req),
                response: getFileStat(resp),
                responseBaseline: respBaseline,
                responseChanged: !!respChanged,
                sawOtherId: !!sawOtherId,
                parseErrorCount: Number(parseErrorCount || 0)
            }
        };
    }

    function sendToPyShiftBridge(entrypoint, args, timeoutMs) {
        timeoutMs = timeoutMs || 20000;

        var tStart = new Date().getTime();
        var lastDebug = null;

        var firstTryTimeout = Math.min(timeoutMs, 5000);
        var firstTry = sendToPyShiftBridgeOnce(entrypoint, args, firstTryTimeout);
        if (firstTry && firstTry.ok) {
            return firstTry;
        }
        if (firstTry && firstTry.debug) {
            lastDebug = firstTry.debug;
        }

        if (!firstTry || String(firstTry.error || '').indexOf('PyShiftBridge timeout') !== 0) {
            return firstTry;
        }

        // Root-cause fast-fail (with optional fallback): when the embedded PyShiftAE bridge is not
        // available, the daemon cannot start *inside AE*. However, we can still try to start the
        // daemon as an external process via system.callSystem if PYSHIFTBRIDGE_PYTHON is configured.
        var pyStatusEarly = getPyRuntimeStatus();

        // Optional external bootstrap gate.
        var allowSystem = false;
        try {
            allowSystem = String($.getenv('PYSHIFTBRIDGE_ALLOW_SYSTEM_FALLBACK') || '') === '1';
        } catch (eAllow) {
            allowSystem = false;
        }

        if (!pyStatusEarly.pyDefined || !pyStatusEarly.pyExecuteAvailable) {
            var bridgeDirEarly = ensurePyShiftBridgeMailbox();
            var dbgEarly = lastDebug || { bridgeDir: String(bridgeDirEarly || '') };
            dbgEarly.pyStatus = pyStatusEarly;

            // Keep the allowSystem decision visible in diagnostics.
            try {
                dbgEarly.allowSystemFallback = !!allowSystem;
            } catch (eAllowDbg) {}

            // If allowed, attempt external bootstrap. This is useful when PyShiftAE isn't loaded
            // yet (no `py` object) but we still want mailbox responses for diagnostics.
            if (allowSystem) {
                var bootstrapSystem = bootstrapPyShiftBridgeDaemon(bridgeDirEarly);
                dbgEarly.bootstrap = bootstrapSystem;
                if (!bootstrapSystem.ok) {
                    return {
                        ok: false,
                        error: 'PyShiftAE bridge unavailable (py missing) and external bootstrap failed (' + bootstrapSystem.detail + '). Install/enable PyShiftAE (Window → Python Console OR File → Execute (.py)) or set PYSHIFTBRIDGE_PYTHON.',
                        debug: dbgEarly
                    };
                }

                // External bootstrap requested; retry mailbox with remaining budget.
                var elapsed0 = new Date().getTime() - tStart;
                var remaining0 = timeoutMs - elapsed0;
                if (remaining0 < 800) remaining0 = 800;

                var retry0 = sendToPyShiftBridgeOnce(entrypoint, args, Math.min(remaining0, 6000));
                if (retry0 && retry0.ok) {
                    return retry0;
                }
                if (retry0 && retry0.debug) {
                    retry0.debug.pyStatus = pyStatusEarly;
                    retry0.debug.bootstrap = bootstrapSystem;
                }
                return retry0;
            }

            if (!pyStatusEarly.pyAnyExecuteAvailable) {
                var hint = '';
                try {
                    if (!pyStatusEarly.pythonConsoleMenuId) {
                        if (!pyStatusEarly.pythonExecuteMenuId) {
                            hint = ' PyShiftAE semble non chargé (menu Python Console / Execute (.py) absent).';
                        } else {
                            hint = ' Menu File → Execute (.py) détecté (id=' + String(pyStatusEarly.pythonExecuteMenuId) + '), mais aucun objet executePythonFile n\'est exposé.';
                        }
                    } else {
                        hint = ' Menu Python Console détecté (id=' + String(pyStatusEarly.pythonConsoleMenuId) + '), mais aucun objet executePythonFile n\'est exposé.';
                    }
                } catch (eHint) {}

                return {
                    ok: false,
                    error: 'PyShiftAE Python bridge unavailable (executePythonFile missing).' + hint + ' Installe/active PyShiftAE (Window → Python Console / File → Execute (.py)) puis réessaie. Pour forcer un test via system.callSystem, définis PYSHIFTBRIDGE_ALLOW_SYSTEM_FALLBACK=1 et PYSHIFTBRIDGE_PYTHON.',
                    debug: dbgEarly
                };
            }

            // If we have a candidate object (executePythonFile under another symbol), continue.
        }

        var bridgeDir = ensurePyShiftBridgeMailbox();
        var bootstrap = bootstrapPyShiftBridgeDaemon(bridgeDir);
        var pyStatus = getPyRuntimeStatus();

        if (!bootstrap.ok) {
            var dbg0 = lastDebug || { bridgeDir: String(bridgeDir || '') };
            dbg0.bootstrap = bootstrap;
            dbg0.pyStatus = pyStatus;
            return {
                ok: false,
                error: 'PyShiftBridge timeout (daemon indisponible; bootstrap_failed: ' + bootstrap.detail + ')',
                debug: dbg0
            };
        }

        // Use remaining budget up to timeoutMs. This matters because runPyShiftBootstrap may
        // schedule the Python init (py.executePythonFile) and not start the daemon immediately.
        var retrySliceMs = Math.min(Math.max(Math.floor(timeoutMs / 3), 1200), 3000);

        while (true) {
            var elapsed = new Date().getTime() - tStart;
            var remaining = timeoutMs - elapsed;
            if (remaining <= 0) break;

            $.sleep(500);
            elapsed = new Date().getTime() - tStart;
            remaining = timeoutMs - elapsed;
            if (remaining <= 0) break;

            var thisTimeout = Math.min(retrySliceMs, remaining);
            var retry = sendToPyShiftBridgeOnce(entrypoint, args, thisTimeout);
            if (retry && retry.ok) {
                return retry;
            }
            if (retry && retry.debug) {
                lastDebug = retry.debug;
            }
            if (!retry || String(retry.error || '').indexOf('PyShiftBridge timeout') !== 0) {
                if (retry && !retry.debug) {
                    var dbgNonTimeout = lastDebug || { bridgeDir: String(bridgeDir || '') };
                    dbgNonTimeout.bootstrap = bootstrap;
                    dbgNonTimeout.pyStatus = pyStatus;
                    retry.debug = dbgNonTimeout;
                } else if (retry && retry.debug) {
                    retry.debug.bootstrap = bootstrap;
                    retry.debug.pyStatus = pyStatus;
                }
                return retry;
            }
        }

        var dbg = lastDebug || { bridgeDir: String(bridgeDir || '') };
        dbg.bootstrap = bootstrap;
        dbg.pyStatus = pyStatus;
        return {
            ok: false,
            error: 'PyShiftBridge timeout (bootstrap tenté via ' + bootstrap.method + '; detail: ' + bootstrap.detail + ')',
            debug: dbg
        };
    }

    function gridclonerApplyFallbackJsx(args) {
        // Fallback mode when PyShiftBridge daemon cannot run (PyShiftAE missing).
        // This keeps GridCloner usable, but may be slower and less robust than the Python path.
        args = args || {};

        function toInt(v, d) {
            try { return parseInt(v, 10); } catch (e) { return d; }
        }

        function toFloat(v, d) {
            try {
                var f = parseFloat(v);
                return isFinite(f) ? f : d;
            } catch (e) {
                return d;
            }
        }

        function toBool(v) {
            return !!v;
        }

        var rows = toInt(args.rows, 1);
        var columns = toInt(args.columns, 1);
        var depth = toInt(args.depth, 1);
        if (rows < 1) rows = 1;
        if (columns < 1) columns = 1;
        if (depth < 1) depth = 1;

        var spacing = args.spacing && typeof args.spacing === 'object' ? args.spacing : {};
        var sx = toFloat(spacing.x, 0.0);
        var sy = toFloat(spacing.y, 0.0);
        var sz = toFloat(spacing.z, 0.0);

        var enable3D = toBool(args.enable3D);
        var linkOpacity = toBool(args.linkOpacityToNull);
        var linkScale = toBool(args.linkScaleToNull);

        var maxClones = toInt(args.max_clones, 200);
        if (maxClones < 1) maxClones = 200;
        if (maxClones > 200) maxClones = 200;

        var notes = ['jsx_fallback'];
        if (linkOpacity || linkScale) {
            notes.push('expressions_not_supported');
        }

        var comp = app.project ? app.project.activeItem : null;
        if (!comp || !(comp instanceof CompItem)) {
            throw new Error('No active comp. Select a comp and retry.');
        }

        var baseLayer = null;
        try {
            if (comp.selectedLayers && comp.selectedLayers.length > 0) {
                baseLayer = comp.selectedLayers[0];
            }
        } catch (eSel) {}
        if (!baseLayer) {
            try {
                baseLayer = comp.layer(1);
            } catch (eL) {}
        }
        if (!baseLayer) {
            throw new Error('No base layer found. Select a layer and retry.');
        }

        app.beginUndoGroup('GridCloner Apply (JSX Fallback)');
        var created = 0;
        try {
            var basePos = null;
            try {
                var posProp = baseLayer.property('Position');
                basePos = posProp ? posProp.value : null;
            } catch (ePos) {
                basePos = null;
            }
            if (!basePos || basePos.length < 2) {
                basePos = [0.0, 0.0, 0.0];
            }

            var wants3D = enable3D || depth > 1 || Math.abs(sz) > 0.0;
            if (wants3D) {
                try { baseLayer.threeDLayer = true; } catch (e3d0) { notes.push('cannot_force_3d_base'); }
            }

            var totalTarget = rows * columns * depth;
            if (totalTarget > maxClones) {
                notes.push('max_clones_reached');
            }

            for (var dz = 0; dz < depth; dz += 1) {
                for (var r = 0; r < rows; r += 1) {
                    for (var c = 0; c < columns; c += 1) {
                        if (created >= maxClones) {
                            dz = depth; // break outer loops
                            r = rows;
                            break;
                        }

                        var dup = baseLayer.duplicate();
                        if (wants3D) {
                            try { dup.threeDLayer = true; } catch (e3d1) { /* ignore */ }
                        }

                        var x = Number(basePos[0]) + (c * sx);
                        var y = Number(basePos[1]) + (r * sy);
                        var outPos;

                        if (wants3D) {
                            var z0 = (basePos.length > 2) ? Number(basePos[2]) : 0.0;
                            var z = z0 + (dz * sz);
                            outPos = [x, y, z];
                        } else {
                            outPos = [x, y];
                        }

                        try {
                            dup.property('Position').setValue(outPos);
                        } catch (eSet) {
                            // ignore
                        }
                        created += 1;
                    }
                }
            }
        } finally {
            app.endUndoGroup();
        }

        return {
            status: 'ok',
            created_count: created,
            notes: notes,
            transport: 'jsx_fallback'
        };
    }

    $.global.gridclonerApply = function (argsJson, timeoutMs) {
        try {
            var args = safeJsonParse(argsJson);
            if (!args || typeof args !== 'object') args = {};
            var res = sendToPyShiftBridge('gridcloner_apply', args, timeoutMs || 20000);
            if (res && res.ok) {
                return safeJsonStringify({ ok: true, result: res.result });
            }

            // Degraded mode (like MediaSolution): if PyShiftAE is unavailable and daemon can't run,
            // fall back to a pure-ExtendScript implementation.
            try {
                var err = String((res && res.error) ? res.error : 'bridge_error');
                var canFallback = (err.indexOf('PyShiftAE Python bridge unavailable') === 0) || (err.indexOf('PyShiftBridge timeout') === 0);
                if (canFallback && res && res.debug && res.debug.pyStatus && res.debug.pyStatus.pyAnyExecuteAvailable === false) {
                    var fb = gridclonerApplyFallbackJsx(args);
                    fb.bridge_error = err;
                    return safeJsonStringify({ ok: true, result: fb });
                }
            } catch (eFb0) {}

            var out = { ok: false, error: (res && res.error) ? res.error : 'bridge_error' };
            if (res && res.debug) out.debug = res.debug;
            return safeJsonStringify(out);
        } catch (e) {
            return safeJsonStringify({ ok: false, error: String(e) });
        }
    };

    $.global.gridclonerApplyEncoded = function (encodedArgsJson, timeoutMs) {
        try {
            var decoded = safeDecodeURIComponent(encodedArgsJson);
            if (!decoded) {
                return safeJsonStringify({ ok: false, error: 'invalid_encoded_args' });
            }

            var args = safeJsonParse(decoded);
            if (!args || typeof args !== 'object') {
                return safeJsonStringify({ ok: false, error: 'invalid_args_json' });
            }

            var res = sendToPyShiftBridge('gridcloner_apply', args, timeoutMs || 20000);
            if (res && res.ok) {
                return safeJsonStringify({ ok: true, result: res.result });
            }

            // Degraded mode: allow GridCloner to operate without PyShiftAE/daemon.
            try {
                var err = String((res && res.error) ? res.error : 'bridge_error');
                var canFallback = (err.indexOf('PyShiftAE Python bridge unavailable') === 0) || (err.indexOf('PyShiftBridge timeout') === 0);
                if (canFallback && res && res.debug && res.debug.pyStatus && res.debug.pyStatus.pyAnyExecuteAvailable === false) {
                    var fb = gridclonerApplyFallbackJsx(args);
                    fb.bridge_error = err;
                    return safeJsonStringify({ ok: true, result: fb });
                }
            } catch (eFb1) {}

            var out = { ok: false, error: (res && res.error) ? res.error : 'bridge_error' };
            if (res && res.debug) out.debug = res.debug;
            return safeJsonStringify(out);
        } catch (e) {
            return safeJsonStringify({ ok: false, error: String(e) });
        }
    };

    $.global.gridclonerCheckBridgeHealth = function (timeoutMs) {
        // Lightweight health check (no bootstrap). Useful to mirror MediaSolution “daemon-dot”.
        try {
            var res = sendToPyShiftBridgeOnce('ping', {}, timeoutMs || 1500);
            if (res && res.ok) {
                return safeJsonStringify({ ok: true, result: res.result });
            }
            var out = { ok: false, error: (res && res.error) ? res.error : 'ping_failed' };
            if (res && res.debug) out.debug = res.debug;
            try {
                if (!out.debug) out.debug = {};
                out.debug.pyStatus = getPyRuntimeStatus();
            } catch (e2) {}
            return safeJsonStringify(out);
        } catch (e) {
            return safeJsonStringify({ ok: false, error: String(e) });
        }
    };
})();
