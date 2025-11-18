import { rand } from '@/assets/tools/helpers';
import { createStore } from 'vuex';
import moduleA from './modules/moduleA';
import moduleB from './modules/moduleB';

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
      // console.log('updateName:', ' ✅');
      ctx.commit('UPDATE_NAME', name);
      return true;
    },
    updateAge(ctx, age) {
      console.log('updateAge', '✅');
      ctx.commit('UPDATE_AGE', age);
      return 'yes';
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

  // plugins: [testPlugin],
});
