import type { RouteRecordRaw } from 'vue-router';
import NotFoundView from '@/views/NotFoundView.vue';

export const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: {
        default: 'Home',
      },
      isNav: false,
    },
  },
  {
    path: '/opt-vs-comp',
    name: 'optVsComp',
    component: () => import('@/views/OptVsCompView.vue'),
    meta: {
      title: {
        default: 'Options Vs Composition',
      },
      isNav: true,
    },
  },
  {
    path: '/vue-router',
    name: 'vueRouter',
    component: () => import('@/views/VueRouterView.vue'),
    meta: {
      title: {
        default: 'Vue Router',
      },
      isNav: true,
    },
    children: [
      {
        name: 'users',
        path: 'users',
        component: () => import('@/components/router/UsersRoute.vue'),
        meta: {
          title: {
            default: 'Users',
          },
        },
        children: [
          {
            name: 'user',
            path: ':userid',
            component: () => import('@/components/router/UserRoute.vue'),
            meta: {
              title: {
                default: 'User',
                isDynamic: true,
                pattern: 'User - <[userid]>',
                propsMap: [['userid', 'params.userid']],
              },
            },
          },
        ],
      },
      {
        name: 'posts',
        path: 'posts',
        component: () => import('@/components/router/PostsRoute.vue'),
        meta: {
          title: {
            default: 'Posts',
          },
        },
        children: [
          {
            name: 'post',
            path: ':postid',
            component: () => import('@/components/router/PostRoute.vue'),
            meta: {
              title: {
                default: 'Post',
                isDynamic: true,
                pattern: 'Post - <[postid]>',
                propsMap: [['postid', 'params.postid']],
              },
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
      title: {
        default: 'Event Bus',
      },
    },
  },
  {
    path: '/todo-app',
    name: 'todoApp',
    component: () => import('@/views/TodoApp.vue'),
    meta: {
      isNav: true,
      title: {
        default: 'Todo App',
      },
    },
  },
  {
    path: '/composable',
    name: 'composable',
    component: () => import('@/views/ComposableView.vue'),
    meta: {
      isNav: true,
      title: {
        default: 'Composable',
      },
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFoundView,
    meta: {
      nickName: 'Not Found',
      title: {
        default: '404',
      },
      isNav: false,
    },
  },
];
