<template>
    <section class="customaization-sec">
        <div class="container">
            <div class="row">
                <div class="web100">
                    <div class="coustomize-body">
                        <div class="heading">
                            <h1>맞춤 교육 설정</h1>
                        </div>
                        <div class="setting-section">
                            <div class="reset-area">
                                선택사항 초기화 <a href="#"><img @click="gotoPreviousQuestion" src="@/assets/icons/reset-blk.svg"></a>
                            </div>
                            <div class="setting-box">
                                <div class="main-area" v-for="question in customizationData" :key="question">
                                    <div class="left-setting">
                                        <div class="logo">
                                            <img src="@/assets/icons/settinglogo.svg">
                                        </div>
                                        <div class="left-message">
                                            <p>{{ question.main_category_title_kr }}</p>
                                        </div>
                                    </div>
                                    <div class="right-setting">
                                        <div class="right-mmessage non-border-shadow" v-if="question.max == 1">
                                            <template v-for="option in question.sub_category" :key="option">
                                                <p :class="option.isActiveClass ? '' : 'non-border-shadow pointer'"
                                                    @click="option.sub_category_oprion1 ? showInputBox(option, question, question.sub_category) : addAnswer(option, question, question.sub_category)">
                                                    {{ option.sub_category_title_kr }}</p>
                                            </template>
                                        </div>

                                        <div class="right-mmessage" v-if="question.max > 1">
                                            <p :class="[option.isActiveClass ? 'active pointer' : '', 'options', ((question.selectedAnswerCount == question.max) && !option.isActiveClass) ? 'cursor-not-allowed' : 'pointer']"
                                                v-for="option in question.sub_category" :key="option"
                                                @click="(question.selectedAnswerCount != question.max) || option.isActiveClass ? chooseMultipleOption(option, question) : ''">
                                                {{
                                    option.sub_category_title_kr }}</p>
                                        </div>

                                    </div>
                                    <div class="submit-btn-setting" v-if="question.max > 1 && question.isShowSubmitBtn">
                                        <button type="button" @click="submitMultipleAnswer(question)"
                                            :class="selectedMultipleOptionData.length ? '' : 'disable'">제출하기</button>
                                    </div>
                                </div>

                                <div class="chat-section" v-if="isShowInputBox">
                                    <div class="chat">
                                        <input type="text" v-model="customization_input" placeholder="간단한 일상 회화 가능">
                                        <button type="button" @click="submitInputResponse()"><img
                                                src="@/assets/icons/chat.svg"></button>
                                    </div>
                                    <p class="errormsg" v-if="error.customization_input">{{ error.customization_input }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <LoaderVue :loading="loaderState" />
    </section>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { Customization } from "@/services/Customization/Customization.js";
import { Enrolment } from '@/services/Enrolment/Enrolment';
import { useRoute, useRouter } from "vue-router";
import cloneDeep from 'lodash/cloneDeep';
const route = useRoute();
const router = useRouter();
const CustomizationService = new Customization();
const enrlSrvc = new Enrolment();
const loaderState = ref(false);
const customizationData = ref([]);
const showingCustomizationData = ref([]);
const newData = ref([]);
const isShowInputBox = ref(false);
const customization_input = ref("");
const selectedInputBoxData = reactive({
    option: "",
    question: []
});
const selectedMultipleOptionData = ref([]);
const error = reactive({
    customization_input: ""
});
const index = ref(0);
const enrollHistoryList = ref([]);
const enrollHistoryIds = ref([]);

// ====== GET Enrollment History List =====
const getEnrollmentHistory = async () => {
    try {
        const res = await enrlSrvc.afterCourseRegAn();
        if (!res.data.success) throw new Error('something went wrong');
        enrollHistoryList.value = res.data.list;
        enrollHistoryIds.value = res.data.enrolledProgram1IDs;
    } catch (error) {
        console.error(error);
    } finally {
        loaderState.value = false;
    }
}

// get Customization details 
const getCustomizationData = async () => {
    try {
        loaderState.value = true;
        const res = await CustomizationService.getCustomizationDetails();
        if (res.data) {
            showingCustomizationData.value = cloneDeep(res.data.question_answer_list);
            newData.value = cloneDeep(res.data.question_answer_list);

            let data = customizationData.value.find((f) => {
                return f.exi_category_seq == res.data.question_answer_list[index.value].exi_category_seq;
            });
            if (!data) {
                customizationData.value.push(res.data.question_answer_list[index.value]);
                if (customizationData.value[index.value].max > 1) {
                    customizationData.value[index.value].isShowSubmitBtn = true;
                }
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        loaderState.value = false;
    }
};

const showInputBox = (option, question, optionArray) => {
    isShowInputBox.value = true;
    selectedInputBoxData.option = option;
    selectedInputBoxData.question = question;
    option['isActiveClass'] = true;
    optionArray.forEach((element) => {
        if (element != option) {
            element['isActiveClass'] = false;
        }
    });
}

const submitMultipleAnswer = (question) => {
    let ex_sub_category_seq = [];
    selectedMultipleOptionData.value.forEach((element) => {
        ex_sub_category_seq.push(element.ex_sub_category_seq)
    })

    let inputData = {
        category_seq: question.exi_category_seq,
        sub_category_seq: ex_sub_category_seq,
        point: 0,
        memo: customization_input.value
    }
    updateCustomization(inputData, question, '');
}

// input box answer added
const submitInputResponse = () => {
    if (customization_input.value == "") {
        error.customization_input = "Please enter your information.";
        return
    }
    let inputData = {
        category_seq: selectedInputBoxData.question.exi_category_seq,
        sub_category_seq: [selectedInputBoxData.option.ex_sub_category_seq],
        point: 0,
        memo: customization_input.value
    }

    updateCustomization(inputData, selectedInputBoxData.question, {
        ex_sub_category_seq: selectedInputBoxData.option.ex_sub_category_seq,
        sub_category_oprion1: null,
        sub_category_oprion2: null,
        sub_category_oprion3: null,
        sub_category_title_kr: customization_input.value,
        isActiveClass: true
    });
}

// single answer selection
const addAnswer = (answer, question, optionArray) => {
    if (answer.ex_sub_category_seq == 2) {
        router.push({ name: 'MainHome' });
    } else {
        if (optionArray.length != 1) {
            answer['isActiveClass'] = true;
            optionArray.forEach((element) => {
                element.isShowInputBox = false;
                if (element != answer) {
                    element['isActiveClass'] = false;
                }
            });

            let inputData = {
                category_seq: question.exi_category_seq,
                sub_category_seq: [answer.ex_sub_category_seq],
                point: 0,
                memo: customization_input.value
            }
            updateCustomization(inputData, question, answer);
        }
    }
}

const chooseMultipleOption = (answer, question) => {
    let data = selectedMultipleOptionData.value.find((f) => {
        return f.ex_sub_category_seq == answer.ex_sub_category_seq;
    });
    if (data) {
        answer['isActiveClass'] = false;
        selectedMultipleOptionData.value.splice(selectedMultipleOptionData.value.indexOf(data), 1);
    } else {
        answer['isActiveClass'] = true;
        selectedMultipleOptionData.value.push(answer);
    }
    // console.log(selectedMultipleOptionData.value);
    question.selectedAnswerCount = selectedMultipleOptionData.value.length;
}

const updateCustomization = async (data, question, answer) => {
    if (customizationData.value.length <= showingCustomizationData.value.length) {
        //return
        try {
            loaderState.value = true;
            const res = await CustomizationService.addCustomizationData(data);
            // console.log(res);
            if (res.data) {
                question.sub_category = [];
                if (answer) {
                    question.sub_category.push(answer);
                } else {
                    question.sub_category = selectedMultipleOptionData.value;
                    question.isShowSubmitBtn = false;
                }
                index.value++;
                if (customizationData.value.length != showingCustomizationData.value.length) {
                    customizationData.value.push(showingCustomizationData.value[index.value]);
                    if (customizationData.value[index.value].max > 1) {
                        customizationData.value[index.value].isShowSubmitBtn = true;
                    }
                    getCustomizationData();
                } else {
                    customizationData.value.push({
                        main_category_title_kr: "수고하셨습니다! 맞춤교육 설정이 완료되었습니다! 🎉",
                        sub_category: []
                    });

                    setTimeout(() => {
                        if (enrollHistoryList.value.length == 0) {
                            router.push({ name: 'MyPage' });
                        } else {
                            router.push({ name: 'SpaPrepCourse' });
                        }
                    }, 2000);
                }

                customization_input.value = "";
                isShowInputBox.value = false;
                selectedInputBoxData.option = "";
                selectedInputBoxData.question = [];
                selectedMultipleOptionData.value = [];
            }
        } catch (error) {
            console.log(error);
        } finally {
            loaderState.value = false;
        }
    }
}

const gotoPreviousQuestion = () => {
    if (customizationData.value.length != 1) {
        customizationData.value.pop();
        customizationData.value[index.value - 1] = newData.value[index.value - 1];
        if (customizationData.value[index.value - 1].max > 1) {
            customizationData.value[index.value - 1].isShowSubmitBtn = true;
        }
        index.value--;
        customization_input.value = "";
        isShowInputBox.value = false;
        selectedInputBoxData.option = "";
        selectedInputBoxData.question = [];
        selectedMultipleOptionData.value = [];
    }
}

onMounted(async () => {
    loaderState.value = true;
    await getCustomizationData();
    await getEnrollmentHistory()
});

</script>