<script lang="ts" setup>
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';
  import TestCompChildA from './TestCompChild.vue';
  import TestCompChildB from './TestCompChild.vue';
</script>

<template>
  <div class="flex flex-wrap gap-5 p-5 *:flex-1 *:basis-[150px]">
    <CustomFieldset legend="Comp A">
      <TestCompChildA />
    </CustomFieldset>

    <CustomFieldset legend="Comp B">
      <TestCompChildB />
    </CustomFieldset>
  </div>
</template>
