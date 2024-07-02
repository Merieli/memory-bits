import { type EventHandlerRequest, type H3Event } from 'h3'
import { GetGroupOfCardsResponseDTO } from '~/dtos/get-group-of-cards-response-dto/getGroupOfCardResponseDto'
import { prisma } from '../client'

/**
 * To get all groups of cards from database
 */
export const findAll = async (event: H3Event<EventHandlerRequest>) => {
    const allGroupsOfCards = await prisma.groups_of_cards
        .findMany()
        .then((groups) => {
            return groups.map((group) => {
                return new GetGroupOfCardsResponseDTO({
                    id: group.id,
                    name: group.name,
                    level_id: group.fk_groups_of_cards__levels__id,
                })
            })
        })

    return {
        data: allGroupsOfCards,
    }
}
