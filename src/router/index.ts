import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Update title for every route
router.beforeEach((to, from, next) => {
  // Set the page title
  document.title = to.meta.title as string;

  if (!document.startViewTransition || !from.name) {
    next();
  } else {
    document.startViewTransition(() => {
      next();
    });
  }
});

export { router, routes };
