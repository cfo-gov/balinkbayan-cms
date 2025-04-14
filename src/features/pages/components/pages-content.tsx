import { Button } from '@/shared/components/ui/button';
import { TableCell, TableEmpty, TableRow } from '@/shared/components/ui/table';
import Link from 'next/link';
import { type User } from '../types';

type Props = {
  data?: User[];
};
const PagesContent = ({ data }: Props) => {
  return (
    <>
      {data?.length ? (
        data.map(v => (
          <TableRow key={v.id} className="even:bg-slate-50">
            <TableCell className="py-2.5">{v.name}</TableCell>
            <TableCell className="py-2.5">{v.email}</TableCell>
            <TableCell className="py-2.5">{`${v.city}, ${v.country}`}</TableCell>
            <TableCell className="py-2.5">
              <div className="text-right">
                <Link href="#">
                  <Button variant="link" className="text-blue-700">
                    Edit
                  </Button>
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableEmpty colSpan={4} label="No users found." />
      )}
    </>
  );
};

export default PagesContent;
