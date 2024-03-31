<script setup lang="ts">
const props = defineProps({})

const test = ref('Hello World')

const route = useRoute()

const { $toast } = useNuxtApp();

onMounted(() => {
    console.log('mounted')

    $toast.success('Welcome to Memory Bits')
})
</script>

<template>
    <header>
        <h1>Memory Bits</h1>
        <div class="header__details">
            <p>Username</p>
            <span>10000</span>
            <p>Level</p>
        </div>

        <div class="header__info">
            {{route.name}}
        </div>
    </header>
    <NuxtLink :to="{ name: 'index' }">Retry</NuxtLink>
</template>

<style lang="postcss" scoped></style>
