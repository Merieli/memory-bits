import { type EventHandlerRequest, type H3Event } from 'h3';
import { type ResponseApi } from '~/interfaces/ResponseApi.type';
import { prisma } from '../client';


export const findById = async (event: H3Event<EventHandlerRequest>): Promise<ResponseApi<any>> => {
    const id = Number(event.context.params?.id);

    if(!id || id === 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No ID provided. /matchs/[id]'
        })
    }

    const matchs = await prisma.matchs.findUnique({
        where: {
            id,
        }
    });

    return {
        data: matchs,
    }

}