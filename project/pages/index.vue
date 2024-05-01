<script setup lang="ts">
import texts from '~/configs/texts.json';
import { useGameStore } from '~/stores/game';

const props = defineProps({})

const test = ref('Hello World')

const route = useRoute()

const gameStore = useGameStore();

definePageMeta({
    layout: 'game-page',
});

const quantityLevelIcon = computed(() => {
    if (gameStore.level.toLowerCase() === 'easy') {
        return 1;
    } 
    
    if (gameStore.level.toLowerCase() === 'medium') {
        return 2;
    } 
    
    return 3;    
})

const username = computed(() => {
    const firstLetter = gameStore.user.username.charAt(0).toUpperCase();
    
    return `${firstLetter}${gameStore.user.username.slice(1)}`;
})
</script>

<template>
    <header class="flex flex-col justify-center items-center w-full p-5">
        <h1 class="text-4xl">{{ texts.projectTitle }}</h1>
        <div class="w-full flex justify-between">
            <div class="flex flex-wrap gap-4 max-w-64">
                <p class="text-3xl">{{ username }}</p>
                <span class="text-3xl flex items-center">
                    <img src="~/assets/img/score.svg"
                        class="h-6 w-6 mr-2" alt="score"
                    />
                    10000
                </span>
                <p class="flex items-center">
                    <img v-for="n in quantityLevelIcon" src="~/assets/img/level.svg"
                        class="h-6 w-6" :alt="gameStore.level"
                    />
                </p>
            </div>
            <div class="header__more">
                {{ gameStore.duration }}
            </div>
        </div>
    </header>
    <NuxtLink :to="{ name: 'login' }">Retry</NuxtLink>
</template>

<style lang="postcss" scoped></style>
