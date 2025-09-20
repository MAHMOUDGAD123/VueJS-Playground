<script setup lang="ts">
 defineOptions({
  name: 'ExampleCard',
 });

 defineProps<{
  title: string;
 }>();
</script>

<template>
 <div class="example-card">
  <h3 class="title bg-primary w-full px-3 py-2 text-start">{{ title }}</h3>

  <div class="flex w-full flex-col items-center gap-5">
   <slot></slot>
  </div>
 </div>
</template>

<style scoped>
 .example-card {
  counter-increment: count 1;

  & > * {
   width: 100%;
  }
 }

 .title {
  font-weight: bolder;

  &::before {
   content: counter(count) ' - ';
  }
 }
</style>
