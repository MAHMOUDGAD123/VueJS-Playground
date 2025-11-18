import { useErrorStore } from '@/stores/composable/error';
import ErrorView from '@/views/ErrorView.vue';
import type { _RouteRecordRaw } from 'vue-router';

export const errorRouteRecord = {
  path: '/error',
  name: 'error',
  component: ErrorView,
  beforeEnter: () => {
    const errorStore = useErrorStore();
    // if the error is null go to Homw view
    if (!errorStore.state.error) {
      return { name: 'home', replace: true };
    }
  },
  meta: {
    title: {
      default: 'Error',
    },
    isNav: false,
  },
} satisfies _RouteRecordRaw<'error'> as _RouteRecordRaw;
