<script setup lang="ts">
  defineOptions({
    name: 'CustomFieldset',
  });

  defineProps<{
    legend?: string;
  }>();
</script>

<template>
  <fieldset
    class="border-primary grid w-full items-center justify-stretch gap-7 rounded-md border-5 px-5 py-7"
  >
    <legend v-if="legend" class="bg-primary w-fit rounded-[inherit] px-2.5 py-1.25">
      {{ legend }}
    </legend>
    <slot></slot>
  </fieldset>
</template>

<style scoped>
  fieldset {
    & :not(:not(section)) {
      width: 100%;
    }

    &:has(section:nth-of-type(2)) :not(:not(section)) {
      border: 5px solid var(--color-secondary);
      padding: 15px;
    }
  }
</style>
