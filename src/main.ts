import '@/assets/styles/main.css';
import '@/assets/fa/css/all.min.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from '@/router';
import { createEventBus } from '@/plugins/event-bus';
import font from '@/directives/font';
import App from '@/App.vue';
import { Logger } from '@/tools/logger';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(createEventBus());

// Global Custom Directives
app.directive('font', font);

// global provided values (for testing)
app.provide('appName', 'VUEJS PLAYGROUND');
app.provide('developedBy', 'Mahmoud Gad');

if (import.meta.env.DEV) {
  const logger = new Logger('Vue');

  app.config.errorHandler = (err, instance, info) => {
    logger.error(`${(err as Error).message}`, 'Error');
    logger.error(`${info}`, 'Info');
    if (instance?.$route) {
      logger.error(instance.$route.fullPath, 'Route');
    }
    logger.line();
  };

  app.config.warnHandler = (msg, instance, trace) => {
    logger.warn(`${msg}`, 'Msg');
    logger.warn(`\n\n${trace.split('at').join('-> ')}\n`, 'Trace');
    if (instance?.$route) {
      logger.warn(instance.$route.fullPath, 'Route');
    }
    logger.line();
  };
}

// mount the app
app.mount('#app');
