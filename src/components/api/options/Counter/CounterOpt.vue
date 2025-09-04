<script lang="ts">
  import CounterComp from './CounterComp.vue';

  export default {
    name: 'CounterOpt',
    components: {
      CounterComp,
    },
  };
</script>

<template>
  <CounterComp :start-value="(Math.random() * 50 + 1) >>> 0" />
</template>
