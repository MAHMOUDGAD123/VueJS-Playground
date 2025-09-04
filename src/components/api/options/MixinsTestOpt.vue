<script lang="ts">
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';
  import { lifeCycleTestMixin } from '@/utils/mixins';

  export default {
    name: 'MixinsTestOpt',
    components: { CustomFieldset },

    mixins: [lifeCycleTestMixin],

    beforeMount() {
      console.log('beforeMount (component)');
    },

    mounted() {
      console.log('mounted (component)');
    },
  };
</script>

<template>
  <div class="flex flex-col gap-5 p-3">
    <CustomFieldset legend="Life Cycle Mixin">
      <p class="text-primary">
        You can use Mixins to create a reusable ComponentOptions - Open the Console to see the order
        of logs
      </p>
    </CustomFieldset>
  </div>
</template>

<style scoped></style>
