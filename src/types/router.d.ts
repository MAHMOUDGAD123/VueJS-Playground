import type { Ref, ShallowRef, WritableComputedRef } from 'vue';
import 'vue-router';

declare module 'vue-router' {
  type CustomRouteName = Prettify<keyof CustomRouteMap>;
  type CustomRoutePath = JoinPaths<CustomRouteMap[keyof CustomRouteMap]['routePath']>;
  type CustomPath = OnlyWithSlash<JoinPaths<CustomRouteMap[keyof CustomRouteMap]['path']>>;
  type CustomRouteStaticTitle =
    | NonEmpty<Flatten<CustomRouteMap[keyof CustomRouteMap]['staticTitle']>>
    | (string & {});
  type CustomRouteDynamicTitle =
    | NonEmpty<Flatten<CustomRouteMap[keyof CustomRouteMap]['dynamicTitle']>>
    | (string & {});

  // Custom route meta
  interface RouteMeta {
    /**
     * The route title (document.title) value.
     */
    title: {
      /**
       * You should provide it as default value for the (document.title) if the (isDynamic) if falsy.
       */
      default: CustomRouteStaticTitle;
      /**
       * Dynamic route title or not
       * @example
       * Static  -> 'Users'
       * Dynamic -> 'User <[id]>'
       */
      isDynamic?: boolean;
      /**
       * This will hold the string pattern:
       * @example
       * for a static title  ->  `Posts Page`
       * for a dynamic title ->  `User <[userid]> - <[postid]>` => ex: 'User 1 - 7'
       * @info a title dynamic record must be in the next shape:
       * ```ts
       * <[prop]>
       * ````
       */
      pattern?: CustomRouteDynamicTitle;
      /**
       * Array of tuple that holds
       * ```ts
       * Props: [propertyName, PropertyPath][]
       * ```
       * - (propertyName): is the name of the property in the title.pattern.
       * - (propertyPath): is the access chain in the {@link RouteRecord} object.
       * @example
       * ```ts
       * [['userid', 'params.userid'], ['postid', 'query.postid']]
       * ```
       */
      propsMap?: [string, string][];
    };
  }

  // Hack the routes types override all (RouteRecordRaw) dependencies
  // --------------------------------------------------------------
  interface RouteRecordSingleView {
    path: CustomRoutePath;
    name?: CustomRouteName;
  }
  interface RouteRecordSingleViewWithChildren {
    path: CustomRoutePath;
    name?: CustomRouteName;
  }
  interface RouteRecordMultipleViews {
    path: CustomRoutePath;
    name?: CustomRouteName;
  }
  interface RouteRecordMultipleViewsWithChildren {
    path: CustomRoutePath;
    name?: CustomRouteName;
  }
  interface RouteRecordRedirect {
    path: CustomRoutePath;
    name?: CustomRouteName;
  }
  // --------------------------------------------------------------

  // Hack location name & path
  interface RouteLocationGeneric {
    name: CustomRouteName | null | undefined;
    path: CustomPath;
  }
  interface RouteLocationNormalizedGeneric {
    path: CustomPath;
  }
  interface RouteLocationNormalizedLoadedGeneric {
    name: CustomRouteName;
    path: CustomPath;
  }
  interface RouteLocationNormalizedLoadedTyped {
    path: CustomPath;
  }
  interface RouteLocationAsRelativeTyped {
    path?: CustomPath;
  }
  interface RouteLocationNormalizedTyped {
    path: CustomPath;
  }
  interface RouteLocationMatched {
    name: CustomRouteName;
    path: CustomRoutePath;
  }
  interface RouteLocationNamedRaw {
    name?: CustomRouteName;
    path?: undefined;
  }
  interface RouteLocationPathRaw {
    path: CustomPath;
  }
  interface RouteLocationResolvedGeneric {
    name: CustomRouteName | null | undefined;
    path: CustomPath;
  }
  interface RouteLocationResolvedTyped {
    name: CustomRouteName | null | undefined;
    path: CustomPath;
  }
  interface RouteLocationTyped {
    path: CustomPath;
  }

