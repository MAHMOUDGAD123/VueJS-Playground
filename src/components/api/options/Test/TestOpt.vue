<script lang="ts">
  import { defineComponent, ref, useTemplateRef } from 'vue';
  import TestOptChild from './TestOptChild.vue';

  export default defineComponent({
    components: {
      TestOptChild,
    },

    setup() {
      const childRef = useTemplateRef<InstanceType<typeof TestOptChild>>('childRef');

      return {
        count: ref(0),
        childRef,
      };
    },
  });
</script>

<template>
  <div class="flex flex-col gap-5 p-5 *:flex-1">
    <div class="custom-output">+{{ childRef?.increasedBy }}</div>
    <TestOptChild :count @increase="(incBy) => (count = count + incBy)" ref="childRef" />
  </div>
</template>
