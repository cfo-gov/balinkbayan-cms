'use client';
import { FormProvider, useForm } from 'react-hook-form';

import Pagination from '@/shared/components/ui/pagination';
import SearchInput from '@/shared/components/ui/search-input';
import { TableDataSkeleton } from '@/shared/components/ui/table-data-skeleton';
import { PAGINATION_PER_PAGE } from '@/shared/constants/commons';
import { usePagination } from '@/shared/hooks';
import { useGetProductsQuery } from '../hooks/query/use-get-products-query';
import PostContent from './post-content';
import PostTable from './post-table';

const Posts = () => {
  const { page, handlePageChange } = usePagination();
  const methods = useForm();

  const { data: products, isLoading } = useGetProductsQuery({
    page: page + 1,
    per_page: PAGINATION_PER_PAGE,
  });

  return (
    <div>
      <div className="mb-4">
        <FormProvider {...methods}>
          <SearchInput />
        </FormProvider>
      </div>

      <PostTable>
        {isLoading ? <TableDataSkeleton columns={4} /> : <PostContent data={products} />}
      </PostTable>

      <Pagination
        currentPage={page}
        setCurrentPage={handlePageChange}
        totalPages={products ? Math.ceil(products?.length / PAGINATION_PER_PAGE) : 0}
      />
    </div>
  );
};

export default Posts;
