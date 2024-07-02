import { type EventHandlerRequest, type H3Event } from 'h3'
import { findByName } from './findByName'

export interface QueryGetUsers {
    name?: string
}

export const handleGet = async (event: H3Event<EventHandlerRequest>) => {
    const query: QueryGetUsers = getQuery(event)
    const response = await findByName(event)

    return {
        filtering: {
            name: query.name,
        },
        ...response,
    }
}
