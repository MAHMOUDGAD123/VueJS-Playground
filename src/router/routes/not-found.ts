import { defineRouteRecord } from 'strict-vue-router';
import NotFoundView from '@/views/NotFoundView.vue';

export const notFoundRouteRecord = defineRouteRecord<'notFound'>({
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: NotFoundView,
  meta: {
    title: {
      default: '404',
    },
    isNav: false,
  },
});
