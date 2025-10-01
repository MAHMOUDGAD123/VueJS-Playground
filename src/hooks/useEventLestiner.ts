import { onUnmounted, watch, type Ref } from 'vue';

export const useEventListener = (
  target: Ref,
  type: keyof HTMLElementEventMap,
  cb: (e: AllEventType) => void,
  options?: OptionsType,
) => {
  let oldEle = target.value; // store the old element

  onUnmounted(() => {
    target.value.removeEventListener(type, cb, options);
  });

  watch(
    target,
    (newEle, _, onCleanup) => {
      // Add a new event listener on the new element
      newEle.addEventListener(type, cb, options);
      oldEle = newEle;

      onCleanup(() => {
        // Stop the event listener on the previous element
        oldEle.removeEventListener(type, cb, options);
      });
    },
    { immediate: true },
  );
};

type AllEventType =
  | Event
  | UIEvent
  | AnimationEvent
  | PointerEvent
  | MouseEvent
  | InputEvent
  | ToggleEvent
  | FocusEvent
  | CompositionEvent
  | ClipboardEvent
  | DragEvent
  | ErrorEvent
  | FormDataEvent
  | KeyboardEvent
  | ProgressEvent<EventTarget>
  | SecurityPolicyViolationEvent
  | SubmitEvent
  | TouchEvent
  | TransitionEvent
  | WheelEvent;

type OptionsType = boolean | AddEventListenerOptions;
