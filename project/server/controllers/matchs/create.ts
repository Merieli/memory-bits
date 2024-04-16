import { type EventHandlerRequest, type H3Event } from 'h3';
import { CreateMatchRequestDTO } from '~/dtos/create-match-request-dto/createMatchRequestDto';
import { type CreateMatchBodyPost } from '~/interfaces/api/CreateMatchBodyPost';
import { type ResponseApi } from '~/interfaces/ResponseApi.type';
import { prisma } from '../client';

export const create = async (event: H3Event<EventHandlerRequest>): Promise<ResponseApi<any>> => {
    const body: CreateMatchBodyPost = await readBody(event);
    const transformedBody = {
        attempts: body.attempts,
        score: body.score,
        time: body.time,
        fk_matchs__users__id: body.user_id,
        fk_matchs__levels__id: body.level_id,
        fk_matchs__groups_of_cards__id: body.group_of_cards_id
    }
    const data = new CreateMatchRequestDTO(transformedBody);

    await prisma.matchs.create({
        data: data.getAll(),
    });

    return {
        data
    };
}
