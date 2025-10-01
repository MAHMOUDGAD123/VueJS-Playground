export type LazyFetchOptions = {
  /**
   * Enable the fake delay
   * @default false
   * @info You can use it to generate a random delay in range
   */
  fakeDelay?:
    | boolean
    | {
        /**
         * @default 100
         */
        from: number;
        /**
         * @default 500
         */
        to: number;
      };
  /**
   * If true the fetch will be cached (cached by default)
   * @default true
   */
  cacheable?: boolean;
  /**
   * Cache timeout in ms
   * @default 60_000
   */
  cacheTimeout?: number;
  /**
   * fetch API options
   */
  fetchOptions?: RequestInit;
  /**
   * Use it to log fetching & caching info
   */
  logInfo?: boolean;
};

type ReturnType<T> = Promise<{ data: T | null; err: Error | null; ok: boolean }>;
type CacheInfo = { data: unknown; timeout: number };

export const fetchIt = <T>(
  url: string | URL | Request,
  fetchOptions?: RequestInit,
): ReturnType<T> => {
  return new Promise((resolve) => {
    fetch(url, fetchOptions)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Faild to fetch ${url}`);
        }
        resolve({
          data: await response.json(),
          err: null,
          ok: true,
        });
      })
      .catch(async (reason) => {
        resolve({ data: null, err: reason as Error, ok: false });
      });
  });
};

export const lazyFetch = (() => {
  const lazyCache = new Map<string, CacheInfo>();

  return async <T>(
    url: string | URL | Request | (() => string | URL | Request),
    lazyOptions?: LazyFetchOptions,
    fetchOptions?: RequestInit,
  ): ReturnType<T> => {
    const _url = typeof url === 'function' ? url() : url;

    // Config
    const { cacheable, cacheTimeout, fakeDelay, logInfo } = {
      cacheable: lazyOptions?.cacheable ?? true,
      cacheTimeout: lazyOptions?.cacheTimeout ?? 60_000,
      fakeDelay: lazyOptions?.fakeDelay ?? false,
      logInfo: lazyOptions?.logInfo ?? false,
    } as LazyFetchOptions;

    // fake delay
    const delay = async () => {
      if (fakeDelay) {
        const delayValue =
          typeof fakeDelay === 'boolean'
            ? Math.random() * 500 + 100
            : Math.random() * fakeDelay.to + fakeDelay.from;
        await new Promise((r) => setTimeout(r, delayValue));
      }
    };

    if (!cacheable) {
      await delay();
      if (logInfo) console.log('Fetched');
      return await fetchIt<T>(_url, fetchOptions);
    }

    // Extract the string url to use ot as a cache key
    const cacheKey: string =
      typeof _url === 'string' ? _url : _url instanceof URL ? _url.href : _url.url;

    if (cacheable) {
      // get the cached data
      const cacheInfo = lazyCache.get(cacheKey);
      if (cacheInfo) {
        const cachedValue = cacheInfo.data;
        const isAlive = Date.now() < cacheInfo.timeout;
        if (cachedValue && isAlive) {
          if (logInfo) console.log('Served from cache');
          return {
            data: cachedValue as T,
            err: null,
            ok: true,
          };
        }
      }
    }

    await delay();
    const fetchResult = await fetchIt<T>(_url, fetchOptions);
    if (logInfo) console.log('Fetched');

    if (fetchResult.ok && cacheable) {
      // save to cache
      lazyCache.set(cacheKey, {
        data: fetchResult.data,
        timeout: Date.now() + cacheTimeout!,
      });
      if (logInfo) console.log('Save to cache');
    }

    return fetchResult;
  };
})();
