import {
  createRouter,
  createWebHistory,
  isNavigationFailure,
  NavigationFailureType,
} from 'vue-router';
import { routes } from '@/router/routes';
import {
  navigateToRouterErrorPage,
  navigateToNavigationErrorPage,
  resolveTitle,
} from '@/tools/router-tools';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  strict: true, // strict route path match with no trailling slash
});

// Guards
// -------------------------------------------------
router.beforeEach(() => {
  // fake random error
  // ---------------------------
  // if (from.name && to.name !== 'error' && from.name !== 'error' && rand({ min: 1, max: 4 }) === 3) {
  //   next(new Error('Somthing went wrong'));
  // } else {
  //   next();
  // }
  // ---------------------------
});

router.onError((err, to, from) => {
  // Catch any navigation error
  navigateToRouterErrorPage(err, to, from);
});

router.afterEach((to, _, failure) => {
  // Set the page title
  if (isNavigationFailure(failure, NavigationFailureType.cancelled)) {
    return navigateToNavigationErrorPage(failure);
  }

  // set the page title
  resolveTitle(to);
});

export { router, routes };
