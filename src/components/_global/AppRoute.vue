<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import AppError from './AppError.vue';
  import AppLoader from './AppLoader.vue';

  defineOptions({
    name: 'AppRoute',
  });

  defineProps<{
    routeName: RouteName;
    loading?: boolean;
    error?: Error;
  }>();

  const route = useRoute();
</script>

<template>
  <AppLoader v-if="loading && route.name === routeName" />
  <AppError v-if="error && route.name === routeName" :error />
  <slot v-if="!loading && !error && route.name === routeName"></slot>
</template>
