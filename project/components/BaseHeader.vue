<script setup lang="ts">
import texts from '~/configs/texts.json'

export interface BaseHeaderProps {
    username: string
    score: number
    level: string
    timer: string
    attempts: number
}

const props = defineProps<BaseHeaderProps>()

const emit = defineEmits<{ restart: [] }>()

const quantityLevelIcon = computed(() => {
    if (props.level.toLowerCase() === 'easy') return 1

    if (props.level.toLowerCase() === 'medium') return 2

    return 3
})
</script>

<template>
    <header class="flex flex-col justify-center items-center w-full p-5">
        <h1 class="text text-4xl mb-4">
            {{ texts.projectTitle }}
        </h1>
        <div class="w-full flex justify-between">
            <div class="flex flex-wrap gap-4 max-w-64 items-start">
                <p class="text text-3xl">
                    {{ username }}
                </p>
                <span class="text-3xl flex items-center">
                    <img
                        src="~/assets/img/score.svg"
                        class="h-7 w-7 mr-2"
                        alt="score"
                    >
                    <p class="text">{{ score }}</p>
                </span>
                <div class="flex items-center min-h-9">
                    <img
                        v-for="(n, index) in quantityLevelIcon"
                        :key="index"
                        src="~/assets/img/level.svg"
                        class="h-7 w-7"
                        :alt="level"
                    >
                </div>
            </div>
            <div class="header__more">
                <div class="flex justify-end gap-2">
                    <p class="text text-3xl">
                        {{ attempts }}
                    </p>

                    <img
                        src="~/assets/img/attempts.svg"
                        class="h-9 w-9"
                        alt="timer"
                    >
                </div>
                <div class="flex items-center gap-2 flex-wrap">
                    <button type="button" @click="emit('restart')">
                        <img
                            src="~/assets/img/reload.svg"
                            class="h-6 w-6 mr-2"
                            alt="timer"
                        >
                    </button>
                    <p class="text text-3xl">
                        {{ timer }}
                    </p>
                    <img
                        src="~/assets/img/time.svg"
                        class="h-6 w-6 mr-2"
                        alt="timer"
                    >
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="postcss" scoped>
.text {
    color: white;
    filter: drop-shadow(-1.1px 0 0 black) drop-shadow(1.1px 0 0 black)
        drop-shadow(0 -1.1px 0 black) drop-shadow(0 2px 0 black);
}
</style>
