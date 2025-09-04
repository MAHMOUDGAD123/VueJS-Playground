<script setup lang="ts">
  defineOptions({
    name: 'CustomFieldset',
  });

  defineProps<{
    legend?: string;
  }>();
</script>

<template>
  <fieldset>
    <legend v-if="legend">{{ legend }}</legend>
    <slot></slot>
  </fieldset>
</template>

<style scoped>
  fieldset {
    width: 100%;
    border: 5px solid var(--color-primary);
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 30px;

    & :not(:not(section)) {
      width: 100%;
    }

    &:has(section:nth-of-type(2)) :not(:not(section)) {
      border: 5px solid var(--color-secondary);
      padding: 15px;
    }

    & > legend:first-child {
      background-color: var(--color-primary);
      padding: 5px 10px;
      border-radius: inherit;
      width: fit-content;
      /* margin-right: auto; */
    }
  }
</style>
