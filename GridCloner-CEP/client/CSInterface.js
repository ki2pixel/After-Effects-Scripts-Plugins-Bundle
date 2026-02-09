/* Minimal CSInterface subset for CEP panels (evalScript + event listeners).
 * This avoids vendoring the full Adobe CSInterface.js file.
 */
(function () {
    'use strict';

    function CSInterface() {}

    CSInterface.prototype.evalScript = function (script, callback) {
        callback = callback || function () {};
        try {
            window.__adobe_cep__.evalScript(String(script || ''), callback);
        } catch (e) {
            callback(null);
        }
    };

    CSInterface.prototype.addEventListener = function (type, listener) {
        try {
            window.__adobe_cep__.addEventListener(type, listener);
        } catch (e) {}
    };

    CSInterface.prototype.dispatchEvent = function (eventObj) {
        try {
            window.__adobe_cep__.dispatchEvent(eventObj);
        } catch (e) {}
    };

    window.CSInterface = CSInterface;
})();
