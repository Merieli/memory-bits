import * as cards from "~/server/controllers/cards";

export default defineEventHandler(cards.findAllCards);