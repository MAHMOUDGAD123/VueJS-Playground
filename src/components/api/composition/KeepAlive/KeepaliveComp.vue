<script setup lang="ts">
 import { ref } from 'vue';
 import CustomRadioList from '@/components/_global/CustomRadioList.vue';
 import KeepAliveChild from '@/components/api/composition/KeepAlive/KeepAliveChild.vue';

 const maxCache = ref(2);
 const showIndex = ref(0);

 const caches = ref([
  { n: 1, cached: false },
  { n: 2, cached: false },
  { n: 3, cached: false },
  { n: 4, cached: false },
  { n: 5, cached: false },
 ]);

 const updateCaches = (num: number) => {
  const idx = caches.value.findIndex(({ n }) => num === n);
  caches.value[idx].cached = true;
  // Make it the 1st element
  caches.value.unshift(...caches.value.splice(idx, 1));
 };
</script>

<template>
 <div class="flex flex-col gap-5 p-5">
  <CustomRadioList :radio-list-count="caches.length" v-model="showIndex" />

  <Transition appear mode="out-in" name="input">
   <KeepAlive :max="maxCache">
    <KeepAliveChild v-if="showIndex === 0" label="ONE" @cached="updateCaches(1)" />
    <KeepAliveChild v-else-if="showIndex === 1" label="TWO" @cached="updateCaches(2)" />
    <KeepAliveChild v-else-if="showIndex === 2" label="THREE" @cached="updateCaches(3)" />
    <KeepAliveChild v-else-if="showIndex === 3" label="FOUR" @cached="updateCaches(4)" />
    <KeepAliveChild v-else label="Five" @cached="updateCaches(5)" />
   </KeepAlive>
  </Transition>

  <div class="flex flex-col gap-3">
   <p>
    Max cache <span class="text-primary font-bold">{{ maxCache }}</span>
   </p>

   <div class="flex justify-center gap-3 *:aspect-square *:w-8 *:rounded-full *:p-0">
    <button class="custom-button" @click="++maxCache" :disabled="maxCache >= caches.length">
     <i class="fa-solid fa-plus"></i>
    </button>
   </div>
  </div>

  <h2 class="bg-primary50 mt-2 mask-x-from-70%">LRU Cache</h2>

  <TransitionGroup class="flex flex-wrap justify-center gap-3" appear tag="ul" name="cache">
   <li
    v-for="({ n, cached }, i) of caches"
    :key="n"
    :class="`${cached && i < maxCache ? 'bg-primary' : 'bg-secondary75'} aspect-square basis-[50px] content-center rounded-2xl font-bold`"
   >
    {{ n }}
   </li>
  </TransitionGroup>
 </div>
</template>

<style scoped>
 /* inputs */
 .input-enter-active,
 .input-leave-active {
  transition:
   opacity 0.25s,
   transform 0.25s;
 }

 .input-enter-from,
 .input-leave-to {
  opacity: 0;
  transform: scale3d(0.95, 0.95, 0.95);
 }

 /* cache */
 .cache-move,
 .cache-enter-active,
 .cache-leave-active {
  transition: all 0.5s ease;
 }
</style>
