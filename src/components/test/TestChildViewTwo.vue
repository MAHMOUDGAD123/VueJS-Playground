<script lang="ts" setup>
  import CustomFieldset from '../_global/CustomFieldset.vue';

  defineProps<{
    prop3?: string | number;
    prop4?: string | number;
  }>();
</script>

<template>
  <CustomFieldset>
    <div class="flex flex-wrap gap-1 text-center *:flex-1 *:basis-[100px]">
      <div class="custom-output">{{ prop3 }}</div>
      <div class="custom-output">{{ prop4 }}</div>
    </div>
  </CustomFieldset>
</template>
