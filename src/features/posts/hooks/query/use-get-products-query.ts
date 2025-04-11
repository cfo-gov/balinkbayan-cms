import { useQuery } from '@tanstack/react-query';

import type { ApiParams, QueryOpt } from '@/shared/types/commons';
import productAPI from '../../data/api.client';
import { type Product } from '../../types';
import { PRODUCT_QUERY_KEYS } from '../keys';

export const useGetProductsQuery = (params?: ApiParams, options?: QueryOpt<Product[]>) => {
  return useQuery({
    queryKey: [PRODUCT_QUERY_KEYS.Products, params],
    queryFn: () => productAPI.getAll(params).then(res => res.data),
    ...options,
  });
};
