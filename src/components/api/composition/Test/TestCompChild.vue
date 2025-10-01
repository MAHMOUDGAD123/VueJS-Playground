<script lang="ts" setup>
  import { useReactiveCounter as counter } from '@/stores/counter';
</script>

<template>
  <div class="custom-output">{{ counter.count }}</div>
  <div class="flex gap-3 *:flex-1">
    <button class="custom-button" @click="counter.inc">
      <i class="fa-solid fa-plus text-2xl"></i>
    </button>
    <button class="custom-button" @click="counter.dec">
      <i class="fa-solid fa-minus text-2xl"></i>
    </button>
  </div>
</template>
