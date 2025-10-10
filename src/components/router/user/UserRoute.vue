<script setup lang="ts">
  import { lazyComponent } from '@/assets/tools/lazy-component';

  const UserRouteContent = lazyComponent(
    () => import('@/components/router/user/UserRouteContent.vue'),
  );
</script>

<template>
  <UserRouteContent />
</template>
