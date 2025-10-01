import { reactive, ref } from 'vue';
import { useEventListener } from '@/hooks/useEventLestiner';

export type CoordsType = 'page' | 'client' | 'screen' | 'offset';
type CoordsXKey = `${CoordsType}X`;
type CoordsYKey = `${CoordsType}Y`;

/**
 * @param target if ignored the hook will use (window) by default
 * @default target -> window
 * @param type if ignored 'page' will be used by default
 * @default type -> 'page'
 */
export const useMouseMove = (options?: {
  target?: HTMLElement | Window;
  type?: 'page' | 'client' | 'screen' | 'offset';
}) => {
  const mouseCoords = reactive({ x: 0, y: 0 });
  const targetEleRef = ref(options?.target ?? window);
  const coordsType = ref<CoordsType>(options?.type ?? 'page');

  useEventListener(targetEleRef, 'mousemove', (e) => {
    const event = e as MouseEvent;
    const xKey = `${coordsType.value}X` as CoordsXKey;
    const yKey = `${coordsType.value}Y` as CoordsYKey;
    mouseCoords.x = event[xKey];
    mouseCoords.y = event[yKey];
  });

  return { mouseCoords, targetEleRef, coordsType };
};
