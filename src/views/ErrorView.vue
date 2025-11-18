<script setup lang="ts">
  import { useErrorStore } from '@/stores/composable/error';
  import { onUnmounted } from 'vue';
  import { RouterLink } from 'vue-router';

  const errorStore = useErrorStore();

  onUnmounted(() => {
    errorStore.clearError();
  });
</script>

<template>
  <div class="mt-24 flex h-full flex-col items-center justify-center gap-4 text-center">
    <h1 class="font-saira text-primary mb-5 flex flex-col gap-2 text-5xl select-none">
      {{ errorStore.state.error?.name || 'Error' }}
    </h1>
    <div class="flex flex-wrap items-center justify-center gap-3">
      <span>raised at</span>
      <i class="fa-solid fa-arrow-right"></i>
      <span class="text-primary bg-primary10 px-3 py-1">{{
        errorStore.state.route?.fullPath || '/route?'
      }}</span>
      <span>route</span>
    </div>
    <p class="font-bold text-red-400">
      {{ errorStore.state.error?.message || 'error message' }}
    </p>
    <RouterLink to="/" replace class="custom-button mt-3 flex items-center gap-5">
      <span>Home</span>
      <i class="fa-solid fa-house"></i>
    </RouterLink>
  </div>
</template>
