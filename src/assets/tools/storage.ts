import { Logger } from '@/tools/logger';

type StoreType = 'localStorage' | 'sessionStorage';

export class _Storage {
  static save<T>(key: string, data: T, store: StoreType) {
    window[store].setItem(key, JSON.stringify(data));
  }

  static read<T>(key: string, store: StoreType): T | null {
    const storedValue = window[store].getItem(key);
    try {
      if (storedValue) {
        return JSON.parse(storedValue) as T;
      }
      return null;
    } catch (e) {
      _Storage.delete(key, store); // Prevent reuse of malformed data
      const logger = new Logger('_Storage');
      const err = e as Error;
      logger.error(err.message);
      if (err.stack) {
        console.error(err.stack);
      }
      logger.warn(`Malformed data with key of (${key}) has removed from (${store}).`);
      logger.line();
      return null;
    }
  }

  static delete(key: string, store: StoreType) {
    window[store].removeItem(key);
  }

  static clear(store: StoreType) {
    window[store].clear();
  }
}
