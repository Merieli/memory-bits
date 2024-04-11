export interface CreateMatchBodyPost {
    attempts?: number;
    score: number;
    time?: number;
    user_id: number;
    level_id: number;
    group_of_cards_id: number;
}