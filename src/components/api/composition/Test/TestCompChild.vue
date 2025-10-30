<script lang="ts" setup>
  import { reactive, useCssModule, type VNode } from 'vue';

  defineSlots<{
    default: (props: { data: string }) => VNode[];
  }>();

  const colors = reactive({
    orange: 'orange',
    green: 'green',
    blue: 'dodgerblue',
  });

  const cssModules = useCssModule('cssModules');
</script>

<template>
  <div class="border-4 p-7">
    <div class="flex flex-col gap-3 border-4 p-7">
      <div class="custom-output deep">Deep</div>
      <slot data="Slot"></slot>
      <div class="custom-output global" :class="cssModules['white-border']">Global</div>
      <div class="custom-output" :class="[$style.module, customClasses.bolderWhite]">Module</div>
    </div>
  </div>
</template>

<style scoped>
  :slotted(.slot) {
    background-color: v-bind('colors.orange');
    color: white;
    font-weight: bolder;
  }
</style>

<style module>
  .module {
    background-color: v-bind('colors.green');
  }
</style>

<style module="customClasses">
  .bolderWhite {
    color: white;
    font-weight: bolder;
  }
</style>

<style module="cssModules">
  .white-border {
    border: 4px solid white;
  }
</style>