  // Hack router types
  // --------------------------------------------------------------
  type CustomRouteLocationNormalized = RouteLocationNormalized & {
    path: CustomPath;
    /**
     * Name of the matched record
     */
    name: CustomRouteName;
    matched: CustomRouteRecord[];
  };

  type CustomeNavigationGuardReturn = void | Error | boolean | CustomRouteLocationRaw;

  /**
   * Custom Navigation Guard {@link NavigationGuard}.
   */
  interface CustomNavigationGuard {
    (
      to: CustomRouteLocationNormalized,
      from: RouteLocationNormalizedLoaded,
      next: NavigationGuardNext,
    ): _Awaitable<CustomeNavigationGuardReturn>;
  }

  /**
   * Navigation Guard with a type parameter for `this`.
   * @see {@link TypesConfig}
   */
  interface CustomNavigationGuardWithThis<T> {
    (
      this: T,
      to: CustomRouteLocationNormalized,
      from: RouteLocationNormalizedLoaded,
      next: NavigationGuardNext,
    ): _Awaitable<CustomeNavigationGuardReturn>;
  }

  /**
   * Extended Error that contains extra information regarding a failed navigation.
   */
  interface CustomNavigationFailure extends Error {
    /**
     * Type of the navigation. One of {@link NavigationFailureType}
     */
    type:
      | ErrorTypes.NAVIGATION_CANCELLED
      | ErrorTypes.NAVIGATION_ABORTED
      | ErrorTypes.NAVIGATION_DUPLICATED;
    /**
     * Route location we were navigating from
     */
    from: CustomRouteLocationNormalized;
    /**
     * Route location we were navigating to
     */
    to: CustomRouteLocationNormalized;
  }

  /**
   * Navigation hook triggered after a navigation is settled.
   */
  interface CustomNavigationHookAfter {
    (
      to: CustomRouteLocationNormalized,
      from: RouteLocationNormalizedLoaded,
      failure?: CustomNavigationFailure | void,
    ): unknown;
  }

  /**
   * A customized version of {@link RouteLocationRaw} for {@link NavigationGuardNext}.
   */
  type CustomGuardNextRouteLocationRaw =
    | CustomPath
    | RouteLocationAsRelativeGeneric
    | RouteLocationAsPathGeneric
    | {
        /**
         * Triggers the navigation even if the location is the same as the current one. Note this will also add a new entry to the history unless replace: true is passed.
         */
        force?: boolean;
        hash?: string;
        /** Error message*/
        message: string;
        /** Error stack*/
        stack?: string;
        name?: CustomRouteName;
        params?: RouteParamsRawGeneric;
        /**
         * A relative path to the current location. This property should be removed Percentage encoded pathname section of the URL.
         */
        path?: CustomPath;
        query?: LocationQueryRaw;
        /**
         * Replace the entry in the history instead of pushing a new entry
         */
        replace?: boolean;
        /**
         * State to save using the History API. This cannot contain any reactive values and some primitives like Symbols are forbidden. More info at https://developer.mozilla.org/en-US/docs/Web/API/History/state
         */
        state?: HistoryState;
      };

  interface NavigationGuardNext {
    (location: CustomGuardNextRouteLocationRaw): void;
  }

  /**
   * A customized version of {@link RouteLocationRaw}.
   */
  type CustomRouteLocationRaw =
    | CustomPath
    | {
        /**
         * Triggers the navigation even if the location is the same as the current one. Note this will also add a new entry to the history unless replace: true is passed.
         */
        force?: boolean;
        hash?: string;
        name?: CustomRouteName;
        params?: RouteParamsRawGeneric;
        /**
         * A relative path to the current location. This property should be removed Percentage encoded pathname section of the URL.
         */
        path?: CustomPath;
        query?: LocationQueryRaw;
        /**
         * Replace the entry in the history instead of pushing a new entry
         */
        replace?: boolean;
        /**
         * State to save using the History API. This cannot contain any reactive values and some primitives like Symbols are forbidden. More info at https://developer.mozilla.org/en-US/docs/Web/API/History/state
         */
        state?: HistoryState;
      };

  /**
   * A cusomized version of {@link RouteRecordRedirectOption}.
   */
  type CustomRouteRecordRedirectOption =
    | CustomRouteLocationRaw
    | ((to: RouteLocation) => CustomRouteLocationRaw);

