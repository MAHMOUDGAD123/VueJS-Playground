<script setup lang="ts">
  import { defineAsyncComponent, onBeforeMount } from 'vue';
  import CustomDetails from '@/components/_global/CustomDetails.vue';

  defineOptions({
    name: 'OptionAPIContent',
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
      summary: 'CounterOpt',
      comp: defineAsyncComponent(() => import('@/components/api/options/Counter/CounterOpt.vue')),
    },
    {
      summary: 'LifeCycleOpt',
      comp: defineAsyncComponent(() => import('@/components/api/options/LifeCycleOpt.vue')),
    },
    {
      summary: 'SayHiOpt',
      comp: defineAsyncComponent(() => import('@/components/api/options/SayHiEmit/SayHiOpt.vue')),
    },
    {
      summary: 'SlottedFormOpt',
      comp: defineAsyncComponent(
        () => import('@/components/api/options/SlottedForm/SlottedFormOpt.vue'),
      ),
    },
    {
      summary: 'MouseTrackerOpt',
      comp: defineAsyncComponent(
        () => import('@/components/api/options/MouseTracker/MouseTrackerOpt.vue'),
      ),
    },
    {
      summary: 'KeepAliveCompOpt',
      comp: defineAsyncComponent(
        () => import('@/components/api/options/KeepAliveComp/KeepAliveCompOpt.vue'),
      ),
    },
    {
      summary: 'v-model',
      comp: defineAsyncComponent(() => import('@/components/api/options/VModelOpt.vue')),
    },
    {
      summary: 'Custom Directives',
      comp: defineAsyncComponent(() => import('@/components/api/options/CustomDirectivesOpt.vue')),
    },
    {
      summary: 'Mixins',
      comp: defineAsyncComponent(() => import('@/components/api/options/MixinsTestOpt.vue')),
    },
    {
      summary: 'Computed',
      comp: defineAsyncComponent(() => import('@/components/api/options/ComputedOpt.vue')),
    },
    {
      summary: 'Watchers',
      comp: defineAsyncComponent(() => import('@/components/api/options/WatcherOpt.vue')),
    },
    {
      summary: 'Provide/Inject',
      comp: defineAsyncComponent(
        () => import('@/components/api/options/ProvideInject/ProvideInjectOpt.vue'),
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
