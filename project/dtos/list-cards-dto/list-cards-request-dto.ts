import { usersSchema } from "~/schema/users.schema";
import { AbstractDto } from "../abstractDto";

export class ListCardsRequestDTO extends AbstractDto<typeof usersSchema> {
    protected rules() {
        return usersSchema;
    }
}