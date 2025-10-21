<script setup lang="ts">
  import { useStorage } from '@/hooks/useStorage';
  import { lazyComponent } from '@/assets/tools/lazy-component';
  import CustomDetails from '@/components/_global/CustomDetails.vue';

  type ExampleType = {
    summary: string;
    comp: object;
  };

  const opened = useStorage<number>('__last_open_composable__', 'localStorage', 0);

  const examples: ExampleType[] = [
    {
      summary: 'useMouseMove',
      comp: lazyComponent(() => import('@/components/composables/UseMouseMove.vue')),
    },
    {
      summary: 'useFetch',
      comp: lazyComponent(() => import('@/components/composables/UseFetch.vue')),
    },
  ];
</script>

<template>
  <div>
    <h1
      class="font-saira text-primary mt-7 mb-9 text-center text-3xl font-bold [text-transform:uppercase] select-none"
    >
      composable
    </h1>

    <div class="mx-auto flex max-w-[700px] flex-col justify-center gap-5">
      <CustomDetails
        v-for="({ summary, comp }, i) in examples"
        name="example"
        :summary
        :key="i"
        :open="i === opened"
        @toggle-open="(open) => !open || (opened = i)"
      >
        <div class="p-4">
          <component :is="comp"></component>
        </div>
      </CustomDetails>
    </div>
  </div>
</template>

<style scoped>
  h1 {
    filter: drop-shadow(0 0 20px var(--color-primary));
  }
</style>
