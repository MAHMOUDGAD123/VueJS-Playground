import { computed, onScopeDispose, onUnmounted, ref } from 'vue';

export const useStopWatch = () => {
  // Data
  let interval: NodeJS.Timeout;
  let startPoint = 0;
  let pausePoint = 0;
  const _count = ref('0.0');
  const _paused = ref(true);
  const _stopped = ref(true);
  const delay = 100; // ms

  // Methods
  const clear = () => {
    clearInterval(interval);
  };

  const startInterval = () => {
    interval = setInterval(() => {
      _count.value = ((performance.now() - startPoint) / 1000).toFixed(1);
    }, delay);
  };

  const reset = () => {
    clear();
    _count.value = '0.0';
    _stopped.value = true;
    _paused.value = false;
  };

  const stop = () => {
    clear();
    _stopped.value = true;
    _paused.value = false;
  };

  const start = () => {
    if (_paused.value) {
      startPoint += performance.now() - pausePoint;
    } else {
      _count.value = '0.0';
      startPoint = performance.now();
    }
    startInterval();
    _stopped.value = false;
    _paused.value = false;
  };

  const pause = () => {
    pausePoint = performance.now();
    clear();
    _paused.value = true;
    _stopped.value = false;
  };

  const toggle = () => {
    if (_paused.value || _stopped.value) {
      start();
    } else {
      pause();
    }
  };

  // Life Cycle
  onUnmounted(() => {
    clear();
  });
  onScopeDispose(() => {
    clear();
  });

  return {
    timer: computed(() => _count.value),
    paused: computed(() => _paused.value),
    stopped: computed(() => _stopped.value),
    start,
    pause,
    toggle,
    reset,
    stop,
  };
};
