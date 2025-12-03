import { defineRouteRecord } from 'strict-vue-router';
import ComposableView from '@/views/ComposableView.vue';

export const composableRouteRecord = defineRouteRecord<'composable'>({
  name: 'composable',
  path: '/composable',
  component: ComposableView,
  meta: {
    isNav: true,
    navLinkTitle: 'Composable',
    title: {
      default: 'Composable',
    },
  },
});
