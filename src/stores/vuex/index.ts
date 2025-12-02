import { createStore } from 'vuex';
import { rand } from '@/assets/tools/helpers';
import moduleA, { type ModuleA } from '@/stores/vuex/modules/moduleA';
import moduleB, { type ModuleB } from '@/stores/vuex/modules/moduleB';

// const plugins = import.meta.env.DEV ? [loggerPlugin] : [];

export const vuexStore = createStore({
  strict: true,
  devtools: true,
  // plugins,

  state: () => ({
    fname: 'Mahmoud',
    lname: 'Gad',
    age: 28,
    count: 0,
  }),

  getters: {
    fullName(state) {
      return `${state.fname} ${state.lname}`;
    },
    allInfo(state) {
      return `${state.fname} - (${state.age})`;
    },
    doubleCount(state) {
      return state.count * 2;
    },
  },

  actions: {
    updateName(ctx, name) {
      console.log('updateName', '✅');
      ctx.commit('UPDATE_NAME', name);
      return true;
    },
    updateAge(ctx, age) {
      console.log('updateAge', '✅');
      ctx.commit('UPDATE_AGE', age);

      return age && age.value < 25 ? 'yes' : 'no';
    },
    increment(ctx) {
      ctx.commit('INCREMENT');
    },
  },

  mutations: {
    UPDATE_AGE(state, newAge) {
      state.age = newAge?.value ?? rand({ min: 20, max: 30 });
    },
    UPDATE_NAME(state, name) {
      state.fname = name?.fname ?? 'Ali';
      state.lname = name?.lname ?? 'Gad';
    },
    INCREMENT: (state) => ++state.count * 2,
  },

  modules: { moduleA, moduleB },
});

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

/* if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.accept(['./modules/moduleA.ts', './modules/moduleB.ts'], async () => {
    vuexStore.hotUpdate({
      modules: {
        moduleA: (await import('./modules/moduleA')).default,
        moduleB: (await import('./modules/moduleB')).default,
      },
    });
  });
}
*/
