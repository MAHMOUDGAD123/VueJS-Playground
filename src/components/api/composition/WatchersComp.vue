<script setup lang="ts">
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';
  import { nextTick, reactive, ref, useTemplateRef, watch } from 'vue';

  const countOutputEle = useTemplateRef('countOutputEle');

  // Data
  const count = ref((Math.random() * 30) >>> 0);
  const isEven = ref(!(count.value % 2));
  const increaseCount = async () => {
    ++count.value;
    console.log('Before nextTick: ', countOutputEle.value?.textContent);
    await nextTick();
    console.log('After nextTick: ', countOutputEle.value?.textContent);
  };

  const numbers = reactive<number[]>([]);

  // Watchers
  watch(count, (newVal) => {
    isEven.value = !(newVal % 2);
  });

  watch(numbers, () => {
    // sort the array on any update
    // console.log('sorted');
    numbers.sort((a, b) => a - b);
  });
</script>

<template>
  <div class="flex flex-col gap-5 p-5">
    <CustomFieldset legend="Primitive">
      <div class="flex w-full flex-col gap-4">
        <p>
          The watcher here will watch the generated random and see if it is divisible by 2 or not (I
          know that it's better to use computed value but this is just for testing).
        </p>

        <div class="custom-output" ref="countOutputEle">{{ count }}</div>
        <div class="custom-output">{{ isEven ? 'Even' : 'Odd' }}</div>
        <button class="custom-button text-2xl" @click="increaseCount">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </CustomFieldset>

    <CustomFieldset legend="Objects">
      <div class="flex w-full flex-col gap-5">
        <p>
          The watcher here will watch the reactive array and sort it after adding a random number to
          it.
        </p>

        <div
          class="auto-fit-grid border-primary grid max-h-[300px] grid-cols-[repeat(auto-fit,minmax(min(100%,70px),1fr))] items-center justify-center gap-3 overflow-auto rounded-xl border-4 p-4 select-none"
        >
          <span v-for="(n, i) in numbers" :key="i" class="custom-output">{{ n }}</span>
        </div>

        <button class="custom-button" @click="numbers.push((Math.random() * 1000) >>> 0)">
          Add & Sort
        </button>
      </div>
    </CustomFieldset>
  </div>
</template>
