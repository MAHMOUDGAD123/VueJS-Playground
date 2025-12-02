<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';
  import { useCounterStore } from '@/stores/pinia/counter-store';
  import { rand } from '@/assets/tools/helpers';

  const store = useCounterStore();
  const { count, data } = storeToRefs(store);
  const names = ['MERA', 'ALI', 'GAD'];

  const updateState = () => {
    store.$patch({
      count: rand({ min: 1, max: 100 }),
      data: { name: names[rand({ min: 0, max: names.length - 1 })] },
    });
  };

  const killStore = () => {
    store.$dispose();
  };

  const resetStore = () => {
    store.$reset();
  };
</script>

<template>
  <CustomFieldset :icon="{ iconSrc: 'pinia' }">
    <!-- <div class="custom-output text-center">{{ store.secret }}</div> -->
    <!-- <div class="custom-output text-center">{{ store.realName ?? 'MG' }}</div> -->
    <div class="custom-output text-center">{{ count }}</div>
    <div class="custom-output font-saira text-center">{{ data.name }}</div>

    <button class="custom-button text-primary font-saira text-2xl" @click="killStore">
      Dispose
    </button>

    <button class="custom-button text-primary font-saira text-2xl" @click="resetStore">
      Reset
    </button>

    <button class="custom-button text-primary font-saira text-3xl" @click="updateState">
      <i class="fa-solid fa-circle-arrow-up"></i>
    </button>

    <div class="flex gap-5 *:flex-1">
      <button class="custom-button text-primary font-saira text-2xl" @click="store.decrement">
        <i class="fa-solid fa-minus"></i>
      </button>
      <button class="custom-button text-primary font-saira text-2xl" @click="store.increment">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  </CustomFieldset>
</template>
