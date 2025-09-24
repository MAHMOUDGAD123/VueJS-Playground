<script lang="ts" setup>
 import { onMounted, ref } from 'vue';
 import { lazyFetch } from '@/assets/tools/helpers';
 import { useRoute } from 'vue-router';
 import AppRoute from '@/components/_global/AppRoute.vue';

 const route = useRoute();
 const params = route.params as { postid: string };
 const post = ref<PostData | null>(null);
 const error = ref<Error | null>(null);
 const loading = ref(true);

 onMounted(async () => {
  const { data, err, ok } = await lazyFetch<PostData>({
   url: `https://jsonplaceholder.typicode.com/posts/${params.postid}`,
   ms: 100,
  });

  if (ok) {
   post.value = data!;
   document.title = `Post ${post.value.userId}/${post.value.id}`;
  } else {
   error.value = err;
  }
  loading.value = false;
 });
</script>

<template>
 <AppRoute route-name="post" :loading :error="error!">
  <div class="flex flex-col items-center justify-center gap-4 text-center">
   <i class="fa-solid fa-credit-card text-primary text-6xl"></i>
   <span class="text-primary font-saira text-3xl font-bold">#{{ post!.id }}</span>
   <h2 class="text-primary75 text-2xl font-bold">{{ post!.title }}</h2>
   <p class="font-bold">{{ post!.body }}</p>
  </div>
 </AppRoute>
</template>
