<script lang="ts">
  type EventModifiers = 'trim' | 'number' | 'lazy' | 'capitalize' | 'uppercase' | 'lowercase';
  type ModelModifiers = Record<EventModifiers, boolean>;

  export default {
    name: 'CustomInputOpt',
    props: {
      istextarea: {
        type: Boolean,
        default: false,
      },
      modelValue: {},
      modelModifiers: {
        default: () => ({}),
      },
    },

    emits: ['update:modelValue'],

    data: () => ({
      eventName: 'input', // 'input' event by default
    }),

    created() {
      // set the event name to 'change' if lazy
      const modifiers = this.modelModifiers as ModelModifiers;
      this.eventName = modifiers.lazy ? 'change' : 'input';
    },

    methods: {
      emitUpdate(e: Event) {
        const value = (e.currentTarget as HTMLInputElement).value;
        const modifiers = this.modelModifiers as ModelModifiers;

        const finalValue = Object.keys(modifiers).reduce((value, modifier) => {
          switch (modifier as EventModifiers) {
            case 'trim': {
              return value.trim();
            }
            case 'number': {
              const parsedValue = parseFloat(value);
              return Number.isNaN(parsedValue) ? value : String(parsedValue);
            }
            case 'capitalize': {
              return value.charAt(0).toUpperCase() + value.slice(1);
            }
            case 'uppercase': {
              return value.toUpperCase();
            }
            case 'lowercase': {
              return value.toLowerCase();
            }

            default: {
              return value;
            }
          }
        }, value);

        this.$emit('update:modelValue', finalValue);
      },
    },
  };
</script>

<template>
  <textarea
    v-if="istextarea"
    type="text"
    class="custom-input max-w-[300px]"
    :value="String(modelValue)"
    v-on:[eventName]="emitUpdate"
  ></textarea>
  <input
    v-else
    type="text"
    class="custom-input max-w-[300px]"
    :value="modelValue"
    v-on:[eventName]="emitUpdate"
  />
</template>
