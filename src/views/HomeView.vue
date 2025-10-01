<script setup lang="ts">
  import { lazyComponent } from '@/assets/tools/lazy-component';
  const HomeContent = lazyComponent(() => import('@/components/views/HomeContent.vue'));
</script>

<template>
  <HomeContent />
</template>
