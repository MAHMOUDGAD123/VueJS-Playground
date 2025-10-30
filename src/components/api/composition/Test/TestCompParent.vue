<script lang="ts" setup>
  import TestCompChild from './TestCompChild.vue';
</script>

<template>
  <TestCompChild v-slot="{ data }">
    <div class="custom-output slot">
      {{ data }}
    </div>
  </TestCompChild>
</template>

<style scoped>
  :deep(.deep) {
    background-color: red;
    color: white;
    font-weight: bolder;
  }

  :global(.global) {
    background-color: dodgerblue;
    color: white;
    font-weight: bolder;
  }
</style>
