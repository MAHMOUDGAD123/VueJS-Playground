<script setup lang="ts">
 import { lazyComponent } from '@/assets/tools/lazy-component';
 const VueRouterContent = lazyComponent(() => import('@/components/views/VueRouterContent.vue'));
</script>

<template>
 <VueRouterContent />
</template>
