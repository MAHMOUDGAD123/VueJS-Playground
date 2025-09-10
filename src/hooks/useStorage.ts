import { _Storage } from '@/assets/tools/storage';
import { ref, shallowRef, watch } from 'vue';

type StoreType = 'localStorage' | 'sessionStorage';
type OptionsType = {
  shallowRef?: boolean;
};

export const useStorage = <T>({
  storeKey,
  storeType,
  initialValue,
  options,
}: {
  storeKey: string;
  storeType: StoreType;
  initialValue: T;
  options?: OptionsType;
}) => {
  const stored = _Storage.read<T>(storeKey, storeType) ?? initialValue;
  const state = options?.shallowRef ? shallowRef(stored) : ref(stored);

  watch(
    state,
    (newVal) => {
      if (newVal !== null) {
        _Storage.save(storeKey, newVal, storeType);
      }
    },
    { deep: true },
  );

  return state;
};
