<script setup lang="ts">
import { useCardStore } from '~/stores/card';
import { useGameStore } from '~/stores/game';
import { useMatchStore } from '~/stores/match';

const props = defineProps({})

const gameStore = useGameStore();
const cardStore = useCardStore();
const matchStore = useMatchStore();

definePageMeta({
    layout: 'game-page',
});

const username = computed(() => {
    if (!gameStore.user.username) return '';
    
    const firstLetter = gameStore.user.username.charAt(0).toUpperCase();
    return firstLetter + gameStore.user.username.slice(1);
})
</script>

<template>
    <BaseHeader 
        :username="username" 
        :score="10000" 
        :level="gameStore.level" 
        :timer="gameStore.timer" 
    />
    <CardItem v-for="card in cardStore.cards" :key="card.uniqueId" 
        :image="card.image_url"
        @click="matchStore.activateCardInRound(card)"
    />
</template>

<style lang="postcss" scoped>
</style>
