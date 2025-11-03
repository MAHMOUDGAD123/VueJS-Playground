<script lang="ts">
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';

  export default {
    components: {
      CustomFieldset,
    },

    beforeRouteEnter() {
      console.log('beforeRouteEnter');
    },
    beforeRouteUpdate() {
      console.log('beforeRouteUpdate');
    },
    beforeRouteLeave() {
      console.log('beforeRouteLeave');
      // const answer = window.confirm('Do you really want to leave the test area?');
      // if (!answer) return false;
    },
  };
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
          <th>Matches</th>
          <td>
            {{ $route.matched.map((match) => match.name).join(' ➜ ') }}
          </td>
        </tr>
      </tbody>
    </table>

    <nav
      class="justify-cente my-7 flex list-none flex-wrap items-center justify-center gap-2 rounded-2xl"
    >
      <RouterLink class="custom-link" :to="{ name: 'test' }">/</RouterLink>
      <RouterLink class="custom-link" :to="{ name: 'testChild', params: { first: 1, last: 2 } }"
        >views</RouterLink
      >
      <RouterLink class="custom-link" :to="{ name: 'newRouteTest' }">dynamic</RouterLink>
    </nav>

    <AppRoute route-name="test">
      <CustomFieldset class="mx-auto max-w-2xl">
        <div class="font-saira text-primary text-center text-2xl">TEST ROUTE</div>
      </CustomFieldset>
    </AppRoute>

    <div class="mx-auto flex max-w-2xl flex-col gap-4">
      <RouterView name="viewOne" />
      <RouterView name="viewTwo" />
    </div>

    <!-- Dynamic route test -->
    <RouterView />
  </div>
</template>
