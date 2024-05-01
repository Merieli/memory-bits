<script setup lang='ts'>
</script>
    
<template>
    <div class="layoutcenter">
        <main class="w-full h-full max-w-5xl">
            <slot />
        </main>
    </div>
    <BaseFooter />
</template>
    
<style lang='postcss' scoped>
.layoutcenter {
    @apply flex flex-col justify-center items-center
        h-dvh bg-[#F5F5F5];
}
</style>