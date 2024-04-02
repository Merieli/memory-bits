import { findAllLevels } from "~/server/controllers/levels";

export default defineEventHandler(async () => {
    const levels = await findAllLevels();

    return {
        data: levels,
    }
})