import { findAllCards } from '~/server/controllers/cards';

export default defineEventHandler(async () => {
    const cards = await findAllCards();

    return {
        data: cards,
    }
})