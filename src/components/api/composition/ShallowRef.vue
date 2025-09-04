<script setup lang="ts">
  import { shallowRef, triggerRef, unref } from 'vue';

  defineOptions({ name: 'ShallowRef' });

  const shallowCounter = shallowRef({ count: 0 });

  const increaseCounter = () => {
    unref(shallowCounter).count = unref(shallowCounter).count + 1;
  };

  const triggerUpdate = () => triggerRef(shallowCounter);
</script>

<template>
  <div class="flex flex-col gap-7 p-5">
    <div class="flex flex-wrap items-center justify-center gap-5">
      <button class="custom-button" @click="increaseCounter" ref="incBtn">
        <i class="fa-solid fa-plus"></i>
      </button>
      <button class="custom-button" @click="triggerUpdate">triggerRef</button>
    </div>

    <div class="flex flex-col justify-center gap-5">
      <div class="custom-output">{{ shallowCounter.count }}</div>
    </div>
  </div>
</template>
