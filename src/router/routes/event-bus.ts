import EventBusView from '@/views/EventBusView.vue';
import type { _RouteRecordRaw } from 'vue-router';

export const eventBusRouteRecord = {
  path: '/event-bus',
  name: 'eventBus',
  component: EventBusView,
  meta: {
    isNav: true,
    title: {
      default: 'Event Bus',
    },
  },
} satisfies _RouteRecordRaw<'eventBus'>;
