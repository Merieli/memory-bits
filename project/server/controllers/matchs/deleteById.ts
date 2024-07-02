import { type EventHandlerRequest, type H3Event } from 'h3'
import { type ResponseApi } from '~/interfaces/ResponseApi.type'
import { prisma } from '../client'

/**
 * To delete one match by id in database
 */
export const deleteById = async (
    event: H3Event<EventHandlerRequest>
): Promise<ResponseApi<any>> => {
    const id = event.context.params?.id

    if (!id || id === '0') {
        throw createError({
            statusCode: 400,
            statusMessage: 'No ID provided. /matchs/[id]',
        })
    }

    const response = await prisma.matchs.delete({
        where: {
            id: +id,
        },
    })

    return {
        data: {
            id: response.id,
            attempts: response.attempts,
            score: response.score,
            time: response.time,
            user_id: response.fk_matchs__users__id,
            level_id: response.fk_matchs__levels__id,
            group_of_cards_id: response.fk_matchs__groups_of_cards__id,
        },
    }
}
