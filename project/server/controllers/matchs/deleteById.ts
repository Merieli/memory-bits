import { type EventHandlerRequest, type H3Event } from 'h3';
import { ResponseApi } from '~/interfaces/ResponseApi.type';
import { prisma } from '../client';

/**
 * To delete one match by id in database
 */
export const deleteById = async (event: H3Event<EventHandlerRequest>): Promise<ResponseApi<any>> => {   
    const id = event.context.params?.id;

    if(!id || id === '0') {
        throw createError({
            statusCode: 400,
            statusMessage: 'No ID provided. /matchp/[id]'
        })
    }

    await prisma.matchs.delete({
        where: {
            id: +id,
        }
    });

    return {
        data: {
            id: +id,
        }
    };
}