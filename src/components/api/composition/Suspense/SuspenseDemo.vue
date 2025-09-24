<script setup lang="ts">
 import { defineAsyncComponent } from 'vue';
 import { rand, waitFor } from '@/assets/tools/helpers';
 import SuspenseMe from '@/components/api/composition/Suspense/SuspenseMe.vue';
 import AwatiedComponent from '@/components/api/composition/Suspense/AwaitedComponent.vue';
 import CustomFieldset from '@/components/_global/CustomFieldset.vue';
 import AppError from '@/components/_global/AppError.vue';
 import TextSkeletonLoader from '@/components/api/composition/Suspense/TextSkeletonLoader.vue';
 import FieldsetSkeletonLoader from '@/components/api/composition/Suspense/FieldsetSkeletonLoader.vue';

 const AsyncComponent = defineAsyncComponent({
  loader: async () => {
   await waitFor(rand({ min: 3000, max: 5000 }));
   if (rand({ min: 1, max: 10 }) === 3) {
    throw 'Component failed to load AsyncComponent';
   }
   return import('@/components/api/composition/Suspense/AsyncComponent.vue');
  },
 });

 const UnSuspensibleComponent = defineAsyncComponent({
  loader: async () => {
   await waitFor(rand({ min: 7000, max: 15000 }));
   if (rand({ min: 1, max: 10 }) === 7) {
    throw 'Component failed to load NoneSubpensibleComponent';
   }
   return import('@/components/api/composition/Suspense/UnSuspensibleComponent.vue');
  },
  suspensible: false,
  loadingComponent: TextSkeletonLoader,
  errorComponent: AppError,
 });
</script>

<template>
 <div class="flex flex-col gap-5 p-7">
  <SuspenseMe>
   <template #default>
    <CustomFieldset legend="Awaited Comp">
     <AwatiedComponent />
    </CustomFieldset>

    <CustomFieldset legend="Async Comp">
     <AsyncComponent />
    </CustomFieldset>

    <CustomFieldset legend="Async Comp">
     <UnSuspensibleComponent />
    </CustomFieldset>
   </template>

   <template #fallback>
    <section class="flex flex-col gap-5">
     <FieldsetSkeletonLoader />
     <FieldsetSkeletonLoader />
     <FieldsetSkeletonLoader />
    </section>
   </template>
  </SuspenseMe>
 </div>
</template>
