import {
  createRouter,
  createWebHistory,
  isNavigationFailure,
  NavigationFailureType,
} from 'vue-router';
import {
  navigateToRouterErrorPage,
  navigateToNavigationFailurePage,
  resolveTitle,
} from '@/tools/router-tools';
import { routes } from '@/router/routes';
import type { RouteRecordRaw } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[],
  strict: true, // strict route path match with no trailling slash
  scrollBehavior: (to, from, savedPosition) => {
    return savedPosition ?? { top: 0, behavior: 'smooth' };
  },
});

// Guards
// -------------------------------------------------
router.beforeEach(() => {
  // fake random error
  // ---------------------------
  // const canThrow =
  //   from.name &&
  //   to.name !== 'navigationErr' &&
  //   from.name !== 'navigationErr' &&
  //   to.name !== 'routerError' &&
  //   from.name !== 'routerError' &&
  //   rand({ min: 1, max: 4 }) === 3;
  // if (canThrow) {
  //   next(new Error('Somthing went wrong'));
  // } else {
  //   next();
  // }
  // ---------------------------
});

router.onError((err, to, from) => {
  // Catch any navigation error
  navigateToRouterErrorPage(err, from, to);
});

router.afterEach((to, _, failure) => {
  // Set the page title
  if (isNavigationFailure(failure, NavigationFailureType.cancelled)) {
    return navigateToNavigationFailurePage(failure);
  }

  // set the page title
  resolveTitle(to);
});

export { router, routes };
