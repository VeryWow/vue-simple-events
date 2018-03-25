import EventManagment from 'js-simple-events';
var eventsPlugins = function (Vue) {
    var eventMap = new EventManagment();
    Object.defineProperties(Vue.prototype, {
        '$events': {
            get: function () {
                return eventMap;
            }
        }
    });
};
export default eventsPlugins;
