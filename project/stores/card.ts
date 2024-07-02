import { useNotificationStore } from './notification'

import type { Card, CardState } from '~/interfaces/Card.type'

export const useCardStore = defineStore('card', () => {
    const runtimeConfig = useRuntimeConfig()
    const storeNotify = useNotificationStore()

    /** All cards of current game and your state */
    const cards = ref<CardState[]>([])

    /** Used to some requests */
    const groupOfCardsId = ref<number>(0)

    /** Check if all cards are memorized */
    const allMemorizedCards = computed<boolean>(() => {
        return cards.value.every((card) => card.memorized)
    })

    function shuffleList<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
        }
        return array
    }

    const generatePairsOfCards = (cards: Card[]): CardState[] => {
        const duplicatedCards = cards.concat(cards)

        const listOfCards = duplicatedCards.map((card: Card): CardState => {
            return {
                ...card,
                uniqueId: crypto.randomUUID(),
                memorized: false,
                turn: 0,
                visible: false,
            }
        })

        return shuffleList(listOfCards)
    }

    /**
     * To get all cards by level
     */
    const getCardsByLevel = async (levelId: number): Promise<boolean> => {
        try {
            const response: any = await $fetch(
                `${runtimeConfig.public.API_URL}/cards`,
                {
                    query: {
                        level_id: levelId,
                    },
                }
            )

            cards.value = generatePairsOfCards(response.data)
            groupOfCardsId.value = cards.value[0].group_of_cards_id

            return true
        } catch (error) {
            storeNotify.$patch({
                notification: {
                    message: `Error to get cards by level ${levelId}`,
                    type: 'error',
                    autoClose: 3000,
                },
            })

            throw error
        }
    }

    /**
     * Update the state of the card clicked, if the card is memorized return null
     */
    const updateCardState = (card: CardState): CardState | null => {
        const index = cards.value.findIndex((c) => c.uniqueId === card.uniqueId)

        if (cards.value[index].memorized) return null

        if (!cards.value[index].visible) {
            cards.value[index].turn += 1
            cards.value[index].visible = true

            return cards.value[index]
        }

        return null
    }

    /**
     * Memorizes the cards in the round
     */
    const memorizesCards = (currentCards: CardState[]): CardState[] => {
        const uniqueIds = currentCards.map((card) => {
            return card.uniqueId
        })

        const firstIndex = cards.value.findIndex((card) => {
            return uniqueIds[0] === card.uniqueId
        })
        const secondIndex = cards.value.findIndex((card) => {
            return uniqueIds[1] === card.uniqueId
        })

        if (firstIndex !== -1 && secondIndex !== -1) {
            cards.value[firstIndex].memorized = true
            cards.value[secondIndex].memorized = true
        }

        return [cards.value[firstIndex], cards.value[secondIndex]]
    }

    /**
     * Hide the cards in the round
     */
    const hideCards = (currentCards: CardState[]): CardState[] => {
        const uniqueIds = currentCards.map((card) => {
            return card.uniqueId
        })

        const firstIndex = cards.value.findIndex((card) => {
            return uniqueIds[0] === card.uniqueId
        })
        const secondIndex = cards.value.findIndex((card) => {
            return uniqueIds[1] === card.uniqueId
        })

        if (firstIndex !== -1 && secondIndex !== -1) {
            cards.value[firstIndex].visible = false
            cards.value[secondIndex].visible = false
        }

        return [cards.value[firstIndex], cards.value[secondIndex]]
    }

    return {
        cards,
        groupOfCardsId,
        allMemorizedCards,
        getCardsByLevel,
        updateCardState,
        memorizesCards,
        hideCards,
    }
})
