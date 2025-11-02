<script setup lang="ts">
  import { lazyComponent } from '@/assets/tools/lazy-component';
  const TestViewContent = lazyComponent(() => import('@/components/views/TestViewContent.vue'));
</script>

<template>
  <TestViewContent />
</template>
