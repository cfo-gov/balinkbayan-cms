import { envClientConfig } from '@/env-client';
import axios, { type AxiosInstance } from 'axios';

type ConstructorParams = {
  RESOURCE_PATH: string;
};

/**
 * You can use this per modules service
 * or you can use api.ts for direct call for an endpoint
 * it's up to you! ✨
 */

class ServerAccess {
  server: AxiosInstance;

  constructor({ RESOURCE_PATH }: ConstructorParams) {
    const instance = axios.create({ baseURL: envClientConfig.API_URL + RESOURCE_PATH });

    this.server = instance;
  }
}

export default ServerAccess;
