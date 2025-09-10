<script setup lang="ts">
  import { CustomFieldset, AppRoute } from '@/components';

  defineOptions({ name: 'VueRouterView' });
</script>

<template>
  <table class="custom-table mx-auto w-full max-w-2xl text-center">
    <caption class="bg-primary py-1 font-bold">
      ROUTE INFO
    </caption>
    <tbody>
      <tr>
        <th>Name</th>
        <td>{{ $route.name }}</td>
      </tr>
      <tr>
        <th>FullPath</th>
        <td>{{ $route.fullPath }}</td>
      </tr>
      <tr>
        <th>Params</th>
        <td>{{ $route.params }}</td>
      </tr>
      <tr>
        <th>Query</th>
        <td>{{ $route.query }}</td>
      </tr>
      <tr>
        <th>Hash</th>
        <td>{{ $route.hash || '---' }}</td>
      </tr>
    </tbody>
  </table>

  <nav
    class="justify-cente my-7 flex list-none flex-wrap items-center justify-center gap-2 rounded-2xl"
  >
    <RouterLink class="custom-link" :to="{ name: 'users' }">users</RouterLink>
    <RouterLink class="custom-link" :to="{ name: 'posts' }">posts</RouterLink>
  </nav>

  <CustomFieldset class="">
    <AppRoute route-name="vueRouter">
      <div
        class="text-primary25 font-saira w-fit animate-pulse text-center text-[clamp(100px,35vw,200px)] opacity-75"
      >
        <i class="fa-solid fa-route"></i>
      </div>
    </AppRoute>

    <RouterView />
  </CustomFieldset>
</template>

<style scoped></style>
