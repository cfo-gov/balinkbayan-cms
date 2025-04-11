import { Skeleton } from './skeleton';
import { TableCell, TableRow } from './table';

export type TableLoaderProps = {
  rows?: number;
  columns: number;
};

export const TableDataSkeleton = ({ rows = 10, columns }: TableLoaderProps) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, idx) => (
        <TableRow key={idx}>
          {Array.from({ length: columns }).map((_, cellId) => (
            <TableCell key={cellId}>
              <Skeleton className="h-8 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
