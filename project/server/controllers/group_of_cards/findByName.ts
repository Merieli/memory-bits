import { type EventHandlerRequest, type H3Event } from 'h3';
import { prisma } from '../client';

/**
 * To find one group of cards by name in database
 */
export const findByName = async (event: H3Event<EventHandlerRequest>) => {
    const nameOfGroup = event.context.params?.name;

    if(!nameOfGroup) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No name provided. /group_of_cards/[name]'
        })
    }

    const groupOfCardByName = await prisma.groups_of_cards.findUnique({
        where: {
            name: nameOfGroup,
        }
    });

    return {
        data: groupOfCardByName,
    };
}