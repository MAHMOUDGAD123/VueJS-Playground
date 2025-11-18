<script lang="ts" setup>
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';
  import { useStore } from 'vuex';

  defineProps<{
    prop1?: string | number;
    prop2?: string | number;
  }>();

  const store = useStore();
</script>

<template>
  <CustomFieldset :icon="{ iconSrc: 'vuex' }">
    <div class="custom-output text-center">
      {{ store.state.fname }}
    </div>
  </CustomFieldset>
</template>
