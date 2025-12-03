import { defineRouteRecord } from 'strict-vue-router';
import TodoAppView from '@/views/TodoAppView.vue';

export const todoAppRouteRecord = defineRouteRecord<'todoApp'>({
  path: '/todo-app',
  name: 'todoApp',
  component: TodoAppView,
  meta: {
    isNav: true,
    navLinkTitle: 'TodoApp',
    title: {
      default: 'Todo App',
    },
  },
});
