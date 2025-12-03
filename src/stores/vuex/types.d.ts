import type { ModuleA } from '@/stores/vuex/modules/moduleA';
import type { ModuleB } from '@/stores/vuex/modules/moduleB';

declare module 'strict-vuex' {
  interface VuexStoreRootState {
    fname: string;
    lname: string;
    age: number;
    count: number;
  }

  interface VuexStoreRootGetters {
    fullName: string;
    allInfo: string;
    doubleCount: number;
  }

  interface VuexStoreRootActions {
    updateName: StoreActionRecord<{ fname: string; lname: string }, boolean>;
    updateAge: StoreActionRecord<{ value: number }, 'yes' | 'no'>;
    increment: StoreActionRecord<null, void>;
  }

  interface VuexStoreRootMutations {
    UPDATE_NAME: {
      fname: string;
      lname: string;
    };
    UPDATE_AGE: {
      value: number;
    };
    INCREMENT: null;
  }

  interface VuexStoreRootModules {
    moduleA: ModuleA;
    moduleB: ModuleB;
  }
}
