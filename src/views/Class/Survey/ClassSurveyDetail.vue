<template>
  <div class="container">
    <div class="content-wrapper survey-details">
      <h1 class="page-title">설문</h1>
      <div class="main-content">
        <div class="survey-header">
          <p class="blue-tag">진행중</p>
          <div>
            <h4>{{ surveyDetails.SURVEY_TITLE }}</h4>
            <div class="date">
              <p>조사기간:</p>
              <p>
                {{
                  moment(surveyDetails.SURVEY_START_DATE).format("YYYY.MM.DD")
                }}
                ~
                {{ moment(surveyDetails.SURVEY_END_DATE).format("YYYY.MM.DD") }}
              </p>
            </div>
          </div>
        </div>
        <p class="description-box" v-html="surveyDetails.SURVEY_INTRO">
        </p>
        <ul
          class="survey-items"
          v-for="(item, index) in surveyData"
          :key="index"
        >
          <li class="each-survey">
            <p>{{ index + 1 }}. {{ item.ITEM_CONTENTS }}</p>
            <ul
              class="options direction-column"
              v-if="item.ITEM_TYPE == 0 && !item.SUBJECTIVE_QUESTION"
            >
              <li v-for="option in item.optionList">
                <label>
                  <input
                    type="checkbox"
                    @click="changeCheckBoxInput($event, item)"
                    :value="option.SURVEY_CASE_SEQ"
                  />
                  <span>{{ option.CASE_CONTENTS }}</span>
                </label>
              </li>
            </ul>
            <textarea
              v-else-if="item.ITEM_TYPE == 0 && item.SUBJECTIVE_QUESTION"
              @change="changeTextareaInput($event, item)"
              :name="item.SURVEY_ITEM_SEQ"
            ></textarea>

            <ul class="options" v-if="item.ITEM_TYPE == 1">
              <li v-for="(option, index) in item.optionList">
                <label>
                  <input
                    type="radio"
                    :value="option.SURVEY_CASE_SEQ"
                    :name="item.SURVEY_ITEM_SEQ"
                    @change="changeRadioInput($event, item, option)"
                  />
                  <span>{{ option.CASE_CONTENTS }}</span>
                </label>
              </li>
            </ul>
          </li>
          <p
            style="color: red"
            class="pt-2"
            v-if="errors[item.SURVEY_ITEM_SEQ]"
          >
            {{ errors[item.SURVEY_ITEM_SEQ] }}
          </p>
        </ul>
        <button
          class="blue-solid-button center-align martop60"
          @click="isConfirmModal = true"
        >
          제출하기
        </button>
      </div>
      
    </div>
  </div>
  <ConfirmModalVue
    :visible="isConfirmModal"
    title="정말 제출하시겠습니까?"
    primaryButtonText="제출"
    secondaryButtonText="취소"
    @on-cancel="closeConfirmModal"
    @on-confirm="submitSurveyAnswers"
  />
  <LoaderVue :loading="loaderState" />
</template>
<script setup>
import { onMounted, ref, reactive, computed } from "vue";
import { Survey } from "@/services/Class/Survey.js";
import { useRouter, useRoute } from "vue-router";
import moment from "moment";
const SurveyService = new Survey();
const loaderState = ref(false);
const surveyData = ref([]);
const surveyDetails = ref({});
const answerArray = ref([]);
const router = useRouter();
const route = useRoute();
const isConfirmModal = ref(false);

const closeConfirmModal = () => {
  isConfirmModal.value = false;
};

const textAreaArray = computed(() => {
  return surveyData.value.filter((item) => {
    if (item.ITEM_TYPE == 0 && item.SUBJECTIVE_QUESTION) {
      return true;
    }
  });
});
const checkboxArray = computed(() => {
  return surveyData.value.filter((item) => {
    if (item.ITEM_TYPE == 0 && !item.SUBJECTIVE_QUESTION) {
      return true;
    }
  });
});

const RadioButtonArray = computed(() => {
  return surveyData.value.filter((item) => {
    if (item.ITEM_TYPE == 1) {
      return true;
    }
  });
});

