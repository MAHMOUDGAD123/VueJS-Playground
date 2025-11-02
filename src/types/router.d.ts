import type { Component, DefineComponent, MaybeRef } from 'vue';
import type {
  _Awaitable,
  _RouteRecordBase,
  LocationQuery,
  NavigationFailure,
  NavigationGuardNextCallback,
  RouteLocation,
  RouteLocationAsPath,
  RouteLocationAsPathGeneric,
  RouteLocationAsPathTypedList,
  RouteLocationAsRelativeGeneric,
  RouteLocationAsRelativeTypedList,
  RouteLocationAsString,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  RouteMap,
  RouteMapGeneric,
  RouteParamsGeneric,
  RouteParamsRawGeneric,
  RouterView,
  UseLinkReturn,
} from 'vue-router';

declare module 'vue-router' {
  type Lazy<T> = () => Promise<T>;
  /**
   * Allowed Component in {@link RouteLocationMatched}
   */
  type RouteComponent = Component | DefineComponent;
  /**
   * Allowed Component definitions in route records provided by the user
   */
  type RawRouteComponent = RouteComponent | Lazy<RouteComponent>;

  /**
   * Holds all possible route record paths
   */
  type CustomRouteRecordPath<Name extends keyof CustomRouteMap = keyof CustomRouteMap> =
    | JoinPaths<CustomRouteMap[Name]['routePath']>
    | (string & {});

  /**
   * Holds all possible route paths
   */
  type CustomRoutePath = JoinPaths<CustomRouteMap[keyof CustomRouteMap]['path']> | (string & {});

  /** Extract all paths from a specific route name */
  type RouteNameToPath<Name extends keyof CustomRouteMap> = Join<CustomRouteMap[Name]['path']>;

  /**
   * Extract params keys by route name
   */
  type RouteParamsKeysFromName<Name extends keyof CustomRouteMap> = Name extends Name
    ? CustomRouteMap[Name]['params'] extends never
      ? never
      : keyof CustomRouteMap[Name]['params']
    : never;

  /**
   * Extract query keys by route name
   */
  type RouteQueryKeysFromName<Name extends keyof CustomRouteMap> = Name extends Name
    ? CustomRouteMap[Name]['query'] extends never
      ? never
      : keyof CustomRouteMap[Name]['query']
    : never;

  /**
   * Extract params and query keys by route name
   */
  type RouteParamsQueryKeysFromName<Name extends keyof CustomRouteMap> = Name extends Name
    ? RouteParamsKeysFromName<Name> | RouteQueryKeysFromName<Name>
    : never;

  /**
   * Extract props keys by route name
   */
  type RoutePropsKeysFromName<Name extends keyof CustomRouteMap> = Name extends Name
    ? CustomRouteMap[Name]['props'] extends never
      ? never
      : keyof CustomRouteMap[Name]['props']
    : never;

  /** Extract params by route name */
  type RouteParamsFromName<Name extends keyof CustomRouteMap> = Name extends keyof CustomRouteMap
    ? CustomRouteMap[Name]['params'] extends never
      ? RouteParamsGeneric
      : CustomRouteMap[Name]['params']
    : RouteParamsGeneric;

  /** Extract query by route name */
  type RouteQueryFromName<Name extends keyof CustomRouteMap> = Name extends keyof CustomRouteMap
    ? CustomRouteMap[Name]['query'] extends never
      ? LocationQuery
      : CustomRouteMap[Name]['query']
    : LocationQuery;

  /** Extract hash by route name */
  type RouteHashFromName<Name extends keyof CustomRouteMap> = Name extends keyof CustomRouteMap
    ? CustomRouteMap[Name]['hash'] extends never
      ? `#${string}`
      : CustomRouteMap[Name]['hash']
    : `#${string}`;

  /** Extract props keys by route name*/
  type RouteRecordPropsFromName<Name extends keyof CustomRouteMap> =
    Name extends keyof CustomRouteMap
      ? CustomRouteMap[Name]['props'] extends never
        ? Record<string, unknown>
        : CustomRouteMap[Name]['props']
      : Record<string, unknown>;

  /**
   * Extract historyState by route name
   */
  type RouteHistoryStateFromName<Name extends keyof CustomRouteMap | undefined = undefined> =
    Name extends keyof CustomRouteMap
      ? CustomRouteMap[Name]['historyState'] extends never
        ? HistoryState
        : CustomRouteMap[Name]['historyState']
      : HistoryState;

