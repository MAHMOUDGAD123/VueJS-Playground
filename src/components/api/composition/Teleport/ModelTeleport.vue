<script setup lang="ts">
  import { ref } from 'vue';

  const showModel = ref(false);
</script>

<template>
  <button class="custom-button mx-auto w-fit" @click="showModel = true">Show Model</button>

  <teleport to="body">
    <transition
      appear
      :duration="500"
      enter-active-class="transition-opacity"
      leave-active-class="transition-opacity"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showModel"
        class="fixed top-1/2 left-1/2 z-9999 flex h-screen w-screen -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[#00000090]"
        @click="(el) => (el.currentTarget === el.target ? (showModel = false) : null)"
      >
        <transition appear name="model">
          <div
            class="bg-secondary mx-1 flex w-full max-w-3xs flex-col gap-5 rounded-xl p-7 text-center"
          >
            <p class="text-primary font-saira text-3xl font-bold wrap-anywhere hyphens-auto">
              TELEPORT MODEL
            </p>
            <button class="custom-button" @click="showModel = false">close</button>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
  .model-enter-active,
  .model-leave-active {
    transition: all 0.5s ease;
  }

  .model-enter-from {
    transform: translateY(50px);
  }

  .model-leave-to {
    transform: translateY(-50px);
  }
</style>
