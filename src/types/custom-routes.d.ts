import 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';

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
    Props extends Record<string, unknown> = never,
    HistoryState extends Record<string, unknown> = never,
    Hash extends `#${string}` = never,
  > = {
    /**
     * Route record path
     * @example '/users/:id'
     */
    routePath: RoutePath;
    /**
     * Route location path
     * @example '/users/1'
     */
    path: Path;
    /**
     * Route location meta record
     * Default document.title value if the (dynamicTitle) is undefined
     * @example 'Users'
     */
    staticTitle: StaticTitle;
    /**
     * Route location meta record
     * Dynamic title string defined by you
     * @example 'User <[userid]>'
     */
    dynamicTitle: DynamicTitle;
    /**
     * Route location children routes names
     */
    childrenNames: ChildrenNames;
    /**
     * Route location params
     */
    params: Params;
    /**
     * Route location query
     */
    query: Query;
    /**
     * Route record props
     * - CASE (1): When used with single view Route records must be in the next form:
     * @example
     * ```ts
     * type Props = {
     *  Prop1: string | number;
     *  Prop2: string | number;
     * }
     * ```
     * - CASE (2): When  used with multi view Route records must be in the next form:
     * @example
     * ```ts
     * type ComponentsProps = {
     *  viewOne: {
     *    prop1: string;
     *    prop2: string;
     *  },
     *  viewTwo: {
     *    prop1: string;
     *    prop2: string;
     *  }
     * }
     * ```
     */
    props: Props;
    /**
     * Route location state
     */
    historyState: HistoryState;
    /**
     * Route location hash
     */
    hash: Hash;
  };

  /**
   * A custom route map defined by you.
   */
  interface CustomRouteMap {
    home: CustomRouteInfo<['/'], ['/'], 'Home'>;

    optVsComp: CustomRouteInfo<['/opt-vs-comp'], ['/opt-vs-comp'], 'Opt Vs Comp'>;

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

    test: CustomRouteInfo<['/test'], ['/test'], 'Test', never, 'testChild' | 'newRouteTest'>;

    // dynamic Route Test
    newRoute: CustomRouteInfo<['/new-route'], never, 'New Route'>;
    newRouteTest: CustomRouteInfo<['/new-route-test'], never, 'New Route Test'>;

    testChild: CustomRouteInfo<
      ['/test', ':first?-:last?'],
      never,
      'Test Child',
      never,
      never,
      {
        first?: string | number;
        last?: string | number;
      },
      never,
      {
        viewOne: {
          prop1?: string | number;
          prop2?: string | number;
        };
        viewTwo: {
          prop3?: string | number;
          prop4?: string | number;
        };
      }
    >;
  }
}
