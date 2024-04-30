import type { LevelsGame } from "~/interfaces/LevelsGame.type";
import { useCardStore } from "./card";
import { useLevelStore } from "./level";
import { useNotificationStore } from "./notification";
import { useUserStore } from "./user";


export const useGameStore = defineStore("game", () => {
    const storeNotify = useNotificationStore();
    const userStore = useUserStore();
    const cardStore = useCardStore();
    const levelStore = useLevelStore();

    const router = useRouter()

    const game = ref();

    /**
     * Duration of the game in seconds
     */
    const duration = ref(0);

    const timerIntervalId = ref();
    const level = ref<LevelsGame>('easy');

    const startTimer = () => {
        timerIntervalId.value = setInterval(() => {
            duration.value += 1;
        }, 1000);
    }

    const stopTimer = () => {
        clearInterval(timerIntervalId.value);
    }

    /**
     * Start the game to Get or create user, Get cards by level and Start the timer
     */
    const startTheGame = async (currentName: string, currentLevel: LevelsGame) => {
        try {
            duration.value = 0;
            level.value = currentLevel;

            const id = levelStore.levelsByName[currentLevel.toLowerCase()];
    
            await Promise.all([
                userStore.getOrCreateUser(currentName),
                cardStore.getCardsByLevel(id)
            ]);
    
            startTimer();

            router.push({ name: 'index' });
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

    // TODO: Add the logic to finish the game


    // TODO: Add the logic to restart the game


    // TODO: Add the logic to get the score of the game

    return {
        game,
        startTheGame,
        level,
        duration
    }
}, {
    persist: true,
})