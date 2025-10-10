<script setup lang="ts">
  import { lazyComponent } from '@/assets/tools/lazy-component';

  const UsersRouteContent = lazyComponent(
    () => import('@/components/router/users/UsersRouteContent.vue'),
  );
</script>

<template>
  <UsersRouteContent />
</template>
