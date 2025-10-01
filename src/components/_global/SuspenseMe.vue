<script setup lang="ts">
  import { onErrorCaptured, ref } from 'vue';
  import LoadingSkeleton from '@/components/_global/LoadingSkeleton.vue';
  import AppError from '@/components/_global/AppError.vue';

  // Setup
  withDefaults(
    defineProps<{
      timeout?: number;
      suspensible?: boolean;
    }>(),
    { timeout: 200, suspensible: false },
  );

  defineSlots<{
    default?(props: { isPending: boolean; error: Error | null }): unknown;
    fallback?(props: { isPending: boolean }): unknown;
    error?(): unknown;
  }>();

  // Data
  const isPending = ref(false);
  const error = ref<Error | null>(null);
  // const timer = new Timer();

  // Functions
  const onPending = () => {
    // timer.start();
    isPending.value = true;
  };
  const onResolve = () => {
    // console.log(`@resolve after: ${timer.duration}`);
    isPending.value = false;
  };
  const onFallback = () => {
    // console.log(`@Fallback after: ${timer.duration}`);
  };

  // Life cycle
  onErrorCaptured((err) => {
    error.value = err;
    console.error(err);
    return false;
  });
</script>

<template>
  <Suspense :timeout :suspensible @pending="onPending" @fallback="onFallback" @resolve="onResolve">
    <template #default v-if="!error">
      <slot name="default" :isPending :error></slot>
    </template>

    <template #fallback>
      <LoadingSkeleton>
        <slot name="fallback" :isPending></slot>
      </LoadingSkeleton>
    </template>

    <template v-if="error">
      <slot name="error" :error>
        <AppError :error />
      </slot>
    </template>
  </Suspense>
</template>
