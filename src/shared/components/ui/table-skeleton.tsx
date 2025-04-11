import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import { TableDataSkeleton, type TableLoaderProps } from './table-data-skeleton';

type TableSkeletonProps = Omit<TableLoaderProps, 'columns'> & {
  headers: readonly string[];
};

const TableSkeleton = ({ headers, rows }: TableSkeletonProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((head, idx) => (
            <TableHead key={`${head}-${idx}`}>{head}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableDataSkeleton rows={rows} columns={headers.length} />
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
