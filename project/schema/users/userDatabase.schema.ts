import { z } from 'zod'

export const userDatabaseSchema = z.object({
    username: z
        .string()
        .min(4, {
            message: 'The username must be at least 4 characters long',
        })
        .max(50, {
            message: 'The username must be at most 50 characters long',
        }),
})
