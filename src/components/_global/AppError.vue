<script lang="ts" setup>
  import { onMounted } from 'vue';

  const props = defineProps<{
    error: Error;
  }>();

  onMounted(() => {
    console.error(props.error);
  });
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center gap-3 p-5 text-center">
    <i class="fa-solid fa-circle-xmark text-primary text-5xl"></i>
    <h4 class="text-primary75 text-2xl font-extrabold">{{ error.name }}</h4>
    <p class="wrap-anywhere text-red-300">{{ error.message }}</p>
  </div>
</template>
