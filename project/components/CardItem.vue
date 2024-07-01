<script setup lang='ts'>
export interface CardItemProps {
    image: string
    show: boolean
}

const props = defineProps<CardItemProps>()

const emit = defineEmits(['turn'])

function turnCard(): void {
    emit('turn')
}
</script>

<template>
    <div class="w-full h-full relative">
        <div
            class="card back"
            :class="{ hide: props.show }"
        >
            <img src="~/assets/img/cardLogo.png" alt="card" class="h-2/3 max-w-[66%]">
        </div>
        <div
            class="card front

        "
            :class="{ show: props.show }"
            @click="turnCard" @keydown.enter="turnCard"
        >
            <img :src="image" alt="card" class="h-2/3 max-w-[66%]">
        </div>
    </div>
</template>

<style lang='postcss' scoped>
.card {
    transition: all .5s;
    backface-visibility: hidden;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.30);
    position: absolute;

    @apply bg-[#FFFBEC] rounded-lg max-w-full
            grid place-items-center cursor-pointer
            border-[#333333] border-4
            h-full w-full;
}

.hide {
    z-index: 0;
    transform: rotateY(180deg);
}

.front {
    transform: rotateY(180deg);
}

.show {
    transform: rotateY(0);
}
</style>
