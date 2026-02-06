/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

if (typeof JSON !== "object") {
  JSON = {};
}
(function () {
  function _0x8cfex6(_0x8cfex7) {
    return _0x8cfex7 < 10 ? "0" + _0x8cfex7 : _0x8cfex7;
  }
  function _0x8cfex8() {
    return this.valueOf();
  }
  function _0x8cfexd(_0x8cfexe) {
    _0x8cfex4.lastIndex = 0;
    return _0x8cfex4.test(_0x8cfexe)
      ? '"' +
          _0x8cfexe.replace(_0x8cfex4, function (_0x8cfexf) {
            var _0x8cfex10 = _0x8cfexb[_0x8cfexf];
            return typeof _0x8cfex10 === "string"
              ? _0x8cfex10
              : "\\u" +
                  ("0000" + _0x8cfexf.charCodeAt(0).toString(16)).slice(-4);
          }) +
          '"'
      : '"' + _0x8cfexe + '"';
  }
  function _0x8cfex11(_0x8cfex12, _0x8cfex13) {
    var _0x8cfex18 = _0x8cfex9;
    var _0x8cfex1a = _0x8cfex13[_0x8cfex12];
    if (
      _0x8cfex1a &&
      typeof _0x8cfex1a === "object" &&
      typeof _0x8cfex1a.toJSON === "function"
    ) {
      _0x8cfex1a = _0x8cfex1a.toJSON(_0x8cfex12);
    }
    if (typeof _0x8cfexc === "function") {
      _0x8cfex1a = _0x8cfexc.call(_0x8cfex13, _0x8cfex12, _0x8cfex1a);
    }
    switch (typeof _0x8cfex1a) {
      case "string":
        return _0x8cfexd(_0x8cfex1a);
      case "number":
        return isFinite(_0x8cfex1a) ? String(_0x8cfex1a) : "null";
      case "boolean":
      case "null":
        return String(_0x8cfex1a);
      case "object":
        if (!_0x8cfex1a) {
          return "null";
        }
        _0x8cfex9 += _0x8cfexa;
        _0x8cfex19 = [];
        if (Object.prototype.toString.apply(_0x8cfex1a) === "[object Array]") {
          _0x8cfex17 = _0x8cfex1a.length;
          for (var _0x8cfex14 = 0; _0x8cfex14 < _0x8cfex17; _0x8cfex14 += 1) {
            _0x8cfex19[_0x8cfex14] =
              _0x8cfex11(_0x8cfex14, _0x8cfex1a) || "null";
          }
          _0x8cfex16 =
            _0x8cfex19.length === 0
              ? "[]"
              : _0x8cfex9
                ? "[\n" +
                  _0x8cfex9 +
                  _0x8cfex19.join(",\n" + _0x8cfex9) +
                  "\n" +
                  _0x8cfex18 +
                  "]"
                : "[" + _0x8cfex19.join(",") + "]";
          _0x8cfex9 = _0x8cfex18;
          return _0x8cfex16;
        }
        if (_0x8cfexc && typeof _0x8cfexc === "object") {
          _0x8cfex17 = _0x8cfexc.length;
          for (var _0x8cfex14 = 0; _0x8cfex14 < _0x8cfex17; _0x8cfex14 += 1) {
            if (typeof _0x8cfexc[_0x8cfex14] === "string") {
              _0x8cfex15 = _0x8cfexc[_0x8cfex14];
              _0x8cfex16 = _0x8cfex11(_0x8cfex15, _0x8cfex1a);
              if (_0x8cfex16) {
                _0x8cfex19.push(
                  _0x8cfexd(_0x8cfex15) + _0x8cfex9 ? ": " : ":" + _0x8cfex16,
                );
              }
            }
          }
        } else {
          for (var _0x8cfex15 in _0x8cfex1a) {
            if (Object.prototype.hasOwnProperty.call(_0x8cfex1a, _0x8cfex15)) {
              _0x8cfex16 = _0x8cfex11(_0x8cfex15, _0x8cfex1a);
              if (_0x8cfex16) {
                _0x8cfex19.push(
                  _0x8cfexd(_0x8cfex15) + _0x8cfex9 ? ": " : ":" + _0x8cfex16,
                );
              }
            }
          }
        }
        _0x8cfex16 =
          _0x8cfex19.length === 0
            ? "{}"
            : _0x8cfex9
              ? "{\n" +
                _0x8cfex9 +
                _0x8cfex19.join(",\n" + _0x8cfex9) +
                "\n" +
                _0x8cfex18 +
                "}"
              : "{" + _0x8cfex19.join(",") + "}";
        _0x8cfex9 = _0x8cfex18;
        return _0x8cfex16;
    }
  }
  ("use strict");
  var _0x8cfex0 = /^[\],:{}\s]*$/;
  var _0x8cfex1 = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
  var _0x8cfex2 =
    /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var _0x8cfex3 = /(?:^|:|,)(?:\s*\[)+/g;
  var _0x8cfex4 =
    /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  var _0x8cfex5 =
    /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  if (typeof Date.prototype.toJSON !== "function") {
    Date.prototype.toJSON = function () {
      return isFinite(this.valueOf())
        ? this.getUTCFullYear() +
            "-" +
            _0x8cfex6(this.getUTCMonth() + 1) +
            "-" +
            _0x8cfex6(this.getUTCDate()) +
            "T" +
            _0x8cfex6(this.getUTCHours()) +
            ":" +
            _0x8cfex6(this.getUTCMinutes()) +
            ":" +
            _0x8cfex6(this.getUTCSeconds()) +
            "Z"
        : null;
    };
    Boolean.prototype.toJSON = _0x8cfex8;
    Number.prototype.toJSON = _0x8cfex8;
    String.prototype.toJSON = _0x8cfex8;
  }
  if (typeof JSON.stringify !== "function") {
    _0x8cfexb = {
      "\b": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\",
    };
    JSON.stringify = function (_0x8cfex1a, _0x8cfex1b, _0x8cfex1c) {
      _0x8cfex9 = "";
      _0x8cfexa = "";
      if (typeof _0x8cfex1c === "number") {
        for (var _0x8cfex14 = 0; _0x8cfex14 < _0x8cfex1c; _0x8cfex14 += 1) {
          _0x8cfexa += " ";
        }
      } else {
        if (typeof _0x8cfex1c === "string") {
          _0x8cfexa = _0x8cfex1c;
        }
      }
      _0x8cfexc = _0x8cfex1b;
      if (
        _0x8cfex1b &&
        typeof _0x8cfex1b !== "function" &&
        (typeof _0x8cfex1b !== "object" ||
          typeof _0x8cfex1b.length !== "number")
      ) {
        throw new Error("JSON.stringify");
      }
      return _0x8cfex11("", { "": _0x8cfex1a });
    };
  }
  if (typeof JSON.parse !== "function") {
    JSON.parse = function (_0x8cfex1d, _0x8cfex1e) {
      function _0x8cfex20(_0x8cfex13, _0x8cfex12) {
        var _0x8cfex1a = _0x8cfex13[_0x8cfex12];
        if (_0x8cfex1a && typeof _0x8cfex1a === "object") {
          for (var _0x8cfex15 in _0x8cfex1a) {
            if (Object.prototype.hasOwnProperty.call(_0x8cfex1a, _0x8cfex15)) {
              _0x8cfex16 = _0x8cfex20(_0x8cfex1a, _0x8cfex15);
              if (_0x8cfex16 !== undefined) {
                _0x8cfex1a[_0x8cfex15] = _0x8cfex16;
              } else {
                delete _0x8cfex1a[_0x8cfex15];
              }
            }
          }
        }
        return _0x8cfex1e.call(_0x8cfex13, _0x8cfex12, _0x8cfex1a);
      }
      _0x8cfex1d = String(_0x8cfex1d);
      _0x8cfex5.lastIndex = 0;
      if (_0x8cfex5.test(_0x8cfex1d)) {
        _0x8cfex1d = _0x8cfex1d.replace(_0x8cfex5, function (_0x8cfexf) {
          return (
            "\\u" + ("0000" + _0x8cfexf.charCodeAt(0).toString(16)).slice(-4)
          );
        });
      }
      if (
        _0x8cfex0.test(
          _0x8cfex1d
            .replace(_0x8cfex1, "@")
            .replace(_0x8cfex2, "]")
            .replace(_0x8cfex3, ""),
        )
      ) {
        _0x8cfex1f = eval("(" + _0x8cfex1d + ")");
        return typeof _0x8cfex1e === "function"
          ? _0x8cfex20({ "": _0x8cfex1f }, "")
          : _0x8cfex1f;
      }
      throw new SyntaxError("JSON.parse");
    };
  }
})();
(function () {
  var _0x8cfex22 = false;
  var _0x8cfex23 = "";
  var _0x8cfex25 = "";
  var _0x8cfex26 = "";
  var _0x8cfex28 = "";
  var _0x8cfex29 = [];
  var _0x8cfex2a = 0;
  var _0x8cfex2b = 0;
  var _0x8cfex2c = false;
  var _0x8cfex2d = false;
  var _0x8cfex2e = -1;
  var _0x8cfex2f = {};
  var _0x8cfex30 = [];
  var _0x8cfex33 = "main";
  var _0x8cfex34 = new Date();
  var _0x8cfex35 = new Date();
  $.jt.pio = {
    AEPXtoAME: function (_0x8cfex175, _0x8cfex176) {
      var _0x8cfex177 = XML.prettyPrinting;
      XML.prettyPrinting = false;
      var _0x8cfex178 = [];
      _0x8cfex176.encoding = "UTF8";
      _0x8cfex176.open("r", undefined, undefined);
      var _0x8cfex179 = _0x8cfex176.read();
      if (app.language === 1612) {
        _0x8cfex179 = $.jt.pio.removeUnknownChar(_0x8cfex179);
      }
      _0x8cfex179 = $.jt.pio.disableNS(_0x8cfex179);
      _0x8cfex176.close();
      for (
        var _0x8cfex14 = 0;
        _0x8cfex14 < _0x8cfex175.length;
        _0x8cfex14 += 1
      ) {
        var _0x8cfex17a = new XML(_0x8cfex179);
        var _0x8cfex64 = _0x8cfex17a.descendants("Item").length();
        var _0x8cfex17b = 0;
        var _0x8cfex17c = 0;
        var _0x8cfex17d = $.jt.pio._.filter(
          $.jt.pio.toItemArray(app.project.items),
          function (_0x8cfex4c) {
            return _0x8cfex4c.name == _0x8cfex175[_0x8cfex14].name;
          },
        );
        for (
          var _0x8cfex15 = 0;
          _0x8cfex15 < _0x8cfex17d.length;
          _0x8cfex15 += 1
        ) {
          if (_0x8cfex17d[_0x8cfex15].id == _0x8cfex175[_0x8cfex15].id) {
            _0x8cfex17c = _0x8cfex15;
            break;
          }
        }
        for (var _0x8cfex1f = 0; _0x8cfex1f < _0x8cfex64; _0x8cfex1f += 1) {
          var _0x8cfex11 = _0x8cfex17a.Fold.Item[_0x8cfex1f];
          var _0x8cfex4c = _0x8cfex17a.Fold.descendants("Item")[_0x8cfex1f];
          var _0x8cfex17e = _0x8cfex4c.descendants("idta");
          var _0x8cfex17f = xmlAttr(_0x8cfex17e, "bdata");
          var _0x8cfex180 = $.jt.pio.getGUID(_0x8cfex175[_0x8cfex14]);
          var _0x8cfex181 = $.jt.pio.IDTAisGUID(_0x8cfex17f, _0x8cfex180);
          var _0x8cfex182 = _0x8cfex4c.string == _0x8cfex175[_0x8cfex14].name;
          if (_0x8cfex182) {
            $.jt.pio.conWL(
              "nameIndex: " + _0x8cfex17b + " & compIndex: " + _0x8cfex17c,
            );
            if (_0x8cfex181 || _0x8cfex17b == _0x8cfex17c) {
              _0x8cfex3c = _0x8cfex4c;
              break;
            }
            _0x8cfex17b++;
          }
        }
        var _0x8cfex183 = $.jt.pio.extractItem(
          _0x8cfex4c,
          _0x8cfex1f,
          _0x8cfex17a,
        );
        var _0x8cfex184 = _0x8cfex183[0];
        _0x8cfex17a = _0x8cfex183[1];
        var _0x8cfex185 = new XML(
          '<Item><idta bdata="0001000000000000000000000000000000000028000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000d723f916"/><string>_Assets</string><sfdt bdata="00000001"/><Sfdr></Sfdr></Item>',
        );
        var _0x8cfex186 = _0x8cfex17a.Fold.fdta;
        delete _0x8cfex17a.Fold.fdta;
        var _0x8cfex187 = _0x8cfex17a.Fold.children();
        _0x8cfex185.Sfdr.appendChild(_0x8cfex187);
        _0x8cfex17a.Fold.setChildren(_0x8cfex186);
        _0x8cfex17a.Fold.appendChild(_0x8cfex184.children());
        _0x8cfex17a.Fold.appendChild(_0x8cfex185);
        var _0x8cfex188 = $.jt.pio.enableNS(_0x8cfex17a);
        var _0x8cfex189 = new File(
          _0x8cfex176.fsName.replace(
            /\.aepx/,
            "_" + _0x8cfex175[_0x8cfex14].name + ".aepx",
          ),
        );
        _0x8cfex189.encoding = "UTF8";
        _0x8cfex189.open("w", undefined, undefined);
        var _0x8cfex9a = _0x8cfex189.write(_0x8cfex188);
        _0x8cfex189.close();
        _0x8cfex178.push(_0x8cfex189);
      }
      XML.prettyPrinting = _0x8cfex177;
      return _0x8cfex178;
    },
    AEtoAME: function (_0x8cfexcc, _0x8cfexc6) {
      app.beginSuppressDialogs();
      $.jt.pio.conWL("Exporting AE to AME");
      var _0x8cfexf4 = false;
      var _0x8cfexf5 = new File(File.decode(app.project.file.fsName));
      try {
        app.beginUndoGroup("Pro IO AME Export");
        var _0x8cfexf6 = new Folder(
          _0x8cfexf5.path.toString() + _0x8cfex28 + "AME_temp",
        );
        var _0x8cfexf7 = new Date();
        _0x8cfexf7 = _0x8cfexf7.getTime();
        var _0x8cfexf8 = new File(
          _0x8cfexf6.toString() +
            _0x8cfex28 +
            $.jt.pio.getProjectName(1) +
            "_" +
            _0x8cfexf7.toString() +
            ".aepx",
        );
        if (_0x8cfexf6.exists == false) {
          _0x8cfexf6.create();
        }
        if (_0x8cfexf6.exists == false) {
          throw new Error(
            "Cannot create export folder in project location, check permissions.",
          );
        }
        var _0x8cfexf9 = 0;
        var _0x8cfexfa = [];
        for (
          var _0x8cfexef = 0;
          _0x8cfexef < _0x8cfexcc.length;
          _0x8cfexef += 1
        ) {
          _0x8cfexfa.push(_0x8cfexcc[_0x8cfexef].projectItem);
        }
        app.project.save();
        if ($.jt.pio.settings.trimFlag === true) {
          $.jt.pio.trimCompToWorkArea(_0x8cfexfa, false);
        }
        if ($.jt.pio.settings.reduceFlag === true) {
          app.project.reduceProject(_0x8cfexfa);
        }
        var _0x8cfexfb = new Date();
        app.project.save(_0x8cfexf8);
        if (_0x8cfexf8.exists !== true) {
          throw new Error("AEPX File not generated. Cancelling export.");
        }
        var _0x8cfexfc = new Date();
        _0x8cfexf9 = Math.ceil(
          (parseFloat(_0x8cfexfc) - parseFloat(_0x8cfexfb)) * 0.03,
        );
        var _0x8cfexfd = $.jt.pio.AEPXtoAME(_0x8cfexfa, _0x8cfexf8);
        app.endUndoGroup();
        _0x8cfexf4 = true;
        app.open(_0x8cfexf5);
        var _0x8cfexfe = "";
        if (_0x8cfexc6 === false) {
          for (
            var _0x8cfex1f = 0;
            _0x8cfex1f < _0x8cfexcc.length;
            _0x8cfex1f += 1
          ) {
            var _0x8cfexe6 = _0x8cfexcc[_0x8cfex1f].destinations;
            var _0x8cfexe7 = _0x8cfexcc[_0x8cfex1f].presets;
            var _0x8cfexd5 = _0x8cfexcc[_0x8cfex1f].subfolder;
            var _0x8cfexff = _0x8cfexfd[_0x8cfex1f].fsName.toString();
            for (
              var _0x8cfex14 = 0;
              _0x8cfex14 < _0x8cfexe6.length;
              _0x8cfex14 += 1
            ) {
              _0x8cfexfe +=
                "ameFront.addCompToBatch(\'" +
                _0x8cfexff +
                "\', \'" +
                _0x8cfexe7[_0x8cfex14] +
                "\', \'" +
                _0x8cfexe6[_0x8cfex14] +
                "\');";
            }
          }
          var _0x8cfex100 =
            "try{var ameFront = app.getFrontend();" +
            _0x8cfexfe +
            "}catch(e){null;}";
          _0x8cfex100 +=
            'var bt = new BridgeTalk();bt.target = "' +
            BridgeTalk.appSpecifier +
            '";bt.body = "$.jt.pio.onEncoderJobQueued();"; bt.send();';
          var _0x8cfex101 = new BridgeTalk();
          _0x8cfex101.target = $.jt.pio.ameVersion();
          if (!BridgeTalk.isInstalled(_0x8cfex101.target)) {
            _0x8cfex101.target = "ame";
          }
          _0x8cfex101.body = _0x8cfex100;
          var _0x8cfex3c = _0x8cfex101.send();
          app.project.save();
          _0x8cfex3c = _0x8cfexf9;
          $.jt.pio.conWL("AE to AME Complete");
          app.endSuppressDialogs(false);
          if (
            Folder.fs === "Windows" &&
            _0x8cfex23 === "AEFT" &&
            parseFloat(app.version) < 14
          ) {
            app.scheduleTask("$.jt.pio.onEncoderJobQueued();", 5000, false);
          }
          return _0x8cfex3c;
        } else {
          var _0x8cfexe4 = [];
          for (
            var _0x8cfex1f = 0;
            _0x8cfex1f < _0x8cfexcc.length;
            _0x8cfex1f += 1
          ) {
            var _0x8cfex102 = _0x8cfexcc[_0x8cfex1f].projectItem;
            var _0x8cfex103 = _0x8cfexcc[_0x8cfex1f].presets;
            var _0x8cfexd5 = _0x8cfexcc[_0x8cfex1f].subfolder;
            var _0x8cfex104 = _0x8cfexfd[_0x8cfex1f].fsName.toString();
            for (
              var _0x8cfex14 = 0;
              _0x8cfex14 < _0x8cfex102.length;
              _0x8cfex14 += 1
            ) {
              var _0x8cfexe9 = {
                dst: _0x8cfex102[_0x8cfex14],
                preset: _0x8cfex103[_0x8cfex14],
                src: _0x8cfex104,
                type: "AEFT",
              };
              _0x8cfexe4.push(_0x8cfexe9);
            }
          }
          app.endSuppressDialogs(false);
          return JSON.stringify(_0x8cfexe4);
        }
      } catch (err) {
        if (_0x8cfexf4 === false) {
          app.endUndoGroup();
        }
        if (_0x8cfexf5.fsName == File.decode(app.project.file.fsName)) {
          app.executeCommand(16);
        } else {
          app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
          app.open(_0x8cfexf5);
          app.endSuppressDialogs(false);
        }
        alert(
          "Could not create Media Encoder export file(s). \r\rEnsure app has permissions to write at the project directory:\r\r" +
            Folder.decode(_0x8cfexf5).toString(),
        );
        $.jt.pio.errWin(err, err.line);
        $.jt.pio.conWL("AE to AME Errored");
        return "error";
      }
    },
    AEtoRenderQueue: function (_0x8cfexcc) {
      $.jt.pio.conWL("Exporting AE to AE Render Queue");
      for (
        var _0x8cfex1f = 0;
        _0x8cfex1f < _0x8cfexcc.length;
        _0x8cfex1f += 1
      ) {
        var _0x8cfexc3 = _0x8cfexcc[_0x8cfex1f];
        _0x8cfexc3.renderTemplates !== undefined
          ? (_0x8cfexd6 = _0x8cfexc3.renderTemplates)
          : null;
        var _0x8cfexec = app.project.renderQueue.items.add(
          _0x8cfexc3.projectItem,
        );
        var _0x8cfexed = new Array();
        for (
          var _0x8cfex14 = 0, _0x8cfexef = 1;
          _0x8cfex14 < _0x8cfexc3.destinations.length;
          _0x8cfex14++, _0x8cfexef++
        ) {
          var _0x8cfexf0 = _0x8cfexc3.destinations[_0x8cfex14];
          var _0x8cfexf1 = _0x8cfexc3.presets[_0x8cfex14];
          var _0x8cfexf2 = _0x8cfexc3.renderTemplates[_0x8cfex14];
          if (_0x8cfex14 !== 0) {
            if (_0x8cfexee !== _0x8cfexf2) {
              _0x8cfexec = _0x8cfexec.duplicate();
              _0x8cfexef = 1;
            } else {
              _0x8cfexec.outputModules.add();
            }
          }
          _0x8cfexf2 !== undefined
            ? ((_0x8cfexee = _0x8cfexf2), _0x8cfexec.applyTemplate(_0x8cfexf2))
            : null;
          try {
            if (_0x8cfexc3.subfolder === true) {
              _0x8cfexec.outputModules[_0x8cfexef].file = _0x8cfexf0.parent;
              var _0x8cfexf3 = _0x8cfexf0.path.substring(
                _0x8cfexf0.path.lastIndexOf("/") + 1,
              );
              om =
                _0x8cfexec.outputModules[_0x8cfexef].getSetting(
                  "Output File Info",
                );
              om = om.replace(
                /"Subfolder Path":"(.*?)"/g,
                '"Subfolder Path":"' + _0x8cfexf3 + '"',
              );
              _0x8cfexec.outputModules[_0x8cfexef].setSetting(
                "Output File Info",
                om,
              );
            } else {
              _0x8cfexec.outputModules[_0x8cfexef].file = _0x8cfexf0;
            }
            _0x8cfexec.outputModules[_0x8cfexef].applyTemplate(
              _0x8cfexf1.toString(),
            );
          } catch (e) {
            alert(e.message + "\r" + e.line);
            alert(
              "AE Preset cannot be found: \r\r" +
                _0x8cfexf1.toString() +
                "\r\rPlease try another preset.",
            );
            if (_0x8cfexc3.destinations.length == 1) {
              _0x8cfexec.remove();
            } else {
              _0x8cfexed.push(_0x8cfex14);
            }
          }
        }
        if (_0x8cfexed.length > 0) {
          for (
            var _0x8cfex14 = 0;
            _0x8cfex14 < _0x8cfexed.length;
            _0x8cfex14 += 1
          ) {
            _0x8cfexec.outputModules[_0x8cfex14 + 1].remove();
          }
        }
      }
      $.jt.pio.clearLoading();
      $.jt.pio.conWL("AE to AE Render Queue Complete");
      return 0;
    },
    IDTAisGUID: function (_0x8cfex17e, _0x8cfex180) {
      if (_0x8cfex17e && _0x8cfex180) {
        idta_key = _0x8cfex17e.toString().substring(32, 40);
        guid_key = _0x8cfex180.toString().substring(0, 8);
        return idta_key === guid_key;
      }
    },
    PPROtoAME: function (_0x8cfexcc, _0x8cfexc6) {
      $.jt.pio.conWL("Exporting PPRO to AME");
      var _0x8cfexe4 = [];
      for (
        var _0x8cfex1f = 0;
        _0x8cfex1f < _0x8cfexcc.length;
        _0x8cfex1f += 1
      ) {
        var _0x8cfexe5 = _0x8cfexcc[_0x8cfex1f].projectItem;
        var _0x8cfexe6 = _0x8cfexcc[_0x8cfex1f].destinations;
        var _0x8cfexe7 = _0x8cfexcc[_0x8cfex1f].presets;
        var _0x8cfexd5 = _0x8cfexcc[_0x8cfex1f].subfolder;
        var _0x8cfexe8 = app.encoder.ENCODE_ENTIRE;
        _0x8cfexe5.getInPoint() != _0x8cfexe5.getOutPoint()
          ? (_0x8cfexe8 = app.encoder.ENCODE_IN_TO_OUT)
          : null;
        if (_0x8cfexc6 !== true) {
          for (
            var _0x8cfex14 = 0;
            _0x8cfex14 < _0x8cfexe6.length;
            _0x8cfex14 += 1
          ) {
            var _0x8cfex3c = app.encoder.encodeSequence(
              _0x8cfexe5,
              _0x8cfexe6[_0x8cfex14],
              _0x8cfexe7[_0x8cfex14],
              _0x8cfexe8,
              0,
            );
          }
          app.encoder.bind("onEncoderJobQueued", $.jt.pio.onEncoderJobQueued);
        } else {
          for (
            var _0x8cfex14 = 0;
            _0x8cfex14 < _0x8cfexe6.length;
            _0x8cfex14 += 1
          ) {
            var _0x8cfexe9 = {
              dst: _0x8cfexe6[_0x8cfex14],
              guid: "",
              preset: _0x8cfexe7[_0x8cfex14],
              presetName: $.jt.pio.eprFormat(new File(_0x8cfexe7[_0x8cfex14])),
              src: app.project.path,
              type: "PPRO",
            };
            _0x8cfexe5 instanceof Sequence
              ? (_0x8cfexe9.guid = _0x8cfexe5.sequenceID)
              : (_0x8cfexe9.guid =
                  $.jt.pio.getSeqFromProjItem(_0x8cfexe5).sequenceID);
            _0x8cfexe4.push(_0x8cfexe9);
          }
        }
      }
      $.jt.pio.conWL("PPRO to AME Complete");
      var _0x8cfexea = new File(app.project.path).length;
      var _0x8cfexeb = parseInt(_0x8cfexea / 9000);
      $.jt.pio.conWL("exportTime: " + _0x8cfexeb.toString());
      if (_0x8cfexc6 !== true) {
        return _0x8cfexeb;
      } else {
        return JSON.stringify(_0x8cfexe4);
      }
    },
    addXML: function (_0x8cfexb9) {
      if (app.project.file == null && _0x8cfex23 == "AEFT") {
        $.jt.pio.aeAlert();
      } else {
        $.jt.pio.conWL("adding XML");
        var _0x8cfexba = $.jt.pio.getXML();
        var _0x8cfexbb = new XML("<export/>");
        _0x8cfexbb = xmlAttr(_0x8cfexbb, "name", _0x8cfexb9.name);
        _0x8cfexbb = xmlAttr(_0x8cfexbb, "app", _0x8cfexb9.app);
        _0x8cfexb9.destination !== undefined
          ? xmlAttr(
              _0x8cfexbb,
              "destination",
              Folder.decode(_0x8cfexb9.destination),
            )
          : null;
        var _0x8cfex64 = _0x8cfexb9.output.length;
        for (var _0x8cfexbc = 0; _0x8cfexbc < _0x8cfex64; _0x8cfexbc += 1) {
          var _0x8cfexbd = new XML("<output/>");
          _0x8cfexbd = xmlAttr(
            _0x8cfexbd,
            "file",
            _0x8cfexb9.output[_0x8cfexbc].preset,
          );
          _0x8cfexb9.output[_0x8cfexbc].convention !== undefined
            ? (_0x8cfexbd = xmlAttr(
                _0x8cfexbd,
                "nameFormat",
                _0x8cfexb9.output[_0x8cfexbc].convention,
              ))
            : (_0x8cfexbd = xmlAttr(
                _0x8cfexbd,
                "nameFormat",
                _0x8cfexb9.output[_0x8cfexbc].nameFormat,
              ));
          _0x8cfexbd = xmlAttr(
            _0x8cfexbd,
            "subfolder",
            _0x8cfexb9.output[_0x8cfexbc].subfolder,
          );
          _0x8cfexb9.output[_0x8cfexbc].renderTemplate !== undefined
            ? (_0x8cfexbd = xmlAttr(
                _0x8cfexbd,
                "renderTemplate",
                _0x8cfexb9.output[_0x8cfexbc].renderTemplate,
              ))
            : null;
          _0x8cfexb9.output[_0x8cfexbc].destination !== undefined
            ? (_0x8cfexbd = xmlAttr(
                _0x8cfexbd,
                "destination",
                _0x8cfexb9.output[_0x8cfexbc].destination,
              ))
            : null;
          _0x8cfexbb.appendChild(_0x8cfexbd);
        }
        _0x8cfexb9.i > -1
          ? (_0x8cfexba.export[_0x8cfexb9.i] = _0x8cfexbb)
          : _0x8cfexba.appendChild(_0x8cfexbb);
        $.jt.pio.conWL("added:" + _0x8cfexb9.i);
        $.jt.pio.writeXML(_0x8cfexba);
      }
    },
    aeAlert: function () {
      $.jt.pio.evtDispatch("aeAlertEvent", "true");
    },
    aeLatestSelection: function (_0x8cfex82) {
      var _0x8cfex83 = app.project.selection;
      var _0x8cfex84 = _0x8cfex83.length;
      var _0x8cfex85 = app.project.activeItem;
      if (_0x8cfex85 === null && _0x8cfex84 === 0) {
        if (_0x8cfex82 === true) {
          app.activeViewer.setActive();
          if (app.project.activeItem != null) {
            return "timeline";
          }
        }
        return "none";
      } else {
        if (
          (_0x8cfex85 === null && _0x8cfex84 > 0) ||
          (_0x8cfex84 === 1 && _0x8cfex85 === _0x8cfex83[0])
        ) {
          return "project";
        } else {
          return "timeline";
        }
      }
    },
    afterCodecsExtension: function (_0x8cfex167) {
      var _0x8cfex168 = { 1: "mp4", 2: "mov" };
      var _0x8cfex96 = _0x8cfex167.ExporterParam[4].ParamValue;
      return _0x8cfex168[_0x8cfex96];
    },
    ameVersion: function () {
      var _0x8cfex93 = parseInt(app.version).toString();
      var _0x8cfex94 = {
        AEFT: { 13: "-10", 14: "-11", 15: "-12", 16: "-13" },
        PPRO: { 11: "-11", 12: "-12", 13: "-13" },
      };
      _0x8cfex3c = _0x8cfex94[_0x8cfex23][_0x8cfex93];
      _0x8cfex3c == undefined ? (_0x8cfex3c = "") : null;
      _0x8cfex3c = "ame" + _0x8cfex3c;
      return _0x8cfex3c;
    },
    arrayIndexOf: function (_0x8cfex4d, _0x8cfex4e) {
      var _0x8cfex7 = -1;
      var _0x8cfex4f = _0x8cfex4d.length;
      while (
        ++_0x8cfex7 < _0x8cfex4f &&
        _0x8cfex4d[_0x8cfex7] !== _0x8cfex4e
      ) {}
      return _0x8cfex7 < _0x8cfex4f ? _0x8cfex7 : -1;
    },
    arraySubtract: function (_0x8cfex50, _0x8cfex51) {
      $.jt.pio.conWL(
        "Begin to subtract " +
          _0x8cfex51.length.toString() +
          " files from " +
          _0x8cfex50.length +
          " files.",
      );
      var _0x8cfex52 = _0x8cfex51.toString();
      var _0x8cfex53 = _0x8cfex50.length;
      var _0x8cfex1f = 0;
      for (var _0x8cfex14 = _0x8cfex53 - 1; _0x8cfex14 >= 0; _0x8cfex14--) {
        if (
          _0x8cfex52.indexOf(
            _0x8cfex50[_0x8cfex14].substring(
              _0x8cfex50[_0x8cfex14].lastIndexOf("/") + 1,
            ),
          ) > -1
        ) {
          _0x8cfex50.splice(_0x8cfex14, 1);
        }
        _0x8cfex1f++;
      }
      $.jt.pio.conWL(
        "Subtraction completed with " +
          _0x8cfex50.length.toString() +
          " files remaining.",
      );
      return _0x8cfex50;
    },
    arraySubtractToString: function (_0x8cfex50, _0x8cfex51) {
      for (
        var _0x8cfex14 = _0x8cfex50.length - 1;
        _0x8cfex14 >= 0;
        _0x8cfex14--
      ) {
        for (
          var _0x8cfex1f = _0x8cfex51.length - 1;
          _0x8cfex1f >= 0;
          _0x8cfex1f--
        ) {
          if (
            _0x8cfex51[_0x8cfex1f]
              .toString()
              .substring(
                _0x8cfex51[_0x8cfex1f].toString().lastIndexOf("/") + 1,
              ) ==
            _0x8cfex50[_0x8cfex14]
              .toString()
              .substring(_0x8cfex50[_0x8cfex14].toString().lastIndexOf("/") + 1)
          ) {
            _0x8cfex50.splice(_0x8cfex14, 1);
            break;
          }
        }
      }
      return _0x8cfex50;
    },
    cancelTasks: function () {
      $.jt.pio.conWL("Cancelling " + $.jt.pio.tasks.length + " tasks.");
      try {
        app.cancelTask($.jt.pio.watchBin.syncDoneTaskID);
      } catch (e) {
        null;
      }
      $.jt.pio.watchBin.syncDone();
      $.jt.pio._.each($.jt.pio.tasks, function (_0x8cfex131) {
        try {
          app.cancelTask(_0x8cfex131);
        } catch (e) {
          null;
        }
      });
    },
    checkPrMetadata: function () {
      app.project.addPropertyToProjectMetadataSchema(
        metadata[pc][0],
        metadata[pc][1],
        2,
      );
      app.project.addPropertyToProjectMetadataSchema(
        WatchFolderPath,
        WatchFolderLabel,
      );
    },
    clearLoading: function () {
      try {
        if (app.project.file == null && _0x8cfex23 == "AEFT") {
          $.jt.pio.aeAlert();
        } else {
          try {
            var _0x8cfex40 = new ExternalObject("lib:PlugPlugExternalObject");
          } catch (e) {
            alert(e);
          }
          if (_0x8cfex40) {
            var _0x8cfex41 = new CSXSEvent();
            _0x8cfex41.type = "clearLoading";
            _0x8cfex41.data = "";
            _0x8cfex41.dispatch();
          }
        }
      } catch (err) {
        return null;
      }
    },
    conWL: function (_0x8cfex11) {
      if (_0x8cfex22 && BridgeTalk.isRunning("estoolkit-4.0")) {
        var _0x8cfex144 = new Date();
        $.writeln(
          Date().toString().substring(16, 24) +
            " " +
            _0x8cfex11.toString() +
            " " +
            (parseInt(_0x8cfex144) - parseInt(_0x8cfex35)).toString() +
            " ms",
        );
        _0x8cfex35 = _0x8cfex144;
      }
    },
    corruptedXML: function () {
      alert(
        "Preset File is Corrupted, a new blank file will be created instead.",
      );
      new File(_0x8cfex25.fsName).rename(
        _0x8cfex25.name.toString() +
          "_" +
          new Date().getTime().toString() +
          "_backup.xml",
      );
      $.jt.pio.createXML();
    },
    createXML: function () {
      var _0x8cfexb0 = new Folder(_0x8cfex24.path);
      if (_0x8cfexb0.exists == false) {
        _0x8cfexb0.create();
        _0x8cfex24.create();
      } else {
        if (_0x8cfex24.exists == false) {
          _0x8cfex24.create();
        }
      }
      var _0x8cfexb1 = new XML("<proio_presets/>");
      var _0x8cfexb2 = new XML(
        "<about>Pro IO presets file. You can add and modify presets through the Pro IO Panel in After Effects or Premiere. If you have the need to edit this document manually, make sure each entry is complete and don\'t mix AE and AME render modes in one preset.</about>",
      );
      _0x8cfexb1.appendChild(_0x8cfexb2);
      _0x8cfex25.open("w", undefined, undefined);
      var _0x8cfex9a = _0x8cfex25.write(_0x8cfexb1.toXMLString());
      _0x8cfex25.close();
      return _0x8cfex9a;
    },
    deletePrMetadata: function (_0x8cfexa1, _0x8cfexab) {
      var _0x8cfexa3 =
        "http://ns.adobe.com/premierePrivateProjectMetaData/1.0/";
      if (_0x8cfex23 == "PPRO" && app.isDocumentOpen()) {
        if (_0x8cfexa1) {
          if (ExternalObject.AdobeXMPScript === undefined) {
            ExternalObject.AdobeXMPScript = new ExternalObject(
              "lib:AdobeXMPScript",
            );
          }
          if (ExternalObject.AdobeXMPScript !== undefined) {
            var _0x8cfexa4 = _0x8cfexa1.getProjectMetadata();
            var _0x8cfexa5 = new XMPMeta(_0x8cfexa4);
            _0x8cfexa5.deleteProperty(_0x8cfexa3, _0x8cfexab);
            var _0x8cfex11 = _0x8cfexa5.serialize();
            _0x8cfexa1.setProjectMetadata(_0x8cfex11, [_0x8cfexab]);
          }
        }
      }
    },
    digitCount: function (_0x8cfex3d, _0x8cfex4a) {
      var _0x8cfex4b = _0x8cfex3d + "";
      while (_0x8cfex4b.length < _0x8cfex4a) {
        _0x8cfex4b = "0" + _0x8cfex4b;
      }
      return _0x8cfex4b;
    },
    disableLastUpdate: function () {
      _0x8cfex2b = 2;
      if (_0x8cfex23 == "AEFT") {
        $.jt.pio.setAeMetadata("pro_io-last_update", "2");
      } else {
        if (_0x8cfex23 == "PPRO") {
          $.jt.pio.setPrMetadata(app.project.rootItem, [
            ["pro_io_last_update", "pro_io", "2"],
          ]);
        }
      }
    },
    disableNS: function (_0x8cfex18a) {
      return new XML(_0x8cfex18a.replace("xmlns", "dxmlns"));
    },
    duplicateXML: function (_0x8cfexbe) {
      if (app.project.file == null && _0x8cfex23 == "AEFT") {
        $.jt.pio.aeAlert();
      } else {
        $.jt.pio._.each(_0x8cfexbe, function (_0x8cfex3d) {
          var _0x8cfexba = $.jt.pio.getXML();
          var _0x8cfexbf = _0x8cfexba.export[_0x8cfex3d];
          _0x8cfexba.appendChild(_0x8cfexbf);
          $.jt.pio.writeXML(_0x8cfexba);
        });
      }
    },
    editEndingsFile: function () {
      var _0x8cfex173 = new File(
        _0x8cfex25.path + _0x8cfex28 + "allowed_extensions.txt",
      );
      _0x8cfex173.execute();
    },
    enableNS: function (_0x8cfex18a) {
      return _0x8cfex18a.toXMLString().replace("dxmlns", "xmlns");
    },
    eprExt: function (_0x8cfex163) {
      try {
        if (app.project.file == null && _0x8cfex23 == "AEFT") {
          $.jt.pio.aeAlert();
        } else {
          _0x8cfex163.open("r", undefined, undefined);
          var _0x8cfex164 = _0x8cfex163.read();
          _0x8cfex163.close();
          if (
            _0x8cfex164 == null ||
            _0x8cfex164 == "" ||
            _0x8cfex164 == false
          ) {
            return null;
          }
          var _0x8cfex165 = new XML(_0x8cfex164);
          var _0x8cfex166 = parseInt(_0x8cfex165.ExporterFileType);
          eprList = {
            1094796064: "aac",
            1095321158: "aif",
            1145262175: "dcp",
            1145919558: "mxf",
            1146116128: "dpx",
            1211250228: "mp4",
            1211250242: "m4v",
            1212503619: "mp4",
            1246582854: "mxf",
            1246774599: "jpg",
            1297101600: "mp3",
            1297101856: "3gp",
            1297625392: "mxf",
            1297625393: "mxf",
            1297630752: "MXF",
            1297630808: "mxf",
            1299148630: "mov",
            1347307296: "png",
            1396984671: "mov",
            1414088262: "tif",
            1414547779: "tga",
            1463899717: "wav",
            1685480480: "m2v",
            1835164704: "m2v",
            1836082994: "mpg",
            1866815570: "exr",
            2101313: "mpg",
          };
          if (_0x8cfex166 === 1396984671) {
            _0x8cfex3c = $.jt.pio.afterCodecsExtension(_0x8cfex165);
          } else {
            _0x8cfex3c = eprList[_0x8cfex166];
          }
          return _0x8cfex3c;
        }
      } catch (err) {
        return null;
      }
    },
    eprFormat: function (_0x8cfex163) {
      try {
        if (app.project.file == null && _0x8cfex23 == "AEFT") {
          $.jt.pio.aeAlert();
        } else {
          _0x8cfex163.open("r", undefined, undefined);
          var _0x8cfex164 = _0x8cfex163.read();
          _0x8cfex163.close();
          if (
            _0x8cfex164 == null ||
            _0x8cfex164 == "" ||
            _0x8cfex164 == false
          ) {
            return null;
          }
          var _0x8cfex165 = new XML(_0x8cfex164);
          var _0x8cfex166 = parseInt(_0x8cfex165.ExporterFileType);
          eprList = {
            1094796064: "AAC Audio",
            1095321158: "AIFF",
            1145262175: "Wraptor DCP",
            1145919558: "DNxHR/DNxHD MXF OP1a",
            1146116128: "DPX",
            1211250228: "H.264",
            1211250242: "H.264 Blu-ray",
            1212503619: "HEVC (H.265)",
            1246582854: "JPEG 2000 MXF OP1a",
            1246774599: "JPEG",
            1297101600: "MP3",
            1297101856: "MPEG4",
            1297625392: "AS-10",
            1297625393: "AS-11",
            1297630752: "P2 Movie",
            1297630808: "MXF OP1a",
            1299148630: "QuickTime",
            1347307296: "PNG",
            1414088262: "TIFF",
            1414547779: "Targa",
            1463899717: "Waveform Audio",
            1685480480: "MPEG2-DVD",
            1835164704: "MPEG2 Blu-ray",
            1836082994: "MPEG2",
            1866815570: "OpenEXR",
            2101313: "MPEG Preview",
          };
          return eprList[_0x8cfex166];
        }
      } catch (err) {
        return null;
      }
    },
    errWin: function (_0x8cfex36) {
      var _0x8cfex37 =
        "Pro IO encountered an error:\r\r" +
        _0x8cfex36.message.toString() +
        "\r\rError Line: " +
        _0x8cfex36.line.toString() +
        "\rError File: " +
        _0x8cfex36.fileName.toString() +
        "\r\rWould you like to report this Error?";
      if (confirm(_0x8cfex37, false, "Pro IO encountered an error")) {
        $.jt.pio.evtDispatch("reportError", [
          _0x8cfex36.line,
          _0x8cfex36.message,
          new File(_0x8cfex36.fileName).name,
        ]);
      }
      return [
        "ERROR",
        _0x8cfex36.line,
        _0x8cfex36.message,
        new File(_0x8cfex36.fileName).name,
      ];
    },
    evtDispatch: function (_0x8cfex3e, _0x8cfex3f) {
      try {
        var _0x8cfex40 = new ExternalObject("lib:PlugPlugExternalObject");
      } catch (e) {
        alert(e);
      }
      if (_0x8cfex40) {
        var _0x8cfex41 = new CSXSEvent();
        _0x8cfex41.type = _0x8cfex3e;
        _0x8cfex41.data = _0x8cfex3f;
        _0x8cfex41.dispatch();
      }
    },
    existsXML: function () {
      if (!_0x8cfex25.exists) {
        var _0x8cfexaf = $.jt.pio.createXML();
        if (_0x8cfexaf == true) {
          return false;
        } else {
          alert(
            "Could not find or create presets file, check permissions for " +
              _0x8cfex25.path,
          );
        }
      } else {
        return true;
      }
    },
    extractItem: function (_0x8cfex4c, _0x8cfex18b, _0x8cfex17a) {
      var _0x8cfex18c = new XML("<extracted></extracted>");
      var _0x8cfex7 = _0x8cfex4c.childIndex();
      $.jt.pio.conWL(_0x8cfex18b);
      var _0x8cfex67 =
        _0x8cfex17a.Fold.descendants("Item")[_0x8cfex18b].parent();
      var _0x8cfex17 = _0x8cfex67.children().length();
      for (var _0x8cfex14 = _0x8cfex7; _0x8cfex14 < _0x8cfex17; _0x8cfex14++) {
        var _0x8cfex18d = _0x8cfex67.children()[_0x8cfex7];
        if (_0x8cfex18d != _0x8cfex4c && _0x8cfex18d.localName() == "Item") {
          break;
        }
        _0x8cfex18c.appendChild(new XML(_0x8cfex18d));
        delete _0x8cfex67.children()[_0x8cfex7];
      }
      return [_0x8cfex18c, _0x8cfex17a];
    },
    failedImports: 0,
    filterEPR: function (_0x8cfex137) {
      var _0x8cfex162 = _0x8cfex137.name.substring(
        _0x8cfex137.name.lastIndexOf("."),
      );
      if (
        _0x8cfex137.constructor.name == "Folder" ||
        _0x8cfex162 == ".epr" ||
        _0x8cfex162 == ".EPR"
      ) {
        return true;
      } else {
        return false;
      }
    },
    findFolder: function (_0x8cfex90, _0x8cfex105) {
      var _0x8cfex106 = _0x8cfex105.numItems;
      for (var _0x8cfex14 = 1; _0x8cfex14 < _0x8cfex106 + 1; _0x8cfex14 += 1) {
        if (_0x8cfex105.items[_0x8cfex14].name == _0x8cfex90) {
          return _0x8cfex105.items[_0x8cfex14];
        }
      }
      return null;
    },
    findVersion: function (_0x8cfex54, _0x8cfex55) {
      typeof _0x8cfex55 == "undefined" ? (_0x8cfex55 = false) : null;
      var _0x8cfex56 = "99";
      if (_0x8cfex55 === true) {
        var _0x8cfex57 = new File(_0x8cfex54);
        var _0x8cfex58 = new Folder(_0x8cfex57.path);
        var _0x8cfex59 = _0x8cfex58.getFiles().sort().reverse();
        var _0x8cfex5a = _0x8cfex59.length;
        var _0x8cfex5b = _0x8cfex57.name.substring(
          0,
          _0x8cfex57.name.lastIndexOf("#VVS"),
        );
        var _0x8cfex5c = new RegExp(/\d+/g);
        for (var _0x8cfex14 = 0; _0x8cfex14 < _0x8cfex5a; _0x8cfex14 += 1) {
          var _0x8cfex5d = _0x8cfex59[_0x8cfex14].name;
          if (_0x8cfex5d.indexOf(_0x8cfex5b) > -1) {
            var _0x8cfex3c = _0x8cfex5d.match(_0x8cfex5c).pop();
            if (_0x8cfex3c != null) {
              var _0x8cfex5e = _0x8cfex3c.toString();
              _0x8cfex5e = parseInt(_0x8cfex5e, 10) + 1;
              if (_0x8cfex5e < 10) {
                _0x8cfex5e = "0" + _0x8cfex5e.toString();
              }
              return _0x8cfex5e;
            }
          }
        }
        return "01";
      } else {
        if (_0x8cfex55 == false) {
          for (var _0x8cfex14 = 99; _0x8cfex14 > 0; _0x8cfex14 += -1) {
            var _0x8cfex5f = new File(
              _0x8cfex54.replace("#VV", _0x8cfex56.toString()),
            );
            if (_0x8cfex5f.exists == false) {
              _0x8cfex56 = parseInt(_0x8cfex56);
              --_0x8cfex56;
              if (_0x8cfex56 < 10) {
                _0x8cfex56 = "0" + _0x8cfex56.toString();
              }
            } else {
              _0x8cfex56++;
              if (_0x8cfex56 < 10) {
                _0x8cfex56 = "0" + _0x8cfex56.toString();
              }
              _0x8cfex14 = 0;
            }
          }
          if (_0x8cfex56 == "00") {
            _0x8cfex56 = "01";
          }
          return _0x8cfex56;
        }
      }
    },
    footageFromPath: function (_0x8cfex60, _0x8cfex67) {
      for (
        var _0x8cfex14 = 0;
        _0x8cfex14 < _0x8cfex67.children.numItems;
        _0x8cfex14 += 1
      ) {
        if (_0x8cfex67.children[_0x8cfex14].getMediaPath() == _0x8cfex60) {
          _0x8cfex3c = _0x8cfex67.children[_0x8cfex14];
          break;
        }
      }
      return _0x8cfex3c;
    },
    getAEMediaType: function (_0x8cfex72) {
      var _0x8cfex73 = $.appEncoding;
      $.appEncoding = "UTF-8";
      if (_0x8cfex72 instanceof CompItem) {
        _0x8cfex68 = "Composition";
      } else {
        if (_0x8cfex72 instanceof FootageItem) {
          _0x8cfex68 = "Footage";
        } else {
          if (_0x8cfex72 instanceof FolderItem) {
            _0x8cfex68 = "Folder";
          }
        }
      }
      $.appEncoding = _0x8cfex73;
      return _0x8cfex68;
    },
    getActiveItems: function () {
      var _0x8cfex3c = [];
      if (_0x8cfex23 == "PPRO") {
        var _0x8cfex86 = app.project.activeSequence != undefined;
        var _0x8cfex87 = $.jt.pio._.filter(_0x8cfex29, function (_0x8cfex81) {
          return $.jt.pio.getMediaType(_0x8cfex81) == "Sequence";
        });
        if (_0x8cfex86 == true && _0x8cfex87.length == 0) {
          _0x8cfex3c.push(app.project.activeSequence);
          return _0x8cfex3c;
        } else {
          if (_0x8cfex86 == false && _0x8cfex87.length > 0) {
            for (
              var _0x8cfex14 = 0;
              _0x8cfex14 < _0x8cfex87.length;
              _0x8cfex14 += 1
            ) {
              _0x8cfex3c.push(
                $.jt.pio.getSeqFromProjItem(_0x8cfex87[_0x8cfex14]),
              );
            }
          } else {
            if (_0x8cfex86 == true && _0x8cfex87.length > 0) {
              var _0x8cfex88 = new Date();
              var _0x8cfex89 = _0x8cfex88 - _0x8cfex2a;
              var _0x8cfex8a =
                $.jt.pio.playHead.position === $.jt.pio.playHead.get();
              var _0x8cfex8b =
                $.jt.pio._.differenceByKey(
                  $.jt.pio.sequenceSelection.items,
                  $.jt.pio.sequenceSelection.get(),
                  "name",
                ).length == 0;
              if (
                _0x8cfex8a === false ||
                _0x8cfex8b === false ||
                _0x8cfex89 > 10000
              ) {
                _0x8cfex3c.push(app.project.activeSequence);
              } else {
                for (
                  var _0x8cfex14 = 0;
                  _0x8cfex14 < _0x8cfex87.length;
                  _0x8cfex14 += 1
                ) {
                  _0x8cfex3c.push(
                    $.jt.pio.getSeqFromProjItem(_0x8cfex87[_0x8cfex14]),
                  );
                }
              }
            }
          }
        }
        return _0x8cfex3c;
      } else {
        if (_0x8cfex23 == "AEFT") {
          latest = $.jt.pio.aeLatestSelection(true);
          if (latest === "project") {
            for (
              var _0x8cfex14 = 0;
              _0x8cfex14 < app.project.selection.length;
              _0x8cfex14 += 1
            ) {
              if (
                app.project.selection[_0x8cfex14] != null &&
                app.project.selection[_0x8cfex14] instanceof CompItem
              ) {
                _0x8cfex3c.push(app.project.selection[_0x8cfex14]);
              }
            }
          } else {
            if (
              latest === "timeline" &&
              app.project.activeItem instanceof CompItem
            ) {
              _0x8cfex3c.push(app.project.activeItem);
            }
          }
        }
      }
      return _0x8cfex3c;
    },
    getAeMetadata: function (_0x8cfex9b) {
      var _0x8cfex9d = app.project;
      if (ExternalObject.AdobeXMPScript == undefined) {
        ExternalObject.AdobeXMPScript = new ExternalObject(
          "lib:AdobeXMPScript",
        );
      }
      var _0x8cfex9e = new XMPMeta(app.project.xmpPacket);
      var _0x8cfex9f = XMPMeta.getNamespaceURI("xmp");
      var _0x8cfexa0 = "xmp:" + _0x8cfex9b.toString();
      try {
        _0x8cfex3c = _0x8cfex9e.getProperty(_0x8cfex9f, _0x8cfexa0);
      } catch (e) {
        alert(e);
      }
      return _0x8cfex3c;
    },
    getAllTemplatesManual: function () {
      app.beginUndoGroup("Pro IO Get Outputs");
      $.jt.pio.conWL("getting all templates manual");
      var _0x8cfex169 = app.project.items.addComp("", 4, 4, 1, 1, 1);
      var _0x8cfex16a = app.project.renderQueue.items.add(_0x8cfex169);
      _0x8cfex30 = $.jt.pio._.filter(
        _0x8cfex16a.templates,
        function (_0x8cfex16b) {
          return _0x8cfex16b.indexOf("_HIDDEN X-Factor") < 0;
        },
      );
      var _0x8cfex16c = _0x8cfex16a.outputModules[1];
      var _0x8cfex16d = _0x8cfex16c.templates;
      _0x8cfex16c.file = Folder.myDocuments;
      _0x8cfex2f = {};
      for (
        var _0x8cfex14 = 0;
        _0x8cfex14 < _0x8cfex16d.length;
        _0x8cfex14 += 1
      ) {
        if (_0x8cfex16d[_0x8cfex14].indexOf("_HIDDEN") < 0) {
          _0x8cfex16c.applyTemplate(_0x8cfex16d[_0x8cfex14]);
          var _0x8cfex16e = _0x8cfex16c.file
            .toString()
            .substring(_0x8cfex16c.file.toString().lastIndexOf(".") + 1);
          _0x8cfex2f[_0x8cfex16d[_0x8cfex14]] = { extension: _0x8cfex16e };
        }
      }
      _0x8cfex16a.remove();
      _0x8cfex169.remove();
      app.activeViewer != null ? app.activeViewer.setActive() : null;
      app.endUndoGroup();
      return JSON.stringify([_0x8cfex2f, _0x8cfex30]);
    },
    getAppID: function () {
      alert(_0x8cfex23);
    },
    getCurrentDate: function (_0x8cfex42) {
      var _0x8cfex43 = new Date();
      var _0x8cfex44 = _0x8cfex43.getMonth() + 1;
      if (_0x8cfex44 < 10) {
        _0x8cfex44 = "0" + _0x8cfex44.toString();
      }
      var _0x8cfex45 = _0x8cfex43.getDate();
      if (_0x8cfex45 < 10) {
        _0x8cfex45 = "0" + _0x8cfex45.toString();
      }
      var _0x8cfex46 = _0x8cfex43.getFullYear().toString();
      _0x8cfex46 = _0x8cfex46.substring(2);
      _0x8cfex42 = _0x8cfex42.replace("MM", _0x8cfex44);
      _0x8cfex42 = _0x8cfex42.replace("DD", _0x8cfex45);
      _0x8cfex42 = _0x8cfex42.replace("YY", _0x8cfex46);
      return _0x8cfex42;
    },
    getCurrentTime: function (_0x8cfex42) {
      var _0x8cfex47 = $.jt.pio.digitCount(new Date().getHours().toString(), 2);
      var _0x8cfex48 = $.jt.pio.digitCount(
        new Date().getMinutes().toString(),
        2,
      );
      var _0x8cfex49 = $.jt.pio.digitCount(
        new Date().getSeconds().toString(),
        2,
      );
      _0x8cfex42 = _0x8cfex42
        .replace("HH", _0x8cfex47)
        .replace("MM", _0x8cfex48)
        .replace("SS", _0x8cfex49);
      return _0x8cfex42;
    },
    getFlags: function () {
      var _0x8cfex3c = new Array();
      if (_0x8cfex2c == true) {
        _0x8cfex2c = false;
        _0x8cfex3c.push("true");
      } else {
        _0x8cfex3c.push("false");
      }
      if (_0x8cfex2d == true) {
        _0x8cfex2d = false;
        _0x8cfex3c.push(_0x8cfex2e.toString());
        _0x8cfex2e = -1;
      } else {
        _0x8cfex3c.push("false");
      }
      return _0x8cfex3c;
    },
    getFolderDate: function (_0x8cfex6c) {
      if (Folder.fs == "Macintosh") {
        return _0x8cfex6c.modified;
      } else {
        var _0x8cfex6e = _0x8cfex6c.getFiles();
        for (
          var _0x8cfex14 = 0;
          _0x8cfex14 < _0x8cfex6e.length;
          _0x8cfex14 += 1
        ) {
          if (_0x8cfex14 == 0) {
            _0x8cfex95 = _0x8cfex6e[_0x8cfex14].created;
          } else {
            if (_0x8cfex6e[_0x8cfex14].created > _0x8cfex95) {
              _0x8cfex95 = _0x8cfex6e[_0x8cfex14].created;
            }
          }
        }
        return _0x8cfex95;
      }
    },
    getGUID: function (_0x8cfex4c) {
      if (_0x8cfex4c.dynamicLinkGUID) {
        return _0x8cfex4c.dynamicLinkGUID;
      } else {
        if (_0x8cfex4c.getRenderGUID) {
          try {
            return _0x8cfex4c.getRenderGUID(1);
          } catch (e) {
            return undefined;
          }
        }
      }
    },
    getLastUpdate: function () {
      if (_0x8cfex23 == "AEFT") {
        _0x8cfex2b = $.jt.pio.getAeMetadata("pro_io-last_update");
      } else {
        if (_0x8cfex23 == "PPRO") {
          _0x8cfex2b = $.jt.pio.getPrMetadata(app.project.rootItem, [
            "pro_io_last_update",
          ]);
        }
      }
      typeof _0x8cfex2b == "undefined" ? (_0x8cfex2b = 0) : null;
      return _0x8cfex2b;
    },
    getLocalVar: function (_0x8cfex39) {
      return eval(_0x8cfex39);
    },
    getMediaType: function (_0x8cfex72) {
      try {
        if (_0x8cfex23 == "PPRO") {
          if (_0x8cfex72.type == 2) {
            return "Bin";
          } else {
            if (_0x8cfex72.type == 3) {
              return "Root";
            } else {
              var _0x8cfex60 = _0x8cfex72.getMediaPath();
              if (_0x8cfex60 == "") {
                if (_0x8cfex72.isSequence()) {
                  return "Sequence";
                } else {
                  return "Solid";
                }
              }
              var _0x8cfex68 = $.jt.pio.getPremiereMediaType(_0x8cfex72);
              if (_0x8cfex68 == "Still Image") {
                return "Still";
              }
              if (_0x8cfex68 == "Movie") {
                return "Video";
              }
              if (_0x8cfex68 == "Offline") {
                var _0x8cfex75 =
                  $.jt.pio.getPremiereOfflineMediaType(_0x8cfex72);
                if (_0x8cfex75 == "Audio and Video") {
                  return "Video";
                }
                if (_0x8cfex75 == "Video") {
                  return "Video";
                }
                if (_0x8cfex75 == "Audio") {
                  return "Audio";
                }
                return "Offline";
              }
              if (_0x8cfex68 == "Audio") {
                return "Audio";
              }
              if (_0x8cfex68 == "Video") {
                if ($.jt.pio.isImage(_0x8cfex60.split(".").pop())) {
                  return "ImageSequence";
                } else {
                  return "Video";
                }
              }
            }
          }
        } else {
          if (_0x8cfex23 == "AEFT") {
            var _0x8cfex3c = $.jt.pio.getAEMediaType(_0x8cfex72);
            if (_0x8cfex3c == "Folder") {
              return "Bin";
            } else {
              if (_0x8cfex3c != "Footage") {
                return _0x8cfex3c;
              } else {
                if (_0x8cfex72.file == null) {
                  return "Solid";
                } else {
                  if (_0x8cfex72.mainSource.isStill == true) {
                    return "Still";
                  } else {
                    if (
                      $.jt.pio.isImage(
                        _0x8cfex72.file.name.substring(
                          _0x8cfex72.file.name.lastIndexOf(".") + 1,
                        ),
                      )
                    ) {
                      return "ImageSequence";
                    } else {
                      if (!_0x8cfex72.hasVideo && _0x8cfex72.hasAudio) {
                        return "Audio";
                      } else {
                        return "Video";
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return _0x8cfex3c;
      } catch (e) {
        return null;
      }
    },
    getOMTemplates: function () {
      return _0x8cfex2f;
    },
    getPrMetadata: function (_0x8cfexa1, _0x8cfexa8) {
      var _0x8cfexa3 =
        "http://ns.adobe.com/premierePrivateProjectMetaData/1.0/";
      if (app.isDocumentOpen()) {
        if (_0x8cfexa1) {
          if (ExternalObject.AdobeXMPScript === undefined) {
            ExternalObject.AdobeXMPScript = new ExternalObject(
              "lib:AdobeXMPScript",
            );
          }
          if (ExternalObject.AdobeXMPScript !== undefined) {
            var _0x8cfexa9 = [];
            var _0x8cfexaa = [];
            var _0x8cfexa4 = _0x8cfexa1.getProjectMetadata();
            var _0x8cfexa5 = new XMPMeta(_0x8cfexa4);
            for (
              var _0x8cfexa6 = 0;
              _0x8cfexa6 < _0x8cfexa8.length;
              _0x8cfexa6 += 1
            ) {
              if (
                _0x8cfexa5.doesPropertyExist(_0x8cfexa3, _0x8cfexa8[_0x8cfexa6])
              ) {
                _0x8cfexa9.push([
                  _0x8cfexa8[_0x8cfexa6],
                  _0x8cfexa5.getProperty(_0x8cfexa3, _0x8cfexa8[_0x8cfexa6]),
                ]);
                _0x8cfexaa.push([
                  _0x8cfexa5.getProperty(_0x8cfexa3, _0x8cfexa8[_0x8cfexa6]),
                ]);
              }
            }
            return _0x8cfexaa;
          }
        }
      }
      return false;
    },
    getPremiereMediaType: function (_0x8cfex72) {
      var _0x8cfex73 = $.appEncoding;
      $.appEncoding = "UTF-8";
      var _0x8cfex74 = {
        Audio: "Audio",
        Bin: "Bin",
        Movie: "Movie",
        Offline: "Offline",
        Sequence: "Sequence",
        "Still Image": "Still Image",
        Video: "Video",
        "Yb;": "Still Image",
        "\uffaa\uffd5\uffe9\uffa4\ufff3": "Offline",
        "\uffaa\ufffc\uffc7\uffa3\uffaa": "Audio",
        "\uffb7\ufffc\uffb1\ufff3\uffb9": "Sequence",
        "\uffd3\uffc7\uffaa": "Video",
        "\uffd3\ufff3": "Bin",
        "\uffe0\ufffc\uffd3\ufffc": "Movie",
      };
      var _0x8cfex3c = $.jt.pio
        .getPrMetadata(_0x8cfex72, ["Column.Intrinsic.MediaType"])
        .toString();
      var _0x8cfex68 = _0x8cfex74[_0x8cfex3c] || "Movie";
      $.appEncoding = _0x8cfex73;
      return _0x8cfex68;
    },
    getPremiereOfflineMediaType: function (_0x8cfex72) {
      var _0x8cfex73 = $.appEncoding;
      $.appEncoding = "UTF-8";
      var _0x8cfex74 = {
        Audio: "Audio",
        "Audio and Video": "Audio and Video",
        Video: "Video",
        "\uffaa\ufffc\uffc7\uffa3\uffaa": "Audio",
        "\uffaa\ufffc\uffc7\uffa3\uffaah\uffd3\uffc7\uffaa": "Audio and Video",
        "\uffd3\uffc7\uffaa": "Video",
      };
      var _0x8cfex3c = $.jt.pio
        .getPrMetadata(_0x8cfex72, ["Column.PropertyText.OfflineProperties"])
        .toString();
      var _0x8cfex68 = _0x8cfex74[_0x8cfex3c] || "Audio and Video";
      $.appEncoding = _0x8cfex73;
      return _0x8cfex68;
    },
    getPresetFlag: function () {
      try {
        if (_0x8cfex2d == true) {
          _0x8cfex2d = false;
          return "true";
        } else {
          return "false";
        }
      } catch (e) {
        null;
      }
    },
    getProjectName: function (_0x8cfex8f) {
      if (_0x8cfex23 == "PPRO") {
        _0x8cfex3c = app.project.name.toString();
      } else {
        if (_0x8cfex23 == "AEFT") {
          _0x8cfex3c = decodeURI(app.project.file.name).toString();
        }
      }
      _0x8cfex8f === 1
        ? (_0x8cfex3c = _0x8cfex3c.substring(0, _0x8cfex3c.lastIndexOf(".")))
        : null;
      return _0x8cfex3c;
    },
    getRenderTemplates: function () {
      aeRenderPref = new File(
        _0x8cfex27.absoluteURI +
          "/Adobe After Effects " +
          parseFloat(app.version).toString() +
          " Prefs-indep-render.txt",
      );
      if (aeRenderPref.exists) {
        try {
          aeRenderPref.open("r", undefined, undefined);
          var _0x8cfexad = aeRenderPref.read();
          aeRenderPref.close();
          _0x8cfexad = _0x8cfexad.replace(/(\\\n\t\t)/g, "");
          _0x8cfexad = _0x8cfexad.replace(/(\"\")/g, "");
          var _0x8cfex170 = _0x8cfexad.match(/(["'])(?:(?=(\\?))\2.)*?\1/g);
          var _0x8cfex171 = $.jt.pio._.indexOf(
            _0x8cfex170,
            '"Render Settings List"',
          );
          var _0x8cfex172 = $.jt.pio._.indexOf(
            _0x8cfex170,
            '"_HIDDEN X-Factor"',
          );
          _0x8cfex170 = _0x8cfex170.slice(_0x8cfex171 + 1, _0x8cfex172);
          for (
            var _0x8cfex14 = 0;
            _0x8cfex14 < _0x8cfex170.length;
            _0x8cfex14 += 1
          ) {
            _0x8cfex170[_0x8cfex14] = _0x8cfex170[_0x8cfex14].replace(
              /\"/g,
              "",
            );
          }
        } catch (e) {
          _0x8cfex170 = [];
        }
      }
      return _0x8cfex170;
    },
    getSep: function () {
      if (Folder.fs == "Macintosh") {
        return "/";
      } else {
        return "\\";
      }
    },
    getSeqFromProjItem: function (_0x8cfex61) {
      var _0x8cfex62 = app.project.sequences.numSequences;
      var _0x8cfex3c = "";
      for (var _0x8cfex14 = 0; _0x8cfex14 < _0x8cfex62; _0x8cfex14 += 1) {
        if (
          app.project.sequences[_0x8cfex14].projectItem.nodeId ==
          _0x8cfex61.nodeId
        ) {
          _0x8cfex3c = app.project.sequences[_0x8cfex14];
        }
      }
      return _0x8cfex3c;
    },
    getSubFiles: function (_0x8cfex6c) {
      var _0x8cfex6d = _0x8cfex6c.getFiles();
      var _0x8cfex6e = _0x8cfex6d;
      var _0x8cfex6f = new Array();
      for (
        var _0x8cfex14 = _0x8cfex6d.length - 1;
        _0x8cfex14 > -1;
        --_0x8cfex14
      ) {
        var _0x8cfex70 = new File(_0x8cfex6d[_0x8cfex14]);
        var _0x8cfex71 = _0x8cfex70.open();
        if (_0x8cfex71 == false && _0x8cfex70.exists == true) {
          _0x8cfex6f.length == 0
            ? (_0x8cfex6f = $.jt.pio.getSubFiles(_0x8cfex6d[_0x8cfex14]))
            : (_0x8cfex6f = _0x8cfex6f.concat(
                $.jt.pio.getSubFiles(_0x8cfex6d[_0x8cfex14]),
              ));
          _0x8cfex6e.splice(_0x8cfex14, 1);
        } else {
          if (_0x8cfex70.exists == false) {
            _0x8cfex6e.splice(_0x8cfex14, 1);
          } else {
            _0x8cfex70.close();
          }
        }
      }
      _0x8cfex6e = _0x8cfex6e.concat(_0x8cfex6f);
      return _0x8cfex6e;
    },
    getSubItem: function (_0x8cfex67, _0x8cfex14) {
      if (_0x8cfex23 == "PPRO") {
        return _0x8cfex67.children[_0x8cfex14];
      } else {
        if (_0x8cfex23 == "AEFT") {
          return _0x8cfex67.items[_0x8cfex14 + 1];
        }
      }
    },
    getSubItems: function (_0x8cfex67, _0x8cfex3f) {
      var _0x8cfex68 = $.jt.pio.getMediaType(_0x8cfex67);
      if (_0x8cfex68 == "Bin" || _0x8cfex68 == "Root") {
        var _0x8cfex69 = [];
        if (_0x8cfex23 == "PPRO") {
          if (_0x8cfex3f == "array") {
            for (
              var _0x8cfex14 = 0;
              _0x8cfex14 < _0x8cfex67.children.numItems;
              _0x8cfex14 += 1
            ) {
              _0x8cfex69.push(_0x8cfex67.children[_0x8cfex14]);
            }
          } else {
            _0x8cfex69 = _0x8cfex67.children;
          }
        } else {
          if (_0x8cfex23 == "AEFT") {
            if (_0x8cfex3f == "array") {
              for (
                var _0x8cfex14 = 0;
                _0x8cfex14 < _0x8cfex67.numItems;
                _0x8cfex14 += 1
              ) {
                _0x8cfex69.push(_0x8cfex67.items[_0x8cfex14 + 1]);
              }
            } else {
              _0x8cfex69 = _0x8cfex67.items;
            }
          }
        }
        return _0x8cfex69;
      } else {
        return [];
      }
    },
    getWatchFlag: function () {
      if (_0x8cfex2c == true) {
        _0x8cfex2c = false;
        return "true";
      } else {
        return "false";
      }
    },
    getWatchPath: function (_0x8cfex79) {
      if (_0x8cfex23 == "PPRO") {
        _0x8cfex3c = $.jt.pio
          .getPrMetadata(_0x8cfex79, ["WatchBin"])
          .toString();
        _0x8cfex3c == null || _0x8cfex3c == ""
          ? (_0x8cfex3c = $.jt.pio
              .getPrMetadata(_0x8cfex79, ["WatchFolderPath"])
              .toString())
          : null;
      } else {
        if (_0x8cfex23 == "AEFT") {
          _0x8cfex3c = _0x8cfex79.comment.toString();
        }
      }
      var _0x8cfex7a = _0x8cfex3c.length;
      var _0x8cfex7b = _0x8cfex3c.lastIndexOf("|i");
      _0x8cfex7b > -1
        ? ((_0x8cfex7a = _0x8cfex7b), (_0x8cfex7b = false))
        : (_0x8cfex7b = true);
      var _0x8cfex7c = _0x8cfex3c.lastIndexOf("|s");
      if (typeof _0x8cfex7c == "boolean") {
        _0x8cfex7c == true ? (_0x8cfex7c = 1) : (_0x8cfex7c = 0);
      }
      if (_0x8cfex7c > -1) {
        _0x8cfex7a = _0x8cfex7c;
        var _0x8cfex11 = _0x8cfex3c.substring(
          _0x8cfex3c.lastIndexOf("|s") + 2,
          _0x8cfex3c.lastIndexOf("|s") + 3,
        );
        if (parseInt(_0x8cfex11) > -1 && parseInt(_0x8cfex11) < 3) {
          _0x8cfex7c = parseInt(_0x8cfex11);
        } else {
          _0x8cfex7c = 1;
        }
      } else {
        _0x8cfex7c = 1;
      }
      var _0x8cfex60 = _0x8cfex3c.substring(0, _0x8cfex7a);
      if (_0x8cfex60 == "n") {
        $.jt.pio.deletePrMetadata(_0x8cfex79, "WatchBin");
      }
      _0x8cfex3c = [_0x8cfex60, _0x8cfex7c, _0x8cfex7b];
      return _0x8cfex3c;
    },
    getXML: function () {
      $.jt.pio.existsXML();
      if (_0x8cfex25.exists == true) {
        _0x8cfex25.encoding = "UTF-8";
        _0x8cfex25.open("r", undefined, undefined);
        var _0x8cfexad = _0x8cfex25.read();
        try {
          _0x8cfexae = new XML(_0x8cfexad);
          _0x8cfex25.close();
        } catch (e) {
          _0x8cfex25.close();
          $.jt.pio.corruptedXML();
          return null;
        }
        return _0x8cfexae;
      } else {
        return null;
      }
    },
    imgSeqInfo: function (_0x8cfex65) {
      if (app.project.file == null && _0x8cfex23 == "AEFT") {
        $.jt.pio.aeAlert();
      } else {
        $.jt.pio.conWL("imgSeqInfo checking: " + _0x8cfex65.name.toString());
        var _0x8cfex14b = new RegExp(/[0-9]+$/);
        var _0x8cfex54 = $.jt.pio.projFootagePath(_0x8cfex65);
        var _0x8cfex14c = _0x8cfex54.substring(
          0,
          _0x8cfex54.lastIndexOf("/") + 1,
        );
        _0x8cfex23 == "AEFT"
          ? (_0x8cfex14d = _0x8cfex65.duration * _0x8cfex65.frameRate)
          : (_0x8cfex14d = parseInt(
              $.jt.pio
                .getPrMetadata(_0x8cfex65, ["Column.Intrinsic.MediaDuration"])
                .toString()
                .replace(/\:|\;/g, ""),
              10,
            ));
        $.jt.pio.conWL("Image Sequence Length: " + _0x8cfex14d.toString());
        var _0x8cfex14e = _0x8cfex54.substring(_0x8cfex54.lastIndexOf("/") + 1);
        var _0x8cfex14f = _0x8cfex14e.substring(
          0,
          _0x8cfex14e.lastIndexOf("."),
        );
        var _0x8cfex150 = _0x8cfex14e.substring(_0x8cfex14e.lastIndexOf("."));
        var _0x8cfex151 = _0x8cfex14f.match(_0x8cfex14b);
        var _0x8cfex152 = _0x8cfex151.toString().length;
        var _0x8cfex153 = [];
        $.jt.pio.conWL(
          "imgSeqInfo generating File List for: " + _0x8cfex65.name.toString(),
        );
        for (var _0x8cfex14 = 0; _0x8cfex14 < _0x8cfex14d; _0x8cfex14 += 1) {
          var _0x8cfex154 = (parseFloat(_0x8cfex151) + _0x8cfex14).toString();
          _0x8cfex154 = $.jt.pio.digitCount(_0x8cfex154, _0x8cfex152);
          var _0x8cfex155 = _0x8cfex14f.replace(_0x8cfex14b, _0x8cfex154);
          _0x8cfex153.push(_0x8cfex14c + _0x8cfex155 + _0x8cfex150);
        }
        $.jt.pio.conWL(
          "imgSeqInfo finished File List for: " + _0x8cfex65.name.toString(),
        );
        return _0x8cfex153;
      }
    },
    importFootage: function (_0x8cfex13b, _0x8cfex79, _0x8cfex7b) {
      if (app.project.file == null && _0x8cfex23 == "AEFT") {
      } else {
        if (_0x8cfex23 == "AEFT") {
          $.jt.pio.progressDialog.build();
        }
        _0x8cfex13b = _0x8cfex13b.sort();
        if (_0x8cfex7b) {
          $.jt.pio.conWL(
            "Tests all images for sequences: " + _0x8cfex79.name.toString(),
          );
          var _0x8cfex13c = _0x8cfex13b.length;
          var _0x8cfexef = 0;
          for (
            var _0x8cfex13d = 0;
            _0x8cfex13d < _0x8cfex13b.length;
            _0x8cfex13d += 1
          ) {
            $.jt.pio.conWL(
              "Testing for Sequence: " + _0x8cfex13b[_0x8cfex13d].toString(),
            );
            if (
              $.jt.pio.testForSequence(_0x8cfex13b, _0x8cfex13b[_0x8cfex13d]) >
              -1
            ) {
              $.jt.pio.conWL(
                "Is sequence, begin import: " +
                  _0x8cfex13b[_0x8cfex13d].toString(),
              );
              if (_0x8cfex23 == "AEFT") {
                _0x8cfex13e = new ImportOptions(
                  new File(_0x8cfex13b[_0x8cfex13d]),
                );
                _0x8cfex13e.sequence = true;
                _0x8cfex13f = app.project.importFile(_0x8cfex13e);
                if (_0x8cfex13f instanceof FootageItem !== true) {
                  return false;
                }
                _0x8cfex13f.parentFolder = _0x8cfex79;
              } else {
                if (_0x8cfex23 == "PPRO") {
                  var _0x8cfex13a = app.project.importFiles(
                    [_0x8cfex13b[_0x8cfex13d]],
                    1,
                    _0x8cfex79,
                    1,
                  );
                  _0x8cfex13f = $.jt.pio.footageFromPath(
                    _0x8cfex13b[_0x8cfex13d],
                    _0x8cfex79,
                  );
                  if (_0x8cfex13f instanceof ProjectItem !== true) {
                    return false;
                  }
                }
              }
              $.jt.pio.conWL(
                "Import Complete: " + _0x8cfex13b[_0x8cfex13d].toString(),
              );
              _0x8cfex13b = $.jt.pio._.difference(
                _0x8cfex13b,
                $.jt.pio.imgSeqInfo(_0x8cfex13f),
              );
              --_0x8cfex13d;
              $.jt.pio.conWL("Import Array Updated: ");
            }
            _0x8cfexef++;
            if (_0x8cfexef > _0x8cfex13c) {
              break;
            }
          }
          $.jt.pio.conWL(
            "Loop count: " + _0x8cfexef.toString() + _0x8cfex79.name.toString(),
          );
        }
        $.jt.pio.conWL(
          "Imports Regular Footage: " + _0x8cfex79.name.toString(),
        );
        if (_0x8cfex23 == "AEFT") {
          var _0x8cfex140 = 100 / _0x8cfex13b.length;
          var _0x8cfex64 = _0x8cfex13b.length;
          for (
            var _0x8cfex14 = 0;
            _0x8cfex14 < _0x8cfex13b.length;
            _0x8cfex14 += 1
          ) {
            $.jt.pio.conWL(_0x8cfex14 / _0x8cfex13b.length);
            app.scheduleTask(
              "$.jt.pio.progressDialog.window.progBar.value +=" +
                _0x8cfex140.toString() +
                ";$.jt.pio.progressDialog.window.update();",
              0,
              false,
            );
            try {
              var _0x8cfex141 = new File(_0x8cfex13b[_0x8cfex14]);
              var _0x8cfex13f = app.project.importFile(
                new ImportOptions(_0x8cfex141),
              );
              if (_0x8cfex13f instanceof FootageItem !== true) {
                $.jt.pio.progressDialog.window.close();
                return false;
              }
              _0x8cfex13f.parentFolder = _0x8cfex79;
            } catch (e) {
              $.jt.pio.conWL(
                "Import Failed. Error: " +
                  e.toString() +
                  " Line: " +
                  e.line.toString(),
              );
            }
          }
        } else {
          if (_0x8cfex23 == "PPRO") {
            try {
              app.project.importFiles(_0x8cfex13b, 1, _0x8cfex79, 0);
              _0x8cfex13f = $.jt.pio.footageFromPath(
                _0x8cfex13b[0],
                _0x8cfex79,
              );
              if (_0x8cfex13f instanceof ProjectItem !== true) {
                return false;
              }
            } catch (e) {
              $.jt.pio.conWL(
                "Import Failed. Error: " +
                  e.toString() +
                  " Line: " +
                  e.line.toString(),
              );
            }
            return true;
          }
        }
        $.jt.pio.conWL(
          "Moves files to ParentBin: " + _0x8cfex79.name.toString(),
        );
        if (
          (_0x8cfex23 == "PPRO" && app.version == "11.1.0") ||
          app.version == "11.1.1"
        ) {
          var _0x8cfex142 = new Array();
          for (
            var _0x8cfex14 = 0;
            _0x8cfex14 < app.project.rootItem.children.numItems;
            _0x8cfex14 += 1
          ) {
            var _0x8cfex143 = app.project.rootItem.children[_0x8cfex14];
            if (_0x8cfex143.type == 1) {
              if (
                _0x8cfex13b
                  .toString()
                  .indexOf(_0x8cfex143.getMediaPath().toString()) > -1
              ) {
                _0x8cfex142.push(_0x8cfex143);
              }
            }
          }
          for (
            var _0x8cfex14 = 0;
            _0x8cfex14 < _0x8cfex142.length;
            _0x8cfex14 += 1
          ) {
            _0x8cfex142[_0x8cfex14].moveBin(_0x8cfex79);
          }
        }
      }
    },
    importFootageAE: function (_0x8cfex132, _0x8cfexd8, _0x8cfex133) {
      $.jt.pio.conWL(
        "Importing " +
          _0x8cfex132.length.toString() +
          " files to " +
          _0x8cfexd8.name.toString(),
      );
      app.scheduleTask("$.jt.pio.progressDialog.build();", 0, false);
      var _0x8cfex64 = _0x8cfex132.length;
      var _0x8cfex134 = [];
      var _0x8cfex135 = _0x8cfexd8.id;
      var _0x8cfex136 = function (
        _0x8cfex137,
        _0x8cfex138,
        _0x8cfex17,
        _0x8cfex139,
        _0x8cfex135,
      ) {
        return (
          'try{if($.jt.pio.progressDialog.state === "good"){$.jt.pio.progressDialog.window.progBar.value =' +
          (((_0x8cfex138 + 1) / _0x8cfex17) * 100).toString() +
          ';var impOpt = new ImportOptions(new File("' +
          _0x8cfex137.toString() +
          '"));' +
          "impOpt.sequence = " +
          _0x8cfex139 +
          ";" +
          "var impItem = app.project.importFile(impOpt);" +
          "impItem.parentFolder = app.project.itemByID(" +
          _0x8cfex135 +
          ");" +
          "}else{$.jt.pio.cancelTasks();}" +
          '}catch(e){$.jt.pio.failedImports+=1;$.jt.pio.conWL("failed import for: ' +
          _0x8cfex137.toString() +
          '")}'
        );
      };
      for (var _0x8cfex14 = 0; _0x8cfex14 < _0x8cfex64; _0x8cfex14 += 1) {
        if ($.jt.pio.progressDialog.state !== "good") {
          break;
        }
        try {
          $.jt.pio.conWL(
            "scheduling import " + _0x8cfex14 + " of " + _0x8cfex64,
          );
          $.jt.pio.tasks.push(
            app.scheduleTask(
              _0x8cfex136(
                new File(_0x8cfex132[_0x8cfex14]).absoluteURI,
                _0x8cfex14,
                _0x8cfex64,
                _0x8cfex133,
                _0x8cfex135,
              ),
              0,
              false,
            ),
          );
        } catch (e) {
          $.jt.pio.progressDialog.state = "failed";
          $.jt.pio.conWL("failed import for: " + _0x8cfex132[_0x8cfex14]);
          $.jt.pio.errWin(e, e.line);
        }
      }
      $.jt.pio.conWL("End Import");
      if ($.jt.pio.progressDialog.state == "good") {
        app.scheduleTask("$.jt.pio.progressDialog.window.hide()", 0, false);
        return "good";
      } else {
        if ($.jt.pio.progressDialog.state == "cancelled") {
          $.jt.pio.cancelTasks();
          app.scheduleTask("$.jt.pio.progressDialog.window.close()", 0, false);
          return "cancelled";
        } else {
          if ($.jt.pio.progressDialog.state == "failed") {
            $.jt.pio.cancelTasks();
            app.scheduleTask(
              "$.jt.pio.progressDialog.window.close()",
              0,
              false,
            );
            return "failed";
          }
        }
      }
    },
    importFootagePPRO: function (_0x8cfex132, _0x8cfexd8, _0x8cfex133) {
      $.jt.pio.conWL(
        "Importing " +
          _0x8cfex132.length.toString() +
          " files to " +
          _0x8cfexd8.name.toString(),
      );
      if (_0x8cfex133) {
        var _0x8cfex64 = _0x8cfex132.length;
        for (var _0x8cfex14 = 0; _0x8cfex14 < _0x8cfex64; _0x8cfex14 += 1) {
          var _0x8cfex13a = app.project.importFiles(
            [_0x8cfex132[_0x8cfex14]],
            1,
            _0x8cfexd8,
            1,
          );
          $.jt.pio.conWL("importRes was: " + _0x8cfex13a);
          impFile = $.jt.pio.footageFromPath(
            _0x8cfex132[_0x8cfex14],
            _0x8cfexd8,
          );
          $.jt.pio.conWL(impFile);
          if (impFile instanceof ProjectItem !== true) {
            return "cancelled";
          }
        }
      } else {
        var _0x8cfex13a = app.project.importFiles(
          _0x8cfex132,
          1,
          _0x8cfexd8,
          0,
        );
        $.jt.pio.conWL("importRes was: " + _0x8cfex13a);
        impFile = $.jt.pio.footageFromPath(
          _0x8cfex132[_0x8cfex132.length - 1],
          _0x8cfexd8,
        );
        if (impFile instanceof ProjectItem !== true) {
          return "cancelled";
        }
      }
      $.jt.pio.conWL("End Import");
    },
    ini: function (_0x8cfex38) {
      _0x8cfex21 = _0x8cfex38;
      $.jt.pio.setAppID();
      _0x8cfex28 = $.jt.pio.getSep();
      if (_0x8cfex23 == "PPRO") {
        _0x8cfex24 = new Folder(
          Folder.myDocuments.fsName +
            _0x8cfex28 +
            "Adobe" +
            _0x8cfex28 +
            "pro_io" +
            _0x8cfex28 +
            "premiere_pro",
        );
        _0x8cfex25 = new File(
          _0x8cfex24.fsName + _0x8cfex28 + "export_presets.xml",
        );
        _0x8cfex26 = new File(
          _0x8cfex24.fsName + _0x8cfex28 + "pro_io_presets.json",
        );
        _0x8cfex31 = new File(
          _0x8cfex24.fsName + _0x8cfex28 + "allowed_extensions.txt",
        );
        $.jt.pio.prProjectPanelChanged();
      } else {
        if (_0x8cfex23 == "AEFT") {
          _0x8cfex24 = new Folder(
            Folder.myDocuments.fsName +
              _0x8cfex28 +
              "Adobe" +
              _0x8cfex28 +
              "pro_io" +
              _0x8cfex28 +
              "after_effects",
          );
          _0x8cfex25 = new File(
            _0x8cfex24.fsName + _0x8cfex28 + "export_presets.xml",
          );
          _0x8cfex26 = new File(
            _0x8cfex24.fsName + _0x8cfex28 + "pro_io_presets.json",
          );
          _0x8cfex31 = new File(
            _0x8cfex24.fsName + _0x8cfex28 + "allowed_extensions.txt",
          );
          _0x8cfex27 = new Folder(
            Folder.userData.absoluteURI +
              _0x8cfex28 +
              "Adobe" +
              _0x8cfex28 +
              "After Effects" +
              _0x8cfex28 +
              parseFloat(app.version).toString(),
          );
        }
      }
      $.jt.pio.existsXML();
      $.jt.pio.updateCurrentFolder();
      this.settings.get();
      $.jt.pio.conWL("Initialization Complete");
      $.jt.pio.presetsXML = _0x8cfex25;
      $.jt.pio.pioDir = _0x8cfex24;
    },
    isBin: function (_0x8cfex72) {
      if (_0x8cfex23 == "PPRO") {
        return _0x8cfex72.type == 2;
      } else {
        if (_0x8cfex23 == "AEFT") {
          return _0x8cfex72 instanceof FolderItem;
        }
      }
    },
    isImage: function (_0x8cfex156) {
      if (app.project.file == null && _0x8cfex23 == "AEFT") {
        $.jt.pio.aeAlert();
      } else {
        var _0x8cfex157 = false;
        var _0x8cfex158 = [
          "PSD",
          "PNG",
          "TIFF",
          "TIF",
          "IFF",
          "SGI",
          "EXR",
          "HDR",
          "JPG",
          "JPEG",
          "DPX",
          "ARI",
          "TGA",
        ];
        for (
          var _0x8cfex14 = 0;
          _0x8cfex14 < _0x8cfex158.length;
          _0x8cfex14 += 1
        ) {
          if (_0x8cfex158[_0x8cfex14] == _0x8cfex156.toUpperCase()) {
            _0x8cfex157 = true;
          }
        }
        if (_0x8cfex157 == true) {
          return true;
        } else {
          return false;
        }
      }
    },
    isOffline: function (_0x8cfex72) {
      if (_0x8cfex23 == "PPRO") {
        return (
          $.jt.pio
            .getPrMetadata(_0x8cfex72, ["Column.PropertyText.Status"])
            .toString()
            .indexOf("Offline") > -1
        );
      }
      if (_0x8cfex23 == "AEFT") {
        return _0x8cfex72.footageMissing;
      }
    },
    isRelativePath: function (_0x8cfex60) {
      return _0x8cfex60 == Folder.decode(new Folder(_0x8cfex60).relativeURI);
    },
    labelBin: function (_0x8cfex79, _0x8cfex7d) {
      if (_0x8cfex23 == "PPRO" && app.version.split(".")[0] > 11) {
        _0x8cfex7d != true && $.jt.pio.settings.colorLabelFlag == true
          ? _0x8cfex79.setColorLabel(9)
          : _0x8cfex79.setColorLabel(7);
      } else {
        if (_0x8cfex23 == "AEFT" && _0x8cfex79) {
          _0x8cfex7d != true && $.jt.pio.settings.colorLabelFlag == true
            ? (_0x8cfex79.label = 8)
            : (_0x8cfex79.label = 2);
        }
      }
    },
    latestAme: function () {
      ameLatest = BridgeTalk.getSpecifier("ame");
      ameLatest = ameLatest.substring(ameLatest.lastIndexOf("-") + 1);
      return ameLatest;
    },
    launchAME: function () {
      if (app.project.file == null && _0x8cfex23 == "AEFT") {
        $.jt.pio.aeAlert();
      } else {
        var _0x8cfex100 = "app.launch();";
        var _0x8cfex101 = new BridgeTalk();
        _0x8cfex101.target = $.jt.pio.ameVersion();
        if (!BridgeTalk.isInstalled(_0x8cfex101.target)) {
          _0x8cfex101.target = "ame";
        }
        _0x8cfex101.body = _0x8cfex100;
        _0x8cfex101.send();
        return JSON.stringify(_0x8cfex101);
      }
    },
    moveXML: function (_0x8cfexbe, _0x8cfexc1) {
      if (app.project.file == null && _0x8cfex23 == "AEFT") {
        $.jt.pio.aeAlert();
      } else {
        _0x8cfexbe = _0x8cfexbe.sort().reverse();
        var _0x8cfexba = $.jt.pio.getXML();
        var _0x8cfexc2 = [];
        $.jt.pio._.each(_0x8cfexbe, function (_0x8cfex3d) {
          _0x8cfexc2.push(_0x8cfexba.export[_0x8cfex3d]);
          delete _0x8cfexba.export[_0x8cfex3d];
        });
        _0x8cfexc2 = _0x8cfexc2.reverse();
        $.jt.pio._.each(_0x8cfexc2, function (_0x8cfexc3) {
          if (_0x8cfexc1 > 0) {
            _0x8cfexba.insertChildAfter(
              _0x8cfexba.export[_0x8cfexc1 - 1],
              _0x8cfexc3,
            );
          } else {
            _0x8cfexba.insertChildBefore(
              _0x8cfexba.export[_0x8cfexc1],
              _0x8cfexc3,
            );
          }
        });
        $.jt.pio.writeXML(_0x8cfexba);
      }
    },
    newBin: function (_0x8cfex90, _0x8cfex91) {
      if (_0x8cfex23 == "PPRO") {
        _0x8cfex92 = app.project.rootItem.createBin(_0x8cfex90);
        _0x8cfex91 ? _0x8cfex92.moveBin(_0x8cfex91) : null;
      } else {
        if (_0x8cfex23 == "AEFT") {
          _0x8cfex92 = app.project.items.addFolder(_0x8cfex90);
          _0x8cfex91 ? (_0x8cfex92.parentFolder = _0x8cfex91) : null;
        }
      }
      return _0x8cfex92;
    },
    onEncoderJobQueued: function () {
      if (app.project.file == null && _0x8cfex23 == "AEFT") {
        $.jt.pio.aeAlert();
      } else {
        $.jt.pio.conWL("AME Job Queued");
        $.jt.pio.clearLoading();
      }
    },
    playHead: {
      get: function () {
        if (app.project.activeSequence != undefined) {
          return app.project.activeSequence.getPlayerPosition().seconds;
        } else {
          return null;
        }
      },
      position: 0,
      save: function () {
        if (app.project.activeSequence != undefined) {
          $.jt.pio.playHead.position =
            app.project.activeSequence.getPlayerPosition().seconds;
          return $.jt.pio.playHead.position;
        } else {
          $.jt.pio.playHead.position = null;
        }
      },
    },
    prProjectPanelChanged: function () {
      if (parseInt(app.version) > 11) {
        success = app.bind(
          "onSourceClipSelectedInProjectPanel",
          $.jt.pio.prProjectPanelSelectionChanged,
        );
      }
    },
    prProjectPanelSelectionChanged: function (_0x8cfexb7, _0x8cfex80) {
      var _0x8cfexb8 = _0x8cfex80;
      _0x8cfex29 = _0x8cfexb7;
      _0x8cfex2a = new Date();
      $.jt.pio.playHead.save();
      $.jt.pio.sequenceSelection.save();
    },
    presetsXMLLocation: function () {
      var _0x8cfex174 = new Folder(_0x8cfex25.path);
      _0x8cfex174.execute();
    },
    progressDialog: {
      build: function () {
        $.jt.pio.progressDialog.state = "good";
        var _0x8cfex18e =
          'palette{orientation:"column", alignChildren:["center", "top"], text: "Import Files", size:[380,110],                            status: StaticText{text:"Import Files...", alignment:["fill", "center"]},                            progBar: Progressbar{minvalue:0, maxvalue:100, value:0, alignment:["fill", "center"]},                            cancelButton: Button{size:[100, 25], text:"Cancel"},                            }';
        $.jt.pio.progressDialog.window = new Window(_0x8cfex18e);
        $.jt.pio.progressDialog.window.cancelButton.onClick = function () {
          $.jt.pio.progressDialog.state = "cancelled";
          $.jt.pio.progressDialog.window.close();
        };
        $.jt.pio.progressDialog.window.onClose = function () {
          $.jt.pio.progressDialog.state = "cancelled";
        };
        $.jt.pio.progressDialog.window.show();
      },
      state: "good",
      window: null,
    },
    projFootagePath: function (_0x8cfex65) {
      if (_0x8cfex23 == "PPRO") {
        return _0x8cfex65.getMediaPath();
      } else {
        if (_0x8cfex23 == "AEFT") {
          return _0x8cfex65.file.fsName;
        }
      }
    },
    projRoot: function () {
      if (_0x8cfex23 == "PPRO") {
        return app.project.rootItem;
      } else {
        if (_0x8cfex23 == "AEFT") {
          return app.project.rootFolder;
        }
      }
    },
    projectOpened: function () {
      if (_0x8cfex23 == "AEFT") {
        if (app.project.file) {
          return true;
        } else {
          return false;
        }
      } else {
        if (_0x8cfex23 == "PPRO") {
          if (app.project.path) {
            return true;
          } else {
            return false;
          }
        }
      }
    },
    relativeDialog: function (_0x8cfex126) {
      var _0x8cfex149 = new Folder(_0x8cfex126);
      var _0x8cfex14a = confirm(
        "Use Relative Path to Project? \r\r[Yes] Relative: " +
          Folder.decode(_0x8cfex149.relativeURI) +
          "\r\r[No] Absolute: " +
          Folder.decode(_0x8cfex149.fsName),
      );
      if (_0x8cfex14a == true) {
        _0x8cfex149 = _0x8cfex149.relativeURI;
      } else {
        _0x8cfex149 = _0x8cfex149.fsName;
      }
      return Folder.decode(_0x8cfex149);
    },
    reloadFootage: function (_0x8cfex76) {
      if (_0x8cfex23 == "PPRO") {
        var _0x8cfex77 = _0x8cfex76.getMediaPath();
        var _0x8cfex78 = parseFloat(
          $.jt.pio.getPrMetadata(_0x8cfex76, [
            "Column.Intrinsic.MediaTimebase",
          ]),
        );
        _0x8cfex3c = _0x8cfex76.changeMediaPath(_0x8cfex77);
      } else {
        if (_0x8cfex23 == "AEFT") {
          _0x8cfex3c = _0x8cfex76.mainSource.reload();
        }
      }
      return _0x8cfex3c;
    },
    reloadPanel: function () {
      try {
        try {
          var _0x8cfex40 = new ExternalObject("lib:PlugPlugExternalObject");
        } catch (e) {
          alert(e);
        }
        if (_0x8cfex40) {
          var _0x8cfex41 = new CSXSEvent();
          _0x8cfex41.type = "reloadPanel";
          _0x8cfex41.data = "reload";
          _0x8cfex41.dispatch();
        }
      } catch (err) {
        return null;
      }
    },
    removeUnknownChar: function (_0x8cfex11) {
      typeof _0x8cfex11 != "string"
        ? (_0x8cfex11 = _0x8cfex11.toString())
        : null;
      _0x8cfex11 = _0x8cfex11.replace(/[^\x00-\x7F]/g, "");
      return _0x8cfex11;
    },
    removeXML: function (_0x8cfexc0) {
      if (app.project.file == null && _0x8cfex23 == "AEFT") {
        $.jt.pio.aeAlert();
      } else {
        var _0x8cfexba = $.jt.pio.getXML();
        for (
          var _0x8cfex14 = 0;
          _0x8cfex14 < _0x8cfexc0.length;
          _0x8cfex14 += 1
        ) {
          delete _0x8cfexba.export[parseInt(_0x8cfexc0[_0x8cfex14], 10)];
        }
        $.jt.pio.writeXML(_0x8cfexba);
      }
    },
    renderM: function (_0x8cfexc5, _0x8cfexc6) {
      if ($.jt.pio.projectOpened() == false) {
        return JSON.stringify({ data: "noproject", mode: "" });
      } else {
        var _0x8cfexc7 = "ame";
        var _0x8cfexba = $.jt.pio.getXML();
        if (_0x8cfexba == null || _0x8cfexba.export[_0x8cfexc5] == null) {
          alert("Please Create an Export Preset");
          $.jt.pio.clearLoading();
          return null;
        }
        var _0x8cfexc8 = $.jt.pio.getActiveItems();
        var _0x8cfexb6 = $.jt.pio.getProjectName();
        var _0x8cfexc9 = false;
        var _0x8cfexca = false;
        var _0x8cfexcb = "";
        var _0x8cfexcc = [];
        if (_0x8cfexc8.length > 0) {
          for (
            var _0x8cfex14 = 0;
            _0x8cfex14 < _0x8cfexc8.length;
            _0x8cfex14 += 1
          ) {
            if (_0x8cfexc8[_0x8cfex14] != null) {
              var _0x8cfexcd = _0x8cfexc8[_0x8cfex14];
              var _0x8cfexb4 = _0x8cfexcd.name;
              var _0x8cfexce = new File(Folder.current);
              var _0x8cfexcf = [];
              var _0x8cfexd0 = [];
              var _0x8cfexd1 = [];
              var _0x8cfexd2 = false;
              for (
                var _0x8cfexd3 = 0;
                _0x8cfexd3 < _0x8cfexba.export[_0x8cfexc5].output.length();
                _0x8cfexd3 += 1
              ) {
                var _0x8cfexd4 = xmlAttr(
                  _0x8cfexba.export[_0x8cfexc5].output[_0x8cfexd3],
                  "file",
                );
                var _0x8cfexd5 =
                  xmlAttr(
                    _0x8cfexba.export[_0x8cfexc5].output[_0x8cfexd3],
                    "subfolder",
                  ) == "true";
                var _0x8cfexd6 = xmlAttr(
                  _0x8cfexba.export[_0x8cfexc5].output[_0x8cfexd3],
                  "renderTemplate",
                );
                _0x8cfexd6 === "" ? (_0x8cfexd6 = undefined) : null;
                if (!_0x8cfexd4 || _0x8cfexd4 === "") {
                  alert("Please Select an Export Format");
                  return JSON.stringify({ data: "cancel", mode: _0x8cfexc7 });
                } else {
                  if (_0x8cfex23 === "PPRO") {
                    _0x8cfexd4 = new File(_0x8cfexd4);
                    _0x8cfexc7 = "ame";
                  } else {
                    if (_0x8cfex23 === "AEFT") {
                      if (_0x8cfexd4.indexOf(".epr") > -1) {
                        _0x8cfexd4 = new File(_0x8cfexd4);
                        _0x8cfexc7 = "ame";
                      } else {
                        _0x8cfexc7 = "ae";
                      }
                    }
                  }
                }
                if (
                  (_0x8cfexc7 == "ame" && _0x8cfexd4.exists === true) ||
                  (_0x8cfexc7 == "ae" && _0x8cfex2f[_0x8cfexd4] !== undefined)
                ) {
                  _0x8cfexc7 == "ame" && _0x8cfexc9 == false
                    ? ($.jt.pio.launchAME(), (_0x8cfexc9 = true))
                    : null;
                  var _0x8cfexb3 = "";
                  _0x8cfexb3 += xmlAttr(
                    _0x8cfexba.export[_0x8cfexc5].output[_0x8cfexd3],
                    "nameFormat",
                  );
                  _0x8cfexc7 == "ame"
                    ? (_0x8cfexd7 = $.jt.pio.eprExt(_0x8cfexd4))
                    : (_0x8cfexd7 = _0x8cfex2f[_0x8cfexd4].extension);
                  if (_0x8cfexd7 && _0x8cfexd7 != null) {
                    var _0x8cfexd8 = xmlAttr(
                      _0x8cfexba.export[_0x8cfexc5].output[_0x8cfexd3],
                      "destination",
                    );
                    _0x8cfexd8 == "" || _0x8cfexd8 == null
                      ? (_0x8cfexd8 = xmlAttr(
                          _0x8cfexba.export[_0x8cfexc5],
                          "destination",
                        ))
                      : null;
                    _0x8cfexd8 == "" || _0x8cfexd8 == null
                      ? _0x8cfexd8 == undefined
                      : (_0x8cfexd8 = new Folder(Folder.decode(_0x8cfexd8)));
                    if (_0x8cfexca == true) {
                      outputPath = Folder.current;
                      _0x8cfexd8 = Folder.current;
                    } else {
                      if (_0x8cfexd8 && _0x8cfexd8.exists) {
                        null;
                      } else {
                        var _0x8cfexd9 = _0x8cfexd8.toString();
                        _0x8cfexd9 == ""
                          ? (_0x8cfexd9 =
                              "Export path is missing. Continue Export?\r\r")
                          : (_0x8cfexd9 =
                              "Cannot find path. Continue Export?\r\rPath not found:\r\r" +
                              _0x8cfexd9 +
                              "\r\r");
                        var _0x8cfexda = confirm(
                          _0x8cfexd9 + "(Project directory will be used.)",
                          false,
                          "Missing Path",
                        );
                        if (_0x8cfexda === true) {
                          $.jt.pio.updateCurrentFolder();
                          outputPath = Folder.current;
                          _0x8cfexd8 = Folder.current;
                          _0x8cfexca = true;
                        } else {
                          return JSON.stringify({
                            data: "cancel",
                            mode: "ame",
                          });
                        }
                      }
                    }
                    var _0x8cfexdb = _0x8cfexb3.indexOf("#VV");
                    _0x8cfexb3 = $.jt.pio.wildcardReplace(
                      _0x8cfexb3,
                      _0x8cfexb4,
                      _0x8cfexc8[_0x8cfex14],
                      _0x8cfexb6,
                    );
                    if (_0x8cfexd5 === false) {
                      _0x8cfexdc = _0x8cfexb3 + "." + _0x8cfexd7;
                    } else {
                      _0x8cfexdc = _0x8cfexb3;
                    }
                    if (_0x8cfexd8 !== undefined) {
                      var _0x8cfexdd =
                        _0x8cfexd8.fsName + _0x8cfex28 + _0x8cfexdc;
                    } else {
                      var _0x8cfexdd =
                        outputPath.fsName + _0x8cfex28 + _0x8cfexdc;
                    }
                    if (_0x8cfexdb > -1) {
                      if (_0x8cfexb3.indexOf("#VVS") > -1) {
                        var _0x8cfexde = $.jt.pio.findVersion(_0x8cfexdd, true);
                        if (_0x8cfexde == undefined) {
                          _0x8cfexde = "01";
                        }
                        _0x8cfexdd = _0x8cfexdd.replace("#VVS", _0x8cfexde);
                        _0x8cfexdc = _0x8cfexdc.replace("#VVS", _0x8cfexde);
                      } else {
                        var _0x8cfexde = $.jt.pio.findVersion(
                          _0x8cfexdd,
                          false,
                        );
                      }
                      _0x8cfexdd = _0x8cfexdd.replace("#VV", _0x8cfexde);
                      _0x8cfexdc = _0x8cfexdc.replace("#VV", _0x8cfexde);
                      if (_0x8cfexde == undefined) {
                        _0x8cfexde = "01";
                      }
                    }
                    if (_0x8cfexd5 === true) {
                      var _0x8cfexdf = new Folder(_0x8cfexdd);
                      if (_0x8cfexc7 == "ame") {
                        _0x8cfexdf.create();
                      }
                      _0x8cfexdc += "." + _0x8cfexd7;
                      _0x8cfexdd += _0x8cfex28 + _0x8cfexdc;
                    }
                    var _0x8cfexe0 = new File(_0x8cfexdd);
                    if (_0x8cfexe0.exists) {
                      var _0x8cfexe1 = confirm(
                        "A file with the name \r" +
                          _0x8cfexe0.name +
                          " \ralready exists. Overwrite anyway? \r(select No to keep both)",
                        true,
                        "File Already Exists",
                      );
                      if (_0x8cfexe1) {
                        _0x8cfexe0.remove();
                        _0x8cfexe0.close();
                      } else {
                        var _0x8cfex8f = _0x8cfexdd.substring(
                          0,
                          _0x8cfexdd.lastIndexOf("."),
                        );
                        var _0x8cfexe2 = _0x8cfexdd.substring(
                          _0x8cfexdd.lastIndexOf("."),
                        );
                        for (
                          var _0x8cfexe3 = 1;
                          _0x8cfexe0.exists;
                          _0x8cfexe3++
                        ) {
                          _0x8cfexdd =
                            _0x8cfex8f +
                            "_" +
                            _0x8cfexe3.toString() +
                            _0x8cfexe2;
                          _0x8cfexe0 = new File(_0x8cfexdd);
                        }
                      }
                    }
                    _0x8cfexc7 == "ame"
                      ? (_0x8cfexcf.push(_0x8cfexd4.fsName),
                        _0x8cfexd4.close(),
                        _0x8cfexd1.push(_0x8cfexdd))
                      : (_0x8cfexcf.push(_0x8cfexd4),
                        _0x8cfexd0.push(_0x8cfexd6),
                        _0x8cfexd1.push(new File(_0x8cfexdd)));
                    _0x8cfexce.close();
                  } else {
                    if (_0x8cfexc7 == "ame") {
                      alert(
                        "EPR Preset File is corrupted: \r\r" +
                          _0x8cfexd4.toString() +
                          "\r\rPlease try another file.",
                        "Preset Corrupted",
                      );
                    } else {
                      if (
                        confirm(
                          "AE Preset is corrupted: \r\r" +
                            _0x8cfexd4.toString() +
                            "\r\rWould you like to load an AOM Preset file instead?",
                          "Preset Corrupted",
                        )
                      ) {
                        app.executeCommand(2150);
                      }
                    }
                    return JSON.stringify({ data: "cancel", mode: _0x8cfexc7 });
                  }
                } else {
                  if (_0x8cfexc7 == "ame") {
                    alert(
                      "EPR Preset File cannot be found: \r\r" +
                        _0x8cfexd4.toString() +
                        "\r\rPlease try another file.",
                      "Preset not Found",
                    );
                  } else {
                    if (
                      confirm(
                        "AE Preset cannot be found: \r\r" +
                          _0x8cfexd4.toString() +
                          "\r\rWould you like to load an AOM Preset file instead?",
                        "Preset not Found",
                      )
                    ) {
                      app.executeCommand(2150);
                    }
                  }
                  $.jt.pio.clearLoading();
                }
              }
              if (_0x8cfexcf.length > 0) {
                _0x8cfexcc.push({
                  destinations: _0x8cfexd1,
                  presets: _0x8cfexcf,
                  projectItem: _0x8cfexcd,
                  renderTemplates: _0x8cfexd0,
                  subfolder: _0x8cfexd5,
                });
              }
            } else {
              _0x8cfex23 == "AEFT"
                ? alert("Please select one composition.")
                : alert("Please open one sequence.");
              $.jt.pio.clearLoading();
            }
          }
          if (_0x8cfexc7 == "ae") {
            _0x8cfex3c = $.jt.pio.AEtoRenderQueue(_0x8cfexcc);
          } else {
            if (_0x8cfex23 == "AEFT") {
              _0x8cfex3c = $.jt.pio.AEtoAME(_0x8cfexcc, _0x8cfexc6);
            } else {
              if (_0x8cfex23 == "PPRO") {
                _0x8cfex3c = $.jt.pio.PPROtoAME(_0x8cfexcc, _0x8cfexc6);
              }
            }
          }
          _0x8cfex3c != null ? (_0x8cfexcb += _0x8cfex3c) : null;
        } else {
          _0x8cfex23 == "AEFT"
            ? alert("Please select one composition.")
            : alert("Please open one sequence.");
          $.jt.pio.clearLoading();
        }
        return JSON.stringify({ data: _0x8cfexcb, mode: _0x8cfexc7 });
      }
    },
    resetLastUpdate: function () {
      _0x8cfex2b = 1;
      if (_0x8cfex23 == "AEFT") {
        $.jt.pio.setAeMetadata("pro_io-last_update", "1");
      } else {
        if (_0x8cfex23 == "PPRO") {
          $.jt.pio.setPrMetadata(app.project.rootItem, [
            ["pro_io_last_update", "pro_io", "1"],
          ]);
        }
      }
    },
    selectNewFile: function (_0x8cfex145, _0x8cfex146) {
      if (app.project.file == null && _0x8cfex23 == "AEFT") {
        $.jt.pio.aeAlert();
      } else {
        var _0x8cfex94 = $.jt.pio.ameVersion();
        _0x8cfex94 === null || _0x8cfex94 === "ame"
          ? (_0x8cfex94 = $.jt.pio.latestAme())
          : (_0x8cfex94 = _0x8cfex94.substring(4) + ".0");
        var _0x8cfex97 = new Folder(
          Folder.myDocuments.fsName +
            _0x8cfex28 +
            "Adobe" +
            _0x8cfex28 +
            "Adobe Media Encoder" +
            _0x8cfex28 +
            _0x8cfex94 +
            _0x8cfex28 +
            "Presets",
        );
        if (_0x8cfex97.exists === false) {
          var _0x8cfex97 = new Folder(
            Folder.myDocuments.fsName +
              _0x8cfex28 +
              "Adobe" +
              _0x8cfex28 +
              "Adobe Media Encoder" +
              _0x8cfex28 +
              $.jt.pio.latestAme() +
              _0x8cfex28 +
              "Presets",
          );
        }
        if (Folder.fs === "Windows") {
          _0x8cfex147 = "*.epr";
        } else {
          _0x8cfex147 = $.jt.pio.filterEPR;
        }
        if (_0x8cfex145 == "newFile") {
          _0x8cfex97 = _0x8cfex97.openDlg(
            "Select desired export preset file (.epr) for " + _0x8cfex146,
            _0x8cfex147,
            false,
          );
        } else {
          if (_0x8cfex145 == "newFiles") {
            _0x8cfex97 = _0x8cfex97.openDlg(
              "Select desired export preset files (.epr) for " + _0x8cfex146,
              _0x8cfex147,
              true,
            );
          } else {
            _0x8cfex97 = _0x8cfex97.openDlg(
              "The " +
                _0x8cfex146 +
                " File " +
                _0x8cfex145.toString() +
                " does not exist. Please choose a new file.",
              "*.epr",
              false,
            );
          }
        }
        if (_0x8cfex97 != null && _0x8cfex97 != "") {
          return Folder.decode(_0x8cfex97);
        }
      }
    },
    selectNewFolder: function (_0x8cfexf6, _0x8cfex146, _0x8cfex148) {
      if (app.project.file == null && _0x8cfex23 == "AEFT") {
        $.jt.pio.aeAlert();
      } else {
        if (_0x8cfexf6 == "newFolder") {
          var _0x8cfex149 = Folder(Folder.current).selectDlg(
            "Choose an export directory for " + _0x8cfex146,
          );
        } else {
          if (_0x8cfexf6 == "newWatch") {
            var _0x8cfex149 = Folder(Folder.current).selectDlg(
              "Select a directory to sync with.",
            );
          } else {
            var _0x8cfex149 = Folder(Folder.current).selectDlg(
              "The " +
                _0x8cfex146 +
                _0x8cfex146 +
                " does not exist. Please choose a new folder.",
            );
          }
        }
        if (_0x8cfex149 != null && _0x8cfex149 != "") {
          if (_0x8cfex148 !== true) {
            _0x8cfex149 = _0x8cfex149.relativeURI;
          } else {
            _0x8cfex149 = _0x8cfex149.fsName;
          }
          return Folder.decode(_0x8cfex149);
        }
      }
    },
    sequenceFromNodeId: function (_0x8cfex63) {
      var _0x8cfex64 = app.project.sequences.numSequences;
      for (var _0x8cfex14 = 0; _0x8cfex14 < _0x8cfex64; _0x8cfex14 += 1) {
        if (
          app.project.sequences[_0x8cfex14].projectItem.nodeId == _0x8cfex63
        ) {
          return app.project.sequences[_0x8cfex14];
        }
      }
    },
    sequenceSelection: {
      get: function () {
        var _0x8cfex83 = [];
        if (app.project.activeSequence != undefined) {
          var _0x8cfex8c = app.project.activeSequence.videoTracks.numTracks;
          var _0x8cfex8d = app.project.activeSequence.audioTracks.numTracks;
          for (var _0x8cfex14 = 0; _0x8cfex14 < _0x8cfex8c; _0x8cfex14 += 1) {
            var _0x8cfex8e =
              app.project.activeSequence.videoTracks[_0x8cfex14].clips.numItems;
            for (var _0x8cfex1f = 0; _0x8cfex1f < _0x8cfex8e; _0x8cfex1f += 1) {
              if (
                app.project.activeSequence.videoTracks[_0x8cfex14].clips[
                  _0x8cfex1f
                ].isSelected() == true
              ) {
                _0x8cfex83.push(
                  app.project.activeSequence.videoTracks[_0x8cfex14].clips[
                    _0x8cfex1f
                  ],
                );
              }
            }
          }
          for (var _0x8cfex14 = 0; _0x8cfex14 < _0x8cfex8d; _0x8cfex14 += 1) {
            var _0x8cfex8e =
              app.project.activeSequence.audioTracks[_0x8cfex14].clips.numItems;
            for (var _0x8cfex1f = 0; _0x8cfex1f < _0x8cfex8e; _0x8cfex1f += 1) {
              if (
                app.project.activeSequence.audioTracks[_0x8cfex14].clips[
                  _0x8cfex1f
                ].isSelected() == true
              ) {
                _0x8cfex83.push(
                  app.project.activeSequence.audioTracks[_0x8cfex14].clips[
                    _0x8cfex1f
                  ],
                );
              }
            }
          }
        }
        return _0x8cfex83;
      },
      items: [],
      save: function () {
        this.items = this.get();
      },
    },
    setAeMetadata: function (_0x8cfex9b, _0x8cfex9c) {
      var _0x8cfex9d = app.project;
      if (ExternalObject.AdobeXMPScript == undefined) {
        ExternalObject.AdobeXMPScript = new ExternalObject(
          "lib:AdobeXMPScript",
        );
      }
      var _0x8cfex9e = new XMPMeta(app.project.xmpPacket);
      var _0x8cfex9f = XMPMeta.getNamespaceURI("xmp");
      var _0x8cfexa0 = "xmp:" + _0x8cfex9b.toString();
      try {
        _0x8cfex9e.setProperty(_0x8cfex9f, _0x8cfexa0, _0x8cfex9c.toString());
      } catch (e) {
        alert(e);
      }
      app.project.xmpPacket = _0x8cfex9e.serialize();
    },
    setAppID: function (_0x8cfex3a) {
      var _0x8cfex3b = BridgeTalk.appName;
      if (_0x8cfex3b == "premierepro") {
        _0x8cfex23 = "PPRO";
      } else {
        if (_0x8cfex3b == "aftereffects") {
          _0x8cfex23 = "AEFT";
        }
      }
    },
    setLastUpdate: function (_0x8cfex96) {
      if (_0x8cfex23 == "AEFT") {
        $.jt.pio.setAeMetadata("pro_io-last_update", _0x8cfex96);
      } else {
        if (_0x8cfex23 == "PPRO") {
          $.jt.pio.setPrMetadata(app.project.rootItem, [
            ["pro_io_last_update", "pro_io", _0x8cfex96],
          ]);
        }
      }
    },
    setMediaPath: function (_0x8cfex4c, _0x8cfex66) {
      if (_0x8cfex23 == "PPRO" && _0x8cfex4c.canChangeMediaPath() === true) {
        return _0x8cfex4c.changeMediaPath(_0x8cfex66);
      } else {
        if (_0x8cfex23 == "AEFT") {
          return _0x8cfex4c.replace(new File(_0x8cfex66));
        }
      }
    },
    setOMTemplates: function (_0x8cfex16f) {
      typeof _0x8cfex16f !== "object"
        ? (_0x8cfex2f = JSON.parse(_0x8cfex16f) || {})
        : (_0x8cfex2f = _0x8cfex16f);
    },
    setPrMetadata: function (_0x8cfexa1, _0x8cfexa2) {
      try {
        var _0x8cfexa3 =
          "http://ns.adobe.com/premierePrivateProjectMetaData/1.0/";
        if (_0x8cfex23 == "PPRO" && app.isDocumentOpen()) {
          if (_0x8cfexa1) {
            if (ExternalObject.AdobeXMPScript === undefined) {
              ExternalObject.AdobeXMPScript = new ExternalObject(
                "lib:AdobeXMPScript",
              );
            }
            if (ExternalObject.AdobeXMPScript !== undefined) {
              var _0x8cfexa4 = _0x8cfexa1.getProjectMetadata();
              var _0x8cfexa5 = new XMPMeta(_0x8cfexa4);
              for (
                var _0x8cfexa6 = 0;
                _0x8cfexa6 < _0x8cfexa2.length;
                _0x8cfexa6 += 1
              ) {
                var _0x8cfexa7 = app.project.addPropertyToProjectMetadataSchema(
                  _0x8cfexa2[_0x8cfexa6][0],
                  _0x8cfexa2[_0x8cfexa6][1],
                  2,
                );
              }
              var _0x8cfex4d = [];
              for (
                var _0x8cfexa6 = 0;
                _0x8cfexa6 < _0x8cfexa2.length;
                _0x8cfexa6 += 1
              ) {
                _0x8cfexa5.setProperty(
                  _0x8cfexa3,
                  _0x8cfexa2[_0x8cfexa6][0],
                  _0x8cfexa2[_0x8cfexa6][2],
                );
                _0x8cfex4d.push(_0x8cfexa2[_0x8cfexa6][0]);
              }
              var _0x8cfex11 = _0x8cfexa5.serialize();
              _0x8cfexa1.setProjectMetadata(_0x8cfex11, _0x8cfex4d);
            }
          }
        }
      } catch (err) {
        $.jt.pio.errWin(err, err.line);
      }
    },
    setPresetFlag: function (_0x8cfex3d) {
      _0x8cfex2d = true;
      _0x8cfex2e = parseInt(_0x8cfex3d);
    },
    setSelected: function (_0x8cfex69) {
      if (_0x8cfex23 == "AEFT") {
        var _0x8cfex7e = app.project.selection.length;
        for (var _0x8cfex14 = _0x8cfex7e - 1; _0x8cfex14 > -1; _0x8cfex14--) {
          app.project.selection[_0x8cfex14].selected
            ? (app.project.selection[_0x8cfex14].selected = false)
            : null;
        }
        for (
          var _0x8cfex14 = 0;
          _0x8cfex14 < _0x8cfex69.length;
          _0x8cfex14 += 1
        ) {
          _0x8cfex69[_0x8cfex14].selected = true;
        }
      } else {
        if (_0x8cfex23 == "PPRO") {
          if (_0x8cfex69.length == 1) {
            _0x8cfex69[0].select();
          } else {
            if (_0x8cfex69.length > 1 && parseInt(app.version) > 11) {
              var _0x8cfex7f = app.getProjectViewIDs();
              var _0x8cfex80 = $.jt.pio._.filter(
                _0x8cfex7f,
                function (_0x8cfex81) {
                  return (
                    app.getProjectFromViewID(_0x8cfex81).name ==
                    app.project.name
                  );
                },
              );
              app.setProjectViewSelection(_0x8cfex69, _0x8cfex80[0]);
            }
          }
        }
      }
    },
    setWatchFlag: function () {
      _0x8cfex2c = true;
    },
    setWatchPath: function (_0x8cfex79, _0x8cfex6c, _0x8cfex7c, _0x8cfex7b) {
      if (typeof _0x8cfex7c == "boolean") {
        _0x8cfex7c == true ? (_0x8cfex7c = 1) : (_0x8cfex7c = 0);
      }
      typeof _0x8cfex7c == "undefined" ? (_0x8cfex7c = 1) : null;
      _0x8cfex6c != null && _0x8cfex6c != "null"
        ? (_0x8cfex6c = _0x8cfex6c + "|s" + _0x8cfex7c.toString())
        : null;
      typeof _0x8cfex7b !== "undefined" && _0x8cfex7b == false
        ? (_0x8cfex6c = _0x8cfex6c + "|i")
        : null;
      if (_0x8cfex23 == "PPRO" && _0x8cfex79) {
        _0x8cfex6c != null && _0x8cfex6c != "null" ? null : (_0x8cfex6c = "");
        if ($.jt.pio.getPrMetadata(_0x8cfex79, ["WatchFolderPath"]) !== "") {
          $.jt.pio.deletePrMetadata(_0x8cfex79, "WatchFolderPath");
        }
        if (_0x8cfex6c == "" || _0x8cfex6c == null || _0x8cfex6c == "null") {
          $.jt.pio.deletePrMetadata(_0x8cfex79, "WatchBin");
        } else {
          _0x8cfex3c = $.jt.pio.setPrMetadata(_0x8cfex79, [
            ["WatchBin", "WatchBin", _0x8cfex6c],
          ]);
        }
      } else {
        if (_0x8cfex23 == "AEFT" && _0x8cfex79) {
          _0x8cfex6c ? null : (_0x8cfex6c = "");
          _0x8cfex79.comment = _0x8cfex6c.toString();
        }
      }
      return _0x8cfex3c;
    },
    settings: {
      colorLabelFlag: true,
      create: function () {
        var _0x8cfex97 = {};
        _0x8cfex97.imgRefreshFlag = this.imgRefreshFlag = true;
        _0x8cfex97.colorLabelFlag = this.colorLabelFlag = true;
        if (_0x8cfex23 == "AEFT") {
          _0x8cfex97.reduceFlag = this.reduceFlag = true;
          _0x8cfex97.trimFlag = this.trimFlag = true;
        }
        this.write();
      },
      file: _0x8cfex26,
      get: function () {
        if (_0x8cfex26.exists) {
          _0x8cfex26.open("r", undefined, undefined);
          var _0x8cfex98 = _0x8cfex26.read();
          _0x8cfex26.close();
          try {
            _0x8cfex99 = JSON.parse(_0x8cfex98);
          } catch (e) {
            alert(
              "Preset File is Corrupted, a new blank file will be created instead.",
            );
            _0x8cfex26.rename(
              _0x8cfex26.name.toString() +
                "_" +
                new Date().getTime().toString() +
                "_backup.json",
            );
            this.create();
            return;
          }
          this.set(_0x8cfex99);
          return _0x8cfex98;
        } else {
          this.create();
        }
      },
      imgRefreshFlag: true,
      reduceFlag: true,
      set: function (_0x8cfex81) {
        _0x8cfex81.imgRefreshFlag != undefined
          ? (this.imgRefreshFlag = _0x8cfex81.imgRefreshFlag)
          : null;
        _0x8cfex81.colorLabelFlag != undefined
          ? (this.colorLabelFlag = _0x8cfex81.colorLabelFlag)
          : null;
        _0x8cfex81.debugMode != undefined
          ? (_0x8cfex22 = this.debugMode = _0x8cfex81.debugMode)
          : null;
        if (_0x8cfex23 == "AEFT") {
          _0x8cfex81.reduceFlag != undefined
            ? (this.reduceFlag = _0x8cfex81.reduceFlag)
            : null;
          _0x8cfex81.trimFlag != undefined
            ? (this.trimFlag = _0x8cfex81.trimFlag)
            : null;
          _0x8cfex81.omTemplates != undefined
            ? (this.omTemplates = _0x8cfex81.omTemplates)
            : null;
        }
        return this.write();
      },
      trimFlag: true,
      write: function () {
        var _0x8cfex97 = {};
        _0x8cfex97.imgRefreshFlag = this.imgRefreshFlag;
        _0x8cfex97.colorLabelFlag = this.colorLabelFlag;
        this.debugMode != undefined
          ? (_0x8cfex97.debugMode = this.debugMode)
          : null;
        if (_0x8cfex23 == "AEFT") {
          _0x8cfex97.reduceFlag = this.reduceFlag;
          _0x8cfex97.trimFlag = this.trimFlag;
          this.omTemplates !== undefined
            ? (_0x8cfex97.omTemplates = this.omTemplates)
            : null;
        }
        _0x8cfex26.open("w", undefined, undefined);
        var _0x8cfex9a = _0x8cfex26.write(
          JSON.stringify(_0x8cfex97, null, "\t"),
        );
        _0x8cfex26.close();
        return false;
      },
    },
    tasks: [],
    testForSequence: function (_0x8cfex132, _0x8cfex5f) {
      if (app.project.file == null && _0x8cfex23 == "AEFT") {
        $.jt.pio.aeAlert();
      } else {
        var _0x8cfex14b = new RegExp(/[0-9]+$/);
        var _0x8cfex15a = new File(_0x8cfex5f).fsName;
        var _0x8cfex15b = _0x8cfex15a.substring(
          _0x8cfex15a.lastIndexOf(".") + 1,
        );
        var _0x8cfex15c = _0x8cfex15a.substring(
          0,
          _0x8cfex15a.lastIndexOf("."),
        );
        var _0x8cfex15d = _0x8cfex15c.split(_0x8cfex14b);
        if ($.jt.pio.isImage(_0x8cfex15b) == true) {
          var _0x8cfex15e = _0x8cfex14b.exec(_0x8cfex15c);
          if (_0x8cfex15e) {
            var _0x8cfex15f = parseInt(_0x8cfex15e, 10) + 1;
            var _0x8cfex15f = $.jt.pio.digitCount(
              _0x8cfex15f,
              _0x8cfex15e.toString().length,
            );
            var _0x8cfex160 =
              _0x8cfex15d[0] + _0x8cfex15f.toString() + "." + _0x8cfex15b;
            var _0x8cfex161 = _0x8cfex132.toString().split(",");
            _0x8cfex159 = $.jt.pio.arrayIndexOf(_0x8cfex161, _0x8cfex160);
          } else {
            _0x8cfex159 = -1;
          }
        }
        return _0x8cfex159;
      }
    },
    throwErr: function () {
      tst[0]();
    },
    toItemArray: function (_0x8cfex6a) {
      if (_0x8cfex6a instanceof ItemCollection) {
        var _0x8cfex64 = _0x8cfex6a.length;
        var _0x8cfex6b = [];
        for (var _0x8cfex14 = 1; _0x8cfex14 < _0x8cfex64 + 1; _0x8cfex14 += 1) {
          _0x8cfex6b.push(_0x8cfex6a[_0x8cfex14]);
        }
        return _0x8cfex6b;
      }
    },
    trimCompToWorkArea: function (_0x8cfex107, _0x8cfex108) {
      if (_0x8cfex107 == null || _0x8cfex107 instanceof CompItem === false) {
        return "Incorrect Input";
      }
      typeof _0x8cfex107 != "array" ? (_0x8cfex107 = [_0x8cfex107]) : null;
      for (
        var _0x8cfex14 = 0;
        _0x8cfex14 < _0x8cfex107.length;
        _0x8cfex14 += 1
      ) {
        try {
          var _0x8cfex109 = _0x8cfex107[_0x8cfex14].workAreaStart;
          var _0x8cfex10a = _0x8cfex107[_0x8cfex14].workAreaDuration;
          var _0x8cfex10b = _0x8cfex107[_0x8cfex14].layers.length;
          for (var _0x8cfex14 = 0; _0x8cfex14 < _0x8cfex10b; _0x8cfex14 += 1) {
            var _0x8cfex10c = _0x8cfex107[_0x8cfex14].layers[_0x8cfex14 + 1];
            var _0x8cfex10d = false;
            _0x8cfex10c.locked
              ? ((_0x8cfex10c.locked = false), (_0x8cfex10d = true))
              : null;
            _0x8cfex107[_0x8cfex14].layers[_0x8cfex14 + 1].startTime -=
              _0x8cfex109;
            _0x8cfex10d ? (_0x8cfex10c.locked = true) : null;
          }
          _0x8cfex107[_0x8cfex14].displayStartTime += _0x8cfex109;
          _0x8cfex107[_0x8cfex14].duration = _0x8cfex10a;
          _0x8cfex107[_0x8cfex14].workAreaStart = 0;
          _0x8cfex107[_0x8cfex14].workAreaDuration =
            _0x8cfex107[_0x8cfex14].duration;
          return true;
        } catch (e) {
          return "false" + e.line.toString();
        }
      }
    },
    uniqueID: function (_0x8cfex4c) {
      if (_0x8cfex23 == "AEFT") {
        if ($.jt.pio.getGUID(_0x8cfex4c)) {
          return $.jt.pio.getGUID(_0x8cfex4c);
        } else {
          return _0x8cfex4c.id;
        }
      } else {
        if (_0x8cfex23 == "PPRO") {
          return _0x8cfex4c.nodeId;
        }
      }
    },
    updateCurrentFolder: function () {
      if (_0x8cfex23 == "PPRO" && app.project.path) {
        Folder.current = new Folder(app.project.path).parent;
      } else {
        if (_0x8cfex23 == "AEFT" && app.project && app.project.file) {
          Folder.current = app.project.file.path;
        } else {
          null;
        }
      }
      return Folder.decode(Folder.current.fsName);
    },
    updatePath: function (_0x8cfex79, _0x8cfex7c, _0x8cfex7b) {
      if (app.project.file == null && _0x8cfex23 == "AEFT") {
        $.jt.pio.aeAlert();
      } else {
        if (
          confirm(
            "The directory for Watch Bin: [" +
              _0x8cfex79.name +
              "] cannot be found. Would you like to locate the directory?\r(Note: Please re-link media before re-linking folder to prevent duplicate imports)",
            true,
            "Remove Link",
          )
        ) {
          _0x8cfex6c = Folder.selectDialog(
            "Choose a directory to re-link with Watch Bin: " +
              _0x8cfex79.name.toString() +
              ".",
          );
          if (_0x8cfex6c) {
            _0x8cfex6c = Folder.decode(_0x8cfex6c.relativeURI);
            $.jt.pio.setWatchPath(
              _0x8cfex79,
              _0x8cfex6c,
              _0x8cfex7c,
              _0x8cfex7b,
            );
          }
        }
        return _0x8cfex6c;
      }
    },
    updateStat: function (_0x8cfexac) {
      try {
        if (app.project.file == null && _0x8cfex23 == "AEFT") {
          $.jt.pio.aeAlert();
        } else {
          try {
            var _0x8cfex40 = new ExternalObject("lib:PlugPlugExternalObject");
          } catch (e) {
            alert(e);
          }
          if (_0x8cfex40) {
            var _0x8cfex41 = new CSXSEvent();
            _0x8cfex41.type = "updateStat";
            _0x8cfex41.data = _0x8cfexac.toString();
            _0x8cfex41.dispatch();
          }
        }
      } catch (err) {
        return null;
      }
    },
    watchBin: {
      binFromPath: function (_0x8cfex60) {
        _0x8cfex60 = new Folder(_0x8cfex60).fsName;
        return $.jt.pio._.find($.jt.pio.watchBin.list, function (_0x8cfex81) {
          return (
            new Folder($.jt.pio.getWatchPath(_0x8cfex81)[0]).fsName ==
            _0x8cfex60
          );
        });
      },
      create: function (_0x8cfex117) {
        if (app.project.file == null && _0x8cfex23 == "AEFT") {
          $.jt.pio.aeAlert();
        } else {
          typeof _0x8cfex117 != "object"
            ? (_0x8cfex117 = JSON.parse(_0x8cfex117))
            : null;
          _0x8cfex117.parent && _0x8cfex117.parent != "root"
            ? (_0x8cfex92 = $.jt.pio.newBin(
                _0x8cfex117.name,
                _0x8cfex117.parent,
              ))
            : (_0x8cfex92 = $.jt.pio.newBin(_0x8cfex117.name));
          $.jt.pio.labelBin(_0x8cfex92, false);
          $.jt.pio.setWatchPath(
            _0x8cfex92,
            _0x8cfex117.path,
            _0x8cfex117.subFlag,
            _0x8cfex117.imgFlag,
          );
          this.list.push(_0x8cfex92);
          if (_0x8cfex117.syncNow === true) {
            $.jt.pio.setSelected([_0x8cfex92]);
            $.jt.pio.evtDispatch("refreshWatchBins", true);
          }
          return _0x8cfex92;
        }
      },
      findAll: function () {
        $.jt.pio.conWL("Start Find All");
        this.list = [];
        var _0x8cfex120 = $.jt.pio.getSubItems($.jt.pio.projRoot(), "array");
        for (
          var _0x8cfex14 = 0;
          _0x8cfex14 < _0x8cfex120.length;
          _0x8cfex14 += 1
        ) {
          if ($.jt.pio.isBin(_0x8cfex120[_0x8cfex14])) {
            var _0x8cfex6c = $.jt.pio.getWatchPath(_0x8cfex120[_0x8cfex14])[0];
            if (_0x8cfex6c != "" && _0x8cfex6c != "n" && _0x8cfex6c != null) {
              this.list.push(_0x8cfex120[_0x8cfex14]);
            }
            var _0x8cfex121 = $.jt.pio.getSubItems(
              _0x8cfex120[_0x8cfex14],
              "array",
            );
            _0x8cfex121 && _0x8cfex121.length > 0
              ? (_0x8cfex120 = _0x8cfex120
                  .slice(0, _0x8cfex14 + 1)
                  .concat(_0x8cfex121, _0x8cfex120.slice(_0x8cfex14 + 1)))
              : null;
          }
        }
        $.jt.pio.conWL("Finish Find All: ");
        return this.list;
      },
      getFilePaths: function (_0x8cfex79) {
        var _0x8cfex129 = [];
        var _0x8cfex12a = 0;
        _0x8cfex23 == "AEFT"
          ? (_0x8cfex12a = _0x8cfex79.numItems)
          : (_0x8cfex12a = _0x8cfex79.children.numItems);
        var _0x8cfex12b = 0;
        for (var _0x8cfex14 = 0; _0x8cfex14 < _0x8cfex12a; _0x8cfex14 += 1) {
          var _0x8cfex12c = $.jt.pio.getSubItem(_0x8cfex79, _0x8cfex14);
          var _0x8cfex12d = $.jt.pio.getMediaType(_0x8cfex12c);
          if (_0x8cfex12d == "ImageSequence") {
            if ($.jt.pio.settings.imgRefreshFlag === true) {
              var _0x8cfex12e = $.jt.pio.projFootagePath(_0x8cfex12c);
              $.jt.pio.reloadFootage(_0x8cfex12c);
            }
            var _0x8cfex12f = $.jt.pio.imgSeqInfo(_0x8cfex12c);
            for (
              var _0x8cfex1f = 0;
              _0x8cfex1f < _0x8cfex12f.length;
              _0x8cfex1f += 1
            ) {
              _0x8cfex129.push(_0x8cfex12f[_0x8cfex1f]);
            }
          } else {
            if (
              _0x8cfex12d == "Still" ||
              _0x8cfex12d == "Video" ||
              _0x8cfex12d == "Audio"
            ) {
              var _0x8cfex12e = $.jt.pio.projFootagePath(_0x8cfex12c);
              _0x8cfex129.push(_0x8cfex12e);
            }
          }
        }
        return _0x8cfex129;
      },
      getInfo: function (_0x8cfex10e) {
        if (app.project.file == null && _0x8cfex23 == "AEFT") {
          $.jt.pio.aeAlert();
        } else {
          $.jt.pio.conWL("Start Get Info");
          allFlag = true;
          var _0x8cfex10f = false;
          var _0x8cfex110 = {};
          var _0x8cfex111 = this.getSelected();
          $.jt.pio.watchBin.relinkBins = [];
          if (_0x8cfex111.length > 0) {
            allFlag = false;
          }
          tempRelinkFlag = true;
          _0x8cfex110 = $.jt.pio._.map(this.list, function (_0x8cfex81) {
            var _0x8cfex112 = {};
            _0x8cfex112.name = _0x8cfex81.name;
            _0x8cfex112.id = $.jt.pio.uniqueID(_0x8cfex81);
            _0x8cfex112.complete = false;
            var _0x8cfex113 = $.jt.pio.getWatchPath(_0x8cfex81);
            _0x8cfex112.subFlag = _0x8cfex113[1];
            _0x8cfex112.imgFlag = _0x8cfex113[2];
            _0x8cfex113[3] = _0x8cfex81;
            if (
              _0x8cfex10e == false &&
              (allFlag === true ||
                $.jt.pio._.find(_0x8cfex111, function (_0x8cfex114) {
                  return $.jt.pio.watchBin.isBin(_0x8cfex81, _0x8cfex114);
                }))
            ) {
              _0x8cfex112.update = true;
            } else {
              _0x8cfex112.update = false;
            }
            _0x8cfex112.path = Folder.decode(_0x8cfex113[0]);
            if (_0x8cfex112.update == false) {
              _0x8cfex112.absolutePath = Folder.decode(
                new Folder(_0x8cfex112.path).fsName,
              );
              _0x8cfex112.files = [];
              return _0x8cfex112;
            } else {
              $.jt.pio.labelBin(_0x8cfex81, false);
              if (tempRelinkFlag == true) {
                _0x8cfex115 = $.jt.pio.watchBin.pathExists(_0x8cfex112);
              } else {
                _0x8cfex115 = false;
              }
              if (_0x8cfex115 === true) {
                null;
              } else {
                if (_0x8cfex115 === "missing") {
                  _0x8cfex10f = true;
                } else {
                  if (_0x8cfex115 === "updated") {
                    _0x8cfex113 = $.jt.pio.getWatchPath(_0x8cfex81);
                  } else {
                    _0x8cfex112.update = false;
                    tempRelinkFlag = false;
                  }
                }
              }
              $.jt.pio.updateCurrentFolder();
              _0x8cfex112.absolutePath = Folder.decode(
                new Folder(_0x8cfex112.path).fsName,
              );
              if (_0x8cfex112.update == false) {
                return _0x8cfex112;
              }
              $.jt.pio.conWL("Start getFilePaths");
              _0x8cfex112.files = $.jt.pio.watchBin.getFilePaths(_0x8cfex81);
              $.jt.pio.conWL("End getFilePaths");
            }
            return _0x8cfex112;
          });
          this.relinkFlag = false;
          $.jt.pio.conWL("End Get Info");
          if (_0x8cfex10f === true) {
            $.jt.pio.evtDispatch("relink", JSON.stringify(this.relinkBins));
            return JSON.stringify([]);
          }
          return JSON.stringify(_0x8cfex110);
        }
      },
      getSelected: function () {
        this.findAll();
        var _0x8cfex122 = this.list;
        if (_0x8cfex23 == "PPRO" && _0x8cfex29.length > 0) {
          return $.jt.pio._.intersectionByKey(
            _0x8cfex122,
            _0x8cfex29,
            "nodeId",
          );
        } else {
          if (_0x8cfex23 == "AEFT" && app.project.selection.length > 0) {
            return $.jt.pio._.intersection(_0x8cfex122, app.project.selection);
          }
        }
        return [];
      },
      getWatchEndings: function () {
        if (_0x8cfex31.exists === false) {
          this.newWatchExtensionsFile();
        } else {
          if (
            this.watchExtensions.length < 1 ||
            _0x8cfex31.modified > _0x8cfex2b
          ) {
            _0x8cfex31.open("r", undefined, undefined);
            var _0x8cfexad = _0x8cfex31.read();
            _0x8cfexad = _0x8cfexad.replace(/\r?\n|\r/g, "");
            _0x8cfex31.close();
            this.watchExtensions = _0x8cfexad.split(",");
            $.jt.pio.conWL("Loaded white list from .txt file");
          }
        }
        return this.watchExtensions;
      },
      isBin: function (_0x8cfex11e, _0x8cfex11f) {
        if (_0x8cfex23 == "AEFT") {
          return _0x8cfex11e == _0x8cfex11f;
        } else {
          if (_0x8cfex23 == "PPRO") {
            return _0x8cfex11e.nodeId == _0x8cfex11f.nodeId;
          }
        }
      },
      list: [],
      newWatchExtensionsFile: function () {
        var _0x8cfex130 = [
          ".264",
          ".3G2",
          ".3GP",
          ".3GPP",
          ".AAC",
          ".AAF",
          ".AC3",
          ".AI",
          ".AIF",
          ".AIFF",
          ".ARI",
          ".ASF",
          ".ASND",
          ".ASX",
          ".AVC",
          ".AVI",
          ".BMP",
          ".BWF",
          ".CIN",
          ".CINE",
          ".CRM",
          ".DFXP",
          ".DIB",
          ".DIF",
          ".DNG",
          ".DPX",
          ".DV",
          ".EPS",
          ".EXR",
          ".F4V",
          ".F4V",
          ".FLI",
          ".GIF",
          ".ICB",
          ".ICO",
          ".JFIF",
          ".JPE",
          ".JPEG",
          ".JPG",
          ".M15",
          ".M1A",
          ".M1S",
          ".M1V",
          ".M2A",
          ".M2P",
          ".M2T",
          ".M2TS",
          ".M2V",
          ".M4A",
          ".M4V",
          ".M75",
          ".MCC",
          ".M0D",
          ".MOV",
          ".MP2",
          ".MP3",
          ".MP4",
          ".MPA",
          ".MPE",
          ".MPEG",
          ".MPG",
          ".MPG4",
          ".MPM",
          ".MPV",
          ".MTS",
          ".MXF",
          ".MXV",
          ".MXR",
          ".PCT",
          ".PICT",
          ".PNG",
          ".PRT",
          ".PTL",
          ".QT",
          "_001.R3D",
          ".RLE",
          ".RMF",
          ".SCC",
          ".SRT",
          ".STL",
          ".SXR",
          ".TGA",
          ".TIF",
          ".TIFF",
          ".TS",
          ".VDA",
          ".VOB",
          ".VST",
          ".WAV",
          ".WMA",
          ".WMV",
          ".PSD",
        ];
        _0x8cfex31.open("w", undefined, undefined);
        var _0x8cfex9a = _0x8cfex31.write(
          _0x8cfex130.toString().replace(/,/g, ",\r"),
        );
        _0x8cfex31.close();
        this.watchExtensions = _0x8cfex130;
        $.jt.pio.conWL(
          "Created new Watch Extensions File: allowed_extensions.txt file",
        );
      },
      pathExists: function (_0x8cfex112) {
        var _0x8cfex6c = new Folder(_0x8cfex112.path);
        if (!_0x8cfex6c.exists || !_0x8cfex6c) {
          if (
            this.relinkFlag == true ||
            confirm(
              "Watch Bin path(s) cannot be found. Relink now?",
              true,
              "Missing Paths",
            )
          ) {
            this.relinkFlag = true;
            this.relinkBins.push(_0x8cfex112);
            return "missing";
          } else {
            return false;
          }
        } else {
          return true;
        }
      },
      relink: function (_0x8cfex123, _0x8cfex124) {
        for (
          var _0x8cfex14 = 0;
          _0x8cfex14 < _0x8cfex123.length;
          _0x8cfex14 += 1
        ) {
          var _0x8cfex112 = _0x8cfex123[_0x8cfex14];
          if (_0x8cfex112.newPath !== undefined) {
            var _0x8cfex125 = this.binFromPath(_0x8cfex112.path);
            $.jt.pio.setWatchPath(
              _0x8cfex125,
              _0x8cfex112.newPath,
              _0x8cfex112.subFlag,
              _0x8cfex112.imgFlag,
            );
            if (_0x8cfex124 === true) {
              this.relinkOfflineMedia(
                _0x8cfex125,
                _0x8cfex112.path,
                _0x8cfex112.newPath,
              );
            }
          }
        }
        this.relinkBins = [];
      },
      relinkBins: [],
      relinkFlag: false,
      relinkOfflineMedia: function (_0x8cfex112, _0x8cfex119, _0x8cfex126) {
        var _0x8cfex69 = $.jt.pio.getSubItems(_0x8cfex112, "array");
        _0x8cfex119 = new File(_0x8cfex119).fsName;
        _0x8cfex126 = new File(_0x8cfex126).fsName;
        $.jt.pio._.each(_0x8cfex69, function (_0x8cfex4c) {
          var _0x8cfex128 = false;
          try {
            _0x8cfex127 = $.jt.pio.projFootagePath(_0x8cfex4c);
          } catch (e) {
            _0x8cfex128 = true;
            _0x8cfex127 = e.match(/\<\<(.*)\>\>/);
          }
          if (
            _0x8cfex128 ||
            ($.jt.pio.isOffline(_0x8cfex4c) === true &&
              _0x8cfex127 !== undefined &&
              _0x8cfex127 !== "")
          ) {
            var _0x8cfex66 = _0x8cfex127.replace(_0x8cfex119, _0x8cfex126);
            $.jt.pio.conWL(new File(_0x8cfex66).exists);
            if (new File(_0x8cfex66).exists) {
              $.jt.pio.setMediaPath(_0x8cfex4c, _0x8cfex66);
            }
          }
        });
      },
      remove: function (_0x8cfex11b) {
        if ($.jt.pio.projectOpened() == false) {
          $.jt.pio.aeAlert();
          return "noproj";
        } else {
          this.findAll();
          var _0x8cfex11c = [];
          var _0x8cfex111 = this.getSelected();
          if (_0x8cfex11b) {
            _0x8cfex11b = _0x8cfex11b.split(",");
            for (
              var _0x8cfex14 = 0;
              _0x8cfex14 < _0x8cfex11b.length;
              _0x8cfex14 += 1
            ) {
              _0x8cfex11c.push(
                $.jt.pio._.find(this.list, function (_0x8cfex81) {
                  if (
                    $.jt.pio.uniqueID(_0x8cfex81) == _0x8cfex11b[_0x8cfex14]
                  ) {
                    return true;
                  }
                }),
              );
            }
          } else {
            if (_0x8cfex111 && _0x8cfex111.length > 0) {
              _0x8cfex11c = _0x8cfex111;
            } else {
              var _0x8cfex11d = confirm(
                "Unlink all Watch Bins \rAre you sure you want to unlink all Watch Bins in this project?",
                false,
              );
              if (_0x8cfex11d === true) {
                _0x8cfex11c = this.list;
              } else {
                return "false";
              }
            }
          }
          _0x8cfex23 == "AEFT"
            ? app.beginUndoGroup("Pro IO Remove WatchBins")
            : null;
          for (
            var _0x8cfex14 = 0;
            _0x8cfex14 < _0x8cfex11c.length;
            _0x8cfex14 += 1
          ) {
            $.jt.pio.watchBin.unlink(_0x8cfex11c[_0x8cfex14]);
          }
          _0x8cfex23 == "AEFT" ? app.endUndoGroup() : null;
          return _0x8cfex11c.length;
        }
      },
      replace: function (_0x8cfex117) {
        if (app.project.file == null && _0x8cfex23 == "AEFT") {
          $.jt.pio.aeAlert();
        } else {
          this.findAll();
          typeof _0x8cfex117 != "object"
            ? (_0x8cfex117 = JSON.parse(_0x8cfex117))
            : null;
          var _0x8cfex118 = $.jt.pio._.find(this.list, function (_0x8cfex81) {
            if ($.jt.pio.uniqueID(_0x8cfex81) == _0x8cfex117.id) {
              return true;
            }
          });
          if (_0x8cfex118) {
            $.jt.pio.setWatchPath(
              _0x8cfex118,
              _0x8cfex117.path,
              _0x8cfex117.subFlag,
              _0x8cfex117.imgFlag,
            );
            _0x8cfex118.name = _0x8cfex117.name;
          } else {
            $.jt.pio.evtDispatch(
              "clearLoading",
              "Watch Bin has already been removed",
            );
          }
        }
      },
      sync: function (_0x8cfex110) {
        try {
          for (
            var _0x8cfex14 = 0;
            _0x8cfex14 < _0x8cfex110.length;
            _0x8cfex14 += 1
          ) {
            var _0x8cfex81 = _0x8cfex110[_0x8cfex14];
            if (_0x8cfex81.parent > -1) {
              _0x8cfex81.bin = $.jt.pio.watchBin.create({
                imgFlag: _0x8cfex81.imgFlag,
                name: _0x8cfex81.name,
                parent: $.jt.pio.watchBin.binFromPath(
                  _0x8cfex110[parseInt(_0x8cfex81.parent)].path,
                ),
                path: _0x8cfex81.path,
                subFlag: _0x8cfex81.subFlag,
                syncNow: false,
              });
            } else {
              _0x8cfex81.bin = $.jt.pio.watchBin.binFromPath(_0x8cfex81.path);
            }
            if (_0x8cfex81.newFiles.length > 0) {
              if (_0x8cfex23 == "AEFT") {
                _0x8cfex116 = $.jt.pio.importFootageAE(
                  _0x8cfex81.newFiles,
                  _0x8cfex81.bin,
                  false,
                );
              } else {
                if (_0x8cfex23 == "PPRO") {
                  _0x8cfex116 = $.jt.pio.importFootagePPRO(
                    _0x8cfex81.newFiles,
                    _0x8cfex81.bin,
                    false,
                  );
                }
              }
            }
            if (_0x8cfex81.newSequences.length > 0) {
              if (_0x8cfex23 == "AEFT") {
                _0x8cfex116 = $.jt.pio.importFootageAE(
                  _0x8cfex81.newSequences,
                  _0x8cfex81.bin,
                  true,
                );
              } else {
                if (_0x8cfex23 == "PPRO") {
                  _0x8cfex116 = $.jt.pio.importFootagePPRO(
                    _0x8cfex81.newSequences,
                    _0x8cfex81.bin,
                    true,
                  );
                }
              }
            }
            if (_0x8cfex116 === "cancelled" || _0x8cfex116 === "failed") {
              $.jt.pio.conWL("Sync was " + _0x8cfex116);
              return _0x8cfex116;
            }
          }
          if (_0x8cfex23 == "AEFT") {
            this.syncDoneTaskID = app.scheduleTask(
              "$.jt.pio.watchBin.syncDone();",
              0,
              false,
            );
            return "continue";
          } else {
            if (_0x8cfex23 == "PPRO") {
              $.jt.pio.conWL("End Sync");
              return "good";
            }
          }
        } catch (err) {
          $.jt.pio.errWin(err);
          return "failed";
        }
      },
      syncDone: function () {
        $.jt.pio.evtDispatch("syncDoneMain", [
          $.jt.pio.progressDialog.state,
          $.jt.pio.failedImports,
        ]);
        $.jt.pio.failedImports = 0;
        $.jt.pio.progressDialog.state = "good";
      },
      syncDoneTaskID: 0,
      unlink: function (_0x8cfex112) {
        $.jt.pio.labelBin(_0x8cfex112, true);
        $.jt.pio.setWatchPath(_0x8cfex112, null);
      },
      update: function () {},
      updatePath: function (_0x8cfex79, _0x8cfex7c, _0x8cfex7b, _0x8cfex119) {
        if (app.project.file == null && _0x8cfex23 == "AEFT") {
          $.jt.pio.aeAlert();
        } else {
          if (
            confirm(
              "The directory for Watch Bin: [" +
                _0x8cfex79.name +
                "] cannot be found. Would you like to locate the directory?\r(Note: Please re-link media before re-linking folder to prevent duplicate imports)",
              true,
              "Remove Link",
            )
          ) {
            var _0x8cfex6c = Folder.selectDialog(
              "Choose a directory to re-link with Watch Bin: " +
                _0x8cfex79.name.toString() +
                ".",
            );
            if (_0x8cfex6c) {
              var _0x8cfex11a = $.jt.pio.isRelativePath(_0x8cfex119);
              _0x8cfex11a
                ? (_0x8cfex6c = Folder.decode(_0x8cfex6c.relativeURI))
                : (_0x8cfex6c = Folder.decode(_0x8cfex6c));
              $.jt.pio.setWatchPath(
                _0x8cfex79,
                _0x8cfex6c,
                _0x8cfex7c,
                _0x8cfex7b,
              );
            } else {
              return false;
            }
          }
          return _0x8cfex6c;
        }
      },
      watchExtensions: [],
    },
    wildcardReplace: function (_0x8cfexb3, _0x8cfexb4, _0x8cfexb5, _0x8cfexb6) {
      _0x8cfex23 == "AEFT"
        ? (_0x8cfexb3 = _0x8cfexb3.replace(/#COMP/g, _0x8cfexb4))
        : null;
      _0x8cfex23 == "PPRO"
        ? (_0x8cfexb3 = _0x8cfexb3.replace(/#SEQ/g, _0x8cfexb5.name.toString()))
        : null;
      _0x8cfexb3 = _0x8cfexb3.replace(
        /#PROJ/g,
        _0x8cfexb6.substring(0, _0x8cfexb6.lastIndexOf(".")),
      );
      _0x8cfexb3 = _0x8cfexb3.replace(
        /#YYMMDD/g,
        $.jt.pio.getCurrentDate("YYMMDD"),
      );
      _0x8cfexb3 = _0x8cfexb3.replace(
        /#MMDDYY/g,
        $.jt.pio.getCurrentDate("MMDDYY"),
      );
      _0x8cfexb3 = _0x8cfexb3.replace(/#YY/g, $.jt.pio.getCurrentDate("YY"));
      _0x8cfexb3 = _0x8cfexb3.replace(/#MM/g, $.jt.pio.getCurrentDate("MM"));
      _0x8cfexb3 = _0x8cfexb3.replace(/#DD/g, $.jt.pio.getCurrentDate("DD"));
      _0x8cfexb3 = _0x8cfexb3.replace(
        /#HHMMSS/g,
        $.jt.pio.getCurrentTime("HHMMSS"),
      );
      _0x8cfexb3 = _0x8cfexb3.replace(/#HH/g, $.jt.pio.getCurrentTime("HH"));
      _0x8cfexb3 = _0x8cfexb3.replace(/#MM/g, $.jt.pio.getCurrentTime("MM"));
      _0x8cfexb3 = _0x8cfexb3.replace(/#SS/g, $.jt.pio.getCurrentTime("SS"));
      _0x8cfexb3 = _0x8cfexb3.replace(
        /#STEM/,
        _0x8cfexb6.substring(
          0,
          _0x8cfexb6.indexOf(_0x8cfexb6.match(/_V[0-9][0-9]/g)),
        ),
      );
      _0x8cfexb3 = _0x8cfexb3.replace(
        /#VCCODE/,
        _0x8cfexb6.substring(0, _0x8cfexb6.indexOf("_")),
      );
      _0x8cfexb3 = _0x8cfexb3.replace(
        /#VCNAME/,
        _0x8cfexb6.substring(
          _0x8cfexb6.indexOf("_") + 1,
          _0x8cfexb6.indexOf(_0x8cfexb6.match(/_V[0-9][0-9]/g)),
        ),
      );
      _0x8cfexb3 = _0x8cfexb3.replace(
        /#VCPROJ/,
        _0x8cfexb6.substring(
          0,
          _0x8cfexb6.indexOf(_0x8cfexb6.match(/_V[0-9][0-9]/g)),
        ),
      );
      return _0x8cfexb3;
    },
    writeXML: function (_0x8cfexba) {
      if (app.project.file == null && _0x8cfex23 == "AEFT") {
        $.jt.pio.aeAlert();
      } else {
        _0x8cfex25.encoding = "UTF-8";
        _0x8cfex25.open("r", undefined, undefined);
        var _0x8cfexc4 = _0x8cfex25.read();
        _0x8cfex25.close();
        _0x8cfex25.open("w", undefined, undefined);
        var _0x8cfex9a = _0x8cfex25.write(_0x8cfexba.toXMLString());
        if (_0x8cfex9a == false) {
          $.jt.pio.conWL("XML write failed, verify input");
          _0x8cfex25.write(_0x8cfexc4);
        }
        _0x8cfex25.close();
      }
    },
  };
})();
