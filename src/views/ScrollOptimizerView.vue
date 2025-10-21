<script setup lang="ts">
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';
  import ScrollerRecyle from '@/components/_global/ScrollerRecyle.vue';
  import ToggleSwitch from '@/components/_global/ToggleSwitch.vue';
  import { useStorage } from '@/hooks/useStorage';

  const itemHeight = 70;
  const totalCount = 10 ** 5;
  const containerHeight = 300;
  const items = Array.from({ length: totalCount }).map((_, i) => i + 1);

  // toggle
  const showFast = useStorage<boolean>('__fast_slow_test__', 'localStorage', false);
</script>

<template>
  <div class="flex flex-col gap-3">
    <ToggleSwitch
      :state="showFast"
      :modes="{ one: 'slow', two: 'fast' }"
      @toggleStateEmit="showFast = !showFast"
    />

    <div class="custom-output font-saira mx-auto w-fit text-center">
      {{ totalCount.toExponential() }} item
    </div>

    <CustomFieldset v-if="showFast" legend="Fast" class="border-primary rounded-2xl border-5">
      <ScrollerRecyle :items="items" :itemHeight :containerHeight class="flex flex-col gap-2">
        <template #default="{ visibleItems }">
          <div
            v-for="n in visibleItems"
            :key="n"
            :style="{ height: `${itemHeight}px` }"
            class="custom-output content-center text-center text-3xl font-bold"
          >
            {{ n }}
          </div>
        </template>
      </ScrollerRecyle>
    </CustomFieldset>

    <CustomFieldset v-else legend="Slow" class="border-primary rounded-2xl border-5">
      <div class="flex flex-col gap-2 overflow-y-auto" :style="{ height: `${containerHeight}px` }">
        <div
          v-for="n in totalCount"
          :key="n"
          :style="{ minHeight: `${itemHeight}px` }"
          class="custom-output content-center text-center text-3xl font-bold"
        >
          {{ n }}
        </div>
      </div>
    </CustomFieldset>
  </div>
</template>
