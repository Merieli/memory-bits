<script setup lang="ts">
import { useNotificationStore } from '~/stores/notification';

const { $toast } = useNuxtApp();

const storeNotify =  useNotificationStore()

storeNotify.$subscribe((mutation, state) => {
    if (state.notification.type === 'error') {
        $toast.error(state.notification.message);
        storeNotify.$reset();
        return;
    }

    if (state.notification.type === 'success') {
        $toast.success(state.notification.message);
        storeNotify.$reset();
    };
});
</script>

<template>
    <NuxtLoadingIndicator />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
