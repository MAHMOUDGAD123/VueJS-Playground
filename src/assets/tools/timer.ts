export class Timer {
  #timer: number = 0;

  start() {
    this.#timer = performance.now();
  }

  get duration() {
    return formatDuration(performance.now() - this.#timer);
  }
}

export function formatDuration(ms: number) {
  if (ms < 1000) return `${ms.toFixed(0)}ms`;
  const seconds = (ms / 1000).toFixed(2);
  return `${seconds}s`;
}
