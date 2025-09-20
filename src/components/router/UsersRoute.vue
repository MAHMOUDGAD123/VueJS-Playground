<script lang="ts">
 import { lazyFetch } from '@/assets/tools/helpers';
 import AppRoute from '../_global/AppRoute.vue';

 export default {
  components: { AppRoute },

  data: () => ({
   users: [] as UserData[],
   error: null as Error | null,
   loading: true,
  }),

  async mounted() {
   const { data, err, ok } = await lazyFetch({
    url: `https://jsonplaceholder.typicode.com/users`,
    randomDelay: true,
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
 <AppRoute route-name="users" :loading :error="error!">
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
