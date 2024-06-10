<script setup lang='ts'>
interface PropsBaseInput {
    label: string
}
const props = defineProps<PropsBaseInput>();
const model = defineModel('value', { type: String });

const validate = computed(() => {
    return model.value && model.value.length > 20;
});

const errorMessage = computed(() => {
    if (validate.value) {
        return `The ${props.label} is too long`;
    }
});
</script>
<template>
    <Label class="text-xl font-semibold leading-[35px] 
            flex flex-wrap items-center 
            gap-[15px] 
            px-5 mb-8

            text-black-light
        " :for="label">
            {{ label }}: 
            <input
                v-model="model"
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
                :name="label" 
                type="text"
            >
        </Label>
        {{ errorMessage }}
</template>
<style lang="postcss" scoped>
</style>