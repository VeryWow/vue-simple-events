import { PluginFunction } from "vue";
import JSEventManagment from 'js-simple-events'

class EventManagment extends JSEventManagment {
  $emit = this.emit
  $on = this.on
  $off = this.off
  $once = this.$once
}

const eventsPlugins: PluginFunction<any> = (Vue) => {
  Vue.prototype.$events = new EventManagment();
}

// Reflect defined shorthands in the Vue types
declare module 'vue/types/vue' {
  interface Vue {
    $events: EventManagment
  }
}

export default eventsPlugins;
