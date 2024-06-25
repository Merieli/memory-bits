import type { CardState } from '~/interfaces/Card.type'
import type { Match, MatchState, RoundOfGame } from '~/interfaces/Match.type'
import type { MatchPayloadToCreate } from '~/interfaces/MatchPayloadToCreate.type'
import type { ResponseApi } from '~/interfaces/ResponseApi.type'
import { useCardStore } from './card'
import { useNotificationStore } from './notification'

export const useMatchStore = defineStore('match', () => {
    const runtimeConfig = useRuntimeConfig()
    const storeNotify = useNotificationStore()
    const { updateCardState, memorizesCards, hideCards } = useCardStore()

    // TODO: salvar o match no BD ao final do jogo
    const match = reactive<MatchState>({
        id: 0,
        user_id: 0,
        level_id: 0,
        group_of_cards_id: 0,
        attempts: 0,
        score: 0,
        time: 0,
    })

    /** Current round of the game */
    const round = reactive<RoundOfGame>({
        cards: [],
        sumAttempt: false,
        score: 0,
        notAddCards: false,
    })

    /** Rounds of the game */
    const rounds = ref<RoundOfGame[]>([])

    /** Score of the game */
    const score = computed(() => {
        return rounds.value.reduce((acc, round) => acc + round.score, 0)
    })

    const createInitialMatchByPayload = async ({ user_id, level_id, group_of_cards_id }:
    MatchPayloadToCreate): Promise<Match | null> => {
        try {
            const initialMatch = {
                user_id,
                level_id,
                group_of_cards_id,
                attempts: 0,
                score: 0,
                time: 0,
            }

            const { data } = await $fetch<ResponseApi<Match>>(
                `${runtimeConfig.public.API_URL}/matchs`,
                {
                    method: 'POST',
                    body: initialMatch,
                },
            )

            match.id = data.id
            match.user_id = data.user_id
            match.level_id = data.level_id
            match.group_of_cards_id = data.group_of_cards_id

            if (!data)
                return null

            return data
        }
        catch (error) {
            console.error(error)

            storeNotify.$patch({
                notification: {
                    message: 'Error to create match',
                    type: 'error',
                    autoClose: 3000,
                },
            })

            return null
        }
    }

    const saveMatch = async (): Promise<void> => {
        try {
            const { data } = await $fetch<ResponseApi<Match>>(
                `${runtimeConfig.public.API_URL}/matchs/${match.id}`,
                {
                    method: 'PUT',
                    body: match,
                },
            )

            // TODO:   Update match in the database with values of game
        }
        catch (error) {
            storeNotify.$patch({
                notification: {
                    message: 'Error to save match',
                    type: 'error',
                    autoClose: 3000,
                },
            })
        }
    }

    /** Validate if is last step of the round */
    const isLastCardOfRound = computed<boolean>(() => round.cards.length === 2)

    /** Validate if the cards are pair */
    const isPairCards = computed<boolean>(() => {
        const [firstCard, secondCard] = round.cards
        return firstCard.id === secondCard.id
    })

    const updateMatch = () => {
        match.score = score.value

        if (round.sumAttempt) {
            match.attempts += 1
            return
        }

        match.attempts = 0
    }

    /** Reset the current round */
    const resetRound = (): void => {
        round.cards = []
        round.sumAttempt = false
        round.score = 0
        round.notAddCards = false
    }

    const setsTheRoundScoreByResult = (winRound: boolean): void => {
        const turns = round.cards.reduce((acc, card) => acc + card.turn, 0)
        const averageTurn = turns / round.cards.length

        if (winRound) {
            round.sumAttempt = true

            if (averageTurn <= 1)
                round.score += 80

            if (averageTurn >= 2)
                round.score += 50

            if (averageTurn >= 3)
                round.score += 30
        }

        if (!winRound) {
            round.sumAttempt = false
            round.score = 0
        }

        rounds.value.push(round)

        updateMatch()
        resetRound()
    }

    /**
     * Activate the card in the round when the user clicks
     */
    const activateCardInRound = (card: CardState): void => {
        if (round.notAddCards)
            return

        const currentCard = updateCardState(card)
        if (!currentCard)
            return

        round.cards.push(currentCard)

        if (isLastCardOfRound.value) {
            round.notAddCards = true
            setTimeout(() => {
                if (isPairCards.value)
                    round.cards = memorizesCards(round.cards)

                if (!isPairCards.value)
                    round.cards = hideCards(round.cards)

                setsTheRoundScoreByResult(isPairCards.value)
            }, 1500)
        }
    }

    return {
        match,
        round,
        rounds,
        score,
        isLastCardOfRound,
        createInitialMatchByPayload,
        activateCardInRound,
        saveMatch,
    }
})
