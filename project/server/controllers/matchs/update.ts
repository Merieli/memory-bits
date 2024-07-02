import { type EventHandlerRequest, type H3Event } from 'h3'
import { ZodError } from 'zod'
import { CreateMatchRequestDTO } from '~/dtos/create-match-request-dto/createMatchRequestDto'
import { type CreateMatchBodyPost } from '~/interfaces/api/CreateMatchBodyPost'
import { type ResponseApi } from '~/interfaces/ResponseApi.type'
import { prisma } from '../client'

/**
 * Update a match in the database
 */
export const update = async (
    event: H3Event<EventHandlerRequest>
): Promise<ResponseApi<any>> => {
    try {
        const id = event.context.params?.id

        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'No ID provided. /matchs/:id',
            })
        }

        const body: CreateMatchBodyPost = await readBody(event)
        const transformedBody = {
            attempts: body.attempts,
            score: body.score,
            time: body.time,
            fk_matchs__users__id: body.user_id,
            fk_matchs__levels__id: body.level_id,
            fk_matchs__groups_of_cards__id: body.group_of_cards_id,
        }
        const data = new CreateMatchRequestDTO(transformedBody)

        const response = await prisma.matchs
            .update({
                where: {
                    id: +id,
                },
                data: data.getAll(),
            })
            .then((data) => {
                return {
                    attempts: data.attempts,
                    score: data.score,
                    time: data.time,
                    user_id: data.fk_matchs__users__id,
                    level_id: data.fk_matchs__levels__id,
                    group_of_cards_id: data.fk_matchs__groups_of_cards__id,
                }
            })

        return {
            data: response,
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
