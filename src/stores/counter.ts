import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counterStore', () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);

  const increment = () => {
    ++count.value;
  };

  const decrement = () => {
    --count.value;
  };

  return { count, doubleCount, increment, decrement };
});

export const useReactiveCounter = reactive({
  count: 0,
  inc() {
    ++this.count;
  },
  dec() {
    --this.count;
  },
});
