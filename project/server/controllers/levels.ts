import { prisma } from './client';

export const findAllLevels = async () => {
    const levels = await prisma.levels.findMany();

    return {
        data: levels,
    }
}