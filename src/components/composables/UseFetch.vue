<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useFetch } from '@/hooks/useFetch';
  import LoadingSkeleton from '@/components/_global/LoadingSkeleton.vue';
  import AppRoute from '@/components/_global/AppRoute.vue';
  import { isPROD } from '@/assets/tools/globals';

  const userId = ref(1);
  const url = computed(() =>
    isPROD
      ? `https://jsonplaceholder.typicode.com/users/${userId.value}`
      : `http://localhost:3000/api/users/${userId.value}`,
  );
  const { data, error, loading } = useFetch<UserData>(url);
</script>

<template>
  <div class="flex items-center justify-center gap-4 text-xl *:aspect-square *:rounded-full *:p-0">
    <button class="custom-button w-10" @click="--userId" :disabled="userId <= 1">
      <i class="fa-solid fa-arrow-left"></i>
    </button>

    <div class="text-primary font-saira custom-output w-[60px] content-center text-2xl">
      {{ userId }}
    </div>

    <button class="custom-button w-10" @click="++userId" :disabled="userId >= 10">
      <i class="fa-solid fa-arrow-right"></i>
    </button>
  </div>

  <AppRoute route-name="composable" :error="error!" :loading>
    <template #loading>
      <LoadingSkeleton>
        <section class="mt-5 flex flex-col items-center justify-center gap-3 p-5">
          <div class="aspect-square w-[75px] rounded-full"></div>
          <div class="h-[30px] w-full max-w-2xs rounded-2xl"></div>
        </section>
      </LoadingSkeleton>
    </template>

    <div class="mt-5 flex flex-col gap-3 p-5 text-2xl font-bold" v-if="data">
      <i class="fa-solid fa-circle-user text-primary text-7xl"></i>
      <div>{{ data.username }}</div>
    </div>
  </AppRoute>
</template>
