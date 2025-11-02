import ScrollOptimizerView from '@/views/ScrollOptimizerView.vue';
import type { _RouteRecordRaw } from 'vue-router';

export const scrollOptimizerRouteRecord = {
  path: '/scroll-optim',
  name: 'scrollOptim',
  component: ScrollOptimizerView,
  meta: {
    isNav: true,
    title: {
      default: 'scroll Optimizer',
    },
  },
} satisfies _RouteRecordRaw<'scrollOptim'>;
