<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    data: () => ({}),
  });
</script>

<template>
  <div class="custom-output font-saira">Global Store</div>
  <div class="custom-output">{{ $myData?.name }}</div>
  <div class="custom-output">{{ $myData?.age }}</div>
  <button class="custom-button" @click="$myData.updateData()">Update</button>
</template>
