<script setup lang="ts">
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';
  import ProvInjChild from './ProvInjChild.vue';
</script>

<template>
  <div class="w-full">
    <CustomFieldset legend="Parent">
      <div class="flex w-full flex-wrap gap-5">
        <ProvInjChild />
        <ProvInjChild />
      </div>
    </CustomFieldset>
  </div>
</template>
