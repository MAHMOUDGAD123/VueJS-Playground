<script setup lang="ts">
  import { lazyComponent } from '@/assets/tools/lazy-component';

  const PostRouteContent = lazyComponent(
    () => import('@/components/router/post/postRouteContent.vue'),
  );
</script>

<template>
  <PostRouteContent />
</template>
