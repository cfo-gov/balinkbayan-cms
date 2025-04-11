import { z } from 'zod';
import { STAGES } from './shared/constants/env';

const envClientSchema = z.object({
  STAGE: z.nativeEnum(STAGES).default(STAGES.Dev),
  API_URL: z.string(),
});

/**
 * Accessible in the server and client environment.
 */
export const envClientConfig = envClientSchema.parse({
  STAGE: process.env.NEXT_PUBLIC_STAGE,
  API_URL: process.env.NEXT_PUBLIC_API_URL,
});

export type EnvClientConfig = z.infer<typeof envClientSchema>;
