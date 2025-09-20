<script setup lang="ts">
 import { computed, ref } from 'vue';
 import { useFetch } from '@/hooks/useFetch';
 import LoadingSkeleton from '@/components/_global/LoadingSkeleton.vue';
 import AppError from '@/components/_global/AppError.vue';

 const userId = ref(1);
 const url = computed(() => `https://jsonplaceholder.typicode.com/users/${userId.value}`);
 const { data, error, loading } = useFetch<UserData>(url, { randomDelay: true });
</script>

<template>
 <div class="flex items-center justify-center gap-4 text-xl *:aspect-square *:rounded-full *:p-0">
  <button class="custom-button w-[40px]" @click="--userId" :disabled="userId <= 1">
   <i class="fa-solid fa-arrow-left"></i>
  </button>

  <div class="text-primary font-saira custom-output w-[60px] content-center text-2xl">
   {{ userId }}
  </div>

  <button class="custom-button w-[40px]" @click="++userId" :disabled="userId >= 10">
   <i class="fa-solid fa-arrow-right"></i>
  </button>
 </div>

 <LoadingSkeleton v-if="loading">
  <section class="mt-5 flex flex-col items-center justify-center gap-3 p-5">
   <div class="aspect-square w-[75px] rounded-full"></div>
   <div class="h-[30px] w-full max-w-2xs rounded-2xl"></div>
  </section>
 </LoadingSkeleton>

 <AppError v-if="error" :error />

 <div class="mt-5 flex flex-col gap-3 p-5 text-2xl font-bold" v-if="data">
  <i class="fa-solid fa-circle-user text-primary text-7xl"></i>
  <div>{{ data.username }}</div>
 </div>
</template>
