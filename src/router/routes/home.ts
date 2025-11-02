import HomeView from '@/views/HomeView.vue';
import type { _RouteRecordRaw } from 'vue-router';

export const homeRuoteRecord = {
  path: '/',
  name: 'home',
  component: HomeView,
  meta: {
    title: {
      default: 'Home',
    },
    isNav: false,
  },
} satisfies _RouteRecordRaw<'home'>;
