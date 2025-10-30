<script setup lang="ts">
  import { useRoute, type RouteMap } from 'vue-router';
  import { onUnmounted, ref, watch } from 'vue';

  defineSlots<{
    default: () => unknown;
    loading: (props: { isLoading?: boolean }) => unknown;
    error: (props: { error?: Error }) => unknown;
  }>();

  const {
    routeName,
    loading = false,
    error,
    loadingTimeout = 200,
  } = defineProps<{
    routeName: keyof RouteMap;
    loading?: boolean;
    error?: Error;
    /**
     * A delay before showing the loader.
     */
    loadingTimeout?: number;
    logError?: boolean;
  }>();

  const shouldLoaderRender = ref(false);
  let timeoutId = NaN;

  onUnmounted(() => {
    clearTimeout(timeoutId);
  });

  watch(
    () => loading,
    (newVal) => {
      if (newVal) {
        timeoutId = setTimeout(() => {
          shouldLoaderRender.value = true;
        }, loadingTimeout);
      } else {
        clearTimeout(timeoutId);
      }
    },
    { immediate: true },
  );

  const route = useRoute();
</script>

<template>
  <slot name="default" v-if="!loading && !error && route.name === routeName"></slot>
  <slot
    name="loading"
    :isLoading="loading"
    v-if="shouldLoaderRender && loading && route.name === routeName"
  >
    <AppLoader />
  </slot>
  <slot name="error" :error v-if="!loading && error && route.name === routeName">
    <AppError :error :printError="logError" />
  </slot>
</template>
