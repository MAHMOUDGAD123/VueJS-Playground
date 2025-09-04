<script lang="ts">
  import ToggleSwitch from '@/components/_global/ToggleSwitch.vue';
  import FemaleSearch from './FemaleSearch.vue';
  import MaleSearch from './MaleSearch.vue';

  export default {
    name: 'KeepAliveComp',
    data: () => ({
      isMale: true,
    }),

    components: { MaleSearch, FemaleSearch, ToggleSwitch },

    methods: {
      toggleGender() {
        this.isMale = !this.isMale;
      },
    },
  };
</script>

<template>
  <div class="p-5">
    <ToggleSwitch
      class="bg-secondary75"
      :state="isMale"
      :modes="{ one: 'FEMALE', two: 'MALE' }"
      toggle-name="Gender"
      @toggle-state-emit="toggleGender"
    />

    <KeepAlive exclude="MaleSearch">
      <component v-bind:is="isMale ? 'MaleSearch' : 'FemaleSearch'"></component>
    </KeepAlive>
  </div>
</template>
