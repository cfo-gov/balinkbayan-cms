import { Button } from '@/shared/components/ui/button';
import { TableCell, TableEmpty, TableRow } from '@/shared/components/ui/table';
import { truncate } from 'lodash';
import Link from 'next/link';
import { type Product } from '../types';

type Props = {
  data?: Product[];
};
const PostContent = ({ data }: Props) => {
  return (
    <>
      {data?.length ? (
        data.map(v => (
          <TableRow key={v.id} className="even:bg-slate-50">
            <TableCell className="py-2.5">{v.name}</TableCell>
            <TableCell className="py-2.5">PHP {v.price}</TableCell>
            <TableCell className="py-2.5 pr-8">
              {truncate(v.description, { length: 100 })}
            </TableCell>
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
        <TableEmpty colSpan={4} label="No products found." />
      )}
    </>
  );
};

export default PostContent;
