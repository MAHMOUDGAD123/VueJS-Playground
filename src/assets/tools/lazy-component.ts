import AppError from '@/components/_global/AppError.vue';
import AppLoader from '@/components/_global/AppLoader.vue';
import { defineAsyncComponent, type AsyncComponentLoader, type AsyncComponentOptions } from 'vue';

export const lazyComponent = (
 source: AsyncComponentLoader | AsyncComponentOptions,
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
