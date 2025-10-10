<script lang="ts" setup>
  import { reactive, useTemplateRef, watch } from 'vue';

  const count = reactive({ c1: 0, c2: 0 });
  const c1Ref = useTemplateRef('counter1');

  watch(
    () => count.c1,
    () => {
      console.log('C1:', c1Ref.value?.textContent);
    },
    { flush: 'post', immediate: true },
  );
</script>

<template>
  <router-link :to="{ name: 'composable', path: '/composable' }">link</router-link>
  <button class="custom-button text-2xl" @click="count.c1++" ref="counter1">
    {{ count.c1 }}
  </button>
  <button class="custom-button text-2xl" @click="count.c2++" ref="counter2">
    {{ count.c2 }}
  </button>
</template>
