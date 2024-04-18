import { z } from 'zod';
import { matchDatabaseSchema } from './matchDatabase.schema';

const matchIds = z.object({
    id: z.number(),
    users_id: z.number(),
    levels_id: z.number(),
    group_of_cards_id: z.number(),
});

export const matchResponseSchema = matchDatabaseSchema.pick({
    attempts: true,
    score: true,
    time: true,
}).merge(matchIds);