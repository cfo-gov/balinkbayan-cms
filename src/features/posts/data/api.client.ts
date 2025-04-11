import { type AxiosResponse } from 'axios';

import api from '@/shared/data/api';
import { type ApiParams } from '@/shared/types/commons';
import ServerAccess from '@/shared/utils/server-access';
import { type Product } from '../types';

class ProductAPI extends ServerAccess {
  constructor() {
    super({
      RESOURCE_PATH: '/products',
    });
  }

  create(newProduct: Product): Promise<AxiosResponse<Product>> {
    return this.server.post('', newProduct);
  }

  getAll(params?: ApiParams): Promise<AxiosResponse<Product[]>> {
    return this.server.get('', { params });
  }

  getById(id: string) {
    return this.server.get(`/${id}`);
  }

  update(id: string, product: Partial<Product>) {
    return this.server.put(`/${id}`, product);
  }

  delete(id: string) {
    return api.delete(`/${id}`);
  }
}

const productAPI = new ProductAPI();

export default productAPI;
