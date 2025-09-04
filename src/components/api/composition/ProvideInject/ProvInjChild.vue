<script setup lang="ts">
  import { inject, type Ref } from 'vue';
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';

  const isGrandNumEven = inject<Ref<boolean>>('isGrandNumEven');
</script>

<template>
  <CustomFieldset legend="Child">
    <div
      class="custom-output w-full font-bold"
      :style="{
        color: isGrandNumEven ? 'dodgerblue' : 'orangered',
      }"
    >
      {{ isGrandNumEven ? 'EVEN' : 'ODD' }}
    </div>
  </CustomFieldset>
</template>
