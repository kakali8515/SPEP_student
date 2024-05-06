<template>
    <div class="accordion-box">
        <div class="accordion-head pointer" @click="toggleAccordion()" :aria-expanded="isOpen"
            :aria-controls="`collapse`">
            <slot name="title" />
            <span :class="[isOpen ? 'up_arrow' : '']"><img src="@/assets/icons/carret-down.svg"></span>
        </div>

        <div class="accordion-body" v-show="isOpen" :id="`collapse`">
            <slot name="content" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
const isOpen = ref(false);

const toggleAccordion = () => {
    isOpen.value = !isOpen.value;
};
</script>