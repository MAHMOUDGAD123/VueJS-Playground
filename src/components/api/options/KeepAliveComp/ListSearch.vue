<script lang="ts">
  export default {
    name: 'ListSearch',
    props: {
      list: {
        type: Array,
        required: true,
      },
    },

    data: () => ({
      searchKey: '',
    }),
  };
</script>

<template>
  <div class="w-full">
    <input
      class="custom-input mb-5 max-w-[200px]"
      v-model="searchKey"
      type="text"
      placeholder="Search name"
    />

    <div
      class="border-primary flex h-[200px] flex-wrap items-center justify-center gap-4 overflow-auto rounded-md border-4 p-5"
    >
      <span
        class="text-primary bg-primary25 rounded-sm px-3"
        v-for="(name, i) in list.filter((name) =>
          (name as string).toLowerCase().startsWith(searchKey.toLowerCase()),
        )"
        :key="i"
      >
        {{ name }}
      </span>
    </div>
  </div>
</template>

<style scoped></style>
