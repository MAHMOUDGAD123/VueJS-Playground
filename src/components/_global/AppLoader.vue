<script lang="ts" setup>
  defineOptions({
    name: 'AppLoader',
    inheritAttrs: false,
  });

  defineProps<{
    width?: number;
  }>();
</script>

<template>
  <div class="__skel_ignore__ p-5">
    <div
      class="__skel_ignore__ spinner animate-r-spin mx-auto aspect-square rounded-full"
      :style="{ width: `${width || 50}px` }"
    ></div>
  </div>
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
