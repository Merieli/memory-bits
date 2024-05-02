<script setup lang='ts'>
</script>
    
<template>
    <div class="layoutcenter">
        <main class="w-full h-full max-w-5xl">
            <slot />
        </main>
    </div>
    <BaseFooter class="text-white" />
</template>
    
<style lang='postcss' scoped>
.layoutcenter {
    @apply flex flex-col justify-center items-center
        h-dvh;
    background: repeat-x url("../assets/img/wallpaper.svg") center/ cover;
}
</style>