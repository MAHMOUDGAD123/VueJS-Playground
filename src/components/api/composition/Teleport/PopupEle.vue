<script setup lang="ts">
  import { onMounted } from 'vue';

  const props = defineProps<{
    index: number;
    id: string;
  }>();

  const emit = defineEmits<{
    close: [id: string];
  }>();

  let timeoutId: NodeJS.Timeout;

  onMounted(() => {
    timeoutId = setTimeout(() => {
      emit('close', props.id);
    }, 10000);
  });

  const cleanup = () => {
    clearTimeout(timeoutId);
    emit('close', props.id);
  };
</script>

<template>
  <div
    class="bg-secondary flex w-full items-center gap-2 rounded-2xl px-4 py-2 text-center font-bold"
  >
    <span class="text-primary"> Popup {{ index + 1 }} </span>

    <button class="hover:text-primary ml-auto cursor-pointer transition-colors" @click="cleanup">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
</template>
