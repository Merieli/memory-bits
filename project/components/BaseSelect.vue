<script setup lang='ts'>
interface PropsBaseSelect {
    label: string
    options: any[]
}
defineProps<PropsBaseSelect>();
const model = defineModel('value', { type: String });
</script>
<template>
    <Label class="flex flex-wrap items-center 
        text-xl font-semibold leading-[35px] 
        gap-[15px]
        px-5 mb-8

        text-black-light
    " :for="label">
        {{ label }}: 
        <SelectRoot v-model="model">
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
                aria-label="Customize options"
            >
                <SelectValue :placeholder="`Select a ${label.toLowerCase()}...`" />
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
                            v-for="(option, index) in options"
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
</template>
<style lang="postcss" scoped>
</style>