import { matchResponseSchema } from '~/schema/matchs/matchResponseSchema';
import { AbstractDto } from "../abstractDto";

const createMatchDatabaseSchema = matchResponseSchema.omit({
    id: true,
}).strict();

export class CreateMatchResponseDTO extends AbstractDto<typeof createMatchDatabaseSchema> {
    protected rules() {
        return createMatchDatabaseSchema;
    }
}