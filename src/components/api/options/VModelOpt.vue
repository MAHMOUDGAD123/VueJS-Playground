<script lang="ts">
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';
  import CustomInputOpt from '@/components/_global/CustomInputOpt.vue';

  export default {
    name: 'VModel',

    data: () => ({
      text: '',
      toggle: 'Locked',
      multiCheckboxes: [],
      radioCheck: '{}',
      selected: 'A',
      multiSelected: [],
      persons: [
        { name: 'Ahmed', age: 25 },
        { name: 'Ali', age: 20 },
        { name: 'Mohammed', age: 60 },
      ],
    }),

    components: {
      CustomFieldset,
      CustomInputOpt,
    },

    mounted() {},
  };
</script>

<template>
  <div class="grid gap-5 px-3 py-7">
    <CustomFieldset legend="text & textarea">
      <section class="flex flex-col items-center gap-3">
        <h3 class="output">Edit any of the input fields to reflect the change on all</h3>
        <CustomInputOpt v-model.uppercase="text" placeholder=".uppercase (text)" />
        <CustomInputOpt v-model.lowercase="text" placeholder=".lowercase (text)" />
        <CustomInputOpt v-model.capitalize="text" placeholder=".capitalize (text)" />
        <CustomInputOpt v-model.number="text" placeholder=".number (text)" />
        <CustomInputOpt v-model.lazy="text" placeholder=".lazy (text)" />
        <CustomInputOpt v-model.trim="text" istextarea placeholder=".trim (textarea)" />
      </section>
    </CustomFieldset>

    <CustomFieldset legend="checkbox & radio">
      <section>
        <div class="output">
          <i class="fa-solid fa-lock-open" v-if="toggle === 'Unlocked'"></i>
          <i class="fa-solid fa-lock" v-else></i>
        </div>
        <div class="inputs">
          <input
            class="custom-checkbox"
            type="checkbox"
            v-model="toggle"
            true-value="Unlocked"
            false-value="Locked"
          />
          <span class="w-[70px]">{{ toggle }}</span>
        </div>
      </section>

      <section>
        <p class="output">
          {{ multiCheckboxes }}
        </p>

        <div class="inputs *:flex *:items-center *:gap-2">
          <label v-for="(value, i) in ['A', 'B', 'C']" :key="i">
            <input class="custom-checkbox" type="checkbox" :value v-model="multiCheckboxes" />
            {{ value }}
          </label>
        </div>
      </section>

      <section>
        <p class="output">{{ radioCheck }}</p>

        <div class="inputs *:flex *:items-center *:gap-2">
          <label v-for="(value, i) in persons" :key="i">
            <input class="custom-radio" type="radio" :value v-model="radioCheck" />
            {{ value.name }}
          </label>
        </div>
      </section>
    </CustomFieldset>

    <CustomFieldset legend="select">
      <section>
        <div class="output">Selected: {{ selected }}</div>
        <div class="inputs">
          <select v-model="selected" class="custom-select">
            <option v-for="value in ['A', 'B', 'C']" :key="value" :value>{{ value }}</option>
          </select>
        </div>
      </section>

      <section>
        <div class="output">Choices: {{ multiSelected }}</div>
        <div class="inputs">
          <select class="custom-select" multiple v-model="multiSelected">
            <option class="" v-for="value in ['A', 'B', 'C']" :value :key="value">
              {{ value }}
            </option>
          </select>
        </div>
      </section>
    </CustomFieldset>
  </div>
</template>

<style scoped>
  section {
    & > .output {
      margin-bottom: 20px;
      color: var(--color-primary);
      padding: 10px;
      align-content: center;
      background-color: var(--color-primary10);
    }

    & > .inputs {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      align-items: center;
      justify-content: center;
    }
  }
</style>
