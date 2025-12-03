import { defineRouteRecord } from 'strict-vue-router';
import HomeView from '@/views/HomeView.vue';

export const homeRuoteRecord = defineRouteRecord<'home'>({
  name: 'home',
  path: '/',
  component: HomeView,
  meta: {
    title: {
      default: 'Home',
    },
    isNav: false,
  },
});
