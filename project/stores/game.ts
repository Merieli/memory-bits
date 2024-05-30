import type { LevelsGame } from "~/interfaces/LevelsGame.type";
import { useCardStore } from "./card";
import { useLevelStore } from "./level";
import { useMatchStore } from "./match";
import { useNotificationStore } from "./notification";
import { useUserStore } from "./user";


export const useGameStore = defineStore("game", () => {
    const storeNotify = useNotificationStore();
    const userStore = useUserStore();
    const cardStore = useCardStore();
    const levelStore = useLevelStore();
    const matchStore = useMatchStore();

    const router = useRouter()

    const game = ref();

    /**
     * Duration of the game in seconds
     */
    const duration = ref(0);

    /**
     * Timer in format mm:ss
     */
    const timer = computed<string>(() => {
        const minutes = Math.floor(duration.value / 60);
        const seconds = duration.value % 60;

        return `${minutes < 10 ? '0': ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    })

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
    const startTheGame = async (currentName: string, currentLevel: LevelsGame): Promise<void> => {
        try {
            duration.value = 0;
            level.value = currentLevel;

            const id = levelStore.levelsByName[currentLevel.toLowerCase()];
    
            const [ userCreated, cards ] = await Promise.all([
                userStore.getOrCreateUser(currentName),
                cardStore.getCardsByLevel(id)
            ]);

            if (!userCreated) return;   

            const match = await matchStore.createInitialMatchByPayload({
                user_id: userStore.user.id,
                level_id: id,
                group_of_cards_id: cardStore.groupOfCardsId,
            });

            if (!match) return;
    
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

            console.error(e);
        }
    }

    // TODO: Add the logic to finish the game
    const finishTheGame = async () => {
        stopTimer();

        // Update match in the database with values of game
    }


    // TODO: Add the logic to restart the game

    return {
        game,
        startTheGame,
        level,
        duration,
        timer,
        user: userStore.user,
    }
}, {
    persist: true,
})