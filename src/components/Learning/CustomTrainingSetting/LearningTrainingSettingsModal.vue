<template>
    <ModalComp v-if="modelValue" mWidth="500px" :heading="questionItem.main_category_title_kr" :show="modelValue"
        @close="$emit('update:modelValue', false)">
        <template #header>
            <div class="modal-header-text">
                <!-- <h3>{{ questionItem.main_category_title_kr }}</h3> -->
                <p v-if="questionItem.max > 1" class="red-text">*중복 선택 가능</p>
            </div>
            <!-- <button class="close-btn" @click="emits('close')">
                    <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
                </button> -->
        </template>
        <template #body>
            <div v-if="!isShowInputBox" class="modal_body">
                <div class="reset-selection">
                    <span>선택사항 초기화</span>
                    <img @click="resetData" class="pointer" src="@/assets/icons/ArrowsCounterClockwise.svg" alt="" />
                </div>
                <div class="pills-wrapper">
                    <template v-for="answer in answerList" :key="answer">
                        <button v-if="questionItem.max == 1"
                            :class="answer.isActiveClass || previous_ans_list.includes(answer.ex_sub_category_seq) ? 'active' : ''"
                            class="pill-shaped outline"
                            @click="answer.sub_category_oprion1 ? showInputBox(answer, questionItem, answerList) : addAnswer(answer, questionItem, answerList)">#
                            {{ answer.sub_category_title_kr }}</button>
                        <button
                            :disabled="(previous_ans_list.length == questionItem.max && !previous_ans_list.includes(answer.ex_sub_category_seq))"
                            v-if="questionItem.max > 1"
                            :class="[answer.isActiveClass || previous_ans_list.includes(answer.ex_sub_category_seq) ? 'active' : '', ((previous_ans_list.length == questionItem.max) && !previous_ans_list.includes(answer.ex_sub_category_seq)) ? 'cursor-not-allowed' : 'pointer']"
                            class="pill-shaped outline"
                            @click="answer.isActiveClass || previous_ans_list.includes(answer.ex_sub_category_seq) || previous_ans_list.length != questionItem.max ? addAnswer(answer, questionItem, answerList) : ''">#
                            {{ answer.sub_category_title_kr }}</button>
                    </template>
                </div>
            </div>
            <div v-if="isShowInputBox" class="modal_body">
                <input v-model="customization_input" type="text" class="form-control"
                    placeholder="자주 사용하는 언어 영역을 입력해 주세요.">
                <p class="errormsg" v-if="error.customization_input">{{ error.customization_input }}</p>
            </div>
        </template>
        <template #footer>
            <button v-if="!isShowInputBox" :disabled="inputData?.sub_category_seq?.length == 0"
                :class="inputData?.sub_category_seq?.length == 0 ? 'notallow' : ''" type="button"
                class="modal-btn btn-center" @click="submitAnswer()">
                저장하기
            </button>
            <button v-if="isShowInputBox" :disabled="customization_input == ''"
                :class="customization_input == ''? 'notallow' : ''" type="button"
                class="modal-btn btn-center" @click="submitAnswer()">
                저장하기
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
    questionItem: {
        type: Object,
        default: {}
    }
})
const emits = defineEmits(['update:modelValue', 'close']);

const answerList = ref([]);
const previous_ans_list = ref([])
const isShowInputBox = ref(false);
const customization_input = ref("");
const selectedMultipleOptionData = ref([]);
const error = reactive({
    customization_input: ""
});
const selectedInputBoxData = reactive({
    option: "",
    question: []
});
const inputData = ref({});

const showInputBox = (option, question, optionArray) => {
    isShowInputBox.value = true;
    selectedInputBoxData.option = option;
    selectedInputBoxData.question = question;
    previous_ans_list.value = [];
    option['isActiveClass'] = true;
    optionArray.forEach((element) => {
        if (element != option) {
            element['isActiveClass'] = false;
        }
    });
}

