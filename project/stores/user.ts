import { useNotificationStore } from './notification'

import type { ResponseApi } from '~/interfaces/ResponseApi.type'
import type { User } from '~/interfaces/User.type'

export const useUserStore = defineStore(
    'user',
    () => {
        const storeNotify = useNotificationStore()
        const runtimeConfig = useRuntimeConfig()

        const user = reactive<User>({
            id: 0,
            username: '',
        })

        const validateUsername = (username: string) => {
            const errors = []
            if (username.length < 4) {
                errors.push({
                    message: 'The username must be at least 4 characters long',
                    name: 'InvalidLengthError',
                })
            }

            return {
                valid: !errors.length,
                errors,
            }
        }

        /**
         * Used to create a new user in the app by username
         */
        const createNewUserByName = async (
            username: string
        ): Promise<boolean | User> => {
            const { valid, errors } = validateUsername(username)

            if (errors.length) {
                storeNotify.$patch({
                    notification: {
                        message: errors[0].message,
                        type: 'error',
                        autoClose: 3000,
                    },
                })
            }

            if (!valid) {
                // - Add um input de erro no formulário
                return false
            }

            const response: ResponseApi<User> = await $fetch(
                `${runtimeConfig.public.API_URL}/users`,
                {
                    method: 'POST',
                    body: {
                        username,
                    },
                }
            )

            return response.data
        }

        /**
         * Prepare the user to be used in the app
         */
        const getOrCreateUser = async (
            username: string
        ): Promise<boolean | User> => {
            try {
                const response = await $fetch<ResponseApi<User>>(
                    `${runtimeConfig.public.API_URL}/users`,
                    {
                        query: {
                            name: username,
                        },
                    }
                )

                if (response.data) {
                    user.username = response.data.username
                    user.id = response.data.id
                    return response.data
                }

                return await createNewUserByName(username)
            } catch (error) {
                storeNotify.$patch({
                    notification: {
                        message: `Error in login with username ${username}`,
                        type: 'error',
                        autoClose: 3000,
                    },
                })

                throw error
            }
        }

        return {
            user,
            getOrCreateUser,
        }
    },
    {
        persist: true,
    }
)
