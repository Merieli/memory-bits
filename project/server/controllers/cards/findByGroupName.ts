import { type EventHandlerRequest, type H3Event } from 'h3'
import { type ResponseApi } from '~/interfaces/ResponseApi.type'
import { prisma } from '../client'

/**
 * Find cards by query string `group_name` in database
 */
export const findByGroupName = async (
    event: H3Event<EventHandlerRequest>
): Promise<ResponseApi<any>> => {
    const query = getQuery(event)
    const group_name = query.group_name?.toString()

    if (!group_name) {
        throw createError({
            statusCode: 400,
            statusMessage: `No find ID for this group name ${group_name}`,
        })
    }

    const cards = await prisma.cards
        .findMany({
            include: {
                groups_of_cards: {
                    select: {
                        name: true,
                    },
                },
            },
        })
        .then((cards) => {
            return cards
                .map((card) => {
                    return {
                        id: card.id,
                        image_url: card.image_url,
                        group: card.groups_of_cards.name,
                    }
                })
                .filter((card) => card.group === group_name)
        })

    return {
        data: cards,
    }
}
