/**
 * @file Media-Solution-v11.2-final-fix.jsx
 * @author Your Name
 * @version 11.2
 * @description A production-ready, modular, and robust script for batch processing video projects in After Effects.
 * This version definitively fixes all scope-related issues with the Folder.getFiles() method.
 */

// --- Polyfills for ES3 Compatibility ---
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(searchElement, fromIndex) {
		var k;
		if (this == null) {
			throw new TypeError('"this" is null or not defined');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if (len === 0) {
			return -1;
		}
		var n = +fromIndex || 0;
		if (Math.abs(n) === Infinity) {
			n = 0;
		}
		if (n >= len) {
			return -1;
		}
		k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
		while (k < len) {
			if (k in O && O[k] === searchElement) {
				return k;
			}
			k++;
		}
		return -1;
	};
}

if (!String.prototype.trim) {
	String.prototype.trim = function() {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}

(function(thisObj) {
	"use strict";
	
// --- Global Object for State and Configuration ---
var SCRIPT_VERSION = "11.2";
var G = {
	// --- Global Configuration ---
	CONFIG: {
		analyseEcartXScriptPath: "F:/Adobe/Adobe After Effects 2024/Support Files/Scripts/ScriptUI Panels/Analyse-Écart-X-depuis-JSON-et-Label-Vidéo36_good.jsx",
		docsSubFolderName: "docs",
 		projectsSubFolderName: "projets",
		compNameSuffix: "_9x16",
		projectFileSuffix: ".aep",
		logFileNamePrefix: "MediaSolutionLog_V11.2_FinalFix_",
		videoExtensions: ["mp4", "mov", "avi", "mxf", "mpg", "mpeg", "wmv"],
		imageExtensions: ["jpg", "jpeg", "png", "gif", "tif", "tiff", "psd", "bmp"],
		projectCreationBasePath: "F:/",
		step1_LogFolderPath: "F:/_MediaSolution_Step1_Logs/",
		configFileName: "Media-Solution.config.json",
		batchDelayMs: 75,
		purgeEveryNProjects: 1,
		maxErrorDetailsInSummary: 15,
		targetCompWidth: 1080,
		targetCompHeight: 1920,
		defaultVideoScaleX: 180,
		defaultVideoScaleY: 180,
		enableAutoRecenteringInBatch: true,
		enablePythonAnalyzer: true,
		enablePythonCutsParser: true,
		pythonCmd: "C:/Python313/python.exe",
		step7AnalyzerScriptPath: "F:/Adobe/Adobe After Effects 2024/Support Files/Scripts/ScriptUI Panels/preprocess_ae_json.py",
		pythonCutsScriptPath: "F:/Adobe/Adobe After Effects 2024/Support Files/Scripts/ScriptUI Panels/media_solution_bridge.py",
		pythonTempFolder: Folder.temp.fsName,
		pythonCutsSnapFactor: 1.1,
		pythonSpreadThreshold: 200,
		pythonEnableConfidenceWeighting: true,
		pythonConfidenceWeight: 0.35,
		pythonLabelHighSpread: 12,
		pythonLabelStable: 3
	},
	STATE: {
		projectsToProcess: [],
		nextProjectIndex: 0,
		selectedFolder: null,
		baseFolderForCsv: null,
		currentlyOpenProjectFile: null,
		totalProjectsWithCuts: 0,
		totalProcessedCount: 0,
		configLoaded: false,
		isBatchRunning: false,
		cancelRequested: false,
		batchTaskId: null,
		batchErrors: [],
		ui: {
			updateStatus: function(message) { // Default empty function
				$.writeln("UI not ready for status: " + message);
			}
		}
	},
	LOG: {
		currentLogFile: null,
		logFileOpenedForSession: false,
		lastSelectedFolderPath: null,
		step1_LogFilePath: null,
		buffer: [],
		maxBufferSize: 20
	},
	CACHE: {
		items: null,
		build: function() {
			this.items = {
				comp: {},
				footage: {},
				folder: {}
			};
			if (!app.project || !app.project.numItems) return;
			logMessage(" (Cache) Building cache for " + app.project.numItems + " items...");
			for (var i = 1; i <= app.project.numItems; i++) {
				try {
					var item = app.project.item(i);
					if (!item) continue;
					if (item instanceof CompItem) this.items.comp[item.name] = item;
					else if (item instanceof FootageItem) this.items.footage[item.name] = item;
					else if (item instanceof FolderItem) this.items.folder[item.name] = item;
				} catch (e) {
					logMessage("WARN (Cache): Could not cache item " + i + ": " + e.toString());
				}
			}
			logMessage(" (Cache) Cache built.");
		},
		getCompByName: function(name) {
			if (!this.items) this.build();
			return this.items && this.items.comp ? this.items.comp[name] : null;
		},
		invalidate: function() {
			this.items = null;
			logMessage(" (Cache) Cache invalidated.");
		}
	}
};

// --- Utility & Manager Modules ---
function removeDiacritics(str) {
	if (typeof str !== 'string') return '';
	return str
		.replace(/[àáâãäå]/g, 'a').replace(/[ÀÁÂÃÄÅ]/g, 'A')
		.replace(/ç/g, 'c').replace(/Ç/g, 'C')
		.replace(/[èéêë]/g, 'e').replace(/[ÈÉÊË]/g, 'E')
		.replace(/[ìíîï]/g, 'i').replace(/[ÌÍÎÏ]/g, 'I')
		.replace(/[ñ]/g, 'n').replace(/[Ñ]/g, 'N')
		.replace(/[òóôõö]/g, 'o').replace(/[ÒÓÔÕÖ]/g, 'O')
		.replace(/[ùúûü]/g, 'u').replace(/[ÙÚÛÜ]/g, 'U');
}

function getFilesByExtensions(folder, extensions) {
	if (!folder || !(folder instanceof Folder) || !folder.exists) return [];
	if (!extensions || !(extensions instanceof Array) || extensions.length === 0) return [];
	
	var allFiles = folder.getFiles();
	var matchedFiles = [];
	
	for (var i = 0; i < allFiles.length; i++) {
		var file = allFiles[i];
		if (file instanceof File) {
			var ext = file.name.toLowerCase().split('.').pop();
			if (extensions.indexOf(ext) > -1) {
				matchedFiles.push(file);
			}
		}
	}
	
	return matchedFiles;
}

function getTimestamp() {
	var now = new Date();

	function pad(num) {
		return (num < 10 ? '0' : '') + num;
	}
	return now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate()) + "_" + pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());
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
		$.writeln("!!! LOG FLUSH ERROR: " + e.toString());
		try {
			if (G.LOG.currentLogFile && G.LOG.currentLogFile.isOpen) G.LOG.currentLogFile.close();
		} catch (ec) {}
	}
}

function logMessage(message) {
	var timestamp = getTimestamp();
	var logEntry = timestamp + " | " + message;
	$.writeln("Log: " + logEntry);
	if (G.LOG.logFileOpenedForSession && G.LOG.currentLogFile !== null && G.LOG.currentLogFile instanceof File) {
		G.LOG.buffer.push(logEntry);
		if (G.LOG.buffer.length >= G.LOG.maxBufferSize) {
			flushLogBuffer();
		}
	}
}

