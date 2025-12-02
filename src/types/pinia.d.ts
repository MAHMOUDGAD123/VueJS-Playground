import type { EffectScope } from 'vue';

declare module 'pinia' {
  interface Pinia {
    _a: App;
    _e: EffectScope;
    _p: Pinia;
    _s: Map<string, StoreGeneric>;
  }

  // eslint-disable-next-line
  export interface PiniaCustomStateProperties<S> {
    realName?: string;
  }

  // eslint-disable-next-line
  interface PiniaCustomProperties<Id, S, G, A> {
    secret: string;
    // $reset: () => void;
  }

  // eslint-disable-next-line
  interface DefineStoreOptionsBase<S, Store> {
    customOption?: boolean;
  }

  interface MapStoresCustomization {
    suffix: 'Store';
  }
}
export {};
