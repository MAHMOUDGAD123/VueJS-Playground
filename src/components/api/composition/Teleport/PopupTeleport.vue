<script setup lang="ts">
 import { reactive, ref } from 'vue';
 import PopupEle from '@/components/api/composition/Teleport/PopupEle.vue';

 const showPopupCont = ref(false);
 const popups = reactive<{ id: string; idx: number }[]>([]);

 let counter = 0;
 const getId = () => {
  return crypto.randomUUID();
 };

 const addPopup = () => {
  showPopupCont.value = true;
  popups.push({ id: getId(), idx: counter++ });
 };

 const removePopup = (id: string) => {
  const indexof = popups.findIndex(({ id: myId }) => myId === id);
  popups.splice(indexof, 1);

  if (popups.length <= 0) {
   setTimeout(() => {
    showPopupCont.value = false;
   }, 1000);
  }
 };

 // Transitions
 const beforeLeave = (el: Element) => {
  const rect = (el as HTMLElement).getBoundingClientRect();

  // lock current position into CSS custom properties
  (el as HTMLElement).style.setProperty('--leaving-width', rect.width + 'px');
  (el as HTMLElement).style.setProperty('--leaving-height', rect.height + 'px');

  // also fix its absolute coordinates relative to parent
  const parentRect = el.parentElement!.getBoundingClientRect();
  (el as HTMLElement).style.setProperty('--leaving-top', rect.top - parentRect.top + 'px');
  (el as HTMLElement).style.setProperty('--leaving-left', rect.left - parentRect.left + 'px');
 };
</script>

<template>
 <button class="custom-button mx-auto w-fit" @click="addPopup">Add Popup</button>

 <teleport to="body">
  <TransitionGroup
   v-if="showPopupCont"
   appear
   mode="out-in"
   name="popup"
   tag="div"
   class="fixed top-0 left-0 z-50 flex w-1/2 max-w-sm flex-col gap-2 p-2"
   @before-leave="beforeLeave"
  >
   <PopupEle
    v-for="{ id, idx } of popups"
    :key="id"
    :id
    :index="idx"
    @close="(id) => removePopup(id)"
   />
  </TransitionGroup>
 </teleport>
</template>

<style scoped>
 .popup-move,
 .popup-enter-active,
 .popup-leave-active {
  transition: all 0.75s ease;
 }

 .popup-leave-active {
  position: absolute;
  /* Set the values */
  width: var(--leaving-width);
  height: var(--leaving-height);
  top: var(--leaving-top);
  left: var(--leaving-left);
 }

 .popup-enter-from {
  opacity: 0;
  transform: translateX(30%);
 }

 .popup-leave-to {
  opacity: 0;
  transform: translateX(30%);
 }
</style>
