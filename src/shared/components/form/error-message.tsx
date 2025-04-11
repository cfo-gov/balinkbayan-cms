import { cn } from '@/shared/lib/utils';
import { type PropsWithChildren } from 'react';

type ErrorMessageProps = PropsWithChildren & {
  message?: string;
  className?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className, children }) => {
  return (
    <div className={cn('mt-1 flex items-center gap-x-2', className)}>
      {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
      <span className="error-msg">{message}</span>

      {children}
    </div>
  );
};

export default ErrorMessage;
