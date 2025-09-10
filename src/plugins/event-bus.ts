import mitt, { type Emitter } from 'mitt';
import type { App, Plugin } from 'vue';

export type EventBus = Emitter<Events>;

export const eventBus: EventBus = mitt<Events>();

/**
 * Creates a Pinia instance to be used by the application
 */
export const createEventBus = (): Plugin => {
  return {
    install(app: App) {
      app.config.globalProperties.$eventBus = eventBus;
    },
  };
};
