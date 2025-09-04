export function observeElementAtTop(
  element: HTMLElement,
  callback: (isAtTop: boolean, entry: IntersectionObserverEntry) => void,
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Check if element is at the top
        const rect = entry.boundingClientRect;
        callback(rect.y <= 0, entry);
      });
    },
    {
      threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      rootMargin: '-1px 0px 0px 0px',
    },
  );

  observer.observe(element);
  return observer;
}

export const toExpo = (n: number) => {
  return n.toString().length > 10 ? n.toExponential(1) : n;
};

export const waitFor = (ms: number) => {
  return new Promise((r) => setTimeout(r, ms));
};

export const lazyFetch = ({
  url,
  fetchOptions,
  ms = 0,
  randomDelay = false,
}: {
  url: string;
  randomDelay?: boolean;
  ms?: number;
  fetchOptions?: RequestInit;
}): Promise<{ data: unknown; err: Error | undefined; ok: boolean }> => {
  const delay = async () => {
    await waitFor(randomDelay ? Math.random() * 1000 + 300 : ms);
  };

  return new Promise((resolve) => {
    fetch(url, fetchOptions)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Faild to fetch ${url}`);
        }

        await delay();
        resolve({
          data: await response.json(),
          err: undefined,
          ok: true,
        });
      })
      .catch(async (reason) => {
        await delay();
        resolve({ data: null, err: reason as Error, ok: false });
      });
  });
};
