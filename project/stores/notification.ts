import type { Options } from "vue3-toastify"

export const useNotification = defineStore('Notification', () => {
    const notification: Options = reactive({
        message: '',
        type: 'info',
        autoClose: 3000
    })

    return {
        notification
    }
})