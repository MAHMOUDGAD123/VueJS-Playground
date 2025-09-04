<script lang="ts">
  type DataType = {
    reactiveCounter: number;
    nonReactiveCounter: number;
  };

  export default {
    name: 'ProvideInjectChild',
    components: {},

    inject: {
      // Parent
      reactiveCounter: {
        from: 'reactiveCounter',
      },
      nonReactiveCounter: {
        from: 'nonReactiveCounter',
      },
    },

    data() {
      return {} as DataType;
    },
  };
</script>

<template>
  <section class="flex flex-col gap-3">
    <p class="custom-title">Reactive</p>

    <output class="custom-output">
      {{ reactiveCounter }}
    </output>
  </section>

  <section class="flex flex-col gap-3">
    <p class="custom-title">non-Reactive</p>

    <output class="custom-output">
      {{ nonReactiveCounter }}
    </output>
  </section>
</template>

<style scoped></style>
