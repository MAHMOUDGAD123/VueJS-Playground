<script lang="ts">
  import { toExpo } from '@/assets/tools/helpers';

  export default {
    name: 'CounterComp',
    data: (_vm) => {
      return {
        count: _vm.$props.startValue,
      };
    },

    methods: {},

    props: {
      startValue: {
        type: Number,
        default: 0,
        required: true,
      },
    },

    computed: {
      countToExpo() {
        return toExpo(this.count);
      },
    },
  };
</script>

<template>
  <div class="flex flex-col items-center gap-4 p-4">
    <div class="buttons *:text-[1.75rem]">
      <button class="custom-button" v-bind:onclick="() => ++count">+</button>
      <button class="custom-button" :onclick="() => --count">-</button>
      <button class="custom-button" @click="() => (count *= 2)">×</button>
      <button class="custom-button" v-on:click="() => (count /= 2)">÷</button>
      <button class="custom-button" v-show="count !== 0" @click="() => (count = 0)">0</button>
    </div>

    <div class="outputs">
      <output class="value bind" v-bind:data-value="countToExpo"></output>
      <output :class="`value ${count > 0 ? 'gtZero' : count < 0 ? 'ltZero' : 'eqZero'}`">{{
        countToExpo
      }}</output>
      <output
        :style="`color:${count === 0 ? 'white' : count > 0 ? 'dodgerblue' : 'red'}`"
        class="value"
      >
        <span v-if="count === 0">Zero</span>
        <span v-else-if="count % 2">Odd</span>
        <span v-else>Even</span>
      </output>
    </div>
  </div>
</template>

<style scoped>
  .counter * {
    transition: var(--transition-duration-global);
  }

  button {
    padding: 2px 15px;
  }

  output {
    padding: 10px;
    border-radius: 5px;
    font-size: 2rem;
    font-family: monospace;
    background-color: color(from var(--color-secondary) srgb r g b / 0.5);
    color: var(--color-primary);
    width: 100%;
    flex-basis: 210px;

    &.bind {
      &::before {
        content: attr(data-value);
      }
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    max-width: 200px;
  }

  .outputs {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    width: 260px;
    user-select: none;
  }

  .gtZero {
    border: 5px solid dodgerblue;
    color: dodgerblue;
  }
  .ltZero {
    border: 5px solid orangered;
    color: orangered;
  }
  .eqZero {
    border: 5px solid whitesmoke;
    color: whitesmoke;
  }
</style>
