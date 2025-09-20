<script setup lang="ts">
 defineOptions({
  name: 'CustomDetails',
 });

 defineProps<{
  summary: string;
  name?: string;
  open?: boolean;
 }>();

 const emit = defineEmits<{
  toggleOpen: [open: boolean];
 }>();
</script>

<template>
 <details :name :open @toggle="emit('toggleOpen', ($event.target as HTMLDetailsElement).open)">
  <summary class="select-none">{{ summary }}</summary>
  <div class="content">
   <slot></slot>
  </div>
 </details>
</template>

<style>
 details {
  width: 100%;
  text-align: center;
  counter-increment: summary;

  &::details-content {
   padding: 0;
   margin: 0;
   height: 0;
   overflow: hidden;
   transition-property: height, content-visibility;
   transition-duration: 500ms;
   transition-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);
   transition-behavior: allow-discrete;
  }

  & > summary {
   padding: 10px 20px;
   background-color: var(--color-primary50);
   gap: 15px;
   font-family: Arial;
   cursor: pointer;
   transition: background-color var(--transition-duration-global);
   font-size: 1.2rem;
   font-family: monospace;
   text-align: start;
   word-break: break-all;
   hyphens: auto;

   &:hover {
    background-color: var(--color-primary60);
   }

   &::marker {
    content: none;
   }

   &::before {
    content: counter(summary) ' - ';
    font-weight: bolder;
    border-radius: 100px;
    text-align: center;
    align-content: center;
    transition: background-color var(--transition-duration-global);
   }
  }

  & > .content {
   background-color: var(--color-primary10);
   border: 3px solid var(--color-primary10);
   border-top: none;
   transition: border-color var(--transition-duration-global);
  }

  &[open] {
   &::details-content {
    height: auto;
   }

   & > .content {
    border-color: var(--color-primary);
   }

   & > summary {
    background-color: var(--color-primary);
   }
  }

  & .title {
   padding: 5px;
   border-radius: 5px;
   font-weight: bolder;
   counter-increment: title;
   background-image: linear-gradient(
    90deg,
    var(--color-secondary),
    var(--color-primary75),
    var(--color-secondary)
   );
   position: relative;
   contain: content;

   &::before {
    content: '(' counter(title, upper-alpha) ') ';
   }
  }
 }
</style>
