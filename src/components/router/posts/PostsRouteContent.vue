<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { lazyFetch } from '@/assets/tools/lazy-fetch';
  import AppRoute from '@/components/_global/AppRoute.vue';
  import { isPROD } from '@/assets/tools/globals';
  import LoadingSkeleton from '@/components/_global/LoadingSkeleton.vue';
  import type { From1To100 } from '@/types/custom-routes';

  const posts = ref<PostData[] | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(true);
  const numberFormatter = new Intl.NumberFormat('EN-US', {
    minimumIntegerDigits: 3,
  });

  const url = isPROD
    ? `https://jsonplaceholder.typicode.com/posts`
    : `http://localhost:3000/api/posts`;

  onMounted(async () => {
    const { data, err, ok } = await lazyFetch<PostData[]>(url);

    if (ok) {
      posts.value = data;
    } else {
      error.value = err;
    }
    loading.value = false;
  });
</script>

<template>
  <AppRoute route-name="posts" :loading :error="error!" :loading-timeout="0">
    <template #loading>
      <LoadingSkeleton>
        <section class="flex flex-wrap justify-center gap-3">
          <div class="h-10 w-30 rounded-xl" v-for="n in 15" :key="n"></div>
        </section>
      </LoadingSkeleton>
    </template>

    <div class="grid-auto-fill-90 grid justify-center gap-3">
      <RouterLink
        class="custom-button"
        v-for="post in posts"
        :key="post.id"
        :to="{ name: 'post', params: { postid: post.id as From1To100 } }"
        >Post {{ numberFormatter.format(post.id) }}</RouterLink
      >
    </div>
  </AppRoute>

  <RouterView />
</template>
