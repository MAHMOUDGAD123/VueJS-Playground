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
    minWidth: `${props.label ? (labelWidthInCh ? labelWidthInCh : props.label.length + 2) : 0}ch`,
   }"
  >
   {{ props.label }}
  </div>

  <input
   type="text"
   .name="props.name"
   .id="props.name"
   v-model="model"
   :placeholder="defaultPlaceholder"
   class="bg-secondary text-primary border-primary75 rounded-se-sm rounded-ee-sm border-3 px-2 py-1.5"
  />
 </label>
</template>

<style scoped>
 input {
  outline: none;
  flex: 1;
  width: 100%;
 }

 label {
  display: flex;
  font-weight: bolder;

  & > .label {
   pointer-events: none;
   align-content: center;
   background-color: var(--color-primary75);
   text-align: center;
   border-start-start-radius: 4px;
   border-end-start-radius: 4px;
  }

  &:has(:is(input):focus) {
   & > .label {
    background-color: var(--color-primary);
   }

   & input {
    border-color: var(--color-primary);
   }
  }

  &:not(:has(.label)) input {
   border-radius: 4px;
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

  input {
   border-start-end-radius: 0;
   border-end-start-radius: 4px;
  }
 }
</style>
