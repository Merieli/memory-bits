import { type EventHandlerRequest, type H3Event } from 'h3';
import { type ResponseApi } from '~/interfaces/ResponseApi.type';
import { prisma } from '../client';

/**
 * Find user by query string `name` in database
 */
export const findByName = async (event: H3Event<EventHandlerRequest>): Promise<ResponseApi<any>> => {
    const query = getQuery(event);
    const name = query.name?.toString();
    
    if (!name) {
        throw createError({
            statusCode: 400,
            statusMessage: `No find user for this name ${name}`
        })
    }

    const user = await prisma.users.findUnique({
        where: {
            username: name,
        }
    });
    
    return {
        data: user,
    };
}