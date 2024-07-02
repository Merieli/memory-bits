import { type Card } from '~/interfaces/Card.type'
import { type ResponseApi } from '~/interfaces/ResponseApi.type'
import { prisma } from '../client'

/**
 * To get all cards from database
 */
export const findAll = async (): Promise<ResponseApi<any>> => {
    const cards = await prisma.cards.findMany()

    const data: Card[] = cards.map((card) => {
        return {
            id: card.id,
            image_url: card.image_url,
            group_of_cards_id: card.fk_cards__groups_of_cards__id,
        }
    })

    return {
        data,
    }
}
