<script lang="ts" setup>
  defineOptions({
    name: 'AppLoader',
  });

  defineProps<{
    width?: number;
  }>();
</script>

<template>
  <div
    class="spinner animate-r-spin mx-auto aspect-square rounded-full"
    :style="{ width: `${width || 50}px` }"
  ></div>
</template>

<style scoped>
  .spinner {
    background-image: conic-gradient(
      var(--color-primary),
      var(--color-primary50),
      var(--color-primary25),
      transparent,
      transparent
    );
  }
</style>
