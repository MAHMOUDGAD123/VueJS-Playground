<script setup lang="ts">
  import { lazyComponent } from '@/assets/tools/lazy-component';

  const PostsRouteContent = lazyComponent(
    () => import('@/components/router/posts/PostsRouteContent.vue'),
  );
</script>

<template>
  <PostsRouteContent />
</template>
