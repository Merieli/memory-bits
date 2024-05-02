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
        <h1 class="text text-4xl mb-4">{{ texts.projectTitle }}</h1>
        <div class="w-full flex justify-between">
            <div class="flex flex-wrap gap-4 max-w-64">
                <p class="text text-3xl">{{ username }}</p>
                <span class="text-3xl flex items-center">
                    <img src="~/assets/img/score.svg"
                        class="h-7 w-7 mr-2" alt="score"
                    />
                    <p class="text">10000</p>
                </span>
                <div class="flex items-center">
                    <img v-for="n in quantityLevelIcon" src="~/assets/img/level.svg"
                        class="h-7 w-7" :alt="gameStore.level"
                    />
                </div>
            </div>
            <div class="header__more">
                <div class="flex items-center gap-2 flex-wrap">
                    <NuxtLink :to="{ name: 'login' }">
                        <img src="~/assets/img/reload.svg"
                            class="h-6 w-6 mr-2" alt="timer"
                        />
                    </NuxtLink>
                    <p class="text text-3xl">{{ gameStore.timer }}</p>
                    <img src="~/assets/img/time.svg"
                        class="h-6 w-6 mr-2" alt="timer"
                    />
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="postcss" scoped>
.text {
    color: white;
    filter: drop-shadow(-1.1px 0 0 black) drop-shadow(1.1px 0 0 black) drop-shadow(0 -1.1px 0 black) drop-shadow(0 2px 0 black);
}
</style>
