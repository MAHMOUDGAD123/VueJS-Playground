import { acceptHMRUpdate, defineStore, getActivePinia } from 'pinia';
import { computed, ref } from 'vue';

// export const useCounterStore = defineStore('counter', {
//   state: () => ({
//     count: 0,
//   }),

//   getters: {
//     doubleCount: (state) => state.count * 2,
//   },

//   actions: {
//     increment() {
//       ++this.count;
//     },
//     deccrement() {
//       --this.count;
//     },
//   },
// });

export const useCounterStore = defineStore('counter', ({ action }) => {
  const count = ref(0);
  const data = ref({
    name: 'Mahmoud',
    age: 28,
    address: {
      city: 'Mansoura',
      country: 'Egypt',
    },
  });
  const doubleCount = computed(() => count.value * 2);

  const incrementBy1 = action(() => {
    ++count.value;
  }, 'incrementBy1');

  const decrementBy1 = action(() => {
    --count.value;
  }, 'decrementBy1');

  const increment = (): string => {
    incrementBy1();
    return 'Inc ✅';
  };
  const decrement = (): string => {
    decrementBy1();
    return 'Dec ✅';
  };

  const checkStoreMap = () => {
    const pinia = getActivePinia();
    if (pinia) {
      console.log('Stores:', [...pinia?._s.keys()]); // Internal stores map
    }
  };

  return {
    count,
    data,
    doubleCount,
    increment,
    decrement,
    // realName: 'MG',
    checkStoreMap,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot));
}
