import { z } from 'zod';
import type { cardSchema } from "~/schema/cards.schema";

export type Card = z.input<typeof cardSchema>;
