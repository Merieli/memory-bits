import { type EventHandlerRequest, type H3Event } from 'h3';
import { type ResponseApi } from '~/interfaces/ResponseApi.type';
import { prisma } from '../client';

/**
 * To get all cards from database
 */
export const findAll = async (event: H3Event<EventHandlerRequest>): Promise<ResponseApi<any>> => {
    const cards = await prisma.cards.findMany();

    return {
        data: cards,
    };
}