  /**
   * Holds all possible route page static title
   */
  type RouteStaticTitleFromName<Name extends keyof CustomRouteMap> =
    | NonEmpty<CustomRouteMap[Name]['staticTitle']>
    | (string & {});
  /**
   * Holds all possible route page dynamic title
   */
  type RouteDynamicTitleFromName<Name extends keyof CustomRouteMap> =
    | NonEmpty<CustomRouteMap[Name]['dynamicTitle']>
    | (string & {});

  // Customized the routes types override all (RouteRecordRaw) dependencies
  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  type _RouteRecordPropsSingleView<Name extends keyof RouteMap = keyof RouteMap> =
    | boolean
    | RouteRecordPropsFromName<Name>
    | ((to: RouteLocationNormalized<Name>) => RouteRecordPropsFromName<Name>);

  type _RouteRecordPropsMultipleViews<Name extends keyof RouteMap = keyof RouteMap> =
    | boolean
    | {
        [K in keyof CustomRouteMap[Name]['props']]:
          | boolean
          | CustomRouteMap[Name]['props'][K]
          | ((to: RouteLocationNormalized<Name>) => CustomRouteMap[Name]['props'][K]);
      };

  /**
   * Fix the conflict wirh {@link CustomRouteLocationRaw} (name) by ignore
   * the {@link Function.name} property.
   */
  type _RouteRecordRedirectOption<Name extends keyof RouteMap = keyof RouteMap> =
    | CustomRouteLocationRaw
    | (((
        to: RouteLocation<Name>,
        from: RouteLocationNormalizedLoaded,
      ) => CustomRouteLocationRaw) & { name?: never });

  interface __RouteRecordBase<Name extends keyof RouteMap = keyof RouteMap>
    extends _RouteRecordBase {
    path: CustomRouteRecordPath<Name>;
    name?: Name;
    children?: _RouteRecordRaw[];
    redirect?: _RouteRecordRedirectOption<Name>;
    props?: _RouteRecordPropsSingleView<Name> | _RouteRecordPropsMultipleViews<Name>;
    meta?: RouteMeta<Name>;
    beforeEnter?:
      | CustomNavigationGuardWithThis<undefined, Name>
      | CustomNavigationGuardWithThis<undefined, Name>[];
  }

  interface RouteRecordSingleView {
    path: CustomRouteRecordPath;
    name?: keyof RouteMap;
    beforeEnter?: CustomNavigationGuardWithThis | CustomNavigationGuardWithThis[];
  }
  interface _RouteRecordSingleView<Name extends keyof RouteMap = keyof RouteMap>
    extends __RouteRecordBase<Name> {
    /**
     * Component to display when the URL matches this route.
     */
    component: RawRouteComponent;
    components?: never;
    children?: never;
    redirect?: never;
    props?: _RouteRecordPropsSingleView<Name>;
  }

  interface RouteRecordSingleViewWithChildren {
    path: CustomRouteRecordPath;
    name?: keyof RouteMap;
    beforeEnter?: CustomNavigationGuardWithThis | CustomNavigationGuardWithThis[];
  }
  interface _RouteRecordSingleViewWithChildren<Name extends keyof RouteMap = keyof RouteMap>
    extends __RouteRecordBase<Name> {
    /**
     * Component to display when the URL matches this route.
     */
    component?: RawRouteComponent | null | undefined;
    components?: never;
    children: _RouteRecordRaw[];
    props?: _RouteRecordPropsSingleView<Name>;
  }

  interface RouteRecordMultipleViews {
    path: CustomRouteRecordPath;
    name?: keyof RouteMap;
    beforeEnter?: CustomNavigationGuardWithThis | CustomNavigationGuardWithThis[];
  }
  interface _RouteRecordMultipleViews<Name extends keyof RouteMap = keyof RouteMap>
    extends __RouteRecordBase<Name> {
    /**
     * Components to display when the URL matches this route. Allow using named views.
     */
    components: Record<RoutePropsKeysFromName<Name>, RawRouteComponent>;
    component?: never;
    children?: never;
    redirect?: never;
    /**
     * Allow passing down params as props to the component rendered by
     * `router-view`. Should be an object with the same keys as `components` or a
     * boolean to be applied to every component.
     */
    props?: _RouteRecordPropsMultipleViews<Name>;
  }

