<script lang="ts">
  import type {
    ComponentOptions,
    Directive,
    DirectiveBinding,
    FunctionDirective,
    VNode,
  } from 'vue';
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';

  type Theme = 'dark' | 'light';
  type InstanceData = ComponentOptions & {
    fontSize: number;
    color: string;
    theme: Theme;
  };

  const themeHookHandler: FunctionDirective = (
    ele: HTMLElement,
    binding: DirectiveBinding,
    _vnode: VNode,
    prevVnode: VNode,
  ) => {
    const arg = binding.arg as Theme;
    if (prevVnode?.dirs && prevVnode.dirs[0].arg) {
      ele.classList.remove(prevVnode.dirs[0].arg);
    }
    ele.classList.add(arg);
  };

  const theme: Directive = {
    mounted: themeHookHandler,
    beforeUpdate: themeHookHandler,
  };

  export default {
    name: 'CustomDirectiveOpt',
    components: { CustomFieldset },

    data: (): InstanceData => ({
      fontSize: 20,
      color: 'orange',
      theme: 'dark',
    }),

    directives: {
      theme,
    },
  };
</script>

<template>
  <div class="grid gap-5 px-3 py-7 select-none">
    <h2 class="title">Global Custom Directives</h2>

    <CustomFieldset legend="v-font-size">
      <section class="flex flex-col gap-4">
        <div class="flex justify-center gap-2">
          <button class="custom-button" :disabled="fontSize >= 30" @click="++fontSize">
            <i class="fa-solid fa-plus"></i>
          </button>
          <button class="custom-button" :disabled="fontSize <= 15" @click="--fontSize">
            <i class="fa-solid fa-minus"></i>
          </button>
        </div>
        <h3>{{ fontSize }}px</h3>
        <p v-font="{ fontSize, color }" class="text-primary font-bold">Mahmoud Gad</p>
      </section>
      <section>
        <p v-font:sm.uppercase>mahmoud gad</p>
        <p v-font:md>Mahmoud Gad</p>
        <p v-font:lg.lowercase>MAHMOUD GAD</p>
      </section>
    </CustomFieldset>

    <h2 class="title">Local Custom Directives</h2>

    <CustomFieldset legend="v-theme">
      <div>
        <button
          class="custom-button aspect-square w-[55px] rounded-full p-0 text-2xl"
          @click="theme = theme === 'dark' ? 'light' : 'dark'"
        >
          <i class="fa-solid fa-moon" v-if="theme === 'dark'"></i>
          <i class="fa-solid fa-sun" v-else></i>
        </button>
      </div>
      <section v-theme:[theme] class="transition-colors duration-500">
        <p>Mahmoud Gad</p>
      </section>
      <section v-theme:dark class="transition-colors duration-500">
        <p>Mahmoud Gad</p>
      </section>
      <section v-theme:light class="transition-colors duration-500">
        <p>Mahmoud Gad</p>
      </section>
    </CustomFieldset>
  </div>
</template>

<style scoped>
  .dark {
    color: white;
    background-color: black;
  }

  .light {
    color: black;
    background-color: white;
  }
</style>
