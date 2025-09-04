<script setup lang="ts">
  import { shallowRef } from 'vue';
  import ExposeChild from './ExposeChild.vue';

  defineOptions({ name: 'ExposeParent' });

  const childRef = shallowRef<InstanceType<typeof ExposeChild> | null>(null);
</script>

<template>
  <div class="flex flex-col gap-5 p-4">
    <p class="p-3">
      This reactive value belongs to the child but we can increase the value from the parent too by
      expose this value to the parent using <span class="imp-txt">defineExpose</span> api.
    </p>

    <div class="custom-output">{{ childRef?.count ?? 0 }}</div>

    <div class="flex flex-wrap justify-center gap-5">
      <button class="custom-button flex items-center gap-3" @click="childRef?.incCounter">
        <i class="fa-solid fa-person text-4xl"></i>
        <i class="fa-solid fa-plus text-2xl"></i>
      </button>

      <ExposeChild ref="childRef" />
    </div>
  </div>
</template>
