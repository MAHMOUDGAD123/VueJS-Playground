import { reactive, type Plugin } from 'vue';

declare module 'vue' {
  interface ComponentCustomProperties {
    $myData: {
      name: string;
      age: number;
      updateData: () => void;
    };
  }
}

export const myData = reactive({
  name: 'Mahmoud',
  age: 28,
  updateData() {
    if (this.name === 'MG') {
      this.name = 'Mahmoud';
      this.age = 28;
    } else {
      this.name = 'MG';
      this.age = 25;
    }
  },
});

export const createMyData = (): Plugin => ({
  install(app) {
    app.config.globalProperties.$myData = myData;
  },
});
