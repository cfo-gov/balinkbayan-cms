import type { z } from 'zod';
import type { loginSchema } from './validations';

export type LoginPayload = z.infer<typeof loginSchema>;
