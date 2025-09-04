<script lang="ts">
  export default {
    name: 'MouseTrackerComp',
    data() {
      return {
        mouse: {
          x: 0,
          y: 0,
        },
      };
    },

    mounted() {
      const ele = this.$refs.mouseXY as HTMLDivElement;
      ele.addEventListener('mousemove', (e) => {
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
      });
    },
  };
</script>

<template>
  <div ref="mouseXY" class="bg-primary10 w-full p-5">
    <div class="mx-auto flex w-fit flex-col items-center justify-center gap-5 self-center">
      <slot v-bind="{ x: mouse.x, y: mouse.y }"></slot>
    </div>
  </div>
</template>

<style></style>
