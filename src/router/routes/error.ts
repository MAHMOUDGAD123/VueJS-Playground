import { useErrorStore } from '@/stores/composable/error';
import { defineRouteRecord } from 'strict-vue-router';
import ErrorView from '@/views/ErrorView.vue';

export const errorRouteRecord = defineRouteRecord<'error'>({
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
});
