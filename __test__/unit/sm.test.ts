import { createPinia, disposePinia, setActivePinia, type Pinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useCounterStore } from '~/src/stores/pinia/counter-store';
import { vuexStore } from '~/src/stores/vuex';

// Pinia
describe('Pinia Test', () => {
  let pinia: Pinia | null = null;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  afterEach(() => {
    if (pinia) {
      disposePinia(pinia);
      pinia = null;
    }
  });

  it('Counter Store', () => {
    const counterStore = useCounterStore();

    expect(counterStore.count).toEqual(0);
    counterStore.increment();
    expect(counterStore.count).toEqual(1);
    counterStore.increment();
    expect(counterStore.count).toEqual(2);
  });
});

// Vuex
describe('Vuex Test', () => {
  it('Counter State', () => {
    expect(vuexStore.state.count).toEqual(0);
    vuexStore.commit('INCREMENT');
    expect(vuexStore.state.count).toEqual(1);
    vuexStore.dispatch('increment');
    expect(vuexStore.state.count).toEqual(2);
  });
});
