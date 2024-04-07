import { type EventHandlerRequest, type H3Event } from 'h3';
import { type CardRequest } from '~/schema/cards.schema';
import { prisma } from '../client';

/**
 * To find cards by group ID in database
 */
export const findByGroupId = async (event: H3Event<EventHandlerRequest>) => {
    const query = getQuery(event);
    const groupId = query.group_id;
    
    if(!groupId || groupId === '0') {
        throw createError({
            statusCode: 400,
            statusMessage: 'No ID provided. /cards/group/[id]'
        })
    }
    
    const cards = await prisma.cards.findMany({
        where: {
            "fk_cards__groups_of_cards__id": +groupId,
        }
    });
    const data: CardRequest[] = cards.map((card) => {
        return {
            id: card.id,
            image_url: card.image_url,
            group_of_cards_id: card.fk_cards__groups_of_cards__id,
        }
    });

    if (data.length === 0) {
        return {
            data: [],
        }
    }

    return {
        data,
    }
}