function openLogFileIfNeeded(folderObject) {
	if (!folderObject || !folderObject.exists) return false;
	var currentProjectFolderPath = folderObject.fsName;
	if (!G.LOG.logFileOpenedForSession || currentProjectFolderPath !== G.LOG.lastSelectedFolderPath) {
		closeLogFile();
		G.LOG.lastSelectedFolderPath = currentProjectFolderPath;
		var logFileName = G.CONFIG.logFileNamePrefix + getTimestamp() + ".txt";
		var logFilePath = currentProjectFolderPath + "/" + logFileName;
		try {
			G.LOG.currentLogFile = new File(logFilePath);
			if (G.LOG.currentLogFile.open("w")) {
				G.LOG.currentLogFile.encoding = "UTF-8";
				G.LOG.currentLogFile.writeln("--- Log File Opened: " + logFilePath + " at " + getTimestamp() + " ---");
				G.LOG.currentLogFile.close();
				G.LOG.logFileOpenedForSession = true;
				return true;
			} else {
				throw new Error("File.open('w') failed.");
			}
		} catch (e) {
			logMessage("!!! LOG OPEN ERROR: " + e.toString());
			G.LOG.currentLogFile = null;
			G.LOG.logFileOpenedForSession = false;
			G.LOG.lastSelectedFolderPath = null;
			return false;
		}
	}
	return true;
}

