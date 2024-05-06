<template>
    <ModalComp v-if="modelValue" heading="서비스 준비중입니다" :show="modelValue" @close="$emit('update:modelValue', false)">
        <!-- <template #header>
            <div style="display: flex; justify-content: center; width: 100%;">
                <h4><b>서비스 준비중입니다</b></h4>
            </div>
        </template> -->
        <template #body>
            <div style="text-align: center; padding-top: 20px;">
                <h5>보다 나은 서비스 제공을 위하여 페이지 준비중입니다.</h5>
                <h5>빠른 시일 내에 준비하여 찾아뵙겠습니다.</h5>
            </div>
        </template>
        <template #footer>
            <div style="padding-top: 10px;">
                <button class="blue-square-btn" @click="$emit('update:modelValue', false)">확인</button>
            </div>
        </template>
    </ModalComp>
</template>
<script setup>
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['update:modelValue'])
</script>