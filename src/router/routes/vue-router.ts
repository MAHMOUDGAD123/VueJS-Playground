import PostRoute from '@/components/router/post/PostRoute.vue';
import PostsRoute from '@/components/router/posts/PostsRoute.vue';
import UserPostRoute from '@/components/router/user-post/UserPostRoute.vue';
import UserRoute from '@/components/router/user/UserRoute.vue';
import UsersRoute from '@/components/router/users/UsersRoute.vue';
import DynamicRouteTest from '@/components/router/new-route/DynamicRouteTest.vue';
import VueRouterView from '@/views/VueRouterView.vue';
import { defineRouteRecord } from 'strict-vue-router';

export const vueRouterRouteRecord = defineRouteRecord<'vueRouter'>({
  name: 'vueRouter',
  path: '/vue-router',
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
          name: 'user',
          path: ':userid((?:[1-9]|10\\))',
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
              name: 'userPost',
              path: 'posts/:postid((?:[1-9]|10\\))',
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
        defineRouteRecord<'post'>({
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
        }),
      ],
    },
    {
      name: 'newRouteTest',
      path: 'new-route-test',
      component: DynamicRouteTest,
      meta: {
        title: {
          default: 'New Route Test',
        },
      },
    },
  ],
});
