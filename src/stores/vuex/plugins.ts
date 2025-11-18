import type { _Plugin, ModuleTypeUnion, ValidModulePaths } from 'vuex';

export const testPlugin: _Plugin = async (store) => {
  const modules = import.meta.glob('@/stores/vuex/modules/*.ts', { eager: true });

  setTimeout(() => {
    // Add the modules dynamicaly
    Object.entries(modules).forEach(([path, module]) => {
      const moduleName = /(?<=\/)\w+(?=\.ts$)/.exec(path) as ValidModulePaths;
      const moduleDefault = module as { default: ModuleTypeUnion };
      store.registerModule(moduleName, moduleDefault.default);
    });
  }, 5000);

  return () => {
    console.log('Plugin Cleanup');
  };
};
