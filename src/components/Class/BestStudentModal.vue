<template>
    <ModalComp v-if="modelValue" mWidth="902px" :show="modelValue" @close="$emit('update:modelValue', false)">
        <!-- <div class="rec-modal-sec"> -->
        <template #header>
        </template>
        <template #body>
            <div class="feedback-modal-content">
                <div class="upper-contents">
                    <div class="inner-heads centers">
                        <img :src="`/src/assets/images/${imageName}`" /> 
                    </div>
                </div>
            </div>
        </template>
        <template #footer></template>

        <!-- </div> -->
    </ModalComp>
</template>

<script setup>
import { ref, onMounted, computed, callWithErrorHandling } from "vue";
const loaderState = ref(false);
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    imageName: {
        type: String,
        default: false
    }
})
const emits = defineEmits(['update:modelValue', 'close']);
</script>