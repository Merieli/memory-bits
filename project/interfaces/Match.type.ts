import { z } from 'zod';
import type { matchResponseSchema } from '~/schema/matchs/matchResponseSchema';

export type Match = z.input<typeof matchResponseSchema>;
