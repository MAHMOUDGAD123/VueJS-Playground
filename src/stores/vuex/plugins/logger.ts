import { createLogger } from 'vuex';

export const loggerPlugin = createLogger({
  collapsed: true,
  logActions: false,
});
