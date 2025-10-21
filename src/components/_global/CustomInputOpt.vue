<script lang="ts">
  import type { PropType } from 'vue';

  type EventModifiers = 'trim' | 'number' | 'lazy' | 'capitalize' | 'uppercase' | 'lowercase';
  type ModelModifiers = Record<EventModifiers, boolean>;

  export default {
    name: 'CustomInputOpt',
    props: {
      name: String,
      textarea: {
        type: Boolean,
        default: false,
      },
      modelValue: [String, Number] as PropType<string | number>,
      modelModifiers: {
        type: Object as PropType<Partial<ModelModifiers>>,
        default: () => ({}),
      },
    },

    emits: ['update:modelValue'],

    computed: {
      eventName() {
        return this.modelModifiers!.lazy ? 'change' : 'input';
      },
    },

    methods: {
      emitUpdate(e: Event) {
        const value = (e.currentTarget as HTMLInputElement).value;

        const finalValue = Object.keys(this.modelModifiers!).reduce((value, modifier) => {
          switch (modifier) {
            case 'trim': {
              return value.trim();
            }
            case 'number': {
              const parsedValue = parseFloat(value);
              return Number.isNaN(parsedValue) ? value : parsedValue.toString();
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
  <component
    :name="name"
    :is="textarea ? 'textarea' : 'input'"
    class="custom-input max-w-[300px]"
    :value="modelValue"
    @[eventName]="emitUpdate"
  ></component>
</template>
