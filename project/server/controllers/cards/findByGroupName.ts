import { type EventHandlerRequest, type H3Event } from 'h3';
import { type ResponseApi } from '~/interfaces/ResponseApi.type';
import { prisma } from '../client';

/**
 * Find cards by query string `group_name` in database
 */
export const findByGroupName = async (event: H3Event<EventHandlerRequest>): Promise<ResponseApi<any>> => {
    const query = getQuery(event);
    const group_name = query.group_name?.toString();
    
    const group = await prisma.groups_of_cards.findUnique({
        where: {
            name: group_name,
        }
    });
    const idGroup = Number(group?.id ?? 0);

    if (!idGroup || idGroup === 0) {
        throw createError({
            statusCode: 200,
            statusMessage: `No find ID for this group name ${group_name}`
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