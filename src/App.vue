<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { onMounted, onUnmounted } from 'vue';
  import { MainHeader, BackToTopBtn, MainFooter } from './components';

  const abortController = new AbortController();

  // window scrolling
  // ============================================================
  onMounted(() => {
    const btt = document.getElementById('backToTop')!;

    const OnWindowScroll = () => {
      if (window.scrollY > 300) {
        btt.classList.add('show-up');
      } else {
        btt.classList.remove('show-up');
      }
    };
    OnWindowScroll();
    window.addEventListener('scroll', OnWindowScroll, {
      signal: abortController.signal,
      passive: true,
    });
  });

  onUnmounted(() => {
    abortController.abort();
  });

  // ============================================================
</script>

<template>
  <MainHeader />

  <main class="max-w-body min-h-main px-container relative">
    <RouterView v-slot="{ Component }">
      <Transition name="route" mode="out-in" appear>
        <component :is="Component"></component>
      </Transition>
    </RouterView>
  </main>

  <MainFooter />

  <BackToTopBtn />
</template>

<style scoped>
  .route-enter-active,
  .route-leave-active {
    transition-property: opacity;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }

  .route-enter-from,
  .route-leave-to {
    opacity: 0;
  }
</style>
