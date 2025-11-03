import { defineStore } from 'pinia';
import type { NavigationFailure, RouteLocationNormalized } from 'vue-router';

type NavigationErrorState = {
  error: Error | NavigationFailure | null;
  from: RouteLocationNormalized | null;
  to: RouteLocationNormalized | null;
};

export const useNavigationErrorStore = defineStore('navigationError', {
  state: (): NavigationErrorState => ({
    error: null,
    from: null,
    to: null,
  }),

  actions: {
    setNavigationError(newState: NavigationErrorState) {
      this.error = newState.error;
      this.from = newState.from;
      this.to = newState.to;
    },

    clearNavigationError() {
      this.error = null;
      this.from = null;
      this.to = null;
    },
  },
});
