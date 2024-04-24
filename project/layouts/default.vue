<script setup lang='ts'>
import { useNotificationStore } from '~/stores/notification';

const { $toast } = useNuxtApp();

const storeNotify =  useNotificationStore()

const clearNotification = () => {
    storeNotify.$patch({
        notification: {
            message: '',
            type: 'info',
            autoClose: 0
        }
    })
}

storeNotify.$subscribe((mutation, state) => {
    if (state.notification.type === 'error'){
        $toast.error(state.notification.message);
        clearNotification();
        return;
    }

    if (state.notification.type === 'success'){
        $toast.success(state.notification.message);
        clearNotification();
    } 
});
</script>
    
<template>
    <div class="layoutcenter">
        <slot />
    </div>
    <BaseFooter />
</template>
    
<style lang='postcss' scoped>
.layoutcenter {
    @apply flex flex-col justify-center items-center
        h-dvh bg-[#F5F5F5];
}
</style>