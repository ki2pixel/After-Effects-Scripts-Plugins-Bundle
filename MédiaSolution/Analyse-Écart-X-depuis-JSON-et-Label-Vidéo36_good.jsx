#target aftereffects

// ===================================================================================
// SCRIPT FINAL : Recadrage Statique Intelligent v4.7 (Analytics & Pondération Confiance)
// Date : 01/02/2026
// Nouveautés v4.7 :
// - Pondération des décisions par confidence moyenne (ENABLE_CONFIDENCE_WEIGHTING + CONFIDENCE_WEIGHT)
// - Lecture des analytics STEP6 (tracking_analytics) et expression_summary si disponibles
// - Priorisation STEP6 *_tracking.json comme source primaire avec fallback streaming STEP5
// - Support embeddings locuteurs STEP4 (via speaker_labels) pour matching audio/vidéo
// - Logs enrichis avec métriques analytics (avg_confidence, presence_ratio, bbox_surface)
// Hérite de v4.5 :
// - Intégration des données bbox_width/height et calcul surface pour tie-breaker
// - Priorisation basée sur surface des bounding boxes (bbox_surface = width × height)
// - Parser streaming robuste pour éviter les crashs mémoire sur JSON massifs
// Hérite de v4.4 :
// - Correction majeure du parser manuscrit pour extraire correctement les chaînes de caractères.
// - Logique de hiérarchie et de labellisation pleinement fonctionnelle.
// ===================================================================================


// ===================================================================================
// CONFIGURATION
// ===================================================================================

var CONFIG = {
	// Seuils et paramètres
	SPREAD_THRESHOLD: 200,  // Seuil de dispersion pour déclencher un label différent
	ENABLE_CONFIDENCE_WEIGHTING: true,
	CONFIDENCE_WEIGHT: 0.35,
	
	ENABLE_PYTHON_ANALYZER: true,
	PYTHON_CMD: "C:/Python313/python.exe",
	STEP7_ANALYZER_SCRIPT_PATH: "F:/Adobe/Adobe After Effects 2024/Support Files/Scripts/ScriptUI Panels/preprocess_ae_json.py",
	TEMP_FOLDER: Folder.temp.fsName,
	
	// Labels de couleur After Effects
	LABEL_HIGH_SPREAD: 12,  // Label pour visages avec forte dispersion
	LABEL_STABLE: 3,        // Label pour objets stables
	
	// Chemin de logs
	LOG_FOLDER: "C:/temp",
	
	// Parser JSON
	JSON_FIELDS: {
		FRAMES: ["frames", "frames_data", "frames_analysis"]
	},
	JSON_CHUNK_SIZE_CHARS: (256 * 1024),
	MAX_FULL_JSON_READ_BYTES: (50 * 1024 * 1024)
};

// ===================================================================================
// PARTIE 1 : MOTEUR DE SCAN ET FONCTIONS UTILITAIRES
// ===================================================================================

// --- Polyfill pour Object.keys ---
if (!Object.keys) {
	Object.keys = (function() {
		'use strict';
		var h = Object.prototype.hasOwnProperty,
			d = !({
				toString: null
			}).propertyIsEnumerable('toString'),
			e = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
			l = e.length;
		return function(o) {
			if (typeof o !== 'function' && (typeof o !== 'object' || o === null)) {
				throw new TypeError('Object.keys called on non-object');
			}
			var r = [],
				p, i;
			for (p in o) {
				if (h.call(o, p)) {
					r.push(p);
				}
			}
			if (d) {
				for (i = 0; i < l; i++) {
					if (h.call(o, e[i])) {
						r.push(e[i]);
					}
				}
			}
			return r;
		};
	}());
}

function _escapeJsonString(value) {
	if (value === null || value === undefined) return "";
	var s = value.toString();
	s = s.replace(/\\/g, "\\\\");
	s = s.replace(/\"/g, "\\\"");
	s = s.replace(/\r/g, "\\r");
	s = s.replace(/\n/g, "\\n");
	s = s.replace(/\t/g, "\\t");
	return s;
}

function _jsonStringify(value) {
	if (value === null || value === undefined) return "null";
	var t = typeof value;
	if (t === "number") {
		if (isNaN(value) || !isFinite(value)) return "null";
		return value.toString();
	}
	if (t === "boolean") return value ? "true" : "false";
	if (t === "string") return "\"" + _escapeJsonString(value) + "\"";
	if (value instanceof Array) {
		var parts = [];
		for (var i = 0; i < value.length; i++) {
			parts.push(_jsonStringify(value[i]));
		}
		return "[" + parts.join(",") + "]";
	}
	if (t === "object") {
		var out = [];
		for (var k in value) {
			if (!value.hasOwnProperty(k)) continue;
			if (typeof value[k] === "function") continue;
			out.push("\"" + _escapeJsonString(k) + "\":" + _jsonStringify(value[k]));
		}
		return "{" + out.join(",") + "}";
	}
	return "null";
}

function _escapeSystemArg(arg) {
	if (arg === null || arg === undefined) return "\"\"";
	var s = arg.toString();
	s = s.replace(/\"/g, "\\\"");
	return "\"" + s + "\"";
}