const getSurveyQuestions = async () => {
  try {
    loaderState.value = true;
    let data = {
      survey_seq: route.params.survey_seq,
      survey_schedule_seq: route.params.survey_schedule_seq,
    };
    const res = await SurveyService.getSurveyQuestions(data);
    if (res.data) {
      surveyData.value = res.data.data.filter(item => item !== null);
      //surveyData.value = res.data.data;
      surveyDetails.value = res.data.surveyDetails;

      console.log("surveyData",surveyData);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const changeTextareaInput = (event, item) => {
  let data = {
    survey_item_seq: item.SURVEY_ITEM_SEQ,
    survey_case_seq: "",
    replt_text: event.target.value,
    reply_number: item.ITEM_ORDER_NUM,
    user_score: "",
  };
  let existingObjectIndex = answerArray.value.find(
    (ans) => ans.survey_item_seq == item.SURVEY_ITEM_SEQ
  );
  if (existingObjectIndex) {
    answerArray.value = answerArray.value.map((ans) => {
      if (ans.survey_item_seq == item.SURVEY_ITEM_SEQ) {
        ans = data;
      }
      return ans;
    });
  } else {
    answerArray.value.push(data);
  }
};

const changeRadioInput = (event, item) => {
  let data = {
    survey_item_seq: item.SURVEY_ITEM_SEQ,
    survey_case_seq: event.target.value,
    replt_text: "",
    reply_number: item.ITEM_ORDER_NUM,
    user_score: "",
  };
  let existingObjectIndex = answerArray.value.find(
    (ans) => ans.survey_item_seq == item.SURVEY_ITEM_SEQ
  );
  if (existingObjectIndex) {
    answerArray.value = answerArray.value.map((ans) => {
      if (ans.survey_item_seq == item.SURVEY_ITEM_SEQ) {
        ans = data;
      }
      return ans;
    });
  } else {
    answerArray.value.push(data);
  }
};

const changeCheckBoxInput = (event, item) => {
  let data = {
    survey_item_seq: item.SURVEY_ITEM_SEQ,
    survey_case_seq: event.target.value,
    replt_text: "",
    reply_number: item.ITEM_ORDER_NUM,
    user_score: "",
  };
  if (event.target.checked == true) {
    answerArray.value.push(data);
  } else {
    let existData = answerArray.value.find((ans) => {
      return ans.survey_item_seq == item.SURVEY_ITEM_SEQ;
    });
    answerArray.value.splice(answerArray.value.indexOf(existData), 1);
  }
};
const errors = ref({});
const submitSurveyAnswers = async () => {
  isConfirmModal.value = false;
  errors.value = {};
  textAreaArray.value.forEach((item) => {
    if (
      !answerArray.value.find((answer) => {
        return answer.survey_item_seq == item.SURVEY_ITEM_SEQ;
      })
    ) {
      errors.value[item.SURVEY_ITEM_SEQ] = "필수 입력 필드입니다.";
      return;
    }
  });
  checkboxArray.value.forEach((item) => {
    if (
      !answerArray.value.find((answer) => {
        return answer.survey_item_seq == item.SURVEY_ITEM_SEQ;
      })
    ) {
      errors.value[item.SURVEY_ITEM_SEQ] = "필수 입력 필드입니다.";
      return;
    }
  });
  RadioButtonArray.value.forEach((item) => {
    if (
      !answerArray.value.find((answer) => {
        return answer.survey_item_seq == item.SURVEY_ITEM_SEQ;
      })
    ) {
      errors.value[item.SURVEY_ITEM_SEQ] = "필수 입력 필드입니다.";
      return;
    }
  });
  // if (!isFormCorrect) {
  //   return;
  // } else {
  if (Object.keys(errors.value).length) {
    console.log("inside error");
    return;
  } else {
    try {
      loaderState.value = true;
      let data = {
        survey_seq: route.params.survey_seq,
        survey_schedule_seq: route.params.survey_schedule_seq,
        answerArray: answerArray.value,
      };
      const res = await SurveyService.submitSurveyAnswers(data);
      if (res.status == 200) {
        router.push("/class-survey");
      }
    } catch (error) {
      console.log(error);
    } finally {
      loaderState.value = false;
    }
  }
};

onMounted(async () => {
  await getSurveyQuestions();
});
</script>
