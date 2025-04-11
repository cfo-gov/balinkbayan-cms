'use client';

import React from 'react';
import useResizeObserver from './use-resize-observer';

function useWidth() {
  const [width, setWidth] = React.useState<number | null>(null);

  const onResize = React.useCallback((target: HTMLButtonElement) => {
    setWidth(target.getBoundingClientRect().width);
  }, []);

  const ref = useResizeObserver(onResize);

  return { ref, width };
}

export default useWidth;
