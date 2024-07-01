export const useNotificationStore = defineStore('notify', () => {
    const notification = reactive({
        message: '',
        type: 'info',
        autoClose: 3000,
    })

    function $reset() {
        notification.message = ''
        notification.type = 'info'
        notification.autoClose = 3000
    }

    return {
        notification,
        $reset,
    }
})
