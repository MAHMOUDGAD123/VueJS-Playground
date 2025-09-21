<script setup lang="ts">
 import { computed, ref, watch } from 'vue';
 import { _Storage } from '@/assets/tools/storage';
 import { useStorage } from '@/hooks/useStorage';
 import { CompositionAPIContent, APIModeSwitch, OptionsAPIContent } from '@/components';

 defineOptions({ name: 'OptVsCompView' });

 const detailsName = 'example';
 const apiChildCount = ref(0); // API Mode children count

 const apiMode = useStorage<boolean>({
  initialValue: false,
  storeKey: '__api_mode__',
  storeType: 'localStorage',
 });

 /* API MODE */
 const toggleAPIMode = () => {
  apiMode.value = !apiMode.value;
 };

 /* SHOW ALL */
 const showAllLocStorageKey = computed(() =>
  apiMode.value ? '__comp_api_show_all__' : '__opt_api_show_all__',
 );
 const showAll = ref(_Storage.read<boolean>(showAllLocStorageKey.value, 'localStorage') ?? false);
 const toggleShowAll = () => {
  _Storage.save(showAllLocStorageKey.value, (showAll.value = !showAll.value), 'localStorage');
 };

 /* SHOW INDEX */
 const showIndexLocStorageKey = computed(() =>
  apiMode.value ? '__comp_api_show_idx__' : '__opt_api_show_idx__',
 );
 const showIndex = ref(_Storage.read<number>(showIndexLocStorageKey.value, 'localStorage') ?? 0);
 const setShowIndex = (val: number) => {
  _Storage.save(showIndexLocStorageKey.value, (showIndex.value = val), 'localStorage');
 };

 watch(
  apiMode,
  () => {
   // update the data from localStorage on (apiMode) change
   showAll.value = _Storage.read<boolean>(showAllLocStorageKey.value, 'localStorage') ?? false;
   showIndex.value = _Storage.read<number>(showIndexLocStorageKey.value, 'localStorage') ?? 0;
  },
  { immediate: true },
 );
</script>

<template>
 <div>
  <APIModeSwitch :apiMode @toggle-api-mode="toggleAPIMode" />

  <div
   class="bg-card mx-auto mb-5 flex max-w-[500px] flex-col items-center gap-5 rounded-xl p-5 select-none"
  >
   <!-- show all toggle -->
   <label
    class="bg-primary10 duration-global flex w-fit cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition-colors"
    :style="{
     backgroundColor: showAll ? 'var(--color-primary75)' : 'var(--color-secondary)',
    }"
   >
    Show All
    <input
     type="checkbox"
     name="showall"
     :checked="showAll"
     @change="toggleShowAll"
     v-show="false"
     :key="apiMode ? 'comp' : 'opt'"
    />
   </label>

   <!-- show indices -->
   <div
    v-if="!showAll"
    :key="apiMode ? 'comp' : 'opt'"
    class="border-secondary flex flex-wrap items-center justify-center gap-3 rounded-xl border-2 p-3"
   >
    <label
     v-for="i in Array(apiChildCount)
      .fill(0)
      .map((_, i) => i)"
     :key="i"
     class="duration-global font-saira aspect-square w-[35px] cursor-pointer content-center rounded-full text-center transition-colors"
     :style="{
      backgroundColor: showIndex === i ? 'var(--color-primary)' : 'var(--color-secondary)',
     }"
    >
     {{ i + 1 }}
     <input
      type="radio"
      name="showIndex"
      :value="showIndex"
      @change="setShowIndex(i)"
      class="pointer-events-none absolute opacity-0"
     />
    </label>
   </div>
  </div>

  <div class="content">
   <CompositionAPIContent
    v-if="apiMode"
    v-bind="{ showAll, showIndex, detailsName }"
    @childCount="(childCount) => (apiChildCount = childCount)"
   ></CompositionAPIContent>

   <OptionsAPIContent
    v-else
    v-bind="{ showAll, showIndex, detailsName }"
    @childCount="(childCount) => (apiChildCount = childCount)"
   ></OptionsAPIContent>
  </div>
 </div>
</template>

<style>
 .content {
  columns: 400px auto;
  column-fill: balance;
  gap: 20px;

  & > details {
   break-inside: avoid;
   margin-bottom: 20px;
  }
 }
</style>
