<script lang="ts" setup>
  import { ref } from 'vue';
  import FtAttrsNoInherit from './FtAttrsNoInherit.vue';
  import FtAttrsInherit from './FtAttrsInherit.vue';
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';

  const count = ref(0);
</script>

<template>
  <div class="flex flex-col gap-3 p-5 *:flex-1">
    <div class="custom-output">{{ count }}</div>
    <CustomFieldset legend="Inherit">
      <FtAttrsInherit @click="() => ++count" class="custom-button" />
    </CustomFieldset>

    <CustomFieldset legend="No Inherit">
      <FtAttrsNoInherit @click="() => ++count" class="custom-button" />
    </CustomFieldset>
  </div>
</template>
