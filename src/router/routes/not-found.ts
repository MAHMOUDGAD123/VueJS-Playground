import NotFoundView from '@/views/NotFoundView.vue';
import type { _RouteRecordRaw } from 'vue-router';

export const notFoundRouteRecord = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: NotFoundView,
  meta: {
    title: {
      default: '404',
    },
    isNav: false,
  },
} satisfies _RouteRecordRaw<'notFound'>;
