<script setup lang="ts">
 const props = defineProps<{
  label?: string;
  labelWidthInCh?: number | string;
  id?: string;
  name?: string;
  defaultPlaceholder?: string;
 }>();
 const model = defineModel({ default: '' });
</script>

<template>
 <label :for="props.id">
  <div
   v-if="props.label"
   class="label"
   :style="{
    minWidth: `${props.label ? props.label.length + 2 : labelWidthInCh}ch`,
   }"
  >
   {{ props.label }}
  </div>

  <div class="relative flex flex-1">
   <div
    class="bg-secondary has-[+_select:open]:text-primary pointer-events-none absolute top-[3.5px] right-[3.5px] h-[calc(100%-6px)] w-[30px] content-center rounded-sm text-center text-[0.9rem] text-inherit has-[+_select:open]:[&>i]:rotate-[z_180deg]"
   >
    <i class="fa-solid fa-angles-down transition-all"></i>
   </div>

   <select :name="props.name" :id="props.id" class="custom-select-opt" v-model="model">
    <option value="" disabled>{{ defaultPlaceholder || '---' }}</option>
    <slot></slot>
   </select>
  </div>
 </label>
</template>

<style scoped>
 select {
  outline: none;
  flex: 1;
  width: 100%;
 }

 label {
  display: flex;
  font-weight: bolder;
  background-color: var(--color-secondary);

  & select {
   border-color: var(--color-primary);
  }

  &:has(:is(select):focus) {
   & > .label {
    background-color: var(--color-primary);
   }
  }

  &:not(:has(.label)) select {
   border-radius: 4px;
  }

  & > .label {
   pointer-events: none;
   align-content: center;
   background-color: var(--color-primary75);
   text-align: center;
   border-start-start-radius: 4px;
   border-end-start-radius: 4px;
  }
 }

 @media (width <= 320px) {
  label {
   flex-direction: column;

   & > .label {
    border-end-start-radius: 0;
    border-start-end-radius: 4px;
    width: 100%;
   }
  }

  select {
   border-start-end-radius: 0;
   border-end-start-radius: 4px;
  }
 }
</style>
