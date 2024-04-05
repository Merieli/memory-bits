import { z } from 'zod';

export const usersSchema = z.object({
    id: z.number(),
    image_url: z.string(),
    group_of_cards_id: z.number(),
})
