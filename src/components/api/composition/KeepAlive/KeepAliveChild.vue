<script setup lang="ts">
  import CustomTextInput from '@/components/_global/CustomTextInput.vue';
  import { onActivated } from 'vue';

  defineProps<{
    label: string;
  }>();

  const emit = defineEmits(['cached']);

  onActivated(() => {
    emit('cached');
  });
</script>

<template>
  <CustomTextInput :label name="txt-inp" :label-width-in-ch="7" />
</template>