  interface RouteRecordMultipleViewsWithChildren {
    path: CustomRouteRecordPath;
    name?: keyof RouteMap;
    beforeEnter?: CustomNavigationGuardWithThis | CustomNavigationGuardWithThis[];
  }
  interface _RouteRecordMultipleViewsWithChildren<Name extends keyof RouteMap = keyof RouteMap>
    extends __RouteRecordBase<Name> {
    /**
     * Components to display when the URL matches this route. Allow using named views.
     */
    components?: Record<RoutePropsKeysFromName<Name>, RawRouteComponent> | null | undefined;
    component?: never;
    children: _RouteRecordRaw[];
    /**
     * Allow passing down params as props to the component rendered by
     * `router-view`. Should be an object with the same keys as `components` or a
     * boolean to be applied to every component.
     */
    props?: _RouteRecordPropsMultipleViews<Name>;
  }

  interface RouteRecordRedirect {
    path: CustomRouteRecordPath;
    name?: keyof RouteMap;
    beforeEnter?: CustomNavigationGuardWithThis | CustomNavigationGuardWithThis[];
  }
  interface _RouteRecordRedirect<Name extends keyof RouteMap = keyof RouteMap>
    extends __RouteRecordBase<Name> {
    redirect: _RouteRecordRedirectOption<Name>;
    component?: never;
    components?: never;
    props?: never;
  }

  type _RouteRecordRaw<Name extends keyof RouteMap = keyof RouteMap> =
    | _RouteRecordSingleView<Name>
    | _RouteRecordSingleViewWithChildren<Name>
    | _RouteRecordMultipleViews<Name>
    | _RouteRecordMultipleViewsWithChildren<Name>
    | _RouteRecordRedirect<Name>;
  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------

  // Add types to system
  // --------------------------------------------------------------
  type RouteMetaTitleTyped<Name extends keyof CustomRouteMap = keyof CustomRouteMap> = {
    /**
     * You should provide it as default value for the (document.title) if the (isDynamic) if falsy.
     */
    default: RouteStaticTitleFromName<Name>;
    /**
     * Dynamic route title or not
     * @example
     * Static  -> 'Users'
     * Dynamic -> 'User <[id]>'
     */
    isDynamic?: boolean;
    /**
     * This will hold the string pattern and will use (propsMap) to resolve the final title.
     * @example
     * for a static title  ->  `Posts Page`
     * for a dynamic title ->  `User <[userid]> - <[postid]>` => ex: 'User 1 - 7'
     * @info a title dynamic record must be in the next shape:
     * ```ts
     * <[prop]>
     * ````
     */
    pattern?: RouteDynamicTitleFromName<Name>;
    /**
     * Array of tuple that holds and will be used by the (pattern) to resolve the final title.
     * ```js
     * [propertyName, PropertyPath][]
     * ```
     * - (propertyName): is the name of the property in the title.pattern.
     * - (propertyPath): is the access chain in the {@link RouteRecord} object.
     * @example
     * ```js
     * [['userid', 'params.userid'], ['postid', 'query.postid'], ...]
     * ```
     */
    propsMap?: [RouteParamsQueryKeysFromName<Name>, string][];
  };

  interface RouteLocationAsPathTyped<
    RouteMap extends RouteMapGeneric = RouteMapGeneric,
    Name extends keyof RouteMap = keyof RouteMap,
  > {
    query?: RouteQueryFromName<Name>;
    hash?: RouteHashFromName<Name>;
    state?: RouteHistoryStateFromName<Name>;
  }

  interface RouteLocationAsRelativeTyped<
    RouteMap extends RouteMapGeneric = RouteMapGeneric,
    Name extends keyof RouteMap = keyof RouteMap,
  > {
    query?: RouteQueryFromName<Name>;
    hash?: RouteHashFromName<Name>;
    state?: RouteHistoryStateFromName<Name>;
  }

  interface RouteLocationNormalizedLoadedTyped<
    RouteMap extends RouteMapGeneric = RouteMapGeneric,
    Name extends keyof RouteMap = keyof RouteMap,
  > {
    query: RouteQueryFromName<Name>;
    hash: RouteHashFromName<Name>;
    path: RouteNameToPath<Name>;
    meta: RouteMeta<Name>;
  }

