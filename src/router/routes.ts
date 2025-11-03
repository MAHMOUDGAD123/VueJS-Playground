import type { _RouteRecordRaw } from 'vue-router';
import { vueRouterRouteRecord } from '@/router/routes/vue-router';
import { homeRuoteRecord } from '@/router/routes/home';
import { optionVsCompositionRouteRecord } from '@/router/routes/opt-vs-comp';
import { eventBusRouteRecord } from '@/router/routes/event-bus';
import { todoAppRouteRecord } from '@/router/routes/todo-app';
import { composableRouteRecord } from '@/router/routes/composable';
import { scrollOptimizerRouteRecord } from '@/router/routes/scroll-optimizer';
import { testRouteRecord } from '@/router/routes/test/test';
import { navigationErrorRouteRecord } from '@/router/routes/navigation-error';
import { notFoundRouteRecord } from '@/router/routes/not-found';
import { routerErrorRouteRecord } from './routes/router-error';
import { errorRouteRecord } from './routes/error';

export const routes: readonly _RouteRecordRaw[] = [
  homeRuoteRecord,
  optionVsCompositionRouteRecord,
  vueRouterRouteRecord,
  eventBusRouteRecord,
  todoAppRouteRecord,
  composableRouteRecord,
  scrollOptimizerRouteRecord,
  testRouteRecord,
  errorRouteRecord,
  routerErrorRouteRecord,
  navigationErrorRouteRecord,
  notFoundRouteRecord,
];
