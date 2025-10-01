<script setup lang="ts">
  import { onBeforeMount } from 'vue';
  import CustomDetails from '@/components/_global/CustomDetails.vue';
  import { lazyComponent } from '@/assets/tools/lazy-component';

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
      summary: 'Test Area',
      comp: lazyComponent(() => import('@/components/api/options/Test/TestOpt.vue')),
    },
    {
      summary: 'CounterOpt',
      comp: lazyComponent(() => import('@/components/api/options/Counter/CounterOpt.vue')),
    },
    {
      summary: 'LifeCycleOpt',
      comp: lazyComponent(() => import('@/components/api/options/LifeCycleOpt.vue')),
    },
    {
      summary: 'SayHiOpt',
      comp: lazyComponent(() => import('@/components/api/options/SayHiEmit/SayHiOpt.vue')),
    },
    {
      summary: 'SlottedFormOpt',
      comp: lazyComponent(() => import('@/components/api/options/SlottedForm/SlottedFormOpt.vue')),
    },
    {
      summary: 'MouseTrackerOpt',
      comp: lazyComponent(
        () => import('@/components/api/options/MouseTracker/MouseTrackerOpt.vue'),
      ),
    },
    {
      summary: 'KeepAliveCompOpt',
      comp: lazyComponent(
        () => import('@/components/api/options/KeepAliveComp/KeepAliveCompOpt.vue'),
      ),
    },
    {
      summary: 'v-model',
      comp: lazyComponent(() => import('@/components/api/options/VModelOpt.vue')),
    },
    {
      summary: 'Custom Directives',
      comp: lazyComponent(() => import('@/components/api/options/CustomDirectivesOpt.vue')),
    },
    {
      summary: 'Mixins',
      comp: lazyComponent(() => import('@/components/api/options/MixinsTestOpt.vue')),
    },
    {
      summary: 'Computed',
      comp: lazyComponent(() => import('@/components/api/options/ComputedOpt.vue')),
    },
    {
      summary: 'Watchers',
      comp: lazyComponent(() => import('@/components/api/options/WatcherOpt.vue')),
    },
    {
      summary: 'Provide/Inject',
      comp: lazyComponent(
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
