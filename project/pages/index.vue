<script setup lang="ts">
import texts from '~/configs/texts.json';
import { useGameStore } from '~/stores/game';

const props = defineProps({})

const test = ref('Hello World')

const route = useRoute()

const gameStore = useGameStore();

const iconsLevel = computed(() => {
    if (gameStore.level === 'easy') {
        return 1;
    } 
    
    if (gameStore.level === 'medium') {
        return 2;
    } 
    
    return 3;    
})

onMounted(() => {
    console.log('mounted')
})
</script>

<template>
    <header>
        <h1>{{ texts.projectTitle }}</h1>
        <div class="header__details">
            <p>Username</p>
            <span>10000</span>
            <p>Level</p>
        </div>
        <div class="header__more">
            {{ gameStore.duration }}
        </div>
    </header>
    <NuxtLink :to="{ name: 'index' }">Retry</NuxtLink>
</template>

<style lang="postcss" scoped></style>