function closeLogFile() {
	flushLogBuffer();
	if (G.LOG.currentLogFile instanceof File) {
		try {
			if (G.LOG.currentLogFile.isOpen) G.LOG.currentLogFile.close();
		} catch (e) {}
	}
	G.LOG.currentLogFile = null;
	G.LOG.logFileOpenedForSession = false;
	G.LOG.lastSelectedFolderPath = null;
	G.LOG.buffer = [];
}

 function getScriptFolder() {
	try {
		var scriptFile = new File($.fileName);
		return scriptFile.parent;
	} catch (e) {
		return null;
	}
 }

 function getConfigFile() {
	var scriptFolder = getScriptFolder();
	if (!scriptFolder) return null;
	return new File(scriptFolder.fsName + "/" + G.CONFIG.configFileName);
 }

 function readTextFile(file) {
	if (!file || !(file instanceof File) || !file.exists) return null;
	try {
		if (!file.open("r")) return null;
		file.encoding = "UTF-8";
		var content = file.read();
		file.close();
		return content;
	} catch (e) {
		try {
			if (file && file.isOpen) file.close();
		} catch (ec) {}
		return null;
	}
 }

 function writeTextFile(file, content) {
	if (!file || !(file instanceof File)) return false;
	try {
		if (!file.open("w")) return false;
		file.encoding = "UTF-8";
		file.write(content);
		file.close();
		return true;
	} catch (e) {
		try {
			if (file && file.isOpen) file.close();
		} catch (ec) {}
		return false;
	}
 }

 function safeJsonParse(text) {
	if (typeof text !== "string") return null;
	var trimmed = text.replace(/^\uFEFF/, "").trim();
	if (!trimmed) return null;
	try {
		if (typeof JSON !== "undefined" && JSON.parse) return JSON.parse(trimmed);
	} catch (e) {}
	if (trimmed.charAt(0) !== "{" && trimmed.charAt(0) !== "[") return null;
	if (trimmed.indexOf("function") > -1 || trimmed.indexOf("eval") > -1 || 
	    trimmed.indexOf("while") > -1 || trimmed.indexOf("for") > -1) {
		logMessage("WARN (JSON): Suspicious content detected in JSON, refusing to parse with eval");
		return null;
	}
	try {
		return eval("(" + trimmed + ")");
	} catch (e) {
		logMessage("WARN (JSON): eval parse failed: " + e.toString());
		return null;
	}
 }

 function escapeSystemArg(arg) {
	if (arg === null || arg === undefined) return "\"\"";
	var s = arg.toString();
	s = s.replace(/\"/g, "\\\"");
	return "\"" + s + "\"";
 }

 function findBestTrackingJsonForBaseName(docsFolder, videoBaseName) {
	if (!docsFolder || !(docsFolder instanceof Folder) || !docsFolder.exists) return null;
	if (!videoBaseName) return null;
	var candidates = [
		videoBaseName + "_ae.json",
		videoBaseName + "_tracking.json",
		videoBaseName + ".json"
	];
	for (var i = 0; i < candidates.length; i++) {
		var f = new File(docsFolder.fsName + "/" + candidates[i]);
		if (f.exists) return f;
	}
	return null;
 }

 function deriveVideoBaseNameFromAepFile(projectFile) {
	if (!projectFile || !(projectFile instanceof File)) return null;
	var name = projectFile.name || "";
	if (!name) return null;
	var stem = name.replace(/\.aep$/i, "");
	var suffix = G.CONFIG.compNameSuffix || "";
	if (suffix) {
		var escapedSuffix = suffix.replace(/([.*+?^${}()|[\]\\])/g, "\\$1");
		var re = new RegExp(escapedSuffix + "(?:_[0-9]{8}_[0-9]{6})?$", "i");
		stem = stem.replace(re, "");
	}
	return stem || null;
 }

 function buildPythonAnalyzerManifestForLayer(comp, layer, frameRate, videoJsonFile) {
	var compMaxFrame = Math.round(comp.duration * frameRate);
	var manifest = {
		comp_max_frame: compMaxFrame,
		json_path: videoJsonFile.fsName,
		config: {
			SPREAD_THRESHOLD: G.CONFIG.pythonSpreadThreshold,
			ENABLE_CONFIDENCE_WEIGHTING: G.CONFIG.pythonEnableConfidenceWeighting,
			CONFIDENCE_WEIGHT: G.CONFIG.pythonConfidenceWeight,
			LABEL_HIGH_SPREAD: G.CONFIG.pythonLabelHighSpread,
			LABEL_STABLE: G.CONFIG.pythonLabelStable
		},
		layers: {}
	};
	manifest.layers[layer.index.toString()] = {
		name: layer.name,
		json_path: videoJsonFile.fsName,
		in_frame: Math.floor(layer.inPoint * frameRate),
		out_frame: Math.ceil(layer.outPoint * frameRate),
		video_scale: 1.0
	};
	return manifest;
 }

 function tryRunPythonAnalyzerForLayer(comp, layer, frameRate, videoJsonFile) {
	if (!G.CONFIG.enablePythonAnalyzer) return null;
	if (!G.CONFIG.pythonCmd || !G.CONFIG.step7AnalyzerScriptPath) return null;
	if (!videoJsonFile || !videoJsonFile.exists) return null;
	if (!system || typeof system.callSystem !== "function") return null;

	var manifest = buildPythonAnalyzerManifestForLayer(comp, layer, frameRate, videoJsonFile);
	var ts = getTimestamp();
	var tempFolder = G.CONFIG.pythonTempFolder || Folder.temp.fsName;
	var manifestFile = new File(tempFolder + "/ms_manifest_" + ts + ".json");
	var resultFile = new File(tempFolder + "/ms_results_" + ts + ".json");

	try {
		if (!manifestFile.open("w")) return null;
		manifestFile.encoding = "UTF-8";
		manifestFile.write(safeJsonStringify(manifest));
		manifestFile.close();
	} catch (eWrite) {
		try {
			manifestFile.close();
		} catch (eClose) {}
		logMessage("WARN (PY): Could not write manifest: " + eWrite.toString());
		return null;
	}

	var cmd =
		escapeSystemArg(G.CONFIG.pythonCmd) +
		" " +
		escapeSystemArg(G.CONFIG.step7AnalyzerScriptPath) +
		" --manifest_path " +
		escapeSystemArg(manifestFile.fsName) +
		" --output_path " +
		escapeSystemArg(resultFile.fsName);

	try {
		var output = system.callSystem(cmd) || "";
		if (output && output.length > 0) {
			logMessage(" (PY) stdout: " + output);
		}
	} catch (eCall) {
		logMessage("WARN (PY): system.callSystem failed: " + eCall.toString());
		return null;
	}

	if (!resultFile.exists) {
		logMessage("WARN (PY): Result file not found: " + resultFile.fsName);
		return null;
	}

	var content = readTextFile(resultFile);
	if (content === null) {
		logMessage("WARN (PY): Could not read result file: " + resultFile.fsName);
		return null;
	}
	var parsed = safeJsonParse(content);
	if (!parsed || typeof parsed !== "object") {
		logMessage("WARN (PY): Invalid result JSON.");
		return null;
	}
	if (parsed.error) {
		logMessage("WARN (PY): " + parsed.error);
		return null;
	}
	return parsed;
 }

 function buildPythonCutsManifest(comp, frameRate, csvFile) {
	var compDuration = (comp && typeof comp.duration === "number") ? comp.duration : null;
	var manifest = {
		mode: "cuts",
		csv_path: csvFile.fsName,
		frame_rate: frameRate,
		comp_duration: compDuration,
		config: {
			SNAP_FACTOR: G.CONFIG.pythonCutsSnapFactor
		}
	};
	return manifest;
 }

 function tryRunPythonCutsParserForCsv(comp, frameRate, csvFile) {
	if (!G.CONFIG.enablePythonCutsParser) return null;
	if (!G.CONFIG.pythonCmd || !G.CONFIG.pythonCutsScriptPath) return null;
	if (!csvFile || !(csvFile instanceof File) || !csvFile.exists) return null;
	if (!system || typeof system.callSystem !== "function") return null;

	var manifest = buildPythonCutsManifest(comp, frameRate, csvFile);
	var ts = getTimestamp();
	var tempFolder = G.CONFIG.pythonTempFolder || Folder.temp.fsName;
	var manifestFile = new File(tempFolder + "/ms_cuts_manifest_" + ts + ".json");
	var resultFile = new File(tempFolder + "/ms_cuts_results_" + ts + ".json");

	try {
		if (!manifestFile.open("w")) return null;
		manifestFile.encoding = "UTF-8";
		manifestFile.write(safeJsonStringify(manifest));
		manifestFile.close();
	} catch (eWrite) {
		try {
			manifestFile.close();
		} catch (eClose) {}
		logMessage("WARN (PY-CUTS): Could not write manifest: " + eWrite.toString());
		return null;
	}

	var cmd =
		escapeSystemArg(G.CONFIG.pythonCmd) +
		" " +
		escapeSystemArg(G.CONFIG.pythonCutsScriptPath) +
		" --manifest_path " +
		escapeSystemArg(manifestFile.fsName) +
		" --output_path " +
		escapeSystemArg(resultFile.fsName);

	try {
		var output = system.callSystem(cmd) || "";
		if (output && output.length > 0) {
			logMessage(" (PY-CUTS) stdout: " + output);
		}
	} catch (eCall) {
		logMessage("WARN (PY-CUTS): system.callSystem failed: " + eCall.toString());
		return null;
	}

	if (!resultFile.exists) {
		logMessage("WARN (PY-CUTS): Result file not found: " + resultFile.fsName);
		return null;
	}

	var content = readTextFile(resultFile);
	if (content === null) {
		logMessage("WARN (PY-CUTS): Could not read result file: " + resultFile.fsName);
		return null;
	}

	var parsed = safeJsonParse(content);
	if (!parsed || typeof parsed !== "object") {
		logMessage("WARN (PY-CUTS): Invalid result JSON.");
		return null;
	}
	if (parsed.error) {
		logMessage("WARN (PY-CUTS): " + parsed.error);
		return null;
	}
	if (!parsed.segments || !(parsed.segments instanceof Array)) {
		logMessage("WARN (PY-CUTS): Missing segments array in result.");
		return null;
	}

	return parsed.segments;
 }

 function applyPythonRecenteringIfEnabled(comp, targetLayer, docsFolder, videoBaseName) {
	if (!G.CONFIG.enableAutoRecenteringInBatch) return false;
	var baseCandidates = [];
	if (videoBaseName) baseCandidates.push(videoBaseName);
	var derivedBaseName = deriveVideoBaseNameFromAepFile(G.STATE.currentlyOpenProjectFile);
	if (derivedBaseName && derivedBaseName !== videoBaseName) baseCandidates.push(derivedBaseName);

	var videoJsonFile = null;
	for (var i = 0; i < baseCandidates.length; i++) {
		videoJsonFile = findBestTrackingJsonForBaseName(docsFolder, baseCandidates[i]);
		if (videoJsonFile) break;
	}
	if (!videoJsonFile) return false;
	var frameRate = comp && comp.frameRate ? comp.frameRate : 25.0;
	var resByLayer = tryRunPythonAnalyzerForLayer(comp, targetLayer, frameRate, videoJsonFile);
	if (!resByLayer) return false;
	var layerRes = resByLayer[targetLayer.index.toString()];
	if (!layerRes) return false;
	var centerX = parseFloat(layerRes.center_x);
	if (isNaN(centerX)) return false;

	try {
		var compCenterX = comp.width / 2;
		var anchorProp = targetLayer.property("Anchor Point");
		var posProp = targetLayer.property("Position");
		var anchorV = anchorProp.value;
		var posV = posProp.value;
		var anchorOut = [centerX, anchorV[1]];
		if (anchorV && anchorV.length > 2) anchorOut.push(anchorV[2]);
		var posOut = [compCenterX, posV[1]];
		if (posV && posV.length > 2) posOut.push(posV[2]);
		anchorProp.setValue(anchorOut);
		posProp.setValue(posOut);
		logMessage(
			" (PY) Auto recenter applied: layer='" +
				targetLayer.name +
				"' center_x=" +
				centerX +
				" reason=" +
				(layerRes.reason || "")
		);
		return true;
	} catch (e) {
		logMessage("WARN (PY): Could not apply recenter: " + e.toString());
		return false;
	}
 }

 function escapeJsonString(str) {
	return String(str)
		.replace(/\\/g, "\\\\")
		.replace(/\"/g, "\\\"")
		.replace(/\n/g, "\\n")
		.replace(/\r/g, "\\r")
		.replace(/\t/g, "\\t");
 }

 function simpleJsonStringify(value, indentLevel) {
	var i;
	var indent = "";
	var nextIndent = "";
	indentLevel = indentLevel || 0;
	for (i = 0; i < indentLevel; i++) indent += "  ";
	for (i = 0; i < indentLevel + 1; i++) nextIndent += "  ";

	if (value === null || value === undefined) return "null";
	if (typeof value === "number" || typeof value === "boolean") return String(value);
	if (typeof value === "string") return "\"" + escapeJsonString(value) + "\"";
	if (value instanceof Array) {
		if (value.length === 0) return "[]";
		var arrParts = [];
		for (i = 0; i < value.length; i++) {
			arrParts.push(nextIndent + simpleJsonStringify(value[i], indentLevel + 1));
		}
		return "[\n" + arrParts.join(",\n") + "\n" + indent + "]";
	}
	if (typeof value === "object") {
		var keys = [];
		for (var k in value) {
			if (value.hasOwnProperty(k)) keys.push(k);
		}
		keys.sort();
		if (keys.length === 0) return "{}";
		var objParts = [];
		for (i = 0; i < keys.length; i++) {
			var key = keys[i];
			objParts.push(nextIndent + "\"" + escapeJsonString(key) + "\": " + simpleJsonStringify(value[key], indentLevel + 1));
		}
		return "{\n" + objParts.join(",\n") + "\n" + indent + "}";
	}
	return "null";
 }

 function safeJsonStringify(obj) {
	try {
		if (typeof JSON !== "undefined" && JSON.stringify) return JSON.stringify(obj, null, 2);
	} catch (e) {}
	return simpleJsonStringify(obj, 0);
 }

 function getValueType(value) {
	if (value === null) return "null";
	if (value instanceof Array) return "array";
	return typeof value;
 }

 var ConfigManager = {
	load: function() {
		var report = {
			loaded: false,
			configFilePath: null,
			warnings: [],
			errors: []
		};
		var configFile = getConfigFile();
		if (!configFile) {
			report.errors.push("Impossible de déterminer l'emplacement du script (pour charger la config).");
			return report;
		}
		report.configFilePath = configFile.fsName;
		if (!configFile.exists) {
			report.warnings.push("Fichier de config introuvable: " + configFile.fsName + " (valeurs par défaut utilisées)");
			return report;
		}

		var text = readTextFile(configFile);
		if (text === null) {
			report.errors.push("Lecture impossible du fichier de config: " + configFile.fsName);
			return report;
		}
		var parsed = safeJsonParse(text);
		if (!parsed || typeof parsed !== "object" || parsed instanceof Array) {
			report.errors.push("Format de config invalide (JSON object attendu): " + configFile.fsName);
			return report;
		}

		var appliedKeys = 0;
		for (var key in parsed) {
			if (!parsed.hasOwnProperty(key)) continue;
			if (!G.CONFIG.hasOwnProperty(key)) {
				report.warnings.push("Clé de config inconnue ignorée: " + key);
				continue;
			}
			var defaultType = getValueType(G.CONFIG[key]);
			var overrideType = getValueType(parsed[key]);
			if (defaultType !== overrideType) {
				report.warnings.push("Type invalide pour '" + key + "' (attendu " + defaultType + ", reçu " + overrideType + ")");
				continue;
			}
			G.CONFIG[key] = parsed[key];
			appliedKeys++;
		}
		report.loaded = true;
		if (appliedKeys === 0) report.warnings.push("Config chargée mais aucune clé n'a été appliquée.");
		return report;
	},
	exportCurrentConfig: function() {
		var configFile = getConfigFile();
		if (!configFile) return {
			success: false,
			error: "Impossible de déterminer le chemin de config."
		};
		var text = safeJsonStringify(G.CONFIG);
		var ok = writeTextFile(configFile, text + "\n");
		return {
			success: ok,
			path: configFile.fsName,
			error: ok ? null : ("Écriture impossible: " + configFile.fsName)
		};
	}
 };

 var DiagnosticsManager = {
	run: function(selectedFolder) {
		var report = {
			ok: true,
			warnings: [],
			errors: []
		};
		if (!selectedFolder || !(selectedFolder instanceof Folder) || !selectedFolder.exists) {
			report.ok = false;
			report.errors.push("Dossier projet invalide.");
			return report;
		}

		var docsFolder = new Folder(selectedFolder.fsName + "/" + G.CONFIG.docsSubFolderName);
		if (!docsFolder.exists) {
			report.ok = false;
			report.errors.push("Dossier 'docs' introuvable: " + docsFolder.fsName);
		}

		var configFile = getConfigFile();
		if (configFile && !configFile.exists) report.warnings.push("Aucun fichier de config externe. Vous pouvez en exporter un depuis l'UI.");

		return report;
	},
	formatForAlert: function(report) {
		var lines = [];
		if (report.errors && report.errors.length > 0) {
			lines.push("ERREURS:");
			for (var i = 0; i < report.errors.length; i++) lines.push("- " + report.errors[i]);
			lines.push("");
		}
		if (report.warnings && report.warnings.length > 0) {
			lines.push("AVERTISSEMENTS:");
			for (var j = 0; j < report.warnings.length; j++) lines.push("- " + report.warnings[j]);
		}
		return lines.join("\n");
	}
 };

 function ensureConfigLoadedOnce() {
	if (G.STATE.configLoaded) return;
	var loadReport = ConfigManager.load();
	G.STATE.configLoaded = true;
	if (loadReport.errors && loadReport.errors.length > 0) {
		for (var i = 0; i < loadReport.errors.length; i++) logMessage("ERROR (Config): " + loadReport.errors[i]);
	}
	if (loadReport.warnings && loadReport.warnings.length > 0) {
		for (var j = 0; j < loadReport.warnings.length; j++) logMessage("WARN (Config): " + loadReport.warnings[j]);
	}
 }

