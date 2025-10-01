import 'vue-router';

type From1To10 = RangeFromTo<1, 10>;
type From1To100 = RangeFromTo<1, 100>;

declare module 'vue-router' {
  /**
   * Array of routes each route have the next shape:
   *
   * ```ts
   * routeName: {
   *  routePath: string[];
   *  path: string[];
   *  staticTitle: string;
   *  dynamicTitle: string;
   * }
   * ```
   */
  interface CustomRouteMap {
    home: {
      routePath: ['/'];
      path: ['/'];
      staticTitle: 'Home';
      dynamicTitle: '';
    };
    optVsComp: {
      routePath: ['/opt-vs-comp'];
      path: ['/opt-vs-comp'];
      staticTitle: 'Options Vs Composition';
      dynamicTitle: '';
    };
    vueRouter: {
      routePath: ['/vue-router'];
      path: ['/vue-router'];
      staticTitle: 'Vue Router';
      dynamicTitle: '';
    };
    users: {
      routePath: ['/vue-router', 'users'];
      path: ['/vue-router', 'users'];
      staticTitle: 'Users';
      dynamicTitle: '';
    };
    user: {
      routePath: ['/vue-router', 'users', ':userid'];
      path: [`/vue-router`, 'users', `${From1To10}`];
      staticTitle: 'User';
      dynamicTitle: 'User <[userid]>';
    };
    posts: {
      routePath: ['/vue-router', 'posts'];
      path: ['/vue-router', 'posts'];
      staticTitle: 'Posts';
      dynamicTitle: '';
    };
    post: {
      routePath: ['/vue-router', 'posts', ':postid'];
      path: [`/vue-router`, 'posts', `${From1To100}`];
      staticTitle: 'Post';
      dynamicTitle: 'Post <[postid]>';
    };
    eventBus: {
      routePath: ['/event-bus'];
      path: ['/event-bus'];
      staticTitle: 'Event Bus';
      dynamicTitle: '';
    };
    todoApp: {
      routePath: ['/todo-app'];
      path: ['/todo-app'];
      staticTitle: 'Todo App';
      dynamicTitle: '';
    };
    composable: {
      routePath: ['/composable'];
      path: ['/composable'];
      staticTitle: 'Composable';
      dynamicTitle: '';
    };
    notFound: {
      routePath: ['/:pathMatch(.*)*'];
      path: ''; // keep this as empty string
      staticTitle: '404';
      dynamicTitle: '';
    };
  }

  // Custom route meta
  interface RouteMeta {
    isNav?: boolean;
  }
}
