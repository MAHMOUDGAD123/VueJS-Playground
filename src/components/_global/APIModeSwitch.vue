<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue';
  import { observeElementAtTop } from '@/assets/tools/helpers';
  import ToggleSwitch from './ToggleSwitch.vue';

  defineOptions({
    name: 'APIModeSwitch',
  });

  defineProps<{
    apiMode: boolean;
  }>();

  const emit = defineEmits(['toggleApiMode']);

  let observer: IntersectionObserver;

  onMounted(() => {
    observer = observeElementAtTop(
      document.getElementById('apiModeSwitch')!,
      (isAtTop: boolean, entry: IntersectionObserverEntry) => {
        const ele = entry.target as HTMLDivElement;
        if (isAtTop) {
          ele.classList.add('at-top');
        } else {
          ele.classList.remove('at-top');
        }
      },
    );
  });

  onUnmounted(() => {
    observer.disconnect();
  });
</script>

<template>
  <ToggleSwitch
    id="apiModeSwitch"
    :state="apiMode"
    toggle-name="API Mode"
    @toggle-state-emit="() => emit('toggleApiMode')"
    :modes="{ one: 'OPTIONS', two: 'COMPOSITION' }"
  />
</template>

<style scoped>
  .switch-wrapper {
    position: sticky;
    top: 0;
    z-index: 50;
    margin-block: 40px 10px;
    font-size: 0.85rem;

    &::before {
      content: '';
      display: block;
      width: 100dvw;
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      translate: -50% -50%;
      z-index: -1;
      transition: var(--transition-duration-global);
      margin-inline: auto;
    }

    &.at-top {
      font-size: 0.75rem;

      & .switch {
        --w: 30px;
        --h: 15px;
      }

      &::before {
        background-color: inherit;
      }

      &::after {
        opacity: 0;
      }
    }
  }
</style>
