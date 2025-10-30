import type { MaybeRef } from 'vue';
import 'vue-router';

declare module 'vue-router' {
  /**
   * Holds all possible route record paths
   */
  type CustomRouteRecordPath =
    | JoinPaths<CustomRouteMap[keyof CustomRouteMap]['routePath']>
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
  type RouteParamsKeysFromName<Name extends keyof RouteMap> = Name extends Name
    ? RouteMap[Name]['params'] extends never
      ? never
      : keyof RouteMap[Name]['params']
    : never;

  /**
   * Extract query keys by route name
   */
  type RouteQueryKeysFromName<Name extends keyof RouteMap> = Name extends Name
    ? RouteMap[Name]['query'] extends never
      ? never
      : keyof RouteMap[Name]['query']
    : never;

  /**
   * Extract params and query keys by route name
   */
  type RouteParamsQueryKeysFromName<Name extends keyof CustomRouteMap> = Name extends Name
    ? RouteParamsKeysFromName<Name> | RouteQueryKeysFromName<Name>
    : never;

  /** Extract params by route name */
  type RouteParamsFromName<Name extends keyof CustomRouteMap> = CustomRouteMap[Name]['params'];
  /** Extract query by route name */
  type RouteQueryFromName<Name extends keyof CustomRouteMap> = CustomRouteMap[Name]['query'];
  /** Extract hash by route name */
  type RouteHashFromName<Name extends keyof CustomRouteMap> = CustomRouteMap[Name]['hash'];

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

  // Hack the routes types override all (RouteRecordRaw) dependencies
  // --------------------------------------------------------------
  interface RouteRecordSingleView {
    path: CustomRouteRecordPath;
    name?: keyof CustomRouteMap;
  }
  interface RouteRecordSingleViewWithChildren {
    path: CustomRouteRecordPath;
    name?: keyof CustomRouteMap;
  }
  interface RouteRecordMultipleViews {
    path: CustomRouteRecordPath;
    name?: keyof CustomRouteMap;
  }
  interface RouteRecordMultipleViewsWithChildren {
    path: CustomRouteRecordPath;
    name?: keyof CustomRouteMap;
  }
  interface RouteRecordRedirect {
    path: CustomRouteRecordPath;
    name?: keyof CustomRouteMap;
  }
  // --------------------------------------------------------------

  // Add typed query & title in the system
  // --------------------------------------------------------------
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
    params: Params;
    childrenNames: ChildrenNames;
    query: RouteQueryFromName<Name>;
    hash: RouteHashFromName<Name>;
  }

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
  }

  interface RouteLocationAsRelativeTyped<
    RouteMap extends RouteMapGeneric = RouteMapGeneric,
    Name extends keyof RouteMap = keyof RouteMap,
  > {
    query?: RouteQueryFromName<Name>;
    hash?: RouteHashFromName<Name>;
  }

  interface RouteLocationNormalizedLoadedTyped<
    RouteMap extends RouteMapGeneric = RouteMapGeneric,
    Name extends keyof RouteMap = keyof RouteMap,
  > {
    query?: RouteQueryFromName<Name>;
    hash?: RouteHashFromName<Name>;
    meta?: RouteMeta<Name>;
  }

  interface RouteLocationNormalizedTyped<
    RouteMap extends RouteMapGeneric = RouteMapGeneric,
    Name extends keyof RouteMap = keyof RouteMap,
  > {
    query?: RouteQueryFromName<Name>;
    hash?: RouteHashFromName<Name>;
    meta?: RouteMeta<Name>;
  }

  interface RouteLocationResolvedTyped<
    RouteMap extends RouteMapGeneric,
    Name extends keyof RouteMap,
  > {
    query?: RouteQueryFromName<Name>;
    hash?: RouteHashFromName<Name>;
    meta?: RouteMeta<Name>;
  }

  interface RouteLocationTyped<RouteMap extends RouteMapGeneric, Name extends keyof RouteMap> {
    query?: RouteQueryFromName<Name>;
    hash?: RouteHashFromName<Name>;
    meta?: RouteMeta<Name>;
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
  export declare type CustomRouteLocationRaw<Name extends keyof RouteMap = keyof RouteMap> =
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
    | Error
    | boolean
    | CustomRouteLocationRaw<Name>;

  /** A custom {@link NavigationGuard} */
  interface CustomNavigationGuard<Name extends keyof RouteMap = keyof RouteMap> {
    (
      to: RouteLocationNormalized<Name>,
      from: RouteLocationNormalizedLoaded<Name>,
      next: CustomNavigationGuardNext<Name>,
    ): _Awaitable<CustomNavigationGuardReturn<Name>>;
  }

  /** A custom {@link NavigationGuardWithThis} */
  interface CustomNavigationGuardWithThis<
    T = undefined,
    Name extends keyof RouteMap = keyof RouteMap,
  > {
    (
      this: T,
      to: RouteLocationNormalized<Name>,
      from: RouteLocationNormalizedLoaded<Name>,
      next: CustomNavigationGuardNext<Name>,
    ): _Awaitable<CustomNavigationGuardReturn<Name>>;
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
  }

  /**
   * Extend the type of the (to) property and use {@link CustomRouteLocationRaw} intead of {@link RouteLocationRaw}
   * to fix the {@link _LiteralUnion} types issue.
   */
  interface RouterLinkProps {
    to: CustomRouteLocationRaw;
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
