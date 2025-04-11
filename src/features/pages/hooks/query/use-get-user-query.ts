import { type QueryOpt } from '@/shared/types/commons';
import { useQuery } from '@tanstack/react-query';
import userAPI from '../../data/api.client';
import { type User } from '../../types';
import { USER_QUERY_KEYS } from '../keys';

export const useGetUsersQuery = (id: string, options?: QueryOpt<User>) => {
  return useQuery({
    queryKey: [USER_QUERY_KEYS.Users, { id }],
    queryFn: () => userAPI.getById(id).then(res => res.data),
    ...options,
  });
};
