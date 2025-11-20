import type { _Module, StoreActionRecord } from 'vuex';

type ModuleBBB = _Module<
  'moduleBBB',
  'isolated',
  { bbb: string },
  { getterBBB: string },
  { actionBBB: StoreActionRecord<{ valBBB: string }, string> },
  { MUTATION_BBB: { valBBB: string } }
>;

const moduleBBB: ModuleBBB = {
  namespaced: true,
  state: {
    bbb: 'Module BBB',
  },
  getters: {
    getterBBB(state) {
      return state.bbb.replace('Module', 'Getter') + ' ✅';
    },
  },
  actions: {
    async actionBBB(ctx, payload) {
      console.log('actionBBB', '✅');
      return payload?.valBBB ?? 'BBB';
    },
  },
  mutations: {
    MUTATION_BBB(state, payload) {
      if (payload?.valBBB) state.bbb = payload.valBBB;
      console.log(state.bbb.replace('Module', 'Mutation'), '✅');
    },
  },
};

type ModuleBB = _Module<
  'moduleBB',
  'isolated',
  { bb: string },
  { getterBB: string },
  { actionBB: StoreActionRecord<{ valBB: string }, string> },
  { MUTATION_BB: { valBB: string } },
  { moduleBBB: ModuleBBB }
>;

const moduleBB: ModuleBB = {
  namespaced: true,
  state: {
    bb: 'Module BB',
  },
  getters: {
    getterBB(state) {
      return state.bb.replace('Module', 'Getter') + ' ✅';
    },
  },
  actions: {
    async actionBB(ctx, payload) {
      console.log('actionBB', '✅');
      return payload?.valBB ?? 'BB';
    },
  },
  mutations: {
    MUTATION_BB(state, payload) {
      if (payload?.valBB) state.bb = payload.valBB;
      console.log(state.bb.replace('Module', 'Mutation'), '✅');
    },
  },
  modules: { moduleBBB: moduleBBB },
};

export type ModuleB = _Module<
  'moduleB',
  'isolated',
  { b: string },
  { getterB: string },
  { actionB: StoreActionRecord<{ valB: string }, string> },
  { MUTATION_B: { valB: string } },
  { moduleBB: ModuleBB }
>;

const moduleB: ModuleB = {
  namespaced: true,
  state: {
    b: 'Module B',
  },
  getters: {
    getterB(state) {
      return state.b.replace('Module', 'Getter') + ' ✅';
    },
  },
  actions: {
    async actionB(ctx, payload) {
      console.log('actionB', '✅');
      return payload?.valB ?? 'B';
    },
  },
  mutations: {
    MUTATION_B(state, payload) {
      if (payload?.valB) state.b = payload.valB;
      console.log(state.b.replace('Module', 'Mutation'), '✅');
    },
  },
  modules: { moduleBB },
};

export default moduleB;
