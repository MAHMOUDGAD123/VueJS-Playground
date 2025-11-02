import { useNavigationErrorStore } from '@/stores/navigation-error';
import NavigationErrorView from '@/views/NavigationErrorView.vue';
import type { _RouteRecordRaw } from 'vue-router';

export const navigationErrorRouteRecord = {
  path: '/nav-error',
  name: 'navigationErr',
  component: NavigationErrorView,
  beforeEnter: () => {
    const errorStore = useNavigationErrorStore();
    // if the error is null go to Homw view
    if (!errorStore.error) {
      return { name: 'home', replace: true };
    }
  },
  meta: {
    title: {
      default: 'Navigation Error',
    },
    isNav: false,
  },
} satisfies _RouteRecordRaw<'navigationErr'> as _RouteRecordRaw;
