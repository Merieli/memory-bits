<script setup lang="ts">
import texts from '~/configs/texts.json';
import type { LevelsGame } from '~/interfaces/LevelsGame.type';
import { useGameStore } from '~/stores/game';
import { useLevelStore } from '~/stores/level';

const runtimeConfig = useRuntimeConfig();

const gameStore = useGameStore();
const levelStore = useLevelStore();

const levelsOptions = ref<string[]>([]);
const level = ref<LevelsGame | string>('');
const username = ref<string>('');

const playIsDisabled = computed<boolean>(() => {
    return !(Boolean(level.value) && Boolean(username.value));
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
    <h1 class="text-8xl font-medium mb-24 absolute top-[20%]">
        {{ texts.projectTitle }}
    </h1>
    <img src="~/assets/img/chat.svg" alt="Logo" 
        class="w-[500px] h-[500px] mb-8
            absolute top-[25%]
        " 
    />
    <div class="flex flex-col justify-center min-h-36 z-10">
        <Label class="text-xl font-semibold leading-[35px] 
            flex flex-wrap items-center 
            gap-[15px] 
            px-5 mb-8

            text-black-light
        " for="username">
            Username: 
            <input
                v-model="username"
                id="username"
                class="inline-flex items-center justify-center 
                    h-[35px] w-[150px] 
                    rounded-[4px] 
                    appearance-none px-[10px] 
                    text-xl leading-none  
                    focus:shadow-[0_0_0_2px_blue-dark] 
                    outline-none

                    bg-white 

                    shadow-black/10 
                    shadow-[0_2px_10px] 

                    focus:outline-blue-dark
                    selection:text-white 
                    selection:bg-blue-mid
                "
                name="username" 
                type="text"
            >
        </Label>
        <Label class="flex flex-wrap items-center 
            text-xl font-semibold leading-[35px] 
            gap-[15px] 
            px-5 mb-8

            text-black-light
        " for="levels">
            Level: 
            <SelectRoot v-model="level">
                <SelectTrigger
                    class="inline-flex flex-1 items-center justify-between 
                        rounded px-[15px] 
                        text-xl leading-none 
                        h-[35px] min-w-[160px] gap-[5px] 

                        bg-white 
                        text-black-dark
                        hover:bg-white
                        data-[placeholder]:text-black-light

                        shadow-black/10 
                        shadow-[0_2px_10px] 
                        focus:shadow-[0_0_0_2px] 
                        focus:shadow-blue-dark 
                        outline-none
                    "
                    aria-label="Customise options"
                >
                    <SelectValue placeholder="Select a level..." />
                    <Icon name="radix-icons:chevron-down" class="h-3.5 w-3.5" />
                </SelectTrigger>
    
                <SelectPortal>
                    <SelectContent
                        class="min-w-[160px] 
                            rounded

                            bg-white 

                            shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] 
                            will-change-[opacity,transform] 

                            data-[side=top]:animate-slideDownAndFade 
                            data-[side=right]:animate-slideLeftAndFade 
                            data-[side=bottom]:animate-slideUpAndFade 
                            data-[side=left]:animate-slideRightAndFade 
                            z-[100]"
                        :side-offset="5"
                    >
                        <SelectScrollUpButton class="flex items-center justify-center 
                            h-[25px]

                            text-blue-mid
                            bg-white 

                            cursor-default
                        ">
                            <Icon name="radix-icons:chevron-up" />
                        </SelectScrollUpButton>
    
                        <SelectViewport class="p-[5px]">
                            <SelectItem
                                v-for="(option, index) in levelsOptions"
                                :key="index"
                                class="flex items-center
                                    text-xl leading-none 
                                    h-[25px]
                                    rounded-[3px] 
                                    pr-[35px] pl-[25px] 
                                    relative select-none  
                                    data-[disabled]:pointer-events-none 
                                    data-[highlighted]:outline-none 

                                    text-black-dark
                                    data-[highlighted]:bg-blue-mid 
                                    data-[highlighted]:text-white
                                    
                                    data-[disabled]:text-black-light
                                "
                                :value="option"
                            >
                                <SelectItemIndicator class="absolute left-0 
                                    w-[25px] 
                                    inline-flex items-center justify-center
                                ">
                                    <Icon name="radix-icons:check" />
                                </SelectItemIndicator>
                                <SelectItemText>
                                    {{ option }}
                                </SelectItemText>
                            </SelectItem>
                        </SelectViewport>
    
                        <SelectScrollDownButton class="flex items-center justify-center 
                            h-[25px] 

                            text-blue-mid 
                            bg-black-light 

                            cursor-default
                        ">
                            <Icon name="radix-icons:chevron-down" />
                        </SelectScrollDownButton>
                    </SelectContent>
                </SelectPortal>
            </SelectRoot>
        </Label>
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

<style lang="postcss" scoped></style>