function tryRunPythonAnalyzer(comp, frameRate, videoJsonFile) {
	if (!CONFIG.ENABLE_PYTHON_ANALYZER) {
		writeToLog("  [PY] Analyse Python désactivée");
		return null;
	}
	if (!CONFIG.PYTHON_CMD || !CONFIG.STEP7_ANALYZER_SCRIPT_PATH) {
		writeToLog("  [PY] PYTHON_CMD ou STEP7_ANALYZER_SCRIPT_PATH manquant");
		return null;
	}
	if (!videoJsonFile || !videoJsonFile.exists) {
		writeToLog("  [PY] Fichier vidéo introuvable pour la manif" );
		return null;
	}
	if (!system || typeof system.callSystem !== 'function') {
		writeToLog("  [PY] system.callSystem indisponible dans After Effects");
		return null;
	}

	var manifest = {
		comp_name: comp.name,
		comp_max_frame: Math.round(comp.duration * frameRate),
		json_path: videoJsonFile.fsName,
		config: {
			SPREAD_THRESHOLD: CONFIG.SPREAD_THRESHOLD,
			ENABLE_CONFIDENCE_WEIGHTING: CONFIG.ENABLE_CONFIDENCE_WEIGHTING,
			CONFIDENCE_WEIGHT: CONFIG.CONFIDENCE_WEIGHT,
			LABEL_HIGH_SPREAD: CONFIG.LABEL_HIGH_SPREAD,
			LABEL_STABLE: CONFIG.LABEL_STABLE
		},
		layers: {}
	};

	for (var i = 1; i <= comp.numLayers; i++) {
		var layer = comp.layer(i);
		if (!(layer instanceof AVLayer && layer.hasVideo && !layer.nullLayer) || layer.locked) {
			continue;
		}
		manifest.layers[i.toString()] = {
			name: layer.name,
			json_path: videoJsonFile.fsName,
			in_frame: Math.floor(layer.inPoint * frameRate),
			out_frame: Math.ceil(layer.outPoint * frameRate),
			video_scale: 1.0
		};
	}

	var ts = formatDateForFilename(new Date());
	var manifestFile = new File(CONFIG.TEMP_FOLDER + "/ae_manifest_" + ts + ".json");
	var resultFile = new File(CONFIG.TEMP_FOLDER + "/ae_results_" + ts + ".json");
	writeToLog("  [PY] manifest=" + manifestFile.fsName + ", result=" + resultFile.fsName);

	try {
		manifestFile.open("w");
		manifestFile.encoding = "UTF-8";
		manifestFile.write(_jsonStringify(manifest));
		manifestFile.close();
	} catch (eWrite) {
		try { manifestFile.close(); } catch (eClose) {}
		writeToLog("  [WARN] Impossible d'écrire le manifest JSON: " + eWrite.toString());
		return null;
	}

	var cmd = _escapeSystemArg(CONFIG.PYTHON_CMD) + " " + _escapeSystemArg(CONFIG.STEP7_ANALYZER_SCRIPT_PATH) +
		" --manifest_path " + _escapeSystemArg(manifestFile.fsName) +
		" --output_path " + _escapeSystemArg(resultFile.fsName);

	writeToLog("Appel Python analyzer: " + cmd);
	var systemOutput = "";
	try {
		systemOutput = system.callSystem(cmd) || "";
		if (systemOutput.length > 0) {
			writeToLog("  [PY] Sortie python: " + systemOutput);
		}
	} catch (eCall) {
		writeToLog("  [WARN] system.callSystem a échoué: " + eCall.toString());
		return null;
	}

	if (!resultFile.exists) {
		writeToLog("  [WARN] Résultat Python introuvable: " + resultFile.fsName);
		return null;
	}

	var content = "";
	try {
		resultFile.open("r");
		resultFile.encoding = "UTF-8";
		content = resultFile.read();
		resultFile.close();
	} catch (eRead) {
		try { resultFile.close(); } catch (eClose2) {}
		writeToLog("  [WARN] Impossible de lire le résultat Python: " + eRead.toString());
		return null;
	}

	try {
		var cleaned = content.replace(/^\uFEFF/, '');
		var parsed = eval('(' + cleaned + ')');
		if (parsed && parsed.error) {
			writeToLog("  [WARN] Erreur Python: " + parsed.error);
			return null;
		}
		writeToLog("  [PY] Résultats valides reçus (layers=" + Object.keys(parsed).length + ")");
		return parsed;
	} catch (eParse) {
		writeToLog("  [WARN] Parsing résultat Python échoué: " + eParse.toString());
		return null;
	}
}

// --- Polyfill JSON sécurisé (json2.js simplifié) ---
if (typeof JSON === 'undefined' || !JSON) {
	JSON = {};
}

if (typeof JSON.parse !== 'function') {
	(function() {
		'use strict';
		var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
		JSON.parse = function(text, reviver) {
			var j;
			function walk(holder, key) {
				var k, v, value = holder[key];
				if (value && typeof value === 'object') {
					for (k in value) {
						if (Object.prototype.hasOwnProperty.call(value, k)) {
							v = walk(value, k);
							if (v !== undefined) {
								value[k] = v;
							} else {
								delete value[k];
							}
						}
					}
				}
				return reviver.call(holder, key, value);
			}
			cx.lastIndex = 0;
			if (cx.test(text)) {
				text = text.replace(cx, function(a) {
					return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
				});
			}
			if (/^[\],:{}\s]*$/.test(
				text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
					.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
					.replace(/(?:^|:|,)(?:\s*\[)+/g, '')
			)) {
				j = eval('(' + text + ')');
				return typeof reviver === 'function' ? walk({'': j}, '') : j;
			}
			throw new SyntaxError('JSON.parse');
		};
	}());
}

var logFile = null;

 function formatDateForFilename(dateObj) {
	function pad2(n) {
		return (n < 10 ? "0" : "") + n;
	}
	return dateObj.getFullYear() + "-" + pad2(dateObj.getMonth() + 1) + "-" + pad2(dateObj.getDate()) + "_" + pad2(dateObj.getHours()) + "-" + pad2(dateObj.getMinutes()) + "-" + pad2(dateObj.getSeconds());
 }

function initLog() {
	try {
		var folder = Folder(CONFIG.LOG_FOLDER);
		if (!folder.exists) {
			try {
				folder.create();
			} catch (e) {}
		}
		if (!folder.exists) {
			folder = Folder.temp;
		}
		var logFilePath = folder.fsName + "/final_recenter_script_log_" + formatDateForFilename(new Date()) + ".txt";
		logFile = new File(logFilePath);
		logFile.encoding = "UTF-8";
		logFile.open("w");
		logFile.writeln("--- Début du log du Script Final v4.7 (Bbox Support) : " + new Date().toString() + " ---");
		logFile.writeln("--- Fichier : " + logFile.fsName + " ---");
		return true;
	} catch (e) {
		return false;
	}
}

function writeToLog(message) {
	if (logFile) {
		logFile.writeln("[" + new Date().toLocaleTimeString() + "] " + message);
	}
}

