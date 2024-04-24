import { userDatabaseSchema } from '~/schema/users/userDatabase.schema';
import { AbstractDto } from "../abstractDto";

export const createUserDatabaseSchema = userDatabaseSchema.strict();

export class CreateUserRequestDTO extends AbstractDto<typeof createUserDatabaseSchema> {
    protected rules() {
        return createUserDatabaseSchema;
    }
}