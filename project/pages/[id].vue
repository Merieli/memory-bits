<script setup lang='ts'>
import { useRoute } from 'vue-router';


const props = defineProps({});

const route = useRoute()

const { validData } = useValidateQueryURL();
</script>
    
<template>
    <h2>jhjhjh</h2>
    {{ validData }}

</template>
    
<style lang='postcss' scoped>
    
</style>