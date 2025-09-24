<script setup lang="ts">
 import { onBeforeMount } from 'vue';
 import CustomDetails from '@/components/_global/CustomDetails.vue';
 import { lazyComponent } from '@/assets/tools/lazy-component';

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
   comp: lazyComponent(() => import('@/components/api/composition/Test/TestComp.vue')),
  },
  {
   summary: 'shallowRef/triggerRef',
   comp: lazyComponent(() => import('@/components/api/composition/ShallowRef.vue')),
  },
  {
   summary: 'defineExpose',
   comp: lazyComponent(() => import('@/components/api/composition/Expose/ExposeParent.vue')),
  },
  {
   summary: 'Watchers',
   comp: lazyComponent(() => import('@/components/api/composition/WatchersComp.vue')),
  },
  {
   summary: 'provide/inject',
   comp: lazyComponent(() => import('@/components/api/composition/ProvideInject/ProvInjGrand.vue')),
  },
  {
   summary: 'Fallthrough Attrs',
   comp: lazyComponent(
    () => import('@/components/api/composition/FallthroughAttrs/FallthroughParent.vue'),
   ),
  },
  {
   summary: 'Async Components',
   comp: lazyComponent(
    () => import('@/components/api/composition/AsyncComponents/AsyncCompParent.vue'),
   ),
  },
  {
   summary: '<KeepAlive> Demo',
   comp: lazyComponent(() => import('@/components/api/composition/KeepAlive/KeepaliveComp.vue')),
  },
  {
   summary: '<Teleport> Demo',
   comp: lazyComponent(() => import('@/components/api/composition/Teleport/TeleportDemo.vue')),
  },
  {
   summary: '<Suspense> Demo',
   comp: lazyComponent(() => import('@/components/api/composition/Suspense/SuspenseDemo.vue')),
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
