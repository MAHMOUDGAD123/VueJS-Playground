<script setup lang="ts">
 const props = defineProps<{
  delayIndex?: number;
  delay?: number;
 }>();

 const beforeApear = (el: Element) => {
  (el as HTMLElement).style.transitionDelay =
   `calc(${props.delayIndex || 0} * ${props.delay || 0.2}s)`;
 };
</script>

<template>
 <Transition name="scale-up" appear @before-appear="beforeApear">
  <slot></slot>
 </Transition>
</template>

<style>
 /* Transitions */
 .scale-up-enter-active,
 .scale-up-leave-active {
  transition-property: opacity, transform;
  transition-duration: 1s;
  transition-timing-function: ease, linear(0, 1, 0.5, 1);
 }
 .scale-up-enter-from,
 .scale-up-leave-to {
  transform: scaleX(0.75) scaleY(0.75);
  opacity: 0;
 }
</style>
