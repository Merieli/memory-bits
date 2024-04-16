<script setup lang='ts'>
import { useRoute } from 'vue-router';
import texts from '~/configs/texts.json';

const props = defineProps({});

const route = useRoute()

const { validData } = useValidateQueryURL();
</script>
    
<template>
    <h2>{{ texts.projectTitle }}</h2>
    {{ validData }}

</template>
    
<style lang='postcss' scoped>
    
</style>