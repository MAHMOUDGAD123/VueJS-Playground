import { defineRouteRecord } from 'strict-vue-router';
import OptVsCompView from '@/views/OptVsCompView.vue';

export const optionVsCompositionRouteRecord = defineRouteRecord<'optVsComp'>({
  path: '/opt-vs-comp',
  name: 'optVsComp',
  component: OptVsCompView,
  meta: {
    title: {
      default: 'Opt Vs Comp',
    },
    isNav: true,
    navLinkTitle: 'OptVsComp',
  },
});
