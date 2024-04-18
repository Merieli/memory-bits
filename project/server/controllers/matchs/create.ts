import { type EventHandlerRequest, type H3Event } from 'h3';
import { CreateMatchRequestDTO } from '~/dtos/create-match-request-dto/createMatchRequestDto';
import { CreateMatchResponseDTO } from '~/dtos/create-match-response-dto/createMatchResponseDto';
import { type CreateMatchBodyPost } from '~/interfaces/api/CreateMatchBodyPost';
import { type ResponseApi } from '~/interfaces/ResponseApi.type';
import { prisma } from '../client';

/**
 * Create a match in the database
 * 
 * @param event 
 * @returns 
 */
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

    const response = new CreateMatchResponseDTO({
        attempts: data.get('attempts'),
        score: data.get('score'),
        time: data.get('time'),
        user_id: data.get('fk_matchs__users__id'),
        level_id: data.get('fk_matchs__levels__id'),
        group_of_cards_id: data.get('fk_matchs__groups_of_cards__id')
    })

    return {
        data: response
    };
}
