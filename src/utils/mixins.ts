import type { ComponentOptionsMixin } from 'vue';

export const lifeCycleTestMixin: ComponentOptionsMixin = {
  beforeMount() {
    console.log('beforeMount (mixin)');
  },

  mounted() {
    console.log('mounted (mixin)');
  },
};
