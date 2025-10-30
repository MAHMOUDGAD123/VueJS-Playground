import 'vue-router';

type From1To10 = RangeFromTo<1, 10>;
type From1To100 = RangeFromTo<1, 100>;

declare module 'vue-router' {
  /**
   * Custom Route Info
   * @info Used with {@link CustomRouteMap}
   */
  type CustomRouteInfo<
    RoutePath extends string[],
    Path extends string[],
    StaticTitle extends string = never,
    DynamicTitle extends string = never,
    ChildrenNames extends string = never,
    Params extends Record<string, unknown> = never,
    Query extends Record<string, unknown> = never,
    Hash extends `#${string}` = never,
  > = {
    routePath: RoutePath;
    path: Path;
    staticTitle: StaticTitle;
    dynamicTitle: DynamicTitle;
    childrenNames: ChildrenNames;
    params: Params;
    query: Query;
    hash: Hash;
  };

  /**
   * A custom route map defined by the you.
   */
  interface CustomRouteMap {
    home: CustomRouteInfo<['/'], ['/'], 'Home'>;

    optVsComp: CustomRouteInfo<['/opt-vs-comp'], ['/opt-vs-comp'], 'Options Vs Composition'>;

    vueRouter: CustomRouteInfo<
      ['/vue-router'],
      ['/vue-router'],
      'Vue Router',
      never,
      'users' | 'posts'
    >;

    users: CustomRouteInfo<
      ['/vue-router', 'users'],
      ['/vue-router', 'users'],
      'Users',
      never,
      'user',
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

    eventBus: CustomRouteInfo<['/event-bus'], ['/event-bus'], 'Event Bus'>;

    todoApp: CustomRouteInfo<['/todo-app'], ['/todo-app'], 'Todo App'>;

    composable: CustomRouteInfo<['/composable'], ['/composable'], 'Composable'>;

    scrollOptim: CustomRouteInfo<['/scroll-optim'], ['/scroll-optim'], 'scroll Optimizer'>;

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

    test: CustomRouteInfo<
      ['/:first?-:last?'],
      never,
      'Test',
      never,
      never,
      {
        first: string | number;
        last: string | number;
      }
    >;
  }
}
