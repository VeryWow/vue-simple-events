# vue-simple-events
Yet another event management plugin, but WITHOUT Vue instance

## About

This is just a simple wrapper around [js-simple-events](https://github.com/kaskar2008/js-simple-events) that helps to manage events in a simple way without creating a Vue instance. It also supports TypeScript!

And it's really light - ~1kb in size!

## Methods

Method   | Params            | Description
-------- | ----------------- | ----------------------------------------------------------------
`vm.$events.emit`   | `event, payload`  | Emit the event with the given payload.
`vm.$events.$emit`  | `event, payload`  | _Alias for `emit`_
`vm.$events.fire`   | `event, payload`  | _Alias for `emit`_
`vm.$events.on`     | `event, callback` | Listen for the event with the given callback.
`vm.$events.$on`    | `event, callback` | _Alias for `on`_
`vm.$events.listen` | `event, callback` | _Alias for `on`_
`vm.$events.once`   | `event, callback` | Listen for the event once, after handling - remove the listener.
`vm.$events.$once`  | `event, callback` | _Alias for `$once`_
`vm.$events.off`    | `event, callback` | Remove event listener(s) for the event.
`vm.$events.$off`   | `event, callback` | _Alias for `off`_
`vm.$events.remove` | `event, callback` | _Alias for `off`_

## Examples

```js
// Import and initialize
import Vue from 'vue'
import EventManager from 'vue-simple-events'

Vue.use(EventManager)
```

```js
/// Component 1

methods: {
  eventHandler(payload) {
    console.log('Yay, events work!', payload);
  },
  eventHandlerOnce(payload) {
    console.log('This will be called just once!');
  }
},
created() {
  this.$events.on('test', this.eventHandler);
  this.$events.once('test', this.eventHandlerOnce);
},
beforeDestroy() {
  this.$events.off('test', this.eventHandler);
  this.$events.off('test', this.eventHandlerOnce);
}
```

P.S.: Alternative way to set your event handlers is through the `on` and `once` Vue constructor options. In that way you shouldn't worry about removing event handlers on `beforeDestroy`.

```js
/// Component 1

methods: {
  eventHandler(payload) {
    console.log('Yay, events work!', payload);
  },
  eventHandlerOnce(payload) {
    console.log('This will be called just once!');
  }
},
on: {
  test() {
    this.eventHandler();
  }
},
once: {
  test() {
    this.eventHandlerOnce();
  }
}
```

```js
/// Component 2

created() {
  // Emit events
  this.$events.emit('test', 'Hello!');
  // Logs:
  // -> Yay, events work! Hello!
  // -> This will be called just once!

  this.$events.emit('test', 'Hello!');
  // Logs:
  // -> Yay, events work! Hello!
  // (The 'once' handler isn't fired)
}
```

## Demo
[webpack 4 application](https://github.com/Raiondesu/webpack-vue-ts)
