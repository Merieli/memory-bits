import { useNotificationStore } from './notification'

import type { ResponseApi } from '~/interfaces/ResponseApi.type'
import type { LevelGet } from '~/interfaces/api/LevelGet'
import { useGameStore } from './game'

export const useLevelStore = defineStore('level', () => {
    const runtimeConfig = useRuntimeConfig()
    const storeNotify = useNotificationStore()
    const gameStore = useGameStore()

    const levelsByName = reactive<Record<string, number>>({})

    const getAllLevels = async () => {
        try {
            gameStore.$patch({ isLoading: true })
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
        } finally {
            gameStore.$patch({ isLoading: false })
        }
    }

    return {
        levelsByName,
        getAllLevels,
    }
})
