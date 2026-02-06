/* Minimal CSInterface shim for CEP panels.
 *
 * This is intentionally small: we only implement what's required by PyShiftBridge
 * (evalScript + getSystemPath). If you need more CEP APIs later, replace this file
 * with the official CSInterface.js from Adobe CEP SDK.
 */

(function (global) {
  "use strict";

  function CSInterface() {}

  var SystemPath = {
    USER_DATA: "userData",
    COMMON_FILES: "commonFiles",
    MY_DOCUMENTS: "myDocuments",
    APPLICATION: "application",
    EXTENSION: "extension",
    HOST_APPLICATION: "hostApplication",
  };

  CSInterface.prototype.evalScript = function (script, callback) {
    if (!callback) callback = function () {};
    global.__adobe_cep__.evalScript(script, callback);
  };

  CSInterface.prototype.getSystemPath = function (pathType) {
    return decodeURI(global.__adobe_cep__.getSystemPath(pathType));
  };

  CSInterface.prototype.getExtensionID = function () {
    return global.__adobe_cep__.getExtensionId();
  };

  global.CSInterface = CSInterface;
  global.SystemPath = SystemPath;
})(window);
