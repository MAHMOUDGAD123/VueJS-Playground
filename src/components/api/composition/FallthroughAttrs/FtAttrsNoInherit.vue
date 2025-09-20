<script lang="ts" setup>
 import { useAttrs } from 'vue';

 defineOptions({
  inheritAttrs: false,
 });

 const attrs = useAttrs() as { class: string; onClick: () => void };
</script>

<template>
 <button :class="attrs.class">Click</button>
 <button @click="attrs.onClick">Click</button>
</template>