function csvTimecodeToSeconds(tc) {
	try {
		var parts = tc.split(':');
		if (parts.length !== 3) throw new Error("Invalid format. Expected HH:MM:SS.mmm");
		var secondsPart = String(parts[2]).replace(',', '.');
		return (parseFloat(parts[0]) * 3600) + (parseFloat(parts[1]) * 60) + parseFloat(secondsPart);
	} catch (e) {
		logMessage("Timecode Convert Error '" + tc + "': " + e.message);
		return -1;
	}
}

function secondsToPreciseTimecode(timeInSeconds) {
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
var PerformanceMonitor = {
	timers: {},
	start: function(label) {
		this.timers[label] = new Date().getTime();
	},
	end: function(label) {
		if (this.timers[label]) {
			var duration = (new Date().getTime() - this.timers[label]);
			logMessage("PERF: " + label + " took " + duration + "ms");
			delete this.timers[label];
		}
	}
};
var MemoryManager = {
	checkMemory: function() {
		try {
			app.purge(PurgeTarget.ALL_CACHES);
		} catch (e) {
			logMessage("WARN: Memory cleanup failed: " + e.toString());
		}
	}
};

function handleError(context, error) {
	var errorMsg = "ERROR in " + context + ": " + error.toString();
	if (error.line) errorMsg += " (Line: " + error.line + ")";
	logMessage(errorMsg);
	MemoryManager.checkMemory();
}
var CompNameSanitizer = {
	sanitize: function(str) {
		if (typeof str !== 'string') return '';
		var s = removeDiacritics(str);
		s = s.replace(/[^a-zA-Z0-9_ -]/g, "_");
		s = s.replace(/[\s-]+/g, "_");
		return s.replace(/^_+|_+$/g, "");
	},
	sanitizeAllCompsInProject: function() {
		var changedCount = 0;
		if (!app.project || !app.project.numItems) return 0;
		app.beginUndoGroup("Sanitize Comp Names");
		for (var i = 1; i <= app.project.numItems; i++) {
			try {
				var item = app.project.item(i);
				if (item instanceof CompItem) {
					var newName = this.sanitize(item.name);
					if (newName && newName !== item.name) {
						item.name = newName;
						changedCount++;
					}
				}
			} catch (e) {
				logMessage("WARN (Sanitize): Could not sanitize comp " + i + ": " + e.toString());
			}
		}
		app.endUndoGroup();
		if (changedCount > 0) G.CACHE.invalidate();
		return changedCount;
	}
};

function applyCutsToSelectedLayer(targetLayer, csvFile) {
	logMessage("\n--- Applying Segments: Layer '" + targetLayer.name + "' ---");
	var initialComp = app.project.activeItem;
	if (!initialComp || !(initialComp instanceof CompItem)) {
		logMessage("ERROR (Segment): Active item is not a comp.");
		return 0;
	}

	function isTimecodeLike(value) {
		if (value === null || value === undefined) return false;
		var s = String(value).trim();
		return /^\d{2}:\d{2}:\d{2}([\.,]\d+)?$/.test(s);
	}
	var layerCache = {
		scale: targetLayer.property("Scale").value,
		anchorPoint: targetLayer.property("Anchor Point").value,
		position: targetLayer.property("Position").value,
		compFrameRate: initialComp.frameRate
	};
	var frameRate = layerCache.compFrameRate;
	var frameDuration = 1 / frameRate;
	var parsedSegments = [];
	var pythonSegments = tryRunPythonCutsParserForCsv(initialComp, frameRate, csvFile);
	if (pythonSegments && pythonSegments.length > 0) {
		parsedSegments = pythonSegments;
		logMessage(" (PY-CUTS) Using python cuts parser: segments=" + parsedSegments.length);
	} else {
		var fileContent = "";
		try {
			csvFile.open("r");
			fileContent = csvFile.read();
			csvFile.close();
		} catch (e) {
			logMessage("ERROR (Segment) reading CSV: " + e.toString());
			return 0;
		}
		var lines = fileContent.split(/\r\n|\r|\n/);
		var startLineIndex = 1;
		if (lines.length > 0) {
			var firstLine = String(lines[0]).trim();
			if (firstLine !== "") {
				var firstColumns = firstLine.split(',');
				if (firstColumns.length >= 3 && isTimecodeLike(firstColumns[1]) && isTimecodeLike(firstColumns[2])) {
					startLineIndex = 0;
				}
			}
		}
		for (var i = startLineIndex; i < lines.length; i++) {
			var line = lines[i].trim();
			if (line === "") continue;
			var columns = line.split(',');
			if (columns.length < 3) continue;
			var startTime = -1;
			var endTime = -1;
			if (columns.length >= 5) {
				var frameIn = parseInt(String(columns[3]).trim(), 10);
				var frameOut = parseInt(String(columns[4]).trim(), 10);
				if (!isNaN(frameIn) && !isNaN(frameOut) && frameIn >= 1 && frameOut >= frameIn) {
					startTime = (frameIn - 1) / frameRate;
					endTime = frameOut / frameRate;
				}
			}
			if (startTime < 0 || endTime < 0) {
				startTime = csvTimecodeToSeconds(columns[1].trim());
				endTime = csvTimecodeToSeconds(columns[2].trim());
			}
			if (startTime >= 0 && endTime > startTime) {
				parsedSegments.push({
					num: columns[0].trim(),
					startTime: startTime,
					endTime: endTime
				});
			}
		}
	}
	if (parsedSegments.length === 0) {
		logMessage("WARN (Segment): No valid segments found in CSV.");
		return 0;
	}
	parsedSegments.sort(function(a, b) {
		return a.startTime - b.startTime;
	});
	app.beginUndoGroup("Create Segments from CSV");
	var createdCount = 0;
	try {
		for (var j = 0; j < parsedSegments.length; j++) {
			var currentSegment = parsedSegments[j];
			var nextSegment = (j + 1 < parsedSegments.length) ? parsedSegments[j + 1] : null;
			var layerInPoint = currentSegment.startTime;
			var layerOutPoint = currentSegment.endTime;
			if (nextSegment && nextSegment.startTime > 0) {
				var gapToNext = nextSegment.startTime - layerOutPoint;
				if (gapToNext > 0 && gapToNext <= (frameDuration * 1.1)) {
					layerOutPoint = nextSegment.startTime;
				} else {
					layerOutPoint = Math.min(layerOutPoint, nextSegment.startTime);
				}
			}
			layerOutPoint = Math.min(layerOutPoint, initialComp.duration);
			if (layerOutPoint - layerInPoint < frameDuration) {
				logMessage("WARN (Segment): Segment " + currentSegment.num + " is too short, skipping.");
				continue;
			}
			var newLayer = targetLayer.duplicate();
			newLayer.name = "Segment " + currentSegment.num + " (" + secondsToPreciseTimecode(layerInPoint) + " - " + secondsToPreciseTimecode(layerOutPoint) + ")";
			newLayer.inPoint = layerInPoint;
			newLayer.outPoint = layerOutPoint;
			newLayer.audioEnabled = true;
			newLayer.property("Scale").setValue(layerCache.scale);
			newLayer.property("Anchor Point").setValue(layerCache.anchorPoint);
			newLayer.property("Position").setValue(layerCache.position);
			createdCount++;
		}
		if (createdCount > 0) {
			targetLayer.enabled = false;
			logMessage("INFO (Segment): Original layer '" + targetLayer.name + "' disabled.");
		}
	} catch (e) {
		handleError("applyCutsToSelectedLayer", e);
	} finally {
		app.endUndoGroup();
	}
	logMessage("SUCCESS (Segment): Created " + createdCount + " segments.");
	return createdCount;
}

function cleanupProject(comp) {
	if (!comp || !(comp instanceof CompItem)) return;
	logMessage(" (Cleanup) Cleaning up composition '" + comp.name + "'...");
	app.beginUndoGroup("Cleanup Project");
	try {
		for (var i = comp.numLayers; i >= 1; i--) {
			try {
				var layerToRemove = comp.layer(i);
				if (layerToRemove && !layerToRemove.enabled) {
					layerToRemove.remove();
				}
			} catch (e) {
				handleError("cleanupProject (removing layer)", e);
			}
		}
		for (var j = 1; j <= comp.numLayers; j++) {
			try {
				var layerToUnlock = comp.layer(j);
				if (layerToUnlock) {
					layerToUnlock.locked = false;
					if (layerToUnlock.canSetAudioEnabled) {
						layerToUnlock.audioEnabled = true;
					}
				}
			} catch (e) {
				handleError("cleanupProject (setting props)", e);
			}
		}
	} catch (e) {
		handleError("cleanupProject (main)", e);
	} finally {
		app.endUndoGroup();
	}
}

function performStep2_1_Logic() {
	logMessage("--- Logic Step 2.1: Preparing CSVs (delegated to STEP1) ---");
	var docsFolder = new Folder(G.STATE.selectedFolder.fsName + "/" + G.CONFIG.docsSubFolderName);
	if (!docsFolder.exists) throw new Error("Project 'docs' folder not found.");

	var videoFiles = getFilesByExtensions(docsFolder, G.CONFIG.videoExtensions);
	if (videoFiles.length === 0) {
		logMessage("WARN (Step2.1): No video files found in 'docs'.");
		return true;
	}

	logMessage("INFO (Step2.1): ZIP extraction skipped (handled upstream by STEP1). Found " + videoFiles.length + " video(s) ready.");
	return true;
}

function createBaseProjectForVideo(videoFile, targetFolder) {
	logMessage("Creating base project for: " + decodeURI(videoFile.name));
	app.beginUndoGroup("Create Temp Project for " + videoFile.name);
	var createdItems = [];
	try {
		var footageItem = app.project.importFile(new ImportOptions(videoFile));
		createdItems.push(footageItem);
		var videoBaseName = decodeURI(videoFile.name).substring(0, decodeURI(videoFile.name).lastIndexOf('.'));
		var compSettings = {
			name: videoBaseName + G.CONFIG.compNameSuffix,
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

		// Ensure 'projets' subfolder exists under the selected folder and save AEP inside it
		var projectsFolder = new Folder(targetFolder.fsName + "/" + G.CONFIG.projectsSubFolderName);
		if (!projectsFolder.exists) {
			projectsFolder.create();
		}
		var aepFile = new File(projectsFolder.fsName + "/" + videoBaseName + G.CONFIG.compNameSuffix + G.CONFIG.projectFileSuffix);
		if (aepFile.exists) {
			aepFile = new File(projectsFolder.fsName + "/" + videoBaseName + G.CONFIG.compNameSuffix + "_" + getTimestamp() + G.CONFIG.projectFileSuffix);
			logMessage("WARN: Project file existed, saving with timestamp: " + aepFile.name);
		}
		app.project.save(aepFile);
		return aepFile;
	} catch (e) {
		handleError("createBaseProjectForVideo", e);
		return null;
	} finally {
		for (var i = 0; i < createdItems.length; i++) {
			try {
				createdItems[i].remove();
			} catch (e) {
				logMessage("WARN (Cleanup): Could not remove created item: " + e.toString());
			}
		}
		app.endUndoGroup();
	}
}

function performStep2_2_Logic() {
	logMessage("--- Logic Step 2.2: Creating Base AEPs ---");
	G.STATE.projectsToProcess = [];
	var docsFolder = new Folder(G.STATE.selectedFolder.fsName + "/" + G.CONFIG.docsSubFolderName);
	if (!docsFolder.exists) throw new Error("Project 'docs' folder not found.");

	var videoFiles = getFilesByExtensions(docsFolder, G.CONFIG.videoExtensions);

	if (videoFiles.length === 0) {
		logMessage("WARN (Step2.2): No video files to process.");
		return true;
	}
	for (var j = 0; j < videoFiles.length; j++) {
		var aepFile = createBaseProjectForVideo(videoFiles[j], G.STATE.selectedFolder);
		if (aepFile) G.STATE.projectsToProcess.push(aepFile);
	}
	logMessage("INFO (Step2.2): " + G.STATE.projectsToProcess.length + " AEPs created.");
	return true;
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
			logMessage("WARN (findMainVideoLayer): Could not evaluate layer " + i + ": " + e.toString());
		}
	}
	if (candidates.length === 0) return null;
	candidates.sort(function(a, b) {
		return b.score - a.score;
	});
	return candidates[0].layer;
}

