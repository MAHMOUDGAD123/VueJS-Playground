import { useNavigationErrorStore } from '@/stores/navigation-error';
import { type NavigationFailure, type RouteLocationNormalized } from 'vue-router';
import { Logger } from './logger';
import { router } from '@/router';

export const resolveTitle = (route: RouteLocationNormalized) => {
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

export const navigateToErrorPage = (err: Error) => {
  const errorStore = useNavigationErrorStore();

  errorStore.setNavigationError({
    error: err as Error,
    from: null,
    to: null,
  });

  // Navigate to error page
  router.replace<'error'>({ name: 'error' });
};

export const navigateToRouterErrorPage = (
  err: Error,
  from: RouteLocationNormalized,
  to: RouteLocationNormalized,
) => {
  const errorStore = useNavigationErrorStore();

  errorStore.setNavigationError({
    error: err as Error,
    from: from!,
    to: to!,
  });

  // Navigate to error page
  router.replace<'routerError'>({ name: 'routerError' });

  if (import.meta.env.DEV) {
    const logger = new Logger('Router');
    const msg = `Routing from (${from.fullPath}) -> (${to.fullPath}) failed.`;
    logger.warn(msg);
    logger.error((err as Error).message);
  }
};

export const navigateToNavigationErrorPage = (err: NavigationFailure) => {
  const errorStore = useNavigationErrorStore();

  errorStore.setNavigationError({
    error: err as Error,
    from: err.from,
    to: err.to as RouteLocationNormalized,
  });

  // Navigate to Navigation error page
  router.replace<'navigationErr'>({ name: 'navigationErr' });

  if (import.meta.env.DEV) {
    const { from, to } = err;
    const logger = new Logger('Navigation');
    const msg = `Navigation from (${from.fullPath}) -> (${to.fullPath}) failed.`;
    logger.warn(msg);
    logger.error((err as Error).message);
  }
};
