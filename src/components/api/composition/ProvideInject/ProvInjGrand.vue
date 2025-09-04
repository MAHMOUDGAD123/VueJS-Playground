<script setup lang="ts">
  import { computed, provide, ref } from 'vue';
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';
  import ProvInjParent from '@/components/api/composition/ProvideInject/ProvInjParent.vue';

  const getRandNum = () => (Math.random() * 9 + 1) >>> 0;
  const number = ref(getRandNum());
  const isEven = computed(() => !(number.value % 2));

  provide('isGrandNumEven', isEven);
</script>

<template>
  <div class="p-4">
    <p class="mb-5 p-3">
      Here we will privide a computed data from the grand to children without passing any props to
      the parent to let them know if the number on the grand is even or odd using
      <span class="imp-txt">provide/inject</span> apis.
    </p>

    <CustomFieldset legend="Grand">
      <div class="flex w-full flex-wrap gap-3 *:basis-[100px]">
        <div class="custom-output flex-1">{{ number }}</div>

        <button class="custom-button flex-1 text-2xl" @click="number = getRandNum()">
          <i class="fa-solid fa-shuffle"></i>
        </button>
      </div>

      <ProvInjParent />
    </CustomFieldset>
  </div>
</template>
