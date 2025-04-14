import Pages from '@/features/pages/components/pages';
import { PageHeader } from '@/shared/components/partials';
import { ROUTES } from '@/shared/constants/routes';

const UsersPage = () => {
  return (
    <div className="mb-20 mt-12 space-y-12">
      <PageHeader title="Pages" btnLabel="New post" withIcon navigateTo={ROUTES.pages + '/new'} />

      <Pages />
    </div>
  );
};

export default UsersPage;
