import TodoAppView from '@/views/TodoAppView.vue';
import type { _RouteRecordRaw } from 'vue-router';

export const todoAppRouteRecord = {
  path: '/todo-app',
  name: 'todoApp',
  component: TodoAppView,
  meta: {
    isNav: true,
    title: {
      default: 'Todo App',
    },
  },
} satisfies _RouteRecordRaw<'todoApp'>;
