<script lang="ts" setup>
  import { useStopWatch } from '@/hooks/useStopWatch';

  const { timer, paused, stopped, toggle, stop, reset } = useStopWatch();
</script>

<template>
  <div class="flex flex-col gap-5 p-5 *:flex-1">
    <i class="fa-solid fa-stopwatch text-primary text-7xl"></i>

    <div
      class="custom-output font-saira flex justify-center gap-2 text-center font-extrabold *:basis-[30px]"
    >
      <span v-for="(n, i) in timer.toString().split('')" :key="i">
        {{ n }}
      </span>
    </div>
    <div class="flex flex-wrap gap-3 *:flex-1">
      <button class="custom-button" @click="toggle">
        <i :class="`fa-solid ${paused || stopped ? 'fa-play' : 'fa-pause'} text-xl`"></i>
      </button>
      <button class="custom-button" @click="stop" :disabled="stopped">
        <i class="fa-solid fa-stop text-xl"></i>
      </button>
      <button class="custom-button" @click="reset" :disabled="stopped && timer === '0.0'">
        <i class="fa-solid fa-arrows-rotate text-xl"></i>
      </button>
    </div>
  </div>
</template>
