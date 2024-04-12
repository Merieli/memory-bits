import { z } from 'zod';
import { AbstractDto } from "../abstractDto";

export const createCardSchema = z.object({
    image_url: z.string({ 
        required_error: 'Please provide an image_url field for the card', 
        invalid_type_error: 'The image_url must be a string'
    }),
    fk_cards__groups_of_cards__id: z.number({ 
        required_error: 'Please provide a group_of_cards_id field for the card',
        invalid_type_error: 'The group_of_cards_id must be a number'
    }),	
})

export class CreateCardRequestDTO extends AbstractDto<typeof createCardSchema> {
    protected rules() {
        return createCardSchema.required();
    }
}