<script setup lang="ts">
import texts from '~/configs/texts.json';
import { type LevelGet } from '~/interfaces/api/LevelGet';
import { type ResponseApi } from '~/interfaces/ResponseApi.type';

const props = defineProps({})
const { $toast } = useNuxtApp();

const levelsOptions = ref<string[]>([]);


const level = ref()

function handleClick() {
  alert('hello!')
}

const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek']

try {
    const { data } = await $fetch<ResponseApi<LevelGet[]>>('http://localhost:3000/api/v1/levels')
    levelsOptions.value = data.map((level) => level.name);
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
        <Label class="text-[15px] font-semibold leading-[35px] flex flex-wrap items-center gap-[15px] px-5 mb-8" for="username">
            Username: 
            <input
                id="username"
                class="bg-blackA5 shadow-blackA9 inline-flex h-[35px] w-[150px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                name="username" 
                type="text"
            >
        </Label>
        <Label class="text-[15px] font-semibold leading-[35px] flex flex-wrap items-center gap-[15px] px-5" for="levels">
            Level: 
            <SelectRoot v-model="level">
                <SelectTrigger
                class="inline-flex min-w-[160px] items-center justify-between rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-grass11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-green9 outline-none flex-1"
                aria-label="Customise options"
                >
                    <SelectValue placeholder="Select a level..." />
                    <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />
                </SelectTrigger>
    
                <SelectPortal>
                    <SelectContent
                        class="min-w-[160px] bg-white rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
                        :side-offset="5"
                    >
                        <SelectScrollUpButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                            <Icon icon="radix-icons:chevron-up" />
                        </SelectScrollUpButton>
    
                        <SelectViewport class="p-[5px]">
                            <SelectItem
                                v-for="(option, index) in levelsOptions"
                                :key="index"
                                class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1"
                                :value="option"
                            >
                                <SelectItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                    <Icon icon="radix-icons:check" />
                                </SelectItemIndicator>
                                <SelectItemText>
                                    {{ option }}
                                </SelectItemText>
                            </SelectItem>
                        </SelectViewport>
    
                        <SelectScrollDownButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                            <Icon icon="radix-icons:chevron-down" />
                        </SelectScrollDownButton>
                    </SelectContent>
                </SelectPortal>
            </SelectRoot>
        </Label>

    </div>
</template>

<style lang="postcss" scoped></style>