function closeLog() {
	if (logFile) {
		logFile.writeln("--- Fin du log ---");
		logFile.close();
	}
}

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

 function isReducedTrackingJsonFile(fileObj) {
	if (!fileObj) return false;
	try {
		return endsWithIgnoreCase(fileObj.name, "_tracking.json");
	} catch (e) {
		return false;
	}
 }

 function isAePreprocessedJsonFile(fileObj) {
	if (!fileObj) return false;
	try {
		return endsWithIgnoreCase(fileObj.name, "_ae.json");
	} catch (e) {
		return false;
	}
 }

 function readAndParseJsonRoot(filePath) {
	var file = new File(filePath);
	if (!file.exists) {
		return null;
	}
	var content = "";
	file.open("r");
	file.encoding = "UTF-8";
	content = file.read();
	file.close();
	try {
		var cleanedContent = content.replace(/^\uFEFF/, '');
		// OPTIMISATION 2: Utiliser eval() au lieu du polyfill JSON.parse
		// C'est sécuritaire ici car on lit un fichier local généré par notre pipeline
		return eval('(' + cleanedContent + ')');
	} catch (e) {
		writeToLog("  [ERROR] Échec du parsing JSON (root) pour '" + filePath + "' : " + e.toString());
		return null;
	}
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
		return {
			min: 0,
			max: 0,
			spread: 0,
			average: 0,
			count: 0
		};
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
		average: sum / numberArray.length,
		count: numberArray.length
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
	if (!CONFIG.ENABLE_CONFIDENCE_WEIGHTING) return presence;
	var w = parseFloat(CONFIG.CONFIDENCE_WEIGHT);
	if (isNaN(w) || w < 0) w = 0;
	return presence * (1 + (clamp01(avg_confidence) * w));
}

function findMaxFrameNumberInJsonContent(content) {
	if (!content) return 0;
	var tag = '"frame":';
	var pos = content.lastIndexOf(tag);
	while (pos !== -1) {
		var i = pos + tag.length;
		while (i < content.length) {
			var ch = content.charAt(i);
			if (ch !== ' ' && ch !== '\t' && ch !== '\n' && ch !== '\r') break;
			i++;
		}
		var j = i;
		while (j < content.length) {
			var c = content.charAt(j);
			if (c < '0' || c > '9') break;
			j++;
		}
		if (j > i) {
			var n = parseInt(content.substring(i, j), 10);
			if (!isNaN(n)) return n;
		}
		pos = content.lastIndexOf(tag, pos - 1);
	}
	return 0;
}

function removeAllKeys(property) {
	if (property.numKeys > 0) {
		for (var k = property.numKeys; k >= 1; k--) {
			try {
				property.removeKey(k);
			} catch (e) {
				writeToLog("  [WARN] Impossible de supprimer la clé " + k + " : " + e.toString());
			}
		}
	}
}

function findJsonAudioForVideoJson(videoJsonFile) {
	if (!videoJsonFile || !videoJsonFile.exists) {
		return null;
	}
	var videoJsonName = "";
	try {
		videoJsonName = decodeURI(videoJsonFile.name);
	} catch (e) {
		videoJsonName = videoJsonFile.name;
	}
	var videoJsonBaseName = videoJsonName.substring(0, videoJsonName.lastIndexOf("."));
	if (!videoJsonBaseName) {
		return null;
	}
	var audioJsonNameExpected = videoJsonBaseName + "_audio.json";
	var potentialAudioJsonFile = new File(videoJsonFile.path + "/" + audioJsonNameExpected);
	if (potentialAudioJsonFile.exists) {
		return potentialAudioJsonFile;
	}

	if (videoJsonBaseName.toLowerCase().indexOf("_tracking") === videoJsonBaseName.length - 9) {
		var baseWithoutTracking = videoJsonBaseName.substring(0, videoJsonBaseName.length - 9);
		if (baseWithoutTracking) {
			var audioNameWithoutTracking = baseWithoutTracking + "_audio.json";
			var altAudioJsonFile = new File(videoJsonFile.path + "/" + audioNameWithoutTracking);
			if (altAudioJsonFile.exists) {
				return altAudioJsonFile;
			}
		}
	}

	return null;
}

function readAndParseJson(filePath) {
	var file = new File(filePath);
	if (!file.exists) {
		return null;
	}
	var content = "";
	file.open("r");
	file.encoding = "UTF-8";
	content = file.read();
	file.close();
	try {
		var cleanedContent = content.replace(/^\uFEFF/, '');
		// OPTIMISATION 2: Utiliser eval() au lieu du polyfill JSON.parse
		// C'est sécuritaire ici car on lit un fichier local généré par notre pipeline
		var data = eval('(' + cleanedContent + ')');
		
		for (var i = 0; i < CONFIG.JSON_FIELDS.FRAMES.length; i++) {
			var fieldName = CONFIG.JSON_FIELDS.FRAMES[i];
			if (data[fieldName]) {
				return data[fieldName];
			}
		}
		return data;
	} catch (e) {
		writeToLog("  [ERROR] Échec du parsing JSON pour '" + filePath + "' : " + e.toString());
		return null;
	}
}

// --- Fonction utilitaire pour tester des variantes de noms de fichiers JSON ---
function tryJsonVariants(docsFolder, baseName) {
	if (!baseName) return null;
	
	var variants = [
		baseName + "_ae.json",
		baseName + "_tracking.json",
		baseName + ".json"
	];
	
	// Si le baseName contient déjà "_tracking", tester aussi sans
	if (baseName.toLowerCase().indexOf("_tracking") === baseName.length - 9) {
		var baseWithoutTracking = baseName.substring(0, baseName.length - 9);
		if (baseWithoutTracking) {
			variants.push(baseWithoutTracking + "_ae.json");
			variants.push(baseWithoutTracking + "_tracking.json");
			variants.push(baseWithoutTracking + ".json");
		}
	}
	
	for (var i = 0; i < variants.length; i++) {
		var jsonFile = new File(docsFolder.fsName + "/" + variants[i]);
		if (jsonFile.exists) {
			return jsonFile;
		}
	}
	
	return null;
}

