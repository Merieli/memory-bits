
export const useNotificationStore = defineStore('notify', () => {
    const notification = reactive({
        message: '',
        type: 'info',
        autoClose: 3000
    })

    return {
        notification
    }
})
