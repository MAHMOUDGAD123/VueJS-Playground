<script setup lang="ts">
  import { useRouter, type _RouteRecordRaw } from 'vue-router';
  import { ref } from 'vue';

  const router = useRouter();
  const newRouteExists = ref(router.hasRoute('newRoute'));

  const createNewRoute = () => {
    router.addRoute('vueRouter', {
      path: '/vue-router/new-route',
      name: 'newRoute',
      component: () => import('@/components/router/new-route/NewRoute.vue'),
      meta: {
        title: {
          default: 'New Route',
        },
        isNav: true,
      },
    } satisfies _RouteRecordRaw<'newRoute'>);

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
    <div class="font-saira text-primary text-center text-2xl">DYNAMIC ROUTE</div>

    <button class="custom-button" @click="createNewRoute" :disabled="newRouteExists">Create</button>
    <button class="custom-button" @click="removeNewRoute" :disabled="!newRouteExists">
      Remove
    </button>
    <button class="custom-button" @click="pushNewRoute" :disabled="!newRouteExists">Push</button>
  </AppRoute>
</template>