  /**
   * A customized version from {@link RouteRecord | route record}.
   */
  type CustomRouteRecord = Omit<
    RouteRecord,
    'aliasOf' | 'path' | 'name' | 'beforeEnter' | 'leaveGuards' | 'redirect' | 'updateGuards'
  > & {
    /**
     * Path of the record. Should start with `/` unless the record is the child of
     * another record.
     *
     * @example `/users/:id` matches `/users/1` as well as `/users/posva`.
     */
    path: CustomRoutePath;
    /**
     * Where to redirect if the route is directly matched. The redirection happens
     * before any navigation guard and triggers a new navigation with the new
     * target location.
     */
    redirect: CustomRouteRecordRedirectOption | undefined;
    /**
     * Name for the route record. Must be unique.
     */
    name: CustomRouteName;
    /**
     * Before Enter guard specific to this record. Note `beforeEnter` has no
     * effect if the record has a `redirect` property.
     */
    beforeEnter:
      | CustomNavigationGuardWithThis<undefined>
      | CustomNavigationGuardWithThis<undefined>[]
      | undefined;
    /**
     * Registered leave guards
     *
     * @internal
     */
    leaveGuards: Set<CustomNavigationGuard>;
    /**
     * Registered update guards
     *
     * @internal
     */
    updateGuards: Set<CustomNavigationGuard>;
    /**
     * Defines if this record is the alias of another one. This property is
     * `undefined` if the record is the original one.
     */
    aliasOf: CustomRouteLocationNormalized | undefined;
  };

  interface _ErrorListener {
    (
      error: unknown,
      to: CustomRouteLocationNormalized,
      from: RouteLocationNormalizedLoaded,
    ): unknown;
  }

  interface Router {
    addRoute(parentName: NonNullable<CustomRouteName>, route: RouteRecordRaw): () => void;
    removeRoute(name: NonNullable<CustomRouteName>): void;
    hasRoute(name: NonNullable<CustomRouteName>): boolean;
    beforeEach(guard: CustomNavigationGuardWithThis<undefined>): () => void;
    beforeResolve(guard: CustomNavigationGuardWithThis<undefined>): () => void;
    afterEach(guard: CustomNavigationHookAfter): () => void;
    onError(handler: _ErrorListener): () => void;
    getRoutes(): CustomRouteRecord[];
    push(to: CustomRouteLocationRaw): Promise<CustomNavigationFailure | void | undefined>;
    replace(to: CustomRouteLocationRaw): Promise<CustomNavigationFailure | void | undefined>;
    resolve(
      to: CustomRouteLocationRaw,
      currentLocation?: RouteLocationNormalizedLoaded,
    ): RouteLocationResolved;
  }

  // --------------------------------------------------------------

  function onBeforeRouteLeave(leaveGuard: CustomNavigationGuard): void;
  function onBeforeRouteUpdate(updateGuard: CustomNavigationGuard): void;

  // useLink hack
  // --------------------------------------------------------------
  function useLink(props: CustomUseLinkOptions): CustomUseLinkReturn;

  // Ref<T> | ShallowRef<T> | WritableComputedRef<T>

  interface CustomUseLinkOptions {
    to:
      | CustomRouteLocationRaw
      | Ref<CustomRouteLocationRaw>
      | ShallowRef<CustomRouteLocationRaw>
      | WritableComputedRef<CustomRouteLocationRaw>;
    replace?: MaybeRef<boolean | undefined>;
    viewTransition?: boolean;
  }

  interface CustomUseLinkReturn {
    route: ComputedRef<RouteLocationResolvedGeneric>;
    href: ComputedRef<string>;
    isActive: ComputedRef<boolean>;
    isExactActive: ComputedRef<boolean>;
    navigate(e?: MouseEvent): Promise<void | CustomNavigationFailure>;
  }

  // --------------------------------------------------------------

  // RouterMatcher hack
  // --------------------------------------------------------------
  function createRouterMatcher(
    routes: Readonly<RouteRecordRaw[]>,
    globalOptions: PathParserOptions,
  ): CustomRouterMatcher;

