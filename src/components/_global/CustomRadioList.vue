<script setup lang="ts">
 import { watch } from 'vue';

 const props = defineProps<{
  radioListCount: number;
 }>();

 const emit = defineEmits<{
  indexChange: [index: number];
 }>();

 const model = defineModel<number>({ required: true });

 watch(model, (newIdx) => {
  emit('indexChange', newIdx);
 });
</script>

<template>
 <div class="flex flex-wrap items-center justify-center gap-3 p-3">
  <label
   v-for="(n, i) in props.radioListCount"
   :key="i"
   class="duration-global font-saira aspect-square w-[35px] cursor-pointer content-center rounded-full text-center transition-colors"
   :style="{
    backgroundColor: model === i ? 'var(--color-primary)' : 'var(--color-secondary)',
   }"
  >
   {{ i + 1 }}
   <input
    type="radio"
    name="showIndex"
    :value="i"
    v-model="model"
    class="pointer-events-none absolute opacity-0"
   />
  </label>
 </div>
</template>
