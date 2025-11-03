import { useNavigationErrorStore } from '@/stores/navigation-error';
import RouterErrorView from '@/views/RouterErrorView.vue';
import type { _RouteRecordRaw } from 'vue-router';

export const routerErrorRouteRecord = {
  path: '/router-error',
  name: 'routerError',
  component: RouterErrorView,
  beforeEnter: () => {
    const errorStore = useNavigationErrorStore();
    // if the error is null go to Homw view
    if (!errorStore.error) {
      return { name: 'home', replace: true };
    }
  },
  meta: {
    title: {
      default: 'Router Error',
    },
    isNav: false,
  },
} satisfies _RouteRecordRaw<'routerError'> as _RouteRecordRaw;
