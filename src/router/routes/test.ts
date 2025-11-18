import TestChildViewOne from '@/components/test/TestChildViewOne.vue';
import TestChildViewTwo from '@/components/test/TestChildViewTwo.vue';
import TestView from '@/views/TestView.vue';
import type { _RouteRecordRaw } from 'vue-router';

export const testRouteRecord = {
  path: '/test',
  name: 'test',
  component: TestView,
  meta: {
    title: {
      default: 'Test',
    },
    isNav: true,
    navLinkTitle: 'Test',
  },
  children: [
    {
      path: ':first?-:last?',
      name: 'testChild',
      components: {
        viewOne: TestChildViewOne,
        viewTwo: TestChildViewTwo,
      },
      props: {
        viewOne: (to) => ({
          prop1: 'View',
          prop2: to.params.first,
        }),
        viewTwo: (to) => ({
          prop3: 'View',
          prop4: to.params.last,
        }),
      },
      meta: {
        title: {
          default: 'Test Views',
        },
        isNav: false,
      },
    } satisfies _RouteRecordRaw<'testChild'> as _RouteRecordRaw,
  ],
} satisfies _RouteRecordRaw<'test'>;
