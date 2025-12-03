import { useNavigationErrorStore } from '@/stores/composable/navigation-error';
import { defineRouteRecord } from 'strict-vue-router';
import NavigationErrorView from '@/views/NavigationErrorView.vue';

export const navigationErrorRouteRecord = defineRouteRecord<'navigationErr'>({
  path: '/nav-error',
  name: 'navigationErr',
  component: NavigationErrorView,
  beforeEnter: () => {
    const errorStore = useNavigationErrorStore();
    // if the error is null go to Homw view
    if (!errorStore.state.error) {
      return { name: 'home', replace: true };
    }
  },
  meta: {
    title: {
      default: 'Navigation Error',
    },
    isNav: false,
  },
});
