import { ChevronLeft, ChevronRight } from 'lucide-react';
import { memo } from 'react';
import {
  Pagination as HeadlessPagination,
  NextButton,
  PageButton,
  PrevButton,
  type IPaginationProps,
} from 'react-headless-pagination';

import { buttonVariants } from './button';

type Props = Pick<IPaginationProps, 'currentPage' | 'setCurrentPage' | 'totalPages'> 

const Pagination = (paginationProps: Props) => {
  return (
    <div className="mt-4 pb-10">
      {paginationProps.totalPages > 1 && (
        <HeadlessPagination
          {...paginationProps}
          edgePageCount={2}
          middlePagesSiblingCount={1}
          truncableClassName="w-10 px-0.5 text-center"
          truncableText="..."
          className="flex items-center justify-center gap-x-3"
        >
          <PrevButton className={buttonVariants({ variant: 'outline', size: 'sm' })}>
            <ChevronLeft className="h-4 w-4" />
            <div className="sr-only">Previous</div>
          </PrevButton>

          <ul className="flex items-center justify-center">
            <PageButton
              activeClassName="bg-gray-100 text-gray-900! text-white"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sm"
              inactiveClassName="text-gray-500"
            />
          </ul>

          <NextButton className={buttonVariants({ variant: 'outline', size: 'sm' })}>
            <div className="sr-only">Next</div>
            <ChevronRight className="h-4 w-4" />
          </NextButton>
        </HeadlessPagination>
      )}
    </div>
  );
};

export default memo(Pagination);
