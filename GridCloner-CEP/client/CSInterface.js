/* Minimal CSInterface subset for CEP panels (evalScript + event listeners).
 * This avoids vendoring the full Adobe CSInterface.js file.
 */
(function () {
    'use strict';

    function CSInterface() {}

    CSInterface.prototype.evalScript = function (script, callback) {
        callback = callback || function () {};
        try {
            if (!window.__adobe_cep__ || typeof window.__adobe_cep__.evalScript !== 'function') {
                callback('__CEP_RUNTIME_UNAVAILABLE__');
                return;
            }

            window.__adobe_cep__.evalScript(String(script || ''), function (result) {
                if (result === null || typeof result === 'undefined' || result === '') {
                    callback('__EVALSCRIPT_EMPTY__');
                    return;
                }
                callback(result);
            });
        } catch (e) {
            callback('__CSINTERFACE_THROW__:' + String(e));
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
