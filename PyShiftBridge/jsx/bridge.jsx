/* ExtendScript (After Effects) helpers for PyShiftBridge.
 *
 * This file is loaded by the CEP panel via $.evalFile().
 */

(function () {
  if ($._PyShiftBridge) {
    return;
  }

  var MOD = {};

  MOD.getBridgeDir = function () {
    var dir = Folder.myDocuments.fsName + "/PyShiftAE_CEP_Bridge";
    var folder = new Folder(dir);
    if (!folder.exists) {
      folder.create();
    }
    return folder.fsName;
  };

  MOD._join = function (dir, name) {
    if (dir.charAt(dir.length - 1) === "/" || dir.charAt(dir.length - 1) === "\\") {
      return dir + name;
    }
    return dir + "/" + name;
  };

  MOD.ensureMailbox = function () {
    var dir = MOD.getBridgeDir();
    var req = new File(MOD._join(dir, "cep_to_py.json"));
    var resp = new File(MOD._join(dir, "py_to_cep.json"));

    if (!req.exists) {
      MOD._writeTextAtomic(req, "");
    }
    if (!resp.exists) {
      MOD._writeTextAtomic(resp, "");
    }

    return "OK";
  };

  MOD._writeTextAtomic = function (fileObj, text) {
    var tmp = new File(fileObj.path + "/" + fileObj.name + ".tmp");

    tmp.encoding = "UTF-8";
    if (!tmp.open("w")) {
      throw new Error("Cannot open temp file for writing: " + tmp.fsName);
    }
    tmp.write(text);
    tmp.close();

    // Replace
    if (fileObj.exists) {
      fileObj.remove();
    }

    // Rename tmp -> final (same directory)
    var ok = tmp.rename(fileObj.name);
    if (!ok) {
      throw new Error("Rename failed: " + tmp.fsName + " -> " + fileObj.fsName);
    }
  };

  MOD.writeMailboxAtomic = function (name, encodedPayload) {
    var dir = MOD.getBridgeDir();
    var fileObj = new File(MOD._join(dir, name));
    var payload = decodeURIComponent(encodedPayload);
    MOD._writeTextAtomic(fileObj, payload);
    return "OK";
  };

  MOD.readMailbox = function (name) {
    var dir = MOD.getBridgeDir();
    var fileObj = new File(MOD._join(dir, name));
    if (!fileObj.exists) {
      return "";
    }

    fileObj.encoding = "UTF-8";
    if (!fileObj.open("r")) {
      return "";
    }
    var content = fileObj.read();
    fileObj.close();

    if (!content) {
      return "";
    }

    // Encode for safe transport to CEP JS
    return encodeURIComponent(content);
  };

  MOD.selectionSignature = function () {
    try {
      var comp = app.project.activeItem;
      if (!(comp instanceof CompItem)) {
        return "NO_COMP";
      }
      if (comp.selectedLayers.length === 0) {
        return "NO_LAYER";
      }
      var l = comp.selectedLayers[0];
      return "LAYER:" + l.index + ":" + l.name;
    } catch (e) {
      return "ERR:" + e.toString();
    }
  };

  $._PyShiftBridge = MOD;
})();
