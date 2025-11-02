import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router';
import { routes } from './routes';
import { Logger } from '@/tools/logger';
import { useNavigationErrorStore } from '@/stores/navigation-error';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  strict: true, // strict route path match with no trailling slash
});

const resolveTitle = (route: RouteLocationNormalized) => {
  if (!route.meta) return;
  if (route.meta.title.isDynamic && route.meta.title.pattern) {
    let titleValue = route.meta.title.pattern as string;

    route.meta.title.propsMap!.forEach(([prop, path]) => {
      let propValue = route as unknown;
      const pathArray = path.split('.');
      pathArray.forEach((propKey) => {
        // @ts-ignore
        propValue = propValue[propKey];
      });
      titleValue = titleValue!.replace(`<[${prop}]>`, `${propValue}`);
    });
    document.title = titleValue;
  } else {
    document.title = route.meta.title.default;
  }
};

// Guards
// -------------------------------------------------
router.beforeEach(() => {
  // fake error
  // if (
  //   to.name !== 'navigationErr' &&
  //   from.name !== 'navigationErr' &&
  //   rand({ min: 1, max: 4 }) === 3
  // ) {
  //   throw new Error('Navigation Failure');
  // }
});

router.onError<'navigationErr'>((err, to, from) => {
  // Catch any navigation error
  const errorStore = useNavigationErrorStore();
  errorStore.setNavigationError({
    error: err as Error,
    from: from,
    to: to,
  });

  // Navigate to Navigation error page
  router.replace<'navigationErr'>({ name: 'navigationErr' });

  if (import.meta.env.DEV) {
    const logger = new Logger('Router');
    const msg = `Navigation from (${from.fullPath}) -> (${to.fullPath}) failed.`;
    logger.warn(msg);
    logger.error((err as Error).message);
  }
});

router.beforeResolve(() => {
  // console.log('Global beforeResolve');
});

router.afterEach((to) => {
  // Set the page title
  resolveTitle(to);
});

export { router, routes };
