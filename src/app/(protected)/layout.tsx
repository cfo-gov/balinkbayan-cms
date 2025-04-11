import { PageLayout } from '@/shared/components/layout';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <PageLayout>{children}</PageLayout>;
}
