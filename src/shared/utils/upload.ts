import { toast } from 'sonner';
import api from '../data/api';
import { errorHandler } from './error-handler';

export const imageUpload = async (file: File) => {
  const formData = new FormData();

  const notification = toast.loading('Upload in progress, please wait...');
  formData.append('files', file);

  try {
    const { data } = await api.post('/utilities/image-uploads', formData);

    toast.success('Upload successfully!', {
      id: notification,
      duration: 3000,
    });

    return data;
  } catch (error) {
    errorHandler(error);
  }
};
