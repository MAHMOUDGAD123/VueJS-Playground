import type { _Module, StoreActionRecord } from 'strict-vuex';

export type OptionalModule = _Module<
  'optionalModule',
  'isolated',
  { optionalState: string },
  { optionalGetter: string },
  { optionalAction: StoreActionRecord<{ optionalVal: string }, string> },
  { OPTIONAL_MUTATION: { optionalVal: string } }
>;

export const optionalModule: OptionalModule = {
  namespaced: true,
  state: () => ({
    optionalState: 'Optional Module',
  }),
  getters: {
    optionalGetter(state) {
      return state.optionalState.replace('Module', 'Getter') + ' ✅';
    },
  },
  mutations: {
    OPTIONAL_MUTATION(state, payload) {
      console.log(
        state.optionalState.replace('Module', 'Mutation') + (payload?.optionalVal ?? ' ✅'),
      );
    },
  },
  actions: {
    optionalAction(ctx, payload) {
      console.log('optionalAction', payload ?? ' ✅');
      return payload?.optionalVal ?? 'Optinal';
    },
  },
};
