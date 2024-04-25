import { useNotificationStore } from "./notification";

export const useUserStore = defineStore("user", () => {
    const user = ref();
    const isLoadingAction = ref(false);
    const storeNotify = useNotificationStore();


    /**
     * Used to create a new user in the app by username
     */
    const createNewUserByName = async (username: string) => {
        const { data } = await useFetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            body: {
                username,
            },
        });

        return data;
    }

    /**
     * Prepare the user to be used in the app 
     */
    const getOrCreateUser = async (username: string) => {
        try {
            isLoadingAction.value = true
    
            const response: any = await $fetch(`http://localhost:3000/api/v1/users`, {
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
        loginUserOrCreate: getOrCreateUser
    }
}, {
    persist: true,
})