import { type EventHandlerRequest, type H3Event } from 'h3'
import { findAll } from './findAll'
import { findByUserId } from './findByUserId'

export interface QueryGetMatchs {
    user_id?: number
}

export const handleGet = async (event: H3Event<EventHandlerRequest>) => {
    const query: QueryGetMatchs = getQuery(event)

    if (query.user_id) {
        const response = await findByUserId(event)

        return {
            filtering: {
                user_id: query.user_id,
            },
            ...response,
        }
    }

    return await findAll(event)
}
