import { reactive, readonly } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

type ErrorStateType = {
  error: Error | null;
  route: RouteLocationNormalizedLoaded | null;
};

const state = reactive<ErrorStateType>({
  error: null,
  route: null,
});

export const useErrorStore = () => {
  const setError = (newState: ErrorStateType) => {
    state.error = newState.error;
    state.route = newState.route;
  };

  const clearError = () => {
    state.error = null;
    state.route = null;
  };

  return {
    state: readonly(state),
    setError,
    clearError,
  };
};
