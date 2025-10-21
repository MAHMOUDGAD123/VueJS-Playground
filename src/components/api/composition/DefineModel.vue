<script lang="ts" setup>
  import CustomTextInput from '@/components/_global/CustomTextInput.vue';
  import { ref } from 'vue';

  const text = ref('');
</script>

<template>
  <div class="flex flex-col gap-5 p-5">
    <div class="custom-output text-xl">{{ text || '---' }}</div>
    <CustomTextInput v-model.capitalize="text" default-placeholder=".capitalize" />
    <CustomTextInput v-model.uppercase="text" default-placeholder=".uppercase" />
    <CustomTextInput v-model.number="text" default-placeholder=".number" />
    <CustomTextInput textarea v-model.lazy.trim="text" default-placeholder=".lazy.trim" />
  </div>
</template>
