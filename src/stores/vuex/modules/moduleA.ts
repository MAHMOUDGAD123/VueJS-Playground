import type { _Module, StoreActionRecord } from 'strict-vuex';
import type { OptionalModule } from '@/stores/vuex/optional/optionalModule';

type ModuleAAA2 = _Module<
  'moduleAAA2',
  'isolated',
  { aaa2: string },
  { getterAAA2: string },
  { actionAAA2: StoreActionRecord<{ valAAA2: string }, string> },
  { MUTATION_AAA2: { valAAA2: string } },
  { optionalModuleAAA?: OptionalModule }
>;

const moduleAAA2: ModuleAAA2 = {
  namespaced: true,
  state: () => ({
    aaa2: 'Module AAA2',
  }),
  getters: {
    getterAAA2(state) {
      return state.aaa2.replace('Module', 'Getter');
    },
  },
  actions: {
    actionAAA2(ctx, payload) {
      console.log('actionAAA2', ' ✅');
      return payload?.valAAA2 ?? 'AAA2';
    },
  },
  mutations: {
    MUTATION_AAA2(state, payload) {
      if (payload?.valAAA2) state.aaa2 = payload.valAAA2;
      console.log(state.aaa2.replace('Module', 'Mutation'), '✅');
    },
  },
};

type ModuleAAA1 = _Module<
  'moduleAAA1',
  'isolated',
  { aaa1: string },
  { getterAAA1: string },
  { actionAAA1: StoreActionRecord<{ valAAA1: string }, string, true> },
  { MUTATION_AAA1: { valAAA1: string } }
>;

const moduleAAA1: ModuleAAA1 = {
  namespaced: true,
  state: () => ({
    aaa1: 'Module AAA1',
  }),
  getters: {
    getterAAA1(state) {
      return state.aaa1.replace('Module', 'Getter');
    },
  },
  actions: {
    actionAAA1: {
      root: true,
      handler: (ctx, payload) => {
        console.log('actionAAA1', ' ✅');
        return payload?.valAAA1 ?? 'AAA1';
      },
    },
  },
  mutations: {
    MUTATION_AAA1(state, payload) {
      if (payload?.valAAA1) state.aaa1 = payload.valAAA1;
      console.log(state.aaa1.replace('Module', 'Mutation'), '✅');
    },
  },
};

type ModuleAA = _Module<
  'moduleAA',
  'isolated',
  { aa: string },
  { getterAA: string },
  { actionAA: StoreActionRecord<{ valAA: string }, string> },
  { MUTATION_AA: { valAA: string } },
  { moduleAAA1: ModuleAAA1; moduleAAA2: ModuleAAA2 }
>;

const moduleAA: ModuleAA = {
  namespaced: true,
  state: () => ({
    aa: 'Module AA',
  }),
  getters: {
    getterAA(state) {
      return state.aa.replace('Module', 'Getter');
    },
  },
  actions: {
    actionAA(ctx, payload) {
      console.log('actionAA', ' ✅');
      return payload?.valAA ?? 'AA';
    },
  },
  mutations: {
    MUTATION_AA(state, payload) {
      if (payload?.valAA) state.aa = payload.valAA;
      console.log(state.aa.replace('Module', 'Mutation'), '✅');
    },
  },
  modules: { moduleAAA1, moduleAAA2 },
};

export type ModuleA = _Module<
  'moduleA',
  'isolated',
  { a: string },
  { getterA: string },
  { actionA: StoreActionRecord<{ valA: string }, string> },
  { MUTATION_A: { valA: string } },
  { moduleAA: ModuleAA; optionalModule?: OptionalModule }
>;

const moduleA: ModuleA = {
  namespaced: true,
  state: () => ({
    a: 'Module A',
  }),
  getters: {
    getterA(state) {
      return state.a.replace('Module', 'Getter');
    },
  },
  actions: {
    actionA: {
      root: false,
      handler: async (ctx, payload) => {
        console.log('actionA', '✅');
        return payload?.valA ?? 'A';
      },
    },
  },
  mutations: {
    MUTATION_A(state, payload) {
      if (payload?.valA) state.a = payload.valA;
      console.log(state.a.replace('Module', 'Mutation'), '✅');
    },
  },
  modules: { moduleAA },
};

export default moduleA;