  interface RouteLocationNormalizedTyped<
    RouteMap extends RouteMapGeneric = RouteMapGeneric,
    Name extends keyof RouteMap = keyof RouteMap,
  > {
    query: RouteQueryFromName<Name>;
    hash: RouteHashFromName<Name>;
    path: RouteNameToPath<Name>;
    meta: RouteMeta<Name>;
  }

  // You don't need to declare override this interface because it depends on (RouteLocationTyped)
  interface RouteLocationResolvedTyped<
    RouteMap extends RouteMapGeneric,
    Name extends keyof RouteMap,
  > {
    path: RouteNameToPath<Name>;
    query: RouteQueryFromName<Name>;
    hash: RouteHashFromName<Name>;
    meta: RouteMeta<Name>;
    state?: RouteHistoryStateFromName<Name>;
  }

  interface RouteLocationTyped<RouteMap extends RouteMapGeneric, Name extends keyof RouteMap> {
    path: RouteNameToPath<Name>;
    query: RouteQueryFromName<Name>;
    hash: RouteHashFromName<Name>;
    meta: RouteMeta<Name>;
    state?: RouteHistoryStateFromName<Name>;
  }
  // --------------------------------------------------------------

  /** FIX THE {@link _LiteralUnion} TYPE ISSUE */
  // ====================================================================================
  // ===================================== START ========================================
  // ====================================================================================

  /**
   * A Cutomized version from {@link RouteLocationRaw} to fix the apperance of the String object
   * methods and properties in the {@link RouteLocationRaw} caused by {@link _LiteralUnion} type.
   */
  type CustomRouteLocationRaw<Name extends keyof RouteMap = keyof RouteMap> =
    RouteMapGeneric extends RouteMap
      ? RouteLocationAsString | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
      :
          | RouteNameToPath<Name>
          | RouteLocationAsRelativeTypedList<RouteMap>[Name]
          | RouteLocationAsPathTypedList<RouteMap>[Name];

  /** A custom {@link NavigationGuardNext} */
  interface CustomNavigationGuardNext<Name extends keyof RouteMap = keyof RouteMap> {
    (): void;
    (error: Error): void;
    (location: CustomRouteLocationRaw<Name>): void;
    (valid: boolean | undefined): void;
    (cb: NavigationGuardNextCallback): void;
  }

  /** A custom {@link NavigationGuardReturn} */
  type CustomNavigationGuardReturn<Name extends keyof RouteMap = keyof RouteMap> =
    | void
    | (Error & { name: never }) // fix the conflict with (Error.name) and (CustomRouteLocationRaw.name)
    | boolean
    | CustomRouteLocationRaw<Name>;

  /** A custom {@link NavigationGuard} */
  interface CustomNavigationGuard<Name extends keyof RouteMap = keyof RouteMap> {
    (
      to: RouteLocationNormalized<Name>,
      from: RouteLocationNormalizedLoaded,
      next: CustomNavigationGuardNext,
    ): _Awaitable<CustomNavigationGuardReturn>;
  }

  interface CustomNavigationHookAfter<Name extends keyof RouteMap = keyof RouteMap> {
    (
      to: RouteLocationNormalized<Name>,
      from: RouteLocationNormalizedLoaded,
      failure?: NavigationFailure | void,
    ): unknown;
  }

  /**
   *  A custom {@link NavigationGuardWithThis}
   * */
  interface CustomNavigationGuardWithThis<
    T = undefined,
    Name extends keyof RouteMap = keyof RouteMap,
  > {
    (
      this: T,
      to: RouteLocationNormalized<Name>,
      from: RouteLocationNormalizedLoaded,
      next: CustomNavigationGuardNext,
    ): _Awaitable<CustomNavigationGuardReturn>;
  }

  /** A custom {@link UseLinkOptions} */
  interface CustomUseLinkOptions<Name extends keyof RouteMap = keyof RouteMap> {
    to: MaybeRef<
      | RouteNameToPath<Name>
      | RouteLocationAsRelativeTyped<RouteMap, Name>
      | RouteLocationAsPath<Name>
      | CustomRouteLocationRaw<Name>
    >;
    replace?: MaybeRef<boolean | undefined>;
    viewTransition?: boolean;
  }
  //====================================================================================
  //===================================== END ==========================================
  //====================================================================================

