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
            var evts = $this.$options.on;
            if (evts) {
                $this.$options.$setEvents = {};
                for (var k in evts) {
                    $this.$options.$setEvents[k] = ~evts[k].name.indexOf('bound ') ? evts[k] : evts[k].bind(this);
                }
            }
        },
        created: function () {
            var $this = this;
            var evts = $this.$options.$setEvents;
            if (evts) {
                for (var k in evts) {
                    Vue.prototype.$events.on(k, evts[k]);
                }
            }
        },
        beforeDestroy: function () {
            var $this = this;
            var evts = $this.$options.$setEvents;
            if (evts) {
                for (var k in evts) {
                    Vue.prototype.$events.off(k, evts[k]);
                }
            }
        }
    });
};
export default eventsPlugins;
