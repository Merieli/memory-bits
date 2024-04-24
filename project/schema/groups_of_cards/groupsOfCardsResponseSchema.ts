import { z } from 'zod';

export const groupsOfCardsResponseSchema = z.object({
    id: z.number({
        required_error: 'Please provide a id field for the groups_of_cards',
        invalid_type_error: 'The id must be a number'
    }),
    name: z.string(),
    level_id: z.number({
        required_error: 'Please provide a level_id field for the groups_of_cards',
        invalid_type_error: 'The level_id must be a number'
    }),
});