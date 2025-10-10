<script lang="ts" setup generic="T">
  import { computed, onMounted, ref, useTemplateRef } from 'vue';

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps<{
    items: T[];
    itemHeight: number;
    containerHeight: number;
  }>();

  defineSlots<{
    default: (props: { visibleItems: T[] }) => unknown;
  }>();

  // Data
  const start = ref(0);
  const end = ref(0);
  const offset = ref(0);

  // Computed
  const totalHeight = computed(() => props.items.length * props.itemHeight);
  const visibleCount = computed(() => props.containerHeight / props.itemHeight);
  const visibleItems = computed(() => props.items.slice(start.value, end.value));

  const container = useTemplateRef<HTMLDivElement>('container');

  // Methods
  const updateVisible = () => {
    const scrollTop = container.value!.scrollTop;
    const first = Math.floor(scrollTop / props.itemHeight);
    const last = first + visibleCount.value + 5; // small buffer
    start.value = first;
    end.value = last;
    offset.value = first * props.itemHeight;
  };

  const onScroll = () => {
    updateVisible();
  };

  onMounted(() => {
    updateVisible();
  });
</script>

<template>
  <div
    ref="container"
    class="scroller"
    :style="{ height: `${containerHeight}px` }"
    @scroll="onScroll"
  >
    <!-- Spacer making the scroll area huge -->
    <div :style="{ height: totalHeight + 'px', position: 'relative' }">
      <!-- The items actually rendered -->
      <div class="items" :style="{ transform: `translateY(${offset}px)` }" v-bind="$attrs">
        <slot :visibleItems></slot>
      </div>
    </div>
  </div>
</template>

<style>
  .scroller {
    overflow-y: auto;
  }

  .item {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    content-visibility: auto;
  }
</style>
