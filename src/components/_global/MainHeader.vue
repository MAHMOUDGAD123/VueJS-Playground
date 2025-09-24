<script setup lang="ts">
 import { RouterLink } from 'vue-router';
 import logoSVG from '@/assets/imgs/logo.svg';

 defineOptions({
  name: 'MainHeader',
 });
</script>

<template>
 <header class="h-header flex items-center justify-center">
  <RouterLink :to="{ name: 'home' }" class="logo">
   <img :src="logoSVG" alt="logo" />
   <span>PLAYGROUND</span>
  </RouterLink>
 </header>
</template>

<style scoped>
 .logo {
  font-weight: bolder;
  font-size: 1.5rem;
  user-select: none;
  transition: color var(--transition-duration-global);
  border: 3px solid var(--color-primary60);
  padding: 2px 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: saira;

  & > img {
   width: 25px;
  }

  &:hover {
   background-color: var(--color-primary10);
   color: var(--color-primary);
  }
 }
</style>
