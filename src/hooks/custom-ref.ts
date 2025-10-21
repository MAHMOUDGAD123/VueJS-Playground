import { Logger } from '@/tools/logger';
import { customRef } from 'vue';

/**
 * A custom debounced ref
 * @param val The target value
 * @param delay A delay in ms @default 300
 */
export const useDebouncedRef = <T>(val: T, delay: number = 300) => {
  let timeout: number = NaN;

  return customRef<T>((track, trigger) => ({
    get() {
      track();
      return val;
    },
    set(newVal: T) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        val = newVal;
        trigger();
      }, delay);
    },
  }));
};

/**
 * A custom throttled ref
 * @param val The target value
 * @param delay A delay in ms @default 300
 */
export const useThrottledRef = <T>(val: T, interval: number = 300) => {
  let lastTrigger: number = NaN;

  return customRef<T>((track, trigger) => ({
    get() {
      track();
      return val;
    },
    set(newVal: T) {
      const now = Date.now();
      if (now - lastTrigger >= interval) {
        val = newVal;
        trigger();
        lastTrigger = now;
      }
    },
  }));
};

export const useConditionalRef = <T>(val: T, condition: () => boolean) =>
  customRef<T>((track, trigger) => ({
    get() {
      if (condition()) track();
      return val;
    },
    set(newVal: T) {
      if (condition()) trigger();
      val = newVal;
    },
  }));

export const useImmutableRef = <T>(val: T) =>
  customRef<T>((track) => ({
    get() {
      track();
      return val;
    },
    set() {
      throw new Error("This ref is immutable (readonly) you can't change it.");
    },
  }));

export const useAPISyncedRef = <T>(
  initialValue: T,
  apiSyncCallback: (val: T) => Promise<void>,
  delay = 500,
) => {
  let value = initialValue;
  let timeout: number;

  if (typeof initialValue === 'object') {
    new Logger('warn').warn(`useApiSyncRef doesn't supports deep reactivity.`);
  }

  return customRef<T>((track, trigger) => ({
    get() {
      track(); // Track reads
      return value;
    },
    set(newValue: T) {
      value = newValue;
      trigger(); // Update locally so UI reacts immediately

      // Debounce API call
      clearTimeout(timeout);
      timeout = window.setTimeout(async () => {
        try {
          await apiSyncCallback(newValue);
          new Logger('Sync').success('Value successfully synced with server.');
        } catch (e) {
          const err = e as Error;
          const logger = new Logger('Sync');
          logger.error('Failed to sync with API.');
          if (err.stack) {
            console.log(err.stack);
          }
        }
      }, delay);
    },
  }));
};
