<script lang="ts" setup>
  import { onBeforeMount, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import AppRoute from '@/components/_global/AppRoute.vue';
  import { lazyFetch } from '@/assets/tools/lazy-fetch';
  import { isPROD } from '@/assets/tools/globals';
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';
  import type { From1To10 } from '@/router/types';

  const route = useRoute<'user'>();
  const params = route.params;
  const user = ref<UserData | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(true);
  const numberFormatter = new Intl.NumberFormat('EN-US', {
    minimumIntegerDigits: 2,
  });

  onBeforeMount(async () => {
    const url = isPROD
      ? `https://jsonplaceholder.typicode.com/users/${params.userid}`
      : `http://localhost:3000/api/users/${params.userid}`;

    const { data, err, ok } = await lazyFetch<UserData>(url);

    if (ok) {
      user.value = data;
    } else {
      error.value = err;
    }
    loading.value = false;
  });
</script>

<template>
  <AppRoute route-name="user" :loading :error="error!" :loading-timeout="0">
    <section v-if="user" class="flex flex-col items-center justify-center gap-4 text-center">
      <i class="fa-solid fa-circle-user text-primary text-7xl"></i>
      <span class="text-primary font-saira text-3xl font-bold">#{{ user.id }}</span>
      <span class="text-2xl font-bold">{{ user.name }}</span>
    </section>

    <CustomFieldset legend="Posts">
      <section class="flex flex-col items-center justify-center gap-4">
        <div class="flex flex-wrap justify-center gap-2">
          <RouterLink
            class="custom-button"
            v-for="postId of Array.from({ length: 10 }).map((_, i) => i + 1)"
            :key="postId"
            :to="{
              name: 'userPost',
              params: { userid: route.params.userid as From1To10, postid: postId as From1To10 },
            }"
          >
            Post {{ numberFormatter.format(postId) }}
          </RouterLink>
        </div>
      </section>
    </CustomFieldset>

    <template #loading>
      <LoadingSkeleton>
        <section class="flex flex-col items-center gap-4 p-1">
          <div class="aspect-square w-[85px] rounded-full"></div>
          <div class="h-[30px] w-[70px] rounded-2xl"></div>
          <div class="h-[25px] w-full max-w-[300px] rounded-2xl"></div>
        </section>
      </LoadingSkeleton>
    </template>
  </AppRoute>

  <RouterView />
</template>
