import type { z } from 'zod'
import type { cardSchema } from '~/schema/cards.schema'

export type Card = z.input<typeof cardSchema>

export type CardState = Card & {
    uniqueId: string
    memorized: boolean
    turn: number
    visible: boolean
}