// --- Détection automatique de fichiers (Robuste) ---
function findJsonForActiveComp() {
	var comp = app.project.activeItem;
	if (!comp) return null;
	if (app.project.file) {
		var projectFolder = app.project.file.parent;
		// Support both structures:
		// - Old: AEP at root => <root>/docs
		// - New: AEP under "projets" => <root>/docs (sibling of "projets")
		var docsFolderCandidates = [];
		// Old structure or if docs is next to the AEP file
		docsFolderCandidates.push(Folder(projectFolder.fsName + "/docs"));
		// New structure: one level up from the AEP folder (e.g., from .../projets to .../docs)
		if (projectFolder.parent) {
			docsFolderCandidates.push(Folder(projectFolder.parent.fsName + "/docs"));
		}

		for (var d = 0; d < docsFolderCandidates.length; d++) {
			var docsFolder = docsFolderCandidates[d];
			if (!docsFolder.exists) continue;
			for (var i = 1; i <= comp.numLayers; i++) {
				var layer = comp.layer(i);
				if (layer.source && layer.source.file) {
					var sourceFileName = "";
					try {
						sourceFileName = decodeURI(layer.source.file.name);
					} catch (e) {
						sourceFileName = layer.source.file.name;
					}
					var baseName = sourceFileName.substring(0, sourceFileName.lastIndexOf("."));
					var foundJsonFile = tryJsonVariants(docsFolder, baseName);
					if (foundJsonFile) {
						writeToLog("Fichier JSON Vidéo auto-détecté : " + foundJsonFile.fsName);
						return foundJsonFile;
					}
				}
			}
		}
	}
	writeToLog("Aucun fichier JSON correspondant n'a été trouvé automatiquement.");
	return null;
}

// --- PARSER MANUSCRIT v2.0 (Corrigé et Robuste) ---
function extractJsonField(objectString, fieldName) {
	var searchKey = '"' + fieldName + '":';
	var keyPos = objectString.indexOf(searchKey);
	if (keyPos === -1) return null;

	var valueStartPos = keyPos + searchKey.length;
	var firstChar = "";
	for (var i = valueStartPos; i < objectString.length; i++) { // Boucle pour ignorer les espaces
		firstChar = objectString.charAt(i);
		if (firstChar !== " " && firstChar !== "\t" && firstChar !== "\n" && firstChar !== "\r") break;
		i++;
	}

	if (firstChar === '"') { // C'est une chaîne de caractères
		var strStart = valueStartPos + 1;
		var valueEndPos = -1;
		for (var j = strStart; j < objectString.length; j++) {
			if (objectString.charAt(j) === '"') {
				var backslashCount = 0;
				for (var b = j - 1; b >= strStart && objectString.charAt(b) === '\\'; b--) {
					backslashCount++;
				}
				if (backslashCount % 2 === 0) {
					valueEndPos = j;
					break;
				}
			}
		}
		if (valueEndPos === -1) return null;
		var raw = objectString.substring(strStart, valueEndPos);
		return raw.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
	} else { // C'est un nombre, un booléen, etc.
		var endChars = [',', '}', ']'];
		var valueEndPos = -1;
		for (var i = 0; i < endChars.length; i++) {
			var pos = objectString.indexOf(endChars[i], valueStartPos);
			if (pos !== -1 && (valueEndPos === -1 || pos < valueEndPos)) {
				valueEndPos = pos;
			}
		}
		if (valueEndPos === -1) return null;
		return objectString.substring(valueStartPos, valueEndPos).replace(/\s/g, '');
	}
}

