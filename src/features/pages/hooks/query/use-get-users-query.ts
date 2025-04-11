import { type ApiParams, type QueryOpt } from '@/shared/types/commons';
import { useQuery } from '@tanstack/react-query';
import userAPI from '../../data/api.client';
import { type User } from '../../types';
import { USER_QUERY_KEYS } from '../keys';

export const useGetUsersQuery = (params?: ApiParams, options?: QueryOpt<User[]>) => {
  return useQuery({
    queryKey: [USER_QUERY_KEYS.Users, params],
    queryFn: () => userAPI.getAll(params).then(res => res.data),
    ...options,
  });
};
