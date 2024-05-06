<template>
    <ModalComp v-if="modelValue" mWidth="902px" heading="상시 피드백" :show="modelValue"
        @close="$emit('update:modelValue', false)">
        <!-- <div class="rec-modal-sec"> -->
        <!-- <template #header>
            <div class="head-sec modal-header-text">
                <h3>상시 피드백</h3>
            </div>
        </template> -->
        <template #body>
            <div class="feedback-modal-content type-one-design">
                <div class="upper-contents">
                    <div class="inner-heads">
                        <h2>{{ loggedInUser }}</h2>
                        <div class="page-right">
                            <span><img src="/src/assets/icons/chart-bar-square.svg"></span>
                            <span>{{ moment(feedbackData.target_score || scheduleInfo.lessonDate).format("MM") }}월
                                S.P.A.목표점수</span>
                            <span>|</span>
                            <span>{{ feedbackData.total_point || total_point }}점</span>
                        </div>
                    </div>
                    <div class="left-wrap">
                        <ul>
                            <li>
                                <h2>강사명</h2>
                                <p>{{ feedbackData.user_name_kr || scheduleInfo.userNameKr }}</p>
                            </li>
                            <li class="lines">&nbsp;</li>
                            <li>
                                <h2>수업일</h2>
                                <p>{{ feedbackData.schoold_day || scheduleInfo.lessonDate ?
        moment(feedbackData.schoold_day || scheduleInfo.lessonDate).format("YYYY.MM.DD") :
        '' }}</p>
                            </li>
                            <li class="lines">&nbsp;</li>
                            <li>
                                <h2>레슨명</h2>
                                <p>{{ feedbackData.lesson || scheduleInfo.unitTitle }}</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="feedback-question-area">
                    <div class="single-box" v-for="(question, i) of questionList" :key="i">
                        <h2>{{ i + 1 }}. {{ question.TITLE_KR }}</h2>
                        <div class="answer-radio-area" v-if="i != 3">
                            <div class="modal-radio-group" v-for="(item, index) in question.answer_array" :key="index">
                                <label :for="`radio${i}${index}`">
                                    <input type="radio" @change="getRadioInput(i + 1, index + 1)" :value="index + 1"
                                        :id="`radio${i}${index}`" :name="`radio_name${i}`" />
                                    <span>{{ item }}</span>
                                </label>
                            </div>
                        </div>
                        <template v-if="i == 3">
                            <p class="asteric">*중복 선택 가능</p>
                            <div class="multi-select-btn-area">
                                <button type="button" class="single-select-btn"
                                    :class="{ selected: selectedMultipleOptionData.includes(index + 1) }"
                                    @click="selectedMultipleOptionData.length < 4 || selectedMultipleOptionData.includes(index + 1) ? getMultipleAnswer(index + 1) : ''"
                                    v-for="(item, index) in question.answer_array" :key="index">{{ item }}</button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="rec-modal-sec rec-button-wrap">
                <button @click="isConfirmModal = true" type="button" class="modal-btn btn-center">저장하기</button>
            </div>
        </template>
        <!-- </div> -->
    </ModalComp>


    <ConfirmModalVue :visible="isConfirmModal" title="정말 제출하시겠습니까?" primaryButtonText="제출" secondaryButtonText="취소"
        @on-cancel="closeConfirmModal" @on-confirm="saveHakAlwaysFeedback" :is-loading="loaderState" />

    <LoaderVue :loading="loaderState" />
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import { Feedback } from "@/services/Class/Feedback.js";
import moment from "moment";
import { useUserData } from "@/stores/useUserData";
import { storeToRefs } from "pinia";
const { getUserData, getIsMobileViewReady } = storeToRefs(useUserData());
const loggedInUser = computed(() => getUserData.value.username_kr);

const FeedbackService = new Feedback();
const loaderState = ref(false);
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    feedbackData: {
        type: Object,
        default: {}
    },
    class_seq: {
        type: String,
        default: ""
    }
})
const emits = defineEmits(['update:modelValue', 'close']);
const questionList = ref([]);
const selectedMultipleOptionData = ref([]);
const scheduleInfo = ref({});
const total_point = ref("");
const questionInputData = reactive({
    difficulty: "",
    achivement: "",
    prefernce: "",
    want1: "",
    want2: "",
    want3: "",
    want4: "",
});

const isConfirmModal = ref(false);

const closeConfirmModal = () => {
    isConfirmModal.value = false;
};

const getRadioInput = (questionNo, index) => {
    if (questionNo == 1) {
        questionInputData.difficulty = index;
    } else if (questionNo == 2) {
        questionInputData.achivement = index;
    } else if (questionNo == 3) {
        questionInputData.prefernce = index;
    }
}

const getMultipleAnswer = (index) => {
    let data = selectedMultipleOptionData.value.find((f) => {
        return f == index;
    });
    if (data) {
        selectedMultipleOptionData.value.splice(selectedMultipleOptionData.value.indexOf(data), 1);
    } else {
        selectedMultipleOptionData.value.push(index);
    }
}

const gethakFeedbackQuestionList = async () => {
    try {
        loaderState.value = true;
        const res = await FeedbackService.alwaysFeedbackQuestionList({ scheduleId: props.feedbackData?.SCHEDULE_SEQ || props.feedbackData?.lectureDetails?.scheduleId });
        if (res.data) {
            questionList.value = res.data.data;
            scheduleInfo.value = res.data.scheduleInfo;
            total_point.value = res.data.userTotalPoint;
            questionList.value.map((item) => {
                let str = item.SELECT_TEXT;
                let array = str.split("|");
                item.answer_array = array;
                return item;
            });
        }
    } catch (error) {
        console.log(error);
    } finally {
        loaderState.value = false;
    }
};

const saveHakAlwaysFeedback = async () => {
    isConfirmModal.value = false;
    let status;

    questionInputData.want1 = selectedMultipleOptionData.value[0] ? selectedMultipleOptionData.value[0] : "";
    questionInputData.want2 = selectedMultipleOptionData.value[1] ? selectedMultipleOptionData.value[1] : "";
    questionInputData.want3 = selectedMultipleOptionData.value[2] ? selectedMultipleOptionData.value[2] : "";
    questionInputData.want4 = selectedMultipleOptionData.value[3] ? selectedMultipleOptionData.value[3] : "";

    if (hasAnyValue(questionInputData)) {
        status = 2;
    } else {
        status = 1;
    }

    let schedule_date = moment(props.feedbackData?.lectureDetails?.lessonDate).format("YYYY-MM-DD") || moment(props.feedbackData.LESSON_DATE).format("YYYY-MM-DD");

    let data = {
        ...questionInputData,
        status: status,
        class_seq: props.class_seq,
        schedule_date: schedule_date
    };
    console.log(data);

    //return
    try {
        loaderState.value = true;
        const res = await FeedbackService.saveAlwaysFeedback(data);
        if (res.data) {
            emits('update:modelValue', false);
        }
    } catch (error) {
        console.log(error);
    } finally {
        loaderState.value = false;
    }

}

const hasAnyValue = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] !== "") {
            return true; // If any value exists, return true
        }
    }
    return false; // If no value exists, return false
}

onMounted(async () => {
    await gethakFeedbackQuestionList();
});
</script>