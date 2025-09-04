<script lang="ts">
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';

  export default {
    name: 'ComputedOpt',
    components: { CustomFieldset },

    data: () => ({
      firstName: 'Mahmoud',
      lastName: 'Gad',
    }),

    computed: {
      fullName() {
        return `${this.firstName || '---'} ${this.lastName || '---'}`;
      },

      mutableFullName: {
        get() {
          return `${this.firstName || '---'} ${this.lastName || '---'}`;
        },
        set(newFullName: string) {
          [this.firstName, this.lastName] = newFullName.split(' ');
        },
      },
    },
  };
</script>

<template>
  <div class="grid gap-3 p-3 break-all">
    <input
      type="text"
      class="custom-input mx-auto my-3 max-w-[300px] not-focus-visible:animate-pulse"
      placeholder="firstName lastName"
      @input="mutableFullName = ($event.currentTarget as HTMLInputElement).value"
    />

    <CustomFieldset legend="getter only">
      <h2>{{ fullName }}</h2>
    </CustomFieldset>
    <CustomFieldset legend="getter & setter">
      <div class="grid w-full justify-center gap-2 *:min-w-[100px] *:rounded-sm *:border-2 *:p-1.5">
        <h3>{{ firstName || '---' }}</h3>
        <h3>{{ lastName || '---' }}</h3>
        <h3>{{ mutableFullName || '---' }}</h3>
      </div>
    </CustomFieldset>
  </div>
</template>

<style scoped></style>
