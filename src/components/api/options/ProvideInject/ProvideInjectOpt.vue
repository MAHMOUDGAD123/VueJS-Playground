<script lang="ts">
  import { computed } from 'vue';
  import ProvideInjectChild from './ProvideInjectChild.vue';
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';

  type DataType = {
    globalAppName: string;
    appDeveloper: string;
    counter: number;
  };

  export default {
    name: 'ProvideInjectOpt',
    components: {
      ProvideInjectChild,
      CustomFieldset,
    },

    data: () =>
      ({
        counter: (Math.random() * 50 + 1) >>> 0,
      }) as DataType,

    provide() {
      return {
        reactiveCounter: computed(() => this.counter),
        nonReactiveCounter: this.counter,
      };
    },

    inject: {
      // Global
      appDeveloper: {
        from: 'developedBy',
        default: 'MG',
      },
      globalAppName: {
        from: 'appName',
        default: () => ({
          appName: 'DEFAULT GLOBAL APP NAME',
        }),
      },
    },
  };
</script>

<template>
  <div class="flex flex-col gap-5 p-3">
    <CustomFieldset legend="GLOBAL">
      <section>
        <p>{{ globalAppName }}</p>
      </section>
      <section>{{ appDeveloper }}</section>
    </CustomFieldset>

    <custom-fieldset legend="PARENT">
      <p>
        You will find that the injected <span class="imp-txt">reactive</span> counter update becasue
        it provided at the parent as a reactive value. But the injected
        <span class="imp-txt">non-reactive</span> counter won't update becasue it doesn't provided
        at the parent as a reactive value.
      </p>

      <div>
        <button class="custom-button" @click="++counter">Inc Counter</button>
      </div>

      <ProvideInjectChild />
    </custom-fieldset>
  </div>
</template>

<style scoped></style>
