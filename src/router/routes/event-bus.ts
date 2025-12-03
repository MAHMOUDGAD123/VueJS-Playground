import { defineRouteRecord } from 'strict-vue-router';
import EventBusView from '@/views/EventBusView.vue';

export const eventBusRouteRecord = defineRouteRecord<'eventBus'>({
  path: '/event-bus',
  name: 'eventBus',
  component: EventBusView,
  meta: {
    isNav: true,
    navLinkTitle: 'EventBus',
    title: {
      default: 'Event Bus',
    },
  },
});
