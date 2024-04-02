import { type EventHandlerRequest, type H3Event } from 'h3';
import { prisma } from './client';

export const findAllCards = async () => {
    const cards = await prisma.cards.findMany();

    return {
        data: cards
    };
}

export const findCardById = async (id: number) => {
    const card = await prisma.cards.findUnique({
        where: {
            id,
        }
    });

    return card;
}

export const findCardsByGroupId = async (event: H3Event<EventHandlerRequest>) => {
    const cardId = event.context.params?.id;
    if(!cardId || cardId === '0') {
        throw createError({
            statusCode: 400,
            statusMessage: 'No ID provided. /cards/[id]'
        })
    }
    
    const cards = await prisma.cards.findMany({
        where: {
            "fk_cards__groups_of_cards__id": +cardId,
        }
    });

    if (cards.length === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: 'No cards found for this group ID.'
        })
    }

    setResponseStatus(event, 200)
    return {
        data: cards,
    }
}