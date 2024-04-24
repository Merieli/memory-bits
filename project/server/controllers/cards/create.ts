import { type EventHandlerRequest, type H3Event } from 'h3';
import { ZodError } from 'zod';
import { CreateCardRequestDTO } from '~/dtos/create-card-request-dto/createCardRequestDto';
import { type ResponseApi } from '~/interfaces/ResponseApi.type';
import { prisma } from '../client';

/**
 * Create a new card in the database
 */
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
        if (error instanceof ZodError) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid body',
                data: {
                    type: 'about:blank',
                    title: 'Bad Request',
                    status: 400,
                    detail: 'The received card is invalid, please check the errors and try again.',
                    errors: (error as any).issues,
                    instance: event.path,
                }
            });
        }

        throw error;
    }  
}