function performStep3_1_Logic(projectFileToOpen) {
	logMessage("--- Logic Step 3.1: Opening " + decodeURI(projectFileToOpen.name) + " ---");
	var result = {
		success: false,
		activeCompName: null,
		videoLayerIndex: -1,
		error: "Unknown error"
	};
	try {
		if (app.project.file) app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
		app.open(projectFileToOpen);
		G.STATE.currentlyOpenProjectFile = projectFileToOpen;
		G.CACHE.build();
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
		handleError("Step3.1", e);
	}
	return result;
}

function performStep3_2_Logic(expectedCompName, targetLayerIndex) {
	logMessage("--- Logic Step 3.2: Processing '" + expectedCompName + "' ---");
	PerformanceMonitor.start("step3_2");
	var result = {
		success: false,
		segmentsCreated: 0,
		error: null
	};
	var undoGroupStarted = false;
	try {
		var activeComp = G.CACHE.getCompByName(expectedCompName);
		if (!activeComp) throw new Error("Composition '" + expectedCompName + "' not found via cache.");
		var targetLayer = activeComp.layer(targetLayerIndex);
		if (!targetLayer) throw new Error("Target layer at index " + targetLayerIndex + " is invalid.");
		var docsFolder = new Folder(G.STATE.baseFolderForCsv.fsName + "/" + G.CONFIG.docsSubFolderName);
		if (!docsFolder.exists) throw new Error("'docs' folder not found.");
		app.beginUndoGroup("Process Project " + activeComp.name);
		undoGroupStarted = true;

		var imageFiles = getFilesByExtensions(docsFolder, G.CONFIG.imageExtensions);

		if (imageFiles.length > 0) {
			for (var i = 0; i < imageFiles.length; i++) {
				try {
					app.project.importFile(new ImportOptions(imageFiles[i]));
				} catch (e) {
					logMessage("WARN: Could not import image file '" + imageFiles[i].name + "': " + e.toString());
				}
			}
			G.CACHE.invalidate();
			G.CACHE.build();
		}

		activeComp.width = G.CONFIG.targetCompWidth;
		activeComp.height = G.CONFIG.targetCompHeight;
		targetLayer.property("Scale").setValue([G.CONFIG.defaultVideoScaleX, G.CONFIG.defaultVideoScaleY]);
		if (targetLayer.source) targetLayer.property("Anchor Point").setValue([targetLayer.source.width / 2, 0]);
		targetLayer.property("Position").setValue([activeComp.width / 2, 0]);
		var videoBaseName = activeComp.name.replace(G.CONFIG.compNameSuffix, "");
		applyPythonRecenteringIfEnabled(activeComp, targetLayer, docsFolder, videoBaseName);
		var csvFile = new File(docsFolder.fsName + "/" + videoBaseName + ".csv");
		if (csvFile.exists) {
			result.segmentsCreated = applyCutsToSelectedLayer(targetLayer, csvFile);
			if (result.segmentsCreated > 0) G.STATE.totalProjectsWithCuts++;
		}
		CompNameSanitizer.sanitizeAllCompsInProject();
		cleanupProject(activeComp);
		app.project.save();
		logMessage(" (Step3.2) Project processed and saved.");
		result.success = true;
		G.STATE.totalProcessedCount++;
	} catch (e) {
		result.error = e.toString();
		handleError("Step3.2", e);
	} finally {
		if (undoGroupStarted) {
			try {
				app.endUndoGroup();
			} catch (e) {}
		}
	}
	PerformanceMonitor.end("step3_2");
	return result;
}


 function processSingleProjectFile(projectFile) {
	var result = {
		projectName: projectFile ? decodeURI(projectFile.name) : "(unknown)",
		openSuccess: false,
		processSuccess: false,
		errors: []
	};
	if (!projectFile || !(projectFile instanceof File) || !projectFile.exists) {
		result.errors.push("Fichier projet invalide.");
		return result;
	}
	var step3_1_Result = performStep3_1_Logic(projectFile);
	if (!step3_1_Result.success) {
		result.errors.push("Ouverture échouée: " + step3_1_Result.error);
		return result;
	}
	result.openSuccess = true;
	var step3_2_Result = performStep3_2_Logic(step3_1_Result.activeCompName, step3_1_Result.videoLayerIndex);
	if (!step3_2_Result.success) {
		result.errors.push("Traitement échoué: " + step3_2_Result.error);
		return result;
	}
	result.processSuccess = true;
	return result;
 }

 var BatchManager = {
	start: function() {
		if (G.STATE.isBatchRunning) return;
		G.STATE.cancelRequested = false;
		G.STATE.isBatchRunning = true;
		G.STATE.batchErrors = [];
		G.STATE.ui.processBatchButton.enabled = false;
		if (G.STATE.ui.cancelBatchButton) G.STATE.ui.cancelBatchButton.enabled = true;
		G.STATE.ui.selectFolderButton.enabled = false;
		this.scheduleNext();
	},
	requestCancel: function() {
		G.STATE.cancelRequested = true;
		if (G.STATE.ui.cancelBatchButton) G.STATE.ui.cancelBatchButton.enabled = false;
		G.STATE.ui.updateStatus("Annulation demandée...");
		if (G.STATE.batchTaskId !== null) {
			try {
				app.cancelTask(G.STATE.batchTaskId);
			} catch (e) {}
			G.STATE.batchTaskId = null;
		}
	},
	scheduleNext: function() {
		var delay = Math.max(10, parseInt(G.CONFIG.batchDelayMs, 10) || 75);
		G.STATE.batchTaskId = app.scheduleTask("$.global.MediaSolution_BatchManager.processNext()", delay, false);
	},
	processNext: function() {
		G.STATE.batchTaskId = null;
		if (!G.STATE.isBatchRunning) return;
		if (G.STATE.cancelRequested) return this.finish("Annulé");
		if (G.STATE.nextProjectIndex >= G.STATE.projectsToProcess.length) return this.finish("Terminé");

		var projectFile = G.STATE.projectsToProcess[G.STATE.nextProjectIndex];
		G.STATE.ui.updateStatus("Traitement " + (G.STATE.nextProjectIndex + 1) + "/" + G.STATE.projectsToProcess.length + ": " + decodeURI(projectFile.name));
		var singleResult = processSingleProjectFile(projectFile);
		if (!singleResult.processSuccess) {
			G.STATE.batchErrors.push(singleResult.projectName + " | " + singleResult.errors.join(" | "));
		}

		G.STATE.nextProjectIndex++;
		var purgeEvery = Math.max(1, parseInt(G.CONFIG.purgeEveryNProjects, 10) || 1);
		if ((G.STATE.nextProjectIndex % purgeEvery) === 0) MemoryManager.checkMemory();

		return this.scheduleNext();
	},
	finish: function(statusLabel) {
		G.STATE.isBatchRunning = false;
		G.STATE.cancelRequested = false;
		if (G.STATE.ui.cancelBatchButton) G.STATE.ui.cancelBatchButton.enabled = false;
		G.STATE.ui.selectFolderButton.enabled = true;
		G.STATE.ui.updateStatus(statusLabel + " ! " + G.STATE.totalProcessedCount + " projets traités.");
		G.STATE.ui.processBatchButton.text = statusLabel === "Terminé" ? "Traitement terminé" : "Traitement interrompu";
		G.STATE.ui.processBatchButton.enabled = false;

		var maxDetails = Math.max(1, parseInt(G.CONFIG.maxErrorDetailsInSummary, 10) || 15);
		var errorDetails = "";
		if (G.STATE.batchErrors.length > 0) {
			var showCount = Math.min(G.STATE.batchErrors.length, maxDetails);
			var lines = [];
			for (var i = 0; i < showCount; i++) lines.push("- " + G.STATE.batchErrors[i]);
			if (G.STATE.batchErrors.length > showCount) lines.push("... (" + (G.STATE.batchErrors.length - showCount) + " erreur(s) supplémentaire(s))");
			errorDetails = "\n\nDétails erreurs:\n" + lines.join("\n");
		}

		alert("Traitement du lot " + statusLabel.toLowerCase() + ".\n\nProjets traités : " + G.STATE.totalProcessedCount + "\nDont avec segments créés : " + G.STATE.totalProjectsWithCuts + "\nErreurs : " + G.STATE.batchErrors.length + errorDetails);
		if (app.project.file) {
			try {
				app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
			} catch (e) {}
		}
	}
 };

