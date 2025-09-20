<script lang="ts" setup>
 import { defineAsyncComponent, hydrateOnMediaQuery } from 'vue';
 import { rand, waitFor } from '@/assets/tools/helpers';
 import AppError from '@/components/_global/AppError.vue';
 import TestSkeletonLoader from './TestSkeletonLoader.vue';

 const TestChild = defineAsyncComponent({
  loader: async () => {
   await waitFor(rand({ min: 3000, max: 5000 }));
   if (rand({ min: 1, max: 10 }) & 1) {
    // only if odd
    throw 'Component failed to load';
   }
   return import('./AsyncCompChild.vue');
  },

  loadingComponent: TestSkeletonLoader,

  errorComponent: AppError,

  delay: 0,

  hydrate: hydrateOnMediaQuery('width > 500px'),

  // onError: (err, retry, fail, attempts) => {
  //  if (attempts <= 3) {
  //   retry();
  //  } else {
  //   fail();
  //  }
  // },
 });
</script>

<template>
 <div class="flex flex-col gap-5 p-5">
  <TestChild />
 </div>
</template>
