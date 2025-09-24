<script setup lang="ts">
 import { rand, waitFor } from '@/assets/tools/helpers';
 import { ref } from 'vue';

 const showData = ref(false);
 await waitFor(rand({ min: 1000, max: 3000 }));
 showData.value = true;
</script>

<template>
 <div v-if="showData" class="font-saira text-xl font-bold text-[#c586c0]">Awaited Component</div>
</template>
