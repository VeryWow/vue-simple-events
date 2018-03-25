(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "js-simple-events"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var js_simple_events_1 = require("js-simple-events");
    var eventsPlugins = function (Vue) {
        var eventMap = new js_simple_events_1.default();
        Object.defineProperties(Vue.prototype, {
            '$events': {
                get: function () {
                    return eventMap;
                }
            }
        });
    };
    exports.default = eventsPlugins;
});
