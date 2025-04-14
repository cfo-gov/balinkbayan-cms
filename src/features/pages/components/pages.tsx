'use client';

import { FormProvider, useForm } from 'react-hook-form';

import Pagination from '@/shared/components/ui/pagination';
import SearchInput from '@/shared/components/ui/search-input';
import { TableDataSkeleton } from '@/shared/components/ui/table-data-skeleton';
import { PAGINATION_PER_PAGE } from '@/shared/constants/commons';
import { usePagination } from '@/shared/hooks';
import { useGetUsersQuery } from '../hooks/query/use-get-users-query';
import PagesContent from './pages-content';
import PagesTable from './pages-table';

const Pages = () => {
  const { page, handlePageChange } = usePagination();
  const methods = useForm();

  const { data: users, isLoading } = useGetUsersQuery({
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

      <PagesTable>
        {isLoading ? <TableDataSkeleton columns={4} /> : <PagesContent data={users} />}
      </PagesTable>

      <Pagination
        currentPage={page}
        setCurrentPage={handlePageChange}
        totalPages={Math.ceil(60 / PAGINATION_PER_PAGE)} // 60 is hardcoded, you change it with pageTotal field in your API RESPONSE.
      />
    </div>
  );
};

export default Pages;
