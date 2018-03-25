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
import Vue from 'vue';
import JSEventManagment from 'js-simple-events';
var EventManagment = /** @class */ (function (_super) {
    __extends(EventManagment, _super);
    function EventManagment() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.$emit = _super.prototype.emit;
        _this.$on = _super.prototype.on;
        _this.$off = _super.prototype.off;
        _this.$once = _super.prototype.once;
        return _this;
    }
    return EventManagment;
}(JSEventManagment));
function bindEvents(obj, from, to) {
    var evts = obj[from];
    if (evts) {
        obj[to] = {};
        for (var k in evts) {
            obj[to][k] = ~evts[k].name.indexOf('bound ') ? evts[k] : evts[k].bind(this);
        }
    }
}
function addEventListener(event, handler, isOnce) {
    if (isOnce === void 0) { isOnce = false; }
    Vue.prototype.$events[isOnce ? 'once' : 'on'](event, handler);
}
function addEventListeners(obj, isOnce) {
    if (isOnce === void 0) { isOnce = false; }
    if (obj) {
        for (var k in obj) {
            addEventListener(k, obj[k], isOnce);
        }
    }
}
function removeEventListeners(obj) {
    if (obj) {
        for (var k in obj) {
            Vue.prototype.$events.off(k, obj[k]);
        }
    }
}
var eventsPlugins = function (Vue) {
    var eventManagement = new EventManagment();
    Object.defineProperties(Vue.prototype, {
        '$events': {
            get: function () {
                return eventManagement;
            }
        }
    });
    Vue.mixin({
        beforeCreate: function () {
            var $this = this;
            var options = $this.$options;
            bindEvents(options, 'on', '$setEventsOn');
            bindEvents(options, 'once', '$setEventsOnce');
        },
        created: function () {
            var $this = this;
            addEventListeners($this.$options.$setEventsOn, false);
            addEventListeners($this.$options.$setEventsOnce, true);
        },
        beforeDestroy: function () {
            var $this = this;
            removeEventListeners($this.$options.$setEventsOn);
            removeEventListeners($this.$options.$setEventsOnce);
        }
    });
};
export default eventsPlugins;
