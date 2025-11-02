import ComposableView from '@/views/ComposableView.vue';
import type { _RouteRecordRaw } from 'vue-router';

export const composableRouteRecord = {
  path: '/composable',
  name: 'composable',
  component: ComposableView,
  meta: {
    isNav: true,
    title: {
      default: 'Composable',
    },
  },
} satisfies _RouteRecordRaw<'composable'>;
