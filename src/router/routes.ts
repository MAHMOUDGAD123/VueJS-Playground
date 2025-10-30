import type { RouteRecordRaw } from 'vue-router';
import NotFoundView from '@/views/NotFoundView.vue';
import OptVsCompView from '@/views/OptVsCompView.vue';
import VueRouterView from '@/views/VueRouterView.vue';
import PostRoute from '@/components/router/post/PostRoute.vue';
import PostsRoute from '@/components/router/posts/PostsRoute.vue';
import UsersRoute from '@/components/router/users/UsersRoute.vue';
import EventBusView from '@/views/EventBusView.vue';
import TodoApp from '@/views/TodoAppView.vue';
import ComposableView from '@/views/ComposableView.vue';
import ScrollOptimizerView from '@/views/ScrollOptimizerView.vue';
import UserPostRoute from '@/components/router/user-post/UserPostRoute.vue';
import TestView from '@/views/TestView.vue';
import UserRoute from '@/components/router/user/UserRoute.vue';

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
    component: OptVsCompView,
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
    alias: ['/router', '/router-test'],
    component: VueRouterView,
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
        alias: 'u',
        component: UsersRoute,
        meta: {
          title: {
            default: 'Users',
          },
        },
        children: [
          {
            path: ':userid((?:[1-9]|10\\))',
            name: 'user',
            alias: [':userid((?:[1-9]|10\\))/profile'],
            component: UserRoute,
            meta: {
              title: {
                default: 'User',
                isDynamic: true,
                pattern: 'User #<[userid]>',
                propsMap: [['userid', 'params.userid']],
              },
            },
            children: [
              {
                path: 'posts/:postid((?:[1-9]|10\\))',
                name: 'userPost',
                alias: [':postid((?:[1-9]|10\\))'],
                component: UserPostRoute,
                props: true, // Pass the params as props to the (UserPostRoute) compoent
                meta: {
                  title: {
                    default: 'User Post',
                    isDynamic: true,
                    pattern: 'User #<[userid]> -- Post #<[postid]>',
                    propsMap: [
                      ['userid', 'params.userid'],
                      ['postid', 'params.postid'],
                    ],
                  },
                },
              },
            ],
          },
        ],
      },
      {
        name: 'posts',
        path: 'posts',
        alias: 'p',
        component: PostsRoute,
        meta: {
          title: {
            default: 'Posts',
          },
        },
        children: [
          {
            name: 'post',
            path: ':postid((?:[1-9]|[1-9][0-9]|100\\))',
            component: PostRoute,
            meta: {
              title: {
                default: 'Post',
                isDynamic: true,
                pattern: 'Post #<[postid]>',
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
    component: EventBusView,
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
    component: TodoApp,
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
    component: ComposableView,
    meta: {
      isNav: true,
      title: {
        default: 'Composable',
      },
    },
  },
  {
    path: '/scroll-optim',
    name: 'scrollOptim',
    component: ScrollOptimizerView,
    meta: {
      isNav: true,
      title: {
        default: 'scroll Optimizer',
      },
    },
  },
  {
    path: '/:first?-:last?',
    name: 'test',
    component: TestView,
    meta: {
      title: {
        default: 'Test',
      },
      isNav: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFoundView,
    meta: {
      title: {
        default: '404',
      },
      isNav: false,
    },
  },
];
