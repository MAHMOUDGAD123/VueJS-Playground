<script setup lang="ts">
  import { lazyComponent } from '@/assets/tools/lazy-component';

  const UserPostRouteContent = lazyComponent(
    () => import('@/components/router/user-post/UserPostRouteContent.vue'),
  );
</script>

<template>
  <UserPostRouteContent />
</template>
