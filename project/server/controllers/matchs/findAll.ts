import { type EventHandlerRequest, type H3Event } from 'h3';
import { type ResponseApi } from '~/interfaces/ResponseApi.type';
import { prisma } from '../client';

/**
 * To get all matchs from database
 */
export const findAll = async (event: H3Event<EventHandlerRequest>): Promise<ResponseApi<any>> => {
    const matchs = await prisma.matchs.findMany();

    return {
        data: matchs,
    };
}