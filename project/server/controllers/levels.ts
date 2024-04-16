import { type LevelGet } from '~/interfaces/api/LevelGet';
import { type ResponseApi } from '~/interfaces/ResponseApi.type';
import { prisma } from './client';

export const findAllLevels = async (): Promise<ResponseApi<LevelGet[]>> => {
    const levels = await prisma.levels.findMany();

    const levelsSortById = levels.sort((a, b) => a.id - b.id);

    return {
        data: levelsSortById,
    }
}