<script setup lang="ts">
 import { lazyComponent } from '@/assets/tools/lazy-component';
 const EventBusContent = lazyComponent(() => import('@/components/views/EventBusContent.vue'));
</script>

<template>
 <EventBusContent />
</template>
