/**
 * Media Solution v12.0 CEP - Host-side ExtendScript
 * Adapted from Media-Solution-v11.2-production.jsx
 * Provides modular functions for CEP panel communication
 */

(function () {
   "use strict";

   // 1. LE FIX TRIM (DEJA AJOUTÉ)
   if (typeof String.prototype.trim !== 'function') {
      String.prototype.trim = function () {
         return this.replace(/^\s+|\s+$/g, '');
      };
   }

   // 1.1 OBJECT.KEYS POLYFILL
   if (!Object.keys) {
      Object.keys = (function () {
         'use strict';
         var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
            dontEnums = [
               'toString',
               'toLocaleString',
               'valueOf',
               'hasOwnProperty',
               'isPrototypeOf',
               'propertyIsEnumerable',
               'constructor'
            ],
            dontEnumsLength = dontEnums.length;

         return function (obj) {
            if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
               throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

            for (prop in obj) {
               if (hasOwnProperty.call(obj, prop)) {
                  result.push(prop);
               }
            }

            if (hasDontEnumBug) {
               for (i = 0; i < dontEnumsLength; i++) {
                  if (hasOwnProperty.call(obj, dontEnums[i])) {
                     result.push(dontEnums[i]);
                  }
               }
            }
            return result;
         };
      }());
   }

   // 2. LE FIX JSON (A AJOUTER IMPÉRATIVEMENT ICI)
   if (typeof JSON !== 'object') {
      JSON = {};
   }
   (function () {
      'use strict';
      var rx_one = /^[\],:{}\s]*$/,
         rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
         rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
         rx_four = /(?:^|:|,)(?:\s*\[)+/g,
         escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
         meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' };

      function quote(string) {
         escapable.lastIndex = 0;
         return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
         }) + '"' : '"' + string + '"';
      }

      if (typeof JSON.stringify !== 'function') {
         JSON.stringify = function (value) {
            var i, k, v, partial, gap = '', indent = '';
            return (function str(key, holder) {
               var mind = gap, value = holder[key];
               if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
                  value = value.toJSON(key);
               }
               switch (typeof value) {
                  case 'string': return quote(value);
                  case 'number': return isFinite(value) ? String(value) : 'null';
                  case 'boolean':
                  case 'null': return String(value);
                  case 'object':
                     if (!value) return 'null';
                     gap += indent;
                     partial = [];
                     if (Object.prototype.toString.apply(value) === '[object Array]') {
                        for (i = 0; i < value.length; i += 1) {
                           partial[i] = str(i, value) || 'null';
                        }
                        v = partial.length === 0 ? '[]' : '[' + gap + partial.join(',') + gap + ']';
                        gap = mind;
                        return v;
                     }
                     for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                           v = str(k, value);
                           if (v) { partial.push(quote(k) + ':' + v); }
                        }
                     }
                     v = partial.length === 0 ? '{}' : '{' + gap + partial.join(',') + gap + '}';
                     gap = mind;
                     return v;
               }
            })('', { '': value });
         };
      }

      if (typeof JSON.parse !== 'function') {
         JSON.parse = function (text) {
            var j = String(text);
            if (j && rx_one.test(j.replace(rx_two, '@').replace(rx_three, ']').replace(rx_four, ''))) {
               return eval('(' + j + ')');
            }
            throw new SyntaxError('JSON.parse');
         };
      }
   }());
   // --- FIN DU FIX JSON ---

   // Global Configuration and State
   var SCRIPT_VERSION = "12.0";
   var SCRIPT_BUILD_ID = "12.0.0-cep-20260204-01";
   var G = {
      CONFIG: {
         docsSubFolderName: "docs",
         projectsSubFolderName: "projets",
         compNameSuffix: "_9x16",
         projectFileSuffix: ".aep",
         logFileNamePrefix: "MediaSolutionLog_V12.0_CEP_",
         videoExtensions: ["mp4", "mov", "avi", "mxf", "mpg", "mpeg", "wmv"],
         imageExtensions: ["jpg", "jpeg", "png", "gif", "tif", "tiff", "psd", "bmp"],
         targetCompWidth: 1080,
         targetCompHeight: 1920,
         defaultVideoScaleX: 180,
         defaultVideoScaleY: 180,
         batchDelayMs: 75,
         purgeEveryNProjects: 1,
         maxErrorDetailsInSummary: 15,
         // Intelligent Recentering Config
         SPREAD_THRESHOLD: 200,
         ENABLE_CONFIDENCE_WEIGHTING: true,
         CONFIDENCE_WEIGHT: 0.35,
         LABEL_HIGH_SPREAD: 12, // Red/Purple
         LABEL_STABLE: 3,       // Green
         enablePythonCutsParser: true,
         enableAutoRecentering: true,
         enablePythonAnalyzer: true,
         enablePythonRecentering: false,
         enablePythonProjectOpen: false,
         enablePythonBaseAepCreation: false,
         JSON_CHUNK_SIZE_CHARS: (256 * 1024),
         MAX_FULL_JSON_READ_BYTES: (50 * 1024 * 1024)
      },
      STATE: {
         selectedFolder: null,
         baseFolderForCsv: null,
         currentlyOpenProjectFile: null,
         projectsToProcess: [],
         nextProjectIndex: 0,
         totalProcessedCount: 0,
         batchRunning: false,
         cancelRequested: false,
         batchErrors: []
      },
      LOG: {
         currentLogFile: null,
         logFileOpenedForSession: false,
         lastSelectedFolderPath: null,
         buffer: [],
         maxBufferSize: 20
      }
   };

   // Utility Functions
   function getTimestamp() {
      var now = new Date();

      function pad(num) {
         return (num < 10 ? '0' : '') + num;
      }
      return now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate()) + "_" + pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());
   }

   function logMessage(message, level) {
      level = level || 'info';
      var timestamp = getTimestamp();
      var logEntry = timestamp + " | " + message;

      // Send to CEP panel
      sendToCEP({
         type: 'log',
         message: message,
         level: level,
         timestamp: timestamp
      });

      // Also log to ExtendScript console
      $.writeln("[" + level.toUpperCase() + "] " + logEntry);

      // Buffer for file logging
      if (G.LOG.logFileOpenedForSession && G.LOG.currentLogFile) {
         G.LOG.buffer.push(logEntry);
         if (G.LOG.buffer.length >= G.LOG.maxBufferSize) {
            flushLogBuffer();
         }
      }
   }

   function flushLogBuffer() {
      if (!G.LOG.logFileOpenedForSession || !G.LOG.currentLogFile || G.LOG.buffer.length === 0) return;
      try {
         if (!G.LOG.currentLogFile.open("a")) return;
         G.LOG.currentLogFile.encoding = "UTF-8";
         for (var i = 0; i < G.LOG.buffer.length; i++) {
            G.LOG.currentLogFile.writeln(G.LOG.buffer[i]);
         }
         G.LOG.currentLogFile.close();
         G.LOG.buffer = [];
      } catch (e) {
         logMessage("LOG FLUSH ERROR: " + e.toString(), 'error');
         try {
            if (G.LOG.currentLogFile && G.LOG.currentLogFile.isOpen) G.LOG.currentLogFile.close();
         } catch (ec) { }
      }
   }

   function getFilesByExtensions(folder, extensions) {
      if (!folder || !(folder instanceof Folder) || !folder.exists) return [];
      if (!extensions || !(extensions instanceof Array) || extensions.length === 0) return [];

      var allFiles = folder.getFiles();
      var matchedFiles = [];

      function hasExtension(extList, ext) {
         if (!extList) return false;
         for (var k = 0; k < extList.length; k++) {
            if (extList[k] === ext) return true;
         }
         return false;
      }

      for (var i = 0; i < allFiles.length; i++) {
         var file = allFiles[i];
         if (file instanceof File) {
            var ext = file.name.toLowerCase().split('.').pop();
            if (hasExtension(extensions, ext)) {
               matchedFiles.push(file);
            }
         }
      }

      return matchedFiles;
   }

   function safeJsonParse(text) {
      if (typeof text !== "string") return null;
      var trimmed = text.replace(/^\uFEFF/, "").trim();
      if (!trimmed) return null;
      try {
         if (typeof JSON !== "undefined" && JSON.parse) return JSON.parse(trimmed);
      } catch (e) { }
      if (trimmed.charAt(0) !== "{" && trimmed.charAt(0) !== "[") return null;
      try {
         return eval("(" + trimmed + ")");
      } catch (e) {
         logMessage("JSON parse failed: " + e.toString(), 'error');
         return null;
      }
   }

   function escapeSystemArg(arg) {
      if (arg === null || arg === undefined) return "\"\"";
      var s = arg.toString();
      s = s.replace(/\"/g, "\\\"");
      return "\"" + s + "\"";
   }

   function updateRuntimeConfig(configJson) {
      if (!configJson) return false;
      var parsedConfig = safeJsonParse(configJson);
      if (!parsedConfig) return false;
      G.CONFIG.pythonCmd = parsedConfig.pythonCmd || G.CONFIG.pythonCmd;
      G.CONFIG.enablePythonCutsParser = parsedConfig.enablePythonCutsParser !== false;
      G.CONFIG.enableAutoRecentering = parsedConfig.enableAutoRecentering !== false;
      G.CONFIG.enablePythonAnalyzer = parsedConfig.enablePythonAnalyzer !== false;
      G.CONFIG.enablePythonRecentering = parsedConfig.enablePythonRecentering === true;
      G.CONFIG.enablePythonProjectOpen = parsedConfig.enablePythonProjectOpen === true;
      G.CONFIG.enablePythonBaseAepCreation = parsedConfig.enablePythonBaseAepCreation === true;
      return true;
   }

   function getPyShiftBridgeDir() {
      var dir = Folder.myDocuments.fsName + "/PyShiftAE_CEP_Bridge";
      var folder = new Folder(dir);
      if (!folder.exists) {
         folder.create();
      }
      return folder.fsName;
   }

   function joinPath(dir, name) {
      if (!dir) return name;
      var last = dir.charAt(dir.length - 1);
      if (last === "/" || last === "\\") return dir + name;
      return dir + "/" + name;
   }

   function writeTextAtomic(fileObj, text) {
      var tmp = new File(fileObj.path + "/" + fileObj.name + ".tmp");
      tmp.encoding = "UTF-8";
      if (!tmp.open("w")) {
         throw new Error("Cannot open temp file for writing: " + tmp.fsName);
      }
      tmp.write(text);
      tmp.close();

      if (fileObj.exists) {
         fileObj.remove();
      }

      var ok = tmp.rename(fileObj.name);
      if (!ok) {
         throw new Error("Rename failed: " + tmp.fsName + " -> " + fileObj.fsName);
      }
   }

   function ensurePyShiftBridgeMailbox() {
      var dir = getPyShiftBridgeDir();
      var req = new File(joinPath(dir, "cep_to_py.json"));
      var resp = new File(joinPath(dir, "py_to_cep.json"));
      if (!req.exists) {
         writeTextAtomic(req, "");
      }
      if (!resp.exists) {
         writeTextAtomic(resp, "");
      }
      return dir;
   }

   function readText(fileObj) {
      if (!fileObj || !fileObj.exists) return "";
      fileObj.encoding = "UTF-8";
      if (!fileObj.open("r")) return "";
      var content = fileObj.read();
      fileObj.close();
      return content || "";
   }

   function newBridgeId() {
      return String(new Date().getTime()) + "-" + String(Math.floor(Math.random() * 100000));
   }

   function sendToPyShiftBridge(entrypoint, args, timeoutMs) {
      timeoutMs = timeoutMs || 15000;
      var dir = ensurePyShiftBridgeMailbox();
      var req = new File(joinPath(dir, "cep_to_py.json"));
      var resp = new File(joinPath(dir, "py_to_cep.json"));

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
         return { ok: false, error: parsed.error || "Unknown bridge error" };
      }
      return { ok: false, error: "PyShiftBridge timeout" };
   }

   function checkPyShiftBridgeHealth(timeoutMs) {
      timeoutMs = timeoutMs || 1500;
      try {
         var res = sendToPyShiftBridge("ping", {}, timeoutMs);
         if (res && res.ok && res.result && res.result.status === "ok") {
            return JSON.stringify({ ok: true, result: res.result });
         }
         return JSON.stringify({ ok: false, error: (res && res.error) ? res.error : "ping_failed" });
      } catch (e) {
         return JSON.stringify({ ok: false, error: e.toString() });
      }
   }

   // CEP Interface Functions
   function sendToCEP(data) {
      try {
         // 1. Charger la librairie externe (Indispensable pour que CSXSEvent fonctionne correctement)
         var xLib = new ExternalObject("lib:\PlugPlugExternalObject");

         if (xLib) {
            var eventObj = new CSXSEvent();

            // 2. Définir le type d'événement (doit correspondre à celui écouté dans main.js)
            eventObj.type = "com.workflowmediapipe.mediasolution.hostMessage";

            // 3. Conversion sécurisée en JSON
            // Si JSON n'est pas dispo (vieux AE), on évite le [object Object]
            var payload = "";
            if (typeof JSON !== 'undefined') {
               payload = JSON.stringify(data);
            } else {
               // Fallback manuel si JSON manque (pour éviter le crash 'token o')
               // Note : Sur les AE récents (>CC2019), JSON est natif.
               payload = '{"type":"error", "message":"JSON object missing in ExtendScript"}';
            }

            eventObj.data = payload;
            eventObj.dispatch();
         }
      } catch (e) {
         $.writeln("Erreur sendToCEP: " + e.toString());
      }
   }

   // Main CEP Functions
   function selectFolder() {
      try {
         logMessage("selectFolder() appelée", 'info');
         var folder = Folder.selectDialog("Sélectionner le dossier du projet");
         logMessage("Folder.selectDialog résultat: " + (folder ? "sélectionné" : "annulé"), 'info');

         if (folder && folder.exists) {
            G.STATE.selectedFolder = folder;
            G.STATE.baseFolderForCsv = folder;

            var docsFolder = new Folder(folder.fsName + "/" + G.CONFIG.docsSubFolderName);
            var info = "";
            if (docsFolder.exists) {
               var videoFiles = getFilesByExtensions(docsFolder, G.CONFIG.videoExtensions);
               info = videoFiles.length + " vidéo(s) trouvée(s) dans 'docs'";
            } else {
               info = "Dossier 'docs' non trouvé";
            }

            var result = {
               type: 'folderSelected',
               success: true,
               path: folder.fsName,
               info: info
            };

            logMessage("Envoi résultat vers CEP: " + JSON.stringify(result), 'info');
            sendToCEP(result);
            logMessage("Dossier sélectionné: " + folder.fsName, 'success');
            return JSON.stringify(result);
         } else {
            var result = {
               type: 'folderSelected',
               success: false,
               error: "Aucun dossier sélectionné"
            };
            logMessage("Envoi erreur vers CEP: " + JSON.stringify(result), 'info');
            sendToCEP(result);
            return JSON.stringify(result);
         }
      } catch (e) {
         logMessage("Erreur sélection dossier: " + e.toString(), 'error');
         var result = {
            type: 'folderSelected',
            success: false,
            error: e.toString()
         };
         sendToCEP(result);
         return JSON.stringify(result);
      }
   }

   function selectCsv() {
      try {
         logMessage("selectCsv() appelée", 'info');
         var csvFile = File.openDialog("Sélectionner un fichier CSV");
         logMessage("File.openDialog résultat: " + (csvFile ? "sélectionné" : "annulé"), 'info');

         if (csvFile && csvFile.exists) {
            var result = {
               type: 'csvSelected',
               success: true,
               path: csvFile.fsName
            };
            logMessage("Envoi résultat CSV vers CEP: " + JSON.stringify(result), 'info');
            sendToCEP(result);
            logMessage("CSV sélectionné: " + csvFile.fsName, 'success');
            return JSON.stringify(result);
         } else {
            var result = {
               type: 'csvSelected',
               success: false,
               error: "Aucun fichier CSV sélectionné"
            };
            logMessage("Envoi erreur CSV vers CEP: " + JSON.stringify(result), 'info');
            sendToCEP(result);
            return JSON.stringify(result);
         }
      } catch (e) {
         logMessage("Erreur sélection CSV: " + e.toString(), 'error');
         var result = {
            type: 'csvSelected',
            success: false,
            error: e.toString()
         };
         sendToCEP(result);
         return JSON.stringify(result);
      }
   }

   function runDiagnostics(folderPath) {
      try {
         var folder = new Folder(folderPath);
         if (!folder || !(folder instanceof Folder) || !folder.exists) {
            return JSON.stringify({
               ok: false,
               errors: ["Dossier projet invalide"]
            });
         }

         var report = {
            ok: true,
            warnings: [],
            errors: []
         };

         var docsFolder = new Folder(folder.fsName + "/" + G.CONFIG.docsSubFolderName);
         if (!docsFolder.exists) {
            report.ok = false;
            report.errors.push("Dossier 'docs' introuvable");
         }

         var projectsFolder = new Folder(folder.fsName + "/" + G.CONFIG.projectsSubFolderName);
         if (!projectsFolder.exists) {
            report.warnings.push("Dossier 'projets' introuvable (sera créé si nécessaire)");
         }

         if (docsFolder.exists) {
            var videoFiles = getFilesByExtensions(docsFolder, G.CONFIG.videoExtensions);
            if (videoFiles.length === 0) {
               report.warnings.push("Aucun fichier vidéo trouvé dans 'docs'");
            } else {
               logMessage("Diagnostics: " + videoFiles.length + " vidéo(s) trouvée(s)", 'info');
            }
         }

         return JSON.stringify(report);
      } catch (e) {
         logMessage("Erreur diagnostics: " + e.toString(), 'error');
         return JSON.stringify({
            ok: false,
            errors: [e.toString()]
         });
      }
   }

   function startBatch(folderPath, config) {
      try {
         if (G.STATE.batchRunning) {
            return JSON.stringify({
               success: false,
               error: "Batch déjà en cours"
            });
         }

         // Apply config
         if (config) {
            var parsedConfig = safeJsonParse(config);
            if (parsedConfig) {
               G.CONFIG.pythonCmd = parsedConfig.pythonCmd || G.CONFIG.pythonCmd;
               G.CONFIG.enablePythonCutsParser = parsedConfig.enablePythonCutsParser !== false;
               G.CONFIG.enableAutoRecentering = parsedConfig.enableAutoRecentering !== false;
               G.CONFIG.enablePythonAnalyzer = parsedConfig.enablePythonAnalyzer !== false;
               G.CONFIG.enablePythonRecentering = parsedConfig.enablePythonRecentering === true;
               G.CONFIG.enablePythonProjectOpen = parsedConfig.enablePythonProjectOpen === true;
               G.CONFIG.enablePythonBaseAepCreation = parsedConfig.enablePythonBaseAepCreation === true;
            }
         }

         var folder = new Folder(folderPath);
         if (!folder || !(folder instanceof Folder) || !folder.exists) {
            return JSON.stringify({
               success: false,
               error: "Dossier invalide"
            });
         }

         G.STATE.selectedFolder = folder;
         G.STATE.baseFolderForCsv = folder;
         G.STATE.batchRunning = true;
         G.STATE.cancelRequested = false;
         G.STATE.batchErrors = [];

         logMessage("Démarrage batch processing", 'info');

         // Start batch processing asynchronously
         // setTimeout n'existe pas en ExtendScript, on utilise le planificateur d'AE
         // Le premier argument est une chaîne de caractères contenant le nom de la fonction globale
         app.scheduleTask("processBatch_Global();", 100, false);

         return JSON.stringify({
            success: true,
            message: "Batch démarré"
         });
      } catch (e) {
         logMessage("Erreur démarrage batch: " + e.toString(), 'error');
         return JSON.stringify({
            success: false,
            error: e.toString()
         });
      }
   }

   function cancelBatch() {
      try {
         G.STATE.cancelRequested = true;
         G.STATE.batchRunning = false;
         logMessage("Batch annulé", 'warning');
         return JSON.stringify({
            success: true,
            message: "Batch annulé"
         });
      } catch (e) {
         logMessage("Erreur annulation batch: " + e.toString(), 'error');
         return JSON.stringify({
            success: false,
            error: e.toString()
         });
      }
   }

   function processBatch() {
      try {
         if (G.STATE.cancelRequested) {
            sendToCEP({
               type: 'batchCompleted',
               results: 'annulé'
            });
            return;
         }

         // Step 2.1: Prepare CSVs (delegated to STEP1)
         performStep2_1_Logic();

         // Step 2.2: Create base AEPs
         performStep2_2_Logic();

         if (G.STATE.cancelRequested) {
            sendToCEP({
               type: 'batchCompleted',
               results: 'annulé'
            });
            return;
         }

         // Process each project
         for (var i = 0; i < G.STATE.projectsToProcess.length; i++) {
            if (G.STATE.cancelRequested) break;

            var projectFile = G.STATE.projectsToProcess[i];
            var progress = {
               type: 'progress',
               current: i + 1,
               total: G.STATE.projectsToProcess.length,
               message: 'Traitement de ' + projectFile.name
            };
            sendToCEP(progress);

            // Step 3.1: Open project
            var step3_1_result = performStep3_1_Logic(projectFile);
            if (!step3_1_result.success) {
               G.STATE.batchErrors.push(step3_1_result.error);
               continue;
            }

            // Step 3.2: Process project
            var step3_2_result = performStep3_2_Logic(step3_1_result.activeCompName, step3_1_result.videoLayerIndex);
            if (!step3_2_result.success) {
               G.STATE.batchErrors.push(step3_2_result.error);
               continue;
            }

            G.STATE.totalProcessedCount++;

            // Purge memory periodically
            if ((i + 1) % G.CONFIG.purgeEveryNProjects === 0) {
               try {
                  app.purge(PurgeTarget.ALL_CACHES);
               } catch (e) {
                  logMessage("Memory purge failed: " + e.toString(), 'warning');
               }
            }
         }

         var results = G.STATE.totalProcessedCount + " projets traités";
         if (G.STATE.batchErrors.length > 0) {
            results += ", " + G.STATE.batchErrors.length + " erreurs";
         }

         sendToCEP({
            type: 'batchCompleted',
            results: results
         });

         G.STATE.batchRunning = false;
         logMessage("Batch terminé: " + results, 'success');

      } catch (e) {
         logMessage("Erreur batch processing: " + e.toString(), 'error');
         sendToCEP({
            type: 'error',
            message: e.toString()
         });
         G.STATE.batchRunning = false;
      }
   }

   function applyCuts(csvPath, configJson) {
      try {
         if (configJson) {
            updateRuntimeConfig(configJson);
         }

         var csvFile = new File(csvPath);
         if (!csvFile || !(csvFile instanceof File) || !csvFile.exists) {
            return JSON.stringify({
               success: false,
               error: "Fichier CSV invalide"
            });
         }

         var activeComp = app.project.activeItem;
         if (!activeComp || !(activeComp instanceof CompItem)) {
            return JSON.stringify({
               success: false,
               error: "Aucune composition active"
            });
         }

         var targetLayer = activeComp.selectedLayers.length > 0 ? activeComp.selectedLayers[0] : activeComp.layer(1);
         if (!targetLayer) {
            return JSON.stringify({
               success: false,
               error: "Aucun calque trouvé"
            });
         }

         if (G.CONFIG.enablePythonCutsParser) {
            try {
               // Ensure layer is active/selected for PyShiftAE.
               try {
                  for (var i = 0; i < activeComp.selectedLayers.length; i++) {
                     activeComp.selectedLayers[i].selected = false;
                  }
               } catch (e) { }
               targetLayer.selected = true;

               var docsFolder = new Folder(G.STATE.baseFolderForCsv ? (G.STATE.baseFolderForCsv.fsName + "/" + G.CONFIG.docsSubFolderName) : "");
               var videoName = "";
               try { videoName = decodeURI(targetLayer.source.name); } catch (e) { videoName = targetLayer.source.name; }
               var trackingJson = (docsFolder && docsFolder.exists) ? findTrackingJsonForVideo(docsFolder, videoName) : null;

               var bridgeRes = sendToPyShiftBridge(
                  "mediasolution_apply_cuts_active_layer",
                  {
                     csv_path: csvFile.fsName,
                     frame_rate: activeComp.frameRate,
                     comp_duration: activeComp.duration,
                     snap_factor: 1.5,
                     tracking_json_path: trackingJson ? trackingJson.fsName : null,
                     config: {
                        SPREAD_THRESHOLD: G.CONFIG.SPREAD_THRESHOLD,
                        ENABLE_CONFIDENCE_WEIGHTING: G.CONFIG.ENABLE_CONFIDENCE_WEIGHTING,
                        CONFIDENCE_WEIGHT: G.CONFIG.CONFIDENCE_WEIGHT,
                        LABEL_HIGH_SPREAD: G.CONFIG.LABEL_HIGH_SPREAD,
                        LABEL_STABLE: G.CONFIG.LABEL_STABLE
                     }
                  },
                  20000
               );

               if (bridgeRes.ok && bridgeRes.result && bridgeRes.result.created !== undefined) {
                  return JSON.stringify({
                     success: true,
                     count: bridgeRes.result.created,
                     mode: "pyshift"
                  });
               }

               logMessage("PyShiftAE cuts bridge failed, fallback ExtendScript: " + (bridgeRes.error || "unknown"), 'warning');
            } catch (e) {
               logMessage("PyShiftAE bridge exception, fallback ExtendScript: " + e.toString(), 'warning');
            }
         }

         var count = applyCutsToSelectedLayer(targetLayer, csvFile);
         return JSON.stringify({
            success: true,
            count: count
         });
      } catch (e) {
         logMessage("Erreur application cuts: " + e.toString(), 'error');
         return JSON.stringify({
            success: false,
            error: e.toString()
         });
      }
   }

   function saveConfigFile(configJson) {
      try {
         var configFile = File.saveDialog("Sauvegarder la configuration", "*.json");
         if (configFile) {
            if (configFile.open("w")) {
               configFile.encoding = "UTF-8";
               configFile.write(configJson);
               configFile.close();
               return configFile.fsName;
            }
         }
         return null;
      } catch (e) {
         logMessage("Erreur sauvegarde config: " + e.toString(), 'error');
         return null;
      }
   }

   function loadConfigFile() {
      try {
         var configFile = File.openDialog("Charger une configuration", "*.json");
         if (configFile && configFile.exists) {
            if (configFile.open("r")) {
               configFile.encoding = "UTF-8";
               var content = configFile.read();
               configFile.close();
               return content;
            }
         }
         return null;
      } catch (e) {
         logMessage("Erreur chargement config: " + e.toString(), 'error');
         return null;
      }
   }

   function saveLogFile(logText) {
      try {
         var logFile = File.saveDialog("Exporter les logs", "*.txt");
         if (logFile) {
            if (logFile.open("w")) {
               logFile.encoding = "UTF-8";
               logFile.write(logText);
               logFile.close();
               return logFile.fsName;
            }
         }
         return null;
      } catch (e) {
         logMessage("Erreur export logs: " + e.toString(), 'error');
         return null;
      }
   }

   // Core Logic Functions (adapted from original script)
   function performStep2_1_Logic() {
      logMessage("Logic Step 2.1: Préparation CSVs (délégué à STEP1)");
      var docsFolder = new Folder(G.STATE.selectedFolder.fsName + "/" + G.CONFIG.docsSubFolderName);
      if (!docsFolder.exists) throw new Error("Dossier 'docs' du projet non trouvé.");

      var videoFiles = getFilesByExtensions(docsFolder, G.CONFIG.videoExtensions);
      if (videoFiles.length === 0) {
         logMessage("Step2.1: Aucun fichier vidéo trouvé dans 'docs'", 'warning');
         return true;
      }

      logMessage("Step2.1: Extraction ZIP ignorée (gérée en amont par STEP1). " + videoFiles.length + " vidéo(s) prête(s)", 'info');
      return true;
   }

   function performStep2_2_Logic() {
      logMessage("Logic Step 2.2: Création des AEPs de base");
      G.STATE.projectsToProcess = [];
      var docsFolder = new Folder(G.STATE.selectedFolder.fsName + "/" + G.CONFIG.docsSubFolderName);
      if (!docsFolder.exists) throw new Error("Dossier 'docs' du projet non trouvé.");

      var videoFiles = getFilesByExtensions(docsFolder, G.CONFIG.videoExtensions);

      if (videoFiles.length === 0) {
         logMessage("Step2.2: Aucun fichier vidéo à traiter", 'warning');
         return true;
      }

      for (var j = 0; j < videoFiles.length; j++) {
         var aepFile = createBaseProjectForVideo(videoFiles[j], G.STATE.selectedFolder);
         if (aepFile) G.STATE.projectsToProcess.push(aepFile);
      }
      logMessage("Step2.2: " + G.STATE.projectsToProcess.length + " AEPs créés", 'info');
      return true;
   }

   function createBaseProjectForVideo(videoFile, targetFolder) {
      var rawName = "";
      try {
         rawName = decodeURI(videoFile.name);
      } catch (e) {
         rawName = videoFile.name;
      }
      logMessage("Création projet de base pour: " + rawName);

      var dot = rawName.lastIndexOf('.');
      var videoBaseName = (dot > 0) ? rawName.substring(0, dot) : rawName;
      var compName = videoBaseName + G.CONFIG.compNameSuffix;

      var projectsFolder = new Folder(targetFolder.fsName + "/" + G.CONFIG.projectsSubFolderName);
      if (!projectsFolder.exists) {
         projectsFolder.create();
      }
      var aepFile = new File(projectsFolder.fsName + "/" + videoBaseName + G.CONFIG.compNameSuffix + G.CONFIG.projectFileSuffix);
      if (aepFile.exists) {
         aepFile = new File(projectsFolder.fsName + "/" + videoBaseName + G.CONFIG.compNameSuffix + "_" + getTimestamp() + G.CONFIG.projectFileSuffix);
         logMessage("WARN: Project file existed, saving with timestamp: " + aepFile.name, 'warning');
      }

      if (G.CONFIG.enablePythonBaseAepCreation) {
         try {
            var ping = sendToPyShiftBridge("ping", {}, 1500);
            if (!(ping && ping.ok && ping.result && ping.result.status === "ok")) {
               logMessage("PyShiftBridge ping failed, fallback ExtendScript", 'warning');
            } else {
            var res = sendToPyShiftBridge(
               "mediasolution_create_base_aep_for_video",
               {
                  video_path: videoFile.fsName,
                  aep_path: aepFile.fsName,
                  comp_name: compName,
                  config: {
                     DISABLE_UNDO_GROUP: true,
                     min_frame_rate: 25.0
                  }
               },
               60000
            );
            if (res && res.ok && res.result && res.result.status === "ok") {
               logMessage("Base AEP (PyShiftAE): " + aepFile.name, 'info');
               return aepFile;
            }
            logMessage(
               "Base AEP via PyShiftAE failed, fallback ExtendScript: " + ((res && res.error) ? res.error : "unknown"),
               'warning'
            );
            }
         } catch (e) {
            logMessage("Base AEP via PyShiftAE exception, fallback ExtendScript: " + e.toString(), 'warning');
         }
      }

      app.beginUndoGroup("Create Temp Project for " + videoFile.name);
      var createdItems = [];
      try {
         var footageItem = app.project.importFile(new ImportOptions(videoFile));
         createdItems.push(footageItem);
         var compSettings = {
            name: compName,
            width: footageItem.width,
            height: footageItem.height,
            pixelAspect: footageItem.pixelAspect,
            duration: Math.max(footageItem.duration, 1.0),
            frameRate: Math.max(footageItem.frameRate, 25.0)
         };
         var newComp = app.project.items.addComp(compSettings.name, compSettings.width, compSettings.height, compSettings.pixelAspect, compSettings.duration, compSettings.frameRate);
         createdItems.push(newComp);
         var videoLayer = newComp.layers.add(footageItem);

         if (videoLayer.canSetAudioEnabled) {
            videoLayer.audioEnabled = footageItem.hasAudio;
         }

         app.project.save(aepFile);
         return aepFile;
      } catch (e) {
         logMessage("createBaseProjectForVideo error: " + e.toString(), 'error');
         return null;
      } finally {
         for (var i = 0; i < createdItems.length; i++) {
            try {
               createdItems[i].remove();
            } catch (e) {
               logMessage("WARN (Cleanup): Could not remove created item: " + e.toString(), 'warning');
            }
         }
         app.endUndoGroup();
      }
   }

   function findMainVideoLayer(comp) {
      if (!comp || !(comp instanceof CompItem)) return null;
      var candidates = [];
      for (var i = 1; i <= comp.numLayers; i++) {
         try {
            var layer = comp.layer(i);
            if (layer instanceof AVLayer && layer.hasVideo && !layer.locked && layer.source instanceof FootageItem && !layer.source.mainSource.isStill) {
               var score = 10;
               if (layer.name.toLowerCase().indexOf("audio") > -1) score -= 5;
               candidates.push({
                  layer: layer,
                  score: score
               });
            }
         } catch (e) {
            logMessage("WARN (findMainVideoLayer): Could not evaluate layer " + i + ": " + e.toString(), 'warning');
         }
      }
      if (candidates.length === 0) return null;
      candidates.sort(function (a, b) {
         return b.score - a.score;
      });
      return candidates[0].layer;
   }

   function findCompByName(name) {
      for (var i = 1; i <= app.project.numItems; i++) {
         var item = app.project.item(i);
         if (item instanceof CompItem && item.name === name) {
            return item;
         }
      }
      return null;
   }

   function getPyShiftBridgeConfig() {
      return JSON.stringify({
         SPREAD_THRESHOLD: G.CONFIG.SPREAD_THRESHOLD,
         ENABLE_CONFIDENCE_WEIGHTING: G.CONFIG.ENABLE_CONFIDENCE_WEIGHTING,
         CONFIDENCE_WEIGHT: G.CONFIG.CONFIDENCE_WEIGHT,
         LABEL_HIGH_SPREAD: G.CONFIG.LABEL_HIGH_SPREAD,
         LABEL_STABLE: G.CONFIG.LABEL_STABLE
      });
   }

   function performStep3_1_Logic(projectFileToOpen) {
      logMessage("Logic Step 3.1: Ouverture " + decodeURI(projectFileToOpen.name));
      var result = {
         success: false,
         activeCompName: null,
         videoLayerIndex: -1,
         error: "Unknown error"
      };
      try {
         if (G.CONFIG.enablePythonProjectOpen) {
            try {
               var ping = sendToPyShiftBridge("ping", {}, 1500);
               if (ping && ping.ok && ping.result && ping.result.status === "ok") {
                  if (app.project.file) app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
                  var pyRes = sendToPyShiftBridge(
                     "mediasolution_open_project_and_select_comp",
                     {
                        aep_path: projectFileToOpen.fsName,
                        comp_name_suffix: G.CONFIG.compNameSuffix,
                        config: {
                           DISABLE_UNDO_GROUP: true
                        }
                     },
                     60000
                  );
                  if (pyRes && pyRes.ok && pyRes.result && pyRes.result.status === "ok") {
                     G.STATE.currentlyOpenProjectFile = projectFileToOpen;
                     var compName = pyRes.result.active_comp_name;
                     var layerIndex = pyRes.result.video_layer_index;
                     var mainCompPy = findCompByName(compName);
                     if (!mainCompPy) throw new Error("Composition '" + compName + "' not found after PyShiftAE open.");
                     mainCompPy.openInViewer();
                     var layerPy = mainCompPy.layer(layerIndex);
                     if (!layerPy) throw new Error("Target layer at index " + layerIndex + " is invalid.");
                     try {
                        for (var si = 0; si < mainCompPy.selectedLayers.length; si++) {
                           mainCompPy.selectedLayers[si].selected = false;
                        }
                     } catch (e) { }
                     layerPy.selected = true;
                     result.activeCompName = mainCompPy.name;
                     result.videoLayerIndex = layerPy.index;
                     result.success = true;
                     return result;
                  }
                  logMessage(
                     "Open project via PyShiftAE failed, fallback ExtendScript: " + ((pyRes && pyRes.error) ? pyRes.error : "unknown"),
                     'warning'
                  );
               } else {
                  logMessage("PyShiftBridge ping failed, fallback ExtendScript", 'warning');
               }
            } catch (e) {
               logMessage("Open project via PyShiftAE exception, fallback ExtendScript: " + e.toString(), 'warning');
            }
         }

         if (app.project.file) app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
         app.open(projectFileToOpen);
         G.STATE.currentlyOpenProjectFile = projectFileToOpen;

         if (app.project.numItems === 0) throw new Error("Project is empty after opening.");
         var mainComp = null;
         for (var i = 1; i <= app.project.numItems; i++) {
            var item = app.project.item(i);
            if (item instanceof CompItem) {
               if (!mainComp || item.name.indexOf(G.CONFIG.compNameSuffix) > -1) {
                  mainComp = item;
               }
            }
         }
         if (!mainComp) {
            for (var i = 1; i <= app.project.numItems; i++) {
               if (app.project.item(i) instanceof CompItem) {
                  mainComp = app.project.item(i);
                  break;
               }
            }
         }
         if (!mainComp) throw new Error("No composition found in the project.");
         mainComp.openInViewer();
         var videoLayer = findMainVideoLayer(mainComp);
         if (!videoLayer) throw new Error("Could not find a main video layer in comp '" + mainComp.name + "'.");
         result.activeCompName = mainComp.name;
         result.videoLayerIndex = videoLayer.index;
         result.success = true;
      } catch (e) {
         result.error = e.toString();
         logMessage("Step3.1 error: " + e.toString(), 'error');
      }
      return result;
   }

   function performStep3_2_Logic(expectedCompName, targetLayerIndex) {
      logMessage("Logic Step 3.2: Traitement '" + expectedCompName + "'");
      var result = {
         success: false,
         segmentsCreated: 0,
         error: null
      };
      var undoGroupStarted = false;
      try {
         var activeComp = findCompByName(expectedCompName);
         if (!activeComp) throw new Error("Composition '" + expectedCompName + "' not found.");
         var targetLayer = activeComp.layer(targetLayerIndex);
         if (!targetLayer) throw new Error("Target layer at index " + targetLayerIndex + " is invalid.");
         var docsFolder = new Folder(G.STATE.baseFolderForCsv.fsName + "/" + G.CONFIG.docsSubFolderName);
         if (!docsFolder.exists) throw new Error("'docs' folder not found.");
         app.beginUndoGroup("Process Project " + activeComp.name);
         undoGroupStarted = true;

         var importedImagesViaPython = false;
         if (G.CONFIG.enablePythonAnalyzer) {
            try {
               var imgRes = sendToPyShiftBridge(
                  "mediasolution_import_images_from_folder",
                  {
                     folder_path: docsFolder.fsName,
                     extensions: G.CONFIG.imageExtensions
                  },
                  20000
               );
               if (imgRes && imgRes.ok && imgRes.result && imgRes.result.imported !== undefined) {
                  importedImagesViaPython = true;
                  logMessage(
                     "Images import (PyShiftAE): imported=" + imgRes.result.imported + " errors=" + imgRes.result.errors,
                     (imgRes.result.errors && imgRes.result.errors > 0) ? 'warning' : 'info'
                  );
               } else {
                  logMessage("Images import via PyShiftAE failed, fallback ExtendScript", 'warning');
               }
            } catch (e) {
               logMessage("Images import via PyShiftAE exception, fallback ExtendScript: " + e.toString(), 'warning');
            }
         }

         if (!importedImagesViaPython) {
            var imageFiles = getFilesByExtensions(docsFolder, G.CONFIG.imageExtensions);
            if (imageFiles.length > 0) {
               for (var i = 0; i < imageFiles.length; i++) {
                  try {
                     app.project.importFile(new ImportOptions(imageFiles[i]));
                  } catch (e) {
                     logMessage("WARN: Could not import image file '" + imageFiles[i].name + "': " + e.toString(), 'warning');
                  }
               }
            }
         }

         var preparedViaPython = false;
         if (G.CONFIG.enablePythonAnalyzer) {
            try {
               activeComp.openInViewer();
               try {
                  for (var si = 0; si < activeComp.selectedLayers.length; si++) {
                     activeComp.selectedLayers[si].selected = false;
                  }
               } catch (e) { }
               targetLayer.selected = true;

               var prepRes = sendToPyShiftBridge(
                  "mediasolution_batch_prepare_active_layer",
                  {
                     config: {
                        targetCompWidth: G.CONFIG.targetCompWidth,
                        targetCompHeight: G.CONFIG.targetCompHeight,
                        defaultVideoScaleX: G.CONFIG.defaultVideoScaleX,
                        defaultVideoScaleY: G.CONFIG.defaultVideoScaleY,
                        DISABLE_UNDO_GROUP: true
                     }
                  },
                  15000
               );

               if (prepRes && prepRes.ok && prepRes.result && prepRes.result.status === "ok") {
                  preparedViaPython = true;
                  logMessage("Batch prepare (PyShiftAE): ok", 'info');
               } else {
                  logMessage("Batch prepare via PyShiftAE failed, fallback ExtendScript", 'warning');
               }
            } catch (e) {
               logMessage("Batch prepare via PyShiftAE exception, fallback ExtendScript: " + e.toString(), 'warning');
            }
         }

         if (!preparedViaPython) {
            activeComp.width = G.CONFIG.targetCompWidth;
            activeComp.height = G.CONFIG.targetCompHeight;

            // FIX: Set Anchor Point to Top-Center so scaling extends downwards
            try {
               var layerWidth = targetLayer.width;
               // Anchor Point: [Center X, Top Y]
               targetLayer.property("Anchor Point").setValue([layerWidth / 2, 0]);

               // Position: [Comp Center X, Comp Top Y]
               targetLayer.property("Position").setValue([activeComp.width / 2, 0]);

               logMessage("Anchor Point set to Top-Center for: " + targetLayer.name, 'info');
            } catch (e) {
               logMessage("Error setting Anchor Point: " + e.toString(), 'warning');
            }
         }

         // Apply auto-recentering if enabled
         // Always apply default scale first
         if (!preparedViaPython) {
            try {
               var scaleX = G.CONFIG.defaultVideoScaleX || 100;
               var scaleY = G.CONFIG.defaultVideoScaleY || 100;
               targetLayer.property("Scale").setValue([scaleX, scaleY]);
               logMessage("Default scaling applied: " + scaleX + "x" + scaleY, 'info');
            } catch (e) {
               logMessage("Scaling error: " + e.toString(), 'warning');
            }
         }

         // Apply auto-recentering if enabled
         if (G.CONFIG.enableAutoRecentering) {
            applyAutoRecentering(activeComp, targetLayer, docsFolder);
         }

         // Apply cuts if CSV exists
         // FIX: Search for specific CSV matching the project/video name
         var csvFiles = getFilesByExtensions(docsFolder, ["csv"]);
         var matchingCsv = null;

         // clean comp name to find base video name
         var baseName = activeComp.name;
         if (baseName.indexOf(G.CONFIG.compNameSuffix) > -1) {
            baseName = baseName.replace(G.CONFIG.compNameSuffix, "");
         }

         if (csvFiles.length > 0) {
            for (var k = 0; k < csvFiles.length; k++) {
               // Check if CSV name contains the video base name (or exact match logic)
               // Decode URI to handle spaces/special chars in match
               if (decodeURI(csvFiles[k].name).indexOf(baseName) > -1) {
                  matchingCsv = csvFiles[k];
                  break;
               }
            }

            if (matchingCsv) {
               logMessage("CSV found for " + baseName + ": " + matchingCsv.name, 'info');
               var segmentsCreated = 0;
               if (G.CONFIG.enablePythonCutsParser) {
                  try {
                     activeComp.openInViewer();

                     // Ensure a stable active layer selection for PyShiftAE.
                     try {
                        for (var si = 0; si < activeComp.selectedLayers.length; si++) {
                           activeComp.selectedLayers[si].selected = false;
                        }
                     } catch (e) { }
                     targetLayer.selected = true;

                     var videoName = "";
                     try { videoName = decodeURI(targetLayer.source.name); } catch (e) { videoName = targetLayer.source.name; }
                     var trackingJson = findTrackingJsonForVideo(docsFolder, videoName);

                     var bridgeRes = sendToPyShiftBridge(
                        "mediasolution_apply_cuts_active_layer",
                        {
                           csv_path: matchingCsv.fsName,
                           frame_rate: activeComp.frameRate,
                           comp_duration: activeComp.duration,
                           snap_factor: 1.5,
                           tracking_json_path: trackingJson ? trackingJson.fsName : null,
                           config: {
                              SPREAD_THRESHOLD: G.CONFIG.SPREAD_THRESHOLD,
                              ENABLE_CONFIDENCE_WEIGHTING: G.CONFIG.ENABLE_CONFIDENCE_WEIGHTING,
                              CONFIDENCE_WEIGHT: G.CONFIG.CONFIDENCE_WEIGHT,
                              LABEL_HIGH_SPREAD: G.CONFIG.LABEL_HIGH_SPREAD,
                              LABEL_STABLE: G.CONFIG.LABEL_STABLE,
                              DISABLE_UNDO_GROUP: true
                           }
                        },
                        20000
                     );

                     if (bridgeRes.ok && bridgeRes.result && bridgeRes.result.created !== undefined) {
                        segmentsCreated = bridgeRes.result.created;
                     } else {
                        logMessage("PyShiftAE cuts bridge failed (batch), fallback ExtendScript: " + (bridgeRes.error || "unknown"), 'warning');
                        segmentsCreated = applyCutsToSelectedLayer(targetLayer, matchingCsv);
                     }
                  } catch (e) {
                     logMessage("PyShiftAE cuts bridge exception (batch), fallback ExtendScript: " + e.toString(), 'warning');
                     segmentsCreated = applyCutsToSelectedLayer(targetLayer, matchingCsv);
                  }
               } else {
                  segmentsCreated = applyCutsToSelectedLayer(targetLayer, matchingCsv);
               }

               result.segmentsCreated = segmentsCreated;
            } else {
               logMessage("WARN: No matching CSV found for " + baseName + ". Available CSVs: " + csvFiles.length, 'warning');
            }
         }

         // Save changes
         app.project.save();

         result.success = true;
      } catch (e) {
         result.error = e.toString();
         logMessage("Step3.2 error: " + e.toString(), 'error');
      } finally {
         if (undoGroupStarted) {
            app.endUndoGroup();
         }
      }
      return result;
   }

   function applyAutoRecentering(comp, targetLayer, docsFolder) {
      try {
         if (G.CONFIG.enablePythonRecentering) {
            try {
               try {
                  for (var i = 0; i < comp.selectedLayers.length; i++) {
                     comp.selectedLayers[i].selected = false;
                  }
               } catch (e) { }
               targetLayer.selected = true;

               var videoName = "";
               try { videoName = decodeURI(targetLayer.source.name); } catch (e) { videoName = targetLayer.source.name; }
               var trackingJson = (docsFolder && docsFolder.exists) ? findTrackingJsonForVideo(docsFolder, videoName) : null;

               var bridgeRes = sendToPyShiftBridge(
                  "mediasolution_apply_auto_recentering",
                  {
                     tracking_json_path: trackingJson ? trackingJson.fsName : null,
                     config: {
                        SPREAD_THRESHOLD: G.CONFIG.SPREAD_THRESHOLD,
                        ENABLE_CONFIDENCE_WEIGHTING: G.CONFIG.ENABLE_CONFIDENCE_WEIGHTING,
                        CONFIDENCE_WEIGHT: G.CONFIG.CONFIDENCE_WEIGHT,
                        LABEL_HIGH_SPREAD: G.CONFIG.LABEL_HIGH_SPREAD,
                        LABEL_STABLE: G.CONFIG.LABEL_STABLE,
                        apply_to_all_layers: false,
                        DISABLE_UNDO_GROUP: true
                     }
                  },
                  15000
               );

               if (bridgeRes.ok && bridgeRes.result && bridgeRes.result.layers_updated !== undefined) {
                  logMessage("Auto-recentering (PyShiftAE): " + bridgeRes.result.layers_updated + " layer(s)", 'info');
                  return;
               }

               logMessage("PyShiftAE auto-recentering failed, fallback ExtendScript: " + (bridgeRes.error || "unknown"), 'warning');
            } catch (e) {
               logMessage("PyShiftAE auto-recentering exception, fallback ExtendScript: " + e.toString(), 'warning');
            }
         }

         var compCenterX = comp.width / 2;
         var anchorProp = targetLayer.property("Anchor Point");
         var posProp = targetLayer.property("Position");

         if (anchorProp && posProp) {
            var anchorV = anchorProp.value;
            var posV = posProp.value;

            var anchorOut = [compCenterX, anchorV[1]];
            if (anchorV && anchorV.length > 2) anchorOut.push(anchorV[2]);
            var posOut = [compCenterX, posV[1]];
            if (posV && posV.length > 2) posOut.push(posV[2]);

            anchorProp.setValue(anchorOut);
            posProp.setValue(posOut);

            logMessage("Auto-recentering appliqué pour: " + targetLayer.name, 'info');
         }
      } catch (e) {
         logMessage("Auto-recentering error: " + e.toString(), 'warning');
      }
   }

   function applyCutsToSelectedLayer(targetLayer, csvFile) {
      logMessage("Application des segments pour: " + targetLayer.name);
      var initialComp = app.project.activeItem;
      if (!initialComp || !(initialComp instanceof CompItem)) {
         logMessage("ERROR (Segment): Active item is not a comp.", 'error');
         return 0;
      }

      var layerCache = {
         scale: targetLayer.property("Scale").value,
         anchorPoint: targetLayer.property("Anchor Point").value,
         position: targetLayer.property("Position").value,
         compFrameRate: initialComp.frameRate,
         compWidth: initialComp.width
      };

      var frameRate = layerCache.compFrameRate;
      var fileContent = "";
      try {
         csvFile.open("r");
         fileContent = csvFile.read();
         csvFile.close();
      } catch (e) {
         logMessage("ERROR (Segment) reading CSV: " + e.toString(), 'error');
         return 0;
      }

      var lines = fileContent.split(/\r\n|\r|\n/);
      var parsedSegments = [];
      for (var i = 1; i < lines.length; i++) {
         var line = lines[i].trim();
         if (line === "") continue;
         var columns = line.split(',');
         if (columns.length < 3) continue;
         var startTime = csvTimecodeToSeconds(columns[1].trim());
         var endTime = csvTimecodeToSeconds(columns[2].trim());
         if (startTime >= 0 && endTime > startTime) {
            parsedSegments.push({
               num: columns[0].trim(),
               startTime: startTime,
               endTime: endTime
            });
         }
      }

      if (parsedSegments.length === 0) {
         logMessage("WARN (Segment): No valid segments found in CSV.", 'warning');
         return 0;
      }

      // INTELLIGENT RECENTERING: Load Tracking Data
      var trackingData = { dataByFrame: {}, maxFrame: 0 };
      var docsFolder = new Folder(G.STATE.baseFolderForCsv.fsName + "/" + G.CONFIG.docsSubFolderName);
      // Try to find matching video file name from layer source
      var videoName = "";
      try { videoName = decodeURI(targetLayer.source.name); } catch (e) { videoName = targetLayer.source.name; }

      var trackingJson = findTrackingJsonForVideo(docsFolder, videoName);

      if (trackingJson && G.CONFIG.ENABLE_CONFIDENCE_WEIGHTING) { // using ENABLE_CONFIDENCE_WEIGHTING as proxy for "Intelligent Mode"
         logMessage("Tracking JSON found: " + trackingJson.name + ". Loading data...", 'info');
         trackingData = loadVideoTrackingData(trackingJson);
         logMessage("Tracking Data Loaded: " + Object.keys(trackingData.dataByFrame).length + " frames.", 'info');
      } else {
         logMessage("No tracking JSON found for " + videoName + " (or disabled). Using default centering.", 'info');
      }

      // --- DEBUT DU CORRECTIF : SNAP GAPS ---
      // On corrige les micro-trous (souvent 1 frame) entre les segments
      var frameDuration = 1 / layerCache.compFrameRate;
      var snapThreshold = frameDuration * 1.5; // Tolérance de 1.5 images

      for (var k = 0; k < parsedSegments.length - 1; k++) {
         var currSeg = parsedSegments[k];
         var nextSeg = parsedSegments[k + 1];
         var gap = nextSeg.startTime - currSeg.endTime;
         if (gap > 0 && gap <= snapThreshold) {
            currSeg.endTime = nextSeg.startTime;
         }
      }

      // --- DEBUT DU CORRECTIF : SNAP FIN DE COMP ---
      // Vérifie si le tout dernier segment s'arrête juste avant la fin de la comp
      if (parsedSegments.length > 0) {
         var lastSeg = parsedSegments[parsedSegments.length - 1];
         var compDuration = initialComp.duration;
         
         // Calcul de l'écart avec la fin absolue de la composition
         var gapToEnd = compDuration - lastSeg.endTime;

         // Si l'écart est positif (il y a un vide) mais petit (< 1.5 frame)
         // On force la fin du segment à la durée exacte de la composition
         if (gapToEnd > 0 && gapToEnd <= snapThreshold) {
            lastSeg.endTime = compDuration;
            // Optionnel : logger pour debug
            // logMessage("Dernier segment ajusté à la fin de la comp", 'info');
         }
      }
      // --- FIN DU CORRECTIF ---

      app.beginUndoGroup("Create Segments from CSV");
      var createdCount = 0;
      try {
         for (var j = 0; j < parsedSegments.length; j++) {
            var currentSegment = parsedSegments[j];
            var layerInPoint = currentSegment.startTime;
            var layerOutPoint = currentSegment.endTime;
            if (layerOutPoint - layerInPoint < (1 / frameRate)) continue;

            var newLayer = targetLayer.duplicate();
            newLayer.name = "Segment " + currentSegment.num + " (" + secondsToTimecode(layerInPoint) + " - " + secondsToTimecode(layerOutPoint) + ")";
            newLayer.inPoint = layerInPoint;
            newLayer.outPoint = layerOutPoint;
            newLayer.audioEnabled = true;

            // Apply Intelligent Recentering if data exists
            var recenteringApplied = false;
            if (trackingData && trackingData.dataByFrame && Object.keys(trackingData.dataByFrame).length > 0) {
               var minFrame = Math.floor(layerInPoint * frameRate);
               var maxFrame = Math.ceil(layerOutPoint * frameRate);
               var objectsInSegment = {};

               for (var f = minFrame; f <= maxFrame; f++) {
                  var frameObjs = trackingData.dataByFrame[f];
                  if (frameObjs) {
                     for (var k = 0; k < frameObjs.length; k++) {
                        var obj = frameObjs[k];
                        if (!objectsInSegment[obj.id]) {
                           objectsInSegment[obj.id] = {
                              id: obj.id,
                              source: obj.source,
                              x_values: [],
                              confidence_values: [],
                              bbox_surfaces: [],
                              total_bbox_surface: 0
                           };
                        }
                        objectsInSegment[obj.id].x_values.push(obj.centroid_x);
                        objectsInSegment[obj.id].confidence_values.push(obj.confidence);
                        objectsInSegment[obj.id].bbox_surfaces.push(obj.bbox_surface);
                        objectsInSegment[obj.id].total_bbox_surface += obj.bbox_surface;
                     }
                  }
               }

               var bestCandidate = null;
               var maxScore = -1;

               for (var id in objectsInSegment) {
                  var cand = objectsInSegment[id];
                  // Safe reduce
                  var avgConf = 0;
                  if (cand.confidence_values.length > 0) {
                     var sumConf = 0;
                     for (var ci = 0; ci < cand.confidence_values.length; ci++) sumConf += cand.confidence_values[ci];
                     avgConf = sumConf / cand.confidence_values.length;
                  }

                  var presence = cand.x_values.length;
                  var score = computePresenceScore(presence, avgConf);

                  if (score > maxScore) {
                     maxScore = score;
                     bestCandidate = cand;
                  } else if (score === maxScore) {
                     var avgSurf = cand.bbox_surfaces.length ? cand.total_bbox_surface / cand.bbox_surfaces.length : 0;
                     var bestAvgSurf = 0;
                     if (bestCandidate && bestCandidate.bbox_surfaces.length) {
                        bestAvgSurf = bestCandidate.total_bbox_surface / bestCandidate.bbox_surfaces.length;
                     }
                     if (avgSurf > bestAvgSurf) bestCandidate = cand;
                  }
               }

               if (bestCandidate) {
                  var stats = calculateStats(bestCandidate.x_values);
                  var centerX = stats.average;
                  var spread = stats.spread;
                  var labelColor = (spread > G.CONFIG.SPREAD_THRESHOLD && bestCandidate.source === "face_landmarker") ? G.CONFIG.LABEL_HIGH_SPREAD : G.CONFIG.LABEL_STABLE;

                  // Use target average X as new Anchor Point X
                  var currentAnchor = newLayer.property("Anchor Point").value;
                  newLayer.property("Anchor Point").setValue([centerX, currentAnchor[1], 0]);
                  // Center the layer in the comp
                  newLayer.property("Position").setValue([layerCache.compWidth / 2, 0, 0]);
                  newLayer.label = labelColor;
                  recenteringApplied = true;
               }
            }

            // Fallback if no recentering applied (or no data found)
            if (!recenteringApplied) {
               newLayer.property("Scale").setValue(layerCache.scale);
               newLayer.property("Anchor Point").setValue(layerCache.anchorPoint);
               newLayer.property("Position").setValue(layerCache.position);
            }

            createdCount++;
         }
         if (createdCount > 0) {
            targetLayer.remove();
            logMessage("INFO (Segment): Original layer removed.", 'info');
         }
      } catch (e) {
         logMessage("applyCutsToSelectedLayer error: " + e.toString(), 'error');
      } finally {
         app.endUndoGroup();
      }

      logMessage("SUCCESS (Segment): Created " + createdCount + " segments.", 'success');
      return createdCount;
   }


   function csvTimecodeToSeconds(tc) {
      try {
         var parts = tc.split(':');
         if (parts.length !== 3) throw new Error("Invalid format. Expected HH:MM:SS.mmm");
         var secondsPart = String(parts[2]).replace(',', '.');
         return (parseFloat(parts[0]) * 3600) + (parseFloat(parts[1]) * 60) + parseFloat(secondsPart);
      } catch (e) {
         logMessage("Timecode Convert Error '" + tc + "': " + e.message, 'error');
         return -1;
      }
   }

   function secondsToTimecode(timeInSeconds) {
      var absTime = Math.abs(timeInSeconds),
         hours = Math.floor(absTime / 3600),
         minutes = Math.floor((absTime % 3600) / 60),
         seconds = absTime % 60;
      var hStr = (hours < 10 ? "0" : "") + hours,
         mStr = (minutes < 10 ? "0" : "") + minutes,
         sStr = seconds.toFixed(3);
      if (seconds < 10) sStr = "0" + sStr;
      return (timeInSeconds < 0 ? "-" : "") + hStr + ":" + mStr + ":" + sStr.replace('.', ',');
   }

   // ===================================================================================
   // INTELLIGENT RECENTERING HELPERS
   // ===================================================================================

   function trimString(value) {
      if (value === null || value === undefined) return "";
      return value.toString().replace(/^\s+|\s+$/g, "");
   }

   function endsWithIgnoreCase(value, suffix) {
      if (!value || !suffix) return false;
      var v = value.toString().toLowerCase();
      var s = suffix.toString().toLowerCase();
      return v.lastIndexOf(s) === (v.length - s.length);
   }

   function isAePreprocessedJsonFile(fileObj) {
      if (!fileObj) return false;
      try {
         return endsWithIgnoreCase(fileObj.name, "_ae.json");
      } catch (e) {
         return false;
      }
   }

   function extractJsonFieldFast(str, key) {
      var keyStr = '"' + key + '":';
      var idx = str.indexOf(keyStr);
      if (idx === -1) return null;

      var start = idx + keyStr.length;
      var valueFirstChar = str.charAt(start);

      if (valueFirstChar !== '"') {
         var end = start;
         while (end < str.length) {
            var c = str.charAt(end);
            if (c === ',' || c === '}') break;
            end++;
         }
         return str.substring(start, end);
      } else {
         var strStart = start + 1;
         var end = str.indexOf('"', strStart);
         return str.substring(strStart, end);
      }
   }

   function extractSpeakers(objectString) {
      var searchKey = '"active_speakers":';
      var keyPos = objectString.indexOf(searchKey);
      if (keyPos === -1) return [];
      var arrayStartPos = objectString.indexOf('[', keyPos);
      if (arrayStartPos === -1) return [];
      var arrayEndPos = objectString.indexOf(']', arrayStartPos);
      if (arrayEndPos === -1) return [];
      var speakersString = objectString.substring(arrayStartPos + 1, arrayEndPos);
      if (speakersString.length === 0) return [];
      var parts = speakersString.replace(/"/g, '').split(',');
      var speakers = [];
      for (var i = 0; i < parts.length; i++) {
         var p = trimString(parts[i]);
         if (p) speakers.push(p);
      }
      return speakers;
   }

   function _findMatchingBrace(str, startIndex) {
      var c = 1;
      for (var i = startIndex + 1, len = str.length; i < len; i++) {
         if (str[i] === '{') c++;
         else if (str[i] === '}') c--;
         if (c === 0) return i;
      }
      return -1;
   }

   function _findMatchingBracket(str, startIndex) {
      var c = 1;
      for (var i = startIndex + 1, len = str.length; i < len; i++) {
         if (str[i] === '[') c++;
         else if (str[i] === ']') c--;
         if (c === 0) return i;
      }
      return -1;
   }

   function normalizeToStringArray(value) {
      if (value === null || value === undefined) return [];
      if (value instanceof Array) {
         var out = [];
         for (var i = 0; i < value.length; i++) {
            var v = trimString(value[i]);
            if (v) out.push(v);
         }
         return out;
      }
      var asString = trimString(value);
      if (!asString) return [];
      if (asString.indexOf(",") > -1) {
         var parts = asString.split(",");
         var out = [];
         for (var i = 0; i < parts.length; i++) {
            var p = trimString(parts[i]);
            if (p) out.push(p);
         }
         return out;
      }
      return [asString];
   }

   function arrayContainsExactString(array, value) {
      var target = trimString(value);
      for (var i = 0; i < array.length; i++) {
         if (trimString(array[i]) === target) return true;
      }
      return false;
   }

   function calculateStats(numberArray) {
      if (!numberArray || numberArray.length === 0) {
         return { min: 0, max: 0, spread: 0, average: 0, count: 0 };
      }
      var sum = 0;
      var minVal = numberArray[0];
      var maxVal = numberArray[0];
      for (var i = 0, len = numberArray.length; i < len; i++) {
         sum += numberArray[i];
         if (numberArray[i] < minVal) minVal = numberArray[i];
         if (numberArray[i] > maxVal) maxVal = numberArray[i];
      }
      return {
         min: minVal,
         max: maxVal,
         spread: maxVal - minVal,
         average: sum / len,
         count: len
      };
   }

   function clamp01(v) {
      if (v === null || v === undefined) return 0;
      var f = parseFloat(v);
      if (isNaN(f)) return 0;
      if (f < 0) return 0;
      if (f > 1) return 1;
      return f;
   }

   function computePresenceScore(presence, avg_confidence) {
      if (!G.CONFIG.ENABLE_CONFIDENCE_WEIGHTING) return presence;
      var w = parseFloat(G.CONFIG.CONFIDENCE_WEIGHT);
      if (isNaN(w) || w < 0) w = 0;
      return presence * (1 + (clamp01(avg_confidence) * w));
   }

   // Note: 'removeKey' works on Property object. We create a valid helper for removing all keys.
   function removeAllKeys(property) {
      if (property.numKeys > 0) {
         for (var k = property.numKeys; k >= 1; k--) {
            try { property.removeKey(k); } catch (e) { }
         }
      }
   }

   function readAndParseJsonRoot(filePath) {
      var file = new File(filePath);
      if (!file.exists) return null;
      try {
         file.open("r");
         file.encoding = "UTF-8";
         var content = file.read();
         file.close();
         return eval('(' + content.replace(/^\uFEFF/, '') + ')');
      } catch (e) {
         return null;
      }
   }

   function optimizedScanEngineFromFile(fileObj, chunkSizeChars, minFrame, maxFrame) {
      var extractedData = {};
      var maxFrameSeen = 0;
      var buffer = "";
      var searchFromIndex = 0;
      var tailKeep = 64 * 1024;
      var limit = chunkSizeChars || G.CONFIG.JSON_CHUNK_SIZE_CHARS;
      var useRange = (minFrame !== undefined && maxFrame !== undefined);

      try {
         fileObj.open("r");
         fileObj.encoding = "UTF-8";
         while (!fileObj.eof) {
            var chunk = "";
            while (!fileObj.eof && chunk.length < limit) {
               try {
                  var line = fileObj.readln();
                  chunk += line + "\n";
               } catch (e) { break; }
            }
            if (!chunk) break;
            if (buffer.length === 0) chunk = chunk.replace(/^\uFEFF/, '');
            buffer += chunk;

            while (searchFromIndex < buffer.length) {
               var trackedObjectsTagPos = buffer.indexOf('"tracked_objects":', searchFromIndex);
               if (trackedObjectsTagPos === -1) break;

               var arrayStartPos = buffer.indexOf('[', trackedObjectsTagPos);
               if (arrayStartPos === -1) break;

               var frameTagPos = buffer.lastIndexOf('"frame":', trackedObjectsTagPos);
               if (frameTagPos === -1) { searchFromIndex = trackedObjectsTagPos + 1; continue; }

               var frameNumEndPos = buffer.indexOf(',', frameTagPos);
               if (frameNumEndPos === -1) { break; }

               var frameNum = parseInt(buffer.substring(frameTagPos + 8, frameNumEndPos), 10);
               if (isNaN(frameNum)) { searchFromIndex = trackedObjectsTagPos + 1; continue; }

               if (useRange) {
                  if (frameNum < minFrame || frameNum > maxFrame) {
                     var arrayStartPosSkip = buffer.indexOf('[', trackedObjectsTagPos);
                     if (arrayStartPosSkip !== -1) {
                        var arrayEndPosSkip = _findMatchingBracket(buffer, arrayStartPosSkip);
                        if (arrayEndPosSkip !== -1) {
                           searchFromIndex = arrayEndPosSkip + 1;
                           continue;
                        }
                     }
                     break;
                  }
               }

               if (frameNum > maxFrameSeen) maxFrameSeen = frameNum;

               var arrayEndPos = _findMatchingBracket(buffer, arrayStartPos);
               if (arrayEndPos === -1) break;

               var internalSearchIndex = arrayStartPos;
               while (internalSearchIndex < arrayEndPos) {
                  var objectStartPos = buffer.indexOf('{', internalSearchIndex);
                  if (objectStartPos === -1 || objectStartPos > arrayEndPos) break;
                  var objectEndPos = _findMatchingBrace(buffer, objectStartPos);
                  if (objectEndPos === -1 || objectEndPos > arrayEndPos) break;

                  var objectString = buffer.substring(objectStartPos, objectEndPos + 1);
                  if (objectString.indexOf('"face_landmarker"') > -1 || objectString.indexOf('"person"') > -1) {
                     var id = extractJsonFieldFast(objectString, "id");
                     var centroid_x = parseFloat(extractJsonFieldFast(objectString, "centroid_x") || extractJsonFieldFast(objectString, "x_coordinate"));
                     var bbox_width = parseFloat(extractJsonFieldFast(objectString, "bbox_width"));
                     var bbox_height = parseFloat(extractJsonFieldFast(objectString, "bbox_height"));
                     var confidence = parseFloat(extractJsonFieldFast(objectString, "confidence"));
                     if (isNaN(confidence)) confidence = 0;

                     if (id !== null && id !== undefined && id !== "" && !isNaN(centroid_x)) {
                        if (!extractedData[frameNum]) extractedData[frameNum] = [];
                        var bbox_surface = (!isNaN(bbox_width) && !isNaN(bbox_height)) ? bbox_width * bbox_height : 0;
                        extractedData[frameNum].push({
                           id: id,
                           centroid_x: centroid_x,
                           source: extractJsonFieldFast(objectString, "source"),
                           label: extractJsonFieldFast(objectString, "label"),
                           video_speakers: extractSpeakers(objectString),
                           bbox_width: bbox_width || 0,
                           bbox_height: bbox_height || 0,
                           bbox_surface: bbox_surface,
                           confidence: confidence
                        });
                     }
                  }
                  internalSearchIndex = objectEndPos + 1;
               }
               searchFromIndex = arrayEndPos + 1;
               if (searchFromIndex > tailKeep) {
                  buffer = buffer.substring(searchFromIndex - tailKeep);
                  searchFromIndex = tailKeep;
               }
            }
            if (buffer.length > (tailKeep * 8)) {
               buffer = buffer.substring(buffer.length - (tailKeep * 4));
               searchFromIndex = 0;
            }
         }
      } catch (e) {
         logMessage("Scan streaming failed: " + e.toString(), 'warning');
      } finally {
         try { fileObj.close(); } catch (e) { }
      }
      return { dataByFrame: extractedData, maxFrame: maxFrameSeen };
   }

   function indexReducedTrackingFrames(framesArray) {
      var extractedData = {};
      var maxFrameSeen = 0;
      if (!framesArray || !(framesArray instanceof Array)) return { dataByFrame: extractedData, maxFrame: maxFrameSeen };

      for (var i = 0; i < framesArray.length; i++) {
         var frameObj = framesArray[i];
         if (!frameObj) continue;
         var frameNum = parseInt(frameObj.frame, 10);
         if (isNaN(frameNum)) continue;
         if (frameNum > maxFrameSeen) maxFrameSeen = frameNum;

         var tracked = frameObj.tracked_objects;
         if (!tracked || !(tracked instanceof Array)) continue;

         for (var j = 0; j < tracked.length; j++) {
            var obj = tracked[j];
            if (!obj) continue;
            var source = obj.source;
            var label = obj.label;
            var isRelevant = (source === "face_landmarker") || (source === "object_detector" && label === "person");
            if (!isRelevant) continue;

            var centroid_x = parseFloat(obj.centroid_x);
            if (isNaN(centroid_x)) continue;
            var bbox_width = parseFloat(obj.bbox_width);
            var bbox_height = parseFloat(obj.bbox_height);
            var bbox_surface = (!isNaN(bbox_width) && !isNaN(bbox_height)) ? bbox_width * bbox_height : 0;
            var confidence = parseFloat(obj.confidence);
            if (isNaN(confidence)) confidence = 0;

            if (!extractedData[frameNum]) extractedData[frameNum] = [];
            extractedData[frameNum].push({
               id: obj.id,
               centroid_x: centroid_x,
               source: source,
               label: label,
               video_speakers: normalizeToStringArray(obj.active_speakers),
               bbox_width: bbox_width || 0,
               bbox_height: bbox_height || 0,
               bbox_surface: bbox_surface,
               confidence: confidence
            });
         }
      }
      return { dataByFrame: extractedData, maxFrame: maxFrameSeen };
   }

   function loadVideoTrackingData(videoJsonFile, minFrame, maxFrame) {
      if (!videoJsonFile || !videoJsonFile.exists) return { dataByFrame: {}, maxFrame: 0 };

      if (isAePreprocessedJsonFile(videoJsonFile)) {
         var root = readAndParseJsonRoot(videoJsonFile.fsName);
         if (root && root.dataByFrame) {
            return {
               dataByFrame: root.dataByFrame || {},
               maxFrame: root.maxFrame || 0,
               audioByFrame: root.audioByFrame || {}
            };
         }
      }

      try {
         if (videoJsonFile.length && videoJsonFile.length < G.CONFIG.MAX_FULL_JSON_READ_BYTES) {
            var root = readAndParseJsonRoot(videoJsonFile.fsName);
            if (root && root.frames_analysis && (root.frames_analysis instanceof Array)) {
               var idx = indexReducedTrackingFrames(root.frames_analysis);
               return idx;
            }
         }
      } catch (e) { }

      return optimizedScanEngineFromFile(videoJsonFile, G.CONFIG.JSON_CHUNK_SIZE_CHARS, minFrame, maxFrame);
   }

   function findTrackingJsonForVideo(docsFolder, videoName) {
      var baseName = videoName;
      if (baseName.lastIndexOf('.') > -1) baseName = baseName.substring(0, baseName.lastIndexOf('.'));

      var variants = [
         baseName + "_ae.json",
         baseName + "_tracking.json",
         baseName + ".json"
      ];

      for (var i = 0; i < variants.length; i++) {
         var f = new File(docsFolder.fsName + "/" + variants[i]);
         if (f.exists) return f;
      }
      return null;
   }

   // --- EXPORTS ---
   $.global.selectFolder = selectFolder;
   $.global.selectCsv = selectCsv;
   $.global.startBatch = startBatch;
   $.global.cancelBatch = cancelBatch;
   $.global.runDiagnostics = runDiagnostics;
   $.global.applyCuts = applyCuts;
   $.global.checkPyShiftBridgeHealth = checkPyShiftBridgeHealth;
   $.global.getPyShiftBridgeConfig = getPyShiftBridgeConfig;
   $.global.updateRuntimeConfig = updateRuntimeConfig;
   $.global.saveConfigFile = saveConfigFile;
   $.global.loadConfigFile = loadConfigFile;
   $.global.saveLogFile = saveLogFile;
   $.global.processBatch_Global = processBatch;
   $.global.testConnection = function () { return "OK"; };

   // Init signal
   sendToCEP({ type: 'log', message: "Host JSX Ready v" + SCRIPT_VERSION });

})();