import { useNotificationStore } from "./notification";

export const useCardStore = defineStore('card', () => {
    const runtimeConfig = useRuntimeConfig();
    const storeNotify = useNotificationStore();

    const cards = ref([]);

    /**
     * 
     */
    const getCardsByLevel = async (levelId: number) => {
        try {
            const response: any = await $fetch(`${runtimeConfig.public.API_URL}/cards`, {
                query: {
                    level_id: levelId,
                },
            });
    
            cards.value = response.data;
  
        } catch (error) {
            storeNotify.$patch({
                notification: {
                    message: `Error to get cards by level ${levelId}`,
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
