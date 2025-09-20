<script setup lang="ts">
 import AppLoader from './AppLoader.vue';

 defineSlots<{
  default?(): unknown;
 }>();
</script>

<template>
 <div class="__skel_loader__">
  <slot>
   <AppLoader />
  </slot>
 </div>
</template>

<style>
 .__skel_loader__ div {
  background-color: var(--color-secondary75);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  contain: content;

  &::before {
   content: '';
   background: linear-gradient(90deg, transparent, var(--color-primary50), transparent);
   width: 150%;
   height: 100%;
   position: absolute;
   transform: translateX(-100%);
   animation: shimmer 1.25s infinite;
   filter: drop-shadow(0 0 10px var(--color-primary));
  }
 }

 @keyframes shimmer {
  100% {
   transform: translateX(100%);
  }
 }
</style>
