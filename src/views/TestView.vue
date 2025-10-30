<script lang="ts" setup>
  import { rand } from '@/assets/tools/helpers';
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';
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
            {{ $route.matched.map((match) => match.name).join(' ➜ ') }}
          </td>
        </tr>
      </tbody>
    </table>

    <CustomFieldset class="mt-10">
      <button
        class="custom-button"
        @click="
          $router.push<'test'>({
            name: 'test',
            params: { first: rand({ min: 1, max: 100 }), last: rand({ min: 1, max: 100 }) },
          })
        "
      >
        Push
      </button>
    </CustomFieldset>
  </div>
</template>
