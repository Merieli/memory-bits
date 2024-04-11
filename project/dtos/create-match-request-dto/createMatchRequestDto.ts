import { z } from 'zod';
import { AbstractDto } from "../abstractDto";

export const createMatchSchema = z.object({
    attempts: z.number().int().min(-32768, {
        message: 'The attempts must be greater than -32768'
    }).max(32767, {
        message: 'The attempts must be less than 32767'
    }).optional(),
    score: z.number().int().min(-2147483648, {
        message: 'The score must be greater than -2147483648'
    }).max(2147483647, {
        message: 'The score must be less than 2147483647'
    }),
    time: z.number().max(9999.99).optional(),
    fk_matchs__users__id: z.number(),
    fk_matchs__levels__id: z.number(),
    fk_matchs__groups_of_cards__id: z.number(),
})

export class CreateMatchRequestDTO extends AbstractDto<typeof createMatchSchema> {
    protected rules() {
        return createMatchSchema;
    }
}