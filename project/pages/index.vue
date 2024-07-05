<script setup lang="ts">
import { useCardStore } from '~/stores/card';
import { useGameStore } from '~/stores/game';
import { useMatchStore } from '~/stores/match';

const gameStore = useGameStore()
const cardStore = useCardStore()
const matchStore = useMatchStore()
const router = useRouter()

definePageMeta({
    layout: 'game-page',
})

const username = computed(() => {
    if (!gameStore.user.username) return ''

    const firstLetter = gameStore.user.username.charAt(0).toUpperCase()
    return firstLetter + gameStore.user.username.slice(1)
})

const isPageWinOrLose = computed(() => {
    return router.currentRoute.value.name === 'index-win' || router.currentRoute.value.name === 'index-gameover'
})
</script>

<template>
    <div>
        <BaseHeader
            :username="username"
            :score="matchStore.match.score"
            :level="gameStore.level"
            :timer="gameStore.timer"
            :attempts="matchStore.match.attempts"
            @restart="gameStore.restartTheGame"
        />
        <div
            class="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 grid-rows-[repeat(18,380px)] sm:grid-rows-[repeat(9,330px)] md:grid-rows-[repeat(6,350px)] lg:grid-rows-[repeat(3,200px)] md:min-h-[calc(100vh_-_192px)] lg:max-h-[710px] mb-28 lg:mb-0"
            :class="{
                'overflow-y-hidden ': isPageWinOrLose
            }"
        >
            <CardItem
                v-for="card in cardStore.cards"
                :key="card.uniqueId"
                :image="card.image_url"
                :show="card.visible"
                @click="matchStore.activateCardInRound(card)"
            />
        </div>
        <NuxtPage />
    </div>
</template>

<style lang="postcss" scoped></style>
