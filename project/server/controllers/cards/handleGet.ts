import { type EventHandlerRequest, type H3Event } from 'h3';
import { findAll } from './findAll';
import { findByGroupId } from './findByGroupId';
import { findByGroupName } from './findByGroupName';

export interface QueryGetCards {
    group_id?: number,
    group_name?: string,
}

export const handleGet = async (event: H3Event<EventHandlerRequest>) => {
    const listQueries = ['group_id', 'group_name']
    const query: QueryGetCards = getQuery(event);

    const allQueries = Object.keys(query);
    const hasValidQueries = allQueries.some((currentQuery) => listQueries.includes(currentQuery));
    if (allQueries.length > 0 && !hasValidQueries) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid query',
            data: {
                type: 'about:blank',
                title: 'Bad Request',
                status: 400,
                detail: 'You can only use group_id or group_name as query.',
                instance: event.path,
            }
        });
    }

    const group_name = query.group_name?.toString();
    if (group_name) {
        const response = await findByGroupName(event);

        return {
            filtering: {
                group_name,
            },
            ...response,
        };
    }

    const group_id = query.group_id;
    if (group_id) {
        const response = await findByGroupId(event);

        return {
            filtering: {
                group_id,
            },
            ...response,
        };
    }

    return await findAll(event);

}