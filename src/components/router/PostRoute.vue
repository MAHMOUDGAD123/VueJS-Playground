<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { lazyFetch } from '@/assets/tools/lazy-fetch';
  import { useRoute } from 'vue-router';
  import AppRoute from '@/components/_global/AppRoute.vue';
  import { isPROD } from '@/assets/tools/globals';
  import LoadingSkeleton from '../_global/LoadingSkeleton.vue';

  const route = useRoute();
  const params = route.params as { postid: string };
  const post = ref<PostData | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(true);

  const url = isPROD
    ? `https://jsonplaceholder.typicode.com/posts/${params.postid}`
    : `http://localhost:3000/api/posts/${params.postid}`;

  onMounted(async () => {
    const { data, err, ok } = await lazyFetch<PostData>(url, {});

    if (ok) {
      post.value = data!;
    } else {
      error.value = err;
    }
    loading.value = false;
  });
</script>

<template>
  <AppRoute route-name="post" :loading :error="error!">
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
      <span class="text-primary font-saira text-3xl font-bold">#{{ post!.id }}</span>
      <h2 class="text-primary75 text-2xl font-bold">{{ post!.title }}</h2>
      <p class="font-bold">{{ post!.body }}</p>
    </div>
  </AppRoute>
</template>
