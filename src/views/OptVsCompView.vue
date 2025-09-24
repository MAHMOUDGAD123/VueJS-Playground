<script setup lang="ts">
 import { lazyComponent } from '@/assets/tools/lazy-component';
 const OptionVsCompContent = lazyComponent(() => import('@/components/views/OptVsCompContent.vue'));
</script>

<template>
 <OptionVsCompContent />
</template>
