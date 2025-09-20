import { lazyFetch, type LazyFetchOptions } from '@/assets/tools/helpers';
import { ref, watchEffect, toValue, type ComputedRef } from 'vue';

type Options = Omit<LazyFetchOptions, 'url'>;

export const useFetch = <T>(url: string | ComputedRef<string>, options?: Options) => {
 const data = ref<T | null>(null);
 const error = ref<Error | null>(null);
 const loading = ref<boolean>(true);

 watchEffect(async () => {
  // reset
  loading.value = true;
  data.value = null;
  error.value = null;

  const {
   data: result,
   err,
   ok,
  } = await lazyFetch<T>({
   url: toValue(url),
   ...options,
  });

  if (ok) {
   data.value = result;
  } else {
   error.value = err;
  }
  loading.value = false;
 });

 return { data, error, loading };
};
