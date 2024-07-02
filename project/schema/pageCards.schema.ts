import { z } from 'zod'

export const pageCardParams = z.object({
    id: z.coerce
        .number()
        .or(z.string().regex(/\d+/).transform(Number))
        .refine((n) => n >= 0),
})

export type PageCardParams = z.input<typeof pageCardParams>
