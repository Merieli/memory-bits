import { type EventHandlerRequest, type H3Event } from 'h3';
import { type ResponseApi } from '~/interfaces/ResponseApi.type';
import { prisma } from '../client';

/**
 * To get all matchs from database by user_id
 */
export const findByUserId = async (event: H3Event<EventHandlerRequest>): Promise<ResponseApi<any>> => {
    const query = getQuery(event);
    const userId = Number(query.user_id);
    
    const matchs = await prisma.matchs.findMany({
        where: {
            "fk_matchs__users__id": userId,
        }

    });

    return {
        data: matchs,
    };
}