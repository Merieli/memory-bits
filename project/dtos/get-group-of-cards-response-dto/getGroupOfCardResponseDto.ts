import { groupsOfCardsResponseSchema } from '~/schema/groups_of_cards/groupsOfCardsResponseSchema'
import { AbstractDto } from '../abstractDto'

export class GetGroupOfCardsResponseDTO extends AbstractDto<
    typeof groupsOfCardsResponseSchema
> {
    protected rules() {
        return groupsOfCardsResponseSchema.required()
    }
}
