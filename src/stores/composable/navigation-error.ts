import { reactive, readonly } from 'vue';
import type { NavigationFailure, RouteLocationNormalized } from 'vue-router';

type NavigationErrorState = {
  error: Error | NavigationFailure | null;
  from: RouteLocationNormalized | null;
  to: RouteLocationNormalized | null;
};

const state = reactive<NavigationErrorState>({
  error: null,
  from: null,
  to: null,
});

export const useNavigationErrorStore = () => {
  const setNavigationError = (newState: NavigationErrorState) => {
    state.error = newState.error;
    state.from = newState.from;
    state.to = newState.to;
  };

  const clearNavigationError = () => {
    state.error = null;
    state.from = null;
    state.to = null;
  };

  return {
    state: readonly(state),
    setNavigationError,
    clearNavigationError,
  };
};