// --- Main Process Logic (now in a global function for scheduling) ---
function initiateProjectPreparation() {
	ensureConfigLoadedOnce();
	var folder = Folder.selectDialog("Sélectionnez le dossier racine DU PROJET");
	if (!folder || !folder.exists) {
		G.STATE.ui.updateStatus("Opération annulée.");
		return;
	}

	G.STATE.projectsToProcess = [];
	G.STATE.nextProjectIndex = 0;
	G.STATE.currentlyOpenProjectFile = null;
	G.STATE.totalProjectsWithCuts = 0;
	G.STATE.totalProcessedCount = 0;
	G.CACHE.invalidate();
	G.STATE.selectedFolder = folder;
	G.STATE.baseFolderForCsv = folder;
	G.STATE.ui.selectedFolderText.text = decodeURI(folder.fsName);

	var diagnosticsReport = DiagnosticsManager.run(folder);
	if (!diagnosticsReport.ok) {
		var msg = DiagnosticsManager.formatForAlert(diagnosticsReport);
		logMessage("ERROR (Diagnostics):\n" + msg);
		alert("Diagnostic bloquant avant exécution.\n\n" + msg);
		G.STATE.ui.selectFolderButton.enabled = true;
		return;
	}
	if (diagnosticsReport.warnings && diagnosticsReport.warnings.length > 0) {
		var warnMsg = DiagnosticsManager.formatForAlert({
			errors: [],
			warnings: diagnosticsReport.warnings
		});
		logMessage("WARN (Diagnostics):\n" + warnMsg);
	}

	if (!openLogFileIfNeeded(G.STATE.selectedFolder)) {
		alert("AVERTISSEMENT : Impossible de créer/ouvrir le fichier journal.");
		return;
	}

	PerformanceMonitor.start("fullPreparation");
	G.STATE.ui.updateStatus("Étape 2.1: Préparation des CSV...");
	G.STATE.ui.selectFolderButton.enabled = false;
	G.STATE.ui.processBatchButton.enabled = false;

	try {
		if (!performStep2_1_Logic()) throw new Error("Échec préparation CSV (Étape 2.1)");
		G.STATE.ui.updateStatus("Étape 2.2: Création des projets AEP...");
		if (!performStep2_2_Logic()) throw new Error("Échec création projets (Étape 2.2)");

		var projectCount = G.STATE.projectsToProcess.length;
		if (projectCount > 0) {
			G.STATE.ui.updateStatus(projectCount + " projet(s) prêt(s).");
			G.STATE.ui.processBatchButton.text = "2. Traiter " + projectCount + " Projet(s)";
			G.STATE.ui.processBatchButton.enabled = true;
			alert("Préparation terminée. " + projectCount + " projet(s) sont prêts.");
		} else {
			G.STATE.ui.updateStatus("Aucun projet AEP à traiter.");
			alert("Préparation terminée, mais aucun projet vidéo n'a été trouvé à traiter.");
			G.STATE.ui.selectFolderButton.enabled = true;
		}
	} catch (e) {
		handleError("initiateProjectPreparation", e);
		G.STATE.ui.updateStatus("Erreur: " + e.message);
		alert("Une erreur est survenue pendant la préparation : " + e.message);
		G.STATE.ui.selectFolderButton.enabled = true;
	}
	PerformanceMonitor.end("fullPreparation");
}


