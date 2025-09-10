<script setup lang="ts">
  defineOptions({
    name: 'CustomCheckbox',
  });

  const props = defineProps<{
    name?: string;
    id?: string;
    size?: number;
  }>();

  const model = defineModel({ required: true });

  const defaulSize = 25;
</script>

<template>
  <div
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
      class="absolute z-2 h-full w-full cursor-pointer appearance-none rounded-[inherit]"
    />

    <i
      class="icon fa-solid fa-check-circle text-primary duration-global rounded-[inherit] transition-transform"
      :style="{ fontSize: `${props.size || 25}px` }"
    ></i>
  </div>
</template>

<style scoped>
  .checkbox-wrapper {
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
