'use client';

import { QueryClient } from '@tanstack/react-query';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { QUERY_CLIENT_OPTIONS } from '../constants/commons';

export const QueryClientInstanceContext = createContext<{ queryClient: QueryClient | null }>({
  queryClient: null,
});

export const QueryClientInstanceProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(new QueryClient(QUERY_CLIENT_OPTIONS));

  return (
    <QueryClientInstanceContext.Provider value={{ queryClient }}>
      {children}
    </QueryClientInstanceContext.Provider>
  );
};

export const useQueryClientInstance = (): { queryClient: QueryClient } => {
  const { queryClient } = useContext(QueryClientInstanceContext);

  if (!queryClient) {
    throw new Error('No QueryClientInstanceProvider found');
  }

  return { queryClient };
};
