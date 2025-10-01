<script lang="ts">
  import AppRoute from '@/components/_global/AppRoute.vue';
  import { lazyFetch } from '@/assets/tools/lazy-fetch';
  import { isPROD } from '@/assets/tools/globals';
  import LoadingSkeleton from '../_global/LoadingSkeleton.vue';

  type Data = {
    users: UserData[] | null;
    error: Error | null;
    loading: boolean;
  };

  export default {
    components: { AppRoute, LoadingSkeleton },

    data: (): Data => ({
      users: null,
      error: null,
      loading: true,
    }),

    async mounted() {
      const { data, err, ok } = await lazyFetch<UserData[]>(
        isPROD ? 'https://jsonplaceholder.typicode.com/users' : 'http://localhost:3000/api/users',
        {},
      );

      if (ok) {
        this.users = data;
      } else {
        this.error = err;
      }
      this.loading = false;
    },
  };
</script>

<template>
  <AppRoute route-name="users" :loading :error="error!">
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
        :to="{ name: 'user', params: { userid: user.id } }"
        >{{ user.username.split(/[^a-z]/i)[0] }}
      </RouterLink>
    </div>
  </AppRoute>

  <RouterView />
</template>

<style scoped></style>
