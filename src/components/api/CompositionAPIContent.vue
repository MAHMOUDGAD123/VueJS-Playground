<script setup lang="ts">
 import { defineAsyncComponent, onBeforeMount } from 'vue';
 import CustomDetails from '@/components/_global/CustomDetails.vue';

 defineOptions({
  name: 'CompositionAPIContent',
 });

 defineProps<{
  showAll: boolean;
  showIndex: number;
  detailsName: string;
 }>();

 const emit = defineEmits<{
  childCount: [count: number];
 }>();

 type CompType = {
  summary: string;
  comp: object;
 };

 const components: CompType[] = [
  {
   summary: 'Test Area',
   comp: defineAsyncComponent(() => import('@/components/api/composition/Test/TestComp.vue')),
  },
  {
   summary: 'shallowRef/triggerRef',
   comp: defineAsyncComponent(() => import('@/components/api/composition/ShallowRef.vue')),
  },
  {
   summary: 'defineExpose',
   comp: defineAsyncComponent(() => import('@/components/api/composition/Expose/ExposeParent.vue')),
  },
  {
   summary: 'Watchers',
   comp: defineAsyncComponent(() => import('@/components/api/composition/WatchersComp.vue')),
  },
  {
   summary: 'provide/inject',
   comp: defineAsyncComponent(
    () => import('@/components/api/composition/ProvideInject/ProvInjGrand.vue'),
   ),
  },
  {
   summary: 'Fallthrough Attrs',
   comp: defineAsyncComponent(
    () => import('@/components/api/composition/FallthroughAttrs/FallthroughParent.vue'),
   ),
  },
  {
   summary: 'Async Components',
   comp: defineAsyncComponent(
    () => import('@/components/api/composition/AsyncComponents/AsyncCompParent.vue'),
   ),
  },
 ];

 // Tell parent my child count
 onBeforeMount(() => {
  emit('childCount', components.length);
 });
</script>

<template>
 <CustomDetails
  v-for="({ summary, comp }, i) in components"
  :key="i"
  :summary
  :name="detailsName"
  v-show="showAll || showIndex === i"
  :open="!showAll && showIndex === i"
 >
  <component :is="comp" v-if="showAll || showIndex === i" />
 </CustomDetails>
</template>
