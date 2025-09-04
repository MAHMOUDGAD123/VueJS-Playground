<script lang="ts">
  export default {
    name: 'HiPerson',
    props: {
      type: {
        type: String,
        required: true,
      },
      msg: {
        type: String,
        required: true,
      },
    },

    emits: {
      sayingHi: (payload: { from: string }) => {
        return payload.from;
      },
    },
  };
</script>

<template>
  <div class="person">
    <button class="custom-button p-0" @click="$emit('sayingHi', { from: type })">
      <i class="fa-solid fa-person" v-if="type === 'dad'"></i>
      <i class="fa-solid fa-child" v-else-if="type === 'son'"></i>
      <i class="fa-solid fa-child-dress" v-else></i>
    </button>
    <p>
      <span class="animate-pulse">{{ msg || '---' }}</span>
    </p>
  </div>
</template>

<style scoped>
  .person {
    border: 3px solid var(--color-secondary);
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  i {
    font-size: 2rem;
    pointer-events: none;
  }

  button {
    width: 50px;
    background-color: var(--color-primary75);
    aspect-ratio: 1;
    align-content: center;
    border-radius: 100px;
    cursor: pointer;
    transition: var(--transition-duration-global);

    &:hover {
      background-color: var(--color-primary);
    }
  }

  p {
    background-color: var(--color-secondary75);
    padding: 15px;
    width: 100%;
    border-radius: 10px;
    color: var(--color-primary);
    font-weight: bolder;
  }
</style>
