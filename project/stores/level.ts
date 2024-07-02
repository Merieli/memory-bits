import { useNotificationStore } from './notification'

import type { ResponseApi } from '~/interfaces/ResponseApi.type'
import type { LevelGet } from '~/interfaces/api/LevelGet'

export const useLevelStore = defineStore('level', () => {
    const runtimeConfig = useRuntimeConfig()
    const storeNotify = useNotificationStore()

    const levelsByName = reactive<Record<string, number>>({})

    const getAllLevels = async () => {
        try {
            const { data } = await $fetch<ResponseApi<LevelGet[]>>(
                `${runtimeConfig.public.API_URL}/levels`
            )

            data.forEach((level) => {
                levelsByName[level.name.toLowerCase()] = level.id
            })

            return data
        } catch (error) {
            console.error(error)

            storeNotify.$patch({
                notification: {
                    message: 'Error to get levels',
                    type: 'error',
                    autoClose: 3000,
                },
            })
        }
    }

    return {
        levelsByName,
        getAllLevels,
    }
})
