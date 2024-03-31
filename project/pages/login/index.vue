<script setup lang="ts">
const props = defineProps({})
</script>

<template>
    <h1 class="text-3xl font-bold underline">
        Memory Bits
    </h1>
    <div>
        <label for="username">Username</label>
        <input type="text" id="username" />

        <label for="level">Level</label>
        <select id="level">
            <!-- TODO: obter levels do BD -->
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
    </div>
</template>

<style lang="postcss" scoped></style>
