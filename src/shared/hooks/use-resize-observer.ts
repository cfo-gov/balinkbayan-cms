'use client';

import { useEffect, useRef } from 'react';

function useResizeObserver<T extends HTMLElement>(
  callback: (target: T, entry: ResizeObserverEntry) => void
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref?.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver(entries => {
      callback(element, entries[0]);
    });

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [callback, ref]);

  return ref;
}

export default useResizeObserver;
