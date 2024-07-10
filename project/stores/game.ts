import { useCardStore } from './card'
import { useLevelStore } from './level'
import { useMatchStore } from './match'
import { useNotificationStore } from './notification'
import { useUserStore } from './user'

import type { LevelsGame } from '~/interfaces/LevelsGame.type'

export const useGameStore = defineStore(
    'game',
    () => {
        const storeNotify = useNotificationStore()
        const userStore = useUserStore()
        const cardStore = useCardStore()
        const levelStore = useLevelStore()
        const matchStore = useMatchStore()

        const router = useRouter()

        const game = ref()

        /**
         * Timer in format mm:ss
         */
        const timer = computed<string>(() => {
            const minutes = Math.floor(matchStore.match.time / 60)
            const seconds = matchStore.match.time % 60

            return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        })

        const timerIntervalId = ref()
        const level = ref<LevelsGame>('easy')
        const isLoading = ref<boolean>(false)

        const startTimer = () => {
            timerIntervalId.value = setInterval(() => {
                matchStore.match.time += 1
            }, 1000)
        }

        const stopTimer = (): void => {
            clearInterval(timerIntervalId.value)
        }

        /**
         * Start the game to Get or create user, Get cards by level and Start the timer
         */
        const startTheGame = async (
            currentName: string,
            currentLevel: LevelsGame
        ): Promise<void> => {
            try {
                isLoading.value = true
                matchStore.resetMatch()
                level.value = currentLevel

                /** Como o app só terá cartas no level hard e easy trata para não obter erro ao selecionar o medium */
                const levelToFind =
                    currentLevel.toLowerCase() === 'medium'
                        ? 'hard'
                        : currentLevel.toLowerCase()

                const id = levelStore.levelsByName[levelToFind]

                const [userCreated, cards] = await Promise.all([
                    userStore.getOrCreateUser(currentName),
                    cardStore.getCardsByLevel(id),
                ])

                if (!userCreated || !cards) return

                const match = await matchStore.createInitialMatchByPayload({
                    user_id: userStore.user.id,
                    level_id: id,
                    group_of_cards_id: cardStore.groupOfCardsId,
                })

                if (!match) return

                startTimer()

                router.push({ name: 'index' })
            } catch (e) {
                storeNotify.$patch({
                    notification: {
                        message: `Error in start the game`,
                        type: 'error',
                        autoClose: 3000,
                    },
                })

                console.error(e)
            } finally {
                isLoading.value = false
            }
        }

        /**
         * Finish the game and save the match
         */
        const finishTheGameByResult = async (win?: boolean): Promise<void> => {
            try {
                isLoading.value = true
                stopTimer()
    
                matchStore.$patch({
                    gameResult: win,
                })
    
                await matchStore.saveMatch()
    
                if (win === undefined) return
    
                if (win) {
                    router.push({ name: 'index-win' })
                    return
                }
    
                router.push({ name: 'index-gameover' })
            } finally {
                isLoading.value = false
            }
            
        }

        /** Restart the game with the current data */
        const restartTheGame = (): void => {
            startTheGame(userStore.user.username, level.value)
        }

        /** Finish the game if all cards are memorized */
        watch(
            () => cardStore.allMemorizedCards,
            (win: boolean) => {
                if (win) finishTheGameByResult(win)
            }
        )

        /**
         * Defines the defeat by time of the game
         * @param time - Time in seconds
         */
        const definesDefeatByTime = (time: number) => {
            if (matchStore.gameResult !== null) return;

            const minutes = Math.floor(time / 60)

            if (minutes >= 10 && level.value.toLowerCase() === 'easy') {
                finishTheGameByResult(false)
                return
            }

            if (minutes >= 8 && level.value.toLowerCase() === 'medium') {
                finishTheGameByResult(false)
                return
            }

            if (minutes >= 5 && level.value.toLowerCase() === 'hard') {
                finishTheGameByResult(false)
            }
        }

        /**
         * Defines the defeat by attempts of the game
         * @param attempts - Number of attempts
         */
        const definesDefeatByAttempts = (attempts: number) => {
            if (matchStore.gameResult !== null) return;

            if (level.value.toLowerCase() === 'easy' && attempts >= 15){
                finishTheGameByResult(false)
                return;
            }

            if (level.value.toLowerCase() === 'medium' && attempts >= 10) {
                finishTheGameByResult(false)
                return;
            }

            if (level.value.toLowerCase() === 'hard' && attempts >= 8) {
                finishTheGameByResult(false)
            }
        }

        watch(() => matchStore.match.time, definesDefeatByTime)

        watch(() => matchStore.match.attempts, definesDefeatByAttempts, {
            immediate: true,
        })

        return {
            game,
            startTheGame,
            finishTheGameByResult,
            restartTheGame,
            isLoading,
            level,
            duration: computed(() => matchStore.match.time),
            timer,
            user: userStore.user,
        }
    },
    {
        persist: true,
    }
)
