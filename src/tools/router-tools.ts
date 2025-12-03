import { useNavigationErrorStore } from '@/stores/composable/navigation-error';
import { type NavigationFailure, type RouteLocationNormalized } from 'vue-router';
import { Logger } from './logger';
import { router } from '@/router';
import { useErrorStore } from '@/stores/composable/error';

export const navigateToErrorPage = (err: Error, route: RouteLocationNormalized) => {
  const errorStore = useErrorStore();

  errorStore.setError({
    error: err as Error,
    route,
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
    from: from,
    to: to,
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

export const navigateToNavigationFailurePage = (err: NavigationFailure) => {
  const errorStore = useNavigationErrorStore();

  errorStore.setNavigationError({
    error: err as Error,
    from: err.from,
    to: err.to,
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
