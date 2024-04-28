import { useNotificationStore } from "./notification";

export const useUserStore = defineStore("user", () => {
    const user = ref();
    const storeNotify = useNotificationStore();
    const runtimeConfig = useRuntimeConfig();


    /**
     * Used to create a new user in the app by username
     */
    const createNewUserByName = async (username: string) => {
        const response: any = await $fetch(`${runtimeConfig.public.API_URL}/users`, {
            method: 'POST',
            body: {
                username,
            },
        });

        return response.data;
    }

    /**
     * Prepare the user to be used in the app 
     */
    const getOrCreateUser = async (username: string) => {
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
        }
    }

    return {
        user,
        getOrCreateUser
    }
}, {
    persist: true,
})