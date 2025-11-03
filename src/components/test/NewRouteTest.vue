<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import CustomFieldset from '@/components/_global/CustomFieldset.vue';
  import { ref } from 'vue';

  const router = useRouter();
  const newRouteExists = ref(router.hasRoute('newRoute'));

  const createNewRoute = () => {
    router.addRoute({
      path: '/new-route',
      name: 'newRoute',
      component: () => import('@/views/NewRouteView.vue'),
      meta: {
        title: {
          default: 'New Route',
        },
        isNav: true,
      },
    });

    newRouteExists.value = router.hasRoute('newRoute');
  };

  const removeNewRoute = () => {
    router.removeRoute('newRoute');
    newRouteExists.value = router.hasRoute('newRoute');
  };

  const pushNewRoute = () => {
    router.push({ name: 'newRoute' });
  };
</script>

<template>
  <AppRoute route-name="newRouteTest">
    <CustomFieldset class="mx-auto max-w-2xl">
      <div class="font-saira text-primary text-center text-2xl">DYNAMIC ROUTE</div>
    </CustomFieldset>

    <CustomFieldset class="mx-auto mt-3 max-w-2xl">
      <button class="custom-button" @click="createNewRoute" :disabled="newRouteExists">
        Create
      </button>
      <button class="custom-button" @click="removeNewRoute" :disabled="!newRouteExists">
        Remove
      </button>
      <button class="custom-button" @click="pushNewRoute" :disabled="!newRouteExists">Push</button>
    </CustomFieldset>
  </AppRoute>
</template>
