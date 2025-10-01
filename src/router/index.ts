import { createRouter, createWebHistory, type CustomRouteLocationNormalized } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const resolveTitle = (route: CustomRouteLocationNormalized) => {
  if (route.meta.title.isDynamic && route.meta.title.pattern) {
    let titleValue = route.meta.title.pattern as string;

    route.meta.title.propsMap!.forEach(([prop, path]) => {
      let propValue = route as unknown;
      const pathArray = path.split('.');
      pathArray.forEach((propKey) => {
        // @ts-ignore
        propValue = propValue[propKey];
      });
      titleValue = titleValue!.replace(`<[${prop}]>`, `${propValue}`);
    });
    document.title = titleValue;
  } else {
    document.title = route.meta.title.default;
  }
};

// Update title for every route
router.beforeEach((to, _from, next) => {
  // Set the page title
  resolveTitle(to);
  next();
});

export { router, routes };
