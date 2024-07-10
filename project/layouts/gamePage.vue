<script setup lang="ts">
const router = useRouter()

const isPageWinOrLose = computed(() => {
    return router.currentRoute.value.name === 'index-win' || router.currentRoute.value.name === 'index-gameover'
})
</script>

<template>
    <div
        class="layoutcenter"
        :class="{
            'h-dvh': isPageWinOrLose
        }"
    >
        <main
            class="w-full min-h-full lg:h-full max-w-5xl px-8 lg:px-0 xl:mx-0"
            :class="{
                'fixed w-full': isPageWinOrLose
            }"
        >
            <slot />
        </main>
    </div>
    <BaseFooter class="text-white" />
</template>

<style lang="postcss" scoped>
.layoutcenter {
    @apply flex flex-col justify-center items-center
        lg:h-dvh;
    background: repeat-x url('../assets/img/wallpaper.svg') center/ cover;
}

@media screen and (max-height: 900px) {
    .layoutcenter{
        @apply h-full pb-16;
    }
}
</style>
