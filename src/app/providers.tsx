'use client';

import { NextAuthProvider } from '@/shared/components/layout';
import { ReactQueryProvider } from '@/shared/components/react-query';
import { Toaster } from 'sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="top-right" richColors />
      <NextAuthProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </NextAuthProvider>
    </>
  );
}
