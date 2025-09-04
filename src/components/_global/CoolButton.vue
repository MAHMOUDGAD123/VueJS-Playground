<script lang="ts" setup>
  import { onMounted, useTemplateRef } from 'vue';

  defineOptions({
    name: 'CoolButton',
  });

  const btn = useTemplateRef('buttonEle');

  const emit = defineEmits(['clicked']);

  onMounted(() => {
    const el = btn.value!.querySelector('.btn__border.gradient')! as HTMLDivElement;

    let rect = el.getBoundingClientRect();
    let cx = rect.left + rect.width / 2;
    let cy = rect.top + rect.height / 2;

    function updateCenter() {
      rect = el.getBoundingClientRect();
      cx = rect.left + rect.width / 2;
      cy = rect.top + rect.height / 2;
    }

    window.addEventListener('resize', updateCenter);
    window.addEventListener('scroll', updateCenter, { passive: true });

    let lastAngle = NaN;
    let accumulated = 0;

    // core rotation logic
    function updateRotation(mouseX: number, mouseY: number) {
      const dx = mouseX - cx;
      const dy = mouseY - cy;

      // angle so top (-Y) points at cursor
      const current = Math.atan2(dy, dx) + Math.PI / 2;

      if (!Number.isNaN(lastAngle)) {
        let diff = current - lastAngle;

        // unwrap angle to avoid snapping
        if (diff > Math.PI) diff -= 2 * Math.PI;
        if (diff < -Math.PI) diff += 2 * Math.PI;

        accumulated += diff;
      } else {
        // First time: snap directly, don't interpolate
        accumulated = current;
      }

      lastAngle = current;

      el.style.transform = `rotateZ(${(accumulated * 180) / Math.PI}deg)`;
    }

    // initialize rotation the very first time mouse is *inside* window
    window.addEventListener(
      'pointerenter',
      (e) => {
        updateRotation(e.clientX, e.clientY);
      },
      { passive: true },
    );

    // update continuously as mouse moves
    window.addEventListener(
      'pointermove',
      (e) => {
        updateRotation(e.clientX, e.clientY);
      },
      { passive: true },
    );
  });
</script>

<template>
  <button
    @click="emit('clicked')"
    ref="buttonEle"
    class="cool-btn relative aspect-[1/0.3] w-[175px] cursor-pointer rounded-full p-1 font-bold contain-content *:pointer-events-none"
  >
    <div
      class="btn__content font-saira h-full w-full content-center rounded-[inherit] text-center transition-all"
    >
      <slot></slot>
    </div>
    <div
      class="btn__border gradient absolute top-1/2 left-1/2 z-[-1] aspect-square w-[100%] -translate-1/2"
    ></div>
    <div
      class="btn__border absolute top-1/2 left-1/2 z-[-1] aspect-square w-[100%] -translate-1/2"
    ></div>
  </button>
</template>

<style scoped>
  .cool-btn {
    transition: transform, color;
    filter: grayscale(100%);

    & > .btn__content {
      background-color: var(--color-background-root);
    }

    & > .btn__border {
      opacity: 0;
      background-image: conic-gradient(var(--color-primary), var(--color-primary));
      transition:
        filter 1s,
        transform 250ms,
        opacity 1s;

      &.gradient {
        background-image: conic-gradient(
          var(--color-primary),
          var(--color-secondary) 30% 70%,
          var(--color-primary)
        );
        opacity: 1;
      }
    }

    /* Not working well */
    &.loading {
      filter: none;
      transform: none;

      & > .btn__border {
        animation: r-spin infinite 2s linear;
      }
    }

    &:hover,
    &:focus-visible {
      filter: none;
    }

    &:active {
      filter: none;
      transform: scale(0.95);
      color: var(--color-primary);

      & > .btn__border {
        opacity: 1;
      }
    }
  }
</style>
