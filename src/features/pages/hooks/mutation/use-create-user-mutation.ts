import { useMutation } from '@tanstack/react-query';
import userAPI from '../../data/api.client';
import { type User } from '../../types';

const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: (payload: User) => userAPI.create(payload).then(res => res.data),
  });
};

export default useCreateProductMutation;
