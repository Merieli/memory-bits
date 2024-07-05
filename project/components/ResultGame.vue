<script setup lang="ts">
import { useGameStore } from '~/stores/game';

interface ResultGameProps {
    win: boolean
}

const props = defineProps<ResultGameProps>()

const text = computed(() => {
    return props.win ? 'YOU WIN!' : 'GAME OVER'
})

const storeGame = useGameStore()
const router = useRouter()

const isPageWinOrLose = computed(() => {
    return router.currentRoute.value.name === 'index-win' || router.currentRoute.value.name === 'index-gameover'
})
</script>

<template>
    <div
        class="bg-black top-0 left-0 w-full h-full opacity-80"
        :class="{
            'fixed': isPageWinOrLose,
            'absolute': !isPageWinOrLose,
        }"
    />
    <section
        class="flex flex-col justify-center items-center gap-4 w-full h-full top-0 left-0 z-10 absolute"
    >
        <p
            class="text text-8xl"
            :class="{
                'text-white': !win,
                'text-warning-base': win,
            }"
        >
            {{ text }}
        </p>

        <img
            v-if="!win"
            src="~/assets/img/ghost.svg"
            alt="Game Over"
            class="max-w-44 max-h-44"
        >
        <img
            v-else
            src="~/assets/img/trofel.png"
            alt="Game Over"
            class="max-w-44 max-h-44"
        >

        <button type="button" @click="storeGame.restartTheGame">
            <img
                v-if="!win"
                src="~/assets/img/reload.svg"
                class="h-16 w-16"
                alt="timer"
            >
            <img
                v-else
                src="~/assets/img/reload-win.svg"
                class="h-16 w-16"
                alt="timer"
            >
        </button>
    </section>
</template>

<style lang="postcss" scoped>
.text {
    filter: drop-shadow(-1.1px 0 0 black) drop-shadow(1.1px 0 0 black)
        drop-shadow(0 -1.1px 0 black) drop-shadow(0 2px 0 black);
}
</style>
