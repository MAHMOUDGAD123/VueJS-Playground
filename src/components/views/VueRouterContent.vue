<script setup lang="ts">
  import AppRoute from '@/components/_global/AppRoute.vue';
  import CustomFieldset from '../_global/CustomFieldset.vue';
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
        <tr>
          <th>Matches</th>
          <td>
            {{
              $route.matched
                .filter((match) => match.name)
                .map((match) => match.name)
                .join(' ➜ ')
            }}
          </td>
        </tr>
      </tbody>
    </table>

    <nav
      class="justify-cente my-7 flex list-none flex-wrap items-center justify-center gap-2 rounded-2xl"
    >
      <RouterLink class="custom-link" :to="{ name: 'vueRouter' }">/</RouterLink>
      <RouterLink class="custom-link" :to="{ name: 'users' }">users</RouterLink>
      <RouterLink class="custom-link" :to="{ name: 'posts' }">posts</RouterLink>
      <RouterLink class="custom-link" :to="{ name: 'newRouteTest' }">dynamic</RouterLink>
    </nav>

    <CustomFieldset
      :icon="{ iconSrc: 'vuerouter' }"
      class="border-primary mx-auto grid w-full max-w-2xl items-center justify-stretch gap-5 rounded-md border-5 px-5 py-7"
    >
      <AppRoute route-name="vueRouter">
        <div class="font-saira text-primary text-center text-2xl">VUE ROUTER</div>
      </AppRoute>

      <RouterView />
    </CustomFieldset>
  </div>
</template>
