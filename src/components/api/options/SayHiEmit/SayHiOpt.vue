<script lang="ts">
  import HiPerson from './HiPerson.vue';

  type MessageFrom = 'dad' | 'son' | 'daughter';
  type MessageVariables = 'childrenMsg' | 'parentMsg';
  type TimeoutVariables = 'childrenTimeout' | 'parentTimeout';

  const familyMap: Record<MessageFrom, { msg: MessageVariables; timeout: TimeoutVariables }> = {
    dad: {
      msg: 'childrenMsg',
      timeout: 'childrenTimeout',
    },
    son: {
      msg: 'parentMsg',
      timeout: 'parentTimeout',
    },
    daughter: {
      msg: 'parentMsg',
      timeout: 'parentTimeout',
    },
  };

  export default {
    name: 'SayHiOpt',
    data: () => ({
      childrenMsg: '',
      parentMsg: '',
      childrenTimeout: 0,
      parentTimeout: 0,
    }),

    components: {
      HiPerson,
    },

    methods: {
      answerMsg({ from }: { from: string }) {
        const { msg, timeout } = familyMap[from as MessageFrom];

        clearTimeout(this[timeout]);
        this[msg] = '';
        this[msg] = `Hi, ${from.toUpperCase()}`;
        this[timeout] = setTimeout(() => {
          this[msg] = '';
        }, 5000);
      },
    },

    unmounted() {
      clearTimeout(this.parentTimeout);
      clearTimeout(this.childrenTimeout);
    },
  };
</script>

<template>
  <div :data-title="$options.name" class="wrapper">
    <HiPerson
      v-for="{ type, msg } in [
        { type: 'dad', msg: parentMsg },
        { type: 'son', msg: childrenMsg },
        { type: 'daughter', msg: childrenMsg },
      ]"
      @saying-hi="answerMsg"
      :key="type"
      :type
      :msg
    />
  </div>
</template>

<style scoped>
  .wrapper {
    display: grid;
    grid: 1fr 1fr / 1fr 1fr;
    width: 100%;
    gap: 0;

    & > :first-child {
      grid-column: span 2;
    }
  }
</style>
