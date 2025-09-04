<script lang="ts">
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';
  import MouseTrackerComp from './MouseTrackerComp.vue';

  export default {
    name: 'MouseTrackerOpt',
    components: {
      MouseTrackerComp,
      CustomFieldset,
    },
  };
</script>

<template>
  <MouseTrackerComp v-slot="{ x, y }">
    <CustomFieldset legend="mouse X">
      <span>{{ x }}</span>
    </CustomFieldset>
    <CustomFieldset legend="mouse Y">
      <span>{{ y }}</span>
    </CustomFieldset>
  </MouseTrackerComp>
</template>

<style></style>
