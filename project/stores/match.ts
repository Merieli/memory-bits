import type { ResponseApi } from "~/interfaces/ResponseApi.type";
import type { LevelGet } from "~/interfaces/api/LevelGet";
import { useNotificationStore } from "./notification";

export const useMatchStore = defineStore('match', () => {
    const runtimeConfig = useRuntimeConfig();
    const storeNotify = useNotificationStore();

    const createMatchByUserAndLevel = async (idUser: number, levelId: number) => {
        try {
            const initialMatch = {
                user_id: idUser,
                level_id: levelId,
                group_of_cards_id: 0, // Search for a group of cards
                attempts: 0,
                score: 0,
                time: 0,
            }

            const { data } = await $fetch<ResponseApi<LevelGet[]>>(`${runtimeConfig.public.API_URL}/matchs`, {
                method: 'POST',
                body: initialMatch
            })

            return data;
        } catch (error) {
            console.error(error);
    
            storeNotify.$patch({
                notification: {
                    message: 'Error to create match',
                    type: 'error',
                    autoClose: 3000
                }
            });
        }
    }

    return {
        createMatchByUserAndLevel
    }
})
