import mitt, { type Emitter } from 'mitt';
import type { App, Plugin } from 'vue';

declare module 'vue' {
 interface ComponentCustomProperties {
  $eventBus: EventBus;
 }
}

export type Events = {
 'event:happy': number;
 'event:all:happy': undefined;
};

export type EventBus = Emitter<Events>;

export const eventBus: EventBus = mitt<Events>();

/**
 * Creates a event bus instance to be used by the application
 */
export const createEventBus = (): Plugin => {
 return {
  install(app: App) {
   app.config.globalProperties.$eventBus = eventBus;
  },
 };
};
