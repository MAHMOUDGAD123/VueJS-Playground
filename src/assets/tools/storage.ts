type StoreType = 'localStorage' | 'sessionStorage';

export class _Storage {
  static save<T>(key: string, data: T, store: StoreType) {
    window[store].setItem(key, JSON.stringify(data));
  }

  static read<T>(key: string, store: StoreType): T | null {
    const storedValue = window[store].getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue) as T;
    }
    return null;
  }

  static delete(key: string, store: StoreType) {
    window[store].removeItem(key);
  }
}
