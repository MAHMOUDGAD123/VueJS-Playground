<script lang="ts">
  import { rand } from '@/assets/tools/helpers';
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';
  import { createNamespacedHelpers } from 'vuex';

  const { mapActions } = createNamespacedHelpers('moduleA');

  export default {
    components: { CustomFieldset },

    data: () => ({
      names: ['Ali', 'Reem', 'Amira'],
    }),

    methods: {
      ...mapActions({
        updateInfo(dispatch, name: { fname: string; lname: string }, age: number) {
          dispatch('updateName', { ...name }, { root: true });
          dispatch('updateAge', { value: age }, { root: true });
        },
      }),

      mappedFunctions() {
        console.clear();
        const n = rand({ min: 0, max: 2 });
        const age = rand({ min: 19, max: 25 });
        this.updateInfo({ fname: this.names[n], lname: 'Gad' }, age);
      },
    },
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
          <div class="custom-output text-xl">{{ $store.getters.allInfo }}</div>
        </div>

        <button class="custom-button text-primary font-saira text-2xl" @click="mappedFunctions">
          M
        </button>
      </CustomFieldset>
    </AppRoute>

    <div class="mx-auto flex max-w-2xl flex-col gap-8">
      <RouterView name="viewOne" />
      <RouterView name="viewTwo" />
    </div>

    <RouterView />
  </div>
</template>
