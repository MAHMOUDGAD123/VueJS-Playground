<script lang="ts" setup>
  defineOptions({
    name: 'MainFooter',
  });
</script>

<template>
  <footer class="select-none">
    <div>
      <a href="https://vuejs.org/" target="_blank">
        <span>VUE</span>
      </a>

      <i class="fa-solid fa-bolt-lightning"></i>

      <a href="https://vite.dev/" target="_blank">
        <span>VITE</span>
      </a>
    </div>
  </footer>
</template>

<style scoped>
  footer {
    padding: 7px;
    justify-content: center;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: bolder;
    position: relative;

    &::before {
      content: '';
      display: block;
      width: 100dvw;
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      translate: -50% -50%;
      z-index: 1;
      background-color: var(--color-card);
    }

    & > :only-child {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--color-primary);
      z-index: 2;
    }
  }

  a {
    font-family: saira;
    color: var(--color-primary60);
    transition: var(--transition-duration-global);

    &:hover {
      color: var(--color-primary);
    }
  }

  i {
    animation: pulse 1.5s infinite;
  }
</style>
