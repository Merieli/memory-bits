import { type EventHandlerRequest, type H3Event } from 'h3';
import { prisma } from '../client';

/**
 * To find cards by group ID in database
 */
export const findByGroupId = async (event: H3Event<EventHandlerRequest>) => {
    const cardId = event.context.params?.id;
    if(!cardId || cardId === '0') {
        throw createError({
            statusCode: 400,
            statusMessage: 'No ID provided. /cards/group/[id]'
        })
    }
    
    const cards = await prisma.cards.findMany({
        where: {
            "fk_cards__groups_of_cards__id": +cardId,
        }
    });

    if (cards.length === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: 'No cards found for this group ID.'
        })
    }

    setResponseStatus(event, 200)
    return {
        data: cards,
    }
}
