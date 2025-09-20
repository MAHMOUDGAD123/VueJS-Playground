<script setup lang="ts" generic="T">
 const props = defineProps<{
  name?: string;
  id?: string;
  size?: number;
  label?: string;
  trueValue?: T;
  falseValue?: T;
 }>();

 const model = defineModel({ required: true });
 const defaulSize = 25;
</script>

<template>
 <label
  v-if="label"
  :for="id"
  class="tems-center bg-secondary duration-global relative z-1 flex w-fit justify-center rounded-full px-3.5 py-1.5 font-bold transition-colors contain-content"
 >
  <span class="pointer-events-none">{{ label }}</span>
  <input
   type="checkbox"
   v-model="model"
   :name
   :id
   :true-value
   :false-value
   class="absolute z-2 h-full w-full cursor-pointer appearance-none rounded-[inherit]"
  />
 </label>

 <div
  v-else
  class="checkbox-wrapper bg-secondary relative z-1 flex aspect-square items-center justify-center rounded-full transition-shadow contain-content"
  :style="{
   width: `${props.size || defaulSize}px`,
  }"
 >
  <input
   type="checkbox"
   v-model="model"
   :name
   :id
   :true-value
   :false-value
   class="absolute z-2 h-full w-full cursor-pointer appearance-none rounded-[inherit]"
  />

  <i
   class="icon fa-solid fa-check-circle text-primary duration-global rounded-[inherit] transition-transform"
   :style="{ fontSize: `${props.size || 25}px` }"
  ></i>
 </div>
</template>

<style scoped>
 label {
  &:has(input:checked) {
   background-color: var(--color-primary);
  }
 }

 .checkbox-wrapper {
  place-self: center;

  &:has(input:checked) {
   & > .icon {
    transform: none;
   }
  }

  &:has(input:focus-visible) {
   box-shadow: 0 0 0 3px var(--color-primary);
  }
 }

 .icon {
  transform: scale(0);
 }
</style>
