<script setup lang="ts">
  import type { StyleValue } from 'vue';

  defineOptions({
    name: 'CustomCheckbox',
  });

  const props = defineProps<{
    name?: string;
    id?: string;
    size?: number;
  }>();

  const model = defineModel({ required: true, default: false });
  const iconStyle: StyleValue = {
    fontSize: `${props.size || 25}px`,
  };
</script>

<template>
  <div class="checkbox-wrapper">
    <input type="checkbox" v-model="model" :name :id />
    <i class="icon fa-solid fa-check-circle" :style="iconStyle"></i>
  </div>
</template>

<style scoped>
  .checkbox-wrapper {
    position: relative;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    contain: content;
    z-index: 1;
    background-color: var(--color-secondary);

    &:has(input:checked) {
      & > .icon {
        transform: none;
      }
    }
  }

  .icon {
    color: var(--color-primary);
    transition: transform var(--transition-duration-global);
    transform: scale(0);
    transition: transform var(--transition-duration-global);
  }

  input[type='checkbox'] {
    position: absolute;
    width: 100%;
    height: 100%;
    appearance: none;
    padding: 5px 10px;
    border-radius: 10px;
    cursor: pointer;
    z-index: 2;
  }
</style>
