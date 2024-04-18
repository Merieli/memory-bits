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
        <div class="flex flex-wrap items-center gap-[15px] px-5">
            <Label class="text-[15px] font-semibold leading-[35px]" for="firstName">Username: </Label>
            <input
                id="firstName"
                class="bg-blackA5 shadow-blackA9 inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                name="username" 
                type="text"
            >
        </div>

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
