<script setup lang="ts">
interface PropsBaseInput {
    label: string
    minLength?: number
    maxLength?: number
}
const props = withDefaults(defineProps<PropsBaseInput>(), {
    minLength: 3,
    maxLength: 20,
})

const model = defineModel('value', { type: String })
const emit = defineEmits(['invalid'])

const isInvalid = computed(() => {
    if (!model.value) {
        return false
    }

    return (
        model.value.length > props.maxLength ||
        model.value.length < props.minLength
    )
})

const errorMessage = computed(() => {
    if (
        isInvalid.value &&
        model.value &&
        model.value.length > props.maxLength
    ) {
        return `Enter less than ${props.maxLength} characters`
    }

    if (isInvalid.value) {
        return `Enter more than ${props.minLength} characters`
    }

    return ''
})

watch(
    () => model.value,
    (value) => {
        emit('invalid', isInvalid.value)
    }
)
</script>
<template>
    <div class="relative">
        <Label
            class="text-xl font-semibold leading-[35px] flex flex-wrap items-center gap-[15px] px-5 text-black-light"
            :class="{
                'mb-8': !errorMessage,
            }"
            :for="label"
        >
            {{ label }}:
            <input
                v-model="model"
                id="username"
                class="inline-flex items-center justify-center h-[35px] w-[150px] rounded-[4px] appearance-none px-[10px] text-xl leading-none focus:shadow-[0_0_0_2px_blue-dark] outline-none bg-white shadow-black/10 shadow-[0_2px_10px] focus:outline-blue-dark selection:text-white selection:bg-blue-mid"
                :name="label"
                type="text"
            />
        </Label>
        <p
            v-if="errorMessage"
            class="text-sm font-normal leading-[32px] px-5 mb-0 text-right text-danger-light"
        >
            {{ errorMessage }}
        </p>
    </div>
</template>
<style lang="postcss" scoped></style>
