import { _Storage } from '@/assets/tools/storage';
import { computed, ref, shallowRef, type ComputedRef } from 'vue';

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
}): [ComputedRef<T>, (newValue: T) => void] => {
  const value = _Storage.read<T>(storeKey, storeType) ?? initialValue;
  const state = options?.shallowRef ? shallowRef(value) : ref(value);

  const save = (newValue: T) => {
    state.value = newValue;
    _Storage.save<T>(storeKey, newValue, storeType);
  };

  return [computed(() => state.value), save];
};
