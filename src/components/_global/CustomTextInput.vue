<script setup lang="ts">
  type EventModifiers = 'trim' | 'number' | 'lazy' | 'capitalize' | 'uppercase' | 'lowercase';

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps<{
    label?: string;
    labelWidthInCh?: number | string;
    id?: string;
    name?: string;
    defaultPlaceholder?: string;
    textarea?: boolean;
    number?: boolean;
  }>();

  const [modelValue, modelModifiers] = defineModel<string | number, EventModifiers>();
  const eventName = modelModifiers.lazy ? 'change' : 'input';

  const updateValue = (e: Event) => {
    const value = (e.currentTarget as HTMLInputElement).value;

    return Object.keys(modelModifiers).reduce((value, modifier) => {
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
  };
</script>

<template>
  <label :for="props.id">
    <div
      v-if="props.label"
      class="label"
      :style="{
        minWidth: `${props.label ? (labelWidthInCh ? labelWidthInCh : props.label.length + 2) : 0}ch`,
      }"
    >
      {{ props.label }}
    </div>

    <component
      :type="number && !textarea ? 'number' : 'text'"
      v-bind="$attrs"
      :is="textarea ? 'textarea' : 'input'"
      :name="props.name"
      :id="props.id"
      :placeholder="defaultPlaceholder"
      :value="modelValue"
      @[eventName]="
        (e: Event) => {
          $emit('update:modelValue', updateValue(e));
        }
      "
      class="bg-secondary text-primary border-primary75 rounded-se-sm rounded-ee-sm border-3"
    ></component>
  </label>
</template>

<style scoped>
  label {
    --padding: 8px;
  }

  input,
  textarea {
    outline: none;
    flex: 1;
    width: 100%;
    padding-inline: var(--padding);
  }

  input {
    padding-block: calc(var(--padding) / 2);
  }

  textarea {
    padding-block: var(--padding);
    height: calc(2lh + (3 * var(--padding)));
  }

  label {
    display: flex;
    font-weight: bolder;

    & > .label {
      pointer-events: none;
      align-content: center;
      background-color: var(--color-primary75);
      text-align: center;
      border-start-start-radius: 4px;
      border-end-start-radius: 4px;
    }

    &:has(:is(input, textarea):focus) {
      & > .label {
        background-color: var(--color-primary);
      }

      & :is(input, textarea) {
        border-color: var(--color-primary);
      }
    }

    &:not(:has(.label)) :is(input, textarea) {
      border-radius: 4px;
    }
  }

  label:has(textarea) {
    flex-direction: column;

    & > .label {
      border-end-start-radius: 0;
      border-start-end-radius: 4px;
      width: 100%;
    }

    textarea {
      border-start-end-radius: 0;
      border-end-start-radius: 4px;
    }
  }

  @media (width <= 320px) {
    label {
      flex-direction: column;

      & > .label {
        border-end-start-radius: 0;
        border-start-end-radius: 4px;
        width: 100%;
      }
    }

    input,
    textarea {
      border-start-end-radius: 0;
      border-end-start-radius: 4px;
    }
  }
</style>
