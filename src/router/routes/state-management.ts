import VuexView from '@/components/state-management/VuexView.vue';
import PiniaView from '@/components/state-management/PiniaView.vue';
import SMView from '@/views/SMView.vue';
import type { _RouteRecordRaw } from 'vue-router';

export const testRouteRecord = {
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
      path: 'views',
      name: 'smViews',
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
    } satisfies _RouteRecordRaw<'smViews'> as _RouteRecordRaw,
  ],
} satisfies _RouteRecordRaw<'sm'>;
