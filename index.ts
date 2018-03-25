import Vue, { PluginFunction } from 'vue'
import JSEventManagment from 'js-simple-events'

class EventManagment extends JSEventManagment {
  $emit = super.emit
  $on = super.on
  $off = super.off
  $once = super.once
}

const eventsPlugins: PluginFunction<any> = (Vue) => {
  const eventManagement = new EventManagment();
  Object.defineProperties(Vue.prototype, {
    '$events': {
      get() {
        return eventManagement;
      }
    }
  });

  Vue.mixin({
    beforeCreate() {
      let $this: any = this;
      let evts = $this.$options.on;
      if (evts) {
        $this.$options.$setEvents = {}
        for (var k in evts) {
          $this.$options.$setEvents[k] = ~evts[k].name.indexOf('bound ') ? evts[k] : evts[k].bind(this)
        }
      }
    },
    created() {
      let $this: any = this;
      let evts = $this.$options.$setEvents;
      if (evts) {
        for (var k in evts) {
          Vue.prototype.$events.on(k, evts[k])
        }
      }
    },
    beforeDestroy() {
      let $this: any = this;
      let evts = $this.$options.$setEvents;
      if (evts) {
        for (var k in evts) {
          Vue.prototype.$events.off(k, evts[k])
        }
      }
    }
  })
}

// Reflect defined shorthands in the Vue types
declare module 'vue/types/vue' {
  interface Vue {
    $events: EventManagment
  }

  interface ThisTypedComponentOptionsWithArrayProps<V, Data, Methods, Computed, PropNames> {
    on?: {
      [key: string]: Function
    }
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<
    V extends Vue,
    Data=DefaultData<V>,
    Methods=DefaultMethods<V>,
    Computed=DefaultComputed,
    PropsDef=PropsDefinition<DefaultProps>,
    Props=DefaultProps
  > {
    on?: {
      [key: string]: Function
    }
  }
}

export default eventsPlugins;
