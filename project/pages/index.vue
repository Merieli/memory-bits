<script setup lang="ts">
import texts from '~/configs/texts.json';

const props = defineProps({})

const test = ref('Hello World')

const route = useRoute()

onMounted(() => {
    console.log('mounted')
})
</script>

<template>
    <header>
        <h1>{{ texts.projectTitle }}</h1>
        <div class="header__details">
            <p>Username</p>
            <span>10000</span>
            <p>Level</p>
        </div>
    </header>
    <NuxtLink :to="{ name: 'index' }">Retry</NuxtLink>
</template>

<style lang="postcss" scoped></style>
