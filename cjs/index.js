"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var js_simple_events_1 = require("js-simple-events");
var EventManagment = /** @class */ (function (_super) {
    __extends(EventManagment, _super);
    function EventManagment() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.$emit = _this.emit;
        _this.$on = _this.on;
        _this.$off = _this.off;
        _this.$once = _this.$once;
        return _this;
    }
    return EventManagment;
}(js_simple_events_1.default));
var eventsPlugins = function (Vue) {
    Vue.prototype.$events = new EventManagment();
};
exports.default = eventsPlugins;
