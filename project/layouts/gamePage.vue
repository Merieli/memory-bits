<script setup lang="ts"></script>

<template>
    <div class="layoutcenter">
        <main
            class="w-full min-h-full lg:h-full max-w-5xl px-8 lg:px-0 xl:mx-0"
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
</style>
