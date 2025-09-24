import { lazyComponent } from '@/assets/tools/lazy-component';
import type { RouteRecordRaw } from 'vue-router';

type RouteType = RouteRecordRaw & {
 path: RoutePath;
 name: RouteName;
 meta: {
  title: RouteTitle;
  isNav?: boolean;
  isDynamic?: boolean;
  params?: Record<string, string>;
  query?: Record<string, string>;
  hash?: string;
 };
 children?: RouteType[];
};

export const routes: readonly RouteType[] = [
 {
  path: '/',
  name: 'home',
  component: lazyComponent(() => import('@/views/HomeView.vue'), false),
  meta: {
   title: 'Home',
   isNav: false,
  },
 },
 {
  path: '/opt-vs-comp',
  name: 'optVsComp',
  component: lazyComponent(() => import('@/views/OptVsCompView.vue'), false),
  meta: {
   title: 'Options Vs Composition',
   isNav: true,
  },
 },
 {
  path: '/vue-router',
  name: 'vueRouter',
  component: lazyComponent(() => import('@/views/VueRouterView.vue'), false),
  meta: {
   title: 'Vue Router',
   isNav: true,
  },
  children: [
   {
    name: 'users',
    path: 'users',
    component: lazyComponent(() => import('@/components/router/UsersRoute.vue'), false),
    meta: {
     title: 'Users',
    },
    children: [
     {
      name: 'user',
      path: ':userid',
      component: lazyComponent(() => import('@/components/router/UserRoute.vue'), false),
      meta: {
       title: 'User',
      },
     },
    ],
   },
   {
    name: 'posts',
    path: 'posts',
    component: lazyComponent(() => import('@/components/router/PostsRoute.vue'), false),
    meta: {
     title: 'Posts',
    },
    children: [
     {
      name: 'post',
      path: ':postid',
      component: lazyComponent(() => import('@/components/router/PostRoute.vue'), false),
      meta: {
       title: 'Post',
      },
     },
    ],
   },
  ],
 },
 {
  path: '/event-bus',
  name: 'eventBus',
  component: lazyComponent(() => import('@/views/EventBusView.vue'), false),
  meta: {
   isNav: true,
   title: 'Event Bus',
  },
 },
 {
  path: '/todo-app',
  name: 'todoApp',
  component: lazyComponent(() => import('@/views/TodoApp.vue'), false),
  meta: {
   isNav: true,
   title: 'Todo App',
  },
 },
 {
  path: '/composable',
  name: 'composable',
  component: lazyComponent(() => import('@/views/ComposableView.vue'), false),
  meta: {
   isNav: true,
   title: 'Composable',
  },
 },
 {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: lazyComponent(() => import('@/views/NotFoundView.vue'), false),
  meta: {
   title: '404',
   isNav: false,
  },
 },
];