// OPTIMISATION 3: Version rapide pour JSON générés par machine (formatage standard)
function extractJsonFieldFast(str, key) {
	// Version simplifiée qui assume un JSON standard sans espaces bizarres autour des :
	var keyStr = '"' + key + '":';
	var idx = str.indexOf(keyStr);
	if (idx === -1) return null;
	
	var start = idx + keyStr.length;
	var valueFirstChar = str.charAt(start);
	
	// Si c'est un nombre (cas bbox, confidence, x...)
	if (valueFirstChar !== '"') { 
		var end = start;
		while (end < str.length) {
			var c = str.charAt(end);
			if (c === ',' || c === '}') break;
			end++;
		}
		return str.substring(start, end);
	} 
	// Si c'est une string (cas id, label...)
	else {
		// Sauter le premier guillemet
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

function indexReducedTrackingFrames(framesArray) {
	var extractedData = {};
	var maxFrameSeen = 0;
	if (!framesArray || !(framesArray instanceof Array)) {
		return { dataByFrame: extractedData, maxFrame: maxFrameSeen };
	}
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

			if (!extractedData[frameNum]) {
				extractedData[frameNum] = [];
			}
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

function optimizedScanEngineFromFile(fileObj, chunkSizeChars, minFrame, maxFrame) {
	writeToLog("Début du scan streaming optimisé (Plage: " + (minFrame||0) + " - " + (maxFrame||"Fin") + ")...");
	var extractedData = {};
	var maxFrameSeen = 0;
	var buffer = "";
	var searchFromIndex = 0;
	var tailKeep = 64 * 1024;
	var limit = chunkSizeChars || CONFIG.JSON_CHUNK_SIZE_CHARS;
	var useRange = (minFrame !== undefined && maxFrame !== undefined);
	try {
		fileObj.open("r");
		fileObj.encoding = "UTF-8";
		while (!fileObj.eof) {
			var chunk = "";
			while (!fileObj.eof && chunk.length < limit) {
				var line = "";
				try {
					line = fileObj.readln();
				} catch (eLine) {
					line = "";
				}
				chunk += line + "\n";
			}
			if (!chunk || chunk.length === 0) break;
			if (buffer.length === 0) {
				chunk = chunk.replace(/^\uFEFF/, '');
			}
			buffer += chunk;

			while (searchFromIndex < buffer.length) {
				var trackedObjectsTagPos = buffer.indexOf('"tracked_objects":', searchFromIndex);
				if (trackedObjectsTagPos === -1) {
					break;
				}
				var arrayStartPos = buffer.indexOf('[', trackedObjectsTagPos);
				if (arrayStartPos === -1) {
					break;
				}
				var frameTagPos = buffer.lastIndexOf('"frame":', trackedObjectsTagPos);
				if (frameTagPos === -1) {
					searchFromIndex = trackedObjectsTagPos + 1;
					continue;
				}
				var frameNumEndPos = buffer.indexOf(',', frameTagPos);
				if (frameNumEndPos === -1) {
					break;
				}
				var frameNum = parseInt(buffer.substring(frameTagPos + 8, frameNumEndPos), 10);
				if (isNaN(frameNum)) {
					searchFromIndex = trackedObjectsTagPos + 1;
					continue;
				}

				// OPTIMISATION MAJEURE: Filtrage par plage de frames
				if (useRange) {
					if (frameNum < minFrame || frameNum > maxFrame) {
						// On a trouvé une frame, mais elle ne nous intéresse pas.
						// On doit sauter tout le bloc [ ... ] de tracked_objects pour ne pas le parser.
						var arrayStartPosSkip = buffer.indexOf('[', trackedObjectsTagPos);
						if (arrayStartPosSkip !== -1) {
							var arrayEndPosSkip = _findMatchingBracket(buffer, arrayStartPosSkip);
							if (arrayEndPosSkip !== -1) {
								// On saute directement après le tableau d'objets
								searchFromIndex = arrayEndPosSkip + 1;
								continue;
							}
						}
						// Si le buffer est coupé en plein milieu du tableau, on attend la suite
						break; 
					}
				}

				if (frameNum > maxFrameSeen) maxFrameSeen = frameNum;

				var arrayEndPos = _findMatchingBracket(buffer, arrayStartPos);
				if (arrayEndPos === -1) {
					break;
				}

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
							if (!extractedData[frameNum]) {
								extractedData[frameNum] = [];
							}
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

				if (searchFromIndex > 0 && searchFromIndex > tailKeep) {
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
		writeToLog("  [ERROR] Scan streaming échoué : " + e.toString());
	} finally {
		try { fileObj.close(); } catch (e2) {}
	}
	writeToLog("Scan streaming vidéo terminé.");
	return { dataByFrame: extractedData, maxFrame: maxFrameSeen };
}

function loadVideoTrackingData(videoJsonFile, minFrame, maxFrame) {
	if (!videoJsonFile || !videoJsonFile.exists) {
		return { dataByFrame: {}, maxFrame: 0 };
	}
	if (isAePreprocessedJsonFile(videoJsonFile)) {
		try {
			var root = readAndParseJsonRoot(videoJsonFile.fsName);
			if (root && root.dataByFrame) {
				var idx = {
					dataByFrame: root.dataByFrame || {},
					maxFrame: root.maxFrame || 0,
					tracking_analytics: root.tracking_analytics || null,
					expression_summary: root.expression_summary || null,
					temporal_alignment: root.temporal_alignment || null,
					audioByFrame: root.audioByFrame || {},
					audioMaxFrame: root.audioMaxFrame || null,
					speaker_embeddings: root.speaker_embeddings || null
				};
				return idx;
			}
		} catch (e) {
			writeToLog("  [WARN] Impossible de lire le JSON pré-traité AE. Fallback.");
		}
	}
	try {
		if (videoJsonFile.length && videoJsonFile.length < CONFIG.MAX_FULL_JSON_READ_BYTES) {
			var root = readAndParseJsonRoot(videoJsonFile.fsName);
			if (root && root.frames_analysis && (root.frames_analysis instanceof Array)) {
				var idx = indexReducedTrackingFrames(root.frames_analysis);
				idx.tracking_analytics = root.tracking_analytics || null;
				idx.expression_summary = root.expression_summary || null;
				idx.temporal_alignment = root.temporal_alignment || null;
				return idx;
			}
		}
	} catch (e) {
		writeToLog("  [WARN] Impossible de lire le tracking réduit via JSON.parse. Fallback streaming.");
	}
	return optimizedScanEngineFromFile(videoJsonFile, CONFIG.JSON_CHUNK_SIZE_CHARS, minFrame, maxFrame);
}

function optimizedScanEngine(content) {
	writeToLog("Début du scan séquentiel optimisé...");
	var extractedData = {};
	var searchFromIndex = 0;
	var findMatchingBrace = function(str, startIndex) {
		var c = 1;
		for (var i = startIndex + 1, len = str.length; i < len; i++) {
			if (str[i] === '{') c++;
			else if (str[i] === '}') c--;
			if (c === 0) return i;
		}
		return -1;
	};
	var findMatchingBracket = function(str, startIndex) {
		var c = 1;
		for (var i = startIndex + 1, len = str.length; i < len; i++) {
			if (str[i] === '[') c++;
			else if (str[i] === ']') c--;
			if (c === 0) return i;
		}
		return -1;
	};
	while (searchFromIndex < content.length) {
		var trackedObjectsTagPos = content.indexOf('"tracked_objects":', searchFromIndex);
		if (trackedObjectsTagPos === -1) break;
		var arrayStartPos = content.indexOf('[', trackedObjectsTagPos);
		if (arrayStartPos === -1) break;
		var frameTagPos = content.lastIndexOf('"frame":', trackedObjectsTagPos);
		if (frameTagPos === -1) {
			searchFromIndex = arrayStartPos + 1;
			continue;
		}
		var frameNumEndPos = content.indexOf(',', frameTagPos);
		if (frameNumEndPos === -1) {
			searchFromIndex = arrayStartPos + 1;
			continue;
		}
		var frameNum = parseInt(content.substring(frameTagPos + 8, frameNumEndPos), 10);
		if (isNaN(frameNum)) {
			searchFromIndex = arrayStartPos + 1;
			continue;
		}
		var arrayEndPos = findMatchingBracket(content, arrayStartPos);
		if (arrayEndPos === -1) break;
		var internalSearchIndex = arrayStartPos;
		while (internalSearchIndex < arrayEndPos) {
			var objectStartPos = content.indexOf('{', internalSearchIndex);
			if (objectStartPos === -1 || objectStartPos > arrayEndPos) break;
			var objectEndPos = findMatchingBrace(content, objectStartPos);
			if (objectEndPos === -1 || objectEndPos > arrayEndPos) break;
			var objectString = content.substring(objectStartPos, objectEndPos + 1);
			if (objectString.indexOf('"face_landmarker"') > -1 || objectString.indexOf('"person"') > -1) {
				var id = extractJsonFieldFast(objectString, "id");
				var centroid_x = parseFloat(extractJsonFieldFast(objectString, "centroid_x") || extractJsonFieldFast(objectString, "x_coordinate"));
				var bbox_width = parseFloat(extractJsonFieldFast(objectString, "bbox_width"));
				var bbox_height = parseFloat(extractJsonFieldFast(objectString, "bbox_height"));
				var confidence = parseFloat(extractJsonFieldFast(objectString, "confidence"));
				if (isNaN(confidence)) confidence = 0;
				
				if (id !== null && id !== undefined && id !== "" && !isNaN(centroid_x)) {
					if (!extractedData[frameNum]) {
						extractedData[frameNum] = [];
					}
					
					// Calcul de la surface de la bbox (0 si données manquantes)
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
	}
	writeToLog("Scan vidéo terminé.");
	return extractedData;
}

// ===================================================================================
// PARTIE 2 : SCRIPT PRINCIPAL
// ===================================================================================

(function main() {
	if (!initLog()) return;

	var scriptName = "Recadrage Statique Intelligent v4.5 (Bbox Support)";
	app.beginUndoGroup(scriptName);
	app.beginSuppressDialogs();
	writeToLog("--- Début du script : " + scriptName + " ---");

	try {
		var comp = app.project.activeItem;
		if (!(comp && comp instanceof CompItem)) {
			throw new Error("Veuillez sélectionner une composition active.");
		}
		var frameRate = comp.frameRate;
		var compMaxFrame = Math.round(comp.duration * frameRate);
		var compCenterX = comp.width / 2;

		// OPTIMISATION 1: Calculer la plage globale de frames utiles depuis tous les calques
		var globalMinFrame = compMaxFrame; // Initialiser haut
		var globalMaxFrame = 0;
		for (var i = 1; i <= comp.numLayers; i++) {
			var l = comp.layer(i);
			if (l.hasVideo && !l.locked) {
				var inF = Math.floor(l.inPoint * frameRate);
				var outF = Math.ceil(l.outPoint * frameRate);
				if (inF < globalMinFrame) globalMinFrame = inF;
				if (outF > globalMaxFrame) globalMaxFrame = outF;
			}
		}
		// Marge de sécurité (padding)
		globalMinFrame = Math.max(0, globalMinFrame - 10);
		globalMaxFrame += 10;
		writeToLog("Plage de frames utile calculée : " + globalMinFrame + " - " + globalMaxFrame);

		var videoJsonFile = findJsonForActiveComp();
		if (!videoJsonFile) {
			videoJsonFile = File.openDialog("Aucun JSON n'a pu être détecté. Veuillez le sélectionner manuellement.", "*.json", false);
		}
		if (!videoJsonFile || !videoJsonFile.exists) {
			throw new Error("Opération annulée.");
		}

		var safeVideoJsonPath = "";
		try {
			safeVideoJsonPath = decodeURI(videoJsonFile.fsName);
		} catch (e) {
			safeVideoJsonPath = videoJsonFile.fsName;
		}
		writeToLog("Lecture du fichier VIDÉO " + safeVideoJsonPath + "...");
		var pythonResults = tryRunPythonAnalyzer(comp, frameRate, videoJsonFile);
		if (pythonResults) {
			writeToLog("Mode Python analyzer actif: application directe des résultats (" + Object.keys(pythonResults).length + " calques).");
			for (var layerId in pythonResults) {
				if (!pythonResults.hasOwnProperty(layerId)) continue;
				var idx = parseInt(layerId, 10);
				if (isNaN(idx)) continue;
				var layer = comp.layer(idx);
				if (!(layer instanceof AVLayer && layer.hasVideo && !layer.nullLayer) || layer.locked) {
					continue;
				}
				var res = pythonResults[layerId];
				if (!res) continue;
				var centerToAim = parseFloat(res.center_x);
				if (isNaN(centerToAim)) continue;
				var labelToApply = parseInt(res.label_color, 10);
				if (isNaN(labelToApply)) labelToApply = CONFIG.LABEL_STABLE;
				layer.label = labelToApply;
				var transform = layer.property("Transform");
				var positionProp = transform.property("Position");
				var anchorPointProp = transform.property("Anchor Point");
				removeAllKeys(positionProp);
				removeAllKeys(anchorPointProp);
				var originalPos = positionProp.value;
				var originalAnchor = anchorPointProp.value;
				anchorPointProp.setValue([centerToAim, originalAnchor[1], originalAnchor.length > 2 ? originalAnchor[2] : 0]);
				positionProp.setValue([compCenterX, originalPos[1], originalPos.length > 2 ? originalPos[2] : 0]);
				writeToLog("  - [PY] Calque=" + layer.name + " center_x=" + centerToAim.toFixed(1) + " label=" + labelToApply + " reason=" + (res.reason || "") + " id=" + (res.selected_id || ""));
			}
			writeToLog("--- Fin (Python analyzer) ---");
			return;
		}

		var videoScanResult = loadVideoTrackingData(videoJsonFile, globalMinFrame, globalMaxFrame);
		var videoDataByFrame = videoScanResult.dataByFrame;
		if (videoScanResult && videoScanResult.temporal_alignment && videoScanResult.temporal_alignment.warnings && videoScanResult.temporal_alignment.warnings.length > 0) {
			writeToLog("  [WARN] temporal_alignment: " + videoScanResult.temporal_alignment.warnings.join(", "));
		}
		if (videoScanResult && videoScanResult.tracking_analytics && videoScanResult.tracking_analytics.global) {
			var g = videoScanResult.tracking_analytics.global;
			writeToLog("  tracking_analytics: frames_total=" + g.frames_total + ", frames_with_objects=" + g.frames_with_objects + ", objects_total=" + g.objects_total);
		}
		var videoJsonMaxFrame = videoScanResult.maxFrame || 0;
		var videoMaxFrame = videoJsonMaxFrame || 0;
		if (videoMaxFrame === 0) {
			for (var frameKey in videoDataByFrame) {
				var parsedFrameNum = parseInt(frameKey, 10);
				if (!isNaN(parsedFrameNum) && parsedFrameNum > videoMaxFrame) {
					videoMaxFrame = parsedFrameNum;
				}
			}
		}
		if (typeof $.gc === 'function') {
			$.gc();
		}

		var audioDataByFrame = {};
		var audioMaxFrame = null;
		if (videoScanResult && videoScanResult.audioByFrame && (typeof videoScanResult.audioByFrame === 'object')) {
			try {
				audioDataByFrame = videoScanResult.audioByFrame;
				if (videoScanResult.audioMaxFrame !== null && videoScanResult.audioMaxFrame !== undefined) {
					audioMaxFrame = videoScanResult.audioMaxFrame;
				}
				writeToLog("Données audio chargées depuis JSON pré-traité AE (frames=" + Object.keys(audioDataByFrame).length + ").");
			} catch (e) {
				audioDataByFrame = {};
				audioMaxFrame = null;
			}
		} else {
			var audioJsonFile = findJsonAudioForVideoJson(videoJsonFile);
			if (audioJsonFile) {
				var audioData = readAndParseJson(audioJsonFile.fsName);
				if (audioData) {
					var audioMinFrame = null;
					audioMaxFrame = null;
					for (var i = 0, len = audioData.length; i < len; i++) {
						if (audioData[i] && audioData[i].frame !== null && audioData[i].frame !== undefined) {
							var audioFrameNum = parseInt(audioData[i].frame, 10);
							if (!isNaN(audioFrameNum)) {
								audioDataByFrame[audioFrameNum] = audioData[i].audio_info;
								if (audioMinFrame === null || audioFrameNum < audioMinFrame) audioMinFrame = audioFrameNum;
								if (audioMaxFrame === null || audioFrameNum > audioMaxFrame) audioMaxFrame = audioFrameNum;
							}
						}
					}
					var audioRangeInfo = (audioMinFrame !== null && audioMaxFrame !== null) ? (" (min=" + audioMinFrame + ", max=" + audioMaxFrame + ")") : "";
					writeToLog("Données audio chargées pour " + Object.keys(audioDataByFrame).length + " frames" + audioRangeInfo + ".");
				}
			} else {
				writeToLog("Aucun fichier audio trouvé.");
			}
		}

		var referenceMaxFrame = (audioMaxFrame !== null && audioMaxFrame !== undefined) ? audioMaxFrame : compMaxFrame;
		var videoReferenceMaxFrame = videoJsonMaxFrame > 0 ? videoJsonMaxFrame : videoMaxFrame;
		var videoFrameScale = 1;
		if (videoReferenceMaxFrame > 0 && referenceMaxFrame > 0) {
			var diffRatio = Math.abs(videoReferenceMaxFrame - referenceMaxFrame) / referenceMaxFrame;
			if (diffRatio > 0.05) {
				videoFrameScale = videoReferenceMaxFrame / referenceMaxFrame;
				writeToLog("  [WARN] Désalignement des frames détecté : videoMaxFrame=" + videoReferenceMaxFrame + ", refMaxFrame=" + referenceMaxFrame + ". Application d'un facteur de mapping videoFrameScale=" + videoFrameScale.toFixed(4) + ".");
			}
		}

		writeToLog("--- Début du traitement des calques ---");
		for (var i = 1; i <= comp.numLayers; i++) {
			var layer = comp.layer(i);
			if (!(layer instanceof AVLayer && layer.hasVideo && !layer.nullLayer) || layer.locked) {
				continue;
			}

			writeToLog("-> Calque : '" + layer.name + "'");
			var minFrame = Math.floor(layer.inPoint * frameRate);
			var maxFrame = Math.ceil(layer.outPoint * frameRate);

			var objectsInLayer = {};
			for (var frameNum = minFrame; frameNum <= maxFrame; frameNum++) {
				var videoFrameNum = frameNum;
				if (videoFrameScale !== 1) {
					videoFrameNum = Math.round(frameNum * videoFrameScale);
					if (videoFrameNum < 1) videoFrameNum = 1;
					if (videoReferenceMaxFrame > 0 && videoFrameNum > videoReferenceMaxFrame) videoFrameNum = videoReferenceMaxFrame;
				}
				var videoObjectsOnFrame = videoDataByFrame[videoFrameNum];
				var audioInfoOnFrame = audioDataByFrame[frameNum];
				if (videoObjectsOnFrame) {
					for (var j = 0, vLen = videoObjectsOnFrame.length; j < vLen; j++) {
						var obj = videoObjectsOnFrame[j];
						if (!objectsInLayer[obj.id]) {
							objectsInLayer[obj.id] = {
								id: obj.id,
								source: obj.source,
								label: obj.label,
								x_values: [],
								confidence_values: [],
								audio_confirm_count: 0,
								bbox_surfaces: [],
								total_bbox_surface: 0,
								avg_bbox_surface: 0,
								total_confidence: 0,
								avg_confidence: 0
							};
						}
						objectsInLayer[obj.id].x_values.push(obj.centroid_x);
						objectsInLayer[obj.id].bbox_surfaces.push(obj.bbox_surface);
						objectsInLayer[obj.id].total_bbox_surface += obj.bbox_surface;
						objectsInLayer[obj.id].confidence_values.push(obj.confidence);
						objectsInLayer[obj.id].total_confidence += obj.confidence;
						var isEligibleForAudioConfirm = (obj.source === "face_landmarker") || (obj.source === "object_detector" && obj.label === "person");
						if (isEligibleForAudioConfirm && audioInfoOnFrame && audioInfoOnFrame.is_speech_present && obj.video_speakers.length > 0) {
							var activeSpeakerLabels = normalizeToStringArray(audioInfoOnFrame.active_speaker_labels);
							for (var k = 0, sLen = obj.video_speakers.length; k < sLen; k++) {
								if (arrayContainsExactString(activeSpeakerLabels, obj.video_speakers[k])) {
									objectsInLayer[obj.id].audio_confirm_count++;
									break;
								}
							}
						}
					}
				}
			}
			if (Object.keys(objectsInLayer).length === 0) {
				writeToLog("  - Aucune donnée pertinente. Ignoré.");
				continue;
			}
			
			writeToLog("  - Objets détectés : " + Object.keys(objectsInLayer).length + " avec données bbox enrichies");

			var bestAudioCandidate = null,
				bestAudioPersonCandidate = null,
				bestFaceCandidate = null,
				bestPersonCandidate = null,
				bestFallbackCandidate = null;
			var maxAudioConfirm = 0,
				maxAudioPersonConfirm = 0,
				maxFacePresence = 0,
				maxPersonPresence = 0,
				maxFallbackPresence = 0;
			var maxAudioBboxSurface = 0,
				maxFaceBboxSurface = 0;
			
			// Calcul des moyennes de surface bbox ET sélection du meilleur candidat en une seule boucle
			for (var id in objectsInLayer) {
				var obj = objectsInLayer[id];
				obj.avg_bbox_surface = obj.bbox_surfaces.length > 0 ? obj.total_bbox_surface / obj.bbox_surfaces.length : 0;
				obj.avg_confidence = obj.confidence_values.length > 0 ? obj.total_confidence / obj.confidence_values.length : 0;
				var presence = obj.x_values.length;
				var presenceScore = computePresenceScore(presence, obj.avg_confidence);
				
				if (obj.source === "face_landmarker") {
					// Priorité 1 : Confirmation audio (uniquement si confirmations > 0)
					if (obj.audio_confirm_count > 0) {
						// Tie-breakers : 1) audio_confirm_count 2) présence 3) bbox
						if (obj.audio_confirm_count > maxAudioConfirm ||
							(obj.audio_confirm_count === maxAudioConfirm && presenceScore > (bestAudioCandidate ? computePresenceScore(bestAudioCandidate.x_values.length, bestAudioCandidate.avg_confidence) : 0)) ||
							(obj.audio_confirm_count === maxAudioConfirm && presenceScore === (bestAudioCandidate ? computePresenceScore(bestAudioCandidate.x_values.length, bestAudioCandidate.avg_confidence) : 0) && obj.avg_bbox_surface > maxAudioBboxSurface)) {
							bestAudioCandidate = obj;
							maxAudioConfirm = obj.audio_confirm_count;
							maxAudioBboxSurface = obj.avg_bbox_surface;
						}
					}
					
					// Priorité 2 : Face la plus présente avec bbox comme critère secondaire
					if (presenceScore > maxFacePresence || 
						(presenceScore === maxFacePresence && obj.avg_bbox_surface > maxFaceBboxSurface)) {
						bestFaceCandidate = obj;
						maxFacePresence = presenceScore;
						maxFaceBboxSurface = obj.avg_bbox_surface;
					}
				} else if (obj.source === "object_detector" && obj.label === "person") {
					// Priorité 1 bis : Confirmation audio sur une personne (si aucune face parlante n'est disponible)
					if (obj.audio_confirm_count > 0) {
						if (obj.audio_confirm_count > maxAudioPersonConfirm ||
							(obj.audio_confirm_count === maxAudioPersonConfirm && presenceScore > (bestAudioPersonCandidate ? computePresenceScore(bestAudioPersonCandidate.x_values.length, bestAudioPersonCandidate.avg_confidence) : 0))) {
							bestAudioPersonCandidate = obj;
							maxAudioPersonConfirm = obj.audio_confirm_count;
						}
					}

					if (presenceScore > maxPersonPresence) {
						bestPersonCandidate = obj;
						maxPersonPresence = presenceScore;
					}
				}

				if (presenceScore > maxFallbackPresence) {
					bestFallbackCandidate = obj;
					maxFallbackPresence = presenceScore;
				}
			}
			var targetObject = bestAudioCandidate || bestAudioPersonCandidate || bestFaceCandidate || bestPersonCandidate || bestFallbackCandidate;
			var reason = bestAudioCandidate ? "(basé sur confirmation audio - face)" : (bestAudioPersonCandidate ? "(basé sur confirmation audio - person)" : (bestFaceCandidate ? "(face la plus présente)" : (bestPersonCandidate ? "(personne la plus présente)" : "(fallback)")));
			var bboxInfo = targetObject.avg_bbox_surface > 0 ? " - bbox=" + Math.round(targetObject.avg_bbox_surface) + "px²" : "";
			var confInfo = " - conf=" + clamp01(targetObject.avg_confidence).toFixed(3);
			writeToLog("  - Cible : " + targetObject.id + " " + reason + bboxInfo + confInfo);
			if (videoScanResult && videoScanResult.tracking_analytics && videoScanResult.tracking_analytics.objects && videoScanResult.tracking_analytics.objects[targetObject.id]) {
				var tObj = videoScanResult.tracking_analytics.objects[targetObject.id];
				if (tObj.avg_confidence !== undefined && tObj.avg_confidence !== null) {
					writeToLog("  - analytics: avg_confidence=" + tObj.avg_confidence);
				}
				if (tObj.presence_ratio !== undefined && tObj.presence_ratio !== null) {
					writeToLog("  - analytics: presence_ratio=" + tObj.presence_ratio);
				}
			}
			if (videoScanResult && videoScanResult.expression_summary && videoScanResult.expression_summary.objects && videoScanResult.expression_summary.objects[targetObject.id]) {
				var eObj = videoScanResult.expression_summary.objects[targetObject.id];
				if (eObj.mean) {
					for (var kMean in eObj.mean) {
						writeToLog("  - expression_mean[" + kMean + "]=" + eObj.mean[kMean]);
					}
				}
				if (eObj.max) {
					for (var kMax in eObj.max) {
						writeToLog("  - expression_max[" + kMax + "]=" + eObj.max[kMax]);
					}
				}
			}

			var stats = calculateStats(targetObject.x_values);
			var centerToAim = stats.average;
			var spread = stats.spread;
			var labelToApply = (spread > CONFIG.SPREAD_THRESHOLD && targetObject.source === "face_landmarker") ? CONFIG.LABEL_HIGH_SPREAD : CONFIG.LABEL_STABLE;
			layer.label = labelToApply;

			var transform = layer.property("Transform");
			var positionProp = transform.property("Position");
			var anchorPointProp = transform.property("Anchor Point");
			removeAllKeys(positionProp);
			removeAllKeys(anchorPointProp);
			var originalPos = positionProp.value;
			var originalAnchor = anchorPointProp.value;
			anchorPointProp.setValue([centerToAim, originalAnchor[1], originalAnchor.length > 2 ? originalAnchor[2] : 0]);
			positionProp.setValue([compCenterX, originalPos[1], originalPos.length > 2 ? originalPos[2] : 0]);
			writeToLog("  - Centre=" + centerToAim.toFixed(1) + ", Label=" + labelToApply + ". Recadrage OK.");
		}

	} catch (e) {
		writeToLog("!!! ERREUR FATALE : " + e.toString());
		alert("Une erreur fatale est survenue : " + e.toString());
	} finally {
		app.endSuppressDialogs(false);
		app.endUndoGroup();
		alert(scriptName + " terminé !");
		writeToLog("--- Script terminé ---");
		closeLog();
	}
})();