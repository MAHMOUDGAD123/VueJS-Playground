import '@/assets/styles/main.css';
import '@/assets/fa/css/all.min.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from '@/router';
import { createEventBus } from '@/plugins/event-bus';
import font from '@/directives/font';
import App from '@/App.vue';
import { Logger } from '@/tools/logger';
import AppError from '@/components/_global/AppError.vue';
import AppLoader from '@/components/_global/AppLoader.vue';
import AppRoute from '@/components/_global/AppRoute.vue';
import LoadingSkeleton from '@/components/_global/LoadingSkeleton.vue';
import { createMyData } from '@/stores/composable/global';
import { vuexStore } from './stores/vuex';

const app = createApp(App);

app.use(router); // vue router
app.use(createPinia()); // pinia
app.use(vuexStore); // vuex
app.use(createEventBus()); // event bus
app.use(createMyData()); // composable global store

// Global Components
app.component('AppError', AppError);
app.component('AppLoader', AppLoader);
app.component('AppRoute', AppRoute);
app.component('LoadingSkeleton', LoadingSkeleton);

// Global Custom Directives
app.directive('font', font);

// global provided values (for testing)
app.provide('appName', 'VUEJS PLAYGROUND');
app.provide('developedBy', 'Mahmoud Gad');

app.config.errorHandler = (err, instance, info) => {
  // navigateToErrorPage(err as Error, router.currentRoute.value);

  if (import.meta.env.DEV) {
    const logger = new Logger('Vue');
    logger.error(`${(err as Error).message}`, 'Error');
    logger.error(`${info}`, 'Info');
    if (instance?.$route) {
      logger.error(instance.$route.fullPath, 'Route');
    }
    logger.line();
  }
};

app.config.warnHandler = (msg, instance, trace) => {
  if (import.meta.env.DEV) {
    const logger = new Logger('Vue');
    logger.warn(`${msg}`, 'Msg');
    logger.warn(`\n\n${trace.split('at').join('-> ')}\n`, 'Trace');
    if (instance?.$route) {
      logger.warn(instance.$route.fullPath, 'Route');
    }
    logger.line();
  }
};

// Wait for router to be ready before mounting
await router.isReady();

// mount the app
app.mount('#app');
