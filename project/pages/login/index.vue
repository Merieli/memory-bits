<script setup lang="ts">
import texts from '~/configs/texts.json';
import type { LevelsGame } from '~/interfaces/LevelsGame.type';
import { useGameStore } from '~/stores/game';
import { useLevelStore } from '~/stores/level';

const gameStore = useGameStore();
const levelStore = useLevelStore();

const levelsOptions = ref<string[]>([]);
const level = ref<LevelsGame | string>('');
const username = ref<string>('');

const invalidUsername = ref<boolean>(false);

const setInvalidUsername = (value: boolean) => {
    invalidUsername.value = value;
}

const playIsDisabled = computed<boolean>(() => {
    return !(Boolean(level.value) && Boolean(username.value)) || invalidUsername.value;
})

const playGame = () => {
    if (!playIsDisabled.value) {
        gameStore.startTheGame(username.value, level.value as LevelsGame);
    }
}

const allLevels = await levelStore.getAllLevels();
if (allLevels) {
    levelsOptions.value = allLevels.map((level) => level.name);
}
</script>

<template>
    <h1 class="text-8xl font-medium mb-24 absolute title">
        {{ texts.projectTitle }}
    </h1>
    <img src="~/assets/img/chat.svg" alt="Logo" 
        class="w-[500px] h-[500px] mb-8
            absolute background
        " 
    />
    <div class="flex flex-col justify-center min-h-36 z-10">
        <BaseInput  
            v-model:value="username" 
            label="Username" 
            :min-lenght="4"
            :max-lenght="50"
            @invalid="setInvalidUsername" 
        />
        <BaseSelect v-model:value="level" label="Level" :options="levelsOptions" />
        <button class="inline-flex items-center justify-center self-end
            h-[35px] max-w-28
            mr-5

            rounded 
            px-[15px]
            text-2xl leading-none font-medium  
            outline-none

            bg-blue-mid 
            text-white 
            hover:bg-blue-light 

            focus:shadow-[0_0_0_2px] 
            focus:shadow-blue-dark 
            cursor-pointer

            disabled:bg-blue-light
            disabled:cursor-not-allowed
        "   
            :disabled="playIsDisabled"
            @click="playGame"
        >
          Play
        </button>
    </div>
</template>

<style lang="postcss" scoped>
.title {
    top: calc((100% - 500px) /3);
}

.background {
    top: calc((100% - 500px) / 2 );
}
</style>
