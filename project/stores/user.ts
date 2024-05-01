import { useNotificationStore } from "./notification";

export const useUserStore = defineStore("user", () => {
    const user = ref();
    const storeNotify = useNotificationStore();
    const runtimeConfig = useRuntimeConfig();

    const validateUsername = (username: string) => {
        const errors = [];
        if (username.length < 4) {
            errors.push({
                message: 'The username must be at least 4 characters long',
                name: 'InvalidLengthError'
            });
        }

        return {
            valid: !errors.length,
            errors
        }
    }


    /**
     * Used to create a new user in the app by username
     */
    const createNewUserByName = async (username: string): Promise<boolean | any> => {
        try {
            const { valid, errors } = validateUsername(username);

            if (!valid) {
                // - Add um input de erro no formulário 
                return false;
            }

            const response: any = await $fetch(`${runtimeConfig.public.API_URL}/users`, {
                method: 'POST',
                body: {
                    username,
                },
            });
    
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Prepare the user to be used in the app 
     */
    const getOrCreateUser = async (username: string): Promise<boolean | any> => {
        try {   
            const response: any = await $fetch(`${runtimeConfig.public.API_URL}/users`, {
                query: {
                    name: username,
                },
            });
        
            if (response.data) {
                user.value = response.data;
                return response.data;
            }
    
            return await createNewUserByName(username);
        } catch (error) {
            storeNotify.$patch({
                notification: {
                    message: `Error in login with username ${username}`,
                    type: 'error',
                    autoClose: 3000
                }
            })

            throw error;
        }
    }

    return {
        user,
        getOrCreateUser
    }
}, {
    persist: true,
})