import { Logger } from '@/tools/logger';
import { createPinia, type PiniaPlugin } from 'pinia';
import { toRaw } from 'vue';

const pinia = createPinia();

const registerResetPlugin: PiniaPlugin = (ctx) => {
  // Extract initial state for all stores
  const initialState = (() => {
    // eslint-disable-next-line
    const rawValue: Record<PropertyKey, any> = {};
    for (const prop in ctx.store.$state) {
      rawValue[prop] = structuredClone(toRaw(ctx.store.$state[prop]));
    }
    return rawValue;
  })();

  ctx.store.$reset = () => {
    ctx.store.$patch(initialState);
    const logger = new Logger('Pinia');
    logger.success(`(${ctx.store.$id}) store reset`);
  };
};

const registerSubscribePlugin: PiniaPlugin = (ctx) => {
  const logger = new Logger('Pinia');

  ctx.store.$subscribe((mutation) => {
    logger.success(`(${mutation.storeId}) -> [${mutation.type}]`, 'Mutation');
  });

  ctx.store.$onAction((ctx) => {
    logger.success(`(${ctx.store.$id}) -> [${ctx.name}]`, 'Action');
  });
};

const addSecretPlugin: PiniaPlugin = () => {
  return { secret: 'Shhhh 🤫' };
};

pinia.use(registerResetPlugin);
pinia.use(registerSubscribePlugin);
pinia.use(addSecretPlugin);

export { pinia };
