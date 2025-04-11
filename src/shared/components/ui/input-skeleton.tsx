import { Skeleton } from './skeleton';

const InputSkeleton = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
};

export default InputSkeleton;
