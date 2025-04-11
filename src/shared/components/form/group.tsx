import { cn } from '@/shared/lib/utils';
import { type PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  className?: string;
};

const Group = (props: Props) => {
  return <div className={cn(props.className)}>{props.children}</div>;
};

export default Group;
