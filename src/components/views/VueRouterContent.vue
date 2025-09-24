<script setup lang="ts">
 import { CustomFieldset, AppRoute } from '@/components';
</script>

<template>
 <div>
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
   <RouterLink class="custom-link" :to="{ name: 'vueRouter' }">/</RouterLink>
   <RouterLink class="custom-link" :to="{ name: 'users' }">users</RouterLink>
   <RouterLink class="custom-link" :to="{ name: 'posts' }">posts</RouterLink>
  </nav>

  <CustomFieldset>
   <AppRoute route-name="vueRouter">
    <div class="font-saira text-primary text-center text-2xl">VUE ROUTER</div>
   </AppRoute>

   <RouterView />
  </CustomFieldset>
 </div>
</template>
