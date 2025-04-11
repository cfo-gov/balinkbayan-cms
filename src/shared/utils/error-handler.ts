import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const errorHandler = (error: unknown) => {
  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message);
    return;
  }

  toast.error('Internal error');
};
