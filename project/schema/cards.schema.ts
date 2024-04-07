import { z } from 'zod';

export const cardSchema = z.object({
    id: z.number().optional(),
    image_url: z.string(),
    group_of_cards_id: z.number(),
})

export type CardRequest = z.input<typeof cardSchema>;
