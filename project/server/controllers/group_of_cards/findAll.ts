import { type EventHandlerRequest, type H3Event } from 'h3';
import { prisma } from '../client';

/**
 * To get all groups of cards from database
 */
export const findAll = async (event: H3Event<EventHandlerRequest>) => {
    const allGroupsOfCards = await prisma.groups_of_cards.findMany({
        select: {
            id: true,
            name: true,
            
        }
    });

    return {
        data: allGroupsOfCards,
    };
}
