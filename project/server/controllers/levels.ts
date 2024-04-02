import { PrismaClient } from '@prisma/client';

export const findAllLevels = async () => {
    const prisma = new PrismaClient();
    const levels = await prisma.levels.findMany();

    return levels;
}