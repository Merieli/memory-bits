import type { LevelsGame } from "~/interfaces/LevelsGame.type";
import { useNotificationStore } from "./notification";

export const useCardStore = defineStore('card', () => {
    const runtimeConfig = useRuntimeConfig();
    const storeNotify = useNotificationStore();

    const cards = ref([]);


    const getCardsByLevel = async (level: LevelsGame) => {
        try {
            
            const response: any = await $fetch(`${runtimeConfig.public.API_URL}/cards`, {
                query: {
                    level_id: level,
                },
            });
    
            cards.value = response.data;
  
        } catch (error) {
            storeNotify.$patch({
                notification: {
                    message: `Error to get cards by level ${level}`,
                    type: 'error',
                    autoClose: 3000
                }
            })
        }
    }

    return {
        cards,
        getCardsByLevel
    }
})
