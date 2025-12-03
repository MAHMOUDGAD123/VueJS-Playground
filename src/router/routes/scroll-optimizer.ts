import { defineRouteRecord } from 'strict-vue-router';
import ScrollOptimizerView from '@/views/ScrollOptimizerView.vue';

export const scrollOptimizerRouteRecord = defineRouteRecord<'scrollOptim'>({
  path: '/scroll-optim',
  name: 'scrollOptim',
  component: ScrollOptimizerView,
  meta: {
    isNav: true,
    navLinkTitle: 'ScrollOptim',
    title: {
      default: 'Scroll Optimizer',
    },
  },
});
