<script lang="ts">
  import SlottedFormComp from './SlottedFormComp.vue';

  export default {
    name: 'SlottedFormOpt',
    components: {
      SlottedFormComp,
    },
  };
</script>

<template>
  <SlottedFormComp>
    <template #title="{ title }">{{ title }}</template>

    <template v-slot:inputs="{ isLogin }">
      <input
        type="text"
        name="name"
        class="custom-input"
        placeholder="Enter name"
        v-if="!isLogin"
      />
      <input type="text" name="email" class="custom-input" placeholder="Enter email" />
      <input type="password" name="password" class="custom-input" placeholder="Enter password" />
    </template>

    <template #actions="{ submitTxt }">
      <button class="custom-button">{{ submitTxt }}</button>
    </template>
  </SlottedFormComp>
</template>
