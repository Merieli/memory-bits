import { z } from 'zod'

export const matchDatabaseSchema = z.object({
    attempts: z
        .number()
        .int()
        .min(-32768, {
            message: 'The attempts must be greater than -32768',
        })
        .max(32767, { message: 'The attempts must be less than 32767' })
        .optional(),
    score: z
        .number({
            required_error: 'Please provide a score field for the match',
        })
        .int()
        .min(-2147483648, {
            message: 'The score must be greater than -2147483648',
        })
        .max(2147483647, {
            message: 'The score must be less than 2147483647',
        }),
    time: z.number().max(9999.99).optional(),
    fk_matchs__users__id: z.number({
        required_error: 'Please provide a user_id field for the match',
        invalid_type_error: 'The user_id must be a number',
    }),
    fk_matchs__levels__id: z.number({
        required_error: 'Please provide a level_id field for the match',
        invalid_type_error: 'The level_id must be a number',
    }),
    fk_matchs__groups_of_cards__id: z.number({
        required_error:
            'Please provide a group_of_cards_id field for the match',
        invalid_type_error: 'The group_of_cards_id must be a number',
    }),
})
