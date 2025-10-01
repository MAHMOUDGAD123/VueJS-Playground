<script lang="ts">
  export default {
    inject: {
      parentCount: {
        from: 'count',
      },
    },

    data: () => ({}) as { parentCount: number },
  };
</script>

<template>
  <button class="custom-button" @click="++parentCount">
    <i class="fa-solid fa-child text-3xl"></i>
  </button>
</template>
