import type { z } from 'zod'
import type { userDatabaseSchema } from '../schema/users/userDatabase.schema'

export type User = z.input<typeof userDatabaseSchema> & {
    id: number
}
