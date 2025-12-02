<script setup lang="ts">
  import InfiniteCarousel from './InfiniteCarousel.vue';
  import piniaSVG from '@/assets/imgs/pinia.svg';
  import viteSVG from '@/assets/imgs/vitejs.svg';
  import vuetifySVG from '@/assets/imgs/vuetify.svg';
  import vuexSVG from '@/assets/imgs/vuex.svg';
  import vueuseSVG from '@/assets/imgs/vueuse.svg';
  import primevueSVG from '@/assets/imgs/primevue.svg';
  import vuerouterSVG from '@/assets/imgs/vuerouter.svg';
  import vitestSVG from '@/assets/imgs/vitest.svg';
</script>

<template>
  <InfiniteCarousel width="750px" duration="20s" gap="90px">
    <div><img :src="viteSVG" alt="vitejs" /></div>
    <div><img :src="vitestSVG" alt="vitest" /></div>
    <div><img :src="vuerouterSVG" alt="vuerouter" /></div>
    <div><img :src="piniaSVG" alt="pinia" /></div>
    <div><img :src="vuexSVG" alt="vuex" /></div>
    <div><img :src="vueuseSVG" alt="vueuse" /></div>
    <div><img :src="vuetifySVG" alt="vuetify" /></div>
    <div><img :src="primevueSVG" alt="primevue" /></div>
  </InfiniteCarousel>
</template>

<style scoped></style>
