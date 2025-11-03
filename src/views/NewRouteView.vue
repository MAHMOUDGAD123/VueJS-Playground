<script lang="ts">
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';

  export default {
    components: {
      CustomFieldset,
    },
  };
</script>

<template>
  <div>
    <AppRoute route-name="newRoute">
      <CustomFieldset class="m-7 mx-auto max-w-2xl">
        <div class="font-saira text-primary text-center text-2xl">NEW ROUTE</div>
      </CustomFieldset>
      <p class="imp-txt text-center">
        This is a new dynamic route created on runtime by the user (if you reload the page it will
        be gone 💀).
      </p>
    </AppRoute>
  </div>
</template>
