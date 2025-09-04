<script lang="ts">
  import { lazyFetch } from '@/assets/tools/helpers';
  import AppRoute from '../_global/AppRoute.vue';

  export default {
    components: { AppRoute },

    data: () => ({
      users: [] as UserData[],
      error: undefined as Error | undefined,
      loading: true,
    }),

    async mounted() {
      const apiURL = import.meta.env.DEV
        ? 'http://localhost:3000/api/'
        : 'https://mock-server-chi-nine.vercel.app/api/';

      const { data, err, ok } = await lazyFetch({
        url: `${apiURL}users`,
      });

      if (ok) {
        this.users = data as UserData[];
      } else {
        this.error = err;
      }
      this.loading = false;
    },
  };
</script>

<template>
  <AppRoute route-name="users" :loading :error>
    <div class="flex flex-wrap justify-center gap-3">
      <RouterLink
        class="custom-button"
        v-for="user in users"
        :key="user.id"
        :to="{ name: 'user', params: { userid: user.id } }"
        >{{ user.username.split(/[^a-z]/i)[0] }}</RouterLink
      >
    </div>
  </AppRoute>

  <RouterView />
</template>

<style scoped></style>
