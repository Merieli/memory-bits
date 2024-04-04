import { type EventHandlerRequest, type H3Event } from 'h3';
import { prisma } from '../client';
import { findAll } from './findAll';

/**
 * Find cards by query string `group_name` in database
 */
export const findByGroupName = async (event: H3Event<EventHandlerRequest>) => {
    const query = getQuery(event);
    const group_name = query.group_name?.toString();

    if (!group_name) {
        return await findAll(event);
    }

    const group = await prisma.groups_of_cards.findUnique({
        where: {
            name: group_name,
        }
    });
    const idGroup = Number(group?.id ?? 0);

    if(!idGroup || idGroup === 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No ID provided. /cards/group/[id]'
        })
    }

    const cards = await prisma.cards.findMany({
        where: {
            "fk_cards__groups_of_cards__id": idGroup,
        }
    })



    return {
        data: cards
    };
}