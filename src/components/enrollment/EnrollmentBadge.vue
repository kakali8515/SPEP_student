<template>
    <div class="type pointer" :class="{ 'active': isActive, 'disable-event': isActive }" @click="$emit('onSelect')">
        <p>{{ text }}</p>
    </div>
</template>
<script setup>

const props = defineProps({
    text: {
        type: String,
        default: '-'
    },
    isActive: {
        type: Boolean,
        default: false
    }
})
</script>
