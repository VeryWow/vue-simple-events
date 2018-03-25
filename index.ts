import { PluginFunction } from "vue";
import EventManagment from 'js-simple-events'

const eventsPlugins: PluginFunction<any> = (Vue) => {

  const eventMap = new EventManagment();

  Object.defineProperties(Vue.prototype, {
    '$events': {
      get() {
        return eventMap;
      }
    }
  });
}

// Reflect defined shorthands in the Vue types
declare module 'vue/types/vue' {
  interface Vue {
    $events: EventManagment
  }
}
