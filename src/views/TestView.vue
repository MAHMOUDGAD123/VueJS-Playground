<script lang="ts">
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';

  // @ts-ignore

  // const test: ModulesMutationsMapResolved['moduleAAA1'] = {};

  export default {
    components: { CustomFieldset },

    // computed: {
    //   // State
    //   ...mapState('moduleA/moduleAA/moduleAAA1', ['aaa1']),
    //   ...mapState('moduleA/moduleAA/moduleAAA1', {
    //     someData: 'aa',
    //     moduleName(state, getters) {
    //       // console.log({ state, getters });
    //       return state.aaa1;
    //     },
    //   }),

    //   // Getters
    //   ...mapGetters('moduleA/moduleAA/moduleAAA1', ['getterAAA1']),
    //   ...mapGetters('moduleA/moduleAA/moduleAAA1', {
    //     _getterAAA1: 'getterAAA1',
    //   }),
    // },

    // methods: {
    //   // Actions
    //   ...mapActions('moduleA/moduleAA/moduleAAA2', ['actionAAA2']),
    //   ...mapActions('moduleA/moduleAA/moduleAAA2', {
    //     _actionAAA2: 'actionAAA2',
    //     __actionAAA2(dispatch) {
    //       console.log(dispatch);
    //       dispatch('actionAAA2');
    //     },
    //   }),
    //   // Mutations
    //   ...mapMutations('moduleA/moduleAA/moduleAAA2', ['MUTATION_AAA2']),
    //   ...mapMutations('moduleA/moduleAA/moduleAAA2', {
    //     _MUTATION_AAA2: 'MUTATION_AAA2',
    //     __MUTATION_AAA2(commit) {
    //       commit('MUTATION_AAA2');
    //     },
    //   }),

    //   actionsAndMutations() {
    //     this.actionAAA2();
    //     this._actionAAA2();
    //     this.__actionAAA2();
    //     this.MUTATION_AAA2();
    //     this._MUTATION_AAA2();
    //     this.__MUTATION_AAA2();
    //   },
    // },
  };
</script>

<template>
  <div>
    <h1
      class="font-saira text-primary my-13 text-center text-5xl font-bold uppercase filter-[drop-shadow(0_0_20px_var(--color-primary))] select-none"
    >
      Test
    </h1>

    <nav
      class="justify-cente my-7 flex list-none flex-wrap items-center justify-center gap-2 rounded-2xl"
    >
      <RouterLink class="custom-link" :to="{ name: 'test' }">/</RouterLink>
      <RouterLink class="custom-link" :to="{ name: 'testChild', params: { first: 1, last: 2 } }"
        >views</RouterLink
      >
    </nav>

    <AppRoute route-name="test">
      <CustomFieldset class="mx-auto max-w-2xl text-center" :icon="{ iconSrc: 'vuex' }">
        <div class="flex flex-row flex-wrap justify-center gap-3">
          <div class="custom-output text-xl">{{ $store.getters.fullName }}</div>
          <!-- <div class="custom-output text-xl">{{ aaa1 }}</div> -->
          <!-- <div class="custom-output text-xl">{{ moduleName }}</div> -->
          <!-- <div class="custom-output text-xl">{{ getterAAA1 }}</div> -->
          <!-- <div class="custom-output text-xl">{{ _getterAAA1 }}</div> -->
        </div>
        <!-- <button class="custom-button text-primary text-2xl" @click="actionsAndMutations">
          <i class="fa-solid fa-circle-arrow-up"></i>
        </button> -->
      </CustomFieldset>
    </AppRoute>

    <div class="mx-auto flex max-w-2xl flex-col gap-8">
      <RouterView name="viewOne" />
      <RouterView name="viewTwo" />
    </div>

    <RouterView />
  </div>
</template>
