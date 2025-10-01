<script setup lang="ts">
  import { lazyComponent } from '@/assets/tools/lazy-component';
  const TodoAppContent = lazyComponent(() => import('@/components/views/TodoAppContent.vue'));
</script>

<template>
  <TodoAppContent />
</template>