// --- User Interface and Main Logic (FINALIZED) ---
function buildWorkflowUI(thisObj) {
	var win = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Workflow Media Solution v" + SCRIPT_VERSION, undefined, {
		resizeable: true,
		dockable: true
	});
	win.text = "Lanceur Workflow Media Solution v" + SCRIPT_VERSION;
	win.orientation = "column";
	win.alignChildren = ["fill", "top"];
	win.spacing = 10;
	win.margins = 15;
	var selectionGroup = win.add("panel", undefined, "Actions sur Projet");
	selectionGroup.orientation = "column";
	selectionGroup.alignChildren = ["fill", "top"];
	selectionGroup.margins = 10;
	var selectFolderRow = selectionGroup.add("group");
	selectFolderRow.orientation = "row";
	selectFolderRow.alignChildren = ["left", "center"];
	var selectFolderButton = selectFolderRow.add("button", undefined, "1. Choisir Dossier & Préparer");
	var selectedFolderText = selectFolderRow.add("statictext", undefined, "Aucun dossier sélectionné", {
		truncate: "middle"
	});
	selectedFolderText.preferredSize.width = 250;
	var statusGroup = selectionGroup.add('group');
	statusGroup.orientation = 'row';
	statusGroup.alignChildren = ['left', 'center'];
	statusGroup.add('statictext', undefined, 'Statut:');
	var statusText = statusGroup.add('statictext', undefined, 'Prêt', {
		truncate: 'end'
	});
	statusText.preferredSize.width = 280;
	var batchButtonsRow = selectionGroup.add("group");
	batchButtonsRow.orientation = "row";
	batchButtonsRow.alignChildren = ["left", "center"];
	var processBatchButton = batchButtonsRow.add("button", undefined, "2. Traiter le Lot de Projets");
	processBatchButton.enabled = false;
	var cancelBatchButton = batchButtonsRow.add("button", undefined, "Annuler");
	cancelBatchButton.enabled = false;
	var toolsPanel = win.add("panel", undefined, "Outils");
	toolsPanel.orientation = "column";
	toolsPanel.alignChildren = ["fill", "top"];
	toolsPanel.margins = 10;
	var recenterButton = toolsPanel.add("button", undefined, "Recentrage Intelligent");
	recenterButton.helpTip = "Lance le script externe de recentrage sur la composition active.";
	var autoRecenteringGroup = toolsPanel.add("group");
	autoRecenteringGroup.orientation = "row";
	autoRecenteringGroup.alignChildren = ["left", "center"];
	var autoRecenteringCheckbox = autoRecenteringGroup.add("checkbox", undefined, "Auto-recentrage batch (Python)");
	autoRecenteringCheckbox.value = !!G.CONFIG.enableAutoRecenteringInBatch;
	autoRecenteringCheckbox.onClick = function() {
		G.CONFIG.enableAutoRecenteringInBatch = !!autoRecenteringCheckbox.value;
		var statusMsg = G.CONFIG.enableAutoRecenteringInBatch ? "Auto-recentrage batch activé" : "Auto-recentrage batch désactivé";
		logMessage("[UI] " + statusMsg);
		if (G.STATE.ui && typeof G.STATE.ui.updateStatus === "function") {
			G.STATE.ui.updateStatus(statusMsg);
		}
	};
	var exportConfigButton = toolsPanel.add("button", undefined, "Exporter la config (JSON)");

	// Store UI elements in the global state for access from other functions.
	G.STATE.ui.selectFolderButton = selectFolderButton;
	G.STATE.ui.processBatchButton = processBatchButton;
	G.STATE.ui.cancelBatchButton = cancelBatchButton;
	G.STATE.ui.statusText = statusText;
	G.STATE.ui.selectedFolderText = selectedFolderText;
	G.STATE.ui.window = win;

	// Define a safe update function and attach it to the global state.
	G.STATE.ui.updateStatus = function(message) {
		if (G.STATE.ui.statusText) {
			G.STATE.ui.statusText.text = message;
		}
	};

	// --- Button Actions ---
	selectFolderButton.onClick = function() {
		// The onClick handler now ONLY schedules the main task.
		// This keeps the handler non-blocking and stable for docked panels.
		app.scheduleTask("$.global.MediaSolution_initiateProjectPreparation()", 50, false);
	};
	processBatchButton.onClick = function() {
		BatchManager.start();
	};
	cancelBatchButton.onClick = function() {
		BatchManager.requestCancel();
	};
	recenterButton.onClick = function() {
		var scriptFile = new File(G.CONFIG.analyseEcartXScriptPath);
		if (scriptFile.exists) {
			try {
				$.evalFile(scriptFile);
			} catch (e) {
				alert("Erreur lors de l'exécution du script de recentrage:\n" + e.toString());
			}
		} else {
			alert("Script de recentrage introuvable:\n" + G.CONFIG.analyseEcartXScriptPath);
		}
	};
	exportConfigButton.onClick = function() {
		ensureConfigLoadedOnce();
		var exportResult = ConfigManager.exportCurrentConfig();
		if (!exportResult.success) {
			alert("Export config échoué:\n" + exportResult.error);
			return;
		}
		alert("Config exportée:\n" + exportResult.path);
	};
	win.onClose = function() {
		try {
			BatchManager.requestCancel();
		} catch (e) {}
		closeLogFile();
	};
	if (win instanceof Window) {
		win.center();
		win.show();
	} else {
		win.layout.layout(true);
	}
	return win;
}

// --- Main Entry Point ---
$.global.MediaSolution_initiateProjectPreparation = initiateProjectPreparation;
$.global.MediaSolution_BatchManager = BatchManager;
buildWorkflowUI(thisObj);

})(this);