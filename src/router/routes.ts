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
  component: () => import('@/views/HomeView.vue'),
  meta: {
   title: 'Home',
   isNav: false,
  },
 },
 {
  path: '/opt-vs-comp',
  name: 'optVsComp',
  component: () => import('@/views/OptVsCompView.vue'),
  meta: {
   title: 'Options Vs Composition',
   isNav: true,
  },
 },
 {
  path: '/vue-router',
  name: 'vueRouter',
  component: () => import('@/views/VueRouterView.vue'),
  meta: {
   title: 'Vue Router',
   isNav: true,
  },
  children: [
   {
    name: 'users',
    path: 'users',
    component: () => import('@/components/router/UsersRoute.vue'),
    meta: {
     title: 'Users',
    },
    children: [
     {
      name: 'user',
      path: ':userid',
      component: () => import('@/components/router/UserRoute.vue'),
      meta: {
       title: 'User',
      },
     },
    ],
   },
   {
    name: 'posts',
    path: 'posts',
    component: () => import('@/components/router/PostsRoute.vue'),
    meta: {
     title: 'Posts',
    },
    children: [
     {
      name: 'post',
      path: ':postid',
      component: () => import('@/components/router/PostRoute.vue'),
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
  component: () => import('@/views/EventBusView.vue'),
  meta: {
   isNav: true,
   title: 'Event Bus',
  },
 },
 {
  path: '/todo-app',
  name: 'todoApp',
  component: () => import('@/views/TodoApp.vue'),
  meta: {
   isNav: true,
   title: 'Todo App',
  },
 },
 {
  path: '/composable',
  name: 'composable',
  component: () => import('@/views/ComposableView.vue'),
  meta: {
   isNav: true,
   title: 'Composable',
  },
 },
 {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('@/views/NotFoundView.vue'),
  meta: {
   title: '404',
   isNav: false,
  },
 },
];
