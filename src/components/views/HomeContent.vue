<script setup lang="ts">
  import vueLogo from '@/assets/imgs/vuejs.svg';
  import { RouterLink } from 'vue-router';
  import TechsCarousel from '@/components/_global/TechsCarousel.vue';
  import { routes } from '@/router';

  const navRoutes = routes.filter((route) => route.meta?.isNav);
</script>

<template>
  <div class="mt-20 flex flex-col items-center gap-20">
    <TechsCarousel />

    <img :src="vueLogo" alt="Logo" class="w-[200px]" />

    <div class="flex flex-col gap-10 text-center">
      <h1 class="text-4xl font-bold">Let's play</h1>

      <div
        class="bg-primary10 border-primary flex flex-wrap justify-center gap-5 rounded-2xl border-2 p-7"
      >
        <RouterLink
          v-for="route in navRoutes"
          :to="{ name: route.name }"
          :key="route.name"
          class="custom-button"
          >{{ route.meta!.navLinkTitle }}</RouterLink
        >
      </div>
    </div>
  </div>
</template>
