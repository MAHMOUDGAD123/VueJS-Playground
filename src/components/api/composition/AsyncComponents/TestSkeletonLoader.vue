<script setup lang="ts">
  import LoadingSkeleton from '@/components/_global/LoadingSkeleton.vue';
</script>

<template>
  <LoadingSkeleton>
    <section class="flex flex-col justify-center gap-5">
      <div class="mx-auto aspect-square w-[70px] rounded-full p-3 text-7xl"></div>
      <div class="rounded-full p-5"></div>
      <div class="rounded-md py-8"></div>
    </section>
  </LoadingSkeleton>
</template>
