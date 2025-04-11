import { useMutation } from '@tanstack/react-query';
import productAPI from '../../data/api.client';
import { type Product } from '../../types';

const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: (payload: Product) => productAPI.create(payload).then(res => res.data),
  });
};

export default useCreateProductMutation;
