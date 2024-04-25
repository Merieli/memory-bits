<script setup lang='ts'>
</script>
    
<template>
    <div class="layoutcenter">
        <slot />
    </div>
    <BaseFooter />
</template>
    
<style lang='postcss' scoped>
.layoutcenter {
    @apply flex flex-col justify-center items-center
        h-dvh bg-[#F5F5F5];
}
</style>