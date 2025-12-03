import { useNavigationErrorStore } from '@/stores/composable/navigation-error';
import { defineRouteRecord } from 'strict-vue-router';
import RouterErrorView from '@/views/RouterErrorView.vue';

export const routerErrorRouteRecord = defineRouteRecord<'routerError'>({
  path: '/router-error',
  name: 'routerError',
  component: RouterErrorView,
  beforeEnter: () => {
    const errorStore = useNavigationErrorStore();
    // if the error is null go to Homw view
    if (!errorStore.state.error) {
      return { name: 'home', replace: true };
    }
  },
  meta: {
    title: {
      default: 'Router Error',
    },
    isNav: false,
  },
});
