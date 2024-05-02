import type { Match } from "~/interfaces/Match.type";
import type { MatchPayloadToCreate } from "~/interfaces/MatchPayloadToCreate.type";
import type { ResponseApi } from "~/interfaces/ResponseApi.type";
import { useNotificationStore } from "./notification";

export const useMatchStore = defineStore('match', () => {
    const runtimeConfig = useRuntimeConfig();
    const storeNotify = useNotificationStore();

    const match = reactive<Match>({
        id: 0,
        user_id: 0,
        level_id: 0,
        group_of_cards_id: 0,
        attempts: 0,
        score: 0,
        time: 0,
    });

    const createInitialMatchByPayload = async ({ user_id, level_id, group_of_cards_id }:
           MatchPayloadToCreate): Promise<Match[] | null> => {
        try {
            const initialMatch = {
                user_id,
                level_id,
                group_of_cards_id,
                attempts: 0,
                score: 0,
                time: 0,
            }

            const { data } = await $fetch<ResponseApi<Match[]>>(
                `${runtimeConfig.public.API_URL}/matchs`, 
                {
                    method: 'POST',
                    body: initialMatch
                }
            );

            if (!data) return null;

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

            return null;
        }
    }

    return {
        match,
        createInitialMatchByPayload
    }
})
