<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { lazyFetch } from '@/assets/tools/lazy-fetch';
  import { isPROD } from '@/assets/tools/globals';
  import AppRoute from '@/components/_global/AppRoute.vue';
  import LoadingSkeleton from '@/components/_global/LoadingSkeleton.vue';
  import type { From1To10, From1To100 } from '@/router/types';

  const props = defineProps<{
    userid: From1To10;
    postid: From1To100;
  }>();

  const post = ref<PostData | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(true);

  watch(
    [() => props.userid, () => props.postid],
    async (params) => {
      const [userid, postid] = params;
      const actualPostId = ((+userid - 1) * 10 + +postid) as From1To100;
      const url = isPROD
        ? `https://jsonplaceholder.typicode.com/posts/${actualPostId}`
        : `http://localhost:3000/api/posts/${actualPostId}`;

      const { data, err, ok } = await lazyFetch<PostData>(url);

      if (ok) {
        post.value = data;
      } else {
        error.value = err;
      }
      loading.value = false;
    },
    { immediate: true },
  );
</script>

<template>
  <AppRoute route-name="userPost" :loading :error="error!" :loading-timeout="0">
    <template #loading>
      <LoadingSkeleton>
        <section class="flex flex-col items-center justify-center gap-4">
          <div class="h-16 w-25 rounded-2xl"></div>
          <div class="h-8 w-9 rounded-md"></div>
          <div class="h-lh w-full rounded-md text-xl"></div>
          <div class="mt-4 h-lh w-full rounded-sm text-[0.5rem]"></div>
          <div class="h-lh w-2/3 rounded-sm text-[0.5rem]"></div>
        </section>
      </LoadingSkeleton>
    </template>

    <div
      class="flex flex-col items-center justify-center gap-4 text-center wrap-anywhere hyphens-auto"
    >
      <i class="fa-solid fa-credit-card text-primary text-6xl"></i>
      <span class="text-primary font-saira text-3xl font-bold"
        >#{{ $props.userid }}/{{ $props.postid }}</span
      >
      <h2 class="text-primary75 text-2xl font-bold">{{ post!.title }}</h2>
      <p class="font-bold">{{ post!.body }}</p>
    </div>
  </AppRoute>
</template>
