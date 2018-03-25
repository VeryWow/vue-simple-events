import Vue, { PluginFunction } from 'vue'
import JSEventManagment from 'js-simple-events'

class EventManagment extends JSEventManagment {
  $emit = super.emit
  $on = super.on
  $off = super.off
  $once = super.once
}

function bindEvents (context, obj: any, from: string, to: string): void {
  let evts = obj[from];
  if (evts) {
    obj[to] = {}
    for (var k in evts) {
      obj[to][k] = ~evts[k].name.indexOf('bound ') ? evts[k] : evts[k].bind(context)
    }
  }
}

function addEventListener(event: string, handler: Function, isOnce: boolean = false): void {
  Vue.prototype.$events[isOnce ? 'once' : 'on'](event, handler)
}

function addEventListeners(obj: { [key: string]: Function }, isOnce: boolean = false): void {
  if (obj) {
    for (var k in obj) {
      addEventListener(k, obj[k], isOnce)
    }
  }
}

function removeEventListeners(obj: { [key: string]: Function }) {
  if (obj) {
    for (var k in obj) {
      Vue.prototype.$events.off(k, obj[k])
    }
  }
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
      let options = $this.$options;
      bindEvents(this, options, 'on', '$setEventsOn')
      bindEvents(this, options, 'once', '$setEventsOnce')
    },
    created() {
      let $this: any = this;
      addEventListeners($this.$options.$setEventsOn, false)
      addEventListeners($this.$options.$setEventsOnce, true)
    },
    beforeDestroy() {
      let $this: any = this;
      removeEventListeners($this.$options.$setEventsOn)
      removeEventListeners($this.$options.$setEventsOnce)
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
    once?: {
      [key: string]: Function
    }
  }
}

export default eventsPlugins;
