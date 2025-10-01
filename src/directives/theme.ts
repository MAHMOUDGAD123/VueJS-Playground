import type { Directive, FunctionDirective } from 'vue';

type Theme = 'dark' | 'light';
type ThemeDirectiveType = Directive<HTMLElement, Theme, Theme, Theme>;

declare module 'vue' {
  interface ComponentCustomProperties {
    vTheme: ThemeDirectiveType;
  }
}

const themeHookHandler: FunctionDirective<HTMLElement, Theme, Theme, Theme> = (
  ele,
  binding,
  _vnode,
  prevVnode,
) => {
  const arg = binding.arg as Theme;
  if (prevVnode?.dirs && prevVnode.dirs[0].arg) {
    ele.classList.remove(prevVnode.dirs[0].arg);
  }
  ele.classList.add(arg);
};

export default {
  mounted: themeHookHandler,
  beforeUpdate: themeHookHandler,
} satisfies ThemeDirectiveType;
