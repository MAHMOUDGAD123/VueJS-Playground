<script lang="ts" setup>
 import { lazyFetch } from '@/assets/tools/helpers';
 import { onMounted, ref } from 'vue';
 import AppRoute from '../_global/AppRoute.vue';

 const posts = ref<PostData[]>([]);
 const error = ref<Error | null>(null);
 const loading = ref(true);
 const numberFormatter = new Intl.NumberFormat('EN-US', {
  minimumIntegerDigits: 3,
 });

 onMounted(async () => {
  const { data, err, ok } = await lazyFetch({
   url: `https://jsonplaceholder.typicode.com/posts`,
   randomDelay: true,
  });

  if (ok) {
   posts.value = data as PostData[];
  } else {
   error.value = err;
  }
  loading.value = false;
 });
</script>

<template>
 <AppRoute route-name="posts" :loading :error="error!">
  <div class="flex flex-wrap justify-center gap-3">
   <RouterLink
    class="custom-button"
    v-for="post in posts"
    :key="post.id"
    :to="{ name: 'post', params: { postid: post.id } }"
    >Post {{ numberFormatter.format(post.id) }}</RouterLink
   >
  </div>
 </AppRoute>

 <RouterView />
</template>
