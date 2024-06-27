<script setup lang="ts">
import { useCardStore } from '~/stores/card';
import { useGameStore } from '~/stores/game';
import { useMatchStore } from '~/stores/match';

const gameStore = useGameStore()
const cardStore = useCardStore()
const matchStore = useMatchStore()

definePageMeta({
    layout: 'game-page',
})

const username = computed(() => {
    if (!gameStore.user.username)
        return ''

    const firstLetter = gameStore.user.username.charAt(0).toUpperCase()
    return firstLetter + gameStore.user.username.slice(1)
})
</script>

<template>
    <BaseHeader
        :username="username"
        :score="matchStore.match.score"
        :level="gameStore.level"
        :timer="gameStore.timer"
        :attempts="matchStore.match.attempts"
        @restart="gameStore.restartTheGame"
    />
    <div
        class="grid grid-cols-6 gap-3 h-[calc(100vh_-_192px)]
        max-h-[710px]
    "
    >
        <CardItem
            v-for="card in cardStore.cards" :key="card.uniqueId"
            :image="card.image_url"
            :show="card.visible"
            @click="matchStore.activateCardInRound(card)"
        />
    </div>
    <NuxtPage />
</template>

<style lang="postcss" scoped>
</style>
