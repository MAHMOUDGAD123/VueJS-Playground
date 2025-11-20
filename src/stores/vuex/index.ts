import { rand } from '@/assets/tools/helpers';
import { createStore } from 'vuex';
import moduleA from '@/stores/vuex/modules/moduleA';
import moduleB from '@/stores/vuex/modules/moduleB';
import { loggerPlugin } from './plugins/logger';

const plugins = import.meta.env.DEV ? [loggerPlugin] : [];

export const vuexStore = createStore({
  strict: true,

  state: () => ({
    fname: 'Mahmoud',
    lname: 'Gad',
    age: 28,
  }),

  getters: {
    fullName(state) {
      return `${state.fname} ${state.lname}`;
    },
    allInfo(state, getters) {
      return `${getters.fullName} - (${state.age})`;
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
  },

  mutations: {
    UPDATE_AGE(state, newAge) {
      state.age = newAge?.value ?? rand({ min: 20, max: 30 });
    },
    UPDATE_NAME(state, name) {
      state.fname = name?.fname ?? 'Ali';
      state.lname = name?.lname ?? 'Gad';
    },
  },

  modules: { moduleA, moduleB },

  plugins,
});
