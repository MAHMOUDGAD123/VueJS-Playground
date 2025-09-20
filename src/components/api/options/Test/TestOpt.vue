<script lang="ts">
 import { computed } from 'vue';
 import TestOptChild from './TestOptChild.vue';

 export default {
  components: {
   TestOptChild,
  },

  data: () => ({
   count: 0,
  }),

  provide() {
   return {
    count: computed({
     get: () => {
      return this.count;
     },
     set: (newVal: number) => {
      this.count = newVal;
     },
    }),
   };
  },
 };
</script>

<template>
 <div class="flex flex-col gap-5 p-5">
  <div class="custom-output">{{ count }}</div>
  <button class="custom-button" @click="++count">
   <i class="fa-solid fa-person text-3xl"></i>
  </button>

  <TestOptChild />
 </div>
</template>
