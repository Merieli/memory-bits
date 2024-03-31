export default defineEventHandler((event) => {
    // TODO: obter dados de cartas do banco de dados
    const cardId = event.context.params?.id;
    if(!cardId || cardId === '0') {
        throw createError({
            statusCode: 400,
            statusMessage: 'No ID provided. /cards/[id]'
        })
    }

    return {
        cards: [],
    }
})