import 'vue';
import type AppError from '@/components/_global/AppError.vue';
import type AppLoader from '@/components/_global/AppLoader.vue';
import type AppRoute from '@/components/_global/AppRoute.vue';
import type LoadingSkeleton from '@/components/_global/LoadingSkeleton.vue';

declare module 'vue' {
  interface ComponentCustomOptions {
    customOptions?: Record<string | symbol, unknown>;
  }

  interface ComponentCustomProperties {
    $customProperties?: Record<string | symbol, unknown>;
  }

  interface ComponentCustomProps {
    customProps?: Record<string | symbol, unknown>;
  }

  interface CSSProperties {
    '--custom-css-prop'?: 'A' | 'B' | 'C';
  }

  interface GlobalComponents {
    AppLoader: typeof AppLoader;
    AppError: typeof AppError;
    AppRoute: typeof AppRoute;
    LoadingSkeleton: typeof LoadingSkeleton;
  }
}

export {};
