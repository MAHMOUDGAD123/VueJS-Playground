import OptVsCompView from '@/views/OptVsCompView.vue';
import type { _RouteRecordRaw } from 'vue-router';

export const optionVsCompositionRouteRecord = {
  path: '/opt-vs-comp',
  name: 'optVsComp',
  component: OptVsCompView,
  meta: {
    title: {
      default: 'Opt Vs Comp',
    },
    isNav: true,
  },
} satisfies _RouteRecordRaw<'optVsComp'>;
