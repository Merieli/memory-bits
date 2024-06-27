import { useCardStore } from './card'
import { useLevelStore } from './level'
import { useMatchStore } from './match'
import { useNotificationStore } from './notification'
import { useUserStore } from './user'

import type { LevelsGame } from '~/interfaces/LevelsGame.type'

export const useGameStore = defineStore('game', () => {
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
    const startTheGame = async (currentName: string, currentLevel: LevelsGame): Promise<void> => {
        try {
            matchStore.resetMatch()
            level.value = currentLevel

            /** Como o app só terá cartas no level hard e easy trata para não obter erro ao selecionar o medium */
            const levelToFind = currentLevel.toLowerCase() === 'medium' ? 'hard' : currentLevel.toLowerCase()

            const id = levelStore.levelsByName[levelToFind]

            const [userCreated, cards] = await Promise.all([
                userStore.getOrCreateUser(currentName),
                cardStore.getCardsByLevel(id),
            ])

            if (!userCreated || !cards)
                return

            const match = await matchStore.createInitialMatchByPayload({
                user_id: userStore.user.id,
                level_id: id,
                group_of_cards_id: cardStore.groupOfCardsId,
            })

            if (!match)
                return

            startTimer()

            router.push({ name: 'index' })
        }
        catch (e) {
            storeNotify.$patch({
                notification: {
                    message: `Error in start the game`,
                    type: 'error',
                    autoClose: 3000,
                },
            })

            console.error(e)
        }
    }

    /**
     * Finish the game and save the match
     */
    const finishTheGameByResult = async (win?: boolean): Promise<void> => {
        stopTimer()

        await matchStore.saveMatch()

        if (win === undefined)
            return

        if (win) {
            router.push({ name: 'win' })
            return
        }

        router.push({ name: 'gameover' })
    }

    /** Restart the game with the current data */
    const restartTheGame = (): void => {
        finishTheGameByResult()

        startTheGame(userStore.user.username, level.value)
    }

    /** Finish the game if all cards are memorized */
    watch(() => cardStore.allMemorizedCards, (win: boolean) => {
        if (win)
            finishTheGameByResult(win)
    })

    /**
     * Defines the defeat by time of the game
     * @param time - Time in seconds
     */
    const definesDefeatByTime = (time: number) => {
        const minutes = Math.floor(time / 60)

        if (minutes >= 8 && level.value === 'easy')
            finishTheGameByResult(false)

        if (minutes >= 7 && level.value === 'medium')
            finishTheGameByResult(false)

        if (minutes >= 7 && level.value === 'hard')
            finishTheGameByResult(false)
    }

    watch(() => matchStore.match.time, definesDefeatByTime)

    return {
        game,
        startTheGame,
        finishTheGame: finishTheGameByResult,
        restartTheGame,
        level,
        duration: computed(() => matchStore.match.time),
        timer,
        user: userStore.user,
    }
}, {
    persist: true,
})
