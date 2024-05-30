import { z } from 'zod';
import type { matchResponseSchema } from '~/schema/matchs/matchResponseSchema';
import type { CardState } from "./Card.type";

export type Match = z.input<typeof matchResponseSchema>;

export type MatchState = Required<Match>;

export interface RoundOfGame {
    cards: CardState[];
    sumAttempt: boolean;
    score: number;
}
