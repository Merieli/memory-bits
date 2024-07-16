import { type EventHandlerRequest, type H3Event } from 'h3'
import { prisma } from '../client'

/**
 * To find one card by id in database
 */
export const findById = async (event: H3Event<EventHandlerRequest>) => {
    const id = Number(event.context.params?.id)

    if (!id || id === 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No ID provided. /cards/[id]',
        })
    }

    const card = await prisma.cards.findUnique({
        where: {
            id,
        },
    })

    return {
        data: {
            id: card?.id,
            image_url: card?.image_url,
            group_of_cards_id: card?.fk_cards__groups_of_cards__id,
        }
    }
}
