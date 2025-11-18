import PostRoute from '@/components/router/post/PostRoute.vue';
import PostsRoute from '@/components/router/posts/PostsRoute.vue';
import UserPostRoute from '@/components/router/user-post/UserPostRoute.vue';
import UserRoute from '@/components/router/user/UserRoute.vue';
import UsersRoute from '@/components/router/users/UsersRoute.vue';
import DynamicRouteTest from '@/components/router/new-route/DynamicRouteTest.vue';
import VueRouterView from '@/views/VueRouterView.vue';
import type { _RouteRecordRaw } from 'vue-router';

export const vueRouterRouteRecord = {
  path: '/vue-router',
  name: 'vueRouter',
  alias: ['/router', '/router-test'],
  component: VueRouterView,
  meta: {
    title: {
      default: 'Vue Router',
    },
    isNav: true,
    navLinkTitle: 'Router',
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
            } satisfies _RouteRecordRaw<'userPost'>,
          ],
        } satisfies _RouteRecordRaw<'user'>,
      ],
    } satisfies _RouteRecordRaw<'users'>,
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
        } satisfies _RouteRecordRaw<'post'>,
      ],
    } satisfies _RouteRecordRaw<'posts'>,
    {
      name: 'newRouteTest',
      path: 'new-route-test',
      component: DynamicRouteTest,
      meta: {
        title: {
          default: 'New Route Test',
        },
      },
    } satisfies _RouteRecordRaw<'newRouteTest'> as _RouteRecordRaw,
  ],
} satisfies _RouteRecordRaw<'vueRouter'>;
