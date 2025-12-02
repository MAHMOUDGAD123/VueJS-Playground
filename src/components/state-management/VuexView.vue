<script lang="ts" setup>
  import { useStore } from 'vuex';
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';

  const store = useStore();
</script>

<template>
  <CustomFieldset :icon="{ iconSrc: 'vuex' }">
    <div class="custom-output text-center">
      {{ store.state.count }}
    </div>
    <button
      class="custom-button text-primary font-saira text-2xl"
      @click="store.dispatch('increment')"
    >
      <i class="fa-solid fa-plus"></i>
    </button>
  </CustomFieldset>
</template>
