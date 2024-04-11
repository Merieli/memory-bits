import { type EventHandlerRequest, type H3Event } from 'h3';
import { z } from 'zod';
import { CreateCardRequestDTO } from '~/dtos/create-card-request-dto/createCardRequestDto';
import { type ResponseApi } from '~/interfaces/ResponseApi.type';
import { prisma } from '../client';

export const create = async (event: H3Event<EventHandlerRequest>): Promise<ResponseApi<any>> => {
    try {
        const body = await readBody(event);
        const data = new CreateCardRequestDTO(body);
        
        await prisma.cards.create({
            data: data.getAll(),
        });
    
        return {
            data
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid body',
                data: {
                    type: 'about:blank',
                    title: 'Bad Request',
                    status: 400,
                    detail: 'The body accepts only the following fields: image_url, fk_cards__groups_of_cards__id',
                    errors: (error as any).issues,
                    instance: event.path,
                }
            });
        }

        throw error;
    }  
}