// single answer selection
const addAnswer = (answer, question, optionArray) => {
    //previous_ans_list.value = [];
    isShowInputBox.value = false;
    customization_input.value = "";
    if (answer.ex_sub_category_seq == 2) {
        emits('close');
    } else {
        if (question.max > 1) {
            let data = previous_ans_list.value.find((f) => {
                return f == answer.ex_sub_category_seq;
            });
            if (data) {
                answer['isActiveClass'] = false;
                previous_ans_list.value.splice(previous_ans_list.value.indexOf(answer.ex_sub_category_seq), 1);
            } else {
                answer['isActiveClass'] = true;
                previous_ans_list.value.push(answer.ex_sub_category_seq);
            }
            question.selectedAnswerCount = previous_ans_list.value.length;

            //let ex_sub_category_seq = [];
            // selectedMultipleOptionData.value.forEach((element) => {
            //     ex_sub_category_seq.push(element.ex_sub_category_seq)
            // })
            inputData.value = {
                category_seq: question.exi_category_seq,
                sub_category_seq: previous_ans_list.value,
                point: 0,
                memo: customization_input.value
            }
        } else {
            previous_ans_list.value = [];
            answer['isActiveClass'] = true;
            optionArray.forEach((element) => {
                if (element != answer) {
                    element['isActiveClass'] = false;
                }
            });
            inputData.value = {
                category_seq: question.exi_category_seq,
                sub_category_seq: [answer.ex_sub_category_seq],
                point: 0,
                memo: customization_input.value
            }
        }
    }
}

const submitAnswer = () => {
    if (isShowInputBox.value) {
        if (!customization_input.value) {
            error.customization_input = "Please enter your information.";
            return
        }
        let inputData = {
            category_seq: selectedInputBoxData.question.exi_category_seq,
            sub_category_seq: [selectedInputBoxData.option.ex_sub_category_seq],
            point: 0,
            memo: customization_input.value
        }
        updateCustomization(inputData);
    } else {
        updateCustomization(inputData.value);
    }
}

const updateCustomization = async (data) => {
    try {
        loaderState.value = true;
        const res = await CustomizationService.addCustomizationData(data);
        // console.log(res);
        if (res.data) {
            customization_input.value = "";
            isShowInputBox.value = false;
            selectedInputBoxData.option = "";
            selectedInputBoxData.question = [];
            selectedMultipleOptionData.value = [];
            emits('close');
        }
    } catch (error) {
        console.log(error);
    } finally {
        loaderState.value = false;
    }
}

// get Customization details 
const getCustomizationData = async () => {
    try {
        loaderState.value = true;
        const res = await CustomizationService.answerListByCatgoryId(props.questionItem.exi_category_seq);
        if (res.data) {
            let data = res.data.question_answer_list.find((f) => {
                return f.exi_category_seq == props.questionItem.exi_category_seq;
            });
            if (data) {
                answerList.value = data.sub_category;
            }
            const ansData = res.data.previous_ans_list.length ? res.data.previous_ans_list[0][props.questionItem.exi_category_seq] : [];
            previous_ans_list.value = ansData.map(str => Number(str.split("~")[0]));
            customization_input.value = ansData.map(str => str.split("~")[1])[0] == 0 ? '' : ansData.map(str => str.split("~")[1])[0];
            inputData.value = {
                category_seq: props.questionItem.exi_category_seq,
                sub_category_seq: previous_ans_list.value,
                point: 0,
                memo: customization_input.value
            }

            console.log(inputData.value);
        }
    } catch (error) {
        console.log(error);
    } finally {
        loaderState.value = false;
    }
};

const resetData = async () => {

    try {
        loaderState.value = true;
        const res = await CustomizationService.resetCustomization(props.questionItem.exi_category_seq);
        // console.log(res);
        if (res.data) {
            customization_input.value = "";
            isShowInputBox.value = false;
            selectedInputBoxData.option = "";
            selectedInputBoxData.question = [];
            selectedMultipleOptionData.value = [];
            emits('reloadCustomization');

        }
    } catch (error) {
        console.log(error);
    } finally {
        loaderState.value = false;
    }

    customization_input.value = "";
    isShowInputBox.value = false;
    selectedInputBoxData.option = "";
    selectedInputBoxData.question = [];
    selectedMultipleOptionData.value = [];
    getCustomizationData();
}

onMounted(async () => {
    await getCustomizationData();
});
</script>