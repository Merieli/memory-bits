import { matchDatabaseSchema } from '~/schema/matchs/matchDatabase.schema';
import { AbstractDto } from "../abstractDto";

export const createMatchDatabaseSchema = matchDatabaseSchema;

export class CreateMatchRequestDTO extends AbstractDto<typeof createMatchDatabaseSchema> {
    protected rules() {
        return createMatchDatabaseSchema;
    }
}