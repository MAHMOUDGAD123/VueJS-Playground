<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';
  import AppRoute from '@/components/_global/AppRoute.vue';
  import { lazyFetch } from '@/assets/tools/lazy-fetch';
  import { isPROD } from '@/assets/tools/globals';

  const route = useRoute();
  const params = route.params as { userid: string };
  const user = ref<UserData | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(true);
  const numberFormatter = new Intl.NumberFormat('EN-US', {
    minimumIntegerDigits: 2,
  });

  const url = isPROD
    ? `https://jsonplaceholder.typicode.com/users/${params.userid}`
    : `http://localhost:3000/api/users/${params.userid}`;

  onMounted(async () => {
    const { data, err, ok } = await lazyFetch<UserData>(url, {});

    if (ok) {
      user.value = data;
    } else {
      error.value = err;
    }
    loading.value = false;
  });
</script>

<template>
  <AppRoute route-name="user" :loading :error="error!">
    <section v-if="user" class="flex flex-col items-center justify-center gap-4">
      <i class="fa-solid fa-circle-user text-primary text-6xl"></i>
      <span class="text-primary font-saira text-3xl font-bold">#{{ user.id }}</span>
      <span class="font-bold">{{ user.name }}</span>

      <CustomFieldset legend="Posts">
        <div class="flex flex-wrap justify-center gap-2">
          <RouterLink
            class="custom-button"
            v-for="postId in Array(10)
              .fill(0)
              .map((_, i) => i + 1)"
            :key="postId"
            :to="{ name: 'post', params: { postid: (user.id - 1) * 10 + postId } }"
          >
            Post {{ numberFormatter.format(postId) }}
          </RouterLink>
        </div>
      </CustomFieldset>
    </section>
  </AppRoute>
</template>
