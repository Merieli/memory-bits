import { z } from 'zod';
import { AbstractDto } from "../abstractDto";

export const createCardSchema = z.object({
    image_url: z.string(),
    fk_cards__groups_of_cards__id: z.number(),
})

export class CreateCardRequestDTO extends AbstractDto<typeof createCardSchema> {
    protected rules() {
        return createCardSchema;
    }
}