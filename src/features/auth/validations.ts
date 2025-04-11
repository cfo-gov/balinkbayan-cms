import { VALIDATOR_MESSAGE } from '@/shared/constants/commons';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().nonempty(VALIDATOR_MESSAGE.Required).email(),
  password: z.string().nonempty(VALIDATOR_MESSAGE.Required),
});
