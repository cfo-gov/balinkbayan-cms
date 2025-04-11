'use client';

import React from 'react';

function usePagination() {
  const [page, setPage] = React.useState<number>(0);

  const handlePageChange = React.useCallback((page: number) => {
    setPage(page);
  }, []);

  return { page, handlePageChange };
}

export default usePagination;
