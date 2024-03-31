<script setup lang='ts'>
import { useRoute } from 'vue-router';

const props = defineProps({});

const route = useRoute()

</script>
    
<template>
    <h2>jhjhjh</h2>
    <pre>
        {{  route.params.id }}
    </pre>
</template>
    
<style lang='postcss' scoped>
    
</style>