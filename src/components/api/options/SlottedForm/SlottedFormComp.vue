<script lang="ts">
  export default {
    name: 'SlottedFormComp',
    data: () => ({
      isLogin: true,
    }),
    methods: {
      submitAction(formEle: EventTarget) {
        const data = Object.fromEntries(new FormData(formEle as HTMLFormElement).entries());
        alert(JSON.stringify(data));
      },
    },
  };
</script>

<template>
  <div class="flex flex-col items-center gap-4 p-5">
    <button class="custom-button w-fit" @click="isLogin = !isLogin">Toggle</button>

    <form @submit.prevent="(e) => submitAction(e.currentTarget!)" class="flex flex-col gap-7">
      <div class="text-primary text-3xl font-extrabold">
        <slot name="title" :title="isLogin ? 'Login Form' : 'Signup Form'">Default Title</slot>
      </div>
      <div class="*:custom-input flex flex-col gap-5">
        <slot name="inputs" :isLogin>Default Inputs</slot>
      </div>
      <div class="*:custom-button flex flex-wrap items-center justify-center gap-3">
        <slot name="actions" v-bind="{ submitTxt: isLogin ? 'Login' : 'Sign Up' }"
          >Default Actions</slot
        >
      </div>
    </form>
  </div>
</template>

<style scoped></style>