  interface _ErrorListener<Name extends keyof RouteMap = keyof RouteMap> {
    (error: Error, to: RouteLocationNormalized<Name>, from: RouteLocationNormalizedLoaded): unknown;
  }

  function loadRouteLocation<Name extends keyof RouteMap = keyof RouteMap>(
    route: RouteLocation<Name> | RouteLocationNormalized<Name>,
  ): Promise<RouteLocationNormalizedLoaded<Name>>;

  function useLink<Name extends keyof RouteMap = keyof RouteMap>(
    props: CustomUseLinkOptions<Name>,
  ): UseLinkReturn<Name>;

  function onBeforeRouteLeave<Name extends keyof RouteMap = keyof RouteMap>(
    leaveGuard: CustomNavigationGuard<Name>,
  ): void;

  function onBeforeRouteUpdate<Name extends keyof RouteMap = keyof RouteMap>(
    updateGuard: CustomNavigationGuard<Name>,
  ): void;

  // Extend Router types
  interface Router {
    push<Name extends keyof RouteMap = keyof RouteMap>(
      to: CustomRouteLocationRaw<Name>,
    ): Promise<NavigationFailure | void | undefined>;

    replace<Name extends keyof RouteMap = keyof RouteMap>(
      to: CustomRouteLocationRaw<Name>,
    ): Promise<NavigationFailure | void | undefined>;

    removeRoute(name: NonNullable<keyof RouteMap>): void;

    hasRoute(name: NonNullable<keyof RouteMap>): boolean;

    beforeEach<Name extends keyof RouteMap = keyof RouteMap>(
      guard: CustomNavigationGuardWithThis<undefined, Name>,
    ): () => void;

    beforeResolve<Name extends keyof RouteMap = keyof RouteMap>(
      guard: CustomNavigationGuardWithThis<undefined, Name>,
    ): () => void;

    afterEach<Name extends keyof RouteMap = keyof RouteMap>(
      guard: CustomNavigationHookAfter<Name>,
    ): () => void;

    onError<Name extends keyof RouteMap = keyof RouteMap>(
      handler: _ErrorListener<Name>,
    ): () => void;
  }

  /**
   * Extend the type of the (to) property and use {@link CustomRouteLocationRaw} intead of {@link RouteLocationRaw}
   * to fix the {@link _LiteralUnion} types issue.
   */
  interface RouterLinkProps {
    to: CustomRouteLocationRaw;
  }

  interface RouteRecordInfo<
    Name extends string | symbol = string,
    Path extends string = string,
    ParamsRaw extends RouteParamsRawGeneric = RouteParamsRawGeneric,
    Params extends RouteParamsGeneric = RouteParamsGeneric,
    ChildrenNames extends string | symbol = never,
  > {
    name: Name;
    path: Path;
    paramsRaw: ParamsRaw;
    childrenNames: ChildrenNames;
    params: Params;
    query: RouteQueryFromName<Name>;
    props: RouteRecordPropsFromName<Name>;
    historyState: RouteHistoryStateFromName<Name>;
    hash: RouteHashFromName<Name>;
  }

  // Route Named Map
  type RouteNamedMap = {
    [Name in keyof CustomRouteMap]: RouteRecordInfo<
      Name,
      RouteNameToPath<Name>,
      RouteParamsFromName<Name>,
      RouteParamsFromName<Name>,
      CustomRouteMap[Name]['childrenNames']
    >;
  };

  // Customize internal types
  interface TypesConfig {
    RouteNamedMap: RouteNamedMap;
    /** Fix the {@link _LiteralUnion} issue */
    beforeRouteEnter: CustomNavigationGuardWithThis;
    beforeRouteUpdate: CustomNavigationGuard;
    beforeRouteLeave: CustomNavigationGuard;
    // ------------------------------------
    RouterView: typeof RouterView &
      DefineComponent<{
        name?: RoutePropsKeysFromName<keyof RouteMap>;
      }>;
  }

  // Custom route meta
  interface RouteMeta<Name extends keyof RouteMap = keyof RouteMap> {
    /**
     * Useed to check if this route can be used as a navigation link in the main nav bar
     */
    isNav?: boolean;
    /**
     * The route title (document.title) value.
     */
    title: RouteMetaTitleTyped<Name>;
  }
}

export {};
