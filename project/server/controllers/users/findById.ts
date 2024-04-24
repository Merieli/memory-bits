import { type EventHandlerRequest, type H3Event } from 'h3';
import { prisma } from '../client';

/**
 * To find one user by id in database
 */
export const findById = async (event: H3Event<EventHandlerRequest>) => {
    const id = Number(event.context.params?.id);

    if(!id || id === 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No ID provided. /users/[id]'
        })
    }

    const user = await prisma.users.findUnique({
        where: {
            id,
        }
    });

    return {
        data: user,
    };
}