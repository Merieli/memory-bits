import { type EventHandlerRequest, type H3Event } from 'h3';
import { type ResponseApi } from '~/interfaces/ResponseApi.type';
import { prisma } from '../client';

/**
 * To get all cards from database
 */
export const deleteById = async (event: H3Event<EventHandlerRequest>): Promise<ResponseApi<any>> => {
    const id = event.context.params?.id;
    
    await prisma.cards.delete({
        where: {
            id: Number(id),
        }
    });

    return {
        data: `Card with id ${id} was deleted.`
    };
}