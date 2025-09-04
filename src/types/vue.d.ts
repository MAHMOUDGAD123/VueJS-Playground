import type { EventBus } from '../plugins/event-bus';

// declare module '@vue/runtime-core' {
declare module 'vue' {
  interface ComponentCustomProperties {
    /**
     * Access the global event bus (mitt)
     */
    $eventBus: EventBus;
  }
}

export {};
