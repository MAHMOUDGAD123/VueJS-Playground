import 'vue';

declare module 'vue' {
  interface ComponentCustomOptions {
    permissions?: string[];
  }
}
export {};
