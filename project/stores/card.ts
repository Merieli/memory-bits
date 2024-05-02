import type { Card } from "~/interfaces/Card.type";
import { useNotificationStore } from "./notification";

export const useCardStore = defineStore('card', () => {
    const runtimeConfig = useRuntimeConfig();
    const storeNotify = useNotificationStore();

    /**
     * All cards of current game
     */
    const cards = ref<Card[]>([]);

    /**
     * Used to some requests
     */
    const groupOfCardsId = ref<number>(0);

    /**
     * To get all cards by level
     */
    const getCardsByLevel = async (levelId: number): Promise<void> => {
        try {
            const response: any = await $fetch(`${runtimeConfig.public.API_URL}/cards`, {
                query: {
                    level_id: levelId,
                },
            });
    
            cards.value = response.data;
            groupOfCardsId.value = cards.value[0].group_of_cards_id;
        } catch (error) {
            storeNotify.$patch({
                notification: {
                    message: `Error to get cards by level ${levelId}`,
                    type: 'error',
                    autoClose: 3000
                }
            })

            throw error;
        }
    }

    return {
        cards,
        groupOfCardsId,
        getCardsByLevel
    }
})
