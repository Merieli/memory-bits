import { type EventHandlerRequest, type H3Event } from 'h3';
import { CreateUserRequestDTO } from '~/dtos/create-user-request-dto/createUserRequestDto';
import { type ResponseApi } from '~/interfaces/ResponseApi.type';
import type { User } from '~/interfaces/User.type';
import { prisma } from '../client';

/**
 * Create a user in the database 
 */
export const create = async (event: H3Event<EventHandlerRequest>): Promise<ResponseApi<User>> => {
    const body = await readBody(event);

    if (!body.username) {
        throw createError({
            statusCode: 400,
            statusMessage: 'The username is required'
        });
    }

    const transformedBody = {
        username: body.username,
    }
    const data = new CreateUserRequestDTO(transformedBody);

    const user = await prisma.users.create({
        data: data.getAll(),
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: 'The username is already in use'
        });
    });

    return {
        data: user
    };
}
