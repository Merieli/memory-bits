import type { LevelsGame } from "~/interfaces/LevelsGame.type";
import { useCardStore } from "./card";
import { useNotificationStore } from "./notification";
import { useUserStore } from "./user";


export const useGameStore = defineStore("game", () => {
    const storeNotify = useNotificationStore();
    const userStore = useUserStore();
    const cardStore = useCardStore();

    const game = ref();
    const timer = ref(0);
    const level = ref<LevelsGame>('easy');

    /**
     * Start the game to Get or create user, Get cards by level and Start the timer
     */
    const startTheGame = async (currentName: string, currentLevel: LevelsGame) => {
        try {
            timer.value = 0;
            level.value = currentLevel;

            // Obter ID do level
    
            await Promise.all([
                userStore.getOrCreateUser(currentName),
                cardStore.getCardsByLevel(currentLevel)
            ]);
    
            // TODO: Inicilizar timer
            // quanto terminar as duas tarefas acima

        } catch (e) {
            storeNotify.$patch({
                notification: {
                    message: `Error in start the game`,
                    type: 'error',
                    autoClose: 3000
                }
            })
        }
    }

    return {
        game,
        startTheGame
    }
}, {
    persist: true,
})