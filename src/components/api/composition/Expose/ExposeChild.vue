<script setup lang="ts">
  import { ref } from 'vue';

  defineOptions({ name: 'ExposeChild' });

  const count = ref(0);
  const incCounter = () => {
    ++count.value;
  };

  defineExpose({
    count,
    incCounter,
  });
</script>

<template>
  <button class="custom-button flex items-center gap-3" @click="incCounter">
    <i class="fa-solid fa-child text-4xl"></i>
    <i class="fa-solid fa-plus text-2xl"></i>
  </button>
</template>
