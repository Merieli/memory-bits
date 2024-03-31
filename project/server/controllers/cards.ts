import { PrismaClient } from '@prisma/client';

export const findAllCards = async () => {
    const prisma = new PrismaClient();
    const cards = await prisma.cards.findMany();

    return cards;
}