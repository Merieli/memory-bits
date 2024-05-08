import { z } from 'zod';
import { userDatabaseSchema } from '../schema/users/userDatabase.schema';

export type User = z.input<typeof userDatabaseSchema> & {
    id: number;
};
