<script setup lang='ts'>
export interface CardItemProps {
    image: string;
}
const props = defineProps<CardItemProps>()
</script>
    
<template>
    <div>
        <img :src="image" alt="card" />
    </div>
</template>
    
<style lang='postcss' scoped>
    
</style>