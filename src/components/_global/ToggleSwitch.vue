<script setup lang="ts">
  defineOptions({
    name: 'ToggleSwitch',
  });

  defineProps<{
    state: boolean;
    toggleName: string;
    modes: {
      one: string;
      two: string;
    };
  }>();

  const emit = defineEmits(['toggleStateEmit']);
</script>

<template>
  <div
    class="switch-wrapper bg-card xsm:flex-row mx-auto my-5 flex w-fit flex-col items-center justify-center gap-3 rounded-xl px-7 py-5"
    :data-toggle-name="toggleName"
  >
    <span class="mode1" :style="{ opacity: state ? 0.5 : 1 }">{{ modes.one }}</span>

    <div class="switch">
      <input type="checkbox" :checked="state" @change="() => emit('toggleStateEmit')" />
      <span class="slider"></span>
    </div>

    <span class="mode2" :style="{ opacity: state ? 1 : 0.5 }">{{ modes.two }}</span>
  </div>
</template>

<style scoped>
  .switch-wrapper {
    position: relative;

    &::after {
      content: attr(data-toggle-name);
      text-align: center;
      white-space: nowrap;
      position: absolute;
      top: -15px;
      left: 50%;
      translate: -50% -50%;
      color: var(--color-text-sec);
      font-weight: bold;
      font-size: 0.9rem;
      transition: var(--transition-duration-global);
    }

    & > [class^='mode'] {
      font-weight: bold;
      transition: all;
      transition: var(--transition-duration-global);
      padding-bottom: 1px;
    }
  }

  .switch {
    --w: 40px;
    --h: 21px;
    --outline-color: var(--color-primary50);
    position: relative;
    display: inline-block;
    width: var(--w);
    height: var(--h);
    background-color: var(--color-primary10);
    border-radius: 100px;
    font-weight: bolder;
    box-shadow: 0 0 0 3px var(--outline-color);
    transition: all var(--transition-duration-global);

    &:has(input:focus-visible) {
      --outline-color: var(--color-primary);
    }

    & input {
      opacity: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      border-radius: inherit;
      position: relative;

      &:checked + .slider {
        translate: 0 -50%;
      }
    }

    & .slider {
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -100% -50%;
      transition: var(--transition-duration-global);
      border-radius: inherit;
      pointer-events: none;
      background-color: var(--color-primary);
      width: calc(var(--h) - 10%);
      aspect-ratio: 1;
    }
  }
</style>
