import { z } from 'zod'
import { matchDatabaseSchema } from './matchDatabase.schema'

const matchIds = z.object({
    id: z.number(),
    user_id: z.number(),
    level_id: z.number(),
    group_of_cards_id: z.number(),
})

export const matchResponseSchema = matchDatabaseSchema
    .pick({
        attempts: true,
        score: true,
        time: true,
    })
    .merge(matchIds)
