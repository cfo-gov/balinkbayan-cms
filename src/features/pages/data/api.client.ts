import { type AxiosResponse } from 'axios';

import type { ApiParams } from '@/shared/types/commons';
import ServerAccess from '@/shared/utils/server-access';
import { type User } from '../types';

class UserAPI extends ServerAccess {
  constructor() {
    super({
      RESOURCE_PATH: '/api/users',
    });
  }

  create(newUser: User): Promise<AxiosResponse<User>> {
    return this.server.post('', newUser);
  }

  getAll(params?: ApiParams): Promise<AxiosResponse<User[]>> {
    return this.server.get('', { params });
  }

  getById(id: string) {
    return this.server.get(`/${id}`);
  }

  update(id: string, user: Partial<User>) {
    return this.server.put(`/${id}`, user);
  }

  delete(id: string) {
    return this.server.delete(`/${id}`);
  }
}

const userAPI = new UserAPI();

export default userAPI;
