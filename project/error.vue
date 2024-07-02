<script setup lang="ts">
const props = defineProps({
    error: {
        default: {
            url: '',
            statusCode: 0,
            statusMessage: '',
            message: '',
            description: '',
            data: {},
        },
    },
})
</script>

<template>
    <div
        class="h-screen w-full flex flex-col items-center justify-center bg-[#c7d6d3]"
    >
        <h1 class="text-8xl font-bold text-green-600">
            {{ error.statusCode }}
        </h1>
        <p class="text-2xl font-light text-green-600 my-4">
            {{ error.statusMessage }}
        </p>
    </div>
</template>

<style lang="postcss" scoped></style>
