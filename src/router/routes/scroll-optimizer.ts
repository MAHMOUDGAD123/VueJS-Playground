import ScrollOptimizerView from '@/views/ScrollOptimizerView.vue';
import type { _RouteRecordRaw } from 'vue-router';

export const scrollOptimizerRouteRecord = {
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
} satisfies _RouteRecordRaw<'scrollOptim'>;
