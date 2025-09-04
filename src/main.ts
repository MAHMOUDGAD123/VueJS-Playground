import '@/assets/styles/main.css';
import '@/assets/fa/css/all.min.css';
import { createApp, type DirectiveBinding } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router';
import { createEventBus } from '@/plugins/event-bus';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(createEventBus());

// Global Custom Directives
app.directive(
  'font',
  (
    ele: HTMLElement,
    binding: DirectiveBinding<{ fontSize: number; color: string }, string, string>,
  ) => {
    // this function will be called on (mounted, updated) hooks

    const arg = binding.arg as 'sm' | 'md' | 'lg';
    const modifiers = binding.modifiers as { uppercase: boolean; lowercase: boolean };

    // font-size
    switch (arg) {
      case 'sm': {
        ele.style.fontSize = `15px`;
        break;
      }
      case 'md': {
        ele.style.fontSize = `22px`;
        break;
      }
      case 'lg': {
        ele.style.fontSize = `30px`;
        break;
      }
      default: {
        ele.style.fontSize = `${binding.value.fontSize}px`;
      }
    }

    // color
    if (binding.value) {
      ele.style.color = binding.value.color;
    }

    if (modifiers.uppercase) {
      ele.innerText = ele.innerText.toUpperCase();
    } else if (modifiers.lowercase) {
      ele.innerText = ele.innerText.toLowerCase();
    }
  },
);

// global provided values (for testing)
app.provide('appName', 'VUEJS PLAYGROUND');
app.provide('developedBy', 'Mahmoud Gad');

// mount the app
app.mount('#app');
