import { envClientConfig } from '@/env-client';
import axios from 'axios';

/**
 *  You can use this if you have a custom or direct call for an endpoint
 *  Otherwise u can use server-access.ts for modules service ✨
 */

const api = axios.create({
  baseURL: envClientConfig.API_URL,
});

export default api;
