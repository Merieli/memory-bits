import type { CardState } from "~/interfaces/Card.type";
import type { Match, MatchState, RoundOfGame } from "~/interfaces/Match.type";
import type { MatchPayloadToCreate } from "~/interfaces/MatchPayloadToCreate.type";
import type { ResponseApi } from "~/interfaces/ResponseApi.type";
import { useCardStore } from "./card";
import { useNotificationStore } from "./notification";

export const useMatchStore = defineStore('match', () => {
    const runtimeConfig = useRuntimeConfig();
    const storeNotify = useNotificationStore();
    const { updateCardState, memorizesCards, hideCards } = useCardStore();

    // TODO: salvar o match no BD ao final do jogo
    const match = reactive<MatchState>({
        id: 0,
        user_id: 0,
        level_id: 0,
        group_of_cards_id: 0,
        attempts: 0,
        score: 0,
        time: 0,
    });

    /** Current round of the game */
    const round = reactive<RoundOfGame>({
        cards: [],
        sumAttempt: false,
        score: 0
    })

    /** Rounds of the game */
    const rounds = ref<RoundOfGame[]>([]);

    /** Score of the game */
    const score = computed(() => {
        return rounds.value.reduce((acc, round) => acc + round.score, 0);
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
                    body: initialMatch
                }
            );

            match.id = data.id;
            match.user_id = data.user_id;
            match.level_id = data.level_id;
            match.group_of_cards_id = data.group_of_cards_id;

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

    /** Validate if is last step of the round */
    const isLastCardOfRound = computed(() => round.cards.length === 2);

    /** Validate if the cards are pair */
    const isPairCards = computed(() => {
        const [firstCard, secondCard] = round.cards;
        return firstCard.id === secondCard.id;
    });

    // TODO: Add the logic to get the score of the game
    const setsTheRoundScoreByResult = (winRound: boolean) => {
        const turns = round.cards.reduce((acc, card) => acc + card.turn, 0);
        const average = turns / round.cards.length;

        if (winRound) {
            // TODO: adicionar lógica de pontuação
            round.score = 0;
        }

        if (!winRound) {
            match.attempts += 1;
        }

        // Adiciona apos definir a pontuação tendo acertado ou não
        rounds.value.push(round);

        // Resetar dados do round
    }

    /**
     * Activate the card in the round when the user clicks
     */
    const activateCardInRound = (card: CardState): void => {
        const currentCard = updateCardState(card);
        if (!currentCard) return;
        
        round.cards.push(currentCard);

        if (isLastCardOfRound.value && isPairCards.value) {
            round.cards = memorizesCards(round.cards);
        }

        if (isLastCardOfRound.value && !isPairCards.value) {
            round.cards = hideCards(round.cards);
        }
        
        if (isLastCardOfRound.value) {
            setsTheRoundScoreByResult(isPairCards.value);

            // e finalizar o round
        }
    }

    return {
        match,
        round,
        score,
        isLastCardOfRound,
        createInitialMatchByPayload,
        activateCardInRound,
    }
})