  interface CustomRouterMatcher {
    addRoute: (record: RouteRecordRaw, parent?: CustomRouteRecordMatcher) => () => void;
    removeRoute(matcher: CustomRouteRecordMatcher): void;
    removeRoute(name: NonNullable<CustomRouteName>): void;
    clearRoutes: () => void;
    getRoutes: () => CustomRouteRecordMatcher[];
    getRecordMatcher: (name: NonNullable<CustomRouteName>) => CustomRouteRecordMatcher | undefined;
    /**
     * Resolves a location. Gives access to the route record that corresponds to the actual path as well as filling the corresponding params objects
     *
     * @param location - MatcherLocationRaw to resolve to a url
     * @param currentLocation - MatcherLocation of the current location
     */
    resolve: (
      location: CustomMatcherLocationRaw,
      currentLocation: CustomMatcherLocation,
    ) => CustomMatcherLocation;
  }

  interface _MatcherLocationAsName {
    name: CustomRouteName;
    /**
     * Ignored path property since we are dealing with a relative location. Only `undefined` is allowed.
     */
    path?: undefined;
    params?: RouteParamsGeneric;
  }
  interface _MatcherLocationAsPath {
    path: CustomPath;
  }
  interface _MatcherLocationAsRelative {
    /**
     * Ignored path property since we are dealing with a relative location. Only `undefined` is allowed.
     */
    path?: undefined;
    params?: RouteParamsGeneric;
  }

  /**
   * A customized version of {@link MatcherLocation}.
   */
  interface CustomMatcherLocation {
    /**
     * Name of the matched record
     */
    name: CustomRouteName | null | undefined;
    /**
     * Percentage encoded pathname section of the URL.
     */
    path: string;
    /**
     * Object of decoded params extracted from the `path`.
     */
    params: RouteParamsGeneric;
    /**
     * Merged `meta` properties from all the matched route records.
     */
    meta: RouteMeta;
    /**
     * Array of {@link RouteRecord} containing components as they were
     * passed when adding records. It can also contain redirect records. This
     * can't be used directly
     */
    matched: CustomRouteRecord[];
  }

  /**
   * A customized version of (MatcherLocationRaw).
   */
  type CustomMatcherLocationRaw =
    | _MatcherLocationAsName
    | _MatcherLocationAsPath
    | _MatcherLocationAsRelative;

  interface CustomRouteRecordMatcher extends PathParser {
    record: CustomRouteRecord;
    parent: CustomRouteRecordMatcher | undefined;
    children: CustomRouteRecordMatcher[];
    alias: CustomRouteRecordMatcher[];
  }

  interface PathParser {
    /**
     * The regexp used to match a url
     */
    re: RegExp;
    /**
     * The score of the parser
     */
    score: Array<number[]>;
    /**
     * Keys that appeared in the path
     */
    keys: {
      name: string;
      repeatable: boolean;
      optional: boolean;
    }[];
    /**
     * Parses a url and returns the matched params or null if it doesn't match. An
     * optional param that isn't preset will be an empty string. A repeatable
     * param will be an array if there is at least one value.
     *
     * @param path - url to parse
     * @returns a Params object, empty if there are no params. `null` if there is
     * no match
     */
    parse(path: CustomPath | (string & {})): Record<string, string | string[]> | null;
    /**
     * Creates a string version of the url
     *
     * @param params - object of params
     * @returns a url
     */
    stringify(params: Record<string, string | string[]>): string;
  }
  // --------------------------------------------------------------

  // Hack router-link props
  interface RouterLinkProps {
    to:
      | CustomPath
      | RouteLocationAsRelativeGeneric
      | RouteLocationAsPathGeneric
      | {
          name?: CustomRouteName;
          path?: CustomPath;
        };
  }

  // Customize internal types
  interface TypesConfig {
    $route: RouteLocationNormalizedGeneric & {
      name: CustomRouteName;
      matched: CustomRouteRecord[];
    };

    beforeRouteEnter: CustomNavigationGuardWithThis<undefined>;
    beforeRouteUpdate: CustomNavigationGuard;
    beforeRouteLeave: CustomNavigationGuard;
  }
}

export {};
