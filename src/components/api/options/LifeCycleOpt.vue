<script lang="ts">
  export default {
    name: 'LifeCycleOpt',
    data: () => {
      return {
        state: false,
      };
    },

    beforeCreate() {
      // Can't accesst anything here
      console.log('beforeCreate');
    },

    created() {
      console.log('created');
    },

    beforeMount() {
      console.log('beforeMount');
    },

    mounted() {
      console.log('mounted');
    },

    beforeUpdate() {
      console.log('beforeUpdate');
      const ele = document.getElementById('__beforeUpdate__')!;
      ele.classList.add('blink');
      ele.onanimationend = () => {
        ele.classList.remove('blink');
      };
    },

    updated() {
      console.log('updated');
      const ele = document.getElementById('__updated__')!;
      ele.classList.add('blink');
      ele.onanimationend = () => {
        ele.classList.remove('blink');
      };
    },

    beforeUnmount() {
      console.log('beforeUnmount');
    },

    unmounted() {
      console.log('unmounted');
    },
  };
</script>

<template>
  <div class="flex flex-col items-center gap-4 p-4">
    <button class="custom-button border-primary w-[170px] border-2" @click="() => (state = !state)">
      update: {{ state }}
    </button>
    <ul class="flex flex-wrap items-center justify-center gap-3">
      <li
        v-for="([hook, delay], i) in [
          ['beforeCreate', 200],
          ['created', 400],
          ['beforeMount', 600],
          ['mounted', 800],
          ['beforeUpdate', 100],
          ['updated', 200],
          ['beforeUnmount', 200],
          ['unmounted', 200],
        ] satisfies [LCHook, number][]"
        :key="i"
        :id="`__${hook}__`"
        :style="{
          animationDelay: `${delay}ms`,
        }"
        class="bg-secondary75 flex items-center gap-2 rounded-md px-3 py-1"
      >
        {{ hook }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
  #__beforeCreate__,
  #__created__,
  #__beforeMount__,
  #__mounted__ {
    animation: life-cycle-active 1s forwards;
  }

  #__beforeUpdate__,
  #__updated__ {
    &.blink {
      animation: life-cycle-blink 500ms;
    }
  }

  #__beforeUnmount__,
  #__unmounted__ {
    background-color: color(from orangered srgb r g b / 0.3);
    animation: pulse 5s infinite;
  }
</style>
