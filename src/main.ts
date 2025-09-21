import '@/assets/styles/main.css';
import '@/assets/fa/css/all.min.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router';
import { createEventBus } from '@/plugins/event-bus';
import App from './App.vue';
import font from '@/directives/font';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(createEventBus());

// Global Custom Directives
app.directive('font', font);

// global provided values (for testing)
app.provide('appName', 'VUEJS PLAYGROUND');
app.provide('developedBy', 'Mahmoud Gad');

// mount the app
app.mount('#app');
