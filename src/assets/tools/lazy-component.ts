import AppError from '@/components/_global/AppError.vue';
import AppLoader from '@/components/_global/AppLoader.vue';
import { defineAsyncComponent, type AsyncComponentLoader, type AsyncComponentOptions } from 'vue';

export const lazyComponent = (
  /**
   * Can be a {@link AsyncComponentLoader} or a {@link AsyncComponentOptions}.
   */
  source: AsyncComponentLoader | AsyncComponentOptions,
  /**
   * When you provide the {@link source} as a callback ({@link AsyncComponentLoader})
   * - `true` -> this will show the a loader component while loading the component and show Error compoent if the load fail.
   * - `false` -> no loader or error components will be used.
   * @default true
   */
  async: boolean = true,
) => {
  return typeof source === 'function'
    ? async
      ? defineAsyncComponent({
          loader: source,
          errorComponent: AppError,
          loadingComponent: AppLoader,
        })
      : source
    : defineAsyncComponent({
        loader: source.loader,
        delay: source.delay ?? 0,
        errorComponent: source.errorComponent ?? AppError,
        hydrate: source.hydrate,
        loadingComponent: source.loadingComponent ?? AppLoader,
        onError: source.onError,
        suspensible: source.suspensible,
        timeout: source.timeout,
      });
};
