<script lang="ts" setup>
  import CustomFieldset from '../_global/CustomFieldset.vue';

  defineProps<{
    prop1?: string | number;
    prop2?: string | number;
  }>();
</script>

<template>
  <CustomFieldset>
    <div class="flex flex-wrap gap-1 text-center *:flex-1 *:basis-[100px]">
      <div class="custom-output">{{ prop1 }}</div>
      <div class="custom-output">{{ prop2 }}</div>
    </div>
  </CustomFieldset>
</template>
