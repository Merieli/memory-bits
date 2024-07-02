import { type EventHandlerRequest, type H3Event } from 'h3'
import { type Card } from '~/interfaces/Card.type'
import { type ResponseApi } from '~/interfaces/ResponseApi.type'
import { prisma } from '../client'

/**
 * To find cards by level id in database
 */
export const findByLevelId = async (
    event: H3Event<EventHandlerRequest>
): Promise<ResponseApi<Card[]>> => {
    const query = getQuery(event)
    const level_id = query.level_id

    if (!level_id || level_id === '0') {
        throw createError({
            statusCode: 400,
            statusMessage: 'No ID provided. /cards?[level]',
        })
    }

    const groupOfCards = await prisma.groups_of_cards.findFirst({
        where: {
            fk_groups_of_cards__levels__id: +level_id,
        },
    })

    if (!groupOfCards) {
        return {
            data: [],
        }
    }

    const idOfGroup = groupOfCards.id

    const cards = await prisma.cards.findMany({
        where: {
            fk_cards__groups_of_cards__id: +idOfGroup,
        },
    })
    if (cards.length === 0) {
        return {
            data: [],
        }
    }

    const data: Card[] = cards.map((card) => {
        return {
            id: card.id,
            image_url: card.image_url,
            group_of_cards_id: card.fk_cards__groups_of_cards__id,
        }
    })

    return {
        data,
    }
}
