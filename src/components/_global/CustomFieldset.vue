<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue';

  // Types
  type IconPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  type PositionStyle =
    | 'top-0 left-0 -translate-x-1/2 -translate-y-1/2'
    | 'top-0 right-0 translate-x-1/2 -translate-y-1/2'
    | 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2'
    | 'right-0 bottom-0 translate-x-1/2 translate-y-1/2';
  type IconSrcName =
    | 'vue'
    | 'vuex'
    | 'pinia'
    | 'primevue'
    | 'vitejs'
    | 'vuerouter'
    | 'vuetify'
    | 'vueuse';

  type Props = {
    legend?: string;
    icon?: {
      iconSrc: IconSrcName;
      position?: IconPosition;
    };
  };

  // Macros
  defineOptions({
    name: 'CustomFieldset',
  });

  const { icon } = defineProps<Props>();

  // Data
  const resolvedIconSrc = ref<string>('');

  // Methods
  const resolveIconPosition = (): PositionStyle => {
    switch (icon?.position) {
      case 'top-left':
        return 'top-0 left-0 -translate-x-1/2 -translate-y-1/2';
      case 'top-right':
        return 'top-0 right-0 translate-x-1/2 -translate-y-1/2';
      case 'bottom-left':
        return 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2';
      case 'bottom-right':
        return 'right-0 bottom-0 translate-x-1/2 translate-y-1/2';
      default:
        return 'top-0 left-0 -translate-x-1/2 -translate-y-1/2';
    }
  };

  const resolveIconSrc = async () => {
    const srcName: IconSrcName = icon?.iconSrc ?? 'vue';
    await import(`@/assets/imgs/${srcName}.svg`).then((iconSrc: { default: string }) => {
      resolvedIconSrc.value = iconSrc.default;
    });
  };

  // Life Cycle
  onBeforeMount(async () => {
    resolveIconSrc();
  });
</script>

<template>
  <fieldset
    class="border-primary relative grid w-full items-center justify-stretch gap-5 rounded-md border-5 px-5 py-7"
  >
    <legend v-if="legend" class="bg-primary w-fit rounded-[inherit] px-2.5 py-1.25">
      {{ legend }}
    </legend>

    <div
      v-if="icon"
      :class="[
        'border-primary absolute aspect-square w-12 rounded-full border-5 bg-black p-2',
        resolveIconPosition(),
      ]"
    >
      <img :src="resolvedIconSrc" :alt="icon.iconSrc" />
    </div>

    <slot></slot>
  </fieldset>
</template>

<style scoped>
  fieldset {
    & :not(:not(section)) {
      width: 100%;
    }

    &:has(section:nth-of-type(2)) :not(:not(section)) {
      border: 5px solid var(--color-secondary);
      padding: 15px;
    }
  }
</style>
