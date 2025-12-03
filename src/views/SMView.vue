<script lang="ts">
  import {
    mapStores,
    mapWritableState as PiniaMapWritableState,
    mapActions as piniaMapActions,
    mapState as piniaMapState,
  } from 'pinia';
  import {
    mapState as vuexMapState,
    mapActions as vuexMapActions,
    mapGetters as vuexMapGetters,
  } from 'vuex';
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';
  import { useCounterStore } from '@/stores/pinia/counter-store';
  import CustomTextInput from '@/components/_global/CustomTextInput.vue';
  import ToggleSwitch from '@/components/_global/ToggleSwitch.vue';
  import { useStorage } from '@/hooks/useStorage';

  export default {
    components: { CustomFieldset, CustomTextInput, ToggleSwitch },

    data: () => ({
      mode: useStorage('__vuex_pinia__', 'localStorage', true),
    }),

    computed: {
      // vuex
      ...vuexMapState({
        vuexCount: 'count',
      }),
      ...vuexMapGetters({
        vuexDoubleCount: 'doubleCount',
      }),

      // pinia
      ...piniaMapState(useCounterStore, {
        piniaCount: 'count',
        piniaDoubleCount: (store) => store.doubleCount,
      }),
      ...PiniaMapWritableState(useCounterStore, {
        piniaWritableCount: 'count',
      }),
      ...mapStores(useCounterStore),
    },

    methods: {
      // vuex
      ...vuexMapActions({
        vuexInc: (dispatch) => dispatch('increment'),
      }),

      // pinia
      ...piniaMapActions(useCounterStore, {
        piniaInc: 'increment',
      }),
    },
  };
</script>

<template>
  <div>
    <h1
      class="font-saira text-primary my-10 text-center text-5xl font-bold uppercase filter-[drop-shadow(0_0_20px_var(--color-primary))] select-none"
    >
      SM
    </h1>

    <ToggleSwitch
      :state="mode"
      :modes="{ one: 'Vuex', two: 'pinia' }"
      @toggle-state-emit="mode = !mode"
    />

    <nav
      class="justify-cente mt-7 mb-14 flex list-none flex-wrap items-center justify-center gap-2 rounded-2xl"
    >
      <RouterLink class="custom-link" :to="{ name: 'sm' }">/</RouterLink>
      <RouterLink class="custom-link" :to="{ name: 'smViews' }">views</RouterLink>
    </nav>

    <AppRoute route-name="sm">
      <div class="flex flex-wrap gap-9 *:flex-1 *:basis-[250px]">
        <CustomFieldset
          v-if="mode"
          class="mx-auto max-w-2xl items-stretch text-center"
          :icon="{ iconSrc: 'pinia' }"
        >
          <div class="flex flex-wrap gap-5 *:flex-1 *:basis-[70px]">
            <div class="custom-output">{{ counterStore.count }}</div>
            <div class="custom-output">{{ piniaDoubleCount }}</div>
          </div>
          <button class="custom-button text-primary font-saira text-2xl" @click="piniaInc">
            <i class="fa-solid fa-plus"></i>
          </button>

          <CustomTextInput
            name="piniaState"
            number
            label="Num"
            v-model.number="piniaWritableCount"
          />
        </CustomFieldset>

        <CustomFieldset
          v-else
          class="mx-auto max-w-2xl items-stretch text-center"
          :icon="{ iconSrc: 'vuex' }"
        >
          <div class="flex flex-wrap gap-5 *:flex-1 *:basis-[70px]">
            <div class="custom-output">{{ vuexCount }}</div>
            <div class="custom-output">{{ vuexDoubleCount }}</div>
          </div>
          <button class="custom-button text-primary font-saira text-2xl" @click="vuexInc">
            <i class="fa-solid fa-plus"></i>
          </button>
        </CustomFieldset>
      </div>
    </AppRoute>

    <div class="mx-auto flex max-w-2xl flex-wrap gap-9 *:flex-1 *:basis-[250px]">
      <RouterView name="piniaView" v-if="mode" />
      <RouterView name="vuexView" v-else />
    </div>

    <RouterView />
  </div>
</template>
