<script lang="ts">
  import { defineComponent } from 'vue';
  import TestOptChild from './TestOptChild.vue';

  export default defineComponent({
    components: {
      TestOptChild,
    },

    data: () => ({}),
  });
</script>

<template>
  <div class="flex flex-col gap-5 p-5">
    <TestOptChild />
  </div>
</template>
