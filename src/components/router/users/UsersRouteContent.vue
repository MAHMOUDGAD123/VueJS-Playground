<script lang="ts" setup>
  import AppRoute from '@/components/_global/AppRoute.vue';
  import { lazyFetch } from '@/assets/tools/lazy-fetch';
  import { isPROD } from '@/assets/tools/globals';
  import type { From1To10 } from '@/router/types';
  import { onMounted, ref } from 'vue';

  const users = ref<UserData[] | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref<boolean>(true);

  onMounted(async () => {
    const url = isPROD
      ? 'https://jsonplaceholder.typicode.com/users'
      : 'http://localhost:3000/api/users';

    const { data, err, ok } = await lazyFetch<UserData[]>(url);

    if (ok) {
      users.value = data;
    } else {
      error.value = err;
    }
    loading.value = false;
  });
</script>

<template>
  <AppRoute route-name="users" :loading :error="error!" :loading-timeout="0">
    <template #loading>
      <LoadingSkeleton>
        <section class="flex flex-wrap justify-center gap-3">
          <div class="h-10 w-30 rounded-xl" v-for="n in 15" :key="n"></div>
        </section>
      </LoadingSkeleton>
    </template>

    <div class="flex flex-wrap justify-center gap-3">
      <RouterLink
        class="custom-button"
        v-for="user in users"
        :key="user.id"
        :to="{ name: 'user', params: { userid: user.id as From1To10 } }"
        >{{ user.username.split(/[^a-z]/i)[0] }}
      </RouterLink>
    </div>
  </AppRoute>

  <RouterView />
</template>
