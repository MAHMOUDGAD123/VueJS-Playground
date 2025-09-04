<script setup lang="ts">
  import { RouterLink, useRoute } from 'vue-router';

  defineOptions({ name: 'NotFoundView' });

  const currentPath = useRoute().path;
</script>

<template>
  <div class="mt-24 flex h-full flex-col items-center justify-center gap-4 text-center">
    <h1 class="font-saira text-primary text-9xl select-none">404</h1>
    <h2 class="text-primary mb-5 text-3xl font-bold select-none">Page Not Found</h2>
    <p>
      <span class="text-primary bg-primary10 px-3 py-1">{{ currentPath }}</span>
      route you're looking for doesn't exist.
    </p>
    <RouterLink to="/" class="custom-button mt-3 flex items-center gap-5">
      <span>Home</span>
      <i class="fa-solid fa-house"></i>
    </RouterLink>
  </div>
</template>
