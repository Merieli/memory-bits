<script setup lang="ts">
import texts from '~/configs/texts.json';
import { type LevelGet } from '~/interfaces/api/LevelGet';
import { type ResponseApi } from '~/interfaces/ResponseApi.type';

const props = defineProps({})
const { $toast } = useNuxtApp();

const levels = ref<LevelGet[]>([]);

try {
    const { data } = await $fetch<ResponseApi<LevelGet[]>>('http://localhost:3000/api/v1/levels')
    levels.value = data;
} catch (error) {
    console.error(error)
    $toast.error('Error to get levels')
}
</script>

<template>
    <h1 class="text-3xl font-bold underline">
        {{ texts.projectTitle }}
    </h1>
    <div class="flex flex-col justify-center min-h-36">
        <label>
            Username: 
            <input type="text" name="username" />
        </label>
        

        <label>
            Level: 
            <select id="level" name="level">
                <option :value="level.name" v-for="level, index in levels" :key="index">
                    {{ level.name }}
                </option>
            </select>
        </label>
    </div>
</template>

<style lang="postcss" scoped></style>
