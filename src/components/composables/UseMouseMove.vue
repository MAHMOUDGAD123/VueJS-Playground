<script setup lang="ts">
 import { computed, useTemplateRef } from 'vue';
 import { useMouseMove } from '@/hooks/useMouseMove';
 import CustomCheckbox from '../_global/CustomCheckbox.vue';
 import CustomSelect from '../_global/CustomSelect.vue';

 const selfEle = useTemplateRef('selfEle');
 const windowEle = window as unknown as HTMLElement;
 const { mouseCoords, targetEleRef, coordsType } = useMouseMove();
 const xyCoords = computed(() => [
  {
   coord: 'X',
   value: mouseCoords.x,
  },
  {
   coord: 'Y',
   value: mouseCoords.y,
  },
 ]);
</script>

<template>
 <div class="flex flex-col gap-5">
  <div class="mx-auto flex flex-wrap items-center justify-center gap-5">
   <div class="mx-auto w-fit">
    <CustomCheckbox
     label="Self"
     name="element"
     :false-value="windowEle"
     :true-value="selfEle?.parentElement"
     v-model="targetEleRef"
    />
   </div>

   <CustomSelect v-model="coordsType" label="Type" class="w-[17ch]">
    <option value="page">page</option>
    <option value="client">client</option>
    <option value="offset">offset</option>
    <option value="screen">screen</option>
   </CustomSelect>
  </div>

  <div
   ref="selfEle"
   class="*:bg-secondary flex flex-wrap justify-center gap-5 *:flex-1 *:basis-[200px]"
  >
   <div
    v-for="({ coord, value }, i) in xyCoords"
    :key="i"
    class="flex rounded-2xl text-center text-xl font-bold"
   >
    <span
     class="bg-primary font-saira w-[4ch] content-center rounded-ss-[inherit] rounded-es-[inherit]"
     >{{ coord }}</span
    >
    <span
     class="text-primary flex-1 rounded-se-[inherit] rounded-ee-[inherit] border-4 border-l-0 p-1.5"
     >{{ value }}</span
    >
   </div>
  </div>
 </div>
</template>
