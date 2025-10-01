<script setup lang="ts">
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';
  import ModelTeleport from '@/components/api/composition/Teleport/ModelTeleport.vue';
  import PopupTeleport from './PopupTeleport.vue';
</script>

<template>
  <div class="flex flex-col gap-5 p-5">
    <CustomFieldset legend="Model">
      <ModelTeleport />
    </CustomFieldset>

    <CustomFieldset legend="Popup">
      <PopupTeleport />
    </CustomFieldset>
  </div>
</template>

<style scoped></style>
