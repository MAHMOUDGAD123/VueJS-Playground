<script lang="ts">
 export default {
  name: 'EventBusChildOpt',
  props: {
   index: {
    type: Number,
    required: true,
   },
  },

  data: () => ({
   ishappy: false,
  }),

  mounted() {
   this.$eventBus.on('event:happy', (idx) => (this.ishappy = this.index === idx));
   this.$eventBus.on('event:all:happy', () => (this.ishappy = true));
  },
 };
</script>

<template>
 <div
  class="bg-primary25 grid aspect-square items-center justify-center rounded-2xl p-5 text-6xl *:[grid-column:1/2] *:[grid-row:1/2] *:transition-opacity *:duration-500"
 >
  <i class="fa-solid fa-face-smile text-primary" :style="{ opacity: ishappy ? 1 : 0 }"></i>
  <i class="fa-solid fa-face-frown text-secondary" :style="{ opacity: ishappy ? 0 : 1 }"></i>
 </div>
</template>

<style scoped></style>
