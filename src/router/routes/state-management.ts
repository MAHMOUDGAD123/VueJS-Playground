import VuexView from '@/components/state-management/VuexView.vue';
import PiniaView from '@/components/state-management/PiniaView.vue';
import SMView from '@/views/SMView.vue';
import { defineRouteRecord } from 'strict-vue-router';

export const testRouteRecord = defineRouteRecord<'sm'>({
  path: '/sm',
  name: 'sm',
  component: SMView,
  meta: {
    title: {
      default: 'State Management',
    },
    isNav: true,
    navLinkTitle: 'SM',
  },
  children: [
    {
      name: 'smViews',
      path: 'views',
      components: {
        vuexView: VuexView,
        piniaView: PiniaView,
      },
      meta: {
        title: {
          default: 'State Management Views',
        },
        isNav: false,
      },
    },
  ],
});
