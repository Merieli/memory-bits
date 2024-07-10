<script setup lang="ts">
import { useGameStore } from '~/stores/game';
import { useNotificationStore } from '~/stores/notification';

const { $toast } = useNuxtApp()

const storeNotify = useNotificationStore()
const gameStore = useGameStore()

storeNotify.$subscribe((mutation, state) => {
    if (state.notification.type === 'error') {
        $toast.error(state.notification.message)
        storeNotify.$reset()
        return
    }

    if (state.notification.type === 'success') {
        $toast.success(state.notification.message)
        storeNotify.$reset()
    }
})

const { progress, isLoading, start, finish, clear } = useLoadingIndicator({
    duration: 2000,
    throttle: 200,
})

watch(() => gameStore.isLoading, (loading) => {
    if (loading) {
        start()
        return;
    }
    finish()
})
</script>

<template>
    <NuxtLayout>
        <NuxtLoadingIndicator :height="5" />
        <NuxtPage />
    </NuxtLayout>
</template>
