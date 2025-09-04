<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue';

  defineOptions({
    name: 'BackToTopBtn',
  });

  const abortController = new AbortController();

  onMounted(() => {
    document.getElementById('backToTop')!.addEventListener(
      'click',
      () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      { signal: abortController.signal },
    );
  });

  onUnmounted(() => {
    abortController.abort();
  });
</script>

<template>
  <div id="backToTop" class="back-to-top">
    <i class="fa-solid fa-circle-chevron-up"></i>
  </div>
</template>

<style scoped>
  .back-to-top {
    position: fixed;
    bottom: 50px;
    right: 5px;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--color-primary);
    transition-property: opacity, visibility;
    visibility: hidden;
    z-index: 10;
    opacity: 0;
    transition-duration: var(--transition-duration-global);

    &.show-up {
      visibility: visible;
      opacity: 0.35;
    }

    &:hover {
      opacity: 1;
    }
  }
</style>
