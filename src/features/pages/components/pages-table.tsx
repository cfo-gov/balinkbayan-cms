import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import { type TChildren } from '@/shared/types/commons';

type UsersTableProps = TChildren;

const PagesTable = ({ children }: UsersTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
};
export default PagesTable;
