import OptVsCompView from '@/views/OptVsCompView.vue';
import type { _RouteRecordRaw } from 'vue-router';

export const optionVsCompositionRouteRecord = {
  path: '/opt-vs-comp',
  name: 'optVsComp',
  component: OptVsCompView,
  meta: {
    title: {
      default: 'Options Vs Composition',
    },
    isNav: true,
  },
} satisfies _RouteRecordRaw<'optVsComp'>;
