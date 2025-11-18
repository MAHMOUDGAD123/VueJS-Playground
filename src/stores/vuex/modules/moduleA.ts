import type { _Module, StoreActionRecord } from 'vuex';
import type { OptionalModule } from '@/stores/vuex/optional/optionalModule';

type ModuleAAA2 = _Module<
  'moduleAAA2',
  'isolated',
  { aaa2: string },
  { getterAAA2: string },
  { actionAAA2: StoreActionRecord<{ valAAA2: string }, string> },
  { MUTATION_AAA2: { valAAA2: string } },
  { optionalModuleAAA: OptionalModule }
>;

const moduleAAA2: ModuleAAA2 = {
  namespaced: true,
  state: {
    aaa2: 'Module AAA2',
  },
  getters: {
    getterAAA2(state) {
      return state.aaa2.replace('Module', 'Getter');
    },
  },
  actions: {
    actionAAA2(ctx, payload) {
      console.log('actionAAA2:', payload ?? ' ✅');
      return payload?.valAAA2 ?? 'AAA2';
    },
  },
  mutations: {
    MUTATION_AAA2(state, payload) {
      console.log(state.aaa2.replace('Module', 'Mutaion') + (payload?.valAAA2 ?? ' ✅'));
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
  state: {
    aaa1: 'Module AAA1',
  },
  getters: {
    getterAAA1(state) {
      return state.aaa1.replace('Module', 'Getter');
    },
  },
  actions: {
    actionAAA1: {
      root: true,
      handler: (ctx, payload) => {
        console.log('actionAAA1:', payload ?? ' ✅');
        return payload?.valAAA1 ?? 'AAA1';
      },
    },
  },
  mutations: {
    MUTATION_AAA1(state, payload) {
      console.log(state.aaa1.replace('Module', 'Mutaion') + (payload?.valAAA1 ?? ' ✅'));
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
  state: {
    aa: 'Module AA',
  },
  getters: {
    getterAA(state) {
      return state.aa.replace('Module', 'Getter');
    },
  },
  actions: {
    actionAA(ctx, payload) {
      console.log('actionAA:', payload ?? ' ✅');
      return payload?.valAA ?? 'AA';
    },
  },
  mutations: {
    MUTATION_AA(state, payload) {
      console.log(state.aa.replace('Module', 'Mutaion') + (payload?.valAA ?? ' ✅'));
    },
  },
  modules: { moduleAAA1, moduleAAA2 },
};

export type ModuleA = _Module<
  'moduleA',
  'isolated',
  { a: string },
  { getterA: string },
  { actionA: StoreActionRecord<{ valA: string }, string, true> },
  { MUTATION_A: { valA: string } },
  { moduleAA: ModuleAA; optionalModule?: OptionalModule }
>;

const moduleA: ModuleA = {
  namespaced: true,
  state: {
    a: 'Module A',
  },
  getters: {
    getterA(state) {
      return state.a.replace('Module', 'Getter') + ' ✅';
    },
  },
  actions: {
    actionA: {
      root: true,
      handler: async (ctx, payload) => {
        console.log('actionA:', payload ?? ' ✅');
        return payload?.valA ?? 'A';
      },
    },
  },
  mutations: {
    MUTATION_A(state, payload) {
      console.log(state.a.replace('Module', 'Mutaion') + (payload?.valA ?? ' ✅'));
    },
  },
  modules: { moduleAA },
};

export default moduleA;
