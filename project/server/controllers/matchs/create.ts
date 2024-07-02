import { type EventHandlerRequest, type H3Event } from 'h3'
import { ZodError } from 'zod'
import { CreateMatchRequestDTO } from '~/dtos/create-match-request-dto/createMatchRequestDto'
import { type CreateMatchBodyPost } from '~/interfaces/api/CreateMatchBodyPost'
import type { MatchState } from '~/interfaces/Match.type'
import { type ResponseApi } from '~/interfaces/ResponseApi.type'
import { prisma } from '../client'

/**
 * Create a match in the database
 */
export const create = async (
    event: H3Event<EventHandlerRequest>
): Promise<ResponseApi<MatchState>> => {
    try {
        const body: CreateMatchBodyPost = await readBody(event)
        const transformedBody = {
            attempts: body.attempts,
            score: body.score,
            time: body.time,
            fk_matchs__users__id: body.user_id,
            fk_matchs__levels__id: body.level_id,
            fk_matchs__groups_of_cards__id: body.group_of_cards_id,
        }
        const dataToSave = new CreateMatchRequestDTO(transformedBody)

        const response: any = await prisma.matchs.create({
            data: dataToSave.getAll(),
        })

        return {
            data: {
                id: response.id,
                attempts: response.attempts,
                score: response.score,
                time: response.time,
                user_id: response.fk_matchs__users__id,
                level_id: response.fk_matchs__levels__id,
                group_of_cards_id: response.fk_matchs__groups_of_cards__id,
            },
        }
    } catch (error) {
        if (error instanceof ZodError) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid body',
                data: {
                    type: 'about:blank',
                    title: 'Bad Request',
                    status: 400,
                    detail: 'The received match is invalid, please check the errors and try again.',
                    errors: (error as any).issues,
                    instance: event.path,
                },
            })
        }

        throw error
    }
}
