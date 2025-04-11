import Posts from '@/features/posts/components/post';
import { PageHeader } from '@/shared/components/partials';
import { ROUTES } from '@/shared/constants/routes';

const ProductsPage = () => {
  return (
    <div className="mb-20 mt-12 space-y-12">
      <PageHeader
        title="Posts"
        btnLabel="New page"
        withIcon
        navigateTo={ROUTES.posts + '/new'}
      />

      <Posts />
    </div>
  );
};

export default ProductsPage;
