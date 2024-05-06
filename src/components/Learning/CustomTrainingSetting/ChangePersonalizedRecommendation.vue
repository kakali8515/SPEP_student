<template>
    <ModalComp v-if="modelValue" heading="학습할 레슨 변경하기" mWidth="355px" :show="modelValue" @close="$emit('update:modelValue', false)">
        <template #header>
            <!-- <div class="modal-header-text">
                <h3>학습할 레슨 변경하기</h3>
            </div> -->
            <p class="modal-desc">학습할 레슨 변경하기에 대한 설명이 들어갑니다.</p>
        </template>
        <template #body>
            <div class="modal_body">
                <div class="lesson-header">
                    <span class="tag">{{ lessonItem.unit_seq_title }}</span>
                    <h6>{{ lessonItem.unit_name }}</h6>
                </div>
                <p class="red-text">변경할 레슨을 선택해 주세요.</p>
                <div class="modal-radio-group" v-if="modal_list.length">
                    <label v-for="(item, index) in modal_list " :key=index>
                        <input type="radio" name="lesson" v-model="cmu_seq" :value="item.cmu_seq" />
                        <span>{{ item.title }}</span>
                    </label>
                </div>
                <NoDataFoundVue v-else />
            </div>
        </template>
        <template #footer>
            <button v-if="modal_list.length" type="button" class="modal-btn btn-center" @click="updateLessonData">
                변경하기
            </button>
        </template>
    </ModalComp>
    <LoaderVue :loading="loaderState" />
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { Customization } from "@/services/Customization/Customization.js";
const CustomizationService = new Customization();
const loaderState = ref(false);
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    lessonItem: {
        type: Object,
        default: {}
    }
});
const emits = defineEmits(['update:modelValue', 'close']);
const modal_list = ref([]);
const cmu_seq = ref("");

// const modal_list = ref([
//     {
//         "cmu_seq": 132420,
//         "unit_seq": 8374,
//         "title": "U01-1 I’m on the Home Stretch.",
//         "class_seq": 114757,
//         "lecture_seq": 3318
//     },
//     {
//         "cmu_seq": 132426,
//         "unit_seq": 8378,
//         "title": "U03-1 I Value Your Feedback.",
//         "class_seq": 114757,
//         "lecture_seq": 3318
//     },
//     {
//         "cmu_seq": 132425,
//         "unit_seq": 8380,
//         "title": "U04-1 Put Your Heads Together.",
//         "class_seq": 114757,
//         "lecture_seq": 3318
//     },
//     {
//         "cmu_seq": 132419,
//         "unit_seq": 8383,
//         "title": "U05-2 Too Many Cooks Spoil the Broth.",
//         "class_seq": 114757,
//         "lecture_seq": 3318
//     },
//     {
//         "cmu_seq": 132422,
//         "unit_seq": 8387,
//         "title": "U07-2 My In-Laws Are in Town.",
//         "class_seq": 114757,
//         "lecture_seq": 3319
//     },
//     {
//         "cmu_seq": 132423,
//         "unit_seq": 8393,
//         "title": "U10-2 I Need My Daily Dose of Caffeine Every Morning.",
//         "class_seq": 114757,
//         "lecture_seq": 3319
//     },
//     {
//         "cmu_seq": 132424,
//         "unit_seq": 8394,
//         "title": "U11-1 You’re Too Kind.",
//         "class_seq": 114757,
//         "lecture_seq": 3319
//     },
//     {
//         "cmu_seq": 132421,
//         "unit_seq": 8396,
//         "title": "U12-1 I’m Good With Numbers.",
//         "class_seq": 114757,
//         "lecture_seq": 3319
//     }
// ])

const getPersonalizedData = async () => {
    try {
        loaderState.value = true;
        const res = await CustomizationService.lessonModaldata();
        if (res.data) {
            modal_list.value = res.data.modal_list;
        }
    } catch (error) {
        console.log(error);
    } finally {
        loaderState.value = false;
    }
};

const updateLessonData = async () => {
    let inputData = {
        class_seq: props.lessonItem.class_seq,
        unit_seq: props.lessonItem.unit_seq,
        lecture_seq: props.lessonItem.lecture_seq,
        cmu_seq: cmu_seq.value
    }
    try {
        loaderState.value = true;
        const res = await CustomizationService.lessonModalUpdatedata(inputData);
        if (res.data) {
            emits('update:modelValue', false);
        }
    } catch (error) {
        console.log(error);
    } finally {
        loaderState.value = false;
    }
}

onMounted(async () => {
    await getPersonalizedData();
});
</script>