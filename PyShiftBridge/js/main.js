/* global CSInterface, SystemPath */

(function () {
  "use strict";

  var cs = new CSInterface();

  var transport = "mailbox";
  var pipeName = null;

  var UI = {
    btnSetOpacity: document.getElementById("btnSetOpacity"),
    opacityValue: document.getElementById("opacityValue"),
    status: document.getElementById("status"),
    log: document.getElementById("log"),
    bridgePath: document.getElementById("bridgePath"),
  };

  var lastResponseId = null;
  var lastSelectionSignature = null;

  function setStatus(text) {
    UI.status.textContent = text;
  }

  function logLine(line) {
    var ts = new Date().toISOString().replace("T", " ").replace("Z", "");
    UI.log.textContent += "[" + ts + "] " + line + "\n";
    UI.log.scrollTop = UI.log.scrollHeight;
  }

  function evalScriptP(script) {
    return new Promise(function (resolve) {
      cs.evalScript(script, function (result) {
        resolve(result);
      });
    });
  }

  function escapeForJSXString(str) {
    // Used only for passing encoded payloads into JSX function calls.
    return String(str).replace(/\\/g, "\\\\").replace(/\"/g, "\\\"");
  }

  function getPipeName() {
    try {
      return localStorage.getItem("pyshift_pipe_name") || "PyShiftAE";
    } catch (e) {
      return "PyShiftAE";
    }
  }

  function supportsNodeRequire() {
    return typeof require === "function";
  }

  function makePyInterface(pipeName) {
    var net = require("net");
    var path = require("path");

    function PyInterface(name) {
      var isWin = typeof process !== "undefined" && process.platform === "win32";
      if (isWin) {
        this.pipePath = path.join("\\\\.\\pipe\\", name);
      } else {
        // On Unix platforms, net.Socket expects a filesystem path (Unix Domain Socket).
        // If the user provides an absolute path, use it as-is, otherwise default to /tmp/<name>.
        if (String(name).indexOf("/") !== -1) {
          this.pipePath = String(name);
        } else {
          this.pipePath = path.join("/tmp", String(name));
        }
      }
      this.client = new net.Socket();
    }

    PyInterface.prototype.connect = function () {
      var self = this;
      return new Promise(function (resolve, reject) {
        self.client
          .connect(self.pipePath, function () {
            resolve();
          })
          .on("error", function (err) {
            reject(err);
          });
      });
    };

    PyInterface.prototype.send = function (data) {
      var self = this;
      return new Promise(function (resolve, reject) {
        var buffer = "";
        var settled = false;

        var onData = function (chunk) {
          buffer += chunk.toString();
          var delimiterIndex = buffer.indexOf("\n");
          while (delimiterIndex !== -1) {
            var rawResponse = buffer.substring(0, delimiterIndex);
            buffer = buffer.substring(delimiterIndex + 1);
            delimiterIndex = buffer.indexOf("\n");
            finishOk(rawResponse);
            return;
          }
        };

        var onError = function (err) {
          finishErr(err);
        };

        var onEnd = function () {
          finishErr(new Error("Socket ended without response"));
        };

        function cleanup() {
          self.client.off("data", onData);
          self.client.off("error", onError);
          self.client.off("end", onEnd);
        }

        function finishOk(rawResponse) {
          if (settled) return;
          settled = true;
          cleanup();
          try {
            self.client.destroy();
          } catch (e) {}
          resolve(rawResponse);
        }

        function finishErr(err) {
          if (settled) return;
          settled = true;
          cleanup();
          try {
            self.client.destroy();
          } catch (e) {}
          reject(err);
        }

        self.client.on("data", onData);
        self.client.on("error", onError);
        self.client.on("end", onEnd);

        self.client.write(JSON.stringify(data) + "\n", function (err) {
          if (err) {
            finishErr(err);
          }
        });
      });
    };

    PyInterface.prototype.evalPy = function (funcName) {
      var args = Array.prototype.slice.call(arguments, 1);
      var payload = {
        endpoint: "Response",
        functionName: funcName,
        args: args.reduce(function (acc, arg, index) {
          acc["param" + (index + 1)] = arg;
          return acc;
        }, {}),
      };
      return this.send(payload);
    };

    PyInterface.prototype.evalAsync = function (funcName) {
      var args = Array.prototype.slice.call(arguments, 1);
      var payload = {
        endpoint: "NoResponse",
        functionName: funcName,
        args: args.reduce(function (acc, arg, index) {
          acc["param" + (index + 1)] = arg;
          return acc;
        }, {}),
      };
      var self = this;
      return this.send(payload).then(function () {
        self.client.destroy();
        return true;
      });
    };

    return new PyInterface(pipeName);
  }

  async function initPipeTransport() {
    if (!supportsNodeRequire()) return false;

    try {
      pipeName = getPipeName();
      var testClient = makePyInterface(pipeName);
      await testClient.connect();
      try {
        testClient.client.destroy();
      } catch (e) {}
      transport = "pipe";
      logLine("Pipe connected: " + pipeName);
      return true;
    } catch (e) {
      pipeName = null;
      transport = "mailbox";
      logLine("Pipe unavailable, falling back to mailbox: " + e);
      return false;
    }
  }

  async function loadBridgeJSX(options) {
    options = options || {};
    var extRoot = cs.getSystemPath(SystemPath.EXTENSION);
    UI.bridgePath.textContent = extRoot;

    // $.evalFile requires a proper platform path.
    var jsxPath = extRoot + "/jsx/bridge.jsx";
    var script = "$.evalFile(\"" + escapeForJSXString(jsxPath) + "\");";
    var res = await evalScriptP(script);

    // bridge.jsx returns a string when loaded; we don't rely on it.
    logLine("bridge.jsx loaded: " + res);

    if (options.ensureMailbox) {
      // Ensure bridge dir + initialize empty files (idempotent)
      await evalScriptP("$._PyShiftBridge.ensureMailbox();");

      var bridgeDir = await evalScriptP("$._PyShiftBridge.getBridgeDir();");
      logLine("Bridge dir: " + bridgeDir);
    }
  }

  async function readMailbox(name) {
    var encoded = await evalScriptP("$._PyShiftBridge.readMailbox(\"" + escapeForJSXString(name) + "\");");
    if (!encoded) return null;

    try {
      var jsonText = decodeURIComponent(encoded);
      if (!jsonText) return null;
      return JSON.parse(jsonText);
    } catch (e) {
      // Partial reads shouldn't happen (atomic writes), but keep UI resilient.
      logLine("readMailbox parse error: " + e);
      return null;
    }
  }

  async function writeMailboxAtomic(name, obj) {
    var encoded = encodeURIComponent(JSON.stringify(obj));
    var script = "$._PyShiftBridge.writeMailboxAtomic(\"" + escapeForJSXString(name) + "\", \"" + escapeForJSXString(encoded) + "\");";
    return await evalScriptP(script);
  }

  function newId() {
    return String(Date.now()) + "-" + String(Math.floor(Math.random() * 100000));
  }

  async function sendCommandToPython(entrypoint, args) {
    args = args || {};

    if (transport === "pipe" && pipeName) {
      try {
        var client = makePyInterface(pipeName);
        await client.connect();
        var raw = await client.evalPy(entrypoint, JSON.stringify(args));
        try {
          client.client.destroy();
        } catch (e) {}
        var parsed = raw;
        try {
          parsed = JSON.parse(raw);
        } catch (e) {}
        setStatus("OK");
        logLine("← Python OK: " + (typeof parsed === "string" ? parsed : JSON.stringify(parsed || {})));
        return null;
      } catch (e) {
        setStatus("ERROR");
        logLine("← Python ERROR: " + String(e));
        return null;
      }
    }

    var msg = { id: newId(), entrypoint: entrypoint, args: args };
    await writeMailboxAtomic("cep_to_py.json", msg);
    logLine("→ Python: " + entrypoint + " " + JSON.stringify(args));
    return msg.id;
  }

  async function pollPythonResponses() {
    var resp = await readMailbox("py_to_cep.json");
    if (!resp || !resp.id) return;

    if (resp.id === lastResponseId) return;
    lastResponseId = resp.id;

    if (resp.ok) {
      setStatus("OK");
      logLine("← Python OK: " + JSON.stringify(resp.result || {}));
    } else {
      setStatus("ERROR");
      logLine("← Python ERROR: " + String(resp.error || "Unknown error"));
    }
  }

  async function pollSelectionSignature() {
    // Runs inside AE via ExtendScript. Returns a simple stable signature.
    var sig = await evalScriptP("$._PyShiftBridge.selectionSignature();");
    if (!sig) sig = "";

    if (sig !== lastSelectionSignature) {
      lastSelectionSignature = sig;
      await sendCommandToPython("selection_changed", { signature: sig });
    }
  }

  async function onClickSetOpacity() {
    var value = Number(UI.opacityValue.value);
    if (!isFinite(value)) {
      logLine("Invalid opacity value");
      return;
    }

    // Clamp 0..100
    value = Math.max(0, Math.min(100, value));

    setStatus("Sending...");
    await sendCommandToPython("set_opacity", { opacity: value });
  }

  async function boot() {
    setStatus("Booting...");

    await initPipeTransport();
    await loadBridgeJSX({ ensureMailbox: transport === "mailbox" });
    if (transport === "pipe") {
      var extRoot = cs.getSystemPath(SystemPath.EXTENSION);
      UI.bridgePath.textContent = extRoot + " (pipe)";
    }

    UI.btnSetOpacity.addEventListener("click", function () {
      onClickSetOpacity().catch(function (e) {
        logLine("Click handler error: " + e);
      });
    });

    if (transport === "mailbox") {
      setInterval(function () {
        pollPythonResponses().catch(function (e) {
          logLine("pollPythonResponses error: " + e);
        });
      }, 300);
    }

    // Simulated "hook": poll AE selection every second
    setInterval(function () {
      pollSelectionSignature().catch(function (e) {
        logLine("pollSelectionSignature error: " + e);
      });
    }, 1000);

    setStatus("Idle");
    logLine("PyShiftBridge ready");
  }

  boot().catch(function (e) {
    setStatus("Boot error");
    logLine(String(e));
  });
})();
