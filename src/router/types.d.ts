import type { RouteLocationNormalized } from 'vue-router';

type From1To10 = RangeFromTo<1, 10>;
type From1To100 = RangeFromTo<1, 100>;

declare module 'vue-router' {
  // Extends route meta
  interface RouteMeta {
    /**
     * Useed to check if this route can be used as a navigation link in the main nav bar
     */
    isNav?: boolean;
    /**
     * A title used with RouterLink as text
     */
    navLinkTitle?: string;
  }
}

declare module 'strict-vue-router' {
  interface CustomRouteMap {
    home: CustomRouteInfo<['/'], ['/'], 'Home'>;

    optVsComp: CustomRouteInfo<['/opt-vs-comp'], ['/opt-vs-comp'], 'Opt Vs Comp'>;

    vueRouter: CustomRouteInfo<
      ['/vue-router'],
      ['/vue-router'],
      'Vue Router',
      never,
      'users' | 'posts' | 'newRouteTest'
    >;

    users: CustomRouteInfo<
      ['/vue-router', 'users'],
      ['/vue-router', 'users'],
      'Users',
      never,
      'user',
      never,
      never,
      never,
      never,
      `#${From1To10}`
    >;

    user: CustomRouteInfo<
      ['/vue-router', 'users', ':userid((?:[1-9]|10\\))'],
      ['/vue-router', 'users', `${From1To10}`],
      'User',
      'User #<[userid]>',
      'userPost',
      {
        userid: `${From1To10}` | From1To10;
      },
      {
        userid: `${From1To10}` | From1To10;
      }
    >;

    userPost: CustomRouteInfo<
      ['/vue-router', 'users', ':userid((?:[1-9]|10\\))', 'posts', ':postid((?:[1-9]|10\\))'],
      ['/vue-router', 'users', `${From1To10}`, 'posts', `${From1To10}`],
      'User Post',
      'User #<[userid]> -- Post #<[postid]>',
      never,
      {
        userid: `${From1To10}` | From1To10;
        postid: `${From1To10}` | From1To10;
      },
      {
        userid: `${From1To10}` | From1To10;
        postid: `${From1To10}` | From1To10;
      }
    >;

    posts: CustomRouteInfo<
      ['/vue-router', 'posts'],
      ['/vue-router', 'posts'],
      'Posts',
      never,
      'post',
      never,
      never,
      never,
      never,
      `#${From1To100}`
    >;

    post: CustomRouteInfo<
      ['/vue-router', 'posts', ':postid((?:[1-9]|[1-9][0-9]|100\\))'],
      [`/vue-router`, 'posts', `${From1To100}`],
      'Post',
      'Post #<[postid]>',
      never,
      {
        postid: `${From1To100}` | From1To100;
      },
      {
        postid: `${From1To100}` | From1To100;
      }
    >;

    // dynamic Route Test
    newRoute: CustomRouteInfo<['/vue-router', 'new-route'], never, 'New Route'>;
    newRouteTest: CustomRouteInfo<
      ['/vue-router', 'new-route-test'],
      ['/vue-router', 'new-route-test'],
      'New Route Test'
    >;

    eventBus: CustomRouteInfo<['/event-bus'], ['/event-bus'], 'Event Bus'>;

    todoApp: CustomRouteInfo<['/todo-app'], ['/todo-app'], 'Todo App'>;

    composable: CustomRouteInfo<['/composable'], ['/composable'], 'Composable'>;

    scrollOptim: CustomRouteInfo<['/scroll-optim'], ['/scroll-optim'], 'Scroll Optimizer'>;

    notFound: CustomRouteInfo<
      ['/:pathMatch(.*)*'],
      never,
      '404',
      never,
      never,
      {
        pathMatch: string[];
      }
    >;

    error: CustomRouteInfo<['/error'], never, 'Error'>;

    routerError: CustomRouteInfo<['/router-error'], never, 'Router Error'>;

    navigationErr: CustomRouteInfo<
      ['/nav-error'],
      never,
      'Navigation Error',
      never,
      never,
      never,
      never,
      never,
      {
        // just for testing
        error?: Error | null;
        from?: RouteLocationNormalized | null;
        to?: RouteLocationNormalized | null;
      }
    >;

    sm: CustomRouteInfo<['/sm'], ['/sm'], 'State Management', never, 'smViews'>;

    smViews: CustomRouteInfo<
      ['/sm', 'views'],
      ['/sm', 'views'],
      'State Management Views',
      never,
      never,
      never,
      never,
      {
        vuexView: null;
        piniaView: null;
      },
      { state1: string; state2: string }
    >;
  }
}
