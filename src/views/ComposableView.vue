<script setup lang="ts">
  import { lazyComponent } from '@/assets/tools/lazy-component';
  const ComposableContent = lazyComponent(() => import('@/components/views/ComposableContent.vue'));
</script>

<template>
  <ComposableContent />
</template>
